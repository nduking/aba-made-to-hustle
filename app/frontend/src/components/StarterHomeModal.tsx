import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Home, Moon, Sun, ShieldCheck, BatteryCharging, AlertCircle, X, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const StarterHomeModal: React.FC = () => {
  const { activeModal, closeModal, player, cityTime, sleepAndAdvanceDay } = useGame();
  const [sleepReport, setSleepReport] = useState<{ dayNumber: number; eventsTriggered: string[] } | null>(null);
  const [isSleeping, setIsSleeping] = useState(false);

  if (activeModal !== 'home') return null;

  const getOriginAddress = () => {
    switch (player.origin) {
      case 'ugwa':
        return {
          title: 'Ugwa Road Artisan Compound',
          district: 'Aba South • Shoemaker Quarters',
          desc: 'Shared compound flat near the Kano leather tanneries route. Rent is low and workshop noise starts at 5:30 AM.'
        };
      case 'gra':
        return {
          title: 'GRA Residential Apartment',
          district: 'Aba Government Reserved Area',
          desc: 'Quiet residential quarter with perimeter wall and steady inverter power. Farther from Ariaria but peaceful.'
        };
      case 'faulks':
      default:
        return {
          title: 'No. 18 Faulks Road Workshop Tenement',
          district: 'Aba Central • Faulks Corridor',
          desc: 'Second-floor room right above the cobbler stalls. Generators hum in the alley, but Ariaria gate is 3 minutes away on foot.'
        };
    }
  };

  const address = getOriginAddress();

  const handleSleep = () => {
    setIsSleeping(true);
    setTimeout(() => {
      const result = sleepAndAdvanceDay();
      setSleepReport(result);
      setIsSleeping(false);
    }, 800);
  };

  const handleWakeUp = () => {
    setSleepReport(null);
    closeModal();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 110,
      padding: '16px'
    }}>
      <div className="tactile-card-raised" style={{
        width: '100%',
        maxWidth: '520px',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '2px solid var(--border)',
        background: 'var(--surface)'
      }}>
        {/* Header Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #1c1917, #0c0a09)',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              background: 'rgba(245, 158, 11, 0.15)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '8px',
              padding: '8px',
              color: 'var(--primary)'
            }}>
              <Home size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '15px', color: '#fff', fontWeight: 700 }}>STARTER HOME (F03)</h3>
                <span className="badge-sku">{player.origin.toUpperCase()} ORIGIN</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--on-surface-subtle)' }}>
                {address.district}
              </div>
            </div>
          </div>

          <button
            onClick={closeModal}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--on-surface-muted)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px' }}>
          {sleepReport ? (
            /* Morning Awakening Briefing Screen */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(16, 185, 129, 0.15))',
                border: '1px solid var(--primary)',
                borderRadius: '10px',
                padding: '16px',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.2)',
                  color: 'var(--primary)',
                  marginBottom: '10px'
                }}>
                  <Sun size={26} />
                </div>
                <h2 style={{ fontSize: '18px', color: '#fff', marginBottom: '4px' }}>
                  Good Morning, Aba! • Day {sleepReport.dayNumber}
                </h2>
                <div className="font-mono" style={{ fontSize: '12px', color: 'var(--primary)' }}>
                  Clock Reset to 06:00 AM • Morning Bell at Ariaria
                </div>
              </div>

              {/* Overnight Digest */}
              <div style={{
                background: 'var(--surface-low)',
                borderRadius: '8px',
                padding: '14px',
                border: '1px solid var(--border)'
              }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--on-surface-subtle)', fontWeight: 700, marginBottom: '8px' }}>
                  Overnight Status Update:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {sleepReport.eventsTriggered.map((ev, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--on-surface)' }}>
                      <CheckCircle2 size={15} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                      <span>{ev}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--on-surface-muted)' }}>
                    <BatteryCharging size={15} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span>Energy boosted to <strong>{player.energy}%</strong> • Physical vitality renewed</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--on-surface-muted)' }}>
                    <ShieldCheck size={15} style={{ color: 'var(--secondary)', flexShrink: 0 }} />
                    <span>Game state persisted locally to Citizen ID <strong>{player.publicId}</strong></span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleWakeUp}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>Step Out onto the Street</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            /* Home Quarters & Sleep Actions */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Residence Details */}
              <div style={{
                background: 'var(--surface-low)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '14px'
              }}>
                <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--on-surface)', marginBottom: '4px' }}>
                  {address.title}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--on-surface-muted)', lineHeight: 1.4 }}>
                  {address.desc}
                </div>
              </div>

              {/* Status Telemetry */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px'
              }}>
                <div style={{
                  background: 'var(--surface-low)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '12px'
                }}>
                  <div style={{ fontSize: '10px', color: 'var(--on-surface-subtle)', textTransform: 'uppercase' }}>
                    Current Time
                  </div>
                  <div className="font-mono" style={{ fontSize: '14px', fontWeight: 700, color: 'var(--primary)', marginTop: '2px' }}>
                    Day {cityTime.dayNumber} • {String(cityTime.hour).padStart(2, '0')}:{String(cityTime.minute).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)' }}>
                    {cityTime.period}
                  </div>
                </div>

                <div style={{
                  background: 'var(--surface-low)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '12px'
                }}>
                  <div style={{ fontSize: '10px', color: 'var(--on-surface-subtle)', textTransform: 'uppercase' }}>
                    Player Energy
                  </div>
                  <div className="font-mono" style={{ fontSize: '14px', fontWeight: 700, color: player.energy < 30 ? 'var(--error)' : 'var(--secondary)', marginTop: '2px' }}>
                    {player.energy} / 100%
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)' }}>
                    {player.energy < 30 ? 'Exhausted — Sleep needed' : 'Operational'}
                  </div>
                </div>
              </div>

              {/* Sleep Benefits Card */}
              <div style={{
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '11px',
                color: 'var(--on-surface-muted)',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}>
                <div style={{ fontWeight: 700, color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Moon size={14} />
                  <span>Sleeping Overnight (F03 Specifications):</span>
                </div>
                <div>• Advances world clock to Day {cityTime.dayNumber + 1}, 06:00 AM</div>
                <div>• Replenishes <strong>+50% Energy</strong> and restores vitality</div>
                <div>• Credits new <strong>Consumer Living Stipend</strong> (+$50,000)</div>
                <div>• Fully saves and syncs player state to local citizen ledger</div>
              </div>

              {/* Sleep Action Button */}
              <button
                onClick={handleSleep}
                disabled={isSleeping}
                className="btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)'
                }}
              >
                {isSleeping ? (
                  <span>Resting overnight in Aba...</span>
                ) : (
                  <>
                    <Moon size={16} />
                    <span>Sleep & Advance to Next Morning</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
