# Setting Up Forms

Complete walkthrough for adding a contact form to your WebBeagle site with email notifications.

## Prerequisites

- A published WebBeagle project
- Access to the API or have your notification email configured

## Step 1: Build the Form

1. Open your project in the [builder](https://builder.webbeagle.com/)
2. From the **Blocks** panel, drag a **Form** container onto your page
3. Inside the form, add:
   - **Input** → set `name="name"`, placeholder="Your Name"
   - **Input** → set `name="email"`, type="email", placeholder="Your Email"
   - **Textarea** → set `name="message"`, placeholder="Your Message"
   - **Button** → set `type="submit"`, text="Send Message"

## Step 2: Enable WebBeagle Form Handling

Select the `<form>` element and add the attribute:

```
data-webbeagle-form
```

This tells the publish runtime to intercept submissions.

## Step 3: Customize the Thank-You Message

Add a `data-form-thankyou` attribute to the form:

```
data-form-thankyou="Thanks for reaching out, we'll reply within 24 hours! 🐾"
```

If you skip this, the default is: *"Thank you! We'll be in touch soon."*

## Step 4: Set Your Notification Email

Use the API to set where submissions are sent:

```bash
curl -X PUT "https://builder.webbeagle.com/api/projects/YOUR-PROJECT-SLUG/settings" \
  -H "Content-Type: application/json" \
  -d '{"notification_email":"you@example.com"}'
```

Replace `YOUR-PROJECT-SLUG` with your project's slug (shown in the project dropdown).

## Step 5: Publish and Test

1. Click **💾 Save**
2. Click **🚀 Publish**
3. Visit your preview URL
4. Fill and submit the form
5. Check your email for the notification

## What Happens When Someone Submits

1. The form handler intercepts the submit event
2. A honeypot check silently rejects bot submissions
3. Form data is POSTed to the API
4. The API rate-limits (5/min per IP)
5. Emailit sends a formatted HTML email to your notification address
6. The form is replaced with your thank-you message

## Troubleshooting

### Form submits but no email?

- [ ] `data-webbeagle-form` is present on the `<form>` element
- [ ] Notification email is configured (check via `GET /api/projects/{slug}/settings`)
- [ ] Check spam folder
- [ ] Verify the form has a submit button with `type="submit"`

### Getting "Something went wrong"?

- Check browser console for API errors
- Verify the form fields have `name` attributes
- Check if you hit the rate limit (5/min)

### Form doesn't submit at all?

- [ ] Button has `type="submit"`
- [ ] Form element has `data-webbeagle-form`
- [ ] Page was published after adding the form

## Advanced: Multiple Forms on One Page

Each `[data-webbeagle-form]` is handled independently. Each can have its own `data-form-thankyou` message.

```html
<form data-webbeagle-form data-form-thankyou="Thanks for contacting us!">
  <!-- Contact form fields -->
</form>

<form data-webbeagle-form data-form-thankyou="You're on the list! 📧">
  <!-- Newsletter signup fields -->
</form>
```

## Advanced: reCAPTCHA (Future)

When reCAPTCHA keys are configured in project settings, the form handler will include reCAPTCHA validation automatically. No form changes needed.
