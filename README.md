# LogistiCore Technologies Website

Professional static website for LogistiCore Technologies Ltd - IT Support, LogistiCore SaaS Platform, and Website Creation Services.

## 🌟 Features

- **Clean, Modern Design** - Professional layout with cyan tech-cube branding
- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **Animated Logo** - Subtle glow and pulse animation (CSS-only)
- **Three Service Divisions**:
  1. IT Support & Managed Services
  2. LogistiCore SaaS (freight forwarding platform)
  3. Logistics Website Creation
- **SEO Optimized** - Semantic HTML, meta tags, and structured content
- **Fast Loading** - Lightweight CSS, optimized assets
- **Mobile Menu** - Responsive navigation with hamburger menu

## 📁 Project Structure

```
logisticore-site/
├── index.html              # Homepage
├── it-support.html         # IT Support & Managed Services page
├── logisticore-saas.html   # LogistiCore SaaS product page
├── website-creation.html   # Website creation services page
├── pricing.html            # Transparent pricing for all services
├── contact.html            # Contact form and information
├── styles.css              # Main stylesheet with animations
├── assets/
│   ├── img/
│   │   └── logisticore-technologies-logo.png  # [YOU NEED TO ADD THIS]
│   └── anim/               # Reserved for future Lottie animations
└── README.md               # This file
```

## 🚀 Quick Start

### 1. Add Your Logo

**IMPORTANT:** Place your logo file at:
```
assets/img/logisticore-technologies-logo.png
```

The logo should be:
- PNG format with transparent background
- Approximately 200px height (will be displayed at 50px)
- High resolution for retina displays
- Cyan tech-cube design as discussed

### 2. Test Locally

Simply open `index.html` in a web browser:

```bash
cd logisticore-site
open index.html  # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

Click through all navigation links to verify everything works.

### 3. Mobile Testing

Test responsive design by:
1. Opening browser DevTools (F12)
2. Click "Toggle device toolbar" (Cmd+Shift+M on Mac)
3. Test different screen sizes (iPhone, iPad, Desktop)

## 📤 Netlify Deployment

### Option 1: Manual Deploy (Drag & Drop)

1. **Prepare the folder:**
   - Ensure logo is in `assets/img/`
   - Test all pages locally first

2. **Zip the contents** (NOT the folder itself):
   ```bash
   cd logisticore-site
   zip -r ../logisticore-site-deploy.zip *
   ```

3. **Deploy to Netlify:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Drag `logisticore-site-deploy.zip` into the deploy area
   - Site will be live in 30-60 seconds

4. **Configure custom domain:**
   - In Netlify dashboard: Site settings → Domain management
   - Add custom domain: `logisticoreapp.com`
   - Follow DNS configuration instructions

### Option 2: Git Deploy (Recommended for Long-Term)

1. **Initialize Git repository:**
   ```bash
   cd logisticore-site
   git init
   git add .
   git commit -m "Initial website launch"
   ```

2. **Push to GitHub:**
   ```bash
   # Create repo on GitHub first, then:
   git remote add origin https://github.com/stuartpople/logisticore-site.git
   git branch -M main
   git push -u origin main
   ```

3. **Connect to Netlify:**
   - In Netlify: "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `/` (root)
   - Deploy!

4. **Future updates:**
   ```bash
   # Make changes to files
   git add .
   git commit -m "Update content"
   git push
   # Netlify auto-deploys in 30-60 seconds
   ```

## 📋 Pre-Deployment Checklist

- [ ] Logo added to `assets/img/logisticore-technologies-logo.png`
- [ ] All pages tested locally (open each HTML file)
- [ ] Navigation links work correctly
- [ ] Logo loads on all pages
- [ ] Contact form displays correctly
- [ ] Mobile responsive (test at 375px, 768px, 1024px widths)
- [ ] No broken links (check Login button → app.logisticoreapp.com)
- [ ] Check spelling and grammar
- [ ] Verify contact details correct:
  - Phone: +44 (0)7577 433804
  - Email: stuart@logisticoreapp.com
  - Support: support@logisticoreapp.com

## 🎨 Customization Guide

### Update Colors

Edit `styles.css` - look for `:root` CSS variables:

```css
:root {
    --primary-cyan: #00BCD4;     /* Main cyan color */
    --primary-blue: #0ea5e9;     /* Secondary blue */
    --dark-navy: #0A1628;        /* Dark backgrounds */
    --light-cyan: #67e8f9;       /* Light accents */
}
```

### Adjust Logo Animation

In `styles.css`, find `.logo` and `@keyframes logo-glow`:

```css
.logo {
    animation: logo-glow 3s ease-in-out infinite;  /* Adjust duration */
}

@keyframes logo-glow {
    0%, 100% {
        filter: drop-shadow(0 0 5px rgba(0, 188, 212, 0.3));
    }
    50% {
        filter: drop-shadow(0 0 15px rgba(0, 188, 212, 0.6));
    }
}
```

### Update Contact Information

Search and replace across all HTML files:
- Find: `+44 (0)7577 433804`
- Find: `stuart@logisticoreapp.com`
- Find: `support@logisticoreapp.com`

### Add More Pages

Copy an existing HTML file as a template:
```bash
cp contact.html new-page.html
```

Update the content and add to navigation in all HTML files.

## 📧 Contact Form Integration

The contact form is currently a placeholder. To make it functional:

### Option 1: Netlify Forms (Easiest)

Add `netlify` attribute to the `<form>` tag in `contact.html`:

```html
<form netlify name="contact" method="POST">
```

That's it! Netlify handles submissions automatically.

### Option 2: Formspree

1. Sign up at [formspree.io](https://formspree.io)
2. Get your form endpoint
3. Update form action:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

### Option 3: Custom Backend

Integrate with your own server endpoint or email service.

## 🔧 Technical Details

**Technologies Used:**
- HTML5 (semantic markup)
- CSS3 (Grid, Flexbox, animations, custom properties)
- Vanilla JavaScript (mobile menu toggle)
- No frameworks or dependencies

**Browser Support:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Android

**Performance:**
- Lightweight CSS (~20KB)
- No external dependencies
- Fast load times
- Optimized for Core Web Vitals

## 📝 Files Created/Edited Summary

### Core Pages (6 files)
✅ `index.html` - Homepage with hero, service cards, CTA buttons
✅ `it-support.html` - IT Support & Managed Services details
✅ `logisticore-saas.html` - LogistiCore SaaS product information
✅ `website-creation.html` - Website creation services
✅ `pricing.html` - Transparent pricing for all services
✅ `contact.html` - Contact form and company information

### Styling (1 file)
✅ `styles.css` - Complete stylesheet with:
- Responsive design (mobile-first)
- Logo glow animation
- Gradient backgrounds
- Service card hover effects
- Mobile navigation
- Color scheme (cyan/navy/white)

### Assets Structure (2 folders)
✅ `assets/img/` - For logo file (needs your logo PNG)
✅ `assets/anim/` - Reserved for future animations

## ⚠️ Important Notes

1. **Logo File Required:** The site references `assets/img/logisticore-technologies-logo.png` - you MUST add this file before deployment.

2. **Contact Form:** Currently shows an alert. Integrate with Netlify Forms, Formspree, or your own backend before going live.

3. **IT Support Pricing:** Some prices show "Call for quote" - update these with actual rates if you want to display them.

4. **Company Registration Number:** Consider adding your actual Companies House registration number in the footer if desired.

5. **SSL Certificate:** Netlify provides free SSL automatically. Your site will use HTTPS.

6. **Analytics:** Consider adding Google Analytics or similar to track visitor behavior.

## 🎯 Next Steps

1. Add your logo to `assets/img/logisticore-technologies-logo.png`
2. Test all pages locally
3. Deploy to Netlify using Manual or Git method
4. Configure custom domain (logisticoreapp.com)
5. Set up contact form integration
6. Add Google Analytics (optional)
7. Test from mobile devices
8. Share with team for feedback

## 📞 Support

For questions about this website build, contact the development team.

For LogistiCore Technologies business inquiries:
- **Phone:** +44 (0)7577 433804
- **Email:** stuart@logisticoreapp.com
- **Support:** support@logisticoreapp.com

---

**LogistiCore Technologies Ltd** - Built December 2025
