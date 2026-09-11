import { and, count, desc, eq, isNotNull, ne } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { Appointment, InsertAppointment, InsertUser, appointments, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createAppointment(input: InsertAppointment): Promise<Appointment> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database is not available");
  }

  const result = await db.insert(appointments).values(input);
  const insertedId = Number(result[0].insertId);
  const created = await db.select().from(appointments).where(eq(appointments.id, insertedId)).limit(1);
  if (!created[0]) {
    throw new Error("Appointment was not created");
  }
  return created[0];
}

export function hourBucketFor(timeSlot: string): number {
  const [clock, meridiem] = timeSlot.trim().split(/\s+/);
  let hour = Number(clock.split(":")[0]);
  if (meridiem?.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (meridiem?.toUpperCase() === "AM" && hour === 12) hour = 0;
  return hour;
}

export async function markAppointmentWhatsappSent(id: number): Promise<void> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database is not available");
  }
  const current = await db.select().from(appointments).where(eq(appointments.id, id)).limit(1);
  if (!current[0]) throw new Error("Appointment was not found");
  const sameDate = await db.select({ id: appointments.id, timeSlot: appointments.timeSlot, status: appointments.status, whatsappSentAt: appointments.whatsappSentAt })
    .from(appointments)
    .where(eq(appointments.appointmentDate, current[0].appointmentDate));
  const booked = sameDate.filter((row) => row.id !== id && row.status !== "cancelled" && row.whatsappSentAt && hourBucketFor(row.timeSlot) === hourBucketFor(current[0].timeSlot)).length;
  if (booked >= 3) {
    const error = new Error("This one-hour slot is fully booked");
    error.name = "SLOT_FULL";
    throw error;
  }
  await db.update(appointments).set({ whatsappSentAt: new Date() }).where(eq(appointments.id, id));
}

export async function getPublicSlotCounts(appointmentDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  const rows = await db.select({ timeSlot: appointments.timeSlot, status: appointments.status, whatsappSentAt: appointments.whatsappSentAt })
    .from(appointments)
    .where(eq(appointments.appointmentDate, appointmentDate));
  const counts = new Map<number, number>();
  for (const row of rows) {
    if (row.status !== "cancelled" && row.whatsappSentAt) {
      const bucket = hourBucketFor(row.timeSlot);
      counts.set(bucket, (counts.get(bucket) ?? 0) + 1);
    }
  }
  return Array.from(counts, ([hourBucket, count]) => ({ hourBucket, count }));
}

export async function getAppointments() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database is not available");
  }
  return db.select().from(appointments);
}

export async function getPublicAppointments() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database is not available");
  }
  return db
    .select({
      id: appointments.id,
      customerName: appointments.customerName,
      service: appointments.service,
      appointmentDate: appointments.appointmentDate,
      timeSlot: appointments.timeSlot,
      provider: appointments.provider,
      whatsappSentAt: appointments.whatsappSentAt,
      createdAt: appointments.createdAt,
    })
    .from(appointments)
    .where(isNotNull(appointments.whatsappSentAt))
    .orderBy(desc(appointments.createdAt))
    .limit(50);
}

export async function getPublicAppointmentCount() {
  const db = await getDb();
  if (!db) {
    throw new Error("Database is not available");
  }
  const result = await db
    .select({ count: count(appointments.id) })
    .from(appointments)
    .where(isNotNull(appointments.whatsappSentAt));
  return Number(result[0]?.count ?? 0);
}

export async function updateAppointmentStatus(id: number, status: "requested" | "confirmed" | "completed" | "cancelled") {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");
  await db.update(appointments).set({ status }).where(eq(appointments.id, id));
  const updated = await db.select().from(appointments).where(eq(appointments.id, id)).limit(1);
  if (!updated[0]) throw new Error("Appointment was not found");
  return updated[0];
}
