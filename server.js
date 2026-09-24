import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Chatbot response endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Format history into the array of parts as expected by Gemini 3.8-flash API
      const contents = [
        ...(history || []).map((h) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        })),
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: `You are the Skill Set Go EduTech Internship Bot, an interactive assistant for the Skill Set Go Internship Portal.
Your goals:
1. Provide enthusiastic, friendly, and expert advice to students about Skill Set Go's 12 structured project-based internship paths (Full-Stack Web Development, Frontend React, Backend Node.js, Mobile App Dev, UI/UX Design, Data Science, Machine Learning, Cyber Security, Cloud Computing, DevOps Engineering, Digital Marketing, and the newly added Mechatronics / Mechanical Engineering track!).
2. Answer questions about eligibility, prerequisites, roadmap details, tech stacks, and career outcomes of each path.
3. Keep answers concise, formatted with nice bullet points, and highly professional.
4. Encourage them to apply to an internship that matches their skills and goals.
5. Emphasize the structure of the internships: They are project-based paths, where students learn by building real-world projects with dedicated mentorship and proof of completion (Learn. Build. Prove).

If they ask about an internship that is not listed, politely let them know the 12 paths we offer and guide them to choose the closest one.`
        }
      });

      const reply = response.text || "I'm sorry, I couldn't generate a response. Please try again.";
      res.json({ text: reply });
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      res.status(500).json({ error: error.message || 'Failed to generate response' });
    }
  });

  // In-memory click analytics storage for server-side recording
  const serverClickLogs = [];

  // Admin authentication endpoint
  app.post('/api/admin/login', (req, res) => {
    const { email, password } = req.body;
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '').trim();

    // Check development / administrator credentials safely
    if (
      cleanEmail === 'admin@skillsetgo.com' &&
      cleanPassword === 'Admin@SSG2026!'
    ) {
      const token = 'ssg_srv_' + Date.now() + '_' + Math.random().toString(36).substring(2);
      return res.json({
        success: true,
        token,
        user: {
          id: 'usr_admin_001',
          email: 'admin@skillsetgo.com',
          name: 'EduTech Administrator',
          role: 'Super Administrator',
        },
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Invalid administrator credentials.',
    });
  });

  // Track application click endpoint
  app.post('/api/analytics/track', (req, res) => {
    const event = {
      id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      ...req.body,
    };
    serverClickLogs.unshift(event);
    if (serverClickLogs.length > 500) serverClickLogs.pop();
    res.json({ success: true, eventId: event.id });
  });

  // Get click logs for admin
  app.get('/api/analytics/clicks', (req, res) => {
    res.json({ success: true, count: serverClickLogs.length, clicks: serverClickLogs });
  });

  // Serve static assets / build files in production, or mount Vite middleware in development
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
