import React, { useState } from 'react';
import { SupportedLang } from '../../types';
import { LANGUAGES, translations } from '../../i18n/translations';
import { Globe, Eye, Type, ShieldCheck, Check } from 'lucide-react';

interface TopBarProps {
  currentLang: SupportedLang;
  onLanguageChange: (lang: SupportedLang) => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  fontScale: number;
  onCycleFontScale: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentLang,
  onLanguageChange,
  isHighContrast,
  onToggleHighContrast,
  fontScale,
  onCycleFontScale,
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const t = translations[currentLang];

  return (
    <div className="bg-[#08243F] text-[#DCE4EE] border-b border-[#0A2E52] text-xs py-2 px-4 sm:px-6 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* DRC Government Seal & Official Tag */}
        <div className="flex items-center gap-2.5">
          {/* DRC Flag Miniature SVG */}
          <div
            className="w-5 h-3.5 rounded-[2px] overflow-hidden flex shadow-sm border border-white/20 shrink-0"
            title="Drapeau de la République Démocratique du Congo"
            aria-hidden="true"
          >
            <svg viewBox="0 0 40 28" className="w-full h-full">
              <rect width="40" height="28" fill="#007FFF" />
              <polygon points="0,28 40,0 40,5.6 0,28" fill="#FCD116" />
              <polygon points="0,28 40,0 40,3.5 0,28" fill="#CE1126" />
              <polygon points="0,24.5 35,0 40,0 0,28" fill="#FCD116" />
              {/* Gold star */}
              <polygon
                points="7,3 8.2,6.5 12,6.5 9,8.8 10.2,12.2 7,10 3.8,12.2 5,8.8 2,6.5 5.8,6.5"
                fill="#FCD116"
              />
            </svg>
          </div>
          <div className="flex items-center gap-1.5 font-medium tracking-wide text-xs text-[#EAEFF5]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
            <span>{t.topBarOfficial}</span>
          </div>
        </div>

        {/* Accessibility & Language Selectors */}
        <div className="flex items-center gap-4 ml-auto">
          {/* Accessibility Controls */}
          <div className="flex items-center gap-1 bg-[#0A2E52] rounded-lg p-0.5 border border-[#14477E]/50">
            <button
              onClick={onToggleHighContrast}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                isHighContrast
                  ? 'bg-[#C9A227] text-[#08243F] font-bold'
                  : 'text-[#DCE4EE] hover:text-white'
              }`}
              title="Activer le mode contraste renforcé"
              aria-pressed={isHighContrast}
            >
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Contraste</span>
            </button>

            <button
              onClick={onCycleFontScale}
              className="flex items-center gap-0.5 px-2 py-1 rounded text-[11px] font-medium text-[#DCE4EE] hover:text-white transition-colors"
              title="Agrandir la taille du texte"
              aria-label={`Taille du texte ${fontScale === 1 ? 'normale' : fontScale === 1.1 ? 'moyenne' : 'grande'}`}
            >
              <Type className="w-3 h-3" />
              <span className="font-mono text-[10px]">
                {fontScale === 1 ? 'A' : fontScale === 1.1 ? 'A+' : 'A++'}
              </span>
            </button>
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0A2E52] hover:bg-[#0E3A66] border border-[#14477E]/50 text-[#DCE4EE] text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[#C9A227]"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label="Sélectionner la langue officielle"
            >
              <Globe className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>{currentLang}</span>
              <span className="text-[10px] text-[#DCE4EE]/60 font-normal hidden sm:inline">
                ({LANGUAGES.find((l) => l.code === currentLang)?.native})
              </span>
            </button>

            {langOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setLangOpen(false)}
                  aria-hidden="true"
                />
                <div
                  className="absolute right-0 mt-1.5 w-44 rounded-xl bg-[#08243F] border border-[#14477E] shadow-xl py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150"
                  role="listbox"
                >
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C9A227]">
                    Langues Disponibles ({LANGUAGES.length})
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-[#14477E]/30">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer ${
                          currentLang === lang.code
                            ? 'bg-[#0E3A66] text-white font-bold'
                            : 'text-[#DCE4EE] hover:bg-[#0A2E52] hover:text-white'
                        }`}
                        role="option"
                        aria-selected={currentLang === lang.code}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm">{lang.flag}</span>
                          <span className="font-mono font-bold text-[#C9A227]">{lang.code}</span>
                          <span>{lang.native}</span>
                        </span>
                        {currentLang === lang.code && (
                          <Check className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
