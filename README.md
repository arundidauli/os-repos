# OSVault — Open-Source Alternatives to Commercial Software

> **A curated, production-ready directory of high-impact open-source software replacing expensive proprietary subscriptions, complete with self-hosting commands and client service guides.**

[Live](https://arundidauli.github.io/os-repos/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Built with Vite + React + Tailwind](https://img.shields.io/badge/Built%20with-Vite%20%7C%20React%2018%20%7C%20TailwindCSS-06b6d4.svg)](https://vitejs.dev)
[![100% Client Side](https://img.shields.io/badge/Architecture-100%25%20Static%20%7C%20No%20Backend-purple.svg)](https://pages.github.com)

---

## Highlights & Features

- **90+ Curated Repositories**: Covering AI, Automation, CRM, ERP, Observability, Marketing, Mobile Testing, and Client Billing.
- **Commercial Tool Replacements**: Direct alternatives to expensive services such as Zapier, Salesforce, Datadog, Calendly, Retool, DocuSign, Slack, and Jira.
- **Spotlight on India**: Prominent badges and filters for projects built by Indian teams, including ERPNext, Chatwoot, Appsmith, ToolJet, SigNoz, Bruno, and Listmonk.
- **Interactive Cost Savings Calculator**: Estimate team and client subscription savings by selecting the commercial tools you currently pay for.
- **Local Bookmarks**: Save favorite projects directly in your browser with local storage.
- **One-Click Run Snippets**: Copy ready-to-run `git clone` and `docker run` / `docker compose` commands.
- **Quick Keyboard Search**: Search projects instantly with <kbd>Cmd</kbd> + <kbd>K</kbd> or <kbd>Ctrl</kbd> + <kbd>K</kbd>.
- **Dual Display Modes**: Toggle between modern Card Grid and dense Table comparison views.
- **Client-Side Data Export**: Export the catalog to CSV, JSON, or formatted Markdown tables without any server needed.
- **100% Static & GitHub Pages Ready**: Ready for automated deployment via GitHub Actions.

---

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler**: Vite 6 (Configured with relative base `./` for subpath hosting on GitHub Pages)
- **Styling**: Tailwind CSS + Custom Dark Theme
- **Icons**: Lucide React (Clean SVG icons, zero emoji dependencies)
- **Deployment**: GitHub Pages (Automated via GitHub Actions + `gh-pages` script)

---

## Quick Start (Local Development)

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
Static assets will be compiled into the `dist/` directory.

### 5. Preview production build locally
```bash
npm run preview
```

---

## Deploy to GitHub Pages

### Option 1: Automatic Zero-Config Deployment via GitHub Actions (Recommended)

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: update to OSVault with SEO and icon updates"
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. GitHub will build and publish your site at:
   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```

---

### Option 2: Deploy using the `gh-pages` CLI

```bash
npm run deploy
```

---

## License

This project is licensed under the [MIT License](LICENSE). All proprietary product names and registered trademarks are property of their respective owners.
