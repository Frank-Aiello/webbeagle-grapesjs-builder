# Project Setup

## Opening the Builder

Visit **[builder.webbeagle.com](https://builder.webbeagle.com/)** to open the WebBeagle Builder.

## Creating a Project

1. Click the **🧪 Onboard AI** button in the toolbar, **or**
2. Head to the AI panel (🤖 AI) and describe your project
3. AI generates a complete homepage with theme, blocks, and content

**Manual creation:**
1. Open the 📂 Projects modal
2. Click **+ New Project**
3. Give it a name — the slug is auto-generated

## Loading an Existing Project

Use the project dropdown in the top toolbar to switch between projects. The builder loads the last saved state automatically.

## Multi-Page Support

1. Click **+ Page** to add pages (About, Contact, Services)
2. Switch pages with the page dropdown
3. Each page has its own canvas and is published independently

## Saving

- **💾 Save** button in the toolbar saves to the server
- Projects auto-load on visit — no manual load needed
- Unsaved changes are indicated in the status bar

## Project Structure

```
/opt/data/grapesjs-projects/{slug}/
  ├── meta.json          # Project name, theme, settings
  └── pages/
      ├── home.json      # Home page components + styles
      └── about.json     # Additional pages
```
