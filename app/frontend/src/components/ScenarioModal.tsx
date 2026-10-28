import React from 'react';
import { useGame } from '../context/GameContext';
import { AlertTriangle, X, ShieldAlert, Award, ArrowRight } from 'lucide-react';

export const ScenarioModal: React.FC = () => {
  const { activeScenario, closeModal, resolveScenarioChoice } = useGame();

  if (!activeScenario) return null;

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
        maxWidth: '540px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '2px solid var(--border-active)',
        background: 'var(--surface)'
      }}>
        {/* Header Photo Backdrop */}
        <div style={{
          height: '180px',
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
              onClick={closeModal}
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

          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--on-surface-subtle)' }}>
            Choose Tactical Response (§6.20 Dealer Decision):
          </div>

          {/* Choices List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activeScenario.choices.map(choice => (
              <div 
                key={choice.id}
                onClick={() => resolveScenarioChoice(choice.id)}
                className="tactile-card"
                style={{
                  padding: '12px',
                  cursor: 'pointer',
                  background: 'var(--surface-low)',
                  transition: 'all 0.15s ease'
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
        </div>
      </div>
    </div>
  );
};
