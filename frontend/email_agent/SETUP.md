# Email Agent - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Gmail Setup](#gmail-setup)
3. [OpenAI Setup](#openai-setup)
4. [Installation](#installation)
5. [Running the Application](#running-the-application)
6. [Verification](#verification)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have: 

- **Node.js 16+** - [Download](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js
- **Gmail Account** - With 2-Step Verification enabled
- **OpenAI Account** - With API access and GPT-4 quota
- **Windows/Mac/Linux** - Any OS with Node.js support

---

## Gmail Setup

### Step 1: Enable 2-Step Verification

1. Go to [myaccount.google.com](https://myaccount.google.com)
2. Click **Security** in the left menu
3. Find **2-Step Verification** and click **Get Started**
4. Follow the verification process (you'll verify with your phone)

### Step 2: Create App Password

1. After 2FA is enabled, return to **Security** page
2. Scroll to **App passwords** (only visible if 2FA is enabled)
3. Select:
   - App: **Mail**
   - Device: **Windows Computer** (or your device)
4. Click **Generate**
5. Google will show a 16-character password
6. **Copy this password** - You'll need it in the app

**Example**:
```
Original password: MyPassword123!
App password: asdf qwer zxcv bnm (without spaces: asdfqwerzxcvbnm)
```

---

## OpenAI Setup

### Step 1: Create OpenAI Account

1. Go to [platform.openai.com](https://platform.openai.com)
2. Click **Sign up** if you don't have an account
3. Complete the registration

### Step 2: Create API Key

1. Go to [API Keys](https://platform.openai.com/api-keys)
2. Click **Create new secret key**
3. Name it: `Email Agent` (optional)
4. **Copy the key** - It will only show once!
5. Save it safely (you'll need this)

**Example**:
```
sk-proj-blahblahblahblahblahblahblahblah
```

### Step 3: Check API Billing

1. Go to [Billing Settings](https://platform.openai.com/billing/overview)
2. Verify you have **Credits** or a **Payment Method** set up
3. GPT-4o-mini requests are ~0.00015 USD per request

---

## Installation

### Step 1: Navigate to Backend

```bash
cd "C:\Users\Hp\Desktop\webdev\MERN PROJECTS\contentStudio\backend"
```

### Step 2: Install Backend Dependencies

```bash
npm install
```

Wait for all packages to install (may take a few minutes).

### Step 3: Navigate to Frontend

```bash
cd "..\frontend"
```

### Step 4: Install Frontend Dependencies

```bash
npm install
```

### Step 5: Create Environment File

In `frontend/email_agent/` folder, create `.env` file:

```env
VITE_API_URL=http://localhost:3001
```

---

## Running the Application

### Option A: Using Two Terminals (Recommended)

**Terminal 1 - Backend Server**:
```bash
cd "C:\Users\Hp\Desktop\webdev\MERN PROJECTS\contentStudio\backend"
npm start
```

Expected output:
```
🚀 Thumbnail Studio Backend running on http://localhost:3001
```

**Terminal 2 - Frontend Development Server**:
```bash
cd "C:\Users\Hp\Desktop\webdev\MERN PROJECTS\contentStudio\frontend"
npm run dev
```

Expected output:
```
  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

### Option B: Sequential (Test Only)

```bash
# Start backend
cd backend && npm start &

# In another terminal
cd frontend && npm run dev
```

---

## Verification

### Check Backend is Running

1. Open browser and go to: `http://localhost:3001`
2. Should see connection accepted (or simple response)

### Check Frontend is Running

1. Go to: `http://localhost:5173`
2. You should see the app homepage

### Test Email Agent

1. Navigate to **Email Agent** page
2. Enter:
   - Gmail: `your-email@gmail.com`
   - Password: Your 16-character **app password**
   - API Key: Your OpenAI API key starting with `sk-proj-`
3. Click **Scan Emails**
4. Wait 10-30 seconds for analysis
5. You should see results with deal categories

---

## Troubleshooting

### ❌ "Failed to authenticate to IMAP server"

**Cause**: Wrong password or Gmail not configured

**Solution**:
1. Verify email address is correct (case doesn't matter)
2. Use the **16-character app password**, not your real password
3. Ensure 2-Step Verification is enabled
4. Try regenerating the app password
5. Check no special characters when copying

### ❌ "OpenAI API Error: Invalid API key"

**Cause**: Wrong or expired API key

**Solution**:
1. Double-check API key doesn't have typos
2. Verify it starts with `sk-proj-`
3. Generate a new API key and try again
4. Check key hasn't been revoked in OpenAI dashboard

### ❌ "Port 3001 already in use"

**Cause**: Another process using the port

**Solution**:
```bash
# Kill process on port 3001
netstat -ano | findstr :3001
# Note the PID number
taskkill /PID <PID> /F
```

Or change port in `backend/server.js`:
```javascript
const PORT = process.env.PORT || 3002;  // Changed from 3001
```

### ❌ "npm ERR! Missing packages"

**Cause**: Dependencies not fully installed

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -r node_modules
rm package-lock.json

# Reinstall
npm install
```

### ❌ "No emails analyzed"

**Cause**: Gmail has no recent emails or wrong inbox

**Solution**:
1. Check you have emails from the last 7 days
2. Emails must arrive in INBOX (not Spam/Archives)
3. Check Gmail account directly to verify emails exist
4. Try with a Gmail account that has more emails

### ⚠️ "Analysis is very slow"

**Cause**: Many emails or API rate limiting

**Solution**:
1. The app analyzes ~1 email per second
2. 20 emails = ~20 seconds
3. First run might be slower due to API cold start
4. Check OpenAI dashboard for rate limits

---

## Security Best Practices

1. **Never commit `.env`** - It contains secrets
   ```bash
   # Check .gitignore has .env
   cat .gitignore | grep ".env"
   ```

2. **Don't share credentials** - API keys and passwords are sensitive

3. **Use HTTPS in production** - Current setup is HTTP (local only)

4. **Rotate API keys periodically** - Good security practice

5. **Monitor API usage** - Check OpenAI dashboard for unexpected charges

---

## Next Steps

### Optional Enhancements

1. **Add Email Filtering**
   - Filter by date range
   - Filter by sender domain
   - Filter by keywords

2. **Add Database**
   - Store analyzed deals
   - Track trends over time
   - Create reports

3. **Add Notifications**
   - Discord webhook for good deals
   - Email summaries
   - Real-time alerts

4. **Improve UI**
   - Dark/light theme toggle
   - Export to different formats (JSON, Excel)
   - Advanced filtering interface

---

## Support Resources

- **Gmail Help**: https://support.google.com/mail
- **OpenAI Docs**: https://platform.openai.com/docs
- **Node.js Docs**: https://nodejs.org/en/docs/
- **Express Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/

---

## Success Checklist

- [ ] Node.js 16+ installed and working
- [ ] Gmail account with 2FA enabled
- [ ] App password generated and copied
- [ ] OpenAI account with API key
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] .env file created
- [ ] Backend running on localhost:3001
- [ ] Frontend running on localhost:5173
- [ ] Can navigate to Email Agent page
- [ ] Can scan emails successfully
- [ ] Can download CSV results

---

**You're all set! 🎉 Start analyzing your deals with AI!**
