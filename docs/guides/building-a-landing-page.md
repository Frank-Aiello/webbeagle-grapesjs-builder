# Building a Landing Page

Step-by-step guide to building a complete landing page with WebBeagle.

## 1. Create a Project

1. Open [builder.webbeagle.com](https://builder.webbeagle.com/)
2. Click **🧪 Onboard AI** (recommended) or create manually
3. Fill out the onboarding wizard:
   - Project name (e.g., "SigmaCal Landing")
   - Industry (e.g., "fitness tracking")
   - Brand voice (e.g., "gritty, motivational")
   - Font preferences
   - Colors (type hex codes like `#22c55e`, press Enter)
4. Click **Generate Full Site**

The AI generates a complete homepage with all blocks themed to your brand.

## 2. Review and Customize

### Hero Section

1. Click the headline text to edit inline
2. Update the subheadline and highlight text
3. Change CTA button text and links
4. Adjust stats (numbers + labels)

### Services Section

1. Edit card titles, descriptions, and pricing
2. Change icons (emoji or SVG)
3. Add/remove cards by duplicating or deleting

### Testimonials

1. Edit quote text, author names, and roles
2. Change quote mark colors (`.c-purple`, `.c-gold`, `.c-teal`)
3. Update avatar initials

### CTA Section

1. Edit headline and description
2. Update button text and link

### Footer

1. Update brand name
2. Edit link groups (Services, Company)
3. Update copyright year and email

## 3. Style Your Page

### Theme Colors

Open **🎨 Theme** and update:

```css
:root {
  --accent: #your-color;
  --primary: #your-dark-color;
}
```

### Fonts

Change the Google Fonts import and CSS variables:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap');
:root {
  --font-heading: 'Your Font', sans-serif;
  --font-body: 'Inter', sans-serif;
}
```

## 4. Add Animations

1. Click a section (e.g., services)
2. Click **🎬 Animate** in the toolbar
3. Toggle ON, choose **fade-up**
4. Click **✨ Stagger All Children**
5. Set stagger to 120ms
6. Repeat for testimonials and CTA

## 5. Add a Contact Form

1. Drag a **Form** element from the Blocks panel
2. Add inputs: Name, Email, Message
3. Add a Submit button
4. Set `data-webbeagle-form` on the `<form>` element
5. Set `data-form-thankyou="Thanks! We'll reply within 24 hours."`
6. Configure notification email via API

## 6. Preview and Publish

1. Click **💾 Save**
2. Preview at `https://slug.preview.webbeagle.com/`
3. Scroll through — verify animations trigger
4. Test the contact form
5. Click **🚀 Publish** when ready

## Tips

- **Save frequently** — use Ctrl+S or the 💾 button
- **Preview on mobile** — use the device switcher (Desktop/Tablet/Mobile)
- **Test links** — all `#` links use smooth scrolling
- **Check animations** — scroll slowly and verify stagger timing
- **Verify forms** — submit a test message and check email
