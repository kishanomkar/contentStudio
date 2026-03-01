import React, { useState, useEffect } from "react";
import { Sparkles, Image as ImageIcon, Loader2, Download, Wand2 } from "lucide-react";

export default function ThumbnailGenerator() {
  const [videoTitle, setVideoTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  // Load Puter
  useEffect(() => {
    if (!document.getElementById("puter-script")) {
      const script = document.createElement("script");
      script.src = "https://js.puter.com/v2/";
      script.id = "puter-script";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Enhance Prompt
  const handleEnhancePrompt = async () => {
    if (!videoTitle || !theme) {
      setError("Please enter both a video title and a theme.");
      return;
    }

    if (!window.puter || !window.puter.ai) {
      setError("Puter not loaded yet.");
      return;
    }

    setError("");
    setIsEnhancing(true);

    try {
      const prompt = `
Create a SHORT cinematic YouTube thumbnail prompt under 500 characters.

Title: ${videoTitle}
Theme: ${theme}

Make it:
- cinematic
- colorful
- eye catching
- high contrast
- 4k
`;

      const response = await window.puter.ai.chat(prompt);

      // Limit length
      const trimmed = String(response).substring(0, 800);
      setEnhancedPrompt(trimmed);

    } catch (err) {
      console.error(err);
      setError("Prompt enhancement failed");
    } finally {
      setIsEnhancing(false);
    }
  };


  const handleGenerateImage = async () => {
    if (!enhancedPrompt) {
      setError("Please enhance prompt first.");
      return;
    }

    if (!window.puter || !window.puter.ai) {
      setError("Puter not loaded yet.");
      return;
    }

    setError("");
    setIsGenerating(true);

    try {
      // Trim to Puter limit
      const shortPrompt = String(enhancedPrompt).substring(0, 1000);

      const image = await window.puter.ai.txt2img(shortPrompt, {
        provider: "gemini",
        model: "gemini-3-pro-image-preview"
      });

      console.log("IMAGE RESPONSE:", image);

      if (typeof image === "string") {
        setImageUrl(image);
      } 
      else if (image?.url) {
        setImageUrl(image.url);
      } 
      else if (image?.src) {
        setImageUrl(image.src);
      } 
      else if (image?.data) {
        setImageUrl(image.data);
      } 
      else {
        throw new Error("Invalid image response");
      }

    } catch (err) {
      console.error(err);
      setError("Image generation failed");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className=" bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden min-h-screen">

      {/* Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

          <h1 className="text-4xl font-bold mb-2 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Thumbnail Studio
          </h1>

          <p className="text-slate-400 mb-8">
            Generate thumbnails using Content Studio AI
          </p>

          <div className="space-y-6">

            <div>
              <label className="text-sm text-slate-300">Video Title</label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3"
                placeholder="Top 10 AI Tools"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300">Theme</label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full mt-2 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3"
                placeholder="Cyberpunk neon"
              />
            </div>

            <button
              onClick={handleEnhancePrompt}
              disabled={isEnhancing}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 py-3 rounded-xl"
            >
              {isEnhancing ? <Loader2 className="animate-spin" /> : <Wand2 />}
              {isEnhancing ? "Enhancing..." : "Enhance Prompt"}
            </button>

            <textarea
              value={enhancedPrompt}
              onChange={(e) => setEnhancedPrompt(e.target.value)}
              rows="5"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3"
              placeholder="Enhanced prompt will appear here..."
            />

            <p className="text-xs text-slate-400">
              {enhancedPrompt.length}/1000 characters
            </p>

            {error && (
              <p className="text-red-400 text-sm">
                {error}
              </p>
            )}

            <button
              onClick={handleGenerateImage}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 py-4 rounded-xl font-bold"
            >
              {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {isGenerating ? "Generating..." : "Generate Thumbnail"}
            </button>

          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center justify-center">

          {imageUrl ? (
            <div className="text-center">

              <img
                src={imageUrl}
                alt="Thumbnail"
                className="rounded-xl mb-4"
              />

              <a
                href={imageUrl}
                download="thumbnail.png"
                className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-lg"
              >
                <Download />
                Download
              </a>

            </div>
          ) : (
            <div className="text-center text-slate-400">

              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin w-12 h-12 mx-auto mb-4" />
                  Generating Thumbnail...
                </>
              ) : (
                <>
                  <ImageIcon className="w-12 h-12 mx-auto mb-4" />
                  Thumbnail appears here
                </>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}