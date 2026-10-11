export type ContractType = 'CDI' | 'CDD' | 'Stage PFE' | 'Contrat ANAPEC' | 'Freelance';

export type City = 
  | 'Toutes'
  | 'Casablanca' 
  | 'Rabat' 
  | 'Tanger' 
  | 'Marrakech' 
  | 'Agadir' 
  | 'Fès' 
  | 'Télétravail';

export type Sector = 
  | 'Tous'
  | 'Informatique & Tech'
  | 'Centres d\'appels / BPO'
  | 'Ingénierie & Industrie'
  | 'Finance & Comptabilité'
  | 'Marketing & Commerce';

export interface Job {
  id: string;
  title: string;
  titleAr: string;
  company: string;
  verified: boolean;
  city: City;
  locationDetails: string;
  workMode: 'Présentiel' | 'Hybride' | 'Télétravail 100%';
  contract: ContractType;
  salaryMin: number;
  salaryMax: number;
  salaryUnit: string; // "DH / mois"
  postedAt: string;
  postedAtAr: string;
  logoBg: string;
  logoText: string;
  featured?: boolean;
  description: string;
  descriptionAr: string;
  missions: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  experienceLevel: string;
  educationLevel: string;
}

export type Language = 'fr' | 'ar';
export type ActiveTab = 'home' | 'search' | 'saved' | 'applications' | 'profile';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  city: string;
  date: string;
  status: 'Reçue' | 'En cours d\'examen' | 'Entretien planifié';
}
