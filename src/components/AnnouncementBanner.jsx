import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Sparkles, X, ArrowRight } from 'lucide-react';
import { contentService } from '../services/contentService';

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const loadBanner = () => {
      const updates = contentService.getPublishedUpdates();
      // Find highest priority active update (urgent or important)
      const topUpdate = updates.find(
        (u) => u.priority === 'urgent' || u.priority === 'important'
      ) || updates[0];

      if (topUpdate) {
        const isDismissed = sessionStorage.getItem(`ssg_dismiss_banner_${topUpdate.id}`);
        if (!isDismissed) {
          setAnnouncement(topUpdate);
        }
      }
    };

    loadBanner();
    window.addEventListener('ssg:content_changed', loadBanner);
    window.addEventListener('storage', loadBanner);
    return () => {
      window.removeEventListener('ssg:content_changed', loadBanner);
      window.removeEventListener('storage', loadBanner);
    };
  }, []);

  const handleDismiss = () => {
    if (announcement) {
      sessionStorage.setItem(`ssg_dismiss_banner_${announcement.id}`, 'true');
    }
    setDismissed(true);
  };

  if (!announcement || dismissed) return null;

  const isUrgent = announcement.priority === 'urgent';

  return (
    <div
      className={`relative z-40 py-2 px-4 text-xs font-semibold transition-all ${
        isUrgent
          ? 'bg-red-600 text-white'
          : 'bg-[#064e3b] text-white border-b border-emerald-900/60'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
              isUrgent ? 'bg-white text-red-600' : 'bg-emerald-500 text-white'
            }`}
          >
            <Bell size={11} />
          </span>
          <span className="truncate">
            <strong className="mr-1.5">{announcement.title}:</strong>
            <span className="text-emerald-100">{announcement.shortDescription}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {announcement.ctaText && announcement.ctaUrl && (
            <Link
              to={announcement.ctaUrl}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold shadow-xs transition-all ${
                isUrgent
                  ? 'bg-white hover:bg-red-50 text-red-700'
                  : 'bg-white hover:bg-emerald-50 text-emerald-950'
              }`}
              style={{ color: isUrgent ? '#991b1b' : '#022c22' }}
            >
              <span style={{ color: isUrgent ? '#991b1b' : '#022c22' }}>{announcement.ctaText}</span>
              <ArrowRight size={12} style={{ color: isUrgent ? '#991b1b' : '#022c22' }} />
            </Link>
          )}

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss announcement banner"
            className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
