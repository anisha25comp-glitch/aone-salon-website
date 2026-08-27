import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("appointments.create", () => {
  it("rejects incomplete booking details before touching the database", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.appointments.create({
      service: "",
      appointmentDate: "not-a-date",
      timeSlot: "",
      provider: "",
      customerName: "A",
      customerPhone: "123",
    })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});
