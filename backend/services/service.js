import dotenv from "dotenv";
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate Prompt
export const generateThumbnailPrompt = async (videoTitle, theme) => {
  try {

    const model = genAI.getGenerativeModel({
      model: "gemini-3-pro-preview" // ✅ Correct model 
    });

    const prompt = `
Create a short, vivid YouTube thumbnail image prompt.

Title: ${videoTitle}
Theme: ${theme}

Style:
- Bright colors
- High contrast
- Cinematic lighting
- Eye catching
- YouTube thumbnail style

Return ONLY the prompt text.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();

  } catch (error) {
    console.error("Gemini Prompt Error:", error);
    throw error;
  }
};


// Generate Image (Free API)
export const generateThumbnailImage = async (prompt) => {
  try {

    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://image.pollinations.ai/prompt/${encodedPrompt}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Image generation failed"); 
    }
 
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString("base64");

  } catch (error) {
    console.error("Image Error:", error);
    throw error;
  }
};