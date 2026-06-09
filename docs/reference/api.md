# API Endpoints

Base URL: `https://builder.webbeagle.com`

All endpoints return JSON. CORS is enabled for all origins.

## Projects

### List Projects

```http
GET /api/projects
```

**Response:**
```json
{
  "projects": [
    {
      "id": "my-project",
      "name": "My Project",
      "created": "2026-06-08T00:00:00",
      "updated": "2026-06-08T12:00:00",
      "pages": ["home", "about"],
      "preview_url": "/preview/my-project/home/"
    }
  ]
}
```

### Create Project

```http
POST /api/projects
Content-Type: application/json

{
  "name": "My New Site",
  "slug": "my-new-site",
  "theme_css": "@import url(...); :root { ... }",
  "components": "<section>...</section>",
  "styles": "body { background: #000; }",
  "notification_email": "me@example.com"
}
```

### Get Project

```http
GET /api/projects/{project_id}
```

Returns full project data including `pages_data`, `theme_css`, and settings.

### Save Project

```http
PUT /api/projects/{project_id}
Content-Type: application/json

{
  "name": "Updated Name",
  "theme_css": "...",
  "components": "...",
  "styles": "...",
  "page_id": "home"
}
```

Also accepts `pages_data` for multi-page saves.

### Delete Project

```http
DELETE /api/projects/{project_id}
```

### Project Settings

```http
GET /api/projects/{project_id}/settings
```

```http
PUT /api/projects/{project_id}/settings
Content-Type: application/json

{
  "notification_email": "me@example.com",
  "recaptcha_site_key": "...",
  "recaptcha_secret_key": "..."
}
```

## Pages

### Add Page

```http
POST /api/projects/{project_id}/pages
Content-Type: application/json

{"name": "about"}
```

### Delete Page

```http
DELETE /api/projects/{project_id}/pages/{page_id}
```

## Form Submissions

### Submit Form

```http
POST /api/submit-form
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!",
  "_project": "my-project-slug"
}
```

**Required:** Either `_project` field OR matching Host header for project resolution.

**Response:** `{"status": "ok"}` or error with message.

**Rate limit:** 5 submissions per minute per IP.
**Honeypot:** Include `_wb_hp` field (auto-injected by form handler).

## Components

### Save Component

```http
POST /api/components
Content-Type: application/json

{
  "name": "My Custom Block",
  "category": "Custom",
  "html": "...",
  "css": "..."
}
```

## Assets

### Upload Asset

```http
POST /api/assets/upload
Content-Type: multipart/form-data

file: image.png
```

Returns `{"url": "https://.../assets/uuid.png", "filename": "uuid.png"}`.

## AI Generation

### Generate Section

```http
POST /api/ai/generate
Content-Type: application/json

{
  "project_id": "my-project",
  "prompt": "Add a pricing table with 3 tiers"
}
```

### AI Refine Element

```http
POST /api/ai/refine
Content-Type: application/json

{
  "project_id": "my-project",
  "element_html": "...",
  "current_screenshot": "base64...",
  "reference_screenshot": "base64...",
  "instruction": "Add green outer glow"
}
```
