import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildManifest } from "../../scripts/generate-gallery-manifest";

let root: string;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "gallery-"));
  mkdirSync(join(root, "apparel"), { recursive: true });
  mkdirSync(join(root, "drinkware"), { recursive: true });
  writeFileSync(join(root, "apparel", "shirt-1.jpg"), "");
  writeFileSync(join(root, "apparel", "shirt-2.png"), "");
  writeFileSync(join(root, "drinkware", "tumbler-1.webp"), "");
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

describe("buildManifest", () => {
  it("returns categories with their image entries", () => {
    const manifest = buildManifest(root);
    expect(manifest).toEqual([
      {
        category: "apparel",
        images: [
          { src: "/gallery/apparel/shirt-1.jpg", alt: "Custom apparel — shirt 1", filename: "shirt-1.jpg" },
          { src: "/gallery/apparel/shirt-2.png", alt: "Custom apparel — shirt 2", filename: "shirt-2.png" },
        ],
      },
      {
        category: "drinkware",
        images: [
          { src: "/gallery/drinkware/tumbler-1.webp", alt: "Custom drinkware — tumbler 1", filename: "tumbler-1.webp" },
        ],
      },
    ]);
  });

  it("ignores non-image files and dotfiles", () => {
    writeFileSync(join(root, "apparel", "notes.txt"), "");
    writeFileSync(join(root, "apparel", ".DS_Store"), "");
    const manifest = buildManifest(root);
    const apparel = manifest.find((c) => c.category === "apparel")!;
    expect(apparel.images.map((i) => i.filename)).toEqual(["shirt-1.jpg", "shirt-2.png"]);
  });

  it("returns an empty list for an empty category folder", () => {
    mkdirSync(join(root, "signs"));
    const manifest = buildManifest(root);
    const signs = manifest.find((c) => c.category === "signs")!;
    expect(signs.images).toEqual([]);
  });
});
