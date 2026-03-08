import { useState, useEffect, useRef } from "react";

function Speech2Text() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [language, setLanguage] = useState("en-IN");
  const [fileName, setFileName] = useState("");

  const recognitionRef = useRef(null);

  // 🎤 Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Use Chrome or Edge for speech recognition.");
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

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => recognition.stop();
  }, [language]);

  // 🎤 Toggle Mic
  const toggleListening = () => {
    if (!recognitionRef.current || isUploading) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 🎧 Upload Audio Transcription (FIXED)
  const transcribeAudio = async (file) => {
  try {
    setIsUploading(true);
    setFileName(file.name);

    console.log("Uploading:", file.name);
    console.log("Type:", file.type);
    console.log("Size:", file.size);

    if (!window.puter) {
      alert("Puter not loaded");
      return;
    }

    const blob = new Blob([await file.arrayBuffer()], {
      type: file.type,
    });

    const result = await window.puter.ai.speech2txt({
      audio: blob,
      model: "gpt-4o-mini-transcribe", // ✅ FIXED
    });

    console.log("Result:", result);

    if (result?.text) {
      setTranscript(result.text);
    } else {
      throw new Error("No transcription returned");
    }

  } catch (error) {
    console.error("Transcription error:", error);
    alert("Transcription failed");
  } finally {
    setIsUploading(false);
  }
};

  // 📂 File Upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      alert("Please upload an audio file.");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      alert("Max file size is 25MB.");
      return;
    }

    await transcribeAudio(file);
  };

  // 📂 Drag & Drop
  const handleDrop = async (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      alert("Drop an audio file.");
      return;
    }

    await transcribeAudio(file);
  };

  // 📋 Copy
  const copyText = () => {
    navigator.clipboard.writeText(transcript);
    alert("Copied!");
  };

  // 🧹 Clear
  const clearText = () => {
    setTranscript("");
    setFileName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-slate-950 to-purple-900 flex flex-col items-center justify-center p-6 gap-6 mt-20">
      
      <h1 className="text-5xl font-light bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        AI Speech To Text
      </h1>

      <div className="w-full max-w-2xl bg-gray-800/80 border border-gray-600 rounded-3xl p-6 shadow-2xl">

        {/* Status */}
        <div className="flex justify-center mb-4 items-center">
          <div
            className={`h-3 w-3 rounded-full ${
              isListening ? "bg-red-500 animate-pulse" : "bg-gray-600"
            }`}
          ></div>
          <span className="ml-2 text-xs text-gray-400 uppercase">
            {isUploading
              ? "Uploading..."
              : isListening
              ? "Listening..."
              : "Idle"}
          </span>
        </div>

        {/* Transcript */}
        <textarea
          className="w-full h-60 p-4 bg-gray-700 border border-gray-600 rounded-2xl text-white"
          placeholder="Speech or audio transcription will appear here..."
          value={transcript}
          readOnly
        />

        {/* Language */}
        <div className="mt-4">
          <label className="text-gray-400 text-sm">Language</label>
          <select
            className="w-full p-2 bg-gray-700 text-white rounded-xl border border-gray-600"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en-IN">English (India)</option>
            <option value="en-US">English (US)</option>
            <option value="hi-IN">Hindi</option>
            <option value="es-ES">Spanish</option>
          </select>
        </div>

        {/* Upload */}
        <div
          className="mt-6 p-6 border-2 border-dashed border-gray-600 rounded-2xl text-center text-gray-400"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <p>Drag & Drop Audio</p>
          <p className="text-sm">or</p>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="mt-2 text-white"
          />
          {fileName && (
            <p className="text-green-400 mt-2">
              Uploaded: {fileName}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6 flex-wrap">
          
          <button
            onClick={toggleListening}
            disabled={isUploading}
            className={`px-6 py-2 rounded-xl text-white ${
              isListening ? "bg-red-600" : "bg-blue-600"
            }`}
          >
            {isListening ? "Stop Mic" : "Start Mic"}
          </button>

          <button
            onClick={copyText}
            disabled={!transcript}
            className="px-6 py-2 bg-gray-600 rounded-xl text-white"
          >
            Copy
          </button>

          <button
            onClick={clearText}
            className="px-6 py-2 border border-gray-500 rounded-xl text-white"
          >
            Clear
          </button>

        </div>

      </div>

      <p className="text-gray-500 text-sm">
        Supports mic + audio upload
      </p>
    </div>
  );
}

export default Speech2Text;