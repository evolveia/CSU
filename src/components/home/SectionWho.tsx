import React from 'react';
import { cmsService } from '../../services/cmsService';
import { Users, Baby, Compass, HeartHandshake, Accessibility, Sparkles, CheckCircle2 } from 'lucide-react';

export const SectionWho: React.FC = () => {
  const data = cmsService.getWhoCanRegister();

  const getPriorityIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return Baby;
      case 1:
        return Compass;
      case 2:
        return Sparkles;
      case 3:
        return Accessibility;
      case 4:
        return HeartHandshake;
      default:
        return Users;
    }
  };

  return (
    <section id="who" className="py-14 sm:py-20 md:py-24 bg-[#F6F8FB] border-b border-[#DCE4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#9C7B1E] font-display">
            Inclusion Universelle
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#08243F] tracking-tight">
            Qui peut s'inscrire au CSU ?
          </h2>
          <p className="font-citizen text-sm sm:text-base text-[#0A1B2A]/80 leading-relaxed">
            {data.universalNote}
          </p>
        </div>

        {/* Priority Focus Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Universal Guarantee Card */}
          <div className="lg:col-span-1 p-5 sm:p-6 md:p-8 rounded-2xl bg-[#0E3A66] text-white shadow-xl flex flex-col justify-between border border-[#14477E]">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#C9A227] text-[#08243F] flex items-center justify-center font-bold shadow-md">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl leading-snug">
                Droit universel à la citoyenneté
              </h3>
              <p className="font-citizen text-xs sm:text-sm text-[#DCE4EE]/90 leading-relaxed">
                Toute personne vivant en République Démocratique du Congo a vocation à figurer au Registre Social Unifié. Aucun refus ne peut être opposé sur des critères ethniques, confessionnels, politiques ou financiers.
              </p>
            </div>

            <div className="pt-4 sm:pt-6 border-t border-[#14477E] space-y-2 text-xs text-[#DCE4EE]/80 mt-4 sm:mt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E8E5A] shrink-0" />
                <span>Enrôlement gratuit à 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1E8E5A] shrink-0" />
                <span>Même sans domicile fixe</span>
              </div>
            </div>
          </div>

          {/* 5 Priority Specific Groups */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {data.priorityGroups.map((group, idx) => {
              const Icon = getPriorityIcon(idx);
              return (
                <div
                  key={group.group}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DCE4EE] hover:border-[#C9A227]/60 hover:shadow-md transition-all flex items-start gap-3 sm:gap-4"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#08243F] text-[#C9A227] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-[#9C7B1E] uppercase">
                        Priorité N° 0{idx + 1}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-xs sm:text-sm text-[#08243F] leading-tight">
                      {group.group}
                    </h4>
                    <p className="font-citizen text-xs text-[#0A1B2A]/70 leading-relaxed">
                      {group.detail}
                    </p>
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
