import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homepage = readFileSync("client/src/pages/Home.tsx", "utf8");
const stylesheet = readFileSync("client/src/index.css", "utf8");

describe("facial menu and offer expiry", () => {
  it("includes the supplied facial and Hydra prices in the Skin & beauty menu", () => {
    expect(homepage).toContain('["Fruit Facial", "₹699", "₹1,499"]');
    expect(homepage).toContain('["Oshia Gold Facial", "₹999", "₹1,499"]');
    expect(homepage).toContain('["OxyLife Facial", "₹1,299", "₹1,999"]');
    expect(homepage).toContain('["Richfeel Facial", "₹1,799", "₹2,499"]');
    expect(homepage).toContain('["O3+ Facial", "₹2,499", "₹3,499"]');
    expect(homepage).toContain('["FYC Korean Facial", "₹2,499", "₹3,499"]');
    expect(homepage).toContain('["FYC Hydra Facial", "₹2,499", "₹3,499"]');
    expect(homepage).toContain('["O3+ Bridal Facial", "₹3,499", "₹3,499"]');
    expect(homepage).toContain('["Thalgo Facial", "₹6,999", "₹7,999"]');
    expect(homepage).toContain('return "Facial"');
    expect(homepage).toContain('return "Hydra Facial"');
    expect(homepage).toContain('subsection === "Hydra Facial"');
    expect(homepage).toContain('const displayService = hydraBlock');
    expect(homepage).toContain('className="hydra-feature-visual"');
    expect(homepage).toContain('/assets/hydra-facial-machine.webp');
  });

  it("underlines every menu heading", () => {
    expect(stylesheet).toContain(".ig-menu-section h2");
    expect(stylesheet).toContain(".ig-menu-section .menu-subsection h4");
    expect(stylesheet).toContain("text-decoration-line: underline");
  });

  it("gates the limited offer and its shortcut behind the expiry timestamp", () => {
    expect(homepage).toContain('const LIMITED_OFFER_END = new Date("2026-09-01T00:00:00+05:30").getTime();');
    expect(homepage).toContain('useState(() => Date.now() < LIMITED_OFFER_END)');
    expect(homepage).toContain("{limitedOfferActive && <button className=\"special-offers-button\"");
    expect(homepage).toContain("{limitedOfferActive && <section className=\"limited-offer\" id=\"limited-offer\">");
  });
});
