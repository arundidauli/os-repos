import React from 'react';
import { 
  Terminal, Bookmark, Calculator, Download, 
  Github, Sparkles
} from 'lucide-react';

interface NavbarProps {
  favoritesCount: number;
  showOnlyFavorites: boolean;
  onToggleFavoritesFilter: () => void;
  onOpenCalculator: () => void;
  onOpenExport: () => void;
  isScrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  showOnlyFavorites,
  onToggleFavoritesFilter,
  onOpenCalculator,
  onOpenExport,
  isScrolled
}) => {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#08090d]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl shadow-black/40' 
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group select-none" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-105 group-hover:shadow-emerald-500/40 transition-all duration-300">
            <Terminal size={19} className="text-black font-extrabold" />
          </div>
          <div>
            <span className="font-bold text-xl tracking-tight text-white flex items-center gap-1.5">
              OS<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Money</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold tracking-wider">
                Production
              </span>
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Savings Calculator Trigger */}
          <button
            onClick={onOpenCalculator}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-emerald-500/30"
            title="Calculate SaaS savings vs Open Source"
          >
            <Calculator size={15} className="text-emerald-400" />
            <span className="hidden sm:inline">Savings Calculator</span>
          </button>

          {/* Bookmarks / Favorites Toggle */}
          <button
            onClick={onToggleFavoritesFilter}
            className={`flex items-center gap-2 text-xs sm:text-sm font-medium px-3 py-2 rounded-xl border transition-all ${
              showOnlyFavorites
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-lg shadow-amber-500/10'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
            }`}
            title="Show saved repositories"
          >
            <Bookmark size={15} className={showOnlyFavorites ? 'fill-amber-400 text-amber-400' : 'text-slate-400'} />
            <span className="hidden md:inline">Saved</span>
            {favoritesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center border border-amber-400/40">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Export Catalog */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:border-white/20"
            title="Export repository list"
          >
            <Download size={15} className="text-cyan-400" />
            <span className="hidden lg:inline">Export</span>
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-200 hover:text-white px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/30 transition-all shadow-sm"
          >
            <Github size={16} />
            <span className="hidden sm:inline">Star & Share</span>
          </a>
        </div>
      </div>
    </header>
  );
};
