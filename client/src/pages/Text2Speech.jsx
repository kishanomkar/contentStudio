import { useState, useEffect, useRef } from "react";

function Text2Speech() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rate, setRate] = useState(1);
  const [audioURL, setAudioURL] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);

  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();

      if (availableVoices.length > 0) {
        setVoices(availableVoices);

        const indianVoice =
          availableVoices.find(
            (voice) =>
              voice.lang === "en-IN" ||
              voice.name.toLowerCase().includes("india")
          ) || availableVoices[0];

        setSelectedVoice(indianVoice);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Speak + Record Audio Only
  const speakText = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setAudioURL(null);
    audioChunksRef.current = [];

    try {
      // Capture tab audio
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      // 🔥 Disable video tracks immediately
      stream.getVideoTracks().forEach(track => track.stop());

      // Extract only audio tracks
      const audioStream = new MediaStream(stream.getAudioTracks());
      streamRef.current = audioStream;

      const mediaRecorder = new MediaRecorder(audioStream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setLoading(false);

        audioStream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();

      // Speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      utterance.rate = rate;
      utterance.pitch = 1;

      utterance.onend = () => {
        mediaRecorder.stop();
      };

      utterance.onerror = () => {
        mediaRecorder.stop();
        setLoading(false);
      };

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    setLoading(false);
  };

  const downloadAudio = () => {
    if (!audioURL) return;

    const a = document.createElement("a");
    a.href = audioURL;
    a.download = "speech.webm";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-slate-950 to-purple-900 flex flex-col items-center justify-center p-6 gap-6">

      <h1 className="text-5xl font-light bg-gradient-to-r from-blue-500 via-rose-500 to-indigo-500 bg-clip-text text-transparent text-center">
        AI Text To Speech
      </h1>

      <div className="w-full max-w-2xl bg-gray-800/80 backdrop-blur-md border border-gray-600 rounded-3xl p-6 shadow-2xl">

        {/* Text */}
        <textarea
          className="w-full h-40 p-4 bg-gray-700 border border-gray-600 rounded-2xl text-white"
          placeholder="Enter text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={3000}
        />

        {/* Voice */}
        <div className="mt-4">
          <select
            className="w-full p-2 bg-gray-700 text-white rounded-xl border border-gray-600"
            value={selectedVoice?.name || ""}
            onChange={(e) =>
              setSelectedVoice(
                voices.find((voice) => voice.name === e.target.value)
              )
            }
          >
            {voices.map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        {/* Speed */}
        <div className="mt-4">
          <label className="text-gray-300 text-sm">
            Speed: {rate}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6 flex-wrap">
          <button
            onClick={speakText}
            disabled={loading}
            className="px-4 py-2 bg-fuchsia-500 rounded-xl text-white"
          >
            {loading ? "Speaking..." : "Speak & Record"}
          </button>

          <button
            onClick={stopSpeech}
            className="px-4 py-2 bg-red-500 rounded-xl text-white"
          >
            Stop
          </button>

          {audioURL && (
            <button
              onClick={downloadAudio}
              className="px-4 py-2 bg-green-500 rounded-xl text-white"
            >
              Download Audio
            </button>
          )}
        </div>

        {/* Player */}
        {audioURL && (
          <audio controls src={audioURL} className="mt-4 w-full" />
        )}

      </div>
    </div>
  );
}

export default Text2Speech;