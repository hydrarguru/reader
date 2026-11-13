---
name: Reader
description: Calm, reading-first community discussion on warm paper, with serif titles and one coral voice.
colors:
  surface-page: "#e6ebe0"
  surface-card: "#fafbf7"
  surface-sunken: "#dce2d5"
  surface-hover: "#f1f3ec"
  ink: "#26222e"
  ink-muted: "#5d576b"
  ink-inverse: "#fafbf7"
  brand: "#ed6a5a"
  on-brand: "#26222e"
  brand-ink: "#a93b2d"
  brand-soft: "#f8d9d3"
  accent: "#9bc1bc"
  accent-ink: "#3d6964"
  accent-soft: "#d3e3e0"
  highlight: "#f4f1bb"
  secondary: "#5d576b"
  line: "#ced5c6"
  line-strong: "#8a8497"
  focus: "#26222e"
  danger: "#b3261e"
  on-danger: "#fafbf7"
  surface-page-dark: "#1c1a21"
  surface-card-dark: "#262330"
  surface-sunken-dark: "#16141a"
  surface-hover-dark: "#2f2b3a"
  ink-dark: "#e6ebe0"
  ink-muted-dark: "#a9a3b6"
  ink-inverse-dark: "#26222e"
  brand-ink-dark: "#f08a7d"
  brand-soft-dark: "#4a2a2a"
  accent-ink-dark: "#9bc1bc"
  accent-soft-dark: "#22383a"
  secondary-dark: "#a9a3b6"
  line-dark: "#36313f"
  line-strong-dark: "#77718a"
  focus-dark: "#f4f1bb"
  danger-dark: "#ff8a80"
  on-danger-dark: "#26222e"
typography:
  display:
    fontFamily: "EB Garamond, Garamond, Iowan Old Style, Georgia, serif"
    fontSize: "56px"
    fontWeight: 500
    lineHeight: "60px"
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "EB Garamond, Garamond, Iowan Old Style, Georgia, serif"
    fontSize: "36px"
    fontWeight: 500
    lineHeight: "42px"
    letterSpacing: "-0.015em"
  headline-sm:
    fontFamily: "EB Garamond, Garamond, Iowan Old Style, Georgia, serif"
    fontSize: "26px"
    fontWeight: 500
    lineHeight: "32px"
    letterSpacing: "-0.01em"
  title:
    fontFamily: "EB Garamond, Garamond, Iowan Old Style, Georgia, serif"
    fontSize: "20px"
    fontWeight: 500
    lineHeight: "28px"
  body:
    fontFamily: "Instrument Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "26px"
  body-sm:
    fontFamily: "Instrument Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "22px"
  label:
    fontFamily: "Instrument Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "20px"
  meta:
    fontFamily: "Instrument Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: "18px"
  overline:
    fontFamily: "Instrument Sans, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: "16px"
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "12px"
  lg: "20px"
  pill: "999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-6: "24px"
  space-8: "32px"
  space-12: "48px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.on-brand}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
    height: "40px"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.ink-inverse}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
    height: "40px"
  button-outline:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
    height: "40px"
  button-outline-hover:
    backgroundColor: "{colors.surface-hover}"
  button-ghost:
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
    height: "40px"
  button-ghost-hover:
    backgroundColor: "{colors.surface-hover}"
    textColor: "{colors.ink}"
  button-destructive:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-danger}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
    height: "40px"
  input:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    height: "40px"
  post-card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "20px 24px"
  post-card-title:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  vote-control:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    padding: "2px"
  vote-control-upvoted:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand-ink}"
  vote-control-downvoted:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent-ink}"
  community-header:
    backgroundColor: "{colors.surface-card}"
    rounded: "{rounded.lg}"
  badge-new:
    backgroundColor: "{colors.highlight}"
    textColor: "{colors.ink}"
    typography: "{typography.overline}"
    rounded: "{rounded.sm}"
---

# Design System: Reader

## Overview

**Creative North Star: "The Reading Room"**

Reader is a quiet, well-lit room for reading. Cards rest on warm paper and the interface steps back so posts can speak. The look is modern and sleek with an editorial elegance: a Garamond serif for everything people write as a title, a calm sans for everything the interface says, and a five-colour palette (coral, cream, sage, violet, alabaster) in which each colour has exactly one job.

Density is relaxed but not sparse. Feeds are single columns of cards with generous padding, metadata stays small and muted, and one coral element per view tells you what to do next. Depth comes from hairlines first and soft violet-tinted shadows second. The dark theme swaps paper for a warm violet-black and keeps every hue.

The system rejects the grey-on-black prototype it replaced and the loud, badge-heavy chrome of large link aggregators. Nothing competes with the reading.

**Key Characteristics:**

- Warm paper (alabaster) instead of white or grey; cards one step lighter.
- Serif titles, sans interface: the pairing is the identity.
- One coral voice per view; sage and cream play supporting roles only.
- Pill-shaped controls against softly rounded cards.
- Hairlines over shadows; shadows tinted violet, never pure black in light mode.

## Colors

A warm, low-saturation palette on paper, where every colour has one job and every pairing passes WCAG 2.2 AA in both themes.

### Primary

- **Reader Coral** (brand): the one primary action per view, the upvoted state, the wordmark dot and the community mark. It is a fill only and always carries dark ink (on-brand, 5.0:1). It is the same in both themes.
- **Coral Ink** (brand-ink, brand-ink-dark): coral as text, for links, the upvoted score, `c/` names in feeds and the overline above page titles (5.2:1 light, 7.1:1 dark).
- **Coral Blush** (brand-soft, brand-soft-dark): the tinted ground behind an upvoted vote control or a selected row.

### Secondary

- **Sage** (accent): downvoted state, moderator badges, the community banner fallback and avatar grounds. Always carries dark ink (8.0:1).
- **Sage Ink** (accent-ink, accent-ink-dark): sage as text, for the downvoted score and moderator names.
- **Sage Mist** (accent-soft, accent-soft-dark): the tinted ground behind a downvoted vote control.

### Tertiary

- **Cream** (highlight): "New" badges, unread markers and text selection; in the dark theme it is also the focus ring. Always carries ink (13.4:1).

### Neutral

- **Alabaster Paper** (surface-page, surface-page-dark): the page behind feeds and sidebars.
- **Card Stock** (surface-card, surface-card-dark): post cards, panels, dialogs and inputs.
- **Paper Well** (surface-sunken, surface-sunken-dark): wells inside cards, such as the vote control, code and quotes.
- **Paper Hover** (surface-hover, surface-hover-dark): hover state for cards, rows, ghost and outline buttons.
- **Violet Ink** (ink, ink-dark): primary text and headings (12.8:1 on paper in both themes).
- **Muted Violet** (ink-muted, ink-muted-dark): metadata such as author, time, counts and descriptions.
- **Dusk Violet** (secondary, secondary-dark): secondary button fill and the signed-in avatar ring, with ink-inverse text.
- **Hairline** (line, line-dark): card edges and dividers. It is decorative, never a control boundary.
- **Control Line** (line-strong, line-strong-dark): borders of inputs and outline buttons (at least 3:1).
- **Danger Red** (danger, danger-dark): destructive actions and form errors only.

### Named Rules

**The One Voice Rule.** Coral marks at most one primary action per view. If two things on a screen are coral, one of them is wrong.

**The Coral Is a Fill Rule.** Coral never sets text on light grounds (3.1:1 fails body text) and never carries white. Text that must be coral uses brand-ink; coral fills carry on-brand.

**The Danger Is Not Brand Rule.** Destructive actions use danger, a deeper red, so a coral button never reads as "delete".

## Typography

**Display Font:** EB Garamond (with Garamond, Iowan Old Style, Georgia, serif; never a sans fallback)
**Body Font:** Instrument Sans (with system-ui, -apple-system, Segoe UI, sans-serif)

**Character:** A classic old-style Garamond gives titles a bookish, editorial voice; Instrument Sans keeps controls and metadata crisp and modern. Both load from Google Fonts in `index.html`.

### Hierarchy

- **Display** (EB Garamond 500, 56px/60px, -0.02em): landing and sign-up heroes only.
- **Headline** (EB Garamond 500, 36px/42px, -0.015em): the community name in its header and page titles.
- **Headline Small** (EB Garamond 500, 26px/32px, -0.01em): the post title on the post page and dialog titles.
- **Title** (EB Garamond 500, 20px/28px): the post title inside a feed card and community names on cards.
- **Body** (Instrument Sans 400, 16px/26px): post bodies and comments. Keep long text at 65 to 75 characters per line.
- **Body Small** (Instrument Sans 400, 14px/22px): descriptions, sidebars and helper text.
- **Label** (Instrument Sans 600, 14px/20px): buttons, tabs and form labels, in sentence case.
- **Meta** (Instrument Sans 500, 13px/18px): author, timestamp and counts, with tabular figures for scores.
- **Overline** (Instrument Sans 600, 12px/16px, 0.08em, uppercase): small section labels such as "COMMUNITIES" and "RULES OF C/CATS".

### Named Rules

**The Who Wrote It Rule.** If a person wrote it and it is a title, set it in the serif. If the interface wrote it, set it in the sans. Post bodies stay sans for long-read comfort.

**The Sentence Case Rule.** Buttons are verbs in sentence case ("Create post", "Sign up"), never all caps. Uppercase belongs to the overline only.

## Layout

- **Container:** one centred column, 1152px wide at most (`max-w-6xl`), with a 16px gutter on phones and 24px from 640px up. Main content sits 32px below the sticky header.
- **Header:** sticky, 64px tall, paper at 85% opacity with a backdrop blur and a bottom hairline. The wordmark is on the left; account actions, theme toggle and the mobile drawer are on the right.
- **Home:** an overline and a display headline, then a grid of community cards, three across on desktop.
- **Community page:** a full-width community header card, then a two-column split: a feed of post cards (about two thirds) beside a rules and information panel. On small screens the rules move above the posts.
- **Rhythm:** a 4px base (space-1 to space-12). Cards pad space-6 and stack space-4 apart; page sections sit space-8 apart; heroes and empty states get space-12.
- **Breakpoints:** Tailwind defaults (640, 768, 1024px). Below 640px, account buttons move into the drawer.

## Elevation & Depth

A hybrid: hairlines carry structure, and two soft, violet-tinted shadows add a whisper of lift. Surfaces are flat at rest except cards, which sit on paper with a hairline and a resting shadow, and rise one step on hover.

### Shadow Vocabulary

- **Card** (`box-shadow: 0 1px 2px rgba(38, 34, 46, 0.06), 0 6px 20px rgba(38, 34, 46, 0.05)`; dark: `0 1px 2px rgba(0, 0, 0, 0.5)`): resting post cards. Quiet; the hairline does most of the work.
- **Raised** (`box-shadow: 0 2px 4px rgba(38, 34, 46, 0.08), 0 16px 40px rgba(38, 34, 46, 0.12)`; dark: `0 2px 6px rgba(0, 0, 0, 0.5), 0 16px 40px rgba(0, 0, 0, 0.45)`): dialogs, menus and hovered cards.

### Named Rules

**The One Step Rule.** A card lifts from Card to Raised on hover and never further. There is no third shadow.

## Shapes

The signature contrast is pill-shaped controls against softly rounded cards.

- **Pill** (999px): buttons, the vote control, the comments link, avatars and the community mark.
- **Large** (20px): the community header and dialogs.
- **Medium** (12px): post cards, panels and menus.
- **Small** (6px): inputs, badges and small chips.

Borders are 1px hairlines; inputs and outline buttons use the stronger control line. Images in cards are clipped to the card's corners.

## Components

### Buttons

Confident but quiet pills that press 1px down when clicked.

- **Shape:** fully rounded pill (999px), 40px tall with 20px side padding; small 32px and large 44px sizes exist, plus a 40px round icon button.
- **Primary:** coral fill with dark ink, in the label style. Hover drops the fill to 90% opacity.
- **Secondary:** dusk violet fill with ink-inverse text.
- **Outline:** a transparent pill with a control-line border; hover darkens the border to ink and fills it with paper hover.
- **Ghost:** muted violet text, no border; hover adds paper hover and ink text. Used for "Log in" and header icons.
- **Destructive:** danger red with on-danger text.
- **Link:** coral ink text, underlined on hover.
- **Focus / Disabled:** a 2px focus ring offset 2px (violet ink in light, cream in dark); disabled buttons drop to 45% opacity.

### Cards / Containers

- **Corner Style:** medium (12px) for post cards and panels; large (20px) for the community header.
- **Background:** card stock on alabaster paper.
- **Shadow Strategy:** Card at rest, Raised on hover (see Elevation & Depth).
- **Border:** 1px hairline.
- **Internal Padding:** 24px sides, 20px top and bottom on post cards.

### Inputs / Fields

- **Style:** card-stock background, 1px control-line border, small (6px) corners, 40px tall, 15px text, muted placeholder.
- **Focus:** a 2px focus ring, offset 1px.
- **Error / Disabled:** errors use danger text under the field; disabled fields drop to 50% opacity.

### Navigation

- **Wordmark:** "Reader" in EB Garamond 500 at 30px, followed by a small coral dot; hover turns the word coral ink.
- **Account:** signed-out visitors get a ghost "Log in" and an outline "Sign up", so the page's own primary action stays the one coral voice. Signed-in members get an avatar pill with their username, plus ghost icon buttons for Admin and Log out.
- **Mobile:** below 640px, account actions live in a bottom drawer opened from the header.

### Vote Control

The signature component: a pill well holding up and down arrows with the score between.

- **Shape:** a paper-well pill with 2px padding; each arrow is a 30px round button with a 16px icon; the score uses meta type with tabular figures.
- **Upvoted:** the whole pill tints coral blush, the up arrow becomes a coral fill with dark ink, and the score turns coral ink.
- **Downvoted:** the whole pill tints sage mist, the down arrow becomes a sage fill with dark ink, and the score turns sage ink.
- **Beside it:** a pill-shaped comments link in muted meta type with a speech-bubble icon, showing "3 comments".

### Post Card

A post in a feed: a meta row (20px avatar, author, a dot, relative time with the full date in a tooltip), the serif title that underlines on hover, an optional two-line muted excerpt, then the vote control and comments link.

### Community Header

A large-radius card with a sage banner (or the community image) on top, a 72px coral circle holding the community's initial in the serif and overlapping the banner, the serif name prefixed by a muted `c/`, its description, and a primary "Create post" on the right.

## Do's and Don'ts

### Do:

- **Do** keep one coral action per view (The One Voice Rule).
- **Do** use brand-ink when coral has to be text, and on-brand on every coral fill.
- **Do** set titles people wrote in EB Garamond 500 and everything the interface says in Instrument Sans.
- **Do** put cards on paper with a 1px hairline and the Card shadow, lifting to Raised on hover.
- **Do** check every new pairing for WCAG 2.2 AA in both themes: 4.5:1 for text, 3:1 for control borders, focus rings and icons.
- **Do** use lucide-react icons at 16px with a 1.8 stroke in currentColor: muted at rest, ink on hover.
- **Do** keep motion short and quiet: 150ms colour and border changes, 200ms shadow lift, a 1px press. No bounces.

### Don't:

- **Don't** put white text on coral, or coral text on light grounds.
- **Don't** use coral for destructive actions; use danger.
- **Don't** fall back to a sans for the display serif.
- **Don't** add a third shadow level or pure-black shadows in the light theme.
- **Don't** set buttons in all caps or use "Submit"; buttons are verbs in sentence case.
- **Don't** use grey-on-black or plain white surfaces; Reader lives on warm paper.
