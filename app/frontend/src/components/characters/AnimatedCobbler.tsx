import React from 'react';

interface AnimatedCobblerProps {
  name?: string;
  isHammering?: boolean;
  onClick?: () => void;
  speechText?: string | null;
}

export const AnimatedCobbler: React.FC<AnimatedCobblerProps> = ({
  name = "Mazi Okonkwo",
  isHammering = true,
  onClick,
  speechText
}) => {
  return (
    <div 
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none'
      }}
    >
      {/* Speech Bubble */}
      {speechText && (
        <div 
          className="speech-bubble"
          style={{
            top: '-36px',
            left: '0',
            whiteSpace: 'nowrap',
            maxWidth: '210px'
          }}
        >
          {speechText}
        </div>
      )}

      {/* Cobbler At Work Bench SVG */}
      <div style={{ width: '90px', height: '100px', position: 'relative' }}>
        <svg viewBox="0 0 90 100" width="90" height="100" style={{ overflow: 'visible' }}>
          {/* Floor Shadow */}
          <ellipse cx="45" cy="95" rx="35" ry="5" fill="rgba(0,0,0,0.5)" />

          {/* Cobbler Wooden Work Bench */}
          <rect x="15" y="60" width="60" height="10" rx="2" fill="#5c2c16" />
          <line x1="20" y1="70" x2="20" y2="95" stroke="#3b1b0c" strokeWidth="4" />
          <line x1="70" y1="70" x2="70" y2="95" stroke="#3b1b0c" strokeWidth="4" />

          {/* Cast Iron Shoe Anvil on Bench */}
          <path d="M 40 60 L 52 60 L 55 50 L 37 50 Z" fill="#475569" />
          <line x1="46" y1="50" x2="46" y2="40" stroke="#334155" strokeWidth="3" />
          {/* Shoe on Anvil */}
          <path d="M 40 40 Q 55 38 60 44 L 40 44 Z" fill="#b45309" />

          {/* Stool / Seat */}
          <rect x="2" y="72" width="18" height="6" rx="2" fill="#78350f" />
          <line x1="10" y1="78" x2="10" y2="95" stroke="#451a03" strokeWidth="3" />

          {/* Mazi Sitting (Torso & Legs) */}
          <rect x="4" y="60" width="16" height="24" rx="3" fill="#1e293b" />
          {/* Traditional Nigerian Ankara Vest */}
          <rect x="6" y="32" width="22" height="30" rx="4" fill="#047857" />
          <path d="M 10 32 L 17 42 L 24 32" stroke="#f59e0b" strokeWidth="1.5" fill="none" />

          {/* Mazi Head */}
          <circle cx="17" cy="20" r="11" fill="#522e17" />
          {/* Red Chieftain Fez / Cap */}
          <path d="M 8 16 Q 17 7 26 16 Z" fill="#dc2626" />
          <rect x="7" y="15" width="20" height="4" rx="1" fill="#991b1b" />

          {/* White Beard of Experience */}
          <path d="M 12 25 Q 17 32 22 25 Z" fill="#f8fafc" opacity="0.8" />
          <circle cx="15" cy="19" r="1" fill="#fff" />
          <circle cx="20" cy="19" r="1" fill="#fff" />

          {/* Left Arm Holding Shoe */}
          <line x1="12" y1="36" x2="38" y2="42" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
          <circle cx="39" cy="42" r="3.5" fill="#522e17" />

          {/* Right Arm with Rhythmic Hammer */}
          <g className={isHammering ? "anim-hammer" : ""}>
            <line x1="24" y1="36" x2="40" y2="28" stroke="#047857" strokeWidth="5" strokeLinecap="round" />
            <line x1="40" y1="28" x2="44" y2="34" stroke="#522e17" strokeWidth="4" strokeLinecap="round" />
            {/* Hammer Head */}
            <rect x="42" y="30" width="12" height="7" rx="1" fill="#94a3b8" />
            <line x1="38" y1="35" x2="48" y2="35" stroke="#78350f" strokeWidth="3" />
          </g>
        </svg>
      </div>

      <div style={{
        marginTop: '2px',
        background: 'rgba(18, 19, 22, 0.85)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xs)',
        padding: '2px 6px',
        textAlign: 'center'
      }}>
        <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '11px', color: '#fff' }}>
          {name}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--secondary)' }}>
          Master Cobbler
        </div>
      </div>
    </div>
  );
};
