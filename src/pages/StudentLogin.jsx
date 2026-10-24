import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studentSupabase, signInStudentWithGoogle, sendStudentEmailOtp, verifyStudentEmailOtp } from '../services/studentAuth';
import Logo from '../components/Logo';

export default function StudentLogin() {
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [otpSent, setOtpSent] = useState(false);
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
  async function handleOtp(e) {
    e.preventDefault(); setBusy(true); setError('');
    try {
      if (!otpSent) { await sendStudentEmailOtp(email); setOtpSent(true); }
      else { await verifyStudentEmailOtp(email, token); navigate('/student', { replace: true }); }
    } catch (e) { setError(e.message || 'Authentication failed.'); }
    finally { setBusy(false); }
  }
  return <main className="min-h-[75vh] flex items-center justify-center px-4 py-16">
    <div className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl shadow-emerald-900/10">
      <div className="flex justify-center"><Logo size={64} /></div>
      <h1 className="mt-5 text-3xl font-bold text-slate-900">Student Login</h1>
      <p className="mt-3 text-sm text-slate-600">Sign in securely to your Skill Set Go student account.</p>
      <button type="button" disabled={busy || !studentSupabase} onClick={login} className="mt-8 w-full rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-md shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transform-none">Continue with Google</button>
      <div className="my-5 text-xs font-medium uppercase tracking-wide text-slate-400">or sign in with email OTP</div>
      <form onSubmit={handleOtp} className="space-y-3 text-left">
        <label htmlFor="student-email" className="block text-sm font-semibold text-slate-700">Email</label>
        <input id="student-email" type="email" required autoComplete="email" value={email} disabled={otpSent || busy} onChange={e=>setEmail(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-600 focus:outline-none" placeholder="you@example.com" />
        {otpSent && <>
          <label htmlFor="student-otp" className="block text-sm font-semibold text-slate-700">Email verification code</label>
          <input id="student-otp" type="text" inputMode="numeric" autoComplete="one-time-code" required value={token} onChange={e=>setToken(e.target.value)} className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-emerald-600 focus:outline-none" placeholder="Enter email OTP" />
        </>}
        <button type="submit" disabled={busy || !studentSupabase} className="w-full rounded-xl border border-emerald-600 px-5 py-3 font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 disabled:opacity-50">{busy ? 'Please wait…' : otpSent ? 'Verify OTP' : 'Send email OTP'}</button>
        {otpSent && <button type="button" className="text-sm text-emerald-700 underline" onClick={()=>{setOtpSent(false);setToken('');}}>Use a different email</button>}
      </form>
      {!studentSupabase && <p className="mt-3 text-sm text-amber-700">Student sign-in is being configured.</p>}
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
      <Link to="/" className="mt-6 inline-block text-sm font-medium text-emerald-700 hover:underline">Back to home</Link>
    </div>
  </main>;
}
