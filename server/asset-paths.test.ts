import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const homepageSource = readFileSync(join(process.cwd(), "client/src/pages/Home.tsx"), "utf8");
const indexSource = readFileSync(join(process.cwd(), "client/index.html"), "utf8");
const websiteSources = `${homepageSource}\n${indexSource}`;
const referencedAssets = [...websiteSources.matchAll(/\/(?:assets)\/[A-Za-z0-9._/-]+/g)].map(([asset]) => asset);

describe("Vercel asset paths", () => {
  it("does not use Manus-only storage paths in website sources", () => {
    expect(websiteSources).not.toContain("/manus-storage/");
  });

  it("bundles every referenced local asset with the exact case-sensitive filename", () => {
    expect(referencedAssets.length).toBeGreaterThan(0);
    for (const asset of new Set(referencedAssets)) {
      expect(existsSync(join(process.cwd(), "client/public", asset.slice(1)))).toBe(true);
    }
  });
});
