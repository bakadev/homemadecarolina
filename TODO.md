# TODO · Pre-launch checklist

Items to address before going live at homemadecarolina.com.

## Brand assets

- [ ] **OG share image** — `public/og-image.png` (1200×630, brand wordmark on cream/black). Currently 404s; site still works but shares to Slack/iMessage/Twitter/Facebook will look generic.
- [ ] **Favicon** — `public/favicon.ico` (32×32, ideally 16×16 + 32×32 multi-res). Tab icon currently 404s.
- [ ] **Apple touch icon** — `public/apple-touch-icon.png` (180×180). iOS home-screen bookmark icon currently 404s.
- [ ] **(Optional) SVG logo** — provide an `.svg` version of the line-art logo so the header can scale cleanly to small sizes. Current PNG (`brand-assets/logo.png`, 500×500) loses fine line detail below ~80px and is currently rendered alongside a styled text wordmark in the header as a workaround.

## Content

- [ ] **Confirm social handles** in `src/content/contact.ts`:
  - `instagram: "https://instagram.com/homemadecarolina"` ← placeholder, confirm real handle
  - `facebook: "https://facebook.com/homemadecarolina"` ← placeholder, confirm real handle
- [ ] **Replace 3 placeholder testimonials** in `src/content/testimonials.ts` once real client quotes come in. Each has `placeholder: true` flagged for easy search.
- [ ] **Real product photos** — replace stock placeholders in `public/gallery/<category>/`. Drop new JPG/PNG/WebP into the right category folder. Categories: `apparel`, `drinkware`, `signs`, `gifts`, `commissions`. Filenames become alt-text base, so use descriptive names (e.g., `red-team-tee-front.jpg`).
- [ ] **Real about portrait** at `public/about/portrait.jpeg` (current placeholder is the existing image but a launch-quality studio portrait would be ideal).

## Hosting & domain

- [ ] **Pick host** — Vercel, Netlify, or Cloudflare Pages all work for this static build. Recommended: Vercel (1-click deploy, free tier covers a small business site).
- [ ] **Wire custom domain** `homemadecarolina.com` in the host's dashboard.
- [ ] **Build settings:**
  - Build command: `pnpm build`
  - Output directory: `dist`
  - Node version: 20+

## Quality gates

- [ ] **Lighthouse a11y audit** — run on the deployed site (Mobile profile). Target ≥ 95. Investigate any flagged contrast or label issues.
- [ ] **Real-browser keyboard tour** — tab through the page from skip-link → header → CTAs → gallery → lightbox arrows → contact links. Confirm visible focus rings on every interactive element.
- [ ] **Reduced-motion check** — toggle macOS System Settings → Accessibility → Display → Reduce motion. Reload site. Confirm hero stagger reveals are immediate fades, photo collage is static, scribble underline appears immediately.
- [ ] **Email + phone tap test** on a real phone — make sure `tel:+17044882918` and `mailto:carina@homemadecarolina.com` open the right apps.
- [ ] **OG/Twitter preview** — paste the deployed URL into a Slack/Discord chat and confirm the preview card renders correctly (depends on og-image being uploaded above).

## Optional enhancements (not blocking launch)

- [ ] Vendor-fair calendar / "Find me at..." block — currently out of scope per spec
- [ ] Google Search Console verification + sitemap submission
- [ ] Analytics — Plausible (~$9/mo, privacy-first) or Google Analytics 4 (free, requires cookie banner)
- [ ] Newsletter signup form (e.g., ConvertKit / Mailchimp embed)

## Maintenance notes (for future me)

- Gallery photos auto-populate via `scripts/generate-gallery-manifest.ts` — drop files in `public/gallery/<category>/`, redeploy.
- Brand colors / fonts live in `src/index.css` `@theme` block.
- All copy is in `src/content/*.ts` modules.
