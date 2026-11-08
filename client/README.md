# Tayyab Tariq: portfolio

Personal site for Tayyab Tariq, full-stack developer. Live at
[tayyabtariq.vercel.app](https://tayyabtariq.vercel.app).

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.
Every page is a server component and prerendered at build time; the only
client code is small interactive pieces (mobile menu, work filter, gallery
lightbox, contact form, marquee pause).

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (also typechecks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript rules) |
| `npm run check:assets` | Fails if any `/images/...` path in `src/` is missing or has the wrong letter case. Vercel's filesystem is case-sensitive, so these only break in production. |

## Editing content

Content lives in typed data files, not in the pages:

| File | Contents |
| --- | --- |
| `src/data/profile.ts` | Name, role, location, email, links, availability, résumé and portrait paths |
| `src/data/projects.ts` | Projects: summary, stack, cover, gallery, problem, approach, features, learnings. `featured: true` puts a project on the home page. |
| `src/data/stack.ts` | The "What I work with" groups and the marquee list |
| `src/data/timeline.ts` | Education and work history for the About page |

Images go in `public/images/projects/<slug>/` or `public/images/profile/`.
Every project image needs its real `width`, `height`, descriptive `alt`, and a
`kind`: `"screenshot"` for the real product or `"illustration"` for artwork.
Pages without screenshots caption their illustration as such. Run
`npm run check:assets` after adding or renaming images.

## Contact form

The form sends email through [Resend](https://resend.com) from a Server
Action (`src/app/contact/actions.ts`) using plain `fetch`; there is no SDK
dependency. Set these in Vercel (and in `.env.local` for local testing):

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key |
| `CONTACT_TO_EMAIL` | yes | Where messages are delivered |
| `CONTACT_FROM_EMAIL` | no | Sender on a domain verified in Resend. Defaults to Resend's test sender, which only delivers to the Resend account owner's address. |

The contact page is static, so it reads these at build time: **redeploy after
adding or changing them**. Without the two required variables the page shows
a direct email link instead of the form, so it can never fake a "sent".

Spam protection is a honeypot field plus a per-IP limit of 5 messages per 10
minutes. The limit lives in memory, so on serverless hosting it's
best-effort (each instance counts separately).

## Design system

The visual design follows the reference images in the repository root
(`image*.png`): white and light-grey sections, near-black bands (the home
hero and "why work with me"), one orange accent, bold geometric headings in
Outfit, uppercase pill buttons with a round icon "knob", orange eyebrow labels
with a sparkle, numbered service cards with a notched "+" corner, and large
rounded project tiles.

- Tokens (color, type scale, radii, motion) are in `src/app/globals.css`
  under `@theme`, so they work as Tailwind utilities (`bg-ink`, `bg-surface`,
  `text-muted`, `text-brand`, `text-h2`, `rounded-card`).
- Orange comes in three steps for contrast: `brand` (#F45B16, the reference
  orange) for fills, icons, large text and text on dark; `brand-strong` for
  buttons with white text; `brand-text` for small orange text on light.
- Fonts: Outfit for headings, Geist for text, both via `next/font`.
- Shared primitives: `src/components/ui/` (Button, Eyebrow, Section,
  SectionHead, MediaFrame, Tag, StatusDot, CopyButton, ArrowLink).
- Page sections: `src/components/home/` (Hero, Marquee, AboutIntro,
  Services, WhyChoose, RecentWork), reused on About.
- Services shown on the home page live in `src/data/services.ts`.

Motion: only the stack marquee moves without user input (with a pause
button); everything else responds to an action. Only `transform` and
`opacity` animate, and `prefers-reduced-motion` stops all movement.

## Accessibility and quality bar

WCAG 2.1 AA: text contrast ≥ 4.5:1 on both surfaces, visible focus on every
control, a skip link, 44px minimum targets, a native `<dialog>` for the menu
and lightbox (focus trap and Esc), labelled form fields with inline errors,
and a pause button for the marquee. Lighthouse (mobile) after the reference-matched redesign: Performance
91–98, Accessibility, Best Practices and SEO 100 on every page.

## SEO

Per-page titles, descriptions and canonical URLs; generated social preview
images (`src/app/opengraph-image.tsx` and one per project, rendered by
`src/app/_og/render.tsx` with the bundled Outfit font, SIL Open Font
License); `sitemap.xml`, `robots.txt` and a JSON-LD `Person` record.
