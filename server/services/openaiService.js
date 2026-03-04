import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

export const analyzeEmail = async (emailContent) => {
  try {
    const prompt = `Analyze the following email and determine if it contains a sponsorship or affiliate deal offer.

Email Content:
${emailContent}

Respond in JSON format with the following structure:
{
  "isDeal": boolean (true if this is a deal offer),
  "category": "GOOD_DEAL" | "BAD_DEAL" | "NOT_A_DEAL",
  "reasoning": "Brief explanation of your assessment",
  "confidence": number (0-100, confidence level),
  "tags": ["tag1", "tag2"] (relevant category tags like "affiliate", "sponsorship", "product", "service", etc.)
}

Guidelines:
- GOOD_DEAL: Legitimate, attractive offers with clear terms and high-value propositions
- BAD_DEAL: Offers with misleading claims, poor terms, or potential scams
- NOT_A_DEAL: Emails that don't contain deal offers (newsletters, updates, etc.)
- Confidence should reflect your certainty in the categorization`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at identifying and categorizing sponsorship and affiliate deals in emails. You provide structured JSON responses.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const content = response.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error('Could not parse AI response');
    }

    const analysis = JSON.parse(jsonMatch[0]);
    return analysis;
  } catch (error) {
    throw new Error('Email analysis failed: ' + error.message);
  }
};

export const batchAnalyzeEmails = async (emails) => {
  const results = [];
  for (const email of emails) {
    try {
      const analysis = await analyzeEmail(email.plainText || email.body);
      results.push({
        emailId: email._id,
        analysis
      });
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to analyze email ${email._id}:`, error);
      results.push({
        emailId: email._id,
        analysis: {
          isDeal: false,
          category: 'PENDING',
          reasoning: 'Analysis failed',
          confidence: 0,
          tags: []
        }
      });
    }
  }
  return results;
};
