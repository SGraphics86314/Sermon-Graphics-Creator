// pages/index.tsx

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [verse, setVerse] = useState("");
  const [outline, setOutline] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutline("");

    try {
      const response = await axios.post("/api/generate-outline", {
        topic,
        verse,
      });

      setOutline(response.data.outline);
    } catch (error) {
      setOutline("Error generating outline.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Sermon Outline Generator</h1>
      <p>Enter your topic and verse to begin.</p>
      <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
        <input
          type="text"
          placeholder="Sermon Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
          required
        />
        <input
          type="text"
          placeholder="Optional Bible Verse"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "8px" }}
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Generating..." : "Generate Outline"}
        </button>
      </form>

      {outline && (
        <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
          <h2>Generated Outline:</h2>
          <p>{outline}</p>
        </div>
      )}
    </div>
  );
}
