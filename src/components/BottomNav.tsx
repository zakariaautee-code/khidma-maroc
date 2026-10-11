import React from 'react';
import { ActiveTab, Language } from '../types';
import { Home, Bookmark, Send, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  applicationsCount: number;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  applicationsCount,
  language,
}) => {
  const isAr = language === 'ar';

  const tabs: { key: ActiveTab; labelFr: string; labelAr: string; icon: any; count?: number }[] = [
    { key: 'home', labelFr: 'Accueil', labelAr: 'الرئيسية', icon: Home },
    { key: 'saved', labelFr: 'Favoris', labelAr: 'المحفوظات', icon: Bookmark, count: savedCount },
    { key: 'applications', labelFr: 'Candidatures', labelAr: 'طلباتي', icon: Send, count: applicationsCount },
    { key: 'profile', labelFr: 'Profil', labelAr: 'حسابي', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 px-3 py-2 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400 font-bold scale-105'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {tab.count}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 font-heading">
                {isAr ? tab.labelAr : tab.labelFr}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
