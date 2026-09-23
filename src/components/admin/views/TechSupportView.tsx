import React, { useState } from 'react';
import {
  LifeBuoy,
  MessageSquare,
  Wrench,
  KeyRound,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Send,
  UserCheck,
  ShieldAlert,
  Smartphone,
  WifiOff,
  BatteryCharging,
  Cpu,
  X,
  PhoneCall,
} from 'lucide-react';

interface SupportTicket {
  id: string;
  ticketNumber: string;
  title: string;
  requesterName: string;
  requesterRole: string;
  station: string;
  priority: 'Critique' | 'Haute' | 'Normale' | 'Basse';
  category: 'Matériel Biométrique' | 'Synchronisation Offline' | 'Identifiants Agent' | 'Réseau VSAT';
  createdAt: string;
  status: 'Ouvert' | 'En Cours' | 'Résolu';
  description: string;
  lastReply?: string;
}

interface StationSyncStatus {
  id: string;
  stationName: string;
  province: string;
  connectivityType: 'VSAT Satellite' | 'Fibre Optique' | '4G / Edge' | 'Hors-Ligne (Offline Kit)';
  pendingUploads: number;
  lastSyncAt: string;
  batteryLevel: number;
  status: 'Synchro OK' | 'Upload en attente' | 'Alerte Déconnexion';
}

export const TechSupportView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'diagnostic' | 'reset_credentials' | 'sync'>('tickets');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Ticket for reply
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  // Agent Credential Reset
  const [agentToReset, setAgentToReset] = useState('');
  const [resetReason, setResetReason] = useState('');
  const [generatedTempPin, setGeneratedTempPin] = useState<string | null>(null);

  // Tickets
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TCK-01',
      ticketNumber: 'TCK-2026-4401',
      title: 'Scanner d’empreintes digitales Suprema non détecté sur le kit mobile #14',
      requesterName: 'Kanku Mukendi Clarisse',
      requesterRole: 'Agente de Cadastro N1',
      station: 'Guichet Mobile Fleuve Kongo (Kalamu)',
      priority: 'Critique',
      category: 'Matériel Biométrique',
      createdAt: 'Il y a 25 min',
      status: 'Ouvert',
      description: 'Le pilote USB renvoie une erreur code 43 après une coupure d’alimentation solaire. La caméra ICAO fonctionne normalement.',
    },
    {
      id: 'TCK-02',
      ticketNumber: 'TCK-2026-4402',
      title: 'Blocage de compte après 3 tentatives de mot de passe erroné',
      requesterName: 'Mwamba Kabongo Jean-Luc',
      requesterRole: 'Agente N2 Plan B',
      station: 'Station Cité Verte (Selembao)',
      priority: 'Haute',
      category: 'Identifiants Agent',
      createdAt: 'Il y a 1 heure',
      status: 'En Cours',
      description: 'Perte du mot de passe suite au changement de poste. YubiKey physique toujours en possession de l’agent.',
      lastReply: 'Support : Vérification d’identité en cours auprès du Superviseur de Station.',
    },
    {
      id: 'TCK-03',
      ticketNumber: 'TCK-2026-4403',
      title: 'Perte de signal antenne VSAT après orage tropical',
      requesterName: 'Dr. Ilunga Kalombo',
      requesterRole: 'Superviseur de Station',
      station: 'Station Territoriale de Tshikapa',
      priority: 'Haute',
      category: 'Réseau VSAT',
      createdAt: 'Hier à 18:20',
      status: 'En Cours',
      description: 'Le modem Hughes ne capte plus le transpondeur satellite. 38 dossiers citoyens en cache local sécurisé.',
    },
  ]);

  // Sync statuses
  const [stationsSync, setStationsSync] = useState<StationSyncStatus[]>([
    {
      id: 'STN-KIN-01',
      stationName: 'Station Pilote Kalamu (Kinshasa)',
      province: 'Kinshasa',
      connectivityType: 'Fibre Optique',
      pendingUploads: 0,
      lastSyncAt: 'Il y a 4 min',
      batteryLevel: 98,
      status: 'Synchro OK',
    },
    {
      id: 'STN-TSH-02',
      stationName: 'Station Territoriale Tshikapa',
      province: 'Kasaï',
      connectivityType: 'VSAT Satellite',
      pendingUploads: 38,
      lastSyncAt: 'Hier 18:15',
      batteryLevel: 84,
      status: 'Upload en attente',
    },
    {
      id: 'STN-GOM-03',
      stationName: 'Mission Mobile Déplacés Nyiragongo',
      province: 'Nord-Kivu',
      connectivityType: 'Hors-Ligne (Offline Kit)',
      pendingUploads: 142,
      lastSyncAt: 'Il y a 3 jours',
      batteryLevel: 42,
      status: 'Alerte Déconnexion',
    },
  ]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket || !replyMessage.trim()) return;
    setTickets(
      tickets.map((t) =>
        t.id === selectedTicket.id
          ? {
              ...t,
              status: 'En Cours',
              lastReply: `Support : ${replyMessage}`,
            }
          : t
      )
    );
    setSelectedTicket(null);
    setReplyMessage('');
    alert('Réponse transmise à l’agent sur son terminal de terrain.');
  };

  const handleResolveTicket = (ticketId: string) => {
    setTickets(tickets.map((t) => (t.id === ticketId ? { ...t, status: 'Résolu' } : t)));
    setSelectedTicket(null);
  };

  const handleExecuteReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agentToReset.trim()) return;
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedTempPin(pin);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#08243F] text-white border border-[#14477E] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1E8E5A] bg-[#0A1B2A] px-2.5 py-0.5 rounded border border-[#1E8E5A]/40 flex items-center gap-1.5">
              <LifeBuoy className="w-3.5 h-3.5 text-[#1E8E5A]" />
              CENTRE D'ASSISTANCE & SUPPORT TECHNIQUE DES OPÉRATIONS
            </span>
            <span className="text-xs text-[#DCE4EE]/70 font-mono">Disponibilité 24/7 · National RDC</span>
          </div>
          <h2 className="font-display font-black text-2xl text-white mt-1">
            Console du Support Technique & Dépannage Terrain
          </h2>
          <p className="text-xs text-[#DCE4EE]/80 max-w-3xl mt-1 leading-relaxed">
            Résolution des tickets d'incidents, réinitialisation sécurisée des identifiants des agents d'enrôlement, télédiagnostic des valises biométriques et supervision des synchronisations hors-ligne.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('reset_credentials')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-black text-xs shadow-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Réinitialiser Identifiant Agent</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            TICKETS OUVERTS
          </span>
          <div className="font-display font-black text-2xl text-[#C9A227]">
            {tickets.filter((t) => t.status !== 'Résolu').length} En Cours
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Temps de prise en charge : 4 min</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            INCIDENTS MATÉRIELS RÉSOLUS
          </span>
          <div className="font-display font-black text-2xl text-[#1E8E5A]">
            94.6%
          </div>
          <span className="text-xs text-[#1E8E5A] font-semibold">Taux de résolution premier niveau</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            KITS BIOMÉTRIQUES EN MISSION
          </span>
          <div className="font-display font-black text-2xl text-[#08243F]">
            1 240 Unités
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Dont 88 en mode offline pur</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            DOSSIERS EN ATTENTE D'UPLOAD
          </span>
          <div className="font-display font-black text-2xl text-[#0E3A66]">
            180 Fiches
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Chiffrement AES-256 local</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DCE4EE] overflow-x-auto gap-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('tickets')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'tickets'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Tickets & Appels de Terrain ({tickets.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('diagnostic')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'diagnostic'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Télédiagnostic Valises Biométriques</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('reset_credentials')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'reset_credentials'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Réinitialisation des Identifiants</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sync')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'sync'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Surveillance des Synchronisations ({stationsSync.length})</span>
        </button>
      </div>

      {/* TAB 1: TICKETS */}
      {activeTab === 'tickets' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Rechercher ticket, agent, matériel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 rounded-xl border border-[#DCE4EE] text-xs bg-[#F6F8FB] w-full sm:w-64"
              />
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="p-2 rounded-xl border border-[#DCE4EE] text-xs bg-[#F6F8FB]"
              >
                <option value="ALL">Toutes les priorités</option>
                <option value="Critique">Critique</option>
                <option value="Haute">Haute</option>
                <option value="Normale">Normale</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {tickets
              .filter(
                (t) =>
                  (filterPriority === 'ALL' || t.priority === filterPriority) &&
                  (t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.requesterName.toLowerCase().includes(searchQuery.toLowerCase()))
              )
              .map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-[#08243F]">{ticket.ticketNumber}</span>
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                          ticket.priority === 'Critique'
                            ? 'bg-red-100 text-red-700'
                            : ticket.priority === 'Haute'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {ticket.priority}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-gray-200 font-mono text-[9px] text-gray-700">
                        {ticket.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-[10px]">{ticket.createdAt}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          ticket.status === 'Résolu'
                            ? 'bg-[#1E8E5A]/10 text-[#1E8E5A]'
                            : ticket.status === 'En Cours'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-[#C77D0A]/10 text-[#C77D0A]'
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-sm text-[#08243F]">{ticket.title}</h4>
                    <p className="text-[11px] text-[#0A1B2A]/80 mt-1">{ticket.description}</p>
                    <div className="text-[10px] text-gray-500 mt-1">
                      Signalé par : <strong>{ticket.requesterName}</strong> ({ticket.requesterRole}) · {ticket.station}
                    </div>
                  </div>

                  {ticket.lastReply && (
                    <div className="p-2.5 rounded-xl bg-white border border-[#DCE4EE] text-[11px] text-[#0E3A66]">
                      {ticket.lastReply}
                    </div>
                  )}

                  <div className="flex justify-end gap-2 pt-2 border-t border-[#DCE4EE]">
                    {ticket.status !== 'Résolu' && (
                      <>
                        <button
                          type="button"
                          onClick={() => setSelectedTicket(ticket)}
                          className="px-3 py-1.5 rounded-xl bg-[#08243F] text-white font-bold hover:bg-[#0E3A66] cursor-pointer"
                        >
                          Répondre à l'Agent
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResolveTicket(ticket.id)}
                          className="px-3 py-1.5 rounded-xl bg-[#1E8E5A] text-white font-bold hover:bg-[#156e45] cursor-pointer"
                        >
                          Clôturer Ticket
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 2: DIAGNOSTIC MATÉRIEL */}
      {activeTab === 'diagnostic' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4 text-xs">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Protocole de Diagnostic Distant des Valises Biométriques
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Vérification des périphériques certifiés ICAO et des batteries solaires déployées en brousse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <div className="flex items-center gap-2 text-[#08243F] font-bold">
                <Smartphone className="w-4 h-4 text-[#1E8E5A]" />
                <span>Scanner Décadactylaire</span>
              </div>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Test du capteur optique FAP 50, étalonnage de la détection de faux doigts (liveness detection) et nettoyage de la vitre.
              </p>
              <button
                type="button"
                onClick={() => alert('Autotest du scanner optique envoyé avec succès (Pass 100%).')}
                className="w-full py-1.5 rounded-xl bg-[#08243F] text-white font-bold text-[10px] cursor-pointer"
              >
                Tester Capteur
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <div className="flex items-center gap-2 text-[#08243F] font-bold">
                <BatteryCharging className="w-4 h-4 text-[#C9A227]" />
                <span>Gestionnaire d'Énergie Solaire</span>
              </div>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Surveillance de l'état de santé (SoH) des accumulateurs LiFePO4 et rendement des panneaux solaires pliables.
              </p>
              <button
                type="button"
                onClick={() => alert('Télémétrie batterie : Santé 94% · Autonomie résiduelle 18 heures.')}
                className="w-full py-1.5 rounded-xl bg-[#08243F] text-white font-bold text-[10px] cursor-pointer"
              >
                Lire Télémétrie
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <div className="flex items-center gap-2 text-[#08243F] font-bold">
                <Cpu className="w-4 h-4 text-[#0E3A66]" />
                <span>Module de Chiffrement Matériel (TPM)</span>
              </div>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Vérification du scellé d'intégrité de la puce cryptographique et des clés d'attestation de la station.
              </p>
              <button
                type="button"
                onClick={() => alert('Puce TPM certifiée FIPS 140-2 valide. Aucune altération physique détectée.')}
                className="w-full py-1.5 rounded-xl bg-[#08243F] text-white font-bold text-[10px] cursor-pointer"
              >
                Vérifier Scellé
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RÉINITIALISATION DES IDENTIFIANTS */}
      {activeTab === 'reset_credentials' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4 text-xs">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Procédure de Réinitialisation Sécurisée des Identifiants Agents
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Génération d'un mot de passe temporaire à usage unique avec obligation de renouvellement et vérification MFA.
            </p>
          </div>

          <form onSubmit={handleExecuteReset} className="max-w-md space-y-3">
            <div>
              <label className="font-bold text-[#08243F] block mb-1">
                Matricule ou Identifiant de l'Agent
              </label>
              <input
                type="text"
                required
                value={agentToReset}
                onChange={(e) => setAgentToReset(e.target.value)}
                placeholder="Ex : AGT-KIN-0041 ou mwamba.jean"
                className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB]"
              />
            </div>

            <div>
              <label className="font-bold text-[#08243F] block mb-1">
                Motif de la Réinitialisation & Accord Superviseur
              </label>
              <textarea
                required
                rows={2}
                value={resetReason}
                onChange={(e) => setResetReason(e.target.value)}
                placeholder="Ex : Mot de passe oublié après rotation mensuelle. Validé par le Superviseur Dr. Ilunga."
                className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB]"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#08243F] text-[#D9B84A] font-bold text-xs hover:bg-[#0E3A66] cursor-pointer"
            >
              Générer Code PIN Éphémère
            </button>
          </form>

          {generatedTempPin && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 max-w-md">
              <span className="font-bold block">PIN Temporaire Sécurisé (Valide 15 minutes) :</span>
              <div className="font-mono text-2xl font-black tracking-widest text-[#08243F] bg-white p-3 rounded-xl border border-emerald-300 text-center">
                {generatedTempPin}
              </div>
              <p className="text-[10px] text-emerald-800">
                Communiquez ce code verbalement à l'agent après vérification de son identité. Il devra définir un mot de passe fort dès sa première ouverture de session.
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: SYNCHRONISATION */}
      {activeTab === 'sync' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Moniteur de Synchronisation des Stations & Équipes Mobiles
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Surveillance de la transmission des données d'enrôlement vers le Datacenter National.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Ordre de synchronisation forcée transmis via réseau satellitaire.')}
              className="px-3.5 py-2 rounded-xl bg-[#08243F] text-white text-xs font-bold hover:bg-[#0E3A66] cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Forcer Synchro Satellitaire</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F6F8FB] text-[#08243F] uppercase font-mono font-bold border-y border-[#DCE4EE]">
                <tr>
                  <th className="py-3 px-4">Station / Mission</th>
                  <th className="py-3 px-4">Type de Liaison</th>
                  <th className="py-3 px-4">Dossiers en Attente</th>
                  <th className="py-3 px-4">Dernière Synchro</th>
                  <th className="py-3 px-4">Batterie Valise</th>
                  <th className="py-3 px-4 text-right">État</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEFF5]">
                {stationsSync.map((stn) => (
                  <tr key={stn.id} className="hover:bg-[#F6F8FB]/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#08243F]">{stn.stationName}</div>
                      <div className="text-[10px] text-gray-500">{stn.province}</div>
                    </td>
                    <td className="py-3 px-4 font-mono">{stn.connectivityType}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#0E3A66]">
                      {stn.pendingUploads} dossiers
                    </td>
                    <td className="py-3 px-4 font-mono text-gray-600">{stn.lastSyncAt}</td>
                    <td className="py-3 px-4 font-mono font-semibold">
                      <span className={stn.batteryLevel < 50 ? 'text-amber-600' : 'text-emerald-600'}>
                        {stn.batteryLevel}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          stn.status === 'Synchro OK'
                            ? 'bg-[#1E8E5A]/10 text-[#1E8E5A]'
                            : stn.status === 'Upload en attente'
                            ? 'bg-[#C77D0A]/10 text-[#C77D0A]'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {stn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Reply to Ticket */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-[#08243F] p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
              <h3 className="font-display font-extrabold text-base text-[#08243F]">
                Assistance Technique : {selectedTicket.ticketNumber}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-1">
              <div>Agent : <strong>{selectedTicket.requesterName}</strong></div>
              <div>Station : {selectedTicket.station}</div>
              <div className="font-bold text-[#08243F] mt-1">{selectedTicket.title}</div>
            </div>

            <form onSubmit={handleSendReply} className="space-y-3">
              <div>
                <label className="font-bold text-[#08243F] block mb-1">
                  Instructions ou Réponse de Dépannage
                </label>
                <textarea
                  required
                  rows={4}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Ex : Veuillez débrancher le câble USB bleu, patienter 10 secondes et relancer l’application CSU Mobile en mode administrateur..."
                  className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[#EAEFF5]">
                <button
                  type="button"
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#08243F] text-[#D9B84A] font-bold"
                >
                  Transmettre la Réponse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
