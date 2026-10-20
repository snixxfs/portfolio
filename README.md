# Ayush S Kulkarni — Executive Engineering & Venture Portfolio

A production-ready personal brand platform designed and engineered for **Ayush S Kulkarni** — Computer Science & Engineering (AI/ML) builder, President of ECell, and Core Member of the AWS Student Builders Group at RV University.

![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.170-000000?logo=threedotjs&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.13-88CE02?logo=greensock&logoColor=white)
![Vercel Ready](https://img.shields.io/badge/Vercel-Deployment%20Ready-000000?logo=vercel&logoColor=white)

---

## ✦ Canonical Executive Profile

- **Verified Experience Track Record**:
  - **President | ECell, RV University** (Jun 2025 – Present): Progressed from Head to Director of Partnerships & Engagements to President. Lead strategic partnerships, campus engagement, and student founder initiatives.
  - **Core Member | AWS Student Builders Group**: Contribute to a student-led community focused on cloud technologies, AWS, and building practical technical solutions.
  - **Project Executive | CEDAT** (Jun 2026 – Present): Oversee projects and develop strategic partnerships across Bengaluru’s startup and VC ecosystem; engage with VC funds, investors, banks, and government bodies.
  - **Head of Sponsorships | Kalpavikas 1.0 & 2.0**: Secured ₹13 lakh in sponsorships from 20 brands (₹2.8 lakh cash + ₹10.2 lakh in-kind) with Mercedes-Benz, Cisco, Mahindra, Red Bull, TVS Motors, Nokia, ixigo, CodeChef, and HP.
  - **Main Coordinator | ARGONYX ’26** (Sep 2026): Co-led a 24-hour national hackathon featuring 220+ registered teams across 5 countries.
  - **Organizing Team | Startup World Cup – Bengaluru Regional Finale** (Aug 2026): Supported event operations for the regional finale organized by Pegasus Tech Ventures in collaboration with CEDAT.
  - **Community Builder | Telegram**: Built and grew a Telegram community to 10,000+ subscribers; connected with experienced mentors across aviation, real estate, and taxation.
  - **Placement Coordinator | RV University**: Act as a liaison between students, the placement cell, and recruiters.
  - **Board Member | RUDRA – RVU Data Analytics** (Oct 2024 – Oct 2025): Co-organized a Toyota-sponsored ideathon and evaluated student solutions.
  - **Technical Team Member | GDG On Campus, RV University** (Oct 2024 – Oct 2025): Supported hackathons, developed quiz questions, and managed qualifier rounds for Codeverse 2025.

---

## ✦ Architecture & Technology Stack

- **Framework**: React 19 + TypeScript (Strict Type Safety + ES2022)
- **Bundler & Tooling**: Vite 6 (ESM, Rollup chunk splitting, lazy WebGL loading)
- **Visuals & Motion**:
  - **Three.js + GLSL Shaders**: Procedural organic noise field responding to interactive cursor physics.
  - **GSAP + ScrollTrigger + SplitText**: Cinematic typography reveals, letter-scatter micro-interactions, scrub timelines.
  - **Lenis Smooth Scroll**: Inertial physics-driven scrolling with reduced-motion fallbacks.
- **Interactive Easter Eggs**:
  - **Developer Shell Overlay**: Triggered via `~` or the navigation `SHELL` button (`help`, `roles`, `whoami`, `projects`, `sponsors`, `resume`, `theme`, `sudo hire`, `matrix`).
  - **Konami Code**: `↑ ↑ ↓ ↓ ← → ← → B A` activates overdrive confetti mode.
  - **Secret Keyword**: Typing `hire` anywhere triggers direct email copy.
  - **Glitch Mode**: Five clicks on the hero surname triggers glitch state.
  - **DevTools Telemetry**: Custom console greetings and viewport inspection detection.
  - **Dynamic Tab Visibility**: Adapts page title when user switches tabs.

---

## ✦ All 11 Verified Section IDs

1. `#hero` — Hero with WebGL neural shader, HUD telemetry, and metric strip.
2. `#about` — Editorial typography, word scrub, and live appointments terminal.
3. `#impact` — Verified quantitative metrics with animated counter rollups.
4. `#fit` — Cross-functional Builder, Capital, and Leadership matrix.
5. `#hats` — Build, Close, and Orchestrate interactive capability tabs.
6. `#exp` — Leadership timeline with live appointments and progress rail.
7. `#vc` — CEDAT venture network with funds and angel syndicates.
8. `#brands` — Marquee ticker and 20 enterprise brand partner directory.
9. `#work` — Interactive 3D tilt project cards with category filtering and specs.
10. `#stack` — Technical skill clusters and verified credentials.
11. `#contact` — Direct channels, phone, email, and one-click copy buttons.

---

## ✦ Local Development & Build Commands

### 1. Installation
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173` to view the live development environment.

### 3. Production Build
```bash
npm run build
```
Executes `tsc -b` type checking followed by Vite production bundling into `dist/`.

### 4. Production Preview
```bash
npm run preview
```
Spins up a local server serving the optimized `dist/` production assets.

---

## ✦ Vercel Deployment Instructions

This repository is pre-configured for zero-friction continuous deployment on Vercel.

### Method A: Deploy via GitHub (Recommended)

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete portfolio redesign and Vercel readiness"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and log in.
3. Click **Add New...** > **Project**.
4. Select your GitHub repository.
5. Vercel will automatically detect the **Vite** framework preset:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**. The site will deploy in seconds and generate an active `.vercel.app` URL.

### Method B: Deploy via Vercel CLI

1. Install the Vercel CLI globally:
   ```bash
   npm i -g vercel
   ```
2. Run from the workspace root:
   ```bash
   vercel
   ```
3. For production release:
   ```bash
   vercel --prod
   ```

---

## ✦ Verification Checklist

- [x] TypeScript compilation (`tsc -b`) succeeds with 0 errors.
- [x] Vite production bundle built with chunk isolation (`react`, `gsap`, `webgl`, `app`).
- [x] Verified current roles: **President of ECell** and **Core Member of AWS Student Builders Group at RVU**.
- [x] All 11 required section IDs implemented and navigable.
- [x] WebGL shader lazy-loaded on supported devices; fallback on mobile/reduced-motion.
- [x] Keyboard navigation, focus traps, and screen-reader semantics validated.
- [x] `vercel.json` included for SPA rewrites and asset caching.
- [x] Resume asset available at `/ayush_resume.pdf`.
