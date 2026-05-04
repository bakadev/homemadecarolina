# Homemade Carolina — Website Design Spec

**Date:** 2026-05-03
**Owner:** Carina Wilson (business owner) · Travis Wilson (engineering)
**Status:** Approved (brainstorming complete) — pending implementation plan

---

## 1. Business & Brand

- **Business name:** Homemade Carolina
- **Owner:** Carina Wilson
- **Location:** Belmont, NC (with national shipping)
- **Phone:** (704) 488-2918
- **Email:** carina@homemadecarolina.com
- **Social:** Instagram + Facebook (handles to be confirmed at build time)
- **Domain:** homemadecarolina.com
- **What she does:** Small-batch custom products produced in-studio using DTF printer, UV printer (flatbed + rotary + UV-DTF), Cricut cutting machine, and laser engraver
- **Audience:** Small business owners (branded apparel, drinkware, packaging, promo) and personal commissions (gifts, weddings, memorials, one-offs)
- **Tone:** Professional and friendly — warm, made-by-a-human, never corporate

## 2. Goals

- **Primary visitor action:** Direct contact (call, email, or social DM). No quote form.
- **Secondary goal:** Showcase a body of work that builds trust before the contact action.
- **Local SEO:** Rank for Belmont, NC + surrounding metro searches for terms like _custom shirts Belmont_, _engraved tumblers Charlotte_, _small business branding North Carolina_.
- **Out of scope for v1:** E-commerce, online ordering, blog, customer portal, vendor-fair calendar, contact form.

## 3. Site Structure

Single-page scroll site with anchor navigation. **Six sections in order:**

1. **Hero**
2. **Services** (use-case framed, not machine-framed)
3. **Gallery**
4. **Testimonials** (placeholder quotes at launch)
5. **About** (Carina's story)
6. **Contact**

Sticky header with brand wordmark + anchor nav + phone CTA. Scroll-progress bar tints pink across the top of the header as visitor scrolls. A persistent footer sits below Contact (not a scrolling section, always-rendered).

### Section content

#### Hero

- Eyebrow tag (small caps, pink)
- Display headline (chosen from 3 drafted options — see §7)
- Body subhead (1 sentence, location + service summary)
- Two CTAs: pink pill `Get a quote` (smooth-scrolls to Contact) + ghost link `(704) 488-2918`
- Off-grid placeholder photo collage with subtle rotation, gentle continuous float

#### Services

- Section heading + 1-line intro
- 5 use-case cards in an asymmetric stagger layout:
  | Card | Blurb | Technique badges |
  |---|---|---|
  | **Apparel & Accessories** | Full-color shirts, hoodies, tote bags, hats, and bandanas — vibrant on any fabric color, soft to the touch, built to last 50+ washes. | DTF · Cricut HTV · Heat press |
  | **Drinkware** | Tumblers, water bottles, wine glasses, and mugs with full-color wraps or permanent etched designs. | UV (rotary) · Laser · Cricut vinyl |
  | **Signs & Decor** | Wood signs, acrylic plaques, slate pieces, and event signage — engraved, printed, or both. | Laser · UV flatbed · Cricut |
  | **Promo & Corporate Gifts** | Branded keychains, drinkware, leather goods, packaging, and matching apparel for events, launches, and gifting. | UV · Laser · DTF · Cricut |
  | **Personal Commissions** | Wedding decor, memorial pieces, custom gifts, and one-off ideas — bring me your concept and we'll make it. | All four machines |
- Each card: 2–3 placeholder image previews, blurb, technique badges revealed on hover

#### Gallery

- Section heading + filter chips: `All / Apparel / Drinkware / Signs / Gifts`
- Masonry grid of mixed work, all placeholders at launch
- Click → lightbox (focus-trapped, Escape to close, arrow-key navigation)
- Source: `/public/gallery/<category>/` folders. Drop new images, redeploy.

#### Testimonials

- 3-up card row
- Placeholder quotes clearly marked (e.g., _"[Glowing review goes here] — Future Happy Client"_)
- Carina supplies real quotes post-launch as they come in

#### About

- Portrait spot (placeholder) + body copy:
  > Hi, I'm Carina Wilson. I love to create and make things — from a quick custom gift for a friend to a full branding kit for a small business getting off the ground. Homemade Carolina started at vendor fairs around the Carolinas, and has grown into small-batch print, cut, and engraving work for personal commissions and growing local brands. Every piece I ship is made by hand in my Belmont, NC studio.
- No vendor-fair schedule (mentioned in copy only)

#### Contact

- Carina Wilson
- Phone: (704) 488-2918 — `tel:` link
- Email: carina@homemadecarolina.com — `mailto:` link
- Instagram + Facebook icons → external links
- Line: _Based in Belmont, NC · Shipping nationwide_
- No form

#### Footer

- Wordmark + tagline
- Anchor nav (Services / Gallery / About / Contact)
- Social icons
- © 2026 Homemade Carolina · Belmont, NC

## 4. Technology Stack

| Layer      | Choice                                                                         | Notes                                                                                            |
| ---------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Framework  | **Vite + React 18 + TypeScript**                                               | Per user preference                                                                              |
| Styling    | **Tailwind CSS v4**                                                            | Brand tokens defined in `@theme` block                                                           |
| Components | **shadcn/ui**                                                                  | Button, Card, Dialog (lightbox), NavigationMenu, Sheet (mobile nav), Toggle Group (filter chips) |
| Motion     | **Framer Motion** with `LazyMotion`                                            | Keeps bundle small                                                                               |
| Icons      | **lucide-react**                                                               | Instagram, Facebook, Phone, Mail, MapPin, Menu, X                                                |
| Routing    | None — vanilla `Element.scrollIntoView({ behavior: 'smooth' })` for anchor nav | No router needed for a single-page scroll site                                                   |
| Prerender  | **vite-react-ssg**                                                             | Static HTML for SEO at build time                                                                |
| Tooling    | pnpm, ESLint, Prettier, TypeScript strict                                      | Node 20+                                                                                         |
| Hosting    | Deferred — pick at launch                                                      | Vercel / Netlify / Cloudflare Pages all fine                                                     |

### Image management

- Photos live in `/public/gallery/<category>/`
- Build script enumerates files at build time → generates a typed manifest the Gallery component consumes
- Carina (or maintainer) drops new images in the right folder, commits, redeploys

## 5. SEO

- Prerender single page to static HTML via `vite-react-ssg` so crawlers see real content
- Meta in `index.html`: title, description, canonical, Open Graph, Twitter card, theme-color
- 1200×630 OG image (placeholder using brand wordmark, replaceable)
- Favicons + Apple touch icon
- `sitemap.xml` and `robots.txt` generated at build
- **JSON-LD `LocalBusiness` schema** — name, address (Belmont, NC + ZIP), phone, email, `sameAs` (Instagram, Facebook), `serviceArea` (Belmont metro + national shipping note), `priceRange`, opening hours (placeholder values, easy to edit)
- Semantic HTML5: one `<h1>` (hero), `<h2>` per section, `<header>/<main>/<section>/<article>/<footer>` landmarks
- Required `alt` text on every image (lint rule)

## 6. Accessibility (best-effort, target Lighthouse a11y 95+)

- WCAG 2.1 AA color contrast — pink accent paired carefully against black/white surfaces
- Visible focus rings on all interactive elements; skip-to-content link
- `prefers-reduced-motion: reduce` honored across all motion (fades-only fallback or motion disabled)
- Lightbox traps focus, Escape closes, focus restored on close
- Mobile nav drawer fully keyboard-accessible (shadcn Sheet)
- ARIA labels on icon-only buttons (social icons, nav toggle)
- Semantic landmarks throughout

## 7. Content (drafts)

### Hero headline (chosen)

**"Small batch. Big _love_."** — _love_ set in Caveat script with hot-pink scribble underline.

Subhead: _Custom shirts, tumblers, signs, and one-of-a-kind gifts for small businesses and the people you love. Small-batch, from Belmont, NC._

Eyebrow: `BELMONT, NC · SMALL BATCH`

### Service blurbs and technique badges

See table in §3 → Services.

### About copy

See draft in §3 → About.

### Testimonial placeholders

- Three placeholder quotes attributed to "Future Happy Client" or similar — clearly marked so they aren't shipped to production unedited.

## 8. Visual Design Direction — "Playful Crafted" → **Variant A · Studio Note (selected)**

Approved direction. Personal, warm, made-by-a-human feel. Big serif display paired with a script accent for select words. Asymmetric layouts. Hot-pink as a warm splash, not a corporate stamp. Cream background for warmth.

### Brand colors (locked tokens)

| Token               | Hex       | Role                                               |
| ------------------- | --------- | -------------------------------------------------- |
| `--color-ink`       | `#1a1310` | Warm off-black; foreground/type/inverse surfaces   |
| `--color-paper`     | `#FAF7F2` | Warm cream; default surface                        |
| `--color-paper-2`   | `#F2EDE4` | Slightly deeper cream; alt section background      |
| `--color-pink`      | `#EC4899` | Hot-pink accent; CTAs, scribble underline, eyebrow |
| `--color-pink-soft` | `#FBD5E5` | Pink tint; hover states, soft fills                |
| `--color-muted`     | `#7A6E66` | Body-text muted variant                            |
| `--color-rule`      | `#D9D2C7` | Hairline rules, card borders                       |

The strict B/W/pink brand identity is honored — these are the tonal-warm refinements, not new brand colors.

### Typography (locked, all Google Fonts)

| Role                                       | Family       | Weights / Axes                                          |
| ------------------------------------------ | ------------ | ------------------------------------------------------- |
| Display (headlines)                        | **Fraunces** | variable, `opsz 9..144`, `wght 300..900`, `SOFT 0..100` |
| Script accent (love, hand, Carolina, etc.) | **Caveat**   | `400`, `700`                                            |
| Body text                                  | **Inter**    | `400`, `500`, `600`                                     |

Google Fonts link:

```
https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,300..900,0..100&family=Caveat:wght@400;700&family=Inter:wght@400;500;600&display=swap
```

### Logo

- File: `brand-assets/logo.png` (existing 500×500 PNG line illustration, also copied to `public/logo.png`)
- **Header treatment**: paired icon (`h-9 w-9`) + styled text wordmark — `Homemade <Caveat-script-pink>Carolina</>` — because the line strokes go sub-pixel below ~80px
- **Footer treatment**: full logo at `h-24` (works at this size)
- **Open item flagged**: provide an SVG version so the line-art can scale cleanly to small header sizes; until then, the icon+text wordmark hybrid is the live treatment

## 9. Motion Plan ("polished + tasteful")

**Global rules**

- Honor `prefers-reduced-motion: reduce` everywhere (fall back to instant fades or no motion)
- Default easing: cubic-bezier `(0.22, 1, 0.36, 1)`
- Reveal duration ~600ms, hover ~200ms, ambient ~1200ms+
- Reveals fire once at 20% in-view, never re-fire on scroll-back
- Animations pause when tab is backgrounded
- Only `transform` and `opacity` (no layout thrash); `will-change` only on actively-animating elements

**Hero**

- Stagger-in of wordmark, eyebrow, headline, subhead, CTAs (~80ms apart, ~900ms total)
- Script-accent word draws its pink underline scribble via SVG `pathLength` after headline lands
- Photo collage: continuous slow ±4px float per photo with offset phases (8–12s loop)
- Hover: photo lifts and rotates to 0deg

**Sticky header**

- Pink-tinted scroll progress bar across top
- Header padding shrinks 24px → 12px once past hero

**Section reveals**

- Heading + intro fade + rise (`y+24px → 0`, opacity 0 → 1)
- Service cards stagger left-to-right within row (100ms apart)
- Gallery tiles cascade in (100ms apart, batches of 8)

**Hover micro-motions**

- Pink CTA: ink-bleed fill from cursor, 250ms
- Service cards: lift `-4px`, image scale 1.02, technique badges slide up from below title
- Gallery tiles: zoom + pink corner overlay with category tag fade-in
- Filter chips: pill morph + pink fill with soft spring on active
- Social icons: bounce + pink color shift

**Lightbox**

- Backdrop fade 200ms; FLIP-style image scale from origin 350ms
- Arrow keys + swipe nav; 250ms slide between images
- Reverses to origin on close

**Page-load polish**

- 400ms pink wipe panel slides off the screen, revealing hero (skipped on reduced motion)

## 10. Design Exploration — Completed (2026-05-03)

Three variants generated as standalone HTML hi-fi prototypes in `design-exploration/`:

- Variant A — Studio Note (Fraunces + Caveat, cream, hot-pink) — **SELECTED**
- Variant B — Boutique Tag (Space Grotesk + Instrument Serif Italic, white, dusty-rose)
- Variant C — Maker Marquee (Bricolage Grotesque + Homemade Apple, off-black hero, neon-pink)

**Carina's tweaks (already applied to the live Variant A):**

- Headline switched to **"Small batch. Big _love_."** (Variant B's headline, with _love_ in Caveat script + pink scribble underline) — Variant B's product-listing subhead also adopted
- Personal Commissions service card widened to **`md:col-span-2 lg:col-span-2`** (Variant B's pattern)
- "Made by hand" mentions reduced to a single use in About copy (brand essence)
- Gallery filter chips wired to functional vanilla-JS toggle (verified via Playwright: All=8, Apparel=2, Drinkware=2, Signs=2, Gifts=2)
- Real placeholder photos integrated into hero collage, service cards, gallery, and About portrait

The locked tokens in §8 reflect these final choices. The HTML prototype at `design-exploration/variant-a-studio-note.html` is the visual reference for the React build.

## 11. Open Items (to confirm at build time, not blocking)

- Exact Instagram + Facebook handles
- Studio ZIP / street-level address granularity for `LocalBusiness` schema (or just city + region)
- Real testimonial quotes (post-launch)
- Final hosting choice
- Whether the existing `brand-assets/logo.png` is the final mark or alternate variants are needed (e.g., SVG, inverted-on-dark, wordmark-only)
- Real product photos (post-launch)

## 12. Out of Scope (explicit)

- E-commerce / cart / checkout
- Quote or contact form (direct contact only)
- Vendor-fair calendar
- Blog / CMS
- Multi-language
- Customer login
- Analytics (deferred — none for v1)
- Real-time inventory or stock display
