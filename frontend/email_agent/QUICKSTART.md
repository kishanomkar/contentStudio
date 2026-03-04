# 🚀 Quick Start - Email Deal Agent

Get your email deal analyzer running in 5 minutes!

## Prerequisites (2 minutes)

1. **Gmail**: Enable 2-Step Verification
   - Go to [security.google.com](https://security.google.com)
   - Add phone verification

2. **Gmail App Password**: Generate one
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select Mail + Windows Computer
   - Copy the 16-character password

3. **OpenAI API Key**
   - Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
   - Create a new key
   - Copy it (starts with `sk-proj-`)

## Setup (1 minute)

### Backend
```bash
cd backend
npm install
npm start
```
✅ Should show: `🚀 Thumbnail Studio Backend running on http://localhost:3001`

### Frontend (New Terminal)
```bash
cd frontend
npm install
npm run dev
```
✅ Should show: `➜ Local: http://localhost:5173/`

## Use (30 seconds)

1. Open browser → `http://localhost:5173`
2. Navigate to **Email Agent**
3. Enter:
   - Gmail: `your-email@gmail.com`
   - Password: `your-16-char-app-password`
   - API Key: `sk-proj-your-key`
4. Click **Scan Emails**
5. Wait 10-30 seconds
6. Download CSV results

## ⚠️ Common Issues

| Problem | Solution |
|---------|----------|
| "Authentication failed" | Use app password, not real password |
| "API key invalid" | Verify key starts with `sk-proj-` |
| "Port 3001 in use" | Change port in `backend/server.js` |
| "No emails found" | Gmail needs emails from last 7 days |

## 📚 More Help

- Full setup: See `SETUP.md`
- Documentation: See `README.md`
- Backend running? Test: `node backend/test-api.js`

## ✨ You're Ready!

That's it! Your AI email analyzer is live. 🎉

---

**Next**: Check [README.md](README.md) for features and advanced usage.
