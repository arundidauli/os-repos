import React, { useState } from 'react';
import { 
  Star, Github, ExternalLink, Bookmark, Copy, Check, Globe 
} from 'lucide-react';
import { Repo } from '../types';
import { getCategoryDetails } from '../utils/categories';

interface RepoTableViewProps {
  repos: Repo[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectRepo: (repo: Repo) => void;
  onShowToast: (message: string) => void;
}

export const RepoTableView: React.FC<RepoTableViewProps> = ({
  repos,
  favorites,
  onToggleFavorite,
  onSelectRepo,
  onShowToast,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyClone = (e: React.MouseEvent, repo: Repo) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`git clone https://github.com/${repo.repo}.git`);
    setCopiedId(repo.id);
    onShowToast(`Copied clone command for ${repo.name}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-[#0b0d13] text-xs uppercase tracking-wider text-slate-400 font-semibold border-b border-white/5">
            <tr>
              <th scope="col" className="py-4 px-4 sm:px-6">Project</th>
              <th scope="col" className="py-4 px-3">Stars</th>
              <th scope="col" className="py-4 px-3">Category</th>
              <th scope="col" className="py-4 px-4">Replaces</th>
              <th scope="col" className="py-4 px-4 min-w-[280px]">Deployment Opportunity & Value</th>
              <th scope="col" className="py-4 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 font-normal">
            {repos.map((repo) => {
              const catDetails = getCategoryDetails(repo.cat);
              const isFav = favorites.includes(repo.id);
              const isCopied = copiedId === repo.id;

              return (
                <tr 
                  key={repo.id}
                  onClick={() => onSelectRepo(repo)}
                  className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                >
                  {/* Project Name and Repo */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(repo.id);
                          onShowToast(isFav ? `Removed ${repo.name} from saved` : `Saved ${repo.name}`);
                        }}
                        className={`p-1 rounded-md transition-colors ${
                          isFav ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                        }`}
                        title={isFav ? 'Remove bookmark' : 'Bookmark'}
                      >
                        <Bookmark size={15} className={isFav ? 'fill-amber-400' : ''} />
                      </button>

                      <div>
                        <div className="font-semibold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                          <span>{repo.name}</span>
                          {repo.isMadeInIndia && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-300 border border-orange-500/20">
                              <Globe size={10} />
                              <span>India</span>
                            </span>
                          )}
                        </div>
                        <a
                          href={`https://github.com/${repo.repo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-slate-500 hover:text-slate-400 flex items-center gap-1"
                        >
                          <Github size={11} /> {repo.repo}
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* Stars */}
                  <td className="py-3.5 px-3">
                    <div className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md">
                      <Star size={11} className="fill-amber-400" />
                      <span>{repo.stars}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-medium border ${catDetails.badgeClass}`}>
                      {catDetails.icon}
                      <span>{catDetails.label}</span>
                    </span>
                  </td>

                  {/* Replaces */}
                  <td className="py-3.5 px-4 font-medium text-slate-200">
                    {repo.pays !== '-' ? (
                      <span className="px-2 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 text-xs">
                        {repo.pays}
                      </span>
                    ) : (
                      <span className="text-slate-500 text-xs italic">—</span>
                    )}
                  </td>

                  {/* Notes & Opportunity */}
                  <td className="py-3.5 px-4 text-xs text-slate-300">
                    <p className="line-clamp-2 leading-relaxed">
                      {repo.note}
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => handleCopyClone(e, repo)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        title="Copy git clone command"
                      >
                        {isCopied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                      <button
                        onClick={() => onSelectRepo(repo)}
                        className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-colors"
                        title="View Details"
                      >
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
