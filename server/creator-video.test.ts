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

  it("configures the first-load intro for 2x autoplay and tap dismissal", () => {
    expect(homeSource).toContain('className={introPhase === "logo" ? "opening-intro logo-phase" : "opening-intro"}');
    expect(homeSource).toContain('onClick={() => setIntroPlaying(false)}');
    expect(homeSource).toContain("playbackRate = 3");
    expect(homeSource).not.toContain('className="opening-intro-ui"');
    expect(homeSource).toContain('className="opening-intro-logo"');
    expect(homeSource).toContain('setIntroPhase("logo")');
    expect(homeSource).toContain("setIntroPlaying(false), 900");
  });
});
