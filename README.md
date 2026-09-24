# SkillSet Go EduTech — Platform Architecture & Documentation

Welcome to the **SkillSet Go EduTech** official platform repository. This platform powers project-based technical internships across 12 engineering tracks, live industry-led masterclasses, a quarterly tech journal publication, an engineering knowledge base, and a protected Admin Content & Analytics Management system.

---

## 1. Quick Start & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun

### Installation
```bash
npm install
```

### Running in Development
```bash
npm run dev
```
Starts the full-stack server (mounting Express API endpoints and Vite development middlewares) at `http://localhost:3000`.

### Production Build & Launch
```bash
npm run build
npm run start
```

---

## 2. Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Key variables:
- `PORT`: Server port (default `3000`)
- `NODE_ENV`: `development` or `production`
- `GEMINI_API_KEY`: Server-side API key for GenAI services
- `ADMIN_SESSION_SECRET`: Optional session secret token

---

## 3. Secret Admin Entry & Authentication

### Hidden Shortcut
To access the administrative dashboard, press the following keyboard combination on any public page:
- **Windows / Linux**: `CTRL + SHIFT + A`
- **macOS**: `CMD + SHIFT + A`

This shortcut redirects to the login route:
```
/admin/login
```

### Security Standard
The keyboard shortcut is **only a navigational convenience, not a security mechanism**. All `/admin/*` routes are strictly protected by the `ProtectedRoute` guard. Direct navigation or URL discovery by unauthenticated visitors immediately redirects to `/admin/login`.

### Development Credentials (Local / Staging Only)
- **Admin Email**: `admin@skillsetgo.com`
- **Password**: `Admin@SSG2026!` *(Safe development placeholder)*
- Auto-fill button is available on the login form for testing.

---

## 4. Administrative Features & Content Management

1. **Overview Dashboard (`/admin`)**:
   - Active metrics: Total Workshops, Upcoming Sessions, Published Magazines, Published Articles, Total Application Clicks, and Clicks Today.
   - Real-time audit activity stream.

2. **Announcements & Updates (`/admin/updates`)**:
   - Create, edit, publish/unpublish, and delete announcements.
   - Priority levels: *Normal*, *Important*, and *Urgent*. Urgent and important updates trigger the public top banner.

3. **Workshops Management (`/admin/workshops`)**:
   - Add, edit, delete, and change status (*Registration Open*, *Upcoming*, *Completed*, *Cancelled*).
   - Updates immediately synchronize to the public `/workshops` and `/workshops/:slug` pages.

4. **Magazine Publication (`/admin/magazine`)**:
   - Create, edit, publish/unpublish quarterly editions, and configure table of contents and PDF links.
   - Synchronizes directly with public `/magazine`.

5. **Articles Knowledge Base (`/admin/articles`)**:
   - Write, edit, and publish technical guides and career roadmaps with category assignment and Markdown formatting.

6. **Application Link Click Analytics (`/admin/analytics`)**:
   - Track and analyze user clicks on the *"Apply for Internship"* button.
   - Clearly labeled as **"Clicks"** (not "Applications Received" until form submission is integrated).
   - Filter by *Today*, *Last 7 Days*, *Last 30 Days*, and *All Time*.
   - View visual daily trend bars, clicks by internship track, and clicks by referral page.
   - Export raw click logs to JSON.

7. **Future Modules (Under Construction)**:
   - *Users* (`/admin/users`)
   - *Domains* (`/admin/domains`)
   - *Projects* (`/admin/projects`)
   - *Offer Letters* (`/admin/offer-letters`)
   - *Total Sales* (`/admin/sales`)
   - *Categories* (`/admin/categories`)

---

## 5. Centralized Internship Application Workflow

### Configuration
The Google Form application URL is centralized in a single file:
```javascript
// src/config/siteConfig.js
export const siteConfig = {
  applicationFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdrxqrL94MGoquJU_q1T_JATzufCRSAhJ1LFqMl3HkCaBJOkQ/viewform?usp=dialog",
  ...
};
```
To update the admissions form for a new cohort cycle, modify `applicationFormUrl` in `src/config/siteConfig.js`. All Apply buttons across the entire website will immediately use the updated URL.

### Click-Tracking Engine
- Handled by `src/utils/applicationTracker.js`.
- Clicks pass `{ internshipSlug, internshipName, sourcePage, timestamp }` and are logged in local audit storage as well as synchronized with the backend.
- **Fail-Safe Guarantee**: If tracking or storage encounters an error, the user is **never blocked** and will still be redirected to the Google Form smoothly.

---

## 6. Codebase Structure

```
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── server.js               # Full-stack Express server (API & Vite middleware)
├── src/
│   ├── App.tsx             # Route architecture & global shortcut listener
│   ├── config/
│   │   └── siteConfig.js   # Centralized platform settings, form URL, metrics
│   ├── data/               # Baseline data for internships, workshops, magazine, articles
│   ├── hooks/
│   │   └── useAdminShortcut.js # Secret Ctrl+Shift+A navigation listener
│   ├── layouts/
│   │   └── AdminLayout.jsx # Professional enterprise admin dashboard layout
│   ├── pages/
│   │   ├── admin/          # Admin pages (Dashboard, Updates, Workshops, etc.)
│   │   ├── legal/          # Privacy, Terms, Refund, Cancellation, Cookie, Disclaimer
│   │   ├── Home.jsx
│   │   ├── Internships.jsx
│   │   ├── InternshipDetails.jsx
│   │   ├── Workshops.jsx
│   │   ├── WorkshopDetails.jsx
│   │   ├── Magazine.jsx
│   │   ├── Articles.jsx
│   │   ├── Goodies.jsx
│   │   ├── About.jsx
│   │   ├── FAQ.jsx
│   │   └── Contact.jsx
│   ├── services/
│   │   ├── authService.js  # Admin authentication & session management
│   │   └── contentService.js # Persistent CRUD repository for admin modules
│   └── utils/
│       └── applicationTracker.js # Safe click logging & redirect engine
```
