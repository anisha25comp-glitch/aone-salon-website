import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const routerSource = readFileSync(new URL("./routers.ts", import.meta.url), "utf8");
const dbSource = readFileSync(new URL("./db.ts", import.meta.url), "utf8");
const homeSource = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");

describe("appointment activity privacy", () => {
  it("keeps the public summary free of customer phone numbers", () => {
    expect(routerSource).toContain("publicSummary: publicProcedure.query(() => getPublicAppointments())");
    expect(dbSource).toContain("getPublicAppointments");
    expect(dbSource).toContain("whatsappSentAt: appointments.whatsappSentAt");
    expect(dbSource).not.toContain("customerPhone: appointments.customerPhone");
  });

  it("protects full appointment details behind the admin procedure", () => {
    expect(routerSource).toContain("list: adminProcedure.query(() => getAppointments())");
    expect(routerSource).toContain("updateStatus: adminProcedure");
    expect(homeSource).toContain('enabled: user?.role === "admin"');
    expect(homeSource).toContain('user?.role === "admin" ? <div className="admin-booking-panel">');
    expect(homeSource).toContain("customerPhone");
    expect(homeSource).toContain("paymentMode");
  });
});
