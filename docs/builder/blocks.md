# Block Library

WebBeagle ships with a curated set of pre-built section blocks. Each block is a complete HTML section with associated CSS.

## Built-in Blocks

| Block | Description | Key Classes |
|---|---|---|
| **mesh-bg** | Animated background mesh with blobs and grid texture | `.mesh-bg`, `.blob`, `.grid-tex` |
| **navbar** | Fixed navigation bar with brand, links, and CTA | `nav.wb-nav`, `.nav-brand`, `.nav-cta` |
| **hero** | Full-height sticky hero with glass panel, badge, stats | `.hero-wrap`, `.hero`, `.glass`, `.hero-stats` |
| **services** | Three-column service cards with icons and pricing | `.services-grid`, `.svc-card`, `.svc-icon` |
| **how-it-works** | Three-step process section with numbered circles | `.steps`, `.step`, `.step-num` |
| **testimonials** | Three testimonial cards with quotes and avatars | `.testimonials-grid`, `.testimonial-card` |
| **cta** | Full-width call-to-action banner | `.cta-section` |
| **footer** | Footer with brand, links, and copyright | `footer.wb-footer` |

## Using Blocks

1. Open the Blocks panel on the left
2. Find the block you want in the category
3. Drag it onto the canvas
4. Edit text, images, and styles inline

## Saving Custom Blocks

1. Select the section you built
2. Click **📦 Save as Block**
3. Name it and choose a category
4. It appears in the Blocks panel for all future projects

## Block Structure Convention

Each block follows this pattern:

```html
<section class="wb-section" id="section-name">
  <div class="section-header">
    <div class="section-badge">
      <span class="sdot"></span>
      <span>Category Label</span>
    </div>
    <h2>Section Title</h2>
    <p>Section description</p>
  </div>
  <!-- Block content -->
</section>
```

## CSS Dependencies

All blocks rely on the **theme CSS** which defines:

- CSS variables (`--bg`, `--accent`, `--primary`, `--gold-*`, `--ease`)
- `.glass` panel effects
- `.gold-gloss` text treatment
- Button styles (`.btn-primary`, `.btn-secondary`)
- Responsive breakpoints
