# Portfolio Redesign: Audit and Phased Roadmap

> **Status (2026-11-07):** Approved. Phase 0 done (`redesign` branch, build passes, lint baseline 22 errors / 8 warnings in the old pages). Phase 1 done and committed (`cba7072`). Phase 2 done, not yet committed: `src/data/{projects,stack,timeline,profile}.ts`, assets reorganized under `public/images/{projects,profile}/`, `npm run check:assets`. Phase 3 done, not yet committed: `src/components/shell/*` (Header, NavLinks, MobileMenu on `<dialog>`, Footer, SkipLink), `<main id="main">` in the layout, `app/not-found.tsx`; old Navbar/Footer removed. Deviation: the active nav item uses a static signal underline instead of a framer-motion `layoutId` slide, to keep framer-motion out of the shell. Phase 4 done, not yet committed: home page rebuilt as a server component (`Hero` type-only, chosen over the portrait variant; `StackMarquee` with a pause button for WCAG 2.2.2; `SelectedWork` + `ProjectTile`; `StackList` band). No separate ContactCta on home: the footer is the closing CTA. Phase 5 done, not yet committed: Work index (server page; CSS-driven `ProjectFilter` synced to `?type=`), case studies statically generated (`generateStaticParams`, `dynamicParams = false`, `generateMetadata`), `Gallery` with `<dialog>` lightbox, `ProjectPager`. Deferred to Phase 8: View Transition from tile to case hero (needs Next's experimental flag). Phase 6 done, not yet committed: About as a server page (`about/Portrait`, `about/Timeline`), bio tightened to two paragraphs, skills list kept on Home only (the plan's "reuse StackList" conflicted with its own "no repeated skills" criterion). Unused legacy CSS (`glass-pill`, `glass-card`, `pulse-glow-dot`) removed. Phase 7 done, not yet committed: Contact page + `ContactForm` (`useActionState` with permalink, works pre-hydration) + `contact/actions.ts` Server Action + `contact/config.ts`. Deviation: no `resend` package; the action calls Resend's REST API with built-in `fetch` (zero new dependencies). Env: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, optional `CONTACT_FROM_EMAIL`; the page is static, so redeploy after setting them. Without them the page shows an email fallback, never a form. All legacy CSS removed; `npm run lint` clean project-wide. Phase 8 done, not yet committed: framer-motion uninstalled (with `src/lib/motion.ts`); hover image drift capped at 300ms (`--duration-media`); hero load sequence tightened to land by 940ms (measured). Tile-to-case View Transition NOT implemented: Next 16.1 only offers it via `experimental.viewTransition`, which runs the app on React's experimental channel; revisit when stable. Found: `npm audit --omit=dev` reports a critical advisory for next 16.1.1 (fixed after 16.4.0); upgrade is a Phase 9 decision. Phase 9 in progress: next and eslint-config-next upgraded to 16.4.5 (prod audit: 0 vulnerabilities; 14 remain in dev-only tooling); sitemap, robots, per-page and per-project Open Graph images (bundled Bricolage TTF), icon.svg, JSON-LD Person; per-page openGraph/canonical (layout no longer leaks home values); a11y review fixes (hero accessible name, new-tab warning on external Buttons, all targets ≥ 44px); README rewritten. Lighthouse mobile on the final build: Performance 91–94, Accessibility/Best Practices/SEO 100 on all five page types. A pre-redesign Lighthouse baseline was never captured.

## Context
Tayyab's portfolio (Next.js, deployed at tayyabtariq.vercel.app) uses a generic "dark glass + cyan/purple gradient" look. Every page is one large client component, the project data is duplicated, some image paths are broken, and the contact form is fake. Six reference screenshots in the repo root (a "digitos" agency template) set the new direction: confident geometric type, orange as the single accent, large rounded containers, a marquee band, and section heads split into a heading and a short intro. The goal is a distinctive, dark-led, premium developer portfolio, built in phases on a new `redesign` branch.

**Decisions confirmed with you:** new `redesign` branch off `main` • dark-led theme with light accents • real contact form using a Server Action and Resend.

---

## 1. Current project architecture (verified)

| Item | Finding |
|---|---|
| Git | On **`main`**, up to date with origin. Clean except the 6 untracked reference PNGs. **No `redesign` branch exists.** (The session's start-up snapshot named a different branch and file list; the live repo doesn't match it.) |
| App root | `client/` (the repo root holds only `client/` and the reference images) |
| Framework | Next.js **16.1.1** (App Router), React **19.2.3**, TypeScript 5 (strict), path alias `@/* → src/*` |
| Styling | Tailwind CSS **v4** via `@tailwindcss/postcss`. Tokens are only `--background/--foreground` in `src/app/globals.css`. No `tailwind.config` (v4 CSS-first). |
| Deps | `framer-motion` ^12, `lucide-react` ^0.562. Nothing else. |
| Config | `next.config.ts` (empty), `eslint.config.mjs` (next core-web-vitals + TS), `postcss.config.mjs` |
| Fonts | Geist + Geist Mono via `next/font/google` (`src/app/layout.tsx`) |
| Routes | `/` `src/app/page.tsx` (464 lines) • `/about` (417) • `/projects` (270) • `/projects/[projectId]` (548) • `/contact` (193) |
| Shared | `src/components/Navbar.tsx`, `src/components/Footer.tsx`. No other components and no `ui/` layer. |
| Assets | `public/images/`: 22 files, 5.2 MB. Next starter SVGs still in `public/` (`file/globe/next/vercel/window.svg`). `favicon.ico` is the Next default. |
| Tests | None. No test runner, no CI config. |

## 2. Existing portfolio audit

### A. UI/UX
- **Hierarchy is flat.** Every section uses the same pattern (centered eyebrow, `font-black` H2, muted paragraph, grid of `glow-card`s). Nothing stands out, so nothing is memorable. (`page.tsx`, `about/page.tsx`)
- **The visual identity is generic.** The cyan→blue→purple gradient text, glassmorphism, mesh gradient, grain overlay and pulsing "Available" dot are the stock "dev portfolio" kit. The name in the logo is gradient text (`Navbar.tsx:20`).
- **Content repeats.** The same three stats (3+/10+/12+) appear on Home and About. Skills appear as Home badges, Home services, About values and About expertise, which are four overlapping lists. The stats aren't backed by evidence.
- **The home page includes a fake code block** (`page.tsx:323-352`, `SystemArchitecture.scaleSystem`). It's decorative and not real work, which undercuts credibility.
- **Navigation:** there's no mobile menu. 4 links plus a CTA are squeezed into a 92%-wide pill (`Navbar.tsx:17`), so they crowd at 360px. "Let's Talk" duplicates the Contact link. The footer links to `/#services`, but Services isn't in the nav.
- **Typography:** many labels at `text-[10px]`/`text-[9px]` (below the legibility floor), heavy use of `font-black`, and line lengths aren't controlled in places.
- **Contrast:** `text-gray-500/600` on `#030303` for labels and the footer (`Footer.tsx:89`) is borderline or failing for small text. `placeholder:text-gray-700` on the form fails.
- **Buttons are inconsistent:** at least 6 different button recipes (white→gradient hover, gradient fill, ghost border, glass pill, LinkedIn-blue hover), and `hover:scale-105` everywhere.
- **The contact page** has an empty header `<section>` (`contact/page.tsx:36-38`), and the page has no H1.

### B. Frontend architecture
- **Every page is `"use client"`** (all 5 routes), even though most content is static. That ships framer-motion and React hydration for content that could render on the server. It hurts LCP/TBT and blocks per-page `metadata`.
- **Project data is duplicated and has drifted:** `projectsData` (`projects/page.tsx:9`) and `projectsDB` (`projects/[projectId]/page.tsx:14`) disagree on Harmoni's GitHub link (`#` vs `github.com/yourusername/harmoni`, a placeholder) and on ClientBridge's tech stack.
- **Broken images:** the detail page references `/images/covid-main.png`, `/images/covid-stats.png` and `/images/weather-home.png`, which don't exist, and `/images/Cbmessage.png` while the file is `CBmessage.png`. The case mismatch 404s on Vercel's case-sensitive filesystem.
- **Unused assets:** `CBProjChat/File/Mil.png`, plus the Next starter SVGs.
- **Dynamic route** uses `useParams` on the client. There's no `generateStaticParams`, no `notFound()` (it renders a custom inline 404 with status 200), and no per-project metadata.
- **SEO:** `metadata` is still "Create Next App" (`layout.tsx:17-20`). No sitemap, robots, OG image or canonical.
- **Duplicated code:** `fadeInUp`/`staggerContainer` variants are copied into 5 files, with `ease: [...] as any` (type escape) in each. Tag-color logic lives only in `projects/page.tsx:53`. The CTA block is duplicated (Home and About).
- **Styling:** colors are hard-coded utilities (`cyan-400`, `purple-500`, `#0a0a0c`, `#030303`, `#050505`) across 50+ sites. There's no token layer, so a re-theme means touching every line.
- **Animation:** every section fades and slides up, `animate-pulse` runs on the "Work." heading (`projects/page.tsx:217`), an infinite `animate-ping` runs on the badge, and a 40s spinning ring runs on About. No `prefers-reduced-motion` handling anywhere. The ProjectCard spotlight calls `setState` on every `mousemove`, which re-renders the card on every pointer frame (`projects/page.tsx:82`).
- **Performance:** `priority` is set on every project card image (`projects/page.tsx:129`) and on the second home image. `clientbridge.png` is 2.5 MB. `Tayyab.jpg` is 400×400 but displayed at up to 384 CSS px, so it's soft on 2× screens. `backdrop-filter` and `background-attachment: fixed` stack on large areas, which is costly on mobile. A fixed full-screen SVG-noise `::before` sits at z-index 9999.
- **Accessibility:** form labels aren't associated with inputs (no `htmlFor`/`id`, `contact/page.tsx:130`). Icon-only links (GitHub/LinkedIn) have no accessible name. The carousel prev/next buttons have no `aria-label` (`[projectId]/page.tsx:302`). The lightbox has no focus trap, no Esc to close and no `role="dialog"`. There's no skip link. Carousel dots are `div`s and can't be operated.
- **The contact form is fake:** a `setTimeout` reports "Message Sent!" while delivering nothing (`contact/page.tsx:24-30`). That's a trust bug.

### C. Areas that need a complete redesign rather than a restyle
The home hero, the services bento, the fake code block, the About stats and values, the project card, the contact page and the footer. The useful things to keep: the content itself (bio, education, project problem/solution/features/learnings), the screenshots, the lightbox idea, the filter idea, and the nav `layoutId` indicator concept.

## 3. Reference image analysis
All six screenshots come from one commercial agency template ("digitos"). They're useful as a vocabulary, not as something to copy. Agency-only parts (stock photos, phone CTA, color-switcher widget, signature block, map) don't fit a developer.

| # | Section | What it shows | Use |
|---|---|---|---|
| `image.png` | Hero (dark) | Huge 3-line geometric-sans headline (Outfit-like, ~80px, tight leading), small orange eyebrow, pill CTA with a circular icon "knob", a floating data card over a portrait, a ghost "DIGITOS" word vertical at the right edge, and a **full-width orange marquee band** ("STRATEGY FIRST ✳ BUILT FOR GROWTH") closing the hero. | **Adopt** the marquee band and the knob CTA. **Adapt** the huge headline and the floating card (make it a real project metric or system snippet). **Avoid** the stock portrait pose and the ghost vertical word. |
| `image copy.png` | About (light) | Organic pill/arch photo masks, a 4-point star ornament, split head (eyebrow, H2, paragraph), 2 icon features, a dark inset strip with check items, and a signature. | **Adapt** the arch/pill image mask for the single portrait. **Avoid** the collage, the signature and lorem-style features. |
| `image copy 2.png` | Services (light) | Head split into a left H2 and a right intro paragraph. 4 tall cards with a line icon, a ghost number "01.", an image and a **notched bottom-right corner holding a round "+" button**. | **Adopt** the split section head. **Adapt** the notched-corner button as the signature card detail for project cards. **Avoid** the numbering (the services aren't a sequence; the cards are even mis-ordered 04/01/02/03) and the stock images. |
| `image copy 3.png` | Why us (dark band) | Inset rounded dark band with **orange arc shapes bleeding off the edges**, a big "98%" stat over a photo, a list of 3 rows (icon, title, description) separated by hairlines, and a 3D chrome object. | **Adapt** the rounded inset dark/accent band and the hairline-divided row list (good for experience and approach). **Avoid** the vanity stat, the chrome blob and the decorative arcs. |
| `image copy 4.png` | Contact (light) | 3 info cards (address/phone/mail), then a big rounded container with a map on the left and a form on the right, with filled inputs and a full-width black button. | **Adapt** the 2-column contact container (replace the map with availability, response time and direct links). **Adopt** the filled-input style. **Avoid** the map, the phone and the address cards. |
| `image copy 5.png` | Projects (light) | 2-column grid of large rounded image tiles. Title and category below, plus a round black arrow button. Very minimal. | **Adopt** the image-first 2-column grid with a caption row and a round arrow button. **Adapt** it with a real stack and role metadata. |

**What sets the new direction apart from the current site:** solid fills instead of glass, one accent instead of a 3-color gradient, type scale and big rounded containers doing the work instead of glow, and real content instead of decoration.

## 4. Skills evaluation (verified on disk and in the skill registry)
| Requested | Status | Use |
|---|---|---|
| **Frontend Design** | ✅ Installed (`frontend-design:frontend-design` 1.1.1). **Loaded and read.** | Its guidance shaped Section 5: spend boldness in one place, no stock "eyebrow + gradient word" headlines, numbering only for real sequences, one orchestrated motion moment, a token-first plan with a self-review. It specifically flags **"near-black + single vermilion accent"** as a generic tell, which is exactly where the references and the dark-led choice point. Mitigation is in Section 5. |
| **UI/UX Pro Max** | ❌ Not installed (no matching skill in the registry or `~/.claude`). | Not used. The nearest available substitutes: `design:design-system`, `design:design-critique`, `design:ux-copy`. |
| **Emil Kowalski** | ❌ Not installed. | Not used. The motion rules in Section 5 come from general practice, not that skill. Substitute: `modern-web-guidance` (View Transitions, scroll-driven animation, reduced motion). |
| **gstack** | ❌ Not installed. | Not used. QA substitutes: `design:accessibility-review`, `code-review`, `simplify`, `run` (drive the app and take screenshots), plus Lighthouse. |

The substitutes are available but haven't been read yet. Each one gets loaded at the phase where it's used.

## 5. Proposed design direction: "Signal"
**Concept:** a backend-leaning full-stack engineer's portfolio that reads like a well-run system: warm graphite surfaces, bone-white type, and one **signal orange** reserved for things that are live or actionable (CTAs, the active nav item, focus rings, "currently building" state). Orange is a status color, not decoration. That's the answer to the "dark + orange" cliché: the accent carries meaning and is rare. It covers under ~5% of any viewport.

**The one bold thing:** the hero is oversized display type, followed by a full-bleed orange **stack marquee** (the references' band, carrying his real stack). Everything after it stays quiet and disciplined.

### Color tokens (dark-led, light accents)
| Token | Hex | Role |
|---|---|---|
| `--ink` | `#151311` | page background (warm graphite, not pure #000) |
| `--ink-raised` | `#1F1C19` | cards, bands, inputs |
| `--line` | `#34302B` | hairlines and borders |
| `--bone` | `#F1ECE4` | primary text **and** the light "paper" surface (case-study reading panels, the contact container) |
| `--stone` | `#A69D92` | secondary text (≈7:1 on ink) |
| `--signal` | `#FF5B1F` | accent. Text on it uses `--ink`. Never body text on ink below 18px. |
All contrast pairs get verified in Phase 1.

### Typography
- **Display:** *Bricolage Grotesque* (variable, uses the opsz and width axes). It has the confident geometric feel of the references' Outfit but more character. Hero ~clamp(3rem, 9vw, 7.5rem), tight leading (0.95), slight negative tracking.
- **Body/UI:** *Geist Sans* (already loaded, so no added cost). 16–18px body, 1.6 leading, max ~68ch.
- **Mono:** *Geist Mono* only for real code and commands, never for labels.
- Scale (1.25 ratio): 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / display. Labels: sentence case at 14px, never 9–10px caps.

### Layout and grid
12-col grid, `max-w-[1240px]`, 24px gutters (16px on mobile). Left-aligned throughout (no centered section heads). The split section head comes from the references:
```
┌───────────────────────────────┬──────────────────────┐
│ H2 (cols 1–7)                 │ intro ¶ (cols 9–12)  │
└───────────────────────────────┴──────────────────────┘
```
Radius hierarchy instead of one radius everywhere: 28px bands, 20px media tiles, 12px inputs, full-round buttons. The notched corner is reserved for project tiles.

### Section plan
- **Header:** transparent over the hero, then solid `--ink` with a hairline after scroll. Wordmark "Tayyab Tariq" set in display type, no gradient. Links: Work, About, Contact, plus a résumé download. The "Let's Talk" duplicate is removed. Mobile: a full-screen sheet built on `<dialog>`.
- **Hero:**
  ```
  Full-stack engineer, Lahore — available for work ●(signal)
  I build the backend
  and the interface
  it deserves.                         [portrait in arch mask]
  (See the work ◉)  (Download résumé)
  ══════ NEXT.JS ✳ NESTJS ✳ POSTGRESQL ✳ FLUTTER ✳ SOCKET.IO ══════ (orange marquee)
  ```
  No vanity stats. The availability line is the only "status" and uses the signal dot without an infinite ping.
- **Selected work (home):** the 2 strongest projects (Harmoni, ClientBridge) as large image tiles in the references' 2-column caption style. Each tile has a **notched corner with a round arrow button**, role and stack in one line, then a link to all work.
- **Skills (replaces 4 overlapping lists):** one "Stack" section as a hairline-divided row list (from ref 3): *Backend · Frontend · Mobile · Data · Tooling*, each row with a one-line capability statement and its tools. No progress bars, no icon tiles.
- **About:** portrait in an arch mask, a tightened bio (3 paragraphs → 2), and an education/experience **timeline**, where numbering *is* justified because it's chronological. The "What drives me" values cards are dropped and folded into the bio.
- **Work index:** 2-column image-first grid with Web/Mobile filter chips (URL-synced `?type=`), static and server-rendered. The filter is a small client island.
- **Case study:** hero (title, one-line outcome, role, timeline, stack, links), then a **bone "paper" reading panel** for Problem → Approach → Architecture → Key features → What I learned (a real sequence, so numbered steps are OK), and a gallery with an accessible `<dialog>` lightbox. Next/previous project links at the end.
- **Contact:** a rounded bone container (ref 5's layout) with a left column for availability, response time, email with copy button, GitHub and LinkedIn, and a right column with the form (name, email, project type, message) wired to the Server Action, with real pending, success and error states. Honeypot and rate limiting.
- **Footer:** compact. One-line CTA "Have something to build? Email me", nav, socials, ©. No "Built with Next.js" line.

### Motion strategy
- **One orchestrated moment:** the hero headline lines reveal on load (staggered clip/translate, ~600ms total, ease-out `cubic-bezier(.22,1,.36,1)`). The marquee is CSS `@keyframes` (transform only) and pauses on hover and under reduced motion.
- **Response motion only after that:** button press (scale .97, 120ms), arrow nudge on tile hover, nav indicator slide (`layoutId`), mobile sheet and lightbox open/close (opacity + 8px translate, 200ms), filter re-layout. No scroll fade-up on every section.
- **Route transitions:** the View Transitions API for tile → case-study hero image, as progressive enhancement.
- **Rules:** animate only `transform`/`opacity`, use durations of 120–300ms for UI, keep everything interruptible, never scale from 0, and wrap everything in `prefers-reduced-motion` handling.

### Self-review against the generic defaults (per Frontend Design)
Changed from the first instinct: (1) the hero stats row is dropped because it was a default treatment; (2) the eyebrow labels above every H2 are dropped, and the split head carries the hierarchy; (3) `01/02/03` numbering is kept only for the timeline and case-study steps; (4) the pure-black + bright orange pairing is replaced by warm graphite + bone with orange as a status color only.

## 6. Design system recommendations
- **Tokens in `src/app/globals.css` via Tailwind v4 `@theme`:** `--color-ink`, `--color-signal`, etc., `--font-display`, the radius scale, and the easing and duration tokens. This deletes `.glass-*`, `.glow-card`, `.mesh-gradient-bg`, the noise overlay and `pulse-glow`.
- **Primitives in `src/components/ui/`:** `Container`, `Section` (handles vertical rhythm), `SectionHead` (the split head), `Button` (primary-signal / secondary-outline / ghost; sizes sm/md; `asChild`-style link support), `ArrowLink`, `Tag`, `StatusDot`, `CopyButton`, `MediaFrame` (rounded, optional notch).
- **Motion helpers in `src/lib/motion.ts`:** shared easings and durations, typed (no `as any`).
- **Content in `src/data/`:** `projects.ts` (typed `Project`, the single source), `profile.ts` (name, links, email, availability), `stack.ts`, `timeline.ts`.
- **Dev-only `/kitchen` route** to render every primitive and state. It returns `notFound()` in production.

## 7. Phased implementation roadmap

> Legend: **[D]** design exploration first • **[I]** implementation • **[Q]** QA-heavy

### Phase 0: Branch and baseline [Q]
- **Objective:** a safe starting point and measurable "before" numbers.
- **Work:** `git switch -c redesign` from `main`. Record Lighthouse (mobile and desktop) for `/`, `/projects`, `/projects/harmoni`. Screenshot every route at 375/768/1440. Decide whether to keep the reference PNGs out of the repo (move them to `design/refs/` or add them to `.gitignore`; your call).
- **Done when:** the branch exists, the baseline numbers are written down, and `npm run build` and `npm run lint` pass on the untouched code.

### Phase 1: Design foundation and tokens [D → I]
- **Files:** `src/app/globals.css` (rewrite to tokens), `src/app/layout.tsx` (fonts, real `metadata` with `metadataBase` and title template, `<html className>` vars), new `src/components/ui/*`, `src/lib/motion.ts`, `src/app/kitchen/page.tsx` (dev-only).
- **Details:** add Bricolage Grotesque via `next/font/google` with `display: swap`. Define the type scale as utilities (`text-display`, `text-h1`…). Add a `:focus-visible` ring in signal. Add a global reduced-motion rule.
- **Design check:** build the kitchen page first and review it in screenshots before any page work. Run `design:design-system` on the tokens.
- **Testing:** contrast check on every text/surface pair (≥4.5:1 body, ≥3:1 large/UI). TS strict build, lint.
- **Done when:** every primitive renders in all states on `/kitchen` at 3 widths, with no hard-coded colors outside the tokens.
- **Depends on:** 0.

### Phase 2: Content and data layer [I]
- **Files:** new `src/data/projects.ts`, `profile.ts`, `stack.ts`, `timeline.ts`. Fix assets in `public/images/`.
- **Details:** merge `projectsData` and `projectsDB` into one typed `Project[]` (`slug, title, summary, outcome, role, period, status, type: 'web'|'mobile', stack, cover, gallery[{src,alt,w,h}], links{repo?,live?}, problem, approach, architecture?, features, learnings`). Fix the broken paths (use `covid19project.png`/`weatherproject.png` until real screenshots exist, and match `CBmessage.png`'s case). Remove the Harmoni placeholder repo link. Decide whether to use the unused `CBProj*` shots. Rename assets to kebab-case. Re-export `clientbridge.png` (2.5 MB) as an optimized source. Replace `Tayyab.jpg` with a ≥800px source. Delete the Next starter SVGs.
- **Content review:** you supply or confirm the stats, outcomes and repo links. Unverifiable claims ("1000+ concurrent users", "40% reduction") get removed or sourced. Run `design:ux-copy` on the microcopy.
- **Done when:** one data source exists, every referenced image exists (verified with a script that checks each path), and the types compile.
- **Depends on:** 0 (it can run in parallel with 1).

### Phase 3: App shell [I]
- **Files:** replace `src/components/Navbar.tsx` and `Footer.tsx` with `src/components/shell/Header.tsx`, `NavLinks.tsx` (client: active state with `usePathname`), `MobileMenu.tsx` (client, `<dialog>`), `Footer.tsx` (server), `SkipLink.tsx`. Update `layout.tsx`. Add `src/app/not-found.tsx`.
- **UX:** sticky header with a scrolled state (an IntersectionObserver sentinel, not a scroll listener). 44px minimum touch targets. `aria-current="page"`.
- **Motion:** nav indicator `layoutId`, sheet open/close.
- **Testing:** keyboard-only pass (Tab order, Esc closes the menu, focus returns to the trigger). 320px width with no horizontal scroll.
- **Done when:** the shell works across 320–1920px with keyboard and screen reader names.
- **Depends on:** 1, 2.

### Phase 4: Home page [D → I]
- **Files:** `src/app/page.tsx` (**server component**), new `src/components/sections/Hero.tsx`, `StackMarquee.tsx`, `SelectedWork.tsx` + `ProjectTile.tsx`, `StackList.tsx`, `ContactCta.tsx`.
- **Design check:** sketch 2 hero variants (portrait and type-only) on the kitchen page, screenshot both, pick one, then build. Run `design:design-critique` on the result.
- **Details:** the only client islands are the hero reveal (or pure CSS) and the marquee (pure CSS). Only the hero image gets `priority`. Use `sizes` on every `next/image`.
- **Motion:** the single load sequence, the marquee, tile arrow nudge.
- **Done when:** the page is visually reviewed at 3 widths, it ships no framer-motion unless the hero needs it, and Lighthouse perf on mobile is ≥ baseline.
- **Depends on:** 3.

### Phase 5: Work index and case studies [I]
- **Files:** `src/app/projects/page.tsx` (server), `src/components/work/ProjectFilter.tsx` (client, `?type=` via `useSearchParams` inside `<Suspense>`), `src/app/projects/[projectId]/page.tsx` (server, with `generateStaticParams`, `generateMetadata`, and `notFound()` for unknown slugs), `src/components/case/CaseHeader.tsx`, `CaseSection.tsx`, `Gallery.tsx` (client, `<dialog>` lightbox: arrow keys, Esc, focus trap through native modal behavior, real `<button>` thumbnails), `ProjectPager.tsx`, `src/app/projects/[projectId]/not-found.tsx`.
- **Motion:** filter re-layout, lightbox open/close, View Transition from tile cover to case hero (progressive).
- **Testing:** every slug builds statically (`next build` output shows ● SSG), an unknown slug returns 404 status, and the lightbox is fully keyboard-operable.
- **Done when:** 4 case studies render with no broken images and no layout shift (CLS < 0.05).
- **Depends on:** 2, 3. Reuses `ProjectTile` from 4.

### Phase 6: About [I]
- **Files:** `src/app/about/page.tsx` (server), `src/components/sections/Timeline.tsx`, reuse `StackList`, `ContactCta`.
- **Details:** arch-mask portrait (CSS `border-radius`/`clip-path`, transparent PNG), tightened bio, chronological timeline (education plus any work and freelance entries you add), résumé link.
- **Done when:** no repeated stats or skills content from Home, and it's reviewed at 3 widths.
- **Depends on:** 3 (and 4 for the shared sections).

### Phase 7: Contact with real delivery [I]
- **Dependency:** `resend` (the only new runtime dependency). Env vars: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, set in Vercel and `.env.local` (git-ignored).
- **Files:** `src/app/contact/page.tsx` (server), `src/app/contact/actions.ts` (`"use server"`), `src/components/contact/ContactForm.tsx` (client, `useActionState`), `src/components/ui/CopyButton.tsx`.
- **Details:** server-side validation (length limits, email format) without a schema library. A honeypot field and a simple per-IP rate limit (in-memory is acceptable for a portfolio, documented as best-effort). `replyTo` set to the sender. If the env vars are missing, the form isn't rendered and the page falls back to the email and copy button, so it never shows a fake success.
- **UX:** labeled fields (`htmlFor`), inline errors tied with `aria-describedby`, a pending button state, and success and error messages in an `aria-live` region with copy that says exactly what happened.
- **Testing:** submit valid, invalid and honeypot data. Verify the email arrives (Resend test mode). Run without env vars and confirm the fallback renders.
- **Done when:** a real message is delivered end to end on a Vercel preview deployment.
- **Depends on:** 3.

### Phase 8: Motion and polish pass [D → I]
- Audit every animation against the rules in Section 5. Remove anything not tied to a user action except the hero sequence and the marquee. Verify reduced motion with DevTools emulation. Consider moving framer-motion to `LazyMotion` with `domAnimation`, or remove it entirely if CSS covers the remaining cases (`motion.ts` makes this easy). Load `modern-web-guidance` for the View Transitions and scroll-driven animation specifics.
- **Done when:** no animation runs under reduced motion except opacity fades, and there are no long tasks from animation in a Performance trace.

### Phase 9: SEO, accessibility, performance and release QA [Q]
- **Files:** `src/app/sitemap.ts`, `robots.ts`, `opengraph-image.tsx` (root and per project, using `next/og`), `icon.svg` (replaces the default favicon), JSON-LD `Person` in the layout, a real `client/README.md`.
- **Checks:** `design:accessibility-review` (WCAG 2.1 AA). Axe in DevTools on every route. Keyboard-only and VoiceOver/NVDA smoke test. Lighthouse mobile targets: Perf ≥ 90, A11y 100, Best Practices 100, SEO 100. Real devices or emulation at 320, 375, 768, 1024, 1440, 1920. Safari check for `<dialog>` and `backdrop`. Run `code-review` and `simplify` on the branch diff. `npm run build && npm run lint` clean.
- **Release:** open a PR from `redesign` to `main`, review the Vercel preview, then merge.
- **Done when:** every target is met and recorded next to the Phase 0 baseline.

## 8. Risks and technical considerations
- **Next 16 / React 19 APIs:** check the current docs for async `params` in `generateMetadata`/page props and for `useActionState` before writing code. Training-era patterns may be outdated.
- **Case-sensitive asset paths** break only in production. The Phase 2 path-check script guards against this.
- **Content honesty:** the redesign surfaces metrics more prominently, so any claim without evidence should go.
- **Orange on dark** looks generic if it's overused. Enforce the "<5% of viewport, status/action only" rule in design reviews.
- **Fonts:** keep it to 2 families (Bricolage plus Geist) and limit weights to control the CLS and font payload.
- **Resend:** domain verification is needed to send from your own domain. Until then, use `onboarding@resend.dev` with `replyTo`.
- **In-memory rate limiting** doesn't persist across serverless instances. That's acceptable here, but document it.
- **The reference images are a commercial template.** Use them for vocabulary only and copy no assets or distinctive layouts verbatim.

## 9. Recommended order and focus
0 → 1 ∥ 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9. Phases 6 and 7 can swap, or run in parallel after 3.
- **Design exploration first:** 1 (tokens and kitchen), 4 (hero variants), 8 (motion).
- **Implementation-heavy:** 2, 3, 5, 6, 7.
- **QA-heavy:** 0, 9, plus a per-phase gate (build, lint, screenshots at 3 widths, keyboard pass).

## Verification (applies to every phase)
1. `cd client && npm run build && npm run lint` pass with no new warnings.
2. `npm run dev`, then use the `run` skill or a browser to screenshot the changed routes at 375/768/1440 and review them against this plan.
3. Keyboard-only walkthrough of the changed UI. Toggle reduced motion.
4. Run Lighthouse on the changed routes and compare with the Phase 0 baseline.
5. One commit per phase on `redesign`, made only when you ask.
