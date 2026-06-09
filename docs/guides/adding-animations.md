# Adding Animations

How to add scroll-triggered animations to your WebBeagle pages.

## Quick Start

1. Select a section on the canvas
2. Click **🎬 Animate** in the toolbar
3. Toggle **ON**
4. Choose a preset (fade-up is default)
5. Click **✨ Stagger All Children**

Done. The section and its children now animate on scroll.

## Choosing an Animation Preset

| Preset | Effect | Best For |
|---|---|---|
| **fade-up** | Fades in while sliding up 40px | Sections, cards, general content |
| **fade-in** | Pure opacity fade, no movement | Subtle reveals, text elements |
| **slide-left** | Slides in from the left | Sidebars, lists, decorative elements |
| **slide-right** | Slides in from the right | Image reveals, alternating layouts |
| **zoom-in** | Scales up from 92% while fading | Hero elements, featured cards |

## Adjusting Timing

### Stagger Delay

Time between each child's animation start. Lower = faster cascade.

- **0ms** — all children animate simultaneously
- **120ms** — subtle cascade (default)
- **300ms+** — dramatic entrance

### Duration

How long each individual animation takes.

- **600ms** — snappy
- **800ms** — natural (default)
- **1500ms+** — dramatic slow reveal

## Animate Everything Example

A fully animated homepage:

| Section | Preset | Stagger | Why |
|---|---|---|---|
| Hero badge | fade-in | — (single) | Subtle entrance |
| Hero stats | fade-up | 100ms | Quick cascade |
| Services cards | fade-up | 120ms | Staggered reveal |
| Steps | slide-left | 150ms | Sequential process |
| Testimonials | fade-up | 150ms | Social proof cascade |
| CTA button | zoom-in | — (single) | Spotlight effect |

## Animating a Single Element

Select any element (heading, button, image) and:

1. Open 🎬 Animate
2. Toggle ON
3. Choose preset
4. Click ✨ Stagger All Children

The engine detects no children and makes the element its own animation target.

## Load-Triggered Animation

Set **Trigger** to **On Page Load** for elements that should animate immediately when the page loads:

1. Select the hero section
2. Open 🎬 Animate
3. Set Trigger: On Page Load
4. All children animate immediately (no scroll needed)

::: tip
Use "On Page Load" for above-the-fold content. Use "On Scroll" for everything below.
:::

## CSS Customization

Advanced users can adjust animation properties via data attributes:

```html
<section data-animate="slide-left" 
         data-stagger="200" 
         data-duration="1000" 
         data-easing="cubic-bezier(0.34,1.56,0.64,1)"
         data-initial-opacity="0.2"
         data-offset="60">
```

### Easing Functions

| Value | Feel |
|---|---|
| `cubic-bezier(0.16, 1, 0.3, 1)` | Smooth deceleration (default) |
| `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy overshoot |
| `ease-out` | Gentle deceleration |
| `ease-in-out` | Symmetric |
| `linear` | Constant speed |

## Verifying Animations

1. Save and publish
2. Visit the preview URL
3. Open DevTools → Elements tab
4. Look for `.wb-animated` classes on your elements
5. Scroll the page — watch `animation-play-state` change from `paused` to `running`

## Common Issues

### Animations don't trigger?

- [ ] Element has `data-animate` attribute (saved, not just in canvas)
- [ ] Element or its children have `data-animate-item`
- [ ] You're scrolling enough to trigger IntersectionObserver (threshold 0.1 = 10% visible)

### Stagger not working?

- [ ] Children are tagged with `data-animate-item` (use ✨ Stagger All Children)
- [ ] Stagger value is > 0ms
- [ ] Check for `.visible` hardcoded in HTML (removes animation entirely)

### Animation plays but resets?

Check `animation-fill-mode: both` — without it, elements snap back after animation completes. The `.wb-animated` class includes this.
