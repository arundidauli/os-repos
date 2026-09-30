import React from 'react';
import { Package, Github, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#07080c] relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          
          {/* Brand & info */}
          <div className="space-y-2 max-w-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Package size={17} />
              </div>
              <span className="font-bold text-lg text-white">
                OS<span className="text-emerald-400">Vault</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Curated directory of production-ready open-source alternatives to commercial software. 100% static, client-side, zero tracking.
            </p>
          </div>

          {/* Quick links & actions */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Github size={15} />
              <span>Contribute on GitHub</span>
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
              title="Back to top"
            >
              <ArrowUp size={14} />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} OSVault. Open-source software under the MIT License.
          </p>
          <p className="text-center sm:text-right text-[11px] text-slate-600 max-w-md">
            All proprietary product names and registered trademarks (Zapier, Salesforce, Airtable, etc.) belong to their respective owners.
          </p>
        </div>

      </div>
    </footer>
  );
};
