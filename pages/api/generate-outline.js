import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  try {
    const imageResponse = await openai.images.generate({
      prompt: prompt || "Christian-themed sermon artwork, modern style",
      n: 1,
      size: "1024x1024",
    });

    const imageUrl = imageResponse.data[0].url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to generate image." });
  }
}
