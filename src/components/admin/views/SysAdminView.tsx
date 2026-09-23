import React, { useState } from 'react';
import {
  Server,
  Cpu,
  HardDrive,
  Activity,
  ShieldCheck,
  ShieldAlert,
  Terminal,
  Database,
  Users,
  Settings2,
  RefreshCw,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lock,
  EyeOff,
  Eye,
  Download,
  Upload,
  Layers,
  FileCode,
  Flame,
} from 'lucide-react';

interface TechUser {
  id: string;
  username: string;
  name: string;
  role: 'DevOps' | 'Database Admin' | 'SecOps' | 'Site Reliability';
  sshKeyFingerprint: string;
  mfaStatus: 'Actif (YubiKey)' | 'Actif (TOTP)';
  lastLogin: string;
  status: 'Actif' | 'Verrouillé';
}

interface ServerNode {
  id: string;
  name: string;
  location: string;
  role: string;
  cpuUsage: number;
  ramUsage: number;
  diskUsage: number;
  status: 'Opérationnel' | 'Maintenance' | 'Alerte';
  uptime: string;
}

interface BackupSnapshot {
  id: string;
  filename: string;
  type: 'Complet (Froid)' | 'Différentiel (Chaud)' | 'Archive HSM';
  size: string;
  timestamp: string;
  checksumSHA256: string;
  status: 'Certifié' | 'En Cours' | 'Restauré';
}

interface PatchUpdate {
  id: string;
  cveCode: string;
  target: 'Linux Kernel' | 'PostgreSQL Engine' | 'Kubernetes Node' | 'HSM Firmware';
  severity: 'Critique' | 'Haute' | 'Moyenne';
  releaseDate: string;
  status: 'Déployé' | 'En attente fenêtre' | 'Test Staging validé';
}

export const SysAdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'infrastructure' | 'utilisateurs' | 'environnements' | 'sauvegardes' | 'patches' | 'logs'>('infrastructure');

  // Privileged Access Elevation state (to satisfy user restriction: "Não deve acessar dados pessoais sensíveis sem autorização e auditoria")
  const [elevationActive, setElevationActive] = useState(false);
  const [elevationReason, setElevationReason] = useState('');
  const [showElevationModal, setShowElevationModal] = useState(false);

  // Tech Users
  const [techUsers, setTechUsers] = useState<TechUser[]>([
    {
      id: 'USR-DEV-01',
      username: 'sysadmin.mukendi',
      name: 'Mukendi Tshitenge Patrick',
      role: 'Site Reliability',
      sshKeyFingerprint: 'SHA256:8yXv+9A2nKz938f...',
      mfaStatus: 'Actif (YubiKey)',
      lastLogin: 'Il y a 12 min (Kinshasa DC1)',
      status: 'Actif',
    },
    {
      id: 'USR-DEV-02',
      username: 'dba.mwamba',
      name: 'Mwamba Kabongo Jean-Luc',
      role: 'Database Admin',
      sshKeyFingerprint: 'SHA256:3kWp+2L0mQr819z...',
      mfaStatus: 'Actif (YubiKey)',
      lastLogin: 'Hier à 19:40',
      status: 'Actif',
    },
    {
      id: 'USR-DEV-03',
      username: 'sec.kanyinda',
      name: 'Kanyinda Bilonda Marie',
      role: 'SecOps',
      sshKeyFingerprint: 'SHA256:7mLo+4P1xTs631b...',
      mfaStatus: 'Actif (TOTP)',
      lastLogin: 'Il y a 2 heures',
      status: 'Actif',
    },
  ]);

  // Server Nodes
  const [serverNodes, setServerNodes] = useState<ServerNode[]>([
    {
      id: 'NODE-KIN-01',
      name: 'kin-dc1-prod-k8s-master-01',
      location: 'Kinshasa · Datacenter National d’État',
      role: 'Kubernetes Control Plane',
      cpuUsage: 34,
      ramUsage: 62,
      diskUsage: 45,
      status: 'Opérationnel',
      uptime: '184 jours',
    },
    {
      id: 'NODE-KIN-02',
      name: 'kin-dc1-prod-db-primary (Postgres 16)',
      location: 'Kinshasa · Datacenter National d’État',
      role: 'Base Relationnelle Souveraine',
      cpuUsage: 48,
      ramUsage: 78,
      diskUsage: 54,
      status: 'Opérationnel',
      uptime: '210 jours',
    },
    {
      id: 'NODE-HSM-01',
      name: 'kin-hsm-gemalto-sovereign-01',
      location: 'Kinshasa · Salle Forte Chiffrée',
      role: 'Module HSM Certifié FIPS 140-3',
      cpuUsage: 12,
      ramUsage: 22,
      diskUsage: 8,
      status: 'Opérationnel',
      uptime: '365 jours',
    },
    {
      id: 'NODE-GOM-01',
      name: 'goma-edge-sync-cache-01',
      location: 'Nord-Kivu · Relais Régional Goma',
      role: 'Cache Régional & Sync CDN',
      cpuUsage: 29,
      ramUsage: 51,
      diskUsage: 39,
      status: 'Opérationnel',
      uptime: '92 jours',
    },
  ]);

  // Backups
  const [backups, setBackups] = useState<BackupSnapshot[]>([
    {
      id: 'BKP-2026-0923-01',
      filename: 'csu_sovereign_db_full_20260923_040000.tar.zst.enc',
      type: 'Complet (Froid)',
      size: '142.8 GB',
      timestamp: '23/09/2026 04:00 (Kinshasa)',
      checksumSHA256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      status: 'Certifié',
    },
    {
      id: 'BKP-2026-0922-02',
      filename: 'csu_sovereign_db_diff_20260922_160000.tar.zst.enc',
      type: 'Différentiel (Chaud)',
      size: '14.2 GB',
      timestamp: '22/09/2026 16:00 (Kinshasa)',
      checksumSHA256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      status: 'Certifié',
    },
  ]);

  // Patches
  const [patches, setPatches] = useState<PatchUpdate[]>([
    {
      id: 'PTC-01',
      cveCode: 'CVE-2026-28190',
      target: 'Linux Kernel',
      severity: 'Critique',
      releaseDate: '18/09/2026',
      status: 'Déployé',
    },
    {
      id: 'PTC-02',
      cveCode: 'CVE-2026-1104',
      target: 'PostgreSQL Engine',
      severity: 'Haute',
      releaseDate: '20/09/2026',
      status: 'Test Staging validé',
    },
    {
      id: 'PTC-03',
      cveCode: 'FIRM-HSM-v4.9',
      target: 'HSM Firmware',
      severity: 'Critique',
      releaseDate: '21/09/2026',
      status: 'En attente fenêtre',
    },
  ]);

  // Active Environment
  const [currentEnv, setCurrentEnv] = useState<'production' | 'staging' | 'sandbox'>('production');

  // Logs stream
  const [logs, setLogs] = useState([
    '[2026-09-23T15:02:11Z] [AUDIT-SYS] SysAdmin Mukendi authentifié via Clé FIDO2 HSM-KIN-01',
    '[2026-09-23T15:02:14Z] [K8S-INGRESS] Ingress Gateway acceptant 18 420 req/sec · Latence moyenne : 41ms',
    '[2026-09-23T15:02:18Z] [PG-REPLICATION] Replica lag avec nœud Lubumbashi : 14ms (En sync stricte)',
    '[2026-09-23T15:02:22Z] [ENCRYPTION] Clés de session AES-256-GCM régénérées avec succès par le module HSM',
    '[2026-09-23T15:02:29Z] [PRIVACY-ENFORCER] Restriction Art. 24 activée : les données civiles restent masquées dans la console technique',
  ]);

  const handleElevateAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!elevationReason.trim()) return;
    setElevationActive(true);
    setShowElevationModal(false);
    setLogs([
      `[${new Date().toISOString()}] [ALERTE AUDIT] ÉLÉVATION TEMPORAIRE DE PRIVILÈGES ACCORDÉE. Motif : "${elevationReason}". Journalisé et notifié au DPO et à l'Auditeur Général.`,
      ...logs,
    ]);
  };

  const handleRevokeElevation = () => {
    setElevationActive(false);
    setElevationReason('');
    setLogs([
      `[${new Date().toISOString()}] [AUDIT] Fin d'élévation de privilèges. Données personnelles à nouveau masquées automatiquement.`,
      ...logs,
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#08243F] text-white border border-[#14477E] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1E8E5A] bg-[#0A1B2A] px-2.5 py-0.5 rounded border border-[#1E8E5A]/40 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#1E8E5A] animate-pulse" />
              INFRASTRUCTURE CENTRALE OPÉRATIONNELLE
            </span>
            <span className="text-xs text-[#DCE4EE]/70 font-mono">SLA 99.98% · RDC 2026</span>
          </div>
          <h2 className="font-display font-black text-2xl text-white mt-1">
            Console de l'Administrateur Système (SysAdmin)
          </h2>
          <p className="text-xs text-[#DCE4EE]/80 max-w-3xl mt-1 leading-relaxed">
            Supervision technique de l'infrastructure de serveurs, des conteneurs Kubernetes, des modules HSM de signature, des sauvegardes immuables et de la maintenance logicielle.
          </p>
        </div>

        {/* Sensitive Data Protection Badge & Elevation */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-[#0A1B2A]/80 p-3 rounded-2xl border border-white/10 text-xs">
          <div className="flex items-center gap-2">
            {elevationActive ? (
              <ShieldAlert className="w-5 h-5 text-[#C0392B]" />
            ) : (
              <EyeOff className="w-5 h-5 text-[#D9B84A]" />
            )}
            <div>
              <span className="font-bold text-white block">
                {elevationActive ? 'Accès Démasqué (Audit Actif)' : 'Données Civiles Masquées'}
              </span>
              <span className="text-[10px] text-[#DCE4EE]/70">
                {elevationActive ? 'Chaque lecture est consignée' : 'Art. 24 Protection de la Vie Privée'}
              </span>
            </div>
          </div>

          {elevationActive ? (
            <button
              type="button"
              onClick={handleRevokeElevation}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs cursor-pointer"
            >
              Re-masquer
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowElevationModal(true)}
              className="px-3 py-1.5 rounded-xl bg-[#C9A227] hover:bg-[#d8b030] text-[#08243F] font-bold text-xs cursor-pointer"
            >
              Demander Accès Audit
            </button>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            CLUSTER KUBERNETES SOUVERAIN
          </span>
          <div className="font-display font-black text-2xl text-[#1E8E5A]">
            16 / 16 Pods Sains
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Zero restart inattendu</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            CHARGE CPU MOYENNE CLUSTER
          </span>
          <div className="font-display font-black text-2xl text-[#08243F]">
            28.4%
          </div>
          <span className="text-xs text-[#1E8E5A] font-semibold">Capacité résiduelle 71.6%</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            DERNIÈRE SAUVEGARDE CHAUDE
          </span>
          <div className="font-display font-black text-2xl text-[#0E3A66]">
            Il y a 2h (SHA-256)
          </div>
          <span className="text-xs text-[#1E8E5A] font-semibold">Chiffrement AES-256 Validé</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            SÉCURITÉ & PATCHES CVE
          </span>
          <div className="font-display font-black text-2xl text-[#C9A227]">
            1 En Attente
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Fenêtre de nuit programmée</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DCE4EE] overflow-x-auto gap-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('infrastructure')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'infrastructure'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Server className="w-3.5 h-3.5" />
          <span>Nœuds & Infrastructure ({serverNodes.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('utilisateurs')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'utilisateurs'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Utilisateurs Techniques ({techUsers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('environnements')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'environnements'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Environnements (Prod / Staging / Dev)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('sauvegardes')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'sauvegardes'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <HardDrive className="w-3.5 h-3.5" />
          <span>Sauvegardes & Restauration ({backups.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('patches')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'patches'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Patches & Sécurité ({patches.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logs')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'logs'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Logs Techniques en Direct</span>
        </button>
      </div>

      {/* TAB 1: INFRASTRUCTURE & NODES */}
      {activeTab === 'infrastructure' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Inventaire des Nœuds Souverains & Modules Cryptographiques
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Serveurs hébergés physiquement sur le territoire de la RDC sous protocole de haute sécurité.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Vérification de la santé de tous les nœuds terminée : 100% opérationnels.')}
              className="px-3.5 py-2 rounded-xl bg-[#08243F] text-white text-xs font-bold hover:bg-[#0E3A66] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tester Connectivité Globale</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serverNodes.map((node) => (
              <div key={node.id} className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-mono font-bold text-xs text-[#08243F]">{node.name}</h4>
                    <span className="text-[10px] text-[#0A1B2A]/60 block">{node.location}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                    {node.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Utilisation CPU :</span>
                      <span className="font-mono font-bold">{node.cpuUsage}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full bg-[#08243F] rounded-full" style={{ width: `${node.cpuUsage}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Mémoire RAM :</span>
                      <span className="font-mono font-bold">{node.ramUsage}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full bg-[#C9A227] rounded-full" style={{ width: `${node.ramUsage}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Disque NVMe Chiffré :</span>
                      <span className="font-mono font-bold">{node.diskUsage}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                      <div className="h-full bg-[#1E8E5A] rounded-full" style={{ width: `${node.diskUsage}%` }} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#DCE4EE] text-[10px] text-[#0A1B2A]/60 font-mono">
                  <span>Rôle : {node.role}</span>
                  <span>Uptime : {node.uptime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: UTILISATEURS TECHNIQUES */}
      {activeTab === 'utilisateurs' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Gestion des Comptes Techniques & Accès SSH/MFA
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Seuls les ingénieurs habilités au niveau SECRET ÉTAT disposent d'un accès aux consoles de bas niveau.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Génération d’une nouvelle invitation avec empreinte de clé publique autorisée.')}
              className="px-3.5 py-2 rounded-xl bg-[#08243F] text-white text-xs font-bold hover:bg-[#0E3A66] transition-colors cursor-pointer"
            >
              Ajouter Ingénieur Tech
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#F6F8FB] text-[#08243F] uppercase font-mono font-bold border-y border-[#DCE4EE]">
                <tr>
                  <th className="py-3 px-4">Identifiant / Nom</th>
                  <th className="py-3 px-4">Rôle Technique</th>
                  <th className="py-3 px-4">Empreinte Clé SSH</th>
                  <th className="py-3 px-4">MFA Obligatoire</th>
                  <th className="py-3 px-4">Dernière Connexion</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEFF5]">
                {techUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[#F6F8FB]/60 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-[#0E3A66]">{u.username}</div>
                      <div className="text-[11px] text-[#0A1B2A]/70">{u.name}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold">{u.role}</td>
                    <td className="py-3 px-4 font-mono text-[10px] text-gray-500">{u.sshKeyFingerprint}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                        {u.mfaStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] text-gray-600">{u.lastLogin}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => alert(`Révocation de clé déclenchée pour ${u.username}`)}
                        className="px-2.5 py-1 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-[11px] font-semibold cursor-pointer"
                      >
                        Révoquer Clé
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ENVIRONNEMENTS */}
      {activeTab === 'environnements' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Isolation des Environnements (Dev / Staging / Prod)
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Contrôle strict des variables d'environnement, clés d'API et commutateurs de déploiement continu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div
              onClick={() => setCurrentEnv('production')}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                currentEnv === 'production'
                  ? 'border-[#08243F] bg-[#08243F]/5'
                  : 'border-[#DCE4EE] bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-[#08243F]">Production Souveraine</span>
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold text-[10px]">
                  LIVE · RESTRICTED
                </span>
              </div>
              <p className="text-[11px] text-[#0A1B2A]/70 mb-3">
                Serveurs HSM en haute disponibilité. Données réelles des 26 provinces de la RDC.
              </p>
              <div className="font-mono text-[10px] text-gray-500 space-y-1">
                <div>URL : api.csu.gouv.cd</div>
                <div>BDD : 14.8M d'enregistrements</div>
                <div>Isolation : Air-Gap partiel</div>
              </div>
            </div>

            <div
              onClick={() => setCurrentEnv('staging')}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                currentEnv === 'staging'
                  ? 'border-[#08243F] bg-[#08243F]/5'
                  : 'border-[#DCE4EE] bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-[#08243F]">Pré-Production (Staging)</span>
                <span className="px-2 py-0.5 rounded-full bg-[#C9A227]/20 text-[#08243F] font-bold text-[10px]">
                  RECETTE
                </span>
              </div>
              <p className="text-[11px] text-[#0A1B2A]/70 mb-3">
                Environnement de validation avec données synthétiques et simulation de charge massive.
              </p>
              <div className="font-mono text-[10px] text-gray-500 space-y-1">
                <div>URL : staging.csu.gouv.cd</div>
                <div>BDD : Données anonymisées</div>
                <div>Sync : Miroir hebdomadaire</div>
              </div>
            </div>

            <div
              onClick={() => setCurrentEnv('sandbox')}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                currentEnv === 'sandbox'
                  ? 'border-[#08243F] bg-[#08243F]/5'
                  : 'border-[#DCE4EE] bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm text-[#08243F]">Bac à Sable (Sandbox)</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px]">
                  DEV OPEN
                </span>
              </div>
              <p className="text-[11px] text-[#0A1B2A]/70 mb-3">
                Dédié aux développeurs d'APIs des ministères et intégrateurs télécoms.
              </p>
              <div className="font-mono text-[10px] text-gray-500 space-y-1">
                <div>URL : sandbox.api.csu.gouv.cd</div>
                <div>BDD : 100% Mock / Fictif</div>
                <div>Rate-limit : 50 req/sec</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SAUVEGARDES */}
      {activeTab === 'sauvegardes' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Plan de Continuité d'Activité & Sauvegardes Immuables
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Chaque snapshot est scellé avec SHA-256 et répliqué dans deux datacenters physiquement distincts.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Snapshot complet à froid déclenché sur le cluster Kinshasa.')}
              className="px-3.5 py-2 rounded-xl bg-[#08243F] text-[#D9B84A] text-xs font-bold hover:bg-[#0E3A66] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Déclencher Snapshot Immédiat</span>
            </button>
          </div>

          <div className="space-y-3">
            {backups.map((bkp) => (
              <div
                key={bkp.id}
                className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#08243F]">{bkp.filename}</span>
                    <span className="px-2 py-0.5 rounded bg-gray-200 font-mono text-[9px] font-bold">
                      {bkp.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#0A1B2A]/70">
                    Taille : <strong>{bkp.size}</strong> · Date : {bkp.timestamp}
                  </div>
                  <div className="font-mono text-[9px] text-gray-500">
                    SHA-256 : {bkp.checksumSHA256}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                    {bkp.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => alert(`Test d'intégrité validé pour ${bkp.filename}`)}
                    className="px-3 py-1.5 rounded-xl border border-[#DCE4EE] bg-white hover:bg-gray-100 font-bold text-xs cursor-pointer"
                  >
                    Tester Intégrité
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PATCHES */}
      {activeTab === 'patches' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Gestion des Vulnérabilités & Patches de Sécurité
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Déploiement ordonné des correctifs pour garantir la conformité contre les attaques étatiques et ransomware.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {patches.map((patch) => (
              <div
                key={patch.id}
                className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#08243F]">{patch.cveCode}</span>
                    <span className="px-2 py-0.5 rounded bg-[#08243F] text-white font-mono text-[9px]">
                      {patch.target}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                        patch.severity === 'Critique' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {patch.severity}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#0A1B2A]/60 block mt-1">
                    Date de publication : {patch.releaseDate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                      patch.status === 'Déployé'
                        ? 'bg-[#1E8E5A]/10 text-[#1E8E5A]'
                        : patch.status === 'Test Staging validé'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-[#C77D0A]/10 text-[#C77D0A]'
                    }`}
                  >
                    {patch.status}
                  </span>
                  {patch.status !== 'Déployé' && (
                    <button
                      type="button"
                      onClick={() => alert(`Déploiement du patch ${patch.cveCode} planifié pour 02:00 UTC.`)}
                      className="px-3 py-1.5 rounded-xl bg-[#08243F] text-white font-bold text-xs hover:bg-[#0E3A66] cursor-pointer"
                    >
                      Appliquer Patch
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: LOGS TECHNIQUES */}
      {activeTab === 'logs' && (
        <div className="p-6 rounded-3xl bg-[#0A1B2A] text-white border border-[#14477E] shadow-xl space-y-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#1E8E5A]" />
              <span className="font-bold text-sm text-[#D9B84A]">Flux Syslog & Traçabilité Noyau</span>
            </div>
            <button
              type="button"
              onClick={() =>
                setLogs([`[${new Date().toISOString()}] [PING] Healthcheck probe envoyé à tous les clusters`, ...logs])
              }
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold cursor-pointer"
            >
              Envoyer Probe
            </button>
          </div>

          <div className="space-y-1.5 max-h-80 overflow-y-auto pr-2">
            {logs.map((log, idx) => (
              <div key={idx} className="p-2 rounded bg-black/40 text-[11px] leading-relaxed text-[#DCE4EE]">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Elevated Access Request (Privacy Restriction) */}
      {showElevationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-red-500 p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 text-red-600 font-bold">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-display font-extrabold text-base text-[#08243F]">
                  Demande d'Élévation Privilégiée d'Accès
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowElevationModal(false)}
                className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 space-y-1 text-[11px]">
              <strong>AVERTISSEMENT LÉGAL STRICT (Loi n° 09/001 - RDC) :</strong>
              <p>
                L'Administrateur Système n'a pas vocation à consulter les données personnelles sensibles (noms, filiation, numéros de téléphone). Tout démasquage temporaire requiert un motif légitime et sera instantanément transmis au DPO et à la Cour des Comptes.
              </p>
            </div>

            <form onSubmit={handleElevateAccess} className="space-y-3">
              <div>
                <label className="font-bold text-[#08243F] block mb-1">
                  Motif Technique & Référence du Ticket
                </label>
                <textarea
                  required
                  rows={3}
                  value={elevationReason}
                  onChange={(e) => setElevationReason(e.target.value)}
                  placeholder="Ex : Résolution anomalie d'encodage UTF-8 signalée sur le guichet Kalamu 02 (Ticket #8849)"
                  className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowElevationModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold"
                >
                  Activer Démasquage Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
