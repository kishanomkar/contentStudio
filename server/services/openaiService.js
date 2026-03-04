import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const keywordAnalysis = (text) => {

  const keywords = [
    "sponsorship",
    "collaboration",
    "brand deal",
    "affiliate",
    "promotion",
    "partnership"
  ];

  const lowerText = text.toLowerCase();

  const found = keywords.some(word =>
    lowerText.includes(word)
  );

  return {
    isDeal: found,
    category: found ? "GOOD_DEAL" : "NOT_A_DEAL",
    reasoning: "Keyword fallback",
    confidence: 60,
    tags: found ? ["keyword"] : []
  };
};
export const analyzeEmail = async (emailContent) => {

  try {
    // Try OpenAI first
    const openaiResult = await analyzeWithOpenAI(emailContent);
    return openaiResult;

  } catch (error) {
    console.log("OpenAI quota reached");

    // Fallback to keyword logic
    return keywordAnalysis(emailContent);
  }
};