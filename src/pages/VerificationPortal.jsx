import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Clock,
  Calendar,
  FileCheck2,
  Award,
  FileText,
  Search,
  Lock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  QrCode,
  ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import AntiGravityCanvas from '../components/AntiGravityCanvas';
import { contentService } from '../services/contentService';

export default function VerificationPortal() {
  const [portalInfo, setPortalInfo] = useState({
    portalStatus: 'under_development',
    developmentDeadline: '2026-10-20T00:00:00Z',
    publicRelease: '2026-10-28T00:00:00Z',
    message: 'The SkillSet Go EduTech Verification Portal is currently under development.',
  });
  const [queryInput, setQueryInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    contentService.getVerificationStatus().then((data) => {
      if (data) setPortalInfo(data);
    });
  }, []);

  const handleSearchAttempt = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-transparent min-h-screen py-12 lg:py-16 relative">
      <SEO
        title="Official Verification Portal | SkillSet Go EduTech"
        description="Verify credentials, certificates, offer letters, and letters of recommendation issued by SkillSet Go EduTech."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
        {/* Section Header */}
        <SectionHeader
          eyebrow="Trust & Security Infrastructure"
          title="Official Credential Verification Portal"
          subtitle="SkillSet Go EduTech is building a cryptographically secured verification engine to validate official certificates, internship offer letters, and recommendations."
          center={true}
        />

        {/* Development Status Banner Card */}
        <div className="mt-10 rounded-3xl border border-emerald-900/10 bg-white/90 p-8 sm:p-10 shadow-xl backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-xs">
                <Clock size={28} className="animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                    Currently Under Development
                  </span>
                  <span className="text-xs font-mono font-medium text-slate-400">
                    Module Ver. 1.0 Alpha
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                  Official Verification System in Active Production
                </h3>
                <p className="mt-1 text-sm text-slate-600 max-w-xl">
                  We are developing our central verification database to provide real-time, tamper-proof credential authentication for all educational partners, universities, and enterprise hiring teams.
                </p>
              </div>
            </div>
          </div>

          {/* Release Deadlines & Milestones Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5">
              <div className="flex items-center gap-3 text-slate-500 mb-2">
                <Calendar size={18} className="text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Target Completion
                </span>
              </div>
              <p className="text-xl font-extrabold text-slate-900">
                20 October 2026
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Final validation of database schema, admin registry, and API endpoints.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-5">
              <div className="flex items-center gap-3 text-emerald-700 mb-2">
                <Sparkles size={18} className="text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Public Release
                </span>
              </div>
              <p className="text-xl font-extrabold text-emerald-950">
                28 October 2026
              </p>
              <p className="mt-1 text-xs text-emerald-800">
                Public lookup portal and QR code authentication goes live globally.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5">
              <div className="flex items-center gap-3 text-slate-500 mb-2">
                <Lock size={18} className="text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Data Architecture
                </span>
              </div>
              <p className="text-xl font-extrabold text-slate-900">
                Centralized SQLite
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Server-side verified credentials with single source of truth across all devices.
              </p>
            </div>
          </div>
        </div>

        {/* Credential Lookup Preview Box */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
              <Search size={22} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Credential Verification Preview
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
              When the portal goes live on <strong className="text-slate-700">28 October 2026</strong>, you will be able to enter any Certificate ID, Offer ID, or Verification Code to authenticate credentials.
            </p>

            <form onSubmit={handleSearchAttempt} className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                  placeholder="e.g. SSG-CERT-2026-9042 or SSG-OFF-8120"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-slate-800 transition-all cursor-pointer"
              >
                <span>Check Status</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {submitted && (
              <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left flex items-start gap-3 animate-in fade-in">
                <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <p className="font-bold">Public Verification Database Not Live Yet</p>
                  <p className="mt-0.5 text-amber-800">
                    The verification registry is currently under active implementation. Automated public lookups will be activated on <strong>28 October 2026</strong>. If you require manual verification of an offer letter or certificate in the meantime, please contact <a href="mailto:support@skillsetgo.com" className="underline font-bold">support@skillsetgo.com</a>.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Verifiable Credentials Overview */}
        <div className="mt-12">
          <h4 className="text-center text-sm font-bold uppercase tracking-wider text-slate-400 mb-6 font-mono">
            Supported Document Verification Types
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <Award size={20} />
              </div>
              <h5 className="font-bold text-slate-900 text-sm">Course Certificates</h5>
              <p className="mt-1 text-xs text-slate-500">
                Official certificates of completion for live technical workshops and cohorts.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <FileCheck2 size={20} />
              </div>
              <h5 className="font-bold text-slate-900 text-sm">Internship Offer Letters</h5>
              <p className="mt-1 text-xs text-slate-500">
                Verified offer letters issued to selected candidates for project-based cohorts.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                <FileText size={20} />
              </div>
              <h5 className="font-bold text-slate-900 text-sm">Letters of Recommendation</h5>
              <p className="mt-1 text-xs text-slate-500">
                Mentor-endorsed performance assessments for top-performing students.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-emerald-500/40 hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                <QrCode size={20} />
              </div>
              <h5 className="font-bold text-slate-900 text-sm">QR Code Authentication</h5>
              <p className="mt-1 text-xs text-slate-500">
                Instant smartphone camera scanning directly linking to this verification portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
