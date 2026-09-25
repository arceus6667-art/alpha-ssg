/**
 * SkillSet Go EduTech - Database Seed / Migration
 * Migrates existing static baseline data into the SQLite database.
 * Idempotent: running twice does NOT create duplicate records.
 */

import getDb from './database.js';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

function generateId(prefix) {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
}

function safeJson(val) {
  if (!val) return null;
  if (typeof val === 'string') return val;
  return JSON.stringify(val);
}

export async function seedDatabase() {
  const db = getDb();

  // ===== SEED ADMIN USER =====
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@skillsetgo.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@SSG2026!';
  
  // Hash password deterministically for idempotency checks
  const passwordHash = createHash('sha256').update(adminPassword + 'ssg_salt_2026').digest('hex');

  const existingAdmin = db.prepare('SELECT id FROM admins WHERE email = ?').get(adminEmail);
  if (!existingAdmin) {
    db.prepare(`
      INSERT INTO admins (id, email, name, role, password_hash)
      VALUES (?, ?, ?, ?, ?)
    `).run('admin_001', adminEmail, 'EduTech Administrator', 'Super Administrator', passwordHash);
    console.log('[Seed] Admin user created.');
  } else {
    console.log('[Seed] Admin user already exists, skipping.');
  }

  // ===== SEED ANNOUNCEMENTS =====
  const defaultAnnouncements = [
    {
      id: 'upd-01',
      title: 'October 2026 Cohort Admissions Now Open for All 12 Domains',
      short_description: 'Applications for the upcoming monthly project-based internship sprint are officially live. Limited seats available per domain.',
      content: 'We are pleased to announce that registrations for the October 2026 cohort are now officially accepting submissions across all 12 domains, including the newly introduced Mechatronics & Mechanical Engineering pathway.',
      status: 'published',
      priority: 'important',
      cta_text: 'Apply for October Cohort',
      cta_url: '/internships',
      published_at: '2026-09-22T08:00:00Z',
      expires_at: '2026-10-31T23:59:59Z',
      created_at: '2026-09-22T08:00:00Z',
      updated_at: '2026-09-22T08:00:00Z',
    },
    {
      id: 'upd-02',
      title: 'AI Agents & Kubernetes Masterclasses Scheduled for Weekends',
      short_description: 'Join our weekend live masterclasses on building autonomous LLM agents and multi-cloud Kubernetes deployment pipelines.',
      content: 'Two brand new weekend live masterclasses have been added to our schedule. All attendees will receive verified participant certificates and GitHub code repositories.',
      status: 'published',
      priority: 'normal',
      cta_text: 'View Workshops',
      cta_url: '/workshops',
      published_at: '2026-09-20T10:00:00Z',
      expires_at: '2026-11-15T23:59:59Z',
      created_at: '2026-09-20T10:00:00Z',
      updated_at: '2026-09-20T10:00:00Z',
    },
  ];

  const insertAnnouncement = db.prepare(`
    INSERT OR IGNORE INTO announcements 
    (id, title, short_description, content, status, priority, cta_text, cta_url, published_at, expires_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let announcementsSeeded = 0;
  for (const a of defaultAnnouncements) {
    const result = insertAnnouncement.run(a.id, a.title, a.short_description, a.content, a.status, a.priority, a.cta_text, a.cta_url, a.published_at, a.expires_at, a.created_at, a.updated_at);
    if (result.changes > 0) announcementsSeeded++;
  }
  console.log(`[Seed] Announcements: ${announcementsSeeded} seeded, rest already existed.`);

  // ===== SEED WORKSHOPS =====
  // Importing static data
  const APPLICATION_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSf1oHpPTdQh8DpvHF-i-OKMdqt0EJADjTfRWRNqLJj1tWCkwg/viewform';
  
  const defaultWorkshops = [
    {
      id: 'ws-01',
      slug: 'building-ai-agents-langchain-gemini',
      title: 'Building Production-Ready AI Agents with Gemini & LangChain',
      short_title: 'AI Agents Masterclass',
      description: 'A hands-on intensive workshop walking learners through autonomous LLM agent architecture, tool-calling workflows, vector databases, and real-time streaming integration.',
      cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
      date: 'October 18, 2026',
      iso_date: '2026-10-18',
      start_time: '10:00 AM IST',
      end_time: '02:00 PM IST',
      duration: '4 Hours (Live Practical)',
      mode: 'Live Interactive (Virtual)',
      status: 'registration-open',
      speaker: JSON.stringify({ name: 'Aditya Sharma', role: 'Lead AI Systems Architect', company: 'SkillSet Go Labs', bio: '10+ years architecting enterprise ML pipelines.', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' }),
      topics: JSON.stringify(['Foundations of Autonomous Agents & Memory Architectures', 'Function Calling with Google Gemini 3.5 Models', 'Vector Embeddings & Hybrid RAG Retrieval', 'End-to-End Deployment with Containerized API Services']),
      what_you_will_learn: JSON.stringify(['Design multi-turn agent decision loops with guardrails', 'Connect LLMs with real-world SQL databases and external APIs', 'Implement persistent conversation memory with Redis & vector stores', 'Ship a live agent demo to your portfolio']),
      prerequisites: 'Basic Python proficiency and familiar with REST API concepts.',
      registration_url: APPLICATION_FORM_URL,
      seat_capacity: '100 Seats Limited',
      seats_remaining: 18,
      badge: 'Most Popular',
      created_at: '2026-09-01T10:00:00Z',
      updated_at: '2026-09-20T10:00:00Z',
    },
    {
      id: 'ws-02',
      slug: 'kubernetes-multi-cloud-deployment',
      title: 'Kubernetes Multi-Cloud Deployment Bootcamp',
      short_title: 'Kubernetes Bootcamp',
      description: 'A comprehensive live bootcamp covering production Kubernetes deployments across AWS EKS, Google GKE, and Azure AKS.',
      cover_image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80',
      date: 'October 25, 2026',
      iso_date: '2026-10-25',
      start_time: '09:00 AM IST',
      end_time: '01:00 PM IST',
      duration: '4 Hours (Live Practical)',
      mode: 'Live Interactive (Virtual)',
      status: 'registration-open',
      speaker: JSON.stringify({ name: 'Priya Nair', role: 'Principal Cloud Architect', company: 'CloudOps India', bio: '8 years designing multi-region cloud-native platforms.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80' }),
      topics: JSON.stringify(['Kubernetes Architecture & Production Cluster Design', 'Multi-Cloud Deployments on AWS EKS & Google GKE', 'Helm Charts, GitOps & Argo CD Deployment Automation', 'Observability with Prometheus, Grafana & Loki']),
      what_you_will_learn: JSON.stringify(['Deploy a production-grade Kubernetes cluster across cloud providers', 'Implement zero-downtime rolling deployments with Helm', 'Visualize cluster health with Grafana dashboards', 'Ship microservices to prod using full GitOps pipeline']),
      prerequisites: 'Familiarity with Docker and Linux command line. Cloud basics helpful.',
      registration_url: APPLICATION_FORM_URL,
      seat_capacity: '80 Seats Limited',
      seats_remaining: 24,
      badge: 'High Demand',
      created_at: '2026-09-05T10:00:00Z',
      updated_at: '2026-09-20T10:00:00Z',
    },
    {
      id: 'ws-03',
      slug: 'nextjs-fullstack-production',
      title: 'Next.js 15 Full-Stack Production Architecture',
      short_title: 'Next.js Masterclass',
      description: 'From routing fundamentals to server components, React Server Actions, edge deployments, and database ORM integrations.',
      cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      date: 'November 1, 2026',
      iso_date: '2026-11-01',
      start_time: '11:00 AM IST',
      end_time: '03:00 PM IST',
      duration: '4 Hours (Live Practical)',
      mode: 'Live Interactive (Virtual)',
      status: 'upcoming',
      speaker: JSON.stringify({ name: 'Rahul Mehta', role: 'Senior Full-Stack Engineer', company: 'Tech Innovators', bio: 'Expert in React and Next.js applications at scale.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' }),
      topics: JSON.stringify(['App Router Architecture & React Server Components', 'Server Actions, Streaming & Suspense Boundaries', 'Database Integration with Prisma ORM & PostgreSQL', 'Vercel Edge Deployments & ISR Optimization']),
      what_you_will_learn: JSON.stringify(['Build a full production Next.js app from scratch', 'Implement type-safe API routes with Zod validation', 'Optimize Core Web Vitals for production sites', 'Deploy to Vercel with custom domains and environments']),
      prerequisites: 'Solid React fundamentals and JavaScript proficiency.',
      registration_url: APPLICATION_FORM_URL,
      seat_capacity: '120 Seats',
      seats_remaining: 67,
      badge: null,
      created_at: '2026-09-10T10:00:00Z',
      updated_at: '2026-09-20T10:00:00Z',
    },
    {
      id: 'ws-04',
      slug: 'ethical-hacking-web-security',
      title: 'Ethical Hacking & Web Application Security',
      short_title: 'Ethical Hacking Workshop',
      description: 'Understand real-world attack vectors, OWASP Top 10 vulnerabilities, and how to identify and fix security flaws in web applications.',
      cover_image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
      date: 'September 14, 2026',
      iso_date: '2026-09-14',
      start_time: '10:00 AM IST',
      end_time: '02:00 PM IST',
      duration: '4 Hours',
      mode: 'Live Interactive (Virtual)',
      status: 'completed',
      speaker: JSON.stringify({ name: 'Arjun Kapoor', role: 'Certified Ethical Hacker (CEH)', company: 'SecureCode India', bio: 'Certified ethical hacker with 6 years of penetration testing experience.', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80' }),
      topics: JSON.stringify(['OWASP Top 10 Web Application Vulnerabilities', 'SQL Injection, XSS & CSRF Attack Simulations', 'Burp Suite Professional for Web Testing', 'Secure Code Review Frameworks & SAST Tools']),
      what_you_will_learn: JSON.stringify(['Identify and exploit common web vulnerabilities legally', 'Conduct automated and manual penetration testing', 'Write a professional pentest report', 'Implement security hardening checklists']),
      prerequisites: 'Basic web development knowledge. Legal disclaimer must be acknowledged.',
      registration_url: APPLICATION_FORM_URL,
      seat_capacity: '75 Seats',
      seats_remaining: 0,
      badge: 'Completed',
      created_at: '2026-08-15T10:00:00Z',
      updated_at: '2026-09-14T10:00:00Z',
    },
    {
      id: 'ws-05',
      slug: 'mechatronics-iot-embedded',
      title: 'Mechatronics & IoT: Real-World Embedded Systems',
      short_title: 'Mechatronics Workshop',
      description: 'Hands-on workshop covering Arduino, Raspberry Pi, and industrial PLCs for building real-world automation systems.',
      cover_image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
      date: 'November 8, 2026',
      iso_date: '2026-11-08',
      start_time: '10:00 AM IST',
      end_time: '02:00 PM IST',
      duration: '4 Hours (Live + Lab)',
      mode: 'Hybrid (Bangalore Campus + Virtual)',
      status: 'upcoming',
      speaker: JSON.stringify({ name: 'Dr. Vikram Nair', role: 'Robotics Engineer', company: 'AutoSystems India', bio: 'PhD in Mechatronics with expertise in IoT and automation.', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=200&q=80' }),
      topics: JSON.stringify(['Microcontroller Programming: Arduino & ESP32', 'Sensor Fusion, PID Control Algorithms', 'MQTT Protocol & IoT Cloud Integration', 'Industrial PLC Basics & SCADA Systems']),
      what_you_will_learn: JSON.stringify(['Build an autonomous robot using Arduino and sensor inputs', 'Implement real-time PID control for motor systems', 'Connect embedded devices to cloud dashboards via MQTT', 'Design a basic automation workflow']),
      prerequisites: 'Basic electronics and C/C++ fundamentals.',
      registration_url: APPLICATION_FORM_URL,
      seat_capacity: '50 Seats (Lab Limited)',
      seats_remaining: 31,
      badge: 'New Track',
      created_at: '2026-09-12T10:00:00Z',
      updated_at: '2026-09-20T10:00:00Z',
    },
  ];

  const insertWorkshop = db.prepare(`
    INSERT OR IGNORE INTO workshops 
    (id, slug, title, short_title, description, cover_image, date, iso_date, start_time, end_time, duration, mode, status, speaker, topics, what_you_will_learn, prerequisites, registration_url, seat_capacity, seats_remaining, badge, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let workshopsSeeded = 0;
  for (const w of defaultWorkshops) {
    const result = insertWorkshop.run(w.id, w.slug, w.title, w.short_title, w.description, w.cover_image, w.date, w.iso_date, w.start_time, w.end_time, w.duration, w.mode, w.status, w.speaker, w.topics, w.what_you_will_learn, w.prerequisites, w.registration_url, w.seat_capacity, w.seats_remaining, w.badge, w.created_at, w.updated_at);
    if (result.changes > 0) workshopsSeeded++;
  }
  console.log(`[Seed] Workshops: ${workshopsSeeded} seeded, rest already existed.`);

  // ===== SEED MAGAZINES =====
  const defaultMagazines = [
    {
      id: 'mag-01',
      slug: 'the-autonomous-era',
      title: 'The Autonomous Era',
      tagline: 'AI Agents, Autonomous Systems & the Future of Engineering',
      issue_number: 'Issue #4 — Q3 2026',
      cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=85',
      published_date: 'September 2026',
      status: 'published',
      description: 'Flagship edition covering the rise of autonomous AI agents, LLM orchestration frameworks, and their transformative impact on the software engineering profession.',
      highlights: JSON.stringify(['The Architecture of Autonomous AI Agents', 'Kubernetes vs Serverless: Choosing the Right Cloud Model', 'Data Science in 2026: Beyond Traditional ML', 'Career Roadmap: Transitioning to AI Engineering']),
      read_url: 'https://drive.google.com/file/sample-mag-04',
      download_url: 'https://drive.google.com/file/sample-mag-04-download',
      pages: 48,
      articles_count: 12,
      created_at: '2026-09-01T10:00:00Z',
      updated_at: '2026-09-15T10:00:00Z',
    },
    {
      id: 'mag-02',
      slug: 'cloud-native-engineering',
      title: 'Cloud-Native Engineering',
      tagline: 'Microservices, Kubernetes, and the Modern Infrastructure Playbook',
      issue_number: 'Issue #3 — Q2 2026',
      cover_image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=800&q=85',
      published_date: 'June 2026',
      status: 'published',
      description: 'A deep-dive into building, scaling, and operating cloud-native applications using Kubernetes, service meshes, and GitOps.',
      highlights: JSON.stringify(['Microservices Patterns That Actually Scale', 'Service Mesh Comparison: Istio vs Linkerd', 'GitOps in Production with Argo CD', 'FinOps: Optimizing Cloud Costs at Scale']),
      read_url: 'https://drive.google.com/file/sample-mag-03',
      download_url: 'https://drive.google.com/file/sample-mag-03-download',
      pages: 44,
      articles_count: 10,
      created_at: '2026-06-01T10:00:00Z',
      updated_at: '2026-06-15T10:00:00Z',
    },
  ];

  const insertMagazine = db.prepare(`
    INSERT OR IGNORE INTO magazines
    (id, slug, title, tagline, issue_number, cover_image, published_date, status, description, highlights, read_url, download_url, pages, articles_count, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let magazinesSeeded = 0;
  for (const m of defaultMagazines) {
    const result = insertMagazine.run(m.id, m.slug, m.title, m.tagline, m.issue_number, m.cover_image, m.published_date, m.status, m.description, m.highlights, m.read_url, m.download_url, m.pages, m.articles_count, m.created_at, m.updated_at);
    if (result.changes > 0) magazinesSeeded++;
  }
  console.log(`[Seed] Magazines: ${magazinesSeeded} seeded, rest already existed.`);

  // ===== SEED ARTICLES =====
  const defaultArticles = [
    {
      id: 'art-01',
      slug: 'getting-started-react-internship',
      title: 'Getting Started with Your Frontend React Internship',
      excerpt: 'A comprehensive onboarding guide for new React interns — toolchain setup, component architecture, and GitHub workflows.',
      content: 'Full content of the article about React internship guidance...',
      cover_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
      author: JSON.stringify({ name: 'SSG Engineering Team', role: 'Lead Mentor', avatar: '' }),
      tags: JSON.stringify(['React', 'Frontend', 'Internship Guide', 'Getting Started']),
      status: 'published',
      category: 'Internship Guide',
      read_time: '8 min read',
      published_at: '2026-09-15T10:00:00Z',
      created_at: '2026-09-14T10:00:00Z',
      updated_at: '2026-09-15T10:00:00Z',
    },
    {
      id: 'art-02',
      slug: 'building-production-node-api',
      title: 'Building a Production-Grade Node.js REST API',
      excerpt: 'From Express setup to PostgreSQL, JWT authentication, rate limiting, and Dockerized deployment — a complete Node.js backend guide.',
      content: 'Full content about building Node.js APIs...',
      cover_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
      author: JSON.stringify({ name: 'SSG Engineering Team', role: 'Backend Architect', avatar: '' }),
      tags: JSON.stringify(['Node.js', 'Backend', 'REST API', 'PostgreSQL', 'Docker']),
      status: 'published',
      category: 'Technical Guide',
      read_time: '12 min read',
      published_at: '2026-09-10T10:00:00Z',
      created_at: '2026-09-09T10:00:00Z',
      updated_at: '2026-09-10T10:00:00Z',
    },
    {
      id: 'art-03',
      slug: 'data-science-internship-roadmap',
      title: 'The Complete Data Science Internship Roadmap',
      excerpt: 'From Python fundamentals to machine learning models, data visualization, and deployment — everything you need to succeed.',
      content: 'Full content about data science roadmap...',
      cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      author: JSON.stringify({ name: 'SSG Data Science Team', role: 'ML Engineer', avatar: '' }),
      tags: JSON.stringify(['Data Science', 'Machine Learning', 'Python', 'Roadmap']),
      status: 'published',
      category: 'Roadmap',
      read_time: '15 min read',
      published_at: '2026-09-05T10:00:00Z',
      created_at: '2026-09-04T10:00:00Z',
      updated_at: '2026-09-05T10:00:00Z',
    },
  ];

  const insertArticle = db.prepare(`
    INSERT OR IGNORE INTO articles
    (id, slug, title, excerpt, content, cover_image, author, tags, status, category, read_time, published_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  let articlesSeeded = 0;
  for (const a of defaultArticles) {
    const result = insertArticle.run(a.id, a.slug, a.title, a.excerpt, a.content, a.cover_image, a.author, a.tags, a.status, a.category, a.read_time, a.published_at, a.created_at, a.updated_at);
    if (result.changes > 0) articlesSeeded++;
  }
  console.log(`[Seed] Articles: ${articlesSeeded} seeded, rest already existed.`);

  // ===== SEED INITIAL ACTIVITY LOG =====
  const existingActivity = db.prepare('SELECT COUNT(*) as count FROM activity_logs').get();
  if (existingActivity.count === 0) {
    const insertActivity = db.prepare(`
      INSERT OR IGNORE INTO activity_logs (id, action, details, entity_type, admin_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    insertActivity.run('act-seed-01', 'System initialized', 'Centralized database and API layer activated. All content migrated to SQLite.', 'System', 'admin_001', new Date(Date.now() - 3600000).toISOString());
    insertActivity.run('act-seed-02', 'Workshops synchronized', 'Seeded 5 active workshops across AI, Cloud, React, Security, and Mechatronics tracks.', 'Workshop', 'admin_001', new Date(Date.now() - 7200000).toISOString());
    insertActivity.run('act-seed-03', 'Magazine published', 'Flagship Edition "The Autonomous Era" available in public magazine section.', 'Magazine', 'admin_001', new Date(Date.now() - 86400000).toISOString());
    console.log('[Seed] Activity log initialized.');
  }

  console.log('[Seed] Database seed complete.');
}

export default seedDatabase;
