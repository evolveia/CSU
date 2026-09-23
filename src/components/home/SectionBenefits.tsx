import React from 'react';
import { cmsService } from '../../services/cmsService';
import {
  Banknote,
  HeartPulse,
  GraduationCap,
  Home,
  Smartphone,
  AlertTriangle,
  Users,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';

export const SectionBenefits: React.FC = () => {
  const benefits = cmsService.getBenefits();

  const getIcon = (id: string) => {
    switch (id) {
      case 'b1':
        return Banknote;
      case 'b2':
        return HeartPulse;
      case 'b3':
        return GraduationCap;
      case 'b4':
        return Home;
      case 'b5':
        return Smartphone;
      case 'b6':
        return AlertTriangle;
      case 'b7':
        return Users;
      case 'b8':
        return UserCheck;
      default:
        return CheckCircle2;
    }
  };

  return (
    <section id="benefits" className="py-14 sm:py-20 md:py-24 bg-white border-b border-[#DCE4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#9C7B1E] font-display">
            Impact National & Citoyenneté
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#08243F] tracking-tight">
            Pourquoi le CSU compte pour le peuple congolais
          </h2>
          <p className="font-citizen text-sm sm:text-base text-[#0A1B2A]/75 leading-relaxed">
            Huit piliers d’émancipation républicaine pour garantir que chaque foyer de la RDC reçoive la part de solidarité qui lui revient de droit.
          </p>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((item, index) => {
            const Icon = getIcon(item.id);
            return (
              <div
                key={item.id}
                className="group p-4 sm:p-5 md:p-6 rounded-2xl bg-[#F6F8FB] border border-[#DCE4EE] hover:border-[#C9A227]/70 hover:bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
              >
                <div className="space-y-3 sm:space-y-4">
                  {/* Icon & Index Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0E3A66] group-hover:bg-[#C9A227] flex items-center justify-center transition-colors duration-300 text-white group-hover:text-[#08243F] shadow-md">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#0A2E52]/40 group-hover:text-[#9C7B1E]">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-display font-bold text-base sm:text-lg text-[#08243F] group-hover:text-[#0A2E52] leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-citizen text-xs text-[#0A1B2A]/75 mt-1.5 leading-relaxed">
                      {item.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Subtle highlight separator without pill */}
                <div className="mt-4 sm:mt-5 pt-2.5 sm:pt-3 border-t border-[#DCE4EE] text-[11px] font-semibold text-[#0E3A66] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E8E5A] shrink-0" />
                  <span className="line-clamp-1">{item.benefit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
