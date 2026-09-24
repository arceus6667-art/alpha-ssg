# Skill Set Go Internship Portal — React/Vite

This project converts the supplied Google Stitch design into a simple, maintainable React website.

## What is included
- Home page inspired by the Stitch design
- All Internships page with search + category filters
- Reusable internship cards
- Dynamic internship detail route (`/internships/:slug`)
- 11 internship domains stored in one data file
- Sticky application summary on desktop
- Sticky Apply button on mobile
- Responsive navigation
- No login, no authentication, no database, no backend
- Google Form application links are intentionally blank for now

## Run locally
```bash
npm install
npm run dev
```

## Build for production
```bash
npm run build
```

## Add Google Form links
Open:

`src/data/internships.js`

Each internship contains:
```js
applyLink: ''
```

Replace it with the Google Form URL:
```js
applyLink: 'https://forms.gle/EXAMPLE'
```

The Apply button will automatically become active and open the form in a new tab.

## Edit internship content
All internship data lives in:

`src/data/internships.js`

To add a new internship, duplicate one object, give it a unique `slug`, and update its title, skills, projects and application URL.

## Deploy on Vercel
1. Push this folder to a GitHub repository.
2. Import the repository into Vercel.
3. Vercel should detect Vite automatically.
4. Build command: `npm run build`
5. Output directory: `dist`

For client-side routes on Vercel, `vercel.json` is already included.
