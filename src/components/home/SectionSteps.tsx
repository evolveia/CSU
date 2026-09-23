import React from 'react';
import { cmsService } from '../../services/cmsService';
import { MapPin, FileText, Camera, QrCode, Smartphone } from 'lucide-react';

export const SectionSteps: React.FC = () => {
  const steps = cmsService.getSteps();

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return MapPin;
      case 2:
        return FileText;
      case 3:
        return Camera;
      case 4:
        return QrCode;
      case 5:
        return Smartphone;
      default:
        return MapPin;
    }
  };

  return (
    <section id="steps" className="py-14 sm:py-20 md:py-24 bg-white border-b border-[#DCE4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#9C7B1E] font-display">
            Parcours Simplifié
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#08243F] tracking-tight">
            Comment s'inscrire — 5 étapes claires
          </h2>
          <p className="font-citizen text-sm sm:text-base text-[#0A1B2A]/75 leading-relaxed">
            De votre quartier à votre Compte Gov en moins de 15 minutes, avec un accompagnement humain et respectueux.
          </p>
        </div>

        {/* Golden Timeline Cards */}
        <div className="relative">
          {/* Connecting golden line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-[#C9A227]/20 via-[#C9A227] to-[#C9A227]/20 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 relative z-10">
            {steps.map((st) => {
              const Icon = getStepIcon(st.step);
              return (
                <div
                  key={st.step}
                  className="p-4 sm:p-5 md:p-6 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] hover:border-[#C9A227] hover:bg-white hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Golden step badge & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] flex items-center justify-center font-extrabold shadow-md group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#08243F]" />
                      </div>
                      <span className="font-mono text-[10px] sm:text-xs font-extrabold text-[#C9A227] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#08243F] border border-[#C9A227]/40">
                        Étape 0{st.step}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-sm sm:text-base text-[#08243F] group-hover:text-[#0A2E52] leading-snug">
                      {st.title}
                    </h3>

                    <p className="font-citizen text-xs text-[#0A1B2A]/75 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-[#DCE4EE] text-[10px] font-mono text-[#0E3A66] font-semibold flex items-center gap-1">
                    <span>Validation instantanée</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
