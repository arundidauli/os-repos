import React from 'react';
import { 
  Zap, Code2, Calendar, Briefcase, Globe, Activity, 
  LayoutTemplate, Database, Terminal, ShieldCheck, 
  Smartphone, MessageSquare, Clock, CreditCard, Lock,
  Share2, ShoppingCart, UserCheck, Layers, Server
} from 'lucide-react';
import { CategoryType } from '../types';

export interface CategoryInfo {
  label: string;
  color: string;
  badgeClass: string;
  icon: React.ReactNode;
}

export const CATEGORY_DETAILS: Record<CategoryType | string, CategoryInfo> = {
  automation: {
    label: 'Automation',
    color: 'text-blue-400',
    badgeClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    icon: <Zap size={14} />
  },
  ai: {
    label: 'AI & LLMs',
    color: 'text-purple-400',
    badgeClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    icon: <Code2 size={14} />
  },
  booking: {
    label: 'Booking & Scheduling',
    color: 'text-pink-400',
    badgeClass: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    icon: <Calendar size={14} />
  },
  crm: {
    label: 'CRM & Sales',
    color: 'text-orange-400',
    badgeClass: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    icon: <Briefcase size={14} />
  },
  ecommerce: {
    label: 'E-commerce',
    color: 'text-emerald-400',
    badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    icon: <ShoppingCart size={14} />
  },
  marketing: {
    label: 'Marketing & SEO',
    color: 'text-red-400',
    badgeClass: 'text-red-400 bg-red-500/10 border-red-500/20',
    icon: <Activity size={14} />
  },
  docs: {
    label: 'Documents & Notes',
    color: 'text-cyan-400',
    badgeClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    icon: <LayoutTemplate size={14} />
  },
  trading: {
    label: 'Trading & FinTech',
    color: 'text-amber-400',
    badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    icon: <Activity size={14} />
  },
  content: {
    label: 'Content & Media',
    color: 'text-fuchsia-400',
    badgeClass: 'text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20',
    icon: <Share2 size={14} />
  },
  erp: {
    label: 'ERP & Operations',
    color: 'text-indigo-400',
    badgeClass: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    icon: <Database size={14} />
  },
  hr: {
    label: 'HR & Payroll',
    color: 'text-lime-400',
    badgeClass: 'text-lime-400 bg-lime-500/10 border-lime-500/20',
    icon: <UserCheck size={14} />
  },
  support: {
    label: 'Customer Support',
    color: 'text-sky-400',
    badgeClass: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    icon: <MessageSquare size={14} />
  },
  hosting: {
    label: 'PaaS & Cloud Hosting',
    color: 'text-violet-400',
    badgeClass: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    icon: <Server size={14} />
  },
  data: {
    label: 'Data & Databases',
    color: 'text-teal-400',
    badgeClass: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
    icon: <Database size={14} />
  },
  internal: {
    label: 'Internal Tools',
    color: 'text-slate-400',
    badgeClass: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    icon: <Layers size={14} />
  },
  devops: {
    label: 'DevOps & Observability',
    color: 'text-rose-400',
    badgeClass: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    icon: <Terminal size={14} />
  },
  dev: {
    label: 'Developer Utilities',
    color: 'text-gray-400',
    badgeClass: 'text-gray-400 bg-gray-500/10 border-gray-500/20',
    icon: <Terminal size={14} />
  },
  testing: {
    label: 'QA & Testing',
    color: 'text-yellow-400',
    badgeClass: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    icon: <ShieldCheck size={14} />
  },
  pm: {
    label: 'Project Management',
    color: 'text-blue-400',
    badgeClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    icon: <Briefcase size={14} />
  },
  chat: {
    label: 'Chat & Collaboration',
    color: 'text-cyan-400',
    badgeClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    icon: <MessageSquare size={14} />
  },
  video: {
    label: 'Video Conferencing',
    color: 'text-red-400',
    badgeClass: 'text-red-400 bg-red-500/10 border-red-500/20',
    icon: <Globe size={14} />
  },
  auth: {
    label: 'Auth & SSO',
    color: 'text-slate-300',
    badgeClass: 'text-slate-300 bg-slate-500/10 border-slate-500/20',
    icon: <Lock size={14} />
  },
  backend: {
    label: 'Backend & BaaS',
    color: 'text-emerald-400',
    badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    icon: <Database size={14} />
  },
  design: {
    label: 'UI & Design',
    color: 'text-pink-400',
    badgeClass: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    icon: <LayoutTemplate size={14} />
  },
  mobile: {
    label: 'Mobile Development',
    color: 'text-purple-400',
    badgeClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    icon: <Smartphone size={14} />
  },
  billing: {
    label: 'Invoicing & Billing',
    color: 'text-emerald-400',
    badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    icon: <CreditCard size={14} />
  },
  clients: {
    label: 'Client Portals',
    color: 'text-indigo-400',
    badgeClass: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    icon: <Briefcase size={14} />
  },
  sell: {
    label: 'Digital Sales',
    color: 'text-yellow-400',
    badgeClass: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    icon: <Globe size={14} />
  },
  time: {
    label: 'Time Tracking',
    color: 'text-blue-400',
    badgeClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    icon: <Clock size={14} />
  },
  payments: {
    label: 'Payments & UPI',
    color: 'text-emerald-400',
    badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    icon: <CreditCard size={14} />
  }
};

export const getCategoryDetails = (cat: string): CategoryInfo => {
  return CATEGORY_DETAILS[cat] || {
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
    color: 'text-slate-400',
    badgeClass: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    icon: <Code2 size={14} />
  };
};
