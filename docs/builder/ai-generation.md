# AI Generation

WebBeagle integrates AI for generating page sections, refining elements, and redesigning with vision comparison.

## AI Panel (🤖 AI)

Click the **🤖 AI** button in the toolbar to open the AI panel.

### Text-to-Section Generation

1. Type a description of what you want
2. Click **Generate**
3. The section appears in the current page

**Example prompts:**
```
Add a pricing table with 3 tiers: Starter ($29/mo), Pro ($79/mo), Enterprise ($199/mo)
```

```
Create a team section with 4 member cards — photos, names, roles, and short bios
```

```
Add a FAQ section with 5 questions about managed WordPress hosting
```

### AI with Design Image

1. Upload a screenshot or design mockup
2. Type instructions: "Recreate this pricing table in our style"
3. AI uses vision to match the design, then applies WebBeagle theming

## Element Refinement

Close the "80% → pixel perfect" gap with targeted AI refinements:

1. Select any element on the canvas
2. Open the AI panel
3. Upload a reference image (showing what it should look like)
4. Type an instruction: "Add green outer glow to this text"
5. AI returns only the CSS delta needed

**Best for:**
- Text treatments (gloss, glow, shadows)
- Spacing and alignment tweaks
- Color adjustments
- Border and shadow refinements

## AI Onboarding (New Projects)

1. Click **🧪 Onboard AI** in the toolbar
2. Fill out the wizard:
   - Project name
   - Industry (e.g., "fitness tracking")
   - Brand voice (e.g., "gritty, motivational, premium")
   - Font preferences
   - Color palette (type hex codes)
   - Upload design screenshots (optional)
   - Scrape competitor URLs (optional)
3. Click **Generate Full Site**
4. AI builds a complete homepage with all blocks, themed to your brand

## AI QA / Dogfooding

For testing published pages, use the browser tools:

```bash
curl -s "https://slug.preview.webbeagle.com/" | grep '<!DOCTYPE' | wc -l
# Should return 1 — nested HTML means broken CSS
```

Common AI-generation pitfalls:
- Saving full HTML documents as components creates nested `<html>` — save only `<style>` + `<section>`
- Buttons mapped incorrectly — "primary button" → `.btn-primary` with `<span>`, "secondary" → `.btn-secondary`

## Architecture

AI requests are processed by the Flask backend:

```
Builder → POST /api/ai/generate → Flask → AI model → Returns HTML → Inserted into canvas
```

The AI prompt includes:
- Current theme CSS (so generated sections match)
- Brand guidelines (colors, fonts, mascot)
- Button type mapping (primary/secondary)
- Component structure conventions
