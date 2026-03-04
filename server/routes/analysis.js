import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { analyzeEmail } from '../services/openaiService.js';
import Email from '../models/Email.js';
import Deal from '../models/Deal.js';

const router = express.Router();


// Analyze ONE email
router.post('/email/:emailId', authenticate, async (req, res) => {
  try {

    console.log("Analyzing email:", req.params.emailId);
    console.log("User:", req.userId);

    const email = await Email.findOne({
      _id: req.params.emailId,
      userId: req.userId
    });

    if (!email) {
      return res.status(404).json({
        error: 'Email not found'
      });
    }

    console.log("Email Found:", email.subject);

    const content = email.plainText || email.body;

    if (!content) {
      return res.status(400).json({
        error: "Email has no content"
      });
    }

    // Analyze
    const analysis = await analyzeEmail(content);

    console.log("Analysis Result:", analysis);

    // Update email
    email.isDeal = analysis.isDeal;
    email.dealCategory = analysis.category;
    email.dealAnalysis = {
      reasoning: analysis.reasoning,
      confidence: analysis.confidence,
      tags: analysis.tags
    };
    email.isAnalyzed = true;

    await email.save();

    console.log("Email Updated");

    // Save deal if needed
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
      console.log(":The awaiting deal", deal);
      await deal.save();

      console.log("Deal Saved");
    }

    res.json({
      success: true,
      analysis,
      email
    });

  } catch (error) {
    console.log("ANALYSIS ERROR:", error);

    res.status(400).json({
      error: error.message
    });
  }
});


// Batch analyze
router.post('/batch', authenticate, async (req, res) => {
  try {

    const emails = await Email.find({
      userId: req.userId,
      isAnalyzed: false,
      isArchived: false
    }).limit(5);

    if (emails.length === 0) {
      return res.json({
        message: "No emails to analyze"
      });
    }

    let count = 0;

    for (const email of emails) {
      try {

        const analysis = await analyzeEmail(
          email.plainText || email.body
        );

        email.isDeal = analysis.isDeal;
        email.dealCategory = analysis.category;
        email.dealAnalysis = analysis;
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

        count++;

        // Delay to avoid rate limit
        await new Promise(r => setTimeout(r, 800));

      } catch (err) {
        console.log("Batch error:", err.message);
      }
    }

    res.json({
      analyzed: count
    });

  } catch (error) {
    res.status(400).json({
      error: error.message
    });
  }
});

export default router; 