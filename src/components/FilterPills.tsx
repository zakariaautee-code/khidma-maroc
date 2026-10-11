import React from 'react';
import { City, ContractType, Language } from '../types';
import { MOROCCAN_CITIES, CONTRACT_TYPES } from '../data/mockJobs';
import { MapPin, Briefcase } from 'lucide-react';

interface FilterPillsProps {
  selectedCity: City;
  setSelectedCity: (c: City) => void;
  selectedContract: string;
  setSelectedContract: (c: string) => void;
  cityJobCounts: Record<string, number>;
  language: Language;
}

export const FilterPills: React.FC<FilterPillsProps> = ({
  selectedCity,
  setSelectedCity,
  selectedContract,
  setSelectedContract,
  cityJobCounts,
  language,
}) => {
  const isAr = language === 'ar';

  const cityTranslations: Record<string, string> = {
    Toutes: 'كل المدن',
    Casablanca: 'الدار البيضاء',
    Rabat: 'الرباط',
    Tanger: 'طنجة',
    Marrakech: 'مراكش',
    Agadir: 'أكادير',
    Fès: 'فاس',
    Télétravail: 'عن بعد',
  };

  const contractTranslations: Record<string, string> = {
    Tous: 'كل العقود',
    CDI: 'CDI',
    CDD: 'CDD',
    'Stage PFE': 'تدريب PFE',
    'Contrat ANAPEC': 'عقد أنابيك',
    Freelance: 'عمل حر',
  };

  return (
    <div className="flex flex-col gap-2.5 mt-2">
      {/* City Pills Horizontal Scroll */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 px-0.5">
        <div className="flex items-center text-xs font-semibold text-slate-400 dark:text-slate-500 shrink-0 mr-1">
          <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-600" />
          <span>{isAr ? 'المدينة:' : 'Ville:'}</span>
        </div>

        {MOROCCAN_CITIES.map((city) => {
          const isActive = selectedCity === city;
          const count = cityJobCounts[city] ?? 0;

          return (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city as City)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white shadow-emerald-900/20 scale-[1.02]'
                  : 'bg-white dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700/60 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span>{isAr ? cityTranslations[city] || city : city}</span>
              {city !== 'Toutes' && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Contract Type Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
        <div className="flex items-center text-xs font-semibold text-slate-400 dark:text-slate-500 shrink-0 mr-1">
          <Briefcase className="w-3.5 h-3.5 mr-1 text-teal-600" />
          <span>{isAr ? 'العقد:' : 'Contrat:'}</span>
        </div>

        {CONTRACT_TYPES.map((contract) => {
          const isActive = selectedContract === contract;

          return (
            <button
              key={contract}
              type="button"
              onClick={() => setSelectedContract(contract)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all shadow-sm ${
                isActive
                  ? 'bg-emerald-700 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/60 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {isAr ? contractTranslations[contract] || contract : contract}
            </button>
          );
        })}
      </div>
    </div>
  );
};
