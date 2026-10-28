import React from 'react';

interface AnimatedVendorProps {
  name?: string;
  onClick?: () => void;
  speechText?: string | null;
}

export const AnimatedVendor: React.FC<AnimatedVendorProps> = ({
  name = "Mama Chinyere",
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
            right: '-10px',
            whiteSpace: 'nowrap',
            maxWidth: '190px'
          }}
        >
          {speechText}
        </div>
      )}

      {/* Food Vendor SVG */}
      <div style={{ width: '80px', height: '100px', position: 'relative' }}>
        <svg viewBox="0 0 80 100" width="80" height="100" style={{ overflow: 'visible' }}>
          {/* Floor Shadow */}
          <ellipse cx="40" cy="94" rx="30" ry="5" fill="rgba(0,0,0,0.5)" />

          {/* Steaming Iron Cauldron (Cooking Pot) */}
          <ellipse cx="56" cy="62" rx="18" ry="7" fill="#b91c1c" />
          <path d="M 38 62 Q 56 90 74 62 Z" fill="#1e293b" />
          {/* Glowing Fire Wood Underneath */}
          <polygon points="46,88 56,76 66,88" fill="#f97316" opacity="0.9" />
          <polygon points="50,88 56,72 62,88" fill="#facc15" opacity="0.9" />

          {/* Animated Steam Clouds */}
          <circle cx="52" cy="50" r="4" fill="#ffffff" style={{ animation: 'steamRise 1.6s ease-out infinite' }} />
          <circle cx="60" cy="45" r="5" fill="#ffffff" style={{ animation: 'steamRise 1.9s ease-out 0.4s infinite' }} />

          {/* Mama Chinyere Body */}
          <rect x="14" y="42" width="22" height="42" rx="4" fill="#7c2d12" />
          {/* Floral African Apron */}
          <rect x="16" y="46" width="18" height="30" rx="3" fill="#facc15" />
          <circle cx="20" cy="54" r="2" fill="#dc2626" />
          <circle cx="28" cy="62" r="2" fill="#2563eb" />
          <circle cx="22" cy="70" r="2" fill="#16a34a" />

          {/* Head & Headwrap (Gele) */}
          <circle cx="25" cy="24" r="10" fill="#522e17" />
          {/* Big Yellow Gele Headwrap */}
          <ellipse cx="25" cy="18" rx="14" ry="9" fill="#eab308" />
          <path d="M 12 18 Q 25 6 38 18 Q 42 12 36 6 Q 25 10 14 6 Z" fill="#ca8a04" />

          {/* Eyes & Warm Smile */}
          <circle cx="22" cy="24" r="1" fill="#fff" />
          <circle cx="27" cy="24" r="1" fill="#fff" />
          <path d="M 21 28 Q 25 32 29 28" stroke="#ffffff" strokeWidth="1.2" fill="none" />

          {/* Stirring Arm & Ladle */}
          <path d="M 28 48 Q 45 42 54 52" stroke="#522e17" strokeWidth="4" fill="none" strokeLinecap="round" />
          <line x1="53" y1="50" x2="56" y2="62" stroke="#94a3b8" strokeWidth="2.5" />
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
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--tertiary)' }}>
          Hot Jollof Rice
        </div>
      </div>
    </div>
  );
};
