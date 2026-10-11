import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';

interface DesktopFrameWrapperProps {
  children: React.ReactNode;
}

export const DesktopFrameWrapper: React.FC<DesktopFrameWrapperProps> = ({ children }) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive'>('mobile');

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col">
      {/* Top Banner on larger screens */}
      <div className="hidden lg:flex items-center justify-between px-6 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-200 text-xs z-50">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="font-heading font-bold text-white tracking-wide">KHIDMA MAROC</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">Application PWA & Recrutement Marocain</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
              viewMode === 'mobile'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Format Mobile (iPhone Mockup)</span>
          </button>
          <button
            onClick={() => setViewMode('responsive')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-medium transition ${
              viewMode === 'responsive'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Format Plein Écran</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className={`flex-1 flex justify-center items-center ${viewMode === 'mobile' ? 'lg:py-8' : ''}`}>
        {viewMode === 'mobile' ? (
          <div className="w-full max-w-md bg-white dark:bg-slate-900 min-h-screen lg:min-h-[860px] lg:max-h-[880px] lg:rounded-[44px] lg:border-[8px] lg:border-slate-800 lg:shadow-2xl overflow-hidden flex flex-col relative">
            {children}
          </div>
        ) : (
          <div className="w-full max-w-5xl min-h-screen bg-white dark:bg-slate-900 shadow-xl flex flex-col">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
