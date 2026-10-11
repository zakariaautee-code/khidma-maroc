import React from 'react';
import { Job, Language } from '../types';
import { JobCard } from './JobCard';
import { BookmarkX } from 'lucide-react';

interface SavedJobsViewProps {
  jobs: Job[];
  savedJobIds: string[];
  onToggleSave: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  language: Language;
}

export const SavedJobsView: React.FC<SavedJobsViewProps> = ({
  jobs,
  savedJobIds,
  onToggleSave,
  onSelectJob,
  language,
}) => {
  const isAr = language === 'ar';
  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            {isAr ? 'الوظائف المحفوظة' : 'Offres sauvegardées'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {savedJobs.length} {isAr ? 'وظيفة مسجلة' : 'offre(s) en favoris'}
          </p>
        </div>
      </div>

      {savedJobs.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <BookmarkX className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-200">
            {isAr ? 'لا توجد وظائف محفوظة بعد' : 'Aucune offre sauvegardée pour le moment'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
            {isAr
              ? 'اضغط على أيقونة الإشارة المرجعية لأي عرض لحفظه ومراجعته لاحقاً.'
              : 'Cliquez sur l\'icône marque-page sur les offres d\'emploi pour les retrouver facilement ici.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={true}
              onToggleSave={onToggleSave}
              onSelectJob={onSelectJob}
              language={language}
            />
          ))}
        </div>
      )}
    </div>
  );
};
