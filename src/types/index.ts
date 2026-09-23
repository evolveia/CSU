export type SupportedLang = 'FR' | 'LN' | 'SW' | 'KG' | 'TSH' | 'EN' | 'ES' | 'PT' | 'ZH';

export interface LangOption {
  code: SupportedLang;
  label: string;
  native: string;
  flag?: string;
}

export type AdminProfileId =
  | 'citoyen'
  | 'agente_n1'
  | 'agent_n1'
  | 'agente_n2'
  | 'agent_n2'
  | 'supervisor'
  | 'coordenador_municipal'
  | 'coord_muni'
  | 'coordenador_provincial'
  | 'coord_prov'
  | 'gestor_nacional'
  | 'gestor_nac'
  | 'administrador_sistema'
  | 'admin_sys'
  | 'oficial_protecao_dados'
  | 'dpo_priv'
  | 'auditor'
  | 'gestor_programas_sociais'
  | 'gestor_prog'
  | 'operador_beneficios'
  | 'op_beneficios'
  | 'integrador_dev'
  | 'dev_api'
  | 'suporte_tecnico'
  | 'suporte_tec';

export interface AdminProfileInfo {
  id: AdminProfileId;
  name?: string;
  role?: AdminProfileId;
  numericCode: number;
  title: string;
  portugueseTitle: string;
  roleBadge: string;
  destinationName: string;
  description: string;
  clearanceLevel: 'N1' | 'N2' | 'N3' | 'N4' | 'CONFIDENTIEL' | 'SECRET ÉTAT';
  scope: string;
}

export type AdminProfile = AdminProfileInfo;
export type RoleType = AdminProfileId;

export type StationQueueStatus = 'fluide' | 'modere' | 'charge';

export interface StationLocation {
  id: string;
  province: string;
  territory: string;
  commune: string;
  name: string;
  address: string;
  queueStatus: StationQueueStatus;
  waitMinutes: number;
  openHours: string;
  isMobileUnit: boolean;
  mobileNextStop?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface SocialProgram {
  id: string;
  title: string;
  category: string;
  description: string;
  beneficiariesCount: string;
  partnerMinistry: string;
  status: 'Actif' | 'En déploiement' | 'Prioritaire';
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  category: string;
  source: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}
