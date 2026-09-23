import React, { useState } from 'react';
import {
  FileCheck,
  Search,
  Download,
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  History,
  Lock,
  Layers,
  FileSpreadsheet,
  Calendar,
  Filter,
  Eye,
  Check,
  Building,
} from 'lucide-react';

interface AuditTrailItem {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  eventType: 'Création' | 'Modification' | 'Suppression Logique' | 'Paiement Mobile Money' | 'Validation Plan B';
  targetEntity: string;
  targetId: string;
  hsmBlockHash: string;
  details: string;
}

interface ConsentLogItem {
  id: string;
  citizenName: string;
  csuNumber: string;
  consentType: 'Enrôlement Biométrique' | 'Traitement Données Santé' | 'Déboursement Mobile Money';
  grantedAt: string;
  channel: 'Guichet Signature Numérique' | 'Portail Citoyen OTP' | 'Témoins Plan B';
  validUntil: string;
  status: 'Valide' | 'Révoqué';
}

export const AuditorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pistes' | 'modifications' | 'consentements' | 'rapports'>('pistes');
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('ALL');

  // Audit Trails
  const [auditTrails] = useState<AuditTrailItem[]>([
    {
      id: 'AUD-99120',
      timestamp: '23/09/2026 11:42:15',
      actor: 'AGT-01 (Kanku M.)',
      actorRole: 'Agente N1 Guichet',
      eventType: 'Création',
      targetEntity: 'Dossier Citoyen',
      targetId: 'CSU-2026-9912-1044',
      hsmBlockHash: 'SHA256:d8b2e1f9a0c74b99812e...',
      details: 'Enrôlement initial avec photo faciale et 10 empreintes digitales (Kalamu Centre)',
    },
    {
      id: 'AUD-99121',
      timestamp: '23/09/2026 11:15:02',
      actor: 'AGT-02 (Mwamba P.)',
      actorRole: 'Agente N2 Plan B',
      eventType: 'Validation Plan B',
      targetEntity: 'Dossier Régularisation',
      targetId: 'CSU-2026-8841-3910',
      hsmBlockHash: 'SHA256:4a8c9e1029bafe832101...',
      details: 'Procédure dérogatoire sans pièces validée par serment de 2 témoins communautaires',
    },
    {
      id: 'AUD-99122',
      timestamp: '23/09/2026 10:30:44',
      actor: 'SYS-BATCH-PAY',
      actorRole: 'Passerelle Mobile Money',
      eventType: 'Paiement Mobile Money',
      targetEntity: 'Virement 75 000 CDF',
      targetId: 'TX-AIRTEL-982104',
      hsmBlockHash: 'SHA256:7f10acb91823901bca28...',
      details: 'Virement de filet social décaissé sur le compte Airtel Money certifié',
    },
    {
      id: 'AUD-99123',
      timestamp: '22/09/2026 16:48:19',
      actor: 'SPV-01 (Dr. Ilunga)',
      actorRole: 'Superviseur de Station',
      eventType: 'Modification',
      targetEntity: 'Dossier Citoyen',
      targetId: 'CSU-2026-7731-8902',
      hsmBlockHash: 'SHA256:91b2c4e5f601a2389d71...',
      details: 'Correction du numéro de téléphone de versement suite à contestation formelle',
    },
  ]);

  // Citizen Consent Logs
  const [consentLogs] = useState<ConsentLogItem[]>([
    {
      id: 'CST-01',
      citizenName: 'Kasongo Ilunga Dieudonné',
      csuNumber: 'CSU-2026-9912-1044',
      consentType: 'Enrôlement Biométrique',
      grantedAt: '23/09/2026 11:40',
      channel: 'Guichet Signature Numérique',
      validUntil: 'Indéterminé (Loi Sociale)',
      status: 'Valide',
    },
    {
      id: 'CST-02',
      citizenName: 'Mbuyi Kalonji Chantal',
      csuNumber: 'CSU-2026-8841-3910',
      consentType: 'Traitement Données Santé',
      grantedAt: '23/09/2026 11:10',
      channel: 'Témoins Plan B',
      validUntil: 'Indéterminé (Loi Sociale)',
      status: 'Valide',
    },
    {
      id: 'CST-03',
      citizenName: 'Balume Safari Emmanuel',
      csuNumber: 'CSU-2026-7731-8902',
      consentType: 'Déboursement Mobile Money',
      grantedAt: '22/09/2026 16:40',
      channel: 'Portail Citoyen OTP',
      validUntil: '22/09/2027',
      status: 'Valide',
    },
  ]);

  const filteredTrails = auditTrails.filter((item) => {
    const matchesQuery =
      item.targetId.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.actor.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.details.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesEvent = selectedEventType === 'ALL' || item.eventType === selectedEventType;
    return matchesQuery && matchesEvent;
  });

  return (
    <div className="space-y-6">
      {/* Strict Read-Only Notice Banner */}
      <div className="p-4 rounded-2xl bg-[#08243F] text-[#D9B84A] border-2 border-[#C9A227] flex items-center justify-between gap-3 text-xs shadow-md">
        <div className="flex items-center gap-2.5">
          <Lock className="w-5 h-5 text-[#D9B84A] shrink-0" />
          <div>
            <strong className="font-display uppercase tracking-wider block">
              ACCRÉDITATION D'AUDIT : LECTURE SEULE STRICTE (CONTRÔLE RÉPUBLICAIN)
            </strong>
            <span className="text-[11px] text-[#DCE4EE]">
              Habilitation Cour des Comptes & Inspection Générale des Finances (IGF). Aucune modification ou suppression n'est autorisée sur les registres civils.
            </span>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#D9B84A] text-[#08243F] font-bold text-[10px] whitespace-nowrap">
          SOUVERAINETÉ IGF / IGE
        </span>
      </div>

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0E3A66] bg-[#F6F8FB] px-2.5 py-0.5 rounded border border-[#DCE4EE]">
              AUDIT & TRANSPARENCE D'ÉTAT
            </span>
            <span className="text-xs text-[#0A1B2A]/60 font-mono">Chiffrement SHA-256 Immuable</span>
          </div>
          <h2 className="font-display font-black text-2xl text-[#08243F] mt-1">
            Console de Contrôle Républicain & Audit Immuable
          </h2>
          <p className="text-xs text-[#0A1B2A]/70 max-w-3xl mt-1 leading-relaxed">
            Inspection des pistes d'audit chronologiques, vérification de l'intégrité des consentements, contrôle des flux de déboursement monétaire et certification des bilans de conformité.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-[#08243F] text-white text-xs font-bold hover:bg-[#0E3A66] flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer Rapport d'Audit</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            ÉVÉNEMENTS JOURNALISÉS DANS L'HSM
          </span>
          <div className="font-display font-black text-2xl text-[#08243F]">
            18 420 900
          </div>
          <span className="text-xs text-[#1E8E5A] font-semibold">100% Intacts (0 Altération)</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            FONDS DÉBOURSÉS AUDITÉS
          </span>
          <div className="font-display font-black text-2xl text-[#C9A227]">
            184 Mds CDF
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Rapprochement bancaire 100%</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            CONSENTEMENTS NUMÉRIQUES VALIDES
          </span>
          <div className="font-display font-black text-2xl text-[#0E3A66]">
            14.8M Actifs
          </div>
          <span className="text-xs text-[#1E8E5A] font-semibold">Conformes Loi RDC</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            INDICE D'INTÉGRITÉ NATIONALE
          </span>
          <div className="font-display font-black text-2xl text-[#1E8E5A]">
            99.99%
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Zéro bénéficiaire fictif certifié</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DCE4EE] overflow-x-auto gap-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('pistes')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'pistes'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Pistes d'Audit Immuables ({auditTrails.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('consentements')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'consentements'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Logs de Consentement Citoyen ({consentLogs.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rapports')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'rapports'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Rapports de Compliance & Clôture</span>
        </button>
      </div>

      {/* TAB 1: PISTES D'AUDIT */}
      {activeTab === 'pistes' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Rechercher par acteur, dossier ou détail..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="p-2 rounded-xl border border-[#DCE4EE] text-xs bg-[#F6F8FB] w-full sm:w-72"
              />
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="p-2 rounded-xl border border-[#DCE4EE] text-xs bg-[#F6F8FB]"
              >
                <option value="ALL">Tous les types d'événements</option>
                <option value="Création">Création d'enrôlement</option>
                <option value="Validation Plan B">Validation Plan B (Témoins)</option>
                <option value="Paiement Mobile Money">Paiement Mobile Money</option>
                <option value="Modification">Modification de dossier</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => alert('Extraction certifiée pour la Cour des Comptes téléchargée en format CSV signé.')}
              className="px-3.5 py-2 rounded-xl bg-[#08243F] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#0E3A66] cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter Piste Signée</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F6F8FB] text-[#08243F] uppercase font-mono font-bold border-y border-[#DCE4EE]">
                <tr>
                  <th className="py-3 px-4">Horodatage</th>
                  <th className="py-3 px-4">Acteur / Rôle</th>
                  <th className="py-3 px-4">Événement</th>
                  <th className="py-3 px-4">Cible / Dossier</th>
                  <th className="py-3 px-4">Empreinte Cryptographique HSM</th>
                  <th className="py-3 px-4 text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEFF5]">
                {filteredTrails.map((trail) => (
                  <tr key={trail.id} className="hover:bg-[#F6F8FB]/60 transition-colors">
                    <td className="py-3 px-4 font-mono text-[11px] text-gray-500">{trail.timestamp}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#08243F]">{trail.actor}</div>
                      <div className="text-[10px] text-gray-500">{trail.actorRole}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-gray-100 font-semibold text-[10px] text-gray-700">
                        {trail.eventType}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0E3A66]">{trail.targetId}</td>
                    <td className="py-3 px-4 font-mono text-[10px] text-gray-400">{trail.hsmBlockHash}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                        Scellé Immuable
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CONSENTEMENTS */}
      {activeTab === 'consentements' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Registre des Preuves de Consentement Électronique
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Vérification de la validité juridique des autorisations accordées par les citoyens lors de leur inscription.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F6F8FB] text-[#08243F] uppercase font-mono font-bold border-y border-[#DCE4EE]">
                <tr>
                  <th className="py-3 px-4">Titulaire</th>
                  <th className="py-3 px-4">Numéro CSU</th>
                  <th className="py-3 px-4">Finalité du Consentement</th>
                  <th className="py-3 px-4">Canal d'Octroi</th>
                  <th className="py-3 px-4">Date & Heure</th>
                  <th className="py-3 px-4 text-right">Validité</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEFF5]">
                {consentLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F6F8FB]/60 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#08243F]">{log.citizenName}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0E3A66]">{log.csuNumber}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-gray-100 font-semibold text-[10px]">
                        {log.consentType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-700">{log.channel}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-gray-500">{log.grantedAt}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RAPPORTS DE COMPLIANCE */}
      {activeTab === 'rapports' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Rapports Institutionnels de Conformité & Anti-Fraude
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Certifications officielles destinées au Parlement, à la Présidence de la République et aux bailleurs internationaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-[#08243F]">Rapport d'Audit Financier Q3 2026</span>
                <span className="px-2 py-0.5 rounded bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                  CERTIFIÉ SANS RÉSERVE
                </span>
              </div>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Audit de 184 milliards de CDF déboursés via les opérateurs télécoms (M-Pesa, Orange, Airtel, Afrimoney). Zéro anomalie de réconciliation constatée.
              </p>
              <button
                type="button"
                onClick={() => alert('Téléchargement du rapport officiel Cour des Comptes initialisé.')}
                className="px-3.5 py-1.5 rounded-xl bg-[#08243F] text-white font-bold text-xs hover:bg-[#0E3A66] cursor-pointer"
              >
                Télécharger Rapport PDF Signé
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-[#08243F]">Certification Anti-Doublons Biométriques</span>
                <span className="px-2 py-0.5 rounded bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                  CONFORME ICAO
                </span>
              </div>
              <p className="text-[11px] text-[#0A1B2A]/70">
                1 420 tentatives d'inscription multiple bloquées automatiquement à la source. Préservation de 3.4 milliards de CDF de fonds publics.
              </p>
              <button
                type="button"
                onClick={() => alert('Téléchargement du certificat d’intégrité biométrique initialisé.')}
                className="px-3.5 py-1.5 rounded-xl bg-[#08243F] text-white font-bold text-xs hover:bg-[#0E3A66] cursor-pointer"
              >
                Télécharger Certificat Biométrique
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
