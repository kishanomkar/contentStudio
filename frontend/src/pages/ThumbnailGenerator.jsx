import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Loader2, Download, Wand2 } from 'lucide-react';

export default function ThumbnailGenerator() {
  const [videoTitle, setVideoTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  // 1. Call your backend to enhance the prompt using Gemini
  const handleEnhancePrompt = async () => {
    if (!videoTitle || !theme) {
      setError("Please enter both a video title and a theme.");
      return;
    }
    setError('');
    setIsEnhancing(true);
    
    try {
      // Pointing to your new modular backend route
      const response = await fetch('http://localhost:3001/contentStudio/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoTitle, theme })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Failed to enhance prompt");
      setEnhancedPrompt(data.prompt);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsEnhancing(false);
    }
  };

  // 2. Call your backend to generate the image
  const handleGenerateImage = async () => {
    if (!enhancedPrompt) {
      setError("Please generate or enter a prompt first.");
      return;
    }
    setError('');
    setIsGenerating(true);

    try {
      // Pointing to your new modular backend route
      const response = await fetch('http://localhost:3001/contentStudio/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: enhancedPrompt })
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || "Failed to generate image");
      
      // Render the base64 string as an image source
      setImageUrl(`data:image/png;base64,${data.imageBase64}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-purple-500/30 relative overflow-hidden flex items-center justify-center p-4 sm:p-8">
      
      {/* Animated Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Controls */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl">
          <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
            AI Thumbnail Studio
          </h1>
          <p className="text-slate-400 mb-8">Craft click-worthy thumbnails in seconds.</p>

          <div className="space-y-6">
            {/* Inputs */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Video Title</label>
              <input 
                type="text" 
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                placeholder="e.g., Top 10 Travel Destinations in 2026"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Vibe & Theme</label>
              <input 
                type="text" 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="e.g., Adventure, neon lights, cyberpunk"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Enhance Button */}
            <button 
              onClick={handleEnhancePrompt}
              disabled={isEnhancing}
              className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-xl py-3 font-semibold transition-all disabled:opacity-50"
            >
              {isEnhancing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5 text-purple-400" />}
              {isEnhancing ? "Enhancing with Gemini..." : "Enhance Prompt"}
            </button>

            {/* Enhanced Prompt Textarea */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Enhanced Prompt</label>
              <textarea 
                value={enhancedPrompt}
                onChange={(e) => setEnhancedPrompt(e.target.value)}
                rows="4"
                placeholder="Your enhanced prompt will appear here, or you can type your own..."
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              />
            </div>

            {error && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</p>}

            {/* Generate Button */}
            <button 
              onClick={handleGenerateImage}
              disabled={isGenerating || !enhancedPrompt}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl py-4 font-bold shadow-lg shadow-purple-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
            >
              {isGenerating ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
              {isGenerating ? "Generating Masterpiece..." : "Generate Thumbnail"}
            </button>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl flex flex-col justify-center items-center min-h-[400px] lg:min-h-[600px] relative overflow-hidden group">
          {imageUrl ? (
            <>
              <img src={imageUrl} alt="Generated Thumbnail" className="w-full h-auto rounded-xl shadow-2xl z-10" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center backdrop-blur-sm rounded-3xl">
                <a href={imageUrl} download="thumbnail.png" className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors transform hover:scale-105 active:scale-95">
                  <Download className="w-5 h-5" /> Download HD
                </a>
              </div>
            </>
          ) : (
             <div className="text-center text-slate-500 flex flex-col items-center">
              {isGenerating ? (
                <>
                  <Loader2 className="w-16 h-16 animate-spin text-purple-500 mb-4" />
                  <p className="text-lg font-medium text-slate-300">Vertex AI is painting...</p>
                  <p className="text-sm mt-2 opacity-70">This usually takes 10-15 seconds.</p>
                </>
              ) : (
                <>
                  <ImageIcon className="w-20 h-20 mb-4 opacity-50" />
                  <p className="text-lg">Your generated thumbnail will appear here.</p>
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}