import { useState } from "react";

export default function YoutubeProcessor() {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const extractVideoId = (url) => {
    const regExp =
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  const processComments = async () => {
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/youtube/process/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error processing comments");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>YouTube Comment AI Reply</h2>

      <input
        type="text"
        placeholder="Paste YouTube video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{
          width: "400px",
          padding: "10px",
          marginRight: "10px",
        }}
      />

      <button onClick={processComments}>
        {loading ? "Processing..." : "Process Comments"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}