import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { AlertTriangle, X, ShieldAlert, Award, ArrowRight, CheckCircle2, TrendingUp, RotateCcw, Coins } from 'lucide-react';
import { ScenarioChoice } from '../types';

export const ScenarioModal: React.FC = () => {
  const { activeScenario, closeModal, resolveScenarioChoice, player } = useGame();
  const [selectedChoice, setSelectedChoice] = useState<ScenarioChoice | null>(null);
  const [isResolved, setIsResolved] = useState(false);

  if (!activeScenario) return null;

  const handleClose = () => {
    setSelectedChoice(null);
    setIsResolved(false);
    closeModal();
  };

  const handleConfirmChoice = (choice: ScenarioChoice) => {
    setIsResolved(true);
    setTimeout(() => {
      resolveScenarioChoice(choice.id);
      setSelectedChoice(null);
      setIsResolved(false);
    }, 1200);
  };

  const getOutcomeDebrief = (choice: ScenarioChoice) => {
    if (choice.consequenceText) {
      return choice.consequenceText;
    }
    if (choice.survivalRate >= 90) {
      return 'Prudent tactical execution. By hedging logistics and cooperating with the trade union, your operational risk is minimal and customer trust is preserved.';
    } else if (choice.survivalRate >= 75) {
      return 'Calculated commercial risk. You absorbed moderate friction to maximize speed and market turnover before competitors saturated Ariaria.';
    } else {
      return 'High-stakes hustle. Tight margin for error with rain or checkpoint delays, but high immediate payout if execution holds.';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.88)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 120,
      padding: '16px'
    }}>
      <div className="tactile-card-raised" style={{
        width: '100%',
        maxWidth: '560px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '2px solid var(--border-active)',
        background: 'var(--surface)'
      }}>
        {/* Header Photo Backdrop */}
        <div style={{
          height: '170px',
          backgroundImage: `linear-gradient(to bottom, rgba(18,19,22,0.2), rgba(18,19,22,0.95)), url(${activeScenario.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span className="badge-status-rust" style={{ background: 'rgba(0,0,0,0.85)' }}>
              {activeScenario.district}
            </span>
            <button 
              onClick={handleClose}
              style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid var(--border)', borderRadius: '4px', padding: '4px', color: '#fff', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>

          <div>
            <div className="font-mono" style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 700 }}>
              {activeScenario.timeString}
            </div>
            <h2 style={{ fontSize: '18px', color: '#fff', marginTop: '2px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              {activeScenario.title}
            </h2>
          </div>
        </div>

        {/* Narrative & Dilemma Description */}
        <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ fontSize: '13px', lineHeight: 1.5, color: 'var(--on-surface-muted)', background: 'var(--surface-low)', padding: '12px', borderRadius: '4px', borderLeft: '3px solid var(--tertiary)' }}>
            {activeScenario.narrative}
          </div>

          {!selectedChoice ? (
            <>
              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--on-surface-subtle)' }}>
                Choose Tactical Response (§6.20 Dealer Decision):
              </div>

              {/* Choices List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeScenario.choices.map(choice => (
                  <div 
                    key={choice.id}
                    onClick={() => setSelectedChoice(choice)}
                    className="tactile-card"
                    style={{
                      padding: '12px',
                      cursor: 'pointer',
                      background: 'var(--surface-low)',
                      transition: 'all 0.15s ease',
                      border: '1px solid var(--border)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--on-surface)' }}>{choice.label}</div>
                      <span className="font-mono" style={{ fontSize: '11px', fontWeight: 700, color: choice.cost > 0 ? 'var(--error)' : 'var(--secondary)' }}>
                        {choice.cost > 0 ? `-$${choice.cost.toLocaleString()}` : 'FREE'}
                      </span>
                    </div>

                    <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)', margin: '4px 0 8px' }}>
                      {choice.description}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', fontSize: '10px', color: 'var(--on-surface-subtle)' }}>
                      <span>Survival Rate: <strong style={{ color: choice.survivalRate > 80 ? 'var(--secondary)' : 'var(--error)' }}>{choice.survivalRate}%</strong></span>
                      <span>•</span>
                      <span>Reputation: <strong>{choice.reputationDelta >= 0 ? `+${choice.reputationDelta}` : choice.reputationDelta}</strong></span>
                      <span>•</span>
                      <span>Reward: <strong style={{ color: '#fbbf24' }}>+{choice.coinsReward} HC</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Selected Choice Tactical Debrief Screen (F22) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                background: 'var(--surface-low)',
                border: '1px solid var(--border-active)',
                borderRadius: '8px',
                padding: '14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="badge-sku">TACTICAL STRATEGY SELECTED</span>
                  <button 
                    onClick={() => setSelectedChoice(null)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--on-surface-muted)', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <RotateCcw size={12} />
                    <span>Change Option</span>
                  </button>
                </div>
                
                <h4 style={{ fontSize: '15px', color: '#fff', marginBottom: '6px' }}>
                  {selectedChoice.label}
                </h4>
                <p style={{ fontSize: '12px', color: 'var(--on-surface-muted)', marginBottom: '12px' }}>
                  {selectedChoice.description}
                </p>

                {/* Outcome Analysis */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '6px',
                  padding: '10px',
                  borderLeft: `3px solid ${selectedChoice.survivalRate >= 80 ? 'var(--secondary)' : 'var(--tertiary)'}`,
                  fontSize: '11px',
                  lineHeight: 1.4,
                  color: 'var(--on-surface-muted)'
                }}>
                  <strong style={{ color: '#fff' }}>Post-Mortem Forecast: </strong>
                  {getOutcomeDebrief(selectedChoice)}
                </div>
              </div>

              {/* Consequence Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div style={{ background: 'var(--surface-low)', padding: '10px', borderRadius: '6px', textAlign: 'center', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--on-surface-subtle)', textTransform: 'uppercase' }}>Cash Outlay</div>
                  <div className="font-mono" style={{ fontSize: '14px', fontWeight: 700, color: selectedChoice.cost > 0 ? 'var(--error)' : 'var(--secondary)' }}>
                    {selectedChoice.cost > 0 ? `-$${selectedChoice.cost.toLocaleString()}` : '$0'}
                  </div>
                </div>

                <div style={{ background: 'var(--surface-low)', padding: '10px', borderRadius: '6px', textAlign: 'center', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--on-surface-subtle)', textTransform: 'uppercase' }}>Guild Respect</div>
                  <div className="font-mono" style={{ fontSize: '14px', fontWeight: 700, color: selectedChoice.reputationDelta >= 0 ? 'var(--secondary)' : 'var(--error)' }}>
                    {selectedChoice.reputationDelta >= 0 ? `+${selectedChoice.reputationDelta}` : selectedChoice.reputationDelta}
                  </div>
                </div>

                <div style={{ background: 'var(--surface-low)', padding: '10px', borderRadius: '6px', textAlign: 'center', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--on-surface-subtle)', textTransform: 'uppercase' }}>Hustle Coins</div>
                  <div className="font-mono" style={{ fontSize: '14px', fontWeight: 700, color: '#fbbf24' }}>
                    +{selectedChoice.coinsReward} HC
                  </div>
                </div>
              </div>

              {/* Confirmation / Execution Button */}
              {isResolved ? (
                <div style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid var(--secondary)',
                  borderRadius: '8px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  color: 'var(--secondary)',
                  fontSize: '13px',
                  fontWeight: 700
                }}>
                  <CheckCircle2 size={16} />
                  <span>Strategy Executed • Changes Applied to Ledger</span>
                </div>
              ) : (
                <button
                  onClick={() => handleConfirmChoice(selectedChoice)}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '12px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>Confirm & Execute Tactical Response</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
