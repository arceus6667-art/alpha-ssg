---
name: Kinetic Lab Portal
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#416900'
  on-secondary: '#ffffff'
  secondary-container: '#acf847'
  on-secondary-container: '#457000'
  tertiary: '#3d445a'
  on-tertiary: '#ffffff'
  tertiary-container: '#545c72'
  on-tertiary-container: '#cdd5ef'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#acf847'
  secondary-fixed-dim: '#91db2a'
  on-secondary-fixed: '#102000'
  on-secondary-fixed-variant: '#304f00'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-badge:
    fontFamily: Hanken Grotesk
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
  label-metric:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  margin: 2.5rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-performance intersection between an elite university computational lab and an engineering-grade public career infrastructure. It is engineered for high-intent learners, technical interns, and hiring evaluators who prioritize verification over vanity. The core emotional tone is intellectually rigorous, precise, and validating—grounded in the mantra *Learn. Build. Prove.*

The design aesthetic blends **Technical Minimalism** with **Architectural Structuralism**:
- **Geometry & Spatial Discipline:** Crisp 1px structural boundaries, subtle coordinate dot grids (40px pitch in `#E2E8F0`), and continuous vertical/horizontal schematic guide paths.
- **Proof-Oriented Density:** Information is structured as auditable milestones, execution badges, verified telemetry, and cryptographic-style "proof-of-work" certification seals rather than marketing hyperbole.
- **Strict Authenticity:** Eliminates ambiguous decorative gradients, organic fluid blobs, low-contrast frosted glass, and staged stock photography in favor of direct data visualization, interactive terminal code snippets, and structural progress nodes.

## Colors

The system uses a calibrated, high-contrast palette calibrated for intense data legibility and deliberate accentuation.

### Functional Roles
- **Primary (`#1D4ED8`):** Academic Cobalt. Deployed strictly for primary navigational anchors, dominant interactive states, active structural borders, and key progression completion lines.
- **Secondary (`#84CC16`):** Kinetic Citron / Electric Lime. High-visibility technical accelerator reserved for verified proof states, "Live Project" tracking indicators, active application badges, and pulse nodes.
- **Tertiary / Core Structure (`#0F172A`):** Deep Obsidian Ink. Deployed for authoritative typography, high-priority system actions, terminal backgrounds, and anchor-grade framing elements.
- **Neutral Base (`#64748B`):** Steel Slate. Governs secondary metrics, code annotations, subheadings, metadata indicators, and structural grid rules.

### Surface Architecture & Boundaries
- **Canvas Base:** Layered from `#FFFFFF` through `#F8FAFC` to secondary recess `#F1F5F9`.
- **Dividers & Structural Rules:** `#E2E8F0` at 100% opacity for precise 1px architectural grid lines.
- **Success / Status System:**
  - *Open Pipeline:* Light tint `#ECFCCB` with border `#84CC16` and text `#3F6212`.
  - *In Review:* Background `#EFF6FF` with border `#3B82F6` and text `#1D4ED8`.
  - *Archive / Neutral:* Background `#F1F5F9` with border `#CBD5E1` and text `#475569`.

## Typography

The type system implements a tri-font structure balancing architectural impact, body readability, and technical precision.

- **Headlines (Space Grotesk):** Provides structured geometric angles with modern personality. Tighter letter tracking balances the open counters at high scale.
- **Reading Body (Hanken Grotesk):** Delivers clean neutral legibility for long-form curriculum syllabi, requirements documentation, and evaluation rubrics.
- **Telemetry & Labels (JetBrains Mono):** Dictates milestone coordinates, git commit verifications, cohort timestamps, and technical status tags, enforcing a rigorous terminal aesthetic.

### Rules of Application
1. **Case Discipline:** `label-badge` strings must always be styled uppercase with `0.05em` letter-spacing.
2. **Number Alignment:** All quantitative telemetry, cohort dates, and milestone numbers must employ tabular figures (`tnum`).
3. **Contrast Hierarchy:** Do not mix two weights within the same headline line unless paired directly with an inline monospaced status indicator.

## Layout & Spacing

The layout is built upon an 8-point geometric spatial system framed within a structured 12-column dynamic grid.

### Layout Philosophy & Grid Architecture
- **Desktop (>= 1280px):** 12-column layout with a maximum container boundary of `1440px`, flanked by `margin` (`2.5rem`) and column gutters of `gutter` (`1.5rem`).
- **Tablet (768px - 1279px):** 8-column layout with fluid margins down to `1.5rem` and `1rem` column gutters.
- **Mobile (< 768px):** 4-column layout with strict edge margins of `margin-mobile` (`1.25rem`) and structural vertical stacking.

### Architectural Alignment
- **Milestone & Pathway Connectors:** Vertical timeline nodes center-align with structural grid lines using negative margins matching half the stroke width (e.g., `-1px` on a `2px` connector).
- **Split Canvas Structure:** Interactive application dashboards utilize a fixed `360px` left telemetry column paired with a fluid, multi-card progression canvas on the right.

## Elevation & Depth

Visual depth is achieved through structural layering and crisp hairline borders rather than heavy ambient blur.

- **Level 0 (Recessed Substrates):** `#F8FAFC` and `#F1F5F9` surfaces used as workspace framing and table headers. No shadow; framed by `1px solid #E2E8F0`.
- **Level 1 (Base Interactive Surfaces):** `#FFFFFF` surfaces with `1px solid #E2E8F0`. Shadow: `0 1px 2px 0 rgba(15, 23, 42, 0.04), 0 1px 1px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Hover & Milestone Cards):** Dynamic elevation upon interaction. Border shifts to `#CBD5E1`. Shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Floating Action Bars & Inspect Drawers):** Sticky application controls and audit panels. Border: `1px solid #0F172A` or `#1D4ED8`. Shadow: `0 12px 24px -4px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03)`.

### Technical Accent Shadows
For elements in active execution state (e.g., live internship tracks), apply an electric edge: `box-shadow: 0 0 0 1px #84CC16, 0 4px 12px rgba(132, 204, 22, 0.15)`.

## Shapes

The shape system enforces high structural discipline using compact radii. This establishes an engineering-tool feel rather than a generic consumer-app look.

- **Default Border Radius (`0.25rem` / `4px`):** Used across input surfaces, interactive dropdowns, terminal panels, progress track cells, and accordions.
- **Medium Radius (`rounded-lg` / `0.5rem` / `8px`):** Applied exclusively to major structural cards, modal dialogues, and evaluation preview tiles.
- **Full Pill (`9999px`):** Reserved strictly for semantic status chips, verification badges, tag pills, and milestone indicator dots. Primary cards, inputs, and action buttons must never use the full pill shape.

## Components

### Buttons
- **Primary CTA:** Deep blue background (`#1D4ED8`), white text (`#FFFFFF`), `0.25rem` radius, 1px solid `#1D4ED8`. Hover shifts to `#1E40AF` with a subtle translate-y `(-1px)`.
- **Engineering / Terminal Action:** Obsidian background (`#0F172A`), electric lime accent border (`#84CC16`), monospaced metadata text, and an inline chevron.
- **Ghost Utility:** Transparent background, `1px solid #E2E8F0`, dark text (`#0F172A`). Hover transitions to `#F8FAFC` background with border `#CBD5E1`.

### Cards & Sticky Application Containers
- **Internship & Path Card:** White surface (`#FFFFFF`), `0.5rem` radius, `1px solid #E2E8F0` border. Contains a top metadata ribbon with an embedded status pill (`Applications Open`).
- **Sticky Status Rail:** Fixed right-side or top-floating surface containing verified evaluation metrics, real-time application countdowns, and a primary CTA. Bound by a high-contrast `1px solid #0F172A` hairline.

### Pathway Progression Nodes
- Connected by a vertical or horizontal continuous `2px solid #E2E8F0` guideline.
- **Pending Node:** Hollow circle (`12px`), white fill, `2px solid #CBD5E1`.
- **In-Progress Node:** Glowing double ring—outer circle `#ECFCCB` (`20px`), inner circle `#84CC16` (`8px`).
- **Verified / Completed Node:** Solid cobalt circle (`16px`) embedded with a white micro check icon.

### Proof-of-Work Stamps & Badges
- **Status Pills:** Height `24px`, fully rounded (`9999px`), horizontal padding `8px`. Active status embeds an active pulsing citron LED dot (`6px` solid `#84CC16` with infinite keyframe ring pulse).
- **Proof Stamp:** Distinct badge for student-shipped builds. Features a `1px dashed #64748B` boundary, monospaced SHA-256 verification hash excerpt, and an icon representing verified evaluation.

### Form Inputs & Accordions
- **Input Fields:** `#FFFFFF` background, `1px solid #CBD5E1`, `0.25rem` radius, text `#0F172A`. Focused state switches border to `2px solid #1D4ED8` without standard browser rings.
- **Technical Accordion:** Flat layout separated by continuous `1px solid #E2E8F0` dividers. Expanded sections feature a subtle left border accent (`3px solid #1D4ED8`) and mono-tagged section counts (`[01/04]`).