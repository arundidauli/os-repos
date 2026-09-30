export type CategoryType = 
  | 'automation'
  | 'ai'
  | 'booking'
  | 'crm'
  | 'ecommerce'
  | 'marketing'
  | 'docs'
  | 'trading'
  | 'content'
  | 'erp'
  | 'hr'
  | 'support'
  | 'hosting'
  | 'data'
  | 'internal'
  | 'devops'
  | 'dev'
  | 'testing'
  | 'pm'
  | 'chat'
  | 'video'
  | 'auth'
  | 'backend'
  | 'design'
  | 'mobile'
  | 'billing'
  | 'clients'
  | 'sell'
  | 'time'
  | 'payments';

export interface Repo {
  id: string;
  name: string;
  repo: string;
  stars: string;
  starCount: number; // For sorting accurately
  cat: CategoryType;
  pays: string;
  note: string;
  isMadeInIndia?: boolean;
  tags?: string[];
  website?: string;
  monthlySavingsUsd?: number;
  dockerCommand?: string;
}

export type SortOption = 'stars-desc' | 'stars-asc' | 'name-asc' | 'name-desc' | 'savings-desc';

export type ViewMode = 'grid' | 'table';

export interface CategoryMeta {
  label: string;
  color: string;
  badgeClass: string;
  description: string;
}
