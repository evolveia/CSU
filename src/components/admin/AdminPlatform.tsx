import React, { useState, useRef, useEffect, useMemo } from 'react';
import { RoleType, SupportedLang } from '../../types';
import { LANGUAGES } from '../../i18n/translations';
import { translateText } from '../../i18n/translationEngine';
import { CsuLogo } from '../brand/CsuLogo';
import { CsuInteractiveMap } from '../common/CsuInteractiveMap';
import { MOCK_STATIONS } from '../../services/stationsService';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  UserCheck,
  FolderCheck,
  AlertTriangle,
  MapPin,
  Map as MapIcon,
  BarChart3,
  FileText,
  Printer,
  Download,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
  Bell,
  MessageSquare,
  Send,
  Settings,
  Wifi,
  WifiOff,
  RefreshCw,
  Clock,
  Shield,
  ShieldAlert,
  ShieldCheck,
  QrCode,
  Camera,
  Save,
  CheckCircle2,
  Building,
  Layers,
  Sparkles,
  HelpCircle,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle,
  Upload,
  UserX,
  Phone,
  Home,
  Briefcase,
  Server,
  KeyRound,
  FileCheck,
  Code,
  LifeBuoy,
  CreditCard,
  Globe,
} from 'lucide-react';
import { NationalManagerView } from './views/NationalManagerView';
import { SysAdminView } from './views/SysAdminView';
import { DpoPrivacyView } from './views/DpoPrivacyView';
import { AuditorView } from './views/AuditorView';
import { SocialProgramsView } from './views/SocialProgramsView';
import { BenefitsOperatorView } from './views/BenefitsOperatorView';
import { DeveloperIntegratorView } from './views/DeveloperIntegratorView';
import { TechSupportView } from './views/TechSupportView';
import { DashboardOverview } from './DashboardOverview';

interface CitizenRecord {
  id: string;
  csuNumber: string;
  fullName: string;
  birthDate: string;
  gender: 'M' | 'F';
  documentType: string;
  documentNumber: string;
  phone: string;
  address: string;
  commune: string;
  province: string;
  householdSize: number;
  vulnerabilityDecile: number;
  assignedProgram: string;
  status: 'Certifié' | 'En attente' | 'Rejeté' | 'Plan B (Témoins)' | 'Rascunho';
  registeredBy: string;
  station: string;
  registeredAt: string;
  hasPhoto: boolean;
  hasBiometrics: boolean;
  photoUrl?: string;
  gpsCoords: { lat: number; lng: number };
}

interface AdminPlatformProps {
  roleType: RoleType;
  roleTitle: string;
  roleBadge: string;
  currentLang?: SupportedLang;
  onLanguageChange?: (lang: SupportedLang) => void;
  onLogout: () => void;
  onNavigateHome: () => void;
}

type AdminModule =
  | 'dashboard'
  | 'cadastros'
  | 'atendimento'
  | 'validacao'
  | 'equipe'
  | 'mapa'
  | 'metas_fraude'
  | 'relatorios'
  | 'mensagens'
  | 'configuracoes'
  | 'gestor_nacional'
  | 'sys_admin'
  | 'dpo_privacy'
  | 'auditoria'
  | 'programas_sociais'
  | 'operador_beneficios'
  | 'dev_integrador'
  | 'suporte_tecnico';

export const AdminPlatform: React.FC<AdminPlatformProps> = ({
  roleType,
  roleTitle,
  roleBadge,
  currentLang = 'FR',
  onLanguageChange,
  onLogout,
  onNavigateHome,
}) => {
  // Language dropdown in admin header
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Sidebar expand / collapse state
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Active module initialized based on role
  const getDefaultModuleForRole = (role: RoleType): AdminModule => {
    switch (role) {
      case 'gestor_nacional':
      case 'gestor_nac':
        return 'gestor_nacional';
      case 'administrador_sistema':
      case 'admin_sys':
        return 'sys_admin';
      case 'oficial_protecao_dados':
      case 'dpo_priv':
        return 'dpo_privacy';
      case 'auditor':
        return 'auditoria';
      case 'gestor_programas_sociais':
      case 'gestor_prog':
        return 'programas_sociais';
      case 'operador_beneficios':
      case 'op_beneficios':
        return 'operador_beneficios';
      case 'integrador_dev':
      case 'dev_api':
        return 'dev_integrador';
      case 'suporte_tecnico':
      case 'suporte_tec':
        return 'suporte_tecnico';
      default:
        return 'dashboard';
    }
  };

  const [activeModule, setActiveModule] = useState<AdminModule>(getDefaultModuleForRole(roleType));

  // Sync active module when role changes in demo mode
  useEffect(() => {
    setActiveModule(getDefaultModuleForRole(roleType));
  }, [roleType]);

  // Dashboard Tab state: Analytics (Recharts) vs Operations
  const [dashboardTab, setDashboardTab] = useState<'analytics' | 'operations'>('analytics');

  // Offline Mode & Local Queue State
  const [isOffline, setIsOffline] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  // Attendance session state (N1, N2, Supervisor)
  const [isSessionOpen, setIsSessionOpen] = useState(true);
  const [activeDesk, setActiveDesk] = useState('Guichet 03');
  const [currentTicket, setCurrentTicket] = useState('A-042');
  const [queueCount, setQueueCount] = useState(8);

  // Database of Citizen Records (State for full CRUD)
  const [records, setRecords] = useState<CitizenRecord[]>([
    {
      id: 'REC-001',
      csuNumber: 'CSU-2026-9941-8412',
      fullName: 'Mbiya Tshilombo Esther',
      birthDate: '12/04/1988',
      gender: 'F',
      documentType: 'CENI',
      documentNumber: 'CENI-2023-88410294',
      phone: '+243 998 123 456',
      address: "Av. de l'Université n° 142, Matonge",
      commune: 'Kalamu',
      province: 'Kinshasa',
      householdSize: 4,
      vulnerabilityDecile: 2,
      assignedProgram: 'Filet Social & Maternité',
      status: 'Certifié',
      registeredBy: 'Agent N1 · M. Kabamba',
      station: 'Station Citoyenneté Kalamu Centre',
      registeredAt: '15/01/2026 10:14',
      hasPhoto: true,
      hasBiometrics: true,
      gpsCoords: { lat: -4.3312, lng: 15.3129 },
    },
    {
      id: 'REC-002',
      csuNumber: 'CSU-2026-8841-3910',
      fullName: 'Mbuyi Kalonji Chantal',
      birthDate: '23/09/1992',
      gender: 'F',
      documentType: 'Plan B (Témoins)',
      documentNumber: 'DEROG-2026-0041',
      phone: '+243 812 345 678',
      address: 'Avenue Kasa-Vubu n° 88',
      commune: 'Kalamu',
      province: 'Kinshasa',
      householdSize: 6,
      vulnerabilityDecile: 1,
      assignedProgram: 'Filet Social Direct',
      status: 'Plan B (Témoins)',
      registeredBy: 'Agent N2 · S. Mwamba',
      station: 'Station Citoyenneté Kalamu Centre',
      registeredAt: '18/02/2026 14:30',
      hasPhoto: true,
      hasBiometrics: true,
      gpsCoords: { lat: -4.341, lng: 15.305 },
    },
    {
      id: 'REC-003',
      csuNumber: 'CSU-2026-7731-8902',
      fullName: 'Balume Safari Emmanuel',
      birthDate: '05/11/1985',
      gender: 'M',
      documentType: 'Carte Réfugié / Déplacé',
      documentNumber: 'CNR-2024-11029',
      phone: '+243 971 889 012',
      address: 'Quartier Himbi, Av. du Lac',
      commune: 'Goma',
      province: 'Nord-Kivu',
      householdSize: 5,
      vulnerabilityDecile: 1,
      assignedProgram: 'Assistance Déplacés & Vivres',
      status: 'En attente',
      registeredBy: 'Unité Mobile Kit Solaire 02',
      station: 'Poste Avancé Nord-Kivu',
      registeredAt: '02/03/2026 09:15',
      hasPhoto: true,
      hasBiometrics: false,
      gpsCoords: { lat: -1.679, lng: 29.228 },
    },
    {
      id: 'REC-004',
      csuNumber: 'CSU-2026-6621-9041',
      fullName: 'Ilunga Ngoie Dieudonné',
      birthDate: '19/07/1979',
      gender: 'M',
      documentType: 'CENI',
      documentNumber: 'CENI-2023-77218930',
      phone: '+243 854 991 200',
      address: 'Route Kipushi, Commune Ruashi',
      commune: 'Lubumbashi',
      province: 'Haut-Katanga',
      householdSize: 3,
      vulnerabilityDecile: 3,
      assignedProgram: 'Bourses Scolaires & Cantines',
      status: 'Certifié',
      registeredBy: 'Agent N1 · P. Kalala',
      station: 'Station Citoyenneté Lubumbashi',
      registeredAt: '20/02/2026 11:20',
      hasPhoto: true,
      hasBiometrics: true,
      gpsCoords: { lat: -11.66, lng: 27.48 },
    },
    {
      id: 'REC-005',
      csuNumber: 'CSU-2026-5510-1849',
      fullName: 'Nzuzi Matondo Pascaline',
      birthDate: '30/01/1995',
      gender: 'F',
      documentType: 'Permis de Conduire',
      documentNumber: 'PC-2022-90148',
      phone: '+243 900 112 334',
      address: 'Quartier 1, Masina',
      commune: 'Masina',
      province: 'Kinshasa',
      householdSize: 7,
      vulnerabilityDecile: 2,
      assignedProgram: 'Filet Social Direct',
      status: 'Rejeté',
      registeredBy: 'Agent N1 · M. Kabamba',
      station: 'Station Citoyenneté Masina',
      registeredAt: '05/03/2026 16:40',
      hasPhoto: false,
      hasBiometrics: false,
      gpsCoords: { lat: -4.382, lng: 15.395 },
    },
  ]);

  // Search & Filter state for records
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [provinceFilter, setProvinceFilter] = useState('Toutes');

  // Modals state for CRUD
  const [viewingRecord, setViewingRecord] = useState<CitizenRecord | null>(null);
  const [editingRecord, setEditingRecord] = useState<CitizenRecord | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<CitizenRecord | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [printReceiptRecord, setPrintReceiptRecord] = useState<CitizenRecord | null>(null);

  // New Record Form State (Multi-step wizard)
  const [newStep, setNewStep] = useState(1);
  const [newFullName, setNewFullName] = useState('');
  const [newBirthDate, setNewBirthDate] = useState('');
  const [newGender, setNewGender] = useState<'M' | 'F'>('F');
  const [newDocType, setNewDocType] = useState('CENI');
  const [newDocNumber, setNewDocNumber] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newCommune, setNewCommune] = useState('Kalamu');
  const [newHouseholdSize, setNewHouseholdSize] = useState(4);
  const [newProgram, setNewProgram] = useState('Filet Social & Maternité');
  const [newPhoto, setNewPhoto] = useState<string | null>(null);
  const [newBiometricsTaken, setNewBiometricsTaken] = useState(false);

  // Camera integration for new registration
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Team / Operators Management State (Supervisor / Coordenadores)
  const [agentsList, setAgentsList] = useState([
    {
      id: 'AGT-01',
      name: 'Kabamba Tshilenge Marc',
      role: 'Agente N1',
      desk: 'Guichet 01',
      status: 'Actif',
      todayCount: 24,
      avgMinutes: 10,
    },
    {
      id: 'AGT-02',
      name: 'Mwamba Sando Sophie',
      role: 'Agente N2 (Sénior)',
      desk: 'Bancada de Regularização',
      status: 'Actif',
      todayCount: 14,
      avgMinutes: 18,
    },
    {
      id: 'AGT-03',
      name: 'Lulua Kalonji David',
      role: 'Agente N1',
      desk: 'Guichet 02',
      status: 'En Pause',
      todayCount: 19,
      avgMinutes: 12,
    },
    {
      id: 'AGT-04',
      name: 'Banyere Furaha Jeanne',
      role: 'Agente N1 (Photo & Kit)',
      desk: 'Guichet 03',
      status: 'Actif',
      todayCount: 28,
      avgMinutes: 9,
    },
  ]);

  // Internal Messages / Broadcasts State
  const [broadcastMessages, setBroadcastMessages] = useState([
    {
      id: 1,
      from: 'Coordination Provinciale Kinshasa',
      title: 'Priorité Campagne Maternité Gratuite Kalamu',
      content: 'Veuillez accorder une priorité aux déclarations de femmes enceintes et nouveau-nés ce trimestre.',
      date: 'Aujourd’hui à 08:30',
      urgent: true,
    },
    {
      id: 2,
      from: 'Direction de la Sécurité Informatique',
      title: 'Mise à jour des Clés HSM des Stations Citoyenneté',
      content: 'Toutes les clés de signature 2026 ont été synchronisées sur le serveur central de Kinshasa.',
      date: 'Hier à 17:15',
      urgent: false,
    },
  ]);
  const [newBroadcastText, setNewBroadcastText] = useState('');

  // Role permissions checking helper
  const canExportMass = useMemo(() => {
    return roleType !== 'agente_n1';
  }, [roleType]);

  const canDeleteRecords = useMemo(() => {
    return ['supervisor', 'coordenador_municipal', 'coordenador_provincial', 'gestor_nacional', 'administrador_sistema'].includes(roleType);
  }, [roleType]);

  const canValidatePlanB = useMemo(() => {
    return ['agente_n2', 'supervisor', 'coordenador_municipal', 'coordenador_provincial', 'gestor_nacional', 'administrador_sistema'].includes(roleType);
  }, [roleType]);

  const canManageTeam = useMemo(() => {
    return ['supervisor', 'coordenador_municipal', 'coordenador_provincial', 'gestor_nacional'].includes(roleType);
  }, [roleType]);

  const canViewStrategicDashboards = useMemo(() => {
    return ['coordenador_municipal', 'coordenador_provincial', 'gestor_nacional', 'administrador_sistema'].includes(roleType);
  }, [roleType]);

  // Module authorization matrix
  const availableModules: { id: AdminModule; label: string; icon: React.FC<{ className?: string }> }[] = useMemo(() => {
    const list: { id: AdminModule; label: string; icon: React.FC<{ className?: string }> }[] = [];

    // Profile 7: Gestor Nacional
    if (roleType === 'gestor_nacional' || roleType === 'gestor_nac') {
      list.push({ id: 'gestor_nacional', label: 'Gouvernance Nationale', icon: ShieldCheck });
    }

    // Profile 8: Administrador de Sistema
    if (roleType === 'administrador_sistema' || roleType === 'admin_sys') {
      list.push({ id: 'sys_admin', label: 'Console Technique & Infra', icon: Server });
    }

    // Profile 9: DPO / Privacidade
    if (roleType === 'oficial_protecao_dados' || roleType === 'dpo_priv') {
      list.push({ id: 'dpo_privacy', label: 'Protection des Données (DPO)', icon: ShieldAlert });
    }

    // Profile 10: Auditor
    if (roleType === 'auditor') {
      list.push({ id: 'auditoria', label: 'Audit Républicain (IGF)', icon: FileCheck });
    }

    // Profile 11: Gestor de Programas Sociais
    if (roleType === 'gestor_programas_sociais' || roleType === 'gestor_prog') {
      list.push({ id: 'programas_sociais', label: 'Programmes Sociaux & PMT', icon: Layers });
    }

    // Profile 12: Operador de Benefícios
    if (roleType === 'operador_beneficios' || roleType === 'op_beneficios') {
      list.push({ id: 'operador_beneficios', label: 'Prestations & Décaissements', icon: CreditCard });
    }

    // Profile 13: Integrador / Desenvolvedor
    if (roleType === 'integrador_dev' || roleType === 'dev_api') {
      list.push({ id: 'dev_integrador', label: 'APIs, Sandbox & Swagger', icon: Code });
    }

    // Profile 14: Suporte Técnico
    if (roleType === 'suporte_tecnico' || roleType === 'suporte_tec') {
      list.push({ id: 'suporte_tecnico', label: 'Support 108 & Diagnostics', icon: LifeBuoy });
    }

    // Common Core Modules
    list.push({ id: 'dashboard', label: 'Vue d’Ensemble', icon: LayoutDashboard });

    // Developer / Integrator does not access real citizen personal data
    const isDev = roleType === 'integrador_dev' || roleType === 'dev_api';
    if (!isDev) {
      list.push({
        id: 'cadastros',
        label: roleType === 'auditor' ? 'Dossiers (Lecture Seule)' : 'Gestion des Dossiers (CRUD)',
        icon: Users,
      });
    }

    if (['agente_n1', 'agente_n2', 'supervisor'].includes(roleType)) {
      list.push({ id: 'atendimento', label: 'File & Guichet Direct', icon: Clock });
    }

    if (canValidatePlanB) {
      list.push({ id: 'validacao', label: 'Régularisation & Plan B', icon: FolderCheck });
    }

    if (canManageTeam) {
      list.push({ id: 'equipe', label: 'Équipe & Guichets', icon: UserCheck });
    }

    if (!isDev) {
      list.push({ id: 'mapa', label: 'Carte & Couverture SIG', icon: MapIcon });
    }

    if (canViewStrategicDashboards || roleType === 'supervisor') {
      list.push({ id: 'metas_fraude', label: 'Objectifs & Anti-Fraude', icon: ShieldAlert });
      list.push({ id: 'relatorios', label: 'Rapports & Audit', icon: BarChart3 });
    }

    list.push({ id: 'mensagens', label: 'Messages & Alertes', icon: MessageSquare });
    list.push({ id: 'configuracoes', label: 'Paramètres & Hors-Ligne', icon: Settings });

    return list;
  }, [roleType, canValidatePlanB, canManageTeam, canViewStrategicDashboards]);

  // Handle Offline Mode Sync
  const handleTriggerSync = () => {
    setIsSyncing(true);
    setSyncNotice(null);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncNotice('5 dossiers locaux ont été synchronisés avec le Datacenter National de Kinshasa (Chiffrement AES-256).');
      setTimeout(() => setSyncNotice(null), 5000);
    }, 1800);
  };

  // Camera Management for Registration
  const handleStartCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      alert('Impossible d’accéder à la webcam du kit. Utilisez l’importation de fichier.');
      setIsCameraActive(false);
    }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 480;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setNewPhoto(dataUrl);
        setNewBiometricsTaken(true);
      }
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Create New Record Handler
  const handleCreateRecord = (status: 'En attente' | 'Rascunho') => {
    if (!newFullName.trim()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newRec: CitizenRecord = {
      id: `REC-${Date.now().toString().slice(-4)}`,
      csuNumber: `CSU-2026-99${Math.floor(10 + Math.random() * 89)}-${randomSuffix}`,
      fullName: newFullName,
      birthDate: newBirthDate || '01/01/1990',
      gender: newGender,
      documentType: newDocType,
      documentNumber: newDocNumber || `DOC-${randomSuffix}`,
      phone: newPhone || '+243 998 000 000',
      address: newAddress || 'Commune de Kalamu',
      commune: newCommune,
      province: 'Kinshasa',
      householdSize: Number(newHouseholdSize) || 4,
      vulnerabilityDecile: 2,
      assignedProgram: newProgram,
      status: status,
      registeredBy: `${roleTitle} · Session Active`,
      station: 'Station Citoyenneté Kalamu Centre',
      registeredAt: new Date().toLocaleDateString('fr-FR') + ' ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      hasPhoto: Boolean(newPhoto),
      hasBiometrics: newBiometricsTaken,
      photoUrl: newPhoto || undefined,
      gpsCoords: { lat: -4.3312, lng: 15.3129 },
    };

    setRecords([newRec, ...records]);
    setIsCreateModalOpen(false);
    resetNewForm();
    alert(`Dossier ${newRec.csuNumber} enregistré avec succès (${status}) !`);
  };

  const resetNewForm = () => {
    setNewStep(1);
    setNewFullName('');
    setNewBirthDate('');
    setNewGender('F');
    setNewDocType('CENI');
    setNewDocNumber('');
    setNewPhone('');
    setNewAddress('');
    setNewHouseholdSize(4);
    setNewPhoto(null);
    setNewBiometricsTaken(false);
  };

  // Update Record Handler
  const handleSaveEdit = () => {
    if (!editingRecord) return;
    setRecords((prev) =>
      prev.map((r) => (r.id === editingRecord.id ? editingRecord : r))
    );
    setEditingRecord(null);
    alert('Dossier mis à jour avec traçabilité d’audit !');
  };

  // Delete Record Handler
  const handleConfirmDelete = () => {
    if (!deletingRecord) return;
    setRecords((prev) => prev.filter((r) => r.id !== deletingRecord.id));
    setDeletingRecord(null);
    alert('Dossier supprimé du registre avec confirmation !');
  };

  // Export Records to CSV (Mass export)
  const handleExportCSV = () => {
    if (!canExportMass) {
      alert('Action restreinte : L’exportation en masse de données sensibles est réservée aux Superviseurs et Coordinateurs.');
      return;
    }

    const headers = ['ID', 'Numero_CSU', 'Nom_Complet', 'Sexe', 'Document', 'Numero_Doc', 'Telephone', 'Commune', 'Province', 'Membres', 'Programme', 'Statut', 'Date'];
    const rows = filteredRecords.map((r) => [
      r.id,
      r.csuNumber,
      `"${r.fullName}"`,
      r.gender,
      r.documentType,
      r.documentNumber,
      r.phone,
      r.commune,
      r.province,
      r.householdSize,
      `"${r.assignedProgram}"`,
      r.status,
      r.registeredAt,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CSU_RDC_Registre_${roleType}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Records calculation
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      const matchSearch =
        r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.csuNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.phone.includes(searchTerm);
      const matchStatus = statusFilter === 'Tous' || r.status === statusFilter;
      const matchProvince = provinceFilter === 'Toutes' || r.province === provinceFilter;
      return matchSearch && matchStatus && matchProvince;
    });
  }, [records, searchTerm, statusFilter, provinceFilter]);

  return (
    <div className="min-h-screen bg-[#F6F8FB] text-[#0A1B2A] flex flex-col antialiased">
      {/* 1. TOP SYSTEM AUDIT BAR (DRC SOVEREIGN e-GOV) */}
      <header className="bg-[#08243F] text-white border-b border-[#14477E] px-4 py-2.5 flex items-center justify-between gap-4 sticky top-0 z-40 shadow-sm text-xs">
        <div className="flex items-center gap-3">
          {/* Sidebar Toggle Button */}
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-[#0E3A66] hover:bg-[#14477E] text-[#D9B84A] border border-[#C9A227]/40 cursor-pointer transition-colors"
            title={isCollapsed ? 'Développer le menu latéral' : 'Réduire le menu latéral'}
          >
            {isCollapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Official Emblem & Platform Title */}
          <div className="flex items-center gap-2">
            <CsuLogo variant="seal" size="sm" />
            <div className="hidden sm:block leading-tight">
              <span className="font-display font-extrabold text-sm text-white tracking-wide block">
                CONSOLE D'ADMINISTRATION CSU
              </span>
              <span className="text-[10px] text-[#D9B84A] font-mono uppercase">
                {roleBadge}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Station Status & Network State */}
        <div className="flex items-center gap-3">
          {/* Station identification */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A2E52] border border-[#14477E] text-[11px] text-[#DCE4EE]">
            <Building className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Station Kalamu Centre · Kinshasa</span>
          </div>

          {/* Offline / Online Switcher & Status */}
          <button
            type="button"
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] font-bold border transition-all cursor-pointer ${
              isOffline
                ? 'bg-[#C77D0A]/20 border-[#C77D0A] text-[#E9CE7A]'
                : 'bg-[#1E8E5A]/20 border-[#1E8E5A] text-[#1E8E5A]'
            }`}
            title="Cliquez pour basculer le mode Hors-Ligne"
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>Mode Hors-Ligne (Local)</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 animate-pulse" />
                <span>Serveur Central Connecté</span>
              </>
            )}
          </button>

          {/* Manual Sync Button */}
          <button
            type="button"
            onClick={handleTriggerSync}
            disabled={isSyncing}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0E3A66] hover:bg-[#14477E] text-[#D9B84A] border border-[#C9A227]/30 text-xs font-semibold cursor-pointer disabled:opacity-50"
            title="Forcer la synchronisation avec Kinshasa"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Synchronisation...' : 'Synchroniser'}</span>
          </button>
        </div>

        {/* Right: Language Selector, User Profile & Home Exit */}
        <div className="flex items-center gap-2">
          {/* Admin Header Language Selector */}
          {onLanguageChange && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0A2E52] hover:bg-[#14477E] border border-[#C9A227]/40 text-xs font-bold text-[#EAEFF5] transition-colors cursor-pointer"
                title="Changer de langue / Idioma"
              >
                <Globe className="w-3.5 h-3.5 text-[#C9A227]" />
                <span className="font-mono">{currentLang}</span>
              </button>

              {langDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setLangDropdownOpen(false)}
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#08243F] border border-[#C9A227] shadow-2xl py-1.5 z-50 max-h-72 overflow-y-auto divide-y divide-[#14477E]/40">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C9A227]">
                      Idiomas / Langues ({LANGUAGES.length})
                    </div>
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                          currentLang === lang.code
                            ? 'bg-[#0E3A66] text-white font-bold'
                            : 'text-[#DCE4EE] hover:bg-[#0A2E52] hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm">{lang.flag}</span>
                          <span className="font-mono font-bold text-[#C9A227]">{lang.code}</span>
                          <span>{lang.native}</span>
                        </span>
                        {currentLang === lang.code && (
                          <Check className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="text-right hidden lg:block">
            <span className="font-bold text-white block text-xs">{roleTitle}</span>
            <span className="text-[10px] text-[#DCE4EE]/70 font-mono">ID: AGT-2026-9041</span>
          </div>

          <button
            type="button"
            onClick={onNavigateHome}
            className="px-2.5 py-1.5 rounded-lg bg-[#0A2E52] hover:bg-[#14477E] text-xs font-semibold text-[#DCE4EE] border border-[#14477E] transition-colors"
          >
            {translateText('Portail Public', currentLang)}
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="px-2.5 py-1.5 rounded-lg bg-[#C0392B]/80 hover:bg-[#C0392B] text-xs font-bold text-white transition-colors"
          >
            {translateText('Quitter', currentLang)}
          </button>
        </div>
      </header>

      {/* Sync Alert Banner if triggered */}
      {syncNotice && (
        <div className="bg-[#1E8E5A] text-white px-4 py-2 text-xs text-center font-semibold shadow flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* 2. BODY LAYOUT: SIDEBAR + MAIN WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* COLLAPSIBLE LEFT NAVIGATION SIDEBAR */}
        <aside
          className={`bg-[#08243F] text-white border-r border-[#14477E] transition-all duration-300 flex flex-col justify-between shrink-0 select-none ${
            isCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          {/* Navigation Links by Module */}
          <div className="p-3 space-y-4 overflow-y-auto">
            {!isCollapsed && (
              <div className="px-2 pt-1 pb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D9B84A] font-bold block">
                  MODULES AUTORISÉS
                </span>
                <span className="text-xs text-[#DCE4EE]/60 block">
                  Niveau d'accréditation : {roleBadge}
                </span>
              </div>
            )}

            <nav className="space-y-1">
              {availableModules.map((mod) => {
                const Icon = mod.icon;
                const isActive = activeModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setActiveModule(mod.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-bold shadow-md'
                        : 'text-[#DCE4EE] hover:bg-[#0E3A66] hover:text-white'
                    } ${isCollapsed ? 'justify-center px-2' : ''}`}
                    title={isCollapsed ? mod.label : undefined}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!isCollapsed && <span className="truncate">{mod.label}</span>}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Widget: Session Desk & Collapse Helper */}
          <div className="p-3 border-t border-[#14477E] bg-[#05182B]/60 text-xs space-y-2">
            {!isCollapsed ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#DCE4EE]/70">Session de Guichet :</span>
                  <span className={`font-bold ${isSessionOpen ? 'text-[#1E8E5A]' : 'text-[#C0392B]'}`}>
                    {isSessionOpen ? 'Ouvert' : 'Fermé'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSessionOpen(!isSessionOpen)}
                  className="w-full py-1.5 rounded-lg bg-[#0E3A66] hover:bg-[#14477E] text-[11px] font-bold text-[#D9B84A] border border-[#14477E] transition-colors cursor-pointer"
                >
                  {isSessionOpen ? 'Suspendre Session' : 'Ouvrir Session'}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsCollapsed(false)}
                className="w-full p-2 rounded-lg bg-[#0E3A66] hover:bg-[#14477E] text-[#D9B84A] flex items-center justify-center cursor-pointer"
                title="Développer la barre"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </aside>

        {/* MAIN WORKSPACE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* MODULE 1: DASHBOARD / OVERVIEW */}
          {activeModule === 'dashboard' && (
            <div className="space-y-6">
              {/* Top Welcome & Mission Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-[#08243F] via-[#0E3A66] to-[#0A2E52] border border-[#C9A227]/40 shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded font-mono text-[10px] font-bold bg-[#08243F] text-[#D9B84A] border border-[#C9A227]/50 uppercase">
                      {roleBadge}
                    </span>
                    <span className="text-xs text-[#1E8E5A] font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Clé HSM Active · Session Certifiée RDC</span>
                    </span>
                  </div>
                  <h2 className="font-display font-extrabold text-2xl text-white">
                    {roleTitle}
                  </h2>
                  <p className="text-xs text-[#DCE4EE]/80 max-w-2xl leading-relaxed">
                    Plateforme opérationnelle d'enrôlement, de régularisation et de surveillance du Registre Social Unifié (CSU RDC).
                  </p>
                </div>

                {/* Primary Quick Actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      resetNewForm();
                      setIsCreateModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] hover:from-[#F5E29F] hover:to-[#B89224] text-[#08243F] font-bold text-xs shadow-lg flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Nouvel Enrôlement</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModule('cadastros')}
                    className="px-4 py-2.5 rounded-xl bg-[#08243F] hover:bg-[#0A2E52] text-white font-semibold text-xs border border-[#14477E] transition-colors cursor-pointer"
                  >
                    Consulter les Dossiers
                  </button>
                </div>
              </div>

              {/* Sub-Tabs: Strategic Recharts Analytics vs Desk & Local Operations */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-[#DCE4EE] shadow-sm">
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setDashboardTab('analytics')}
                    className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      dashboardTab === 'analytics'
                        ? 'bg-[#08243F] text-white shadow'
                        : 'text-[#0A1B2A]/70 hover:text-[#08243F] hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4 text-[#C9A227]" />
                    <span>Visão Geral Estratégica (Recharts)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDashboardTab('operations')}
                    className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      dashboardTab === 'operations'
                        ? 'bg-[#08243F] text-white shadow'
                        : 'text-[#0A1B2A]/70 hover:text-[#08243F] hover:bg-gray-100'
                    }`}
                  >
                    <Clock className="w-4 h-4 text-[#C9A227]" />
                    <span>Fila da Estação & Registros Recentes</span>
                  </button>
                </div>

                <span className="text-[11px] font-mono text-[#0A1B2A]/60 px-2">
                  {dashboardTab === 'analytics' ? 'Gráficos Recharts em Tempo Real' : `${records.length} dossiers enregistrés`}
                </span>
              </div>

              {dashboardTab === 'analytics' ? (
                <DashboardOverview
                  roleType={roleType}
                  title={`Tableau de Bord Stratégique · ${roleTitle}`}
                  subtitle="Indicateurs de performance opérationnelle, cadences de saisie et conformité biométrique des stations CSU."
                  onNavigateToRecords={() => setActiveModule('cadastros')}
                />
              ) : (
                <>
                  {/* Dynamic KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#0A1B2A]/60 font-semibold font-mono">
                    <span>DOSSIERS DU JOUR</span>
                    <Users className="w-4 h-4 text-[#C9A227]" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-[#08243F]">
                    {records.length} ménages
                  </div>
                  <span className="text-[11px] text-[#1E8E5A] font-semibold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+18% par rapport à hier</span>
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#0A1B2A]/60 font-semibold font-mono">
                    <span>TEMPS MOYEN DE SAISIE</span>
                    <Clock className="w-4 h-4 text-[#0E3A66]" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-[#08243F]">
                    10.4 min
                  </div>
                  <span className="text-[11px] text-[#0A1B2A]/70">
                    Objectif national : &lt; 15 min
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#0A1B2A]/60 font-semibold font-mono">
                    <span>CAS PLAN B (SANS PAPIERS)</span>
                    <FolderCheck className="w-4 h-4 text-[#C77D0A]" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-[#C77D0A]">
                    {records.filter((r) => r.status === 'Plan B (Témoins)').length} en cours
                  </div>
                  <span className="text-[11px] text-[#0A1B2A]/70">
                    Audition des témoins communautaires
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#0A1B2A]/60 font-semibold font-mono">
                    <span>TAUX DE COUVERTURE</span>
                    <BarChart3 className="w-4 h-4 text-[#1E8E5A]" />
                  </div>
                  <div className="font-display font-extrabold text-2xl text-[#1E8E5A]">
                    72.8%
                  </div>
                  <span className="text-[11px] text-[#1E8E5A] font-semibold">
                    Territoire de Kalamu conforme
                  </span>
                </div>
              </div>

              {/* Attendance & Queue Quick Bar (If desk operator) */}
              {['agente_n1', 'agente_n2', 'supervisor'].includes(roleType) && (
                <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#08243F] text-[#D9B84A] flex items-center justify-center font-display font-extrabold text-lg shadow">
                      {currentTicket}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#0A1B2A]/60 font-bold block">
                        TICKET EN COURS DE TRAITEMENT
                      </span>
                      <h4 className="font-display font-bold text-sm text-[#08243F]">
                        {activeDesk} · File d'attente : {queueCount} citoyens en attente
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const nextNum = Number(currentTicket.split('-')[1]) + 1;
                        setCurrentTicket(`A-0${nextNum}`);
                        setQueueCount((prev) => Math.max(0, prev - 1));
                      }}
                      className="px-4 py-2 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Appeler Numéro Suivant
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        resetNewForm();
                        setIsCreateModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] text-xs font-bold transition-all cursor-pointer"
                    >
                      Enrôler Ce Citoyen
                    </button>
                  </div>
                </div>
              )}

              {/* Recent Records Quick Snapshot */}
              <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#08243F]">
                      Derniers Enrôlements Réalisés
                    </h3>
                    <p className="text-xs text-[#0A1B2A]/70">
                      Accès immédiat aux dossiers pour consultation, impression du récépissé ou validation
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveModule('cadastros')}
                    className="text-xs text-[#0E3A66] hover:text-[#C9A227] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Voir tous ({records.length})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-[#F6F8FB] text-[#08243F] font-mono uppercase font-bold border-y border-[#DCE4EE]">
                      <tr>
                        <th className="py-3 px-3">Numéro CSU</th>
                        <th className="py-3 px-3">Titulaire</th>
                        <th className="py-3 px-3">Commune</th>
                        <th className="py-3 px-3">Programme</th>
                        <th className="py-3 px-3">Statut</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EAEFF5]">
                      {records.slice(0, 4).map((rec) => (
                        <tr key={rec.id} className="hover:bg-[#F6F8FB]/70 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-[#0E3A66]">
                            {rec.csuNumber}
                          </td>
                          <td className="py-3 px-3 font-semibold text-[#08243F]">
                            {rec.fullName}
                          </td>
                          <td className="py-3 px-3">{rec.commune}</td>
                          <td className="py-3 px-3">{rec.assignedProgram}</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                                rec.status === 'Certifié'
                                  ? 'bg-[#1E8E5A]/15 text-[#1E8E5A]'
                                  : rec.status === 'Plan B (Témoins)'
                                  ? 'bg-[#C77D0A]/15 text-[#C77D0A]'
                                  : rec.status === 'Rejeté'
                                  ? 'bg-[#C0392B]/15 text-[#C0392B]'
                                  : 'bg-[#0E3A66]/15 text-[#0E3A66]'
                              }`}
                            >
                              {rec.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              type="button"
                              onClick={() => setViewingRecord(rec)}
                              className="text-[#0E3A66] hover:text-[#C9A227] font-semibold underline mr-2 cursor-pointer"
                            >
                              Détails
                            </button>
                            <button
                              type="button"
                              onClick={() => setPrintReceiptRecord(rec)}
                              className="text-[#08243F] hover:text-[#C9A227] font-semibold cursor-pointer"
                              title="Imprimer le Récépissé"
                            >
                              <Printer className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
                </>
              )}
            </div>
          )}

          {/* MODULE 2: CADASTROS / DOSSIERS CRUD */}
          {activeModule === 'cadastros' && (
            <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-6">
              {/* Compliance & Privacy Banners */}
              {roleType === 'auditor' && (
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center gap-3 text-xs">
                  <FileCheck className="w-5 h-5 text-indigo-700 shrink-0" />
                  <div>
                    <strong>Régime d'Inspection & Contrôle d'État (Cour des Comptes / IGF) :</strong>
                    <p className="text-[11px] text-indigo-800 mt-0.5">
                      Ce profil est strictement habilité en mode consultation et audit. La création, la modification et la suppression de fiches d'enrôlement sont désactivées.
                    </p>
                  </div>
                </div>
              )}

              {(roleType === 'administrador_sistema' || roleType === 'admin_sys') && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex items-center gap-3 text-xs">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
                  <div>
                    <strong>Restriction d'Accès aux Données Personnelles Sensibles :</strong>
                    <p className="text-[11px] text-amber-900 mt-0.5">
                      En application du principe de séparation des pouvoirs techniques et des libertés civiles, l'accès administrateur direct aux identités est strictement consigné dans la piste d'audit HSM. Pour toute action de support, préférez la console d'infrastructure.
                    </p>
                  </div>
                </div>
              )}

              {/* Header with Search, Filter & Actions */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#EAEFF5] pb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#08243F]">
                    Gestion Complète des Dossiers (CRUD)
                  </h3>
                  <p className="text-xs text-[#0A1B2A]/70">
                    Consultation, création, retification, validation et impression des récépissés sécurisés
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Export CSV Button (Restricted for N1) */}
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                      canExportMass
                        ? 'bg-[#08243F] hover:bg-[#0E3A66] text-white border-[#14477E]'
                        : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                    }`}
                    title={canExportMass ? 'Exporter en CSV' : 'Exportation en masse réservée aux Superviseurs'}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exporter CSV</span>
                  </button>

                  {/* Create New Record (Hidden for Auditor) */}
                  {roleType !== 'auditor' && (
                    <button
                      type="button"
                      onClick={() => {
                        resetNewForm();
                        setIsCreateModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] text-xs font-bold shadow transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Créer un Dossier</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Filters Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {/* Search Input */}
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#0A1B2A]/40" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Recherche par nom, numéro CSU ou tél..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-semibold text-[#08243F] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                >
                  <option value="Tous">Tous les statuts</option>
                  <option value="Certifié">Certifié (Biométrie OK)</option>
                  <option value="En attente">En attente de validation</option>
                  <option value="Plan B (Témoins)">Plan B (Témoins communautaires)</option>
                  <option value="Rejeté">Rejeté</option>
                  <option value="Rascunho">Brouillons locaux</option>
                </select>

                {/* Province Filter */}
                <select
                  value={provinceFilter}
                  onChange={(e) => setProvinceFilter(e.target.value)}
                  className="p-2 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-semibold text-[#08243F] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                >
                  <option value="Toutes">Toutes les provinces</option>
                  <option value="Kinshasa">Kinshasa</option>
                  <option value="Haut-Katanga">Haut-Katanga</option>
                  <option value="Nord-Kivu">Nord-Kivu</option>
                  <option value="Kasaï-Oriental">Kasaï-Oriental</option>
                </select>
              </div>

              {/* Records Data Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#DCE4EE]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F6F8FB] text-[#08243F] font-mono uppercase font-bold border-b border-[#DCE4EE]">
                    <tr>
                      <th className="py-3 px-3">Numéro CSU</th>
                      <th className="py-3 px-3">Titulaire</th>
                      <th className="py-3 px-3">Doc & Réf</th>
                      <th className="py-3 px-3">Commune</th>
                      <th className="py-3 px-3">Foyer</th>
                      <th className="py-3 px-3">Statut</th>
                      <th className="py-3 px-3 text-right">Actions CRUD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAEFF5]">
                    {filteredRecords.length > 0 ? (
                      filteredRecords.map((rec) => (
                        <tr key={rec.id} className="hover:bg-[#F6F8FB]/60 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-[#0E3A66]">
                            {rec.csuNumber}
                          </td>
                          <td className="py-3 px-3 font-semibold text-[#08243F]">
                            <div className="flex items-center gap-2">
                              {rec.hasPhoto ? (
                                <span className="w-2 h-2 rounded-full bg-[#1E8E5A]" title="Photo présente" />
                              ) : (
                                <span className="w-2 h-2 rounded-full bg-gray-300" title="Sans photo" />
                              )}
                              <span>{rec.fullName}</span>
                            </div>
                            <span className="text-[10px] text-[#0A1B2A]/60 block">{rec.phone}</span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-semibold block">{rec.documentType}</span>
                            <span className="text-[10px] font-mono text-[#0A1B2A]/60">{rec.documentNumber}</span>
                          </td>
                          <td className="py-3 px-3">{rec.commune}</td>
                          <td className="py-3 px-3 font-mono">{rec.householdSize} pers.</td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                                rec.status === 'Certifié'
                                  ? 'bg-[#1E8E5A]/15 text-[#1E8E5A]'
                                  : rec.status === 'Plan B (Témoins)'
                                  ? 'bg-[#C77D0A]/15 text-[#C77D0A]'
                                  : rec.status === 'Rejeté'
                                  ? 'bg-[#C0392B]/15 text-[#C0392B]'
                                  : 'bg-[#0E3A66]/15 text-[#0E3A66]'
                              }`}
                            >
                              {rec.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right space-x-1 whitespace-nowrap">
                            {/* 1. View Record */}
                            <button
                              type="button"
                              onClick={() => setViewingRecord(rec)}
                              className="p-1.5 rounded-lg bg-[#0E3A66]/10 text-[#0E3A66] hover:bg-[#0E3A66] hover:text-white transition-colors cursor-pointer"
                              title="Visualiser le dossier complet"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {/* 2. Edit Record (Restricted for N1 and hidden for Auditor) */}
                            {roleType !== 'auditor' && (
                              <button
                                type="button"
                                onClick={() => {
                                  if (roleType === 'agente_n1' && rec.status === 'Certifié') {
                                    alert('Règle de gouvernance : Les agents N1 ne peuvent pas modifier un dossier déjà validé. Transmettez la demande à un agent N2 ou Superviseur.');
                                    return;
                                  }
                                  setEditingRecord({ ...rec });
                                }}
                                className="p-1.5 rounded-lg bg-[#C9A227]/15 text-[#9C7B1E] hover:bg-[#C9A227] hover:text-[#08243F] transition-colors cursor-pointer"
                                title="Modifier / Rectifier les données"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {/* 3. Print Récépissé */}
                            <button
                              type="button"
                              onClick={() => setPrintReceiptRecord(rec)}
                              className="p-1.5 rounded-lg bg-[#08243F]/10 text-[#08243F] hover:bg-[#08243F] hover:text-white transition-colors cursor-pointer"
                              title="Imprimer le Récépissé A4 avec QR Code"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>

                            {/* 4. Delete Record (Supervisor / Coordenadores only) */}
                            {canDeleteRecords && (
                              <button
                                type="button"
                                onClick={() => setDeletingRecord(rec)}
                                className="p-1.5 rounded-lg bg-[#C0392B]/10 text-[#C0392B] hover:bg-[#C0392B] hover:text-white transition-colors cursor-pointer"
                                title="Supprimer le dossier avec confirmation"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-[#0A1B2A]/60">
                          Aucun dossier ne correspond aux critères de recherche.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MODULE 3: ATENDIMENTO / QUEUE & GUICHET DIRECT */}
          {activeModule === 'atendimento' && (
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAEFF5] pb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#08243F]">
                      Bancada de Atendimento & File d'Attente Directe
                    </h3>
                    <p className="text-xs text-[#0A1B2A]/70">
                      Gestion du flux des citoyens sur place, appel des tickets et enregistrement biométrique
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#1E8E5A] bg-[#1E8E5A]/10 px-3 py-1 rounded-full">
                      Guichet Actif : {activeDesk}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Ticket Display */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-[#08243F] to-[#0A2E52] text-white flex flex-col items-center justify-center text-center space-y-3">
                    <span className="text-xs font-mono text-[#D9B84A] uppercase font-bold">
                      CITOYEN ACTUEL
                    </span>
                    <div className="font-display font-black text-5xl text-white tracking-wider">
                      {currentTicket}
                    </div>
                    <span className="text-xs text-[#DCE4EE]/70">
                      File fluide · Temps estimé : 8 min
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const nextNum = Number(currentTicket.split('-')[1]) + 1;
                        setCurrentTicket(`A-0${nextNum}`);
                        setQueueCount((prev) => Math.max(0, prev - 1));
                      }}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-bold text-xs shadow active:scale-95 transition-all cursor-pointer"
                    >
                      Appeler Suivant ({queueCount} en attente)
                    </button>
                  </div>

                  {/* Desk Controls */}
                  <div className="p-6 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-4">
                    <h4 className="font-display font-bold text-sm text-[#08243F]">
                      Paramètres du Guichet
                    </h4>
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block font-semibold text-[#08243F] mb-1">
                          Affectation du Guichet :
                        </label>
                        <select
                          value={activeDesk}
                          onChange={(e) => setActiveDesk(e.target.value)}
                          className="w-full p-2 rounded-xl border border-[#DCE4EE] bg-white font-semibold text-[#08243F]"
                        >
                          <option value="Guichet 01">Guichet 01 · Accueil & Enrôlement</option>
                          <option value="Guichet 02">Guichet 02 · Numérisation Documents</option>
                          <option value="Guichet 03">Guichet 03 · Prise de Vue & Biométrie</option>
                          <option value="Bancada de Regularização">Bancada de Regularização (N2)</option>
                        </select>
                      </div>

                      <div className="pt-2 border-t border-[#DCE4EE] space-y-2">
                        <button
                          type="button"
                          onClick={() => {
                            resetNewForm();
                            setIsCreateModalOpen(true);
                          }}
                          className="w-full py-2.5 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-white font-bold text-xs transition-colors cursor-pointer"
                        >
                          + Nouvel Enrôlement pour ce Ticket
                        </button>

                        <button
                          type="button"
                          onClick={() => alert('Le citoyen du ticket a été redirigé vers le guichet de régularisation N2.')}
                          className="w-full py-2 rounded-xl bg-white border border-[#DCE4EE] text-[#08243F] font-semibold text-xs hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          Référer vers l'Agent N2 (Plan B)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary Status of Waiting Queue */}
                  <div className="p-6 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3">
                    <h4 className="font-display font-bold text-sm text-[#08243F]">
                      Prochains Tickets en Attente
                    </h4>
                    <div className="space-y-2 text-xs">
                      {['A-043 · Famille Lumumba (Kalamu)', 'A-044 · M. Mbuyi (Masina)', 'A-045 · Mme Kanku (Kalamu)', 'A-046 · M. Tshimanga (Gombe)'].map((t, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#DCE4EE] flex items-center justify-between font-mono">
                          <span className="font-semibold text-[#08243F]">{t}</span>
                          <span className="text-[10px] text-[#0A1B2A]/50">En salle</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 4: VALIDATION & PLAN B (N2, Supervisor, Coordenadores) */}
          {activeModule === 'validacao' && (
            <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-6">
              <div className="border-b border-[#EAEFF5] pb-4">
                <h3 className="font-display font-bold text-lg text-[#08243F]">
                  Bancada de Regularização & Procédures Dérogatoires « Plan B »
                </h3>
                <p className="text-xs text-[#0A1B2A]/70">
                  Résolution des contestations, enrôlement des personnes sans papiers civils par audition de témoins communautaires
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-4">
                  <h4 className="font-display font-bold text-sm text-[#08243F] flex items-center gap-2">
                    <FolderCheck className="w-4 h-4 text-[#C9A227]" />
                    <span>Dossiers Plan B Soumis à Examen</span>
                  </h4>

                  <div className="space-y-3 text-xs">
                    {records
                      .filter((r) => r.status === 'Plan B (Témoins)' || r.status === 'En attente')
                      .map((rec) => (
                        <div key={rec.id} className="p-3.5 rounded-xl bg-white border border-[#DCE4EE] space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-[#0E3A66]">{rec.csuNumber}</span>
                            <span className="px-2 py-0.5 rounded bg-[#C77D0A]/15 text-[#C77D0A] font-mono text-[10px] font-bold">
                              {rec.status}
                            </span>
                          </div>
                          <div className="font-bold text-[#08243F]">{rec.fullName}</div>
                          <p className="text-[11px] text-[#0A1B2A]/70">
                            Motif : Absence d'acte d'état civil original. Audition de 2 témoins communautaires requise.
                          </p>
                          <div className="flex gap-2 pt-1 border-t border-[#EAEFF5]">
                            <button
                              type="button"
                              onClick={() => {
                                setRecords((prev) =>
                                  prev.map((r) => (r.id === rec.id ? { ...r, status: 'Certifié' } : r))
                                );
                                alert(`Dossier ${rec.csuNumber} certifié avec succès sous dérogation Plan B !`);
                              }}
                              className="px-3 py-1 rounded-lg bg-[#1E8E5A] hover:bg-[#156e45] text-white text-[11px] font-bold cursor-pointer"
                            >
                              Valider Dérogation
                            </button>
                            <button
                              type="button"
                              onClick={() => setViewingRecord(rec)}
                              className="px-3 py-1 rounded-lg bg-[#08243F] hover:bg-[#0E3A66] text-white text-[11px] font-semibold cursor-pointer"
                            >
                              Examiner Témoins
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-4">
                  <h4 className="font-display font-bold text-sm text-[#08243F] flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#C0392B]" />
                    <span>Signalements d'Inconsistances Légères</span>
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-white border border-[#DCE4EE] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-[#08243F]">Discordance d'Orthographe CENI vs Registre</span>
                        <span className="text-[10px] font-mono text-[#C0392B] font-bold bg-[#C0392B]/10 px-2 py-0.5 rounded">
                          À corriger
                        </span>
                      </div>
                      <p className="text-[11px] text-[#0A1B2A]/70">
                        Titulaire : <strong>Nzuzi Matondo Pascaline</strong>. La date de naissance sur la carte d'électeur indique 1995 alors que le livret de baptême indique 1994.
                      </p>
                      <button
                        type="button"
                        onClick={() => alert('Ouverture du panneau de résolution de contestation d’état civil.')}
                        className="px-3 py-1.5 rounded-lg bg-[#0E3A66] text-white text-[11px] font-bold cursor-pointer hover:bg-[#14477E]"
                      >
                        Auditionner et Rectifier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 5: EQUIPE & GUICHETS (Supervisor / Coordenadores) */}
          {activeModule === 'equipe' && (
            <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAEFF5] pb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#08243F]">
                    Gestion des Opérateurs & Guichets de la Station
                  </h3>
                  <p className="text-xs text-[#0A1B2A]/70">
                    Surveillance en temps réel de la productivité, des pauses et des attributions d’équipes
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Formulaire d’accréditation d’un nouvel agent avec badge biométrique.')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-bold text-xs shadow cursor-pointer"
                >
                  + Affecter un Agent
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {agentsList.map((agent) => (
                  <div key={agent.id} className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#0E3A66]">{agent.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          agent.status === 'Actif'
                            ? 'bg-[#1E8E5A]/15 text-[#1E8E5A]'
                            : 'bg-[#C77D0A]/15 text-[#C77D0A]'
                        }`}
                      >
                        {agent.status}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#08243F] text-sm">{agent.name}</h4>
                      <span className="text-[11px] text-[#0A1B2A]/60 block">{agent.role}</span>
                      <span className="font-semibold text-[#C9A227] text-[11px] block">{agent.desk}</span>
                    </div>

                    <div className="pt-2 border-t border-[#DCE4EE] flex items-center justify-between text-[11px]">
                      <span>Enrôlements jour : <strong>{agent.todayCount}</strong></span>
                      <span>Moy : <strong>{agent.avgMinutes} min</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODULE 6: MAPA & COBERTURA SIG */}
          {activeModule === 'mapa' && (
            <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAEFF5] pb-3">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#08243F]">
                    Système d'Information Géographique (SIG) & Bornes de Cadastre
                  </h3>
                  <p className="text-xs text-[#0A1B2A]/70">
                    Localisation en direct des stations fixes et des unités mobiles déployées en République Démocratique du Congo
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-[#D9B84A] bg-[#08243F] px-3 py-1 rounded-full">
                  GPS SOUVERAIN RDC
                </span>
              </div>

              {/* Integrated Google Maps Component */}
              <CsuInteractiveMap
                stations={MOCK_STATIONS}
                activeStation={MOCK_STATIONS[0]}
                heightClass="h-96 sm:h-[450px]"
                zoom={12}
                center={[-4.33, 15.32]}
              />

              {/* Map Insights Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                  <span className="font-bold text-[#08243F] block">Stations Fixes Ouvertes</span>
                  <span className="text-sm font-extrabold text-[#0E3A66]">18 Centres Urbains</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                  <span className="font-bold text-[#08243F] block">Kits Mobiles Solaires</span>
                  <span className="text-sm font-extrabold text-[#C9A227]">42 Déploiements Ruraux</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                  <span className="font-bold text-[#08243F] block">Unités Fluviales (Fleuve Congo)</span>
                  <span className="text-sm font-extrabold text-[#1E8E5A]">6 Barges Actives</span>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 7: METAS & ANTI-FRAUDE */}
          {activeModule === 'metas_fraude' && (
            <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-6">
              <div className="border-b border-[#EAEFF5] pb-4">
                <h3 className="font-display font-bold text-lg text-[#08243F]">
                  Surveillance des Objectifs & Détection des Fraudes Biométriques
                </h3>
                <p className="text-xs text-[#0A1B2A]/70">
                  Algorithmes automatisés de détection des doublons d'empreintes digitales et vérification d'éligibilité
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-4">
                  <h4 className="font-display font-bold text-sm text-[#08243F] flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#C0392B]" />
                    <span>Alertes de Suspicions de Doublons</span>
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-white border border-[#C0392B]/40 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#C0392B]">Suspect : Similarité Biométrique à 98.4%</span>
                        <span className="text-[10px] font-mono text-gray-500">Aujourd'hui à 11:02</span>
                      </div>
                      <p className="text-[11px] text-[#0A1B2A]/80">
                        Le citoyen <strong>Kasongo Ilunga</strong> présente une empreinte digitale correspondant déjà au dossier <strong>CSU-2026-9912-1044</strong> enregistré à Masina.
                      </p>
                      <div className="pt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => alert('Dossier bloqué pour enquête approfondie par l’inspection générale.')}
                          className="px-3 py-1 bg-[#C0392B] text-white rounded-lg font-bold text-[11px]"
                        >
                          Bloquer pour Audit
                        </button>
                        <button
                          type="button"
                          onClick={() => alert('Justificatif consigné au dossier.')}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-semibold text-[11px]"
                        >
                          Ignorer Faux-Positif
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-4">
                  <h4 className="font-display font-bold text-sm text-[#08243F] flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#1E8E5A]" />
                    <span>Progression des Objectifs Communaux</span>
                  </h4>

                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Commune de Kalamu (Objectif : 45 000 ménages)</span>
                        <span className="font-mono text-[#1E8E5A]">78.4%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full bg-[#1E8E5A] rounded-full" style={{ width: '78.4%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Commune de Masina (Objectif : 60 000 ménages)</span>
                        <span className="font-mono text-[#C9A227]">62.1%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full bg-[#C9A227] rounded-full" style={{ width: '62.1%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between font-semibold mb-1">
                        <span>Territoires Ruraux du Kasaï (Objectif : 25 000 ménages)</span>
                        <span className="font-mono text-[#0E3A66]">84.0%</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden">
                        <div className="h-full bg-[#0E3A66] rounded-full" style={{ width: '84%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 8: RELATORIOS & AUDIT */}
          {activeModule === 'relatorios' && (
            <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EAEFF5] pb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#08243F]">
                    Rapports Opérationnels & Synthèses Statutaires
                  </h3>
                  <p className="text-xs text-[#0A1B2A]/70">
                    Génération de rapports pour les réunions de coordination et transmission ministérielle
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleExportCSV}
                    className="px-3 py-2 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Données Brutes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3 py-2 rounded-xl bg-[#0A2E52] hover:bg-[#14477E] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimer Rapport A4</span>
                  </button>
                </div>
              </div>

              {/* Statistical Summary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#0A1B2A]/60 font-bold block">
                    TOTAL DES INSCRITS VALIDÉS
                  </span>
                  <div className="font-display font-black text-3xl text-[#08243F]">
                    1 240 500
                  </div>
                  <span className="text-xs text-[#1E8E5A] font-semibold">
                    Couverture à 100% dans la zone de Kalamu
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#0A1B2A]/60 font-bold block">
                    PROGRAMME FILET SOCIAL DIRECT
                  </span>
                  <div className="font-display font-black text-3xl text-[#C9A227]">
                    75 000 CDF / mois
                  </div>
                  <span className="text-xs text-[#0A1B2A]/70">
                    Déboursé auprès de 820 000 ménages
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#0A1B2A]/60 font-bold block">
                    DISPONIBILITÉ RÉSEAU SOUVERAIN
                  </span>
                  <div className="font-display font-black text-3xl text-[#1E8E5A]">
                    99.98%
                  </div>
                  <span className="text-xs text-[#1E8E5A] font-semibold">
                    Zéro interruption de service constatée
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 9: MENSAGENS & ALERTAS INTERNAS */}
          {activeModule === 'mensagens' && (
            <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-6">
              <div className="border-b border-[#EAEFF5] pb-4">
                <h3 className="font-display font-bold text-lg text-[#08243F]">
                  Messagerie & Communications Opérationnelles
                </h3>
                <p className="text-xs text-[#0A1B2A]/70">
                  Canal sécurisé de liaison entre les agents de terrain, superviseurs de stations et coordinateurs
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Broadcast list */}
                <div className="lg:col-span-7 space-y-3">
                  <h4 className="font-display font-bold text-sm text-[#08243F]">
                    Directives Officielles Récemment Diffusées
                  </h4>

                  {broadcastMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                        msg.urgent ? 'bg-[#C0392B]/5 border-[#C0392B]/30' : 'bg-[#F6F8FB] border-[#DCE4EE]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#08243F] flex items-center gap-1.5">
                          {msg.urgent && <AlertTriangle className="w-3.5 h-3.5 text-[#C0392B]" />}
                          <span>{msg.title}</span>
                        </span>
                        <span className="text-[10px] text-[#0A1B2A]/50 font-mono">{msg.date}</span>
                      </div>
                      <p className="text-[#0A1B2A]/80 leading-relaxed text-[11px]">{msg.content}</p>
                      <span className="text-[10px] text-[#0E3A66] font-semibold block">
                        Source : {msg.from}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Send Message Box */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3 text-xs">
                  <h4 className="font-display font-bold text-sm text-[#08243F]">
                    Diffuser un Message d'Équipe
                  </h4>
                  <p className="text-[11px] text-[#0A1B2A]/70">
                    Transmettre un signalement urgent aux agents de la station ou au coordinateur
                  </p>

                  <textarea
                    rows={4}
                    value={newBroadcastText}
                    onChange={(e) => setNewBroadcastText(e.target.value)}
                    placeholder="Saisissez votre note de service ou signalement..."
                    className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-white text-[#08243F] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      if (!newBroadcastText.trim()) return;
                      setBroadcastMessages([
                        {
                          id: Date.now(),
                          from: `${roleTitle} (${roleBadge})`,
                          title: 'Note de service interne',
                          content: newBroadcastText,
                          date: 'À l’instant',
                          urgent: false,
                        },
                        ...broadcastMessages,
                      ]);
                      setNewBroadcastText('');
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-[#D9B84A] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Diffuser la Note</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODULE 10: CONFIGURACOES & HORS-LIGNE */}
          {activeModule === 'configuracoes' && (
            <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-6">
              <div className="border-b border-[#EAEFF5] pb-4">
                <h3 className="font-display font-bold text-lg text-[#08243F]">
                  Paramètres de Session & Mode Hors-Ligne Souverain
                </h3>
                <p className="text-xs text-[#0A1B2A]/70">
                  Gestion des identifiants matériels, certificats HSM d'État et de la file locale chiffrée
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Offline Synchronization Panel */}
                <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-4">
                  <h4 className="font-display font-bold text-sm text-[#08243F] flex items-center gap-2">
                    <WifiOff className="w-4 h-4 text-[#C9A227]" />
                    <span>Mode Hors-Ligne & File Locale Chiffrée</span>
                  </h4>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#08243F] block">Activation Mode Hors-Ligne</span>
                      <span className="text-[#0A1B2A]/60 text-[11px]">
                        Permet la saisie sans connexion internet
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsOffline(!isOffline)}
                      className="px-3 py-1.5 rounded-lg bg-[#08243F] text-white font-bold text-xs cursor-pointer"
                    >
                      {isOffline ? 'Désactiver' : 'Activer'}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#DCE4EE] space-y-1">
                    <span className="font-bold text-[#08243F] block">Dossiers en attente de synchronisation :</span>
                    <span className="font-mono text-sm font-extrabold text-[#C77D0A]">
                      {isOffline ? '3 dossiers locaux en attente' : '0 dossier en attente (À jour)'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleTriggerSync}
                    disabled={isSyncing}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-bold text-xs shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Synchronisation en cours...' : 'Forcer la Synchronisation avec Kinshasa'}</span>
                  </button>
                </div>

                {/* Security & HSM Credentials */}
                <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-4">
                  <h4 className="font-display font-bold text-sm text-[#08243F] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1E8E5A]" />
                    <span>Sécurité & Certificats d'Agent</span>
                  </h4>

                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-white border border-[#DCE4EE]">
                      <span className="text-[10px] text-[#0A1B2A]/60 font-semibold block uppercase">
                        Module HSM d'État Assigné
                      </span>
                      <span className="font-mono font-bold text-[#08243F] text-xs">
                        HSM-RDC-KLM-0081 (Valide jusqu’en 2030)
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#DCE4EE]">
                      <span className="text-[10px] text-[#0A1B2A]/60 font-semibold block uppercase">
                        Double Authentification (MFA)
                      </span>
                      <span className="font-mono font-bold text-[#1E8E5A] text-xs">
                        ACTIF · Clé FIDO2 Souveraine
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => alert('Diagnostic de sécurité réussi : communication chiffrée avec le serveur central de Kinshasa.')}
                    className="w-full py-2 rounded-xl bg-[#08243F] text-white font-semibold text-xs hover:bg-[#0E3A66] transition-colors cursor-pointer"
                  >
                    Tester la Connectivité Cryptographique
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SPECIALIZED PROFILES 7-14 MODULE VIEWS */}
          {/* PROFILE 7: GESTOR NACIONAL */}
          {activeModule === 'gestor_nacional' && <NationalManagerView />}

          {/* PROFILE 8: ADMINISTRADOR DE SISTEMA */}
          {activeModule === 'sys_admin' && <SysAdminView />}

          {/* PROFILE 9: DPO / OFICIAL DE PROTEÇÃO DE DADOS */}
          {activeModule === 'dpo_privacy' && <DpoPrivacyView />}

          {/* PROFILE 10: AUDITOR */}
          {activeModule === 'auditoria' && <AuditorView />}

          {/* PROFILE 11: GESTOR DE PROGRAMAS SOCIAIS */}
          {activeModule === 'programas_sociais' && <SocialProgramsView />}

          {/* PROFILE 12: OPERADOR DE BENEFÍCIOS */}
          {activeModule === 'operador_beneficios' && <BenefitsOperatorView />}

          {/* PROFILE 13: INTEGRADOR / DESENVOLVEDOR */}
          {activeModule === 'dev_integrador' && <DeveloperIntegratorView />}

          {/* PROFILE 14: SUPORTE TÉCNICO */}
          {activeModule === 'suporte_tecnico' && <TechSupportView />}
        </main>
      </div>

      {/* 3. MODALS FOR CRUD ACTIONS */}

      {/* A. VIEW RECORD MODAL */}
      {viewingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border-2 border-[#14477E] p-6 shadow-2xl space-y-5 text-xs text-[#0A1B2A]">
            <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
              <div className="flex items-center gap-2">
                <CsuLogo variant="seal" size="sm" />
                <div>
                  <h3 className="font-display font-extrabold text-base text-[#08243F]">
                    Dossier Individuel · {viewingRecord.csuNumber}
                  </h3>
                  <span className="text-[10px] text-[#0A1B2A]/60 font-mono">
                    Enregistré le {viewingRecord.registeredAt}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewingRecord(null)}
                className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#08243F] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Photo Box */}
              <div className="w-full aspect-[4/5] rounded-2xl bg-[#08243F] border-2 border-[#C9A227] overflow-hidden flex flex-col items-center justify-center text-center text-white">
                {viewingRecord.photoUrl ? (
                  <img src={viewingRecord.photoUrl} alt="Photo" className="w-full h-full object-cover" />
                ) : (
                  <div className="p-4 space-y-1">
                    <UserCheck className="w-12 h-12 mx-auto text-[#D9B84A]" />
                    <span className="font-bold text-xs block">BIOMÉTRIE CERTIFIÉE</span>
                    <span className="text-[9px] text-[#DCE4EE]/70 font-mono">ICAO-9303</span>
                  </div>
                )}
              </div>

              {/* Civil Details */}
              <div className="sm:col-span-2 space-y-2">
                <div className="p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                  <span className="text-[10px] text-[#0A1B2A]/60 block uppercase font-semibold">Nom Complet</span>
                  <span className="font-bold text-sm text-[#08243F]">{viewingRecord.fullName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2.5 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                    <span className="text-[9px] text-[#0A1B2A]/60 block uppercase font-semibold">Date de Naissance</span>
                    <span className="font-bold text-xs">{viewingRecord.birthDate}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                    <span className="text-[9px] text-[#0A1B2A]/60 block uppercase font-semibold">Sexe</span>
                    <span className="font-bold text-xs">{viewingRecord.gender === 'F' ? 'Féminin' : 'Masculin'}</span>
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                  <span className="text-[9px] text-[#0A1B2A]/60 block uppercase font-semibold">Document & Référence</span>
                  <span className="font-bold text-xs text-[#0E3A66]">{viewingRecord.documentType} : {viewingRecord.documentNumber}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                  <span className="text-[9px] text-[#0A1B2A]/60 block uppercase font-semibold">Téléphone (Mobile Money)</span>
                  <span className="font-mono font-bold text-xs text-[#1E8E5A]">{viewingRecord.phone}</span>
                </div>
              </div>
            </div>

            {/* Address & Program */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                <span className="text-[9px] text-[#0A1B2A]/60 block uppercase font-semibold">Adresse & Commune</span>
                <span className="font-medium text-xs text-[#08243F]">{viewingRecord.address}, {viewingRecord.commune} ({viewingRecord.province})</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                <span className="text-[9px] text-[#0A1B2A]/60 block uppercase font-semibold">Programme Assigné</span>
                <span className="font-bold text-xs text-[#08243F]">{viewingRecord.assignedProgram}</span>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEFF5]">
              <button
                type="button"
                onClick={() => {
                  const rec = viewingRecord;
                  setViewingRecord(null);
                  setPrintReceiptRecord(rec);
                }}
                className="px-4 py-2 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-white font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimer Récépissé A4</span>
              </button>
              <button
                type="button"
                onClick={() => setViewingRecord(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* B. EDIT RECORD MODAL */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border-2 border-[#C9A227] p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
              <h3 className="font-display font-extrabold text-base text-[#08243F]">
                Rectification du Dossier · {editingRecord.csuNumber}
              </h3>
              <button
                type="button"
                onClick={() => setEditingRecord(null)}
                className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block font-bold text-[#08243F] mb-1">Nom Complet du Titulaire</label>
                <input
                  type="text"
                  value={editingRecord.fullName}
                  onChange={(e) => setEditingRecord({ ...editingRecord, fullName: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-semibold text-[#08243F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#08243F] mb-1">Téléphone Mobile Money</label>
                  <input
                    type="text"
                    value={editingRecord.phone}
                    onChange={(e) => setEditingRecord({ ...editingRecord, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-mono text-[#08243F]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#08243F] mb-1">Commune</label>
                  <input
                    type="text"
                    value={editingRecord.commune}
                    onChange={(e) => setEditingRecord({ ...editingRecord, commune: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] text-[#08243F]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#08243F] mb-1">Adresse Domiciliaire</label>
                <input
                  type="text"
                  value={editingRecord.address}
                  onChange={(e) => setEditingRecord({ ...editingRecord, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] text-[#08243F]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#08243F] mb-1">Statut du Dossier</label>
                  <select
                    value={editingRecord.status}
                    onChange={(e) => setEditingRecord({ ...editingRecord, status: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-semibold text-[#08243F]"
                  >
                    <option value="Certifié">Certifié (Biométrie OK)</option>
                    <option value="En attente">En attente de validation</option>
                    <option value="Plan B (Témoins)">Plan B (Témoins)</option>
                    <option value="Rejeté">Rejeté</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#08243F] mb-1">Programme Social</label>
                  <select
                    value={editingRecord.assignedProgram}
                    onChange={(e) => setEditingRecord({ ...editingRecord, assignedProgram: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-semibold text-[#08243F]"
                  >
                    <option value="Filet Social & Maternité">Filet Social & Maternité</option>
                    <option value="Filet Social Direct">Filet Social Direct</option>
                    <option value="Bourses Scolaires & Cantines">Bourses Scolaires & Cantines</option>
                    <option value="Assistance Déplacés & Vivres">Assistance Déplacés & Vivres</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEFF5]">
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-bold cursor-pointer"
              >
                Enregistrer les Modifications
              </button>
              <button
                type="button"
                onClick={() => setEditingRecord(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* C. DELETE RECORD CONFIRMATION MODAL */}
      {deletingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-white border-2 border-[#C0392B] p-6 shadow-2xl space-y-4 text-xs text-[#0A1B2A]">
            <div className="flex items-center gap-3 text-[#C0392B]">
              <AlertTriangle className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="font-display font-extrabold text-base text-[#08243F]">
                  Confirmer la Suppression Définitive
                </h3>
                <span className="text-[10px] text-[#C0392B] font-semibold">
                  Action irréversible enregistrée dans les logs d'audit
                </span>
              </div>
            </div>

            <p className="text-xs text-[#0A1B2A]/80 leading-relaxed">
              Êtes-vous sûr de vouloir supprimer le dossier <strong>{deletingRecord.csuNumber}</strong> appartenant à <strong>{deletingRecord.fullName}</strong> ?
            </p>

            <div className="flex justify-end gap-2 pt-3 border-t border-[#EAEFF5]">
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-[#C0392B] hover:bg-[#a92b1f] text-white font-bold cursor-pointer"
              >
                Supprimer Définitivement
              </button>
              <button
                type="button"
                onClick={() => setDeletingRecord(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-semibold cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* D. CREATE NEW RECORD MULTI-STEP MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border-2 border-[#14477E] p-6 shadow-2xl space-y-5 text-xs text-[#0A1B2A]">
            <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
              <div>
                <h3 className="font-display font-extrabold text-base text-[#08243F]">
                  Nouvel Enrôlement au Registre Social Unifié (CSU RDC)
                </h3>
                <span className="text-[10px] text-[#0A1B2A]/60">
                  Étape {newStep} sur 3 · Station Kalamu Centre
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step 1: Civil Identity */}
            {newStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-[#08243F] mb-1">
                    Nom Complet du Chef de Ménage (Nom, Postnom, Prénom) *
                  </label>
                  <input
                    type="text"
                    value={newFullName}
                    onChange={(e) => setNewFullName(e.target.value)}
                    placeholder="Ex: KALONJI MUKENDI PATRICK"
                    className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-semibold text-[#08243F] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#08243F] mb-1">Date de Naissance</label>
                    <input
                      type="date"
                      value={newBirthDate}
                      onChange={(e) => setNewBirthDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] text-[#08243F]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#08243F] mb-1">Genre</label>
                    <select
                      value={newGender}
                      onChange={(e) => setNewGender(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-semibold text-[#08243F]"
                    >
                      <option value="F">Féminin</option>
                      <option value="M">Masculin</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#08243F] mb-1">Document Présenté</label>
                    <select
                      value={newDocType}
                      onChange={(e) => setNewDocType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-semibold text-[#08243F]"
                    >
                      <option value="CENI">Carte d'Électeur CENI</option>
                      <option value="Passeport">Passeport biométrique RDC</option>
                      <option value="Plan B (Témoins)">Plan B (Sans papiers / Témoins)</option>
                      <option value="Acte Naissance">Acte de Naissance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#08243F] mb-1">Numéro du Document</label>
                    <input
                      type="text"
                      value={newDocNumber}
                      onChange={(e) => setNewDocNumber(e.target.value)}
                      placeholder="Ex: CENI-2023-88910"
                      className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-mono text-[#08243F]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Domicile, Contact & Household */}
            {newStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#08243F] mb-1">Numéro Mobile Money (Versements)</label>
                    <input
                      type="text"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="+243 998 000 000"
                      className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-mono text-[#08243F]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#08243F] mb-1">Commune / Ville</label>
                    <input
                      type="text"
                      value={newCommune}
                      onChange={(e) => setNewCommune(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] text-[#08243F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#08243F] mb-1">Adresse & Quartier</label>
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="Av. des Marais n° 12, Quartier Matonge"
                    className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] text-[#08243F]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#08243F] mb-1">Taille du Ménage (Nombre de personnes)</label>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={newHouseholdSize}
                      onChange={(e) => setNewHouseholdSize(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-bold text-[#08243F]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#08243F] mb-1">Programme Cible Éligible</label>
                    <select
                      value={newProgram}
                      onChange={(e) => setNewProgram(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] font-semibold text-[#08243F]"
                    >
                      <option value="Filet Social & Maternité">Filet Social & Maternité</option>
                      <option value="Filet Social Direct">Filet Social Direct</option>
                      <option value="Bourses Scolaires & Cantines">Bourses Scolaires & Cantines</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Biometrics & Photo Capture */}
            {newStep === 3 && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#08243F] text-white flex flex-col items-center justify-center space-y-3">
                  <div className="relative w-40 h-48 rounded-xl overflow-hidden bg-[#0A2E52] border-2 border-[#C9A227] flex items-center justify-center">
                    {isCameraActive ? (
                      <video ref={videoRef} playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
                    ) : newPhoto ? (
                      <img src={newPhoto} alt="Snapshot" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-2 text-[#DCE4EE]/70">
                        <Camera className="w-8 h-8 mx-auto text-[#D9B84A] mb-1" />
                        <span className="text-[10px]">Photo biométrique requise</span>
                      </div>
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                  </div>

                  <div className="flex gap-2">
                    {isCameraActive ? (
                      <button
                        type="button"
                        onClick={handleCapturePhoto}
                        className="px-3 py-1.5 rounded-lg bg-[#C9A227] text-[#08243F] font-bold text-xs cursor-pointer"
                      >
                        Prendre Photo
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleStartCamera}
                        className="px-3 py-1.5 rounded-lg bg-[#0E3A66] text-[#D9B84A] font-bold text-xs border border-[#C9A227]/40 cursor-pointer"
                      >
                        Activer Caméra Kit
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1E8E5A]" />
                    <span>Relevé Empreintes Digitales (Capteur Optique Kit)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNewBiometricsTaken(true)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      newBiometricsTaken ? 'bg-[#1E8E5A] text-white' : 'bg-[#08243F] text-white'
                    }`}
                  >
                    {newBiometricsTaken ? '✓ Validé' : 'Capturer'}
                  </button>
                </div>
              </div>
            )}

            {/* Multi-step Footer Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-[#EAEFF5]">
              {newStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setNewStep(newStep - 1)}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer"
                >
                  Précédent
                </button>
              ) : (
                <div />
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleCreateRecord('Rascunho')}
                  className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#08243F] font-semibold text-xs cursor-pointer flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Enregistrer Rascunho</span>
                </button>

                {newStep < 3 ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (!newFullName.trim()) {
                        alert('Veuillez renseigner le nom complet du titulaire.');
                        return;
                      }
                      setNewStep(newStep + 1);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-bold text-xs cursor-pointer"
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCreateRecord('En attente')}
                    className="px-4 py-2 rounded-xl bg-[#1E8E5A] hover:bg-[#156e45] text-white font-bold text-xs cursor-pointer"
                  >
                    Transmettre pour Validation
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* E. PRINT RECEIPT MODAL (FORMAT A4 OFFICIAL DR CONGO) */}
      {printReceiptRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border-4 border-[#08243F] p-6 shadow-2xl text-xs text-[#0A1B2A] space-y-4">
            {/* Header of the Official Receipt */}
            <div className="text-center space-y-1 border-b-2 border-[#08243F] pb-3">
              <span className="font-mono text-[9px] tracking-widest text-[#08243F] uppercase font-bold block">
                RÉPUBLIQUE DÉMOCRATIQUE DU CONGO
              </span>
              <h3 className="font-display font-black text-sm text-[#08243F]">
                RÉCÉPISSÉ OFFICIEL D'ENRÔLEMENT · CSU RDC
              </h3>
              <span className="text-[10px] text-[#0A1B2A]/70 font-mono">
                Certificat Provisoire d'Identification Sociale
              </span>
            </div>

            {/* Receipt Body */}
            <div className="space-y-2 p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
              <div className="flex justify-between items-center border-b border-[#DCE4EE] pb-2">
                <div>
                  <span className="text-[9px] text-[#0A1B2A]/60 block font-mono">NUMÉRO NATIONAL CSU</span>
                  <span className="font-mono font-extrabold text-sm text-[#08243F]">
                    {printReceiptRecord.csuNumber}
                  </span>
                </div>
                <div className="w-14 h-14 bg-white p-1 rounded-lg border border-[#08243F] flex items-center justify-center">
                  <QrCode className="w-12 h-12 text-[#08243F]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <span className="text-[9px] text-[#0A1B2A]/60 block">Titulaire :</span>
                  <strong className="text-[#08243F]">{printReceiptRecord.fullName}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-[#0A1B2A]/60 block">Document :</span>
                  <span>{printReceiptRecord.documentType} ({printReceiptRecord.documentNumber})</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#0A1B2A]/60 block">Commune :</span>
                  <span>{printReceiptRecord.commune} ({printReceiptRecord.province})</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#0A1B2A]/60 block">Membres rattachés :</span>
                  <span>{printReceiptRecord.householdSize} personnes</span>
                </div>
              </div>
            </div>

            {/* Stamp & Signature Notice */}
            <div className="p-2.5 rounded-xl border border-dashed border-[#08243F] text-center text-[10px] text-[#0A1B2A]/70 space-y-1">
              <span>Sceau et Signature de l'Agent Enrôleur : <strong>{printReceiptRecord.registeredBy}</strong></span>
              <span className="block font-mono text-[9px] text-[#1E8E5A] font-bold">
                VALIDÉ PAR HSM CRYPTOGRAPHIQUE SOUVERAIN · RDC 2026
              </span>
            </div>

            {/* Print Buttons */}
            <div className="flex justify-end gap-2 pt-2 border-t border-[#EAEFF5]">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-bold text-xs shadow flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimer Récépissé</span>
              </button>
              <button
                type="button"
                onClick={() => setPrintReceiptRecord(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
