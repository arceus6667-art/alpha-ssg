import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Sparkles, Mail, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';

export default function Goodies() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const waitlist = JSON.parse(localStorage.getItem('ssg_goodies_waitlist') || '[]');
      waitlist.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem('ssg_goodies_waitlist', JSON.stringify(waitlist));
    } catch (err) {
      console.warn('Local storage error:', err);
    }

    setSubmitted(true);
  };

  return (
    <div className="bg-transparent min-h-[80vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Goodies & Learner Swag (Under Construction)"
        description="Official developer merchandise, commemorative badges, and hardware kits for SkillSet Go learners are coming soon."
      />

      <div className="max-w-xl w-full text-center">
        {/* Animated Visual Box */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-amber-50 text-amber-600 border border-amber-200/80 shadow-inner mb-6">
          <Gift size={44} className="animate-pulse" />
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-200 mb-4">
          <Sparkles size={13} />
          Under Construction
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Goodies are Coming Soon
        </h1>

        <p className="text-base text-slate-600 leading-relaxed mb-8">
          We are currently designing and curating our official collection of learner merchandise, developer sticker packs, completion lapel pins, and milestone hardware toolkits.
        </p>

        {/* Notification Signup Form */}
        <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-xs text-left mb-8">
          <h3 className="text-sm font-bold text-slate-900 mb-1">
            Get Notified When Goodies Drop
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Be the first to know when the official learner swag store goes live.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your student email..."
                  required
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer shrink-0"
              >
                Notify Me
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-xs font-semibold">
              <CheckCircle2 size={16} className="shrink-0" />
              <span>You're on the priority waitlist! We'll notify you as soon as swag is available.</span>
            </div>
          )}
        </div>

        {/* Back navigation */}
        <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500">
          <Link to="/" className="hover:text-emerald-700 transition-colors">
            Return to Homepage
          </Link>
          <span>•</span>
          <Link to="/internships" className="text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1 font-bold">
            <span>Explore Internship Tracks</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
