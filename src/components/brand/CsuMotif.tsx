import React from 'react';

interface CsuMotifProps {
  variant?: 'watermark' | 'divider' | 'card-frame' | 'login-bg';
  opacity?: number;
  className?: string;
  children?: React.ReactNode;
}

export const CsuMotif: React.FC<CsuMotifProps> = ({
  variant = 'watermark',
  opacity = 0.05,
  className = '',
  children,
}) => {
  if (variant === 'divider') {
    return (
      <div className={`relative flex items-center justify-center py-6 ${className}`} role="separator">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A227]/40 to-transparent" />
        <div className="absolute flex items-center gap-1.5 px-4 bg-inherit">
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A227]" />
          <div className="w-3.5 h-3.5 rounded-full border border-[#C9A227] flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
          </div>
          <span className="w-1.5 h-1.5 rotate-45 bg-[#C9A227]" />
        </div>
      </div>
    );
  }

  if (variant === 'card-frame') {
    return (
      <div className={`relative p-0.5 rounded-2xl bg-gradient-to-b from-[#C9A227]/70 via-[#14477E]/40 to-[#0A2E52]/90 ${className}`}>
        <div className="relative rounded-[15px] bg-[#0A2E52] overflow-hidden">
          {/* Subtle Congolese corner geometric patterns */}
          <svg className="absolute -top-6 -right-6 w-28 h-28 opacity-10 pointer-events-none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#C9A227" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="35" stroke="#C9A227" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <circle cx="50" cy="50" r="25" stroke="#C9A227" strokeWidth="2" fill="none" />
          </svg>
          {children}
        </div>
      </div>
    );
  }

  if (variant === 'login-bg') {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        {/* Radial ambient glow in brand navy/gold */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1B5FAA]/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#C9A227]/10 blur-3xl" />
        
        {/* Giant Concentric Congolese SVG Watermark */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] select-none pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
          style={{ opacity }}
        >
          <circle cx="200" cy="200" r="190" stroke="#C9A227" strokeWidth="2" />
          <circle cx="200" cy="200" r="170" stroke="#DCE4EE" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="145" stroke="#C9A227" strokeWidth="3" />
          
          {/* Geometric radial chevrons */}
          {[...Array(32)].map((_, i) => (
            <line
              key={`login-tick-${i}`}
              x1="200"
              y1="35"
              x2="200"
              y2="52"
              stroke="#DCE4EE"
              strokeWidth="2"
              transform={`rotate(${i * 11.25} 200 200)`}
            />
          ))}

          {/* Diamonds band */}
          {[...Array(24)].map((_, i) => (
            <polygon
              key={`login-dia-${i}`}
              points="200,60 204,68 200,76 196,68"
              fill="#C9A227"
              transform={`rotate(${i * 15} 200 200)`}
            />
          ))}

          <circle cx="200" cy="200" r="115" stroke="#DCE4EE" strokeWidth="1" />
          <circle cx="200" cy="200" r="85" stroke="#C9A227" strokeWidth="2" strokeDasharray="6 3" />
          <circle cx="200" cy="200" r="55" stroke="#DCE4EE" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="25" fill="#C9A227" opacity="0.3" />
        </svg>
      </div>
    );
  }

  // Watermark background pattern
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg
        className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 w-[600px] h-[600px] select-none"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle cx="150" cy="150" r="140" stroke="#C9A227" strokeWidth="1.5" />
        <circle cx="150" cy="150" r="120" stroke="#0E3A66" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="150" cy="150" r="100" stroke="#C9A227" strokeWidth="2" />
        {[...Array(24)].map((_, i) => (
          <line
            key={`wm-tick-${i}`}
            x1="150"
            y1="32"
            x2="150"
            y2="46"
            stroke="#C9A227"
            strokeWidth="1.5"
            transform={`rotate(${i * 15} 150 150)`}
          />
        ))}
        <circle cx="150" cy="150" r="75" stroke="#0E3A66" strokeWidth="1" />
        <circle cx="150" cy="150" r="45" stroke="#C9A227" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    </div>
  );
};
