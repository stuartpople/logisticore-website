# 🚀 Netlify Deployment Checklist

## Pre-Deploy Checklist

### Files & Assets
- [ ] Logo file added: `assets/img/logisticore-technologies-logo.png`
- [ ] Logo is PNG with transparent background
- [ ] Logo is high resolution (at least 200px height)

### Testing - All Pages Load
- [ ] `index.html` - Homepage works
- [ ] `it-support.html` - IT Support page works
- [ ] `logisticore-saas.html` - SaaS page works
- [ ] `website-creation.html` - Website creation page works
- [ ] `pricing.html` - Pricing page works
- [ ] `contact.html` - Contact page works

### Navigation Testing
- [ ] Header navigation works on all pages
- [ ] All internal links work (Home, IT Support, SaaS, etc.)
- [ ] Login button links to https://app.logisticoreapp.com
- [ ] Footer appears on all pages
- [ ] Mobile menu toggle works (test at 768px width)

### Content Verification
- [ ] All contact info correct (+44 (0)7577 433804)
- [ ] Email addresses correct (stuart@, support@)
- [ ] Company name: "LogistiCore Technologies Ltd"
- [ ] Copyright year: 2025
- [ ] Pricing information accurate (£500+, £750, £175-£200)

### Visual/Design Check
- [ ] Logo displays on all pages
- [ ] Logo glow animation works
- [ ] Service cards display correctly
- [ ] Buttons have hover effects
- [ ] Color scheme consistent (cyan/navy/white)
- [ ] No broken images or missing assets

### Responsive Testing
- [ ] Mobile (375px width) - iPhone SE
- [ ] Tablet (768px width) - iPad
- [ ] Desktop (1024px width) - Standard laptop
- [ ] Large desktop (1440px width)
- [ ] Mobile menu appears on small screens
- [ ] No horizontal scrolling on mobile

### Browser Testing (if possible)
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (macOS/iOS)

---

## Deploy to Netlify - Method 1: Drag & Drop

### Step 1: Prepare Files
```bash
cd logisticore-site

# Verify logo exists
ls -lh assets/img/logisticore-technologies-logo.png

# Create deployment zip (contents only, not folder)
zip -r ../logisticore-site-deploy.zip *

# Verify zip contents
unzip -l ../logisticore-site-deploy.zip | head -20
```

### Step 2: Deploy
1. Go to [app.netlify.com](https://app.netlify.com)
2. Log in with your Netlify account
3. Click "Add new site" → "Deploy manually"
4. Drag `logisticore-site-deploy.zip` into the drop zone
5. Wait 30-60 seconds for deployment
6. Click the generated URL to view live site

### Step 3: Configure Custom Domain
1. In Netlify dashboard, click your site
2. Go to "Site settings" → "Domain management"
3. Click "Add custom domain"
4. Enter: `logisticoreapp.com`
5. Click "Verify"
6. Update DNS records at your domain registrar:
   - Add CNAME record: `www` → `[your-site].netlify.app`
   - Add A record for apex domain (Netlify provides IP)
7. Wait for DNS propagation (5 minutes to 24 hours)
8. Netlify will automatically provision SSL certificate

---

## Deploy to Netlify - Method 2: Git (Recommended)

### Step 1: Create Git Repository
```bash
cd logisticore-site

# Initialize git
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial LogistiCore Technologies website"
```

### Step 2: Push to GitHub
```bash
# Create repository on GitHub first at:
# https://github.com/new
# Name it: logisticore-site

# Add GitHub remote
git remote add origin https://github.com/stuartpople/logisticore-site.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Connect to Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "GitHub"
4. Authorize Netlify to access your repos
5. Select `stuartpople/logisticore-site`
6. Configure build settings:
   - **Branch:** `main`
   - **Build command:** (leave empty)
   - **Publish directory:** `/` (root)
7. Click "Deploy site"
8. Wait for deployment (30-60 seconds)

### Step 4: Configure Custom Domain
(Same as Method 1, Step 3 above)

### Step 5: Future Updates
```bash
# Make changes to files
nano index.html  # or use any editor

# Commit changes
git add .
git commit -m "Update homepage content"

# Push to GitHub
git push

# Netlify automatically detects push and redeploys in 30-60 seconds
```

---

## Post-Deploy Checklist

### Verify Live Site
- [ ] Site loads at Netlify URL (e.g., `https://your-site.netlify.app`)
- [ ] Custom domain works (https://logisticoreapp.com)
- [ ] HTTPS/SSL certificate active (padlock icon in browser)
- [ ] All pages accessible via navigation
- [ ] Logo loads correctly
- [ ] No console errors (F12 → Console tab)

### Test Key Functionality
- [ ] Click all navigation links
- [ ] Test Login button → goes to app.logisticoreapp.com
- [ ] Click phone number → opens phone dialer
- [ ] Click email addresses → opens email client
- [ ] Submit contact form (test that it shows alert or submits)
- [ ] Test mobile menu on phone

### Performance Check
- [ ] Homepage loads quickly (under 2 seconds)
- [ ] No broken images
- [ ] No 404 errors
- [ ] Logo animation works smoothly

### SEO & Meta
- [ ] Page titles display in browser tabs
- [ ] Meta descriptions set (View Source → check `<meta name="description">`)
- [ ] Open Graph tags present (for social media sharing)

---

## Contact Form Activation (Post-Deploy)

### Option 1: Netlify Forms
1. Edit `contact.html`
2. Add `netlify` attribute to form:
   ```html
   <form netlify name="contact" method="POST">
   ```
3. Commit and push changes
4. Form submissions will appear in Netlify dashboard

### Option 2: Formspree
1. Sign up at [formspree.io](https://formspree.io)
2. Create new form, get endpoint ID
3. Edit `contact.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
4. Commit and push changes

---

## Common Issues & Solutions

### Logo Not Displaying
- Check file path: `assets/img/logisticore-technologies-logo.png`
- Ensure logo file was included in deployment
- Check browser console for 404 errors
- Verify capitalization matches exactly

### Mobile Menu Not Working
- Check JavaScript loaded (view page source)
- Test in different browsers
- Clear browser cache

### Styles Not Applied
- Check `styles.css` is in root folder
- Verify `<link rel="stylesheet" href="styles.css">` in all HTML files
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)

### Custom Domain Not Working
- Verify DNS records at domain registrar
- Wait up to 24 hours for DNS propagation
- Use [DNS Checker](https://dnschecker.org) to verify
- Ensure CNAME points to Netlify subdomain

### Contact Form Not Working
- Remember: default form shows alert only
- Integrate with Netlify Forms or Formspree
- Check browser console for errors

---

## Maintenance & Updates

### Regular Updates
- Review content quarterly
- Update copyright year annually
- Keep pricing current
- Add new services/features as business grows
- Monitor analytics (if added)

### Git Workflow for Updates
```bash
# Pull latest changes
git pull

# Make edits
# ... edit files ...

# Commit and push
git add .
git commit -m "Describe your changes"
git push

# Netlify auto-deploys
```

---

## Support Contacts

**Website Technical Issues:**
- Check README.md for troubleshooting
- Review Netlify deployment logs
- Contact: stuart@logisticoreapp.com

**Business Inquiries:**
- Phone: +44 (0)7577 433804
- Email: stuart@logisticoreapp.com

---

## Summary: What You Need to Do

1. ✅ **Add logo** to `assets/img/logisticore-technologies-logo.png`
2. ✅ **Test locally** by opening `index.html` in browser
3. ✅ **Choose deploy method**: Drag & Drop (quick) or Git (long-term)
4. ✅ **Deploy to Netlify** following steps above
5. ✅ **Configure custom domain** (logisticoreapp.com)
6. ✅ **Activate contact form** (Netlify Forms or Formspree)
7. ✅ **Test live site** on desktop and mobile
8. ✅ **Go live!** 🎉

**Estimated Time:** 15-30 minutes (excluding DNS propagation wait)

---

Good luck with your deployment! 🚀
