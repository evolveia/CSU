import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Sliders,
  Users,
  DollarSign,
  TrendingUp,
  Filter,
  Search,
  CheckCircle2,
  Calendar,
  Building,
  Printer,
  Download,
  AlertCircle,
  FileCheck2,
  Check,
  X,
  Sparkles,
} from 'lucide-react';

interface ProgramDetail {
  id: string;
  name: string;
  targetGroup: string;
  ministry: string;
  allocatedBudgetCDF: string;
  disbursedBudgetCDF: string;
  monthlyPerHouseholdCDF: number;
  totalEligible: number;
  totalBeneficiariesPaid: number;
  eligibilityScoreMax: number;
  geographicScope: string;
  status: 'Actif' | 'En Révision' | 'Phase Pilote';
}

interface EligibleCitizenItem {
  id: string;
  csuNumber: string;
  name: string;
  commune: string;
  province: string;
  pmtScore: number;
  householdSize: number;
  matchedProgram: string;
  grantStatus: 'Concession Accordée' | 'En attente déboursement' | 'En cours de vérification';
  monthlyAmountCDF: number;
}

export const SocialProgramsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'programmes' | 'eligibilite' | 'listes' | 'paiements' | 'impact'>('programmes');

  // Programs
  const [programs, setPrograms] = useState<ProgramDetail[]>([
    {
      id: 'PRG-FIL-01',
      name: 'Filets Sociaux Monétaires d’Urgence',
      targetGroup: 'Ménages sous le seuil d’extrême pauvreté',
      ministry: 'Affaires Sociales & Actions Humanitaires',
      allocatedBudgetCDF: '180 Mds CDF',
      disbursedBudgetCDF: '142 Mds CDF',
      monthlyPerHouseholdCDF: 75000,
      totalEligible: 2100000,
      totalBeneficiariesPaid: 1840200,
      eligibilityScoreMax: 3.0,
      geographicScope: '26 Provinces (National)',
      status: 'Actif',
    },
    {
      id: 'PRG-SAN-02',
      name: 'Gratuité de la Maternité & Soins Néonataux',
      targetGroup: 'Femmes enceintes et nourrissons (0-6 mois)',
      ministry: 'Santé Publique, Hygiène & Prévention',
      allocatedBudgetCDF: '60 Mds CDF',
      disbursedBudgetCDF: '48 Mds CDF',
      monthlyPerHouseholdCDF: 45000,
      totalEligible: 1200000,
      totalBeneficiariesPaid: 980400,
      eligibilityScoreMax: 4.5,
      geographicScope: 'Kinshasa, Kasaï, Nord-Kivu, Équateur',
      status: 'Actif',
    },
    {
      id: 'PRG-EDU-03',
      name: 'Cantines Scolaires & Nutrition de Base',
      targetGroup: 'Élèves des écoles primaires publiques rurales',
      ministry: 'Éducation Nationale (EPST)',
      allocatedBudgetCDF: '35 Mds CDF',
      disbursedBudgetCDF: '27 Mds CDF',
      monthlyPerHouseholdCDF: 30000,
      totalEligible: 800000,
      totalBeneficiariesPaid: 512000,
      eligibilityScoreMax: 3.5,
      geographicScope: 'Territoires Reculés',
      status: 'Actif',
    },
    {
      id: 'PRG-AGR-04',
      name: 'Subventions aux Petits Producteurs Agricoles',
      targetGroup: 'Coopératives paysannes & maraîchers périurbains',
      ministry: 'Agriculture & Développement Rural',
      allocatedBudgetCDF: '25 Mds CDF',
      disbursedBudgetCDF: '12 Mds CDF',
      monthlyPerHouseholdCDF: 100000,
      totalEligible: 600000,
      totalBeneficiariesPaid: 210000,
      eligibilityScoreMax: 2.8,
      geographicScope: 'Kongo Central & Grand Katanga',
      status: 'Phase Pilote',
    },
  ]);

  // Eligible List
  const [eligibleList, setEligibleList] = useState<EligibleCitizenItem[]>([
    {
      id: 'ELG-01',
      csuNumber: 'CSU-2026-9912-1044',
      name: 'Kasongo Ilunga Dieudonné',
      commune: 'Masina',
      province: 'Kinshasa',
      pmtScore: 2.1,
      householdSize: 6,
      matchedProgram: 'Filets Sociaux Monétaires d’Urgence',
      grantStatus: 'Concession Accordée',
      monthlyAmountCDF: 75000,
    },
    {
      id: 'ELG-02',
      csuNumber: 'CSU-2026-8841-3910',
      name: 'Mbuyi Kalonji Chantal',
      commune: 'Mbuji-Mayi',
      province: 'Kasaï-Oriental',
      pmtScore: 2.8,
      householdSize: 4,
      matchedProgram: 'Gratuité de la Maternité & Soins Néonataux',
      grantStatus: 'Concession Accordée',
      monthlyAmountCDF: 45000,
    },
    {
      id: 'ELG-03',
      csuNumber: 'CSU-2026-7731-8902',
      name: 'Balume Safari Emmanuel',
      commune: 'Goma',
      province: 'Nord-Kivu',
      pmtScore: 1.8,
      householdSize: 7,
      matchedProgram: 'Filets Sociaux Monétaires d’Urgence',
      grantStatus: 'En attente déboursement',
      monthlyAmountCDF: 75000,
    },
    {
      id: 'ELG-04',
      csuNumber: 'CSU-2026-5541-2091',
      name: 'Boketshu Yoka Clément',
      commune: 'Mbandaka',
      province: 'Équateur',
      pmtScore: 2.5,
      householdSize: 5,
      matchedProgram: 'Cantines Scolaires & Nutrition de Base',
      grantStatus: 'En cours de vérification',
      monthlyAmountCDF: 30000,
    },
  ]);

  const [searchFilter, setSearchFilter] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProgName, setNewProgName] = useState('');
  const [newProgMinistry, setNewProgMinistry] = useState('');
  const [newProgScore, setNewProgScore] = useState(3.0);
  const [newProgAmount, setNewProgAmount] = useState(75000);

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProgName.trim()) return;
    const newProg: ProgramDetail = {
      id: `PRG-NEW-0${programs.length + 1}`,
      name: newProgName,
      targetGroup: 'Population prioritaire ciblée par décret',
      ministry: newProgMinistry || 'Ministère des Affaires Sociales',
      allocatedBudgetCDF: '20 Mds CDF',
      disbursedBudgetCDF: '0 CDF',
      monthlyPerHouseholdCDF: newProgAmount,
      totalEligible: 150000,
      totalBeneficiariesPaid: 0,
      eligibilityScoreMax: newProgScore,
      geographicScope: 'Pilote National',
      status: 'Phase Pilote',
    };
    setPrograms([...programs, newProg]);
    setShowCreateModal(false);
    setNewProgName('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0E3A66] via-[#14477E] to-[#08243F] text-white border border-[#C9A227]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D9B84A] bg-[#0A1B2A] px-2.5 py-0.5 rounded border border-[#C9A227]/30">
              PILOTAGE DES PROGRAMMES SOCIAUX
            </span>
            <span className="text-xs text-[#DCE4EE]/70 font-mono">Modélisation PMT · République Démocratique du Congo</span>
          </div>
          <h2 className="font-display font-black text-2xl text-white mt-1">
            Console du Gestionnaire des Programmes Sociaux
          </h2>
          <p className="text-xs text-[#DCE4EE]/80 max-w-3xl mt-1 leading-relaxed">
            Création et calibrage des programmes nationaux, paramétrage des seuils de vulnérabilité, consultation des listes d'éligibles, suivi des décaissements et analyse d'impact.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] text-xs font-black shadow-lg flex items-center gap-1.5 hover:shadow-xl transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Créer un Programme Social</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            TOTAL DES MÉNAGES ÉLIGIBLES
          </span>
          <div className="font-display font-black text-2xl text-[#08243F]">
            4 700 000
          </div>
          <span className="text-xs text-[#1E8E5A] font-semibold">Score PMT ≤ 3.5 validé</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            ALLOCATION MENSUELLE GLOBALE
          </span>
          <div className="font-display font-black text-2xl text-[#C9A227]">
            229 Mds CDF
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Budget voté en loi de finances</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            TAUX DE CONCESSION DÉCAISSÉ
          </span>
          <div className="font-display font-black text-2xl text-[#1E8E5A]">
            87.4%
          </div>
          <span className="text-xs text-[#1E8E5A] font-semibold">Par rapport aux cibles</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            FILIÈRES CONNECTÉES AU CSU
          </span>
          <div className="font-display font-black text-2xl text-[#0E3A66]">
            {programs.length} Programmes
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Social, Santé, Éducation, Agri</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DCE4EE] overflow-x-auto gap-2 text-xs font-semibold">
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
          <span>Filières Actives ({programs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('eligibilite')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'eligibilite'
              ? 'border-[#C9A227] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Règles & Seuils d'Éligibilité</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('listes')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'listes'
              ? 'border-[#C9A227] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Listes des Éligibles & Concessions ({eligibleList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('impact')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'impact'
              ? 'border-[#C9A227] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Analyse de l'Impact Social</span>
        </button>
      </div>

      {/* TAB 1: PROGRAMMES */}
      {activeTab === 'programmes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programs.map((prog) => (
            <div key={prog.id} className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#0E3A66] font-bold block">{prog.ministry}</span>
                  <h4 className="font-display font-bold text-base text-[#08243F]">{prog.name}</h4>
                  <span className="text-[11px] text-[#0A1B2A]/70">{prog.targetGroup}</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                  {prog.status}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#0A1B2A]/60">Bénéficiaires payés :</span>
                  <span className="font-mono font-bold text-[#08243F]">
                    {prog.totalBeneficiariesPaid.toLocaleString()} / {prog.totalEligible.toLocaleString()} ménages
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full bg-[#1E8E5A] rounded-full"
                    style={{ width: `${Math.round((prog.totalBeneficiariesPaid / prog.totalEligible) * 100)}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                    <span className="text-gray-500 block">Montant / ménage</span>
                    <strong className="text-[#C9A227]">{prog.monthlyPerHouseholdCDF.toLocaleString()} CDF/mois</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                    <span className="text-gray-500 block">Seuil PMT Max</span>
                    <strong className="text-[#08243F]">Score ≤ {prog.eligibilityScoreMax}</strong>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#DCE4EE]">
                <button
                  type="button"
                  onClick={() => alert(`Ajustement du barème pour ${prog.name}`)}
                  className="px-3 py-1.5 rounded-xl border border-[#DCE4EE] text-xs font-semibold text-[#08243F] hover:bg-gray-50 cursor-pointer"
                >
                  Modifier Barème
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Liste de distribution générée pour ${prog.name}`)}
                  className="px-3 py-1.5 rounded-xl bg-[#08243F] text-white text-xs font-semibold hover:bg-[#0E3A66] cursor-pointer"
                >
                  Exporter Liste des Récipiendaires
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: RÈGLES D'ÉLIGIBILITÉ */}
      {activeTab === 'eligibilite' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4 text-xs">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Modèle d'Évaluation de la Vulnérabilité (PMT - Proxy Means Test)
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              L'algorithme pondère automatiquement 14 variables du ménage (habitat, eau potable, électricité, nombre d'enfants, monoparentalité, etc.).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <span className="font-bold text-[#08243F] block">Score ≤ 2.0 (Déciles 1-2)</span>
              <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px]">
                Extrême Pauvreté Prioritaire
              </span>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Éligibilité automatique à 100% des filières : filets monétaires d'urgence, cantines gratuites et gratuité complète des soins de santé.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <span className="font-bold text-[#08243F] block">Score 2.1 à 3.5 (Déciles 3-4)</span>
              <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 font-bold text-[10px]">
                Vulnérabilité Économique
              </span>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Éligibilité aux transferts monétaires ciblés, santé maternelle et subventions d'intrants agricoles.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <span className="font-bold text-[#08243F] block">Score &gt; 3.5 (Déciles 5-10)</span>
              <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-bold text-[10px]">
                Non-Éligible aux Transferts Directs
              </span>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Accès au tarif social d'assurance maladie conventionnée sans allocation monétaire directe.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LISTES DES ÉLIGIBLES */}
      {activeTab === 'listes' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Listes Dynamiques des Citoyens Éligibles par Programme
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Calcul en temps réel basé sur les données certifiées du Registre Social National.
              </p>
            </div>
            <input
              type="text"
              placeholder="Filtrer par nom ou numéro CSU..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="p-2 rounded-xl border border-[#DCE4EE] text-xs bg-[#F6F8FB] w-full sm:w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F6F8FB] text-[#08243F] uppercase font-mono font-bold border-y border-[#DCE4EE]">
                <tr>
                  <th className="py-3 px-4">Identifiant CSU</th>
                  <th className="py-3 px-4">Titulaire</th>
                  <th className="py-3 px-4">Zone</th>
                  <th className="py-3 px-4">Score PMT</th>
                  <th className="py-3 px-4">Programme Assigné</th>
                  <th className="py-3 px-4">Allocation</th>
                  <th className="py-3 px-4 text-right">Statut Concession</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEFF5]">
                {eligibleList
                  .filter((item) => item.name.toLowerCase().includes(searchFilter.toLowerCase()) || item.csuNumber.toLowerCase().includes(searchFilter.toLowerCase()))
                  .map((el) => (
                    <tr key={el.id} className="hover:bg-[#F6F8FB]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#0E3A66]">{el.csuNumber}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#08243F]">{el.name}</div>
                        <div className="text-[10px] text-gray-500">Ménage de {el.householdSize} pers.</div>
                      </td>
                      <td className="py-3 px-4">{el.commune} ({el.province})</td>
                      <td className="py-3 px-4 font-mono font-bold text-[#1E8E5A]">Score : {el.pmtScore}</td>
                      <td className="py-3 px-4 font-semibold text-[#08243F]">{el.matchedProgram}</td>
                      <td className="py-3 px-4 font-mono font-bold text-[#C9A227]">{el.monthlyAmountCDF.toLocaleString()} CDF</td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2 py-0.5 rounded-full bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                          {el.grantStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: IMPACT */}
      {activeTab === 'impact' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Évaluation d'Impact Social sur le Niveau de Vie des Ménages
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Mesures d'impact menées en collaboration avec l'Institut National de la Statistique (INS).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <span className="text-[10px] font-mono uppercase text-gray-500 block">Scolarisation des Enfants</span>
              <div className="font-display font-black text-2xl text-[#1E8E5A]">+24.2%</div>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Augmentation de la fréquentation scolaire dans les zones couvertes par les cantines et transferts monétaires.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <span className="text-[10px] font-mono uppercase text-gray-500 block">Santé Maternelle</span>
              <div className="font-display font-black text-2xl text-[#0E3A66]">-38.5%</div>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Baisse de la mortalité néonatale dans les maternités conventionnées grâce à la gratuité intégrale des accouchements.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <span className="text-[10px] font-mono uppercase text-gray-500 block">Inclusion Financière Mobile Money</span>
              <div className="font-display font-black text-2xl text-[#C9A227]">1.8M Comptes</div>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Nouveaux portefeuilles électroniques ouverts en milieu rural pour la perception des allocations sociales directes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Program */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-[#C9A227] p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
              <h3 className="font-display font-extrabold text-base text-[#08243F]">
                Créer un Nouveau Programme Social National
              </h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProgram} className="space-y-3">
              <div>
                <label className="font-bold text-[#08243F] block mb-1">Intitulé du Programme</label>
                <input
                  type="text"
                  required
                  value={newProgName}
                  onChange={(e) => setNewProgName(e.target.value)}
                  placeholder="Ex : Soutien aux Personnes Âgées et Isolées"
                  className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB]"
                />
              </div>

              <div>
                <label className="font-bold text-[#08243F] block mb-1">Ministère de Tutelle</label>
                <input
                  type="text"
                  required
                  value={newProgMinistry}
                  onChange={(e) => setNewProgMinistry(e.target.value)}
                  placeholder="Ex : Ministère des Affaires Sociales"
                  className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#08243F] block mb-1">Seuil PMT Maximum</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newProgScore}
                    onChange={(e) => setNewProgScore(parseFloat(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB]"
                  />
                </div>
                <div>
                  <label className="font-bold text-[#08243F] block mb-1">Montant Mensuel (CDF)</label>
                  <input
                    type="number"
                    value={newProgAmount}
                    onChange={(e) => setNewProgAmount(parseInt(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEFF5]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#08243F] text-[#D9B84A] font-bold"
                >
                  Enregistrer le Programme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
