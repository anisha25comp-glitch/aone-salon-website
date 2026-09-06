import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const homepageSource = readFileSync(join(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const indexSource = readFileSync(join(process.cwd(), "client/index.html"), "utf8");
const websiteSources = `${homepageSource}\n${indexSource}`;
const hydraAsset = "/assets/hydra-facial-machine.webp";
const referencedAssets = [...websiteSources.matchAll(/\/(?:assets)\/[A-Za-z0-9._/-]+/g)].map(([asset]) => asset);
const coreVisualAssets = [
  "/assets/aone-hero_d342bf01.jpg",
  "/assets/aone-colour-detail_af7415c5.jpg",
  "/assets/aone-interior_4f4202a6.jpg",
  "/assets/aone-hands-service_1dfc03b6.jpg",
  "/assets/aone-booklet-cover_66d66998.jpg",
  "/assets/hair-result-1_f6ac3975.jpeg",
  "/assets/colour-result_70bbb9e7.jpeg",
  "/assets/grooming-result_8839661c.jpeg",
        "/assets/salon-brand_132314f5.jpg",
      hydraAsset,

];

describe("Vercel asset paths", () => {
  it("does not use Manus-only storage paths in website sources", () => {
    expect(websiteSources).not.toContain("/manus-storage/");
    expect(websiteSources).toContain(hydraAsset);
  });

  it("keeps the core hero, menu, booklet, gallery, and logo assets on public paths", () => {
    for (const asset of coreVisualAssets) {
      expect(websiteSources).toContain(asset);
      expect(existsSync(join(process.cwd(), "client/public", asset.slice(1)))).toBe(true);
    }
  });

  it("bundles every referenced local asset with the exact case-sensitive filename", () => {
    expect(referencedAssets.length).toBeGreaterThan(0);
    for (const asset of new Set(referencedAssets)) {
      expect(existsSync(join(process.cwd(), "client/public", asset.slice(1)))).toBe(true);
    }
  });
});
