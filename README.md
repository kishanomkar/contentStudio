# ContentStudio / Email Deal Agent

An AI-powered email analysis system that connects to Gmail, fetches emails, and uses OpenAI's GPT models to analyze and categorize sponsorship and brand deals. 

The application provides a seamless way for creators and influencers to manage their incoming brand deals, automatically filtering out the noise and highlighting valuable opportunities.

## ✨ Features
- **Gmail Integration:** Securely fetches emails from your inbox using Google APIs and OAuth 2.0.
- **AI-Powered Analysis:** Leverages the OpenAI API to analyze email content, determine if an email is a legitimate sponsorship or brand deal, and extract key information (e.g., brand name, deal value, and summary).
- **Smart Categorization:** Classifies emails into intuitive categories (e.g., Good Deal, Bad Deal, Not a Deal).
- **Analytics Dashboard:** A modern, responsive React frontend featuring data visualization with Recharts to track deal metrics over time.
- **Export Capabilities:** Download your categorized deals and analysis as a CSV file for external spreadsheet management.

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Authentication:** `@react-oauth/google`
- **Charts:** Recharts
- **HTTP Client:** Axios

### Backend
- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ORM
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **External Integrations:** 
  - `googleapis` & `google-auth-library` for Gmail integration
  - `openai` for AI analysis

## 📂 Project Structure

```text
contentstudio/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context (Auth, App state)
│   │   ├── pages/          # Application pages (Dashboard, Login, Home, etc.)
│   │   └── services/       # API integration services (Axios configs)
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── server/                 # Node.js backend application
    ├── config/             # Configuration files (Database setup)
    ├── controllers/        # Request handlers
    ├── middleware/         # Express middlewares (Authentication, Error handling)
    ├── models/             # Mongoose schemas (User, Email, Deal)
    ├── routes/             # API route definitions (auth, emails, deals, analysis)
    ├── services/           # External API services (Gmail API, OpenAI)
    ├── index.js            # Express app entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) instance (local or Atlas)
- Google Cloud Project with **Gmail API** enabled and OAuth credentials configured
- OpenAI API Key

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd contentstudio
   ```

2. **Backend Setup:**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory and configure the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FRONTEND_URL=http://localhost:5173
   ```
   Start the backend server (runs on port 5000 by default):
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   Open a new terminal window:
   ```bash
   cd client
   npm install
   ```
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Access the Application:**
   Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

## 🔒 Security
- **Data Privacy:** Uses secure Google OAuth 2.0 for Gmail access without storing raw application passwords.
- **Environment Variables:** Sensitive keys and secrets are loaded via `.env` files and never committed to version control.
- **JWT Authentication:** Stateful session management is replaced with secure JWT-based authentication for backend API routes.