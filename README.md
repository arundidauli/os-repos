# 🚀 OSMoney — Open-Source High-ROI Repositories Catalog

> **A curated, production-ready directory of high-impact open-source software replacing expensive proprietary SaaS ($100s/mo), complete with monetization playbooks for agencies, freelancers, and indie builders.**

[![Deploy to GitHub Pages](https://github.com/actions/workflows/deploy.yml/badge.svg)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Built with Vite + React + Tailwind](https://img.shields.io/badge/Built%20with-Vite%20%7C%20React%2018%20%7C%20TailwindCSS-06b6d4.svg)](https://vitejs.dev)
[![100% Client Side](https://img.shields.io/badge/Architecture-100%25%20Static%20%7C%20No%20Backend-purple.svg)](https://pages.github.com)

---

## ⚡ Highlights & Features

- 💎 **70+ Hand-Curated Repositories**: Covering AI & Agents, Automation, CRM, ERP, Observability, Marketing, Mobile Dev, Payments, and more.
- 💰 **SaaS Replacement & ROI Comparison**: Direct comparison with expensive tools like Zapier, Salesforce, Datadog, Calendly, Retool, DocuSign, and Typeform.
- 🇮🇳 **Made in India Spotlight**: Prominent badges for trailblazing projects like ERPNext, Chatwoot, Appsmith, SigNoz, Bruno, Listmonk, and UPI-Utils.
- 🧮 **Interactive SaaS Savings & Retainer Calculator**: Calculate exact monthly and annual savings and see recommended self-hosted stacks.
- ⭐ **Local Bookmarks & Favorites**: Persisted in `localStorage` with a 1-click filter.
- 📋 **Quick Clone & Docker Snippets**: 1-click copy for `git clone` and `docker run` / `docker compose` commands.
- 🔍 **Power Search & Filtering**: Instant search (⌘K / Ctrl+K), category filters, and quick tags.
- 📊 **Dual View Modes**: Switch seamlessly between modern responsive Grid cards and high-density Table comparison view.
- 📥 **Zero-Backend Data Export**: Download filtered data as CSV, JSON, or copy a formatted GitHub Markdown table.
- 🌐 **100% Static & GitHub Pages Ready**: Zero backend required; works directly on GitHub Pages (`https://<user>.github.io/<repo>/`).

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler & Dev Server**: Vite 6 (Relative base `./` for zero-configuration subpath deployment)
- **Styling**: Tailwind CSS + Custom Glassmorphism & Cyber/Fintech Dark Palette
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (Automated via GitHub Actions + `gh-pages` fallback)

---

## 🚀 Quick Start (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production
```bash
npm run build
```
The compiled, production-ready static assets will be in the `dist/` directory.

### 5. Preview production build locally
```bash
npm run preview
```

---

## 🚢 Deploy to GitHub Pages (2 Easy Options)

### Option 1: Automatic Zero-Config Deployment via GitHub Actions (Recommended)

1. Push your repository to GitHub (`main` or `master` branch):
   ```bash
   git init
   git add .
   git commit -m "feat: production-ready OSMoney web app"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. That's it! The workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) will automatically build and deploy your site on every push. Your site will be live at:
   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```

---

### Option 2: Deploy using the `gh-pages` CLI

If you prefer deploying via local command line:
```bash
npm run deploy
```
This runs `npm run build` and deploys the `dist` folder to your `gh-pages` branch.

---

## 📂 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions automated deployment
├── src/
│   ├── components/
│   │   ├── CalculatorModal.tsx # SaaS savings & agency retainer calculator
│   │   ├── ExportModal.tsx     # CSV, JSON, Markdown export
│   │   ├── FilterBar.tsx       # Search, category, sort & view switcher
│   │   ├── Footer.tsx          # Clean footer with MIT notice
│   │   ├── Hero.tsx            # Animated hero section & stat ribbon
│   │   ├── Navbar.tsx          # Header with navigation & quick action triggers
│   │   ├── RepoCard.tsx        # Modern glass card view
│   │   ├── RepoDetailModal.tsx # Deep-dive deployment & playbook modal
│   │   ├── RepoTableView.tsx   # Dense tabular comparison view
│   │   └── Toast.tsx           # Non-intrusive action feedback toasts
│   ├── data/
│   │   └── repos.ts            # Curated catalog with 70+ repositories
│   ├── hooks/
│   │   └── useFavorites.ts     # LocalStorage bookmark manager
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces & types
│   ├── utils/
│   │   ├── categories.tsx      # Category metadata, colors & icons
│   │   └── export.ts           # CSV, JSON, and Markdown generation
│   ├── App.tsx                 # Main application state & orchestration
│   ├── index.css               # Tailwind directives & glassmorphism
│   └── main.tsx                # React DOM entry point
├── index.html                  # HTML template with SEO & Open Graph meta
├── package.json                # Project dependencies & scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS theme extension
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration (relative base for GH Pages)
```

---

## 🤝 Contributing

Have an open-source project that helps developers save money or run an agency?
1. Fork the repo.
2. Add your repository to `src/data/repos.ts`.
3. Test locally with `npm run build`.
4. Open a Pull Request!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
