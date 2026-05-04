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

## Open items pre-launch

- Real `og-image.png` (1200×630) at `public/og-image.png`
- Real `favicon.ico` at `public/favicon.ico`
- Real `apple-touch-icon.png` (180×180) at `public/apple-touch-icon.png`
- Confirm Instagram + Facebook URLs in `src/content/contact.ts`
- Replace 3 placeholder testimonials in `src/content/testimonials.ts` once real client quotes come in
- Optional: SVG logo variant for cleaner header scaling (current PNG is 500×500 line art that loses detail at small sizes)
- Real product photos to replace the stock placeholders in `public/gallery/`
- Lighthouse a11y audit on real browser (target ≥95)
