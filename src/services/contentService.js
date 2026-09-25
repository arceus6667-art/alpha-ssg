/**
 * SkillSet Go EduTech - Centralized Content Service
 * 
 * Single Source of Truth: Central SQLite Database via Express REST API.
 * Cross-device synchronization:
 *   - Real-time Server-Sent Events (SSE) connection (/api/realtime/events)
 *   - Automatic background revalidation on tab focus and interval
 *   - In-memory reactive state cache that guarantees synchronous compatibility
 *     without breaking React component renders.
 * 
 * localStorage is NEVER the source of truth for persistent data.
 */

import { workshops as defaultWorkshops } from '../data/workshops';
import { magazines as defaultMagazines } from '../data/magazines';
import { articles as defaultArticles } from '../data/articles';

const API_BASE = '/api';

// Internal In-Memory State Cache (Synchronized from Central DB)
const state = {
  updates: [
    {
      id: 'ann-01',
      title: 'Summer 2026 Project-Based Internship Cohort Open',
      shortDescription: 'Applications now open for all 12 specialized project paths. Limited seats available for dedicated mentorship.',
      status: 'published',
      priority: 'urgent',
      ctaText: 'Apply Now',
      ctaUrl: '/internships',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'ann-02',
      title: 'New Mechatronics Track Launched',
      shortDescription: 'Explore robotics, embedded systems, and IoT with our new engineering track.',
      status: 'published',
      priority: 'important',
      ctaText: 'Explore Track',
      ctaUrl: '/internships/mechatronics-robotics',
      createdAt: new Date().toISOString(),
    }
  ],
  workshops: defaultWorkshops || [],
  magazines: defaultMagazines || [],
  articles: defaultArticles || [],
  activity: [],
  analytics: {
    totalClicks: 0,
    clicksToday: 0,
    clicks7Days: 0,
    clicks30Days: 0,
    byInternship: [],
    bySource: [],
    dailyTrend: [],
    rawClicks: [],
  },
  verificationStats: {
    total: 0,
    valid: 0,
    revoked: 0,
    pending: 0,
  },
  verificationRecords: [],
  isInitialized: false,
};

// Helper: Get admin session token (identity only, validated server-side)
function getAuthToken() {
  try {
    const raw = localStorage.getItem('ssg_admin_session');
    if (!raw) return null;
    const session = JSON.parse(raw);
    return session.token || null;
  } catch {
    return null;
  }
}

function authHeaders() {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function apiFetch(endpoint, options = {}) {
  const res = await fetch(API_BASE + endpoint, {
    ...options,
    headers: {
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(json.error || `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return json;
}

function notifySubscribers(type, data) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ssg:content_changed', { detail: { type, data } }));
  }
}

// ============================================================
// CENTRALIZED SYNC ENGINE (SSE + Background Polling)
// ============================================================

let sseSource = null;
let syncInProgress = false;

async function syncAllFromBackend() {
  if (syncInProgress) return;
  syncInProgress = true;

  try {
    const [updatesRes, workshopsRes, magazinesRes, articlesRes] = await Promise.allSettled([
      apiFetch('/content/updates'),
      apiFetch('/content/workshops'),
      apiFetch('/content/magazines'),
      apiFetch('/content/articles'),
    ]);

    if (updatesRes.status === 'fulfilled' && Array.isArray(updatesRes.value.data)) {
      state.updates = updatesRes.value.data;
    }
    if (workshopsRes.status === 'fulfilled' && Array.isArray(workshopsRes.value.data)) {
      state.workshops = workshopsRes.value.data;
    }
    if (magazinesRes.status === 'fulfilled' && Array.isArray(magazinesRes.value.data)) {
      state.magazines = magazinesRes.value.data;
    }
    if (articlesRes.status === 'fulfilled' && Array.isArray(articlesRes.value.data)) {
      state.articles = articlesRes.value.data;
    }

    state.isInitialized = true;
    notifySubscribers('all', { timestamp: Date.now() });
  } catch (err) {
    console.warn('[ContentService] Initial sync note:', err.message);
  } finally {
    syncInProgress = false;
  }
}

function initRealtimeSync() {
  if (typeof window === 'undefined') return;

  // 1. Initial immediate sync from API
  syncAllFromBackend();

  // 2. Establish Server-Sent Events (SSE) connection for instant push updates
  function connectSSE() {
    try {
      if (sseSource) {
        sseSource.close();
      }
      sseSource = new EventSource('/api/realtime/events');

      sseSource.addEventListener('ssg_change', (event) => {
        try {
          const payload = JSON.parse(event.data);
          // When any device modifies content, immediately re-sync state
          syncAllFromBackend();
          if (payload.type === 'analytics') {
            window.dispatchEvent(new CustomEvent('ssg:apply_click', { detail: payload.details }));
          }
        } catch (e) {
          syncAllFromBackend();
        }
      });

      sseSource.onerror = () => {
        // SSE disconnected, will retry after 5s
        if (sseSource) sseSource.close();
        setTimeout(connectSSE, 5000);
      };
    } catch (e) {
      // Fallback to polling if SSE is unsupported
    }
  }

  connectSSE();

  // 3. Fallback: Re-sync on tab focus / visibility change
  window.addEventListener('focus', () => {
    syncAllFromBackend();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      syncAllFromBackend();
    }
  });

  // 4. Background heartbeat poll every 15s to guarantee fresh state
  setInterval(syncAllFromBackend, 15000);
}

// Auto-start sync in browser environment
if (typeof window !== 'undefined') {
  initRealtimeSync();
}

// ============================================================
// CONTENT SERVICE API
// ============================================================

export const contentService = {
  // Sync Helper
  sync: syncAllFromBackend,

  // ==========================================
  // UPDATES / ANNOUNCEMENTS
  // ==========================================

  getUpdates() {
    return [...state.updates];
  },

  getPublishedUpdates() {
    return state.updates.filter((u) => u.status === 'published');
  },

  getUpdate(id) {
    return state.updates.find((u) => u.id === id) || null;
  },

  async fetchUpdates() {
    const res = await apiFetch('/content/updates');
    if (Array.isArray(res.data)) state.updates = res.data;
    return state.updates;
  },

  async fetchPublishedUpdates() {
    const res = await apiFetch('/content/updates/published');
    return res.data || [];
  },

  async saveUpdate(update) {
    let result;
    if (update.id && state.updates.some((u) => u.id === update.id)) {
      result = await apiFetch(`/content/updates/${update.id}`, {
        method: 'PUT',
        body: JSON.stringify(update),
      });
      state.updates = state.updates.map((u) => (u.id === update.id ? result.data : u));
    } else {
      result = await apiFetch('/content/updates', {
        method: 'POST',
        body: JSON.stringify(update),
      });
      state.updates = [result.data, ...state.updates];
    }
    notifySubscribers('updates', result.data);
    return result.data;
  },

  async deleteUpdate(id) {
    await apiFetch(`/content/updates/${id}`, { method: 'DELETE' });
    state.updates = state.updates.filter((u) => u.id !== id);
    notifySubscribers('updates', { id, deleted: true });
    return true;
  },

  // ==========================================
  // WORKSHOPS
  // ==========================================

  getWorkshops() {
    return [...state.workshops];
  },

  getPublicWorkshops() {
    return state.workshops.filter((w) => w.status !== 'draft');
  },

  getWorkshop(slugOrId) {
    return (
      state.workshops.find((w) => w.slug === slugOrId || w.id === slugOrId) || null
    );
  },

  async fetchWorkshops() {
    const res = await apiFetch('/content/workshops');
    if (Array.isArray(res.data)) state.workshops = res.data;
    return state.workshops;
  },

  async fetchPublicWorkshops() {
    const res = await apiFetch('/content/workshops/public');
    return res.data || [];
  },

  async saveWorkshop(workshop) {
    let result;
    if (workshop.id && state.workshops.some((w) => w.id === workshop.id)) {
      result = await apiFetch(`/content/workshops/${workshop.id}`, {
        method: 'PUT',
        body: JSON.stringify(workshop),
      });
      state.workshops = state.workshops.map((w) => (w.id === workshop.id ? result.data : w));
    } else {
      result = await apiFetch('/content/workshops', {
        method: 'POST',
        body: JSON.stringify(workshop),
      });
      state.workshops = [result.data, ...state.workshops];
    }
    notifySubscribers('workshops', result.data);
    return result.data;
  },

  async deleteWorkshop(id) {
    await apiFetch(`/content/workshops/${id}`, { method: 'DELETE' });
    state.workshops = state.workshops.filter((w) => w.id !== id);
    notifySubscribers('workshops', { id, deleted: true });
    return true;
  },

  // ==========================================
  // MAGAZINES
  // ==========================================

  getMagazines() {
    return [...state.magazines];
  },

  getPublicMagazines() {
    return state.magazines.filter((m) => m.status === 'published');
  },

  getMagazine(slugOrId) {
    return (
      state.magazines.find((m) => m.slug === slugOrId || m.id === slugOrId) || null
    );
  },

  async fetchMagazines() {
    const res = await apiFetch('/content/magazines');
    if (Array.isArray(res.data)) state.magazines = res.data;
    return state.magazines;
  },

  async fetchPublicMagazines() {
    const res = await apiFetch('/content/magazines/public');
    return res.data || [];
  },

  async saveMagazine(magazine) {
    let result;
    if (magazine.id && state.magazines.some((m) => m.id === magazine.id)) {
      result = await apiFetch(`/content/magazines/${magazine.id}`, {
        method: 'PUT',
        body: JSON.stringify(magazine),
      });
      state.magazines = state.magazines.map((m) => (m.id === magazine.id ? result.data : m));
    } else {
      result = await apiFetch('/content/magazines', {
        method: 'POST',
        body: JSON.stringify(magazine),
      });
      state.magazines = [result.data, ...state.magazines];
    }
    notifySubscribers('magazines', result.data);
    return result.data;
  },

  async deleteMagazine(id) {
    await apiFetch(`/content/magazines/${id}`, { method: 'DELETE' });
    state.magazines = state.magazines.filter((m) => m.id !== id);
    notifySubscribers('magazines', { id, deleted: true });
    return true;
  },

  // ==========================================
  // ARTICLES
  // ==========================================

  getArticles() {
    return [...state.articles];
  },

  getPublicArticles() {
    return state.articles.filter((a) => a.status === 'published');
  },

  getArticle(slugOrId) {
    return (
      state.articles.find((a) => a.slug === slugOrId || a.id === slugOrId) || null
    );
  },

  async fetchArticles() {
    const res = await apiFetch('/content/articles');
    if (Array.isArray(res.data)) state.articles = res.data;
    return state.articles;
  },

  async fetchPublicArticles() {
    const res = await apiFetch('/content/articles/public');
    return res.data || [];
  },

  async saveArticle(article) {
    let result;
    if (article.id && state.articles.some((a) => a.id === article.id)) {
      result = await apiFetch(`/content/articles/${article.id}`, {
        method: 'PUT',
        body: JSON.stringify(article),
      });
      state.articles = state.articles.map((a) => (a.id === article.id ? result.data : a));
    } else {
      result = await apiFetch('/content/articles', {
        method: 'POST',
        body: JSON.stringify(article),
      });
      state.articles = [result.data, ...state.articles];
    }
    notifySubscribers('articles', result.data);
    return result.data;
  },

  async deleteArticle(id) {
    await apiFetch(`/content/articles/${id}`, { method: 'DELETE' });
    state.articles = state.articles.filter((a) => a.id !== id);
    notifySubscribers('articles', { id, deleted: true });
    return true;
  },

  // ==========================================
  // ACTIVITY LOGS
  // ==========================================

  getActivityLog() {
    return [...state.activity];
  },

  async fetchActivityLog(limit = 50) {
    try {
      const res = await apiFetch(`/admin/activity?limit=${limit}`);
      if (Array.isArray(res.data)) {
        state.activity = res.data;
      }
      return state.activity;
    } catch {
      return state.activity;
    }
  },

  // ==========================================
  // CLICK ANALYTICS
  // ==========================================

  getClickAnalytics() {
    return { ...state.analytics };
  },

  async fetchClickAnalytics(range = 'all') {
    try {
      const res = await apiFetch(`/analytics/clicks?range=${range}`);
      state.analytics = {
        totalClicks: res.totalClicks || 0,
        clicksToday: res.clicksToday || 0,
        clicks7Days: res.clicks7Days || 0,
        clicks30Days: res.clicks30Days || 0,
        byInternship: res.byInternship || [],
        bySource: res.bySource || [],
        dailyTrend: res.dailyTrend || [],
        rawClicks: res.rawClicks || [],
      };
      return state.analytics;
    } catch {
      return state.analytics;
    }
  },

  // ==========================================
  // VERIFICATION PORTAL
  // ==========================================

  async getVerificationStatus() {
    try {
      return await apiFetch('/verification/status');
    } catch {
      return {
        portalStatus: 'under_development',
        developmentDeadline: '2026-10-20T00:00:00Z',
        publicRelease: '2026-10-28T00:00:00Z',
        message: 'The SkillSet Go EduTech Verification Portal is currently under development.',
      };
    }
  },

  async getVerificationStats() {
    try {
      const res = await apiFetch('/verification/stats');
      state.verificationStats = res;
      return res;
    } catch {
      return state.verificationStats;
    }
  },

  async fetchVerificationRecords(search = '', status = '') {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    const res = await apiFetch(`/verification/records?${params}`);
    state.verificationRecords = res.data || [];
    return state.verificationRecords;
  },

  async saveVerificationRecord(record) {
    let result;
    if (record.id) {
      result = await apiFetch(`/verification/records/${record.id}`, {
        method: 'PUT',
        body: JSON.stringify(record),
      });
    } else {
      result = await apiFetch('/verification/records', {
        method: 'POST',
        body: JSON.stringify(record),
      });
    }
    notifySubscribers('verification', result.data);
    return result.data;
  },

  async revokeVerificationRecord(id) {
    const res = await apiFetch(`/verification/records/${id}/revoke`, { method: 'POST' });
    notifySubscribers('verification', { id, revoked: true });
    return res;
  },
};

export default contentService;
