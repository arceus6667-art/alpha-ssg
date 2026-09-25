/**
 * SkillSet Go EduTech - Production Express Server
 * 
 * Architecture:
 *   React Frontend → Express API → SQLite Database (centralized)
 * 
 * All admin content changes are persisted to a server-side SQLite database.
 * Any device/browser reading from the API gets the same centralized state.
 * localStorage is NOT the source of truth — the database is.
 */

import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import getDb from './src/db/database.js';
import { seedDatabase } from './src/db/seed.js';
import apiRoutes from './src/api/routes.js';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  // Initialize and seed the centralized database
  console.log('[Server] Initializing centralized SQLite database...');
  try {
    getDb(); // triggers schema creation
    await seedDatabase(); // idempotent seed
    console.log('[Server] Database ready.');
  } catch (err) {
    console.error('[Server] Database initialization error:', err.message);
    // Continue running — don't crash on seed issues
  }

  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // Basic security headers
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    next();
  });

  // ============================================================
  // MOUNT ALL CENTRALIZED API ROUTES
  // ============================================================
  app.use('/api', apiRoutes);

  // ============================================================
  // GEMINI CHATBOT ENDPOINT (unchanged)
  // ============================================================
  const apiKey = process.env.GEMINI_API_KEY;
  let ai = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });
  }

  app.post('/api/chat', async (req, res) => {
    if (!ai) {
      return res.status(503).json({ error: 'AI service not configured. Please set GEMINI_API_KEY.' });
    }
    try {
      const { message, history } = req.body;
      if (!message) return res.status(400).json({ error: 'Message is required' });

      const contents = [
        ...(history || []).map((h) => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        })),
        { role: 'user', parts: [{ text: message }] },
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

If they ask about an internship that is not listed, politely let them know the 12 paths we offer and guide them to choose the closest one.`,
        },
      });

      const reply = response.text || "I'm sorry, I couldn't generate a response. Please try again.";
      res.json({ text: reply });
    } catch (error) {
      console.error('[Chatbot] Error calling Gemini API:', error);
      res.status(500).json({ error: error.message || 'Failed to generate response' });
    }
  });

  // ============================================================
  // STATIC FILES / VITE MIDDLEWARE
  // ============================================================
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
    console.log(`[Server] SkillSet Go EduTech running at http://localhost:${port}`);
    console.log(`[Server] API available at http://localhost:${port}/api`);
    console.log(`[Server] Database: centralized SQLite (data/ssg.db)`);
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal startup error:', err);
  process.exit(1);
});
