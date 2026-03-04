# Email Deal Agent - Configuration Guide

## 🔧 Advanced Configuration

This guide explains how to customize the Email Deal Agent for your specific needs.

---

## Email Fetching Configuration

Edit: `backend/services/imapEmailReader.js`

### Change Number of Emails Analyzed

```javascript
// Default: fetches last 20 emails
const f = imap.fetch(results.slice(-20), { bodies: '' });

// Change to 50:
const f = imap.fetch(results.slice(-50), { bodies: '' });

// Change to 100:
const f = imap.fetch(results.slice(-100), { bodies: '' });
```

### Change Time Range

```javascript
// Default: Last 7 days
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

// Change to 30 days:
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 30);

// Change to 1 day:
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 1);
```

### Change IMAP Folder

```javascript
// Default: INBOX
imap.openBox('INBOX', false, (err, box) => {

// Change to specific folder:
imap.openBox('[Gmail]/All Mail', false, (err, box) => {
// Or: '[Gmail]/Sent Mail', '[Gmail]/Spam', etc.
```

### Change Email Snippet Length

```javascript
// In emailAnalyzer.js - Default: 500 characters
snippet: (parsed.text || parsed.html || '').substring(0, 500),

// Change to 1000:
snippet: (parsed.text || parsed.html || '').substring(0, 1000),
```

---

## AI Analysis Configuration

Edit: `backend/services/emailAnalyzer.js`

### Adjust Analysis Model

```javascript
// Default: gpt-4o-mini (fast and cheap)
model: 'gpt-4o-mini',

// Change to more powerful:
model: 'gpt-4-turbo',

// Change to faster:
model: 'gpt-3.5-turbo',
```

### Adjust Analysis Temperature

```javascript
// Default: 0.3 (consistent, deterministic)
temperature: 0.3,

// Change to 0.5 (balanced):
temperature: 0.5,

// Change to 0.7 (more creative):
temperature: 0.7,

// Range: 0 (deterministic) to 2 (creative)
```

### Customize Deal Categories

```javascript
// Current:
const prompt = `
...
Categories:
- Good Deal
- Bad Deal
- Not a Deal
...`;

// Change to custom categories:
const prompt = `
...
Categories:
- Premium Partnership ($10k+)
- Standard Deal ($5k-10k)
- Micro Deal (<$5k)
- Affiliate-Only
- No Deal
...`;
```

### Customize Analysis Prompt

```javascript
// Edit the entire prompt for different focus:
const prompt = `
You are an expert in identifying tech sponsorship deals...
Focus on: technology, software, SaaS products
Analyze and categorize:
1. Product type
2. License type
3. Value estimation
4. Target audience match
...`;
```

### Add Additional Fields to Extract

```javascript
const prompt = `
...
Respond in JSON format:
{
  "category": "...",
  "dealValue": "...",
  "brand": "...",
  "summary": "...",
  "contractLength": "3 months | 6 months | 1 year",
  "deliverables": "List of content/services required"
}`;

// Then update results processing to include new fields
```

---

## CSV Export Configuration

Edit: `backend/services/csvHandler.js`

### Add More Columns to CSV

```javascript
function generateCSV(deals) {
  // Add more columns:
  let csv = 'Subject,From,Category,Deal Value,Brand,Summary,Contract Length,Status\n';
  
  deals.forEach(deal => {
    csv += `${subject},${from},${category},${dealValue},${brand},${summary},${deal.contractLength},new\n`;
  });
  
  return csv;
}
```

### Change CSV Delimiter

```javascript
// Default: comma (,)
let csv = 'Subject,From,Category\n';

// Change to tab (\t):
let csv = 'Subject\tFrom\tCategory\n';

// Change to semicolon (;):
let csv = 'Subject;From;Category\n';
```

### Change CSV Output Filename

```javascript
// In emailController.js - Default: deals.csv
res.setHeader('Content-Disposition', 'attachment; filename="deals.csv"');

// Change to:
res.setHeader('Content-Disposition', 'attachment; filename="brand-deals-2024.csv"');
```

---

## Backend API Configuration

Edit: `backend/server.js`

### Change Backend Port

```javascript
// Default: 3001
const PORT = process.env.PORT || 3001;

// Change to:
const PORT = process.env.PORT || 3002;

// Or use environment variable:
// WINDOWS: set PORT=3002
// MAC/LINUX: export PORT=3002
```

### Enable Logging

```javascript
// Add to app.js middleware section:
import morgan from 'morgan';
app.use(morgan('dev')); // Logs all API requests
```

### Rate Limiting

```javascript
// Install: npm install express-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

---

## Frontend Configuration

Edit: `frontend/email_agent/.env`

```env
# API URL
VITE_API_URL=http://localhost:3001

# Pre-fill defaults (if you want):
VITE_DEFAULT_EMAIL=your-email@gmail.com

# Request timeout (milliseconds):
VITE_REQUEST_TIMEOUT=30000
```

### Modify UI Colors

Edit: `frontend/src/pages/EmailAgent.jsx`

```jsx
// Change primary button color:
className="bg-gradient-to-r from-blue-600 to-blue-700"
→ className="bg-gradient-to-r from-purple-600 to-purple-700"

// Change good deal color:
if (category === "Good Deal") return "bg-green-600";
→ if (category === "Good Deal") return "bg-emerald-600";
```

### Add Custom Filters

```jsx
// Add filter UI to component:
const [filterCategory, setFilterCategory] = useState('All');

// Filter results:
const filteredDeals = deals.filter(deal => 
  filterCategory === 'All' || deal.category === filterCategory
);
```

---

## Environment Variables

Create/Edit: `backend/.env` (optional)

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-xxx

# Gmail Configuration
GMAIL_MAX_RESULTS=50
GMAIL_TIME_RANGE_DAYS=7

# Logging
DEBUG=true
LOG_LEVEL=info

# Server
PORT=3001
NODE_ENV=development
```

---

## Performance Tuning

### For Large Inboxes (100+ emails)

1. Reduce email count:
   ```javascript
   results.slice(-50)  // Analyze only last 50
   ```

2. Use faster AI model:
   ```javascript
   model: 'gpt-3.5-turbo'  // Faster than gpt-4
   ```

3. Add timeout handling:
   ```javascript
   .timeout(60000)  // 60 second timeout per email
   ```

### For Maximum Accuracy

1. Use more powerful model:
   ```javascript
   model: 'gpt-4-turbo'
   ```

2. Lower temperature:
   ```javascript
   temperature: 0.1  // More deterministic
   ```

3. Add detailed prompt instructions:
   ```javascript
   const prompt = `
     You are an expert deal evaluator.
     Use your knowledge of market rates...
     Consider these factors: [list factors]
   `;
   ```

---

## Database Integration

For persistent storage, add a database:

### MongoDB Example

```javascript
// Install: npm install mongoose
import mongoose from 'mongoose';

// Define schema:
const dealSchema = new mongoose.Schema({
  subject: String,
  from: String,
  category: String,
  dealValue: String,
  brand: String,
  summary: String,
  analyzedAt: { type: Date, default: Date.now }
});

const Deal = mongoose.model('Deal', dealSchema);

// Save results:
deals.forEach(deal => {
  const newDeal = new Deal(deal);
  newDeal.save();
});
```

### Retrieve Historical Data

```javascript
// Get all good deals
const goodDeals = await Deal.find({ category: 'Good Deal' });

// Get deals from last month
const monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);
const recentDeals = await Deal.find({ 
  analyzedAt: { $gte: monthAgo } 
});
```

---

## Slack/Discord Notifications

Add notifications for good deals:

```javascript
// Install: npm install axios

import axios from 'axios';

// After analyzing:
if (deal.category === 'Good Deal') {
  axios.post('YOUR_WEBHOOK_URL', {
    text: `🎯 New Good Deal: ${deal.brand}\n${deal.summary}`
  });
}
```

---

## Custom Analysis Rules

Create custom categorization:

```javascript
function customCategory(email, analysis) {
  // Override AI categorization with custom rules:
  
  if (email.from.includes('@nike.com')) {
    return 'Tier-1-Brand';
  }
  
  if (analysis.dealValue.includes('$') && 
      parseInt(analysis.dealValue) > 5000) {
    return 'Premium-Deal';
  }
  
  return analysis.category;
}
```

---

## Troubleshooting Configuration

### Enable Debug Logging

```javascript
// In emailAnalyzer.js:
console.log('Analyzing:', email.subject);
console.log('Prompt:', prompt);
console.log('Response:', response.choices[0].message.content);
```

### Test Configuration Changes

```bash
# Run test API:
node backend/test-api.js

# Check specific email:
curl -X POST http://localhost:3001/scan-emails \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com","password":"xxx","apiKey":"sk-proj-xxx"}'
```

---

## Recommended Configurations

### For Influencers
- Type: Brand partnerships, sponsorships
- Categories: Tier-1 Brands, Good Deals, Micro Deals
- CSV Fields: Brand, Value, Deliverables Needed

### For Agencies
- Type: Client acquisition, partnerships
- Categories: High-Value, Medium, Low-Value Prospects
- CSV Fields: Company, Contact, Deal Value, Commission

### For Content Creators
- Type: Sponsorship, affiliate, product deals
- Categories: Trending Products, Safe Brands, Unknown
- CSV Fields: Product Type, Payout Terms, Audience Fit

---

**Need More Help?** Check the main [README.md](README.md) for additional info.
