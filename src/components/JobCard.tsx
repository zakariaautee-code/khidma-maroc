import React from 'react';
import { Job, Language } from '../types';
import { Bookmark, MapPin, Building2, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  language: Language;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  onToggleSave,
  onSelectJob,
  language,
}) => {
  const isAr = language === 'ar';

  const formatSalary = (min: number, max: number) => {
    return `${min.toLocaleString('fr-FR')} - ${max.toLocaleString('fr-FR')} DH/mois`;
  };

  return (
    <div
      onClick={() => onSelectJob(job)}
      className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-emerald-500/50 dark:hover:border-emerald-500/40 transition-all cursor-pointer flex flex-col gap-3"
    >
      {/* Top Row: Company logo, verified badge, hybrid tag & save button */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl ${job.logoBg} text-white flex items-center justify-center font-heading font-bold text-base shadow-sm shrink-0`}
          >
            {job.logoText}
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                {job.company}
              </span>
              {job.verified && (
                <span title="Entreprise vérifiée" className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{job.locationDetails}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {job.featured && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px] font-bold border border-amber-500/20">
              <Sparkles className="w-3 h-3" />
              <span>{isAr ? 'مميز' : 'Top Offre'}</span>
            </span>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(job.id);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              isSaved
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 shadow-sm'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            aria-label="Sauvegarder l'offre"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Middle Row: Job Title */}
      <div>
        <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
          {isAr ? job.titleAr : job.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200/60 dark:border-emerald-800/60">
            {job.contract}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
            {job.workMode}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
            {job.experienceLevel}
          </span>
        </div>
      </div>

      {/* Bottom Row: Salary Badge in MAD & Time ago */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200/60 dark:border-emerald-800/50">
            {formatSalary(job.salaryMin, job.salaryMax)}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
          <Clock className="w-3 h-3" />
          <span>{isAr ? job.postedAtAr : job.postedAt}</span>
        </div>
      </div>
    </div>
  );
};
