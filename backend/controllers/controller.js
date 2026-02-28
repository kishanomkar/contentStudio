import { generateThumbnailImage,generateThumbnailPrompt } from "../services/service.js";

export const enhancePrompt = async (req, res) => {
  try {
    const { videoTitle, theme } = req.body;
     
    if (!videoTitle || !theme) {
      return res.status(400).json({ error: "videoTitle and theme are required." });
    }

    const prompt = await generateThumbnailPrompt(videoTitle, theme);
    res.status(200).json({ prompt }); 
  } catch (error) {
    console.error("Error in enhancePrompt controller:", error);
    res.status(500).json({ error: "Failed to enhance prompt with Gemini." });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: "prompt is required." });
    }

    const imageBase64 = await generateThumbnailImage(prompt);
    res.status(200).json({ imageBase64 });
  } catch (error) {
    console.error("Error in generateImage controller:", error);
    res.status(500).json({ error: error.message || "Failed to generate image." });
  }
};