# 📧 Contact Form Email Setup Guide

This guide will help you set up the contact form to send emails directly to **abdulmanankatpar6@gmail.com**.

---

## 🚀 Quick Setup (Recommended: EmailJS)

EmailJS is **FREE**, **secure**, and requires **NO backend server**. Perfect for static websites!

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up"** (it's FREE)
3. Verify your email address

### Step 2: Add Email Service

1. In EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** (recommended)
4. Click **"Connect Account"**
5. Sign in with your Gmail: **abdulmanankatpar6@gmail.com**
6. Allow EmailJS to send emails on your behalf
7. Copy your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template

1. Click **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Timestamp: {{timestamp}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

4. In the **"To email"** field, enter: `abdulmanankatpar6@gmail.com`
5. Click **"Save"**
6. Copy your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key

1. Click on your **Account** (top right)
2. Go to **"API Keys"**
3. Copy your **Public Key** (e.g., `abcdefghijklmnop`)

### Step 5: Update Website Code

Open `index.html` and replace line 11:

```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
```

With:

```javascript
emailjs.init("abcdefghijklmnop"); // Your actual public key
```

Open `script.js` and find the `sendContactEmail` function (around line 250), replace:

```javascript
const serviceID = 'service_nextweb'; // Replace with your EmailJS service ID
const templateID = 'template_contact'; // Replace with your EmailJS template ID
const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
```

With your actual IDs:

```javascript
const serviceID = 'service_abc123'; // Your actual service ID
const templateID = 'template_xyz789'; // Your actual template ID
const publicKey = 'abcdefghijklmnop'; // Your actual public key
```

### Step 6: Test the Form

1. Open your website
2. Fill out the contact form
3. Click "Send Message"
4. Check your email: **abdulmanankatpar6@gmail.com**
5. You should receive the message within seconds!

---

## 🎯 Alternative Method 1: Formspree

If you prefer Formspree (also FREE):

### Setup Steps:

1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for free
3. Create a new form
4. Copy your form endpoint (e.g., `https://formspree.io/f/abc123xyz`)
5. In `script.js`, uncomment the Formspree section and add your endpoint:

```javascript
const formspreeEndpoint = 'https://formspree.io/f/abc123xyz';
```

6. Comment out the EmailJS section
7. Test your form!

---

## 🎯 Alternative Method 2: Web3Forms

Another free option:

### Setup Steps:

1. Go to [Web3Forms.com](https://web3forms.com/)
2. Enter your email: **abdulmanankatpar6@gmail.com**
3. Get your access key
4. In `script.js`, uncomment the Web3Forms section and add your key:

```javascript
const web3formsKey = 'your-access-key-here';
```

5. Comment out the EmailJS section
6. Test your form!

---

## 🔧 Troubleshooting

### Email not received?

1. **Check spam folder** - EmailJS emails might go to spam initially
2. **Verify EmailJS service** - Make sure Gmail is connected
3. **Check template** - Ensure "To email" is set correctly
4. **Check browser console** - Look for error messages (F12)
5. **Verify public key** - Make sure it's copied correctly

### Form shows error message?

1. **Check internet connection**
2. **Verify all IDs are correct** (Service ID, Template ID, Public Key)
3. **Check EmailJS dashboard** - Look for failed sends
4. **Try alternative method** - Use Formspree or Web3Forms

### Still not working?

1. Open browser console (F12)
2. Look for error messages
3. Check EmailJS dashboard for logs
4. Contact EmailJS support (they're very helpful!)

---

## 📋 Email Template Variables

Your contact form sends these variables:

- `{{from_name}}` - Client's name
- `{{from_email}}` - Client's email
- `{{message}}` - Client's message
- `{{timestamp}}` - When form was submitted
- `{{reply_to}}` - Client's email (for easy reply)

You can customize the email template in EmailJS dashboard!

---

## 🔒 Security Features

✅ **No exposed credentials** - Public key is safe to expose
✅ **Rate limiting** - EmailJS prevents spam
✅ **Email validation** - Form validates before sending
✅ **HTTPS required** - Secure transmission
✅ **No backend needed** - No server to hack

---

## 💰 Pricing

### EmailJS Free Tier:
- ✅ 200 emails/month
- ✅ Unlimited forms
- ✅ All features included
- ✅ Perfect for small businesses

### Formspree Free Tier:
- ✅ 50 submissions/month
- ✅ Unlimited forms
- ✅ Email notifications

### Web3Forms Free Tier:
- ✅ 250 submissions/month
- ✅ Unlimited forms
- ✅ No signup required

---

## 📞 Your Contact Information

**Email**: abdulmanankatpar6@gmail.com  
**WhatsApp**: +92 309 7553991

All form submissions will be sent to your Gmail address!

---

## ✅ Quick Checklist

Before going live, make sure:

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Email template created
- [ ] Public key added to `index.html`
- [ ] Service ID, Template ID, and Public Key added to `script.js`
- [ ] Form tested and working
- [ ] Email received in inbox
- [ ] Spam folder checked (if needed)

---

## 🎉 You're All Set!

Once configured, your contact form will:
1. ✅ Validate all inputs
2. ✅ Show loading state
3. ✅ Send email to your Gmail
4. ✅ Show success message
5. ✅ Reset form automatically

Clients can now reach you directly through your website! 🚀
