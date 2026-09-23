import React, { useState } from 'react';
import { cmsService } from '../../services/cmsService';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

export const SectionFAQ: React.FC = () => {
  const faqs = cmsService.getFaqs();
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-14 sm:py-20 md:py-24 bg-white border-b border-[#DCE4EE]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center space-y-2 sm:space-y-3 mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#9C7B1E] font-display">
            Foire Aux Questions
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#08243F] tracking-tight">
            Questions fréquentes sur le CSU
          </h2>
          <p className="font-citizen text-sm sm:text-base text-[#0A1B2A]/75 leading-relaxed">
            Retrouvez les réponses officielles aux interrogations les plus courantes des citoyens et des familles.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-2.5 sm:space-y-3">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#C9A227] bg-[#F6F8FB] shadow-md'
                    : 'border-[#DCE4EE] bg-white hover:border-[#14477E]'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-3.5 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase text-[#9C7B1E] shrink-0">
                      [{faq.category}]
                    </span>
                    <span className="font-display font-bold text-xs sm:text-sm md:text-base text-[#08243F]">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[#0E3A66] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#C9A227]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-3.5 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm font-citizen text-[#0A1B2A]/80 leading-relaxed border-t border-[#DCE4EE]/40 animate-in fade-in duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Assistance hotline callout */}
        <div className="mt-10 p-5 rounded-2xl bg-[#EAEFF5] border border-[#DCE4EE] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#08243F] text-[#C9A227] flex items-center justify-center shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-[#08243F]">
                Votre question n'est pas listée ici ?
              </h4>
              <p className="text-xs text-[#0A1B2A]/70">
                Nos conseillers en langues nationales vous répondent gratuitement au téléphone.
              </p>
            </div>
          </div>
          <a
            href="tel:108"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#08243F] hover:bg-[#0A2E52] text-white font-mono text-xs font-bold transition-colors shrink-0"
          >
            <PhoneCall className="w-4 h-4 text-[#1E8E5A]" />
            <span>Appeler le 108 (Gratuit)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
