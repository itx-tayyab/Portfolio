# Portfolio Frontend Redesign — Audit & Phase-Planning Prompt

> Paste everything below the line into Claude Code (Opus) at the repo root.
> It produces a single deliverable: `docs/frontend-design.md`.
> Do **not** let it write any component code — planning only.

---

## ROLE

You are a senior product designer + frontend architect doing a design audit and
redesign plan for a personal portfolio that must read as the work of a
**product engineer with taste**, not a bootcamp graduate.

The owner has already repositioned himself professionally on LinkedIn as a
Product Engineer (full-stack: NestJS/Node, Next.js, Flutter, PostgreSQL). The
site has not caught up. Your job is to close that gap.

## HARD CONSTRAINT — WHO IMPLEMENTS THIS

The plan will be executed by **opencode running DeepSeek v4.1 Flash** — a fast,
cheap, literal model with weak design judgment and a short effective context.

Therefore every phase you write MUST be:
- **Self-contained.** Readable and executable without any other phase in context.
  Repeat the token names, file paths, and class strings it needs. Redundancy is
  correct here; do not DRY the document.
- **Decision-free.** Zero aesthetic choices left open. Never write "use a
  tasteful spacing value" — write `py-20 md:py-28`. Never write "pick an accent"
  — write `--color-accent: oklch(0.72 0.14 215)`. If you catch yourself writing
  "appropriate", "suitable", "consider", or "as needed", replace it with a literal value.
- **Bounded.** Max ~3 files and ~400 changed lines per phase. Split anything larger.
- **Verifiable.** End each phase with a checklist a literal model can self-check,
  plus the exact shell command to prove it (`npm run build`, `npx tsc --noEmit`, `npm run lint`).
- **Fenced.** Each phase includes an explicit `DO NOT TOUCH` list so the model
  does not "improve" unrelated files or regress earlier phases.
- **Skill-free.** This is the rule most easily broken, so check it explicitly
  before you finish. **opencode has none of the skills you are about to use.**
  The skills exist only in *this* session, for *you*. Therefore
  `docs/frontend-design.md` must never name a skill, never say "apply X
  principles", and never defer judgment to a tool the implementer cannot reach.
  Every insight a skill gives you must be **transcribed into the document as a
  literal value or an explicit rule.** If a skill tells you "use physical,
  spring-based motion", you do not write that sentence — you write
  `transition={{ type: "spring", stiffness: 400, damping: 30 }}`. The finished
  document must be fully executable by a model with no skills, no plugins, no
  web access, and no design taste. Cite skills only in the preamble's
  provenance note, never inside a phase.

## SKILLS TO USE

Invoke these before writing the plan, and cite which one informed which decision
**in the preamble only** — see the skill-free rule above. These skills are
available to you in this Claude Code session; they are *not* available to the
opencode agent that will implement the plan. You are the only chance this
project gets to apply them, so apply them thoroughly and write their conclusions
down as hard values.

Installed and available now:
- `frontend-design:frontend-design` — **run this one first.** Aesthetic direction,
  typography, and specifically avoiding choices that read as templated defaults.
  It owns the core question of this project, so let it set the visual direction
  before the other skills refine it.
- `design:design-system` — token architecture, scales, component API surface
- `design:design-critique` — the critique pass on current state
- `design:accessibility-review` — contrast, focus, semantics, motion
- `design:ux-copy` — headline/microcopy rewrite from student voice to engineer voice
- `design:design-handoff` — use this to pressure-test that each phase spec is
  unambiguous enough for a weak implementing model
- `modern-web-guidance:modern-web-guidance` — Next 16 / React 19 / Tailwind v4 correctness

Not installed in this environment — note the gap in the document's preamble and
proceed with the installed set rather than stalling:
- `ui/ux pro max` — closest catalog match is the **VectorLab UI/UX Skills** plugin
- `app store design` — nearest catalog match is **appstore-screenshots** (Expo/RN
  oriented, not a web design skill). Treat "app store polish" as a quality bar to
  hit rather than a skill to invoke: tight optical alignment, consistent corner
  radii, deliberate empty states, no stray pixel.
- `emil kowalski` and `gstack` — not present in this plugin catalog. Apply the
  principles instead and say so explicitly: Kowalski-style craft means
  spring-based physical motion, 150–250ms durations, transform/opacity only,
  `prefers-reduced-motion` honored, and animation that explains state change
  rather than decorating it.

## WHAT YOU ARE AUDITING — GROUND TRUTH ALREADY ESTABLISHED

Do not re-derive this; verify it and go deeper. Stack: Next.js 16.1.1,
React 19.2.3, Tailwind v4 (`@tailwindcss/postcss`), framer-motion 12,
lucide-react. Source lives in `client/src`. Total app code ≈1546 lines.

Confirmed problems (cite `file:line` for each when you write them up):

**No design system.** `client/src/app/globals.css` defines exactly two tokens
(`--background: #030303`, `--foreground: #ededed`). Everything else is ad-hoc
utility classes. No color ramp, no spacing scale, no radius scale, no type
scale, no elevation scale, no motion tokens.

**One gradient, used 91 times.** Cyan→blue→purple appears as 141 `cyan-*`
references and 69 `purple-*` references across 7 files — on the logo, every
heading, every stat number, every button hover, every card border, the footer
divider, the section headers. It is the single loudest "student portfolio"
signal on the site. `client/src/app/page.tsx` alone has 33 gradient references.

**Five competing visual effects stacked.** Fixed SVG noise grain overlay
(`globals.css` `body::before`), fixed mesh radial-gradient background,
glassmorphism (`.glass-pill`, `.glass-card`), `.glow-card` with animated
gradient border + hover lift, and `pulse-glow-dot` + `animate-ping`. No
hierarchy between them; they fight.

**Typography is undisciplined.** `font-black` on nearly every heading. Ten
distinct text sizes used arbitrarily, weighted toward tiny: 47× `text-xs`,
40× `text-sm`, 17× `text-base`. Gradient fill applied to display text and to
numerals. `rounded-full` appears 76 times — every surface is a pill.

**Zero SEO/metadata.** `client/src/app/layout.tsx:18-21` still ships
`title: "Create Next App"`, `description: "Generated by create next app"`. No
OG image, no canonical, no per-route metadata, no JSON-LD.

**Architecture.** Only two shared components exist (`Navbar.tsx`, `Footer.tsx`).
Four page monoliths: `page.tsx` 464 lines, `about/page.tsx` 417,
`projects/page.tsx` 270, `projects/[projectId]/page.tsx` 492, `contact/page.tsx` 193.
No `components/ui/`, no `lib/`, no `data/`, no `content/`.

**Every page is `"use client"`.** All six source files opt out of RSC, so
framer-motion ships to every route including static ones.

**Data is duplicated and partly fake.** Project data is hardcoded twice:
`projectsData` in `client/src/app/projects/page.tsx:9` and `projectsDB` in
`client/src/app/projects/[projectId]/page.tsx:14` — the latter labeled
`// --- MOCK DATA ---` and containing placeholder links like
`https://github.com/yourusername/harmoni`. A reviewer who clicks that sees the
placeholder.

**Type hygiene.** Easing arrays cast with `as any` (introduced in commits
`07b7bf7`, `3ce1a4e`) to silence motion type conflicts.

**Accessibility unverified.** No `focus-visible` styling anywhere, no skip link,
no `prefers-reduced-motion` handling, gradient-on-dark text contrast unmeasured,
decorative icons unlabeled.

## AUDIT PASS — DO THIS FIRST

Read every file in `client/src` end to end. Then verify and extend the above
across these axes, and for each finding give: severity (`blocker` /
`major` / `minor`), `file:line` evidence, why it reads as amateur, and the fix direction.

1. **Visual identity** — color, gradient discipline, effect budget, what the
   palette communicates vs. what a product engineer should communicate.
2. **Typography** — scale, weight range, measure/line-length, rhythm, numerals.
3. **Layout & spacing** — container widths (note the `max-w-6xl` / `max-w-7xl`
   inconsistency), section rhythm (nearly everything is `py-24`), grid logic,
   whether any page has a real focal hierarchy.
4. **Component architecture** — what should be extracted into `components/ui/`,
   what belongs in `data/` or `content/`, which pages can become server components.
5. **Motion** — durations, easing, what animates and whether it earns it,
   reduced-motion, layout-shift risk.
6. **Content & positioning** — audit the actual copy. Flag every instance of
   student voice ("I love building", "3+ Years Coding", "12+ Tools Mastered",
   "Tools Mastered" as a metric at all) and specify the product-engineer
   replacement: problem → decision → outcome. Vanity counts out, shipped
   outcomes in.
7. **Responsive** — verify at 375 / 768 / 1280 / 1920. Note anything that only
   works at one breakpoint.
8. **Accessibility** — WCAG AA contrast on real measured pairs, focus order and
   visibility, semantics, alt text, touch targets.
9. **Performance** — client-boundary placement, per-route JS, image sizing,
   font loading, the fixed-position full-viewport overlays.
10. **SEO & metadata** — per-route metadata, OG/Twitter images, sitemap,
    robots, structured data.

## DESIGN DIRECTION YOU MUST SPECIFY

Do not hand back options. **Choose one direction and commit**, with a one-paragraph
rationale. It must be a deliberate reaction against the current look:

- Replace the tri-color gradient with a restrained system: one near-neutral base
  ramp plus exactly **one** accent, used sparingly and never on display text.
- Decide light/dark explicitly. If both, specify both palettes fully as tokens.
- Pick a real type pairing and give exact weights, sizes, line-heights, and
  tracking as tokens. Geist is acceptable but must be used with discipline;
  if you change it, name the font and the `next/font` import.
- Define the effect budget as a hard rule: name the **one** surface treatment
  that survives and explicitly kill the rest in writing.
- Give a complete token block as literal, paste-ready CSS for the Tailwind v4
  `@theme` directive in `globals.css`. Use `oklch()`. Every later phase
  references these token names and never raw hex or raw Tailwind color classes.

## PHASE PLAN — STRUCTURE

Sequence phases so the system lands before the pages, and so each phase leaves
the site in a shippable, building state.

- **Phase 0 — Foundation.** Design tokens in `globals.css` `@theme`, metadata
  fix in `layout.tsx`, font setup, `prefers-reduced-motion` + `focus-visible`
  base layer, motion constants module. No visual page work.
- **Phase 1 — Primitives.** `components/ui/` — the specific small set the audit
  justified. Name each file, its props with TypeScript types, and its variants.
  No page consumes them yet.
- **Phase 2 — Shell.** `Navbar`, `Footer`, skip link, page-shell wrapper.
- **Phase 3 — Content layer.** Single source of truth in `data/` or `content/`.
  Kill the `projectsData`/`projectsDB` duplication, type it, and replace the
  placeholder URLs with real ones or omit the field.
- **Phase 4 — Home** (`app/page.tsx`), split per section if it exceeds the bound.
- **Phase 5 — About** (`app/about/page.tsx`).
- **Phase 6 — Projects index** (`app/projects/page.tsx`).
- **Phase 7 — Project detail** (`app/projects/[projectId]/page.tsx`) — the
  highest-leverage page for a product engineer; specify it as a case study
  structure, not a screenshot gallery.
- **Phase 8 — Contact** (`app/contact/page.tsx`).
- **Phase 9 — Accessibility & performance hardening**, with measured targets.
- **Phase 10 — SEO, OG images, sitemap, robots, structured data.**

Adjust this sequence if the audit justifies it, but state why.

## PHASE TEMPLATE — USE EXACTLY THIS SHAPE

Every phase in the document uses this shape, with nothing left implicit:

```markdown
### Phase N — <name>

**Goal** — one sentence.
**Depends on** — Phase numbers, or "nothing".
**Files created** — exact paths.
**Files modified** — exact paths.
**DO NOT TOUCH** — exact paths/areas, so earlier phases are not regressed.

**Design spec**
<Literal values only. Exact token names, exact class strings, exact copy text,
exact motion durations and easings. Layout described concretely enough to build
without seeing a mockup. No adjectives standing in for numbers.>

**Steps**
1. ...
2. ...

**Acceptance criteria**
- [ ] checkable, objective statements

**Verify**
```bash
cd client && npx tsc --noEmit && npm run lint && npm run build
```

**Rollback** — `git revert` target or the files to restore.
```

## DOCUMENT OUTPUT

Write the whole thing to `docs/frontend-design.md`. Structure:

1. **Preamble** — current state in three sentences, the chosen direction in
   three, skills used, and the skill-availability gap noted above.
2. **Audit findings** — grouped by the ten axes, severity-sorted, with
   `file:line` evidence.
3. **Design system** — the complete literal token block plus the usage rules
   (what the accent may and may not touch, the effect budget, the type scale).
4. **Component inventory** — every primitive and section component with its
   props table and which phase creates it.
5. **Phases 0–N** — full template for each.
6. **Appendix A — opencode kickoff prompt** — a short copy-paste prompt the owner
   pastes into opencode to execute one phase, parameterized by phase number,
   that tells DeepSeek to read only that phase section, change only the listed
   files, and stop for review when the acceptance criteria pass or when it is
   blocked. Include the instruction that it must not refactor anything outside
   the phase scope.
7. **Appendix B — before/after positioning table** — current copy on the left,
   product-engineer rewrite on the right, for every headline, stat, and CTA on
   the site.

## FINAL SELF-CHECK — RUN BEFORE YOU DECLARE DONE

Re-read `docs/frontend-design.md` start to finish and verify:

- [ ] `grep -niE 'skill|invoke|frontend-design:|design:|superpowers'` over the
      phase sections returns nothing. Provenance belongs in the preamble alone.
- [ ] No phase contains the words "appropriate", "suitable", "consider",
      "tasteful", "as needed", "something like", or "e.g." in place of a value.
- [ ] Every color is a token name defined in the design-system section. No raw
      hex and no bare Tailwind color classes (`text-cyan-400`) survive anywhere.
- [ ] Every motion spec has literal duration, easing, and a reduced-motion branch.
- [ ] Every phase names its files, its `DO NOT TOUCH` list, its acceptance
      criteria, and its verify command.
- [ ] A reader who has never seen this repo, this conversation, or any skill
      could execute Phase 4 correctly using only the Phase 4 section.

Fix anything that fails, then state in your final message which checks passed.

## RULES

- Plan only. Write exactly one file: `docs/frontend-design.md`. Do not touch `client/`.
- Be specific enough that a literal model cannot go wrong, and opinionated
  enough that it has nothing to decide.
- Flag anything you could not verify rather than asserting it.
- There are uncommitted changes in `client/src/app/projects/[projectId]/page.tsx`
  — read the working-tree version, and note the dirty state in the preamble.
