import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Calendar,
  ShieldCheck,
  RefreshCw,
  Building2,
  Sparkles,
  Award,
} from 'lucide-react';
import { RoleType } from '../../types';

interface DashboardOverviewProps {
  roleType?: RoleType;
  title?: string;
  subtitle?: string;
  onNavigateToRecords?: () => void;
}

// 1. Operational Time Series: Cadastros bem-sucedidos por dia vs. Meta & Pendências
const DAILY_REGISTRATIONS_DATA = [
  { day: '10/09', sucessos: 22400, pendentes: 1820, meta: 20000 },
  { day: '11/09', sucessos: 24150, pendentes: 1640, meta: 20000 },
  { day: '12/09', sucessos: 23800, pendentes: 2100, meta: 22000 },
  { day: '13/09', sucessos: 26900, pendentes: 1950, meta: 22000 },
  { day: '14/09', sucessos: 19200, pendentes: 1200, meta: 18000 }, // Dimanche
  { day: '15/09', sucessos: 28400, pendentes: 2450, meta: 25000 },
  { day: '16/09', sucessos: 31200, pendentes: 2980, meta: 25000 },
  { day: '17/09', sucessos: 32850, pendentes: 3100, meta: 25000 },
  { day: '18/09', sucessos: 30400, pendentes: 2800, meta: 25000 },
  { day: '19/09', sucessos: 34100, pendentes: 3250, meta: 28000 },
  { day: '20/09', sucessos: 36780, pendentes: 3610, meta: 28000 },
  { day: '21/09', sucessos: 22300, pendentes: 1540, meta: 20000 },
  { day: '22/09', sucessos: 38900, pendentes: 3740, meta: 30000 },
  { day: '23/09', sucessos: 41250, pendentes: 3840, meta: 30000 },
];

// 2. Provincial Approvals & Inconsistencies
const PROVINCE_APPROVAL_DATA = [
  { province: 'Kinshasa', homologues: 142000, planB: 12400, rejetes: 2300 },
  { province: 'Haut-Katanga', homologues: 98500, planB: 8100, rejetes: 1650 },
  { province: 'Nord-Kivu', homologues: 84200, planB: 14800, rejetes: 2900 },
  { province: 'Kongo Central', homologues: 72400, planB: 6200, rejetes: 1100 },
  { province: 'Kasaï-Oriental', homologues: 61800, planB: 9400, rejetes: 1840 },
  { province: 'Tshopo', homologues: 49300, planB: 7100, rejetes: 1390 },
  { province: 'Sud-Kivu', homologues: 58200, planB: 10200, rejetes: 1980 },
];

// 3. Document Identification Mix
const DOCUMENT_TYPE_DISTRIBUTION = [
  { name: 'Carte d’Électeur CENI', value: 58, color: '#08243F' }, // Navy Deep
  { name: 'Plan B (Témoins Communautaires)', value: 21, color: '#C9A227' }, // Gold CSU
  { name: 'Acte de Naissance / Jugement', value: 12, color: '#14477E' }, // Blue Light
  { name: 'Passeport Biométrique', value: 6, color: '#D9B84A' }, // Bright Gold
  { name: 'Permis & Autres', value: 3, color: '#0A2E52' }, // Navy
];

// 4. Channel Efficiency & Operational Units
const CHANNEL_EFFICIENCY_DATA = [
  { canal: 'Stations Fixes', enroles: 184200, capacite: 200000, efficacite: 92 },
  { canal: 'Unités Mobiles 4x4', enroles: 68400, capacite: 75000, efficacite: 91 },
  { canal: 'Bateaux Fluviaux (Congo)', enroles: 32100, capacite: 35000, efficacite: 91 },
  { canal: 'Maternités Gratuites', enroles: 54900, capacite: 55000, efficacite: 99 },
  { canal: 'Centres de Santé Ruraux', enroles: 41800, capacite: 48000, efficacite: 87 },
];

// CSU Color Constants
const NAVY_MAIN = '#08243F';
const NAVY_LIGHT = '#0E3A66';
const GOLD_MAIN = '#C9A227';
const GOLD_LIGHT = '#E9CE7A';
const SUCCESS_GREEN = '#1E8E5A';
const WARNING_AMBER = '#C77D0A';
const ERROR_RED = '#C0392B';

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  roleType = 'gestor_nacional',
  title = 'Visão Geral Operacional do Painel (Dashboard Overview)',
  subtitle = 'Métricas consolidadas de cadastramento, taxa de aprovação, pendências e desempenho das estações em tempo real.',
  onNavigateToRecords,
}) => {
  const [timeRange, setTimeRange] = useState<'7d' | '14d' | '30d'>('14d');
  const [selectedProvinceFilter, setSelectedProvinceFilter] = useState('toutes');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  // Format numbers to Congolese French / European standard
  const fmt = (num: number) => new Intl.NumberFormat('fr-CD').format(num);

  // Custom Tooltip for Recharts styled with CSU Gold & Navy palette
  const CustomRechartsTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#08243F] text-white p-3.5 rounded-2xl shadow-2xl border-2 border-[#C9A227] text-xs space-y-1.5 z-50">
          <p className="font-mono font-bold text-[#D9B84A] border-b border-white/10 pb-1 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#D9B84A]" />
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 font-mono">
              <span className="flex items-center gap-1.5 text-white/80">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: entry.color || entry.stroke || entry.fill }}
                />
                {entry.name}:
              </span>
              <span className="font-bold text-white">{fmt(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner with Gold & Navy styling */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#08243F] via-[#0E3A66] to-[#14477E] text-white p-6 sm:p-8 shadow-xl border-2 border-[#C9A227]/30">
        {/* Decorative Gold Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#E9CE7A]/15 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-[#C9A227]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-[#C9A227] text-[#08243F] shadow-sm flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Painel Estratégico CSU
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/10 text-[#E9CE7A] border border-[#C9A227]/30">
                Loi 09/001 · Données Souveraines RDC
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-[#DCE4EE]/80 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Timeframe & Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-center">
            {/* Range Toggle */}
            <div className="bg-[#0A2E52] p-1 rounded-2xl border border-[#C9A227]/40 flex items-center gap-1 text-xs">
              <button
                onClick={() => setTimeRange('7d')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  timeRange === '7d'
                    ? 'bg-[#C9A227] text-[#08243F] shadow'
                    : 'text-[#DCE4EE] hover:text-white'
                }`}
              >
                7 Jours
              </button>
              <button
                onClick={() => setTimeRange('14d')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  timeRange === '14d'
                    ? 'bg-[#C9A227] text-[#08243F] shadow'
                    : 'text-[#DCE4EE] hover:text-white'
                }`}
              >
                14 Jours
              </button>
              <button
                onClick={() => setTimeRange('30d')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  timeRange === '30d'
                    ? 'bg-[#C9A227] text-[#08243F] shadow'
                    : 'text-[#DCE4EE] hover:text-white'
                }`}
              >
                30 Jours
              </button>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="p-2.5 rounded-2xl bg-[#0A2E52] hover:bg-[#14477E] border border-[#C9A227]/40 text-[#D9B84A] transition-all cursor-pointer shadow active:scale-95"
              title="Actualiser les métriques Recharts"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>

            {/* Export CSV Button */}
            <button
              onClick={() => {
                alert('Exportation des métriques stratégiques au format CSV certifié.');
              }}
              className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] hover:opacity-95 text-[#08243F] text-xs font-bold transition-all cursor-pointer shadow-lg flex items-center gap-1.5 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Exporter Rapport</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Top Metric KPI Cards (CSU Navy & Gold Palette) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Cadastros bem-sucedidos hoje */}
        <div className="p-5 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#08243F]/5 rounded-bl-full group-hover:bg-[#C9A227]/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A1B2A]/70">
              Cadastros com Sucesso (Hoje)
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#08243F] text-[#D9B84A] flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-[#08243F]">
                41 250
              </span>
              <span className="text-xs font-bold text-[#1E8E5A] bg-[#1E8E5A]/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +14.8%
              </span>
            </div>
            <p className="text-[11px] text-[#0A1B2A]/60">
              Record journalier atteint à 16h45 · Objectif: 30 000
            </p>
          </div>
        </div>

        {/* KPI 2: Aprovações Pendentes (Plan B & Revisão) */}
        <div className="p-5 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#C9A227]/5 rounded-bl-full group-hover:bg-[#C9A227]/15 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A1B2A]/70">
              Aprovações Pendentes (Plan B)
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#C9A227] text-[#08243F] flex items-center justify-center shadow-md">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-[#C77D0A]">
                3 840
              </span>
              <span className="text-xs font-semibold text-[#08243F] bg-[#C9A227]/20 px-2 py-0.5 rounded-full">
                En attente N2
              </span>
            </div>
            <p className="text-[11px] text-[#0A1B2A]/60">
              Délai moyen de résolution: 1.8 jour ouvré
            </p>
          </div>
        </div>

        {/* KPI 3: Total Nacional Homologado */}
        <div className="p-5 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#14477E]/5 rounded-bl-full group-hover:bg-[#14477E]/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A1B2A]/70">
              População CSU Registrada
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#14477E] text-white flex items-center justify-center shadow-md">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-[#08243F]">
                14,84 M
              </span>
              <span className="text-xs font-bold text-[#1E8E5A] bg-[#1E8E5A]/10 px-2 py-0.5 rounded-full">
                88.2% cible
              </span>
            </div>
            <p className="text-[11px] text-[#0A1B2A]/60">
              3 241 800 foyers certifiés biométriquement
            </p>
          </div>
        </div>

        {/* KPI 4: Taxa de Integridade e Conformidade */}
        <div className="p-5 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#1E8E5A]/5 rounded-bl-full group-hover:bg-[#1E8E5A]/10 transition-colors" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0A1B2A]/70">
              Taxa de Conformidade & Anti-Fraude
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#1E8E5A] text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-3xl text-[#1E8E5A]">
                98.7%
              </span>
              <span className="text-xs font-bold text-[#08243F] bg-gray-100 px-2 py-0.5 rounded-full">
                Zéro Doublon
              </span>
            </div>
            <p className="text-[11px] text-[#0A1B2A]/60">
              Certification cryptographique HSM active
            </p>
          </div>
        </div>
      </div>

      {/* 3. RECHARTS SECTION 1: Cadastros por Dia vs. Meta Diária (AreaChart + Gold Stroke) */}
      <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAEFF5] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#08243F]" />
              <h3 className="font-display font-bold text-lg text-[#08243F]">
                Cadastros Bem-Sucedidos por Dia vs. Meta Governamental
              </h3>
            </div>
            <p className="text-xs text-[#0A1B2A]/70 mt-0.5">
              Evolução diária dos registros biométricos validados e comparação com a meta operacional diária.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#08243F]" />
              <span className="text-[#0A1B2A]/70">Sucessos (Navy)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#C9A227]" />
              <span className="text-[#0A1B2A]/70">Pendentes (Gold)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-1 border-t-2 border-dashed border-[#E9CE7A]" />
              <span className="text-[#0A1B2A]/70">Meta (Dourado Claro)</span>
            </div>
          </div>
        </div>

        {/* Recharts Area & Line Chart */}
        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={DAILY_REGISTRATIONS_DATA}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSucessos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={NAVY_MAIN} stopOpacity={0.85} />
                  <stop offset="95%" stopColor={NAVY_LIGHT} stopOpacity={0.15} />
                </linearGradient>
                <linearGradient id="colorPendentes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={GOLD_MAIN} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={GOLD_LIGHT} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAEFF5" />
              <XAxis
                dataKey="day"
                tick={{ fill: '#0A1B2A', fontSize: 11, fontFamily: 'monospace' }}
                stroke="#DCE4EE"
              />
              <YAxis
                tick={{ fill: '#0A1B2A', fontSize: 11, fontFamily: 'monospace' }}
                stroke="#DCE4EE"
                tickFormatter={(val) => `${val / 1000}k`}
              />
              <Tooltip content={<CustomRechartsTooltip />} />
              <Area
                type="monotone"
                dataKey="sucessos"
                name="Cadastros com Sucesso"
                stroke={NAVY_MAIN}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSucessos)"
              />
              <Area
                type="monotone"
                dataKey="pendentes"
                name="Aprovações Pendentes"
                stroke={GOLD_MAIN}
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPendentes)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. RECHARTS SECTION 2: Grid with 2 Strategic Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Aprovações & Pendências por Província (BarChart) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EAEFF5] pb-3">
            <div>
              <h3 className="font-display font-bold text-base text-[#08243F] flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#C9A227]" />
                Aprovações Concluídas vs. Pendências por Província
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Comparativo regional de processos homologados, casos especiais Plan B e rejeições técnicas.
              </p>
            </div>

            <span className="text-[11px] font-mono text-[#08243F] font-bold bg-[#F6F8FB] px-2.5 py-1 rounded-xl border border-[#DCE4EE]">
              7 Províncias Prioritárias
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={PROVINCE_APPROVAL_DATA}
                margin={{ top: 10, right: 15, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#EAEFF5" />
                <XAxis
                  dataKey="province"
                  tick={{ fill: '#0A1B2A', fontSize: 10, fontFamily: 'monospace' }}
                  stroke="#DCE4EE"
                />
                <YAxis
                  tick={{ fill: '#0A1B2A', fontSize: 10, fontFamily: 'monospace' }}
                  stroke="#DCE4EE"
                  tickFormatter={(val) => `${val / 1000}k`}
                />
                <Tooltip content={<CustomRechartsTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
                  formatter={(value) => <span className="font-semibold text-[#08243F]">{value}</span>}
                />
                <Bar
                  dataKey="homologues"
                  name="Homologados (Sucesso)"
                  fill={NAVY_MAIN}
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="planB"
                  name="Pendentes / Plan B"
                  fill={GOLD_MAIN}
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="rejetes"
                  name="Inconsistências / Rejeitados"
                  fill={ERROR_RED}
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Distribuição por Tipo de Documento (Donut Chart Recharts) */}
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
              <h3 className="font-display font-bold text-base text-[#08243F]">
                Documentação Utilizada
              </h3>
              <span className="text-[10px] font-mono text-[#C9A227] font-bold uppercase bg-[#C9A227]/10 px-2 py-0.5 rounded-full">
                Mix Nacional
              </span>
            </div>
            <p className="text-xs text-[#0A1B2A]/70 mt-2">
              Distribuição percentual entre identificação padrão (CENI) e regularizações dérogatoires do Plan B.
            </p>
          </div>

          <div className="h-56 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DOCUMENT_TYPE_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {DOCUMENT_TYPE_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomRechartsTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-mono text-xl font-extrabold text-[#08243F]">100%</span>
              <span className="text-[9px] uppercase font-bold text-[#0A1B2A]/60">Biométrique</span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-1.5 text-xs">
            {DOCUMENT_TYPE_DISTRIBUTION.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#0A1B2A]/80 text-[11px]">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-mono font-bold text-[#08243F] text-[11px]">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. RECHARTS SECTION 3: Eficiência Operacional dos Canais e Unidades Móveis */}
      <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAEFF5] pb-3">
          <div>
            <h3 className="font-display font-bold text-base text-[#08243F]">
              Desempenho Operacional por Canal de Enrôlement
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Capacidade instalada vs. registros efetivos processados pelas estações físicas e unidades móveis.
            </p>
          </div>

          {onNavigateToRecords && (
            <button
              onClick={onNavigateToRecords}
              className="px-3 py-1.5 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-white text-xs font-semibold cursor-pointer transition-colors"
            >
              Ver Tabela de Registros →
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {CHANNEL_EFFICIENCY_DATA.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#08243F] truncate">{item.canal}</span>
                <span className="text-[11px] font-mono font-bold text-[#1E8E5A]">
                  {item.efficacite}%
                </span>
              </div>

              {/* Progress bar with Gold & Navy fill */}
              <div className="w-full bg-[#DCE4EE] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#08243F] via-[#0E3A66] to-[#C9A227]"
                  style={{ width: `${item.efficacite}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-[#0A1B2A]/70 pt-1">
                <span>{fmt(item.enroles)} enrôlés</span>
                <span>Cap. {fmt(item.capacite)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
