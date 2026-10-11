import React from 'react';
import { Application, Language } from '../types';
import { Send, Clock, CheckCircle2, Building2, MapPin, Calendar } from 'lucide-react';

interface ApplicationsViewProps {
  applications: Application[];
  language: Language;
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  applications,
  language,
}) => {
  const isAr = language === 'ar';

  const getStatusBadge = (status: Application['status']) => {
    switch (status) {
      case 'Reçue':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {isAr ? 'تم الاستلام' : 'Reçue'}
          </span>
        );
      case 'En cours d\'examen':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {isAr ? 'قيد المراجعة' : 'En examen'}
          </span>
        );
      case 'Entretien planifié':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {isAr ? 'مقابلة مجدولة' : 'Entretien'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
          {isAr ? 'متابعة الترشيحات' : 'Mes Candidatures'}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {applications.length} {isAr ? 'طلب مقدم' : 'candidature(s) envoyée(s)'}
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
            <Send className="w-7 h-7" />
          </div>
          <h3 className="font-heading font-bold text-base text-slate-800 dark:text-slate-200">
            {isAr ? 'لم تقدم أي طلب بعد' : 'Vous n\'avez pas encore postulé'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
            {isAr
              ? 'تصفح عروض العمل وقدم ملفك بنقرة واحدة لتتبع حالة ملفك هنا.'
              : 'Postulez aux offres en 1 clic pour suivre l\'évolution de votre recrutement en temps réel.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                    {app.jobTitle}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                      <Building2 className="w-3.5 h-3.5" />
                      {app.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {app.city}
                    </span>
                  </div>
                </div>

                {getStatusBadge(app.status)}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {isAr ? 'تاريخ التقديم:' : 'Postulé le :'} {app.date}
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                  {isAr ? 'ملف CV مرفق' : 'CV envoyé'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
