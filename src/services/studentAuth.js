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
