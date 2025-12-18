# GitHub Pages Setup Complete ✅

## What I Did:
1. ✅ Created CNAME file (tells GitHub your custom domain)
2. ✅ Created _config.yml (GitHub Pages configuration)
3. ✅ Committed and pushed to GitHub

## What You Need to Do:

### Step 1: Enable GitHub Pages (2 minutes)
1. Go to: https://github.com/stuartpople/logisticore-website/settings/pages
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
   - Click **Save**
3. Wait 1 minute for GitHub to build
4. Page will show: "Your site is live at https://stuartpople.github.io/logisticore-website/"

### Step 2: Add Custom Domain (1 minute)
1. Still on the same GitHub Pages settings page
2. Under "Custom domain":
   - Enter: **logisticoreapp.com**
   - Click **Save**
3. Wait for DNS check (will show error until you do Step 3)
4. After DNS propagates, check **Enforce HTTPS**

---

## Step 3: GoDaddy DNS Setup

### Login to GoDaddy:
1. Go to: https://account.godaddy.com/
2. Click **My Products**
3. Find **logisticoreapp.com**
4. Click **DNS** (or **Manage DNS**)

### Add/Update These Records:

#### Record 1: CNAME for www
```
Type: CNAME
Name: www
Value: stuartpople.github.io
TTL: 1 Hour (or 600 seconds)
```

#### Record 2-5: A Records for Root Domain
Delete any existing A records for @ and add these 4:

```
Type: A
Name: @
Value: 185.199.108.153
TTL: 1 Hour
```

```
Type: A
Name: @
Value: 185.199.109.153
TTL: 1 Hour
```

```
Type: A
Name: @
Value: 185.199.110.153
TTL: 1 Hour
```

```
Type: A
Name: @
Value: 185.199.111.153
TTL: 1 Hour
```

### Important:
- **Delete** any old A records pointing to Netlify (if any)
- Keep all other records (like email MX records)
- DNS changes take 5-30 minutes to propagate

---

## Step 4: Add Formspree ID to Contact Form

You mentioned you already have a Formspree account. Here's how to connect it:

1. Login to Formspree: https://formspree.io/forms
2. Find your form (or create a new one called "LogistiCore Contact")
3. Copy your Form ID (looks like: `manyabcd` or `xpzyabcd`)

4. Open: `/Users/stuartpople/logisticore/logisticore-site/contact.html`

5. Find line 86 (search for `YOUR_FORM_ID`)

6. Replace:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   
   With:
   ```html
   action="https://formspree.io/f/YOUR_ACTUAL_ID"
   ```

7. Find line 617 and DELETE this line:
   ```javascript
   e.preventDefault();
   ```

8. Save, commit, and push:
   ```bash
   cd /Users/stuartpople/logisticore/logisticore-site
   git add contact.html
   git commit -m "Connect Formspree to contact form"
   git push
   ```

9. Wait 1 minute for GitHub to deploy

10. Test the form at https://logisticoreapp.com/contact.html

---

## Verification Checklist

After 30 minutes (for DNS to propagate):

✅ Visit https://logisticoreapp.com - should show your site
✅ Visit https://www.logisticoreapp.com - should redirect to non-www
✅ HTTPS should work (green padlock in browser)
✅ Contact form should send emails to your Formspree email
✅ Every git push will auto-deploy (no limits, free forever)

---

## Benefits of GitHub Pages:

✅ **Unlimited deployments** (no 300 minute Netlify limit)
✅ **100GB bandwidth/month** (way more than you need)
✅ **Free forever** for public repos
✅ **Auto-deploy** on every git push
✅ **Free SSL/HTTPS**
✅ **Fast global CDN**

---

## Troubleshooting:

**If site doesn't load after 30 minutes:**
1. Check GitHub Pages settings - should show green checkmark
2. Verify DNS records at: https://dnschecker.org (enter logisticoreapp.com)
3. Clear browser cache (Cmd+Shift+R)

**If contact form doesn't send:**
1. Make sure you removed `e.preventDefault();` line
2. Check Formspree dashboard for submissions
3. Verify Formspree email notifications are turned on

**If you see a 404 error:**
1. Wait 2-5 minutes after enabling GitHub Pages
2. Check that CNAME file exists in your repo root
3. Check branch is set to "main" in GitHub Pages settings

---

## Summary:

**You're Now Hosting On:**
- ✅ GitHub Pages (free, unlimited)
- ✅ Custom domain: logisticoreapp.com
- ✅ Auto-deploy from GitHub

**Next Steps:**
1. Enable GitHub Pages (Step 1 above) - **DO THIS NOW**
2. Update GoDaddy DNS (Step 3 above) - **DO THIS NOW**
3. Add your Formspree ID (Step 4 above) - **DO WHEN READY**

---

## Need Help?

If you get stuck on any step, let me know which step number and I'll guide you through it!

Your site will be live at **https://logisticoreapp.com** within 30 minutes of completing steps 1-3! 🚀
