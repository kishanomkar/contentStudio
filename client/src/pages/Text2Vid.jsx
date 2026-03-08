import { useEffect, useRef, useState } from "react";

function Text2Video() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-IN");

  const [videoPrompt, setVideoPrompt] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  const recognitionRef = useRef(null);

  /* ---------------- LOAD PUTER SCRIPT ---------------- */
  useEffect(() => {
    if (!document.getElementById("puter-script")) {
      const script = document.createElement("script");
      script.src = "https://js.puter.com/v2/";
      script.id = "puter-script";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  /* ---------------- SPEECH TO TEXT (MIC) ---------------- */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  /* ---------------- AUDIO FILE → TEXT ---------------- */
  const handleAudioUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!window.puter) {
      alert("Puter not loaded yet");
      return;
    }

    try {
      const result = await window.puter.ai.speech2txt({
        audio: file,
        language,
      });

      setTranscript(
        typeof result === "string"
          ? result
          : result?.text || ""
      );

    } catch (err) {
      console.error(err);
      alert("Audio transcription failed");
    }
  };

  /* ---------------- TEXT → VIDEO ---------------- */
  const generateVideo = async () => {
    if (!videoPrompt.trim()) {
      alert("Enter a video prompt");
      return;
    }

    if (!window.puter) {
      alert("Puter not loaded yet");
      return;
    }

    try {
      setIsGeneratingVideo(true);
      setVideoUrl(null);

      // Ensure login
      if (!window.puter.auth.isSignedIn()) {
        await window.puter.auth.signIn();
      }

      const result = await window.puter.ai.txt2vid({
        prompt: videoPrompt.substring(0, 500),
        testMode: true
      });

      console.log("Video result:", result);

      let url = null;

      // Handle different response formats
      if (typeof result === "string") {
        // Check if it's base64
        if (result.startsWith("data:")) {
          url = result;
        } else if (result.startsWith("blob:")) {
          url = result;
        } else {
          url = result;
        }
      } else if (result instanceof Blob) {
        url = URL.createObjectURL(result);
      } else if (result?.url) {
        url = result.url;
      } else if (result?.video) {
        url = result.video;
      } else if (result?.data?.url) {
        url = result.data.url;
      } else if (result?.data instanceof Blob) {
        url = URL.createObjectURL(result.data);
      }

      if (!url) {
        throw new Error("No video URL returned");
      }

      setVideoUrl(url);

    } catch (err) {
      console.error(err);
      alert(`Video generation failed: ${err.message}`);
    } finally {
      setIsGeneratingVideo(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center gap-6 mt-20">

      <h1 className="text-3xl font-bold">
        AI Speech & Video Studio
      </h1>

      {/* SPEECH TO TEXT */}
      <div className="w-full max-w-xl bg-gray-800 p-4 rounded-xl">

        <textarea
          className="w-full h-32 bg-gray-700 p-3 rounded"
          placeholder="Speech text appears here"
          value={transcript}
          readOnly
        />

        <div className="flex gap-2 mt-3 flex-wrap">
          <button
            onClick={toggleListening}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            {isListening ? "Stop Mic" : "Start Mic"}
          </button>

          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioUpload}
          />
        </div>

        <select
          className="mt-3 w-full bg-gray-700 p-2 rounded"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en-IN">English (India)</option>
          <option value="en-US">English (US)</option>
          <option value="hi-IN">Hindi</option>
        </select>

      </div>

      {/* TEXT TO VIDEO */}
      <div className="w-full max-w-xl bg-gray-800 p-4 rounded-xl">

        <textarea
          className="w-full h-24 bg-gray-700 p-3 rounded"
          placeholder="Describe the video..."
          value={videoPrompt}
          onChange={(e) => setVideoPrompt(e.target.value)}
        />

        <button
          onClick={generateVideo}
          className="mt-3 px-4 py-2 bg-purple-600 rounded"
          disabled={isGeneratingVideo}
        >
          {isGeneratingVideo ? "Generating..." : "Generate Video"}
        </button>

        {videoUrl && (
          <div className="mt-4">
            <video
              src={videoUrl}
              controls
              className="w-full rounded"
            />
            <a
              href={videoUrl}
              download="generated-video.mp4"
              className="mt-3 inline-block px-4 py-2 bg-green-600 rounded text-white"
            >
              Download Video
            </a>
          </div>
        )}

      </div>

    </div>
  );
}

export default Text2Video;