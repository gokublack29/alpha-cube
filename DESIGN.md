# Alpha cube Design System

## Vision and Intent

Alpha cube is an engineering studio that builds production web applications and stays on call after launch.
The interface pairs crisp dark and light architectural surfaces with retro-pixel telemetry and cultural wit.
Both themes maintain full WCAG AA contrast, equal container edges, and responsive single-column collapse.

## Color Palette

All text pairings meet at least 4.5:1 contrast for body copy and 3:1 for large display headings and UI boundaries.
Pure black (#000000) and decorative violet/purple glows are excluded.

Dark Mode Tokens:
- Background Canvas: #050E24
- Surface Card: #091A44
- Surface Raised: #0F245C
- Surface Input: #071538
- Primary Text: #F8FAFC
- Secondary Text: #CBD8F6
- Muted Text: #94A8D4
- Border Subtle: rgba(253, 145, 204, 0.14)
- Border Strong: rgba(253, 145, 204, 0.30)
- Primary Accent / CTA Fill: #FD91CC
- Primary CTA Ink: #050E24

Light Mode Tokens:
- Background Canvas: #F7F9FC
- Surface Card: #FFFFFF
- Surface Raised: #EEF3FA
- Surface Input: #FFFFFF
- Primary Text: #0B132B
- Secondary Text: #364156
- Muted Text: #4E5D78
- Border Subtle: rgba(11, 19, 43, 0.12)
- Border Strong: rgba(9, 49, 141, 0.28)
- Primary Accent / CTA Fill: #09318D
- Primary CTA Ink: #FFFFFF
- Secondary Rose Ink (AA on light): #B01E6E
- Rose Surface Tint: rgba(253, 145, 204, 0.18)

## Typography

Headings and body copy use Saira paired with Geist Pixel for UI labels and Geist Mono for telemetry output.
Geist Pixel always renders at weight 400 to prevent synthetic bold grid smearing.
Minimum functional UI label size is 12px.

- UI and Body Typeface: Saira, system-ui, sans-serif
- Pixel Display Typeface: Geist Pixel, monospace (weight 400 only)
- Monospace Telemetry Typeface: Geist Mono, monospace
- Body Measure: 60 to 68 characters per line
- Pixel Icon Grid: 16px and 24px inline SVGs only

## Spatial System and Layout

All header, section, and footer boundaries align to one shared container width (1280px max, 32px desktop gutter, 20px mobile gutter).
The hero occupies the full initial viewport cleanly without peeking next-section headings.
The capabilities bento matrix uses a 6-column desktop grid (4+2, 2+4, 3+3) with zero orphan gaps.
All interactive targets maintain at least a 44x44px hit area across desktop and mobile.
Transparent cutout assets (Saul portrait ASCII mask, Founders studio cutout, Closing stage cutout) render cleanly across both themes without opaque background rectangles.

## Microinteractions and Accessibility

Interactive controls respond within 100ms with subtle hover and press feedback and zero neon halo glows.
Focus rings use 2px solid offset outlines via `:focus-visible`.
Native `<dialog>` uses `closedby="any"` with pointer drag-safe light dismiss and `overscroll-behavior: contain`.
Form validation runs on blur (once edited) and submit, showing accessible inline errors under each field.
All animations honor `prefers-reduced-motion`.
