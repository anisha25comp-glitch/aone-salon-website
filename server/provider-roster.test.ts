import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");

describe("provider roster", () => {
  it("uses the confirmed providers in cards and booking choices", () => {
    expect(homeSource).toContain('const providers = ["Any available provider", "Faiz", "Divya", "Sarang"];');
    expect(homeSource).not.toContain('"Sakshi"');
    expect(homeSource).not.toContain('"Priti"');
    expect(homeSource).toContain('provider === "Faiz" || provider === "Sarang" ? "Hair dresser" : "Beautician"');
    expect(homeSource).toContain("{providers.map((provider) => <option");
  });
});
