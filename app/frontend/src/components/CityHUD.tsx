import React from 'react';
import { useGame } from '../context/GameContext';
import { 
  Smartphone, 
  Coins, 
  Wallet, 
  Landmark, 
  Star, 
  CloudRain, 
  Sun, 
  Hammer, 
  ShoppingBag, 
  Cross, 
  Utensils, 
  AlertTriangle,
  MapPin,
  TrendingUp,
  UserCheck
} from 'lucide-react';
import { SCENARIO_EVENTS } from '../data/mockData';
import { AnimatedStreetScene } from './AnimatedStreetScene';

export const CityHUD: React.FC = () => {
  const { 
    player, 
    cityTime, 
    togglePhone, 
    toggleWeather, 
    openModal, 
    openScenario,
    completeApprenticeTask,
    eatStreetFood,
    collectHustleCoin
  } = useGame();

  const formatMoney = (val: number) => `$${val.toLocaleString()}`;

  return (
    <div className="city-hud-container" style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '12px' }}>
      {/* Top Telemetry Deck */}
      <header className="tactile-card" style={{ padding: '12px 16px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {/* Identity & Origin */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: 'var(--radius-sm)', 
              background: 'var(--surface-high)', 
              border: '1px solid var(--border-active)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              {player.gender === 'female' ? '👩🏾' : '👨🏾'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '15px' }}>{player.name}</span>
                <span className="badge-sku">{player.track === 'dealer' ? 'DEALER / SELLER' : 'CONSUMER / CITIZEN'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--on-surface-muted)' }}>
                <span className="font-mono">{player.publicId}</span>
                <span>•</span>
                <span style={{ textTransform: 'capitalize' }}>{player.origin} District</span>
              </div>
            </div>
          </div>

          {/* Clock & Weather Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              background: 'var(--surface-low)', 
              border: '1px solid var(--border)', 
              padding: '6px 12px', 
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span className="font-mono" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '13px' }}>
                {String(cityTime.hour).padStart(2, '0')}:{String(cityTime.minute).padStart(2, '0')}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--on-surface-muted)', fontWeight: 600 }}>
                DAY {cityTime.dayNumber} • {cityTime.period}
              </span>
            </div>

            <button 
              onClick={toggleWeather}
              title="Toggle City Weather"
              style={{ 
                background: cityTime.isRaining ? 'rgba(59, 130, 246, 0.2)' : 'var(--surface-high)', 
                border: cityTime.isRaining ? '1px solid #3b82f6' : '1px solid var(--border)', 
                borderRadius: 'var(--radius-sm)',
                padding: '6px 10px',
                cursor: 'pointer',
                color: cityTime.isRaining ? '#60a5fa' : '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '12px'
              }}
            >
              {cityTime.isRaining ? <CloudRain size={16} /> : <Sun size={16} />}
              <span className="font-mono" style={{ fontSize: '11px' }}>{cityTime.isRaining ? 'RAIN' : 'CLEAR'}</span>
            </button>
          </div>
        </div>

        {/* Financial Telemetry Bar */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
          gap: '8px', 
          background: 'var(--surface-low)', 
          padding: '8px 12px', 
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)'
        }}>
          {/* Cash */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wallet size={16} style={{ color: 'var(--primary)' }} />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--on-surface-subtle)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Cash In Pocket</div>
              <div className="font-mono" style={{ fontWeight: 700, fontSize: '14px', color: 'var(--on-surface)' }}>{formatMoney(player.cash)}</div>
            </div>
          </div>

          {/* Bank */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Landmark size={16} style={{ color: 'var(--secondary)' }} />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--on-surface-subtle)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Bank Deposit</div>
              <div className="font-mono" style={{ fontWeight: 700, fontSize: '14px', color: 'var(--secondary)' }}>{formatMoney(player.bank)}</div>
            </div>
          </div>

          {/* Hustle Coins */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Coins size={16} style={{ color: '#fbbf24' }} />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--on-surface-subtle)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Hustle Coins</div>
              <div className="font-mono" style={{ fontWeight: 700, fontSize: '14px', color: '#fbbf24' }}>{player.hustleCoins} HC</div>
            </div>
          </div>

          {/* Guild Respect */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Star size={16} style={{ color: 'var(--primary)' }} />
            <div>
              <div style={{ fontSize: '10px', color: 'var(--on-surface-subtle)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Guild Respect</div>
              <div className="font-mono" style={{ fontWeight: 700, fontSize: '14px', color: 'var(--on-surface)' }}>{player.guildRespect} / 5.0</div>
            </div>
          </div>
        </div>

        {/* Vitality & Needs Gauges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', fontSize: '11px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--on-surface-muted)' }}>Energy:</span>
            <div style={{ width: '60px', height: '6px', background: 'var(--surface-high)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${player.energy}%`, height: '100%', background: player.energy > 30 ? 'var(--primary)' : 'var(--error)' }} />
            </div>
            <span className="font-mono">{player.energy}%</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--on-surface-muted)' }}>Hunger:</span>
            <div style={{ width: '60px', height: '6px', background: 'var(--surface-high)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${player.hunger}%`, height: '100%', background: player.hunger > 70 ? 'var(--error)' : 'var(--secondary)' }} />
            </div>
            <span className="font-mono">{player.hunger}%</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--on-surface-muted)' }}>Health:</span>
            <div style={{ width: '60px', height: '6px', background: 'var(--surface-high)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${player.health}%`, height: '100%', background: 'var(--secondary)' }} />
            </div>
            <span className="font-mono">{player.health}%</span>
          </div>
        </div>
      </header>

      {/* Living Animated Street Scene & 3-Step Hustle Dock */}
      <AnimatedStreetScene />

      {/* Quick District Outposts & Clinic Access */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', marginBottom: '14px' }}>
        <button 
          onClick={() => openModal('wholesale')}
          className="btn-secondary"
          style={{ padding: '10px 14px', justifyContent: 'flex-start', textAlign: 'left', background: 'var(--surface-high)' }}
        >
          <ShoppingBag size={16} style={{ color: 'var(--secondary)' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '12px' }}>Ariaria Wholesale Market (F21)</div>
            <div style={{ fontSize: '10px', color: 'var(--on-surface-muted)' }}>Factory crates & supplier credits</div>
          </div>
        </button>

        <button 
          onClick={() => openModal('clinic')}
          className="btn-secondary"
          style={{ padding: '10px 14px', justifyContent: 'flex-start', textAlign: 'left', background: 'var(--surface-high)' }}
        >
          <Cross size={16} style={{ color: '#ef4444' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '12px' }}>Faulks Community Clinic (F16)</div>
            <div style={{ fontSize: '10px', color: 'var(--on-surface-muted)' }}>Emergency triage & health recharge</div>
          </div>
        </button>

        <button 
          onClick={() => collectHustleCoin('Street Tip Glint at Faulks Corner', 15)}
          className="btn-secondary"
          style={{ padding: '10px 14px', justifyContent: 'flex-start', textAlign: 'left', background: 'var(--surface-high)' }}
        >
          <Coins size={16} style={{ color: '#fbbf24' }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '12px' }}>Faulks Road Glint</div>
            <div style={{ fontSize: '10px', color: 'var(--on-surface-muted)' }}>+15 HC Street Coin Find</div>
          </div>
        </button>
      </div>

      {/* Scenarios & Operational Dilemmas Grid */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '15px', color: 'var(--on-surface-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} style={{ color: 'var(--tertiary)' }} />
            <span>Active Operational Dilemmas & Planning Scenarios (§6.20)</span>
          </h3>
          <span className="badge-sku">LIVE SIMULATION</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
          {SCENARIO_EVENTS.map(scen => (
            <div key={scen.id} className="tactile-card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <span className="badge-status-rust">{scen.district}</span>
                  <span className="font-mono" style={{ fontSize: '10px', color: 'var(--on-surface-subtle)' }}>{scen.timeString}</span>
                </div>
                <h4 style={{ fontSize: '14px', marginBottom: '6px' }}>{scen.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--on-surface-muted)', marginBottom: '12px', lineClamp: 2 }}>{scen.narrative}</p>
              </div>

              <button 
                onClick={() => openScenario(scen)}
                className="btn-primary" 
                style={{ width: '100%', fontSize: '12px', padding: '8px' }}
              >
                Respond to Incident
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Tactical Burner Phone Drawer Trigger */}
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px', 
        zIndex: 90 
      }}>
        <button 
          onClick={togglePhone}
          className="btn-primary"
          style={{ 
            borderRadius: 'var(--radius-full)', 
            padding: '14px 22px', 
            boxShadow: '0 8px 24px rgba(245, 158, 11, 0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Smartphone size={20} />
          <span style={{ fontSize: '14px' }}>BURNER PHONE (F04)</span>
          <span style={{ 
            background: '#121316', 
            color: 'var(--primary)', 
            fontSize: '11px', 
            fontWeight: 800, 
            borderRadius: '10px', 
            padding: '2px 7px' 
          }}>
            1
          </span>
        </button>
      </div>
    </div>
  );
};
