import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import emailRoutes from './routes/emails.js';
import dealRoutes from './routes/deals.js';
import analysisRoutes from './routes/analysis.js';
import { authenticate } from './middleware/auth.js';

dotenv.config();
 
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/emails', emailRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/analysis', analysisRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.get("/test-auth", authenticate, (req, res) => {
  res.json({
    message: "Auth working",
    userId: req.userId
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
