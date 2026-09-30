import React from 'react';
import { Zap, Star, ShieldCheck, DollarSign, Layers } from 'lucide-react';
import { Repo } from '../types';

interface HeroProps {
  repos: Repo[];
  categoriesCount: number;
  onSelectQuickTag?: (tag: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ repos, categoriesCount, onSelectQuickTag }) => {
  const totalStarsCount = repos.reduce((acc, r) => acc + r.starCount, 0);
  const formattedStars = (totalStarsCount / 1000).toFixed(0) + 'k+';
  const madeInIndiaCount = repos.filter(r => r.isMadeInIndia).length;
  const estimatedSavings = repos.reduce((acc, r) => acc + (r.monthlySavingsUsd || 0), 0);

  return (
    <section className="relative pt-32 pb-12 sm:pb-16 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 blur-[130px] -z-10 pointer-events-none" />

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
        <Zap size={14} className="animate-pulse text-emerald-400" />
        <span>Curated Enterprise & Agency Ecosystem</span>
      </div>

      {/* Main Title */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
        Discover Open-Source <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-sm">
          Money-Making
        </span> Repositories
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
        A battle-tested catalog of high-impact open-source tools replacing pricey proprietary SaaS ($100s/mo), with verified monetization playbooks for agencies, freelancers, and startups.
      </p>

      {/* Stat Cards Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10">
        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-2xl sm:text-3xl font-mono mb-1">
            <Layers size={22} />
            <span>{repos.length}</span>
          </div>
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Curated Repos</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-2xl sm:text-3xl font-mono mb-1">
            <Star size={22} className="fill-amber-400/20" />
            <span>{formattedStars}</span>
          </div>
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">GitHub Stars</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold text-2xl sm:text-3xl font-mono mb-1">
            <DollarSign size={22} />
            <span>${estimatedSavings.toLocaleString()}</span>
          </div>
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Mo. SaaS Replaced</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-1.5 text-orange-400 font-bold text-2xl sm:text-3xl font-mono mb-1">
            <ShieldCheck size={22} />
            <span>{madeInIndiaCount} Repos</span>
          </div>
          <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider">Made in India 🇮🇳</span>
        </div>
      </div>
    </section>
  );
};
