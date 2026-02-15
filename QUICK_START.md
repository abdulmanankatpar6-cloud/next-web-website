# 🚀 Quick Start - Contact Form Setup

## Your Information
- **Email**: abdulmanankatpar6@gmail.com
- **WhatsApp**: +92 309 7553991

---

## ⚡ 5-Minute Setup (EmailJS)

### 1. Create Account (2 minutes)
1. Go to: https://www.emailjs.com/
2. Click "Sign Up" - It's FREE!
3. Verify your email

### 2. Connect Gmail (1 minute)
1. Dashboard → "Email Services" → "Add New Service"
2. Select "Gmail"
3. Sign in with: **abdulmanankatpar6@gmail.com**
4. Allow access
5. **Copy Service ID** (looks like: `service_abc123`)

### 3. Create Template (1 minute)
1. Dashboard → "Email Templates" → "Create New Template"
2. **Template Name**: Contact Form
3. **Subject**: New message from {{from_name}}
4. **Content**:
```
From: {{from_name}}
Email: {{from_email}}
Time: {{timestamp}}

Message:
{{message}}
```
5. **To Email**: abdulmanankatpar6@gmail.com
6. **Copy Template ID** (looks like: `template_xyz789`)

### 4. Get Public Key (30 seconds)
1. Click your name (top right) → "Account"
2. Go to "API Keys" tab
3. **Copy Public Key** (looks like: `abcd1234efgh5678`)

### 5. Update Code (30 seconds)

**File: index.html** (Line 11)
```javascript
emailjs.init("abcd1234efgh5678"); // Paste your public key here
```

**File: script.js** (Around line 800)
```javascript
const serviceID = 'service_abc123'; // Paste your service ID
const templateID = 'template_xyz789'; // Paste your template ID
const publicKey = 'abcd1234efgh5678'; // Paste your public key
```

### 6. Test! (30 seconds)
1. Open your website
2. Fill the contact form
3. Click "Send Message"
4. Check **abdulmanankatpar6@gmail.com** inbox!

---

## ✅ Done!

Your contact form now sends emails directly to your Gmail!

**Free Tier**: 200 emails/month (perfect for most websites)

---

## 🆘 Need Help?

### Email not received?
- Check spam folder
- Wait 1-2 minutes
- Check EmailJS dashboard for errors

### Form shows error?
- Check browser console (F12)
- Verify all IDs are correct
- Make sure you're online

### Still stuck?
Contact me via WhatsApp: +92 309 7553991

---

## 📱 Alternative: Use WhatsApp Only

Don't want to set up email? No problem!

The form already has a "Contact via WhatsApp" button that works instantly!

Just keep using that - it's already configured with your number.

---

## 🎉 You're Ready!

Your website is now fully functional and ready to receive client messages!
