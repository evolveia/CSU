import React, { useState, useEffect, useRef } from 'react';
import { countersService, CounterMetric } from '../../services/countersService';
import { Activity, ShieldCheck } from 'lucide-react';

export const SectionCounters: React.FC = () => {
  const metrics = countersService.getCounters();
  const [animatedValues, setAnimatedValues] = useState<number[]>(metrics.map(() => 0));
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCountUp();
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCountUp = () => {
    const duration = 1200; // 1.2s ease-out
    const startTime = performance.now();

    const frame = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out curve
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const nextValues = metrics.map((m) => Math.floor(m.value * easeOut));
      setAnimatedValues(nextValues);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setAnimatedValues(metrics.map((m) => m.value));
      }
    };

    requestAnimationFrame(frame);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <section id="counters" ref={sectionRef} className="py-14 sm:py-20 md:py-24 bg-[#08243F] text-white border-b border-[#0E3A66] relative overflow-hidden">
      {/* Subtle Congolese backdrop */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="counterLines" width="10" height="10" patternUnits="userSpaceOnUse">
            <line x1="0" y1="10" x2="10" y2="0" stroke="#C9A227" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill="url(#counterLines)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12 border-b border-[#14477E] pb-5 sm:pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D9B84A] uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5" />
              <span>Transparence en Chiffres</span>
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-white tracking-tight mt-1">
              Le Registre National en temps réel
            </h2>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A2E52] border border-[#14477E] text-[11px] text-[#DCE4EE]/70 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E8E5A] shrink-0" />
            <span>Données illustratives officielles</span>
          </div>
        </div>

        {/* 4 Counter Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {metrics.map((m, idx) => (
            <div key={m.id} className="p-4 sm:p-5 rounded-2xl bg-[#0E3A66]/30 border border-[#14477E]/50 space-y-1.5 sm:space-y-2">
              <div className="font-mono text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#D9B84A] tracking-tight tabular-nums flex items-baseline">
                <span>{formatNumber(animatedValues[idx])}</span>
                <span className="text-lg sm:text-xl md:text-2xl text-white ml-0.5">{m.suffix}</span>
              </div>
              <h3 className="font-display font-bold text-xs sm:text-sm text-white leading-snug">
                {m.label}
              </h3>
              <p className="font-citizen text-xs text-[#DCE4EE]/70 leading-relaxed">
                {m.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
