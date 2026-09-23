import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  FileText,
  AlertTriangle,
  Lock,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  FileSpreadsheet,
  Download,
  AlertOctagon,
  FileQuestion,
  UserX,
  Search,
  Check,
  X,
} from 'lucide-react';

interface CitizenPrivacyRequest {
  id: string;
  trackingNumber: string;
  citizenName: string;
  csuNumber: string;
  requestType: 'Accès aux données' | 'Rectification' | 'Opposition / Effacement' | 'Portabilité';
  submissionDate: string;
  deadlineDate: string;
  status: 'En attente d’analyse' | 'Validé & Exécuté' | 'Refus Motivé' | 'Enquête Complémentaire';
  legalNotes: string;
}

interface AccessAuditEntry {
  id: string;
  timestamp: string;
  operatorId: string;
  operatorRole: string;
  citizenTargetCSU: string;
  action: 'Lecture Fiche' | 'Modification Mobile Money' | 'Exportation CSV' | 'Régularisation Plan B';
  ipAddress: string;
  complianceVerdict: 'Conforme' | 'Suspect (Audit requis)' | 'Flagrant Délit';
}

interface ImpactAssessment {
  id: string;
  title: string;
  ministry: string;
  riskLevel: 'Faible' | 'Modéré' | 'Élevé';
  status: 'Avis Favorable' | 'Sous Réserve' | 'Rejeté';
  lastReviewDate: string;
  mitigationMeasures: string;
}

export const DpoPrivacyView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'conformite' | 'demandes' | 'audit_acces' | 'impact' | 'suspension'>('conformite');

  // Citizen Requests
  const [requests, setRequests] = useState<CitizenPrivacyRequest[]>([
    {
      id: 'REQ-01',
      trackingNumber: 'DPO-RDC-2026-081',
      citizenName: 'Mbuyi Kalonji Chantal',
      csuNumber: 'CSU-2026-8841-3910',
      requestType: 'Rectification',
      submissionDate: '21/09/2026',
      deadlineDate: '21/10/2026',
      status: 'Validé & Exécuté',
      legalNotes: 'Correction orthographique du prénom sur présentation du certificat de naissance d’État.',
    },
    {
      id: 'REQ-02',
      trackingNumber: 'DPO-RDC-2026-082',
      citizenName: 'Balume Safari Emmanuel',
      csuNumber: 'CSU-2026-7731-8902',
      requestType: 'Accès aux données',
      submissionDate: '22/09/2026',
      deadlineDate: '22/10/2026',
      status: 'En attente d’analyse',
      legalNotes: 'Demande la copie intégrale des logs de consultation de son dossier par les agents territoriaux.',
    },
    {
      id: 'REQ-03',
      trackingNumber: 'DPO-RDC-2026-083',
      citizenName: 'Kalonji Ilunga Dieudonné',
      csuNumber: 'CSU-2026-9912-1044',
      requestType: 'Opposition / Effacement',
      submissionDate: '23/09/2026',
      deadlineDate: '23/10/2026',
      status: 'En attente d’analyse',
      legalNotes: 'Demande de retrait du programme de cantines scolaires après déménagement.',
    },
  ]);

  // Access Logs
  const [accessLogs, setAccessLogs] = useState<AccessAuditEntry[]>([
    {
      id: 'LOG-ACC-101',
      timestamp: 'Aujourd’hui 11:24',
      operatorId: 'AGT-01 (Kanku M.)',
      operatorRole: 'Agente N1 Guichet',
      citizenTargetCSU: 'CSU-2026-9912-1044',
      action: 'Lecture Fiche',
      ipAddress: '10.243.10.15 (Guichet Kalamu)',
      complianceVerdict: 'Conforme',
    },
    {
      id: 'LOG-ACC-102',
      timestamp: 'Aujourd’hui 10:50',
      operatorId: 'AGT-02 (Mwamba P.)',
      operatorRole: 'Agente N2 Plan B',
      citizenTargetCSU: 'CSU-2026-8841-3910',
      action: 'Régularisation Plan B',
      ipAddress: '10.243.10.16 (Guichet Kalamu)',
      complianceVerdict: 'Conforme',
    },
    {
      id: 'LOG-ACC-103',
      timestamp: 'Hier 23:42',
      operatorId: 'EXT-MIN-SANTE-04',
      operatorRole: 'Compte Externe Partenaire',
      citizenTargetCSU: 'CSU-2026-3391-7714',
      action: 'Lecture Fiche',
      ipAddress: '197.234.8.91 (Hors Réseau VPN)',
      complianceVerdict: 'Suspect (Audit requis)',
    },
  ]);

  // Impact Assessments (DPIA / RIPD)
  const [impactReports, setImpactReports] = useState<ImpactAssessment[]>([
    {
      id: 'RIPD-2026-01',
      title: 'Déploiement des Caméras Biométriques sur Kits Mobiles Fluviaux',
      ministry: 'Ministère des Affaires Sociales',
      riskLevel: 'Modéré',
      status: 'Avis Favorable',
      lastReviewDate: '15/08/2026',
      mitigationMeasures: 'Chiffrement TPM 2.0 sur clé USB et destruction du tampon d’image brute après hachage ICAO.',
    },
    {
      id: 'RIPD-2026-02',
      title: 'Interconnexion Directe avec le Switch Mobile Money Télécom',
      ministry: 'Banque Centrale & Télécoms',
      riskLevel: 'Élevé',
      status: 'Sous Réserve',
      lastReviewDate: '01/09/2026',
      mitigationMeasures: 'Obligation de pseudonymisation des numéros CSU transmises aux opérateurs privés.',
    },
  ]);

  // Irregular Process Suspension Status
  const [suspensionActive, setSuspensionActive] = useState(false);
  const [suspensionSubject, setSuspensionSubject] = useState('Passerelle Externe Ministère de la Santé (SNIS)');
  const [suspensionReason, setSuspensionReason] = useState('Tentative de requête en masse sans jeton OAuth valide détectée à 23h42.');

  const handleToggleSuspension = () => {
    setSuspensionActive(!suspensionActive);
  };

  const handleUpdateStatus = (id: string, newStatus: CitizenPrivacyRequest['status']) => {
    setRequests(requests.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#08243F] text-white border border-[#C9A227]/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D9B84A] bg-[#0A1B2A] px-2.5 py-0.5 rounded border border-[#C9A227]/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D9B84A]" />
              AUTORITÉ DE PROTECTION DES DONNÉES PERSONNELLES
            </span>
            <span className="text-xs text-[#DCE4EE]/70 font-mono">Loi n° 09/001 du 10 janvier 2009</span>
          </div>
          <h2 className="font-display font-black text-2xl text-white mt-1">
            Console de l'Officier de Protection des Données (DPO / CIL)
          </h2>
          <p className="text-xs text-[#DCE4EE]/80 max-w-3xl mt-1 leading-relaxed">
            Garantie républicaine des libertés individuelles : contrôle de conformité légale, traitement des droits des titulaires, surveillance des accès opérateurs et pouvoir de suspension conservatoire.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Rapport Annuel DPO</span>
          </button>
        </div>
      </div>

      {/* Emergency Suspension Banner if Active */}
      {suspensionActive && (
        <div className="p-5 rounded-2xl bg-red-600 text-white border-2 border-red-700 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-8 h-8 text-white shrink-0" />
            <div>
              <span className="font-display font-black text-sm block uppercase tracking-wide">
                TRAITEMENT IRRÉGULIER SUSPENDU PAR LE DPO
              </span>
              <p className="text-xs text-white/90">
                Cible : <strong>{suspensionSubject}</strong> · Motif : {suspensionReason}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleToggleSuspension}
            className="px-4 py-2 rounded-xl bg-white text-red-700 font-bold text-xs hover:bg-gray-100 cursor-pointer whitespace-nowrap"
          >
            Lever la Suspension
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            DEMANDES CITOYENNES REÇUES
          </span>
          <div className="font-display font-black text-2xl text-[#08243F]">
            {requests.length} Dossiers
          </div>
          <span className="text-xs text-[#1E8E5A] font-semibold">100% dans le délai légal</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            TAUX DE CONFORMITÉ ACCÈS
          </span>
          <div className="font-display font-black text-2xl text-[#1E8E5A]">
            99.94%
          </div>
          <span className="text-xs text-[#0A1B2A]/70">1 accès suspect sous enquête</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            ÉVALUATIONS D'IMPACT (RIPD)
          </span>
          <div className="font-display font-black text-2xl text-[#C9A227]">
            2 Registres
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Biométrie & Télécoms</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            STATUT DES TRAITEMENTS
          </span>
          <div className={`font-display font-black text-2xl ${suspensionActive ? 'text-red-600' : 'text-[#1E8E5A]'}`}>
            {suspensionActive ? '1 Suspendu' : 'Sain (0 Incident)'}
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Protection active des droits</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DCE4EE] overflow-x-auto gap-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('conformite')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'conformite'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Tableau de Conformité Loi 09/001</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('demandes')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'demandes'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Demandes des Titulaires ({requests.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('audit_acces')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'audit_acces'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Audit des Accès Opérateurs ({accessLogs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('impact')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'impact'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Évaluations d'Impact (DPIA / RIPD)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('suspension')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'suspension'
              ? 'border-red-600 text-red-600 font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Suspension des Traitements Irréguliers</span>
        </button>
      </div>

      {/* TAB 1: CONFORMITÉ */}
      {activeTab === 'conformite' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Matrice de Conformité aux Principes Fondamentaux de Protection des Données
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Évaluation continue des obligations légales régissant le Registre Social Souverain de la RDC.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#08243F]">1. Licéité & Finalité Déterminée</span>
                <CheckCircle2 className="w-4 h-4 text-[#1E8E5A]" />
              </div>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Les données sont collectées exclusivement pour l'attribution des filets sociaux et de la couverture universelle de santé selon l'Ordonnance Présidentielle de 2024.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#08243F]">2. Minimisation des Données</span>
                <CheckCircle2 className="w-4 h-4 text-[#1E8E5A]" />
              </div>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Seules les informations strictement requises pour le score de pauvreté PMT et la sécurité biométrique sont enregistrées.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#08243F]">3. Exactitude & Droit à la Rectification</span>
                <CheckCircle2 className="w-4 h-4 text-[#1E8E5A]" />
              </div>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Les citoyens disposent d'un accès sans frais en guichet et via le portail citoyen pour faire corriger leurs données d'état civil.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#08243F]">4. Intégrité & Chiffrement Souverain</span>
                <CheckCircle2 className="w-4 h-4 text-[#1E8E5A]" />
              </div>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Chaque enregistrement est scellé par un module HSM d'État avec chiffrement AES-256 au repos et TLS 1.3 en transit.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DEMANDES DES TITULAIRES */}
      {activeTab === 'demandes' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Registre des Demandes d'Exercice des Droits des Titulaires
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Délai légal de réponse : 30 jours calendaires maximum selon la législation nationale.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F6F8FB] text-[#08243F] uppercase font-mono font-bold border-y border-[#DCE4EE]">
                <tr>
                  <th className="py-3 px-4">Référence</th>
                  <th className="py-3 px-4">Citoyen / Titulaire</th>
                  <th className="py-3 px-4">Type de Droit Invoqué</th>
                  <th className="py-3 px-4">Date Limite</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Décision du DPO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEFF5]">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-[#F6F8FB]/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#0E3A66]">{req.trackingNumber}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#08243F]">{req.citizenName}</div>
                      <div className="text-[10px] font-mono text-gray-500">{req.csuNumber}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-gray-100 font-semibold text-[10px] text-gray-700">
                        {req.requestType}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-gray-600">{req.deadlineDate}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          req.status === 'Validé & Exécuté'
                            ? 'bg-[#1E8E5A]/10 text-[#1E8E5A]'
                            : req.status === 'En attente d’analyse'
                            ? 'bg-[#C77D0A]/10 text-[#C77D0A]'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {req.status === 'En attente d’analyse' ? (
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(req.id, 'Validé & Exécuté')}
                            className="px-2 py-1 bg-[#1E8E5A] text-white rounded font-bold text-[10px]"
                          >
                            Accepter
                          </button>
                          <button
                            type="button"
                            onClick={() => handleUpdateStatus(req.id, 'Refus Motivé')}
                            className="px-2 py-1 bg-red-600 text-white rounded font-bold text-[10px]"
                          >
                            Rejeter
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-500">Dossier clôturé</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT DES ACCÈS */}
      {activeTab === 'audit_acces' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Journal Indélébile des Accès aux Données Personnelles
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Traçabilité absolue des consultations, modifications et exportations de fiches citoyennes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Export des pistes d’audit pour la Commission Nationale de Contrôle généré.')}
              className="px-3.5 py-2 rounded-xl bg-[#08243F] text-white text-xs font-bold hover:bg-[#0E3A66] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter Piste d'Audit Signée</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F6F8FB] text-[#08243F] uppercase font-mono font-bold border-y border-[#DCE4EE]">
                <tr>
                  <th className="py-3 px-4">Horodatage</th>
                  <th className="py-3 px-4">Opérateur / Profil</th>
                  <th className="py-3 px-4">Dossier Cible</th>
                  <th className="py-3 px-4">Action Réalisée</th>
                  <th className="py-3 px-4">Adresse IP / Réseau</th>
                  <th className="py-3 px-4 text-right">Verdict DPO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEFF5]">
                {accessLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F6F8FB]/60 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-gray-500">{log.timestamp}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#08243F]">{log.operatorId}</div>
                      <div className="text-[10px] text-gray-500">{log.operatorRole}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0E3A66]">{log.citizenTargetCSU}</td>
                    <td className="py-3 px-4 font-semibold">{log.action}</td>
                    <td className="py-3 px-4 font-mono text-[10px] text-gray-600">{log.ipAddress}</td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          log.complianceVerdict === 'Conforme'
                            ? 'bg-[#1E8E5A]/10 text-[#1E8E5A]'
                            : 'bg-red-100 text-red-700 animate-pulse'
                        }`}
                      >
                        {log.complianceVerdict}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: ÉVALUATIONS D'IMPACT (DPIA) */}
      {activeTab === 'impact' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Analyses d'Impact sur la Protection des Données (AIPD / DPIA)
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Études préalables obligatoires pour tout projet impliquant des données sensibles ou biométriques.
            </p>
          </div>

          <div className="space-y-3">
            {impactReports.map((report) => (
              <div key={report.id} className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-[#0E3A66] font-bold block">{report.id} · {report.ministry}</span>
                    <h4 className="font-display font-bold text-sm text-[#08243F]">{report.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-gray-200 font-mono text-[10px] font-bold">
                      Risque : {report.riskLevel}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                      {report.status}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#DCE4EE] text-[11px] text-[#0A1B2A]/80">
                  <strong>Mesures d'atténuation imposées par le DPO :</strong>
                  <p className="mt-0.5">{report.mitigationMeasures}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SUSPENSION DES TRAITEMENTS */}
      {activeTab === 'suspension' && (
        <div className="p-6 rounded-3xl bg-white border-2 border-red-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-red-600 font-bold border-b border-red-100 pb-3">
            <AlertOctagon className="w-5 h-5" />
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Pouvoir d'Injonction & Suspension Conservatoire des Traitements
              </h3>
              <p className="text-xs text-red-700">
                En vertu de l'article 38 de la Loi sur la Protection des Données, le DPO peut ordonner l'interruption immédiate de tout flux non conforme.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-3 text-xs">
            <div>
              <label className="font-bold text-red-900 block mb-1">Cible de la Mesure Conservatoire</label>
              <input
                type="text"
                value={suspensionSubject}
                onChange={(e) => setSuspensionSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-red-300 bg-white font-semibold text-gray-800"
              />
            </div>

            <div>
              <label className="font-bold text-red-900 block mb-1">Motif Juridique & Infraction Constatée</label>
              <textarea
                rows={3}
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-red-300 bg-white text-gray-800"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleToggleSuspension}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg cursor-pointer ${
                  suspensionActive
                    ? 'bg-gray-800 text-white hover:bg-black'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {suspensionActive ? 'Lever la Suspension Conservatoire' : 'ORDONNER LA SUSPENSION IMMÉDIATE DU FLUX'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
