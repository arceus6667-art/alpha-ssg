import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  BookOpen,
  FileText,
  BarChart3,
  Bell,
  ArrowRight,
  Plus,
  Clock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Activity
} from 'lucide-react';
import SEO from '../../components/SEO';
import { contentService } from '../../services/contentService';
import { siteConfig } from '../../config/siteConfig';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalWorkshops: 0,
    upcomingWorkshops: 0,
    publishedMagazines: 0,
    publishedArticles: 0,
    totalClicks: 0,
    clicksToday: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);
  const [activeUpdates, setActiveUpdates] = useState([]);

  useEffect(() => {
    const refreshData = async () => {
      try {
        await Promise.allSettled([
          contentService.fetchActivityLog(10),
          contentService.fetchClickAnalytics('all'),
        ]);
      } catch (e) {
        // Fallback to cache
      }

      const workshops = contentService.getWorkshops();
      const upcoming = workshops.filter(w => w.status === 'upcoming' || w.status === 'registration-open').length;
      const magazines = contentService.getMagazines().filter(m => m.status === 'published').length;
      const articles = contentService.getArticles().filter(a => a.status === 'published').length;
      const analytics = contentService.getClickAnalytics();
      const updates = contentService.getPublishedUpdates();

      setStats({
        totalWorkshops: workshops.length,
        upcomingWorkshops: upcoming,
        publishedMagazines: magazines,
        publishedArticles: articles,
        totalClicks: analytics.totalClicks || 0,
        clicksToday: analytics.clicksToday || 0,
      });

      setRecentActivity(contentService.getActivityLog().slice(0, 6));
      setActiveUpdates(updates.slice(0, 3));
    };

    refreshData();
    window.addEventListener('ssg:content_changed', refreshData);
    window.addEventListener('storage', refreshData);
    window.addEventListener('ssg:apply_click', refreshData);

    return () => {
      window.removeEventListener('ssg:content_changed', refreshData);
      window.removeEventListener('storage', refreshData);
      window.removeEventListener('ssg:apply_click', refreshData);
    };
  }, []);

  return (
    <div className="space-y-8">
      <SEO
        title="Admin Overview Dashboard | SkillSet Go"
        description="Administrative overview of workshops, magazines, articles, announcements, and application clicks."
      />

      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            System Operations Overview
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            SkillSet Go EduTech Control Console • Live Data & Publishing Pipeline
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/workshops"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs shadow-emerald-600/20"
          >
            <Plus size={14} />
            <span>Add Workshop</span>
          </Link>

          <Link
            to="/admin/updates"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors shadow-xs"
          >
            <Bell size={14} />
            <span>New Announcement</span>
          </Link>
        </div>
      </div>

      {/* Active Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Metric 1 */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Workshops
          </span>
          <span className="text-2xl font-extrabold text-slate-900 block mt-1 tabular-nums">
            {stats.totalWorkshops}
          </span>
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
            <span>{stats.upcomingWorkshops} upcoming</span>
          </span>
        </div>

        {/* Metric 2 */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Upcoming
          </span>
          <span className="text-2xl font-extrabold text-emerald-600 block mt-1 tabular-nums">
            {stats.upcomingWorkshops}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Registration open
          </span>
        </div>

        {/* Metric 3 */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Magazine Issues
          </span>
          <span className="text-2xl font-extrabold text-teal-600 block mt-1 tabular-nums">
            {stats.publishedMagazines}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Active editions
          </span>
        </div>

        {/* Metric 4 */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Articles
          </span>
          <span className="text-2xl font-extrabold text-emerald-600 block mt-1 tabular-nums">
            {stats.publishedArticles}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Published guides
          </span>
        </div>

        {/* Metric 5 */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Link Clicks
          </span>
          <span className="text-2xl font-extrabold text-slate-900 block mt-1 tabular-nums">
            {stats.totalClicks}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Tracked application clicks
          </span>
        </div>

        {/* Metric 6 */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Clicks Today
          </span>
          <span className="text-2xl font-extrabold text-emerald-600 block mt-1 tabular-nums">
            {stats.clicksToday}
          </span>
          <span className="text-[11px] text-slate-500 block mt-1">
            Last 24 hours
          </span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Activity (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Recent Administrative Activity
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Live Audit Log
            </span>
          </div>

          <div className="space-y-3">
            {recentActivity.map((act) => (
              <div
                key={act.id}
                className="flex items-start justify-between gap-4 p-3 rounded-lg border border-slate-100 bg-slate-50/60"
              >
                <div>
                  <strong className="block text-xs font-bold text-slate-800">
                    {act.action}
                  </strong>
                  <span className="block text-xs text-slate-500 mt-0.5">
                    {act.details}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0 tabular-nums">
                  {new Date(act.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-right">
            <Link
              to="/admin/analytics"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1"
            >
              <span>View Full Click Analytics</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right Column: Active Announcements / Updates (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Bell size={18} className="text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Active Announcements
              </h2>
            </div>
            <Link
              to="/admin/updates"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-3">
            {activeUpdates.map((upd) => (
              <div
                key={upd.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-xs text-slate-800 truncate">
                    {upd.title}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shrink-0 ${
                      upd.priority === 'urgent'
                        ? 'bg-red-100 text-red-700'
                        : upd.priority === 'important'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {upd.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {upd.shortDescription}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <Link
              to="/admin/updates"
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Plus size={13} />
              <span>Create Announcement</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
