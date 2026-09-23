import React, { useState } from 'react';
import { cmsService } from '../../services/cmsService';
import { CsuLogo } from '../brand/CsuLogo';
import { QrCode, Shield, CheckCircle, Info, Sparkles } from 'lucide-react';
import { CsuIdCard } from '../common/CsuIdCard';

export const SectionWhatIs: React.FC = () => {
  const data = cmsService.getWhatIsData();
  const [activeHotspot, setActiveHotspot] = useState<'number' | 'qr' | 'photo' | 'ring' | 'hologram'>('number');

  const hotspots = {
    number: {
      title: 'Numéro National CSU Unique',
      tag: 'Identifiant à vie',
      desc: 'Composé de 16 chiffres avec algorithme de Luhn renforcé, ce numéro relie chaque Congolais à ses droits sociaux à travers toutes les administrations.',
    },
    qr: {
      title: 'QR Code Cryptographique 2D',
      tag: 'Vérification hors-ligne',
      desc: 'Scellé par clé asymétrique de l’État. Lisible instantanément par les centres de santé et les agents de contrôle même sans connexion internet.',
    },
    photo: {
      title: 'Photographie Numérique Haute Définition',
      tag: 'Biométrie certifiée',
      desc: 'Capture faciale conforme aux standards OACI, avec détection du vivant garantissant l’élimination définitive des usurpations d’identité.',
    },
    ring: {
      title: 'Sceau Dourado & Motifs Géométriques',
      tag: 'Sceau républicain',
      desc: 'Gravure inspirée des motifs traditionnels congolais avec micro-impressions guillochées infalsifiables et dorure optique sécurisée.',
    },
    hologram: {
      title: 'Puce & Hologramme Souverain 2026',
      tag: 'Norme RDC 2026',
      desc: 'Filigrane optique reflétant les armoiries nationales (Léopard, Flèche, Pointe d’ivoire) certifié par la Banque Centrale du Congo.',
    },
  };

  return (
    <section id="what-is" className="py-16 sm:py-24 bg-[#F6F8FB] border-b border-[#DCE4EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#9C7B1E]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{data.badge}</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#08243F] tracking-tight">
            {data.title}
          </h2>
          <p className="font-citizen text-sm sm:text-base text-[#0A1B2A]/80 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Interactive Card Anatomy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Card Visual with Mode Switcher & Flip Effect */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <CsuIdCard
              interactiveHotspots
              activeHotspot={activeHotspot}
              onHotspotClick={setActiveHotspot}
            />
          </div>

          {/* Right Inspector Drawer */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#DCE4EE] shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-[#EAEFF5] pb-3">
                <span className="text-xs font-mono font-bold text-[#C9A227] uppercase tracking-wider">
                  {hotspots[activeHotspot].tag}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-[#1E8E5A] font-semibold bg-[#1E8E5A]/10 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  Homologué Loi 09/001
                </span>
              </div>

              <h3 className="font-display font-bold text-lg sm:text-xl text-[#08243F]">
                {hotspots[activeHotspot].title}
              </h3>

              <p className="font-citizen text-xs sm:text-sm text-[#0A1B2A]/80 leading-relaxed">
                {hotspots[activeHotspot].desc}
              </p>

              {/* Selector shortcuts */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-[#0A1B2A]/60 block mb-2">
                  Cliquez pour explorer chaque composant de la carte :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(['number', 'qr', 'photo', 'ring', 'hologram'] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveHotspot(key)}
                      className={`text-xs px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                        activeHotspot === key
                          ? 'bg-[#0E3A66] text-white font-bold shadow-sm'
                          : 'bg-[#F6F8FB] text-[#0A1B2A] hover:bg-[#EAEFF5]'
                      }`}
                    >
                      {key === 'number'
                        ? '1. Numéro CSU'
                        : key === 'qr'
                        ? '2. QR Code'
                        : key === 'photo'
                        ? '3. Biométrie'
                        : key === 'ring'
                        ? '4. Sceau Dourado'
                        : '5. Hologramme'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#EAEFF5] border border-[#DCE4EE] flex items-center gap-3">
              <Info className="w-5 h-5 text-[#0E3A66] shrink-0" />
              <p className="text-xs text-[#08243F] font-medium leading-relaxed">
                Le récépissé papier avec QR Code a exactement la même valeur juridique que la carte physique ou la version numérique dans votre Compte Gov.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
