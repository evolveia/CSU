import React from 'react';
import { CsuLogo } from '../brand/CsuLogo';
import { CsuMotif } from '../brand/CsuMotif';
import { SupportedLang } from '../../types';
import { translations } from '../../i18n/translations';
import { ShieldCheck, Server, PhoneCall, ExternalLink, Lock } from 'lucide-react';

interface FooterProps {
  currentLang: SupportedLang;
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate }) => {
  const t = translations[currentLang];

  return (
    <footer className="relative bg-[#08243F] text-[#DCE4EE] border-t border-[#0E3A66] overflow-hidden pt-16 pb-12">
      {/* Background Congolese motif watermark */}
      <CsuMotif variant="watermark" opacity={0.04} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#0E3A66]">
          {/* Col 1 & 2: Brand & Sovereign Mission */}
          <div className="lg:col-span-2 space-y-4">
            <CsuLogo variant="horizontal" size="md" />
            <p className="text-xs text-[#DCE4EE]/75 leading-relaxed max-w-sm pt-2">
              Le Recensement Socio-Économique Unifié (CSU) constitue le socle numérique de l'État congolais pour la justice sociale, l'identification universelle et l'attribution directe des aides publiques aux citoyens de la RDC.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A2E52] border border-[#14477E]/60 text-xs text-[#EAEFF5]">
                <Server className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
                <span className="font-semibold">{t.common.dataSovereignty}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0A2E52]/60 border border-[#14477E]/40 text-[11px] text-[#DCE4EE]/70">
                <Lock className="w-3.5 h-3.5 text-[#1E8E5A] shrink-0" />
                <span>Centre de données sécurisé souverain de Kinshasa</span>
              </div>
            </div>
          </div>

          {/* Menus 1 & 2: Placed side-by-side on Mobile and Tablet */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 col-span-1 md:col-span-2 lg:contents">
            {/* Menu 1: Gouvernement RDC */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A227] font-display">
                Gouvernement RDC
              </h4>
              <ul className="space-y-2 text-xs text-[#DCE4EE]/80">
                <li>
                  <a href="https://primature.gouv.cd" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>Primature RDC</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-50 shrink-0" />
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white">Min. Affaires Sociales</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white">Min. Santé Publique</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white">Min. de l'EPST</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white">État Civil National</a>
                </li>
              </ul>
            </div>

            {/* Menu 2: Plateforme & Accès */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A227] font-display">
                Plateforme & Accès
              </h4>
              <ul className="space-y-2 text-xs text-[#DCE4EE]/80">
                <li>
                  <button onClick={() => onNavigate('#/entrar/cidadao')} className="hover:text-[#C9A227] transition-colors text-left cursor-pointer">
                    Compte Gov Citoyen
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('#/entrar/admin')} className="hover:text-[#C9A227] transition-colors text-left cursor-pointer">
                    Accès Agent (@gouv.cd)
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('#stations')} className="hover:text-[#C9A227] transition-colors text-left cursor-pointer">
                    Stations & Files en direct
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('#steps')} className="hover:text-[#C9A227] transition-colors text-left cursor-pointer">
                    Guide d'Enrôlement
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('#docs')} className="hover:text-[#C9A227] transition-colors text-left cursor-pointer">
                    Documents acceptés
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 5: Assistance & Légal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A227] font-display">
              Assistance & Droit
            </h4>
            <div className="p-3 rounded-xl bg-[#0A2E52] border border-[#14477E]/60 space-y-1.5">
              <span className="text-[10px] text-[#C9A227] font-semibold uppercase tracking-wider">
                Numéro Vert Gratuit
              </span>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#1E8E5A]" />
                <span className="text-lg font-mono font-bold text-white tracking-wider">108</span>
              </div>
              <p className="text-[10px] text-[#DCE4EE]/60">Appel sans frais 24h/7j depuis tous les opérateurs en RDC</p>
            </div>
            <ul className="space-y-1.5 text-xs text-[#DCE4EE]/80 pt-1">
              <li>
                <a href="#privacy" className="hover:text-[#C9A227]">Loi n° 09/001 du 10/01/2009</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#C9A227]">Foire aux questions (FAQ)</a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#C9A227]">Protection de la vie privée</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Legal Citation, Audit Seal, Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#DCE4EE]/60">
          <div className="flex items-center gap-2 text-center md:text-left">
            <ShieldCheck className="w-4 h-4 text-[#C9A227] shrink-0" />
            <p className="leading-relaxed">
              Tous les traitements sont encadrés par la <strong className="text-[#DCE4EE]">Loi n° 09/001 du 10/01/2009</strong> portant protection des données personnelles en RDC.
            </p>
          </div>
          <div className="text-center md:text-right font-mono text-[11px]">
            © {new Date().getFullYear()} République Démocratique du Congo · CSU. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};
