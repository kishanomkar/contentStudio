import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Deal from '../models/Deal.js';
import Email from '../models/Email.js';

const router = express.Router();

// Get all deals for user
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, category = 'GOOD_DEAL', sort = 'newest' } = req.query;
    const skip = (page - 1) * limit;

    let query = { userId: req.userId };
    if (category && category !== 'ALL') {
      query.category = category;
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'confidence') {
      sortOptions = { confidence: -1 };
    }

    const deals = await Deal.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Deal.countDocuments(query);

    res.json({
      deals,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create deal
router.post('/', authenticate, async (req, res) => {
  try {
    const { emailId, gmailId, from, subject, category, reasoning, confidence, tags, notes } = req.body;

    const deal = new Deal({
      userId: req.userId,
      emailId,
      gmailId,
      from,
      subject,
      category,
      reasoning,
      confidence,
      tags,
      notes
    });

    await deal.save();
    res.status(201).json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update deal
router.patch('/:dealId', authenticate, async (req, res) => {
  try {
    const { notes, isNoteworthy } = req.body;
    const deal = await Deal.findOneAndUpdate(
      { _id: req.params.dealId, userId: req.userId },
      { notes, isNoteworthy },
      { new: true }
    );
    res.json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get deals statistics
router.get('/stats/summary', authenticate, async (req, res) => {
  try {
    const mongoose = await import('mongoose');
    const stats = await Deal.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(req.userId) } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          avgConfidence: { $avg: '$confidence' }
        }
      }
    ]);

    const summary = {
      GOOD_DEAL: 0,
      BAD_DEAL: 0,
      NOT_A_DEAL: 0,
      avgConfidence: 0
    };

    stats.forEach(stat => {
      summary[stat._id] = stat.count;
    });

    const totalDeals = await Deal.countDocuments({ userId: req.userId });
    summary.total = totalDeals;

    res.json(summary);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Export deals as CSV
router.get('/export/csv', authenticate, async (req, res) => {
  try {
    const deals = await Deal.find({ userId: req.userId }).lean();

    const csv = [
      ['From', 'Subject', 'Category', 'Confidence', 'Tags', 'Reasoning', 'Notes', 'Date'].join(',')
    ];

    deals.forEach(deal => {
      const row = [
        deal.from,
        `"${deal.subject}"`,
        deal.category,
        deal.confidence,
        deal.tags.join(';'),
        `"${deal.reasoning}"`,
        `"${deal.notes || ''}"`,
        new Date(deal.createdAt).toISOString()
      ];
      csv.push(row.join(','));
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=deals.csv');
    res.send(csv.join('\n'));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
