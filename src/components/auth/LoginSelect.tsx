import React from 'react';
import { CsuLogo } from '../brand/CsuLogo';
import { CsuMotif } from '../brand/CsuMotif';
import { User, Shield, ArrowRight, Lock, PhoneCall, ChevronLeft, QrCode } from 'lucide-react';

interface LoginSelectProps {
  onNavigate: (route: string) => void;
}

export const LoginSelect: React.FC<LoginSelectProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-[#08243F] via-[#0A2E52] to-[#08243F] text-white flex flex-col justify-center py-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Congolese motif watermark */}
      <CsuMotif variant="login-bg" opacity={0.06} />

      <div className="max-w-4xl mx-auto w-full relative z-10 space-y-10">
        {/* Back to Home Button & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigate('#/')}
            className="flex items-center gap-1.5 text-xs text-[#DCE4EE]/70 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Retour au portail d'accueil</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-[#D9B84A] font-mono font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Portail Sécurisé RDC</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <CsuLogo variant="seal" size="lg" className="mx-auto drop-shadow-xl mb-4" />
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Espace de Connexion Officiel
          </h1>
          <p className="font-citizen text-sm text-[#DCE4EE]/80 max-w-lg mx-auto leading-relaxed">
            Choisissez votre modalité d'accès pour accéder à votre dossier ou à vos outils d'administration d'État.
          </p>
        </div>

        {/* Two Choice Cards Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Citoyen */}
          <div
            onClick={() => onNavigate('#/entrar/cidadao')}
            className="group relative p-8 rounded-3xl bg-[#0E3A66]/90 hover:bg-[#0E3A66] border-2 border-[#14477E] hover:border-[#C9A227] shadow-xl hover:shadow-[0_0_35px_rgba(201,162,39,0.35)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <User className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#D9B84A] bg-[#08243F] px-2.5 py-1 rounded-full border border-[#C9A227]/30">
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Citoyen / Ménage</span>
                </div>
              </div>

              <div>
                <h2 className="font-display font-extrabold text-2xl text-white group-hover:text-[#D9B84A] transition-colors">
                  Espace Citoyen
                </h2>
                <p className="font-citizen text-xs sm:text-sm text-[#DCE4EE]/85 mt-2 leading-relaxed">
                  Accédez à votre Compte Gov, consultez votre numéro national CSU, vérifiez vos versements mobile money et téléchargez votre récépissé officiel.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#14477E] text-xs text-[#DCE4EE]/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E8E5A]" />
                  <span>Connexion par code SMS (OTP) ou Biométrie</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E8E5A]" />
                  <span>Sans mot de passe complexe</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between font-display font-bold text-sm text-[#D9B84A] group-hover:text-white transition-colors">
              <span>Se connecter comme citoyen</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Card 2: Administratif */}
          <div
            onClick={() => onNavigate('#/entrar/admin')}
            className="group relative p-8 rounded-3xl bg-[#08243F]/90 hover:bg-[#08243F] border-2 border-[#14477E] hover:border-[#C9A227] shadow-xl hover:shadow-[0_0_35px_rgba(201,162,39,0.35)] transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#0A2E52] border border-[#C9A227] text-[#C9A227] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Shield className="w-7 h-7" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#D9B84A] bg-[#0A2E52] px-2.5 py-1 rounded-full border border-[#C9A227]/30">
                  <Lock className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Agent de l'État</span>
                </div>
              </div>

              <div>
                <h2 className="font-display font-extrabold text-2xl text-white group-hover:text-[#D9B84A] transition-colors">
                  Accès Administratif
                </h2>
                <p className="font-citizen text-xs sm:text-sm text-[#DCE4EE]/85 mt-2 leading-relaxed">
                  Accès réservé aux agents, enquêteurs, superviseurs et fonctionnaires assermentés munis d'un identifiant gouvernemental souverain (@gouv.cd).
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#14477E] text-xs text-[#DCE4EE]/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>Double facteur MFA obligatoire</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                  <span>Tous les accès sont tracés et audités</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between font-display font-bold text-sm text-[#D9B84A] group-hover:text-white transition-colors">
              <span>Se connecter au portail agent</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Security & Assistance Note */}
        <div className="pt-6 border-t border-[#14477E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCE4EE]/60 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#1E8E5A]" />
            <span>Connexion chiffrée SSL 256 bits conforme à la Loi n° 09/001</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#D9B84A]">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Assistance téléphonique : composez le 108</span>
          </div>
        </div>
      </div>
    </div>
  );
};
