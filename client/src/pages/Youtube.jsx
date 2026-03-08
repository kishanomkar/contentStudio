import { useState } from "react";
import { Play, Loader2, Sparkles, Youtube, MessageSquare } from "lucide-react";

export default function YoutubeProcessor() {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const extractVideoId = (url) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const processComments = async () => {
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/youtube/process/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error processing comments");
      }

      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error processing comments");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 relative overflow-hidden flex flex-col items-center justify-center">

      {/* BACKGROUND ELEMENTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-4xl z-10 animate-fade-in-up" style={{ animation: "fadeInUp 0.6s ease-out forwards" }}>

        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <Youtube className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-orange-500 tracking-tight">
            YouTube Content Intelligence
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            Drop a link. Let our AI instantly categorize comments, detect spam, and generate engaging contextual replies.
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl mb-8 border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(239,68,68,0.1)]">

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Youtube className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-950/50 rounded-2xl border border-slate-700/50 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 outline-none text-white text-lg transition-all placeholder:text-slate-500"
              placeholder="Paste any YouTube video URL here..."
            />
          </div>

          <button
            onClick={processComments}
            disabled={loading || !videoUrl}
            className="w-full group relative overflow-hidden bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg hover:shadow-red-500/25"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Processing Sentiment...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
                Reply to Comments automatically With AI
                <Play className="w-5 h-5 ml-2 opacity-70 group-hover:translate-x-1 transition-transform" />
              </>
            )}

            {/* BUTTON SHINE EFFECT */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
          </button>

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-top-2">
              <div className="p-1 bg-red-500/20 rounded-full">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </div>
              <span className="font-medium">{error}</span>
            </div>
          )}
        </div>

        {/* RESULTS SECTION */}
        {result && (
          <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl animate-in slide-in-from-bottom-8 fade-in duration-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                AI Intelligence Report
              </h2>
            </div>

            <div className="bg-slate-950/80 p-6 rounded-2xl overflow-auto max-h-[500px] border border-slate-800/80 custom-scrollbar relative group">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition-colors border border-slate-700">
                  Copy JSON
                </button>
              </div>
              <pre className="text-slate-300 text-sm font-mono leading-relaxed whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        )}

      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(51, 65, 85, 0.8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 1);
        }
      `}} />
    </div>
  );
}