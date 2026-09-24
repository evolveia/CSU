import React, { useState } from 'react';
import { AdminProfile, RoleType, SupportedLang } from '../../types';
import { LANGUAGES } from '../../i18n/translations';
import { getProfileI18n, translateText } from '../../i18n/translationEngine';
import { CsuLogo } from '../brand/CsuLogo';
import { CsuIdCard } from '../common/CsuIdCard';
import { CitizenPlatform } from '../citizen/CitizenPlatform';
import { AdminPlatform } from '../admin/AdminPlatform';
import { DashboardOverview } from '../admin/DashboardOverview';
import {
  Shield,
  User,
  LogOut,
  Building,
  MapPin,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Smartphone,
  Lock,
  Layers,
  ArrowRight,
  Database,
  Search,
  Key,
  FileCheck,
  Headphones,
  Sliders,
  DollarSign,
  Activity,
  BarChart3,
  LayoutDashboard,
  Globe,
  Check,
} from 'lucide-react';

interface ProfileRouterProps {
  initialProfile?: AdminProfile | null;
  citizenData?: { name: string; csuNumber: string } | null;
  currentLang?: SupportedLang;
  onLanguageChange?: (lang: SupportedLang) => void;
  onLogout: () => void;
  onNavigateHome: () => void;
}

interface RoleDefinition {
  type: RoleType;
  title: string;
  badge: string;
  description: string;
  metrics: { label: string; value: string }[];
  primaryActions: string[];
}

const ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    type: 'citoyen',
    title: 'Espace Citoyen (/gov)',
    badge: 'Compte Gov Particulier',
    description: 'Gestion de votre foyer, vérification de votre identifiant CSU national, suivi des versements et téléchargement du récépissé.',
    metrics: [
      { label: 'Statut du compte', value: 'Niveau 3 · Biométrique' },
      { label: 'Dernier versement reçu', value: '75 000 CDF · Airtel' },
      { label: 'Membres rattachés', value: '4 personnes' },
    ],
    primaryActions: ['Télécharger mon Récépissé PDF', 'Mettre à jour mon Mobile Money', 'Déclarer un nouveau-né'],
  },
  {
    type: 'agente_n1',
    title: 'Bancada de Atendimento (Agent N1)',
    badge: 'Guichet d’Enrôlement',
    description: 'Accueil du public, saisie des données civiles des ménages, prise de vue faciale et délivrance du premier récépissé imprimé.',
    metrics: [
      { label: 'Dossiers enrôlés aujourd’hui', value: '38 ménages' },
      { label: 'Temps moyen par enrôlement', value: '11 min' },
      { label: 'Disponibilité kit photo', value: 'Opérationnel' },
    ],
    primaryActions: ['Nouvel Enrôlement', 'Imprimer un Récépissé', 'Vérifier présence d’un doublon'],
  },
  {
    type: 'agente_n2',
    title: 'Bancada de Regularização (Agent N2)',
    badge: 'Validation Dérogatoire',
    description: 'Traitement des procédures du « Plan B » (sans papiers), audition des témoins communautaires et résolution des contestations.',
    metrics: [
      { label: 'Dossiers Plan B traités', value: '14 validés' },
      { label: 'Témoins auditionnés', value: '28 citoyens' },
      { label: 'Recours en attente', value: '3 dossiers' },
    ],
    primaryActions: ['Valider Déclaration avec Témoins', 'Activer Procédure Plan B', 'Auditionner Chef d’avenue'],
  },
  {
    type: 'supervisor',
    title: 'Painel da Estação (Superviseur)',
    badge: 'Gestion de Guichet',
    description: 'Gestion de l’équipe d’agents de la Station Citoyenneté, surveillance de la file d’attente et clôture journalière des registres.',
    metrics: [
      { label: 'Affluence actuelle', value: 'File fluide (8 min)' },
      { label: 'Agents actifs sur site', value: '6 guichets ouverts' },
      { label: 'Total jour de la station', value: '214 inscrits' },
    ],
    primaryActions: ['Ouvrir un Guichet supplémentaire', 'Clôturer le Registre Quotidien', 'Signaler une anomalie technique'],
  },
  {
    type: 'coordenador_municipal',
    title: 'Painel Municipal (Coordinateur Communal)',
    badge: 'Coordination Commune',
    description: 'Pilotage communal de l’ensemble des stations fixes et unités mobiles déployées dans la juridiction municipale.',
    metrics: [
      { label: 'Stations communales actives', value: '4 centres' },
      { label: 'Taux de couverture commune', value: '68.4%' },
      { label: 'Unités mobiles en rotation', value: '2 kits solaires' },
    ],
    primaryActions: ['Affecter Unité Mobile', 'Rapport Communal Consolidé', 'Liaison Bourgmestre'],
  },
  {
    type: 'coordenador_provincial',
    title: 'Painel Provincial (Coordinateur Provincial)',
    badge: 'Délégation Provinciale',
    description: 'Supervision de la couverture provinciale, déploiement des unités mobiles fluviales et terrestres dans les territoires reculés.',
    metrics: [
      { label: 'Territoires couverts', value: '14 / 14 territoires' },
      { label: 'Citoyens cadastrés province', value: '1 240 500' },
      { label: 'Kits solaires déployés', value: '85 unités' },
    ],
    primaryActions: ['Plan de Déploiement Territorial', 'Valider dotations de matériel', 'Consulter Carte SIG Provinciale'],
  },
  {
    type: 'gestor_nacional',
    title: 'Console Nacional (Directeur Général CSU)',
    badge: 'Gouvernance Stratégique',
    description: 'Vue d’ensemble macro-économique et sociale sur les 26 provinces, indicateurs d’impact et arbitrages gouvernementaux.',
    metrics: [
      { label: 'Population nationale cadastrée', value: '14 842 910' },
      { label: 'Déboursements sociaux totaux', value: '184 Mds CDF' },
      { label: 'Indice de couverture d’État', value: '88.2%' },
    ],
    primaryActions: ['Rapport Stratégique Présidence', 'Arbitrage Budgétaire', 'Valider Nouvelle Campagne'],
  },
  {
    type: 'administrador_sistema',
    title: 'Console Técnico (Administrateur Système)',
    badge: 'Infrastructure & Sécurité',
    description: 'Supervision de la haute disponibilité des serveurs souverains de Kinshasa, HSM d’État et synchronisations hors-ligne.',
    metrics: [
      { label: 'Temps de disponibilité (SLA)', value: '99.98%' },
      { label: 'Temps de réponse moyen API', value: '42 ms' },
      { label: 'Nœuds HSM chiffrés', value: 'Actifs (AES-256)' },
    ],
    primaryActions: ['Auditer Clés Cryptographiques', 'Surveiller Base de Données', 'Consulter Logs Systèmes'],
  },
  {
    type: 'oficial_protecao_dados',
    title: 'Console de Privacidade (DPO / CIL)',
    badge: 'Conformité Loi 09/001',
    description: 'Contrôle du respect absolu de la vie privée, audit des accès interministériels et traitement des demandes d’effacement ou de rectification.',
    metrics: [
      { label: 'Demandes citoyennes de rectification', value: '12 traitées' },
      { label: 'Audits de traçabilité réalisés', value: '100% conformes' },
      { label: 'Alertes d’accès non autorisé', value: '0 incident' },
    ],
    primaryActions: ['Exécuter Droit à la Rectification', 'Inspecter Registre des Traitements', 'Émettre Rapport de Conformité'],
  },
  {
    type: 'auditor',
    title: 'Console de Auditoria (Cour des Comptes & IGE)',
    badge: 'Contrôle Républicain',
    description: 'Vérification de l’intégrité financière des allocations et élimination définitive des bénéficiaires fictifs et doublons.',
    metrics: [
      { label: 'Doublons détectés & bloqués', value: '1 420 ménages' },
      { label: 'Fonds publics préservés', value: '3.4 Mds CDF' },
      { label: 'Dernière certification', value: 'Hier, 18h00' },
    ],
    primaryActions: ['Lancer Détection de Doublons', 'Auditer Flux Bancaires & Mobile Money', 'Certifier Clôture Mensuelle'],
  },
  {
    type: 'gestor_programas_sociais',
    title: 'Console de Programas Sociais (Directeur Programmes)',
    badge: 'Protection Sociale',
    description: 'Paramétrage des critères d’éligibilité aux 7 programmes sociaux nationaux et coordination avec les ministères partenaires.',
    metrics: [
      { label: 'Programmes actifs connectés', value: '7 filières' },
      { label: 'Ménages bénéficiaires ciblés', value: '4 820 000' },
      { label: 'Taux d’absorption des fonds', value: '94.2%' },
    ],
    primaryActions: ['Ajuster Critères d’Éligibilité', 'Lancer Nouvelle Cohorte Santé', 'Générer Liste de Distribution'],
  },
  {
    type: 'operador_beneficios',
    title: 'Bancada de Benefícios (Opérateur Paiements)',
    badge: 'Déboursement & Liquidations',
    description: 'Validation des lots de virements Mobile Money (M-Pesa, Orange, Airtel, Afrimoney) et résolution des rejets de paiement.',
    metrics: [
      { label: 'Paiements décaissés ce mois', value: '412 000 virements' },
      { label: 'Taux de succès Mobile Money', value: '98.7%' },
      { label: 'Rejets à retraiter (numéro erroné)', value: '84 cas' },
    ],
    primaryActions: ['Déclencher Lot de Paiement', 'Retraiter Rejets SMS', 'Rapprocher avec Opérateur Télécom'],
  },
  {
    type: 'integrador_dev',
    title: 'Portal do Desenvolvedor (Intégrateur API)',
    badge: 'Interopérabilité d’État',
    description: 'Documentation technique des API REST gouvernementales, gestion des clés OAuth2 et des webhooks de synchronisation.',
    metrics: [
      { label: 'Appels API quotidiens', value: '14.2 M requêtes' },
      { label: 'Ministères interconnectés', value: '12 ministères' },
      { label: 'Version d’API en production', value: 'v2.4.0 (JSON-LD)' },
    ],
    primaryActions: ['Générer Clé d’API Sécurisée', 'Tester Webhook de Vérification', 'Consulter Swagger / OpenAPI'],
  },
  {
    type: 'suporte_tecnico',
    title: 'Central de Suporte (Helpdesk 108)',
    badge: 'Assistance Citoyenne',
    description: 'Assistance multilingue (FR, LN, SW, KG, TSH) aux citoyens appelant le 108 ou aux agents en poste dans les stations.',
    metrics: [
      { label: 'Appels traités aujourd’hui', value: '840 appels' },
      { label: 'Temps d’attente moyen', value: '24 secondes' },
      { label: 'Taux de satisfaction usager', value: '96.4%' },
    ],
    primaryActions: ['Ouvrir un Ticket d’Assistance', 'Réinitialiser Code OTP Citoyen', 'Aider Unité Mobile Hors-ligne'],
  },
];

const STRATEGIC_ROLES: RoleType[] = [
  'gestor_nacional',
  'gestor_nac',
  'coordenador_provincial',
  'coordenador_municipal',
  'gestor_programas_sociais',
  'gestor_prog',
  'auditor',
  'supervisor',
  'administrador_sistema',
  'admin_sys',
];

export const ProfileRouter: React.FC<ProfileRouterProps> = ({
  initialProfile,
  citizenData,
  currentLang = 'FR',
  onLanguageChange,
  onLogout,
  onNavigateHome,
}) => {
  // Current active role selected in the Demo Mode Bar
  const [selectedRoleType, setSelectedRoleType] = useState<RoleType>(
    initialProfile?.role || (citizenData ? 'citoyen' : 'supervisor')
  );

  // Language dropdown open state
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // View mode switcher: Workspace Modules vs. Recharts Dashboard Overview
  const [viewMode, setViewMode] = useState<'platform' | 'dashboard_overview'>('platform');

  const baseRoleDef =
    ROLE_DEFINITIONS.find((r) => r.type === selectedRoleType) || ROLE_DEFINITIONS[0];

  const currentRoleDef = getProfileI18n(selectedRoleType, currentLang, {
    title: baseRoleDef.title,
    badge: baseRoleDef.badge,
    description: baseRoleDef.description,
  });

  const isStrategic = STRATEGIC_ROLES.includes(selectedRoleType);

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#08243F]">
      {/* 1. MODO DEMONSTRAÇÃO BAR (Prompt requirement: visible selector with all 14 profiles) */}
      <div className="bg-[#08243F] text-white border-b-2 border-[#C9A227] px-4 py-3 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E8E5A] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#D9B84A] uppercase tracking-wider">
              {translateText('Mode Démonstration · 14 Profils Homologués :', currentLang)}
            </span>
          </div>

          {/* 14 Profiles Dropdown + Language Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap justify-end">
            <select
              value={selectedRoleType}
              onChange={(e) => setSelectedRoleType(e.target.value as RoleType)}
              className="bg-[#0A2E52] border border-[#C9A227] rounded-xl px-3 py-1.5 text-xs text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#C9A227] cursor-pointer max-w-[260px] truncate"
            >
              {ROLE_DEFINITIONS.map((r, idx) => {
                const tr = getProfileI18n(r.type, currentLang, {
                  title: r.title,
                  badge: r.badge,
                  description: r.description,
                });
                return (
                  <option key={r.type} value={r.type}>
                    {idx + 1}. {tr.title}
                  </option>
                );
              })}
            </select>

            {/* Language Selector */}
            {onLanguageChange && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#0A2E52] hover:bg-[#0E3A66] border border-[#C9A227]/50 text-white text-xs font-bold transition-all cursor-pointer"
                  title="Changer de langue / Change Language"
                >
                  <Globe className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>{currentLang}</span>
                  <span className="text-[10px] text-[#DCE4EE]/70 hidden sm:inline">
                    ({LANGUAGES.find((l) => l.code === currentLang)?.native})
                  </span>
                </button>

                {langDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setLangDropdownOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-[#08243F] border border-[#C9A227] shadow-2xl py-1.5 z-50 max-h-72 overflow-y-auto divide-y divide-[#14477E]/40">
                      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C9A227]">
                        Idiomas / Langues ({LANGUAGES.length})
                      </div>
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            onLanguageChange(lang.code);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                            currentLang === lang.code
                              ? 'bg-[#0E3A66] text-white font-bold'
                              : 'text-[#DCE4EE] hover:bg-[#0A2E52] hover:text-white'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-sm">{lang.flag}</span>
                            <span className="font-mono font-bold text-[#C9A227]">{lang.code}</span>
                            <span>{lang.native}</span>
                          </span>
                          {currentLang === lang.code && (
                            <Check className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0E3A66] hover:bg-[#C0392B] border border-[#14477E] text-xs font-semibold text-white transition-colors cursor-pointer shrink-0"
              title="Quitter la session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{translateText('Quitter', currentLang)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Strategic Operational Bar for Administrative Profiles */}
      {selectedRoleType !== 'citoyen' && (
        <div className="bg-[#0E3A66] border-b border-[#14477E] px-4 py-2.5 shadow-sm">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-[#E9CE7A] uppercase tracking-wider font-mono">
                Profil CSU :
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#08243F] text-white font-semibold border border-[#C9A227]/40">
                {currentRoleDef.badge}
              </span>
              {isStrategic && (
                <span className="px-2 py-0.5 rounded-full bg-[#C9A227]/20 text-[#D9B84A] font-bold text-[10px] uppercase font-mono">
                  ★ Profil Décisionnel Stratégique
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              {/* Toggle: Full Platform vs. Strategic Recharts Dashboard */}
              <div className="bg-[#08243F] p-1 rounded-xl border border-[#C9A227]/40 flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('platform')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    viewMode === 'platform'
                      ? 'bg-[#C9A227] text-[#08243F] shadow'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Módulos de Trabalho</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('dashboard_overview')}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    viewMode === 'dashboard_overview'
                      ? 'bg-[#C9A227] text-[#08243F] shadow'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Visão Geral do Painel (Recharts)</span>
                </button>
              </div>

              <button
                onClick={onNavigateHome}
                className="px-3 py-1.5 rounded-xl bg-[#0A2E52] hover:bg-[#14477E] text-xs font-semibold text-[#DCE4EE] border border-[#14477E] transition-colors cursor-pointer shrink-0"
              >
                Portail Public
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Platform Content Router based on Selected Role */}
      {selectedRoleType === 'citoyen' ? (
        <div className="bg-[#0E3A66] text-white border-b border-[#14477E] py-6 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] flex items-center justify-center font-extrabold shadow-lg shrink-0">
                <User className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D9B84A] bg-[#08243F] px-2.5 py-0.5 rounded">
                    {currentRoleDef.badge}
                  </span>
                  <span className="text-xs text-[#DCE4EE]/70 font-mono">
                    Session certifiée RDC
                  </span>
                </div>
                <h1 className="font-display font-extrabold text-2xl text-white mt-1">
                  {currentRoleDef.title}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateHome}
                className="px-4 py-2 rounded-xl bg-[#0A2E52] hover:bg-[#14477E] text-xs font-semibold text-[#DCE4EE] border border-[#14477E] transition-colors cursor-pointer"
              >
                Voir le Portail Public
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Main Content Area */}
      {selectedRoleType === 'citoyen' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
          <CitizenPlatform
            citizenData={citizenData}
            onNavigateHome={onNavigateHome}
            onLogout={onLogout}
          />
        </main>
      ) : viewMode === 'dashboard_overview' ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#08243F] text-[#D9B84A] font-mono text-xs font-bold uppercase">
                  {currentRoleDef.badge}
                </span>
                <span className="text-xs text-[#0A1B2A]/60 font-mono">
                  Vue Analytique Recharts
                </span>
              </div>
              <h2 className="font-display font-extrabold text-xl text-[#08243F] mt-1">
                {currentRoleDef.title} · Tableau de Bord Analytique
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setViewMode('platform')}
              className="px-4 py-2 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow"
            >
              <LayoutDashboard className="w-4 h-4 text-[#C9A227]" />
              <span>Ouvrir la Console des Módulos</span>
            </button>
          </div>

          <DashboardOverview
            roleType={selectedRoleType}
            title={`Visão Geral do Painel · ${currentRoleDef.title}`}
            subtitle={currentRoleDef.description}
            onNavigateToRecords={() => setViewMode('platform')}
          />
        </main>
      ) : (
        <AdminPlatform
          roleType={selectedRoleType}
          roleTitle={currentRoleDef.title}
          roleBadge={currentRoleDef.badge}
          currentLang={currentLang}
          onLanguageChange={onLanguageChange}
          onLogout={onLogout}
          onNavigateHome={onNavigateHome}
        />
      )}
    </div>
  );
};
