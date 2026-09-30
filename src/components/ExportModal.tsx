import React, { useEffect, useState } from 'react';
import { X, Download, FileText, FileCode, Check, Copy } from 'lucide-react';
import { Repo } from '../types';
import { exportToJson, exportToCsv, exportToMarkdown } from '../utils/export';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  repos: Repo[];
  onShowToast: (msg: string) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  repos,
  onShowToast
}) => {
  const [copiedMd, setCopiedMd] = useState(false);

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

  const handleCopyMarkdown = () => {
    let md = `| Name | Repository | Stars | Category | Replaces | Notes & Agency Opportunities |\n`;
    md += `|------|------------|-------|----------|----------|------------------------------|\n`;
    for (const r of repos) {
      md += `| [${r.name}](https://github.com/${r.repo}) | \`${r.repo}\` | ${r.stars} | ${r.cat} | ${r.pays} | ${r.note} |\n`;
    }
    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    onShowToast('Markdown table copied to clipboard!');
    setTimeout(() => setCopiedMd(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md" 
        onClick={onClose}
      />

      <div 
        className="relative bg-[#0d0f17] border border-white/10 rounded-3xl max-w-md w-full shadow-2xl z-10 p-6 sm:p-7"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Download size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Export Repositories</h3>
              <p className="text-xs text-slate-400">Export {repos.length} selected projects</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {/* CSV Export */}
          <button
            onClick={() => {
              exportToCsv(repos);
              onShowToast('Downloaded CSV dataset');
              onClose();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-emerald-500/30 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-emerald-400" />
              <div>
                <span className="block text-sm font-semibold text-white">Export as CSV</span>
                <span className="text-xs text-slate-400">Spreadsheet ready (.csv) for Excel or Google Sheets</span>
              </div>
            </div>
            <Download size={16} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
          </button>

          {/* JSON Export */}
          <button
            onClick={() => {
              exportToJson(repos);
              onShowToast('Downloaded JSON dataset');
              onClose();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <FileCode size={20} className="text-cyan-400" />
              <div>
                <span className="block text-sm font-semibold text-white">Export as JSON</span>
                <span className="text-xs text-slate-400">Raw programmatic format (.json) with all metadata</span>
              </div>
            </div>
            <Download size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
          </button>

          {/* Markdown Download */}
          <button
            onClick={() => {
              exportToMarkdown(repos);
              onShowToast('Downloaded Markdown catalog');
              onClose();
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-purple-500/30 transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-purple-400" />
              <div>
                <span className="block text-sm font-semibold text-white">Export as Markdown</span>
                <span className="text-xs text-slate-400">Formatted GitHub Markdown table file (.md)</span>
              </div>
            </div>
            <Download size={16} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
          </button>

          {/* Copy Markdown directly */}
          <button
            onClick={handleCopyMarkdown}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium text-sm transition-all"
          >
            {copiedMd ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            <span>{copiedMd ? 'Copied to Clipboard!' : 'Copy Markdown Table to Clipboard'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
