# Theme Editor

The Theme Editor gives you full CSS control over your project's design system.

## Opening

Click **🎨 Theme** in the toolbar. A modal opens with the full theme CSS.

## CSS Variables

All WebBeagle themes use these CSS custom properties:

```css
:root {
  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --bg:           #0a0a0a;
  --accent:       #A383E6;
  --accent-h:     #8F6CE0;
  --primary:      #3A2A56;
  --gold-1: #FFFDE7; --gold-2: #FFD500;
  --gold-3: #f5a14c; --gold-4: #FFC107;
  --gold-stroke: #FFB040;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}
```

## Brand Classes

| Class | Effect |
|---|---|
| `.gold-gloss` | Metallic gold gradient text with stroke and shadow |
| `.glass` | Frosted glass panel with layered backgrounds, blur, and border highlights |
| `.glass-shimmer` | Mouse-tracking radial highlight inside glass panels |
| `.btn-primary` | Animated gradient border button with rainbow conic spinner |
| `.btn-secondary` | Simple ghost button with hover lift |
| `.btn-white` | Solid accent gradient button (CTA sections) |

## Fonts

WebBeagle uses Google Fonts by default:

- **Headings:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (weight 700, 800)
- **Body:** [Inter](https://fonts.google.com/specimen/Inter) (weight 300–700)

To change fonts, update the `@import` and `--font-heading` / `--font-body` variables.

## Responsive Breakpoints

```css
@media (max-width: 768px) {
  nav.wb-nav { padding: 18px 24px; }
  .nav-links { display: none; }
  section.wb-section { padding: 60px 24px; }
  .hero-stats { grid-template-columns: 1fr; }
}
```

## Saving

Changes to the theme CSS are saved when you click **💾 Save** in the toolbar. The theme is stored in `meta.json` under `theme_css`.

## Live Preview Toggle

In the Theme modal, toggle **Live Preview** to see CSS changes apply in real-time as you type.
