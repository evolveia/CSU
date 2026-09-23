import { AdminProfileId, AdminProfileInfo } from '../types';

export const ADMIN_PROFILES: AdminProfileInfo[] = [
  {
    id: 'citoyen',
    numericCode: 1,
    title: 'Citoyen Congolais',
    portugueseTitle: 'Cidadão',
    roleBadge: 'Espace Citoyen (/gov)',
    destinationName: 'Compte Gov Citoyen',
    description: 'Consultation du numéro CSU, attestations numériques, suivi des allocations et gestion des consentements.',
    clearanceLevel: 'N1',
    scope: 'Données personnelles uniquement',
  },
  {
    id: 'agent_n1',
    numericCode: 2,
    title: 'Agent Enrôleur N1',
    portugueseTitle: 'Agente N1',
    roleBadge: 'Bancada de Atendimento',
    destinationName: "Guichet d'Enrôlement & Prise d'Empreintes",
    description: "Saisie des données du ménage, capture biométrique (visage/empreintes), géoréférencement GPS et délivrance du récépissé.",
    clearanceLevel: 'N1',
    scope: 'Station locale — Enrôlement direct',
  },
  {
    id: 'agent_n2',
    numericCode: 3,
    title: 'Agent Régularisation N2',
    portugueseTitle: 'Agente N2',
    roleBadge: 'Bancada de Regularização',
    destinationName: 'Guichet de Recours & Validation Plan B',
    description: 'Traitement des dossiers sans documents d’état civil, validation des déclarations communautaires et des 2 témoins assermentés.',
    clearanceLevel: 'N2',
    scope: 'Commune / Antenne territoriale',
  },
  {
    id: 'supervisor',
    numericCode: 4,
    title: 'Superviseur de Station',
    portugueseTitle: 'Supervisor',
    roleBadge: 'Painel da Estação',
    destinationName: 'Supervision & Flux de la Station Citoyenneté',
    description: 'Gestion des files d’attente, affectation des guichets, contrôle des kits biométriques et clôture journalière.',
    clearanceLevel: 'N2',
    scope: 'Station physique ou unité mobile',
  },
  {
    id: 'coord_muni',
    numericCode: 5,
    title: 'Coordonnateur Municipal',
    portugueseTitle: 'Coordenador Municipal',
    roleBadge: 'Painel Municipal',
    destinationName: 'Coordination Territoriale Urbaine',
    description: 'Surveillance des indicateurs communaux, résolution des litiges géographiques et liaison avec les chefs de quartier.',
    clearanceLevel: 'N2',
    scope: 'Territoire / Ville / Commune',
  },
  {
    id: 'coord_prov',
    numericCode: 6,
    title: 'Coordonnateur Provincial',
    portugueseTitle: 'Coordenador Provincial',
    roleBadge: 'Painel Provincial',
    destinationName: 'Délégation Provinciale CSU (26 Provinces)',
    description: 'Déploiement des unités mobiles en zones enclavées, gestion de la logistique régionale et rapports au Gouverneur.',
    clearanceLevel: 'N3',
    scope: 'Province entière',
  },
  {
    id: 'gestor_nac',
    numericCode: 7,
    title: 'Gestionnaire National CSU',
    portugueseTitle: 'Gestor Nacional',
    roleBadge: 'Console Nacional',
    destinationName: 'Direction Générale Stratégique',
    description: 'Pilotage macro-économique du Registre Social, définition des seuils d’éligibilité et interconnexion ministérielle.',
    clearanceLevel: 'N4',
    scope: 'National — République Démocratique du Congo',
  },
  {
    id: 'admin_sys',
    numericCode: 8,
    title: 'Administrateur de Système',
    portugueseTitle: 'Administrador de Sistema',
    roleBadge: 'Console Técnico',
    destinationName: 'Centre de Données & Infrastructure Souveraine',
    description: 'Gestion des accès cryptographiques, santé des serveurs souverains à Kinshasa et monitoring des liaisons satellites.',
    clearanceLevel: 'SECRET ÉTAT',
    scope: 'Niveau infrastructure & Sécurité',
  },
  {
    id: 'dpo_priv',
    numericCode: 9,
    title: 'Délégué Protection Données (DPO)',
    portugueseTitle: 'Oficial de Proteção de Dados',
    roleBadge: 'Console de Privacidade',
    destinationName: 'Conformité & Registre Loi n° 09/001',
    description: 'Audit du respect de la vie privée, traitement des demandes de rectification et suivi des autorisations d’accès aux tiers.',
    clearanceLevel: 'CONFIDENTIEL',
    scope: 'Protection des Données & Éthique',
  },
  {
    id: 'auditor',
    numericCode: 10,
    title: "Auditeur Général d'État",
    portugueseTitle: 'Auditor',
    roleBadge: 'Console de Auditoria',
    destinationName: 'Inspection Générale & Lutte Anti-Fraude',
    description: 'Détection des doublons, élimination des bénéficiaires fictifs et traçabilité inaltérable de chaque transaction administrative.',
    clearanceLevel: 'SECRET ÉTAT',
    scope: 'Contrôle Indépendant & Anti-Fraude',
  },
  {
    id: 'gestor_prog',
    numericCode: 11,
    title: 'Gestionnaire Programmes Sociaux',
    portugueseTitle: 'Gestor de Programas Sociais',
    roleBadge: 'Console de Programas',
    destinationName: 'Coordination des Filets Sociaux Partenaires',
    description: 'Ciblage des bénéficiaires pour les cantines, gratuité de l’enseignement de base et bourses d’urgence humanitaire.',
    clearanceLevel: 'N3',
    scope: 'Programmes Sociaux Sectoriels',
  },
  {
    id: 'op_beneficios',
    numericCode: 12,
    title: 'Opérateur de Bénéfices',
    portugueseTitle: 'Operador de Benefícios',
    roleBadge: 'Bancada de Benefícios',
    destinationName: 'Plateforme de Paiement & Mobile Money',
    description: 'Émission des ordres de transfert monétaire sécurisé, réconciliation bancaire et assistance aux guichets ruraux.',
    clearanceLevel: 'N2',
    scope: 'Transactions Financières Citoyennes',
  },
  {
    id: 'dev_api',
    numericCode: 13,
    title: 'Intégrateur & Ingénieur API',
    portugueseTitle: 'Integrador/Dev',
    roleBadge: 'Portal do Desenvolvedor',
    destinationName: 'Passerelle API Interopérabilité Gov',
    description: 'Documentation OpenAPI, gestion des tokens OAuth gouvernementaux, webhooks sécurisés et sandbox de test.',
    clearanceLevel: 'N2',
    scope: 'Écosystème Tech & Interconnexions',
  },
  {
    id: 'suporte_tec',
    numericCode: 14,
    title: 'Support Technique & Citoyen',
    portugueseTitle: 'Suporte Técnico',
    roleBadge: 'Central de Suporte',
    destinationName: 'Helpdesk National & Gestion des Requêtes',
    description: 'Assistance téléphonique 4-chiffres, déblocage des comptes citoyens, assistance aux opérateurs de terrain.',
    clearanceLevel: 'N1',
    scope: 'Assistance Utilisateurs & Kits',
  },
];

// Helper latency
const simulateNetworkLatency = (min = 400, max = 700) => {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const authService = {
  // Citizen OTP Request
  async requestCitizenOtp(identifier: string): Promise<{ success: boolean; message: string; maskedContact: string }> {
    await simulateNetworkLatency(450, 650);
    const clean = identifier.replace(/\s+/g, '');
    if (!clean || clean.length < 6) {
      throw new Error("Veuillez saisir un numéro CSU valide ou un numéro de téléphone à 9 ou 10 chiffres.");
    }
    const masked = clean.startsWith('+243')
      ? `+243 ••• •• ${clean.slice(-3)}`
      : `CSU-••••-${clean.slice(-4)}`;
    return {
      success: true,
      message: `Code de vérification envoyé avec succès par SMS sécurisé.`,
      maskedContact: masked,
    };
  },

  // Citizen OTP Verify
  async verifyCitizenOtp(otp: string): Promise<{ success: boolean; user: { name: string; csuNumber: string } }> {
    await simulateNetworkLatency(500, 750);
    if (otp !== '123456' && otp.length !== 6) {
      throw new Error("Code de confirmation incorrect. Saisissez le code à 6 chiffres reçu (ex: 123456).");
    }
    return {
      success: true,
      user: {
        name: 'Mbiya Tshilombo Esther',
        csuNumber: 'CSU-2026-9941-8412',
      },
    };
  },

  // Citizen Biometric App Auth Simulation
  async verifyCitizenBiometrics(): Promise<{ success: boolean; user: { name: string; csuNumber: string } }> {
    await simulateNetworkLatency(1800, 2200); // 2s as requested
    return {
      success: true,
      user: {
        name: 'Kasongo Ilunga Dieudonné',
        csuNumber: 'CSU-2026-4412-7098',
      },
    };
  },

  // Admin Login Step 1 (email + password)
  async adminValidateCredentials(
    email: string,
    pass: string
  ): Promise<{ success: boolean; requiresMfa: boolean; detectedProfile: AdminProfileInfo }> {
    await simulateNetworkLatency(500, 700);

    const normalized = email.trim().toLowerCase();
    if (!normalized.endsWith('@gouv.cd')) {
      throw new Error("Accès refusé. Seules les adresses officielles du domaine souverain « @gouv.cd » sont habilitées.");
    }

    if (pass.length < 6) {
      throw new Error("Mot de passe invalide. Votre mot de passe de service doit comporter au moins 8 caractères.");
    }

    // Default assigned profile based on email or default to agent_n1
    let assigned = ADMIN_PROFILES[1]; // Agent N1
    if (normalized.includes('superviseur') || normalized.includes('supervisor')) {
      assigned = ADMIN_PROFILES[3];
    } else if (normalized.includes('national') || normalized.includes('directeur')) {
      assigned = ADMIN_PROFILES[6];
    } else if (normalized.includes('admin') || normalized.includes('sys')) {
      assigned = ADMIN_PROFILES[7];
    } else if (normalized.includes('dpo') || normalized.includes('privacy')) {
      assigned = ADMIN_PROFILES[8];
    } else if (normalized.includes('audit')) {
      assigned = ADMIN_PROFILES[9];
    }

    return {
      success: true,
      requiresMfa: true,
      detectedProfile: assigned,
    };
  },

  // Admin Step 2: MFA TOTP verification
  async verifyAdminMfa(code: string, profileId: AdminProfileId): Promise<{ success: boolean; profile: AdminProfileInfo }> {
    await simulateNetworkLatency(600, 850);
    if (code.length !== 6) {
      throw new Error("Veuillez saisir les 6 chiffres de votre application d’authentification officielle (TOTP).");
    }
    const found = ADMIN_PROFILES.find((p) => p.id === profileId) || ADMIN_PROFILES[1];
    return {
      success: true,
      profile: { ...found, name: 'Agent Assermenté RDC', role: found.id },
    };
  },

  // Aliases for convenience
  async adminLogin(email: string, pass: string): Promise<{ success: boolean; requiresMfa: boolean; detectedProfile: AdminProfileInfo }> {
    return this.adminValidateCredentials(email, pass);
  },

  async adminVerifyMfa(email: string, code: string): Promise<{ success: boolean; profile: AdminProfileInfo }> {
    return this.verifyAdminMfa(code, 'supervisor');
  },
};
