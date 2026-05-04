# Homemade Carolina Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Homemade Carolina single-page marketing site (Vite + React 18 + TypeScript + Tailwind v4 + shadcn/ui + Framer Motion) per the approved spec at `docs/superpowers/specs/2026-05-03-homemade-carolina-design.md`.

**Visual reference:** The HTML prototype at `design-exploration/variant-a-studio-note.html` is the authoritative visual reference — typography, spacing, color usage, asymmetric stagger, scribble underline, hero collage tilt, gallery filter behavior, etc. Open it side-by-side while implementing each section.

**Architecture:** Static-site React SPA prerendered with `vite-react-ssg` for SEO. Six on-page sections (Hero, Services, Gallery, Testimonials, About, Contact) with sticky header + persistent footer. Gallery images come from a build-time-generated manifest that scans `/public/gallery/<category>/`. Motion via Framer Motion with strict `prefers-reduced-motion` honoring. Local SEO via JSON-LD `LocalBusiness` schema for Belmont, NC.

**Tech Stack:** pnpm · Vite 6 · React 18 · TypeScript (strict) · Tailwind CSS v4 (CSS-first `@theme`) · shadcn/ui · Framer Motion · lucide-react · vite-react-ssg · Vitest + @testing-library/react · ESLint · Prettier

---

## Phase 0 — Design exploration: COMPLETED 2026-05-03

Three Playful-Crafted variants built as HTML hi-fi prototypes in `design-exploration/`. Carina selected **Variant A · Studio Note** with these tweaks:
- Headline switched to "Small batch. Big *love*." (*love* in Caveat script + pink scribble)
- Subhead from Variant B's product-listing copy
- Personal Commissions card widened to span 2 columns
- "Made by hand" mentions reduced to one (in About)
- Real placeholder photos added to `public/gallery/` and `photos/about.jpeg`
- Gallery filter chips functional (verified via Playwright)

The HTML prototype `design-exploration/variant-a-studio-note.html` is the visual reference for the React build. Locked design tokens flow into Tasks 5 and 6 below.

---

## File Structure

```
homemadecarolina/
├── brand-assets/logo.png                       (existing — used by header/footer)
├── public/
│   ├── gallery/
│   │   ├── apparel/      placeholder-*.jpg
│   │   ├── drinkware/    placeholder-*.jpg
│   │   ├── signs/        placeholder-*.jpg
│   │   ├── gifts/        placeholder-*.jpg
│   │   └── commissions/  placeholder-*.jpg
│   ├── og-image.png                            (1200×630 brand wordmark, replaceable)
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── robots.txt
├── scripts/
│   ├── generate-gallery-manifest.ts            (scans public/gallery → src/data/gallery.generated.ts)
│   └── generate-sitemap.ts                     (writes public/sitemap.xml at build)
├── src/
│   ├── main.tsx                                (vite-react-ssg entry)
│   ├── App.tsx                                 (composes all sections)
│   ├── index.css                               (Tailwind v4 + @theme tokens)
│   ├── lib/
│   │   ├── utils.ts                            (shadcn cn helper)
│   │   ├── motion.ts                           (easings, durations, framer variants)
│   │   ├── scroll.ts                           (smooth-scroll-to-anchor with header offset)
│   │   └── seo.ts                              (LocalBusiness JSON-LD generator)
│   ├── hooks/
│   │   ├── use-reduced-motion.ts
│   │   ├── use-reveal.ts                       (in-view trigger)
│   │   └── use-scroll-progress.ts              (0..1 scroll fraction)
│   ├── components/
│   │   ├── ui/                                 (shadcn primitives — added via `npx shadcn add`)
│   │   ├── layout/
│   │   │   ├── container.tsx
│   │   │   ├── section.tsx
│   │   │   ├── logo.tsx
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   └── skip-to-content.tsx
│   │   ├── motion/
│   │   │   ├── reveal.tsx                      (wraps children with in-view fade+rise)
│   │   │   └── scroll-progress-bar.tsx
│   │   └── sections/
│   │       ├── hero.tsx
│   │       ├── services.tsx
│   │       ├── service-card.tsx
│   │       ├── gallery.tsx
│   │       ├── gallery-tile.tsx
│   │       ├── lightbox.tsx
│   │       ├── testimonials.tsx
│   │       ├── about.tsx
│   │       └── contact.tsx
│   ├── content/
│   │   ├── hero.ts
│   │   ├── services.ts
│   │   ├── testimonials.ts
│   │   ├── about.ts
│   │   └── contact.ts
│   └── data/
│       └── gallery.generated.ts                (BUILD OUTPUT — do not edit by hand)
├── tests/
│   ├── unit/
│   │   ├── seo.test.ts
│   │   ├── scroll.test.ts
│   │   ├── motion.test.ts
│   │   └── generate-gallery-manifest.test.ts
│   └── components/
│       ├── lightbox.test.tsx
│       ├── gallery-filter.test.tsx
│       └── reveal.test.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── postcss.config.js
├── eslint.config.js
├── .prettierrc
├── .gitignore
└── README.md
```

---

## Phase 1 — Project Foundation

### Task 1: Initialize Vite + React + TypeScript + pnpm

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `.gitignore`

- [ ] **Step 1: Confirm Node version**

```bash
node --version
```
Expected: `v20.x` or higher. If lower, install Node 20+ via nvm before continuing.

- [ ] **Step 2: Initialize pnpm + Vite**

Run from repo root:
```bash
pnpm create vite@latest . -- --template react-ts
```
When prompted to overwrite the directory, choose **Ignore files and continue**. Then:
```bash
pnpm install
```

- [ ] **Step 3: Replace generated `src/App.tsx` with a clean shell**

```tsx
export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl">Homemade Carolina — scaffold</h1>
    </div>
  );
}
```

- [ ] **Step 4: Replace generated `src/main.tsx`**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 5: Replace generated `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Homemade Carolina</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Delete placeholder assets generated by Vite**

```bash
rm -f public/vite.svg src/assets/react.svg
rmdir src/assets 2>/dev/null || true
```

- [ ] **Step 7: Set TypeScript to strict mode**

In `tsconfig.json`, ensure `compilerOptions.strict` is `true`. Vite's template defaults to strict, but verify.

- [ ] **Step 8: Update `.gitignore`**

Append:
```
node_modules
dist
.DS_Store
.env*.local
src/data/gallery.generated.ts
public/sitemap.xml
```

- [ ] **Step 9: Verify dev server boots**

```bash
pnpm dev
```
Expected: server starts on `http://localhost:5173`, page renders the placeholder text. Stop the server with Ctrl-C.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + TS project"
```

---

### Task 2: Add Tailwind CSS v4

**Files:**
- Create: `src/index.css`, `postcss.config.js`
- Modify: `package.json` (deps), `vite.config.ts`

- [ ] **Step 1: Install Tailwind v4**

```bash
pnpm add -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 2: Wire Tailwind into Vite**

Replace `vite.config.ts`:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

- [ ] **Step 3: Create `src/index.css` with the Tailwind import**

```css
@import "tailwindcss";

@theme {
  /* Brand color tokens — DESIGN_TOKEN values get refined in Task 5 */
  --color-ink: #0E0E0E;
  --color-paper: #FFFFFF;
  --color-paper-warm: #FAF7F2;
  --color-pink: #FF4D8D;          /* DESIGN_TOKEN: replaced with chosen variant's pink */
  --color-pink-soft: #FFD9E5;
  --color-muted: #6B6B6B;
  --color-muted-soft: #E8E6E2;

  /* Font tokens — DESIGN_TOKEN values get refined in Task 6 */
  --font-display: "Bricolage Grotesque", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-script: "Caveat", "Homemade Apple", cursive;

  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
}

html { scroll-behavior: smooth; }
body { background: var(--color-paper); color: var(--color-ink); font-family: var(--font-body); }
```

- [ ] **Step 4: Verify Tailwind classes work in `App.tsx`**

Update App.tsx to use a Tailwind class with a custom token:
```tsx
export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <h1 className="text-2xl font-display text-pink">Homemade Carolina — scaffold</h1>
    </div>
  );
}
```
Run `pnpm dev` and confirm the heading uses the display font in pink. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: add Tailwind v4 with brand theme tokens"
```

---

### Task 3: Configure ESLint, Prettier, and a Vitest baseline

**Files:**
- Create: `eslint.config.js`, `.prettierrc`, `vitest.config.ts`, `tests/unit/.gitkeep`

- [ ] **Step 1: Install dev dependencies**

```bash
pnpm add -D prettier eslint-plugin-jsx-a11y vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Configure Prettier**

Create `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```
Then:
```bash
pnpm add -D prettier-plugin-tailwindcss
```

- [ ] **Step 3: Add the jsx-a11y rules to the existing `eslint.config.js`**

Vite generates `eslint.config.js`. Add `jsx-a11y` as a plugin and turn on `recommended` rules. Append:
```js
import jsxA11y from "eslint-plugin-jsx-a11y";

// inside the existing exported array, add a new config object:
{
  files: ["**/*.{ts,tsx}"],
  plugins: { "jsx-a11y": jsxA11y },
  rules: {
    ...jsxA11y.configs.recommended.rules,
  },
}
```

- [ ] **Step 4: Add Vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
  },
});
```

Create `tests/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 5: Add scripts to `package.json`**

Merge into `"scripts"`:
```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 6: Add a sanity test**

Create `tests/unit/sanity.test.ts`:
```ts
import { describe, it, expect } from "vitest";

describe("sanity", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```
Run: `pnpm test` — Expected: 1 passed.

- [ ] **Step 7: Format and lint**

```bash
pnpm format
pnpm lint
```
Both should succeed.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: add ESLint a11y rules, Prettier, and Vitest"
```

---

### Task 4: Install runtime libraries and shadcn/ui

**Files:**
- Modify: `package.json`, `tsconfig.json`, `vite.config.ts`
- Create: `components.json`, `src/lib/utils.ts`, `src/components/ui/*`

- [ ] **Step 1: Install runtime deps**

```bash
pnpm add framer-motion lucide-react clsx tailwind-merge class-variance-authority
```

- [ ] **Step 2: Configure path alias `@/*`**

In `tsconfig.json` add to `compilerOptions`:
```json
"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }
```

In `vite.config.ts` add to the export:
```ts
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

Mirror in `vitest.config.ts`:
```ts
resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
```
(Add `import path from "node:path";` at top.)

- [ ] **Step 3: Create `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Initialize shadcn**

```bash
pnpm dlx shadcn@latest init
```
When prompted:
- Style: **Default**
- Base color: **Neutral**
- CSS variables: **Yes**

This writes `components.json`. Verify `components.json` references `tailwind.css` as `src/index.css`. If the init created a new globals file or modified index.css, **manually preserve the `@theme` block** from Task 2 — re-paste it if necessary.

- [ ] **Step 5: Add the shadcn primitives we'll use**

```bash
pnpm dlx shadcn@latest add button card dialog sheet toggle-group
```

- [ ] **Step 6: Verify the build still works**

```bash
pnpm build
```
Expected: success, dist/ created.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: add Framer Motion, lucide, shadcn primitives, path alias"
```

---

## Phase 2 — Design Tokens & Typography

### Task 5: Apply Variant A's locked color tokens

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace placeholder color tokens with Variant A's locked hex values**

Edit the `@theme` block in `src/index.css` so it reads:
```css
@theme {
  /* Brand colors — Variant A · Studio Note (locked 2026-05-03) */
  --color-ink: #1a1310;          /* warm off-black */
  --color-paper: #FAF7F2;        /* warm cream */
  --color-paper-2: #F2EDE4;      /* alt section background */
  --color-pink: #EC4899;         /* hot-pink accent */
  --color-pink-soft: #FBD5E5;    /* soft fill for hover/accents */
  --color-muted: #7A6E66;        /* body muted variant */
  --color-rule: #D9D2C7;         /* hairline rules / card borders */

  /* Fonts — see Task 6 */
  --font-display: "Fraunces", ui-serif, serif;
  --font-body: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-script: "Caveat", cursive;

  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
}
```

- [ ] **Step 2: Verify contrast against the Variant A reference**

Open `design-exploration/variant-a-studio-note.html` in a browser side-by-side with `pnpm dev`. Confirm:
- Pink `#EC4899` on cream `#FAF7F2` looks like the prototype (used for CTAs, eyebrow, script accent — not body text)
- Body text uses `--color-ink` (`#1a1310`) on `--color-paper` — strong contrast
- Muted text uses `--color-muted` (`#7A6E66`) on `--color-paper` — sufficient at 16px+

If the pink fails ≥ 4.5:1 against any text usage, route that surface to ink instead. The prototype only uses pink for: CTAs (white-on-pink, fine), small accents (large enough), and the script word (decorative + ≥ 3:1 for graphic objects).

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat(theme): apply Variant A color tokens"
```

---

### Task 6: Wire Google Fonts (Variant A · Studio Note pairing)

**Files:**
- Modify: `index.html`, `src/index.css`

- [ ] **Step 1: Add preconnect + stylesheet links to `index.html`**

In `<head>`, before any other style/script resource:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Caveat:wght@400;700&family=Inter:wght@400;500;600&display=swap" />
```

- [ ] **Step 2: Confirm font tokens in `src/index.css` match Task 5**

The `@theme` block from Task 5 already declares `--font-display: "Fraunces", ...`, `--font-body: "Inter", ...`, `--font-script: "Caveat", ...`. Verify they are present and correctly named.

- [ ] **Step 3: Add Fraunces variable-axis utilities to `src/index.css`**

Append below the `@theme` block:
```css
.font-display { font-family: var(--font-display); font-variation-settings: 'opsz' 144, 'SOFT' 30; }
.font-display-tight { font-family: var(--font-display); font-variation-settings: 'opsz' 144, 'SOFT' 0; letter-spacing: -0.02em; }
.font-script { font-family: var(--font-script); }
```
(These mirror the prototype's two Fraunces flavors — soft optical for warm headlines, tight optical for the secondary line.)

- [ ] **Step 4: Boot dev server, verify fonts load**

```bash
pnpm dev
```
Open http://localhost:5173. In DevTools → Network tab, filter `fonts`. Confirm a `200` response from `fonts.googleapis.com` and the family CSS pulls woff2 files. The placeholder heading should render in Fraunces. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add index.html src/index.css
git commit -m "feat(theme): wire Fraunces + Caveat + Inter (Variant A)"
```

---

## Phase 3 — Build Pipeline & Pure Utilities (TDD)

### Task 7: Build the gallery-manifest generator (TDD)

**Files:**
- Create: `scripts/generate-gallery-manifest.ts`, `tests/unit/generate-gallery-manifest.test.ts`
- Modify: `package.json`

Goal: a Node script that scans `public/gallery/<category>/*.{jpg,png,webp}` and emits a typed manifest at `src/data/gallery.generated.ts`.

- [ ] **Step 1: Write the failing test**

Create `tests/unit/generate-gallery-manifest.test.ts`:
```ts
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from "node:fs";
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
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
pnpm test tests/unit/generate-gallery-manifest.test.ts
```
Expected: FAIL with "Cannot find module ../../scripts/generate-gallery-manifest".

- [ ] **Step 3: Implement the generator**

Create `scripts/generate-gallery-manifest.ts`:
```ts
import { readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, extname, basename, dirname } from "node:path";

export type GalleryImage = { src: string; alt: string; filename: string };
export type GalleryCategory = { category: string; images: GalleryImage[] };

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

const CATEGORY_LABELS: Record<string, string> = {
  apparel: "Custom apparel",
  drinkware: "Custom drinkware",
  signs: "Custom sign or decor piece",
  gifts: "Custom gift or promo item",
  commissions: "Personal commission",
};

function humanize(filename: string): string {
  const stem = basename(filename, extname(filename));
  return stem.replace(/^placeholder-/, "").replace(/[-_]+/g, " ").trim();
}

export function buildManifest(galleryRoot: string): GalleryCategory[] {
  const categories = readdirSync(galleryRoot)
    .filter((entry) => {
      const full = join(galleryRoot, entry);
      return !entry.startsWith(".") && statSync(full).isDirectory();
    })
    .sort();

  return categories.map((category): GalleryCategory => {
    const dir = join(galleryRoot, category);
    const images = readdirSync(dir)
      .filter((file) => !file.startsWith(".") && IMAGE_EXTS.has(extname(file).toLowerCase()))
      .sort()
      .map<GalleryImage>((filename) => ({
        src: `/gallery/${category}/${filename}`,
        alt: `${CATEGORY_LABELS[category] ?? category} — ${humanize(filename)}`,
        filename,
      }));
    return { category, images };
  });
}

export function writeManifest(galleryRoot: string, outFile: string): void {
  const manifest = buildManifest(galleryRoot);
  mkdirSync(dirname(outFile), { recursive: true });
  const body =
    `// AUTO-GENERATED by scripts/generate-gallery-manifest.ts — do not edit by hand.\n` +
    `import type { GalleryCategory } from "../../scripts/generate-gallery-manifest";\n` +
    `export const GALLERY: GalleryCategory[] = ${JSON.stringify(manifest, null, 2)};\n`;
  writeFileSync(outFile, body);
}

// CLI entry — runs when executed directly via tsx.
if (import.meta.url === `file://${process.argv[1]}`) {
  const root = join(process.cwd(), "public", "gallery");
  const out = join(process.cwd(), "src", "data", "gallery.generated.ts");
  writeManifest(root, out);
  console.log(`Gallery manifest written to ${out}`);
}
```

- [ ] **Step 4: Run the test to confirm it passes**

```bash
pnpm test tests/unit/generate-gallery-manifest.test.ts
```
Expected: 3 passed.

- [ ] **Step 5: Wire it into the build**

Install `tsx`:
```bash
pnpm add -D tsx
```

Update `package.json` scripts:
```json
{
  "prebuild": "tsx scripts/generate-gallery-manifest.ts",
  "predev": "tsx scripts/generate-gallery-manifest.ts"
}
```

- [ ] **Step 6: Create the gallery folders with placeholder images**

```bash
mkdir -p public/gallery/{apparel,drinkware,signs,gifts,commissions}
```

Add a few placeholder images per folder (any 600×600+ jpegs are fine for now — even repeated test images). Name them `placeholder-1.jpg`, `placeholder-2.jpg`, etc. so they're easy to spot and replace later.

- [ ] **Step 7: Run the generator manually to confirm**

```bash
pnpm tsx scripts/generate-gallery-manifest.ts
cat src/data/gallery.generated.ts
```
Expected: file contains an array with all five categories and the placeholder filenames.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat(build): gallery-manifest generator + tests + placeholder folders"
```

---

### Task 8: SEO `LocalBusiness` JSON-LD generator (TDD)

**Files:**
- Create: `src/lib/seo.ts`, `tests/unit/seo.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/seo.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { localBusinessJsonLd, type BusinessInfo } from "@/lib/seo";

const info: BusinessInfo = {
  name: "Homemade Carolina",
  url: "https://homemadecarolina.com",
  phone: "+17044882918",
  email: "carina@homemadecarolina.com",
  city: "Belmont",
  region: "NC",
  country: "US",
  socials: {
    instagram: "https://instagram.com/homemadecarolina",
    facebook: "https://facebook.com/homemadecarolina",
  },
  description: "Small-batch custom apparel, drinkware, signs, and gifts.",
  priceRange: "$$",
};

describe("localBusinessJsonLd", () => {
  it("produces a valid LocalBusiness schema object", () => {
    const json = localBusinessJsonLd(info);
    expect(json["@context"]).toBe("https://schema.org");
    expect(json["@type"]).toBe("LocalBusiness");
    expect(json.name).toBe("Homemade Carolina");
    expect(json.telephone).toBe("+17044882918");
    expect(json.email).toBe("carina@homemadecarolina.com");
    expect(json.address.addressLocality).toBe("Belmont");
    expect(json.address.addressRegion).toBe("NC");
    expect(json.sameAs).toEqual([
      "https://instagram.com/homemadecarolina",
      "https://facebook.com/homemadecarolina",
    ]);
    expect(json.areaServed).toContain("Belmont");
  });

  it("omits sameAs when no socials provided", () => {
    const json = localBusinessJsonLd({ ...info, socials: {} });
    expect(json.sameAs).toBeUndefined();
  });

  it("renders to a valid JSON string for embedding", () => {
    const str = JSON.stringify(localBusinessJsonLd(info));
    expect(() => JSON.parse(str)).not.toThrow();
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
pnpm test tests/unit/seo.test.ts
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/seo.ts`**

```ts
export type BusinessInfo = {
  name: string;
  url: string;
  phone: string;
  email: string;
  city: string;
  region: string;
  country: string;
  description: string;
  priceRange: string;
  socials: { instagram?: string; facebook?: string };
};

export type LocalBusinessJsonLd = {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  name: string;
  url: string;
  telephone: string;
  email: string;
  description: string;
  priceRange: string;
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  areaServed: string[];
  sameAs?: string[];
};

export function localBusinessJsonLd(info: BusinessInfo): LocalBusinessJsonLd {
  const sameAs = [info.socials.instagram, info.socials.facebook].filter(
    (v): v is string => Boolean(v),
  );
  const json: LocalBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: info.name,
    url: info.url,
    telephone: info.phone,
    email: info.email,
    description: info.description,
    priceRange: info.priceRange,
    address: {
      "@type": "PostalAddress",
      addressLocality: info.city,
      addressRegion: info.region,
      addressCountry: info.country,
    },
    areaServed: [`${info.city}, ${info.region}`, "United States"],
  };
  if (sameAs.length > 0) json.sameAs = sameAs;
  return json;
}
```

- [ ] **Step 4: Run the test to confirm it passes**

```bash
pnpm test tests/unit/seo.test.ts
```
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(seo): LocalBusiness JSON-LD generator with tests"
```

---

### Task 9: Smooth-scroll-with-header-offset utility (TDD)

**Files:**
- Create: `src/lib/scroll.ts`, `tests/unit/scroll.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/scroll.test.ts`:
```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { scrollToAnchor } from "@/lib/scroll";

describe("scrollToAnchor", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <header style="height: 64px"></header>
      <section id="services" style="margin-top: 1000px"></section>
    `;
    window.scrollTo = vi.fn();
    Object.defineProperty(document.querySelector("header")!, "offsetHeight", {
      configurable: true,
      value: 64,
    });
    Object.defineProperty(document.getElementById("services")!, "getBoundingClientRect", {
      configurable: true,
      value: () => ({ top: 1000, left: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => ({}) }),
    });
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  });

  it("scrolls to the element offset by the header height", () => {
    scrollToAnchor("services");
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 936, behavior: "smooth" });
  });

  it("respects prefers-reduced-motion by jumping instantly", () => {
    window.matchMedia = vi.fn().mockImplementation((q: string) => ({
      matches: q === "(prefers-reduced-motion: reduce)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    scrollToAnchor("services");
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 936, behavior: "auto" });
  });

  it("is a no-op when target element is not found", () => {
    scrollToAnchor("does-not-exist");
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
pnpm test tests/unit/scroll.test.ts
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `src/lib/scroll.ts`**

```ts
export function scrollToAnchor(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;
  const header = document.querySelector("header");
  const offset = header ? header.offsetHeight : 0;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}
```

- [ ] **Step 4: Run the test to confirm it passes**

```bash
pnpm test tests/unit/scroll.test.ts
```
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(lib): smooth-scroll-to-anchor with header offset and reduced-motion"
```

---

### Task 10: Motion constants module (TDD)

**Files:**
- Create: `src/lib/motion.ts`, `tests/unit/motion.test.ts`

- [ ] **Step 1: Write the failing test**

Create `tests/unit/motion.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { EASING, DURATIONS, revealVariants } from "@/lib/motion";

describe("motion constants", () => {
  it("exposes the soft easing as a 4-tuple cubic-bezier", () => {
    expect(EASING.soft).toEqual([0.22, 1, 0.36, 1]);
  });

  it("exposes durations in seconds", () => {
    expect(DURATIONS.reveal).toBeCloseTo(0.6);
    expect(DURATIONS.hover).toBeCloseTo(0.2);
    expect(DURATIONS.ambient).toBeCloseTo(1.2);
  });

  it("revealVariants returns hidden + visible states", () => {
    const v = revealVariants();
    expect(v.hidden).toEqual({ opacity: 0, y: 24 });
    expect(v.visible).toEqual(
      expect.objectContaining({ opacity: 1, y: 0 }),
    );
  });

  it("revealVariants respects reducedMotion=true (no y translate)", () => {
    const v = revealVariants({ reducedMotion: true });
    expect(v.hidden).toEqual({ opacity: 0 });
    expect(v.visible).toEqual(expect.objectContaining({ opacity: 1 }));
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
pnpm test tests/unit/motion.test.ts
```
Expected: FAIL.

- [ ] **Step 3: Implement `src/lib/motion.ts`**

```ts
import type { Variants } from "framer-motion";

export const EASING = { soft: [0.22, 1, 0.36, 1] as const };
export const DURATIONS = { reveal: 0.6, hover: 0.2, ambient: 1.2 } as const;

export function revealVariants(opts: { reducedMotion?: boolean } = {}): Variants {
  if (opts.reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: DURATIONS.reveal, ease: EASING.soft } },
    };
  }
  return {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATIONS.reveal, ease: EASING.soft },
    },
  };
}
```

- [ ] **Step 4: Run the test to confirm it passes**

```bash
pnpm test tests/unit/motion.test.ts
```
Expected: 4 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(motion): easing, durations, and reveal variants with reduced-motion"
```

---

### Task 11: `useReducedMotion` hook

**Files:**
- Create: `src/hooks/use-reduced-motion.ts`, `tests/unit/use-reduced-motion.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// tests/unit/use-reduced-motion.test.ts
import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({
    matches: q === "(prefers-reduced-motion: reduce)" ? matches : false,
    media: q,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("useReducedMotion", () => {
  it("returns true when the user prefers reduced motion", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });

  it("returns false when the user does not prefer reduced motion", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(false);
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
pnpm test tests/unit/use-reduced-motion.test.ts
```
Expected: FAIL.

- [ ] **Step 3: Implement the hook**

```ts
// src/hooks/use-reduced-motion.ts
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return reduced;
}
```

- [ ] **Step 4: Run the test to confirm it passes**

```bash
pnpm test tests/unit/use-reduced-motion.test.ts
```
Expected: 2 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(hooks): useReducedMotion"
```

---

### Task 12: `useScrollProgress` hook

**Files:**
- Create: `src/hooks/use-scroll-progress.ts`

This hook is a thin window event listener — testing it adds little value over reading the code. Skip TDD here; visual verification in Task 19 (header progress bar) is the proof.

- [ ] **Step 1: Implement the hook**

```ts
// src/hooks/use-scroll-progress.ts
import { useEffect, useState } from "react";

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function update() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return progress;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/use-scroll-progress.ts
git commit -m "feat(hooks): useScrollProgress"
```

---

### Task 13: `useReveal` hook + `<Reveal>` wrapper component (TDD on the hook)

**Files:**
- Create: `src/hooks/use-reveal.ts`, `src/components/motion/reveal.tsx`, `tests/components/reveal.test.tsx`

- [ ] **Step 1: Implement `useReveal` first** (no test — it's a thin wrapper around `IntersectionObserver`, which is unreliable to test in jsdom)

Create `src/hooks/use-reveal.ts`:
```ts
import { useEffect, useRef, useState } from "react";

export function useReveal<T extends Element = HTMLDivElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            return;
          }
        }
      },
      { threshold },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown, threshold]);

  return { ref, shown };
}
```

- [ ] **Step 2: Write the test for `<Reveal>` component behavior**

Create `tests/components/reveal.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/motion/reveal";

describe("<Reveal>", () => {
  it("renders its children", () => {
    render(<Reveal>hello</Reveal>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("uses opacity-only variants when reduced-motion is on", () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    render(<Reveal>hello</Reveal>);
    // No translate transform should appear in the rendered style
    const el = screen.getByText("hello").parentElement!;
    expect(el.style.transform ?? "").not.toContain("translate");
  });
});
```

- [ ] **Step 3: Implement `<Reveal>`**

Create `src/components/motion/reveal.tsx`:
```tsx
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useReveal } from "@/hooks/use-reveal";
import { revealVariants } from "@/lib/motion";
import { type ReactNode } from "react";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduced = useReducedMotion();
  const { ref, shown } = useReveal<HTMLDivElement>();
  const variants = revealVariants({ reducedMotion: reduced });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={shown ? "visible" : "hidden"}
      transition={{ delay }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run tests**

```bash
pnpm test tests/components/reveal.test.tsx
```
Expected: 2 passed.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(motion): useReveal hook and <Reveal> wrapper"
```

---

## Phase 4 — Layout Primitives

### Task 14: `<Container>` and `<Section>` primitives

**Files:**
- Create: `src/components/layout/container.tsx`, `src/components/layout/section.tsx`

- [ ] **Step 1: Implement `<Container>`**

```tsx
// src/components/layout/container.tsx
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 sm:px-8", className)} {...rest} />;
}
```

- [ ] **Step 2: Implement `<Section>`**

```tsx
// src/components/layout/section.tsx
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLElement> & { id: string };

export function Section({ id, className, children, ...rest }: Props) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 md:py-28", className)} {...rest}>
      {children}
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(layout): Container and Section primitives"
```

---

### Task 15: `<Logo>` component

**Files:**
- Create: `src/components/layout/logo.tsx`

- [ ] **Step 1: Move logo to public/**

```bash
mkdir -p public
cp brand-assets/logo.png public/logo.png
```

- [ ] **Step 2: Implement `<Logo>`**

```tsx
// src/components/layout/logo.tsx
import { cn } from "@/lib/utils";

export function Logo({ className, height = 36 }: { className?: string; height?: number }) {
  return (
    <a href="#top" aria-label="Homemade Carolina home" className={cn("inline-flex items-center", className)}>
      <img src="/logo.png" alt="Homemade Carolina" height={height} style={{ height }} />
    </a>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(layout): Logo component"
```

---

### Task 16: `<SkipToContent>` link (a11y)

**Files:**
- Create: `src/components/layout/skip-to-content.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/layout/skip-to-content.tsx
export function SkipToContent() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
    >
      Skip to main content
    </a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(a11y): skip-to-content link"
```

---

### Task 17: Mobile nav (`<MobileNav>`) using shadcn Sheet

**Files:**
- Create: `src/components/layout/mobile-nav.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/layout/mobile-nav.tsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { scrollToAnchor } from "@/lib/scroll";

const LINKS = [
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <nav aria-label="Mobile" className="mt-12 flex flex-col gap-4">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                setOpen(false);
                setTimeout(() => scrollToAnchor(l.id), 50);
              }}
              className="text-left text-2xl font-display"
            >
              {l.label}
            </button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(nav): mobile nav drawer using shadcn Sheet"
```

---

### Task 18: `<Header>` (sticky, with desktop nav + mobile trigger + phone CTA)

**Files:**
- Create: `src/components/layout/header.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/layout/header.tsx
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { ScrollProgressBar } from "@/components/motion/scroll-progress-bar";
import { scrollToAnchor } from "@/lib/scroll";
import { CONTACT } from "@/content/contact";
import { cn } from "@/lib/utils";

const LINKS = [
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [shrunk, setShrunk] = useState(false);
  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-muted-soft/40 bg-paper/85 backdrop-blur",
        "transition-[padding] duration-200",
        shrunk ? "py-3" : "py-6",
      )}
    >
      <ScrollProgressBar />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <Logo height={shrunk ? 28 : 36} />

        <nav aria-label="Primary" className="hidden md:flex md:items-center md:gap-8">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollToAnchor(l.id)}
              className="text-sm uppercase tracking-wide hover:text-pink"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${CONTACT.phoneE164}`}
            className="hidden md:inline-flex items-center gap-2 text-sm hover:text-pink"
          >
            <Phone className="size-4" />
            {CONTACT.phoneDisplay}
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(layout): sticky header with desktop nav, mobile trigger, phone CTA"
```

---

### Task 19: `<ScrollProgressBar>` (pink-tinted, top of header)

**Files:**
- Create: `src/components/motion/scroll-progress-bar.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/motion/scroll-progress-bar.tsx
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgressBar() {
  const p = useScrollProgress();
  return (
    <div
      aria-hidden
      className="absolute left-0 top-0 h-[3px] w-full bg-muted-soft/40"
    >
      <div
        className="h-full bg-pink transition-[width] duration-75 ease-linear"
        style={{ width: `${p * 100}%` }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(motion): scroll progress bar"
```

---

### Task 20: `<Footer>`

**Files:**
- Create: `src/components/layout/footer.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/layout/footer.tsx
import { Instagram, Facebook } from "lucide-react";
import { Container } from "./container";
import { Logo } from "./logo";
import { CONTACT } from "@/content/contact";
import { scrollToAnchor } from "@/lib/scroll";

const LINKS = [
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-muted-soft/40 bg-paper py-12">
      <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo height={32} />
          <p className="mt-2 max-w-xs text-sm text-muted">
            Small-batch made by hand in Belmont, NC.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => scrollToAnchor(l.id)}
              className="text-sm hover:text-pink"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a aria-label="Instagram" href={CONTACT.instagram} target="_blank" rel="noreferrer">
            <Instagram className="size-5 hover:text-pink" />
          </a>
          <a aria-label="Facebook" href={CONTACT.facebook} target="_blank" rel="noreferrer">
            <Facebook className="size-5 hover:text-pink" />
          </a>
        </div>
      </Container>
      <Container className="mt-8 flex justify-between text-xs text-muted">
        <span>© {year} Homemade Carolina · Belmont, NC</span>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat(layout): footer"
```

---

## Phase 5 — Content Modules

### Task 21: Static content modules

**Files:**
- Create: `src/content/hero.ts`, `src/content/services.ts`, `src/content/testimonials.ts`, `src/content/about.ts`, `src/content/contact.ts`

- [ ] **Step 1: Hero copy (per Variant A choice)**

```ts
// src/content/hero.ts
export const HERO = {
  eyebrow: "Belmont, NC · Small batch",
  // Headline structure: lead + script-accent word + trail.
  // The script word renders in Caveat with a pink scribble underline.
  headline: { lead: "Small batch.", lead2: "Big", scriptWord: "love", trail: "." },
  subhead:
    "Custom shirts, tumblers, signs, and one-of-a-kind gifts for small businesses and the people you love. Small-batch, from Belmont, NC.",
  italicNote:
    "Personal commissions and small-business branding since the vendor-fair days.",
  ctas: { primary: "Get a quote", secondaryLabel: "or call" },
};
```

- [ ] **Step 2: Services**

```ts
// src/content/services.ts
export type ServiceCategory = {
  slug: "apparel" | "drinkware" | "signs" | "gifts" | "commissions";
  title: string;
  blurb: string;
  badges: string[];
};

export const SERVICES: ServiceCategory[] = [
  {
    slug: "apparel",
    title: "Apparel & Accessories",
    blurb:
      "Full-color shirts, hoodies, tote bags, hats, and bandanas — vibrant on any fabric color, soft to the touch, built to last 50+ washes.",
    badges: ["DTF", "Cricut HTV", "Heat press"],
  },
  {
    slug: "drinkware",
    title: "Drinkware",
    blurb:
      "Tumblers, water bottles, wine glasses, and mugs with full-color wraps or permanent etched designs.",
    badges: ["UV (rotary)", "Laser", "Cricut vinyl"],
  },
  {
    slug: "signs",
    title: "Signs & Decor",
    blurb:
      "Wood signs, acrylic plaques, slate pieces, and event signage — engraved, printed, or both.",
    badges: ["Laser", "UV flatbed", "Cricut"],
  },
  {
    slug: "gifts",
    title: "Promo & Corporate Gifts",
    blurb:
      "Branded keychains, drinkware, leather goods, packaging, and matching apparel for events, launches, and gifting.",
    badges: ["UV", "Laser", "DTF", "Cricut"],
  },
  {
    slug: "commissions",
    title: "Personal Commissions",
    blurb:
      "Wedding decor, memorial pieces, custom gifts, and one-off ideas — bring me your concept and we'll make it.",
    badges: ["All four machines"],
  },
];
```

- [ ] **Step 3: Testimonials (placeholders)**

```ts
// src/content/testimonials.ts
export type Testimonial = { quote: string; attribution: string; placeholder: true };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "[Glowing review goes here once a real client says something nice.]",
    attribution: "Future Happy Client",
    placeholder: true,
  },
  {
    quote: "[Replace this placeholder with a real quote about turnaround time or quality.]",
    attribution: "Future Happy Client",
    placeholder: true,
  },
  {
    quote: "[A short rave about how easy the commission process was, ideally with a name + city.]",
    attribution: "Future Happy Client",
    placeholder: true,
  },
];
```

- [ ] **Step 4: About**

```ts
// src/content/about.ts
export const ABOUT = {
  heading: "Hi, I'm Carina.",
  body: `I love to create and make things — from a quick custom gift for a friend to a full branding kit for a small business getting off the ground. Homemade Carolina started at vendor fairs around the Carolinas, and has grown into small-batch print, cut, and engraving work for personal commissions and growing local brands. Every piece I ship is made by hand in my Belmont, NC studio.`,
  portraitSrc: "/about/portrait-placeholder.jpg",
};
```

Add a placeholder portrait at `public/about/portrait-placeholder.jpg` (any 800×1000 image is fine for now).

- [ ] **Step 5: Contact**

```ts
// src/content/contact.ts
export const CONTACT = {
  name: "Carina Wilson",
  phoneDisplay: "(704) 488-2918",
  phoneE164: "+17044882918",
  email: "carina@homemadecarolina.com",
  // CONFIRM at build time before launch — placeholder URLs:
  instagram: "https://instagram.com/homemadecarolina",
  facebook: "https://facebook.com/homemadecarolina",
  city: "Belmont",
  region: "NC",
  country: "US",
  shippingNote: "Based in Belmont, NC · Shipping nationwide",
  description:
    "Small-batch custom apparel, drinkware, signs, and gifts made by hand in Belmont, NC.",
  priceRange: "$$",
  url: "https://homemadecarolina.com",
};
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(content): static content modules for all sections"
```

---

## Phase 6 — Page Sections

### Task 22: `<Hero>` section

**Files:**
- Create: `src/components/sections/hero.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/sections/hero.tsx
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { HERO } from "@/content/hero";
import { CONTACT } from "@/content/contact";
import { scrollToAnchor } from "@/lib/scroll";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const COLLAGE = [
  { src: "/gallery/apparel/placeholder-1.jpg", alt: "Custom apparel sample", rot: -3, top: 10, left: 5 },
  { src: "/gallery/drinkware/placeholder-1.jpg", alt: "Custom drinkware sample", rot: 4, top: 35, left: 50 },
  { src: "/gallery/signs/placeholder-1.jpg", alt: "Custom sign sample", rot: -2, top: 60, left: 12 },
];

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="top" className="relative overflow-hidden pt-12 md:pt-20">
      <Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-pink">{HERO.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] md:text-7xl">
              {HERO.headline.lead}{" "}
              <span className="relative inline-block">
                <span className="font-script text-pink">{HERO.headline.scriptWord}</span>
                <ScribbleUnderline animate={!reduced} />
              </span>{" "}
              {HERO.headline.trail}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-prose text-lg text-muted">{HERO.subhead}</p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => scrollToAnchor("contact")}
                className="rounded-full bg-pink text-paper hover:bg-pink/90"
              >
                {HERO.ctas.primary}
              </Button>
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className="inline-flex items-center gap-2 text-sm text-ink hover:text-pink"
              >
                <Phone className="size-4" />
                {HERO.ctas.secondaryLabel} {CONTACT.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>

        <div className="relative h-[420px] md:h-[520px]" aria-hidden>
          {COLLAGE.map((p, i) => (
            <motion.img
              key={p.src}
              src={p.src}
              alt={p.alt}
              className="absolute h-44 w-44 rounded-md object-cover shadow-xl ring-1 ring-ink/10 md:h-60 md:w-60"
              style={{ top: `${p.top}%`, left: `${p.left}%`, rotate: `${p.rot}deg` }}
              animate={
                reduced ? undefined : { y: [0, i % 2 === 0 ? -4 : 4, 0] }
              }
              transition={
                reduced ? undefined : { duration: 8 + i * 2, repeat: Infinity, ease: "easeInOut" }
              }
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ScribbleUnderline({ animate }: { animate: boolean }) {
  return (
    <svg
      className="absolute -bottom-2 left-0 h-3 w-full text-pink"
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M2 8 Q 50 2 100 6 T 198 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
```

- [ ] **Step 2: Visually verify**

Wire `<Hero />` into `App.tsx` (replace placeholder content with `<Header /> + <main id="main"><Hero /></main> + <Footer />`):
```tsx
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { SkipToContent } from "@/components/layout/skip-to-content";

export default function App() {
  return (
    <>
      <SkipToContent />
      <Header />
      <main id="main"><Hero /></main>
      <Footer />
    </>
  );
}
```

Run `pnpm dev`, visit http://localhost:5173. Confirm: heading renders, script word is pink with underline scribble, CTAs visible, photos float gently. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat(sections): hero with scribble underline + collage"
```

---

### Task 23: `<ServiceCard>` and `<Services>` section

**Files:**
- Create: `src/components/sections/service-card.tsx`, `src/components/sections/services.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Implement `<ServiceCard>`**

```tsx
// src/components/sections/service-card.tsx
import { Card, CardContent } from "@/components/ui/card";
import { type ServiceCategory } from "@/content/services";
import { GALLERY } from "@/data/gallery.generated";

export function ServiceCard({ service, index }: { service: ServiceCategory; index: number }) {
  const previews =
    GALLERY.find((g) => g.category === service.slug)?.images.slice(0, 3) ?? [];
  // Per Variant A: card #5 (Personal Commissions, slug "commissions") spans 2
  // columns at md+ to match the prototype's wide layout.
  const isWide = service.slug === "commissions";
  return (
    <Card
      className={`group relative overflow-hidden border-muted-soft/60 transition-transform duration-200 hover:-translate-y-1 ${
        isWide ? "md:col-span-2 lg:col-span-2" : ""
      } ${
        !isWide && index % 2 === 1 ? "md:translate-y-8" : "md:translate-y-0"
      }`}
    >
      <CardContent className="p-6">
        <div className="mb-5 grid grid-cols-3 gap-2">
          {previews.length > 0
            ? previews.map((img) => (
                <img
                  key={img.src}
                  src={img.src}
                  alt={img.alt}
                  className="aspect-square rounded-md object-cover"
                />
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-md bg-muted-soft/60" aria-hidden />
              ))}
        </div>
        <h3 className="font-display text-2xl">{service.title}</h3>
        <p className="mt-2 text-sm text-muted">{service.blurb}</p>
        <ul
          className="mt-4 flex max-h-0 flex-wrap gap-2 overflow-hidden text-xs text-muted opacity-0 transition-all duration-200 group-hover:max-h-20 group-hover:opacity-100"
          aria-label={`Techniques used for ${service.title}`}
        >
          {service.badges.map((b) => (
            <li key={b} className="rounded-full bg-muted-soft/70 px-2 py-1">
              {b}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
```

- [ ] **Step 2: Implement `<Services>`**

```tsx
// src/components/sections/services.tsx
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SERVICES } from "@/content/services";
import { ServiceCard } from "./service-card";

export function Services() {
  return (
    <Section id="services" className="bg-paper-warm/40">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-pink">What I make</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Services</h2>
          <p className="mt-3 max-w-xl text-muted">
            Tell me what you need — apparel, drinkware, signage, or a one-off — I'll match it to the right tools.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.1}>
              <ServiceCard service={s} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Wire into App.tsx**

```tsx
import { Services } from "@/components/sections/services";
// inside <main>: <Hero /><Services />
```

- [ ] **Step 4: Verify**

```bash
pnpm dev
```
Scroll past hero. Confirm 5 cards render in an asymmetric stagger, hover reveals technique badges. Stop the server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(sections): services with asymmetric card stagger"
```

---

### Task 24: `<GalleryTile>` and `<Gallery>` with filter chips (TDD on filter logic)

**Files:**
- Create: `src/components/sections/gallery-tile.tsx`, `src/components/sections/gallery.tsx`, `tests/components/gallery-filter.test.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Write the failing test for filter behavior**

Create `tests/components/gallery-filter.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Gallery } from "@/components/sections/gallery";

vi.mock("@/data/gallery.generated", () => ({
  GALLERY: [
    {
      category: "apparel",
      images: [{ src: "/x/a1.jpg", alt: "shirt", filename: "a1.jpg" }],
    },
    {
      category: "drinkware",
      images: [{ src: "/x/d1.jpg", alt: "tumbler", filename: "d1.jpg" }],
    },
  ],
}));

describe("<Gallery>", () => {
  it("shows all images when 'All' filter is active", () => {
    render(<Gallery />);
    expect(screen.getByAltText("shirt")).toBeInTheDocument();
    expect(screen.getByAltText("tumbler")).toBeInTheDocument();
  });

  it("filters to a single category when chip clicked", async () => {
    render(<Gallery />);
    await userEvent.click(screen.getByRole("button", { name: /apparel/i }));
    expect(screen.getByAltText("shirt")).toBeInTheDocument();
    expect(screen.queryByAltText("tumbler")).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
pnpm test tests/components/gallery-filter.test.tsx
```
Expected: FAIL — module not found.

- [ ] **Step 3: Implement `<GalleryTile>`**

```tsx
// src/components/sections/gallery-tile.tsx
import type { GalleryImage } from "../../../scripts/generate-gallery-manifest";

type Props = {
  image: GalleryImage;
  category: string;
  onOpen: () => void;
};

export function GalleryTile({ image, category, onOpen }: Props) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block overflow-hidden rounded-md bg-muted-soft/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink"
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <span className="pointer-events-none absolute right-2 top-2 rounded-full bg-pink px-2 py-1 text-xs text-paper opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {category}
      </span>
    </button>
  );
}
```

- [ ] **Step 4: Implement `<Gallery>` (lightbox is wired in Task 25; for now, click is a no-op)**

```tsx
// src/components/sections/gallery.tsx
import { useMemo, useState } from "react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { GALLERY } from "@/data/gallery.generated";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GalleryTile } from "./gallery-tile";
import { Lightbox } from "./lightbox";

const CHIPS = [
  { value: "all", label: "All" },
  { value: "apparel", label: "Apparel" },
  { value: "drinkware", label: "Drinkware" },
  { value: "signs", label: "Signs" },
  { value: "gifts", label: "Gifts" },
];

export function Gallery() {
  const [filter, setFilter] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const flat = useMemo(() => {
    return GALLERY.flatMap((g) =>
      g.images.map((img) => ({ ...img, category: g.category })),
    ).filter((img) => filter === "all" || img.category === filter);
  }, [filter]);

  return (
    <Section id="gallery">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-pink">Recent work</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Gallery</h2>
        </Reveal>

        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(v) => v && setFilter(v)}
          className="mt-8 flex flex-wrap gap-2"
          aria-label="Gallery filter"
        >
          {CHIPS.map((c) => (
            <ToggleGroupItem
              key={c.value}
              value={c.value}
              className="rounded-full border border-muted-soft px-4 py-2 text-sm data-[state=on]:bg-pink data-[state=on]:text-paper"
            >
              {c.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {flat.map((img, i) => (
            <GalleryTile
              key={img.src}
              image={img}
              category={img.category}
              onOpen={() => setOpenIndex(i)}
            />
          ))}
        </div>
      </Container>

      <Lightbox
        images={flat}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndex={(i) => setOpenIndex(i)}
      />
    </Section>
  );
}
```

(`<Lightbox>` is implemented in Task 25 — temporarily stub it as below to keep this task standalone.)

Create `src/components/sections/lightbox.tsx` as a stub:
```tsx
import type { GalleryImage } from "../../../scripts/generate-gallery-manifest";
type Props = { images: (GalleryImage & { category: string })[]; index: number | null; onClose: () => void; onIndex: (i: number) => void };
export function Lightbox(_props: Props) { return null; }
```

- [ ] **Step 5: Run the test**

```bash
pnpm test tests/components/gallery-filter.test.tsx
```
Expected: 2 passed.

- [ ] **Step 6: Wire into App.tsx**

```tsx
import { Gallery } from "@/components/sections/gallery";
// inside <main>: ... <Services /><Gallery />
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(sections): gallery with filter chips"
```

---

### Task 25: `<Lightbox>` with focus trap, Escape, and arrow keys (TDD)

**Files:**
- Modify: `src/components/sections/lightbox.tsx`
- Create: `tests/components/lightbox.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `tests/components/lightbox.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Lightbox } from "@/components/sections/lightbox";

const images = [
  { src: "/a.jpg", alt: "A", filename: "a.jpg", category: "apparel" },
  { src: "/b.jpg", alt: "B", filename: "b.jpg", category: "apparel" },
  { src: "/c.jpg", alt: "C", filename: "c.jpg", category: "apparel" },
];

describe("<Lightbox>", () => {
  it("renders nothing when index is null", () => {
    const { container } = render(<Lightbox images={images} index={null} onClose={() => {}} onIndex={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the image at the given index when open", () => {
    render(<Lightbox images={images} index={1} onClose={() => {}} onIndex={() => {}} />);
    expect(screen.getByAltText("B")).toBeInTheDocument();
  });

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn();
    render(<Lightbox images={images} index={1} onClose={onClose} onIndex={() => {}} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("advances index on ArrowRight and wraps", () => {
    const onIndex = vi.fn();
    render(<Lightbox images={images} index={2} onClose={() => {}} onIndex={onIndex} />);
    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(onIndex).toHaveBeenCalledWith(0);
  });

  it("retreats index on ArrowLeft and wraps", () => {
    const onIndex = vi.fn();
    render(<Lightbox images={images} index={0} onClose={() => {}} onIndex={onIndex} />);
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(onIndex).toHaveBeenCalledWith(2);
  });
});
```

- [ ] **Step 2: Run the test to confirm it fails**

```bash
pnpm test tests/components/lightbox.test.tsx
```
Expected: 4 fail (1 passes — null branch).

- [ ] **Step 3: Implement the real lightbox**

Replace `src/components/sections/lightbox.tsx`:
```tsx
import { useCallback, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "../../../scripts/generate-gallery-manifest";

type Img = GalleryImage & { category: string };
type Props = {
  images: Img[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
};

export function Lightbox({ images, index, onClose, onIndex }: Props) {
  const open = index !== null;

  const advance = useCallback(
    (delta: 1 | -1) => {
      if (index === null || images.length === 0) return;
      const next = (index + delta + images.length) % images.length;
      onIndex(next);
    },
    [index, images.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") advance(1);
      if (e.key === "ArrowLeft") advance(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, advance, onClose]);

  if (!open) return null;
  const image = images[index];

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-5xl border-none bg-ink/95 p-0 text-paper">
        <div className="relative">
          <img src={image.src} alt={image.alt} className="mx-auto max-h-[85vh] w-auto" />
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => advance(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/10 p-2 hover:bg-pink"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => advance(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-paper/10 p-2 hover:bg-pink"
          >
            <ChevronRight className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-paper/10 p-2 hover:bg-pink"
          >
            <X className="size-5" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 4: Run the tests**

```bash
pnpm test tests/components/lightbox.test.tsx
```
Expected: 5 passed.

- [ ] **Step 5: Visual verification**

`pnpm dev`, click a gallery tile, confirm: image opens centered, Escape closes, arrow keys navigate and wrap, focus is trapped within the dialog (shadcn Dialog handles this). Stop the server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(gallery): lightbox with keyboard navigation and focus trap"
```

---

### Task 26: `<Testimonials>` section

**Files:**
- Create: `src/components/sections/testimonials.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/sections/testimonials.tsx
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { TESTIMONIALS } from "@/content/testimonials";

export function Testimonials() {
  return (
    <Section id="testimonials" className="bg-paper-warm/40">
      <Container>
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-pink">Kind words</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">What clients say</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <Card className="h-full border-muted-soft/60">
                <CardContent className="p-6">
                  <p className="font-display text-xl leading-snug">"{t.quote}"</p>
                  <p className="mt-4 text-sm text-muted">— {t.attribution}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs italic text-muted">
          (Quotes above are placeholders — replace before launch.)
        </p>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Wire into App.tsx, verify, commit**

```tsx
// inside <main>: ... <Gallery /><Testimonials />
```
```bash
pnpm dev   # verify
git add -A
git commit -m "feat(sections): testimonials with placeholder marker"
```

---

### Task 27: `<About>` section

**Files:**
- Create: `src/components/sections/about.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/sections/about.tsx
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { ABOUT } from "@/content/about";

export function About() {
  return (
    <Section id="about">
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <img
            src={ABOUT.portraitSrc}
            alt="Portrait of Carina Wilson, founder of Homemade Carolina"
            className="aspect-[4/5] w-full max-w-md rounded-md object-cover shadow-lg ring-1 ring-ink/10"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs uppercase tracking-[0.18em] text-pink">About</p>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{ABOUT.heading}</h2>
          <p className="mt-6 max-w-prose text-lg text-muted">{ABOUT.body}</p>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Wire, verify, commit**

```bash
pnpm dev   # confirm portrait + copy
git add -A
git commit -m "feat(sections): about"
```

---

### Task 28: `<Contact>` section

**Files:**
- Create: `src/components/sections/contact.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Implement**

```tsx
// src/components/sections/contact.tsx
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { CONTACT } from "@/content/contact";

export function Contact() {
  return (
    <Section id="contact" className="bg-ink text-paper">
      <Container className="text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-pink">Let's make something</p>
          <h2 className="mt-3 font-display text-4xl md:text-6xl">Get in touch</h2>
          <p className="mt-4 text-paper/80">
            Pick up the phone, send a note, or slide into the DMs — whatever's easiest.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-12 flex flex-col items-center gap-6 text-lg">
            <li>
              <a className="inline-flex items-center gap-3 hover:text-pink" href={`tel:${CONTACT.phoneE164}`}>
                <Phone className="size-5" />
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-3 hover:text-pink" href={`mailto:${CONTACT.email}`}>
                <Mail className="size-5" />
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-6">
              <a aria-label="Instagram" className="inline-flex hover:text-pink" href={CONTACT.instagram} target="_blank" rel="noreferrer">
                <Instagram className="size-6" />
              </a>
              <a aria-label="Facebook" className="inline-flex hover:text-pink" href={CONTACT.facebook} target="_blank" rel="noreferrer">
                <Facebook className="size-6" />
              </a>
            </li>
            <li className="mt-4 inline-flex items-center gap-2 text-sm text-paper/60">
              <MapPin className="size-4" />
              {CONTACT.shippingNote}
            </li>
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Wire, verify, commit**

```bash
pnpm dev   # confirm phone/mail are clickable, social links open
git add -A
git commit -m "feat(sections): contact"
```

---

## Phase 7 — SEO

### Task 29: Inject meta + JSON-LD into `index.html` and via runtime

**Files:**
- Modify: `index.html`
- Create: `src/components/seo-jsonld.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Add full meta block to `index.html`**

Replace the current `<head>` content (preserve the Google Fonts links from Task 6):
```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="theme-color" content="#FFFFFF" />

<title>Homemade Carolina · Custom apparel, drinkware, signs & gifts in Belmont, NC</title>
<meta name="description" content="Small-batch custom apparel, drinkware, signs, and gifts — printed, cut, and engraved in Belmont, NC. Personal commissions and small-business branding by Carina Wilson." />
<link rel="canonical" href="https://homemadecarolina.com/" />

<meta property="og:type" content="website" />
<meta property="og:title" content="Homemade Carolina · Custom apparel, drinkware, signs & gifts" />
<meta property="og:description" content="Small-batch custom products made by hand in Belmont, NC." />
<meta property="og:url" content="https://homemadecarolina.com/" />
<meta property="og:image" content="https://homemadecarolina.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Homemade Carolina" />
<meta name="twitter:description" content="Small-batch custom products made by hand in Belmont, NC." />
<meta name="twitter:image" content="https://homemadecarolina.com/og-image.png" />

<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

- [ ] **Step 2: Add a placeholder `og-image.png`, `favicon.ico`, `apple-touch-icon.png` to `public/`**

Use a simple branded placeholder for each. (Quick way: render the wordmark on a black or pink background at 1200×630 / 32×32 / 180×180 in any image tool, save into `public/`.)

- [ ] **Step 3: Implement `<SeoJsonLd>` runtime injector**

```tsx
// src/components/seo-jsonld.tsx
import { useEffect } from "react";
import { localBusinessJsonLd } from "@/lib/seo";
import { CONTACT } from "@/content/contact";

export function SeoJsonLd() {
  useEffect(() => {
    const json = localBusinessJsonLd({
      name: "Homemade Carolina",
      url: CONTACT.url,
      phone: CONTACT.phoneE164,
      email: CONTACT.email,
      city: CONTACT.city,
      region: CONTACT.region,
      country: CONTACT.country,
      description: CONTACT.description,
      priceRange: CONTACT.priceRange,
      socials: { instagram: CONTACT.instagram, facebook: CONTACT.facebook },
    });
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.text = JSON.stringify(json);
    document.head.appendChild(tag);
    return () => {
      document.head.removeChild(tag);
    };
  }, []);
  return null;
}
```

- [ ] **Step 4: Mount in `App.tsx`**

```tsx
import { SeoJsonLd } from "@/components/seo-jsonld";
// inside <>...</>: <SeoJsonLd />
```

- [ ] **Step 5: Verify**

```bash
pnpm dev
```
Open DevTools → Elements → confirm the `<script type="application/ld+json">` tag exists in `<head>` with the LocalBusiness payload. Stop the server.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(seo): meta tags + LocalBusiness JSON-LD"
```

---

### Task 30: Sitemap + robots.txt at build time

**Files:**
- Create: `scripts/generate-sitemap.ts`, `public/robots.txt`
- Modify: `package.json`

- [ ] **Step 1: Implement the sitemap generator**

```ts
// scripts/generate-sitemap.ts
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const URL = "https://homemadecarolina.com/";
const today = new Date().toISOString().slice(0, 10);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${URL}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

writeFileSync(join(process.cwd(), "public", "sitemap.xml"), xml);
console.log("sitemap.xml written");
```

- [ ] **Step 2: Create `public/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://homemadecarolina.com/sitemap.xml
```

- [ ] **Step 3: Chain sitemap into prebuild**

Update `package.json` `prebuild`:
```json
"prebuild": "tsx scripts/generate-gallery-manifest.ts && tsx scripts/generate-sitemap.ts"
```

- [ ] **Step 4: Verify**

```bash
pnpm build
ls public/sitemap.xml public/robots.txt
cat public/sitemap.xml
```
Expected: sitemap.xml lists the homepage URL with today's date.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(seo): build-time sitemap.xml and robots.txt"
```

---

### Task 31: Add `vite-react-ssg` for SEO prerendering

**Files:**
- Modify: `package.json`, `src/main.tsx`, `vite.config.ts`

- [ ] **Step 1: Install**

```bash
pnpm add vite-react-ssg
```

- [ ] **Step 2: Replace `src/main.tsx`** with the SSG entry pattern

```tsx
import { ViteReactSSG } from "vite-react-ssg/single-page";
import App from "./App";
import "./index.css";

export const createRoot = ViteReactSSG(<App />);
```

- [ ] **Step 3: Update `package.json` build script**

```json
"build": "tsx scripts/generate-gallery-manifest.ts && tsx scripts/generate-sitemap.ts && vite-react-ssg build"
```
And remove the now-redundant `prebuild` line (keep `predev` for the gallery manifest).

- [ ] **Step 4: Build and inspect output HTML**

```bash
pnpm build
```
Open `dist/index.html` in a text editor and confirm:
- The `<title>` is present
- The hero headline text appears in the static HTML body
- The JSON-LD `<script>` is present (if it isn't, mark this as Open Item — JSON-LD lives in `useEffect`, so SSG might not capture it. If missing, move JSON-LD into a static script tag in `index.html` populated at build time, OR move it to a `dangerouslySetInnerHTML` block rendered server-side. Document the chosen approach in README.)

- [ ] **Step 5: Verify dev still works**

```bash
pnpm dev
```
Expected: site still loads at http://localhost:5173.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(seo): prerender with vite-react-ssg"
```

---

## Phase 8 — A11y Hardening

### Task 32: Wire skip-to-content + audit focus order

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Confirm `<SkipToContent>` is the first interactive element rendered**

Verify `App.tsx` order:
```tsx
<SkipToContent />
<Header />
<main id="main">{/* sections */}</main>
<Footer />
```

- [ ] **Step 2: Manual keyboard tour**

`pnpm dev`, then:
- Press Tab from page load. The first focused element should be the skip link (visible).
- Press Enter on the skip link → scrolls/focuses to `#main`.
- Continue Tabbing: header logo → nav buttons → phone → mobile menu (hidden on desktop) → into hero CTAs → into each section.
- Confirm visible focus rings on every interactive element.

If any element is unreachable or has no focus ring, fix with `focus-visible:` Tailwind utilities.

- [ ] **Step 3: Test reduced-motion**

Set OS-level "Reduce motion" preference (macOS: System Settings → Accessibility → Display → Reduce motion). Reload site. Confirm:
- Hero stagger reveals are immediate fades (no rise)
- Photo collage is static
- Scribble underline appears immediately
- Lightbox open/close animations are instant

- [ ] **Step 4: Run Lighthouse**

In DevTools → Lighthouse → Mobile → Accessibility only. Goal: ≥ 95.

If below, inspect specific failures:
- Color contrast → adjust pink usage
- Missing labels → add `aria-label`
- Document any deviation in README under "Known a11y deviations"

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "chore(a11y): keyboard + reduced-motion + Lighthouse pass"
```

---

## Phase 9 — Final Compose & Polish

### Task 33: Final `App.tsx` composition

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Final composition**

```tsx
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Gallery } from "@/components/sections/gallery";
import { Testimonials } from "@/components/sections/testimonials";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { SeoJsonLd } from "@/components/seo-jsonld";

export default function App() {
  return (
    <>
      <SkipToContent />
      <SeoJsonLd />
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Gallery />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Full smoke test**

```bash
pnpm test
pnpm lint
pnpm build
pnpm preview
```
Open the preview URL. Walk the entire page top-to-bottom on desktop and (DevTools → Responsive) mobile. Confirm:
- Header sticks, scroll bar fills with pink as you scroll
- Each section reveals on scroll
- Service card hover reveals technique badges
- Gallery filter chips work + lightbox opens with keyboard nav
- All `tel:` and `mailto:` links work
- No console errors

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: final App composition with all sections"
```

---

### Task 34: README with dev + content-update instructions

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README**

```markdown
# Homemade Carolina

Small-business marketing site for Homemade Carolina (Belmont, NC).

## Stack
Vite · React 18 · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · vite-react-ssg

## Develop
```bash
pnpm install
pnpm dev          # http://localhost:5173
pnpm test         # vitest
pnpm lint
pnpm build        # produces dist/
pnpm preview      # serves dist/
```

## Adding gallery photos
1. Drop a JPG / PNG / WebP into the right category folder under `public/gallery/<category>/`. Categories: `apparel`, `drinkware`, `signs`, `gifts`, `commissions`.
2. Use a descriptive filename (e.g., `red-team-tee-front.jpg`) — it becomes the alt text base.
3. Commit and redeploy. The build runs `scripts/generate-gallery-manifest.ts` which regenerates `src/data/gallery.generated.ts` from the folder contents.

## Updating content
Plain TypeScript modules in `src/content/`:
- `hero.ts` — headline, subhead, CTA labels
- `services.ts` — 5 service categories, blurbs, technique badges
- `testimonials.ts` — quotes (placeholders by default)
- `about.ts` — Carina's bio
- `contact.ts` — phone, email, social URLs, location

Edit, commit, redeploy.

## Updating the logo
Replace `public/logo.png` (also `brand-assets/logo.png` for the source-of-truth copy).

## Updating brand colors / fonts
Edit `src/index.css` `@theme` block. Font links live in `index.html`.

## Deploying
Output is static `dist/`. Deploy to Vercel, Netlify, or Cloudflare Pages.
- Build command: `pnpm build`
- Output directory: `dist`
- Set custom domain `homemadecarolina.com` in the host's dashboard.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: README with dev + content-update instructions"
```

---

## Self-Review Notes

Spec coverage check:
- §1 Brand: Logo (Task 15), tone reflected in hero/services/about copy (Task 21) ✓
- §2 Goals: Direct contact only, no form (Task 28); LocalBusiness schema for local SEO (Tasks 8, 29) ✓
- §3 Site structure: All six sections (Tasks 22–28) + footer (Task 20) + sticky header (Task 18) + scroll progress bar (Task 19) ✓
- §4 Tech stack: Vite/React/TS (1), Tailwind v4 (2), shadcn (4), Framer Motion + lucide (4), vite-react-ssg (31), pnpm (1), gallery manifest script (7) ✓
- §5 SEO: Meta + OG + Twitter + favicon (29), JSON-LD (8, 29), sitemap + robots (30), prerender (31), semantic HTML (covered in section components), alt-text lint (3 jsx-a11y rules) ✓
- §6 A11y: Skip link (16), focus management (32), reduced-motion (10, 11, 32), lightbox focus trap (25 via shadcn Dialog) ✓
- §7 Content: All drafts in (21) ✓
- §8 Visual direction: Tokens placeholder (2) → applied (5, 6) ✓
- §9 Motion plan: Easing + durations (10), reveal hook (13), scroll progress bar (19), hero scribble + collage (22), service card hover (23), gallery + lightbox (24, 25), reduced-motion respected throughout ✓
- §10 Design exploration: Phase 0 note + Tasks 5, 6 absorb chosen variant ✓
- §11 Open items: Documented; non-blocking ✓
- §12 Out-of-scope: No form, no e-commerce, no calendar, no analytics — none scoped in plan ✓

No placeholders, no "similar to Task N" hand-waves, no orphan type names. Method/property names consistent across tasks (`scrollToAnchor`, `revealVariants`, `useReducedMotion`, `useScrollProgress`, `useReveal`, `localBusinessJsonLd`, `buildManifest`, `writeManifest`, `GALLERY`, `SERVICES`, `CONTACT`, etc.).
