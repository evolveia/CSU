import React from 'react';
import { cmsService } from '../../services/cmsService';
import { ShieldCheck, CheckCircle2, ArrowRight, Lock } from 'lucide-react';

interface SectionGovAccountProps {
  onNavigate: (route: string) => void;
}

export const SectionGovAccount: React.FC<SectionGovAccountProps> = ({ onNavigate }) => {
  const levels = cmsService.getGovAccountLevels();

  return (
    <section id="gov-account" className="py-14 sm:py-20 md:py-24 bg-white border-b border-[#DCE4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#9C7B1E] font-display">
            Identité Numérique de Confiance
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#08243F] tracking-tight">
            Compte Gov RD Congo — 4 Niveaux d'Accréditation
          </h2>
          <p className="font-citizen text-sm sm:text-base text-[#0A1B2A]/75 leading-relaxed">
            Une gradation transparente des garanties pour vous donner accès à toujours plus de services sécurisés de l'État en fonction de votre niveau d’enrôlement.
          </p>
        </div>

        {/* 4 Levels Stepped Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {levels.map((lvl, index) => {
            const isHighest = index === 3;
            return (
              <div
                key={lvl.level}
                className={`p-4 sm:p-5 md:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  isHighest
                    ? 'bg-gradient-to-b from-[#0A2E52] to-[#08243F] text-white border-[#C9A227] shadow-xl relative overflow-hidden'
                    : 'bg-[#F6F8FB] border-[#DCE4EE] hover:border-[#14477E] hover:shadow-lg'
                }`}
              >
                {isHighest && (
                  <div className="absolute top-0 right-0 bg-[#C9A227] text-[#08243F] text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-bl-lg">
                    Plafond Souverain
                  </div>
                )}

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isHighest ? 'text-[#D9B84A]' : 'text-[#0E3A66]'
                      }`}
                    >
                      {lvl.level}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isHighest
                          ? 'bg-[#C9A227]/20 text-[#D9B84A] border border-[#C9A227]/30'
                          : 'bg-[#EAEFF5] text-[#0A1B2A]'
                      }`}
                    >
                      {lvl.badge}
                    </span>
                  </div>

                  <div>
                    <h3
                      className={`font-display font-extrabold text-lg sm:text-xl md:text-2xl ${
                        isHighest ? 'text-white' : 'text-[#08243F]'
                      }`}
                    >
                      {lvl.name}
                    </h3>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider block ${
                        isHighest ? 'text-[#DCE4EE]/70' : 'text-[#0A1B2A]/60'
                      }`}
                    >
                      Condition requise :
                    </span>
                    <p
                      className={`text-xs leading-relaxed ${
                        isHighest ? 'text-[#DCE4EE]' : 'text-[#0A1B2A]/80'
                      }`}
                    >
                      {lvl.requirements}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider block ${
                        isHighest ? 'text-[#DCE4EE]/70' : 'text-[#0A1B2A]/60'
                      }`}
                    >
                      Avantages débloqués :
                    </span>
                    <p
                      className={`text-xs leading-relaxed ${
                        isHighest ? 'text-[#D9B84A] font-medium' : 'text-[#0E3A66] font-medium'
                      }`}
                    >
                      {lvl.perks}
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-5 sm:mt-6 pt-3 sm:pt-4 border-t text-[10px] sm:text-[11px] flex items-center gap-1.5 ${
                    isHighest ? 'border-[#14477E] text-[#DCE4EE]/75' : 'border-[#DCE4EE] text-[#0A1B2A]/60'
                  }`}
                >
                  <ShieldCheck
                    className={`w-3.5 h-3.5 shrink-0 ${isHighest ? 'text-[#C9A227]' : 'text-[#1E8E5A]'}`}
                  />
                  <span>Sécurité cryptographique d'État</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-8 sm:mt-12 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#08243F] via-[#0E3A66] to-[#0A2E52] text-white flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-xl border border-[#14477E]">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-display font-bold text-base sm:text-xl text-white">
              Vous avez déjà un numéro CSU ou reçu un SMS officiel ?
            </h3>
            <p className="font-citizen text-xs text-[#DCE4EE]/80">
              Accédez directement à votre espace citoyen avec votre téléphone et recevez votre code sécurisé OTP.
            </p>
          </div>
          <button
            onClick={() => onNavigate('#/entrar/cidadao')}
            className="w-full md:w-auto justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-display font-bold text-xs sm:text-sm bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] hover:shadow-[0_4px_20px_rgba(201,162,39,0.5)] transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Accéder à mon Compte Gov</span>
            <ArrowRight className="w-4 h-4 text-[#08243F]" />
          </button>
        </div>
      </div>
    </section>
  );
};
