import React, { useState } from 'react';
import {
  Code,
  Key,
  Terminal,
  Webhook,
  BookOpen,
  Copy,
  Check,
  Play,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Layers,
  Send,
  Eye,
  EyeOff,
  Plus,
} from 'lucide-react';

interface ApiKeyItem {
  id: string;
  name: string;
  clientId: string;
  clientSecretMasked: string;
  environment: 'Sandbox' | 'Production (Certifiée)';
  scopes: string[];
  createdDate: string;
  status: 'Actif' | 'Révoqué';
}

interface WebhookEvent {
  id: string;
  eventType: 'csu.citizen.enrolled' | 'csu.benefit.disbursed' | 'csu.planb.certified';
  timestamp: string;
  targetUrl: string;
  httpStatus: number;
  latencyMs: number;
  payloadJson: string;
}

export const DeveloperIntegratorView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cles' | 'sandbox' | 'webhooks' | 'doc'>('sandbox');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // API Keys
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>([
    {
      id: 'KEY-01',
      name: 'Passerelle Maternité Gratuite (Ministère Santé)',
      clientId: 'csu_live_client_88190248',
      clientSecretMasked: 'sec_live_99f8a...b7c2',
      environment: 'Production (Certifiée)',
      scopes: ['csu:citizen:read', 'csu:maternity:verify'],
      createdDate: '12/08/2026',
      status: 'Actif',
    },
    {
      id: 'KEY-02',
      name: 'Intégration Switch Télécom (Airtel / Vodacom)',
      clientId: 'csu_sandbox_client_11029481',
      clientSecretMasked: 'sec_test_33a1e...f490',
      environment: 'Sandbox',
      scopes: ['csu:payout:disburse', 'csu:payout:status'],
      createdDate: '20/09/2026',
      status: 'Actif',
    },
  ]);

  // Sandbox Tester State
  const [endpointMethod, setEndpointMethod] = useState<'GET' | 'POST'>('GET');
  const [endpointPath, setEndpointPath] = useState('/api/v1/csu/verify/CSU-2026-9912-1044');
  const [requestBody, setRequestBody] = useState('{\n  "csuNumber": "CSU-2026-9912-1044",\n  "requireBiometricVerification": true\n}');
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);
  const [simulatedStatus, setSimulatedStatus] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Webhooks
  const [webhooks, setWebhooks] = useState<WebhookEvent[]>([
    {
      id: 'EVT-9901',
      eventType: 'csu.citizen.enrolled',
      timestamp: 'Aujourd’hui à 11:42:15',
      targetUrl: 'https://api.sante.gouv.cd/webhooks/csu',
      httpStatus: 200,
      latencyMs: 142,
      payloadJson: '{\n  "event": "csu.citizen.enrolled",\n  "csuNumber": "CSU-2026-9912-1044",\n  "commune": "Masina",\n  "householdSize": 6,\n  "pmtDecile": 2,\n  "timestamp": "2026-09-23T11:42:15Z"\n}',
    },
    {
      id: 'EVT-9902',
      eventType: 'csu.benefit.disbursed',
      timestamp: 'Aujourd’hui à 11:45:00',
      targetUrl: 'https://gateway.airtel.cd/csu/disbursed',
      httpStatus: 200,
      latencyMs: 98,
      payloadJson: '{\n  "event": "csu.benefit.disbursed",\n  "transactionRef": "AIR-TX-9981204",\n  "amountCDF": 75000,\n  "status": "SUCCESS"\n}',
    },
  ]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRunSimulation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (endpointPath.includes('CSU-2026-9912-1044')) {
        setSimulatedStatus(200);
        setSimulatedResponse(
          JSON.stringify(
            {
              status: 'SUCCESS',
              csuNumber: 'CSU-2026-9912-1044',
              certified: true,
              citizen: {
                fullName: 'Kasongo Ilunga Dieudonné',
                commune: 'Masina (Kinshasa)',
                vulnerabilityDecile: 2,
                pmtScore: 2.1,
                assignedPrograms: ['Filets Sociaux Monétaires d’Urgence'],
                biometricHash: 'SHA256:d8b2e1f9a0c74b99812e...',
              },
              serverNode: 'kin-dc1-prod-gateway-01',
              timestamp: new Date().toISOString(),
            },
            null,
            2
          )
        );
      } else {
        setSimulatedStatus(404);
        setSimulatedResponse(
          JSON.stringify(
            {
              status: 'NOT_FOUND',
              errorCode: 'CSU_RECORD_DOES_NOT_EXIST',
              message: 'Aucun enregistrement ne correspond à cet identifiant dans le Registre National.',
            },
            null,
            2
          )
        );
      }
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#08243F] text-white border border-[#14477E] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#D9B84A] bg-[#0A1B2A] px-2.5 py-0.5 rounded border border-[#C9A227]/30 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-[#D9B84A]" />
              PORTAIL DÉVELOPPEURS & INTÉGRATEURS API
            </span>
            <span className="text-xs text-[#DCE4EE]/70 font-mono">REST v2.4 (JSON-LD & OAuth2)</span>
          </div>
          <h2 className="font-display font-black text-2xl text-white mt-1">
            Environnement Technique d'Intégration & Sandbox
          </h2>
          <p className="text-xs text-[#DCE4EE]/80 max-w-3xl mt-1 leading-relaxed">
            Accès strictement délimité aux interfaces de programmation (APIs), simulateur de requêtes, génération de clés d'API sécurisées, surveillance des webhooks et documentation technique Swagger.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#doc"
            onClick={() => setActiveTab('doc')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-bold text-xs shadow-lg flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Spécification OpenAPI</span>
          </a>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            LATENCE MOYENNE PASSERELLE
          </span>
          <div className="font-display font-black text-2xl text-[#1E8E5A]">
            42 ms
          </div>
          <span className="text-xs text-[#1E8E5A] font-semibold">99.98% de requêtes &lt; 100ms</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            QUOTA DE REQUÊTES SANDBOX
          </span>
          <div className="font-display font-black text-2xl text-[#08243F]">
            100 000 / jour
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Consommation : 14.2%</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            CLÉS CLIENTES DÉLIVRÉES
          </span>
          <div className="font-display font-black text-2xl text-[#0E3A66]">
            {apiKeys.length} Actives
          </div>
          <span className="text-xs text-[#0A1B2A]/70">OAuth2 Bearer mTLS</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1">
          <span className="text-[10px] font-mono font-bold uppercase text-[#0A1B2A]/60">
            WEBHOOKS DISTRIBUÉS
          </span>
          <div className="font-display font-black text-2xl text-[#C9A227]">
            100% Succès (200 OK)
          </div>
          <span className="text-xs text-[#0A1B2A]/70">Zero échec de livraison</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DCE4EE] overflow-x-auto gap-2 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('sandbox')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'sandbox'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Simulateur & Sandbox d'API</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('cles')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'cles'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          <span>Gestion des Clés & Identifiants ({apiKeys.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('webhooks')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'webhooks'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <Webhook className="w-3.5 h-3.5" />
          <span>Webhooks & Événements en Direct ({webhooks.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('doc')}
          className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
            activeTab === 'doc'
              ? 'border-[#08243F] text-[#08243F] font-bold'
              : 'border-transparent text-[#0A1B2A]/60 hover:text-[#08243F]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Documentation OpenAPI v2.4</span>
        </button>
      </div>

      {/* TAB 1: SANDBOX SIMULATOR */}
      {activeTab === 'sandbox' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-5 text-xs">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Simulateur d'Appel API Souverain (Environnement Bac à Sable)
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Testez vos requêtes de vérification d'éligibilité et d'authentification CSU sans impacter la production.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                value={endpointMethod}
                onChange={(e) => setEndpointMethod(e.target.value as any)}
                className="p-2.5 rounded-xl border border-[#DCE4EE] bg-[#08243F] text-white font-mono font-bold"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>

              <input
                type="text"
                value={endpointPath}
                onChange={(e) => setEndpointPath(e.target.value)}
                className="flex-1 p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-mono text-xs font-semibold text-[#08243F]"
              />

              <button
                type="button"
                onClick={handleRunSimulation}
                disabled={isLoading}
                className="px-5 py-2.5 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-[#D9B84A] font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isLoading ? 'Exécution...' : 'Envoyer la Requête'}</span>
              </button>
            </div>

            {endpointMethod === 'POST' && (
              <div>
                <label className="font-bold text-[#08243F] block mb-1">Corps de Requête (JSON)</label>
                <textarea
                  rows={4}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#DCE4EE] font-mono text-xs bg-[#0A1B2A] text-[#DCE4EE]"
                />
              </div>
            )}
          </div>

          {/* Response Inspector */}
          {simulatedResponse && (
            <div className="p-4 rounded-2xl bg-[#0A1B2A] text-white space-y-2 font-mono">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#D9B84A]">Réponse du Serveur</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      simulatedStatus === 200 ? 'bg-[#1E8E5A] text-white' : 'bg-red-600 text-white'
                    }`}
                  >
                    HTTP {simulatedStatus}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(simulatedResponse, 'sim-resp')}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[10px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === 'sim-resp' ? <Check className="w-3 h-3 text-[#1E8E5A]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === 'sim-resp' ? 'Copié' : 'Copier JSON'}</span>
                </button>
              </div>

              <pre className="text-[11px] text-[#DCE4EE] overflow-x-auto p-2 bg-black/40 rounded-xl max-h-64">
                {simulatedResponse}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CLÉS & IDENTIFIANTS */}
      {activeTab === 'cles' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Identifiants d'Accès OAuth2 / Client Credentials
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Chaque clé est protégée par un certificat mTLS et soumise aux restrictions de scopes étatiques.
              </p>
            </div>
            <button
              type="button"
              onClick={() => alert('Génération d’une nouvelle paire de clés d’API autorisée.')}
              className="px-3.5 py-2 rounded-xl bg-[#08243F] text-white text-xs font-bold hover:bg-[#0E3A66] transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Générer Clé d'API</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {apiKeys.map((key) => (
              <div key={key.id} className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-[#08243F]">{key.name}</h4>
                    <span className="text-[10px] text-gray-500 font-mono">Créée le {key.createdDate}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      key.environment.includes('Production')
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {key.environment}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                  <div className="p-2.5 rounded-xl bg-white border border-[#DCE4EE] flex justify-between items-center">
                    <div>
                      <span className="text-[9px] text-gray-500 block">Client ID :</span>
                      <span className="font-bold text-[#0E3A66]">{key.clientId}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(key.clientId, `cid-${key.id}`)}
                      className="p-1 hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-[#DCE4EE] flex justify-between items-center">
                    <div>
                      <span className="text-[9px] text-gray-500 block">Client Secret (Masqué) :</span>
                      <span className="font-bold text-gray-700">{key.clientSecretMasked}</span>
                    </div>
                    <span className="text-[10px] text-[#1E8E5A] font-bold">HSM Valide</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-gray-500 font-medium">Scopes autorisés :</span>
                  {key.scopes.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-gray-200 font-mono text-[9px] text-gray-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WEBHOOKS */}
      {activeTab === 'webhooks' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Journal des Événements & Webhooks Distribués
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Notification en temps réel des changements d'état civils et des décaissements monétaires.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {webhooks.map((wh) => (
              <div key={wh.id} className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#08243F]">{wh.eventType}</span>
                    <span className="px-2 py-0.5 rounded bg-[#1E8E5A]/10 text-[#1E8E5A] font-bold text-[10px]">
                      HTTP {wh.httpStatus} ({wh.latencyMs}ms)
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500 font-mono">{wh.timestamp}</span>
                </div>

                <div className="font-mono text-[10px] text-gray-600">
                  URL de rappel : {wh.targetUrl}
                </div>

                <pre className="p-2.5 rounded-xl bg-[#0A1B2A] text-[#DCE4EE] font-mono text-[10px] overflow-x-auto">
                  {wh.payloadJson}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DOC OPENAPI */}
      {activeTab === 'doc' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4 text-xs">
          <div className="border-b border-[#EAEFF5] pb-3">
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Documentation Interactive OpenAPI v2.4 (CSU RDC)
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Spécifications standardisées pour les équipes techniques des ministères et des tiers accrédités.
            </p>
          </div>

          <div className="space-y-3 font-mono">
            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px]">GET</span>
                <span className="font-bold text-[#08243F]">/api/v1/csu/verify/&#123;csuNumber&#125;</span>
              </div>
              <p className="text-[11px] font-sans text-[#0A1B2A]/70">
                Vérifie l'existence et la certification républicaine d'un citoyen sans divulguer ses données biométriques complètes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#1E8E5A] text-white font-bold text-[10px]">POST</span>
                <span className="font-bold text-[#08243F]">/api/v1/benefits/check-eligibility</span>
              </div>
              <p className="text-[11px] font-sans text-[#0A1B2A]/70">
                Évalue en direct l'éligibilité d'un foyer à un programme social donné en fonction de son score de vulnérabilité.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#C9A227] text-[#08243F] font-bold text-[10px]">POST</span>
                <span className="font-bold text-[#08243F]">/api/v1/payout/mobile-money/notify</span>
              </div>
              <p className="text-[11px] font-sans text-[#0A1B2A]/70">
                Webhook de confirmation de versement utilisé par les opérateurs télécoms (M-Pesa, Orange, Airtel, Afrimoney).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
