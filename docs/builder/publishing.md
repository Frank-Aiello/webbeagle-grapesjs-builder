# Publishing

## Preview

Every project gets an automatic preview URL:

```
https://{slug}.preview.webbeagle.com/
```

**Example:** `webbeagle-homepage-official.preview.webbeagle.com`

The preview is always up-to-date with the last save — no separate publish step needed for preview.

## Publishing to Live

1. Click **🚀 Publish** in the toolbar
2. The current project is saved and the preview is refreshed
3. For custom domain publishing, contact us

## How Publishing Works

When you publish:

1. The builder sends components HTML + styles CSS to the Flask API
2. The API saves page data to `/opt/data/grapesjs-projects/{slug}/pages/{page}.json`
3. The API saves theme CSS and metadata to `meta.json`
4. Preview URLs render via `_render_preview()` which:
   - Converts GrapesJS JSON components to HTML
   - Wraps in full HTML document with theme CSS
   - Injects animation system (CSS + JS)
   - Injects form handler (if forms with `data-webbeagle-form` exist)
   - Adds parallax, smooth scroll, and glass card effects

## Preview URL Format

```
https://{slug}.preview.webbeagle.com/{page}/
```

If no page is specified, `/home/` is the default.

## Wildcard Routing

Both `builder.webbeagle.com` and `*.preview.webbeagle.com` are routed through Traefik to the Flask app on port 8092. The Flask app:

- Serves the builder at `/` (builder.webbeagle.com)
- Renders preview pages for any subdomain matching `*.preview.webbeagle.com`

## Checking Your Preview

```bash
# Verify single DOCTYPE (nested HTML = broken CSS):
curl -s "https://slug.preview.webbeagle.com/" | grep -c '<!DOCTYPE'
# Should return: 1

# Check form handler is injected:
curl -s "https://slug.preview.webbeagle.com/" | grep -c 'data-webbeagle-form'
# Returns count of forms on page

# Check animation runtime is present:
curl -s "https://slug.preview.webbeagle.com/" | grep -c 'wb-animated'
# Should return > 0 if animations are configured
```
