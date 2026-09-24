import React, { useState, useRef, useEffect } from 'react';
import { CsuIdCard } from '../common/CsuIdCard';
import {
  User,
  ShieldCheck,
  QrCode,
  CreditCard,
  History,
  Gift,
  FileEdit,
  Share2,
  Bell,
  Settings,
  Camera,
  Upload,
  RefreshCw,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Download,
  Calendar,
  Phone,
  MapPin,
  Lock,
  MessageSquare,
  HelpCircle,
  Send,
  Eye,
  X,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Sliders,
  DollarSign,
  Building,
  HeartPulse,
  GraduationCap,
  Baby,
} from 'lucide-react';

interface CitizenPlatformProps {
  citizenData?: { name: string; csuNumber: string } | null;
  onNavigateHome: () => void;
  onLogout: () => void;
}

type TabType =
  | 'overview'
  | 'profile'
  | 'services'
  | 'benefits'
  | 'corrections'
  | 'data-sharing'
  | 'support'
  | 'settings';

export const CitizenPlatform: React.FC<CitizenPlatformProps> = ({
  citizenData,
  onNavigateHome,
  onLogout,
}) => {
  // Navigation State inside Citizen Account
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Citizen Profile State
  const csuNumber = citizenData?.csuNumber || 'CSU-2026-9941-8412';
  const fullName = citizenData?.name || 'Mbiya Tshilombo Esther';

  // Photo & Biometrics State
  const [citizenPhoto, setCitizenPhoto] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isPhotoCapturing, setIsPhotoCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Copy Feedback State
  const [isCopied, setIsCopied] = useState(false);

  // QR Code Presentation Modal
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [qrToken, setQrToken] = useState('7F9B2C4E9102');
  const [qrTimer, setQrTimer] = useState(60);

  // Correction Request Form State
  const [correctionType, setCorrectionType] = useState('telephone');
  const [correctionDetails, setCorrectionDetails] = useState('');
  const [correctionSuccess, setCorrectionSuccess] = useState(false);
  const [correctionHistory, setCorrectionHistory] = useState([
    {
      id: 'REC-2026-0814',
      date: '10/02/2026',
      type: 'Téléphone Mobile Money',
      status: 'Validé',
      details: 'Mise à jour vers numéro Airtel 0998123456 pour les transferts directs.',
    },
    {
      id: 'REC-2026-0102',
      date: '16/01/2026',
      type: 'Orthographe du nom',
      status: 'Traité',
      details: 'Rectification de l’accent sur MBIYA TSHILOMBO.',
    },
  ]);

  // Data Sharing Consents
  const [sharingConsents, setSharingConsents] = useState([
    {
      id: 'sante',
      name: 'Ministère de la Santé Publique & Hygiène',
      purpose: 'Gratuité de la maternité et des soins pédiatriques de 0 à 5 ans au Centre Hospitalier de Kalamu.',
      enabled: true,
      lastAccess: '12/03/2026 à 09:42',
      icon: HeartPulse,
    },
    {
      id: 'education',
      name: 'Ministère de l’Éducation Nationale (EPSP)',
      purpose: 'Vérification de la gratuité scolaire et attribution des kits de fournitures pour David et Sarah.',
      enabled: true,
      lastAccess: '05/03/2026 à 14:15',
      icon: GraduationCap,
    },
    {
      id: 'airtel',
      name: 'Opérateur Airtel Money (Transfert Social)',
      purpose: 'Versement automatisé des allocations mensuelles de 75 000 CDF directement sur le portefeuille mobile.',
      enabled: true,
      lastAccess: '15/03/2026 à 08:00',
      icon: DollarSign,
    },
    {
      id: 'fonds_social',
      name: 'Fonds Social de la République (FSRDC)',
      purpose: 'Éligibilité aux programmes de travaux publics à haute intensité de main-d’œuvre (THIMO).',
      enabled: false,
      lastAccess: 'Jamais',
      icon: Building,
    },
  ]);

  // Notifications State
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Versement Allocation Filet Social effectué',
      category: 'Paiement',
      message: 'Votre allocation mensuelle de 75 000 CDF a été créditée sur votre compte Airtel Money (+243 998 123 456). Réf: TR-94184.',
      time: 'Hier à 10:14',
      isUnread: true,
    },
    {
      id: 2,
      title: 'Récépissé Biométrique validé par l’Agent N1',
      category: 'Identité',
      message: 'Votre enrôlement au Registre Social Unifié a atteint le Niveau 3 (Certification Biométrique souveraine permanente).',
      time: '15 Mars 2026',
      isUnread: false,
    },
    {
      id: 3,
      title: 'Campagne de Santé Infantile · Commune de Kalamu',
      category: 'Santé',
      message: 'Vaccination gratuite contre la rougeole et la polio pour les enfants de moins de 5 ans du 28 au 30 Mars au Centre de Santé.',
      time: '12 Mars 2026',
      isUnread: false,
    },
  ]);

  // Support / Chat State
  const [supportMessage, setSupportMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'csu_agent',
      text: 'Bonjour Mbiya ! Je suis le conseiller d’assistance du Registre Social Unifié (CSU RDC). Comment puis-je vous aider aujourd’hui ?',
      time: '10:00',
    },
  ]);

  // Settings State
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [govLanguage, setGovLanguage] = useState('Français');

  // Copy CSU Number
  const handleCopyCsu = () => {
    navigator.clipboard.writeText(csuNumber);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  // QR Modal Countdown Timer
  useEffect(() => {
    if (!isQrModalOpen) return;
    const interval = setInterval(() => {
      setQrTimer((prev) => {
        if (prev <= 1) {
          setQrToken(Math.random().toString(36).substring(2, 8).toUpperCase() + '9102');
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isQrModalOpen]);

  // Start Real Camera for Biometric Capture
  const handleStartCamera = async () => {
    setCameraError(null);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      setCameraError(
        'Accès caméra indisponible ou bloqué par le navigateur. Vous pouvez utiliser le bouton "Importer une photo" ci-dessous.'
      );
      setIsCameraActive(false);
    }
  };

  // Stop Camera
  const handleStopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  // Take Snapshot from Camera
  const handleCapturePhoto = () => {
    setIsPhotoCapturing(true);
    setTimeout(() => {
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth || 480;
        canvas.height = video.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
          setCitizenPhoto(dataUrl);
        }
      }
      handleStopCamera();
      setIsPhotoCapturing(false);
    }, 400);
  };

  // Handle Local File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCitizenPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Submit Correction
  const handleSubmitCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctionDetails.trim()) return;

    const newReq = {
      id: `REC-2026-0${Math.floor(100 + Math.random() * 900)}`,
      date: 'Aujourd’hui',
      type:
        correctionType === 'telephone'
          ? 'Téléphone / Mobile Money'
          : correctionType === 'adresse'
          ? 'Changement d’adresse'
          : correctionType === 'famille'
          ? 'Ajout membre / Nouveau-né'
          : 'Orthographe état civil',
      status: 'En cours d’analyse',
      details: correctionDetails,
    };

    setCorrectionHistory([newReq, ...correctionHistory]);
    setCorrectionDetails('');
    setCorrectionSuccess(true);
    setTimeout(() => setCorrectionSuccess(false), 4000);
  };

  // Send Support Message
  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;

    const userMsg = {
      sender: 'user',
      text: supportMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setSupportMessage('');

    // Simulated reply from government agent
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'csu_agent',
          text: `Votre demande concernant le dossier ${csuNumber} a bien été transmise à la cellule de Kalamu. Un agent communal examine la requête sous 24h.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1000);
  };

  // Toggle Sharing Consent
  const toggleConsent = (id: string) => {
    setSharingConsents((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  // Unread notifications count
  const unreadCount = notifications.filter((n) => n.isUnread).length;

  // Citizen Navigation Tabs Definition
  const citizenTabs: {
    id: TabType;
    label: string;
    shortLabel: string;
    icon: React.ElementType;
    badge?: number;
  }[] = [
    { id: 'overview', label: 'Vue d’Ensemble & Carte', shortLabel: 'Accueil', icon: CreditCard },
    { id: 'profile', label: 'Profil & Biométrie', shortLabel: 'Profil', icon: User },
    { id: 'benefits', label: 'Prestations & Aides', shortLabel: 'Aides', icon: Gift },
    { id: 'services', label: 'Historique Services', shortLabel: 'Services', icon: History },
    { id: 'corrections', label: 'Demande Rectification', shortLabel: 'Demandes', icon: FileEdit },
    { id: 'data-sharing', label: 'Partage Données', shortLabel: 'Partage', icon: Share2 },
    {
      id: 'support',
      label: 'Notifications & Suivi',
      shortLabel: 'Alertes',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { id: 'settings', label: 'Paramètres Gov', shortLabel: 'Réglages', icon: Settings },
  ];

  return (
    <div className="space-y-6 pb-28 lg:pb-6">
      {/* ========================================================= */}
      {/* 1. MOBILE FIXED / STICKY TOP APP BAR (App-like header)    */}
      {/* ========================================================= */}
      <div className="lg:hidden sticky top-0 z-30 bg-[#08243F]/95 backdrop-blur-xl border-b border-[#C9A227]/40 px-3.5 py-2.5 -mx-4 -mt-6 mb-4 flex items-center justify-between shadow-xl">
        {/* Left: Brand & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#14477E] to-[#08243F] border border-[#C9A227] flex items-center justify-center shadow-md shrink-0">
            <span className="font-display font-extrabold text-[11px] text-[#D9B84A]">CSU</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-xs text-white">CSU Gov</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E8E5A] animate-pulse" />
              <span className="text-[9px] font-mono font-bold text-[#D9B84A] bg-[#0A2E52] px-1.5 py-0.2 rounded border border-[#C9A227]/30">
                Niv. 3
              </span>
            </div>
            <div className="text-[10px] text-[#DCE4EE]/70 font-medium truncate max-w-[150px]">
              {fullName}
            </div>
          </div>
        </div>

        {/* Right: Notification Bell & Quick QR Pass Button */}
        <div className="flex items-center gap-2">
          {/* Quick QR Presentation */}
          <button
            type="button"
            onClick={() => setIsQrModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-bold text-[11px] shadow active:scale-95 transition-transform cursor-pointer"
            title="Présenter mon Pass QR"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pass QR</span>
          </button>

          {/* Notification Bell with Badge */}
          <button
            type="button"
            onClick={() => setActiveTab('support')}
            className={`relative p-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'support'
                ? 'bg-[#C9A227] text-[#08243F]'
                : 'bg-[#0E3A66] text-[#DCE4EE] hover:text-white'
            }`}
            title="Notifications & Messages"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C0392B] text-white text-[9px] font-extrabold rounded-full flex items-center justify-center border-2 border-[#08243F] animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Mini Avatar */}
          <div
            onClick={() => setActiveTab('profile')}
            className="w-7 h-7 rounded-xl overflow-hidden bg-[#0A2E52] border border-[#C9A227]/70 flex items-center justify-center cursor-pointer shrink-0"
            title="Mon profil"
          >
            {citizenPhoto ? (
              <img src={citizenPhoto} alt={fullName} className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4 text-[#D9B84A]" />
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MOBILE HERO SUMMARY BANNER                            */}
      {/* ========================================================= */}
      <div className="lg:hidden rounded-2xl bg-gradient-to-br from-[#08243F] via-[#0E3A66] to-[#0A2E52] border border-[#C9A227]/40 p-4 shadow-xl text-white space-y-3">
        <div className="flex items-center gap-3.5">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#0A2E52] border-2 border-[#C9A227] flex items-center justify-center shadow-lg">
              {citizenPhoto ? (
                <img src={citizenPhoto} alt={fullName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#14477E] to-[#08243F] flex flex-col items-center justify-center text-[#D9B84A]">
                  <User className="w-7 h-7" />
                  <span className="text-[7px] font-mono font-bold mt-0.5">BIO</span>
                </div>
              )}
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#1E8E5A] border-2 border-[#08243F] flex items-center justify-center text-[8px] text-white">
              ✓
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-mono font-bold uppercase text-[#D9B84A] bg-[#08243F] px-1.5 py-0.5 rounded border border-[#C9A227]/40">
                Niveau 3 Validé
              </span>
              <span className="text-[10px] text-[#1E8E5A] font-semibold flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3" />
                <span>Actif</span>
              </span>
            </div>
            <h2 className="font-display font-extrabold text-base text-white truncate">
              {fullName}
            </h2>
            <div className="text-[11px] text-[#DCE4EE]/80 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-[#C9A227] shrink-0" />
              <span>Kalamu · Ménage N° 8412</span>
            </div>
          </div>
        </div>

        {/* CSU Chip & 1-tap QR presentation */}
        <div className="pt-2 border-t border-[#14477E]/80 flex items-center justify-between gap-2">
          <div className="bg-[#05182B] border border-[#C9A227]/40 rounded-xl px-3 py-1.5 flex items-center gap-2 min-w-0 flex-1">
            <div className="min-w-0 flex-1">
              <span className="text-[8px] font-mono text-[#D9B84A] block uppercase font-bold">
                Numéro CSU
              </span>
              <span className="font-mono text-xs font-extrabold text-white tracking-wide truncate block">
                {csuNumber}
              </span>
            </div>
            <button
              type="button"
              onClick={handleCopyCsu}
              className="p-1.5 rounded-lg bg-[#0E3A66] text-[#D9B84A] shrink-0 active:scale-90"
              title="Copier"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-[#1E8E5A]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsQrModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-bold text-xs shadow flex items-center gap-1.5 shrink-0 active:scale-95"
          >
            <QrCode className="w-4 h-4" />
            <span>Pass QR</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. DESKTOP CITIZEN TOP HERO BAR (Shown only on lg screens) */}
      {/* ========================================================= */}
      <div className="hidden lg:block rounded-3xl bg-gradient-to-r from-[#08243F] via-[#0E3A66] to-[#0A2E52] border border-[#C9A227]/40 p-5 sm:p-7 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Identity & Avatar */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#0A2E52] border-2 border-[#C9A227] flex items-center justify-center shadow-lg">
                {citizenPhoto ? (
                  <img
                    src={citizenPhoto}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#14477E] to-[#08243F] flex flex-col items-center justify-center text-[#D9B84A]">
                    <User className="w-9 h-9" />
                    <span className="text-[9px] font-mono font-bold mt-0.5">BIOMÉTRIE</span>
                  </div>
                )}
              </div>
              <span
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1E8E5A] border-2 border-[#08243F] flex items-center justify-center text-[10px] text-white"
                title="Identité vérifiée"
              >
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#D9B84A] bg-[#08243F] px-2.5 py-0.5 rounded border border-[#C9A227]/40">
                  Niveau 3 · Biométrique Validé
                </span>
                <span className="text-xs text-[#1E8E5A] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Actif & Conforme</span>
                </span>
              </div>

              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                {fullName}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-[#DCE4EE]/80">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Kinshasa · Commune de Kalamu</span>
                </span>
                <span className="text-[#14477E]">|</span>
                <span className="font-mono text-[#D9B84A]">Ménage N° 8412 · 4 personnes</span>
              </div>
            </div>
          </div>

          {/* CSU Number & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            {/* CSU Number Chip */}
            <div className="bg-[#05182B] border border-[#C9A227]/50 rounded-2xl px-4 py-2.5 flex items-center justify-between gap-4 shadow-inner">
              <div>
                <span className="text-[9px] font-mono text-[#D9B84A] block uppercase font-bold">
                  Numéro National CSU
                </span>
                <span className="font-mono text-sm sm:text-base font-extrabold text-white tracking-wider">
                  {csuNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCsu}
                className="p-2 rounded-xl bg-[#0E3A66] hover:bg-[#14477E] text-[#D9B84A] transition-colors cursor-pointer"
                title="Copier mon numéro CSU"
              >
                {isCopied ? <Check className="w-4 h-4 text-[#1E8E5A]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Present QR Code Button */}
            <button
              type="button"
              onClick={() => setIsQrModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] hover:from-[#F5E29F] hover:to-[#B89224] text-[#08243F] font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <QrCode className="w-4 h-4" />
              <span>Présenter mon QR Code</span>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <div className="mt-6 pt-5 border-t border-[#14477E]/80 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {citizenTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#C9A227] text-[#08243F] font-bold shadow'
                    : 'text-[#DCE4EE] hover:text-white hover:bg-[#0E3A66]/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="w-4 h-4 rounded-full bg-[#C0392B] text-white text-[10px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE TAB CONTENT VIEW */}

      {/* TAB 1: OVERVIEW & ID CARD */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-2">
              <span className="text-xs font-mono font-semibold text-[#0A1B2A]/60 block uppercase">
                Dernier versement reçu
              </span>
              <div className="font-display font-extrabold text-2xl text-[#08243F]">
                75 000 CDF
              </div>
              <p className="text-xs text-[#1E8E5A] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Crédité sur Airtel Money · 15 Mars 2026</span>
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-2">
              <span className="text-xs font-mono font-semibold text-[#0A1B2A]/60 block uppercase">
                Prise en charge médicale
              </span>
              <div className="font-display font-extrabold text-2xl text-[#1E8E5A]">
                100% Gratuite
              </div>
              <p className="text-xs text-[#0A1B2A]/70">
                Santé maternelle & pédiatrique · Kalamu
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-2">
              <span className="text-xs font-mono font-semibold text-[#0A1B2A]/60 block uppercase">
                Composition du Foyer
              </span>
              <div className="font-display font-extrabold text-2xl text-[#08243F]">
                4 Bénéficiaires
              </div>
              <p className="text-xs text-[#0A1B2A]/70">
                1 Chef de ménage + 3 Enfants à charge
              </p>
            </div>
          </div>

          {/* Interactive CSU Card & Benefits Column */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: CsuIdCard with Photo and 3D Flip */}
            <div className="lg:col-span-5 w-full flex flex-col items-center">
              <CsuIdCard
                csuNumber={csuNumber}
                holderName={fullName.toUpperCase()}
                holderGivenName="ESTHER"
                location="Kinshasa · Kalamu"
                photoUrl={citizenPhoto || undefined}
                interactiveHotspots={true}
              />

              <div className="w-full mt-4 p-4 rounded-2xl bg-[#08243F] text-white border border-[#14477E] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#D9B84A]" />
                  <span>Photo biométrique :</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className="text-[#D9B84A] font-bold hover:underline"
                >
                  {citizenPhoto ? 'Mettre à jour' : 'Prendre une photo'}
                </button>
              </div>
            </div>

            {/* Right: Active Social Benefits & Actions */}
            <div className="lg:col-span-7 space-y-5">
              <div className="p-6 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-base text-[#08243F]">
                    Vos Prestations Sociales en Cours
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('benefits')}
                    className="text-xs text-[#0E3A66] hover:text-[#C9A227] font-semibold flex items-center gap-1"
                  >
                    <span>Voir l’échéancier</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#08243F] text-[#D9B84A] flex items-center justify-center font-bold shrink-0">
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#08243F]">
                          Filet Social & Transfert Direct
                        </h4>
                        <p className="text-xs text-[#0A1B2A]/70">
                          75 000 CDF / mois · Prochain virement le <strong>15 Avril 2026</strong>
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#1E8E5A] bg-[#1E8E5A]/10 px-2.5 py-1 rounded shrink-0">
                      Actif
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#1E8E5A]/15 text-[#1E8E5A] flex items-center justify-center font-bold shrink-0">
                        <HeartPulse className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#08243F]">
                          Couverture Santé Maternelle & Infantile
                        </h4>
                        <p className="text-xs text-[#0A1B2A]/70">
                          Accès direct sans avance de frais au Centre Hospitalier de Kalamu
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#1E8E5A] bg-[#1E8E5A]/10 px-2.5 py-1 rounded shrink-0">
                      Bénéficiaire
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0E3A66]/15 text-[#0E3A66] flex items-center justify-center font-bold shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-sm text-[#08243F]">
                          Cantines Scolaires & Bourse Primaire
                        </h4>
                        <p className="text-xs text-[#0A1B2A]/70">
                          Repas gratuits & kits scolaires pour David (8 ans) et Sarah (5 ans)
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#1E8E5A] bg-[#1E8E5A]/10 px-2.5 py-1 rounded shrink-0">
                      Inscrits
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Row */}
              <div className="p-5 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm space-y-3">
                <h4 className="font-display font-bold text-sm text-[#08243F]">
                  Opérations et Démarches
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('corrections')}
                    className="p-3 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-white text-xs font-semibold transition-colors flex items-center justify-center text-center cursor-pointer"
                  >
                    Demande de Correction
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('data-sharing')}
                    className="p-3 rounded-xl bg-[#0A2E52] hover:bg-[#14477E] text-white text-xs font-semibold transition-colors flex items-center justify-center text-center cursor-pointer"
                  >
                    Partage des Données
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsQrModalOpen(true)}
                    className="p-3 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] text-xs font-bold transition-transform active:scale-95 flex items-center justify-center text-center cursor-pointer"
                  >
                    Afficher Mon QR Code
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROFILE & BIOMETRIC PHOTO CAPTURE */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Biometric Photo Studio with Live Webcam Capture & Upload */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-[#C9A227]" />
                  <h3 className="font-display font-bold text-base text-[#08243F]">
                    Photo Biométrique du Profil
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-[#1E8E5A] bg-[#1E8E5A]/10 px-2 py-0.5 rounded font-bold">
                  Conforme ICAO
                </span>
              </div>

              {/* Photo Preview / Live Video */}
              <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden bg-[#08243F] border-2 border-[#C9A227] flex items-center justify-center shadow-lg">
                {isCameraActive ? (
                  <>
                    <video
                      ref={videoRef}
                      playsInline
                      muted
                      className="w-full h-full object-cover scale-x-[-1]"
                    />
                    {/* Biometric Oval Guide Overlay */}
                    <div className="absolute inset-0 border-2 border-dashed border-[#D9B84A]/70 rounded-[50%] m-8 pointer-events-none flex items-center justify-center">
                      <span className="text-[10px] font-mono text-[#D9B84A] bg-[#08243F]/80 px-2 py-0.5 rounded">
                        Cadrez votre visage
                      </span>
                    </div>
                  </>
                ) : citizenPhoto ? (
                  <img
                    src={citizenPhoto}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-4 text-[#DCE4EE]/70 space-y-2">
                    <User className="w-16 h-16 text-[#D9B84A]" />
                    <span className="text-xs font-semibold text-white">
                      Aucune photo personnalisée enregistrée
                    </span>
                    <span className="text-[10px]">
                      Activez votre caméra ou importez une photo pour l’intégrer à votre carte CSU.
                    </span>
                  </div>
                )}
                {/* Hidden canvas for snapshot */}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Camera Error Alert */}
              {cameraError && (
                <div className="p-3 rounded-xl bg-[#C0392B]/10 border border-[#C0392B]/30 text-[#C0392B] text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{cameraError}</span>
                </div>
              )}

              {/* Photo Controls */}
              <div className="space-y-3">
                {isCameraActive ? (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleCapturePhoto}
                      disabled={isPhotoCapturing}
                      className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-bold text-xs shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Camera className="w-4 h-4" />
                      <span>{isPhotoCapturing ? 'Capture...' : 'Prendre la photo'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleStopCamera}
                      className="py-2.5 px-4 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={handleStartCamera}
                      className="py-2.5 px-3 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Camera className="w-4 h-4 text-[#D9B84A]" />
                      <span>Activer la caméra</span>
                    </button>

                    <label className="py-2.5 px-3 rounded-xl bg-[#0A2E52] hover:bg-[#14477E] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm">
                      <Upload className="w-4 h-4 text-[#D9B84A]" />
                      <span>Importer un fichier</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {citizenPhoto && (
                  <button
                    type="button"
                    onClick={() => setCitizenPhoto(null)}
                    className="w-full py-2 text-xs text-[#C0392B] hover:underline font-semibold text-center cursor-pointer"
                  >
                    Supprimer la photo actuelle
                  </button>
                )}
              </div>
            </div>

            {/* Right: Detailed Personal Data & Household Composition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Civil Identity Card */}
              <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
                  <h3 className="font-display font-bold text-base text-[#08243F]">
                    Données Civiles & Identité Nationale
                  </h3>
                  <span className="text-xs font-mono text-[#D9B84A] bg-[#08243F] px-2.5 py-0.5 rounded font-bold">
                    Registre Central RDC
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                    <span className="text-[10px] text-[#0A1B2A]/60 font-semibold block uppercase">
                      Nom, Postnom & Prénom
                    </span>
                    <span className="font-bold text-[#08243F] text-sm">{fullName}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                    <span className="text-[10px] text-[#0A1B2A]/60 font-semibold block uppercase">
                      Date & Lieu de Naissance
                    </span>
                    <span className="font-bold text-[#08243F] text-sm">
                      12 Avril 1988 · Kinshasa
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                    <span className="text-[10px] text-[#0A1B2A]/60 font-semibold block uppercase">
                      Document de Référence (CENI)
                    </span>
                    <span className="font-mono font-bold text-[#08243F]">
                      CENI-2023-88410294
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                    <span className="text-[10px] text-[#0A1B2A]/60 font-semibold block uppercase">
                      État Civil & Rôle Foyer
                    </span>
                    <span className="font-bold text-[#08243F]">
                      Mariée · Chef de Ménage
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                    <span className="text-[10px] text-[#0A1B2A]/60 font-semibold block uppercase">
                      Filiation (Père & Mère)
                    </span>
                    <span className="font-semibold text-[#08243F]">
                      Tshilombo Jean-Pierre & Kabena Marie
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE]">
                    <span className="text-[10px] text-[#0A1B2A]/60 font-semibold block uppercase">
                      Téléphone Certifié (Mobile Money)
                    </span>
                    <span className="font-mono font-bold text-[#1E8E5A]">
                      +243 998 123 456 (Airtel)
                    </span>
                  </div>
                </div>
              </div>

              {/* Household / Family Members */}
              <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
                  <div>
                    <h3 className="font-display font-bold text-base text-[#08243F]">
                      Membres du Ménage Rattachés
                    </h3>
                    <p className="text-xs text-[#0A1B2A]/70">
                      Bénéficiaires de la couverture sociale et des allocations familiales
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('corrections')}
                    className="text-xs text-[#0E3A66] hover:text-[#C9A227] font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>+ Déclarer un membre</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: 'Mbiya Tshilombo David',
                      relation: 'Fils',
                      age: '8 ans',
                      programs: 'Cantines & Bourse Scolaire (EP 1 Kalamu)',
                    },
                    {
                      name: 'Mbiya Tshilombo Sarah',
                      relation: 'Fille',
                      age: '5 ans',
                      programs: 'Santé Infantile & Kit Scolaire Maternelle',
                    },
                    {
                      name: 'Mbiya Tshilombo Moïse',
                      relation: 'Fils',
                      age: '2 ans',
                      programs: 'Vaccination 100% & Suivi Pédiatrique',
                    },
                  ].map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#F6F8FB] border border-[#DCE4EE] flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#08243F] text-[#D9B84A] flex items-center justify-center font-bold text-xs">
                          {m.name.split(' ').slice(-1)[0][0]}
                        </div>
                        <div>
                          <div className="font-bold text-[#08243F]">{m.name}</div>
                          <span className="text-[#0A1B2A]/60">
                            {m.relation} · {m.age} · {m.programs}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#1E8E5A] bg-[#1E8E5A]/10 px-2 py-0.5 rounded">
                        Couvert
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SOCIAL BENEFITS & DISBURSEMENTS */}
      {activeTab === 'benefits' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAEFF5] pb-4">
              <div>
                <h3 className="font-display font-bold text-lg text-[#08243F]">
                  Programme National des Filets Sociaux
                </h3>
                <p className="text-xs text-[#0A1B2A]/70">
                  Allocations directes accordées sous l’autorité du Registre Social Unifié (CSU RDC)
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#1E8E5A] bg-[#1E8E5A]/10 px-3 py-1 rounded-full">
                  Statut : Bénéficiaire Actif
                </span>
              </div>
            </div>

            {/* Benefits Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#08243F] to-[#0A2E52] text-white space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#D9B84A] uppercase font-bold">
                    Allocation Monétaire Mensuelle
                  </span>
                  <DollarSign className="w-5 h-5 text-[#D9B84A]" />
                </div>
                <div className="font-display font-extrabold text-3xl text-white">
                  75 000 CDF
                </div>
                <div className="text-xs text-[#DCE4EE]/80 pt-2 border-t border-[#14477E]">
                  Canal de versement : <strong>Airtel Money (+243 998 123 456)</strong>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#0A1B2A]/70 uppercase font-bold">
                    Prochain Virement Programmé
                  </span>
                  <Calendar className="w-5 h-5 text-[#C9A227]" />
                </div>
                <div className="font-display font-extrabold text-3xl text-[#08243F]">
                  15 Avril 2026
                </div>
                <div className="text-xs text-[#1E8E5A] font-semibold pt-2 border-t border-[#DCE4EE] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ordre de virement validé par le Ministère des Finances</span>
                </div>
              </div>
            </div>

            {/* Disbursements History Table */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-sm text-[#08243F]">
                Historique des Versements Reçus
              </h4>
              <div className="overflow-x-auto rounded-2xl border border-[#DCE4EE]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-[#F6F8FB] text-[#08243F] font-mono uppercase font-bold border-b border-[#DCE4EE]">
                    <tr>
                      <th className="py-3 px-4">Date & Heure</th>
                      <th className="py-3 px-4">Référence Virement</th>
                      <th className="py-3 px-4">Montant</th>
                      <th className="py-3 px-4">Opérateur</th>
                      <th className="py-3 px-4">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAEFF5]">
                    {[
                      {
                        date: '15/03/2026 à 08:00',
                        ref: 'ART-9021481-26',
                        amount: '75 000 CDF',
                        op: 'Airtel Money',
                        status: 'Effectué',
                      },
                      {
                        date: '15/02/2026 à 08:12',
                        ref: 'ART-8820194-26',
                        amount: '75 000 CDF',
                        op: 'Airtel Money',
                        status: 'Effectué',
                      },
                      {
                        date: '15/01/2026 à 09:30',
                        ref: 'ART-8401928-26',
                        amount: '75 000 CDF',
                        op: 'Airtel Money',
                        status: 'Effectué',
                      },
                      {
                        date: '15/12/2025 à 08:45',
                        ref: 'ART-7910248-25',
                        amount: '75 000 CDF',
                        op: 'Airtel Money',
                        status: 'Effectué',
                      },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-[#F6F8FB]/60">
                        <td className="py-3 px-4 font-medium text-[#08243F]">{row.date}</td>
                        <td className="py-3 px-4 font-mono text-[#0E3A66]">{row.ref}</td>
                        <td className="py-3 px-4 font-bold text-[#08243F]">{row.amount}</td>
                        <td className="py-3 px-4">{row.op}</td>
                        <td className="py-3 px-4">
                          <span className="font-mono font-bold text-[10px] text-[#1E8E5A] bg-[#1E8E5A]/10 px-2 py-0.5 rounded">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SERVICE HISTORY */}
      {activeTab === 'services' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-4">
            <div>
              <h3 className="font-display font-bold text-lg text-[#08243F]">
                Historique des Démarches et Passages Guichets
              </h3>
              <p className="text-xs text-[#0A1B2A]/70">
                Traçabilité officielle de tous les actes enregistrés sous votre numéro CSU
              </p>
            </div>
            <span className="text-xs font-mono text-[#D9B84A] bg-[#08243F] px-2.5 py-1 rounded font-bold">
              5 Actes Enregistrés
            </span>
          </div>

          <div className="space-y-4">
            {[
              {
                date: '15 Mars 2026',
                category: 'Transfert Social',
                title: 'Versement allocation mensuelle Filet Social (75 000 CDF)',
                place: 'Système Automatique Central · Banque Centrale / Airtel',
                status: 'Traité avec succès',
                badgeColor: 'bg-[#1E8E5A]/10 text-[#1E8E5A]',
              },
              {
                date: '28 Février 2026',
                category: 'Santé Publique',
                title: 'Consultation pédiatrique & vaccination pour Moïse',
                place: 'Centre de Santé de Kalamu · Prise en charge 100% CSU',
                status: 'Validé',
                badgeColor: 'bg-[#0E3A66]/10 text-[#0E3A66]',
              },
              {
                date: '10 Février 2026',
                category: 'Éducation',
                title: 'Rattachement cantine scolaire & fournitures pour David et Sarah',
                place: 'École Primaire 1 Kalamu · Ministère de l’Éducation',
                status: 'Validé',
                badgeColor: 'bg-[#0E3A66]/10 text-[#0E3A66]',
              },
              {
                date: '15 Janvier 2026',
                category: 'Enrôlement',
                title: 'Enrôlement biométrique initial & délivrance Récépissé CSU',
                place: 'Unité Mobile Kit Solaire N° 04 · Commune de Kalamu',
                status: 'Certifié Niveau 3',
                badgeColor: 'bg-[#C9A227]/15 text-[#9C7B1E]',
              },
              {
                date: '02 Janvier 2026',
                category: 'Cadastre',
                title: 'Passage de l’Agent de Cadastre & Déclaration du Chef de Ménage',
                place: 'Quartier Matonge, Kalamu',
                status: 'Clôturé',
                badgeColor: 'bg-[#08243F]/10 text-[#08243F]',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#0A1B2A]/60 font-bold">
                      {item.date}
                    </span>
                    <span className="text-[10px] font-semibold text-[#0E3A66] bg-[#0E3A66]/10 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#08243F]">
                    {item.title}
                  </h4>
                  <p className="text-[#0A1B2A]/70 text-[11px]">{item.place}</p>
                </div>
                <span
                  className={`text-xs font-mono font-bold px-3 py-1 rounded-full shrink-0 ${item.badgeColor}`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: REQUEST CORRECTIONS */}
      {activeTab === 'corrections' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Correction Form */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-5">
              <div className="border-b border-[#EAEFF5] pb-3">
                <h3 className="font-display font-bold text-base text-[#08243F]">
                  Nouvelle Demande de Rectification
                </h3>
                <p className="text-xs text-[#0A1B2A]/70">
                  Formulez une modification officielle de vos données enregistrées au registre national
                </p>
              </div>

              {correctionSuccess && (
                <div className="p-4 rounded-xl bg-[#1E8E5A]/10 border border-[#1E8E5A]/40 text-[#1E8E5A] text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>
                    Demande enregistrée avec succès ! Votre numéro de dossier a été généré ci-dessous.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmitCorrection} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-[#08243F] mb-1">
                    Objet de la modification
                  </label>
                  <select
                    value={correctionType}
                    onChange={(e) => setCorrectionType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] text-[#08243F] font-semibold focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                  >
                    <option value="telephone">
                      Numéro de Téléphone / Portefeuille Mobile Money
                    </option>
                    <option value="adresse">
                      Changement d’adresse, avenue ou commune
                    </option>
                    <option value="famille">
                      Déclaration de naissance ou ajout d’un membre au foyer
                    </option>
                    <option value="orthographe">
                      Correction d’orthographe du Nom, Postnom ou Prénom
                    </option>
                    <option value="deces">
                      Déclaration de décès d’un membre rattaché
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#08243F] mb-1">
                    Description & Justification
                  </label>
                  <textarea
                    rows={4}
                    value={correctionDetails}
                    onChange={(e) => setCorrectionDetails(e.target.value)}
                    placeholder="Précisez les nouvelles informations exactes et le motif..."
                    className="w-full p-3 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] text-[#08243F] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#08243F] mb-1">
                    Pièce justificative (Optionnel)
                  </label>
                  <div className="border-2 border-dashed border-[#DCE4EE] rounded-xl p-4 text-center text-[#0A1B2A]/60 bg-[#F6F8FB]">
                    <Upload className="w-6 h-6 mx-auto mb-1 text-[#C9A227]" />
                    <span className="text-[11px] block">
                      Attestation de résidence, acte de naissance ou certificat
                    </span>
                    <input type="file" className="hidden" id="justif" />
                    <label
                      htmlFor="justif"
                      className="mt-2 inline-block px-3 py-1 bg-[#08243F] text-white rounded-lg cursor-pointer text-[10px] font-bold"
                    >
                      Choisir un fichier
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] hover:from-[#F5E29F] hover:to-[#B89224] text-[#08243F] font-bold text-xs shadow-md transition-all cursor-pointer active:scale-95"
                >
                  Soumettre la demande de rectification
                </button>
              </form>
            </div>

            {/* Right: History of Requests */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
              <div className="border-b border-[#EAEFF5] pb-3">
                <h3 className="font-display font-bold text-base text-[#08243F]">
                  Suivi de Vos Demandes
                </h3>
                <p className="text-xs text-[#0A1B2A]/70">
                  Statut de traitement par les agents de régularisation (N2)
                </p>
              </div>

              <div className="space-y-3">
                {correctionHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-[#0E3A66]">{item.id}</span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          item.status === 'Validé'
                            ? 'bg-[#1E8E5A]/10 text-[#1E8E5A]'
                            : item.status === 'Traité'
                            ? 'bg-[#0E3A66]/10 text-[#0E3A66]'
                            : 'bg-[#C77D0A]/10 text-[#C77D0A]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="font-bold text-[#08243F]">{item.type}</div>
                    <p className="text-[11px] text-[#0A1B2A]/75">{item.details}</p>
                    <span className="text-[10px] text-[#0A1B2A]/50 block">
                      Enregistré le {item.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DATA SHARING & PRIVACY */}
      {activeTab === 'data-sharing' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-6">
          <div className="border-b border-[#EAEFF5] pb-4">
            <h3 className="font-display font-bold text-lg text-[#08243F]">
              Autorisations de Partage des Données
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Contrôlez quelles institutions étatiques et partenaires humanitaires ont accès à vos données du registre
            </p>
          </div>

          <div className="space-y-4">
            {sharingConsents.map((consent) => {
              const Icon = consent.icon;
              return (
                <div
                  key={consent.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#08243F] text-[#D9B84A] flex items-center justify-center font-bold shrink-0 mt-0.5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-sm text-[#08243F]">
                        {consent.name}
                      </h4>
                      <p className="text-[#0A1B2A]/75 text-xs max-w-xl">
                        {consent.purpose}
                      </p>
                      <span className="text-[10px] text-[#0A1B2A]/50 block">
                        Dernier accès : {consent.lastAccess}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span
                      className={`text-xs font-mono font-bold ${
                        consent.enabled ? 'text-[#1E8E5A]' : 'text-[#C0392B]'
                      }`}
                    >
                      {consent.enabled ? 'Autorisé' : 'Révoqué'}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleConsent(consent.id)}
                      className="cursor-pointer transition-transform active:scale-90"
                      title={consent.enabled ? 'Révoquer l’accès' : 'Autoriser l’accès'}
                    >
                      {consent.enabled ? (
                        <ToggleRight className="w-8 h-8 text-[#1E8E5A]" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-[#0A1B2A]/40" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-[#08243F] text-white border border-[#14477E] text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#D9B84A]" />
              <span>
                Vos données sont protégées par la législation souveraine de la RDC et ne sont jamais cédées à des tiers commerciaux.
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#D9B84A] font-bold shrink-0">
              AUDIT SOUVERAIN
            </span>
          </div>
        </div>
      )}

      {/* TAB 7: NOTIFICATIONS & SUPPORT */}
      {activeTab === 'support' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Government Notifications */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#C9A227]" />
                  <h3 className="font-display font-bold text-base text-[#08243F]">
                    Notifications Officielles
                  </h3>
                </div>
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={() =>
                      setNotifications((prev) => prev.map((n) => ({ ...n, isUnread: false })))
                    }
                    className="text-xs text-[#0E3A66] hover:underline font-semibold cursor-pointer"
                  >
                    Tout marquer comme lu
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-2xl border text-xs space-y-1.5 transition-all ${
                      n.isUnread
                        ? 'bg-[#EAEFF5]/60 border-[#C9A227]'
                        : 'bg-[#F6F8FB] border-[#DCE4EE]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#0E3A66] bg-[#0E3A66]/10 px-2 py-0.5 rounded">
                        {n.category}
                      </span>
                      <span className="text-[10px] text-[#0A1B2A]/50">{n.time}</span>
                    </div>
                    <h4 className="font-bold text-[#08243F] text-sm">{n.title}</h4>
                    <p className="text-[11px] text-[#0A1B2A]/80 leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Live Support / Help Desk Chat */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#1E8E5A]" />
                    <h3 className="font-display font-bold text-base text-[#08243F]">
                      Assistance & Contact Direct
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-[#1E8E5A] bg-[#1E8E5A]/10 px-2 py-0.5 rounded font-bold">
                    Agent en ligne
                  </span>
                </div>

                {/* Chat Message Box */}
                <div className="h-64 overflow-y-auto space-y-3 p-3 bg-[#F6F8FB] rounded-2xl border border-[#DCE4EE] my-4 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`p-3 rounded-2xl max-w-[85%] ${
                          msg.sender === 'user'
                            ? 'bg-[#08243F] text-white rounded-br-none'
                            : 'bg-white text-[#08243F] border border-[#DCE4EE] rounded-bl-none shadow-sm'
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>
                      <span className="text-[9px] text-[#0A1B2A]/50 mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendSupport} className="flex items-center gap-2">
                <input
                  type="text"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Posez une question à l'assistance..."
                  className="flex-1 p-2.5 rounded-xl border border-[#DCE4EE] bg-[#F6F8FB] text-xs text-[#08243F] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-[#D9B84A] transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: GOV SETTINGS */}
      {activeTab === 'settings' && (
        <div className="p-6 rounded-3xl bg-white border border-[#DCE4EE] shadow-sm space-y-6">
          <div className="border-b border-[#EAEFF5] pb-4">
            <h3 className="font-display font-bold text-lg text-[#08243F]">
              Paramètres de Votre Compte Gov
            </h3>
            <p className="text-xs text-[#0A1B2A]/70">
              Gérez vos options de sécurité, canaux de contact et préférences linguistiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Security Options */}
            <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-4">
              <h4 className="font-display font-bold text-sm text-[#08243F] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#C9A227]" />
                <span>Sécurité & Authentification</span>
              </h4>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#08243F] block">
                    Double Facteur (2FA SMS)
                  </span>
                  <span className="text-[#0A1B2A]/60 text-[11px]">
                    Code de confirmation envoyé à chaque connexion
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                  className="cursor-pointer"
                >
                  {twoFactorAuth ? (
                    <ToggleRight className="w-8 h-8 text-[#1E8E5A]" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-[#0A1B2A]/40" />
                  )}
                </button>
              </div>

              <div className="pt-2 border-t border-[#DCE4EE]">
                <button
                  type="button"
                  onClick={() => alert('Un SMS de réinitialisation de votre code PIN Gov à 6 chiffres a été envoyé au +243 998 123 456.')}
                  className="text-xs text-[#0E3A66] hover:underline font-bold"
                >
                  Changer mon code PIN Gov (6 chiffres)
                </button>
              </div>
            </div>

            {/* Notification Channels */}
            <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-4">
              <h4 className="font-display font-bold text-sm text-[#08243F] flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#C9A227]" />
                <span>Canaux de Réception des Alertes</span>
              </h4>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#08243F] block">Alertes SMS</span>
                  <span className="text-[#0A1B2A]/60 text-[11px]">
                    Notification des virements et convocations
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSmsAlerts(!smsAlerts)}
                  className="cursor-pointer"
                >
                  {smsAlerts ? (
                    <ToggleRight className="w-8 h-8 text-[#1E8E5A]" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-[#0A1B2A]/40" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#08243F] block">Alertes WhatsApp Gov</span>
                  <span className="text-[#0A1B2A]/60 text-[11px]">
                    Messages officiels sur WhatsApp
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setWhatsappAlerts(!whatsappAlerts)}
                  className="cursor-pointer"
                >
                  {whatsappAlerts ? (
                    <ToggleRight className="w-8 h-8 text-[#1E8E5A]" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-[#0A1B2A]/40" />
                  )}
                </button>
              </div>
            </div>

            {/* Language Preferences */}
            <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3">
              <h4 className="font-display font-bold text-sm text-[#08243F]">
                Langue Nationale Préférée
              </h4>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Langue des notifications SMS et de l’interface
              </p>
              <select
                value={govLanguage}
                onChange={(e) => setGovLanguage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#DCE4EE] bg-white font-semibold text-[#08243F] focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
              >
                <option value="Français">Français (Officiel)</option>
                <option value="Lingala">Lingála</option>
                <option value="Swahili">Kiswahili</option>
                <option value="Tshiluba">Tshiluba</option>
                <option value="Kikongo">Kikongo</option>
              </select>
            </div>

            {/* Legal & Terms */}
            <div className="p-5 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] space-y-3">
              <h4 className="font-display font-bold text-sm text-[#08243F]">
                Mentions Légales & Données
              </h4>
              <p className="text-[11px] text-[#0A1B2A]/70">
                Consultez le décret présidentiel et la charte de confidentialité des ménages en RDC.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => alert('Téléchargement de la charte de confidentialité CSU RDC (PDF).')}
                  className="px-3 py-1.5 rounded-lg bg-[#08243F] text-white font-bold text-[11px]"
                >
                  Charte PDF
                </button>
                <button
                  type="button"
                  onClick={onLogout}
                  className="px-3 py-1.5 rounded-lg bg-[#C0392B] text-white font-bold text-[11px]"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL FOR PRESENTING QR CODE (FULL SCREEN / ZOOM) */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-[32px] bg-gradient-to-b from-[#08243F] via-[#0A2E52] to-[#05182B] border-2 border-[#C9A227] p-6 text-white shadow-2xl space-y-5 text-center">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#14477E] text-[#DCE4EE] hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Seal */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[#D9B84A] uppercase font-bold">
                RÉPUBLIQUE DÉMOCRATIQUE DU CONGO
              </span>
              <h3 className="font-display font-extrabold text-base text-white">
                Pass Citoyen CSU Officiel
              </h3>
            </div>

            {/* High-Res QR Code Card with Rotation Timer */}
            <div className="p-4 rounded-2xl bg-white mx-auto flex flex-col items-center justify-center shadow-lg relative overflow-hidden">
              <div className="w-48 h-48 flex items-center justify-center">
                <QrCode className="w-44 h-44 text-[#08243F]" />
              </div>
              <div className="w-full mt-2 pt-2 border-t border-gray-200 flex items-center justify-between text-[10px] text-[#08243F] font-mono">
                <span className="font-bold">Clé : {qrToken}</span>
                <span className="text-[#C77D0A] font-semibold">
                  Actualisation dans {qrTimer}s
                </span>
              </div>
            </div>

            {/* Citizen Details Summary */}
            <div className="space-y-1 text-xs">
              <div className="font-display font-extrabold text-white text-sm">{fullName}</div>
              <div className="font-mono text-[#D9B84A] font-bold text-xs">{csuNumber}</div>
              <div className="text-[11px] text-[#DCE4EE]/70">Niveau 3 · Biométrie Validée</div>
            </div>

            {/* Verification Badge */}
            <div className="p-2.5 rounded-xl bg-[#08243F] border border-[#14477E] flex items-center justify-center gap-2 text-xs text-[#1E8E5A] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#1E8E5A]" />
              <span>Signature Criptographique Conforme</span>
            </div>

            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-bold text-xs shadow cursor-pointer active:scale-95"
            >
              Fermer le Pass
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. MOBILE PREMIUM BOTTOM NAVIGATION DOCK (Horizontal scroll without scrollbar) */}
      {/* ========================================================= */}
      <nav
        aria-label="Navigation mobile espace citoyen"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#08243F]/95 backdrop-blur-2xl border-t border-[#C9A227]/40 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] px-2 py-1.5 lg:hidden safe-area-pb"
      >
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth py-0.5 px-1 justify-start">
          {citizenTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center min-w-[64px] px-2 py-1.5 rounded-xl transition-all relative shrink-0 cursor-pointer active:scale-90 ${
                  isActive
                    ? 'bg-gradient-to-t from-[#C9A227]/30 via-[#C9A227]/10 to-transparent text-[#E9CE7A] border border-[#C9A227]/60 shadow-[0_0_12px_rgba(201,162,39,0.35)]'
                    : 'text-[#DCE4EE]/70 hover:text-white hover:bg-[#0E3A66]/40'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${
                      isActive ? 'scale-110 text-[#D9B84A]' : ''
                    }`}
                  />
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-[#C0392B] text-white text-[8px] font-extrabold rounded-full flex items-center justify-center border border-[#08243F]">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] tracking-tight truncate mt-1 ${
                    isActive ? 'font-bold text-[#D9B84A]' : 'font-medium'
                  }`}
                >
                  {tab.shortLabel}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227] absolute bottom-0.5 left-1/2 -translate-x-1/2" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
