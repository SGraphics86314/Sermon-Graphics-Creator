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
      const response = await fetch("/api/generate-outline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setImageUrl(data.imageUrl || ""); // handle image or error
    } catch (error) {
      console.error("Error generating image:", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", fontFamily: "Arial" }}>
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
          style={{ width: "100%", padding: "10px", background: "#0070f3", color: "white" }}
        >
          {loading ? "Generating..." : "Generate Graphic"}
        </button>
      </form>
      {imageUrl && (
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <img src={imageUrl} alt="Generated graphic" style={{ maxWidth: "100%" }} />
        </div>
      )}
    </div>
  );
}
