/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SupportedLang, ToastMessage, AdminProfile } from './types';
import { applyDomTranslations } from './i18n/translationEngine';
import { TopBar } from './components/layout/TopBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroCarousel } from './components/home/HeroCarousel';
import { SectionWhatIs } from './components/home/SectionWhatIs';
import { SectionBenefits } from './components/home/SectionBenefits';
import { SectionWho } from './components/home/SectionWho';
import { SectionSteps } from './components/home/SectionSteps';
import { SectionDocs } from './components/home/SectionDocs';
import { SectionStations } from './components/home/SectionStations';
import { SectionPrograms } from './components/home/SectionPrograms';
import { SectionGovAccount } from './components/home/SectionGovAccount';
import { SectionPrivacy } from './components/home/SectionPrivacy';
import { SectionCounters } from './components/home/SectionCounters';
import { SectionFAQ } from './components/home/SectionFAQ';
import { SectionNews } from './components/home/SectionNews';
import { LoginSelect } from './components/auth/LoginSelect';
import { CitizenLogin } from './components/auth/CitizenLogin';
import { AdminLogin } from './components/auth/AdminLogin';
import { ProfileRouter } from './components/auth/ProfileRouter';
import { TopProgressBar } from './components/feedback/TopProgressBar';
import { Toast } from './components/feedback/Toast';

export default function App() {
  // Navigation / Routing State
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.hash || '#/';
  });

  // Google Maps Quota Handling State
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  // Language & Accessibility State
  const [currentLang, setCurrentLang] = useState<SupportedLang>(() => {
    const saved = localStorage.getItem('csu_lang') as SupportedLang;
    return saved || 'FR';
  });
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);

  const handleLanguageChange = (lang: SupportedLang) => {
    setCurrentLang(lang);
    localStorage.setItem('csu_lang', lang);
    applyDomTranslations(lang);
  };

  useEffect(() => {
    applyDomTranslations(currentLang);
  }, [currentLang, currentRoute]);

  // Loading indicator & Toasts
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Authenticated State
  const [authenticatedProfile, setAuthenticatedProfile] = useState<AdminProfile | null>(null);
  const [citizenSession, setCitizenSession] = useState<{ name: string; csuNumber: string } | null>(null);

  // Sync route with window hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentRoute(hash);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Listen to Google Maps quota exceeded event
  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Programmatic navigation helper
  const navigateTo = (route: string) => {
    setIsPageLoading(true);
    setTimeout(() => {
      window.location.hash = route;
      setCurrentRoute(route);
      setIsPageLoading(false);
    }, 250);
  };

  // Toast dispatchers
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}`;
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Font scale cycle (1.0 -> 1.1 -> 1.2 -> 1.0)
  const handleCycleFontScale = () => {
    setFontScale((prev) => {
      if (prev === 1) return 1.1;
      if (prev === 1.1) return 1.2;
      return 1;
    });
  };

  // Citizen Login Callback
  const handleCitizenLoginSuccess = (name: string, csuNumber: string) => {
    setCitizenSession({ name, csuNumber });
    addToast({
      type: 'success',
      title: 'Authentification réussie',
      message: `Bienvenue sur votre Compte Gov, ${name}.`,
    });
    navigateTo('#/gov');
  };

  // Admin Login Callback
  const handleAdminLoginSuccess = (profile: AdminProfile) => {
    setAuthenticatedProfile(profile);
    addToast({
      type: 'success',
      title: 'Accréditation validée',
      message: `Session ouverte pour ${profile.name} (${profile.role}).`,
    });
    navigateTo('#/gov');
  };

  // Logout Callback
  const handleLogout = () => {
    setAuthenticatedProfile(null);
    setCitizenSession(null);
    addToast({
      type: 'info',
      title: 'Session terminée',
      message: 'Vous avez été déconnecté avec succès du portail sécurisé.',
    });
    navigateTo('#/');
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-all duration-300 ${
        isHighContrast ? 'contrast-125 saturate-150' : ''
      }`}
      style={{ fontSize: `${fontScale * 100}%` }}
    >
      {/* Google Maps Quota Warning Sticky Banner (if quota exceeded) */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* 1. Golden Progress Bar for page transitions */}
      <TopProgressBar isLoading={isPageLoading} />

      {/* 2. Global Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />

      {/* 3. Global Government TopBar */}
      <TopBar
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        isHighContrast={isHighContrast}
        onToggleHighContrast={() => setIsHighContrast(!isHighContrast)}
        fontScale={fontScale}
        onCycleFontScale={handleCycleFontScale}
      />

      {/* 4. Global Header (shown on Home, Select, Citizen & Admin login) */}
      {currentRoute !== '#/gov' && (
        <Header
          currentLang={currentLang}
          currentRoute={currentRoute}
          onNavigate={navigateTo}
        />
      )}

      {/* 5. Main Route View Switcher */}
      <main className="flex-1">
        {/* ROUTE 1: Login Selection (#/entrar) */}
        {currentRoute === '#/entrar' ? (
          <LoginSelect onNavigate={navigateTo} />
        ) : /* ROUTE 2: Citizen Login (#/entrar/cidadao) */
        currentRoute === '#/entrar/cidadao' ? (
          <CitizenLogin
            currentLang={currentLang}
            onNavigate={navigateTo}
            onLoginSuccess={handleCitizenLoginSuccess}
          />
        ) : /* ROUTE 3: Admin Login (#/entrar/admin) */
        currentRoute === '#/entrar/admin' ? (
          <AdminLogin
            onNavigate={navigateTo}
            onAdminLoginSuccess={handleAdminLoginSuccess}
          />
        ) : /* ROUTE 4: Profile Router (#/gov or authenticated stub area) */
        currentRoute === '#/gov' ? (
          <ProfileRouter
            initialProfile={authenticatedProfile}
            citizenData={citizenSession}
            currentLang={currentLang}
            onLanguageChange={handleLanguageChange}
            onLogout={handleLogout}
            onNavigateHome={() => navigateTo('#/')}
          />
        ) : (
          /* ROUTE 5: Homepage (/) — Full 12 Mandatory Sections */
          <div className="space-y-0">
            {/* 1. Hero Carousel with 3 slides */}
            <HeroCarousel currentLang={currentLang} onNavigate={navigateTo} />

            {/* 2. Qu'est-ce que le CSU ? + Interactive card anatomy */}
            <SectionWhatIs />

            {/* 3. Pourquoi le CSU compte pour le peuple congolais (8 cards) */}
            <SectionBenefits />

            {/* 4. Qui peut s'inscrire ? (universal + priorities) */}
            <SectionWho />

            {/* 5. Comment s'inscrire — 5 étapes (golden timeline) */}
            <SectionSteps />

            {/* 6. Documents acceptés et le plan B */}
            <SectionDocs />

            {/* 7. Stations Citoyenneté & Unités mobiles (cascading filters + map) */}
            <SectionStations />

            {/* 8. Programmes sociaux connectés */}
            <SectionPrograms />

            {/* 9. Compte Gov RD Congo (4 levels) */}
            <SectionGovAccount onNavigate={navigateTo} />

            {/* 10. Confidentialité & protection des données (Loi n° 09/001) */}
            <SectionPrivacy />

            {/* 11. Transparence en chiffres (animated counters on-view) */}
            <SectionCounters />

            {/* 12. Questions fréquentes (accessible accordion) */}
            <SectionFAQ />

            {/* 13. Actualités & campagnes (3 cards) */}
            <SectionNews />
          </div>
        )}
      </main>

      {/* 6. Global Sovereign Footer */}
      {currentRoute !== '#/gov' && (
        <Footer currentLang={currentLang} onNavigate={navigateTo} />
      )}
    </div>
  );
}
