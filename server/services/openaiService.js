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

export const classifyComment = async (commentText) => {

  const text = commentText.toLowerCase();

  // Spam detection
  if (text.includes("http") || text.includes("promo") || text.includes("click here") || text.includes("buy now")) {
    return "Spam";
  }

  // Link shorteners and suspicious patterns
  if (/(bit\.ly|tinyurl|goo\.gl|clickbank)/i.test(text)) {
    return "Spam";
  }

  // Repeated characters (common spam indicator)
  if (/(.)\1{4,}/.test(text)) {
    return "Spam";
  }

  // Question detection
  if (text.includes("?") && text.length > 5) {
    return "Question";
  }

  // Negative sentiment
  if (text.includes("bad") || text.includes("worst") || text.includes("hate") || text.includes("terrible") || text.includes("awful")) {
    return "Negative";
  }

  return "Positive";
};

export const generateReply = async (type, comment) => {
  switch (type) {
    case "Positive":
      return "Thank you so much for your support ❤️";

    case "Negative":
      return "Thanks for the feedback, we'll improve!";

    case "Question":
      return "Great question! Let me answer that...";

    case "Spam":
      return null;

    default:
      return "Thanks for your comment!";
  }
};
  