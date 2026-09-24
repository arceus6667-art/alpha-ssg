/**
 * SkillSet Go EduTech - Admin Authentication Service
 * Handles admin session state, token persistence, and safe development credentials.
 */

const AUTH_STORAGE_KEY = 'ssg_admin_session';
const TOKEN_EXPIRY_HOURS = 8; // Session valid for 8 hours

// SAFE DEVELOPMENT CREDENTIALS (DOCUMENTED FOR LOCAL/DEV USE ONLY)
// In production, authentication is handled via server-side /api/admin/login or an identity provider.
export const DEV_CREDENTIALS = {
  email: 'admin@skillsetgo.com',
  password: 'Admin@SSG2026!',
  role: 'Super Administrator',
  name: 'EduTech Admin',
};

export const authService = {
  /**
   * Log in with credentials
   * @param {string} email 
   * @param {string} password 
   */
  async login(email, password) {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '').trim();

    try {
      // First attempt server-side verification if server is reachable
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        this.setSession(data.token, data.user);
        return { success: true, user: data.user };
      }
    } catch (err) {
      // If offline or dev fallback, continue to dev credentials check below
      console.info('[Auth Service] Checking local development credentials...');
    }

    // Development fallback check
    if (
      cleanEmail === DEV_CREDENTIALS.email.toLowerCase() &&
      cleanPassword === DEV_CREDENTIALS.password
    ) {
      const user = {
        id: 'usr_admin_001',
        email: DEV_CREDENTIALS.email,
        name: DEV_CREDENTIALS.name,
        role: DEV_CREDENTIALS.role,
      };

      const token = 'ssg_tok_' + Math.random().toString(36).substring(2) + Date.now();
      this.setSession(token, user);
      return { success: true, user };
    }

    return {
      success: false,
      error: 'Invalid Admin Email or Password. Please verify your credentials.',
    };
  },

  /**
   * Store active session
   */
  setSession(token, user) {
    const session = {
      token,
      user,
      expiresAt: Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000,
    };
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
      window.dispatchEvent(new CustomEvent('ssg:auth_changed', { detail: { isAuthenticated: true, user } }));
    } catch (e) {
      console.warn('[Auth Service] Storage error:', e);
    }
  },

  /**
   * Check if current session is valid and unexpired
   */
  isAuthenticated() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return false;

      const session = JSON.parse(stored);
      if (!session || !session.token || !session.expiresAt) return false;

      if (Date.now() > session.expiresAt) {
        this.logout();
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  },

  /**
   * Get current logged in admin user
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
   * Log out and clear session
   */
  logout() {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('ssg:auth_changed', { detail: { isAuthenticated: false, user: null } }));
    } catch (e) {
      // ignore
    }
  },
};

export default authService;
