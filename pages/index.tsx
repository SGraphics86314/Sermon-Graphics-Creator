import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setImageUrl("");

    try {
      const response = await fetch("/api/generate-graphic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (data.imageUrl) {
        setImageUrl(data.imageUrl);
      } else {
        setImageUrl("");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Sermon Graphic Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Describe the graphic"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          required
        />
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
          }}
        >
          {loading ? "Generating..." : "Generate Graphic"}
        </button>
      </form>

      {imageUrl && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <img src={imageUrl} alt="Generated Sermon Graphic" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}
