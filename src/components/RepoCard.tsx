import React, { useState } from 'react';
import { 
  Star, ArrowUpRight, Github, Zap, Code2, 
  Bookmark, Copy, Check, ExternalLink, Info, Terminal
} from 'lucide-react';
import { Repo } from '../types';
import { getCategoryDetails } from '../utils/categories';

interface RepoCardProps {
  repo: Repo;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectRepo: (repo: Repo) => void;
  onShowToast: (message: string) => void;
  animationDelayMs?: number;
}

export const RepoCard: React.FC<RepoCardProps> = ({
  repo,
  isFavorite,
  onToggleFavorite,
  onSelectRepo,
  onShowToast,
  animationDelayMs = 0
}) => {
  const [copied, setCopied] = useState(false);
  const catDetails = getCategoryDetails(repo.cat);
  const hasDirectReplacement = repo.pays && repo.pays !== '-';

  const handleCopyClone = (e: React.MouseEvent) => {
    e.stopPropagation();
    const command = `git clone https://github.com/${repo.repo}.git`;
    navigator.clipboard.writeText(command);
    setCopied(true);
    onShowToast(`Copied clone command for ${repo.name}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(repo.id);
    onShowToast(isFavorite ? `Removed ${repo.name} from saved` : `Saved ${repo.name} to bookmarks`);
  };

  return (
    <article 
      onClick={() => onSelectRepo(repo)}
      className="group relative glass-panel glass-panel-hover rounded-2xl p-5 sm:p-6 flex flex-col h-full cursor-pointer overflow-hidden transition-all duration-300"
      style={{
        animation: 'fadeInUp 0.4s ease-out forwards',
        animationDelay: `${animationDelayMs}ms`
      }}
    >
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Header: Title, Category, Stars, Bookmark */}
      <div className="relative z-10 flex flex-col h-full">
        
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase tracking-wider border ${catDetails.badgeClass}`}>
              {catDetails.icon}
              <span>{catDetails.label}</span>
            </span>

            {repo.isMadeInIndia && (
              <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-300 border border-orange-500/20">
                🇮🇳 India
              </span>
            )}
          </div>

          {/* Action: Favorite Toggle */}
          <button
            onClick={handleFavoriteClick}
            className={`p-1.5 rounded-lg border transition-all ${
              isFavorite 
                ? 'bg-amber-500/20 border-amber-400 text-amber-300' 
                : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
            title={isFavorite ? 'Remove bookmark' : 'Bookmark repository'}
            aria-label="Bookmark repository"
          >
            <Bookmark size={15} className={isFavorite ? 'fill-amber-400 text-amber-400' : ''} />
          </button>
        </div>

        {/* Project Title and Stars */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              <span>{repo.name}</span>
              <ArrowUpRight size={16} className="opacity-0 -translate-x-1.5 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-emerald-400" />
            </h3>
            
            <a 
              href={`https://github.com/${repo.repo}`} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 mt-1 transition-colors"
            >
              <Github size={13} />
              <span>{repo.repo}</span>
            </a>
          </div>

          <div className="flex items-center gap-1 text-xs font-mono font-bold bg-amber-500/10 text-amber-300 px-2.5 py-1.5 rounded-lg border border-amber-500/20 shadow-inner flex-shrink-0">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span>{repo.stars}</span>
          </div>
        </div>

        {/* Body: Replaces and Monetization notes */}
        <div className="space-y-2.5 mb-5 flex-grow">
          {/* Replaces Tool */}
          <div className="bg-[#0e1017] rounded-xl p-3 border border-white/5 flex items-start gap-2.5">
            <div className="mt-0.5 bg-rose-500/10 text-rose-400 p-1 rounded-md flex-shrink-0">
              <Zap size={13} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                Replaces SaaS
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-200 truncate">
                {hasDirectReplacement ? repo.pays : <span className="text-slate-500 italic">Self-standing tool</span>}
              </p>
            </div>
          </div>

          {/* Agency & Monetization Blueprint */}
          <div className="bg-[#0e1017] rounded-xl p-3 border border-white/5 flex items-start gap-2.5">
            <div className="mt-0.5 bg-emerald-500/10 text-emerald-400 p-1 rounded-md flex-shrink-0">
              <Code2 size={13} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                Agency Monetization
              </span>
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {repo.note}
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer: Quick Actions */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
          {/* Copy clone command */}
          <button
            onClick={handleCopyClone}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-300 py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            title="Copy git clone command"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Clone'}</span>
          </button>

          {/* Open Deep-dive Modal */}
          <span className="text-xs text-slate-400 group-hover:text-emerald-400 font-medium flex items-center gap-1 transition-colors">
            <span>Playbook & Deploy</span>
            <ExternalLink size={12} />
          </span>
        </div>

      </div>
    </article>
  );
};
