import React, { useState, useEffect, useRef } from 'react';
import { SupportedLang } from '../../types';
import { translations } from '../../i18n/translations';
import { ChevronLeft, ChevronRight, ArrowRight, MapPin, Smartphone, QrCode, Shield, CheckCircle2 } from 'lucide-react';
import { CsuLogo } from '../brand/CsuLogo';
import { CsuInteractiveMap } from '../common/CsuInteractiveMap';
import { MOCK_STATIONS } from '../../services/stationsService';

import heroSlideCitizenship from '../../assets/images/hero_slide_citizenship_1790172261311.jpg';
import heroSlideStations from '../../assets/images/hero_slide_stations_1790172271889.jpg';
import heroSlideDigital from '../../assets/images/hero_slide_digital_1790172283953.jpg';

interface HeroCarouselProps {
  currentLang: SupportedLang;
  onNavigate: (route: string) => void;
}

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ currentLang, onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const t = translations[currentLang];

  const slidesCount = 3;

  const slideImages = [
    heroSlideCitizenship,
    heroSlideStations,
    heroSlideDigital,
  ];

  // Autoplay 7s with pause on hover/focus
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % slidesCount);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    } else if (diff < -50) {
      setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative overflow-hidden bg-[#08243F] text-white min-h-[540px] sm:min-h-[580px] lg:min-h-[640px] flex items-center select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Campagnes prioritaires du CSU"
    >
      {/* Dynamic Background Image per Slide */}
      {slideImages.map((imgSrc, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
            currentSlide === idx ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={imgSrc}
            alt=""
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-105 contrast-105"
          />
          {/* Transparent Gradient Overlays: increased transparency so background images are clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#08243F]/85 via-[#08243F]/40 to-transparent sm:via-[#08243F]/30 sm:to-[#08243F]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08243F]/85 via-transparent to-[#08243F]/25" />
        </div>
      ))}

      {/* Ambient Lighting Blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#14477E]/10 blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-[#C9A227]/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 sm:py-16 relative z-10">
        {/* SLIDE 1: CITOYENNETÉ & REGISTRE SOCIAL */}
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            currentSlide === 0
              ? 'opacity-100 translate-x-0 relative block'
              : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none hidden'
          }`}
          role="group"
          aria-roledescription="slide"
          aria-label="Slide 1 sur 3"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E3A66]/90 border border-[#C9A227]/40 text-[11px] sm:text-xs font-semibold text-[#D9B84A] shadow-sm">
                <Shield className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Registre National d'Identité Sociale · RDC</span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-white leading-[1.2] text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                {t.hero.slide1.title}
              </h1>

              <p className="font-citizen text-sm sm:text-base md:text-lg text-[#EAEFF5] leading-relaxed max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                {t.hero.slide1.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onNavigate('#steps')}
                  className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-display font-bold text-xs sm:text-sm bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] shadow-[0_6px_20px_rgba(201,162,39,0.4)] hover:shadow-[0_8px_25px_rgba(201,162,39,0.6)] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.hero.slide1.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 text-[#08243F]" />
                </button>

                <button
                  onClick={() => onNavigate('#what-is')}
                  className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-display font-semibold text-xs sm:text-sm bg-[#0E3A66]/70 hover:bg-[#14477E] text-[#DCE4EE] hover:text-white border border-[#DCE4EE]/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.hero.slide1.ctaSecondary}</span>
                </button>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#DCE4EE]/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E8E5A]" />
                  <span>100% Gratuit pour tous</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E8E5A]" />
                  <span>Valable dans les 26 provinces</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Sovereign Seal Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-square rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0E3A66]/90 via-[#0A2E52]/90 to-[#08243F]/95 p-6 sm:p-8 border border-[#C9A227]/40 shadow-2xl flex flex-col items-center justify-center text-center overflow-hidden backdrop-blur-md">
                {/* 8% Gold Motif SVG */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-10 pointer-events-none"
                  viewBox="0 0 300 300"
                  fill="none"
                >
                  <circle cx="150" cy="150" r="140" stroke="#C9A227" strokeWidth="2" />
                  <circle cx="150" cy="150" r="110" stroke="#C9A227" strokeWidth="1.5" strokeDasharray="6 3" />
                  <circle cx="150" cy="150" r="80" stroke="#C9A227" strokeWidth="2" />
                  {[...Array(24)].map((_, i) => (
                    <polygon
                      key={`motif-tri-${i}`}
                      points="150,45 154,55 146,55"
                      fill="#C9A227"
                      transform={`rotate(${i * 15} 150 150)`}
                    />
                  ))}
                </svg>

                <CsuLogo variant="seal" size="xl" className="mb-4 sm:mb-6 drop-shadow-2xl" />

                <div className="space-y-2 relative z-10">
                  <span className="font-display font-extrabold text-base sm:text-xl text-white tracking-wide block">
                    RÉPUBLIQUE DÉMOCRATIQUE DU CONGO
                  </span>
                  <p className="text-[11px] sm:text-xs text-[#D9B84A] font-semibold tracking-wider uppercase">
                    Un nom · Une identité · Une protection
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#DCE4EE]/80 max-w-xs mx-auto pt-1 leading-relaxed">
                    « Nul ne sera laissé de côté dans le grand édifice de la solidarité nationale. »
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 2: RÉSEAU DE PROXIMITÉ AVEC CARTE LEAFLET RÉELLE */}
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            currentSlide === 1
              ? 'opacity-100 translate-x-0 relative block'
              : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none hidden'
          }`}
          role="group"
          aria-roledescription="slide"
          aria-label="Slide 2 sur 3"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E3A66]/90 border border-[#C9A227]/40 text-[11px] sm:text-xs font-semibold text-[#D9B84A] shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>842 Guichets Fixes & Unités Mobiles Solaires</span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-white leading-[1.2] text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                {t.hero.slide2.title}
              </h1>

              <p className="font-citizen text-sm sm:text-base md:text-lg text-[#EAEFF5] leading-relaxed max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                {t.hero.slide2.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onNavigate('#stations')}
                  className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-display font-bold text-xs sm:text-sm bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] shadow-[0_6px_20px_rgba(201,162,39,0.4)] hover:shadow-[0_8px_25px_rgba(201,162,39,0.6)] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-[#08243F]" />
                  <span>{t.hero.slide2.ctaPrimary}</span>
                </button>

                <button
                  onClick={() => onNavigate('#stations')}
                  className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-display font-semibold text-xs sm:text-sm bg-[#0E3A66]/70 hover:bg-[#14477E] text-[#DCE4EE] hover:text-white border border-[#DCE4EE]/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.hero.slide2.ctaSecondary}</span>
                </button>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#DCE4EE]/80">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1E8E5A] animate-pulse" />
                  <span>Enrôlement 100% hors-ligne garanti</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                  <span>Kits solaires tous terrains</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Real Interactive Map Demonstration */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <div className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-[#08243F]/90 p-3 sm:p-4 border-2 border-[#C9A227]/50 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#14477E]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1E8E5A] animate-ping" />
                    <span className="text-xs font-display font-bold text-white">
                      Carte Interactive en Direct · RDC
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#D9B84A] bg-[#0E3A66] px-2 py-0.5 rounded">
                    GPS SOUVERAIN
                  </span>
                </div>

                {/* Leaflet Interactive Map Component */}
                <CsuInteractiveMap
                  stations={MOCK_STATIONS}
                  activeStation={MOCK_STATIONS[0]}
                  heightClass="h-64 sm:h-72"
                  miniMode={false}
                  zoom={11}
                  center={[-4.33, 15.32]}
                />

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#DCE4EE]/80 px-1">
                  <span>Explorez les guichets de proximité</span>
                  <a
                    href="#stations"
                    className="text-[#D9B84A] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Voir tout le réseau</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SLIDE 3: COMPTE GOV & CARTE DIGITALE */}
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            currentSlide === 2
              ? 'opacity-100 translate-x-0 relative block'
              : 'opacity-0 translate-x-8 absolute inset-0 pointer-events-none hidden'
          }`}
          role="group"
          aria-roledescription="slide"
          aria-label="Slide 3 sur 3"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E3A66]/90 border border-[#C9A227]/40 text-[11px] sm:text-xs font-semibold text-[#D9B84A] shadow-sm">
                <Smartphone className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>Portail Citoyen & Carte Virtuelle Sécurisée</span>
              </div>

              <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight text-white leading-[1.2] text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                {t.hero.slide3.title}
              </h1>

              <p className="font-citizen text-sm sm:text-base md:text-lg text-[#EAEFF5] leading-relaxed max-w-2xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                {t.hero.slide3.subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onNavigate('#/entrar/cidadao')}
                  className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-display font-bold text-xs sm:text-sm bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] shadow-[0_6px_20px_rgba(201,162,39,0.4)] hover:shadow-[0_8px_25px_rgba(201,162,39,0.6)] hover:-translate-y-0.5 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-[#08243F]" />
                  <span>{t.hero.slide3.ctaPrimary}</span>
                </button>

                <button
                  onClick={() => onNavigate('#/entrar/cidadao')}
                  className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-display font-semibold text-xs sm:text-sm bg-[#0E3A66]/70 hover:bg-[#14477E] text-[#DCE4EE] hover:text-white border border-[#DCE4EE]/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>{t.hero.slide3.ctaSecondary}</span>
                </button>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#DCE4EE]/80">
                <div className="flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-[#1E8E5A]" />
                  <span>QR Code cryptographique scellé</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1E8E5A]" />
                  <span>Suivi Mobile Money en direct</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Smartphone Mockup with Digital CSU Card + QR */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 h-[380px] sm:h-[420px] rounded-[32px] sm:rounded-[36px] bg-[#051525] p-3 border-4 border-[#1B5FAA]/50 shadow-2xl shadow-[#08243F] flex flex-col overflow-hidden">
                {/* Phone Speaker Notch */}
                <div className="w-20 h-3.5 bg-[#0A2E52] rounded-full mx-auto mb-2.5" />

                {/* Screen Content: Digital CSU Card */}
                <div className="flex-1 rounded-[22px] bg-gradient-to-b from-[#0A2E52] to-[#08243F] p-3 sm:p-4 flex flex-col justify-between border border-[#14477E]/80">
                  {/* Top Bar of card */}
                  <div className="flex items-center justify-between">
                    <CsuLogo variant="seal" size="sm" />
                    <span className="text-[9px] font-mono font-bold text-[#D9B84A] px-2 py-0.5 rounded bg-[#0E3A66] border border-[#C9A227]/30">
                      CERTIFIÉ RDC
                    </span>
                  </div>

                  {/* Citizen Card Sample */}
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#14477E]/90 to-[#0A2E52] border border-[#C9A227]/40 shadow-md space-y-2">
                    <div className="text-[9px] text-[#DCE4EE]/60 uppercase tracking-widest font-bold">
                      Carte Citoyenne CSU
                    </div>
                    <div className="font-mono text-xs font-bold text-white tracking-wider">
                      CSU-2026-9941-8412
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <div className="text-[8px] text-[#DCE4EE]/70">Titulaire</div>
                        <div className="text-[11px] font-bold text-white">Mbiya T. Esther</div>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center">
                        <QrCode className="w-7 h-7 text-[#08243F]" />
                      </div>
                    </div>
                  </div>

                  {/* Payment Alert Simulation */}
                  <div className="p-2 sm:p-2.5 rounded-xl bg-[#0E3A66]/70 border border-[#1E8E5A]/40 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#1E8E5A] animate-pulse shrink-0" />
                    <div className="text-[10px] text-[#DCE4EE]">
                      <span className="font-bold text-[#1E8E5A] block">Transfert reçu : 75 000 CDF</span>
                      <span>Filet Social · Airtel Money</span>
                    </div>
                  </div>

                  <div className="text-center text-[9px] text-[#DCE4EE]/50 font-mono">
                    Compte Gov · République Démocratique du Congo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Controls (Arrows & Golden Dots) */}
        <div className="flex items-center justify-between pt-8 sm:pt-10 border-t border-[#14477E]/40 mt-6 sm:mt-8">
          {/* Golden Dots with active scale */}
          <div className="flex items-center gap-2.5" role="tablist" aria-label="Choisir la diapositive">
            {[...Array(slidesCount)].map((_, i) => (
              <button
                key={`dot-${i}`}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C9A227] ${
                  currentSlide === i
                    ? 'w-8 h-2.5 bg-gradient-to-r from-[#E9CE7A] to-[#C9A227] shadow-[0_0_8px_#C9A227]'
                    : 'w-2.5 h-2.5 bg-[#14477E] hover:bg-[#C9A227]/60'
                }`}
                aria-label={`Aller au slide ${i + 1}`}
                aria-selected={currentSlide === i}
                role="tab"
              />
            ))}
          </div>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount)}
              className="p-2 sm:p-2.5 rounded-xl bg-[#0E3A66] hover:bg-[#C9A227]/20 border border-[#14477E] hover:border-[#C9A227] text-[#DCE4EE] hover:text-[#C9A227] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              aria-label="Diapositive précédente"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slidesCount)}
              className="p-2 sm:p-2.5 rounded-xl bg-[#0E3A66] hover:bg-[#C9A227]/20 border border-[#14477E] hover:border-[#C9A227] text-[#DCE4EE] hover:text-[#C9A227] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              aria-label="Diapositive suivante"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
