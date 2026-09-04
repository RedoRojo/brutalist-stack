---
name: redesign-existing-projects
description: Redesign existing web projects, applications, and portfolio sites by identifying AI visual clichés, replacing generic design defaults with bespoke typography, cohesive color palettes, responsive layouts, high-end motion, and polished UI components.
---

# Redesign Existing Projects

This skill provides a systematic framework for redesigning and upgrading existing web applications and portfolio sites.

## Upgrade Philosophy

When redesigning an existing project, do not perform a mindless rewrite. Identify what works, eliminate visual clichés and generic AI defaults, and upgrade the typography, color system, spacing, motion, and interaction design.

## Visual Clichés to Eliminate

### Typography & Colors
- **Generic default fonts (Inter, Roboto, system UI fonts everywhere).** Swap for distinctive fonts with personality tailored to the project.
- **Oversaturated or generic colors (pure #000000, pure #FFFFFF, basic red/blue).** Use rich HSL/OKLCH palettes, subtle off-blacks, warm neutrals, and harmonious accent colors.
- **Accenting a single word in headlines.** Avoid putting one random word in a different color or italic.
- **All-caps everywhere.** Use sentence case for headings and labels.

### Interactive & Motion
- **Hover effects that just change background color without transitions.** Use spring/cubic-bezier transitions and multi-property animations (opacity, subtle scale, transform).
- **Abrupt scroll jumps.** Add smooth scrolling and subtle scroll-triggered reveals.
- **Generic rounded cards everywhere.** Use varied card elevation, border refractions, subtle noise overlays, or spacing instead of identical heavy-bordered boxes.

## Upgrade Techniques

### 1. Typography Upgrades
- Swap headline fonts for unique display fonts (Google Fonts / custom fonts).
- Establish a strict typographic hierarchy with tight line-heights on display text and relaxed line-heights on body copy.

### 2. Spacing & Layout
- Use generous, intentional whitespace to create a high-end feel.
- Ensure strict grid alignment and responsive containers (`max-width: 1200px` or similar).

### 3. Surface & Visual Effects
- Use refined glassmorphism (subtle border refraction + `backdrop-filter`).
- Add dark/light mode elegance with balanced contrast.
- Use subtle grain/texture overlays if appropriate to break digital flatness.

### 4. Interactive Polish
- Ensure every button, link, and interactive element has clear, smooth hover and active feedback.
- Add active navigation indicators so users know where they are.

## Fix Priority

1. **Font & Typography swap** — Instant high-impact visual boost.
2. **Color Palette & Theme cleanup** — Unified color design system.
3. **Layout, Spacing & Container Bounds** — Grid alignment and whitespace.
4. **Component Facelift** — Hero section, cards, buttons, footer.
5. **Micro-interactions & Animations** — Smooth transitions and entry reveals.
