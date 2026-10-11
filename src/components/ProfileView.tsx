import React from 'react';
import { Language } from '../types';
import { 
  User, Mail, Phone, MapPin, FileText, CheckCircle2, 
  Download, Upload, Shield, Award, Sparkles, ExternalLink 
} from 'lucide-react';

interface ProfileViewProps {
  language: Language;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <div className="space-y-4">
      {/* Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
              alt="Karim El Amrani"
              className="w-full h-full rounded-2xl object-cover"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] ring-2 ring-white dark:ring-slate-900 shadow-sm" title="Profil vérifié">
            ✓
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                Karim El Amrani
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Développeur Full Stack React / Node.js
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 text-xs font-bold border border-emerald-200/60 dark:border-emerald-800/60 self-center sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {isAr ? 'في بحث نشط عن عمل' : 'En recherche active'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Casablanca, Maroc
            </span>
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              karim.elamrani@gmail.com
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              +212 6 61 23 45 67
            </span>
          </div>
        </div>
      </div>

      {/* ANAPEC Badge & Integration Card */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-5 shadow-md border border-emerald-800/60 flex items-start justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[11px] font-bold uppercase tracking-wider border border-emerald-400/30">
              {isAr ? 'الوكالة الوطنية لإنعاش التشغيل' : 'ANAPEC Connect'}
            </span>
            <span className="text-xs text-emerald-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isAr ? 'ملف مفعل' : 'Actif'}
            </span>
          </div>
          <h3 className="font-heading font-bold text-sm text-white">
            {isAr ? 'رقم التسجيل بالأنابيك: ' : 'Identifiant Candidat ANAPEC : '}
            <span className="font-mono text-emerald-300">#AN-2026-88419</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md">
            {isAr
              ? 'ملفك مؤهل للاستفادة من عقود الإدماج المهني والامتيازات الجبائية للشركات المغربية.'
              : 'Votre dossier est éligible au Contrat d\'Insertion ANAPEC (Exonération CNSS & IR).'}
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shrink-0">
          <Award className="w-6 h-6 text-emerald-300" />
        </div>
      </div>

      {/* CV Management */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            {isAr ? 'السيرة الذاتية (CV)' : 'Mon Curriculum Vitae'}
          </h3>
          <span className="text-[11px] text-slate-400">Mis à jour hier</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                CV_Karim_ElAmrani_FullStack_2026.pdf
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Format PDF • 245 KB • Compatible ATS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title="Télécharger"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title="Remplacer"
            >
              <Upload className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
        <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-600" />
          {isAr ? 'الكفاءات والتقنيات' : 'Compétences validées'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            'React.js',
            'TypeScript',
            'Node.js',
            'PostgreSQL',
            'Tailwind CSS',
            'Docker',
            'Git & GitHub',
            'Architecture REST',
            'Français Courant',
            'Anglais Technique',
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
