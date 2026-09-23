import React from 'react';

interface CsuLogoProps {
  variant?: 'seal' | 'horizontal' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showSubtitle?: boolean;
}

export const CsuLogo: React.FC<CsuLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  showSubtitle = true,
}) => {
  const getSealDimension = () => {
    switch (size) {
      case 'sm':
        return 36;
      case 'md':
        return 48;
      case 'lg':
        return 72;
      case 'xl':
        return 96;
      default:
        return 48;
    }
  };

  const dim = getSealDimension();

  // Seal SVG inline
  const SealSVG = (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 hover:rotate-2 hover:scale-105"
      role="img"
      aria-label="Sceau officiel CSU République Démocratique du Congo"
    >
      <defs>
        {/* Outer Gold Gradient */}
        <linearGradient id="csuGoldRim" x1="15" y1="15" x2="185" y2="185" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="25%" stopColor="#E5BE53" />
          <stop offset="65%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#8A6818" />
        </linearGradient>

        {/* Inner Gold Rim Edge */}
        <linearGradient id="csuGoldInner" x1="180" y1="180" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDF2C7" />
          <stop offset="50%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#6C4E0B" />
        </linearGradient>

        {/* Deep Navy Disc Gradient */}
        <radialGradient id="csuNavyDisk" cx="100" cy="100" r="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#14477E" />
          <stop offset="50%" stopColor="#0E3A66" />
          <stop offset="85%" stopColor="#0A2E52" />
          <stop offset="100%" stopColor="#061B30" />
        </radialGradient>

        {/* Metallic Text CSU */}
        <linearGradient id="csuSilverText" x1="70" y1="75" x2="130" y2="135" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F0F4F8" />
          <stop offset="80%" stopColor="#DCE4EE" />
          <stop offset="100%" stopColor="#A8BCCD" />
        </linearGradient>

        {/* Drop shadow filter */}
        <filter id="csuShadow" x="-10%" y="-10%" width="125%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#08243F" floodOpacity="0.45" />
        </filter>
        <filter id="csuTextShadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#051424" floodOpacity="0.8" />
        </filter>
      </defs>

      {/* Outer Glow & Shadow Base */}
      <circle cx="100" cy="100" r="95" fill="none" filter="url(#csuShadow)" />

      {/* Gold Outer Rim (Solid beveled look) */}
      <circle cx="100" cy="100" r="95" stroke="url(#csuGoldRim)" strokeWidth="9" fill="none" />
      <circle cx="100" cy="100" r="90.5" stroke="url(#csuGoldInner)" strokeWidth="2" fill="none" opacity="0.8" />

      {/* Inner Navy Disc */}
      <circle cx="100" cy="100" r="89.5" fill="url(#csuNavyDisk)" />

      {/* Congolese Geometric Concentric Rings (Kuba & Pende traditional inspiration) */}
      {/* Outer ring: 36 Radial wedges / ticks */}
      <g stroke="#24588E" strokeWidth="2.5" opacity="0.85">
        {[...Array(36)].map((_, i) => (
          <line
            key={`outer-tick-${i}`}
            x1="100"
            y1="13"
            x2="100"
            y2="21"
            transform={`rotate(${i * 10} 100 100)`}
          />
        ))}
      </g>

      {/* Geometric ring 1: Congolais Chevrons & Triangles band */}
      <circle cx="100" cy="100" r="77" stroke="#1D4F82" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
      <g fill="none" stroke="#25629F" strokeWidth="2.2" opacity="0.9">
        {[...Array(24)].map((_, i) => (
          <polygon
            key={`chevron-${i}`}
            points="100,24 104,33 96,33"
            transform={`rotate(${i * 15} 100 100)`}
          />
        ))}
      </g>

      {/* Mid Ring: Interlocking curved arcs & diamonds */}
      <circle cx="100" cy="100" r="64" stroke="#164372" strokeWidth="3" />
      <circle cx="100" cy="100" r="61" stroke="#3172B5" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.75" />
      <g fill="#215993" opacity="0.85">
        {[...Array(18)].map((_, i) => (
          <circle
            key={`dot-${i}`}
            cx="100"
            cy="42"
            r="2.5"
            transform={`rotate(${i * 20} 100 100)`}
          />
        ))}
      </g>

      {/* Inner Zigzag wave band */}
      <circle cx="100" cy="100" r="52" stroke="#143E69" strokeWidth="2" />
      <g stroke="#397ECA" strokeWidth="2" fill="none" opacity="0.75">
        {[...Array(20)].map((_, i) => (
          <path
            key={`zigzag-${i}`}
            d="M96 50 L100 46 L104 50"
            transform={`rotate(${i * 18} 100 100)`}
          />
        ))}
      </g>

      {/* Center Plateau */}
      <circle cx="100" cy="100" r="42" fill="#0C2F52" stroke="#1E5C99" strokeWidth="1.5" />

      {/* Metallic "CSU" Emblem Letters with 3D Emboss Effect */}
      <text
        x="100"
        y="114"
        textAnchor="middle"
        fontFamily="Manrope, Inter, sans-serif"
        fontWeight="800"
        fontSize="44"
        letterSpacing="1"
        fill="url(#csuSilverText)"
        filter="url(#csuTextShadow)"
      >
        CSU
      </text>

      {/* Subtle top glossy highlight reflection */}
      <path
        d="M25 80 A80 80 0 0 1 175 80 A80 45 0 0 0 25 80 Z"
        fill="#FFFFFF"
        opacity="0.07"
      />
    </svg>
  );

  if (variant === 'seal') {
    return <div className={`inline-flex items-center ${className}`}>{SealSVG}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 ${className}`}>
      {SealSVG}
      <div className="flex flex-col justify-center leading-tight min-w-0">
        <span className="font-display font-extrabold tracking-tight text-white flex items-center gap-1.5 text-base sm:text-lg md:text-xl">
          CSU
          <span className="w-1.5 h-1.5 rounded-full bg-csu-gold-500 inline-block"></span>
          <span className="font-semibold text-csu-silver-100 text-xs sm:text-sm md:text-base tracking-normal">
            RDC
          </span>
        </span>
        <span className="font-display font-bold text-[11px] sm:text-xs md:text-sm text-csu-silver-100 tracking-tight leading-snug">
          Recensement Socio-Économique Unifié
        </span>
      </div>
    </div>
  );
};
