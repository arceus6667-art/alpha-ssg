import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ArrowRight, CheckCircle2, KeyRound, ShieldCheck } from 'lucide-react';
import SEO from '../../components/SEO';
import Logo from '../../components/Logo';
import AntiGravityCanvas from '../../components/AntiGravityCanvas';
import { authService, DEV_CREDENTIALS } from '../../services/authService';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const redirectTarget = searchParams.get('redirect') || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await authService.login(email, password);
    setLoading(false);

    if (result.success) {
      navigate(redirectTarget, { replace: true });
    } else {
      setError(result.error || 'Invalid credentials.');
    }
  };

  const handleFillDevCredentials = () => {
    setEmail(DEV_CREDENTIALS.email);
    setPassword(DEV_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Anti-Gravity Digital Pixels Canvas */}
      <AntiGravityCanvas particleCount={48} interactive={true} theme="green" className="opacity-35" />

      <SEO
        title="Admin Portal Authentication | SkillSet Go"
        description="Restricted administrative access for SkillSet Go EduTech."
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10">
        <Link to="/" className="inline-block transition-opacity hover:opacity-90">
          <div className="bg-white p-2 rounded-2xl shadow-md inline-flex items-center justify-center">
            <Logo size={54} />
          </div>
        </Link>
        <div className="mt-4 flex items-center justify-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Admin Portal Access
          </h2>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">
            <ShieldCheck size={12} />
            Secure
          </span>
        </div>
        <p className="mt-1.5 text-xs text-slate-400">
          Authorized personnel only. Protected administrative environment.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/98 backdrop-blur-md py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-slate-700/50">
          {error && (
            <div className="mb-5 flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold animate-in fade-in">
              <ShieldAlert size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Email / Identifier
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@skillsetgo.com"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/25 hover:bg-emerald-700 transition-all disabled:opacity-75 cursor-pointer"
            >
              {loading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Development Testing Helper (Documented Safe Placeholder) */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Development Credentials
              </span>
              <button
                type="button"
                onClick={handleFillDevCredentials}
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
              >
                Auto-fill
              </button>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 space-y-1">
              <div>Email: <span className="font-semibold text-slate-800">{DEV_CREDENTIALS.email}</span></div>
              <div>Password: <span className="font-semibold text-slate-800">{DEV_CREDENTIALS.password}</span></div>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
