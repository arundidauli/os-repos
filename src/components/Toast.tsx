import React, { useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'info';
  message: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#161a24] border border-emerald-500/40 text-slate-100 px-4 py-3 rounded-xl shadow-2xl shadow-emerald-950/50 animate-fade-in text-sm backdrop-blur-md">
      {toast.type === 'info' ? (
        <Info size={18} className="text-cyan-400 flex-shrink-0" />
      ) : (
        <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
      )}
      <span className="font-medium">{toast.message}</span>
      <button 
        onClick={onClose}
        className="ml-2 text-slate-400 hover:text-white transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
};
