# Skill Set Go — authentication deployment checklist

This branch is NOT production-ready until the following steps have passed.

## Supabase
Project: `tzdxqwetsxktnrcpdnqs`.

- Set hosting environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. Use only the publishable key in Vite, never a service-role/secret key.
- Configure Google provider in Supabase Authentication using a Google Cloud OAuth client. Set the OAuth callback to `https://tzdxqwetsxktnrcpdnqs.supabase.co/auth/v1/callback`. Configure authorized app domains and the application redirect URL `https://YOUR_DOMAIN/student` in Supabase URL Configuration.
- Enable Email authentication. Change the Magic Link email template to issue a **code**, e.g. `<p>Your one-time sign-in code: {{ .Token }}</p>`. Otherwise `signInWithOtp` sends a magic link rather than an email code.
- Set a reliable custom SMTP service for public production use, with suitable rate limits.
- Configure `/student` as an allowed redirect URL and run test sign-ins with both methods.
- `student_profiles` is auto-created by a database trigger; signing in does NOT confer verified internship status.
- `credentials` currently starts empty. Load only verified, authorized records. Public verification deliberately returns only status/type/program/date, never names or email addresses.
- Public `verify_credential` uses SECURITY DEFINER because the underlying table is RLS-locked; treat the advisor warnings as an intentional exception ONLY after security review. Add abuse/rate limiting at the edge before public launch.

## Dependencies and quality gates
- **Blocker:** `package.json` includes `@supabase/supabase-js` but `package-lock.json` has not yet been regenerated. Run `npm install`, commit the updated lockfile, then run `npm ci`, `npm run build`, `npm run lint`.
- Verify Express API content endpoints, admin authentication, and Vercel deployment support against the actual hosting environment.
- Development admin password previously shipped in client source history. **Rotate all matching real admin passwords immediately**; removing the frontend string does not revoke the compromised secret or remove old Git commits.
- Audit server-side authentication, credential storage, and authorization before merging.
- Do not launch until Google OAuth, OTP delivery and verification, public verification, no-results behavior and mobile layouts are tested.
- Confirm November cohort enrollment dates/form before advertising the cohort as open. Do not publish unverified metrics or demo records.

## PR
https://github.com/arceus6667-art/alpha-ssg/pull/1
