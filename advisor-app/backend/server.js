const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { messages, systemPrompt } = req.body;
  if (!messages || !systemPrompt) return res.status(400).json({ error: "Missing fields" });
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map(m => ({ role: m.role === "ai" ? "assistant" : m.role, content: m.content }))
        ],
        max_tokens: 1024
      })
    });
    const data = await response.json();
    if (!response.ok) { console.error("Groq error:", JSON.stringify(data)); return res.status(500).json({ error: "Groq error" }); }
    const reply = data.choices?.[0]?.message?.content || "Sorry, no response.";
    res.json({ reply });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/", (req, res) => res.send("Adviserly API is running."));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
