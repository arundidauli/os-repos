import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Github, Star, ArrowUpRight, Zap, Code2, 
  Terminal, Database, Globe, Briefcase, Activity, LayoutTemplate, 
  X, ChevronDown, Command, Smartphone, ShieldCheck, Mail, Calendar, MessageSquare
} from 'lucide-react';

interface Repo {
  name: string;
  repo: string;
  stars: string;
  cat: string;
  pays: string;
  note: string;
}

const REPOS: Repo[] = [
  {name:"n8n",repo:"n8n-io/n8n",stars:"153k",cat:"automation",pays:"Zapier $100/mo",note:"Agency ₹15-50k setup + ₹5-15k/mo; WhatsApp via WATI"},
  {name:"Dify",repo:"langgenius/dify",stars:"90k+",cat:"ai",pays:"Custom AI backend",note:"AI wrapper SaaS ₹4k-40k/mo"},
  {name:"Cal.com",repo:"calcom/cal.com",stars:"35k+",cat:"booking",pays:"Calendly $16/mo",note:"Clinics/salons ₹10-25k setup"},
  {name:"Twenty",repo:"twentyhq/twenty",stars:"30k+",cat:"crm",pays:"Salesforce $165/mo",note:"Migration + hosting ₹5k/mo"},
  {name:"Medusa",repo:"medusajs/medusa",stars:"28k+",cat:"ecommerce",pays:"Shopify $39/mo+2%",note:"Stores ₹30-80k; add Razorpay"},
  {name:"Plausible",repo:"plausible/analytics",stars:"22k+",cat:"marketing",pays:"GA360",note:"₹2k/mo hosting"},
  {name:"Listmonk",repo:"knadh/listmonk",stars:"16k",cat:"marketing",pays:"Mailchimp ₹8k/mo",note:"Made in India; SES ₹0.80/1k"},
  {name:"Documenso",repo:"documenso/documenso",stars:"14k",cat:"docs",pays:"DocuSign $25/mo",note:"Bundle in onboarding"},
  {name:"Formbricks",repo:"formbricks/formbricks",stars:"10k+",cat:"marketing",pays:"Typeform $29/mo",note:"Self survey ₹0"},
  {name:"Typebot",repo:"baptisteArno/typebot.io",stars:"8k+",cat:"marketing",pays:"ManyChat",note:"Lead bots ₹15-30k"},
  {name:"TradingAgents",repo:"TauricResearch/TradingAgents",stars:"100k",cat:"trading",pays:"Bloomberg",note:"Research only, Zerodha adapt"},
  {name:"AI Hedge Fund",repo:"virattt/ai-hedge-fund",stars:"63k",cat:"trading",pays:"-",note:"Backtest only"},
  {name:"MoneyPrinterTurbo",repo:"harry0703/MoneyPrinterTurbo",stars:"116k",cat:"content",pays:"CapCut+",note:"Hindi Shorts/Reels"},
  {name:"ERPNext",repo:"frappe/erpnext",stars:"20k+",cat:"erp",pays:"Tally/SAP",note:"Mumbai-made; ₹1-5L impl + AMC"},
  {name:"Frappe HRMS",repo:"frappe/hrms",stars:"2k+",cat:"hr",pays:"HRone/Keka ₹300/emp",note:"Payroll+GST India"},
  {name:"OrangeHRM",repo:"orangehrm/orangehrm",stars:"1.1k",cat:"hr",pays:"HRone",note:"Free HRMS"},
  {name:"Horilla",repo:"horilla-opensource/horilla",stars:"1k+",cat:"hr",pays:"HRone",note:"Indian HRMS"},
  {name:"Chatwoot",repo:"chatwoot/chatwoot",stars:"20k+",cat:"support",pays:"Intercom $100/mo",note:"Made in India; WhatsApp+Insta ₹5k/mo"},
  {name:"Coolify",repo:"coollabsio/coolify",stars:"38k+",cat:"hosting",pays:"Vercel/Heroku",note:"30 sites on ₹999 VPS"},
  {name:"Dokploy",repo:"Dokploy/dokploy",stars:"19k+",cat:"hosting",pays:"Vercel",note:"Self PaaS"},
  {name:"NocoDB",repo:"nocodb/nocodb",stars:"50k+",cat:"data",pays:"Airtable",note:"Internal tools ₹20-40k"},
  {name:"Mautic",repo:"mautic/mautic",stars:"9k+",cat:"marketing",pays:"Klaviyo $200/mo",note:"Email+SMS+WhatsApp D2C"},
  {name:"Bagisto",repo:"bagisto/bagisto",stars:"6k+",cat:"ecommerce",pays:"Shopify",note:"Made in India, Laravel"},
  {name:"Appsmith",repo:"appsmithorg/appsmith",stars:"30k+",cat:"internal",pays:"Retool",note:"Made in India low-code"},
  {name:"SigNoz",repo:"SigNoz/signoz",stars:"22k+",cat:"devops",pays:"Datadog",note:"Made in India observability"},
  {name:"Bruno",repo:"usebruno/bruno",stars:"30k+",cat:"dev",pays:"Postman",note:"Made in India"},
  {name:"Postiz",repo:"gitroomhq/postiz",stars:"35k",cat:"marketing",pays:"Buffer $100/mo",note:"30+ networks ₹5k/mo mgmt"},
  {name:"Mixpost",repo:"InovexCorp/mixpost",stars:"3.6k",cat:"marketing",pays:"Buffer",note:"MIT, self-host"},
  {name:"Notifuse",repo:"Notifuse/notifuse",stars:"2k",cat:"marketing",pays:"Mailchimp/Resend",note:"MJML+A/B"},
  {name:"BillionMail",repo:"Billionmail/BillionMail",stars:"10k+",cat:"marketing",pays:"Mailchimp",note:"Mail server+newsletter"},
  {name:"Automato",repo:"highoncarbs/automato",stars:"500+",cat:"marketing",pays:"WATI",note:"WhatsApp/SMS/Email India"},
  {name:"ChatbotX",repo:"ChatbotXIO/ChatbotX",stars:"500+",cat:"marketing",pays:"ManyChat",note:"WhatsApp/Insta bots"},
  {name:"Open SEO",repo:"every-app/open-seo",stars:"15k",cat:"marketing",pays:"Semrush $140/mo",note:"Sell audit ₹8-15k"},
  {name:"Seonaut",repo:"StJudeWasHere/seonaut",stars:"1k+",cat:"marketing",pays:"Ahrefs",note:"Free audit"},
  {name:"Google-Meta-Ads MCP",repo:"irinabuht12-oss/google-meta-ads-ga4-mcp",stars:"500+",cat:"marketing",pays:"-",note:"Ads+GA4 in Claude/n8n"},
  {name:"OpenOutreach",repo:"eracle/OpenOutreach",stars:"500+",cat:"marketing",pays:"Apollo",note:"Leads to CSV"},
  {name:"Maps Lead Gen",repo:"asiifdev/business-leads-ai-automation",stars:"100+",cat:"marketing",pays:"-",note:"Maps scraper+AI templates India"},
  {name:"PostHog",repo:"posthog/posthog",stars:"20k+",cat:"marketing",pays:"Amplitude",note:"Analytics+flags+A/B"},
  {name:"OpnForm",repo:"OpnForm/OpnForm",stars:"8k+",cat:"marketing",pays:"Typeform",note:"Free forms"},
  {name:"Playwright",repo:"microsoft/playwright",stars:"70k+",cat:"testing",pays:"BrowserStack $150/mo",note:"X-browser free"},
  {name:"Selenium",repo:"SeleniumHQ/selenium",stars:"30k+",cat:"testing",pays:"BrowserStack",note:"Grid free"},
  {name:"Plane",repo:"makeplane/plane",stars:"30k+",cat:"pm",pays:"Jira $7/u",note:"Issue tracking"},
  {name:"Mattermost",repo:"mattermost/mattermost",stars:"10k+",cat:"chat",pays:"Slack",note:"Self chat"},
  {name:"AppFlowy",repo:"AppFlowy-IO/AppFlowy",stars:"60k+",cat:"docs",pays:"Notion",note:"Notes free"},
  {name:"Jitsi",repo:"jitsi/jitsi-meet",stars:"20k+",cat:"video",pays:"Zoom",note:"Free meet"},
  {name:"Odoo",repo:"odoo/odoo",stars:"40k+",cat:"erp",pays:"SAP",note:"Full ERP"},
  {name:"Krayin",repo:"krayin/laravel-crm",stars:"5k+",cat:"crm",pays:"HubSpot",note:"Laravel CRM"},
  {name:"Keycloak",repo:"keycloak/keycloak",stars:"20k+",cat:"auth",pays:"Auth0/Okta",note:"SSO free"},
  {name:"Authentik",repo:"goauthentik/authentik",stars:"16k+",cat:"auth",pays:"Okta",note:"SSO friendly"},
  {name:"Supabase",repo:"supabase/supabase",stars:"75k+",cat:"backend",pays:"Firebase",note:"Postgres+Auth"},
  {name:"Appwrite",repo:"appwrite/appwrite",stars:"40k+",cat:"backend",pays:"Firebase",note:"Backend free"},
  {name:"Penpot",repo:"penpot/penpot",stars:"30k+",cat:"design",pays:"Figma",note:"Design free"},
  {name:"Excalidraw",repo:"excalidraw/excalidraw",stars:"90k+",cat:"design",pays:"Miro",note:"Whiteboard"},
  {name:"SimUtil",repo:"dungngminh/simutil",stars:"1k",cat:"mobile",pays:"-",note:"Launch emu/sim from TUI"},
  {name:"Tapflow",repo:"jo-duchan/tapflow",stars:"586",cat:"mobile",pays:"Appetize/BStack",note:"MIT; sims in browser"},
  {name:"scrcpy",repo:"Genymobile/scrcpy",stars:"100k+",cat:"mobile",pays:"-",note:"Mirror Android"},
  {name:"Appium",repo:"appium/appium",stars:"21k",cat:"mobile",pays:"BStack Automate",note:"X-platform driver"},
  {name:"Maestro",repo:"mobile-dev-inc/maestro",stars:"30k+",cat:"mobile",pays:"-",note:"YAML E2E"},
  {name:"maestro-runner",repo:"devicelab-dev/maestro-runner",stars:"465",cat:"mobile",pays:"-",note:"3.6x faster Maestro"},
  {name:"Detox",repo:"wix/Detox",stars:"10k+",cat:"mobile",pays:"-",note:"RN E2E"},
  {name:"GADS",repo:"shamanec/GADS",stars:"3k+",cat:"mobile",pays:"AWS Device Farm",note:"Self device farm"},
  {name:"appium-device-farm",repo:"AppiumTestDistribution/appium-device-farm",stars:"629",cat:"mobile",pays:"-",note:"Pool+parallel"},
  {name:"SolidInvoice",repo:"SolidInvoice/SolidInvoice",stars:"950",cat:"billing",pays:"Freshbooks",note:"MIT quotes+Stripe"},
  {name:"InvoiceShelf",repo:"InvoiceShelf/InvoiceShelf",stars:"1.8k",cat:"billing",pays:"Zoho Books",note:"Portal+expenses"},
  {name:"Atrium",repo:"Vibra-Labs/Atrium",stars:"200+",cat:"clients",pays:"HoneyBook $20/mo",note:"White-label portal"},
  {name:"Honorbox",repo:"Honorboxx/honorbox",stars:"100+",cat:"sell",pays:"Gumroad 10%",note:"Stripe+GitHub no fee"},
  {name:"Kimai",repo:"kimai/kimai",stars:"5k+",cat:"time",pays:"Toggl",note:"Time+billing"},
  {name:"Leantime",repo:"Leantime/leantime",stars:"5k+",cat:"pm",pays:"Asana",note:"For freelancers"},
  {name:"Umami",repo:"umami-software/umami",stars:"20k+",cat:"marketing",pays:"GA",note:"Privacy analytics"},
  {name:"Uptime Kuma",repo:"louislam/uptime-kuma",stars:"70k+",cat:"devops",pays:"Pingdom",note:"Status pages"},
  {name:"UPI-Utils",repo:"varun-productmanager/UPI-Utilis",stars:"10+",cat:"payments",pays:"-",note:"upi:// links+QR India"}
];

const getCategoryDetails = (cat: string) => {
  const details: Record<string, { color: string, icon: React.ReactNode }> = {
    automation: { color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', icon: <Zap size={14} /> },
    ai: { color: 'text-purple-400 bg-purple-400/10 border-purple-400/20', icon: <Code2 size={14} /> },
    booking: { color: 'text-pink-400 bg-pink-400/10 border-pink-400/20', icon: <Calendar size={14} /> },
    crm: { color: 'text-orange-400 bg-orange-400/10 border-orange-400/20', icon: <Briefcase size={14} /> },
    ecommerce: { color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: <Globe size={14} /> },
    marketing: { color: 'text-red-400 bg-red-400/10 border-red-400/20', icon: <Activity size={14} /> },
    docs: { color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20', icon: <LayoutTemplate size={14} /> },
    trading: { color: 'text-amber-400 bg-amber-400/10 border-amber-400/20', icon: <Activity size={14} /> },
    content: { color: 'text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20', icon: <LayoutTemplate size={14} /> },
    erp: { color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20', icon: <Database size={14} /> },
    hr: { color: 'text-lime-400 bg-lime-400/10 border-lime-400/20', icon: <Briefcase size={14} /> },
    support: { color: 'text-sky-400 bg-sky-400/10 border-sky-400/20', icon: <MessageSquare size={14} /> },
    hosting: { color: 'text-violet-400 bg-violet-400/10 border-violet-400/20', icon: <Globe size={14} /> },
    data: { color: 'text-teal-400 bg-teal-400/10 border-teal-400/20', icon: <Database size={14} /> },
    internal: { color: 'text-slate-400 bg-slate-400/10 border-slate-400/20', icon: <Code2 size={14} /> },
    devops: { color: 'text-rose-400 bg-rose-400/10 border-rose-400/20', icon: <Terminal size={14} /> },
    dev: { color: 'text-gray-400 bg-gray-400/10 border-gray-400/20', icon: <Terminal size={14} /> },
    testing: { color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', icon: <ShieldCheck size={14} /> },
    pm: { color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', icon: <Briefcase size={14} /> },
    chat: { color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20', icon: <MessageSquare size={14} /> },
    video: { color: 'text-red-400 bg-red-400/10 border-red-400/20', icon: <Activity size={14} /> },
    auth: { color: 'text-slate-300 bg-slate-300/10 border-slate-300/20', icon: <ShieldCheck size={14} /> },
    backend: { color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: <Database size={14} /> },
    design: { color: 'text-pink-400 bg-pink-400/10 border-pink-400/20', icon: <LayoutTemplate size={14} /> },
    mobile: { color: 'text-purple-400 bg-purple-400/10 border-purple-400/20', icon: <Smartphone size={14} /> },
    billing: { color: 'text-green-400 bg-green-400/10 border-green-400/20', icon: <Database size={14} /> },
    clients: { color: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20', icon: <Briefcase size={14} /> },
    sell: { color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20', icon: <Globe size={14} /> },
    time: { color: 'text-blue-400 bg-blue-400/10 border-blue-400/20', icon: <Calendar size={14} /> },
    payments: { color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', icon: <Zap size={14} /> }
  };
  return details[cat] || { color: 'text-gray-400 bg-gray-400/10 border-gray-400/20', icon: <Code2 size={14} /> };
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar glass effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(REPOS.map(r => r.cat))).sort();
  }, []);

  const filteredRepos = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return REPOS.filter(r => {
      const matchCat = !selectedCat || r.cat === selectedCat;
      const matchSearch = !query || 
        r.name.toLowerCase().includes(query) ||
        r.repo.toLowerCase().includes(query) ||
        r.pays.toLowerCase().includes(query) ||
        r.note.toLowerCase().includes(query) ||
        r.cat.toLowerCase().includes(query);
      return matchCat && matchSearch;
    });
  }, [searchQuery, selectedCat]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-100 overflow-x-hidden">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#0A0A0A]/80 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <Command size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              OS<span className="text-emerald-400">Money</span>
            </span>
          </div>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <Github size={16} />
            <span>Contribute</span>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-24">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 animate-[fadeIn_0.5s_ease-out]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-8">
            <Zap size={14} className="animate-pulse" /> Curated Developer Ecosystem
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Discover Open-Source <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 drop-shadow-sm">
              Money-Making
            </span> Repos
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Explore highly successful open-source projects, understand their monetization strategies, and discover what expensive proprietary software they replace.
          </p>

          {/* Search & Filter Bar */}
          <div className="max-w-3xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-[#111111] border border-white/10 rounded-2xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl">
              
              <div className="relative flex-grow flex items-center bg-[#1A1A1A] rounded-xl border border-white/5 hover:border-white/10 focus-within:border-emerald-500/50 transition-colors">
                <Search className="absolute left-4 text-slate-500" size={20} />
                <input 
                  id="search-input"
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects, categories, or tech..." 
                  className="w-full pl-12 pr-12 py-4 bg-transparent border-none outline-none text-white placeholder-slate-500"
                />
                <div className="absolute right-4 flex items-center gap-1 opacity-50 hidden sm:flex">
                  <kbd className="px-2 py-1 bg-black/50 rounded text-xs border border-white/10 font-sans">⌘K</kbd>
                </div>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 text-slate-400 hover:text-white sm:hidden"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="relative sm:w-48 flex-shrink-0">
                <select 
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                  className="w-full h-full appearance-none pl-4 pr-10 py-4 bg-[#1A1A1A] border border-white/5 hover:border-white/10 rounded-xl outline-none text-white cursor-pointer focus:border-emerald-500/50 transition-colors"
                >
                  <option value="">All Categories</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
              </div>

            </div>
          </div>
          
          <div className="mt-8 flex justify-center items-center gap-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <Database size={14} className="text-emerald-400" /> {REPOS.length} Repositories
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <LayoutTemplate size={14} className="text-emerald-400" /> {categories.length} Categories
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              {searchQuery || selectedCat ? (
                <>Found <span className="text-emerald-400">{filteredRepos.length}</span> Results</>
              ) : (
                'All Projects'
              )}
            </h2>
          </div>

          {filteredRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo, index) => {
                const catDetails = getCategoryDetails(repo.cat);
                const hasDirectReplacement = repo.pays !== "-";

                return (
                  <div 
                    key={repo.repo}
                    className="group relative bg-[#111111] border border-white/10 hover:border-emerald-500/30 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col h-full overflow-hidden"
                    style={{ 
                      animation: `fadeInUp 0.5s ease-out forwards`,
                      animationDelay: `${(index % 12) * 50}ms`,
                      opacity: 0,
                      transform: 'translateY(20px)'
                    }}
                  >
                    {/* Glowing hover effect behind card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex justify-between items-start mb-5">
                        <div className="pr-4">
                          <h3 className="text-xl font-bold text-white mb-1">
                            <a 
                              href={`https://github.com/${repo.repo}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                            >
                              {repo.name}
                              <ArrowUpRight size={16} className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                            </a>
                          </h3>
                          <a 
                            href={`https://github.com/${repo.repo}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-slate-500 hover:text-slate-300 flex items-center gap-1.5 transition-colors"
                          >
                            <Github size={14} /> {repo.repo.split('/')[0]}
                          </a>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-bold bg-amber-500/10 text-amber-400 px-2.5 py-1.5 rounded-lg border border-amber-500/20 shadow-inner flex-shrink-0">
                          <Star size={14} className="fill-amber-400" /> {repo.stars}
                        </div>
                      </div>

                      <div className="mb-6 flex-grow">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border mb-4 ${catDetails.color}`}>
                          {catDetails.icon}
                          {repo.cat}
                        </div>
                        
                        <div className="space-y-3">
                          <div className="bg-[#1A1A1A] rounded-xl p-3 border border-white/5 flex items-start gap-3">
                            <div className="mt-0.5 bg-white/5 p-1 rounded-md text-slate-400">
                              <Zap size={14} />
                            </div>
                            <div>
                              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Replaces</span>
                              {hasDirectReplacement ? (
                                <span className="text-sm font-medium text-slate-200">{repo.pays}</span>
                              ) : (
                                <span className="text-sm text-slate-500 italic">No direct replacement</span>
                              )}
                            </div>
                          </div>

                          <div className="bg-[#1A1A1A] rounded-xl p-3 border border-white/5 flex items-start gap-3">
                            <div className="mt-0.5 bg-emerald-500/10 p-1 rounded-md text-emerald-400">
                              <Code2 size={14} />
                            </div>
                            <div>
                              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-0.5">Notes & Monetization</span>
                              <span className="text-sm text-slate-300 leading-relaxed block">{repo.note}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-[fadeIn_0.5s_ease-out]">
              <div className="w-24 h-24 bg-[#111111] rounded-3xl border border-white/10 flex items-center justify-center mb-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
                <Search size={32} className="text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">No projects found</h3>
              <p className="text-slate-400 max-w-md mx-auto mb-8">
                We couldn't find anything matching "{searchQuery}" in {selectedCat || 'any category'}. Try adjusting your filters.
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCat(''); }}
                className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-slate-200 transition-colors hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <X size={16} /> Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0A0A0A] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Command size={20} className="text-emerald-400" />
            <span className="font-bold text-lg text-white">OSMoney</span>
          </div>
          <p className="text-sm text-slate-500 text-center md:text-left">
            Built for educational purposes. Showcase of production-level UI/UX patterns.
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <a href="#" className="hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"><Github size={20} /></a>
          </div>
        </div>
      </footer>

      {/* Inject custom animation keyframes that Tailwind handles inline or custom */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
}