import React, { useState } from 'react';
import { Settings, Shield, Link2, RefreshCw, CheckCircle2, AlertTriangle, Key } from 'lucide-react';
import SEO from '../../components/SEO';
import { siteConfig } from '../../config/siteConfig';
import { showToast } from '../../components/admin/Toast';

export default function AdminSettings() {
  const [formUrl, setFormUrl] = useState(siteConfig.applicationFormUrl);

  const handleResetStorage = () => {
    if (window.confirm('Reset local admin changes to default sample data? This will restore original workshops and magazines.')) {
      localStorage.removeItem('ssg_content_workshops');
      localStorage.removeItem('ssg_content_magazines');
      localStorage.removeItem('ssg_content_articles');
      localStorage.removeItem('ssg_content_updates');
      showToast('Data reset to defaults. Refreshing...');
      setTimeout(() => {
        window.location.reload();
      }, 800);
    }
  };

  const handleClearClicks = () => {
    if (window.confirm('Clear all stored application click tracking records?')) {
      localStorage.removeItem('ssg_application_clicks');
      showToast('Application click records cleared.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <SEO
        title="Admin Settings & Configuration"
        description="Configure application form link, review security parameters, and manage administrative settings."
      />

      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Admin Settings & Platform Configuration
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Review central configuration, application routing, and maintenance tools.
        </p>
      </div>

      {/* Application Google Form URL Configuration */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Link2 size={18} className="text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">
            Global Internship Application Google Form
          </h2>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          The centralized Google Form URL used across all Apply buttons on the platform is configured in <code className="bg-slate-100 px-1.5 py-0.5 rounded text-blue-700 font-mono text-[11px]">src/config/siteConfig.js</code>.
        </p>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Current Application Target URL
          </label>
          <input
            type="text"
            readOnly
            value={siteConfig.applicationFormUrl}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 px-3 text-xs font-mono text-slate-800 focus:outline-none"
          />
        </div>
      </div>

      {/* Security Architecture */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Shield size={18} className="text-emerald-600" />
          <h2 className="text-base font-bold text-slate-900">
            Security & Authentication Architecture
          </h2>
        </div>

        <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Hidden Keyboard Entry:</strong> Pressing <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[11px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[11px]">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded font-mono text-[11px]">A</kbd> opens the Admin Login modal without exposing admin links in public navigation or footers.
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Protected Route Enforcement:</strong> Direct navigation to <code className="font-mono text-blue-600">/admin/*</code> checks for active session tokens and automatically redirects unauthorized visitors to the login screen.
            </div>
          </div>

          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Session Expiry:</strong> Active administrator sessions automatically expire after 8 hours of inactivity to prevent unauthorized access on shared devices.
            </div>
          </div>
        </div>
      </div>

      {/* Data Management & Testing Tools */}
      <div className="rounded-2xl border border-red-200 bg-red-50/30 p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-red-100">
          <AlertTriangle size={18} className="text-red-600" />
          <h2 className="text-base font-bold text-red-900">
            Maintenance & Storage Diagnostics
          </h2>
        </div>

        <p className="text-xs text-slate-600">
          Use these controls during development to reset testing states or flush application link click events.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleClearClicks}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors cursor-pointer"
          >
            Clear Click Analytics Records
          </button>

          <button
            type="button"
            onClick={handleResetStorage}
            className="px-3.5 py-2 text-xs font-bold text-red-700 bg-white hover:bg-red-50 border border-red-300 rounded-lg transition-colors cursor-pointer"
          >
            Reset Content to Factory Baseline
          </button>
        </div>
      </div>
    </div>
  );
}
