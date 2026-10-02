# Tejas Karekar Portfolio

Personal developer portfolio for Tejas Karekar, showcasing mobile, AI-powered, full-stack, and automation projects.

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Vite writes the static production site to `dist/`.

## Content and assets

Update personal details, social URLs, the optional resume path, and project records in `src/data/portfolio.ts`.

- Add a real resume as `public/resume.pdf`, then set `personalInfo.resume` to `/resume.pdf`.
- Add profile and project assets under `public/images/`; see `public/images/README.md` for paths.
- Leave missing links and assets as `null`; the UI hides unavailable actions and keeps abstract project visuals.

## Environment variables

This static portfolio does not require environment variables. If you add public build-time configuration later, use `VITE_`-prefixed values and add their non-secret names to `.env.example`. Never put API keys, service credentials, or private tokens in frontend environment variables.

## Deployment

Deploy the generated `dist/` folder to Vercel, Netlify, Cloudflare Pages, or GitHub Pages. The site is a single-page Vite application with no server routes or backend required.
