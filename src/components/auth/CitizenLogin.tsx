import React, { useState, useEffect, useRef } from 'react';
import { CsuLogo } from '../brand/CsuLogo';
import { CsuMotif } from '../brand/CsuMotif';
import { authService } from '../../services/authService';
import { SupportedLang } from '../../types';
import {
  Phone,
  ScanFace,
  QrCode,
  ShieldCheck,
  ChevronLeft,
  ArrowRight,
  RotateCw,
  Lock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface CitizenLoginProps {
  currentLang: SupportedLang;
  onNavigate: (route: string) => void;
  onLoginSuccess: (userName: string, csuNumber: string) => void;
}

export const CitizenLogin: React.FC<CitizenLoginProps> = ({
  currentLang,
  onNavigate,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'otp' | 'bio' | 'qr'>('otp');

  // Tab A: Phone & OTP States
  const [identifier, setIdentifier] = useState('+243 ');
  const [otpStep, setOtpStep] = useState<'phone' | 'code'>('phone');
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasShake, setHasShake] = useState(false);
  const [isOtpSuccess, setIsOtpSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Tab B: Biometric simulation
  const [bioScanning, setBioScanning] = useState(false);
  const [bioSuccess, setBioSuccess] = useState(false);

  // Tab C: QR Scan simulation
  const [qrScanned, setQrScanned] = useState(false);

  // Resend Countdown Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpStep === 'code' && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpStep, resendTimer]);

  // Handle phone format
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('+243')) {
      val = '+243 ' + val.replace(/^\+?243\s*/, '');
    }
    setIdentifier(val);
    setErrorMsg(null);
  };

  // Step 1: Send OTP code
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await authService.requestCitizenOtp(identifier);
      setOtpStep('code');
      setResendTimer(30);
      setTimeout(() => inputRefs.current[0]?.focus(), 150);
    } catch (err: any) {
      setErrorMsg(err.message || 'Erreur lors de l’envoi du SMS.');
      triggerShake();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Handle single OTP digit input & auto-advance
  const handleOtpDigitChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;

    const next = [...otpValues];
    next[index] = val.slice(-1);
    setOtpValues(next);
    setErrorMsg(null);

    // Auto-advance
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 filled
    if (next.every((d) => d !== '') && index === 5) {
      verifyOtpCode(next.join(''));
    }
  };

  // Handle backspace navigation
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste for full 6 digits
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const next = [...otpValues];
    for (let i = 0; i < pasted.length; i++) {
      next[i] = pasted[i];
    }
    setOtpValues(next);

    if (pasted.length === 6) {
      verifyOtpCode(pasted);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  // Trigger shake animation on error
  const triggerShake = () => {
    setHasShake(true);
    setTimeout(() => setHasShake(false), 450);
  };

  // Verify OTP Code
  const verifyOtpCode = async (codeToVerify?: string) => {
    const code = codeToVerify || otpValues.join('');
    if (code.length < 6) {
      setErrorMsg('Veuillez saisir les 6 chiffres du code reçu.');
      triggerShake();
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await authService.verifyCitizenOtp(code);
      setIsOtpSuccess(true);
      setTimeout(() => {
        onLoginSuccess(res.user.name, res.user.csuNumber);
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || 'Code de vérification incorrect.');
      triggerShake();
      setIsSubmitting(false);
    }
  };

  // Biometric verification flow (2s simulation)
  const handleBiometricAuth = async () => {
    setBioScanning(true);
    setErrorMsg(null);
    try {
      const res = await authService.verifyCitizenBiometrics();
      setBioSuccess(true);
      setTimeout(() => {
        onLoginSuccess(res.user.name, res.user.csuNumber);
      }, 700);
    } catch (err: any) {
      setErrorMsg('Échec de la reconnaissance faciale. Veuillez utiliser le code OTP.');
      setBioScanning(false);
    }
  };

  // QR Code tap simulation
  const handleSimulateQrScan = () => {
    setQrScanned(true);
    setTimeout(() => {
      onLoginSuccess('Mbiya Tshilombo Esther', 'CSU-2026-9941-8412');
    }, 1200);
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-[#08243F] via-[#0A2E52] to-[#08243F] text-white flex flex-col justify-center py-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Congolese motif watermark */}
      <CsuMotif variant="login-bg" opacity={0.06} />

      <div className="max-w-xl mx-auto w-full relative z-10 space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('#/entrar')}
            className="flex items-center gap-1.5 text-xs text-[#DCE4EE]/70 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Changer de modalité</span>
          </button>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#D9B84A]">
            <Lock className="w-3.5 h-3.5" />
            <span>Espace Citoyen Vérifié</span>
          </div>
        </div>

        {/* Central Silver Card */}
        <div
          className={`p-8 sm:p-10 rounded-3xl bg-[#EAEFF5] text-[#08243F] shadow-2xl border-2 border-[#DCE4EE] relative ${
            hasShake ? 'animate-shake' : ''
          }`}
        >
          {/* Top Brand & Title */}
          <div className="text-center space-y-2 mb-8">
            <CsuLogo variant="seal" size="md" className="mx-auto drop-shadow-md mb-2" />
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#08243F] tracking-tight">
              Connexion Citoyenne
            </h1>
            <p className="font-citizen text-xs text-[#0A1B2A]/70 max-w-sm mx-auto">
              Accédez à vos avantages, consultez votre carte et vos versements mobile money.
            </p>
          </div>

          {/* 3 Tabs Selection */}
          <div className="flex items-center justify-center p-1 bg-[#DCE4EE] rounded-xl mb-8 gap-1" role="tablist">
            <button
              onClick={() => {
                setActiveTab('otp');
                setErrorMsg(null);
              }}
              role="tab"
              aria-selected={activeTab === 'otp'}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'otp'
                  ? 'bg-white text-[#08243F] shadow-sm'
                  : 'text-[#0A1B2A]/70 hover:text-[#08243F]'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#0E3A66]" />
              <span className="truncate">Téléphone / OTP</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('bio');
                setErrorMsg(null);
              }}
              role="tab"
              aria-selected={activeTab === 'bio'}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'bio'
                  ? 'bg-white text-[#08243F] shadow-sm'
                  : 'text-[#0A1B2A]/70 hover:text-[#08243F]'
              }`}
            >
              <ScanFace className="w-3.5 h-3.5 text-[#C9A227]" />
              <span className="truncate">Biométrie (app)</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('qr');
                setErrorMsg(null);
              }}
              role="tab"
              aria-selected={activeTab === 'qr'}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'qr'
                  ? 'bg-white text-[#08243F] shadow-sm'
                  : 'text-[#0A1B2A]/70 hover:text-[#08243F]'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-[#0E3A66]" />
              <span className="truncate">QR Code</span>
            </button>
          </div>

          {/* TAB A: TÉLÉPHONE + OTP */}
          {activeTab === 'otp' && (
            <div className="space-y-6">
              {otpStep === 'phone' ? (
                <form onSubmit={handleRequestOtp} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-[#08243F] mb-1.5">
                      Numéro de Téléphone (+243) ou Numéro CSU :
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={identifier}
                        onChange={handlePhoneChange}
                        placeholder="+243 81 234 5678"
                        className="w-full bg-white border border-[#DCE4EE] rounded-xl px-4 py-3 text-sm font-mono text-[#08243F] font-semibold focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                        required
                        autoFocus
                      />
                    </div>
                    <span className="text-[11px] text-[#0A1B2A]/60 block mt-1.5">
                      Un code SMS sécurisé à 6 chiffres vous sera envoyé gratuitement.
                    </span>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-[#C0392B]/10 border border-[#C0392B]/30 flex items-center gap-2 text-xs text-[#C0392B] font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <RotateCw className="w-4 h-4 animate-spin text-[#08243F]" />
                    ) : (
                      <>
                        <span>Recevoir mon code par SMS</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* 6 OTP BOXES */
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="text-center space-y-1">
                    <span className="text-xs text-[#0A1B2A]/70">Code envoyé au numéro :</span>
                    <div className="font-mono font-bold text-sm text-[#08243F] flex items-center justify-center gap-2">
                      <span>{identifier}</span>
                      <button
                        onClick={() => {
                          setOtpStep('phone');
                          setErrorMsg(null);
                        }}
                        className="text-[11px] text-[#9C7B1E] hover:underline font-sans font-medium"
                      >
                        (Modifier)
                      </button>
                    </div>
                  </div>

                  {/* 6 Input Boxes */}
                  <div
                    className={`flex items-center justify-center gap-2 sm:gap-3 p-3 rounded-2xl transition-all ${
                      isOtpSuccess
                        ? 'bg-[#1E8E5A]/15 border-2 border-[#1E8E5A] ring-4 ring-[#1E8E5A]/20'
                        : ''
                    }`}
                    onPaste={handleOtpPaste}
                  >
                    {otpValues.map((digit, i) => (
                      <input
                        key={`otp-${i}`}
                        ref={(el) => {
                          inputRefs.current[i] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpDigitChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className={`w-11 h-13 sm:w-12 sm:h-14 text-center font-mono text-xl sm:text-2xl font-extrabold rounded-xl border-2 transition-all focus:outline-none ${
                          digit
                            ? 'border-[#0E3A66] bg-white text-[#08243F]'
                            : 'border-[#DCE4EE] bg-white text-[#08243F]'
                        } focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/40`}
                      />
                    ))}
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-[#C0392B]/10 border border-[#C0392B]/30 flex items-center gap-2 text-xs text-[#C0392B] font-medium">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {isOtpSuccess && (
                    <div className="p-3 rounded-xl bg-[#1E8E5A]/10 border border-[#1E8E5A]/30 flex items-center justify-center gap-2 text-xs text-[#1E8E5A] font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Code authentifié ! Redirection vers votre Compte Gov...</span>
                    </div>
                  )}

                  {/* Actions & Resend */}
                  <div className="space-y-3">
                    <button
                      onClick={() => verifyOtpCode()}
                      disabled={isSubmitting || isOtpSuccess}
                      className="w-full py-3.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <RotateCw className="w-4 h-4 animate-spin text-[#08243F]" />
                      ) : (
                        <span>Valider et Accéder à mon Compte</span>
                      )}
                    </button>

                    <div className="text-center text-xs text-[#0A1B2A]/70">
                      {resendTimer > 0 ? (
                        <span>Renvoyer un nouveau code dans <strong className="font-mono text-[#08243F]">{resendTimer}s</strong></span>
                      ) : (
                        <button
                          onClick={() => {
                            setResendTimer(30);
                            setErrorMsg(null);
                          }}
                          className="font-bold text-[#0E3A66] hover:text-[#C9A227] hover:underline cursor-pointer"
                        >
                          Renvoyer le code SMS maintenant
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB B: BIOMÉTRIE (APP) */}
          {activeTab === 'bio' && (
            <div className="space-y-6 text-center py-4">
              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                {bioScanning && (
                  <>
                    <div className="absolute inset-0 rounded-full border-2 border-[#C9A227] animate-ring-pulse pointer-events-none" />
                    <div className="absolute -inset-4 rounded-full border border-[#14477E] animate-ping opacity-25 pointer-events-none" />
                  </>
                )}
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                    bioSuccess
                      ? 'bg-[#1E8E5A] text-white'
                      : bioScanning
                      ? 'bg-[#0E3A66] text-[#D9B84A] shadow-[0_0_25px_#C9A227]'
                      : 'bg-white border-2 border-[#DCE4EE] text-[#0E3A66]'
                  }`}
                >
                  {bioSuccess ? (
                    <CheckCircle2 className="w-12 h-12" />
                  ) : (
                    <ScanFace className="w-12 h-12" />
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-display font-bold text-lg text-[#08243F]">
                  {bioSuccess
                    ? 'Identité Biométrique Confirmée'
                    : bioScanning
                    ? 'Vérification biométrique en cours...'
                    : 'Reconnaissance Faciale CSU App'}
                </h3>
                <p className="font-citizen text-xs text-[#0A1B2A]/70 max-w-xs mx-auto">
                  {bioScanning
                    ? 'Synchronisation avec le kit sécurisé de votre terminal mobile...'
                    : 'Placez votre visage dans l’objectif de votre smartphone ou ouvrez l’application CSU Mobile.'}
                </p>
              </div>

              {!bioSuccess && (
                <button
                  onClick={handleBiometricAuth}
                  disabled={bioScanning}
                  className="px-6 py-3.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer disabled:opacity-60"
                >
                  {bioScanning ? (
                    <>
                      <RotateCw className="w-4 h-4 animate-spin text-[#08243F]" />
                      <span>Traitement de l'empreinte faciale...</span>
                    </>
                  ) : (
                    <>
                      <ScanFace className="w-4 h-4" />
                      <span>Ouvrir dans l'app CSU Mobile</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* TAB C: QR CODE SCAN */}
          {activeTab === 'qr' && (
            <div className="space-y-6 text-center py-4">
              <div className="relative w-48 h-48 mx-auto p-4 bg-white rounded-2xl border-2 border-[#DCE4EE] shadow-lg flex items-center justify-center overflow-hidden">
                {/* QR Code SVG */}
                <QrCode className="w-36 h-36 text-[#08243F]" />

                {/* Animated Green Laser Scan Line */}
                <div className="absolute left-2 right-2 h-0.5 bg-[#1E8E5A] shadow-[0_0_10px_#1E8E5A] animate-qr-scan" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#08243F] text-[#D9B84A] text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#1E8E5A] animate-ping" />
                  <span>En attente de l'app CSU Mobile...</span>
                </div>
                <p className="font-citizen text-xs text-[#0A1B2A]/70 max-w-xs mx-auto">
                  Ouvrez l’application CSU sur votre smartphone et scannez ce code pour une connexion sans saisie.
                </p>
              </div>

              {/* Demo button to simulate the scan */}
              <button
                onClick={handleSimulateQrScan}
                className="text-xs font-semibold text-[#0E3A66] hover:text-[#9C7B1E] underline cursor-pointer"
              >
                (Simuler le scan automatique par l'application)
              </button>
            </div>
          )}

          {/* Footer Auxiliary Links */}
          <div className="mt-8 pt-6 border-t border-[#DCE4EE] flex flex-wrap items-center justify-between text-xs text-[#0A1B2A]/75 gap-2">
            <button
              onClick={() => onNavigate('#steps')}
              className="hover:text-[#9C7B1E] transition-colors"
            >
              Activer mon inscription
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setErrorMsg('Pour réinitialiser votre accès, composez le 108 ou visitez votre commune.')}
              className="hover:text-[#9C7B1E] transition-colors"
            >
              Accès oublié
            </button>
            <span aria-hidden="true">·</span>
            <a href="#faq" className="hover:text-[#9C7B1E] transition-colors flex items-center gap-1">
              <HelpCircle className="w-3 h-3" />
              <span>Aide</span>
            </a>
          </div>
        </div>

        {/* Legal & Security Stamp */}
        <div className="text-center text-xs text-[#DCE4EE]/70 space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#1E8E5A]" />
            <span>Sécurité certifiée conforme à la Loi n° 09/001 du 10/01/2009</span>
          </div>
          <p className="text-[11px] text-[#DCE4EE]/50">
            Chiffrement de bout en bout · Données souveraines hébergées en RD Congo
          </p>
        </div>
      </div>
    </div>
  );
};
