/**
 * SkillSet Go EduTech - Centralized Application Click Tracker & Redirect Utility
 * Ensures all clicks on "Apply for Internship" are logged safely before redirecting.
 * Never blocks redirect on tracking errors.
 */

import { siteConfig } from '../config/siteConfig';

const STORAGE_KEY = 'ssg_application_clicks';

export function recordApplicationClick({
  internshipSlug = 'general',
  internshipName = 'General Application',
  internshipId = null,
  sourcePage = window.location.pathname,
  extra = {}
}) {
  const clickEvent = {
    id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    timestamp: new Date().toISOString(),
    internshipSlug,
    internshipName,
    internshipId: internshipId || internshipSlug,
    sourcePage,
    referrer: document.referrer || 'direct',
    device: {
      screenWidth: window.innerWidth,
      userAgent: navigator.userAgent,
    },
    ...extra
  };

  try {
    // 1. LocalStorage storage for client-side audit & Part 2 Admin analytics
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    existing.unshift(clickEvent);
    // Keep last 100 click events in memory/localStorage
    if (existing.length > 100) existing.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    // 2. Dispatch a custom window event for any real-time listeners
    window.dispatchEvent(new CustomEvent('ssg:apply_click', { detail: clickEvent }));
    
    // 3. Optional non-blocking background server ping
    try {
      if (typeof fetch !== 'undefined') {
        fetch('/api/analytics/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(clickEvent),
        }).catch(() => {});
      }
    } catch (e) {}

    // 4. Log safely for debugging
    console.info('[Application Tracker] Click recorded:', clickEvent.internshipName, 'from', clickEvent.sourcePage);
  } catch (err) {
    // Tracking failure should NEVER block the user from applying
    console.warn('[Application Tracker] Non-fatal error recording click:', err);
  }

  return clickEvent;
}

/**
 * Handle application click with tracking and immediate redirect
 * @param {Object} options
 * @param {boolean} [options.openInNewTab=true]
 */
export function handleApplicationRedirect(options = {}) {
  try {
    recordApplicationClick(options);
  } catch (err) {
    console.warn('[Application Tracker] Redirect proceed despite tracking issue:', err);
  }

  const targetUrl = siteConfig.applicationFormUrl;

  if (options.openInNewTab !== false) {
    const win = window.open(targetUrl, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.href = targetUrl;
    }
  } else {
    window.location.href = targetUrl;
  }
}

/**
 * Helper to fetch recorded application clicks (for Admin or diagnostics)
 */
export function getStoredApplicationClicks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (err) {
    return [];
  }
}
