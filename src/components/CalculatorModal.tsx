import React, { useState, useEffect } from 'react';
import { X, Calculator, Check, ArrowRight } from 'lucide-react';
import { Repo } from '../types';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  repos: Repo[];
  onSelectRepo: (repo: Repo) => void;
}

export const CalculatorModal: React.FC<CalculatorModalProps> = ({
  isOpen,
  onClose,
  repos,
  onSelectRepo
}) => {
  // Tools with estimated cost savings
  const toolsWithSavings = repos
    .filter(r => (r.monthlySavingsUsd || 0) > 0)
    .sort((a, b) => (b.monthlySavingsUsd || 0) - (a.monthlySavingsUsd || 0));

  // Default selected tools: top 5 popular replacements
  const [selectedToolIds, setSelectedToolIds] = useState<string[]>([
    'n8n',
    'twenty',
    'appsmith',
    'signoz',
    'cal-com'
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleTool = (id: string) => {
    setSelectedToolIds(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const selectedRepos = toolsWithSavings.filter(r => selectedToolIds.includes(r.id));
  const totalMonthlySavings = selectedRepos.reduce((acc, r) => acc + (r.monthlySavingsUsd || 0), 0);
  const totalAnnualSavings = totalMonthlySavings * 12;
  const estimatedAgencyRetainer = Math.round(totalMonthlySavings * 0.4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div 
        className="relative bg-[#0d0f17] border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl z-10 p-6 sm:p-8 flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Calculator size={22} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Software Cost Savings Calculator
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Select the commercial tools your team or clients use to see potential cost savings.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Big Savings Metrics Display */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
          <div className="glass-panel p-4 rounded-2xl border-emerald-500/30 bg-emerald-500/5 text-center">
            <span className="block text-xs uppercase font-semibold text-emerald-400 mb-1">
              Monthly Cost Saved
            </span>
            <span className="text-3xl font-extrabold text-white font-mono">
              ${totalMonthlySavings.toLocaleString()}
            </span>
            <span className="block text-[11px] text-slate-400 mt-1">/ month</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border-cyan-500/30 bg-cyan-500/5 text-center">
            <span className="block text-xs uppercase font-semibold text-cyan-400 mb-1">
              Annual Runway Saved
            </span>
            <span className="text-3xl font-extrabold text-white font-mono">
              ${totalAnnualSavings.toLocaleString()}
            </span>
            <span className="block text-[11px] text-slate-400 mt-1">/ year</span>
          </div>

          <div className="glass-panel p-4 rounded-2xl border-purple-500/30 bg-purple-500/5 text-center">
            <span className="block text-xs uppercase font-semibold text-purple-400 mb-1">
              Client Retainer Potential
            </span>
            <span className="text-3xl font-extrabold text-white font-mono">
              ${estimatedAgencyRetainer.toLocaleString()}
            </span>
            <span className="block text-[11px] text-slate-400 mt-1">suggested service fee</span>
          </div>
        </div>

        {/* Interactive Tool Selector */}
        <div className="space-y-3 flex-grow">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Select Commercial Tools ({selectedToolIds.length} chosen)
            </h3>
            <div className="space-x-2 text-xs">
              <button
                onClick={() => setSelectedToolIds(toolsWithSavings.map(t => t.id))}
                className="text-emerald-400 hover:underline"
              >
                Select All
              </button>
              <span className="text-slate-600">•</span>
              <button
                onClick={() => setSelectedToolIds([])}
                className="text-slate-400 hover:underline"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
            {toolsWithSavings.map(tool => {
              const isSelected = selectedToolIds.includes(tool.id);
              return (
                <div
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border ${
                      isSelected ? 'bg-emerald-500 text-black border-emerald-400' : 'border-slate-600'
                    }`}>
                      {isSelected && <Check size={13} strokeWidth={3} />}
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-slate-200 truncate">{tool.pays}</p>
                      <p className="text-[11px] text-slate-400">Replaced by <span className="text-emerald-400 font-medium">{tool.name}</span></p>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold text-emerald-400 flex-shrink-0 ml-2">
                    +${tool.monthlySavingsUsd}/mo
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Stack Details */}
        {selectedRepos.length > 0 && (
          <div className="mt-6 pt-5 border-t border-white/10">
            <h4 className="text-xs uppercase font-semibold text-slate-400 tracking-wider mb-3">
              Your Recommended Open-Source Stack:
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedRepos.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    onClose();
                    onSelectRepo(r);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <span>{r.name}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">(${r.monthlySavingsUsd}/mo)</span>
                  <ArrowRight size={11} className="text-slate-500" />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
