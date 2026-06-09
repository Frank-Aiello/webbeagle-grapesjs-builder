# Animation System

WebBeagle uses a centralized animation engine with `data-animate-*` attributes. It works on both the builder canvas and published pages.

## How It Works

1. **Containers** get a `data-animate` attribute (e.g., `data-animate="fade-up"`)
2. **Children** get `data-animate-item` attributes
3. The engine applies staggered delays and triggers via IntersectionObserver
4. Single elements without children animate themselves

## Using the Animation Panel

### Opening the Panel

Click the **🎬 Animate** button in the toolbar. The panel slides in from the right.

::: warning Style Manager
The Animation panel covers the Style Manager. Close it with the 🎬 button when you want to style elements.
:::

### Enabling Animation

1. Select an element (section, card, heading, or any element)
2. Open the Animation panel
3. Click the **OFF → ON** toggle
4. Choose a preset

### Settings

| Setting | Range | Default | Description |
|---|---|---|---|
| **Preset** | fade-up / fade-in / slide-left / slide-right / zoom-in | fade-up | Animation type |
| **Stagger** | 0–500ms | 120ms | Delay between each child |
| **Duration** | 200–3000ms | 800ms | How long each animation takes |
| **Initial Opacity** | 0–1 | 0 | Starting opacity |
| **Trigger** | scroll / load | scroll | When animation fires |

### Staggering Children

Click **✨ Stagger All Children** to automatically tag:

- Grid children (`.services-grid`, `.testimonials-grid`, `.steps-grid`)
- Direct children of the selected element
- The element itself (if no children — for standalone items like headings)

### Animating a Single Element

1. Select the element (e.g., a heading)
2. Open 🎬 Animate
3. Click ON → choose preset
4. Click ✨ Stagger All Children
5. The engine detects no children and animates the element itself

## Data Attributes

| Attribute | Value | Example |
|---|---|---|
| `data-animate` | fade-up, fade-in, slide-left, slide-right, zoom-in | `data-animate="fade-up"` |
| `data-stagger` | milliseconds | `data-stagger="150"` |
| `data-duration` | milliseconds | `data-duration="1000"` |
| `data-easing` | CSS easing function | `data-easing="cubic-bezier(0.16,1,0.3,1)"` |
| `data-initial-opacity` | 0–1 | `data-initial-opacity="0"` |
| `data-offset` | pixels | `data-offset="60"` |
| `data-trigger` | scroll or load | `data-trigger="load"` |
| `data-animate-item` | (no value) | `data-animate-item` |

## Published Pages

The animation system is injected into every published page via `_render_preview()`. The engine:

- Processes all `[data-animate]` containers
- Adds `.wb-animated` classes to items
- Sets CSS custom properties for delay, duration, opacity
- Triggers via IntersectionObserver on scroll
- Supports `data-trigger="load"` for immediate animation

## Legacy Support

The engine also handles legacy `.reveal` classes (used in the how-it-works section). These are triggered by a separate IntersectionObserver with staggered transition delays.
