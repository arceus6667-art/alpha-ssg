import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home, Layers } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <SEO
        title="404 Page Not Found | SkillSet Go EduTech"
        description="The requested page could not be found. Return to SkillSet Go EduTech homepage or explore our 12 internship domains."
      />

      <div className="max-w-md w-full text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 mb-6">
          <Compass size={38} className="animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <span className="font-mono text-xs font-bold uppercase tracking-wider text-blue-600 mb-2 block">
          Error 404
        </span>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
          Page Not Found
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed mb-8">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-blue-700 transition-colors"
          >
            <Home size={14} />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/internships"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <Layers size={14} />
            <span>Browse Internships</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
