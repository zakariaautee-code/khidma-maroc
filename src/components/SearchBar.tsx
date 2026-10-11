import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Language } from '../types';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  language: Language;
  showFilters: boolean;
  setShowFilters: (val: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  language,
  showFilters,
  setShowFilters,
}) => {
  const isAr = language === 'ar';

  return (
    <div className="flex items-center gap-2 mt-1">
      {/* Search Input Box */}
      <div className="flex-1 flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-3.5 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-all">
        <Search className="w-5 h-5 text-slate-400 shrink-0 mr-2.5 dark:text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            isAr
              ? 'المسمى الوظيفي، الكفاءة، أو الشركة...'
              : 'Poste, compétence (ex: React) ou entreprise...'
          }
          className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Advanced Filter Toggle Button */}
      <button
        type="button"
        onClick={() => setShowFilters(!showFilters)}
        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all shadow-sm ${
          showFilters
            ? 'bg-emerald-700 text-white shadow-emerald-500/20'
            : 'bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-800 dark:hover:bg-slate-700'
        }`}
        aria-label="Filtres avancés"
      >
        <SlidersHorizontal className="w-5 h-5" />
      </button>
    </div>
  );
};
