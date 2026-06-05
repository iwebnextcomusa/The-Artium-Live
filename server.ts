import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Log incoming requests for API endpoints
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/")) {
      console.log(`[API ${req.method}] ${req.path}`);
    }
    next();
  });

  // Secure API Route for the Atrium Live Concierge Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY is not defined. Falling back to descriptive offline messages.");
        return res.json({
          text: "Welcome to The Atrium Live! (Offline Mode) I would be delighted to assist you, but my connection is currently offline. Please call Terry directly at 678-409-9635 or email terry@brantland.com for immediate help with event bookings!"
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Customized system instruction to match the luxury, premium event venue context
      const systemInstruction = `You are "Aura", the elegant, professional AI concierge for The Atrium Live (theatriumlive.us), an upscale premier event & live entertainment venue. 
Venue Info:
- Address: Atlanta Region, Georgia
- Phone/Booking Hotline: 678-409-9635
- Email Contact: terry@brantland.com (Contact Terry: Brantland Developments / Atrium Lead Planner)
- Mission: Providing luxury hospitality, customized experiences, production-ready stage setups, outstanding audio-visual engineering, and majestic settings.

Services & Event Types:
1. Heavenly Weddings: Majestic spaces, premium bridal suites, master-tier catering options, professional coordinators.
2. High-Impact Corporate Events: Product launches, gala dinners, seminars, high-fidelity AV setups, super-fast Wi-Fi, bespoke staging.
3. Exquisite Private Parties: Galas, milestones, anniversaries, birthday celebrations with high-end vibes.
4. Curated Live Entertainment: Professional acoustics, multi-tier staging, dynamic lighting rigs, green rooms.

Guidelines for Chatting:
- Maintain a warm, premium, elite, yet friendly and highly professional tone.
- Keep responses brief, clear, and highly focused on encouraging the visitor to schedule a venue tour or request package info.
- If they ask about prices, suggest submitting an inquiry through our Booking form, checking availability, or speaking with Terry.
- Keep the response short (ideally under 110 words) with beautiful, neat layout. Use spacing for readability.`;

      // Construct conversational contents representing history
      const formattedContents = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          formattedContents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        }
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const text = response.text || "I apologize, but I could not connect at this time. Please reach out to Terry at 678-409-9635.";
      return res.json({ text });

    } catch (error: any) {
      console.error("Gemini API error:", error);
      return res.status(500).json({ error: error?.message || "Internal Server Error" });
    }
  });

  // Client inquiry form endpoint
  app.post("/api/inquiry", async (req, res) => {
    try {
      const { name, email, phone, eventType, date, guests, message } = req.body;
      
      console.log("New Event Booking Inquiry Received:", {
        name,
        email,
        phone,
        eventType,
        date,
        guests,
        message,
        receivedAt: new Date().toISOString()
      });

      return res.json({
        success: true,
        message: `Thank you, ${name}! Your event booking inquiry has been submitted. Terry (our Event Planner) will contact you shortly at ${phone} or ${email} to discuss details and schedule a private tour of The Atrium Live!`
      });
    } catch (error: any) {
      console.error("Inquiry route error:", error);
      return res.status(500).json({ error: error?.message || "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
