# Contact Forms Setup Guide

Your website now has 4 comprehensive contact forms that collect detailed information from potential clients. Here's how to make them send emails to you.

## 📋 Forms Overview

1. **IT Support Form** - Collects company size, support type, urgency, current IT setup
2. **LogistiCore SaaS Form** - Collects user count, business type, services needed, current software
3. **Web Design Form** - Collects project type, page count, budget, desired features, timeline
4. **General Inquiry Form** - Simple contact form for other enquiries

## 🚀 Option 1: Formspree (Recommended - Easy & Free)

Formspree is perfect for static sites and offers a free tier.

### Setup Steps:

1. **Create a Formspree Account**
   - Go to [formspree.io](https://formspree.io)
   - Sign up for free (50 submissions/month)
   - Or upgrade to $10/month for unlimited submissions

2. **Create Forms**
   - Click "New Form" in your Formspree dashboard
   - Create 4 forms with these names:
     - `IT Support Enquiries`
     - `LogistiCore SaaS Enquiries`
     - `Web Design Enquiries`
     - `General Enquiries`

3. **Get Form IDs**
   - For each form, copy the form ID (looks like: `abc123xyz`)
   - Or copy the full form endpoint (looks like: `https://formspree.io/f/abc123xyz`)

4. **Update contact.html**
   - Find each form's `action` attribute:
   ```html
   <form id="it-support-form" class="contact-form active" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
   - Replace `YOUR_FORM_ID` with your actual Formspree form ID:
   ```html
   <form id="it-support-form" class="contact-form active" action="https://formspree.io/f/abc123xyz" method="POST">
   ```

5. **Configure Email Settings in Formspree**
   - Set notification email to: `sales@logisticoreapp.com`
   - Optionally add `support@logisticoreapp.com` as CC
   - Customize email templates if desired
   - Enable spam filtering

6. **Test**
   - Fill out each form on your live site
   - Check your email for submissions
   - First submission to each form requires email verification

### Formspree Features:
- ✅ Email notifications to your inbox
- ✅ Spam filtering (hCaptcha, Akismet)
- ✅ File uploads (if you add them later)
- ✅ Custom thank-you pages
- ✅ Auto-reply emails to customers
- ✅ Export submissions as CSV
- ✅ Webhook integrations (Slack, Zapier, etc.)

## 🌐 Option 2: Netlify Forms (If using Netlify)

Since you're already on Netlify, this is a native option.

### Setup Steps:

1. **Add netlify attribute to forms**
   - Open `contact.html`
   - Add `netlify` attribute to each form tag:
   ```html
   <form id="it-support-form" class="contact-form active" name="it-support" netlify method="POST">
   ```

2. **Add hidden input for form name**
   ```html
   <input type="hidden" name="form-name" value="it-support">
   ```

3. **Remove or update action attribute**
   ```html
   action="/thank-you.html"
   ```

4. **Commit and push**
   - Netlify will automatically detect forms on next deploy
   - Forms appear in Netlify Dashboard > Forms

5. **Configure Notifications**
   - Go to Netlify Dashboard > Forms > Settings
   - Add email notification to: `sales@logisticoreapp.com`
   - Set up Slack/Discord notifications if desired

### Netlify Forms Features:
- ✅ 100 submissions/month (free tier)
- ✅ Email notifications
- ✅ Spam filtering (Akismet)
- ✅ Export as CSV
- ✅ Webhook integrations
- ✅ No external service needed

## 📧 Option 3: Email Service (EmailJS)

If you want client-side email sending without a backend:

1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Create an email service (Gmail, Outlook, etc.)
3. Create email templates for each form
4. Add EmailJS JavaScript library to your forms
5. Update form submission JavaScript to use EmailJS

## 🎯 Recommended: Formspree

**Why Formspree?**
- ✅ Easiest to set up (just change form action)
- ✅ No code changes needed
- ✅ Better spam protection than Netlify
- ✅ More submissions on free tier (50 vs 100, but better filtering)
- ✅ Better email customization
- ✅ Can add reCAPTCHA easily
- ✅ Form analytics included

## 🔔 Setting Up Email Notifications

Once you've chosen a service, configure these settings:

### Email Template Example:

**Subject:** New [Enquiry Type] from [Company Name]

**Body:**
```
New enquiry received via LogistiCore Technologies website

ENQUIRY TYPE: [it-support/saas/web-design/general]

CONTACT INFORMATION:
Name: [First Name] [Last Name]
Email: [Email]
Phone: [Phone]
Company: [Company Name]

[Form-specific fields here]

MESSAGE/DETAILS:
[Message content]

---
Submitted: [Date/Time]
IP Address: [IP]
```

### Auto-Reply Template:

**Subject:** Thank you for contacting LogistiCore Technologies

**Body:**
```
Hi [First Name],

Thank you for your enquiry about [service type].

We've received your information and one of our team will be in touch within 24 hours.

In the meantime, if you need urgent assistance, please call us at:
+44 (0) 333 339 0451

Best regards,
LogistiCore Technologies Team

---
This is an automated confirmation. Please do not reply to this email.
For support: support@logisticoreapp.com
For sales: sales@logisticoreapp.com
```

## 🛡️ Spam Protection

All services offer spam protection, but consider:

1. **Add hCaptcha or reCAPTCHA** (Formspree makes this easy)
2. **Enable honeypot fields** (invisible field that bots fill)
3. **Rate limiting** (prevent multiple submissions)
4. **Email verification** (require email confirmation)

## 📊 Form Analytics

Track form performance:

1. **Formspree Dashboard** - See submission rates, popular forms
2. **Google Analytics** - Track form interactions with events
3. **Netlify Analytics** - See form submission stats

## 🚨 Testing Your Forms

Before going live:

1. ✅ Test each form with valid data
2. ✅ Check email arrives at `sales@logisticoreapp.com`
3. ✅ Verify all fields are captured correctly
4. ✅ Test on mobile devices
5. ✅ Try submitting invalid data (should show validation errors)
6. ✅ Test spam protection if enabled

## 📱 Mobile Testing

Forms are fully responsive, but verify:

- Dropdowns work on iOS/Android
- Date pickers display correctly
- Checkboxes are easy to tap
- Submit button is accessible
- Error messages are visible

## 🎨 Customization

You can customize the forms further:

- Add more fields specific to your business
- Change colors to match your brand (already cyan themed)
- Add conditional fields (show/hide based on selections)
- Add file upload for project briefs/RFPs
- Add calendar integration for booking calls

## 💡 Next Steps

1. Choose Formspree (recommended) or Netlify Forms
2. Set up the forms following the steps above
3. Test thoroughly
4. Monitor submissions for first week
5. Set up auto-replies to improve customer experience

## 🆘 Need Help?

If you need assistance setting up the forms:
- Formspree documentation: https://help.formspree.io/
- Netlify Forms guide: https://docs.netlify.com/forms/setup/
- Contact Formspree support (very responsive)

---

**Current Status:** Forms are styled, validated, and ready. Just need to connect to email service.

**Estimated Setup Time:** 15-30 minutes with Formspree
