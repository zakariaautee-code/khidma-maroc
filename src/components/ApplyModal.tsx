import React, { useState } from 'react';
import { Job, Language } from '../types';
import { X, CheckCircle2, FileText, Phone, Mail, User, Send, Sparkles } from 'lucide-react';

interface ApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitApplication: (job: Job, applicantData: any) => void;
  language: Language;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  job,
  isOpen,
  onClose,
  onSubmitApplication,
  language,
}) => {
  const [fullName, setFullName] = useState('Karim El Amrani');
  const [email, setEmail] = useState('karim.elamrani@gmail.com');
  const [phone, setPhone] = useState('+212 6 61 23 45 67');
  const [coverNote, setCoverNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isAr = language === 'ar';

  if (!isOpen || !job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSubmitApplication(job, { fullName, email, phone, coverNote });

      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg ${job.logoBg} text-white flex items-center justify-center font-bold text-xs`}>
              {job.logoText}
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                {isAr ? 'تقديم طلب ترشيح' : 'Postuler à l\'offre'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[240px]">
                {job.company} • {job.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body or Success State */}
        {isSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
              {isAr ? 'تم إرسال طلبك بنجاح!' : 'Candidature transmise avec succès !'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
              {isAr
                ? 'ستتلقى إشعاراً عند مراجعة ملفك من طرف مسؤول التوظيف.'
                : 'L\'équipe RH de ' + job.company + ' a bien reçu votre dossier. Vous recevrez une notification par email.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            
            {/* CV Attachment Box */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    CV_Karim_ElAmrani_2026.pdf
                  </span>
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-medium">
                    <Sparkles className="w-3 h-3" />
                    {isAr ? 'ملف السيرة الذاتية المفعل' : 'CV principal du profil'} (245 KB)
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="text-xs text-emerald-800 dark:text-emerald-300 font-bold hover:underline"
              >
                {isAr ? 'تغيير' : 'Modifier'}
              </button>
            </div>

            {/* Inputs */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                {isAr ? 'الاسم الكامل' : 'Nom & Prénom'}
              </label>
              <div className="flex items-center bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm">
                <User className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-transparent w-full text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  {isAr ? 'البريد الإلكتروني' : 'Adresse Email'}
                </label>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm">
                  <Mail className="w-4 h-4 text-slate-400 mr-2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent w-full text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                  {isAr ? 'رقم الهاتف (المغرب)' : 'Téléphone portable'}
                </label>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm">
                  <Phone className="w-4 h-4 text-slate-400 mr-2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-transparent w-full text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                {isAr ? 'رسالة تحفيزية سريعة (اختياري)' : 'Message d\'accompagnement (facultatif)'}
              </label>
              <textarea
                rows={3}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder={isAr ? 'أضف نبذة سريعة لتسليط الضوء على خبرتك...' : 'Pourquoi ce poste vous intéresse-t-il chez ' + job.company + ' ?'}
                className="w-full bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-heading font-bold text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{isAr ? 'تأكيد وإرسال الترشيح' : 'Confirmer et envoyer ma candidature'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
