# CSS Classes

Complete reference of CSS classes available in the WebBeagle theme.

## Variables

```css
--font-heading   /* 'Plus Jakarta Sans', sans-serif */
--font-body      /* 'Inter', system-ui, sans-serif */
--bg             /* #0a0a0a */
--accent         /* #A383E6 */
--accent-h       /* #8F6CE0 */
--primary        /* #3A2A56 */
--gold-1..4      /* Gold gloss gradient stops */
--gold-stroke    /* #FFB040 */
--ease           /* cubic-bezier(0.16, 1, 0.3, 1) */
```

## Brand Classes

### `.gold-gloss`

Metallic gold gradient text. Uses `background-clip: text` with stroke and drop shadow.

```html
<h1><span class="gold-gloss">Premium Text</span></h1>
```

### `.glass`

Frosted glass panel effect with multi-layer backgrounds, backdrop blur, border highlights, and hover shadow enhancement.

```html
<div class="glass">
  <div class="glass-shimmer"></div>
  <h2>Panel Content</h2>
</div>
```

### `.glass-shimmer`

Mouse-tracking radial highlight inside glass panels. Requires parent `.glass` with JS mouse tracking.

### `.btn-primary`

Animated gradient border button with spinning conic gradient. Requires `<span>` wrapper inside.

```html
<a href="#" class="btn-primary"><span>Get Started →</span></a>
```

### `.btn-secondary`

Ghost button with subtle background and hover lift.

```html
<a href="#" class="btn-secondary">Learn More</a>
```

### `.btn-white`

Solid accent gradient CTA button. Used in `.cta-section`.

```html
<a href="#" class="btn-white">Get Started Today</a>
```

## Layout

| Class | Purpose |
|---|---|
| `section.wb-section` | Standard content section (80px padding) |
| `.section-header` | Centered header block within sections |
| `.section-badge` | Small badge with dot and label |
| `.sdot` | Small colored dot inside badge |
| `.cta-section` | Full-width gradient CTA banner |

## Nav

| Class | Purpose |
|---|---|
| `nav.wb-nav` | Fixed top navigation bar |
| `.nav-brand` | Brand logo/text link |
| `.nav-brand-icon` | Small purple icon box |
| `.nav-links` | Horizontal link list |
| `.nav-cta` | Spinning border CTA in nav |

## Hero

| Class | Purpose |
|---|---|
| `.hero-wrap` | Sticky hero wrapper (130vh) |
| `.hero` | Full-viewport hero section |
| `.hero-badge` | Status badge with pulsing dot |
| `.hero-stats` | 3-column stat grid |
| `.stat` | Individual stat block |

## Cards

| Class | Purpose |
|---|---|
| `.services-grid` | Responsive grid for service cards |
| `.svc-card` | Service card with hover lift + glow |
| `.svc-icon` | Small icon box (purple/green/orange variants) |
| `.svc-price` | Price tag badge |

## Testimonials

| Class | Purpose |
|---|---|
| `.testimonials-grid` | Responsive testimonial grid |
| `.testimonial-card` | Individual testimonial with dark gradient bg |
| `.testimonial-quote` | Large quote mark (purple/gold/teal) |
| `.testimonial-text` | Body text |
| `.testimonial-author` | Author row (avatar + name + role) |
| `.testimonial-avatar` | Circle avatar (purple/gold/teal bg) |

## Process / Steps

| Class | Purpose |
|---|---|
| `.steps` | Responsive step grid |
| `.step` | Individual step (centered) |
| `.step-num` | Numbered circle with gradient + glow |

## Footer

| Class | Purpose |
|---|---|
| `footer.wb-footer` | Site footer |
| `.footer-inner` | Centered max-width container |
| `.footer-top` | Brand + links flex row |
| `.footer-links` | Link group container |
| `.footer-link-group` | Column of links with heading |
| `.footer-bottom` | Copyright + built-with row |

## Background

| Class | Purpose |
|---|---|
| `.mesh-bg` | Fixed full-screen animated background |
| `.blob` | Animated color blob (positioned absolute) |
| `.grid-tex` | Subtle grid texture overlay |

## Animation

| Class | Purpose |
|---|---|
| `.wb-animated` | Animation target (auto-added by engine) |
| `.animate-entry` | Hero entrance animation |
| `.d1`–`.d6` | Staggered animation delays (150ms–900ms) |
| `.reveal` | Legacy scroll reveal (opacity + translateY) |
| `.reveal.visible` | Revealed state |
| `.r1`–`.r4` | Legacy stagger delays (100ms–500ms) |

## Forms

| Class | Purpose |
|---|---|
| `.wb-form-success` | Thank-you message container |

## Color Variants

| Class | Effect |
|---|---|
| `.c-purple` | `#A383E6` |
| `.c-gold` | `#F8B133` |
| `.c-teal` | `#20C997` |
| `.c-green` | `rgba(16,185,129,.15)` bg |
| `.c-orange` | `rgba(245,158,11,.15)` bg |
| `.bg-purple` | `#6A4C93` |
| `.bg-gold` | `#F8B133` (dark text) |
| `.bg-teal` | `#20C997` |

## Responsive

All responsive rules use `@media (max-width: 768px)`:

- Nav padding reduced
- Nav links hidden
- Hero padding reduced
- Stats stack vertically
- Section padding reduced
