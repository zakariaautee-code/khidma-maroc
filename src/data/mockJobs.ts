import { Job } from '../types';

export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Développeur Full Stack React / Node.js',
    titleAr: 'مطور Full Stack (React / Node.js)',
    company: 'Nearshore Technologies',
    verified: true,
    city: 'Casablanca',
    locationDetails: 'Sidi Maârouf, Casanearshore Park 1',
    workMode: 'Hybride',
    contract: 'CDI',
    salaryMin: 14000,
    salaryMax: 18500,
    salaryUnit: 'DH / mois',
    postedAt: 'Il y a 2h',
    postedAtAr: 'منذ ساعتين',
    logoBg: 'bg-emerald-800',
    logoText: 'NT',
    featured: true,
    description: 'Nearshore Technologies recrute un Développeur Full Stack expérimenté pour rejoindre notre pôle d\'excellence digitale basé à Casanearshore. Vous concevrez des plateformes SaaS scalables pour nos clients grands comptes en Europe et en Afrique.',
    descriptionAr: 'تبحث شركة Nearshore Technologies عن مطور Full Stack ذو خبرة للانضمام إلى قطب التميز الرقمي بكازانيرشور لتطوير منصات SaaS موجهة لعملاء دوليين.',
    missions: [
      'Conception et développement d\'APIs robustes sous Node.js & TypeScript',
      'Développement d\'interfaces utilisateur ultra-rapides sous React et Next.js',
      'Mise en place de tests unitaires et d\'intégration (Jest, Cypress)',
      'Collaboration agile avec les équipes produit et UI/UX'
    ],
    requirements: [
      'Bac+5 en Ingénierie Informatique ou équivalent',
      '3 à 5 ans d\'expérience confirmée sur la stack React / Node',
      'Maîtrise de PostgreSQL / MongoDB et Docker',
      'Bonne maîtrise du français et de l\'anglais technique'
    ],
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    benefits: ['Télétravail 2 jours/semaine', 'Mutuelle santé privée 85%', 'CIMR', 'Navette d\'entreprise Casanearshore', 'Prime de performance'],
    experienceLevel: '3 - 5 ans',
    educationLevel: 'Bac +5 (Ingénieur)'
  },
  {
    id: 'job-2',
    title: 'Ingénieur Cloud & DevOps AWS',
    titleAr: 'مهندس سحابي و DevOps (AWS)',
    company: 'Atlas Cloud Solutions',
    verified: true,
    city: 'Rabat',
    locationDetails: 'Rabat Technopolis, Sala Al Jadida',
    workMode: 'Hybride',
    contract: 'CDI',
    salaryMin: 17000,
    salaryMax: 23000,
    salaryUnit: 'DH / mois',
    postedAt: 'Il y a 5h',
    postedAtAr: 'منذ 5 ساعات',
    logoBg: 'bg-indigo-700',
    logoText: 'AC',
    featured: true,
    description: 'Accompagnez la transformation Cloud de nos partenaires institutionnels et bancaires depuis le campus de Technopolis Rabat.',
    descriptionAr: 'المساهمة في التحول السحابي لشركائنا البنكيين والمؤسسات من داخل مجمع تكنوبوليس الرباط.',
    missions: [
      'Automatisation de l\'infrastructure CI/CD via Terraform & GitHub Actions',
      'Gestion et optimisation de clusters Kubernetes (EKS)',
      'Supervision et surveillance de la disponibilité et sécurité (Datadog, Grafana)',
      'Optimisation des coûts d\'hébergement AWS'
    ],
    requirements: [
      'Diplôme d\'ingénieur d\'État (ENSIAS, EMSI, INPT...)',
      'Certification AWS Solutions Architect ou CKA appréciée',
      'Excellente culture DevOps et sécurité DevSecOps'
    ],
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux', 'Python'],
    benefits: ['Télétravail partiel', 'Assurance maladie complémentaire', 'Formations certifiantes prises en charge', 'Prime annuelle'],
    experienceLevel: '4+ ans',
    educationLevel: 'Bac +5'
  },
  {
    id: 'job-3',
    title: 'Stage PFE - Data Analyst & BI (Pré-embauche)',
    titleAr: 'تدريب PFE - محلل بيانات وذكاء الأعمال (مع إمكانية التوظيف)',
    company: 'FinTech Maroc Analytics',
    verified: true,
    city: 'Casablanca',
    locationDetails: 'Bld Abdelmoumen, Casablanca',
    workMode: 'Présentiel',
    contract: 'Stage PFE',
    salaryMin: 4500,
    salaryMax: 6000,
    salaryUnit: 'DH / mois',
    postedAt: 'Hier',
    postedAtAr: 'أمس',
    logoBg: 'bg-emerald-600',
    logoText: 'FT',
    featured: false,
    description: 'Opportunité de stage de fin d\'études (PFE) d\'une durée de 6 mois avec réelle perspective d\'embauche en CDI à l\'issue du stage.',
    descriptionAr: 'فرصة تدريب لنهاية الدراسة (PFE) لمدة 6 أشهر مع إمكانية الترسيم الفوري في عقد CDI.',
    missions: [
      'Création de tableaux de bord décisionnels interactifs sur Power BI',
      'Nettoyage et modélisation de données financières marocaines',
      'Participation aux cérémonies de validation métier'
    ],
    requirements: [
      'Étudiant(e) en dernière année d\'école d\'ingénieurs ou Master MIAGE / Data',
      'Maîtrise de SQL, Python et Power BI',
      'Rigueur, esprit analytique et bonne communication'
    ],
    skills: ['Power BI', 'SQL', 'Python', 'Excel Avancé', 'Data Modeling'],
    benefits: ['Gratification mensuelle 5000 DH', 'Encadrement par un Senior Lead Data', 'Embauche CDI garantie si stage validé'],
    experienceLevel: 'Débutant / Étudiant',
    educationLevel: 'Bac +5 en cours'
  },
  {
    id: 'job-4',
    title: 'Chef de Projet Supply Chain Automobile',
    titleAr: 'مدير مشروع سلسلة الإمداد لقطاع السيارات',
    company: 'Tanger Med Logistics',
    verified: true,
    city: 'Tanger',
    locationDetails: 'Tanger Automotive City (TAC), TFZ',
    workMode: 'Présentiel',
    contract: 'CDI',
    salaryMin: 16000,
    salaryMax: 21000,
    salaryUnit: 'DH / mois',
    postedAt: 'Il y a 1 jour',
    postedAtAr: 'منذ يوم',
    logoBg: 'bg-blue-800',
    logoText: 'TM',
    featured: false,
    description: 'Au cœur de la zone franche automobile de Tanger, pilotez les flux logistiques entrants et sortants pour nos partenaires constructeurs.',
    descriptionAr: 'إدارة وتنسيق التدفقات اللوجستية بمجمع صناعة السيارات بطنجة.',
    missions: [
      'Planification des flux logistiques Just-In-Time pour les lignes de montage',
      'Supervision des approvisionnements maritimes et routiers',
      'Optimisation des indicateurs de performance (OTIF, taux de rotation)'
    ],
    requirements: [
      'Ingénieur d\'État Génie Industriel / Logistique',
      'Expérience confirmée dans l\'industrie automobile ou câblage',
      'Maîtrise de SAP MM/WM'
    ],
    skills: ['SAP ERP', 'Supply Chain', 'Lean Manufacturing', 'Six Sigma', 'Automotive'],
    benefits: ['Transport assuré (Tanger centre <-> TAC)', 'Restaurant d\'entreprise', 'Assurance groupe', '13ème mois'],
    experienceLevel: '3 - 6 ans',
    educationLevel: 'Bac +5'
  },
  {
    id: 'job-5',
    title: 'Conseiller Clientèle Bilingue (Français / Anglais)',
    titleAr: 'مستشار خدمة عملاء مزدوج اللغة (فرنسي / إنجليزي)',
    company: 'Majorel Connect BPO',
    verified: true,
    city: 'Marrakech',
    locationDetails: 'Guéliz, Avenue Mohammed VI, Marrakech',
    workMode: 'Présentiel',
    contract: 'Contrat ANAPEC',
    salaryMin: 5500,
    salaryMax: 7800,
    salaryUnit: 'DH / mois',
    postedAt: 'Il y a 2 jours',
    postedAtAr: 'منذ يومين',
    logoBg: 'bg-rose-700',
    logoText: 'MC',
    featured: false,
    description: 'Rejoignez le leader de l\'expérience client au Maroc sur notre site moderne de Guéliz Marrakech. CDI immédiat sous convention ANAPEC.',
    descriptionAr: 'فرصة عمل فورية في مركز الاتصال بمراكش جليز، مع تكوين مدفوع الأجر وتأمين شامل.',
    missions: [
      'Traitement des demandes clients par téléphone, email et chat',
      'Résolution des réclamations avec haut niveau de satisfaction client',
      'Respect des normes de qualité et des procédures internes'
    ],
    requirements: [
      'Excellent niveau en langue française orale et écrite',
      'Aisance relationnelle, écoute active et sens du service',
      'Débutants acceptés, formation complète dispensée'
    ],
    skills: ['Relation Client', 'Français Courant', 'CRM', 'Écoute active', 'Communication'],
    benefits: ['Primes mensuelles déplafonnées', 'Transport aller-retour assuré', 'Couverture CNSS + Mutuelle privée dès le 1er jour', 'Évolution rapide'],
    experienceLevel: 'Débutant accepté',
    educationLevel: 'Bac / Bac +2'
  },
  {
    id: 'job-6',
    title: 'Lead UI/UX Designer & Product Designer',
    titleAr: 'مصمم واجهات المستخدم وتجربة المستخدم (UI/UX Lead)',
    company: 'Maroc Digital Studio',
    verified: true,
    city: 'Télétravail',
    locationDetails: '100% Télétravail depuis n\'importe où au Maroc',
    workMode: 'Télétravail 100%',
    contract: 'Freelance',
    salaryMin: 22000,
    salaryMax: 30000,
    salaryUnit: 'DH / mois',
    postedAt: 'Il y a 3 jours',
    postedAtAr: 'منذ 3 أيام',
    logoBg: 'bg-purple-700',
    logoText: 'MD',
    featured: true,
    description: 'Nous recherchons un Senior UI/UX Designer marocain passionné pour concevoir des applications web et mobiles innovantes à fort impact.',
    descriptionAr: 'فرصة عمل عن بعد بنسبة 100% في تصميم تجارب المستخدم للتطبيقات المغربية والدولية.',
    missions: [
      'Conception de Design Systems modulaires sous Figma',
      'Recherche utilisateur et interviews de candidats marocains',
      'Prototypage interactif et tests d\'utilisabilité'
    ],
    requirements: [
      'Portfolio démontrant des projets web/mobile aboutis',
      '5+ ans d\'expérience en Product Design',
      'Excellente maîtrise de Figma, auto-layout et variables'
    ],
    skills: ['Figma', 'Design Systems', 'UX Research', 'Mobile Prototyping', 'Tailwind'],
    benefits: ['Télétravail total flexible', 'Budget équipement (MacBook Pro fourni)', 'Facturation mensuelle garantie'],
    experienceLevel: '5+ ans',
    educationLevel: 'Bac +3 / Bac +5'
  }
];

export const MOROCCAN_CITIES = [
  'Toutes',
  'Casablanca',
  'Rabat',
  'Tanger',
  'Marrakech',
  'Agadir',
  'Fès',
  'Télétravail'
];

export const CONTRACT_TYPES = [
  'Tous',
  'CDI',
  'CDD',
  'Stage PFE',
  'Contrat ANAPEC',
  'Freelance'
];
