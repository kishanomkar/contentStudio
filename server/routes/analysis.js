import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { analyzeEmail } from '../services/openaiService.js';
import Email from '../models/Email.js';
import Deal from '../models/Deal.js';

const router = express.Router();

// Analyze a single email
router.post('/email/:emailId', authenticate, async (req, res) => {
  try {
    const email = await Email.findOne({ _id: req.params.emailId, userId: req.userId });
    
    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }

    // Analyze the email
    const analysis = await analyzeEmail(email.plainText || email.body);

    // Update email with analysis
    email.isDeal = analysis.isDeal;
    email.dealCategory = analysis.category;
    email.dealAnalysis = {
      reasoning: analysis.reasoning,
      confidence: analysis.confidence,
      tags: analysis.tags
    };
    email.isAnalyzed = true;
    await email.save();

    // Create deal record if it's a deal
    if (analysis.isDeal && analysis.category !== 'NOT_A_DEAL') {
      const deal = new Deal({
        userId: req.userId,
        emailId: email._id,
        gmailId: email.gmailId,
        from: email.from,
        subject: email.subject,
        category: analysis.category,
        reasoning: analysis.reasoning,
        confidence: analysis.confidence,
        tags: analysis.tags
      });
      await deal.save();
    }

    res.json({
      email,
      analysis
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Analyze multiple unanalyzed emails
router.post('/batch', authenticate, async (req, res) => {
  try {
    const unanalyzedEmails = await Email.find({
      userId: req.userId,
      isAnalyzed: false,
      isArchived: false
    }).limit(5);

    if (unanalyzedEmails.length === 0) {
      return res.json({ message: 'No unanalyzed emails', analyzed: 0 });
    }

    let analyzedCount = 0;

    for (const email of unanalyzedEmails) {
      try {
        const analysis = await analyzeEmail(email.plainText || email.body);

        email.isDeal = analysis.isDeal;
        email.dealCategory = analysis.category;
        email.dealAnalysis = {
          reasoning: analysis.reasoning,
          confidence: analysis.confidence,
          tags: analysis.tags
        };
        email.isAnalyzed = true;
        await email.save();

        if (analysis.isDeal && analysis.category !== 'NOT_A_DEAL') {
          const deal = new Deal({
            userId: req.userId,
            emailId: email._id,
            gmailId: email.gmailId,
            from: email.from,
            subject: email.subject,
            category: analysis.category,
            reasoning: analysis.reasoning,
            confidence: analysis.confidence,
            tags: analysis.tags
          });
          await deal.save();
        }

        analyzedCount++;
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error(`Failed to analyze email:`, error);
      }
    }

    res.json({
      message: `Analyzed ${analyzedCount} emails`,
      analyzed: analyzedCount,
      remaining: Math.max(0, (await Email.countDocuments({
        userId: req.userId,
        isAnalyzed: false,
        isArchived: false
      })) - analyzedCount)
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
