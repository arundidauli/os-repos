import React from 'react';
import { 
  Search, X, ChevronDown, LayoutGrid, List, 
  ArrowUpDown, Filter, Sparkles
} from 'lucide-react';
import { SortOption, ViewMode } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  categories: string[];
  sortOption: SortOption;
  onSortChange: (sort: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (view: ViewMode) => void;
  activeFilterTag: string;
  onFilterTagChange: (tag: string) => void;
  totalCount: number;
  filteredCount: number;
  onResetFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  activeFilterTag,
  onFilterTagChange,
  totalCount,
  filteredCount,
  onResetFilters
}) => {
  const quickTags = [
    { id: 'all', label: 'All Projects' },
    { id: 'india', label: '🇮🇳 Made in India' },
    { id: 'ai', label: '🤖 AI & Automation' },
    { id: 'popular', label: '🔥 30k+ Stars' },
    { id: 'business', label: '💼 ERP & CRM' },
    { id: 'hosting', label: '☁️ Cloud & PaaS' },
    { id: 'marketing', label: '📣 Marketing' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 space-y-4">
      {/* Primary Search & Controls Bar */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-2xl blur-md opacity-50 group-hover:opacity-100 transition duration-500" />
        
        <div className="relative glass-panel rounded-2xl p-2.5 sm:p-3 flex flex-col md:flex-row gap-2.5 items-stretch shadow-2xl">
          
          {/* Search Input Box */}
          <div className="relative flex-grow flex items-center bg-[#0d0f17] rounded-xl border border-white/5 hover:border-white/10 focus-within:border-emerald-500/50 transition-colors">
            <Search className="absolute left-3.5 text-slate-400" size={19} />
            <input 
              id="search-input"
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search projects, tech, SaaS replaced (e.g. Zapier, Airtable, India)..." 
              className="w-full pl-11 pr-24 py-3.5 bg-transparent border-none outline-none text-white text-sm sm:text-base placeholder-slate-500 font-normal"
            />
            
            {/* Keyboard shortcut hint & Clear button */}
            <div className="absolute right-3 flex items-center gap-1.5">
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Clear search"
                >
                  <X size={16} />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 opacity-60">
                <kbd className="px-2 py-0.5 bg-black/60 rounded text-[11px] text-slate-400 border border-white/10 font-mono">⌘K</kbd>
              </div>
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="relative sm:w-56 flex-shrink-0">
            <select 
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full h-full appearance-none pl-3.5 pr-10 py-3.5 bg-[#0d0f17] border border-white/5 hover:border-white/10 rounded-xl outline-none text-white text-sm cursor-pointer focus:border-emerald-500/50 transition-colors"
            >
              <option value="">All Categories ({categories.length})</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>

          {/* Sort By Dropdown */}
          <div className="relative sm:w-48 flex-shrink-0">
            <select 
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full h-full appearance-none pl-3.5 pr-10 py-3.5 bg-[#0d0f17] border border-white/5 hover:border-white/10 rounded-xl outline-none text-white text-sm cursor-pointer focus:border-emerald-500/50 transition-colors"
            >
              <option value="stars-desc">Most Stars ⭐</option>
              <option value="stars-asc">Least Stars</option>
              <option value="savings-desc">Highest SaaS Value 💰</option>
              <option value="name-asc">Name (A to Z)</option>
              <option value="name-desc">Name (Z to A)</option>
            </select>
            <ArrowUpDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
          </div>

          {/* View Mode Toggle (Grid vs Table) */}
          <div className="hidden lg:flex items-center bg-[#0d0f17] rounded-xl border border-white/5 p-1 gap-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid size={17} />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'table' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Table Comparison View"
              aria-label="Table Comparison View"
            >
              <List size={17} />
            </button>
          </div>

        </div>
      </div>

      {/* Quick Filter Tag Pills & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {quickTags.map(tag => {
            const isActive = activeFilterTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => onFilterTagChange(tag.id)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                  isActive 
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-sm shadow-emerald-500/10' 
                    : 'bg-[#11131a] hover:bg-white/5 border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        {/* Counter and Reset */}
        <div className="flex items-center gap-3 text-xs text-slate-400 ml-auto">
          <span>
            Showing <strong className="text-white font-mono">{filteredCount}</strong> of <span className="font-mono">{totalCount}</span> repos
          </span>
          {(searchQuery || selectedCategory || activeFilterTag !== 'all') && (
            <button
              onClick={onResetFilters}
              className="text-xs text-emerald-400 hover:text-emerald-300 underline font-medium"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
