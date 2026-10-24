import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const studentSupabase = url && key ? createClient(url, key) : null;

export async function signInStudentWithGoogle() {
  if (!studentSupabase) throw new Error('Student sign-in is not configured yet.');
  const { error } = await studentSupabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/student` },
  });
  if (error) throw error;
}

export async function sendStudentEmailOtp(email) {
  if (!studentSupabase) throw new Error('Student sign-in is not configured yet.');
  const { error } = await studentSupabase.auth.signInWithOtp({
    email: email.trim(),
    options: { shouldCreateUser: true },
  });
  if (error) throw error;
}

export async function verifyStudentEmailOtp(email, token) {
  if (!studentSupabase) throw new Error('Student sign-in is not configured yet.');
  const { data, error } = await studentSupabase.auth.verifyOtp({
    email: email.trim(),
    token: token.trim(),
    type: 'email',
  });
  if (error) throw error;
  return data;
}
