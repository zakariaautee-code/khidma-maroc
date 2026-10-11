import React, { useState } from 'react';
import { Job, Language } from '../types';
import { 
  ArrowLeft, Bookmark, Share2, CheckCircle2, MapPin, 
  Building2, Briefcase, DollarSign, GraduationCap, Check, 
  ShieldCheck, HeartHandshake, Send 
} from 'lucide-react';

interface JobDetailsModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onOpenApply: (job: Job) => void;
  language: Language;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onOpenApply,
  language,
}) => {
  const [copied, setCopied] = useState(false);
  const isAr = language === 'ar';

  if (!isOpen) return null;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-end sm:items-center sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200/80 dark:border-slate-800 animate-in slide-in-from-bottom duration-300">
        
        {/* Sticky Top Header */}
        <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white/95 dark:bg-slate-900/95 backdrop-blur sticky top-0 z-10">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
            aria-label="Retour"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h2 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
              {isAr ? 'تفاصيل الوظيفة' : 'Détails de l\'Offre'}
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              {job.city} • {job.workMode}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:text-emerald-600 transition-all"
              aria-label="Partager"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleSave(job.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
              aria-label="Favoris"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Share feedback toast */}
        {copied && (
          <div className="bg-emerald-600 text-white text-xs px-4 py-2 flex items-center justify-center gap-1.5 font-semibold">
            <Check className="w-4 h-4" />
            {isAr ? 'تم نسخ الرابط بنجاح!' : 'Lien copié dans le presse-papier !'}
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* Company Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className={`w-14 h-14 rounded-2xl ${job.logoBg} text-white flex items-center justify-center font-heading font-extrabold text-xl shadow-md shrink-0`}>
              {job.logoText}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white truncate">
                  {job.company}
                </h3>
                {job.verified && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{job.locationDetails}</span>
              </p>
            </div>
          </div>

          {/* Job Title & Main Attributes */}
          <div>
            <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white leading-tight">
              {isAr ? job.titleAr : job.title}
            </h1>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
              <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  {isAr ? 'الراتب المقترح' : 'Salaire proposé'}
                </span>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mt-0.5 block">
                  {job.salaryMin.toLocaleString('fr-FR')} - {job.salaryMax.toLocaleString('fr-FR')} DH
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  {isAr ? 'نوع العقد' : 'Contrat'}
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5 block">
                  {job.contract}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  {isAr ? 'الخبرة المطلوبة' : 'Expérience'}
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5 block">
                  {job.experienceLevel}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  {isAr ? 'المستوى الدراسي' : 'Niveau d\'études'}
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-0.5 block">
                  {job.educationLevel}
                </span>
              </div>
            </div>
          </div>

          {/* About the Job */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              {isAr ? 'نبذة عن المنصب' : 'À propos du poste'}
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {isAr ? job.descriptionAr : job.description}
            </p>
          </div>

          {/* Missions & Responsabilités */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              {isAr ? 'المهام والمسؤوليات' : 'Missions principales'}
            </h4>
            <ul className="space-y-2.5">
              {job.missions.map((mission, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xs shrink-0 mt-0.5">
                    ✓
                  </span>
                  <span>{mission}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Profil recherché */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              {isAr ? 'المؤهلات المطلوبة' : 'Profil recherché'}
            </h4>
            <ul className="space-y-2.5">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0 mt-2"></span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Required */}
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-2.5">
              {isAr ? 'المهارات التقنية' : 'Compétences clés'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Perks & Benefits (Moroccan Context) */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
            <h4 className="font-heading font-bold text-sm text-emerald-900 dark:text-emerald-200 flex items-center gap-2 mb-2.5">
              <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              {isAr ? 'المزايا الاجتماعية والتعويضات' : 'Avantages & Package social'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
              {job.benefits.map((b, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Bottom Apply Action Bar */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {isAr ? 'الراتب الصافي التقديري' : 'Salaire estimé'}
            </span>
            <span className="font-heading font-extrabold text-sm sm:text-base text-emerald-700 dark:text-emerald-400">
              {job.salaryMin.toLocaleString('fr-FR')} - {job.salaryMax.toLocaleString('fr-FR')} DH
            </span>
          </div>

          <button
            onClick={() => onOpenApply(job)}
            className="flex-1 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white py-3.5 px-6 rounded-2xl font-heading font-bold text-sm shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>{isAr ? 'تقديم طلب الآن' : 'Postuler à cette offre'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
