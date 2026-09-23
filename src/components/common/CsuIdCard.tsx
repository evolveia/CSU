import React, { useState } from 'react';
import { CsuLogo } from '../brand/CsuLogo';
import { QrCode, Shield, Download, Smartphone, CreditCard, Sparkles, CheckCircle2, RotateCw, ExternalLink } from 'lucide-react';

interface CsuIdCardProps {
  csuNumber?: string;
  holderName?: string;
  holderGivenName?: string;
  location?: string;
  initials?: string;
  issueDate?: string;
  photoUrl?: string;
  interactiveHotspots?: boolean;
  onHotspotClick?: (hotspot: 'number' | 'qr' | 'photo' | 'ring' | 'hologram') => void;
  activeHotspot?: 'number' | 'qr' | 'photo' | 'ring' | 'hologram';
}

export const CsuIdCard: React.FC<CsuIdCardProps> = ({
  csuNumber = 'CSU-2026-9941-8412',
  holderName = 'MBIYA TSHILOMBO',
  holderGivenName = 'ESTHER',
  location = 'Kinshasa · Kalamu',
  initials = 'ET',
  issueDate = '15/01/2026',
  photoUrl,
  interactiveHotspots = false,
  onHotspotClick,
  activeHotspot,
}) => {
  const [cardMode, setCardMode] = useState<'physical' | 'digital'>('physical');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = () => {
    setIsDownloaded(true);
    setTimeout(() => setIsDownloaded(false), 2500);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center p-1 bg-[#0A2E52]/80 backdrop-blur-md rounded-2xl border border-[#14477E] mb-6 shadow-md">
        <button
          type="button"
          onClick={() => {
            setCardMode('physical');
            setIsFlipped(false);
          }}
          className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            cardMode === 'physical'
              ? 'bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] shadow-md font-bold'
              : 'text-[#DCE4EE] hover:text-white'
          }`}
        >
          <CreditCard className="w-4 h-4 shrink-0" />
          <span>Carte Physique</span>
          <span className="hidden sm:inline text-[10px] opacity-80">(Plastifiée & Récépissé)</span>
        </button>

        <button
          type="button"
          onClick={() => setCardMode('digital')}
          className={`flex items-center gap-2 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            cardMode === 'digital'
              ? 'bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] shadow-md font-bold'
              : 'text-[#DCE4EE] hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4 shrink-0" />
          <span>Carte Numérique</span>
          <span className="hidden sm:inline text-[10px] opacity-80">(Compte Gov Wallet)</span>
        </button>
      </div>

      {/* CARD RENDERING */}
      {cardMode === 'physical' ? (
        /* Physical Card with Flip Effect */
        <div className="w-full max-w-xl [perspective:1200px]">
          <div
            className={`relative w-full aspect-[1.586/1] transition-transform duration-700 [transform-style:preserve-3d] ${
              isFlipped ? '[transform:rotateY(180deg)]' : ''
            }`}
          >
            {/* FRONT OF PHYSICAL CARD (RECTO) */}
            <div className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#072440] via-[#0A2E52] to-[#05182B] p-3.5 sm:p-5 md:p-6 text-white border-2 border-[#C9A227] shadow-2xl overflow-hidden flex flex-col justify-between [backface-visibility:hidden]">
              {/* Gold double hairline inner border */}
              <div className="absolute inset-1.5 sm:inset-2 border border-[#C9A227]/30 rounded-xl sm:rounded-2xl pointer-events-none" />

              {/* Congolese Watermark Background */}
              <svg
                className="absolute -right-10 -bottom-10 w-64 h-64 sm:w-80 sm:h-80 opacity-[0.06] pointer-events-none"
                viewBox="0 0 200 200"
              >
                <circle cx="100" cy="100" r="90" stroke="#C9A227" strokeWidth="3" fill="none" />
                <circle cx="100" cy="100" r="70" stroke="#C9A227" strokeWidth="2" strokeDasharray="6 3" fill="none" />
                {[...Array(16)].map((_, i) => (
                  <polygon
                    key={i}
                    points="100,20 104,30 96,30"
                    fill="#C9A227"
                    transform={`rotate(${i * 22.5} 100 100)`}
                  />
                ))}
              </svg>

              {/* CARD TOP BAR */}
              <div className="flex items-center justify-between relative z-10 gap-2">
                {/* Left: Seal with Dashed Circular Golden Motif */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => interactiveHotspots && onHotspotClick?.('ring')}
                    className={`relative p-0.5 rounded-full transition-transform ${
                      interactiveHotspots
                        ? 'cursor-pointer hover:scale-105 ring-1 ring-[#C9A227]'
                        : ''
                    } ${activeHotspot === 'ring' ? 'ring-2 ring-white scale-110' : ''}`}
                    title="Sceau officiel CSU"
                  >
                    <CsuLogo variant="seal" size="sm" />
                    {interactiveHotspots && (
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#C9A227] rounded-full animate-ping" />
                    )}
                  </button>

                  <div className="leading-tight">
                    <span className="text-[8px] sm:text-[10px] md:text-[11px] tracking-wider uppercase font-bold text-[#D9B84A] block">
                      RÉPUBLIQUE DÉMOCRATIQUE DU CONGO
                    </span>
                    <span className="font-display font-extrabold text-[10px] sm:text-xs md:text-sm text-white tracking-wide">
                      REGISTRE SOCIAL UNIFIÉ (CSU)
                    </span>
                  </div>
                </div>

                {/* Right: Hologram Pill */}
                <button
                  type="button"
                  onClick={() => interactiveHotspots && onHotspotClick?.('hologram')}
                  className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#0E3A66]/80 border text-[7px] sm:text-[9px] font-mono tracking-widest text-[#D9B84A] transition-all relative overflow-hidden ${
                    interactiveHotspots ? 'cursor-pointer hover:border-[#C9A227]' : ''
                  } ${
                    activeHotspot === 'hologram'
                      ? 'border-[#C9A227] ring-1 ring-[#C9A227] shadow-[0_0_10px_#C9A227]'
                      : 'border-[#C9A227]/40'
                  }`}
                >
                  <span className="relative z-10 font-bold">HOLOGRAMME 2026</span>
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-[#D9B84A]/30 to-transparent" />
                </button>
              </div>

              {/* CARD MIDDLE BODY: Photo + Info + QR */}
              <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center my-auto py-1 relative z-10">
                {/* 1. Biometric Photo Box (Left) */}
                <div className="col-span-3 sm:col-span-3 flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => interactiveHotspots && onHotspotClick?.('photo')}
                    className={`relative w-14 h-18 sm:w-20 sm:h-24 md:w-24 md:h-28 rounded-lg sm:rounded-xl bg-[#08243F] border-2 overflow-hidden flex flex-col items-center justify-center transition-all ${
                      interactiveHotspots ? 'cursor-pointer hover:border-[#D9B84A]' : ''
                    } ${
                      activeHotspot === 'photo'
                        ? 'border-[#C9A227] ring-2 ring-[#C9A227]/50 shadow-lg'
                        : 'border-[#14477E]'
                    }`}
                  >
                    {photoUrl ? (
                      <div className="relative w-full h-full">
                        <img src={photoUrl} alt="Photo biométrique" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#1E8E5A] ring-1 ring-white" />
                      </div>
                    ) : (
                      <>
                        <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-[#14477E] flex items-center justify-center text-xs sm:text-base font-bold text-[#EAEFF5] mb-0.5 sm:mb-1">
                          {initials}
                        </div>
                        <span className="text-[7px] sm:text-[9px] font-bold text-[#D9B84A] tracking-wider uppercase">
                          BIOMÉTRIE
                        </span>
                        <span className="absolute bottom-1 right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#1E8E5A]" />
                      </>
                    )}
                  </button>
                </div>

                {/* 2. Titulaire & National Number Box (Center) */}
                <div className="col-span-6 sm:col-span-6 space-y-1 sm:space-y-1.5 pl-0.5 sm:pl-1">
                  <div>
                    <span className="text-[7px] sm:text-[9px] text-[#DCE4EE]/70 uppercase tracking-wider block font-semibold">
                      TITULAIRE DU FOYER
                    </span>
                    <div className="font-display font-extrabold text-[10px] sm:text-xs md:text-sm text-white tracking-wide leading-snug">
                      {holderName}
                    </div>
                    <div className="font-display font-semibold text-[9px] sm:text-xs text-[#EAEFF5]">
                      {holderGivenName}
                    </div>
                  </div>

                  <div className="pt-0.5">
                    <span className="text-[7px] sm:text-[8px] text-[#DCE4EE]/60 uppercase tracking-wider block">
                      LOCALISATION
                    </span>
                    <span className="text-[8px] sm:text-[10px] md:text-xs text-[#DCE4EE] font-medium">
                      {location}
                    </span>
                  </div>

                  {/* Golden Outlined CSU National Number Box */}
                  <button
                    type="button"
                    onClick={() => interactiveHotspots && onHotspotClick?.('number')}
                    className={`w-full text-left p-1 sm:p-1.5 md:p-2 rounded-lg sm:rounded-xl border bg-[#05182B]/90 transition-all ${
                      interactiveHotspots ? 'cursor-pointer hover:border-[#D9B84A]' : ''
                    } ${
                      activeHotspot === 'number'
                        ? 'border-[#C9A227] ring-1 ring-[#C9A227] shadow-[0_0_12px_rgba(201,162,39,0.4)]'
                        : 'border-[#C9A227]/70'
                    }`}
                  >
                    <span className="text-[6px] sm:text-[8px] text-[#D9B84A] font-mono font-bold uppercase tracking-wider block">
                      NUMÉRO CSU NATIONAL
                    </span>
                    <span className="font-mono font-bold text-[9px] sm:text-xs md:text-sm text-white tracking-wider sm:tracking-widest block truncate">
                      {csuNumber}
                    </span>
                  </button>
                </div>

                {/* 3. Secure QR Code (Right) */}
                <div className="col-span-3 sm:col-span-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => interactiveHotspots && onHotspotClick?.('qr')}
                    className={`relative p-1.5 sm:p-2.5 rounded-xl bg-white shadow-lg transition-transform ${
                      interactiveHotspots ? 'cursor-pointer hover:scale-105' : ''
                    } ${
                      activeHotspot === 'qr'
                        ? 'ring-3 ring-[#C9A227] scale-105 shadow-2xl'
                        : ''
                    }`}
                    title="QR Code cryptographique 2D scellé"
                  >
                    {/* Circular dashed guide background */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-20 p-1"
                      viewBox="0 0 100 100"
                    >
                      <circle cx="50" cy="50" r="46" stroke="#08243F" strokeWidth="2" strokeDasharray="4 2" fill="none" />
                    </svg>
                    <QrCode className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#08243F] relative z-10" />
                  </button>
                </div>
              </div>

              {/* CARD BOTTOM FOOTER */}
              <div className="flex items-center justify-between text-[7px] sm:text-[8px] md:text-[9px] font-mono text-[#DCE4EE]/70 border-t border-[#14477E]/80 pt-1.5 sm:pt-2 relative z-10">
                <span className="truncate mr-1">Délivré par le Ministère des Affaires Sociales</span>
                <span className="shrink-0 text-[#D9B84A] font-semibold">Validité permanente · RDC</span>
              </div>
            </div>

            {/* BACK OF PHYSICAL CARD (VERSO) */}
            <div className="absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#05182B] via-[#08243F] to-[#0A2E52] p-4 sm:p-6 text-white border-2 border-[#C9A227] shadow-2xl overflow-hidden flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
              {/* Magnetic Strip */}
              <div className="w-full h-9 sm:h-11 bg-[#020B14] -mx-6 -mt-2 border-y border-[#14477E]/80 relative flex items-center px-4">
                <span className="text-[8px] font-mono text-[#DCE4EE]/40 tracking-widest">
                  BAND ELECTROMAGNETIQUE HOMOLOGUEE BCC // RDC-CSU-SECURE-2026
                </span>
              </div>

              {/* Official legal notice */}
              <div className="space-y-1.5 sm:space-y-2 text-[8px] sm:text-[10px] text-[#DCE4EE]/80 leading-relaxed pt-2">
                <p className="font-semibold text-[#D9B84A]">
                  AVIS DE L'ÉTAT CONGOLAIS · LOI N° 09/001 DU 10 JANVIER 2009
                </p>
                <p className="text-[#DCE4EE]/70">
                  Cette carte est la propriété exclusive de la République Démocratique du Congo. Elle certifie l'inscription au Registre Social Unifié et ouvre droit aux régimes d'assistance sociale, gratuité des soins ciblés et transferts monétaires nationaux.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[8px] text-[#D9B84A]">
                  <div>Date d'émission : {issueDate}</div>
                  <div>Centre de délivrance : KIN-02 Kalamu</div>
                </div>
              </div>

              {/* Bottom security strip & barcode */}
              <div className="border-t border-[#14477E] pt-2 flex items-center justify-between text-[8px] font-mono text-[#DCE4EE]/60">
                <span>Numéro d'urgence gratuit : 108</span>
                <span className="tracking-widest">||| | |||| | ||| ||||| |||</span>
                <span>portail.csu.gouv.cd</span>
              </div>
            </div>
          </div>

          {/* Flip Card Action Button */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              type="button"
              onClick={() => setIsFlipped(!isFlipped)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A2E52] hover:bg-[#14477E] text-xs font-semibold text-[#D9B84A] border border-[#C9A227]/40 transition-all cursor-pointer active:scale-95 shadow"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'Voir le Recto (Face)' : 'Voir le Verso (Dos sécurisé)'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#08243F] hover:bg-[#0E3A66] text-xs font-semibold text-[#EAEFF5] border border-[#14477E] transition-all cursor-pointer active:scale-95 shadow"
            >
              {isDownloaded ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1E8E5A]" />
                  <span className="text-[#1E8E5A]">Récépissé PDF Prêt !</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>Imprimer le Récépissé A4</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Digital Card (Wallet / Smartphone) */
        <div className="w-full max-w-sm flex flex-col items-center">
          {/* Smartphone Frame */}
          <div className="w-full rounded-[36px] bg-[#051525] p-3 sm:p-4 border-4 border-[#1B5FAA]/40 shadow-2xl shadow-[#08243F] flex flex-col overflow-hidden">
            {/* Speaker & Camera Notch */}
            <div className="w-20 h-4 bg-[#0A2E52] rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-[#051525] inline-block" />
            </div>

            {/* Screen Area */}
            <div className="rounded-[24px] bg-gradient-to-b from-[#08243F] via-[#0A2E52] to-[#05182B] p-4 text-white border border-[#14477E]/80 space-y-4">
              {/* Digital Pass Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#14477E]">
                <div className="flex items-center gap-2">
                  <CsuLogo variant="seal" size="sm" />
                  <span className="text-xs font-display font-bold text-white">Compte Gov Wallet</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#1E8E5A] bg-[#1E8E5A]/15 px-2 py-0.5 rounded-full font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E8E5A] animate-pulse" />
                  <span>NFC Actif</span>
                </div>
              </div>

              {/* Digital Card Pass */}
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-[#0E3A66] to-[#08243F] border border-[#C9A227] shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#D9B84A] tracking-wider">
                    CARTE D'IDENTITÉ SOCIALE CSU
                  </span>
                  <Sparkles className="w-3.5 h-3.5 text-[#D9B84A]" />
                </div>

                <div className="flex items-center gap-3">
                  {photoUrl ? (
                    <img src={photoUrl} alt="Photo" className="w-11 h-11 rounded-xl object-cover border border-[#C9A227] shadow" />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-[#08243F] border border-[#14477E] flex items-center justify-center text-xs font-bold text-[#D9B84A] shadow">
                      {initials}
                    </div>
                  )}
                  <div className="space-y-0.5">
                    <span className="text-[9px] text-[#DCE4EE]/70 uppercase font-medium">Titulaire certifié</span>
                    <div className="text-sm font-display font-extrabold text-white">{holderName}</div>
                    <div className="text-xs text-[#EAEFF5]">{holderGivenName} · {location}</div>
                  </div>
                </div>

                {/* Monospace CSU Number */}
                <div className="p-2 rounded-xl bg-[#05182B] border border-[#C9A227]/50 flex items-center justify-between">
                  <div>
                    <span className="text-[8px] text-[#D9B84A] font-mono block">NUMÉRO NATIONAL CSU</span>
                    <span className="font-mono text-xs font-bold text-white tracking-widest">{csuNumber}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-[#1E8E5A] shrink-0" />
                </div>

                {/* QR Scanner Display with Animated Scan Line */}
                <div className="relative p-3 bg-white rounded-xl flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-x-0 h-0.5 bg-[#C9A227] shadow-[0_0_8px_#C9A227] animate-qr-scan" />
                  <QrCode className="w-24 h-24 text-[#08243F]" />
                  <span className="text-[9px] text-[#08243F] font-mono mt-1 font-semibold">
                    Code rotatif dynamique · RDC 2026
                  </span>
                </div>
              </div>

              {/* Action buttons inside wallet */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E9CE7A] via-[#C9A227] to-[#9C7B1E] text-[#08243F] font-display font-bold text-xs shadow hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Enregistrer dans Apple / Google Wallet</span>
                </button>

                <div className="flex items-center justify-center gap-1 text-[10px] text-[#DCE4EE]/60 pt-1">
                  <Shield className="w-3 h-3 text-[#1E8E5A]" />
                  <span>Authentifié par clé républicaine hors-ligne</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
