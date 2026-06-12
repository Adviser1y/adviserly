const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Rate limiting: 10 messages per 5 minutes per IP
const rateLimits = new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const window = 5 * 60 * 1000;
  const max = 10;
  if (!rateLimits.has(ip)) rateLimits.set(ip, []);
  const times = rateLimits.get(ip).filter(t => now - t < window);
  if (times.length >= max) {
    const oldest = times[0];
    const waitSec = Math.ceil((window - (now - oldest)) / 1000);
    return { limited: true, waitSec };
  }
  times.push(now);
  rateLimits.set(ip, times);
  return { limited: false };
}

// Streaming endpoint
app.post("/api/chat/stream", async (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  const rl = checkRateLimit(ip);
  if (rl.limited) {
    return res.status(429).json({ error: `You're sending too many messages. Please wait ${rl.waitSec}s.`, waitSec: rl.waitSec });
  }

  const { messages, systemPrompt, maxTokens } = req.body;
  if (!messages || !systemPrompt) return res.status(400).json({ error: "Missing fields" });

  // Limit input: only last 12 messages
  const trimmed = messages.slice(-12);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

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
          ...trimmed.map(m => ({ role: m.role === "ai" ? "assistant" : m.role, content: m.content }))
        ],
        max_tokens: maxTokens || 800,
        stream: true
      })
    });

    if (!response.ok) {
      const err = await response.json();
      res.write(`data: ${JSON.stringify({ error: "AI is busy right now. Please wait a moment." })}\n\n`);
      return res.end();
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop();
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") { res.write("data: [DONE]\n\n"); break; }
          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content;
            if (token) res.write(`data: ${JSON.stringify({ token })}\n\n`);
          } catch {}
        }
      }
    }
    res.end();
  } catch (err) {
    console.error("Stream error:", err);
    res.write(`data: ${JSON.stringify({ error: "Server error. Please try again." })}\n\n`);
    res.end();
  }
});

// Regular (non-stream) endpoint for summaries
app.post("/api/chat", async (req, res) => {
  const { messages, systemPrompt, maxTokens } = req.body;
  if (!messages || !systemPrompt) return res.status(400).json({ error: "Missing fields" });
  try {
    const trimmed = messages.slice(-12);
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.GROQ_API_KEY}` },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: systemPrompt }, ...trimmed.map(m => ({ role: m.role === "ai" ? "assistant" : m.role, content: m.content }))],
        max_tokens: maxTokens || 600
      })
    });
    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: "Groq error" });
    res.json({ reply: data.choices?.[0]?.message?.content || "Sorry, no response." });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/", (req, res) => res.send("Adviserly API v8 running."));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
