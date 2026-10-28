import React from 'react';

interface AnimatedKekeProps {
  driverName?: string;
  onClick?: () => void;
  speechText?: string | null;
}

export const AnimatedKeke: React.FC<AnimatedKekeProps> = ({
  driverName = "Driver Chidi",
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
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {speechText}
        </div>
      )}

      {/* Yellow Keke Napep Tricycle SVG */}
      <div className="anim-keke" style={{ width: '130px', height: '90px', position: 'relative' }}>
        <svg viewBox="0 0 130 90" width="130" height="90" style={{ overflow: 'visible' }}>
          {/* Shadow */}
          <ellipse cx="65" cy="85" rx="50" ry="5" fill="rgba(0,0,0,0.5)" />

          {/* Rear Wheels */}
          <circle cx="30" cy="74" r="12" fill="#1e293b" stroke="#475569" strokeWidth="3" />
          <circle cx="30" cy="74" r="4" fill="#94a3b8" />

          {/* Front Wheel */}
          <circle cx="106" cy="74" r="11" fill="#1e293b" stroke="#475569" strokeWidth="3" />
          <circle cx="106" cy="74" r="4" fill="#94a3b8" />

          {/* Keke Cabin Body (Classic Yellow) */}
          <path d="M 20 40 L 40 18 L 85 18 L 115 50 L 115 72 L 20 72 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
          {/* Black Racing Stripes / Commercial Trim */}
          <rect x="20" y="52" width="95" height="6" fill="#0f172a" />

          {/* Windshield */}
          <polygon points="82,22 110,48 95,48 76,22" fill="#38bdf8" opacity="0.75" />

          {/* Rear Cargo Compartment (Tarped Shoe Cartons) */}
          <rect x="22" y="32" width="30" height="20" rx="2" fill="#2563eb" />
          <line x1="22" y1="42" x2="52" y2="42" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="24" y="40" fill="#fff" fontSize="6" fontFamily="sans-serif" fontWeight="bold">SHOES</text>

          {/* Driver Chidi Inside Cabin */}
          <g transform="translate(68, 26)">
            {/* Torso */}
            <rect x="0" y="16" width="16" height="18" rx="3" fill="#0284c7" />
            {/* Head */}
            <circle cx="8" cy="10" r="7" fill="#522e17" />
            {/* Driving Flat Cap */}
            <ellipse cx="8" cy="5" rx="9" ry="3" fill="#334155" />
            <path d="M 1 5 Q 8 1 15 5 Z" fill="#475569" />
            {/* Eyes */}
            <circle cx="10" cy="10" r="1" fill="#fff" />
            {/* Waving Arm */}
            <path d="M 14 18 Q 22 12 24 6" stroke="#522e17" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="24" cy="5" r="2.5" fill="#522e17" />
          </g>

          {/* Keke Headlight */}
          <circle cx="116" cy="58" r="4" fill="#fef08a" />
          <polygon points="118,54 130,48 130,68 118,62" fill="#fef08a" opacity="0.3" />
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
          {driverName}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--primary)' }}>
          Keke Logistics
        </div>
      </div>
    </div>
  );
};
