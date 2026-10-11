-- ===================================================================
-- SCHÉMA POSTGRESQL / SUPABASE — KHIDMA MAROC (Version Résiliente)
-- Compatible avec Supabase Cloud, Docker et PostgreSQL 13+
-- ===================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABLE DES ENTREPRISES / RECRUTEURS (Maroc)
CREATE TABLE IF NOT EXISTS public.recruiters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID, -- ID optionnel lié à l'authentification
    company_name VARCHAR(255) NOT NULL,
    ice_number VARCHAR(15), -- Identifiant Commun de l'Entreprise (Maroc)
    rc_number VARCHAR(20),  -- Registre de Commerce
    contact_email VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    city VARCHAR(100) NOT NULL,
    address TEXT,
    logo_url TEXT,
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABLE DES ANNONCES D'EMPLOI (Jobs)
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recruiter_id UUID REFERENCES public.recruiters(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    title_ar VARCHAR(255),
    company VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL, -- Casablanca, Rabat, Tanger, Marrakech...
    location_details VARCHAR(255),
    work_mode VARCHAR(50) DEFAULT 'Présentiel',
    contract_type VARCHAR(50) NOT NULL, -- CDI, CDD, Stage PFE, Contrat ANAPEC, Freelance
    salary_min INTEGER DEFAULT 0,
    salary_max INTEGER DEFAULT 0,
    salary_unit VARCHAR(20) DEFAULT 'DH / mois',
    description TEXT NOT NULL,
    description_ar TEXT,
    missions JSONB DEFAULT '[]'::jsonb,
    requirements JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    experience_level VARCHAR(50) DEFAULT '1 - 3 ans',
    education_level VARCHAR(50) DEFAULT 'Bac +5',
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABLE DES CANDIDATURES (Applications)
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE,
    candidate_user_id UUID,
    candidate_name VARCHAR(255) NOT NULL,
    candidate_email VARCHAR(255) NOT NULL,
    candidate_phone VARCHAR(50) NOT NULL,
    anapec_id VARCHAR(50),
    cv_url TEXT,
    cover_note TEXT,
    status VARCHAR(50) DEFAULT 'Reçue',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABLE DES ALERTES WHATSAPP (Maroc)
CREATE TABLE IF NOT EXISTS public.whatsapp_alerts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    phone VARCHAR(30) NOT NULL,
    full_name VARCHAR(150),
    city VARCHAR(100) NOT NULL,
    contract_type VARCHAR(50) DEFAULT 'Tous',
    keywords TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    last_notified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. INDEXES POUR PERFORMANCE RECHERCHE
CREATE INDEX IF NOT EXISTS idx_jobs_city ON public.jobs(city);
CREATE INDEX IF NOT EXISTS idx_jobs_contract ON public.jobs(contract_type);
CREATE INDEX IF NOT EXISTS idx_jobs_active ON public.jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_applications_job ON public.applications(job_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_alerts_phone ON public.whatsapp_alerts(phone);

-- 7. SÉCURITÉ ROW LEVEL (RLS)
ALTER TABLE public.recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.whatsapp_alerts ENABLE ROW LEVEL SECURITY;

-- Nettoyage des anciennes politiques si existantes pour éviter les conflits
DROP POLICY IF EXISTS "Offres publiques consultables par tous" ON public.jobs;
DROP POLICY IF EXISTS "Les recruteurs peuvent publier des offres" ON public.jobs;
DROP POLICY IF EXISTS "Candidature libre" ON public.applications;
DROP POLICY IF EXISTS "Recruteurs voient leurs candidatures" ON public.applications;
DROP POLICY IF EXISTS "Alertes whatsapp publiques" ON public.whatsapp_alerts;

-- Création des politiques RLS
CREATE POLICY "Offres publiques consultables par tous"
    ON public.jobs FOR SELECT
    USING (is_active = TRUE);

CREATE POLICY "Les recruteurs peuvent publier des offres"
    ON public.jobs FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Candidature libre"
    ON public.applications FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Recruteurs voient leurs candidatures"
    ON public.applications FOR SELECT
    USING (true);

CREATE POLICY "Alertes whatsapp publiques"
    ON public.whatsapp_alerts FOR INSERT
    WITH CHECK (true);

-- 8. DONNÉES INITIALES MAROCAINES (Seed Data)
INSERT INTO public.jobs (title, title_ar, company, city, location_details, work_mode, contract_type, salary_min, salary_max, description, skills, benefits, is_featured)
VALUES 
(
    'Développeur Full Stack React / Node.js',
    'مطور Full Stack (React / Node.js)',
    'Nearshore Technologies',
    'Casablanca',
    'Sidi Maârouf, Casanearshore Park 1',
    'Hybride',
    'CDI',
    14000,
    18500,
    'Nearshore Technologies recrute un Développeur Full Stack expérimenté pour rejoindre notre pôle digital à Casanearshore.',
    '["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"]'::jsonb,
    '["Télétravail 2j/semaine", "Mutuelle privée 85%", "CIMR", "Navette d''entreprise"]'::jsonb,
    TRUE
),
(
    'Stage PFE - Data Analyst & BI (Pré-embauche)',
    'تدريب PFE - محلل بيانات وذكاء الأعمال (مع إمكانية التوظيف)',
    'FinTech Maroc Analytics',
    'Casablanca',
    'Bld Abdelmoumen, Casablanca',
    'Présentiel',
    'Stage PFE',
    4500,
    6000,
    'Opportunité de stage PFE de 6 mois avec embauche en CDI à l''issue du stage.',
    '["Power BI", "SQL", "Python", "Data Modeling"]'::jsonb,
    '["Gratification mensuelle 5000 DH", "Embauche CDI garantie si validé"]'::jsonb,
    FALSE
),
(
    'Chef de Projet Supply Chain Automobile',
    'مدير مشروع سلسلة الإمداد لقطاع السيارات',
    'Tanger Med Logistics',
    'Tanger',
    'Tanger Automotive City (TAC)',
    'Présentiel',
    'CDI',
    16000,
    21000,
    'Au cœur de la zone franche automobile de Tanger, pilotez les flux logistiques pour nos partenaires constructeurs.',
    '["SAP ERP", "Supply Chain", "Lean Manufacturing", "Automotive"]'::jsonb,
    '["Transport assuré", "Restaurant d''entreprise", "Assurance groupe"]'::jsonb,
    TRUE
)
ON CONFLICT DO NOTHING;
