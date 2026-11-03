# Portfolio Frontend Redesign — Design System & Phase Plan

**Repo:** `/home/tayyab/projects/Portfolio` · **App root:** `client/`
**Stack:** Next.js 16.1.1 · React 19.2.3 · Tailwind CSS v4 · TypeScript 5
**Written:** 2026-11-03 · **Status:** ready to implement

---

## 1. Preamble

**Current state.** The site is a four-page Next.js App Router portfolio whose
entire visual identity rests on one cyan→blue→purple gradient applied 91 times
across 7 files, stacked with five competing surface effects (noise grain, fixed
mesh gradient, glassmorphism, glowing card borders, pulsing dots) and set in
`font-black` at ten arbitrary type sizes. It has no design tokens beyond
`--background` and `--foreground`, no shared components beyond `Navbar` and
`Footer`, ships `"use client"` on every route, duplicates its project data in
two places, and still carries `title: "Create Next App"` in production metadata.

**Chosen direction.** Invert every one of those decisions: a light, cool-paper
page set in Bricolage Grotesque with Source Serif 4 for prose, structured by
asymmetric alignment and whitespace instead of cards, with exactly one accent
colour (a muted verdigris) that never touches display type. All decorative
motion is deleted; `framer-motion` is removed from the dependency tree, which
lets every page except the contact form become a React Server Component. The
one deliberately bold move is reserved for the case-study pages, where project
screenshots run full-bleed at the page's true width, breaking out of the text
measure — the work is shown large because the work is the argument.

**Why light.** Dark-with-neon-accent is the default dev-portfolio look and the
single strongest "student" signal on the current site. It is also one of the
recognisable machine-generated design clusters. A light page, precisely set,
is both rarer in this niche and harder to fake; it reads as confidence. Dark
mode is **deliberately out of scope for v1** — see §3.6 for the rationale and
the token structure that lets it be added later without touching a component.

**Provenance.** Visual direction and the anti-default calibration came from the
`frontend-design` skill. Platform-level motion and dialog guidance came from
`modern-web-guidance` (guides `motion`, `scroll-entry-exit-effects`, `dialog`,
`light-dismiss-a-dialog`) — see §9 for the specific rules applied. Skills named
in the original brief but not installed in this environment: `ui/ux pro max`
(nearest catalogue match: VectorLab UI/UX Skills), `app store design` (only
`appstore-screenshots`, an Expo/RN tool, exists — treated here as a quality bar,
not a skill), `emil kowalski` and `gstack` (absent from the catalogue; their
motion principles are transcribed into §3.5 as literal values).

**Implementer note.** Everything below §3 is written to be executed by a literal
model with no design judgement, no skills and no web access. Every colour,
size, duration and string is a literal value. No phase asks you to decide
anything. If you find yourself choosing, you have misread the spec — re-read it.

**Working tree was dirty at audit time:** `client/src/app/projects/[projectId]/page.tsx`
had uncommitted modifications. The audit read the working-tree version.
**Commit or stash before starting Phase 0.**

---

## 2. Audit findings

Severity: `blocker` = actively costs credibility with a reviewer ·
`major` = reads as amateur · `minor` = polish.

### 2.1 Visual identity

| Sev | Finding | Evidence |
|---|---|---|
| blocker | One gradient carries the whole identity: cyan→blue→purple on the logo, every section heading, every stat number, every primary button, every card border, the footer divider. 141 `cyan-*` and 69 `purple-*` class references across 7 files. | `page.tsx:62`, `page.tsx:80-88`, `Navbar.tsx:21`, `Footer.tsx:19`, `about/page.tsx:44` |
| blocker | Five surface effects stack with no hierarchy: fixed SVG noise grain, fixed mesh radial gradient, `.glass-pill`/`.glass-card`, `.glow-card` with animated gradient border + hover lift, `pulse-glow-dot` + `animate-ping`. | `globals.css:28-45`, `globals.css:47-57`, `globals.css:59-104`, `page.tsx:47-50` |
| major | Gradient fill applied to display type and to numerals, which destroys legibility and is the most-copied AI-portfolio tell. | `page.tsx:63`, `page.tsx:80`, `about/page.tsx:130-144` |
| major | Decorative blurred colour blobs placed behind content on nearly every section, costing paint time for no informational gain. | `page.tsx:296`, `page.tsx:442-443`, `about/page.tsx:97-104` |
| major | Uniform `.glow-card` treatment on content of completely different importance — a stat, a service, an education entry and a 12-column featured project all get the same container. | `about/page.tsx:127`, `about/page.tsx:174`, `page.tsx:224`, `page.tsx:363` |
| minor | `#030303` tinted near-black standing in for black. | `globals.css:4` |

### 2.2 Typography

| Sev | Finding | Evidence |
|---|---|---|
| major | `font-black` (weight 900) on essentially every heading, including 18px `h4`s. No weight hierarchy remains when everything is heaviest. | `page.tsx:61`, `page.tsx:190`, `about/page.tsx:41`, `Footer.tsx:18` |
| major | Ten distinct text sizes used arbitrarily and skewed tiny: 47× `text-xs`, 40× `text-sm`, 17× `text-base`, plus six one-off `text-[10px]` / `text-[9px]` / `text-[11px]` values. Body copy at 12–14px throughout. | `page.tsx:84`, `about/page.tsx:131`, `contact/page.tsx:77` |
| major | ALL-CAPS tracked eyebrow labels above almost every heading ("Biography", "Timeline", "Core Values", "Skills", "Featured Work", "Contact Details", "Social Profiles"). This is template chrome, not information. | `page.tsx:195`, `about/page.tsx:37`, `about/page.tsx:151`, `contact/page.tsx:70` |
| major | Monospace used for micro-labels as decoration rather than for data. | `about/page.tsx:132`, `contact/page.tsx:76` |
| minor | Metadata joined with middle dots (`Next.js • React • TypeScript`, `Civil Lines • Lahore`). | `page.tsx:375`, `about/page.tsx:181` |
| minor | `rounded-full` 76×: every surface is a pill regardless of what it contains. | repo-wide |
| minor | Raw apostrophes in JSX text (`Let's Talk`) alongside curly ones elsewhere — inconsistent. | `Navbar.tsx:56` |

### 2.3 Layout & spacing

| Sev | Finding | Evidence |
|---|---|---|
| major | No focal hierarchy on any page. Every section is the same width (`max-w-6xl`), the same vertical rhythm (`py-24`), and centre-headed with eyebrow + heading + subheading. The eye has nowhere to land. | `page.tsx:189`, `page.tsx:296`, `page.tsx:359`, `about/page.tsx:147` |
| major | Container width inconsistent across routes: `max-w-6xl` on home/about/contact, `max-w-7xl` on the projects index, `max-w-6xl` again on project detail. Pages visibly jump width during navigation. | `page.tsx:35` vs `projects/page.tsx:211` vs `projects/[projectId]/page.tsx:274` |
| major | Everything is centre-aligned, including multi-paragraph prose, which fights readability. | `page.tsx:190-200`, `about/page.tsx:149-152` |
| minor | Contact page ships an empty `<section>` with `pt-12 pb-16` — 7rem of dead space and no heading at all, so the page starts with no title. | `contact/page.tsx:36-38` |
| minor | Hero top padding differs per page (`pt-20` home, `pt-36` about, `pt-24` projects), so the fixed navbar sits at a different distance from content on each route. | `page.tsx:35`, `about/page.tsx:26`, `projects/page.tsx:211` |

### 2.4 Component architecture

| Sev | Finding | Evidence |
|---|---|---|
| blocker | Project data is hardcoded twice and the two copies disagree. `projectsData` (4 entries, index page) vs `projectsDB` (4 entries, detail page, labelled `// --- MOCK DATA ---`). ClientBridge's tech list is `["Next.js","Node.js","Prisma ORM","PostgreSQL","Socket.io","Tailwind CSS"]` on the index but `["React","Next.js","Express.js","Socket.io","Tailwind CSS"]` on the detail page. | `projects/page.tsx:9`, `projects/[projectId]/page.tsx:14` |
| blocker | Placeholder URLs ship to production. Harmoni's `repoLink` is `https://github.com/yourusername/harmoni` and `liveLink` is `https://harmoni.app`, neither of which is real. A reviewer who clicks either sees the placeholder. | `projects/[projectId]/page.tsx:20-21` |
| major | Only two shared components exist. Five page files total 1,836 lines with every button, tag, card and heading written inline and re-written per page. | `components/` |
| major | No `lib/`, `data/` or `content/` directory. No typed content model. | repo-wide |
| blocker | Four case-study image paths point at files that do not exist, so three of the four project pages render broken images today: `/images/covid-main.png`, `/images/covid-stats.png`, `/images/weather-home.png` are absent from `client/public/images/`, and `/images/Cbmessage.png` is a case mismatch for the real `CBmessage.png` (which 404s on Linux and in production, though it resolves on a case-insensitive dev filesystem). | `projects/[projectId]/page.tsx:71-72`, `:111`, `:149` |
| minor | `getTagStyle()` maps technology names to colours via substring matching, so adding a tech silently falls through to a default. | `projects/page.tsx:52` |

### 2.5 Motion

| Sev | Finding | Evidence |
|---|---|---|
| major | Scroll-reveal fade-and-slide on essentially every section — the textbook generated-page motion signature. It also delays content the reader has already scrolled to. | `page.tsx:191-210`, `about/page.tsx:30-78` |
| major | Hover lift + scale + glow on every card, so no hover means anything. | `globals.css:88-96`, `page.tsx:172` |
| major | No `prefers-reduced-motion` handling anywhere in the codebase. Infinite animations (`animate-ping`, `pulse-glow`, a 40s spinning dashed ring) run unconditionally. | `globals.css:106-126`, `about/page.tsx:103` |
| major | Easing arrays cast `as any` to silence framer-motion type errors, in four files. | `page.tsx:15`, `about/page.tsx:15`, `contact/page.tsx:13`, `projects/[projectId]/page.tsx:174` |
| minor | `whileInView` without `once: true` on some elements re-triggers on every scroll pass. | `page.tsx:195` |

### 2.6 Content & positioning

| Sev | Finding | Evidence |
|---|---|---|
| blocker | The three hero statistics are vanity metrics, and one is not a metric at all: "3+ Years Coding", "10+ Projects Built", "12+ Tools Mastered". "Tools Mastered" counts logos. These actively signal junior. | `page.tsx:78-90`, `about/page.tsx:127-145` |
| blocker | Project pages lead with "problem/solution" prose but bury the engineering decisions, and the "achievements" are unverifiable claims ("Reduced context-switching time by 40% in beta testing" for an in-progress project with no users). | `projects/[projectId]/page.tsx:30-52` |
| major | Self-description is about enthusiasm, not outcomes: "a passion for building", "my true passion lies in", "I enjoy designing databases", "curiosity for how things work under the hood". | `about/page.tsx:57-73` |
| major | "I don't just write code; I engineer solutions" and "Turning vision into reality through code" are filler. They make no claim a reader can check. | `about/page.tsx:71`, `page.tsx:303` |
| major | The Services section sells like an agency ("Services I Offer", "Expert in building modern, high-performance applications") on a personal site with no pricing or process — it reads as aspiration. | `page.tsx:361-362` |
| minor | The education timeline occupies a full section with two entries and more visual weight than the project work. | `about/page.tsx:147-208` |
| minor | A fake code-editor mockup displays invented NestJS code that does nothing and would not compile meaningfully (`this.db.nodes.deploy()`). | `page.tsx:330-345` |

### 2.7 Responsive

| Sev | Finding | Evidence |
|---|---|---|
| major | The navbar packs logo + 4 links + CTA into one `w-[92%]` pill with no mobile menu. At 375px the links compress to `text-xs` with `px-3` padding and the CTA is hidden via `hidden sm:inline-block`, leaving a cramped row. | `Navbar.tsx:18-57` |
| major | Nav links are `py-1.5` (~30px tall), below the 44px minimum touch target. | `Navbar.tsx:33` |
| minor | The about-page education timeline uses a desktop horizontal line at `left-[15%] right-[15%]` and a separate mobile vertical line at `left-[22px]`, two layouts maintained in parallel with a hardcoded pixel offset. | `about/page.tsx:159-162` |
| minor | The code-editor mockup sets `overflow-x-auto` on pre-formatted lines, so it scrolls horizontally inside the card on mobile. | `page.tsx:329` |

### 2.8 Accessibility

| Sev | Finding | Evidence |
|---|---|---|
| blocker | No `:focus-visible` styling anywhere. Several interactive elements set `focus:outline-none` with only a faint colour change as replacement, so keyboard users lose the focus indicator entirely. | `contact/page.tsx:136`, `contact/page.tsx:148`, `contact/page.tsx:160` |
| blocker | The contact form is theatre. `handleSubmit` calls `setTimeout(1500)` then shows "Message Sent!" — nothing is sent anywhere. Inputs have no `name`, no `id`, and `<label>` elements are not associated with them. Submitting does nothing and tells the user it succeeded. | `contact/page.tsx:24-29`, `contact/page.tsx:131-168` |
| major | No skip link, and the fixed navbar is the first focusable region on every page. | `layout.tsx:31` |
| major | Decorative icons inside links have no accessible name; the GitHub and LinkedIn links contain only an SVG, so they announce as "link". | `page.tsx:113-131`, `Footer.tsx:26-43` |
| major | `text-gray-500` on `#030303` ≈ 4.1:1 and `text-gray-600` ≈ 3.1:1 — both fail WCAG AA for normal text, and both are used for real content. | `page.tsx:84`, `Footer.tsx:95-99` |
| major | The lightbox is a hand-built `div` overlay: no focus containment, no `Esc` handler, no focus return, page scrolls behind it. | `projects/[projectId]/page.tsx:492+` |
| minor | Section landmarks exist but no `<main>` element wraps page content. | `layout.tsx:30-34` |

### 2.9 Performance

| Sev | Finding | Evidence |
|---|---|---|
| major | All six source files are `"use client"`, so every route opts out of server rendering and ships `framer-motion` (~34KB gzipped) plus React runtime even for fully static pages. | `page.tsx:1`, `about/page.tsx:1`, `projects/page.tsx:1`, `projects/[projectId]/page.tsx:1`, `contact/page.tsx:1` |
| major | Two fixed full-viewport overlays (`body::before` noise at `z-index: 9999`, plus `background-attachment: fixed` mesh gradient) force repaint of a full-screen layer on scroll. | `globals.css:28-45`, `globals.css:47-57` |
| minor | `priority` set on three separate images including a non-LCP mockup, which competes for early bandwidth. | `page.tsx:148`, `page.tsx:268`, `about/page.tsx:117` |
| minor | `Geist` and `Geist_Mono` both loaded; mono is used only for decorative micro-labels. | `layout.tsx:7-15` |

### 2.10 SEO & metadata

| Sev | Finding | Evidence |
|---|---|---|
| blocker | Production metadata is the unmodified scaffold: `title: "Create Next App"`, `description: "Generated by create next app"`. This is what appears in search results and link previews today. | `layout.tsx:18-21` |
| blocker | No per-route metadata, so all five routes share that one title. | all page files |
| major | No `metadataBase`, no canonical URLs, no OpenGraph or Twitter card data, no OG image. Every shared link renders bare. | `layout.tsx` |
| major | No `sitemap.ts`, no `robots.ts`. | `client/src/app/` |
| major | `projects/[projectId]` is a client component reading `useParams()`, so it cannot export `generateMetadata` or `generateStaticParams`. The four case studies are invisible to crawlers as distinct pages. | `projects/[projectId]/page.tsx:1`, `projects/[projectId]/page.tsx:170` |
| minor | No JSON-LD `Person` structured data. | repo-wide |

---

## 3. Design system

This section is the single source of truth. Every phase references these token
names. **No phase may introduce a raw hex value, an `oklch()` literal outside
this file, or a stock Tailwind colour class (`text-cyan-400`, `bg-neutral-900`,
`text-gray-500`, …).** If a colour is needed that is not defined here, the
phase is wrong — stop and flag it.

### 3.1 The complete token block

This is the entire contents of `client/src/app/globals.css` after Phase 0.
Paste it verbatim. Do not add to it, and do not keep any of the old file.

```css
@import "tailwindcss";

/* ---------------------------------------------------------------
   Fonts are injected by next/font in layout.tsx as CSS variables.
   `inline` is required here so Tailwind resolves them at use time.
   --------------------------------------------------------------- */
@theme inline {
  --font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  --font-prose: var(--font-source-serif), ui-serif, Georgia, serif;
}

@theme {
  /* --- Colour -------------------------------------------------
     Light only in v1. Cool-toned paper, near-black ink with a
     faint blue cast, and exactly one accent: a muted verdigris.
     ------------------------------------------------------------ */
  --color-paper:        oklch(0.985 0.003 250);
  --color-paper-sunk:   oklch(0.955 0.005 250);
  --color-ink:          oklch(0.220 0.018 265);
  --color-ink-muted:    oklch(0.480 0.012 265);
  --color-ink-faint:    oklch(0.530 0.010 265);
  --color-rule:         oklch(0.900 0.006 260);
  --color-rule-strong:  oklch(0.640 0.006 260);
  --color-accent:       oklch(0.500 0.085 192);
  --color-accent-hover: oklch(0.420 0.070 192);
  --color-accent-wash:  oklch(0.950 0.020 192);

  /* --- Type scale ---------------------------------------------
     Nine steps. Line-heights are baked in via --leading-* below
     and applied together through the component rules in §3.3.
     ------------------------------------------------------------ */
  --text-xs:    0.8125rem;  /* 13px — meta only */
  --text-sm:    0.9375rem;  /* 15px — UI labels, tags */
  --text-base:  1.0625rem;  /* 17px — default body */
  --text-lg:    1.2500rem;  /* 20px — lead paragraph */
  --text-xl:    1.5000rem;  /* 24px — h3 */
  --text-2xl:   2.0000rem;  /* 32px — h2 small */
  --text-3xl:   2.7500rem;  /* 44px — h2 */
  --text-4xl:   4.0000rem;  /* 64px — h1 */
  --text-5xl:   5.5000rem;  /* 88px — hero only, one per site */

  --leading-tight:  1.03;
  --leading-snug:   1.15;
  --leading-normal: 1.45;
  --leading-prose:  1.65;

  --tracking-tight:  -0.022em;
  --tracking-normal: -0.008em;

  /* --- Space --------------------------------------------------
     Two section rhythms only. Do not invent a third.
     ------------------------------------------------------------ */
  --spacing-section:    7rem;
  --spacing-section-lg: 11rem;

  /* --- Measure ------------------------------------------------ */
  --container-text:  34rem;   /* serif prose: ~72 characters */
  --container-ui:    62rem;   /* standard content column */
  --container-wide:  78rem;   /* full-bleed media bands */

  /* --- Radius -------------------------------------------------
     Two values. Pills are gone.
     ------------------------------------------------------------ */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;

  /* --- Motion -------------------------------------------------
     See §3.5. These are the only durations in the system.
     ------------------------------------------------------------ */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --duration-fast:  120ms;
  --duration-base:  180ms;
  --duration-slow:  320ms;
}

/* ---------------------------------------------------------------
   Base layer
   --------------------------------------------------------------- */
@layer base {
  html {
    color-scheme: light;
    -webkit-text-size-adjust: 100%;
  }

  body {
    background-color: var(--color-paper);
    color: var(--color-ink);
    font-family: var(--font-display);
    font-size: var(--text-base);
    line-height: var(--leading-normal);
    letter-spacing: var(--tracking-normal);
    -webkit-font-smoothing: antialiased;
  }

  /* Visible keyboard focus on every interactive element.
     Never remove this with focus:outline-none. */
  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
    border-radius: var(--radius-sm);
  }

  ::selection {
    background: var(--color-accent-wash);
    color: var(--color-ink);
  }

  /* Headings inherit the display family and never carry colour
     of their own — colour comes from the ink tokens only. */
  h1, h2, h3, h4 {
    font-weight: 600;
    letter-spacing: var(--tracking-tight);
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  img {
    max-width: 100%;
    height: auto;
  }
}

/* ---------------------------------------------------------------
   The single reveal animation, used ONCE per page on the hero.
   Opt-in under no-preference, per the reduced-motion rule in §3.5.
   --------------------------------------------------------------- */
@layer utilities {
  .reveal {
    opacity: 1;
  }

  @media (prefers-reduced-motion: no-preference) {
    .reveal {
      opacity: 0;
      animation: reveal-in var(--duration-slow) var(--ease-out-quart) forwards;
    }
    .reveal-delay-1 { animation-delay: 60ms; }
    .reveal-delay-2 { animation-delay: 120ms; }
    .reveal-delay-3 { animation-delay: 180ms; }
  }

  @keyframes reveal-in {
    from { opacity: 0; translate: 0 0.5rem; }
    to   { opacity: 1; translate: 0 0; }
  }
}
```

### 3.2 Colour usage law

| Token | Use for | Never use for |
|---|---|---|
| `paper` | page background | — |
| `paper-sunk` | at most **one** recessed band per page | cards, tags, inputs |
| `ink` | headings, body text, primary button background | — |
| `ink-muted` | secondary prose, descriptions | headings |
| `ink-faint` | dates, counts, captions | anything longer than 8 words |
| `rule` | decorative 1px dividers between sections | the border of anything clickable |
| `rule-strong` | the border of interactive elements — `Button` secondary, `Tag` | decorative dividers |
| `accent` | links, the active nav item, focus rings, one icon per page | headings, display type, backgrounds, gradients |
| `accent-hover` | hover state of accent-coloured text | resting state |
| `accent-wash` | text selection, the active filter chip | large areas |

Three laws, no exceptions:

1. **The accent never touches display type.** No gradient-filled headings, no
   coloured words inside an `h1`, no coloured numerals. This was the single
   loudest amateur signal in the old design.
2. **There are no gradients.** Not on text, not on borders, not on
   backgrounds, not on buttons. `bg-gradient-*` must not appear anywhere in
   `client/src` when the project is done.
3. **The accent appears at most four times per viewport.** If you are adding a
   fifth, something else must become `ink` or `ink-muted`.

### 3.3 Type usage law

Two families with strict roles:

- **`font-display` (Bricolage Grotesque)** — all headings, all UI text, all
  labels, all buttons, all navigation. Weights 400, 500 and 600 only.
  **Weight 700+ is not used anywhere on the site.**
- **`font-prose` (Source Serif 4)** — multi-paragraph prose only: the About
  biography, and the case-study narrative blocks. Weight 400, with
  `--leading-prose`, inside `--container-text`. Nothing else.

Fixed pairings — use the whole row, never a size without its leading:

| Role | Size | Leading | Tracking | Weight | Family |
|---|---|---|---|---|---|
| Hero h1 (home only) | `text-5xl` | `leading-tight` | `tracking-tight` | 600 | display |
| Page h1 | `text-4xl` | `leading-tight` | `tracking-tight` | 600 | display |
| Section h2 | `text-3xl` | `leading-snug` | `tracking-tight` | 600 | display |
| Sub-section h2 | `text-2xl` | `leading-snug` | `tracking-tight` | 600 | display |
| h3 | `text-xl` | `leading-snug` | `tracking-normal` | 500 | display |
| Lead paragraph | `text-lg` | `leading-normal` | `tracking-normal` | 400 | display |
| Body (UI) | `text-base` | `leading-normal` | `tracking-normal` | 400 | display |
| Body (prose) | `text-base` | `leading-prose` | `tracking-normal` | 400 | **prose** |
| UI label / tag | `text-sm` | `leading-normal` | `tracking-normal` | 500 | display |
| Meta / caption | `text-xs` | `leading-normal` | `tracking-normal` | 400 | display |

Banned typographic moves — these are what made the old site read as templated:

- **No ALL-CAPS eyebrow labels.** Delete every one. If a section needs an
  introduction, the heading is the introduction.
- **No monospace.** Neither font is monospace; `Geist_Mono` is removed in
  Phase 0. Technology names are set in `text-sm` display, like any other label.
- **No middle-dot joins** (`A · B · C`). Use a comma, or separate elements.
- **No single accented word inside a heading.**
- **No `→` appended to link text.** A link is underlined; that is the signal.
- **No text smaller than `text-xs` (13px).** The `text-[10px]` and `text-[9px]`
  values in the old design are all removed.

### 3.4 Structure & the effect budget

**One surface treatment survives, and it is not a card: alignment.**

Content is structured by an asymmetric two-column grid — a narrow left rail
carrying metadata (dates, roles, counts) and a wide right column carrying
content. Nothing is centre-aligned except the single hero on the home page.
This replaces every card, glass panel, glow border and blurred blob.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  2024—26        Harmoni                                 │
│  In progress    Real-time collaboration for remote      │
│  NestJS         teams. Messaging, tasks and files in    │
│  Next.js        one surface, built on a WebSocket       │
│                 gateway over a Postgres core.           │
│                                                         │
│                 Read the case study                     │
│                 ─────────────────────                   │
└─────────────────────────────────────────────────────────┘
   ↑ 10rem rail    ↑ content, max --container-ui
```

Deleted in Phase 0 and never reintroduced:

| Removed | Was defined at |
|---|---|
| `body::before` noise grain overlay | `globals.css:28-45` |
| `.mesh-gradient-bg` | `globals.css:47-57` |
| `.glass-pill` | `globals.css:59-67` |
| `.glass-card` | `globals.css:69-75` |
| `.glow-card` + `::before` + `:hover` | `globals.css:77-104` |
| `.pulse-glow-dot` + `@keyframes pulse-glow` | `globals.css:106-126` |
| custom `::-webkit-scrollbar` rules | `globals.css:128-142` |
| every `blur-[*]` decorative div | 9 occurrences across 3 files |

The only permitted elevation on the entire site is on full-bleed case-study
media: `box-shadow: 0 1px 2px oklch(0.22 0.018 265 / 0.06)`. Nothing else
casts a shadow.

### 3.5 Motion law

Motion exists to show change, not to decorate arrival.

**Exactly one non-interactive animation ships: the hero reveal.** It runs once
per page load, on the home hero only, using the `.reveal` utility in §3.1 with
at most three staggered children. Every other scroll-triggered entrance in the
current codebase is deleted.

Interactive motion — these three durations are the complete set:

| Interaction | Property | Duration | Easing |
|---|---|---|---|
| Link / button hover, focus ring | `color`, `background-color`, `border-color` | `--duration-fast` (120ms) | `--ease-out-quart` |
| Nav active indicator, filter change | `opacity`, `translate` | `--duration-base` (180ms) | `--ease-out-quart` |
| Dialog open / close, hero reveal | `opacity`, `translate` | `--duration-slow` (320ms) | `--ease-out-quart` |

Hard rules:

- **Animate only `opacity`, `transform`, `translate` and `scale`** so work stays
  on the compositor. Never animate `width`, `height`, `top` or `left`.
- **Never apply a global `animation-duration: 0.01ms` reduced-motion reset** —
  it makes some animations more jarring, not less. Handle preference per rule,
  with the `@media` query nested inside the rule so both states stay together.
- **Default to static and opt in to motion** via
  `@media (prefers-reduced-motion: no-preference)`, as §3.1 does.
- **No infinite animations.** `animate-ping`, `pulse-glow` and the 40s spinning
  ring are all deleted.
- **No hover lift, no hover scale, no hover glow.** Hover changes colour only.
- `framer-motion` is removed from `package.json` in Phase 0. No phase may
  reinstall it. This also removes the four `as any` easing casts.

### 3.6 Dark mode: deliberately deferred

v1 ships light only. `html` sets `color-scheme: light` explicitly so form
controls and scrollbars render correctly rather than inheriting the OS.

The reason is scope control, not oversight: supporting both doubles the number
of contrast pairs to verify and is the most common place a weak implementation
produces unreadable text. Shipping one palette well beats shipping two badly.

The token structure makes the later addition mechanical: every colour is a
semantic role (`paper`, `ink`, `ink-muted`) rather than a value
(`white`, `gray-900`). Adding dark means redefining nine custom properties
under `@media (prefers-color-scheme: dark)` and changing no component. **Do
not attempt this in any phase below.**

---

## 4. Component inventory

Everything the site needs. Nothing speculative — if it is not in this table,
do not build it.

### 4.1 Primitives — `client/src/components/ui/`

| File | Props | Variants | Phase |
|---|---|---|---|
| `Button.tsx` | `{ href?: string; children: ReactNode; variant?: "primary" \| "secondary"; type?: "button" \| "submit"; disabled?: boolean; className?: string }` | `primary` = `bg-ink text-paper`; `secondary` = `border border-rule-strong text-ink bg-transparent`. Renders `next/link` when `href` is set, `<button>` otherwise. | 1 |
| `TextLink.tsx` | `{ href: string; children: ReactNode; external?: boolean }` | One style: `text-accent underline underline-offset-4 decoration-rule hover:decoration-accent`. Sets `target="_blank" rel="noreferrer"` when `external`. | 1 |
| `Tag.tsx` | `{ children: ReactNode }` | One style only — **no per-technology colours**. `text-sm text-ink-muted border border-rule-strong rounded-sm px-2 py-0.5`. | 1 |
| `Section.tsx` | `{ children: ReactNode; size?: "base" \| "lg"; sunk?: boolean; id?: string }` | Wraps a `<section>` with `py-[--spacing-section]` or `-lg`, and `bg-paper-sunk` when `sunk`. | 1 |
| `Rail.tsx` | `{ meta: ReactNode; children: ReactNode }` | The asymmetric grid from §3.4: `grid md:grid-cols-[10rem_1fr] gap-8`. Left cell `text-xs text-ink-faint`, right cell content. | 1 |
| `Prose.tsx` | `{ children: ReactNode }` | Applies `font-prose text-base leading-prose max-w-[--container-text]` plus `[&>p+p]:mt-4`. The **only** place the serif is used. | 1 |

### 4.2 Shell — `client/src/components/`

| File | Notes | Phase |
|---|---|---|
| `Navbar.tsx` | Rewritten. Static, not fixed. Server component. | 2 |
| `NavLinks.tsx` | Client component — needs `usePathname()` for the active state. The only client code in the shell. | 2 |
| `Footer.tsx` | Rewritten. Server component. | 2 |
| `SkipLink.tsx` | Visually hidden until focused, jumps to `#main`. | 2 |

### 4.3 Content layer — `client/src/data/`

| File | Exports | Phase |
|---|---|---|
| `site.ts` | `siteUrl`, `siteConfig` — name, role, email, location, social URLs, base URL | **0** |
| `projects.ts` | `type Project`, `projects: Project[]`, `getProject(slug: string): Project \| undefined`, `getProjectSlugs(): string[]` | 3 |

### 4.4 Case-study sections — `client/src/components/project/`

| File | Notes | Phase |
|---|---|---|
| `Gallery.tsx` | Client component. Native `<dialog closedby="any">` lightbox, keyboard navigation. | 7 |

---

## 5. Phases

Eleven phases. Each leaves the site building and shippable.
**Commit after every phase that passes its verify command.**

---

### Phase 0 — Foundation

**Goal** — Replace the stylesheet with the token system, fix the fonts and the
metadata, and remove `framer-motion` from the project.

**Depends on** — nothing.

**Files created**
- `client/src/data/site.ts`

**Files modified**
- `client/src/app/globals.css`
- `client/src/app/layout.tsx`
- `client/package.json`

**DO NOT TOUCH** — any file under `client/src/app/projects/`,
`client/src/app/about/`, `client/src/app/contact/`,
`client/src/app/page.tsx`, `client/src/components/`. They will break visually
during this phase. **That is expected and correct.** They are fixed in Phases
2 and 4–8. Do not try to repair them here.

**Design spec**

1. `client/src/app/globals.css` — delete the entire current contents and
   replace with the token block in **§3.1**, verbatim. Nothing from the old
   file survives.

2. `client/src/app/layout.tsx` — replace `Geist` and `Geist_Mono` with:

   ```tsx
   import { Bricolage_Grotesque, Source_Serif_4 } from "next/font/google";

   const bricolage = Bricolage_Grotesque({
     variable: "--font-bricolage",
     subsets: ["latin"],
     display: "swap",
     weight: ["400", "500", "600"],
   });

   const sourceSerif = Source_Serif_4({
     variable: "--font-source-serif",
     subsets: ["latin"],
     display: "swap",
     weight: ["400"],
   });
   ```

3. Create `client/src/data/site.ts` with exactly this content. **Every piece
   of metadata, the sitemap, robots.txt and the JSON-LD read their URL from
   this one constant**, so the site has a single place to change when a domain
   is registered:

   ```ts
   // No custom domain yet — the site runs on localhost.
   // TODO: when a domain is registered, set NEXT_PUBLIC_SITE_URL in the
   // hosting environment (e.g. Vercel project settings). No code change needed.
   export const siteUrl =
     process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

   export const siteConfig = {
     name: "Tayyab Tariq",
     role: "Product Engineer",
     email: "tayyabtariq838@gmail.com",
     location: "Pakistan — available remote",
     github: "https://github.com/itx-tayyab",
     linkedin: "https://www.linkedin.com/in/tayyab-tariq-a51379260/",
     url: siteUrl,
   } as const;
   ```

   **Do not hardcode a domain anywhere else in the project.** If you find
   yourself typing `https://` followed by a site name outside this file, stop.

4. Replace the metadata export exactly:

   ```tsx
   import { siteUrl } from "@/data/site";

   export const metadata: Metadata = {
     metadataBase: new URL(siteUrl),
     title: {
       default: "Tayyab Tariq — Product Engineer",
       template: "%s — Tayyab Tariq",
     },
     description:
       "Product engineer building real-time collaboration systems with NestJS, Next.js and Flutter.",
     openGraph: {
       type: "website",
       siteName: "Tayyab Tariq",
       title: "Tayyab Tariq — Product Engineer",
       description:
         "Product engineer building real-time collaboration systems with NestJS, Next.js and Flutter.",
     },
     twitter: { card: "summary_large_image" },
   };
   ```

5. The body element becomes:

   ```tsx
   <body className={`${bricolage.variable} ${sourceSerif.variable}`}>
   ```

   Remove the `antialiased` class — it is handled in the base layer now.

6. `client/package.json` — remove the `"framer-motion"` dependency line.

**Steps**

1. `cd client && npm uninstall framer-motion`
2. Overwrite `src/app/globals.css` with §3.1.
3. Create `src/data/site.ts` per item 3.
4. Edit `src/app/layout.tsx` per items 2, 4 and 5.
4. Run the verify command. **TypeScript will report errors in the five page
   files that still import `framer-motion`.** That is expected at this phase —
   record the error count and move on. The build is not expected to pass until
   Phase 8.

**Acceptance criteria**
- [ ] `globals.css` contains no `.glow-card`, `.glass-card`, `.glass-pill`, `.mesh-gradient-bg`, `.pulse-glow-dot`, `body::before`, or `::-webkit-scrollbar` rule.
- [ ] `globals.css` contains no hex colour value.
- [ ] `grep -c "oklch" src/app/globals.css` returns at least 9.
- [ ] `package.json` has no `framer-motion` entry, and `node_modules/framer-motion` is gone.
- [ ] `layout.tsx` contains no occurrence of `Geist`.
- [ ] `layout.tsx` metadata contains neither "Create Next App" nor "Generated by".
- [ ] `src/data/site.ts` exists and exports both `siteUrl` and `siteConfig`.
- [ ] `grep -rn "tayyabtariq.dev" src/` returns nothing — the domain is not hardcoded anywhere.
- [ ] `layout.tsx` imports `siteUrl` rather than writing a URL literal.

**Verify**
```bash
cd client && npx tsc --noEmit 2>&1 | tail -20
```
Expect errors only of the form `Cannot find module 'framer-motion'` in the five
page files. Any other error means this phase was done wrong.

**Rollback** — `git checkout -- src/app/globals.css src/app/layout.tsx package.json && rm -f src/data/site.ts && npm install`

---

### Phase 1 — Primitives

**Goal** — Build the six UI primitives from §4.1. No page consumes them yet.

**Depends on** — Phase 0.

**Files created**
- `client/src/components/ui/Button.tsx`
- `client/src/components/ui/TextLink.tsx`
- `client/src/components/ui/Tag.tsx`
- `client/src/components/ui/Section.tsx`
- `client/src/components/ui/Rail.tsx`
- `client/src/components/ui/Prose.tsx`

**Files modified** — none.

**DO NOT TOUCH** — every existing file. This phase only adds new files.

**Design spec**

All six are **server components** — none carries `"use client"`. All are typed
with explicit prop interfaces. None imports `framer-motion`.

`Button.tsx`:
- `primary`: `bg-ink text-paper hover:bg-ink-muted`
- `secondary`: `border border-rule-strong text-ink hover:border-ink`
- shared: `inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-colors duration-[--duration-fast] ease-[--ease-out-quart] disabled:opacity-50 disabled:pointer-events-none`
- minimum height `2.75rem` (44px touch target) — add `min-h-11`
- when `href` is set, render `next/link`; otherwise `<button type={type ?? "button"}>`

`TextLink.tsx`:
- `text-accent underline underline-offset-4 decoration-rule hover:text-accent-hover hover:decoration-accent transition-colors duration-[--duration-fast]`
- **no arrow character in or appended to the label**

`Tag.tsx`:
- `inline-flex items-center rounded-sm border border-rule-strong px-2 py-0.5 text-sm text-ink-muted`
- one style for every technology — do not port `getTagStyle()`

`Section.tsx`:
- `<section>` with `py-28` for `base` and `py-44` for `lg`
- `sunk` adds `bg-paper-sunk`
- inner wrapper: `mx-auto w-full max-w-[--container-ui] px-6`

`Rail.tsx`:
- outer: `grid gap-8 md:grid-cols-[10rem_1fr] md:gap-12`
- meta cell: `text-xs text-ink-faint flex flex-col gap-1 md:text-right`
- content cell: `min-w-0`

`Prose.tsx`:
- `font-prose text-base leading-prose text-ink-muted max-w-[--container-text] [&>p+p]:mt-5`

**Steps**
1. Create the directory `src/components/ui/`.
2. Write each of the six files per the spec above.

**Acceptance criteria**
- [ ] All six files exist under `src/components/ui/`.
- [ ] `grep -rl "use client" src/components/ui/` returns nothing.
- [ ] `grep -rn "framer-motion" src/components/ui/` returns nothing.
- [ ] `grep -rnE "cyan|purple|gradient|#[0-9a-fA-F]{3,6}" src/components/ui/` returns nothing.
- [ ] Every component has an exported TypeScript props interface.

**Verify**
```bash
cd client && npx tsc --noEmit 2>&1 | grep -v "framer-motion" | tail -20
```
Expect no errors other than the known `framer-motion` ones from Phase 0.

**Rollback** — `rm -rf src/components/ui`

---

### Phase 2 — Shell

**Goal** — Rewrite the navbar and footer against the token system, add a skip
link and a `<main>` landmark.

**Depends on** — Phases 0, 1.

**Files created**
- `client/src/components/NavLinks.tsx`
- `client/src/components/SkipLink.tsx`

**Files modified**
- `client/src/components/Navbar.tsx`
- `client/src/components/Footer.tsx`
- `client/src/app/layout.tsx`

**DO NOT TOUCH** — anything under `src/app/` except `layout.tsx`. Do not touch
`src/components/ui/`.

**Design spec**

**`Navbar.tsx`** (server component). The floating glass pill is gone. The
navbar is a plain static header at the top of the document flow:

- `<header className="border-b border-rule">`
- inner: `mx-auto flex max-w-[--container-ui] items-center justify-between px-6 py-5`
- left: `next/link` to `/` with the text `Tayyab Tariq`, styled
  `text-base font-medium text-ink` — **no gradient, no `font-black`**
- right: `<NavLinks />`
- **the "Let's Talk" CTA button is removed from the navbar.** Contact is a nav
  item like any other; a CTA in the navbar on a personal site is agency chrome.

**`NavLinks.tsx`** (`"use client"` — needs `usePathname`):

- items: `Work` → `/projects`, `About` → `/about`, `Contact` → `/contact`
  (note: "Projects" is renamed to "Work" — it is the stronger word, and the
  route stays `/projects`)
- `<nav className="flex items-center gap-1">`
- each link: `rounded-md px-3 py-2.5 text-sm min-h-11 inline-flex items-center transition-colors duration-[--duration-fast]`
- inactive: `text-ink-muted hover:text-ink`
- active: `text-accent` — active when `pathname === href` or
  `pathname.startsWith(href + "/")`
- active link also gets `aria-current="page"`
- **no sliding indicator, no layout animation, no motion library**

**`Footer.tsx`** (server component). The three-column grid with gradient
dividers and glowing social buttons is replaced by a single quiet row:

- `<footer className="border-t border-rule mt-28">`
- inner: `mx-auto max-w-[--container-ui] px-6 py-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between`
- left: `<p className="text-xs text-ink-faint">© {new Date().getFullYear()} Tayyab Tariq</p>`
- right: a `<ul className="flex gap-5">` of three `TextLink`s — `Email`
  (`mailto:tayyabtariq838@gmail.com`), `GitHub`
  (`https://github.com/itx-tayyab`, external), `LinkedIn`
  (`https://www.linkedin.com/in/tayyab-tariq-a51379260/`, external)
- **text links, not icon buttons** — this fixes the unlabelled-icon
  accessibility failure outright
- the "Built with Next.js & Tailwind CSS" line is deleted

**`SkipLink.tsx`** (server component):

```tsx
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
    >
      Skip to content
    </a>
  );
}
```

**`layout.tsx`** body becomes:

```tsx
<body className={`${bricolage.variable} ${sourceSerif.variable}`}>
  <SkipLink />
  <Navbar />
  <main id="main">{children}</main>
  <Footer />
</body>
```

**Steps**
1. Create `SkipLink.tsx` and `NavLinks.tsx`.
2. Rewrite `Navbar.tsx` and `Footer.tsx`.
3. Update `layout.tsx` to add `SkipLink` and wrap `children` in `<main id="main">`.

**Acceptance criteria**
- [ ] `grep -rnE "glass-pill|rounded-full|gradient|cyan|purple|font-black" src/components/Navbar.tsx src/components/Footer.tsx` returns nothing.
- [ ] `Navbar.tsx` and `Footer.tsx` do not contain `"use client"`.
- [ ] `NavLinks.tsx` is the only shell file with `"use client"`.
- [ ] `layout.tsx` contains `<main id="main">`.
- [ ] No `lucide-react` icon is used as the sole content of a link anywhere in the footer.
- [ ] Every nav link has `min-h-11`.

**Verify**
```bash
cd client && npx tsc --noEmit 2>&1 | grep -v "framer-motion" | tail -20
```

**Rollback** — `git checkout -- src/components/Navbar.tsx src/components/Footer.tsx src/app/layout.tsx && rm -f src/components/NavLinks.tsx src/components/SkipLink.tsx`

---

### Phase 3 — Content layer

**Goal** — One typed source of truth for project data and site config. Kill the
duplication and the placeholder URLs.

**Depends on** — Phase 0.

**Files created**
- `client/src/data/projects.ts`

**Files modified** — none. (Pages are rewired in Phases 6 and 7.)

**DO NOT TOUCH** — any page file, any component, and `src/data/site.ts`
(created in Phase 0). This phase adds exactly one file.

**Design spec**

`site.ts` already exists — it was created in Phase 0 because the metadata in
`layout.tsx` depends on it. **Do not recreate or edit it here.**

`projects.ts` — the type, then the four entries:

```ts
export type Project = {
  slug: string;
  title: string;
  summary: string;        // one sentence, max 140 chars, used on the index
  year: string;           // "2024—26" for Harmoni, "2026" for ClientBridge,
                          // "2025" for both Flutter apps
  status: "Shipped" | "In progress";
  role: string;           // "Design and engineering" for all four
  stack: string[];        // canonical, single source — no duplicates
  cover: string;          // path under /public
  images: string[];       // case-study gallery, may be empty
  context: string;        // what the problem actually was
  approach: string;       // what you built and the decisions you made
  decisions: string[];    // 2–4 concrete engineering choices + why
  repo?: string;          // omit entirely if there is no public repo
  live?: string;          // omit entirely if there is no live URL
};
```

**Resolving the two conflicting copies.** Where `projectsData` and `projectsDB`
disagree, `projectsDB` (the detail page) wins for narrative fields and
`projectsData` wins for `cover`. For ClientBridge's stack the two lists
conflict — use the detail-page list plus `Prisma ORM` and `PostgreSQL`, which
appear in the index list and in the project's own stated achievements:
`["Next.js", "Express.js", "Prisma ORM", "PostgreSQL", "Socket.io", "Tailwind CSS"]`.

**Placeholder URL policy — this is a blocker fix, follow it exactly.**

- Harmoni: `repo` is `https://github.com/yourusername/harmoni` and `live` is
  `https://harmoni.app`. **Both are fake. Omit both fields entirely** for
  Harmoni. Do not guess a replacement URL.
- Covid19 Tracker and Weather App: `liveLink` is `"#"`. **Omit the `live`
  field** for both. Keep their real `repo` values.
- ClientBridge: `liveLink` is `"#"` — **omit `live`**. Keep the real repo.

**Broken image paths — second blocker fix, follow exactly.** Four referenced
files do not exist on disk. Verified against `client/public/images/`:

| Referenced in old code | Reality | Action |
|---|---|---|
| `/images/covid-main.png` | missing | remove from `images` |
| `/images/covid-stats.png` | missing | remove from `images` |
| `/images/weather-home.png` | missing | remove from `images` |
| `/images/Cbmessage.png` | real file is `CBmessage.png` | fix case to `/images/CBmessage.png` |

That leaves Covid19 Tracker and Weather App with empty `images` arrays. **That
is correct — leave them empty.** Use their existing `cover`
(`/images/covid19project.png`, `/images/weatherproject.png`) as the only
visual. Phase 7 must render a case study with no gallery without breaking. Do
not invent replacement filenames and do not point two projects at the same
screenshot.

**Claims policy.** The old `achievements` arrays contain unverifiable metrics
("Reduced context-switching time by 40% in beta testing" on a product with no
users; "Achieved 99.9% crash-free sessions" with no crash reporting). The
`achievements` field does not exist in the new type. Replace it with
`decisions`, which states engineering choices rather than invented outcomes.
Write the four `decisions` arrays by rephrasing the existing `learnings` and
`achievements` content as decisions, and **delete any numeric claim that is not
independently verifiable** — specifically delete the 40% figure, the 99.9%
figure, the "1000+ concurrent users" figure and "60fps animations".

**Steps**
1. Write `src/data/projects.ts` with the type and all four projects, reading
   the source values out of `src/app/projects/page.tsx` and
   `src/app/projects/[projectId]/page.tsx`.
2. Confirm `getProject` and `getProjectSlugs` are exported.

**Acceptance criteria**
- [ ] `src/data/projects.ts` exports `Project`, `projects`, `getProject`, `getProjectSlugs`.
- [ ] `projects` has exactly 4 entries with slugs `harmoni`, `clientbridge`, `covid19-tracker-app`, `weather-app`.
- [ ] `grep -n "yourusername\|harmoni.app\|\"#\"" src/data/projects.ts` returns nothing.
- [ ] `grep -nE "40%|99\.9|1000\+|60fps" src/data/projects.ts` returns nothing.
- [ ] No entry has an `achievements` field.
- [ ] Every `cover` path exists under `client/public/`.
- [ ] Every path in every `images` array exists under `client/public/` — verify with the command below, which must print nothing.
- [ ] `covid19-tracker-app` and `weather-app` have `images: []`.

**Verify**
```bash
cd client && npx tsc --noEmit 2>&1 | grep -v "framer-motion" | tail -20
```
```bash
cd client && grep -oE '/images/[A-Za-z0-9._-]+' src/data/projects.ts | sort -u | while read p; do test -f "public$p" || echo "MISSING: $p"; done
```
The second command must print nothing.

**Rollback** — `rm -rf src/data`

---

### Phase 4 — Home

**Goal** — Rebuild the home page as a server component: one typographic hero,
the work, and one closing line. Six sections become three.

**Depends on** — Phases 0, 1, 2, 3.

**Files modified** — `client/src/app/page.tsx`

**DO NOT TOUCH** — every other page, `src/components/ui/`, `src/data/`,
`globals.css`, `layout.tsx`.

**Design spec**

Remove `"use client"`. This file becomes a server component with **zero**
`useState`, `useEffect` or event handlers. It imports `projects` from
`@/data/projects` and the primitives from `@/components/ui/`.

**Sections that are deleted entirely and not replaced:**

| Deleted | Why |
|---|---|
| Tech-stack badge strip | A logo wall is not evidence. The stack is visible on each case study. |
| "Turning vision into reality" + fake code editor | The copy makes no checkable claim and the code is invented. |
| Services bento grid (4 cards) | Agency chrome on a personal site with no pricing or process. |
| Closing CTA card with glow blobs | Replaced by one line of text. |

**Section 1 — Hero.** Left-aligned, no photo, no stats, no availability badge.

- `<Section size="lg">`
- `<h1 className="reveal max-w-[18ch] text-4xl font-semibold leading-tight tracking-tight md:text-5xl">`
  Text, exactly: `I build real-time systems that teams actually use.`
- `<p className="reveal reveal-delay-1 mt-6 max-w-[48ch] text-lg text-ink-muted">`
  Text, exactly: `Product engineer working across NestJS, Next.js and Flutter. I take products from schema design through to the interface — most recently a collaboration platform handling live messaging, tasks and files in one surface.`
- `<div className="reveal reveal-delay-2 mt-10 flex flex-wrap gap-3">` containing:
  - `<Button href="/projects" variant="primary">See the work</Button>`
  - `<Button href="/contact" variant="secondary">Get in touch</Button>`
- **Three `.reveal` children maximum. No fourth.**

**Section 2 — Selected work.** The page's centre of gravity.

- `<Section>` with `<h2 className="text-3xl font-semibold tracking-tight">Selected work</h2>`
- `<ul className="mt-14 flex flex-col gap-20">`
- Render `projects.slice(0, 2)` — **the two full-stack projects only**
  (`harmoni`, `clientbridge`). The two Flutter apps appear on `/projects`,
  not here.
- Each `<li>` uses `<Rail>`:
  - `meta` cell: `project.year`, `project.status`, then `project.stack.slice(0, 4)` each on its own line
  - content cell:
    - `next/image` of `project.cover`, `width={1200} height={750}`,
      `className="rounded-md border border-rule"`, `sizes="(min-width: 768px) 46rem, 100vw"`,
      `priority` on the **first item only**
    - `<h3 className="mt-6 text-xl font-medium">{project.title}</h3>`
    - `<p className="mt-2 max-w-[56ch] text-ink-muted">{project.summary}</p>`
    - `<div className="mt-4"><TextLink href={`/projects/${project.slug}`}>Read the case study</TextLink></div>`
- Below the list: `<div className="mt-16"><TextLink href="/projects">All four projects</TextLink></div>`

**Section 3 — Close.** One sentence, no card, no glow, no heading.

- `<Section sunk>`
- `<p className="max-w-[40ch] text-2xl font-medium tracking-tight">`
  Text, exactly: `Currently open to product engineering roles and freelance work.`
- `<div className="mt-6"><Button href="/contact" variant="primary">Get in touch</Button></div>`

**Steps**
1. Delete the entire current contents of `src/app/page.tsx`.
2. Write the three sections above.
3. Add a route-level metadata export:
   ```tsx
   export const metadata = {
     description:
       "Product engineer building real-time collaboration systems with NestJS, Next.js and Flutter.",
   };
   ```

**Acceptance criteria**
- [ ] `page.tsx` does not contain `"use client"`.
- [ ] `grep -nE "framer-motion|motion\.|cyan|purple|gradient|font-black|glow-card|blur-\[" src/app/page.tsx` returns nothing.
- [ ] `grep -c "reveal" src/app/page.tsx` returns 3 or fewer occurrences of the class on elements.
- [ ] The file is under 150 lines.
- [ ] No `<h3>` or smaller heading uses a weight above 500.
- [ ] No text content mentions "3+", "10+", "12+", "Years Coding", "Projects Built" or "Tools Mastered".

**Verify**
```bash
cd client && npx tsc --noEmit 2>&1 | grep -v "framer-motion" | tail -20
```

**Rollback** — `git checkout -- src/app/page.tsx`

---

### Phase 5 — About

**Goal** — Rebuild About as a server component with prose that states what he
has built rather than what he enjoys.

**Depends on** — Phases 0, 1, 2, 3.

**Files modified** — `client/src/app/about/page.tsx`

**DO NOT TOUCH** — every other page, the primitives, the data layer.

**Design spec**

Remove `"use client"`. Server component, no motion, no photo frame effects.

**Deleted entirely:** the three-stat bar, the education timeline section (both
the horizontal desktop line and the mobile vertical variant), the "What Drives
Me" three-card grid, the six-card "Technical Expertise" bento, and the closing
CTA card with its glow blobs and pill buttons.

**Section 1 — Heading and biography.**

- `<Section size="lg">`
- `<h1 className="text-4xl font-semibold tracking-tight leading-tight">About</h1>`
- `<Prose className="mt-10">` with exactly four paragraphs:
  1. `I'm Tayyab Tariq, a product engineer based in Pakistan. I work across the stack — schema and API design in NestJS and Express, interfaces in Next.js, and cross-platform mobile in Flutter.`
  2. `Most of my work has been on collaboration tools. Harmoni puts messaging, task management and file sharing behind one interface, which meant designing a WebSocket gateway that stays consistent with a Postgres-backed task model. ClientBridge solves a narrower version of the same problem for freelancers and their clients, with role-scoped access so a client only ever sees their own projects.`
  3. `The part I'm most deliberate about is the boundary between the two halves — what the server owns, what the client caches, and what happens when they disagree. Real-time features make that boundary visible, which is why I keep building them.`
  4. `I'm finishing a BS in Computer Science at Superior University in Lahore, graduating in 2026.`
- **The education fact is one sentence inside the prose, not a section.**

**Section 2 — Stack.** A plain list, not cards.

- `<Section>`
- `<h2 className="text-2xl font-semibold tracking-tight">Stack</h2>`
- `<dl className="mt-10 flex flex-col gap-8">` with four `<div>` rows, each:
  - `<dt className="text-sm font-medium text-ink">` — the group name
  - `<dd className="mt-2 flex flex-wrap gap-2">` — `<Tag>` per item
- The four rows, exactly:
  - `Backend` — `Node.js`, `NestJS`, `Express`, `Socket.io`, `REST APIs`
  - `Frontend` — `Next.js`, `React`, `TypeScript`, `Tailwind CSS`
  - `Mobile` — `Flutter`, `Dart`, `Provider`
  - `Data and infrastructure` — `PostgreSQL`, `Prisma`, `Redis`, `MongoDB`, `Docker`, `Git`

**Steps**
1. Replace the file contents with the two sections above.
2. Add `export const metadata = { title: "About" };`

**Acceptance criteria**
- [ ] No `"use client"`.
- [ ] `grep -nE "framer-motion|motion\.|cyan|purple|gradient|font-black|glow-card|blur-\[|animate-" src/app/about/page.tsx` returns nothing.
- [ ] No ALL-CAPS eyebrow (`uppercase tracking-widest`) anywhere in the file.
- [ ] The file is under 120 lines.
- [ ] No text content contains "passion", "love", "enjoy", "curiosity" or "I don't just write code".
- [ ] The `Prose` component is used exactly once.

**Verify**
```bash
cd client && npx tsc --noEmit 2>&1 | grep -v "framer-motion" | tail -20
```

**Rollback** — `git checkout -- src/app/about/page.tsx`

---

### Phase 6 — Projects index

**Goal** — Rebuild `/projects` as a server component reading from `src/data/`.

**Depends on** — Phases 0, 1, 2, 3.

**Files modified** — `client/src/app/projects/page.tsx`

**DO NOT TOUCH** — `src/app/projects/[projectId]/page.tsx` (Phase 7), any
other page, the data layer.

**Design spec**

Remove `"use client"`. Delete the inline `projectsData` array, the
`getTagStyle` function, the tilt/mouse-tracking card effect, the segmented
filter tabs and the `AnimatePresence` grid.

**The category filter is removed.** Four items do not need filtering; a
filter control on a four-item list is interface theatre and was the only
reason this page needed client JavaScript.

- `<Section size="lg">`
- `<h1 className="text-4xl font-semibold tracking-tight leading-tight">Work</h1>`
- `<p className="mt-6 max-w-[52ch] text-lg text-ink-muted">` Text, exactly:
  `Four projects, two of them full-stack platforms I designed and built end to end.`
- `<ul className="mt-20 flex flex-col gap-20">` over **all four** `projects`
- Each `<li>` uses `<Rail>`, identical in structure to the home page's work
  list (§Phase 4, Section 2) so the two pages read as one system:
  - `meta`: `project.year`, `project.status`, `project.stack.slice(0, 4)`
  - content: cover image (`priority` on the first only), `h2` title at
    `text-xl font-medium`, summary paragraph, `TextLink` to the case study
- Use `<h2>` here, not `<h3>` — on this page the project titles are the
  top-level content under the page `h1`.

**Steps**
1. Replace the file contents.
2. Add `export const metadata = { title: "Work", description: "Selected product engineering work — real-time collaboration platforms and cross-platform mobile apps." };`

**Acceptance criteria**
- [ ] No `"use client"`, no `useState`, no `useRef`.
- [ ] The file contains no project data — all four come from `@/data/projects`.
- [ ] `grep -nE "framer-motion|AnimatePresence|getTagStyle|cyan|purple|gradient|max-w-7xl" src/app/projects/page.tsx` returns nothing.
- [ ] The file is under 90 lines.
- [ ] Container width matches every other page (`--container-ui` via `Section`).

**Verify**
```bash
cd client && npx tsc --noEmit 2>&1 | grep -v "framer-motion" | tail -20
```

**Rollback** — `git checkout -- src/app/projects/page.tsx`

---

### Phase 7 — Project detail

**Goal** — Rebuild the case study as a statically generated server component
with a small client island for the gallery. This is the highest-value page on
the site; spend the care here.

**Depends on** — Phases 0, 1, 2, 3, 6.

**Files created** — `client/src/components/project/Gallery.tsx`

**Files modified** — `client/src/app/projects/[projectId]/page.tsx`

**DO NOT TOUCH** — every other page, the data layer, the primitives.

**Design spec — the page (server component)**

Remove `"use client"`. Delete the inline `projectsDB` object, the carousel
state, and the hand-built lightbox `div`. Read from `@/data/projects`.

Add static generation and real per-route metadata:

```tsx
export function generateStaticParams() {
  return getProjectSlugs().map((projectId) => ({ projectId }));
}

export async function generateMetadata({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = getProject(projectId);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: [project.cover] },
  };
}
```

Unknown slug: call `notFound()` from `next/navigation`. Delete the inline
"Project Not Found" markup.

Page structure:

1. **Header** — `<Section size="lg">`
   - `<TextLink href="/projects">Back to work</TextLink>` (no arrow glyph)
   - `<h1 className="mt-8 text-4xl font-semibold tracking-tight leading-tight">{project.title}</h1>`
   - `<p className="mt-5 max-w-[52ch] text-lg text-ink-muted">{project.summary}</p>`
   - A `<dl className="mt-10 flex flex-wrap gap-x-12 gap-y-4">` with
     `Year` / `Status` / `Role`, each `<dt>` at `text-xs text-ink-faint` and
     `<dd>` at `text-sm`
   - Links row: `TextLink` to `project.repo` and `project.live`
     **only when those fields are present** — render nothing when absent
   - **No background gradient on this header.** Delete the per-project
     `gradient` field usage entirely.

2. **Cover** — full-bleed band, the one bold move:
   - `<div className="mx-auto mt-4 w-full max-w-[--container-wide] px-6">`
   - `next/image`, `width={2000} height={1250}`, `priority`,
     `className="w-full rounded-md border border-rule"`,
     `style={{ boxShadow: "0 1px 2px oklch(0.22 0.018 265 / 0.06)" }}`,
     `sizes="(min-width: 1280px) 72rem, 100vw"`

3. **Narrative** — `<Section>`, two `Rail` blocks:
   - meta `Context` → `<Prose>{project.context}</Prose>`
   - meta `Approach` → `<Prose>{project.approach}</Prose>`

4. **Decisions** — `<Section>`:
   - `<h2 className="text-2xl font-semibold tracking-tight">Engineering decisions</h2>`
   - `<ol className="mt-10 flex flex-col gap-6 max-w-[56ch]">`, each `<li>`
     `text-ink-muted` with the decision text
   - Numbered because these genuinely are an ordered narrative of choices —
     this is the only numbered list on the site.

5. **Stack** — `<Section>`: `h2` `Stack`, then `<Tag>` per `project.stack` entry.

6. **Gallery** — render `<Gallery images={project.images} title={project.title} />`
   **only when `project.images.length > 0`.** Two of the four projects have
   empty arrays; the page must render correctly with this section absent.

7. **Next project** — `<Section sunk>` with a `TextLink` to the next project in
   `projects` order, wrapping to the first.

**Design spec — `Gallery.tsx` (client component)**

`"use client"`. Props: `{ images: string[]; title: string }`.

A thumbnail grid that opens a **native `<dialog>`** — not a custom overlay.
The browser then provides the inert page, focus containment, top-layer
rendering, `Esc` and back-gesture dismissal, and focus return to the invoker.

- Grid: `<ul className="grid grid-cols-2 gap-4 md:grid-cols-3">`, each item a
  `<button>` wrapping a `next/image` thumbnail with
  `aria-label={`Open image ${i + 1} of ${images.length}`}`
- One `<dialog>` in the component, opened with `dialogRef.current.showModal()`
- `closedby="any"` so clicking the backdrop closes it, with `Esc` still working
- `aria-label={`${title} screenshots`}` on the dialog
- A visible close `<button>` with `command="close"` semantics, and `autofocus`
  on the next/previous control
- Previous / next buttons update an index; `ArrowLeft` / `ArrowRight` key
  handlers on the dialog do the same
- **Mandatory CSS, both rules** — without them, scrolling over the backdrop or
  inside the dialog scrolls the page behind it. Put these in `globals.css`
  under `@layer base`:
  ```css
  dialog:modal { overscroll-behavior: contain; }
  dialog::backdrop { overscroll-behavior: contain; background: oklch(0.22 0.018 265 / 0.6); }
  ```
  Do **not** lock scrolling with `overflow: hidden` on `html` or `body`.

Forbidden here — the browser already does all of it, and re-implementing it is
what made the old lightbox inaccessible:
- `role="dialog"` or `aria-modal` on the `<dialog>`
- a focus trap, `inert` toggling, or a manual `Esc` key handler for dismissal
- code to return focus on close
- opening with `.show()` or the `open` attribute

**Steps**
1. Write `src/components/project/Gallery.tsx`.
2. Add the two `dialog` CSS rules to `globals.css`.
3. Rewrite `src/app/projects/[projectId]/page.tsx` per the seven-part structure.

**Acceptance criteria**
- [ ] The page file has no `"use client"`; `Gallery.tsx` is the only client code.
- [ ] `generateStaticParams` and `generateMetadata` are both exported from the page.
- [ ] `grep -nE "framer-motion|projectsDB|useParams|AnimatePresence|gradient|cyan" src/app/projects/[projectId]/page.tsx` returns nothing.
- [ ] `grep -nE "role=\"dialog\"|aria-modal|inert" src/components/project/Gallery.tsx` returns nothing.
- [ ] `Gallery.tsx` contains `showModal()` and `closedby`.
- [ ] Visiting `/projects/weather-app` renders with no gallery section and no error.
- [ ] Visiting `/projects/not-a-real-slug` returns the 404 page.
- [ ] `npm run build` output lists four static `/projects/[projectId]` routes.

**Verify**
```bash
cd client && npx tsc --noEmit && npm run build 2>&1 | tail -30
```
This is the first phase where the **full build must pass**.

**Rollback** — `git checkout -- src/app/projects/[projectId]/page.tsx src/app/globals.css && rm -rf src/components/project`

---

### Phase 8 — Contact

**Goal** — Replace the fake form with one that either works or does not claim
to. Fix the labels and the focus states.

**Depends on** — Phases 0, 1, 2, 3.

**Files modified** — `client/src/app/contact/page.tsx`

**DO NOT TOUCH** — every other page, the primitives, the data layer.

**Design spec**

The current form calls `setTimeout(1500)` and then displays "Message Sent!"
without sending anything. **Shipping a contact form that lies is worse than
shipping no form.** Two options, and this plan chooses the second:

1. Wire a real submission (Resend, Formspree, a route handler) — out of scope
   here because it needs an account and an API key the implementer does not have.
2. **Remove the form.** Make the page a short, direct contact block.

Build option 2.

- Remove `"use client"`, `useState` and `handleSubmit`. Server component.
- Delete the empty `<section>` that currently opens the page.
- `<Section size="lg">`
  - `<h1 className="text-4xl font-semibold tracking-tight leading-tight">Contact</h1>`
  - `<p className="mt-6 max-w-[48ch] text-lg text-ink-muted">` Text, exactly:
    `Open to product engineering roles and freelance work. Email is the fastest way to reach me.`
  - `<dl className="mt-12 flex flex-col gap-8">` with three rows, each
    `<dt className="text-xs text-ink-faint">` + `<dd className="mt-1 text-base">`:
    - `Email` → `<TextLink href="mailto:tayyabtariq838@gmail.com">tayyabtariq838@gmail.com</TextLink>`
    - `Location` → plain text `Pakistan — available remote`
    - `Elsewhere` → two `TextLink`s, `GitHub` and `LinkedIn`, both external,
      separated by a `<span className="mx-3 text-rule">/</span>`
- Read all values from `siteConfig` in `@/data/site`, not as literals.

If a real form endpoint becomes available later, add it as its own phase. Do
not add it here.

**Steps**
1. Replace the file contents.
2. Add `export const metadata = { title: "Contact" };`

**Acceptance criteria**
- [ ] No `"use client"`, no `useState`, no `setTimeout`.
- [ ] No `<form>`, `<input>` or `<textarea>` element remains in the file.
- [ ] `grep -nE "focus:outline-none" src/app/contact/page.tsx` returns nothing.
- [ ] Contact details are read from `siteConfig`, not hardcoded.
- [ ] The file is under 70 lines.

**Verify**
```bash
cd client && npx tsc --noEmit && npm run build 2>&1 | tail -20
```

**Rollback** — `git checkout -- src/app/contact/page.tsx`

---

### Phase 9 — Accessibility and performance hardening

**Goal** — Verify the rebuilt site against measurable targets and fix what fails.

**Depends on** — Phases 0–8.

**Files modified** — whichever files fail a check. Expect few or none.

**DO NOT TOUCH** — the design. This phase fixes defects, it does not restyle.

**Design spec — the checks, with pass thresholds**

Accessibility:
1. `grep -rn "focus:outline-none" src/` → must return nothing.
2. Every `<a>` and `<button>` has a text label or an `aria-label`. Check by
   grepping for links whose children are only an icon component.
3. Tab through every page from the address bar. The skip link appears first;
   focus is visible on every stop; focus order matches visual order.
4. Contrast. Every pair below was computed from the §3.1 OKLCH values
   (converted through linear sRGB with correct gamma encoding) and verified
   in-gamut. The weaker of the two grounds is shown:

   | Foreground | on `paper` | on `paper-sunk` | WCAG |
   |---|---|---|---|
   | `ink` | 16.59:1 | 15.20:1 | AA + AAA |
   | `ink-muted` | 6.27:1 | 5.74:1 | AA |
   | `ink-faint` | 5.06:1 | 4.63:1 | AA |
   | `accent` | 5.50:1 | 5.04:1 | AA |
   | `accent-hover` | 7.82:1 | 7.17:1 | AA + AAA |
   | `paper` on `ink` (primary button) | 16.59:1 | — | AA + AAA |
   | `rule-strong` (UI boundary, needs 3:1) | 3.22:1 | 2.95:1 | 1.4.11 on `paper` |

   **These pass by construction.** If any text on the site fails, it is using
   a colour outside the token system — find it and replace it with a token.
   Note `rule-strong` is 2.95:1 against `paper-sunk`, marginally under 3:1:
   **do not place a `Tag` or a secondary `Button` inside a `sunk` section.**
   `rule` at 1.29:1 is a decorative divider only and must never bound an
   interactive element.
5. Every `next/image` has a meaningful `alt`, or `alt=""` if truly decorative.
6. One `<h1>` per page; no heading level is skipped.

Performance:
7. `npm run build` — first-load JS for `/`, `/about` and `/projects` must be
   **under 110 kB**. They are server components with no client island, so this
   should pass comfortably. If one exceeds it, a `"use client"` leaked in.
8. `priority` appears on at most **one** image per route.
9. `grep -rn "backdrop-filter\|background-attachment: fixed" src/` → nothing.
10. `grep -rn "animate-\[spin\|animate-ping\|animation.*infinite" src/` → nothing.

**Steps**
1. Run every check above in order.
2. Fix only what fails. Record each fix in the commit message.
3. Re-run.

**Acceptance criteria**
- [ ] All ten checks pass.
- [ ] No new dependency was added.
- [ ] No token value in `globals.css` was changed.

**Verify**
```bash
cd client && npm run build 2>&1 | grep -A20 "Route (app)"
```
```bash
cd client && grep -rn "focus:outline-none\|backdrop-filter\|animate-ping" src/ || echo "clean"
```

**Rollback** — revert the individual fix commits.

---

### Phase 10 — SEO, OG image, sitemap, structured data

**Goal** — Make every route discoverable and shareable.

**Depends on** — Phases 0–9.

**Files created**
- `client/src/app/sitemap.ts`
- `client/src/app/robots.ts`
- `client/src/app/opengraph-image.tsx`

**Files modified** — `client/src/app/layout.tsx` (JSON-LD only)

**DO NOT TOUCH** — any page component. Per-route metadata was added in
Phases 4–8 and is already correct.

**Design spec**

**The site has no custom domain yet and runs on `http://localhost:3000`.** That
is fine for every file in this phase — all of them read `siteUrl` from
`@/data/site`, which falls back to localhost and switches to the real domain
the moment `NEXT_PUBLIC_SITE_URL` is set in the hosting environment. **Do not
hardcode a domain in any file here, and do not skip this phase because the
domain is missing.** The sitemap will list `http://localhost:3000/...` locally;
that is the expected output and not a bug.

`sitemap.ts` — returns `/`, `/about`, `/projects`, `/contact`, plus one entry
per slug from `getProjectSlugs()`. Base URL from `siteUrl`.

`robots.ts` — allow all, point `sitemap` at `${siteUrl}/sitemap.xml`.

`opengraph-image.tsx` — Next's file-based OG image, `size: { width: 1200,
height: 630 }`, `contentType: "image/png"`. Render on `--color-paper`
background with `--color-ink` text: the name at 64px weight 600, the role at
32px in `--color-muted`. **No gradient, no accent colour, no photo.** Use
literal hex equivalents here since the ImageResponse runtime does not read the
stylesheet: paper `#f9fafc`, ink `#161b23`, muted `#5a5e65` — these are the exact
sRGB equivalents of the `paper`, `ink` and `ink-muted` tokens.

JSON-LD in `layout.tsx` — a `Person` object inside
`<script type="application/ld+json">` with `name`, `jobTitle`
(`"Product Engineer"`), `url`, and `sameAs` holding the GitHub and LinkedIn
URLs, all read from `siteConfig`.

**Steps**
1. Write the three new files.
2. Add the JSON-LD script to `layout.tsx`.
3. Build and confirm the routes appear.

**Acceptance criteria**
- [ ] `curl`ing the built `/sitemap.xml` lists 8 URLs (4 static + 4 projects).
- [ ] `/robots.txt` resolves and references the sitemap.
- [ ] `/opengraph-image` renders a 1200×630 PNG.
- [ ] The JSON-LD validates as a `Person` with a `sameAs` array of 2 URLs.
- [ ] No route still reports the title "Create Next App".
- [ ] `grep -rn "https://tayyab\|\.dev\"\|\.com\"" src/app/sitemap.ts src/app/robots.ts` returns nothing — both read `siteUrl`.
- [ ] Sitemap URLs begin with `http://localhost:3000` when no env var is set. This is correct.

**Verify**
```bash
cd client && npm run build && npm run start &
sleep 5 && curl -s localhost:3000/sitemap.xml | head -20 && curl -s localhost:3000/robots.txt
```

**Rollback** — `rm -f src/app/sitemap.ts src/app/robots.ts src/app/opengraph-image.tsx && git checkout -- src/app/layout.tsx`

---

## 6. Appendix A — opencode kickoff prompt

Paste this into opencode for each phase, replacing `<N>` with the phase number.
Run one phase per session. Commit between phases.

```
Read docs/frontend-design.md.

Execute Phase <N> ONLY.

Rules:
1. Read the "Phase <N>" section in full before writing any code. Also read
   section 3 (Design system) — it defines every token you are allowed to use.
2. Change ONLY the files listed under "Files created" and "Files modified" in
   Phase <N>. Do not open or edit anything in that phase's "DO NOT TOUCH" list.
3. Do not refactor, tidy, rename or "improve" anything outside the phase scope,
   even if you notice a problem. If you find one, write it at the end of your
   response under "Out of scope:" and leave the code alone.
4. Use only the design tokens defined in section 3.1. Never write a raw hex
   value, a raw oklch() literal, or a stock Tailwind colour class such as
   text-cyan-400, bg-neutral-900 or text-gray-500.
5. Do not add any npm dependency. Do not reinstall framer-motion.
6. The spec gives literal values for every colour, size, duration and string.
   Use them exactly as written. You are not making design decisions — if you
   feel you need to choose something, re-read the spec; it is there.
7. When done, run the phase's "Verify" command and paste the real output.
8. Then go through the phase's "Acceptance criteria" one by one and state
   pass or fail for each, with the evidence. Do not claim a pass you did not
   verify.
9. Stop. Do not start the next phase.

If you are blocked, or the spec contradicts the code you find, stop and
explain the contradiction instead of guessing.
```

**After each phase passes, commit before starting the next:**

```bash
git add -A && git commit -m "redesign: phase <N> — <name>"
```

If a phase goes wrong, `git revert` costs one phase instead of the whole run.

---

## 7. Appendix B — before / after positioning

Every piece of user-facing copy on the site. Left is what ships today; right is
what the phases above replace it with. The pattern throughout: delete claims
about enthusiasm and unverifiable numbers, state what was built and decided.

### Home

| Current | Replacement |
|---|---|
| `Building digital experiences that matter.` (with "experiences" gradient-filled) | `I build real-time systems that teams actually use.` |
| `I bridge the gap between complex backend logic and pixel-perfect UI. Specializing in Node.js architectures, Next.js interfaces, and Cross-platform Flutter apps.` | `Product engineer working across NestJS, Next.js and Flutter. I take products from schema design through to the interface — most recently a collaboration platform handling live messaging, tasks and files in one surface.` |
| `Available for Freelance & Full-time` (pulsing badge) | Deleted from the hero. Stated once, plainly, in the closing section. |
| `3+ / Years Coding` | Deleted. Three years is not a selling point; the work is. |
| `10+ / Projects Built` | Deleted. Four projects are shown — the count contradicts the evidence. |
| `12+ / Tools Mastered` | Deleted. This counts logos. |
| `View Work` | `See the work` |
| `Download CV` | Deleted from the hero. |
| `Featured Work` (eyebrow) + `Highlighted Projects` (heading) | `Selected work` |
| `A few projects that reflect my ability to build scalable, efficient, and user-focused digital solutions` | Deleted. The projects are visible directly below; a sentence introducing a list is filler. |
| `Streamlining Team Efficiency` | `Harmoni` — the project's actual name |
| `View Case Study →` | `Read the case study` (no arrow) |
| `Explore all projects built by Tayyab` | `All four projects` |
| `Turning vision into reality through code.` | Section deleted. |
| `Beyond the code, I'm focused on engineering reliable systems and crafting user experiences that feel seamless.` | Deleted — no checkable claim. |
| `Services I Offer` / `Expert in building modern, high-performance applications.` | Section deleted. Agency framing on a personal site. |
| `Have a project in mind?` / `Whether you need a complex backend architecture, a stunning frontend, or a full-stack solution, I am ready to help you bring your vision to life.` | `Currently open to product engineering roles and freelance work.` |
| `Start a Conversation` | `Get in touch` |

### About

| Current | Replacement |
|---|---|
| `Biography` (eyebrow) | Deleted — all eyebrows go. |
| `Driven by Logic, Inspired by Innovation.` | `About` |
| `I am a Full Stack developer with a passion for building complex, scalable systems. My journey is defined by a curiosity for how things work under the hood.` | `I'm Tayyab Tariq, a product engineer based in Pakistan. I work across the stack — schema and API design in NestJS and Express, interfaces in Next.js, and cross-platform mobile in Flutter.` |
| `My interest in Full stack development started not just with writing code, but with the desire to solve real-world problems.` | `Most of my work has been on collaboration tools. Harmoni puts messaging, task management and file sharing behind one interface, which meant designing a WebSocket gateway that stays consistent with a Postgres-backed task model.` |
| `my true passion lies in Backend Architecture. I enjoy designing databases, optimizing API response times…` | `The part I'm most deliberate about is the boundary between the two halves — what the server owns, what the client caches, and what happens when they disagree.` |
| `I don't just write code; I engineer solutions.` | Deleted. Asserting the distinction is weaker than demonstrating it. |
| `Timeline` / `Academic Journey` + two timeline nodes | One sentence: `I'm finishing a BS in Computer Science at Superior University in Lahore, graduating in 2026.` |
| `Core Values` / `What Drives Me` + 3 cards | Deleted. |
| `Skills` / `Technical Expertise` + 6 bento cards | `Stack` — four plain labelled rows of tags. |
| `Let's Build Something Together.` | Deleted; the footer already links to contact. |

### Work

| Current | Replacement |
|---|---|
| Page has no `h1` | `Work` |
| Category filter tabs (`All`, `Full Stack`, `Mobile`) | Deleted — four items do not need a filter. |
| `An All-in-One Collaboration Hub combining real-time messaging, task management, and file sharing.` | Kept as `summary`, lightly tightened. |
| `Introducing ClientBridge, A dedicated collaboration platform where freelancers and clients stay on the same page.` | `A collaboration platform that keeps freelancers and their clients working from the same project state.` |

### Case study

| Current | Replacement |
|---|---|
| `Problem` / `Solution` headings | `Context` / `Approach` |
| `Key Learnings` | Deleted as a section — learnings are a student frame. |
| `Achievements` | `Engineering decisions` — what was chosen and why. |
| `Reduced context-switching time by 40% in beta testing` | Deleted. Harmoni is in progress and has no beta users to measure. |
| `Optimized WebSocket performance for 1000+ concurrent users` | `Chose a single WebSocket gateway over per-feature sockets so presence and task updates share one connection and one auth check.` |
| `Achieved 99.9% crash-free sessions` | Deleted. No crash reporting is wired up, so the number is invented. |
| `Smooth 60fps animations` | Deleted. |
| `Mastered Prisma ORM to handle intricate One-to-Many and Many-to-Many relationships` | `Modelled freelancer, client, project and invite as explicit relations in Prisma so access scoping is enforced by the schema rather than in controllers.` |
| `repoLink: https://github.com/yourusername/harmoni` | Field omitted — the repo is not public. |
| `liveLink: https://harmoni.app` | Field omitted — there is no live deployment. |

### Contact

| Current | Replacement |
|---|---|
| Page opens with an empty section and no heading | `Contact` |
| `Current Availability` card: `I am currently Available for freelance projects and open to discussing full-time opportunities.` | `Open to product engineering roles and freelance work. Email is the fastest way to reach me.` |
| `Send a Message` form (does not send) | Removed entirely — see Phase 8. |
| `Message Sent!` on a form that sends nothing | Deleted. |
| `Contact Details` / `Social Profiles` (ALL-CAPS eyebrows) | `Email` / `Location` / `Elsewhere` as a plain definition list. |

### Shell

| Current | Replacement |
|---|---|
| Nav: `Home`, `About`, `Projects`, `Contact` + `Let's Talk` button | `Work`, `About`, `Contact`. Logo links home; the CTA button is removed. |
| Footer: `I build practical, user-focused solutions that balance performance, usability, and scalability…` | Deleted. |
| Footer: `Have a project in mind? I'm always open to exploring opportunities that challenge me…` | Deleted. |
| Footer: `Built with Next.js & Tailwind CSS v4` | Deleted. |
| Footer sitemap column including a `/#services` link to a deleted section | Deleted — the footer is one row of three text links. |

---

## 8. What this plan does not do

Stated so no phase quietly adopts them:

- **No dark mode.** §3.6.
- **No working contact form.** Phase 8 removes the fake one; wiring a real
  endpoint needs an account and an API key and belongs in its own phase.
- **No blog, no CMS, no i18n.**
- **No new npm dependencies.** The plan removes one (`framer-motion`) and adds
  none.
- **No test suite.** The repo has none today and adding one is a separate
  decision.
- **No deployment.** The site runs on `localhost:3000`. Every URL in the
  metadata, sitemap, robots and JSON-LD derives from the single `siteUrl`
  constant in `src/data/site.ts`, which reads `NEXT_PUBLIC_SITE_URL` and falls
  back to localhost. Registering a domain and setting that one environment
  variable is the whole deploy story — no phase needs revisiting.
- **No new photography.** `Tayyab.jpg` and `Tayyab-transparent.png` go unused
  after Phase 4 and 5; leave the files in place rather than deleting them.
- **No replacement screenshots** for the three missing case-study images.
  Phase 3 removes the broken references; capturing new screenshots is the
  owner's job, and once the files exist they can be added to `images` with no
  code change.

---

## 9. Platform guidance applied

Specific external rules this plan encodes, so the implementer does not have to
re-derive them:

- **Reduced motion.** Never apply a global `animation-duration: 0.01ms` reset —
  it makes some animations more jarring, not less. Handle preference per rule
  with the `@media` query nested inside the rule. §3.1 defaults to static and
  opts in under `prefers-reduced-motion: no-preference`.
- **Compositor-only animation.** Animate `opacity` and `transform` (including
  `translate` and `scale` as individual properties) rather than `left`/`top`/
  `width`/`height`, so motion stays off the main thread. §3.5.
- **Native dialog.** The `<dialog>` element provides inert page, focus
  containment, top-layer rendering, `::backdrop`, `Esc` and back-gesture
  dismissal, and focus return to the invoker. Therefore: no `role="dialog"`,
  no `aria-modal`, no focus trap, no `inert` toggling, no manual `Esc`
  handler, and never open with `.show()` or the `open` attribute. Phase 7.
- **Dialog scroll containment.** `dialog:modal { overscroll-behavior: contain }`
  and `dialog::backdrop { overscroll-behavior: contain }` are both mandatory —
  without them, scrolling over the backdrop scrolls the page behind it. Do not
  use `overflow: hidden` on `html` or `body` instead. Phase 7.
- **Scroll-driven animations were considered and rejected.** CSS
  `animation-timeline: view()` has limited availability (no Firefox support),
  so it would need an `IntersectionObserver` fallback. Since §3.5 deletes
  scroll-triggered entrances entirely, neither is needed — the feature is not
  used anywhere in this plan.

---

*End of plan. Start with Phase 0.*
