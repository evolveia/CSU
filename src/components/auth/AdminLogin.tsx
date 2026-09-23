import React, { useState, useEffect } from 'react';
import { CsuLogo } from '../brand/CsuLogo';
import { CsuMotif } from '../brand/CsuMotif';
import { authService } from '../../services/authService';
import { AdminProfile } from '../../types';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  ChevronLeft,
  ArrowRight,
  RotateCw,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  Scale,
  Sparkles,
} from 'lucide-react';
import { Skeleton } from '../feedback/Skeleton';

interface AdminLoginProps {
  onNavigate: (route: string) => void;
  onAdminLoginSuccess: (profile: AdminProfile) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate, onAdminLoginSuccess }) => {
  const [step, setStep] = useState<'credentials' | 'mfa' | 'verifying'>('credentials');
  const [email, setEmail] = useState('supervisor.gombe@gouv.cd');
  const [password, setPassword] = useState('GouvRdc2026!#');
  const [showPassword, setShowPassword] = useState(false);
  const [totpCode, setTotpCode] = useState('');
  const [trustDevice, setTrustDevice] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Rotating mission quotes on the left pane
  const quotes = [
    {
      text: "Garantir l'équité de chaque franc public et la protection inconditionnelle de chaque famille congolaise.",
      author: "Charte Républicaine du Registre Social Unifié",
    },
    {
      text: "La souveraineté numérique de la RDC repose sur l'intégrité sans faille de ses agents et de ses données.",
      author: "Direction Générale du CSU · Présidence de la République",
    },
    {
      text: "Aucun citoyen ne doit être invisible aux yeux de la Nation.",
      author: "Ministère des Affaires Sociales & Solidarité Nationale",
    },
  ];
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [quotes.length]);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Vide', color: 'bg-gray-300' };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    switch (score) {
      case 1:
        return { score: 25, label: 'Faible', color: 'bg-[#C0392B]' };
      case 2:
        return { score: 50, label: 'Moyen', color: 'bg-[#C77D0A]' };
      case 3:
        return { score: 75, label: 'Bon', color: 'bg-[#14477E]' };
      case 4:
        return { score: 100, label: 'Excellent', color: 'bg-[#1E8E5A]' };
      default:
        return { score: 15, label: 'Très faible', color: 'bg-[#C0392B]' };
    }
  };

  const strength = getPasswordStrength(password);

  // Step 1: Validate Email domain & password
  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Strict validation of @gouv.cd domain
    const emailNormalized = email.trim().toLowerCase();
    if (!emailNormalized.endsWith('@gouv.cd')) {
      setErrorMsg('Accès restreint : l’adresse doit obligatoirement appartenir au domaine officiel @gouv.cd');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Veuillez saisir votre mot de passe d’accréditation.');
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.adminLogin(emailNormalized, password);
      setStep('mfa');
    } catch (err: any) {
      setErrorMsg(err.message || 'Identifiants administratifs incorrects.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Validate MFA (TOTP 6 digits)
  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totpCode.length < 6) {
      setErrorMsg('Le code TOTP doit comporter 6 chiffres.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await authService.adminVerifyMfa(email, totpCode);
      setStep('verifying');
      // Simulate verification delay
      setTimeout(() => {
        onAdminLoginSuccess(res.profile);
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Code MFA invalide ou expiré.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[90vh] grid grid-cols-1 lg:grid-cols-12 bg-[#08243F] text-white">
      {/* LEFT PANE: Sovereign mission + motif + rotating quotes */}
      <div className="lg:col-span-5 bg-gradient-to-br from-[#08243F] via-[#0A2E52] to-[#0E3A66] p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden border-r border-[#14477E]">
        <CsuMotif variant="watermark" opacity={0.06} />

        {/* Top: Brand & back button */}
        <div className="space-y-6 relative z-10">
          <button
            onClick={() => onNavigate('#/entrar')}
            className="flex items-center gap-1.5 text-xs text-[#DCE4EE]/70 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Retour au choix de connexion</span>
          </button>

          <CsuLogo variant="horizontal" size="md" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0A2E52] border border-[#C9A227]/40 text-xs font-mono text-[#D9B84A]">
            <Shield className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Portail des Agents Assermentés</span>
          </div>
        </div>

        {/* Center: Mission Quote Carousel */}
        <div className="my-12 relative z-10 space-y-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C9A227]">
            Engagement Républicain
          </span>
          <blockquote className="font-display text-xl sm:text-2xl font-bold text-white leading-relaxed italic transition-all duration-500">
            « {quotes[currentQuoteIndex].text} »
          </blockquote>
          <cite className="block text-xs font-citizen text-[#DCE4EE]/70 not-italic">
            — {quotes[currentQuoteIndex].author}
          </cite>

          {/* Dots */}
          <div className="flex items-center gap-2 pt-2">
            {quotes.map((_, i) => (
              <span
                key={`q-${i}`}
                className={`h-1.5 rounded-full transition-all ${
                  currentQuoteIndex === i ? 'w-6 bg-[#C9A227]' : 'w-2 bg-[#14477E]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom: Legal Reference */}
        <div className="relative z-10 pt-6 border-t border-[#14477E] text-[11px] text-[#DCE4EE]/60 space-y-1">
          <div className="flex items-center gap-1.5 text-[#D9B84A] font-semibold">
            <Scale className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>Traçabilité & Secret Professionnel</span>
          </div>
          <p className="leading-relaxed">
            Tout accès frauduleux ou détournement de données du CSU est puni des peines prévues par la Loi n° 09/001 du 10/01/2009 et le Code Pénal Congolais.
          </p>
        </div>
      </div>

      {/* RIGHT PANE: Forms */}
      <div className="lg:col-span-7 bg-[#0A2E52] p-8 lg:p-16 flex flex-col justify-center relative">
        <div className="max-w-md mx-auto w-full space-y-8">
          {/* STEP 3: VERIFYING PROFILE SCREEN */}
          {step === 'verifying' ? (
            <div className="text-center space-y-6 animate-in fade-in duration-300">
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-[#14477E] border-t-[#C9A227] animate-spin" />
                <CsuLogo variant="seal" size="sm" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-2xl text-white">
                  Vérification du profil…
                </h3>
                <p className="font-citizen text-xs text-[#DCE4EE]/80">
                  Contrôle des autorisations d’accès et chargement du tableau de bord souverain.
                </p>
              </div>

              {/* Skeleton placeholders */}
              <div className="space-y-3 pt-4 text-left">
                <Skeleton variant="text" className="w-3/4 h-4 bg-[#0E3A66]" />
                <Skeleton variant="card" className="w-full h-24 bg-[#0E3A66]" />
                <Skeleton variant="text" className="w-1/2 h-3 bg-[#0E3A66]" />
              </div>
            </div>
          ) : step === 'credentials' ? (
            /* STEP 1: CREDENTIALS FORM */
            <div className="space-y-6">
              <div>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  Authentification Agent d'État
                </h2>
                <p className="font-citizen text-xs text-[#DCE4EE]/75 mt-1.5">
                  Saisissez votre messagerie gouvernementale officielle pour démarrer la session.
                </p>
              </div>

              {/* Demo accounts hint helper */}
              <div className="p-3.5 rounded-xl bg-[#08243F] border border-[#C9A227]/30 text-xs text-[#DCE4EE] space-y-1">
                <div className="flex items-center gap-1.5 text-[#D9B84A] font-bold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Comptes de Démonstration disponibles :</span>
                </div>
                <div className="font-mono text-[11px] text-[#DCE4EE]/90 space-x-2">
                  <button
                    type="button"
                    onClick={() => setEmail('supervisor.gombe@gouv.cd')}
                    className="underline hover:text-[#C9A227]"
                  >
                    supervisor.gombe@gouv.cd
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setEmail('directeur.national@gouv.cd')}
                    className="underline hover:text-[#C9A227]"
                  >
                    directeur.national@gouv.cd
                  </button>
                </div>
              </div>

              <form onSubmit={handleCredentialsSubmit} className="space-y-5">
                {/* Email Domain */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#D9B84A] mb-1.5">
                    Adresse Institutionnelle (@gouv.cd)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMsg(null);
                    }}
                    placeholder="nom.prenom@gouv.cd"
                    className="w-full bg-[#08243F] border border-[#14477E] rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                    required
                  />
                  {email && !email.toLowerCase().endsWith('@gouv.cd') && (
                    <span className="text-[11px] text-[#C0392B] font-medium block mt-1">
                      Le domaine doit se terminer par @gouv.cd
                    </span>
                  )}
                </div>

                {/* Password with Eye toggle & Strength bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#D9B84A]">
                      Mot de passe d'accréditation
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorMsg(null);
                      }}
                      placeholder="••••••••••••"
                      className="w-full bg-[#08243F] border border-[#14477E] rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-white/30 pr-11 focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-[#DCE4EE]/60 hover:text-white"
                      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password strength meter */}
                  <div className="mt-2 space-y-1">
                    <div className="h-1.5 w-full bg-[#08243F] rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${strength.color}`}
                        style={{ width: `${strength.score}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#DCE4EE]/60">
                      <span>Niveau de sécurité : <strong className="text-white">{strength.label}</strong></span>
                      <span>Norme gouvernementale</span>
                    </div>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-[#C0392B]/15 border border-[#C0392B]/40 flex items-center gap-2 text-xs text-[#C0392B] font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <RotateCw className="w-4 h-4 animate-spin text-[#08243F]" />
                  ) : (
                    <>
                      <span>Continuer vers la validation MFA</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* STEP 2: MFA SCREEN */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display font-extrabold text-2xl text-white tracking-tight">
                    Étape 2 · Code d'Accès MFA
                  </h2>
                  <p className="font-citizen text-xs text-[#DCE4EE]/75 mt-1">
                    Authentification à double facteur obligatoire pour le compte <span className="font-mono text-[#D9B84A]">{email}</span>.
                  </p>
                </div>
                <KeyRound className="w-8 h-8 text-[#C9A227] shrink-0" />
              </div>

              <form onSubmit={handleMfaSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#D9B84A] mb-1.5">
                    Code TOTP généré par votre clé de sécurité (6 chiffres) :
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={totpCode}
                    onChange={(e) => {
                      setTotpCode(e.target.value.replace(/\D/g, ''));
                      setErrorMsg(null);
                    }}
                    placeholder="Ex : 123456"
                    className="w-full bg-[#08243F] border border-[#14477E] rounded-xl px-4 py-3.5 text-center text-2xl font-mono font-extrabold tracking-widest text-white focus:outline-none focus:ring-2 focus:ring-[#C9A227]"
                    required
                    autoFocus
                  />
                  <span className="text-[11px] text-[#DCE4EE]/60 block mt-1 text-center">
                    (Pour ce test de démonstration, tout code à 6 chiffres est accepté)
                  </span>
                </div>

                {/* Dispositif de confiance checkbox */}
                <div className="p-3.5 rounded-xl bg-[#08243F] border border-[#14477E] flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="trustDevice"
                    checked={trustDevice}
                    onChange={(e) => setTrustDevice(e.target.checked)}
                    className="w-4 h-4 rounded text-[#C9A227] focus:ring-[#C9A227] bg-[#0A2E52] border-[#14477E]"
                  />
                  <label htmlFor="trustDevice" className="text-xs text-[#DCE4EE] cursor-pointer">
                    Mémoriser ce terminal professionnel comme <strong className="text-white">dispositif de confiance</strong> pendant 30 jours.
                  </label>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-[#C0392B]/15 border border-[#C0392B]/40 flex items-center gap-2 text-xs text-[#C0392B] font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <RotateCw className="w-4 h-4 animate-spin text-[#08243F]" />
                    ) : (
                      <>
                        <span>Vérifier et Ouvrir la Session Sécurisée</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setStep('credentials');
                      setErrorMsg(null);
                    }}
                    className="w-full py-2 text-center text-xs text-[#DCE4EE]/70 hover:text-white"
                  >
                    ← Revenir à la saisie de l'identifiant
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Fixed Audit notice */}
          <div className="p-3.5 rounded-xl bg-[#08243F]/60 border border-[#14477E]/80 text-[11px] text-[#DCE4EE]/70 text-center">
            <span className="font-semibold text-[#D9B84A]">Avis officiel :</span> Tous les accès et opérations sont enregistrés et audités conformément à la <strong>Loi n° 09/001 du 10/01/2009</strong>.
          </div>
        </div>
      </div>
    </div>
  );
};
