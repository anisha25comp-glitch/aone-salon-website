# AONE Salon Website — Design Direction

## Approach 1

**Theme Name:** Quiet Luxury Studio  
**Very Brief Intro:** A warm, editorial salon experience built around ivory, espresso, and muted blush tones. It feels tactile, premium, and calm rather than overly glossy.  
**Probability:** 0.07

## Approach 2

**Theme Name:** Badlapur Bloom  
**Very Brief Intro:** A lively local beauty destination using coral, marigold, and leaf green with energetic photography and playful service discovery. It feels welcoming, expressive, and community-led.  
**Probability:** 0.04

## Approach 3

**Theme Name:** Midnight Gloss  
**Very Brief Intro:** A dark, fashion-forward salon interface with polished chrome accents, cinematic imagery, and restrained glow. It feels dramatic, confident, and transformation-focused.  
**Probability:** 0.02

## Selected Approach: Quiet Luxury Studio

### Design Movement

Contemporary editorial hospitality, influenced by boutique beauty studios, independent fashion magazines, and tactile print design.

### Core Principles

1. **Warm restraint:** Use a sun-washed ivory canvas, espresso typography, and one ownable coral accent rather than a crowded palette.
2. **Editorial hierarchy:** Mix oversized serif headlines with precise sans-serif utility text. Let whitespace and scale create confidence.
3. **Tactile depth:** Use grain, paper-like surfaces, thin rules, soft shadows, and cropped photography to make the interface feel physical.
4. **Local clarity:** Beauty should never obscure the essentials: services, prices, booking, location, and contact actions stay easy to find.

### Color Philosophy

The site uses warm ivory as the room, espresso as the ink, and a signature coral called **AONE Flame** as the gesture that directs attention. The palette is intended to feel like late-afternoon light inside a welcoming studio: intimate and premium, but never intimidating.

### Layout Paradigm

The homepage uses a split editorial composition: a large image-led hero on the left, a narrow booking and offer rail on the right, then offset content bands that alternate between quiet text and rich visual moments. It avoids a repetitive centered-card grid by using staggered columns, oversized type, and asymmetric whitespace.

### Signature Elements

1. A thin coral “appointment thread” that appears beside major booking CTAs.
2. Small uppercase editorial labels with generous letter spacing, inspired by printed salon lookbooks.
3. Soft grain overlays and clipped image frames that feel like physical magazine spreads.

### Interaction Philosophy

Interactions should feel like a confident concierge: clear, immediate, and gently responsive. Hover states use small shifts, underline sweeps, and image zooms. Buttons press slightly on activation. Dynamic hero content changes only when useful and always gives manual control.

### Animation

Use 180–260ms ease-out transitions for buttons, navigation, tabs, and content reveals. Hero imagery can crossfade or shift by a few pixels; offer cards may rise 4px on hover. Scroll reveals should be subtle opacity/translate transitions, staggered by 50ms. Respect `prefers-reduced-motion` by removing nonessential movement while preserving content and focus states.

### Typography System

Use **DM Serif Display** for expressive headlines and **Manrope** for navigation, prices, metadata, and body copy. Hero headlines should be large and compact, section headings should use sentence case, and utility labels should be uppercase at 0.14em letter spacing. Prices should use strong sans-serif numerals for fast scanning.

### Brand Essence

**AONE is Badlapur West’s warm, modern salon for people who want expert care, visible value, and a more confident version of themselves.**  
Personality: **considered, welcoming, assured**.

### Brand Voice

Headlines sound specific and quietly confident. CTAs are direct without being aggressive. Microcopy is warm, useful, and locally grounded.

Example lines:

> **More care. More confidence. Your AONE moment.**

> **Choose your service. We’ll take care of the rest.**

### Wordmark & Logo

Use a custom **A-shaped flame/comb mark**: two tapered strokes form an abstract “A” with a small coral spark between them, suggesting hair, transformation, and a moment of care. The wordmark should be set separately in a refined high-contrast serif with customized spacing, never as an unmodified default text treatment.

### Signature Brand Color

**AONE Flame — `#E86F61`**. This coral is warm enough to feel human, distinctive enough to own, and energetic enough to guide booking actions without turning the brand loud.

### Implementation Reminder

Every component should answer: **Does this choice reinforce or dilute Quiet Luxury Studio?** Keep the interface warm, editorial, tactile, and practical. Avoid purple gradients, generic SaaS cards, excessive rounded corners, and dense centered layouts.
