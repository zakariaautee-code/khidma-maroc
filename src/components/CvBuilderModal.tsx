import React, { useState } from 'react';
import { Language } from '../types';
import { 
  X, FileText, Printer, CheckCircle2, Download, User, 
  MapPin, Phone, Mail, GraduationCap, Briefcase, Languages, Sparkles 
} from 'lucide-react';

interface CvBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const CvBuilderModal: React.FC<CvBuilderModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isAr = language === 'ar';

  // State for CV fields
  const [fullName, setFullName] = useState('Karim El Amrani');
  const [jobTitle, setJobTitle] = useState('Développeur Full Stack React / Node.js');
  const [city, setCity] = useState('Casablanca, Maroc');
  const [phone, setPhone] = useState('+212 6 61 23 45 67');
  const [email, setEmail] = useState('karim.elamrani@gmail.com');
  const [anapecId, setAnapecId] = useState('#AN-2026-88419');
  const [cin, setCin] = useState('BE894520');
  const [summary, setSummary] = useState(
    'Développeur passionné avec 3 ans d\'expérience dans le développement d\'applications web scalables et réactives. Maîtrise de l\'écosystème React, Node.js et des architectures Cloud.'
  );

  const [skills, setSkills] = useState('React, TypeScript, Node.js, PostgreSQL, Docker, Tailwind CSS, Git');
  const [languagesStr, setLanguagesStr] = useState('Arabe (Maternelle), Français (Courant/C1), Anglais (Professionnel/B2)');

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('preview');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{isAr ? 'منشئ السيرة الذاتية المغربية' : 'Générateur de CV Marocain'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                  ATS Ready
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Format conforme aux standards des cabinets de recrutement et de l'ANAPEC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-lg transition ${
                  activeTab === 'preview'
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                Aperçu
              </button>
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 rounded-lg transition ${
                  activeTab === 'edit'
                    ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'text-slate-500'
                }`}
              >
                Modifier
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'edit' ? (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Nom & Prénom
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Titre du profil recherché
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Ville (Maroc)
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Téléphone (+212)
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    N° CIN
                  </label>
                  <input
                    type="text"
                    value={cin}
                    onChange={(e) => setCin(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    N° Candidat ANAPEC
                  </label>
                  <input
                    type="text"
                    value={anapecId}
                    onChange={(e) => setAnapecId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Résumé professionnel (Accroche)
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Compétences (séparées par des virgules)
                </label>
                <input
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Langues maîtrisées
                </label>
                <input
                  type="text"
                  value={languagesStr}
                  onChange={(e) => setLanguagesStr(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          ) : (
            /* CV Print Document Preview */
            <div className="bg-white text-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0 max-w-2xl mx-auto space-y-6">
              {/* CV Header */}
              <div className="border-b-2 border-emerald-700 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                <div>
                  <h1 className="font-heading font-extrabold text-2xl text-slate-900">
                    {fullName}
                  </h1>
                  <p className="font-heading font-bold text-sm text-emerald-800 mt-0.5">
                    {jobTitle}
                  </p>
                </div>

                <div className="text-right text-xs text-slate-600 space-y-0.5">
                  <p>{city}</p>
                  <p>{phone} • {email}</p>
                  <p className="font-mono text-[11px] text-slate-500">
                    CIN: {cin} | ANAPEC: {anapecId}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-emerald-900 border-b border-slate-200 pb-1 mb-2">
                  Profil Professionnel
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {summary}
                </p>
              </div>

              {/* Expériences */}
              <div>
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-emerald-900 border-b border-slate-200 pb-1 mb-2.5">
                  Expériences Professionnelles
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Développeur Full Stack React / Node</span>
                      <span className="text-slate-500 font-normal">2024 - Présent | Casablanca</span>
                    </div>
                    <p className="text-emerald-700 font-medium">Nearshore Technologies • Casanearshore</p>
                    <ul className="list-disc list-inside text-slate-600 mt-1 space-y-0.5">
                      <li>Conception d'APIs REST et microservices haute disponibilité sous Node.js</li>
                      <li>Refonte du portail client européen sous React et Next.js</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Stage PFE - Ingénieur d'Études Web</span>
                      <span className="text-slate-500 font-normal">2023 (6 mois) | Rabat</span>
                    </div>
                    <p className="text-emerald-700 font-medium">Atlas Cloud Solutions • Rabat Technopolis</p>
                    <ul className="list-disc list-inside text-slate-600 mt-1 space-y-0.5">
                      <li>Mise en place d'un dashboard de supervision avec React & Tailwind</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Formations */}
              <div>
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-emerald-900 border-b border-slate-200 pb-1 mb-2.5">
                  Formation & Diplômes
                </h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Diplôme d'Ingénieur d'État en Génie Logiciel</span>
                      <span className="text-slate-600">École Nationale des Sciences Appliquées (ENSA)</span>
                    </div>
                    <span className="text-slate-500">2018 - 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Baccalauréat Sciences Mathématiques</span>
                      <span className="text-slate-600">Lycée Moulay Youssef, Rabat • Mention Très Bien</span>
                    </div>
                    <span className="text-slate-500">2018</span>
                  </div>
                </div>
              </div>

              {/* Skills & Langues */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-emerald-900 border-b border-slate-200 pb-1 mb-2">
                    Compétences Clés
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.split(',').map((s, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-emerald-900 border-b border-slate-200 pb-1 mb-2">
                    Langues
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {languagesStr}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Export standard A4 / PDF imprimable
          </span>

          <button
            onClick={handlePrint}
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl font-heading font-bold text-xs shadow-md flex items-center gap-2 transition"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimer / Télécharger en PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
