import React, { useState } from 'react';
import { Search, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { studentSupabase } from '../services/studentAuth';

export default function VerificationPortal() {
  const [identifier, setIdentifier] = useState('');
  const [result, setResult] = useState(null);
  const [state, setState] = useState('idle');
  const [message, setMessage] = useState('');

  async function handleVerify(event) {
    event.preventDefault();
    setResult(null);
    const clean = identifier.trim().toUpperCase();
    if (clean.length < 6 || clean.length > 100) {
      setMessage('Please enter a valid credential ID (6–100 characters).');
      setState('error');
      return;
    }
    if (!studentSupabase) {
      setMessage('Verification is temporarily unavailable. Please try again later.');
      setState('error');
      return;
    }
    setState('loading');
    setMessage('');
    const { data, error } = await studentSupabase.rpc('verify_credential', { p_credential_id: clean });
    if (error) {
      setMessage('Unable to check this credential right now. Please try again later.');
      setState('error');
      return;
    }
    if (!data?.length) {
      setMessage('No matching credential found. Please confirm the ID with its issuer.');
      setState('not_found');
      return;
    }
    setResult(data[0]);
    setState('found');
  }

  return <div className="min-h-[70vh] bg-slate-50 py-16 px-4">
    <SEO title="Credential Verification | SkillSet Go EduTech" description="Look up credentials issued by SkillSet Go EduTech." />
    <section className="mx-auto max-w-xl rounded-3xl border border-emerald-100 bg-white p-8 shadow-xl shadow-emerald-950/5">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><ShieldCheck size={28} /></div>
      <h1 className="mt-5 text-center text-3xl font-bold tracking-tight text-slate-900">Verify a Credential</h1>
      <p className="mt-3 text-center text-sm text-slate-600">Enter an official certificate, internship or offer letter ID. Results are checked against the credential registry.</p>
      <form onSubmit={handleVerify} className="mt-8 space-y-3">
        <label htmlFor="credential-id" className="block text-sm font-semibold text-slate-700">Credential ID</label>
        <input id="credential-id" required maxLength={100} autoComplete="off" value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="Enter your exact credential ID" className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm uppercase focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-200" />
        <button disabled={state === 'loading'} type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition-all hover:bg-emerald-700 disabled:opacity-60">{state === 'loading' ? <Loader2 size={18} className="animate-spin"/> : <Search size={18} />} Verify Credential</button>
      </form>
      {(state === 'not_found' || state === 'error') && <div role="status" className="mt-6 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><AlertCircle className="shrink-0" size={18}/>{message}</div>}
      {state === 'found' && result && <div role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-950">
        <h2 className="text-lg font-bold">{result.status === 'valid' ? 'Credential verified' : 'Credential revoked'}</h2>
        <dl className="mt-4 space-y-2">
          <div><dt className="font-semibold">Type</dt><dd className="capitalize">{result.credential_type?.replaceAll('_',' ')}</dd></div>
          {result.program_name && <div><dt className="font-semibold">Program</dt><dd>{result.program_name}</dd></div>}
          {result.issued_on && <div><dt className="font-semibold">Issued</dt><dd>{result.issued_on}</dd></div>}
          <div><dt className="font-semibold">Status</dt><dd className="capitalize">{result.status}</dd></div>
        </dl>
      </div>}
      <p className="mt-6 text-center text-xs text-slate-500">Only approved public credential details are shown. Signing in does not automatically verify an internship.</p>
    </section>
  </div>;
}
