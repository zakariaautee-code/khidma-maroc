import React, { useState } from 'react';
import { Language, City, ContractType } from '../types';
import { MOROCCAN_CITIES, CONTRACT_TYPES } from '../data/mockJobs';
import { api } from '../services/supabase';
import { 
  X, MessageSquare, Bell, CheckCircle2, Phone, MapPin, 
  Sparkles, ExternalLink, Send, ArrowRight 
} from 'lucide-react';

interface WhatsAppAlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const WhatsAppAlertsModal: React.FC<WhatsAppAlertsModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isAr = language === 'ar';

  const [phone, setPhone] = useState('+212 6 61 23 45 67');
  const [city, setCity] = useState<City>('Casablanca');
  const [contract, setContract] = useState<string>('Tous');
  const [keywords, setKeywords] = useState('React, Full Stack, Tech');
  const [frequency, setFrequency] = useState('instant');
  const [saved, setSaved] = useState(false);
  const [showSimulatedMessage, setShowSimulatedMessage] = useState(false);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.saveWhatsAppAlert({
      phone,
      city,
      contract,
      keywords,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setShowSimulatedMessage(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-emerald-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white flex items-center gap-2">
                <span>{isAr ? 'تنبيهات وظائف واتساب' : 'Alertes Emploi WhatsApp'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold border border-emerald-400/30">
                  Gratuit
                </span>
              </h3>
              <p className="text-xs text-emerald-200/80">
                Recevez les offres marocaines ciblées directement sur WhatsApp
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          {saved ? (
            <div className="p-8 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white">
                {isAr ? 'تم تفعيل التنبيهات على واتساب!' : 'Alerte WhatsApp activée avec succès !'}
              </h4>
              <p className="text-slate-500 max-w-xs">
                Votre numéro {phone} recevra les opportunités correspondant à vos critères à {city}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-3.5">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Numéro WhatsApp au Maroc (+212) *
                </label>
                <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-sm">
                  <Phone className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-transparent w-full text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Ville ciblée
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value as City)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none"
                  >
                    {MOROCCAN_CITIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Type de contrat
                  </label>
                  <select
                    value={contract}
                    onChange={(e) => setContract(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none"
                  >
                    {CONTRACT_TYPES.map((ct) => (
                      <option key={ct} value={ct}>{ct}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Mots-clés recherchés (intitulé, techno...)
                </label>
                <input
                  type="text"
                  placeholder="Ex: React, Centre d'appels, Ingénieur..."
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Fréquence d'alerte
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFrequency('instant')}
                    className={`p-2 rounded-xl text-center border font-medium transition ${
                      frequency === 'instant'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 text-emerald-800 dark:text-emerald-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    ⚡ Immédiate dès publication
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('daily')}
                    className={`p-2 rounded-xl text-center border font-medium transition ${
                      frequency === 'daily'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-600 text-emerald-800 dark:text-emerald-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    ☕ Résumé chaque matin à 9h
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-heading font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition"
                >
                  <Bell className="w-4 h-4" />
                  <span>Enregistrer mon alerte WhatsApp</span>
                </button>
              </div>
            </form>
          )}

          {/* Simulated WhatsApp Notification Card */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                Aperçu du message WhatsApp reçu :
              </span>
              <button
                type="button"
                onClick={() => setShowSimulatedMessage(!showSimulatedMessage)}
                className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
              >
                {showSimulatedMessage ? 'Masquer le test' : 'Tester un envoi'}
              </button>
            </div>

            {showSimulatedMessage && (
              <div className="p-3.5 rounded-2xl bg-[#DCF8C6] dark:bg-[#075E54]/30 text-slate-900 dark:text-slate-100 border border-emerald-400/30 shadow-sm space-y-2 font-sans animate-in slide-in-from-top-2">
                <div className="flex items-center justify-between text-[11px] text-emerald-800 dark:text-emerald-300 font-bold">
                  <span>🟢 Khidma Maroc Bot</span>
                  <span className="text-[10px] text-slate-500">18:55</span>
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  Salam Karim 👋 ! Une nouvelle opportunité correspondant à votre profil vient d'être publiée :
                </p>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 text-xs space-y-1 border border-emerald-200 dark:border-slate-700">
                  <p className="font-bold text-slate-900 dark:text-white">
                    🎯 Développeur Full Stack React / Node
                  </p>
                  <p className="text-slate-600 dark:text-slate-300">
                    🏢 Nearshore Technologies • Casablanca Nearshore
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-bold">
                    💵 14,000 - 18,500 DH/mois (CDI + Télétravail)
                  </p>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 pt-1 flex items-center gap-1">
                  <span>👉 Postulez directement via :</span>
                  <span className="text-emerald-800 dark:text-emerald-300 font-bold underline cursor-pointer">
                    khidma.ma/job/1
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
