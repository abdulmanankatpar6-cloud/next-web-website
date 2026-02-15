# Deployment Design Document

## Overview
Detailed deployment architecture and step-by-step procedures for deploying Next Web website to production with Netlify (recommended), including domain configuration, SSL setup, and monitoring.

---

## 1. Deployment Architecture

### 1.1 Recommended Stack
```
┌─────────────────────────────────────────┐
│         User's Browser                   │
│  (https://nextweb.com)                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         Cloudflare DNS                   │
│  (Domain Name Resolution)               │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         Netlify CDN                      │
│  (Global Edge Network)                  │
│  - HTTPS/SSL                            │
│  - Caching                              │
│  - Compression                          │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│         Static Files                     │
│  - HTML, CSS, JavaScript                │
│  - Images, Fonts                        │
│  - SVG Assets                           │
└─────────────────────────────────────────┘
```

### 1.2 Data Flow
```
1. User enters URL → DNS lookup
2. DNS returns Netlify IP
3. Request hits Netlify CDN edge server
4. CDN serves cached content (if available)
5. Or fetches from origin and caches
6. Response sent to user with HTTPS
```

---

## 2. Netlify Deployment Procedure

### 2.1 Account Setup

**Step 1: Create Netlify Account**
1. Go to https://www.netlify.com/
2. Click "Sign up"
3. Choose "Sign up with GitHub" (recommended)
4. Authorize Netlify to access GitHub
5. Complete profile setup

**Step 2: Connect Repository**
1. Click "Add new site" → "Import an existing project"
2. Choose "GitHub"
3. Select your repository
4. Grant repository access

### 2.2 Build Configuration

**Build Settings:**
```yaml
# netlify.toml
[build]
  publish = "."
  command = "echo 'No build needed for static site'"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.jpg"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.png"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 2.3 Environment Variables

**Add in Netlify Dashboard:**
1. Go to Site Settings
2. Navigate to Build & Deploy → Environment
3. Click "Add variable"

**Variables to Add:**
```
WEB3FORMS_API_KEY = your_actual_key_here
SITE_URL = https://nextweb.com
CONTACT_EMAIL = abdulmanankatpar6@gmail.com
WHATSAPP_NUMBER = 923097553991
```

### 2.4 Deploy Site

**Initial Deployment:**
1. Click "Deploy site"
2. Wait for build to complete (1-2 minutes)
3. Site deployed to random subdomain (e.g., random-name-123.netlify.app)
4. Click on URL to verify deployment

---

## 3. Custom Domain Configuration

### 3.1 Domain Purchase

**Recommended Registrar: Namecheap**

**Steps:**
1. Go to https://www.namecheap.com/
2. Search for your desired domain
3. Add to cart and checkout
4. Enable WhoisGuard (free privacy protection)
5. Complete purchase

**Alternative Registrars:**
- Google Domains: https://domains.google/
- Cloudflare: https://www.cloudflare.com/products/registrar/
- GoDaddy: https://www.godaddy.com/

### 3.2 Connect Domain to Netlify

**In Netlify Dashboard:**
1. Go to Site Settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., nextweb.com)
4. Click "Verify"
5. Netlify provides DNS records

**DNS Records Provided:**
```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME  
Name: www
Value: your-site.netlify.app
```

### 3.3 Configure DNS at Registrar

**For Namecheap:**
1. Log in to Namecheap
2. Go to Domain List
3. Click "Manage" next to your domain
4. Go to "Advanced DNS" tab
5. Add A Record:
   - Type: A Record
   - Host: @
   - Value: 75.2.60.5
   - TTL: Automatic
6. Add CNAME Record:
   - Type: CNAME Record
   - Host: www
   - Value: your-site.netlify.app
   - TTL: Automatic
7. Save changes

**For Cloudflare (Recommended for Speed):**
1. Add site to Cloudflare
2. Change nameservers at registrar
3. Add DNS records in Cloudflare
4. Enable proxy (orange cloud)
5. Configure SSL/TLS to "Full"

### 3.4 Verify Domain

**In Netlify:**
1. Wait for DNS propagation (1-24 hours)
2. Check status in Domain management
3. When verified, green checkmark appears
4. HTTPS automatically provisioned

**Check DNS Propagation:**
- https://dnschecker.org/
- Enter your domain
- Verify A record points to Netlify IP

---

## 4. SSL/HTTPS Configuration

### 4.1 Automatic SSL (Netlify)

**Netlify Auto-SSL:**
1. After domain verified, SSL auto-provisions
2. Let's Encrypt certificate issued
3. Takes 1-5 minutes
4. Auto-renews every 90 days

**Verify HTTPS:**
1. Visit https://yourdomain.com
2. Check for green padlock in browser
3. Click padlock → Certificate valid
4. No mixed content warnings

### 4.2 Force HTTPS

**In Netlify Dashboard:**
1. Go to Domain management
2. Scroll to HTTPS section
3. Enable "Force HTTPS"
4. All HTTP requests redirect to HTTPS

### 4.3 HSTS Configuration

**Add to netlify.toml:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
```

---

## 5. Build Optimization

### 5.1 Pre-Deployment Optimization

**HTML Optimization:**
```bash
# Remove comments and whitespace
# Use online tool: https://www.willpeavy.com/tools/minifier/
```

**CSS Optimization:**
```bash
# Minify CSS
# Use: https://cssminifier.com/
```

**JavaScript Optimization:**
```bash
# Minify JavaScript
# Use: https://javascript-minifier.com/
```

**Image Optimization:**
```bash
# Compress images
# Use: https://tinypng.com/
# Or: https://squoosh.app/
```

### 5.2 Netlify Build Plugins

**Install Plugins:**
1. Go to Site Settings → Build & deploy → Build plugins
2. Search and install:
   - "Minify HTML, CSS, JS"
   - "Optimize Images"
   - "Lighthouse"

---

## 6. Monitoring Setup

### 6.1 Uptime Monitoring (UptimeRobot)

**Setup Steps:**
1. Go to https://uptimerobot.com/
2. Create free account
3. Click "Add New Monitor"
4. Configure:
   - Monitor Type: HTTP(s)
   - Friendly Name: Next Web
   - URL: https://yourdomain.com
   - Monitoring Interval: 5 minutes
5. Add Alert Contacts (email)
6. Save monitor

**Email Alerts:**
- Down alert: Immediate
- Up alert: When back online
- Weekly summary: Optional

### 6.2 Google Analytics

**Setup Steps:**
1. Go to https://analytics.google.com/
2. Create account
3. Create GA4 property
4. Get Measurement ID (G-XXXXXXXXXX)
5. Add tracking code to index.html

**Tracking Code:**
```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 6.3 Netlify Analytics (Optional - Paid)

**Features:**
- Server-side analytics (no client-side tracking)
- No cookie consent needed
- Ad-blocker proof
- $9/month per site

**Enable:**
1. Go to Site Settings → Analytics
2. Click "Enable Analytics"
3. Billing information required

---

## 7. SEO Configuration

### 7.1 Google Search Console

**Setup Steps:**
1. Go to https://search.google.com/search-console/
2. Add property (your domain)
3. Verify ownership:
   - DNS verification (recommended)
   - Or HTML file upload
4. Submit sitemap

### 7.2 Sitemap Creation

**Create sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2024-02-16</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

**Submit to Google:**
1. In Search Console
2. Go to Sitemaps
3. Enter: https://yourdomain.com/sitemap.xml
4. Click Submit

### 7.3 Robots.txt

**Create robots.txt:**
```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

---

## 8. Continuous Deployment Workflow

### 8.1 Git Workflow

**Branch Strategy:**
```
main (production)
  ↑
develop (staging)
  ↑
feature/new-feature (preview)
```

**Deployment Flow:**
1. Create feature branch
2. Make changes
3. Push to GitHub
4. Netlify creates preview deployment
5. Test preview URL
6. Merge to develop (staging)
7. Test staging
8. Merge to main (production)
9. Auto-deploy to live site

### 8.2 Preview Deployments

**Automatic Preview:**
- Every pull request gets preview URL
- Test changes before merging
- Share with team for review
- No impact on production

**Access Preview:**
1. Go to Deploys tab in Netlify
2. Find deploy preview
3. Click URL to view

---

## 9. Rollback Procedure

### 9.1 Instant Rollback

**If Something Breaks:**
1. Go to Netlify Dashboard
2. Navigate to Deploys
3. Find last working deploy
4. Click "Publish deploy"
5. Site reverts instantly

**No Downtime:**
- Rollback takes seconds
- Previous version still cached
- Users see old version immediately

---

## 10. Performance Optimization

### 10.1 CDN Configuration

**Netlify CDN:**
- Automatic global distribution
- 100+ edge locations
- Automatic caching
- Brotli compression
- HTTP/2 enabled

**Cache Headers:**
```toml
[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### 10.2 Asset Optimization

**Lazy Loading:**
```html
<img src="image.jpg" loading="lazy" alt="Description">
```

**Font Optimization:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## 11. Security Configuration

### 11.1 Security Headers

**Add to netlify.toml:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com;"
```

### 11.2 Environment Security

**Best Practices:**
- Never commit API keys to Git
- Use environment variables
- Rotate keys regularly
- Use different keys for dev/prod
- Enable 2FA on accounts

---

## 12. Backup Strategy

### 12.1 Git Backup

**Automatic Backup:**
- Code in GitHub (primary)
- Netlify has copy (secondary)
- Local copy (tertiary)

**Best Practices:**
- Commit frequently
- Tag releases
- Keep branches organized
- Document changes

### 12.2 Content Backup

**Manual Backup:**
- Download site files monthly
- Export analytics data
- Save configuration files
- Document custom settings

---

## Status
**Ready for Implementation**  
**Last Updated:** 2024-02-16  
**Version:** 1.0
