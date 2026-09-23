import React from 'react';
import { cmsService } from '../../services/cmsService';
import { Layers, CheckCircle2, Building2 } from 'lucide-react';

export const SectionPrograms: React.FC = () => {
  const programs = cmsService.getPrograms();

  return (
    <section id="programs" className="py-14 sm:py-20 md:py-24 bg-[#F6F8FB] border-b border-[#DCE4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#9C7B1E] font-display">
            Interconnexion Ministérielle
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#08243F] tracking-tight">
            Programmes sociaux connectés au CSU
          </h2>
          <p className="font-citizen text-sm sm:text-base text-[#0A1B2A]/75 leading-relaxed">
            Un seul enregistrement au CSU ouvre automatiquement les droits d'accès aux sept grands dispositifs d'aide de l'État congolais.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {programs.map((prog, idx) => (
            <div
              key={prog.id}
              className="p-4 sm:p-5 md:p-6 rounded-2xl bg-white border border-[#DCE4EE] hover:border-[#C9A227] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-[#0E3A66] uppercase tracking-wider">
                    {prog.category}
                  </span>
                  <span
                    className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      prog.status === 'Prioritaire'
                        ? 'bg-[#C0392B]/10 text-[#C0392B]'
                        : prog.status === 'Actif'
                        ? 'bg-[#1E8E5A]/10 text-[#1E8E5A]'
                        : 'bg-[#C77D0A]/10 text-[#C77D0A]'
                    }`}
                  >
                    {prog.status}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-[#08243F] group-hover:text-[#0A2E52] leading-tight">
                  {prog.title}
                </h3>

                <p className="font-citizen text-xs text-[#0A1B2A]/75 leading-relaxed">
                  {prog.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#EAEFF5] space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#08243F]">
                  <span className="text-[#0A1B2A]/60">Bénéficiaires actifs :</span>
                  <strong className="font-mono font-bold text-[#9C7B1E]">{prog.beneficiariesCount}</strong>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-[#0A1B2A]/60 pt-1">
                  <Building2 className="w-3.5 h-3.5 text-[#0E3A66] shrink-0" />
                  <span className="truncate">{prog.partnerMinistry}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
