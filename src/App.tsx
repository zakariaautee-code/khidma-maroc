import React, { useState, useEffect, useMemo } from 'react';
import { Job, City, Language, ActiveTab, Application } from './types';
import { MOCK_JOBS } from './data/mockJobs';
import { api } from './services/supabase';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FilterPills } from './components/FilterPills';
import { JobCard } from './components/JobCard';
import { JobDetailsModal } from './components/JobDetailsModal';
import { ApplyModal } from './components/ApplyModal';
import { SavedJobsView } from './components/SavedJobsView';
import { ApplicationsView } from './components/ApplicationsView';
import { ProfileView } from './components/ProfileView';
import { BottomNav } from './components/BottomNav';
import { DesktopFrameWrapper } from './components/DesktopFrameWrapper';
import { RecruiterPortalModal } from './components/RecruiterPortalModal';
import { CvBuilderModal } from './components/CvBuilderModal';
import { WhatsAppAlertsModal } from './components/WhatsAppAlertsModal';
import { 
  Sparkles, SlidersHorizontal, AlertCircle, Building2, 
  FileText, MessageSquare, Database, PlusCircle 
} from 'lucide-react';

export const App: React.FC = () => {
  // Theme & Language
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [language, setLanguage] = useState<Language>('fr');

  // Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Job Data (Loaded from API / PostgreSQL or LocalStorage)
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [loadingJobs, setLoadingJobs] = useState(true);

  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<City>('Toutes');
  const [selectedContract, setSelectedContract] = useState<string>('Tous');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Modals
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [showRecruiterModal, setShowRecruiterModal] = useState(false);
  const [showCvBuilderModal, setShowCvBuilderModal] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  // Saved Jobs (Persistence)
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('khidma_saved_jobs');
      return stored ? JSON.parse(stored) : ['job-1', 'job-6'];
    } catch {
      return ['job-1', 'job-6'];
    }
  });

  // User Applications
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'app-demo-1',
      jobId: 'job-1',
      jobTitle: 'Développeur Full Stack React / Node.js',
      company: 'Nearshore Technologies',
      city: 'Casablanca Nearshore',
      date: '10 Octobre 2026',
      status: 'En cours d\'examen',
    },
  ]);

  // Load jobs from API / PostgreSQL
  useEffect(() => {
    const fetchJobs = async () => {
      setLoadingJobs(true);
      const data = await api.getJobs();
      setJobs(data);
      setLoadingJobs(false);
    };
    fetchJobs();
  }, []);

  // Sync Dark Mode with document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync Language direction (RTL / LTR)
  useEffect(() => {
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('khidma_saved_jobs', JSON.stringify(savedJobIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedJobIds]);

  const handleToggleSave = (jobId: string) => {
    setSavedJobIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  };

  const handleApplicationSubmit = async (job: Job) => {
    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      city: job.city,
      date: new Date().toLocaleDateString(language === 'ar' ? 'ar-MA' : 'fr-MA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      status: 'Reçue',
    };
    await api.submitApplication(newApp);
    setApplications((prev) => [newApp, ...prev]);
  };

  const handleJobCreated = async (newJob: Job) => {
    await api.addJob(newJob);
    setJobs((prev) => [newJob, ...prev]);
  };

  // City Job Counts for pills
  const cityJobCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    jobs.forEach((job) => {
      counts[job.city] = (counts[job.city] || 0) + 1;
    });
    return counts;
  }, [jobs]);

  // Filtered Job list
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(q) || job.titleAr.includes(q);
        const matchesCompany = job.company.toLowerCase().includes(q);
        const matchesSkill = job.skills.some((s) => s.toLowerCase().includes(q));
        const matchesLocation = job.locationDetails.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesSkill && !matchesLocation) {
          return false;
        }
      }

      // City filter
      if (selectedCity !== 'Toutes' && job.city !== selectedCity) {
        return false;
      }

      // Contract filter
      if (selectedContract !== 'Tous' && job.contract !== selectedContract) {
        return false;
      }

      return true;
    });
  }, [jobs, searchQuery, selectedCity, selectedContract]);

  const isAr = language === 'ar';

  return (
    <DesktopFrameWrapper>
      {/* App Shell */}
      <div className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-950 min-h-full">
        {/* Top App Header */}
        <Header
          language={language}
          setLanguage={setLanguage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setActiveTab={setActiveTab}
        />

        {/* Quick Features Action Bar (Recruiter / CV Builder / WhatsApp) */}
        <div className="px-4 pt-2.5 pb-1 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setShowRecruiterModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-800 text-xs font-semibold whitespace-nowrap shadow-sm active:scale-95 transition"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isAr ? 'نشر عرض (مُشغل)' : 'Espace Recruteur'}</span>
          </button>

          <button
            onClick={() => setShowCvBuilderModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-750 hover:border-emerald-500 text-xs font-semibold whitespace-nowrap shadow-sm active:scale-95 transition"
          >
            <FileText className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{isAr ? 'إنشاء سيرة ذاتية' : 'Créer mon CV'}</span>
          </button>

          <button
            onClick={() => setShowWhatsAppModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 text-xs font-bold whitespace-nowrap shadow-sm active:scale-95 transition"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 fill-current" />
            <span>{isAr ? 'تنبيهات واتساب' : 'Alertes WhatsApp'}</span>
          </button>
        </div>

        {/* Dynamic Content Views */}
        <main className="flex-1 overflow-y-auto pb-24 px-4 pt-2 space-y-4">
          {activeTab === 'home' && (
            <>
              {/* Search & Filter Trigger */}
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                language={language}
                showFilters={showAdvancedFilters}
                setShowFilters={setShowAdvancedFilters}
              />

              {/* City and Contract Pills */}
              <FilterPills
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                selectedContract={selectedContract}
                setSelectedContract={setSelectedContract}
                cityJobCounts={cityJobCounts}
                language={language}
              />

              {/* Section Header */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5">
                  <h2 className="font-heading font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
                    {isAr ? 'عروض الشغل المتاحة' : 'Offres Récentes'}
                  </h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">
                    {filteredJobs.length}
                  </span>
                </div>

                {(selectedCity !== 'Toutes' || selectedContract !== 'Tous' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCity('Toutes');
                      setSelectedContract('Tous');
                      setSearchQuery('');
                    }}
                    className="text-xs text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                  >
                    {isAr ? 'إعادة ضبط الفلاتر' : 'Réinitialiser'}
                  </button>
                )}
              </div>

              {/* Job Cards Feed */}
              {filteredJobs.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center flex flex-col items-center justify-center space-y-2 mt-2">
                  <AlertCircle className="w-10 h-10 text-slate-400" />
                  <h3 className="font-heading font-bold text-sm text-slate-800 dark:text-slate-200">
                    {isAr ? 'لم يتم العثور على أي وظيفة تطابق بحثك' : 'Aucune offre trouvée'}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs">
                    {isAr
                      ? 'جرب اختيار مدينة أخرى أو مسح معايير البحث.'
                      : 'Essayez de modifier votre recherche ou de sélectionner « Toutes les villes ».'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isSaved={savedJobIds.includes(job.id)}
                      onToggleSave={handleToggleSave}
                      onSelectJob={(j) => setSelectedJob(j)}
                      language={language}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'saved' && (
            <SavedJobsView
              jobs={jobs}
              savedJobIds={savedJobIds}
              onToggleSave={handleToggleSave}
              onSelectJob={(j) => setSelectedJob(j)}
              language={language}
            />
          )}

          {activeTab === 'applications' && (
            <ApplicationsView applications={applications} language={language} />
          )}

          {activeTab === 'profile' && <ProfileView language={language} />}
        </main>

        {/* Job Details Modal */}
        {selectedJob && (
          <JobDetailsModal
            job={selectedJob}
            isOpen={Boolean(selectedJob)}
            onClose={() => setSelectedJob(null)}
            isSaved={savedJobIds.includes(selectedJob.id)}
            onToggleSave={handleToggleSave}
            onOpenApply={(job) => {
              setSelectedJob(null);
              setApplyJob(job);
            }}
            language={language}
          />
        )}

        {/* 1-Click Apply Modal */}
        {applyJob && (
          <ApplyModal
            job={applyJob}
            isOpen={Boolean(applyJob)}
            onClose={() => setApplyJob(null)}
            onSubmitApplication={handleApplicationSubmit}
            language={language}
          />
        )}

        {/* Recruiter Portal Modal */}
        <RecruiterPortalModal
          isOpen={showRecruiterModal}
          onClose={() => setShowRecruiterModal(false)}
          onJobCreated={handleJobCreated}
          language={language}
        />

        {/* CV Builder Modal */}
        <CvBuilderModal
          isOpen={showCvBuilderModal}
          onClose={() => setShowCvBuilderModal(false)}
          language={language}
        />

        {/* WhatsApp Alerts Modal */}
        <WhatsAppAlertsModal
          isOpen={showWhatsAppModal}
          onClose={() => setShowWhatsAppModal(false)}
          language={language}
        />

        {/* Sticky Mobile Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          savedCount={savedJobIds.length}
          applicationsCount={applications.length}
          language={language}
        />
      </div>
    </DesktopFrameWrapper>
  );
};
