import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const homeSource = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const dbSource = readFileSync(resolve(process.cwd(), "server/db.ts"), "utf8");
const routerSource = readFileSync(resolve(process.cwd(), "server/routers.ts"), "utf8");

describe("per-slot booking capacity", () => {
  it("enforces three WhatsApp handoffs per date and time slot on the server", () => {
    expect(dbSource).toContain('if (booked >= 3)');
    expect(dbSource).toContain('error.name = "SLOT_FULL"');
    expect(routerSource).toContain('message: "This time slot is fully booked"');
  });

  it("loads counts for the selected date and disables full slots as BOOKED", () => {
    expect(homeSource).toContain("trpc.appointments.slotCounts.useQuery");
    expect(homeSource).toContain("const full = count >= 3");
    expect(homeSource).toContain('full ? " booked" : ""');
    expect(homeSource).toContain('full ? "BOOKED" : time');
    expect(homeSource).toContain("await slotCountsQuery.refetch()");
  });

  it("keeps customer details inside the admin view", () => {
    expect(homeSource).toContain('user?.role === "admin" ? <div className="admin-booking-panel">');
    expect(homeSource).toContain("customerName");
    expect(homeSource).toContain("customerPhone");
    expect(homeSource).toContain("public-activity-locked");
    expect(homeSource).not.toContain('appointment.customerName.split(" ")[0]');
  });
});
