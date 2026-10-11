import { createClient } from '@supabase/supabase-js';
import { Job, Application } from '../types';
import { MOCK_JOBS } from '../data/mockJobs';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// LocalStorage Keys for persistent offline/mock mode
const STORAGE_KEY_JOBS = 'khidma_db_jobs';
const STORAGE_KEY_APPLICATIONS = 'khidma_db_applications';
const STORAGE_KEY_ALERTS = 'khidma_db_whatsapp_alerts';

const getLocalJobs = (): Job[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_JOBS);
    return raw ? JSON.parse(raw) : MOCK_JOBS;
  } catch {
    return MOCK_JOBS;
  }
};

const setLocalJobs = (jobs: Job[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_JOBS, JSON.stringify(jobs));
  } catch (e) {
    console.error(e);
  }
};

export const api = {
  async getJobs(): Promise<Job[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            title: d.title,
            titleAr: d.title_ar || d.title,
            company: d.company,
            verified: true,
            city: d.city,
            locationDetails: d.location_details || d.city,
            workMode: d.work_mode,
            contract: d.contract_type,
            salaryMin: d.salary_min,
            salaryMax: d.salary_max,
            salaryUnit: d.salary_unit || 'DH / mois',
            postedAt: 'Récent',
            postedAtAr: 'حديثاً',
            logoBg: 'bg-emerald-800',
            logoText: d.company.substring(0, 2).toUpperCase(),
            description: d.description,
            descriptionAr: d.description_ar || d.description,
            missions: d.missions || [],
            requirements: d.requirements || [],
            skills: d.skills || [],
            benefits: d.benefits || [],
            experienceLevel: d.experience_level || 'Non spécifié',
            educationLevel: d.education_level || 'Bac +3 / Bac +5',
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local database:', err);
      }
    }
    return getLocalJobs();
  },

  async addJob(job: Omit<Job, 'id' | 'postedAt' | 'postedAtAr'>): Promise<Job> {
    const newJob: Job = {
      ...job,
      id: `job-${Date.now()}`,
      postedAt: 'À l\'instant',
      postedAtAr: 'الآن',
    };

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('jobs').insert([
          {
            title: newJob.title,
            title_ar: newJob.titleAr,
            company: newJob.company,
            city: newJob.city,
            location_details: newJob.locationDetails,
            work_mode: newJob.workMode,
            contract_type: newJob.contract,
            salary_min: newJob.salaryMin,
            salary_max: newJob.salaryMax,
            description: newJob.description,
            skills: newJob.skills,
            benefits: newJob.benefits,
          },
        ]);
      } catch (err) {
        console.warn('Failed to insert into Supabase:', err);
      }
    }

    const currentJobs = getLocalJobs();
    const updated = [newJob, ...currentJobs];
    setLocalJobs(updated);
    return newJob;
  },

  async submitApplication(application: Application): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('applications').insert([
          {
            job_id: application.jobId,
            candidate_name: 'Karim El Amrani',
            candidate_email: 'karim.elamrani@gmail.com',
            candidate_phone: '+212 6 61 23 45 67',
            status: application.status,
          },
        ]);
      } catch (err) {
        console.warn('Supabase application submission failed:', err);
      }
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      const apps = stored ? JSON.parse(stored) : [];
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify([application, ...apps]));
    } catch (e) {
      console.error(e);
    }
  },

  async saveWhatsAppAlert(alert: { phone: string; city: string; contract: string; keywords: string }): Promise<void> {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('whatsapp_alerts').insert([
          {
            phone: alert.phone,
            city: alert.city,
            contract_type: alert.contract,
            keywords: alert.keywords,
          },
        ]);
      } catch (err) {
        console.warn('Supabase whatsapp alert insert failed:', err);
      }
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY_ALERTS);
      const list = stored ? JSON.parse(stored) : [];
      localStorage.setItem(STORAGE_KEY_ALERTS, JSON.stringify([alert, ...list]));
    } catch (e) {
      console.error(e);
    }
  },
};
