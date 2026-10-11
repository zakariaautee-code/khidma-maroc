import React from 'react';
import { Language, ActiveTab } from '../types';
import { Moon, Sun, Bell } from 'lucide-react';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  setActiveTab,
}) => {
  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 px-4 py-3 transition-colors">
      <div className="flex items-center justify-between gap-3">
        {/* User Identity / Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('profile')}
            className="relative group focus:outline-none"
            aria-label="Voir le profil"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-700 to-teal-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                alt="Karim Portrait"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900"></span>
          </button>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <h1 className="font-heading font-bold text-base text-slate-900 dark:text-white leading-tight">
                {isAr ? 'سلام كريم' : 'Salam Karim'}
              </h1>
              <span className="inline-block animate-pulse text-sm">👋</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {isAr ? 'ابحث عن وظيفتك القادمة بالمغرب' : 'Trouvez votre emploi au Maroc'}
            </p>
          </div>
        </div>

        {/* Action Controls: Language, Theme & Notifications */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 border border-slate-200/60 dark:border-slate-700/60 text-xs font-semibold">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                !isAr
                  ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              FR
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-2.5 py-1 rounded-full transition-all ${
                isAr
                  ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              عربي
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <button
            className="relative w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
