# Form Builder

WebBeagle integrates GrapesJS forms with Emailit for email notifications when visitors submit forms.

## Architecture

```
Visitor submits form → JS runtime intercepts → POST /api/submit-form →
Flask validates (honeypot, rate limit) → Emailit sends email → Site owner notified
```

## Adding a Form

1. Open the Blocks panel
2. Drag a **Form** container onto the canvas
3. Add **Input**, **Textarea**, **Select**, and **Button** elements inside
4. Set the form's `action` and `method` — **not required** if using WebBeagle handling

## Enabling Form Handling

Add the attribute `data-webbeagle-form` to your `<form>` element:

```html
<form data-webbeagle-form data-form-thankyou="We'll reply within 24 hours!">
  <input type="text" name="name" placeholder="Your Name" required>
  <input type="email" name="email" placeholder="Your Email" required>
  <textarea name="message" placeholder="Your Message"></textarea>
  <button type="submit">Send Message</button>
</form>
```

## Thank-You Message

Set a custom thank-you message with `data-form-thankyou`:

```html
<form data-webbeagle-form data-form-thankyou="Thanks for reaching out! 🐾">
```

If omitted, the default is: *"Thank you! We'll be in touch soon."*

The thank-you message inherits your page's CSS — it uses `--font-heading` and matches your design automatically.

## Spam Protection

### Honeypot (Automatic)

Every form with `data-webbeagle-form` gets an invisible honeypot field injected automatically. Bots fill it; humans don't. Filled honeypots are silently discarded — no error shown.

### Rate Limiting

The API limits submissions to **5 per minute per IP address**. Exceeding this returns a 429 error.

### reCAPTCHA (Future)

The project settings support `recaptcha_site_key` and `recaptcha_secret_key`. When configured, forms will require reCAPTCHA validation. Contact us to enable this.

## Setting Up Notifications

Set the notification email for your project:

```bash
curl -X PUT "https://builder.webbeagle.com/api/projects/{slug}/settings" \
  -H "Content-Type: application/json" \
  -d '{"notification_email":"you@example.com"}'
```

Submissions are sent from `alerts@webbeagle.com`.

## Published Page Runtime

When you publish, the form handler JavaScript is automatically injected into your page. No manual script tags needed.

The runtime:
1. Finds all `[data-webbeagle-form]` forms
2. Injects honeypot fields
3. Intercepts submit events
4. POSTs data to the API
5. Replaces the form with a thank-you message on success

## Testing Forms

1. Publish your page
2. Visit the preview URL
3. Fill and submit the form
4. Check the notification email inbox
