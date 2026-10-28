import React from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { CityHUD } from './components/CityHUD';
import { PhoneOverlay } from './components/PhoneOverlay';
import { OnboardingModal } from './components/OnboardingModal';
import { RecoveryNetworkModal } from './components/RecoveryNetworkModal';
import { WholesaleMarketModal } from './components/WholesaleMarketModal';
import { ScenarioModal } from './components/ScenarioModal';
import { UserPlus, Sparkles, Smartphone } from 'lucide-react';

const GameShell: React.FC = () => {
  const { openModal, togglePhone } = useGame();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--surface)' }}>
      {/* Top Banner Navigation */}
      <nav style={{
        background: '#0d0e11',
        borderBottom: '1px solid var(--border)',
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ 
            background: 'var(--primary)', 
            color: '#121316', 
            fontFamily: 'var(--font-headline)', 
            fontWeight: 800, 
            fontSize: '12px', 
            padding: '4px 8px', 
            borderRadius: 'var(--radius-xs)',
            letterSpacing: '0.08em'
          }}>
            ABA
          </div>
          <div>
            <span className="font-headline" style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '0.02em' }}>
              MADE TO HUSTLE
            </span>
            <span style={{ fontSize: '10px', color: 'var(--on-surface-subtle)', marginLeft: '6px' }}>
              v0.3 Mobile Prototype
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => openModal('onboarding')}
            className="btn-secondary"
            style={{ padding: '6px 12px', fontSize: '11px', gap: '5px' }}
          >
            <UserPlus size={13} />
            <span>New Citizen ID</span>
          </button>
        </div>
      </nav>

      {/* Main Street Simulation Canvas */}
      <main style={{ flex: 1, paddingBottom: '70px' }}>
        <CityHUD />
      </main>

      {/* Interactive Overlays */}
      <PhoneOverlay />
      <OnboardingModal />
      <RecoveryNetworkModal />
      <WholesaleMarketModal />
      <ScenarioModal />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameShell />
    </GameProvider>
  );
}
