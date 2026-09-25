/**
 * SkillSet Go EduTech - Centralized API Routes
 * Authentication, Content CRUD, Analytics, Verification Portal
 * All routes are database-backed. No localStorage. No in-memory arrays for persistence.
 */

import express from 'express';
import { createHash } from 'crypto';
import getDb from '../db/database.js';

const router = express.Router();

// Active Server-Sent Events clients for real-time cross-device updates
const sseClients = new Set();

export function broadcastChange(type, details = {}) {
  const payload = JSON.stringify({
    type,
    details,
    timestamp: new Date().toISOString()
  });
  for (const client of sseClients) {
    try {
      client.write(`event: ssg_change\ndata: ${payload}\n\n`);
    } catch {
      sseClients.delete(client);
    }
  }
}

// SSE endpoint for global cross-device synchronization
router.get('/realtime/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  if (typeof res.flushHeaders === 'function') {
    res.flushHeaders();
  }

  sseClients.add(res);
  res.write(`event: ssg_connected\ndata: ${JSON.stringify({ status: 'connected', time: new Date().toISOString() })}\n\n`);

  const keepAlive = setInterval(() => {
    try {
      res.write(': keepalive\n\n');
    } catch {
      clearInterval(keepAlive);
      sseClients.delete(res);
    }
  }, 20000);

  req.on('close', () => {
    clearInterval(keepAlive);
    sseClients.delete(res);
  });
});

// ============================================================
// UTILITY HELPERS
// ============================================================

function generateId(prefix = 'id') {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
}

function nowIso() {
  return new Date().toISOString();
}

function parseJsonField(val) {
  if (!val) return null;
  if (typeof val !== 'string') return val;
  try { return JSON.parse(val); } catch { return val; }
}

function workshopRowToObj(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    shortTitle: row.short_title,
    description: row.description,
    coverImage: row.cover_image,
    date: row.date,
    isoDate: row.iso_date,
    startTime: row.start_time,
    endTime: row.end_time,
    duration: row.duration,
    mode: row.mode,
    status: row.status,
    speaker: parseJsonField(row.speaker),
    topics: parseJsonField(row.topics),
    whatYouWillLearn: parseJsonField(row.what_you_will_learn),
    prerequisites: row.prerequisites,
    registrationUrl: row.registration_url,
    seatCapacity: row.seat_capacity,
    seatsRemaining: row.seats_remaining,
    badge: row.badge,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function announcementRowToObj(row) {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    shortDescription: row.short_description,
    content: row.content,
    status: row.status,
    priority: row.priority,
    ctaText: row.cta_text,
    ctaUrl: row.cta_url,
    publishedAt: row.published_at,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function magazineRowToObj(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    issueNumber: row.issue_number,
    coverImage: row.cover_image,
    publishedDate: row.published_date,
    status: row.status,
    description: row.description,
    highlights: parseJsonField(row.highlights),
    readUrl: row.read_url,
    downloadUrl: row.download_url,
    pages: row.pages,
    articlesCount: row.articles_count,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function articleRowToObj(row) {
  if (!row) return null;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.cover_image,
    author: parseJsonField(row.author),
    tags: parseJsonField(row.tags),
    status: row.status,
    category: row.category,
    readTime: row.read_time,
    publishedAt: row.published_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Log an admin activity (does not require auth - called internally)
function logActivity(db, action, details, entityType = 'General', entityId = null, adminId = null) {
  try {
    db.prepare(`
      INSERT INTO activity_logs (id, action, details, entity_type, entity_id, admin_id, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(generateId('act'), action, details, entityType, entityId, adminId, nowIso());

    // Broadcast change to all connected clients in real time
    broadcastChange(entityType.toLowerCase(), { action, entityId });
  } catch (e) {
    console.warn('[API] Activity log failed:', e.message);
  }
}

// Middleware: verify admin session token from Authorization header
function requireAdmin(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Authentication required.' });
  }

  const db = getDb();
  const session = db.prepare(
    'SELECT * FROM admin_sessions WHERE token = ? AND expires_at > ?'
  ).get(token, nowIso());

  if (!session) {
    return res.status(401).json({ success: false, error: 'Session expired or invalid. Please log in again.' });
  }

  req.adminId = session.admin_id;
  req.sessionToken = token;
  next();
}

// ============================================================
// AUTH ROUTES
// ============================================================

/**
 * POST /api/admin/login
 * Validates admin credentials against database and issues a session token
 */
router.post('/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required.' });
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPassword = String(password).trim();

  const db = getDb();

  // Hash incoming password same way as stored
  const passwordHash = createHash('sha256').update(cleanPassword + 'ssg_salt_2026').digest('hex');

  // Also check against env-based credentials (for backward compat during migration)
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@skillsetgo.com').toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@SSG2026!';
  
  const envPasswordHash = createHash('sha256').update(adminPassword + 'ssg_salt_2026').digest('hex');

  let admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(cleanEmail);

  // If admin not in DB but env matches, use env credentials
  if (!admin && cleanEmail === adminEmail && cleanPassword === adminPassword) {
    // Auto-create admin in DB on first login
    try {
      db.prepare(`
        INSERT OR IGNORE INTO admins (id, email, name, role, password_hash)
        VALUES (?, ?, ?, ?, ?)
      `).run('admin_001', adminEmail, 'EduTech Administrator', 'Super Administrator', envPasswordHash);
      admin = db.prepare('SELECT * FROM admins WHERE email = ?').get(cleanEmail);
    } catch (e) {
      // continue
    }
  }

  if (!admin) {
    return res.status(401).json({ success: false, error: 'Invalid administrator credentials.' });
  }

  // Verify password hash
  if (admin.password_hash !== passwordHash) {
    return res.status(401).json({ success: false, error: 'Invalid administrator credentials.' });
  }

  // Issue session token (valid 8 hours)
  const token = 'ssg_srv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 12);
  const expiresAt = new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString();

  // Clean expired sessions first
  db.prepare('DELETE FROM admin_sessions WHERE expires_at < ?').run(nowIso());

  db.prepare(`
    INSERT INTO admin_sessions (token, admin_id, expires_at, created_at)
    VALUES (?, ?, ?, ?)
  `).run(token, admin.id, expiresAt, nowIso());

  // Update last login
  db.prepare('UPDATE admins SET last_login_at = ?, updated_at = ? WHERE id = ?')
    .run(nowIso(), nowIso(), admin.id);

  logActivity(db, 'Admin login', `Administrator "${admin.email}" signed in.`, 'Auth', admin.id, admin.id);

  res.json({
    success: true,
    token,
    expiresAt,
    user: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  });
});

/**
 * POST /api/admin/logout
 */
router.post('/admin/logout', requireAdmin, (req, res) => {
  const db = getDb();
  db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(req.sessionToken);
  logActivity(db, 'Admin logout', 'Administrator signed out.', 'Auth', null, req.adminId);
  res.json({ success: true });
});

/**
 * GET /api/admin/verify
 * Verify if a session token is still valid (used by frontend on load)
 */
router.get('/admin/verify', requireAdmin, (req, res) => {
  const db = getDb();
  const admin = db.prepare('SELECT id, email, name, role FROM admins WHERE id = ?').get(req.adminId);
  res.json({ success: true, user: admin });
});

// ============================================================
// CONTENT ROUTES — ANNOUNCEMENTS / UPDATES
// ============================================================

router.get('/content/updates', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM announcements ORDER BY created_at DESC').all();
  res.json({ success: true, data: rows.map(announcementRowToObj) });
});

router.get('/content/updates/published', (req, res) => {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM announcements WHERE status = 'published' ORDER BY created_at DESC").all();
  res.json({ success: true, data: rows.map(announcementRowToObj) });
});

router.get('/content/updates/:id', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT * FROM announcements WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ success: false, error: 'Announcement not found.' });
  res.json({ success: true, data: announcementRowToObj(row) });
});

router.post('/content/updates', requireAdmin, (req, res) => {
  const db = getDb();
  const { title, shortDescription, content, status, priority, ctaText, ctaUrl, expiresAt } = req.body;

  if (!title || !shortDescription) {
    return res.status(400).json({ success: false, error: 'Title and shortDescription are required.' });
  }

  const id = generateId('upd');
  const now = nowIso();
  const publishedAt = status === 'published' ? now : null;

  db.prepare(`
    INSERT INTO announcements (id, title, short_description, content, status, priority, cta_text, cta_url, published_at, expires_at, created_by, updated_by, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, title, shortDescription, content || null, status || 'draft', priority || 'normal', ctaText || null, ctaUrl || null, publishedAt, expiresAt || null, req.adminId, req.adminId, now, now);

  const row = db.prepare('SELECT * FROM announcements WHERE id = ?').get(id);
  logActivity(db, 'Announcement created', `Created announcement: "${title}"`, 'Announcement', id, req.adminId);
  res.status(201).json({ success: true, data: announcementRowToObj(row) });
});

router.put('/content/updates/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM announcements WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, error: 'Announcement not found.' });

  const { title, shortDescription, content, status, priority, ctaText, ctaUrl, expiresAt } = req.body;
  const now = nowIso();

  let publishedAt = existing.published_at;
  if (status === 'published' && !publishedAt) publishedAt = now;

  db.prepare(`
    UPDATE announcements SET
      title = ?, short_description = ?, content = ?, status = ?, priority = ?,
      cta_text = ?, cta_url = ?, published_at = ?, expires_at = ?, updated_by = ?, updated_at = ?
    WHERE id = ?
  `).run(
    title ?? existing.title,
    shortDescription ?? existing.short_description,
    content ?? existing.content,
    status ?? existing.status,
    priority ?? existing.priority,
    ctaText ?? existing.cta_text,
    ctaUrl ?? existing.cta_url,
    publishedAt,
    expiresAt ?? existing.expires_at,
    req.adminId,
    now,
    req.params.id
  );

  const updated = db.prepare('SELECT * FROM announcements WHERE id = ?').get(req.params.id);
  logActivity(db, 'Announcement updated', `Updated announcement: "${updated.title}"`, 'Announcement', req.params.id, req.adminId);
  res.json({ success: true, data: announcementRowToObj(updated) });
});

router.delete('/content/updates/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT title FROM announcements WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, error: 'Announcement not found.' });

  db.prepare('DELETE FROM announcements WHERE id = ?').run(req.params.id);
  logActivity(db, 'Announcement deleted', `Deleted announcement: "${existing.title}"`, 'Announcement', req.params.id, req.adminId);
  res.json({ success: true });
});

// ============================================================
// CONTENT ROUTES — WORKSHOPS
// ============================================================

router.get('/content/workshops', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM workshops ORDER BY iso_date ASC, created_at DESC').all();
  res.json({ success: true, data: rows.map(workshopRowToObj) });
});

router.get('/content/workshops/public', (req, res) => {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM workshops WHERE status != 'draft' AND status != 'archived' ORDER BY iso_date ASC, created_at DESC").all();
  res.json({ success: true, data: rows.map(workshopRowToObj) });
});

router.get('/content/workshops/:slugOrId', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT * FROM workshops WHERE slug = ? OR id = ?').get(req.params.slugOrId, req.params.slugOrId);
  if (!row) return res.status(404).json({ success: false, error: 'Workshop not found.' });
  res.json({ success: true, data: workshopRowToObj(row) });
});

router.post('/content/workshops', requireAdmin, (req, res) => {
  const db = getDb();
  const { title, shortTitle, description, coverImage, date, isoDate, startTime, endTime, duration, mode, status, speaker, topics, whatYouWillLearn, prerequisites, registrationUrl, seatCapacity, seatsRemaining, badge } = req.body;

  if (!title) return res.status(400).json({ success: false, error: 'Title is required.' });

  const id = generateId('ws');
  const slug = (req.body.slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const now = nowIso();

  // Ensure slug uniqueness
  let finalSlug = slug;
  let attempt = 0;
  while (db.prepare('SELECT id FROM workshops WHERE slug = ?').get(finalSlug)) {
    attempt++;
    finalSlug = slug + '-' + attempt;
  }

  db.prepare(`
    INSERT INTO workshops (id, slug, title, short_title, description, cover_image, date, iso_date, start_time, end_time, duration, mode, status, speaker, topics, what_you_will_learn, prerequisites, registration_url, seat_capacity, seats_remaining, badge, created_by, updated_by, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, finalSlug, title, shortTitle || null, description || null, coverImage || null, date || null, isoDate || null, startTime || null, endTime || null, duration || null, mode || null, status || 'upcoming', JSON.stringify(speaker) || null, JSON.stringify(topics) || null, JSON.stringify(whatYouWillLearn) || null, prerequisites || null, registrationUrl || null, seatCapacity || null, seatsRemaining ?? null, badge || null, req.adminId, req.adminId, now, now);

  const row = db.prepare('SELECT * FROM workshops WHERE id = ?').get(id);
  logActivity(db, 'Workshop created', `Created new workshop: "${title}"`, 'Workshop', id, req.adminId);
  res.status(201).json({ success: true, data: workshopRowToObj(row) });
});

router.put('/content/workshops/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM workshops WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, error: 'Workshop not found.' });

  const b = req.body;
  const now = nowIso();

  db.prepare(`
    UPDATE workshops SET
      title = ?, short_title = ?, description = ?, cover_image = ?, date = ?, iso_date = ?,
      start_time = ?, end_time = ?, duration = ?, mode = ?, status = ?,
      speaker = ?, topics = ?, what_you_will_learn = ?, prerequisites = ?,
      registration_url = ?, seat_capacity = ?, seats_remaining = ?, badge = ?,
      updated_by = ?, updated_at = ?
    WHERE id = ?
  `).run(
    b.title ?? existing.title,
    b.shortTitle ?? existing.short_title,
    b.description ?? existing.description,
    b.coverImage ?? existing.cover_image,
    b.date ?? existing.date,
    b.isoDate ?? existing.iso_date,
    b.startTime ?? existing.start_time,
    b.endTime ?? existing.end_time,
    b.duration ?? existing.duration,
    b.mode ?? existing.mode,
    b.status ?? existing.status,
    b.speaker !== undefined ? JSON.stringify(b.speaker) : existing.speaker,
    b.topics !== undefined ? JSON.stringify(b.topics) : existing.topics,
    b.whatYouWillLearn !== undefined ? JSON.stringify(b.whatYouWillLearn) : existing.what_you_will_learn,
    b.prerequisites ?? existing.prerequisites,
    b.registrationUrl ?? existing.registration_url,
    b.seatCapacity ?? existing.seat_capacity,
    b.seatsRemaining ?? existing.seats_remaining,
    b.badge ?? existing.badge,
    req.adminId,
    now,
    req.params.id
  );

  const updated = db.prepare('SELECT * FROM workshops WHERE id = ?').get(req.params.id);
  logActivity(db, 'Workshop updated', `Updated workshop: "${updated.title}"`, 'Workshop', req.params.id, req.adminId);
  res.json({ success: true, data: workshopRowToObj(updated) });
});

router.delete('/content/workshops/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT title FROM workshops WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, error: 'Workshop not found.' });

  db.prepare('DELETE FROM workshops WHERE id = ?').run(req.params.id);
  logActivity(db, 'Workshop deleted', `Deleted workshop: "${existing.title}"`, 'Workshop', req.params.id, req.adminId);
  res.json({ success: true });
});

// ============================================================
// CONTENT ROUTES — MAGAZINES
// ============================================================

router.get('/content/magazines', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM magazines ORDER BY created_at DESC').all();
  res.json({ success: true, data: rows.map(magazineRowToObj) });
});

router.get('/content/magazines/public', (req, res) => {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM magazines WHERE status = 'published' ORDER BY created_at DESC").all();
  res.json({ success: true, data: rows.map(magazineRowToObj) });
});

router.get('/content/magazines/:slugOrId', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT * FROM magazines WHERE slug = ? OR id = ?').get(req.params.slugOrId, req.params.slugOrId);
  if (!row) return res.status(404).json({ success: false, error: 'Magazine not found.' });
  res.json({ success: true, data: magazineRowToObj(row) });
});

router.post('/content/magazines', requireAdmin, (req, res) => {
  const db = getDb();
  const { title, tagline, issueNumber, coverImage, publishedDate, status, description, highlights, readUrl, downloadUrl, pages, articlesCount } = req.body;
  if (!title) return res.status(400).json({ success: false, error: 'Title is required.' });

  const id = generateId('mag');
  const slug = (req.body.slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const now = nowIso();

  let finalSlug = slug;
  let attempt = 0;
  while (db.prepare('SELECT id FROM magazines WHERE slug = ?').get(finalSlug)) {
    attempt++;
    finalSlug = slug + '-' + attempt;
  }

  db.prepare(`
    INSERT INTO magazines (id, slug, title, tagline, issue_number, cover_image, published_date, status, description, highlights, read_url, download_url, pages, articles_count, created_by, updated_by, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, finalSlug, title, tagline || null, issueNumber || null, coverImage || null, publishedDate || null, status || 'published', description || null, JSON.stringify(highlights) || null, readUrl || null, downloadUrl || null, pages || null, articlesCount || null, req.adminId, req.adminId, now, now);

  const row = db.prepare('SELECT * FROM magazines WHERE id = ?').get(id);
  logActivity(db, 'Magazine created', `Published new magazine edition: "${title}"`, 'Magazine', id, req.adminId);
  res.status(201).json({ success: true, data: magazineRowToObj(row) });
});

router.put('/content/magazines/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM magazines WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, error: 'Magazine not found.' });

  const b = req.body;
  const now = nowIso();

  db.prepare(`
    UPDATE magazines SET
      title = ?, tagline = ?, issue_number = ?, cover_image = ?, published_date = ?, status = ?,
      description = ?, highlights = ?, read_url = ?, download_url = ?, pages = ?, articles_count = ?,
      updated_by = ?, updated_at = ?
    WHERE id = ?
  `).run(b.title ?? existing.title, b.tagline ?? existing.tagline, b.issueNumber ?? existing.issue_number, b.coverImage ?? existing.cover_image, b.publishedDate ?? existing.published_date, b.status ?? existing.status, b.description ?? existing.description, b.highlights !== undefined ? JSON.stringify(b.highlights) : existing.highlights, b.readUrl ?? existing.read_url, b.downloadUrl ?? existing.download_url, b.pages ?? existing.pages, b.articlesCount ?? existing.articles_count, req.adminId, now, req.params.id);

  const updated = db.prepare('SELECT * FROM magazines WHERE id = ?').get(req.params.id);
  logActivity(db, 'Magazine updated', `Updated magazine edition: "${updated.title}"`, 'Magazine', req.params.id, req.adminId);
  res.json({ success: true, data: magazineRowToObj(updated) });
});

router.delete('/content/magazines/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT title FROM magazines WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, error: 'Magazine not found.' });

  db.prepare('DELETE FROM magazines WHERE id = ?').run(req.params.id);
  logActivity(db, 'Magazine deleted', `Deleted magazine edition: "${existing.title}"`, 'Magazine', req.params.id, req.adminId);
  res.json({ success: true });
});

// ============================================================
// CONTENT ROUTES — ARTICLES
// ============================================================

router.get('/content/articles', (req, res) => {
  const db = getDb();
  const rows = db.prepare('SELECT * FROM articles ORDER BY published_at DESC, created_at DESC').all();
  res.json({ success: true, data: rows.map(articleRowToObj) });
});

router.get('/content/articles/public', (req, res) => {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM articles WHERE status = 'published' ORDER BY published_at DESC").all();
  res.json({ success: true, data: rows.map(articleRowToObj) });
});

router.get('/content/articles/:slugOrId', (req, res) => {
  const db = getDb();
  const row = db.prepare('SELECT * FROM articles WHERE slug = ? OR id = ?').get(req.params.slugOrId, req.params.slugOrId);
  if (!row) return res.status(404).json({ success: false, error: 'Article not found.' });
  res.json({ success: true, data: articleRowToObj(row) });
});

router.post('/content/articles', requireAdmin, (req, res) => {
  const db = getDb();
  const { title, excerpt, content, coverImage, author, tags, status, category, readTime, publishedAt } = req.body;
  if (!title) return res.status(400).json({ success: false, error: 'Title is required.' });

  const id = generateId('art');
  const slug = (req.body.slug || title).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const now = nowIso();

  let finalSlug = slug;
  let attempt = 0;
  while (db.prepare('SELECT id FROM articles WHERE slug = ?').get(finalSlug)) {
    attempt++;
    finalSlug = slug + '-' + attempt;
  }

  const pubAt = status === 'published' ? (publishedAt || now) : null;

  db.prepare(`
    INSERT INTO articles (id, slug, title, excerpt, content, cover_image, author, tags, status, category, read_time, published_at, created_by, updated_by, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, finalSlug, title, excerpt || null, content || null, coverImage || null, JSON.stringify(author) || null, JSON.stringify(tags) || null, status || 'published', category || null, readTime || null, pubAt, req.adminId, req.adminId, now, now);

  const row = db.prepare('SELECT * FROM articles WHERE id = ?').get(id);
  logActivity(db, 'Article created', `Published new article: "${title}"`, 'Article', id, req.adminId);
  res.status(201).json({ success: true, data: articleRowToObj(row) });
});

router.put('/content/articles/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, error: 'Article not found.' });

  const b = req.body;
  const now = nowIso();
  let publishedAt = existing.published_at;
  if (b.status === 'published' && !publishedAt) publishedAt = now;

  db.prepare(`
    UPDATE articles SET
      title = ?, excerpt = ?, content = ?, cover_image = ?, author = ?, tags = ?,
      status = ?, category = ?, read_time = ?, published_at = ?,
      updated_by = ?, updated_at = ?
    WHERE id = ?
  `).run(b.title ?? existing.title, b.excerpt ?? existing.excerpt, b.content ?? existing.content, b.coverImage ?? existing.cover_image, b.author !== undefined ? JSON.stringify(b.author) : existing.author, b.tags !== undefined ? JSON.stringify(b.tags) : existing.tags, b.status ?? existing.status, b.category ?? existing.category, b.readTime ?? existing.read_time, publishedAt, req.adminId, now, req.params.id);

  const updated = db.prepare('SELECT * FROM articles WHERE id = ?').get(req.params.id);
  logActivity(db, 'Article updated', `Updated article: "${updated.title}"`, 'Article', req.params.id, req.adminId);
  res.json({ success: true, data: articleRowToObj(updated) });
});

router.delete('/content/articles/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT title FROM articles WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, error: 'Article not found.' });

  db.prepare('DELETE FROM articles WHERE id = ?').run(req.params.id);
  logActivity(db, 'Article deleted', `Deleted article: "${existing.title}"`, 'Article', req.params.id, req.adminId);
  res.json({ success: true });
});

// ============================================================
// ACTIVITY LOG ROUTES
// ============================================================

router.get('/admin/activity', requireAdmin, (req, res) => {
  const db = getDb();
  const limit = parseInt(req.query.limit) || 50;
  const rows = db.prepare('SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT ?').all(limit);
  res.json({ success: true, data: rows });
});

// ============================================================
// ANALYTICS ROUTES
// ============================================================

router.post('/analytics/track', (req, res) => {
  const db = getDb();
  const { internshipSlug, internshipName, internshipId, sourcePage, referrer, device } = req.body;

  const id = generateId('evt');
  const now = nowIso();

  db.prepare(`
    INSERT INTO application_clicks (id, internship_slug, internship_name, internship_id, source_page, referrer, screen_width, user_agent, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, internshipSlug || 'general', internshipName || 'General', internshipId || internshipSlug || 'general', sourcePage || '/', referrer || 'direct', device?.screenWidth || null, device?.userAgent || null, now);

  broadcastChange('analytics', { id, internshipSlug });

  res.json({ success: true, eventId: id });
});

router.get('/analytics/clicks', requireAdmin, (req, res) => {
  const db = getDb();
  const { range } = req.query; // 'today' | '7days' | '30days' | 'all'

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  // All clicks
  const allClicks = db.prepare('SELECT * FROM application_clicks ORDER BY created_at DESC').all();

  // Filtered by range
  let filtered = allClicks;
  if (range === 'today') filtered = allClicks.filter(c => c.created_at >= todayStart);
  else if (range === '7days') filtered = allClicks.filter(c => c.created_at >= sevenDaysAgo);
  else if (range === '30days') filtered = allClicks.filter(c => c.created_at >= thirtyDaysAgo);

  const totalClicks = allClicks.length;
  const clicksToday = allClicks.filter(c => c.created_at >= todayStart).length;
  const clicks7Days = allClicks.filter(c => c.created_at >= sevenDaysAgo).length;
  const clicks30Days = allClicks.filter(c => c.created_at >= thirtyDaysAgo).length;

  // By internship
  const byInternshipMap = {};
  filtered.forEach(c => {
    const key = c.internship_name || c.internship_slug || 'General Application';
    if (!byInternshipMap[key]) {
      byInternshipMap[key] = { name: key, slug: c.internship_slug || 'general', count: 0, lastClick: c.created_at };
    }
    byInternshipMap[key].count++;
    if (c.created_at > byInternshipMap[key].lastClick) byInternshipMap[key].lastClick = c.created_at;
  });
  const byInternship = Object.values(byInternshipMap).sort((a, b) => b.count - a.count);

  // By source page
  const bySourceMap = {};
  filtered.forEach(c => {
    const page = c.source_page || '/';
    bySourceMap[page] = (bySourceMap[page] || 0) + 1;
  });
  const bySource = Object.entries(bySourceMap).map(([page, count]) => ({ page, count })).sort((a, b) => b.count - a.count);

  // Daily trend (last 7 days)
  const dailyTrend = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString();
    const dayEnd = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1).toISOString();
    const count = allClicks.filter(c => c.created_at >= dayStart && c.created_at < dayEnd).length;
    dailyTrend.push({ date: dayLabel, count });
  }

  res.json({
    success: true,
    totalClicks,
    clicksToday,
    clicks7Days,
    clicks30Days,
    byInternship,
    bySource,
    dailyTrend,
    rawClicks: filtered.slice(0, 100),
  });
});

// ============================================================
// VERIFICATION PORTAL ROUTES
// ============================================================

// Public: check status of verification portal
router.get('/verification/status', (req, res) => {
  res.json({
    success: true,
    portalStatus: 'under_development',
    developmentDeadline: '2026-10-20T00:00:00Z',
    publicRelease: '2026-10-28T00:00:00Z',
    message: 'The SkillSet Go EduTech Verification Portal is currently under development.',
  });
});

// Public: get count of verification records (for display)
router.get('/verification/stats', (req, res) => {
  const db = getDb();
  const total = db.prepare('SELECT COUNT(*) as count FROM verification_records').get().count;
  const valid = db.prepare("SELECT COUNT(*) as count FROM verification_records WHERE status = 'VALID'").get().count;
  const revoked = db.prepare("SELECT COUNT(*) as count FROM verification_records WHERE status = 'REVOKED'").get().count;
  const pending = db.prepare("SELECT COUNT(*) as count FROM verification_records WHERE status = 'PENDING'").get().count;
  res.json({ success: true, total, valid, revoked, pending });
});

// Admin: list verification records
router.get('/verification/records', requireAdmin, (req, res) => {
  const db = getDb();
  const { search, status } = req.query;
  let query = 'SELECT * FROM verification_records';
  const params = [];
  const conditions = [];

  if (status) { conditions.push('status = ?'); params.push(status); }
  if (search) {
    conditions.push('(holder_name LIKE ? OR verification_id LIKE ?)');
    params.push('%' + search + '%', '%' + search + '%');
  }

  if (conditions.length > 0) query += ' WHERE ' + conditions.join(' AND ');
  query += ' ORDER BY created_at DESC';

  const rows = db.prepare(query).all(...params);
  res.json({ success: true, data: rows });
});

// Admin: create verification record
router.post('/verification/records', requireAdmin, (req, res) => {
  const db = getDb();
  const { verificationId, documentType, holderName, domain, issueDate, expiryDate, status, certificateUrl, documentReference, metadata } = req.body;

  if (!verificationId || !documentType || !holderName) {
    return res.status(400).json({ success: false, error: 'verificationId, documentType, and holderName are required.' });
  }

  const existing = db.prepare('SELECT id FROM verification_records WHERE verification_id = ?').get(verificationId);
  if (existing) return res.status(409).json({ success: false, error: 'A record with this verification ID already exists.' });

  const id = generateId('vrf');
  const now = nowIso();

  db.prepare(`
    INSERT INTO verification_records (id, verification_id, document_type, holder_name, domain, issue_date, expiry_date, status, certificate_url, document_reference, metadata, created_by, updated_by, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, verificationId, documentType, holderName, domain || null, issueDate || null, expiryDate || null, status || 'VALID', certificateUrl || null, documentReference || null, metadata ? JSON.stringify(metadata) : null, req.adminId, req.adminId, now, now);

  logActivity(db, 'Verification record created', `Created verification record for "${holderName}" (${verificationId})`, 'Verification', id, req.adminId);
  const row = db.prepare('SELECT * FROM verification_records WHERE id = ?').get(id);
  res.status(201).json({ success: true, data: row });
});

// Admin: update verification record
router.put('/verification/records/:id', requireAdmin, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM verification_records WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, error: 'Verification record not found.' });

  const b = req.body;
  const now = nowIso();

  db.prepare(`
    UPDATE verification_records SET
      document_type = ?, holder_name = ?, domain = ?, issue_date = ?, expiry_date = ?,
      status = ?, certificate_url = ?, document_reference = ?, metadata = ?,
      updated_by = ?, updated_at = ?
    WHERE id = ?
  `).run(b.documentType ?? existing.document_type, b.holderName ?? existing.holder_name, b.domain ?? existing.domain, b.issueDate ?? existing.issue_date, b.expiryDate ?? existing.expiry_date, b.status ?? existing.status, b.certificateUrl ?? existing.certificate_url, b.documentReference ?? existing.document_reference, b.metadata !== undefined ? JSON.stringify(b.metadata) : existing.metadata, req.adminId, now, req.params.id);

  logActivity(db, 'Verification record updated', `Updated record for "${existing.holder_name}" (${existing.verification_id})`, 'Verification', req.params.id, req.adminId);
  const updated = db.prepare('SELECT * FROM verification_records WHERE id = ?').get(req.params.id);
  res.json({ success: true, data: updated });
});

// Admin: revoke
router.post('/verification/records/:id/revoke', requireAdmin, (req, res) => {
  const db = getDb();
  const existing = db.prepare('SELECT * FROM verification_records WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ success: false, error: 'Verification record not found.' });

  db.prepare("UPDATE verification_records SET status = 'REVOKED', updated_by = ?, updated_at = ? WHERE id = ?")
    .run(req.adminId, nowIso(), req.params.id);

  logActivity(db, 'Verification record revoked', `Revoked credential for "${existing.holder_name}" (${existing.verification_id})`, 'Verification', req.params.id, req.adminId);
  res.json({ success: true });
});

export default router;
