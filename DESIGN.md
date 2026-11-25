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

<!-- impeccable:design-map -->
Name: Alpha cube
Colors: primary: cobalt-brand #09318D; secondary: signal-rose #FD91CC; neutral: midnight-canvas #050E24; secondary: emerald-live #34D399; neutral: porcelain-canvas #F7F9FC
Fonts: Saira (display, headline, title, body); Geist Pixel (label); ui-monospace (mono)
Spacing: xs 8px, sm 12px, md 16px, grid-gap 20px, lg 24px, card-pad 28px, xl 32px, section-min 72px
Radius: xs 4px, sm 6px, md 8px, spec 10px, lg 14px, portrait 16px, banner 18px, full 9999px
North Star: "The On-Call Control Room"
Rules:
- The Polarity Parity Rule. Signal Rose (`#FD91CC`) handles fills on dark backgrounds, but light backgrounds must shift CTAs to Cobalt Brand (`#09318D`) and rose text to Signal Rose Ink (`#B01E6E`) so contrast never drops below 4.5:1.
- The No-Black-Void Rule. Never paint surfaces with pure `#000000`; anchor dark mode in Midnight Canvas (`#050E24`) and step containers cleanly through Midnight Surface (`#091A44`).
- The Pixel-Accent Cap Rule. Limit Geist Pixel (`400`) to short UI chrome, buttons, badges, and ASCII art; never render multi-sentence paragraphs in pixel type.
- The Single-Weight Pixel Rule. Local `GeistPixel.ttf` ships only weight 400, so leave `font-weight: 400` on every pixel element to avoid synthetic bolding.
- The Surface Layer Rule. Separate resting cards from their parent canvas by one tonal step plus a 1px border before reaching for drop shadows.
Elevation:
- Dark Card Rest: 0 4px 18px rgba(2, 6, 20, 0.36)
- Dark Card Lift: 0 12px 28px rgba(2, 6, 20, 0.52)
- Light Card Rest: 0 2px 10px rgba(11, 19, 43, 0.05), 0 8px 22px rgba(11, 19, 43, 0.04)
- Light Card Lift: 0 6px 18px rgba(9, 49, 141, 0.1), 0 16px 32px rgba(11, 19, 43, 0.08)
Don't:
- Don't place Geist Pixel on long paragraphs, testimonials, or form inputs.
- Don't put interactive nested cards inside bento tiles; keep spec lists and terminals flat inset panes (`10px` radius).
- Don't use pure `#000000` backgrounds or blurry frosted overlays on mobile navigation drawers.
- Don't introduce unaligned CSS grid rows inside `.bento-matrix` that leave blank columns at desktop width.
- Don't strip `prefers-reduced-motion` safeguards from the ASCII canvas animation or hero entrance transition.
Map: index.html
Map: style.css
Map: script.js
Map: assets/fonts/GeistPixel.ttf
Map: assets/anirudh.png
Full: .impeccable/design-full.md (read a section when you need its detail)
