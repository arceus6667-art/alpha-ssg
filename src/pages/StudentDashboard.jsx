import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { studentSupabase } from '../services/studentAuth';

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (!studentSupabase) { navigate('/login', { replace: true }); return; }
    studentSupabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) navigate('/login', { replace: true });
      else setUser(data.user);
      setLoading(false);
    });
    const { data: { subscription } } = studentSupabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/login', { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  if (loading || !user) return <div className="mx-auto max-w-4xl p-8">Checking student session…</div>;
  return <main className="mx-auto max-w-4xl px-6 py-16">
    <h1 className="text-3xl font-bold text-slate-900">Student Dashboard</h1>
    <p className="mt-3 text-slate-600">Signed in as {user.email}</p>
    <p className="mt-6 text-sm text-slate-500">Your verified internship and certificate records will appear here when connected.</p>
    <button className="mt-8 rounded-xl bg-emerald-600 px-5 py-3 text-white hover:bg-emerald-700" onClick={async () => { await studentSupabase.auth.signOut(); navigate('/login'); }}>Sign out</button>
    <Link to="/" className="ml-4 text-emerald-700">Home</Link>
  </main>;
}
