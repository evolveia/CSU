import React from 'react';
import { cmsService } from '../../services/cmsService';
import { FileCheck, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const SectionDocs: React.FC = () => {
  const docs = cmsService.getDocs();

  return (
    <section id="docs" className="py-14 sm:py-20 md:py-24 bg-[#F6F8FB] border-b border-[#DCE4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#9C7B1E] font-display">
            Pièces Justificatives
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#08243F] tracking-tight">
            Documents acceptés (et le « Plan B » solidaire)
          </h2>
          <p className="font-citizen text-sm sm:text-base text-[#0A1B2A]/75 leading-relaxed">
            Vous avez des documents ? Apportez-les. Vous n’en avez aucun ? L’État prévoit une procédure communautaire d’exception pour que personne ne soit exclu.
          </p>
        </div>

        {/* 2-Column Split: Official Documents vs Plan B */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Official Documents List */}
          <div className="lg:col-span-6 p-4 sm:p-6 md:p-8 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm flex flex-col justify-between">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-3 border-b border-[#EAEFF5] pb-3 sm:pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#08243F] text-[#C9A227] flex items-center justify-center font-bold shrink-0">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base sm:text-lg text-[#08243F]">
                    Documents officiels reconnus
                  </h3>
                  <p className="text-xs text-[#0A1B2A]/60">Un seul document parmi cette liste suffit :</p>
                </div>
              </div>

              <ul className="space-y-2.5 sm:space-y-3">
                {docs.officialDocs.map((doc, idx) => (
                  <li
                    key={doc.name}
                    className="p-3 sm:p-3.5 rounded-xl bg-[#F6F8FB] border border-[#EAEFF5] flex items-center justify-between text-xs font-medium text-[#08243F] gap-2"
                  >
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0E3A66] text-white flex items-center justify-center font-mono text-[10px] shrink-0">
                        0{idx + 1}
                      </span>
                      <span className="line-clamp-1">{doc.name}</span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#1E8E5A] bg-[#1E8E5A]/10 px-2 py-0.5 rounded shrink-0">
                      {doc.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#EAEFF5] text-xs text-[#0A1B2A]/70 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#1E8E5A] shrink-0" />
              <span>Les originaux ou photocopies lisibles sont acceptés.</span>
            </div>
          </div>

          {/* Right Column: The Plan B Community Declaration */}
          <div className="lg:col-span-6 p-4 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-[#0A2E52] via-[#08243F] to-[#0E3A66] text-white shadow-xl border-2 border-[#C9A227] flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Congolese stamp */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider bg-[#C9A227] text-[#08243F] px-2.5 sm:px-3 py-1 rounded-full shadow-md">
              Procédure d’Urgence
            </div>

            <div className="space-y-4 sm:space-y-6 relative z-10">
              <div className="flex items-center gap-3 border-b border-[#14477E] pb-3 sm:pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#C9A227] text-[#08243F] flex items-center justify-center font-bold shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
                    {docs.planB.title}
                  </h3>
                  <p className="text-xs text-[#D9B84A] font-semibold">
                    {docs.planB.mechanism}
                  </p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#0E3A66]/70 border border-[#14477E] text-xs text-[#DCE4EE] space-y-2">
                <p className="font-semibold text-white">Conditions d'application du Plan B :</p>
                <ul className="space-y-2">
                  {docs.planB.requirements.map((req, i) => (
                    <li key={`req-${i}`} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl bg-[#08243F]/80 border border-[#C9A227]/40 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                <p className="text-xs text-[#DCE4EE]/90 leading-relaxed">
                  {docs.planB.guarantee}
                </p>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#14477E] text-center text-xs text-[#D9B84A] font-medium">
              « Aucun Congolais n'est apatride sur la terre de ses ancêtres. »
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
