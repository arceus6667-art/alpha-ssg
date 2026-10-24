import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studentSupabase, signInStudentWithGoogle } from '../services/studentAuth';
import Logo from '../components/Logo';

export default function StudentLogin() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!studentSupabase) return;
    studentSupabase.auth.getUser().then(({ data }) => { if (data?.user) navigate('/student', { replace: true }); });
  }, [navigate]);
  async function login() {
    setBusy(true); setError('');
    try { await signInStudentWithGoogle(); }
    catch (e) { setError(e.message || 'Unable to sign in.'); setBusy(false); }
  }
  return <main className="min-h-[75vh] flex items-center justify-center px-4 py-16">
    <div className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-emerald-900/10">
      <div className="flex justify-center"><Logo size={64} /></div>
      <h1 className="mt-5 text-3xl font-bold text-slate-900">Student Login</h1>
      <p className="mt-3 text-sm text-slate-600">Sign in securely to your Skill Set Go student account.</p>
      <button type="button" disabled={busy || !studentSupabase} onClick={login} className="mt-8 w-full rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-md shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transform-none">Continue with Google</button>
      {!studentSupabase && <p className="mt-3 text-sm text-amber-700">Student sign-in is being configured.</p>}
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
      <Link to="/" className="mt-6 inline-block text-sm font-medium text-emerald-700 hover:underline">Back to home</Link>
    </div>
  </main>;
}
