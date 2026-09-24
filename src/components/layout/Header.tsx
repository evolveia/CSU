import React, { useState } from 'react';
import { CsuLogo } from '../brand/CsuLogo';
import { SupportedLang } from '../../types';
import { translations } from '../../i18n/translations';
import { LogIn, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentLang: SupportedLang;
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, currentRoute, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];

  const navLinks = [
    { label: t.nav.home, target: '#/', isHashRoute: true },
    { label: t.nav.whatIs, target: '#what-is', isHashRoute: false },
    { label: t.nav.benefits, target: '#benefits', isHashRoute: false },
    { label: t.nav.stations, target: '#stations', isHashRoute: false },
    { label: t.nav.govAccount, target: '#gov-account', isHashRoute: false },
    { label: t.nav.help, target: '#faq', isHashRoute: false },
  ];

  const handleLinkClick = (target: string, isHashRoute: boolean) => {
    setMobileMenuOpen(false);
    if (isHashRoute) {
      onNavigate(target);
    } else {
      if (currentRoute !== '#/') {
        onNavigate('#/');
        setTimeout(() => {
          const el = document.querySelector(target);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0E3A66] border-b border-[#14477E]/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <button
          onClick={() => handleLinkClick('#/', true)}
          className="text-left flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] rounded-lg"
        >
          <CsuLogo variant="horizontal" size="md" currentLang={currentLang} />
        </button>

        {/* Desktop Nav Zone */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#DCE4EE]"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.target, link.isHashRoute)}
              className="text-[#DCE4EE] hover:text-[#C9A227] transition-colors py-1 cursor-pointer relative group whitespace-nowrap"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A227] transition-all duration-200 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Action Button: Entrer (Desktop only, already in mobile menu) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onNavigate('#/entrar')}
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] shadow-[0_4px_14px_rgba(201,162,39,0.35)] hover:shadow-[0_6px_20px_rgba(201,162,39,0.5)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            aria-label="Accéder à l'espace de connexion CSU"
          >
            <LogIn className="w-4 h-4 text-[#08243F]" />
            <span>{t.nav.enter}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#DCE4EE] hover:text-white hover:bg-[#0A2E52] border border-transparent hover:border-[#14477E] transition-all cursor-pointer"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu de navigation'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#C9A227]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#08243F] border-b border-[#14477E] px-5 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.target, link.isHashRoute)}
              className="w-full text-left py-2 px-3 rounded-lg text-sm font-medium text-[#DCE4EE] hover:bg-[#0A2E52] hover:text-[#C9A227] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-[#14477E]/60">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('#/entrar');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F]"
            >
              <LogIn className="w-4 h-4" />
              <span>{t.nav.enter}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
