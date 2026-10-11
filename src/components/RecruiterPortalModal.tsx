import React, { useState } from 'react';
import { Job, City, ContractType, Language } from '../types';
import { MOROCCAN_CITIES, CONTRACT_TYPES } from '../data/mockJobs';
import { X, Building2, PlusCircle, CheckCircle2, DollarSign, MapPin, Briefcase, Sparkles } from 'lucide-react';

interface RecruiterPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (job: Job) => void;
  language: Language;
}

export const RecruiterPortalModal: React.FC<RecruiterPortalModalProps> = ({
  isOpen,
  onClose,
  onJobCreated,
  language,
}) => {
  const [company, setCompany] = useState('');
  const [iceNumber, setIceNumber] = useState('');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState<City>('Casablanca');
  const [locationDetails, setLocationDetails] = useState('');
  const [contract, setContract] = useState<ContractType>('CDI');
  const [workMode, setWorkMode] = useState<'Présentiel' | 'Hybride' | 'Télétravail 100%'>('Hybride');
  const [salaryMin, setSalaryMin] = useState(12000);
  const [salaryMax, setSalaryMax] = useState(16000);
  const [description, setDescription] = useState('');
  const [skillsStr, setSkillsStr] = useState('React, TypeScript, Tailwind');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const isAr = language === 'ar';

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const skills = skillsStr.split(',').map((s) => s.trim()).filter(Boolean);

    setTimeout(() => {
      const newJob: Job = {
        id: `job-recruiter-${Date.now()}`,
        title,
        titleAr: title,
        company,
        verified: true,
        city,
        locationDetails: locationDetails || `${city}, Maroc`,
        workMode,
        contract,
        salaryMin: Number(salaryMin),
        salaryMax: Number(salaryMax),
        salaryUnit: 'DH / mois',
        postedAt: 'À l\'instant',
        postedAtAr: 'الآن',
        logoBg: 'bg-emerald-700',
        logoText: company.substring(0, 2).toUpperCase() || 'KM',
        featured: true,
        description,
        descriptionAr: description,
        missions: [
          'Participation aux réunions de conception fonctionnelle et technique',
          'Développement de modules performants et scalables',
          'Assurance qualité et respect des bonnes pratiques'
        ],
        requirements: [
          'Diplôme Bac+3 / Bac+5 en relation avec le poste',
          'Capacité à travailler en équipe multiculturelle',
          'Bon niveau de communication'
        ],
        skills,
        benefits: ['Assurance maladie privée', 'Prime annuelle', 'Télétravail flexible'],
        experienceLevel: '2+ ans',
        educationLevel: 'Bac +3 / Bac +5',
      };

      onJobCreated(newJob);
      setIsSubmitting(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1800);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                {isAr ? 'بوابة المشغلين والشركات' : 'Espace Recruteur Maroc'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr ? 'نشر عرض عمل جديد فورياً' : 'Publier une nouvelle offre d\'emploi'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body or Success State */}
        {success ? (
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="font-heading font-extrabold text-xl text-slate-900 dark:text-white">
              {isAr ? 'تم نشر العرض بنجاح في قاعدة البيانات!' : 'Offre publiée avec succès !'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
              {isAr
                ? 'العرض متاح الآن لجميع الباحثين عن عمل في المغرب.'
                : 'Votre annonce est désormais visible en direct sur le flux Khidma Maroc et enregistrée en base de données.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
            {/* Company Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Nom de l'entreprise *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Capgemini Maroc, Attijariwafa..."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  N° ICE Entreprise (Maroc)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 002345678000092"
                  value={iceNumber}
                  onChange={(e) => setIceNumber(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
                />
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Intitulé du poste recherché *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Lead Développeur React / Mobile Flutter"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-medium"
              />
            </div>

            {/* City & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Ville d'affectation *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value as City)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  {MOROCCAN_CITIES.filter((c) => c !== 'Toutes').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Quartier / Zone d'activité
                </label>
                <input
                  type="text"
                  placeholder="Ex: Technopolis, Sidi Maârouf..."
                  value={locationDetails}
                  onChange={(e) => setLocationDetails(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>

            {/* Contract & Work Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Type de contrat *
                </label>
                <select
                  value={contract}
                  onChange={(e) => setContract(e.target.value as ContractType)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-semibold"
                >
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Stage PFE">Stage PFE (Pré-embauche)</option>
                  <option value="Contrat ANAPEC">Contrat ANAPEC</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Mode de travail
                </label>
                <select
                  value={workMode}
                  onChange={(e) => setWorkMode(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Présentiel">Présentiel</option>
                  <option value="Hybride">Hybride</option>
                  <option value="Télétravail 100%">Télétravail 100%</option>
                </select>
              </div>
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Salaire min (DH/mois)
                </label>
                <input
                  type="number"
                  step="500"
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-bold text-emerald-700 dark:text-emerald-400"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Salaire max (DH/mois)
                </label>
                <input
                  type="number"
                  step="500"
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600 font-bold text-emerald-700 dark:text-emerald-400"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Description du poste & contexte *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Décrivez les enjeux et objectifs de la mission..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Compétences requises (séparées par des virgules)
              </label>
              <input
                type="text"
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-heading font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Publier l'offre d'emploi</span>
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
