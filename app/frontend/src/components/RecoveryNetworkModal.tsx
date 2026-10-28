import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { Cross, X, HeartPulse, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

export const RecoveryNetworkModal: React.FC = () => {
  const { activeModal, closeModal, player, seekMedicalCare } = useGame();
  const [selectedFacility, setSelectedFacility] = useState<'pharmacy' | 'clinic' | 'hospital'>('clinic');

  if (activeModal !== 'clinic') return null;

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
        maxWidth: '500px',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '2px solid var(--border-active)',
        background: 'var(--surface)'
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--surface-high)',
          padding: '14px 18px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span className="badge-sku">RECOVERY NETWORK (§6.16)</span>
            <h2 style={{ fontSize: '17px', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <HeartPulse size={18} style={{ color: '#ef4444' }} />
              <span>Faulks Community Health Center</span>
            </h2>
          </div>
          <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--on-surface-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface-low)', padding: '10px', borderRadius: '4px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--on-surface-subtle)' }}>Patient Vitality</div>
              <div className="font-mono" style={{ fontWeight: 700, fontSize: '14px', color: player.health > 70 ? 'var(--secondary)' : 'var(--error)' }}>
                {player.health}% Health • {player.energy}% Energy
              </div>
            </div>
            <span className="badge-status-green">NO PERMADEATH GUARANTEE</span>
          </div>

          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--on-surface-muted)' }}>
            Choose Treatment Facility Tier
          </div>

          {/* Tier 1: Pharmacy */}
          <div 
            onClick={() => setSelectedFacility('pharmacy')}
            className="tactile-card"
            style={{
              padding: '10px 14px',
              cursor: 'pointer',
              borderColor: selectedFacility === 'pharmacy' ? 'var(--primary)' : 'var(--border)',
              background: selectedFacility === 'pharmacy' ? 'var(--surface-high)' : 'var(--surface-low)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '13px' }}>Community Pharmacy Fast-Lane</div>
              <span className="font-mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>$3,000</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)', marginTop: '2px' }}>
              Instant energy tonic & paracetamol. Resolves minor exhaustion.
            </div>
          </div>

          {/* Tier 2: Clinic Ward */}
          <div 
            onClick={() => setSelectedFacility('clinic')}
            className="tactile-card"
            style={{
              padding: '10px 14px',
              cursor: 'pointer',
              borderColor: selectedFacility === 'clinic' ? 'var(--secondary)' : 'var(--border)',
              background: selectedFacility === 'clinic' ? 'var(--surface-high)' : 'var(--surface-low)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '13px' }}>General Triage Ward & IV Drip</div>
              <span className="font-mono" style={{ color: 'var(--secondary)', fontWeight: 700 }}>$12,000</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)', marginTop: '2px' }}>
              Full vital recovery, restores health and fatigue to 100%. (Queue: ~1 min).
            </div>
          </div>

          {/* Tier 3: Subsidised / Indigent Care ($0) */}
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px dashed var(--secondary)', padding: '10px', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '12px', color: 'var(--secondary)' }}>
                Cooperative Union Subsidised Care Voucher
              </span>
              <span className="badge-sku">$0 UPFRONT</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)', marginTop: '4px' }}>
              For traders and citizens with low cash. Treatment is provided immediately; fee is repaid interest-free from future wages (§6.16).
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
            <button
              onClick={() => seekMedicalCare('moderate', 'Faulks Community Health Center', selectedFacility === 'pharmacy' ? 3000 : 12000, false)}
              className="btn-primary"
              style={{ padding: '10px' }}
            >
              Pay ${selectedFacility === 'pharmacy' ? '3,000' : '12,000'} & Discharge
            </button>

            <button
              onClick={() => seekMedicalCare('moderate', 'Faulks Community Health Center', 0, true)}
              className="btn-secondary"
              style={{ padding: '10px' }}
            >
              Apply Subsidised Care ($0)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
