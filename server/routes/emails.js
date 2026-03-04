import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { fetchEmails, getEmailDetails } from '../services/gmailService.js';
import Email from '../models/Email.js';

const router = express.Router();

// Fetch emails from Gmail
router.get('/fetch', authenticate, async (req, res) => {
  try {
    console.log("User ID:", req.query.userId)
    const { pageToken } = req.query;
    
    const result = await fetchEmails(req.userId, pageToken);
    res.json(result);
  } catch (error) {
    console.log("Fetch error",error);
    res.status(400).json({ error: error.message });
  }
});

// Get email details
router.get('/:emailId', authenticate, async (req, res) => {
  try {
    const email = await getEmailDetails(req.userId, req.params.emailId);
    res.json(email);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all emails for user
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const skip = (page - 1) * limit;
    
    let query = { userId: req.userId, isArchived: false };
    if (category && category !== 'ALL') {
      query.dealCategory = category;
    }

    const emails = await Email.find(query)
      .sort({ receivedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Email.countDocuments(query);

    res.json({
      emails,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update email analysis
router.patch('/:emailId/analysis', authenticate, async (req, res) => {
  try {
    const { isDeal, dealCategory, dealAnalysis } = req.body;
    const email = await Email.findOneAndUpdate(
      { _id: req.params.emailId, userId: req.userId },
      {
        isDeal,
        dealCategory,
        dealAnalysis,
        isAnalyzed: true
      },
      { new: true }
    );
    res.json(email);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Archive email
router.patch('/:emailId/archive', authenticate, async (req, res) => {
  try {
    const email = await Email.findOneAndUpdate(
      { _id: req.params.emailId, userId: req.userId },
      { isArchived: true },
      { new: true }
    );
    res.json(email);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
