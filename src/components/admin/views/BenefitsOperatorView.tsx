import React, { useState } from 'react';
import {
  DollarSign,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  RefreshCw,
  Phone,
  FileText,
  AlertTriangle,
  History,
  Check,
  X,
  CreditCard,
  Send,
  Eye,
  Building,
} from 'lucide-react';

interface BenefitClaim {
  id: string;
  claimCode: string;
  citizenName: string;
  csuNumber: string;
  phone: string;
  telecomOperator: 'Airtel Money' | 'Orange Money' | 'M-Pesa (Vodacom)' | 'Afrimoney';
  amountCDF: number;
  programName: string;
  appliedDate: string;
  vulnerabilityScore: number;
  status: 'En attente d’analyse' | 'Approuvé (Prêt à décaisser)' | 'Refusé' | 'Échec Mobile Money (Rejet)';
  rejectionReason?: string;
}

interface PaymentHistoryItem {
  id: string;
  csuNumber: string;
  recipientName: string;
  amountCDF: number;
  operator: string;
  transactionRef: string;
  paidAt: string;
  status: 'Payé avec succès' | 'Échec (Compte inactif)' | 'Remboursé';
}

export const BenefitsOperatorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'demandes' | 'historique' | 'lots' | 'rejets'>('demandes');
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedClaim, setSelectedClaim] = useState<BenefitClaim | null>(null);
  const [decisionReason, setDecisionReason] = useState('');
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'approve' | 'reject'>('approve');

  // Benefit Claims
  const [claims, setClaims] = useState<BenefitClaim[]>([
    {
      id: 'CLM-01',
      claimCode: 'CLM-2026-901',
      citizenName: 'Kasongo Ilunga Dieudonné',
      csuNumber: 'CSU-2026-9912-1044',
      phone: '+243 818 901 234',
      telecomOperator: 'Airtel Money',
      amountCDF: 75000,
      programName: 'Filets Sociaux Monétaires',
      appliedDate: 'Aujourd’hui à 09:15',
      vulnerabilityScore: 2.1,
      status: 'En attente d’analyse',
    },
    {
      id: 'CLM-02',
      claimCode: 'CLM-2026-902',
      citizenName: 'Mbuyi Kalonji Chantal',
      csuNumber: 'CSU-2026-8841-3910',
      phone: '+243 997 452 110',
      telecomOperator: 'Orange Money',
      amountCDF: 45000,
      programName: 'Santé Maternité Gratuite',
      appliedDate: 'Aujourd’hui à 10:20',
      vulnerabilityScore: 2.8,
      status: 'En attente d’analyse',
    },
    {
      id: 'CLM-03',
      claimCode: 'CLM-2026-903',
      citizenName: 'Balume Safari Emmanuel',
      csuNumber: 'CSU-2026-7731-8902',
      phone: '+243 820 119 400',
      telecomOperator: 'M-Pesa (Vodacom)',
      amountCDF: 75000,
      programName: 'Filets Sociaux Monétaires',
      appliedDate: 'Hier à 14:00',
      vulnerabilityScore: 1.8,
      status: 'Approuvé (Prêt à décaisser)',
    },
    {
      id: 'CLM-04',
      claimCode: 'CLM-2026-904',
      citizenName: 'Boketshu Yoka Clément',
      csuNumber: 'CSU-2026-5541-2091',
      phone: '+243 841 002 991',
      telecomOperator: 'Afrimoney',
      amountCDF: 30000,
      programName: 'Cantines Scolaires',
      appliedDate: 'Hier à 16:30',
      vulnerabilityScore: 2.5,
      status: 'Échec Mobile Money (Rejet)',
      rejectionReason: 'Numéro de téléphone non identifié auprès de l’opérateur télécom.',
    },
  ]);

  // Payment History
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistoryItem[]>([
    {
      id: 'PAY-88190',
      csuNumber: 'CSU-2026-9912-1044',
      recipientName: 'Kasongo Ilunga Dieudonné',
      amountCDF: 75000,
      operator: 'Airtel Money',
      transactionRef: 'AIR-TX-9981204',
      paidAt: '23/08/2026 10:00',
      status: 'Payé avec succès',
    },
    {
      id: 'PAY-88191',
      csuNumber: 'CSU-2026-8841-3910',
      recipientName: 'Mbuyi Kalonji Chantal',
      amountCDF: 45000,
      operator: 'Orange Money',
      transactionRef: 'ORG-TX-4481902',
      paidAt: '23/08/2026 10:05',
      status: 'Payé avec succès',
    },
  ]);

  const handleOpenDecision = (claim: BenefitClaim, action: 'approve' | 'reject') => {
    setSelectedClaim(claim);
    setPendingAction(action);
    setDecisionReason('');
    setIsDecisionModalOpen(true);
  };

  const handleConfirmDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClaim) return;
    if (pendingAction === 'reject' && !decisionReason.trim()) {
      alert('Veuillez renseigner un motif légal pour tout refus de prestation.');
      return;
    }

    setClaims(
      claims.map((c) =>
        c.id === selectedClaim.id
          ? {
              ...c,
              status: pendingAction === 'approve' ? 'Approuvé (Prêt à décaisser)' : 'Refusé',
              rejectionReason: pendingAction === 'reject' ? decisionReason : undefined,
            }
          : c
      )
    );

    setIsDecisionModalOpen(false);
    setSelectedClaim(null);
  };

  const handleReprocessClaim = (claimId: string) => {
    setClaims(
      claims.map((c) =>
        c.id === claimId
          ? {
              ...c,
              status: 'En attente d’analyse',
              rejectionReason: undefined,
            }
          : c
      )
    );
    alert('Dossier réinjecté en file prioritaire avec demande d’actualisation du compte Mobile Money.');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#08243F] text-white border border-[#14477E] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1E8E5A] bg-[#0A1B2A] px-2.5 py-0.5 rounded border border-[#1E8E5A]/40 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-[#1E8E5A]" />
              GUICHET CENTRAL DES PRESTATIONS & DÉBOURS
            </span>
            <span className="text-xs text-[#DCE4EE]/70 font-mono">Switch Mobile Money RDC</span>
          </div>
          <h2 className="font-display font-black text-2xl text-white mt-1">
            Console de l'Opérateur des Prestations & Décaissements
          </h2>
          <p className="text-xs text-[#DCE4EE]/80 max-w-3xl mt-1 leading-relaxed">
            Instruction des demandes d'aide, approbation des versements, enregistrement des justifications légales, consultation de l'historique citoyen et traitement des rejets télécoms.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Lot de 450 virements transmis au switch bancaire.')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-black text-xs shadow-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Déclencher Lot de Paiement</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            DEMANDES EN ATTENTE
          </span>
          <div className="font-display font-black text-2xl text-[#C9A227]">
            {claims.filter((c) => c.status === 'En attente d’analyse').length} Dossiers
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Délai moyen : 18 min</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            PRÊTS À DÉCAISSER CE JOUR
          </span>
          <div className="font-display font-black text-2xl text-[#1E8E5A]">
            195 000 CDF
          </div>
          <span className="text-xs text-[#1E8E5A] font-semibold">Validations conformes</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            TAUX DE SUCCÈS MOBILE MONEY
          </span>
          <div className="font-display font-black text-2xl text-[#0E3A66]">
            98.8%
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Airtel, Orange, Vodacom, Afri</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            REJETS TÉLÉCOM À RETRAITER
          </span>
          <div className="font-display font-black text-2xl text-red-600">
            {claims.filter((c) => c.status === 'Échec Mobile Money (Rejet)').length} Dossiers
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Vérification de numéro requise</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DCE4EE] overflow-x-auto gap-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('demandes')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'demandes'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Demandes en File ({claims.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rejets')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'rejets'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Rejets Télécoms & Corrections</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('historique')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'historique'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Historique des Versements Reçus</span>
        </button>
      </div>

      {/* TAB 1: DEMANDES EN FILE */}
      {activeTab === 'demandes' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Demandes d'Allocations en Attente d'Instruction
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Chaque approbation déclenche la réservation de fonds dans le compte séquestre de la Banque Centrale.
              </p>
            </div>
            <input
              type="text"
              placeholder="Rechercher par titulaire, CSU ou téléphone..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="p-2 rounded-xl border border-[#DCE4EE] text-xs bg-[#F6F8FB] w-full sm:w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F6F8FB] text-[#08243F] uppercase font-mono font-bold border-y border-[#DCE4EE]">
                <tr>
                  <th className="py-3 px-4">Code Demande</th>
                  <th className="py-3 px-4">Citoyen / Numéro CSU</th>
                  <th className="py-3 px-4">Programme Social</th>
                  <th className="py-3 px-4">Opérateur Mobile Money</th>
                  <th className="py-3 px-4">Montant Mensuel</th>
                  <th className="py-3 px-4">Statut</th>
                  <th className="py-3 px-4 text-right">Décision Opérateur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEFF5]">
                {claims
                  .filter((c) => c.citizenName.toLowerCase().includes(filterQuery.toLowerCase()) || c.csuNumber.toLowerCase().includes(filterQuery.toLowerCase()))
                  .map((claim) => (
                    <tr key={claim.id} className="hover:bg-[#F6F8FB]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#0E3A66]">{claim.claimCode}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-[#08243F]">{claim.citizenName}</div>
                        <div className="text-[10px] font-mono text-gray-500">{claim.csuNumber} · Score {claim.vulnerabilityScore}</div>
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#08243F]">{claim.programName}</td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-800">{claim.telecomOperator}</div>
                        <div className="font-mono text-[10px] text-gray-500">{claim.phone}</div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-[#1E8E5A]">
                        {claim.amountCDF.toLocaleString()} CDF
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            claim.status === 'Approuvé (Prêt à décaisser)'
                              ? 'bg-[#1E8E5A]/10 text-[#1E8E5A]'
                              : claim.status === 'En attente d’analyse'
                              ? 'bg-[#C77D0A]/10 text-[#C77D0A]'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {claim.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {claim.status === 'En attente d’analyse' ? (
                          <div className="flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenDecision(claim, 'approve')}
                              className="px-2.5 py-1 rounded-lg bg-[#1E8E5A] hover:bg-[#156e45] text-white font-bold text-[11px] cursor-pointer"
                            >
                              Approuver
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenDecision(claim, 'reject')}
                              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] cursor-pointer"
                            >
                              Refuser
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => alert(`Détails de l'historique citoyen pour ${claim.citizenName}`)}
                            className="text-[#0E3A66] hover:underline font-semibold text-[11px] cursor-pointer"
                          >
                            Consulter Fiche
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: REJETS TÉLÉCOMS */}
      {activeTab === 'rejets' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Rejets de Virement Télécoms & Anomalies MSISDN
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Dossiers dont l'ordre de transfert n'a pas pu aboutir chez l'opérateur (numéro suspendu, solde plafond atteint, etc.).
            </p>
          </div>

          <div className="space-y-3">
            {claims
              .filter((c) => c.status === 'Échec Mobile Money (Rejet)')
              .map((rej) => (
                <div key={rej.id} className="p-4 rounded-2xl bg-red-50/50 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#08243F] text-sm">{rej.citizenName}</span>
                      <span className="font-mono text-gray-500">({rej.csuNumber})</span>
                      <span className="px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold text-[10px]">
                        Rejet : {rej.telecomOperator}
                      </span>
                    </div>
                    <div className="text-red-700 font-medium">
                      Motif : {rej.rejectionReason}
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono">
                      Numéro enregistré : {rej.phone} · Montant en suspens : {rej.amountCDF.toLocaleString()} CDF
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleReprocessClaim(rej.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#08243F] text-white font-bold text-xs hover:bg-[#0E3A66] cursor-pointer flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Retraiter Dossier</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 3: HISTORIQUE */}
      {activeTab === 'historique' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Journal des Paiements Effectués avec Succès
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Historique des virements confirmés par les passerelles SMS et bancaires.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F6F8FB] text-[#08243F] uppercase font-mono font-bold border-y border-[#DCE4EE]">
                <tr>
                  <th className="py-3 px-4">Référence Télécom</th>
                  <th className="py-3 px-4">Bénéficiaire</th>
                  <th className="py-3 px-4">Numéro CSU</th>
                  <th className="py-3 px-4">Montant</th>
                  <th className="py-3 px-4">Opérateur</th>
                  <th className="py-3 px-4">Date de Paiement</th>
                  <th className="py-3 px-4 text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEFF5]">
                {paymentHistory.map((pay) => (
                  <tr key={pay.id} className="hover:bg-[#F6F8FB]/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#0E3A66]">{pay.transactionRef}</td>
                    <td className="py-3 px-4 font-bold text-[#08243F]">{pay.recipientName}</td>
                    <td className="py-3 px-4 font-mono text-gray-500">{pay.csuNumber}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#1E8E5A]">{pay.amountCDF.toLocaleString()} CDF</td>
                    <td className="py-3 px-4">{pay.operator}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-gray-500">{pay.paidAt}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                        {pay.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Decision with Mandatory Justification */}
      {isDecisionModalOpen && selectedClaim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white border-2 border-[#08243F] p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
              <h3 className="font-display font-extrabold text-base text-[#08243F]">
                {pendingAction === 'approve' ? 'Approbation du Versement' : 'Notification de Refus Motivé'}
              </h3>
              <button
                type="button"
                onClick={() => setIsDecisionModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-1">
              <div>Titulaire : <strong>{selectedClaim.citizenName}</strong></div>
              <div>Numéro CSU : <span className="font-mono">{selectedClaim.csuNumber}</span></div>
              <div>Montant : <strong className="text-[#1E8E5A]">{selectedClaim.amountCDF.toLocaleString()} CDF</strong> ({selectedClaim.telecomOperator})</div>
            </div>

            <form onSubmit={handleConfirmDecision} className="space-y-3">
              <div>
                <label className="font-bold text-[#08243F] block mb-1">
                  Justification Réglementaire & Motif Légal
                </label>
                <textarea
                  required={pendingAction === 'reject'}
                  rows={3}
                  value={decisionReason}
                  onChange={(e) => setDecisionReason(e.target.value)}
                  placeholder={
                    pendingAction === 'approve'
                      ? "Ex : Éligibilité confirmée sous le seuil PMT de 2.1 - Aucun doublon constaté."
                      : "Ex : Dépassement du seuil de vulnérabilité après enquête de terrain."
                  }
                  className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#EAEFF5]">
                <button
                  type="button"
                  onClick={() => setIsDecisionModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-xl font-bold text-white ${
                    pendingAction === 'approve' ? 'bg-[#1E8E5A] hover:bg-[#156e45]' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {pendingAction === 'approve' ? 'Confirmer l’Approbation' : 'Enregistrer le Refus'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
