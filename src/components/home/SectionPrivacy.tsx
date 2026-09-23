import React from 'react';
import { cmsService } from '../../services/cmsService';
import { ShieldCheck, Lock, FileText, CheckCircle2, Scale } from 'lucide-react';

export const SectionPrivacy: React.FC = () => {
  const data = cmsService.getPrivacyData();

  return (
    <section id="privacy" className="py-14 sm:py-20 md:py-24 bg-[#F6F8FB] border-b border-[#DCE4EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#9C7B1E] font-display">
            Souveraineté Numérique & Droits Fondamentaux
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#08243F] tracking-tight">
            Confidentialité & Protection des Données Personnelles
          </h2>
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#08243F] text-[#D9B84A] text-[11px] sm:text-xs font-mono font-bold border border-[#C9A227]/40 shadow-sm mt-1 sm:mt-2">
            <Scale className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
            <span>Cadre Légal : {data.law}</span>
          </div>
        </div>

        {/* Legal Quoting Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#DCE4EE] shadow-sm mb-6 sm:mb-10 flex items-start gap-3 sm:gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#0E3A66] text-[#C9A227] flex items-center justify-center shrink-0">
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-xs sm:text-sm text-[#08243F]">
              {data.lawTitle}
            </h4>
            <p className="font-citizen text-xs text-[#0A1B2A]/75 leading-relaxed">
              Le traitement de vos données est strictement restreint à la mission d’intérêt public de protection sociale. Tout détournement, commercialisation ou transmission non autorisée à des tiers est pénalement réprimé par les juridictions de la République.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {data.commitments.map((c, i) => (
            <div
              key={c.title}
              className="p-4 sm:p-5 md:p-6 rounded-2xl bg-white border border-[#DCE4EE] hover:border-[#14477E] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2.5 sm:space-y-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EAEFF5] text-[#0E3A66] flex items-center justify-center font-mono font-bold text-xs">
                  0{i + 1}
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-[#08243F]">
                  {c.title}
                </h3>
                <p className="font-citizen text-xs text-[#0A1B2A]/70 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="mt-4 pt-2.5 sm:pt-3 border-t border-[#EAEFF5] flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-[#1E8E5A]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Garanti par la Loi</span>
              </div>
            </div>
          ))}
        </div>

        {/* Audit Seal Box */}
        <div className="mt-10 p-6 rounded-2xl bg-[#08243F] text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-[#14477E]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#0E3A66] border border-[#C9A227] flex items-center justify-center text-[#C9A227] shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#D9B84A] uppercase font-bold tracking-wider block">
                Sceau d’Audit Indépendant
              </span>
              <p className="text-xs text-[#DCE4EE] font-medium leading-relaxed max-w-xl">
                {data.auditQuote}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#0A2E52] border border-[#14477E] text-[#DCE4EE]">
              Traçabilité Cryptographique Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
