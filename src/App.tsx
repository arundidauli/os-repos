import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { RepoCard } from './components/RepoCard';
import { RepoTableView } from './components/RepoTableView';
import { RepoDetailModal } from './components/RepoDetailModal';
import { CalculatorModal } from './components/CalculatorModal';
import { ExportModal } from './components/ExportModal';
import { Toast, ToastMessage } from './components/Toast';
import { Footer } from './components/Footer';
import { useFavorites } from './hooks/useFavorites';
import { REPOS } from './data/repos';
import { Repo, SortOption, ViewMode } from './types';
import { Search, RotateCcw } from 'lucide-react';

export default function App() {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('stars-desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeFilterTag, setActiveFilterTag] = useState('all');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Modals & Popups
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Bookmarks hook
  const { favorites, toggleFavorite, isFavorite, favoritesCount } = useFavorites();

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    setToast({ id: String(Date.now()), message, type });
  }, []);

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener (Cmd/Ctrl + K to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        searchInput?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Available unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(REPOS.map(r => r.cat))).sort();
  }, []);

  // Filtered and Sorted Repositories pipeline
  const filteredRepos = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return REPOS.filter(repo => {
      // Favorites filter
      if (showOnlyFavorites && !favorites.includes(repo.id)) {
        return false;
      }

      // Category filter
      if (selectedCategory && repo.cat !== selectedCategory) {
        return false;
      }

      // Quick filter tag pill
      if (activeFilterTag === 'india' && !repo.isMadeInIndia) return false;
      if (activeFilterTag === 'popular' && repo.starCount < 30000) return false;
      if (activeFilterTag === 'ai' && !['ai', 'automation', 'trading'].includes(repo.cat)) return false;
      if (activeFilterTag === 'business' && !['crm', 'erp', 'billing', 'hr', 'pm', 'clients', 'ecommerce'].includes(repo.cat)) return false;
      if (activeFilterTag === 'hosting' && !['hosting', 'devops', 'backend', 'data', 'auth', 'dev'].includes(repo.cat)) return false;
      if (activeFilterTag === 'marketing' && !['marketing', 'content', 'support', 'chat'].includes(repo.cat)) return false;

      // Search match
      if (query) {
        const matchName = repo.name.toLowerCase().includes(query);
        const matchRepo = repo.repo.toLowerCase().includes(query);
        const matchPays = repo.pays.toLowerCase().includes(query);
        const matchNote = repo.note.toLowerCase().includes(query);
        const matchCat = repo.cat.toLowerCase().includes(query);
        const matchTags = repo.tags?.some(tag => tag.toLowerCase().includes(query)) || false;
        const matchIndia = (query === 'india' || query === 'indian') && repo.isMadeInIndia;

        if (!matchName && !matchRepo && !matchPays && !matchNote && !matchCat && !matchTags && !matchIndia) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'stars-desc') {
        return b.starCount - a.starCount;
      }
      if (sortOption === 'stars-asc') {
        return a.starCount - b.starCount;
      }
      if (sortOption === 'savings-desc') {
        return (b.monthlySavingsUsd || 0) - (a.monthlySavingsUsd || 0);
      }
      if (sortOption === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortOption === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, sortOption, activeFilterTag, showOnlyFavorites, favorites]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setActiveFilterTag('all');
    setShowOnlyFavorites(false);
  };

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-100 flex flex-col font-sans">
      
      {/* Background radial effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-cyan-500/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Navigation */}
      <Navbar
        favoritesCount={favoritesCount}
        showOnlyFavorites={showOnlyFavorites}
        onToggleFavoritesFilter={() => setShowOnlyFavorites(prev => !prev)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        isScrolled={isScrolled}
      />

      {/* Main Page Area */}
      <main className="relative z-10 flex-grow pb-24">
        
        {/* Hero Section */}
        <Hero
          repos={REPOS}
          categoriesCount={categories.length}
          onSelectQuickTag={(tag) => setActiveFilterTag(tag)}
        />

        {/* Filter Controls Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          sortOption={sortOption}
          onSortChange={setSortOption}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          activeFilterTag={activeFilterTag}
          onFilterTagChange={setActiveFilterTag}
          totalCount={REPOS.length}
          filteredCount={filteredRepos.length}
          onResetFilters={handleResetFilters}
        />

        {/* Content Section: Grid or Table */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredRepos.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredRepos.map((repo, idx) => (
                  <RepoCard
                    key={repo.id}
                    repo={repo}
                    isFavorite={isFavorite(repo.id)}
                    onToggleFavorite={toggleFavorite}
                    onSelectRepo={setSelectedRepo}
                    onShowToast={showToast}
                    animationDelayMs={Math.min((idx % 12) * 40, 400)}
                  />
                ))}
              </div>
            ) : (
              <RepoTableView
                repos={filteredRepos}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onSelectRepo={setSelectedRepo}
                onShowToast={showToast}
              />
            )
          ) : (
            /* Empty State */
            <div className="glass-panel rounded-3xl p-12 sm:p-16 text-center max-w-xl mx-auto my-12 animate-fade-in border-white/10">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5 text-slate-400">
                <Search size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No matching repositories</h3>
              <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                We couldn't find any repositories matching your criteria. Try adjusting your search query or reset the filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-slate-200 transition-all hover:scale-105"
              >
                <RotateCcw size={15} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* Detail Modal */}
      <RepoDetailModal
        repo={selectedRepo}
        isOpen={Boolean(selectedRepo)}
        onClose={() => setSelectedRepo(null)}
        isFavorite={selectedRepo ? isFavorite(selectedRepo.id) : false}
        onToggleFavorite={toggleFavorite}
        onShowToast={showToast}
      />

      {/* Savings Calculator Modal */}
      <CalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        repos={REPOS}
        onSelectRepo={(r) => setSelectedRepo(r)}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        repos={filteredRepos}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
      />

    </div>
  );
}
