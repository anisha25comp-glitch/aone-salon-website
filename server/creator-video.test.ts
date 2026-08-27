import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const homeSource = readFileSync(new URL("../client/src/pages/Home.tsx", import.meta.url), "utf8");

describe("creator video audio flow", () => {
  it("keeps the inline preview muted and enables audio only in the opened player", () => {
    expect(homeSource).toContain('className="best-works-preview"');
    expect(homeSource).toContain("<video muted autoPlay loop playsInline preload=\"metadata\">");
    expect(homeSource).toContain("player.muted = false");
    expect(homeSource).toContain("player.volume = 1");
    expect(homeSource).toContain('className="video-sound-button"');
  });

  it("opens directly on the homepage with the authentic header logo", () => {
    expect(homeSource).not.toContain("introPlaying");
    expect(homeSource).not.toContain("opening-intro");
    expect(homeSource).toContain('src="/manus-storage/aone-authentic-logo_d251e44f.jpg"');
  });
});
