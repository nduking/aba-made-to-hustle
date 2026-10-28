import React from 'react';

interface AnimatedCharacterProps {
  name: string;
  roleTitle?: string;
  skinTone?: string;
  outfitColor?: string;
  gender?: 'male' | 'female' | 'other';
  isWorking?: boolean;
  scale?: number;
  speechText?: string | null;
  onSpeechClick?: () => void;
  onClick?: () => void;
}

export const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({
  name,
  roleTitle,
  skinTone = '#6f4320',
  outfitColor = '#f59e0b',
  gender = 'male',
  isWorking = false,
  scale = 1,
  speechText,
  onSpeechClick,
  onClick
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
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        userSelect: 'none'
      }}
    >
      {/* Speech Bubble (if any) */}
      {speechText && (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            if (onSpeechClick) onSpeechClick();
          }}
          className="speech-bubble"
          style={{
            top: '-42px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {speechText}
        </div>
      )}

      {/* Vector Character Body */}
      <div className={isWorking ? '' : 'anim-idle'} style={{ width: '70px', height: '110px', position: 'relative' }}>
        <svg viewBox="0 0 70 110" width="70" height="110" style={{ overflow: 'visible' }}>
          {/* Shadow on Floor */}
          <ellipse cx="35" cy="106" rx="22" ry="5" fill="rgba(0,0,0,0.4)" />

          {/* Legs & Trousers */}
          <rect x="23" y="68" width="10" height="34" rx="3" fill="#1b1d24" />
          <rect x="37" y="68" width="10" height="34" rx="3" fill="#1b1d24" />

          {/* Handcrafted Leather Shoes (Made in Aba) */}
          <rect x="20" y="98" width="14" height="7" rx="3" fill="#451a03" />
          <rect x="37" y="98" width="14" height="7" rx="3" fill="#451a03" />

          {/* Torso / Shirt */}
          <rect x="21" y="36" width="28" height="34" rx="5" fill={outfitColor} />

          {/* Apprentice Apron or Merchant Collar */}
          <polygon points="25,36 45,36 42,65 28,65" fill="rgba(0,0,0,0.2)" />
          <path d="M 28 36 L 35 45 L 42 36" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.4" />

          {/* Neck */}
          <rect x="31" y="27" width="8" height="10" fill={skinTone} />

          {/* Head */}
          <circle cx="35" cy="22" r="13" fill={skinTone} />

          {/* Hair & Style */}
          {gender === 'female' ? (
            <path d="M 21 22 Q 35 8 49 22 Q 52 35 48 40 Q 35 30 22 40 Z" fill="#0f0f12" />
          ) : (
            <path d="M 22 20 Q 35 10 48 20 Q 48 13 35 12 Q 22 13 22 20 Z" fill="#0f0f12" />
          )}

          {/* Cap / Flat Cap (Igbo Merchant Style) */}
          <ellipse cx="35" cy="13" rx="14" ry="4" fill="#991b1b" />
          <rect x="26" y="10" width="18" height="6" rx="2" fill="#dc2626" />

          {/* Eyes & Smile */}
          <circle cx="31" cy="22" r="1.5" fill="#ffffff" />
          <circle cx="31.5" cy="22" r="0.8" fill="#121316" />
          <circle cx="39" cy="22" r="1.5" fill="#ffffff" />
          <circle cx="39.5" cy="22" r="0.8" fill="#121316" />
          <path d="M 32 27 Q 35 30 38 27" stroke="#ffffff" strokeWidth="1.2" fill="none" strokeLinecap="round" />

          {/* Left Arm (Resting or Holding Material) */}
          <rect x="15" y="38" width="7" height="25" rx="3" fill={outfitColor} />
          <circle cx="18" cy="64" r="4" fill={skinTone} />

          {/* Right Arm (Working / Hammering if active, or resting) */}
          {isWorking ? (
            <g className="anim-hammer">
              <rect x="47" y="38" width="7" height="24" rx="3" fill={outfitColor} />
              <circle cx="50" cy="63" r="4.5" fill={skinTone} />
              {/* Wooden Cobbler Hammer */}
              <line x1="50" y1="63" x2="62" y2="78" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
              <rect x="58" y="74" width="10" height="7" rx="2" fill="#64748b" transform="rotate(-30 58 74)" />
            </g>
          ) : (
            <g>
              <rect x="48" y="38" width="7" height="25" rx="3" fill={outfitColor} />
              <circle cx="51" cy="64" r="4" fill={skinTone} />
            </g>
          )}
        </svg>
      </div>

      {/* Name & Role Tag Below */}
      <div style={{
        marginTop: '2px',
        background: 'rgba(18, 19, 22, 0.85)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xs)',
        padding: '2px 6px',
        textAlign: 'center',
        whiteSpace: 'nowrap'
      }}>
        <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '11px', color: '#fff' }}>
          {name}
        </div>
        {roleTitle && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--primary)' }}>
            {roleTitle}
          </div>
        )}
      </div>
    </div>
  );
};
