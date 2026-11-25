---
name: "Alpha cube"
description: "Engineering studio web system built around deep navy surfaces, crisp porcelain light mode, Saira body copy, and Geist Pixel telemetry labels."
colors:
  cobalt-brand: "#09318D"
  cobalt-deep: "#06246B"
  signal-rose: "#FD91CC"
  signal-rose-soft: "#FCAFD7"
  signal-rose-ink: "#B01E6E"
  signal-badge-ink: "#8F1458"
  midnight-canvas: "#050E24"
  midnight-surface: "#091A44"
  midnight-raised: "#0F245C"
  midnight-input: "#071538"
  midnight-terminal: "#040B1C"
  midnight-stage: "#0B1E4E"
  crisp-ink: "#F8FAFC"
  slate-mist: "#CBD8F6"
  indigo-muted: "#94A8D4"
  porcelain-canvas: "#F7F9FC"
  pure-paper: "#FFFFFF"
  porcelain-raised: "#EEF3FA"
  porcelain-stage: "#EDF2FA"
  obsidian-ink: "#0B132B"
  charcoal-body: "#364156"
  slate-muted: "#4E5D78"
  emerald-live: "#34D399"
  emerald-light: "#047857"
  crimson-dark: "#FDA4AF"
  crimson-light: "#B91C1C"
typography:
  display:
    fontFamily: "Saira, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "3.85rem"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Saira, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "2.85rem"
    fontWeight: 700
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Saira, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1.32rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Saira, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  label:
    fontFamily: "Geist Pixel, monospace"
    fontSize: "0.78rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.04em"
  mono:
    fontFamily: "ui-monospace, Cascadia Mono, SFMono-Regular, Consolas, monospace"
    fontSize: "0.85rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "8px"
  spec: "10px"
  lg: "14px"
  portrait: "16px"
  banner: "18px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  grid-gap: "20px"
  lg: "24px"
  card-pad: "28px"
  xl: "32px"
  section-min: "72px"
components:
  button-primary:
    backgroundColor: "{colors.signal-rose}"
    textColor: "{colors.midnight-canvas}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.signal-rose-soft}"
  button-primary-light:
    backgroundColor: "{colors.cobalt-brand}"
    textColor: "{colors.pure-paper}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    height: "44px"
  button-secondary:
    backgroundColor: "{colors.midnight-surface}"
    textColor: "{colors.crisp-ink}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    height: "44px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.slate-mist}"
    rounded: "{rounded.sm}"
    padding: "10px 20px"
    height: "44px"
  icon-button:
    backgroundColor: "{colors.midnight-surface}"
    textColor: "{colors.crisp-ink}"
    rounded: "{rounded.md}"
    size: "44px"
  card-bento:
    backgroundColor: "{colors.midnight-surface}"
    textColor: "{colors.crisp-ink}"
    rounded: "{rounded.lg}"
    padding: "28px"
  tag-chip:
    backgroundColor: "{colors.midnight-raised}"
    textColor: "{colors.slate-mist}"
    rounded: "{rounded.sm}"
    padding: "5px 10px"
  input-field:
    backgroundColor: "{colors.midnight-input}"
    textColor: "{colors.crisp-ink}"
    rounded: "{rounded.md}"
    padding: "12px 14px"
    height: "48px"
---

# Design System: Alpha cube

## Overview

**Creative North Star: "The On-Call Control Room"**

Alpha cube looks like an engineering war room built by the people who answer pager alerts at 2:00 AM.
Deep midnight navy holds the screen in dark mode, while high-key porcelain surfaces take over in light mode with sharp dark ink.
Geist Pixel appears only in small hardware indicators, navigation links, buttons, and ASCII portraits, letting Saira carry every real sentence comfortably.

This system rejects generic black glass overlays, floating neon halos, and decorative gradients behind plain copy.
Every surface uses solid stepped contrast, clean hairlines, and exact alignment across `index.html`, `style.css`, and `script.js`.

**Key Characteristics:**
- Dark navy canvas (`#050E24`) as default polarity paired with a high-contrast porcelain light theme (`#F7F9FC`).
- Saira geometric sans for headings and body copy, restricted to short pixel accents for UI controls.
- Full-width 1280px container where the fixed header, hero, six-column bento matrix, and closing banner align to the same 32px edges.
- Interactive ASCII portrait and live incident bus rendered on HTML canvas and monospace streams with full keyboard and light-mode readability.

## Colors

The palette pairs technical midnight blues with a single bright rose accent on dark surfaces and deep cobalt CTA fills on light surfaces so interactive elements always pass WCAG AA contrast.

### Primary
- **Signal Rose** (`#FD91CC`): Dark-mode primary CTA fill, focus ring, and inline highlight over `#050E24` ink.
- **Cobalt Brand** (`#09318D`): Light-mode primary CTA fill with white text (`#FFFFFF`), hover darkening to Cobalt Deep (`#06246B`).
- **Signal Rose Ink** (`#B01E6E`) and **Signal Badge Ink** (`#8F1458`): Darkened rose text values used exclusively on light surfaces where pastel pink would fail contrast.

### Neutral
- **Midnight Canvas** (`#050E24`): Default dark page ground and primary button text on Signal Rose.
- **Midnight Surface** (`#091A44`) and **Midnight Raised** (`#0F245C`): Stepped dark card, nav icon button, and hover layers.
- **Porcelain Canvas** (`#F7F9FC`), **Pure Paper** (`#FFFFFF`), and **Porcelain Raised** (`#EEF3FA`): Light-mode ground, elevated cards, and inset spec rows.
- **Crisp Ink** (`#F8FAFC`), **Slate Mist** (`#CBD8F6`), **Obsidian Ink** (`#0B132B`), and **Charcoal Body** (`#364156`): Primary and secondary text registers across both polarities.
- **Emerald Live** (`#34D399`) and **Emerald Light** (`#047857`): Static availability dot and form confirmation status indicators.

### Named Rules
**The Polarity Parity Rule.** Signal Rose (`#FD91CC`) handles fills on dark backgrounds, but light backgrounds must shift CTAs to Cobalt Brand (`#09318D`) and rose text to Signal Rose Ink (`#B01E6E`) so contrast never drops below 4.5:1.

**The No-Black-Void Rule.** Never paint surfaces with pure `#000000`; anchor dark mode in Midnight Canvas (`#050E24`) and step containers cleanly through Midnight Surface (`#091A44`).

## Typography

**Display & Body Font:** Saira (weights 400 to 800, system sans fallback).
**Label & Control Font:** Geist Pixel (weight 400 only from local `assets/fonts/GeistPixel.ttf`, monospace fallback).
**Telemetry Font:** System monospace stack (`ui-monospace`, `Cascadia Mono`, Consolas).

Saira gives headlines and case stories crisp horizontal geometry without compromising long-form scanning, while Geist Pixel stamps navigation, buttons, and technical tags with hardware character.

### Hierarchy
- **Display** (`800`, `clamp(2.15rem, 4.4vw, 3.85rem)`, line height `1.08`): Hero headline inside `.hero-stage` only.
- **Headline** (`700`, `clamp(1.85rem, 3.4vw, 2.85rem)`, line height `1.16`): Section titles across capabilities, founders, case stories, and closing banner.
- **Title** (`700`, `1.32rem`, line height `1.25`): Bento tile and story card headings.
- **Body** (`400`, `1rem`, line height `1.6`): General copy capped at `58ch` to `62ch` measure for fast horizontal reading.
- **Label** (`400`, `0.78rem` to `0.95rem`, Geist Pixel): Nav links, buttons, status pills, metric badges, and table keys.

### Named Rules
**The Pixel-Accent Cap Rule.** Limit Geist Pixel (`400`) to short UI chrome, buttons, badges, and ASCII art; never render multi-sentence paragraphs in pixel type.

**The Single-Weight Pixel Rule.** Local `GeistPixel.ttf` ships only weight 400, so leave `font-weight: 400` on every pixel element to avoid synthetic bolding.

## Layout

Content sits inside a shared 1280px container (`--container-max: 1280px`) with 32px desktop side gutters (`20px` below `640px`).
The hero fills one viewport height (`100svh`) split 1.15fr editorial left to 0.85fr portrait card right so the next section never peeks prematurely at 1440x900.
Capabilities use a six-column grid (`4+2`, `2+4`, `3+3`) with `20px` gaps so every row closes evenly without orphan holes.
At `1024px` the grid collapses to two columns and below `680px` stacks into one column; case stories switch from a three-column grid to a snap carousel below `900px`.

## Elevation & Depth

Depth comes from solid surface steps, subtle rgba hairlines, and restrained structural shadows tailored to each theme.
Cards remain opaque (`background-color` tokens rather than blur filters over arbitrary backgrounds) except for the fixed header bar.

### Shadow Vocabulary
- **Dark Card Rest** (`box-shadow: 0 4px 18px rgba(2, 6, 20, 0.36)`): Applied to resting bento tiles, story panels, and portrait frame.
- **Dark Card Lift** (`box-shadow: 0 12px 28px rgba(2, 6, 20, 0.52)`): Applied alongside `translateY(-2px)` and strong rose border on hover.
- **Light Card Rest** (`box-shadow: 0 2px 10px rgba(11, 19, 43, 0.05), 0 8px 22px rgba(11, 19, 43, 0.04)`): Soft ambient separation between Pure Paper cards and Porcelain Canvas.
- **Light Card Lift** (`box-shadow: 0 6px 18px rgba(9, 49, 141, 0.1), 0 16px 32px rgba(11, 19, 43, 0.08)`): Hover state for light cards.

### Named Rules
**The Surface Layer Rule.** Separate resting cards from their parent canvas by one tonal step plus a 1px border before reaching for drop shadows.

## Shapes

Corners stay mechanical and consistent: `4px` on status pills, `6px` on buttons and chips, `8px` on icon controls and inputs, `10px` on nested spec/terminal panes, `14px` on bento and story cards, `16px` on the hero portrait frame, and `18px` on the closing banner and modal dialog.
Every pixel SVG icon aligns cleanly to a `16px` or `24px` square grid with `shape-rendering: crispEdges`.

## Components

Controls feel crisp, immediate, and keyboard-first, with `44px` minimum target heights across headers and forms.

### Buttons
- **Shape:** Subtle corner radius (`6px`), Geist Pixel `400`, `0.03em` tracking.
- **Primary:** Signal Rose (`#FD91CC`) with Midnight Canvas ink in dark mode (`#050E24`); Cobalt Brand (`#09318D`) with white ink in light mode (`10px 20px` padding, `44px` min height).
- **Hover / Focus:** `translateY(-1px)` on hover, `translateY(1px)` on active press, and `2px` solid accent outline with `3px` offset on `:focus-visible`.
- **Secondary / Ghost:** Midnight Surface (`#091A44`) with strong border for secondary actions, transparent with subtle border for ghost actions.

### Chips
- **Style:** Raised surface background (`#0F245C` dark, `#EEF3FA` light) with `6px` radius and `5px 10px` padding.
- **Alert Tag Variant:** Translucent rose tint with Signal Badge Ink (`#8F1458`) on light backgrounds and Signal Rose (`#FD91CC`) on dark backgrounds.

### Cards / Containers
- **Corner Style:** Smooth mechanical curve (`14px` radius).
- **Background:** Midnight Surface (`#091A44`) or Pure Paper (`#FFFFFF`), using a slight linear sheen on the highlighted 24/7 recovery tile.
- **Shadow Strategy:** Card rest shadow tightening to lift shadow with `translateY(-2px)` on hover.
- **Border:** 1px subtle border shifting to strong border (`rgba(253, 145, 204, 0.34)` dark / `rgba(9, 49, 141, 0.32)` light) on hover.
- **Internal Padding:** Spacious card padding (`28px` on bento tiles, `32px` on story cards).

### Inputs / Fields
- **Style:** Inset Midnight Input (`#071538`) or Pure Paper (`#FFFFFF`), `1px` strong border, `8px` radius, `48px` minimum height.
- **Focus:** Inherits `2px` accent focus-visible ring and border contrast shift.
- **Error:** Crimson border (`#FB7185` dark / `#DC2626` light) with tinted fill and inline `.field-error` message.

### Navigation
- **Desktop Header:** Fixed `72px` height bar (`64px` on mobile), `36px` pixel cube logo + Geist Pixel title on left, three anchor links centered, `44px` theme button and CTA on right.
- **Mobile Sheet:** Collapses links below `860px` into a solid opaque full-width drawer (no `backdrop-filter`) paired with a `44px` menu toggle button.

### Signature Components
- **Interactive ASCII Portrait & Status Bar:** Rounded `16px` container running interactive monochrome/rose-accent ASCII canvas (`#hero-ascii-canvas`) above a raised footer strip with a static live indicator dot and active status pill.
- **SYS_BUS Terminal Pane:** High-contrast dark console (`#040B1C` in both light and dark modes) showing real-time ping and streaming diagnostic rows inside Tile 4.

## Do's and Don'ts

### Do:
- **Do** align header, main sections, and footer inside `.site-shell` (`1280px` max width, `32px` desktop gutters).
- **Do** verify every interactive rose element on `[data-theme="light"]` uses `#09318D` or `#8F1458` / `#B01E6E` rather than pastel pink ink.
- **Do** size every Pixelarticons inline SVG strictly at `16px` or `24px` with `shape-rendering: crispEdges`.
- **Do** validate `<dialog>` forms via HTML attributes plus accessible `aria-invalid` states before triggering `mailto:` handoff.
- **Do** keep the closing banner (`#contact`) clean beside `assets/anirudh.png` with balanced copy and dual action buttons.

### Don't:
- **Don't** place Geist Pixel on long paragraphs, testimonials, or form inputs.
- **Don't** put interactive nested cards inside bento tiles; keep spec lists and terminals flat inset panes (`10px` radius).
- **Don't** use pure `#000000` backgrounds or blurry frosted overlays on mobile navigation drawers.
- **Don't** introduce unaligned CSS grid rows inside `.bento-matrix` that leave blank columns at desktop width.
- **Don't** strip `prefers-reduced-motion` safeguards from the ASCII canvas animation or hero entrance transition.
