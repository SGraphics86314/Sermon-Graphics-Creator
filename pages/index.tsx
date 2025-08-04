import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [verse, setVerse] = useState("");
  const [outline, setOutline] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutline("");

    try {
      const response = await fetch("/api/generate-outline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, verse }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate outline.");
      }

      const data = await response.json();
      setOutline(data.outline || "No outline returned.");
    } catch (err) {
      console.error(err);
      setError("Error generating outline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Sermon Outline Generator</h1>
      <p>Enter your topic and verse to begin.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Sermon Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "1rem",
            width: "100%",
            padding: "0.5rem",
          }}
        />
        <input
          type="text"
          placeholder="Optional Bible Verse"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
          style={{
            display: "block",
            marginBottom: "1rem",
            width: "100%",
            padding: "0.5rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.75rem",
            width: "100%",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Outline"}
        </button>
      </form>

      <div style={{ marginTop: "2rem" }}>
        <h2>Generated Outline:</h2>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <pre style={{ whiteSpace: "pre-wrap" }}>{outline}</pre>
        )}
      </div>
    </div>
  );
}
