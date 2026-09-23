import React, { useState } from 'react';
import {
  Globe,
  Sliders,
  Layers,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Database,
  Building2,
  TrendingUp,
  Settings,
  Plus,
  Edit2,
  Check,
  X,
  ExternalLink,
  Lock,
  Download,
  Printer,
  ChevronRight,
} from 'lucide-react';

interface NationalRule {
  id: string;
  code: string;
  name: string;
  category: 'Éligibilité' | 'Biométrie' | 'Plafond Social' | 'Protection Données';
  description: string;
  status: 'Actif' | 'En Révision' | 'Suspendu';
  effectiveDate: string;
  enforcedProvinces: number;
}

interface SocialProgram {
  id: string;
  name: string;
  ministry: string;
  targetHouseholds: number;
  enrolledHouseholds: number;
  monthlyBudgetCDF: string;
  status: 'Actif' | 'Phase Pilote' | 'Programmé';
  eligibilityCutoffScore: number;
}

interface CriticalIntegration {
  id: string;
  name: string;
  institution: string;
  protocol: string;
  securityClearance: string;
  lastSync: string;
  status: 'Autorisé' | 'En Attente Décret' | 'Suspendu';
}

export const NationalManagerView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'regles' | 'programmes' | 'modeles' | 'parametres' | 'integrations' | 'indicateurs'>('regles');

  // National Rules State
  const [rules, setRules] = useState<NationalRule[]>([
    {
      id: 'RUL-01',
      code: 'RDC-CSU-2026-N1',
      name: 'Seuil National de Vulnérabilité PMT',
      category: 'Éligibilité',
      description: 'Attribution prioritaire des filets monétaires aux ménages ayant un score de vulnérabilité ≤ 3.20.',
      status: 'Actif',
      effectiveDate: '01/01/2026',
      enforcedProvinces: 26,
    },
    {
      id: 'RUL-02',
      code: 'RDC-CSU-2026-N2',
      name: 'Protocole Biométrique ICAO-9303 & Déduplication',
      category: 'Biométrie',
      description: 'Obligation de capture 10 doigts et photo faciale neutre avant délivrance du numéro définitif.',
      status: 'Actif',
      effectiveDate: '15/02/2026',
      enforcedProvinces: 26,
    },
    {
      id: 'RUL-03',
      code: 'RDC-CSU-2026-N3',
      name: 'Régularisation Dérogatoire Plan B (Sans Papiers)',
      category: 'Éligibilité',
      description: 'Autorise la certification sur témoignage sous serment de 2 membres de la communauté.',
      status: 'Actif',
      effectiveDate: '01/03/2026',
      enforcedProvinces: 26,
    },
    {
      id: 'RUL-04',
      code: 'RDC-CSU-2026-N4',
      name: 'Plafond Mensuel d’Allocation Directe',
      category: 'Plafond Social',
      description: 'Plafonnement des transferts monétaires à 120 000 CDF par ménage et par mois.',
      status: 'En Révision',
      effectiveDate: '01/04/2026',
      enforcedProvinces: 18,
    },
  ]);

  // Social Programs
  const [programs, setPrograms] = useState<SocialProgram[]>([
    {
      id: 'PRG-01',
      name: 'Filets Sociaux Monétaires d’Urgence',
      ministry: 'Affaires Sociales & Solidarité',
      targetHouseholds: 2500000,
      enrolledHouseholds: 1840200,
      monthlyBudgetCDF: '138 Mds CDF',
      status: 'Actif',
      eligibilityCutoffScore: 3.0,
    },
    {
      id: 'PRG-02',
      name: 'Gratuité de la Maternité & Nouveau-Né',
      ministry: 'Santé Publique, Hygiène & Prévention',
      targetHouseholds: 1200000,
      enrolledHouseholds: 980400,
      monthlyBudgetCDF: '45 Mds CDF',
      status: 'Actif',
      eligibilityCutoffScore: 4.5,
    },
    {
      id: 'PRG-03',
      name: 'Cantines Scolaires & Nutrition Infantile',
      ministry: 'Éducation Nationale (EPST)',
      targetHouseholds: 800000,
      enrolledHouseholds: 512000,
      monthlyBudgetCDF: '28 Mds CDF',
      status: 'Actif',
      eligibilityCutoffScore: 3.5,
    },
    {
      id: 'PRG-04',
      name: 'Soutien aux Agriculteurs Familiaux & Semences',
      ministry: 'Agriculture & Développement Rural',
      targetHouseholds: 600000,
      enrolledHouseholds: 210000,
      monthlyBudgetCDF: '19 Mds CDF',
      status: 'Phase Pilote',
      eligibilityCutoffScore: 2.8,
    },
  ]);

  // Critical Integrations
  const [integrations, setIntegrations] = useState<CriticalIntegration[]>([
    {
      id: 'INT-01',
      name: 'Fichier Général CENI (Commission Électorale)',
      institution: 'CENI RDC',
      protocol: 'mTLS REST v2 (Chiffrement HSM)',
      securityClearance: 'SECRET ÉTAT',
      lastSync: 'Il y a 6 min',
      status: 'Autorisé',
    },
    {
      id: 'INT-02',
      name: 'Banque Centrale du Congo (BCC) & Switch Mobile Money',
      institution: 'BCC & Télécoms (Orange, Vodacom, Airtel, Afrimoney)',
      protocol: 'ISO 20022 Direct Gateway',
      securityClearance: 'CONFIDENTIEL FINANCES',
      lastSync: 'En temps réel',
      status: 'Autorisé',
    },
    {
      id: 'INT-03',
      name: 'Registre Civil de l’État (Ministère de l’Intérieur)',
      institution: 'Direction Générale de l’Identité et État Civil',
      protocol: 'OASIS LegalXML / JSON-LD',
      securityClearance: 'SOUVERAINETÉ CIVILE',
      lastSync: 'Il y a 14 min',
      status: 'Autorisé',
    },
    {
      id: 'INT-04',
      name: 'Système National d’Information Sanitaire (SNIS)',
      institution: 'Ministère de la Santé Publique',
      protocol: 'FHIR HL7 / REST API',
      securityClearance: 'SANTÉ NATIONALE',
      lastSync: 'Il y a 32 min',
      status: 'En Attente Décret',
    },
  ]);

  // Global Parameters
  const [globalParams, setGlobalParams] = useState({
    nationalTargetHouseholds: '15 000 000',
    biometricRetentionYears: '99',
    maxOffineQueueHours: '72',
    allowPlanBWitnessExemptions: true,
    requireHSMSigningOnReceipt: true,
    autoPurgeRejectedDraftsDays: '30',
  });

  const [filterQuery, setFilterQuery] = useState('');
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleCategory, setNewRuleCategory] = useState<'Éligibilité' | 'Biométrie' | 'Plafond Social' | 'Protection Données'>('Éligibilité');
  const [newRuleDesc, setNewRuleDesc] = useState('');

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;
    const newR: NationalRule = {
      id: `RUL-${rules.length + 1 < 10 ? '0' : ''}${rules.length + 1}`,
      code: `RDC-CSU-2026-N${rules.length + 1}`,
      name: newRuleName,
      category: newRuleCategory,
      description: newRuleDesc || 'Règle nationale approuvée par la Direction Générale du CSU.',
      status: 'Actif',
      effectiveDate: '23/09/2026',
      enforcedProvinces: 26,
    };
    setRules([newR, ...rules]);
    setNewRuleName('');
    setNewRuleDesc('');
    setShowAddRuleModal(false);
  };

  const handleToggleRuleStatus = (id: string) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, status: r.status === 'Actif' ? 'Suspendu' : 'Actif' } : r)));
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations(
      integrations.map((i) =>
        i.id === id ? { ...i, status: i.status === 'Autorisé' ? 'Suspendu' : 'Autorisé' } : i
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#08243F] via-[#0E3A66] to-[#14477E] text-white border border-[#C9A227]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D9B84A] bg-[#0A1B2A] px-2.5 py-0.5 rounded border border-[#C9A227]/30">
              GOUVERNANCE NATIONALE DU CSU
            </span>
            <span className="text-xs text-[#DCE4EE]/70 font-mono">
              République Démocratique du Congo · 26 Provinces
            </span>
          </div>
          <h2 className="font-display font-black text-2xl text-white mt-1">
            Console du Gestionnaire National de la Plateforme
          </h2>
          <p className="text-xs text-[#DCE4EE]/80 max-w-3xl mt-1 leading-relaxed">
            Autorité suprême de régulation : définition des règles nationales, modélisation des données souveraines, gouvernance des programmes d'aide et validation des interconnexions d'État.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer Décret</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAddRuleModal(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] text-xs font-black shadow-lg flex items-center gap-1.5 hover:shadow-xl transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle Règle Nationale</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            POPULATION TOTALE ENRÔLÉE (26 PROVINCES)
          </span>
          <div className="font-display font-black text-2xl text-[#08243F]">
            14 842 910
          </div>
          <span className="text-xs text-[#1E8E5A] font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +18.4% ce trimestre
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            PROGRAMMES NATIONAUX EN VIGUEUR
          </span>
          <div className="font-display font-black text-2xl text-[#C9A227]">
            7 Filières Actives
          </div>
          <span className="text-xs text-[#0A1B2A]/70">
            226 Mds CDF mensuels autorisés
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            RÈGLES D'ÉLIGIBILITÉ SOUVERAINES
          </span>
          <div className="font-display font-black text-2xl text-[#0E3A66]">
            {rules.filter((r) => r.status === 'Actif').length} Actives
          </div>
          <span className="text-xs text-[#1E8E5A] font-semibold">
            Application stricte 100%
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            INTERCONNEXIONS CRITIQUES D'ÉTAT
          </span>
          <div className="font-display font-black text-2xl text-[#1E8E5A]">
            4 Passerelles HSM
          </div>
          <span className="text-xs text-[#0A1B2A]/70">
            CENI · BCC · État Civil · Santé
          </span>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-[#DCE4EE] overflow-x-auto gap-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('regles')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'regles'
              ? 'border-[#C9A227] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Règles Nationales ({rules.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('programmes')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'programmes'
              ? 'border-[#C9A227] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Gestion des Programmes Sociaux ({programs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('integrations')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'integrations'
              ? 'border-[#C9A227] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Interconnexions Critiques ({integrations.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('modeles')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'modeles'
              ? 'border-[#C9A227] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Modèles de Données & Schémas</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('parametres')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'parametres'
              ? 'border-[#C9A227] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Paramètres Globaux</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('indicateurs')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'indicateurs'
              ? 'border-[#C9A227] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Indicateurs Macro-Sociaux</span>
        </button>
      </div>

      {/* TAB 1: RÈGLES NATIONALES */}
      {activeTab === 'regles' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Registre des Règles & Directives d'Attribution Nationales
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Ces règles s'imposent à l'ensemble des centres d'enrôlement et des guichets dans les 26 provinces.
              </p>
            </div>
            <input
              type="text"
              placeholder="Filtrer les règles..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="p-2 rounded-xl border border-[#DCE4EE] text-xs bg-[#F6F8FB] w-full sm:w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F6F8FB] text-[#08243F] uppercase font-mono font-bold border-y border-[#DCE4EE]">
                <tr>
                  <th className="py-3 px-4">Code Règle</th>
                  <th className="py-3 px-4">Intitulé de la Directive</th>
                  <th className="py-3 px-4">Catégorie</th>
                  <th className="py-3 px-4">Application</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEFF5]">
                {rules
                  .filter((r) => r.name.toLowerCase().includes(filterQuery.toLowerCase()) || r.code.toLowerCase().includes(filterQuery.toLowerCase()))
                  .map((rule) => (
                    <tr key={rule.id} className="hover:bg-[#F6F8FB]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#0E3A66]">{rule.code}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#08243F]">{rule.name}</div>
                        <div className="text-[11px] text-[#0A1B2A]/70 max-w-md line-clamp-1">{rule.description}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-gray-100 font-mono font-semibold text-[10px] text-gray-700">
                          {rule.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-xs">
                        {rule.enforcedProvinces} / 26 provinces
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            rule.status === 'Actif'
                              ? 'bg-[#1E8E5A]/10 text-[#1E8E5A]'
                              : rule.status === 'En Révision'
                              ? 'bg-[#C77D0A]/10 text-[#C77D0A]'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {rule.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleRuleStatus(rule.id)}
                          className="px-2.5 py-1 rounded-lg border border-[#DCE4EE] hover:bg-gray-100 text-[11px] font-semibold text-[#08243F] cursor-pointer"
                        >
                          {rule.status === 'Actif' ? 'Suspendre' : 'Activer'}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PROGRAMMES SOCIAUX */}
      {activeTab === 'programmes' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Gestion des 7 Programmes Sociaux de la République
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Chaque citoyen éligible est orienté automatiquement selon sa cotation PMT et sa situation familiale.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Formulaire d’ouverture d’un nouveau programme ministériel initialisé.')}
              className="px-3.5 py-2 rounded-xl bg-[#08243F] text-white text-xs font-bold hover:bg-[#0E3A66] transition-colors cursor-pointer"
            >
              Créer un Programme Ministériel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {programs.map((prog) => (
              <div key={prog.id} className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#0E3A66] font-bold block">{prog.ministry}</span>
                    <h4 className="font-display font-bold text-sm text-[#08243F]">{prog.name}</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                    {prog.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#0A1B2A]/60">Ménages inscrits / Cibles :</span>
                    <span className="font-mono font-bold text-[#08243F]">
                      {prog.enrolledHouseholds.toLocaleString()} / {prog.targetHouseholds.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-[#C9A227] rounded-full"
                      style={{ width: `${Math.round((prog.enrolledHouseholds / prog.targetHouseholds) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[#0A1B2A]/60">Enveloppe mensuelle autorisée :</span>
                    <span className="font-mono font-extrabold text-[#0E3A66]">{prog.monthlyBudgetCDF}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#0A1B2A]/60">Seuil de coupure PMT :</span>
                    <span className="font-mono font-bold text-[#1E8E5A]">Score ≤ {prog.eligibilityCutoffScore}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-[#DCE4EE]">
                  <button
                    type="button"
                    onClick={() => alert(`Ajustement des critères pour ${prog.name}`)}
                    className="px-3 py-1 rounded-lg bg-white border border-[#DCE4EE] text-xs font-semibold text-[#08243F] hover:bg-gray-50"
                  >
                    Ajuster Seuils
                  </button>
                  <button
                    type="button"
                    onClick={() => alert(`Enveloppe budgétaire validée auprès de la Banque Centrale du Congo.`)}
                    className="px-3 py-1 rounded-lg bg-[#08243F] text-white text-xs font-semibold hover:bg-[#0E3A66]"
                  >
                    Arbitrage Financier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INTERCONNEXIONS CRITIQUES */}
      {activeTab === 'integrations' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Autorisation des Passerelles Critiques Interministérielles
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Seul le Gestionnaire National peut activer ou suspendre les échanges automatisés avec d'autres institutions de la RDC.
            </p>
          </div>

          <div className="space-y-3">
            {integrations.map((integ) => (
              <div
                key={integ.id}
                className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm text-[#08243F]">{integ.name}</span>
                    <span className="px-2 py-0.5 rounded bg-[#08243F] text-[#D9B84A] font-mono text-[9px] font-bold">
                      {integ.securityClearance}
                    </span>
                  </div>
                  <div className="text-[#0A1B2A]/70">
                    Institution : <strong>{integ.institution}</strong> · Protocole : <span className="font-mono">{integ.protocol}</span>
                  </div>
                  <div className="text-[10px] text-[#0A1B2A]/50 font-mono">
                    Dernière synchronisation : {integ.lastSync}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      integ.status === 'Autorisé'
                        ? 'bg-[#1E8E5A]/10 text-[#1E8E5A]'
                        : integ.status === 'En Attente Décret'
                        ? 'bg-[#C77D0A]/10 text-[#C77D0A]'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {integ.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleToggleIntegration(integ.id)}
                    className="px-3 py-1.5 rounded-xl border border-[#DCE4EE] bg-white hover:bg-gray-100 font-bold text-xs text-[#08243F] cursor-pointer"
                  >
                    {integ.status === 'Autorisé' ? 'Révoquer l’Accès' : 'Autoriser le Flux'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MODÈLES DE DONNÉES */}
      {activeTab === 'modeles' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Approbation des Modèles & Schémas de Données Souverains
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Structures canoniques utilisées pour l'interopérabilité (Norme RDC-CSU-SCHEMA v2.4 JSON-LD / XML).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#08243F] text-white space-y-3 font-mono">
              <div className="flex justify-between items-center text-[#D9B84A]">
                <span className="font-bold text-sm">Modèle : Foyer & Identification</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded">v2.4-STABLE</span>
              </div>
              <pre className="text-[11px] text-[#DCE4EE] overflow-x-auto p-3 bg-black/40 rounded-xl leading-relaxed">
{`{
  "@context": "https://csu.gouv.cd/schemas/v2",
  "idNational": "CSU-AAAA-XXXX-YYYY",
  "biometrie": {
    "icaoFacialHash": "SHA256:4a8f9...",
    "wsqFingerprints": 10,
    "qualityScore": 98.4
  },
  "foyer": {
    "taille": 6,
    "vulnerabiliteScorePMT": 2.85,
    "eligibleFiletsSociaux": true
  }
}`}
              </pre>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => alert('Schéma vérifié conforme aux exigences de l’Agence Nationale de l’Ingénierie Numérique.')}
                  className="px-3 py-1 rounded-lg bg-[#C9A227] text-[#08243F] font-bold text-xs"
                >
                  Valider Schéma
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#08243F] text-white space-y-3 font-mono">
              <div className="flex justify-between items-center text-[#D9B84A]">
                <span className="font-bold text-sm">Modèle : Virement Mobile Money</span>
                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded">ISO-20022-RDC</span>
              </div>
              <pre className="text-[11px] text-[#DCE4EE] overflow-x-auto p-3 bg-black/40 rounded-xl leading-relaxed">
{`{
  "transactionId": "TX-CSU-2026-99014",
  "montantCDF": 75000,
  "beneficiaireMSISDN": "+243818001122",
  "operateur": "AIRTEL_MONEY",
  "signatureHSM": "RSA-4096:b8c91...",
  "horodatageKinshasa": "2026-09-23T11:00:00Z"
}`}
              </pre>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => alert('Schéma bancaire certifié par la Banque Centrale du Congo.')}
                  className="px-3 py-1 rounded-lg bg-[#C9A227] text-[#08243F] font-bold text-xs"
                >
                  Valider Schéma
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PARAMÈTRES GLOBAUX */}
      {activeTab === 'parametres' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-5">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Paramétrage Global de la Souveraineté du Registre
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Ces variables gouvernent l'ensemble des modules opérationnels, délais de validité et protocoles de chiffrement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <label className="font-bold text-[#08243F] block">Cible Nationale d'Enrôlement (Ménages)</label>
              <input
                type="text"
                value={globalParams.nationalTargetHouseholds}
                onChange={(e) => setGlobalParams({ ...globalParams, nationalTargetHouseholds: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-white font-mono font-bold text-[#08243F]"
              />
              <span className="text-[10px] text-[#0A1B2A]/60">Objectif fixé par le Programme Présidentiel de Couverture Sociale</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <label className="font-bold text-[#08243F] block">Délai Max d'Attente File Hors-Ligne (Heures)</label>
              <input
                type="text"
                value={globalParams.maxOffineQueueHours}
                onChange={(e) => setGlobalParams({ ...globalParams, maxOffineQueueHours: e.target.value })}
                className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-white font-mono font-bold text-[#08243F]"
              />
              <span className="text-[10px] text-[#0A1B2A]/60">Au-delà de cette durée, le kit mobile doit se reconnecter</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#08243F] block">Validation Dérogatoire Plan B (Témoins)</span>
                <span className="text-[10px] text-[#0A1B2A]/60">Autoriser l'enrôlement des sans-papiers avec serment communautaire</span>
              </div>
              <input
                type="checkbox"
                checked={globalParams.allowPlanBWitnessExemptions}
                onChange={(e) => setGlobalParams({ ...globalParams, allowPlanBWitnessExemptions: e.target.checked })}
                className="w-5 h-5 accent-[#08243F] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] flex items-center justify-between">
              <div>
                <span className="font-bold text-[#08243F] block">Signature Cryptographique HSM Obligatoire</span>
                <span className="text-[10px] text-[#0A1B2A]/60">Imposer un scellement électronique d'État sur chaque récépissé imprimé</span>
              </div>
              <input
                type="checkbox"
                checked={globalParams.requireHSMSigningOnReceipt}
                onChange={(e) => setGlobalParams({ ...globalParams, requireHSMSigningOnReceipt: e.target.checked })}
                className="w-5 h-5 accent-[#08243F] cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="button"
              onClick={() => alert('Paramètres globaux sauvegardés et synchronisés sur les serveurs d’État de Kinshasa.')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-black text-xs shadow-lg cursor-pointer"
            >
              Enregistrer les Paramètres Nationaux
            </button>
          </div>
        </div>
      )}

      {/* TAB 6: INDICATEURS MACRO-SOCIAUX */}
      {activeTab === 'indicateurs' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-6">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Tableau de Bord Macro-Économique & Social
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Mesure de l'impact des déboursements sur la réduction de l'extrême pauvreté en République Démocratique du Congo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3">
              <span className="font-bold text-[#08243F] text-xs block">Répartition par Zone Géographique</span>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Grand Kinshasa (4 Districts)</span>
                    <span className="font-bold">42% (6.2M)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-[#0E3A66]" style={{ width: '42%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Espace Grand Kasaï</span>
                    <span className="font-bold">24% (3.5M)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-[#C9A227]" style={{ width: '24%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Provinces de l'Est & Grands Lacs</span>
                    <span className="font-bold">20% (3.0M)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-[#1E8E5A]" style={{ width: '20%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>Équateur & Bassin Fluvial</span>
                    <span className="font-bold">14% (2.1M)</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div className="h-full bg-purple-600" style={{ width: '14%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3">
              <span className="font-bold text-[#08243F] text-xs block">Impact sur la Santé & Maternité</span>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#DCE4EE]">
                  <span className="text-[10px] text-gray-500 block uppercase">Femmes enceintes couvertes à 100%</span>
                  <span className="font-display font-extrabold text-lg text-[#1E8E5A]">980 400 Mères</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#DCE4EE]">
                  <span className="text-[10px] text-gray-500 block uppercase">Nouveau-nés enregistrés dès la maternité</span>
                  <span className="font-display font-extrabold text-lg text-[#08243F]">412 000 Enfants</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3">
              <span className="font-bold text-[#08243F] text-xs block">Efficacité Budgétaire & Anti-Fraude</span>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-[#DCE4EE]">
                  <span className="text-[10px] text-gray-500 block uppercase">Fonds Préservés par Déduplication</span>
                  <span className="font-display font-extrabold text-lg text-[#C9A227]">12.4 Mds CDF</span>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#DCE4EE]">
                  <span className="text-[10px] text-gray-500 block uppercase">Taux d'Absorption des Crédits d'Aide</span>
                  <span className="font-display font-extrabold text-lg text-[#0E3A66]">96.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New National Rule */}
      {showAddRuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-[#C9A227] p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
              <h3 className="font-display font-extrabold text-base text-[#08243F]">
                Créer une Nouvelle Règle Nationale
              </h3>
              <button
                type="button"
                onClick={() => setShowAddRuleModal(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="space-y-3">
              <div>
                <label className="font-bold text-[#08243F] block mb-1">Intitulé de la Directive</label>
                <input
                  type="text"
                  required
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  placeholder="Ex : Exemption des frais d'enrôlement pour les orphelins"
                  className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB]"
                />
              </div>

              <div>
                <label className="font-bold text-[#08243F] block mb-1">Catégorie Juridique</label>
                <select
                  value={newRuleCategory}
                  onChange={(e) => setNewRuleCategory(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB]"
                >
                  <option value="Éligibilité">Éligibilité & Score PMT</option>
                  <option value="Biométrie">Biométrie & Déduplication</option>
                  <option value="Plafond Social">Plafond Social & Déboursement</option>
                  <option value="Protection Données">Protection des Données & Vie Privée</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#08243F] block mb-1">Description & Motivation</label>
                <textarea
                  rows={3}
                  value={newRuleDesc}
                  onChange={(e) => setNewRuleDesc(e.target.value)}
                  placeholder="Cadre réglementaire et directives d'application..."
                  className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEFF5]">
                <button
                  type="button"
                  onClick={() => setShowAddRuleModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#08243F] text-[#D9B84A] font-bold"
                >
                  Promulguer la Règle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
