import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Origin, PlayerTrack } from '../types';
import { ShieldCheck, Award, ArrowRight, User, MapPin, Briefcase } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { activeModal, closeModal, completeOnboarding } = useGame();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [name, setName] = useState('Chukwudi Nwosu');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [ageBand, setAgeBand] = useState<'18-24' | '25-34' | '35+'>('25-34');
  const [origin, setOrigin] = useState<Origin>('faulks');
  const [track, setTrack] = useState<PlayerTrack>('dealer');

  if (activeModal !== 'onboarding') return null;

  const handleFinish = () => {
    completeOnboarding({
      name,
      gender,
      ageBand,
      origin,
      track
    });
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 110,
      padding: '16px'
    }}>
      <div className="tactile-card-raised" style={{
        width: '100%',
        maxWidth: '520px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '2px solid var(--border-active)',
        background: 'var(--surface)'
      }}>
        {/* Modal Header */}
        <div style={{
          background: 'var(--surface-high)',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span className="badge-sku">ENYIMBA COMMERCIAL REGISTRY (§6.18, §6.19)</span>
            <h2 style={{ fontSize: '18px', marginTop: '4px' }}>Citizen Onboarding & Starting Capital</h2>
          </div>
          <span className="font-mono" style={{ fontSize: '12px', color: 'var(--primary)' }}>
            STEP {step} / 4
          </span>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '13px', color: 'var(--on-surface-muted)' }}>
                Welcome to Enyimba City. Register your verified persona to receive your non-enumerable Public ID and starting business package.
              </p>

              <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--on-surface-subtle)', fontWeight: 700 }}>
                  Full Citizen Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--surface-low)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    padding: '10px',
                    color: 'var(--on-surface)',
                    fontSize: '14px',
                    marginTop: '4px'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--on-surface-subtle)', fontWeight: 700 }}>
                    Gender Presentation
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'male' | 'female' | 'other')}
                    style={{
                      width: '100%',
                      background: 'var(--surface-low)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      padding: '10px',
                      color: 'var(--on-surface)',
                      fontSize: '13px',
                      marginTop: '4px'
                    }}
                  >
                    <option value="male">Male (Nna)</option>
                    <option value="female">Female (Ada)</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--on-surface-subtle)', fontWeight: 700 }}>
                    Age Category
                  </label>
                  <select
                    value={ageBand}
                    onChange={(e) => setAgeBand(e.target.value as '18-24' | '25-34' | '35+')}
                    style={{
                      width: '100%',
                      background: 'var(--surface-low)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      padding: '10px',
                      color: 'var(--on-surface)',
                      fontSize: '13px',
                      marginTop: '4px'
                    }}
                  >
                    <option value="18-24">18–24 (Young Hustler)</option>
                    <option value="25-34">25–34 (Experienced)</option>
                    <option value="35+">35+ (Master Merchant)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: ORIGIN DISTRICT */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '13px', color: 'var(--on-surface-muted)' }}>
                Your origin determines your starting network, initial contacts, and familiarity with wholesale corridors. Cash grant ($500,000) is identical for everyone.
              </p>

              <div 
                onClick={() => setOrigin('faulks')}
                className="tactile-card"
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  borderColor: origin === 'faulks' ? 'var(--primary)' : 'var(--border)',
                  background: origin === 'faulks' ? 'var(--surface-high)' : 'var(--surface-low)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>Faulks Road Corridor</div>
                  <span className="badge-sku">COMMERCE HUB</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)', marginTop: '4px' }}>
                  Heart of wholesale lockup stalls and transport routes. Connected to Driver Chidi and Stall #14B.
                </div>
              </div>

              <div 
                onClick={() => setOrigin('ugwa')}
                className="tactile-card"
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  borderColor: origin === 'ugwa' ? 'var(--primary)' : 'var(--border)',
                  background: origin === 'ugwa' ? 'var(--surface-high)' : 'var(--surface-low)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>Ugwa Road Workshop Strip</div>
                  <span className="badge-sku">ARTISAN CLUSTER</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)', marginTop: '4px' }}>
                  Artisan cobblers, leather cutters, and shoe last sculptors. Connected directly to Mazi Okonkwo.
                </div>
              </div>

              <div 
                onClick={() => setOrigin('gra')}
                className="tactile-card"
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  borderColor: origin === 'gra' ? 'var(--primary)' : 'var(--border)',
                  background: origin === 'gra' ? 'var(--surface-high)' : 'var(--surface-low)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '14px' }}>Government Reserved Area (GRA)</div>
                  <span className="badge-sku">RESIDENTIAL</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)', marginTop: '4px' }}>
                  Quiet avenues, civil servants, and retail boutique buyers. High spending power clients.
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TRACK SELECTION */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '13px', color: 'var(--on-surface-muted)' }}>
                Select your primary economic vocation (§6.19). Both tracks receive the $500,000 grant and can freely switch with a 7-day cooldown.
              </p>

              <div 
                onClick={() => setTrack('dealer')}
                className="tactile-card"
                style={{
                  padding: '14px',
                  cursor: 'pointer',
                  borderColor: track === 'dealer' ? 'var(--primary)' : 'var(--border)',
                  background: track === 'dealer' ? 'var(--surface-high)' : 'var(--surface-low)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--primary)' }}>Dealer / Seller Track</div>
                  <span className="badge-status-gold">COMMERCE & EMPIRE</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--on-surface-muted)', marginTop: '6px' }}>
                  • Unlocks Business Planner app & Wholesale factory accounts.<br/>
                  • Manage Stall #14B, negotiate wholesale volume tiers, sell to retail consumers.<br/>
                  • Income: Commercial business profits & trade margins.
                </div>
              </div>

              <div 
                onClick={() => setTrack('consumer')}
                className="tactile-card"
                style={{
                  padding: '14px',
                  cursor: 'pointer',
                  borderColor: track === 'consumer' ? 'var(--secondary)' : 'var(--border)',
                  background: track === 'consumer' ? 'var(--surface-high)' : 'var(--surface-low)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: '15px', color: 'var(--secondary)' }}>Consumer / Citizen Track</div>
                  <span className="badge-status-green">LIFESTYLE & CAREER</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--on-surface-muted)', marginTop: '6px' }}>
                  • Unlocks Civilian Stipend Terminal ($50,000 / Period, per D16).<br/>
                  • Work apprenticeships, review artisan products, pursue vehicles & lifestyle.<br/>
                  • Income: Periodic Stipend + employment wages.
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: GRANT CELEBRATION */}
          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉</div>
              <h3 style={{ fontSize: '20px', color: 'var(--primary)', marginBottom: '6px' }}>
                Registration Verified!
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--on-surface-muted)', marginBottom: '16px' }}>
                Your account is credited with the closed-loop starting grant in compliance with §6.19 anti-farming policies.
              </p>

              <div className="tactile-card" style={{ padding: '16px', background: 'var(--surface-low)', marginBottom: '16px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--on-surface-subtle)' }}>Starting Capital Grant:</span>
                  <span className="font-mono" style={{ fontWeight: 700, color: 'var(--secondary)' }}>$500,000.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--on-surface-subtle)' }}>Assigned Public ID:</span>
                  <span className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>ABA-7K4M2-QX9D3</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: 'var(--on-surface-subtle)' }}>Designated Track:</span>
                  <span style={{ fontWeight: 700, textTransform: 'capitalize' }}>{track}</span>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="btn-emerald"
                style={{ width: '100%', padding: '12px', fontSize: '14px' }}
              >
                Enter Enyimba City (Start Hustle)
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {step < 4 && (
          <div style={{
            padding: '12px 20px',
            background: 'var(--surface-high)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {step > 1 ? (
              <button 
                onClick={() => setStep((step - 1) as 1 | 2 | 3)}
                className="btn-secondary"
                style={{ fontSize: '12px', padding: '6px 14px' }}
              >
                Back
              </button>
            ) : <div />}

            <button 
              onClick={() => setStep((step + 1) as 2 | 3 | 4)}
              className="btn-primary"
              style={{ fontSize: '12px', padding: '8px 16px' }}
            >
              <span>Continue</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
