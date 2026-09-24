import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Calendar,
  Filter,
  Download,
  ExternalLink,
  MousePointerClick,
  Layers,
  Globe,
  RefreshCw,
  Info,
  Clock
} from 'lucide-react';
import SEO from '../../components/SEO';
import { contentService } from '../../services/contentService';
import { siteConfig } from '../../config/siteConfig';

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState('all'); // 'today' | '7days' | '30days' | 'all'
  const [analytics, setAnalytics] = useState({
    totalClicks: 0,
    clicksToday: 0,
    clicks7Days: 0,
    clicks30Days: 0,
    byInternship: [],
    bySource: [],
    dailyTrend: [],
    rawClicks: [],
  });

  const loadData = () => {
    setAnalytics(contentService.getClickAnalytics(dateRange));
  };

  useEffect(() => {
    loadData();
    window.addEventListener('ssg:apply_click', loadData);
    return () => window.removeEventListener('ssg:apply_click', loadData);
  }, [dateRange]);

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(analytics.rawClicks, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ssg_clicks_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Compute maximum daily click count for scaling visual bars
  const maxTrend = Math.max(...analytics.dailyTrend.map(d => d.count), 5);

  return (
    <div className="space-y-8">
      <SEO
        title="Application Link Click Analytics"
        description="Monitor tracked application button clicks across all 12 internship domains."
      />

      {/* Header & Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Application Link Click Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Verifiable click events on the "Apply for Internship" button leading to the admissions Google Form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Date Range Selector */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-white border border-slate-200 text-xs shadow-xs">
            {[
              { label: 'Today', value: 'today' },
              { label: 'Last 7 Days', value: '7days' },
              { label: 'Last 30 Days', value: '30days' },
              { label: 'All Time', value: 'all' },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setDateRange(tab.value)}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                  dateRange === tab.value
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors cursor-pointer"
            title="Export click events to JSON"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Critical Clarification Notice */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 flex items-start gap-3 text-xs text-blue-900 leading-relaxed">
        <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block">Important Analytics Standard:</strong>
          These statistics represent verifiable <strong>Application Link Clicks</strong>. They measure student interest and traffic directed into the centralized Google Form. They do not constitute confirmed form completions, as Google Form submissions are processed externally.
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Total Application Link Clicks
          </span>
          <span className="text-3xl font-extrabold text-slate-900 block mt-1">
            {analytics.totalClicks}
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            All-time tracked clicks
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Clicks Today
          </span>
          <span className="text-3xl font-extrabold text-blue-600 block mt-1">
            {analytics.clicksToday}
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            Recorded since 12:00 AM
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Clicks in Last 7 Days
          </span>
          <span className="text-3xl font-extrabold text-emerald-600 block mt-1">
            {analytics.clicks7Days}
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            Rolling weekly volume
          </span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
            Clicks in Last 30 Days
          </span>
          <span className="text-3xl font-extrabold text-purple-600 block mt-1">
            {analytics.clicks30Days}
          </span>
          <span className="text-xs text-slate-500 block mt-1">
            Monthly applicant activity
          </span>
        </div>
      </div>

      {/* Visual Trend Chart: Past 7 Days */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Daily Click Volume Trend (Past 7 Days)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Visual breakdown of application button impressions and click-throughs.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Realtime Analytics
          </span>
        </div>

        {/* Lightweight Pure SVG/HTML Bar Chart */}
        <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
          {analytics.dailyTrend.map((item, idx) => {
            const heightPercent = Math.max(Math.round((item.count / maxTrend) * 100), item.count > 0 ? 12 : 4);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.count}
                </span>
                <div className="w-full max-w-[48px] bg-slate-100 rounded-t-lg h-full flex items-end overflow-hidden">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full bg-blue-600 hover:bg-blue-700 rounded-t-md transition-all duration-300"
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                  {item.date.split(',')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two-Column Analytics: By Internship Track + By Source Page */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Clicks by Internship (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Layers size={18} className="text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                Clicks by Internship Track
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              {analytics.byInternship.length} Active Tracks
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3">Internship Track</th>
                  <th className="py-2.5 px-3">Clicks</th>
                  <th className="py-2.5 px-3 text-right">Last Click</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {analytics.byInternship.length > 0 ? (
                  analytics.byInternship.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-3 font-semibold text-slate-800">
                        {item.name}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-blue-600">
                        {item.count}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-[11px] text-slate-400">
                        {new Date(item.lastClick).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-6 text-center text-slate-400">
                      No clicks recorded yet. Click "Apply for Internship" on any track to start tracking.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Clicks by Source Page (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Globe size={18} className="text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Clicks by Source Page
              </h2>
            </div>
          </div>

          <div className="space-y-2.5">
            {analytics.bySource.length > 0 ? (
              analytics.bySource.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 bg-slate-50/50"
                >
                  <span className="font-mono text-xs font-semibold text-slate-700 truncate max-w-[220px]">
                    {item.page}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    {item.count} clicks
                  </span>
                </div>
              ))
            ) : (
              <div className="py-6 text-center text-slate-400 text-xs">
                No referral source page records.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
