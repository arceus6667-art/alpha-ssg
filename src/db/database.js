/**
 * SkillSet Go EduTech - Centralized SQLite Database Layer
 * Single source of truth: all admin content, activity logs, analytics, and verification records.
 * Database file: data/ssg.db (server-side, persisted across restarts)
 */

import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_DIR = path.join(__dirname, '../../data');
const DB_PATH = path.join(DB_DIR, 'ssg.db');

// Ensure the data directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

let db;

export function getDb() {
  if (!db) {
    db = new Database(DB_PATH, { verbose: null });
    // Enable WAL mode for better concurrent read performance
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    initializeSchema();
  }
  return db;
}

function initializeSchema() {
  const database = db;

  // === ADMINS TABLE ===
  database.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'Super Administrator',
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now')),
      last_login_at TEXT
    );
  `);

  // === ANNOUNCEMENTS / UPDATES TABLE ===
  database.exec(`
    CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      short_description TEXT NOT NULL,
      content TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      priority TEXT NOT NULL DEFAULT 'normal',
      cta_text TEXT,
      cta_url TEXT,
      published_at TEXT,
      expires_at TEXT,
      created_by TEXT,
      updated_by TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // === WORKSHOPS TABLE ===
  database.exec(`
    CREATE TABLE IF NOT EXISTS workshops (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      short_title TEXT,
      description TEXT,
      cover_image TEXT,
      date TEXT,
      iso_date TEXT,
      start_time TEXT,
      end_time TEXT,
      duration TEXT,
      mode TEXT,
      status TEXT NOT NULL DEFAULT 'upcoming',
      speaker TEXT,
      topics TEXT,
      what_you_will_learn TEXT,
      prerequisites TEXT,
      registration_url TEXT,
      seat_capacity TEXT,
      seats_remaining INTEGER,
      badge TEXT,
      created_by TEXT,
      updated_by TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // === MAGAZINES TABLE ===
  database.exec(`
    CREATE TABLE IF NOT EXISTS magazines (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      tagline TEXT,
      issue_number TEXT,
      cover_image TEXT,
      published_date TEXT,
      status TEXT NOT NULL DEFAULT 'published',
      description TEXT,
      highlights TEXT,
      read_url TEXT,
      download_url TEXT,
      pages INTEGER,
      articles_count INTEGER,
      created_by TEXT,
      updated_by TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // === ARTICLES TABLE ===
  database.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT,
      cover_image TEXT,
      author TEXT,
      tags TEXT,
      status TEXT NOT NULL DEFAULT 'published',
      category TEXT,
      read_time TEXT,
      published_at TEXT,
      created_by TEXT,
      updated_by TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // === ACTIVITY LOGS TABLE ===
  database.exec(`
    CREATE TABLE IF NOT EXISTS activity_logs (
      id TEXT PRIMARY KEY,
      action TEXT NOT NULL,
      details TEXT,
      entity_type TEXT,
      entity_id TEXT,
      admin_id TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
  `);

  // === APPLICATION CLICK ANALYTICS TABLE ===
  database.exec(`
    CREATE TABLE IF NOT EXISTS application_clicks (
      id TEXT PRIMARY KEY,
      internship_slug TEXT,
      internship_name TEXT,
      internship_id TEXT,
      source_page TEXT,
      referrer TEXT,
      screen_width INTEGER,
      user_agent TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_application_clicks_created_at ON application_clicks(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_application_clicks_slug ON application_clicks(internship_slug);
  `);

  // === VERIFICATION RECORDS TABLE ===
  database.exec(`
    CREATE TABLE IF NOT EXISTS verification_records (
      id TEXT PRIMARY KEY,
      verification_id TEXT UNIQUE NOT NULL,
      document_type TEXT NOT NULL,
      holder_name TEXT NOT NULL,
      domain TEXT,
      issue_date TEXT,
      expiry_date TEXT,
      status TEXT NOT NULL DEFAULT 'VALID',
      certificate_url TEXT,
      document_reference TEXT,
      metadata TEXT,
      created_by TEXT,
      updated_by TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_verification_id ON verification_records(verification_id);
    CREATE INDEX IF NOT EXISTS idx_verification_holder ON verification_records(holder_name);
    CREATE INDEX IF NOT EXISTS idx_verification_status ON verification_records(status);
  `);

  // === SITE SETTINGS TABLE ===
  database.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT,
      updated_by TEXT,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // === ADMIN SESSIONS TABLE ===
  database.exec(`
    CREATE TABLE IF NOT EXISTS admin_sessions (
      token TEXT PRIMARY KEY,
      admin_id TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);
  `);
}

export default getDb;
