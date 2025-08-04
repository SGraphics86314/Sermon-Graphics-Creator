import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { topic, verse } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that helps pastors create structured, Bible-based sermon outlines using clear headings and application points.",
        },
        {
          role: "user",
          content: `Create a sermon outline about '${topic}'${
            verse ? \` using the Bible verse '\${verse}'\` : ""
          }. Format it with clear sections like Introduction, Biblical Context, Main Points (with subpoints if needed), Application, and Conclusion.`,
        },
      ],
      temperature: 0.7,
    });

    const outline = completion.choices[0].message.content;
    res.status(200).json({ outline });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Failed to generate outline." });
  }
}
