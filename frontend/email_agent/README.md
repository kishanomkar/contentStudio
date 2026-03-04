# 🎯 Email Deal Agent

An AI-powered email analyzer that automatically scans your Gmail inbox for sponsorship and brand deals, categorizes them as good or bad deals, and exports analyzed results to CSV.

## Features

- **📧 Gmail Integration**: Connect your Gmail account and sync emails
- **🤖 AI Analysis**: Uses OpenAI GPT-4 to intelligently identify and categorize deals
- **📊 Deal Categorization**:
  - **Good Deal**: Legitimate, valuable sponsorship opportunities
  - **Bad Deal**: Low-value or suspicious offers
  - **Not a Deal**: Regular emails not related to sponsorships
- **💼 Deal Summary**: Automatic extraction of:
  - Brand/Sponsor name
  - Deal value estimation
  - One-line summary of the offer
- **📥 CSV Export**: Download all analyzed deals as a CSV file
- **🎨 Beautiful UI**: Modern React + Tailwind CSS interface

## Setup Instructions

### Prerequisites

- Node.js 16+ installed
- Gmail account with 2FA enabled
- OpenAI API key (GPT-4 access)

### 1. Generate Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification if not already enabled
3. Go to App Passwords
4. Select "Mail" and "Windows Computer"
5. Google will generate a 16-character password
6. Copy this password (you'll need it later)

**Important**: Use this app password, NOT your regular Gmail password!

### 2. Get OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy and save it securely
4. Ensure you have access to GPT-4 or GPT-4o-mini models

### 3. Environment Setup

Create a `.env` file in the `frontend/email_agent/` directory:

```env
VITE_API_URL=http://localhost:3001
```

### 4. Install Dependencies

**Backend**:
```bash
cd backend
npm install
```

**Frontend**:
```bash
cd frontend
npm install
```

### 5. Run the Application

**Terminal 1 - Start Backend**:
```bash
cd backend
npm start
# Or for development with auto-reload:
npx nodemon server.js
```

**Terminal 2 - Start Frontend**:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default)

## How to Use

1. **Open the Email Agent** from the navigation menu
2. **Enter your Gmail address**
3. **Enter your Gmail App Password** (the one generated earlier)
4. **Enter your OpenAI API Key**
5. **Click "Scan Emails"** to analyze your inbox
6. **Review the results**:
   - Summary statistics (Good/Bad/Ignored deals)
   - Detailed table with each deal's analysis
7. **Download CSV** to export the results for further analysis

## CSV Export Format

The exported CSV includes:
```
Subject,From,Category,Deal Value,Brand,Summary
"Email Subject","sender@domain.com","Good Deal","$5000-10000","Nike","Athletic sponsorship opportunity"
```

## API Endpoints

### POST `/scan-emails`
Analyzes emails from Gmail

**Request**:
```json
{
  "email": "your-email@gmail.com",
  "password": "app-specific-password",
  "apiKey": "sk-proj-xxx"
}
```

**Response**:
```json
{
  "deals": [
    {
      "subject": "Sponsorship opportunity",
      "from": "brand@company.com",
      "category": "Good Deal",
      "dealValue": "$5000",
      "brand": "Nike",
      "summary": "Athletic sponsorship for fitness content"
    }
  ],
  "summary": {
    "good": 3,
    "bad": 2,
    "ignore": 15
  }
}
```

### GET `/download-csv`
Downloads the previously analyzed deals as CSV

## Security Considerations

⚠️ **Important Security Notice**:

1. **Never commit `.env` file** - It's in `.gitignore`
2. **Use App Passwords** - Never share your real Gmail password
3. **Secure API Keys** - Keep OpenAI keys confidential
4. **HTTPS in Production** - Use HTTPS for production deployments
5. **Server-side Validation** - Backend validates all inputs

## Troubleshooting

### "Failed to authenticate Gmail"
- Verify Gmail address and app password are correct
- Check 2FA is enabled on Google Account
- Ensure app password was generated correctly

### "OpenAI API Error"
- Verify API key is correct
- Check API key has balance/credits
- Ensure you have GPT-4 access

### "No emails found"
- Gmail might have no recent emails
- Check inbox for any emails from the last 7 days
- Verify Gmail account is configured correctly

### Port Already in Use
- Backend default: 3001
- Frontend default: 5173
- Change ports in `.env` if needed

## Tech Stack

**Backend**:
- Express.js - REST API
- OpenAI API - AI analysis
- IMAP (imap-simple) - Gmail integration
- mailparser - Email parsing

**Frontend**:
- React 18
- Vite
- Tailwind CSS
- Axios/Fetch API

## Future Enhancements

- [ ] OAuth 2.0 Google Sign-In (instead of password)
- [ ] Multiple email account support
- [ ] Custom deal categorization rules
- [ ] Email filtering by date range
- [ ] Discord/Slack notifications
- [ ] Database storage for historical analysis
- [ ] Mobile app version
- [ ] Deal value negotiation tracker

## License

MIT

## Support

For issues or questions, please check:
1. Ensure all credentials are correct
2. Check that backend is running on port 3001
3. Verify OpenAI API key has credits
4. Check Gmail app password is set up correctly

---

**Made with ❤️ for content creators and influencers**
