/**
 * SkillSet Go EduTech - Admin Authentication Service (Server-Side Sessions)
 * 
 * Authentication flow:
 *   1. POST /api/admin/login → Express validates credentials against DB
 *   2. Server issues a session token (stored in SQLite admin_sessions)
 *   3. Token stored in localStorage ONLY as a session identifier (not auth proof)
 *   4. Every protected API call sends token in Authorization header
 *   5. Server validates token against DB on every request
 * 
 * Security: credentials are NEVER checked in the frontend.
 *           Token validity is ALWAYS verified server-side.
 */

const AUTH_STORAGE_KEY = 'ssg_admin_session';

export const authService = {
  /**
   * Login via server-side API
   * Credentials are validated by the Express server against the SQLite database.
   */
  async login(email, password) {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '').trim();

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        this.setSession(data.token, data.user, data.expiresAt);
        return { success: true, user: data.user };
      }

      return {
        success: false,
        error: data.error || 'Invalid administrator credentials.',
      };
    } catch (err) {
      console.error('[Auth Service] Login request failed:', err.message);
      return {
        success: false,
        error: 'Unable to connect to authentication server. Please check your connection.',
      };
    }
  },

  /**
   * Store session token locally (for session identity only, not auth proof)
   */
  setSession(token, user, expiresAt) {
    const session = {
      token,
      user,
      expiresAt: expiresAt || new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    };
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      window.dispatchEvent(new CustomEvent('ssg:auth_changed', { detail: { isAuthenticated: true, user } }));
    } catch (e) {
      console.warn('[Auth Service] Storage error:', e);
    }
  },

  /**
   * Check if the stored session token is still locally non-expired.
   * NOTE: This is a preliminary client-side check only.
   *       The server validates the token on every protected API call.
   */
  isAuthenticated() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return false;

      const session = JSON.parse(stored);
      if (!session || !session.token || !session.expiresAt) return false;

      if (new Date() > new Date(session.expiresAt)) {
        this.logout();
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Get session token for API authorization headers
   */
  getToken() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return null;
      const session = JSON.parse(stored);
      return session.token || null;
    } catch {
      return null;
    }
  },

  /**
   * Get the cached user object (display only — never trusted as auth proof)
   */
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return null;
      const session = JSON.parse(stored);
      return session.user || null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Verify token is still valid with the server (optional check for sensitive pages)
   */
  async verifySession() {
    try {
      const token = this.getToken();
      if (!token) return false;

      const response = await fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        this.logout();
        return false;
      }

      return true;
    } catch {
      return false;
    }
  },

  /**
   * Logout: clear local session AND notify server to revoke token
   */
  async logout() {
    try {
      const token = this.getToken();
      if (token) {
        // Best-effort server-side token revocation
        fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {});
      }
    } catch (e) {
      // ignore
    }

    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('ssg:auth_changed', { detail: { isAuthenticated: false, user: null } }));
    } catch (e) {
      // ignore
    }
  },
};

export const DEV_CREDENTIALS = {
  email: 'admin@skillsetgo.com',
  password: 'Admin@SSG2026!',
};

export default authService;

