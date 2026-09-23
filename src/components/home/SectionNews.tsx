import React from 'react';
import { cmsService } from '../../services/cmsService';
import { Newspaper, ArrowUpRight } from 'lucide-react';

export const SectionNews: React.FC = () => {
  const news = cmsService.getNews();

  return (
    <section id="news" className="py-14 sm:py-20 md:py-24 bg-[#F6F8FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#9C7B1E] font-display">
            Communiqués & Campagnes Nationales
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#08243F] tracking-tight">
            Actualités officielles du CSU
          </h2>
          <p className="font-citizen text-sm sm:text-base text-[#0A1B2A]/75 leading-relaxed">
            Suivez le déploiement sur le terrain, les nouvelles conventions ministérielles et les bilans d'enregistrement.
          </p>
        </div>

        {/* 3 News Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="p-4 sm:p-5 md:p-6 rounded-2xl bg-white border border-[#DCE4EE] hover:border-[#C9A227] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-3 sm:space-y-4">
                {/* Zero-pill metadata line with typographic bullet separators */}
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#0A1B2A]/60 font-medium">
                  <span className="text-[#0E3A66] font-bold">{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.readTime}</span>
                </div>

                <h3 className="font-display font-bold text-sm sm:text-base text-[#08243F] group-hover:text-[#0A2E52] leading-snug">
                  {item.title}
                </h3>

                <p className="font-citizen text-xs text-[#0A1B2A]/75 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-[#EAEFF5] flex items-center justify-between text-xs text-[#0E3A66]">
                <span className="font-medium text-[10px] sm:text-[11px] text-[#0A1B2A]/60">{item.source}</span>
                <span className="font-semibold flex items-center gap-1 group-hover:text-[#9C7B1E] transition-colors">
                  <span>Lire l'article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
