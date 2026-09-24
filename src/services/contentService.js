/**
 * SkillSet Go EduTech - Content Repository & Storage Service
 * Unified data layer for Updates, Workshops, Magazines, Articles and Activity Logs.
 * Merges baseline static data with localStorage modifications for real-time CRUD persistence.
 */

import { workshops as defaultWorkshops } from '../data/workshops';
import { magazines as defaultMagazines } from '../data/magazines';
import { articles as defaultArticles } from '../data/articles';

const STORAGE_KEYS = {
  UPDATES: 'ssg_content_updates',
  WORKSHOPS: 'ssg_content_workshops',
  MAGAZINES: 'ssg_content_magazines',
  ARTICLES: 'ssg_content_articles',
  ACTIVITY: 'ssg_admin_activity',
};

// Default initial updates/announcements
const defaultUpdates = [
  {
    id: 'upd-01',
    title: 'October 2026 Cohort Admissions Now Open for All 12 Domains',
    shortDescription: 'Applications for the upcoming monthly project-based internship sprint are officially live. Limited seats available per domain.',
    content: 'We are pleased to announce that registrations for the October 2026 cohort are now officially accepting submissions across all 12 domains, including the newly introduced Mechatronics & Mechanical Engineering pathway. Selected learners will receive weekly milestones, starter templates, and mentor guidance.',
    status: 'published', // 'draft' | 'published' | 'archived'
    priority: 'important', // 'normal' | 'important' | 'urgent'
    ctaText: 'Apply for October Cohort',
    ctaUrl: '/internships',
    publishedAt: '2026-09-22T08:00:00Z',
    expiresAt: '2026-10-31T23:59:59Z',
    createdAt: '2026-09-22T08:00:00Z',
    updatedAt: '2026-09-22T08:00:00Z',
  },
  {
    id: 'upd-02',
    title: 'AI Agents & Kubernetes Masterclasses Scheduled for Weekends',
    shortDescription: 'Join our weekend live masterclasses on building autonomous LLM agents and multi-cloud Kubernetes deployment pipelines.',
    content: 'Two brand new weekend live masterclasses have been added to our schedule. All attendees will receive verified participant certificates and GitHub code repositories.',
    status: 'published',
    priority: 'normal',
    ctaText: 'View Workshops',
    ctaUrl: '/workshops',
    publishedAt: '2026-09-20T10:00:00Z',
    expiresAt: '2026-11-15T23:59:59Z',
    createdAt: '2026-09-20T10:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z',
  },
];

// Helper to safely read from localStorage
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

// Helper to safely write to localStorage
function writeStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('ssg:content_changed', { detail: { key } }));
  } catch (e) {
    console.warn('[ContentService] Storage write failed:', e);
  }
}

export const contentService = {
  // ==========================================
  // UPDATES / ANNOUNCEMENTS
  // ==========================================
  getUpdates() {
    return readStorage(STORAGE_KEYS.UPDATES, defaultUpdates);
  },

  getPublishedUpdates() {
    const all = this.getUpdates();
    return all.filter(u => u.status === 'published');
  },

  getUpdate(id) {
    return this.getUpdates().find(u => u.id === id) || null;
  },

  saveUpdate(update) {
    const updates = this.getUpdates();
    const now = new Date().toISOString();

    if (update.id) {
      const idx = updates.findIndex(u => u.id === update.id);
      if (idx !== -1) {
        updates[idx] = { ...updates[idx], ...update, updatedAt: now };
        writeStorage(STORAGE_KEYS.UPDATES, updates);
        this.logActivity('Update modified', `Updated announcement: "${update.title}"`, 'Update');
        return updates[idx];
      }
    }

    // New item
    const newItem = {
      ...update,
      id: update.id || 'upd_' + Date.now(),
      createdAt: now,
      updatedAt: now,
      status: update.status || 'draft',
      priority: update.priority || 'normal',
    };
    updates.unshift(newItem);
    writeStorage(STORAGE_KEYS.UPDATES, updates);
    this.logActivity('Update created', `Created announcement: "${newItem.title}"`, 'Update');
    return newItem;
  },

  deleteUpdate(id) {
    const updates = this.getUpdates();
    const item = updates.find(u => u.id === id);
    const filtered = updates.filter(u => u.id !== id);
    writeStorage(STORAGE_KEYS.UPDATES, filtered);
    if (item) {
      this.logActivity('Update deleted', `Deleted announcement: "${item.title}"`, 'Update');
    }
    return true;
  },

  // ==========================================
  // WORKSHOPS
  // ==========================================
  getWorkshops() {
    return readStorage(STORAGE_KEYS.WORKSHOPS, defaultWorkshops);
  },

  getPublicWorkshops() {
    return this.getWorkshops().filter(w => w.status !== 'draft' && w.status !== 'archived');
  },

  getWorkshop(slugOrId) {
    return this.getWorkshops().find(w => w.slug === slugOrId || w.id === slugOrId) || null;
  },

  saveWorkshop(workshop) {
    const list = this.getWorkshops();
    const now = new Date().toISOString();

    if (workshop.id) {
      const idx = list.findIndex(w => w.id === workshop.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...workshop, updatedAt: now };
        writeStorage(STORAGE_KEYS.WORKSHOPS, list);
        this.logActivity('Workshop updated', `Updated workshop: "${workshop.title}"`, 'Workshop');
        return list[idx];
      }
    }

    const newItem = {
      ...workshop,
      id: workshop.id || 'ws_' + Date.now(),
      slug: workshop.slug || (workshop.title || 'workshop').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: now,
      updatedAt: now,
      status: workshop.status || 'upcoming',
    };
    list.unshift(newItem);
    writeStorage(STORAGE_KEYS.WORKSHOPS, list);
    this.logActivity('Workshop created', `Created new workshop: "${newItem.title}"`, 'Workshop');
    return newItem;
  },

  deleteWorkshop(id) {
    const list = this.getWorkshops();
    const item = list.find(w => w.id === id);
    const filtered = list.filter(w => w.id !== id);
    writeStorage(STORAGE_KEYS.WORKSHOPS, filtered);
    if (item) {
      this.logActivity('Workshop deleted', `Deleted workshop: "${item.title}"`, 'Workshop');
    }
    return true;
  },

  // ==========================================
  // MAGAZINES
  // ==========================================
  getMagazines() {
    return readStorage(STORAGE_KEYS.MAGAZINES, defaultMagazines);
  },

  getPublicMagazines() {
    return this.getMagazines().filter(m => m.status === 'published');
  },

  getMagazine(slugOrId) {
    return this.getMagazines().find(m => m.slug === slugOrId || m.id === slugOrId) || null;
  },

  saveMagazine(magazine) {
    const list = this.getMagazines();
    const now = new Date().toISOString();

    if (magazine.id) {
      const idx = list.findIndex(m => m.id === magazine.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...magazine, updatedAt: now };
        writeStorage(STORAGE_KEYS.MAGAZINES, list);
        this.logActivity('Magazine updated', `Updated edition: "${magazine.title}"`, 'Magazine');
        return list[idx];
      }
    }

    const newItem = {
      ...magazine,
      id: magazine.id || 'mag_' + Date.now(),
      slug: magazine.slug || (magazine.title || 'edition').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: now,
      updatedAt: now,
      status: magazine.status || 'published',
    };
    list.unshift(newItem);
    writeStorage(STORAGE_KEYS.MAGAZINES, list);
    this.logActivity('Magazine created', `Published new edition: "${newItem.title}"`, 'Magazine');
    return newItem;
  },

  deleteMagazine(id) {
    const list = this.getMagazines();
    const item = list.find(m => m.id === id);
    const filtered = list.filter(m => m.id !== id);
    writeStorage(STORAGE_KEYS.MAGAZINES, filtered);
    if (item) {
      this.logActivity('Magazine deleted', `Deleted edition: "${item.title}"`, 'Magazine');
    }
    return true;
  },

  // ==========================================
  // ARTICLES
  // ==========================================
  getArticles() {
    return readStorage(STORAGE_KEYS.ARTICLES, defaultArticles);
  },

  getPublicArticles() {
    return this.getArticles().filter(a => a.status === 'published');
  },

  getArticle(slugOrId) {
    return this.getArticles().find(a => a.slug === slugOrId || a.id === slugOrId) || null;
  },

  saveArticle(article) {
    const list = this.getArticles();
    const now = new Date().toISOString();

    if (article.id) {
      const idx = list.findIndex(a => a.id === article.id);
      if (idx !== -1) {
        list[idx] = { ...list[idx], ...article, updatedAt: now };
        writeStorage(STORAGE_KEYS.ARTICLES, list);
        this.logActivity('Article updated', `Updated article: "${article.title}"`, 'Article');
        return list[idx];
      }
    }

    const newItem = {
      ...article,
      id: article.id || 'art_' + Date.now(),
      slug: article.slug || (article.title || 'article').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: now,
      updatedAt: now,
      status: article.status || 'published',
    };
    list.unshift(newItem);
    writeStorage(STORAGE_KEYS.ARTICLES, list);
    this.logActivity('Article created', `Published new article: "${newItem.title}"`, 'Article');
    return newItem;
  },

  deleteArticle(id) {
    const list = this.getArticles();
    const item = list.find(a => a.id === id);
    const filtered = list.filter(a => a.id !== id);
    writeStorage(STORAGE_KEYS.ARTICLES, filtered);
    if (item) {
      this.logActivity('Article deleted', `Deleted article: "${item.title}"`, 'Article');
    }
    return true;
  },

  // ==========================================
  // REAL RECENT ACTIVITY LOG
  // ==========================================
  getActivityLog() {
    const fallbackActivities = [
      {
        id: 'act-01',
        action: 'System initialized',
        details: 'Admin content management & click analytics service activated',
        type: 'System',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 'act-02',
        action: 'Workshop synchronized',
        details: 'Verified 5 active workshops across AI, Cloud, React, and Mechatronics',
        type: 'Workshop',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 'act-03',
        action: 'Magazine published',
        details: 'Flagship Edition "The Autonomous Era" published to public magazine section',
        type: 'Magazine',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      }
    ];
    return readStorage(STORAGE_KEYS.ACTIVITY, fallbackActivities);
  },

  logActivity(action, details, type = 'General') {
    const list = this.getActivityLog();
    const entry = {
      id: 'act_' + Date.now(),
      action,
      details,
      type,
      timestamp: new Date().toISOString(),
    };
    list.unshift(entry);
    if (list.length > 50) list.pop();
    writeStorage(STORAGE_KEYS.ACTIVITY, list);
  },

  // ==========================================
  // CLICK ANALYTICS CALCULATION
  // ==========================================
  getClickAnalytics(dateFilter = 'all') {
    let clicks = [];
    try {
      clicks = JSON.parse(localStorage.getItem('ssg_application_clicks') || '[]');
    } catch (e) {
      clicks = [];
    }

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
    const thirtyDaysAgo = now.getTime() - 30 * 24 * 60 * 60 * 1000;

    // Filter by date if requested
    let filteredClicks = clicks;
    if (dateFilter === 'today') {
      filteredClicks = clicks.filter(c => new Date(c.timestamp).getTime() >= todayStart);
    } else if (dateFilter === '7days') {
      filteredClicks = clicks.filter(c => new Date(c.timestamp).getTime() >= sevenDaysAgo);
    } else if (dateFilter === '30days') {
      filteredClicks = clicks.filter(c => new Date(c.timestamp).getTime() >= thirtyDaysAgo);
    }

    // Counts
    const totalClicks = clicks.length;
    const clicksToday = clicks.filter(c => new Date(c.timestamp).getTime() >= todayStart).length;
    const clicks7Days = clicks.filter(c => new Date(c.timestamp).getTime() >= sevenDaysAgo).length;
    const clicks30Days = clicks.filter(c => new Date(c.timestamp).getTime() >= thirtyDaysAgo).length;

    // Clicks by Internship
    const byInternshipMap = {};
    filteredClicks.forEach(c => {
      const key = c.internshipName || c.internshipSlug || 'General Application';
      if (!byInternshipMap[key]) {
        byInternshipMap[key] = {
          name: key,
          slug: c.internshipSlug || 'general',
          count: 0,
          lastClick: c.timestamp,
        };
      }
      byInternshipMap[key].count += 1;
      if (new Date(c.timestamp) > new Date(byInternshipMap[key].lastClick)) {
        byInternshipMap[key].lastClick = c.timestamp;
      }
    });

    const byInternship = Object.values(byInternshipMap).sort((a, b) => b.count - a.count);

    // Clicks by Source Page
    const bySourceMap = {};
    filteredClicks.forEach(c => {
      const page = c.sourcePage || '/';
      bySourceMap[page] = (bySourceMap[page] || 0) + 1;
    });

    const bySource = Object.entries(bySourceMap)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count);

    // Daily distribution (past 7 days)
    const dailyTrend = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;
      const count = clicks.filter(c => {
        const t = new Date(c.timestamp).getTime();
        return t >= dayStart && t < dayEnd;
      }).length;
      dailyTrend.push({ date: dayLabel, count });
    }

    return {
      totalClicks,
      clicksToday,
      clicks7Days,
      clicks30Days,
      byInternship,
      bySource,
      dailyTrend,
      rawClicks: filteredClicks.slice(0, 100),
    };
  },
};

export default contentService;
