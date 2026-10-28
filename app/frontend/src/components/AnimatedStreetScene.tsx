import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { AnimatedCharacter } from './characters/AnimatedCharacter';
import { AnimatedCobbler } from './characters/AnimatedCobbler';
import { AnimatedKeke } from './characters/AnimatedKeke';
import { AnimatedVendor } from './characters/AnimatedVendor';
import { 
  Hammer, 
  ShoppingBag, 
  Coins, 
  TrendingUp, 
  Sparkles, 
  AlertCircle,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { sound } from '../utils/AudioService';

export const AnimatedStreetScene: React.FC = () => {
  const { 
    player, 
    cityTime, 
    openModal, 
    completeApprenticeTask, 
    sellStallItem,
    eatStreetFood,
    collectHustleCoin
  } = useGame();

  const [isPlayerCrafting, setIsPlayerCrafting] = useState(false);
  const [customerPhrase, setCustomerPhrase] = useState("I need 1 pair of burnished loafers! ($24,000)");
  const [customerPresent, setCustomerPresent] = useState(true);
  const [floatingEffect, setFloatingEffect] = useState<{ text: string; x: number; y: number } | null>(null);

  // Periodically cycle customer arrivals
  useEffect(() => {
    const customerTimer = setInterval(() => {
      const phrases = [
        "Bros, sell me those crepe rubber slides! ($13,500)",
        "I need 1 pair of burnished loafers for wedding! ($24,000)",
        "O boy, give me size 42 Italian cut!",
        "Your Made in Aba shoes are genuine leather! ($24,000)"
      ];
      setCustomerPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
      setCustomerPresent(true);
    }, 12000);

    return () => clearInterval(customerTimer);
  }, []);

  // Quick Craft Action with Character Animation
  const handleQuickCraft = () => {
    setIsPlayerCrafting(true);
    sound.click();
    
    // Simulate rapid hammer strike sound
    setTimeout(() => sound.cash(), 600);

    setTimeout(() => {
      completeApprenticeTask("Artisan Leather Finishing", 5500, 25);
      setIsPlayerCrafting(false);
      triggerFloatingText("+$5,500 Cash! +25 XP", 220, 100);
    }, 900);
  };

  // Quick Sell to Walking Customer
  const handleSellToCustomer = () => {
    if (player.inventory.length === 0) {
      triggerFloatingText("No stock in stall! Restock first.", 520, 80);
      sound.warning();
      return;
    }
    const item = player.inventory[0];
    sellStallItem(item.sku, 1);
    sound.cash();
    triggerFloatingText(`+$${item.retailPrice.toLocaleString()} SOLD!`, 520, 80);
    setCustomerPresent(false);
    setTimeout(() => setCustomerPresent(true), 4000);
  };

  const handleEatFood = () => {
    eatStreetFood(2500, 35);
    sound.notify();
    triggerFloatingText("+35 Energy! (Jollof)", 750, 100);
  };

  const triggerFloatingText = (text: string, x: number, y: number) => {
    setFloatingEffect({ text, x, y });
    setTimeout(() => setFloatingEffect(null), 1800);
  };

  // Day / Night / Weather Background Gradient
  const getSkyGradient = () => {
    if (cityTime.isRaining) {
      return 'linear-gradient(to bottom, #1e293b, #0f172a 70%, #1e1b18 100%)';
    }
    switch (cityTime.period) {
      case 'MORNING':
        return 'linear-gradient(to bottom, #38bdf8 0%, #fef08a 60%, #fdba74 100%)';
      case 'AFTERNOON':
        return 'linear-gradient(to bottom, #0284c7 0%, #38bdf8 60%, #fed7aa 100%)';
      case 'EVENING':
        return 'linear-gradient(to bottom, #4338ca 0%, #c026d3 50%, #f97316 100%)';
      case 'NIGHT':
        return 'linear-gradient(to bottom, #020617 0%, #0f172a 70%, #18181b 100%)';
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '16px' }}>
      {/* Visual Street Theatre Box */}
      <div 
        className="tactile-card"
        style={{
          position: 'relative',
          height: '270px',
          overflow: 'hidden',
          borderRadius: 'var(--radius-md)',
          background: getSkyGradient(),
          border: '2px solid var(--border)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.6)'
        }}
      >
        {/* Rain Particle Overlay when cityTime.isRaining */}
        {cityTime.isRaining && <div className="rain-overlay" />}

        {/* Floating Money / Status Text */}
        {floatingEffect && (
          <div 
            style={{
              position: 'absolute',
              left: `${floatingEffect.x}px`,
              top: `${floatingEffect.y}px`,
              fontFamily: 'var(--font-headline)',
              fontWeight: 800,
              fontSize: '15px',
              color: '#10b981',
              textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 10px rgba(16,185,129,0.8)',
              animation: 'floatCoinUp 1.6s ease-out forwards',
              zIndex: 30,
              pointerEvents: 'none'
            }}
          >
            {floatingEffect.text}
          </div>
        )}

        {/* Distant Urban Silhouette: Rooftops, Telephone Wires & Billboards */}
        <div style={{ position: 'absolute', bottom: '80px', left: 0, right: 0, height: '60px', opacity: 0.35, pointerEvents: 'none' }}>
          <svg viewBox="0 0 1000 60" preserveAspectRatio="none" width="100%" height="60">
            <polygon points="0,60 30,25 70,25 90,40 160,15 220,15 250,50 340,20 400,20 440,60 520,30 580,30 630,60 740,10 820,10 880,55 960,25 1000,60" fill="#0f172a" />
            <line x1="0" y1="12" x2="1000" y2="18" stroke="#000" strokeWidth="0.8" opacity="0.6" />
            <line x1="0" y1="20" x2="1000" y2="28" stroke="#000" strokeWidth="0.6" opacity="0.4" />
          </svg>
        </div>

        {/* Street Banners */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '16px',
          background: 'rgba(18, 19, 22, 0.85)',
          backdropFilter: 'blur(4px)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 4
        }}>
          <span style={{ fontSize: '13px' }}>📍</span>
          <div>
            <div style={{ fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: '11px', color: '#fff', letterSpacing: '0.04em' }}>
              FAULKS ROAD • SECTOR 14
            </div>
            <div style={{ fontSize: '9px', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
              LIVE ARTISAN & WHOLESALE COMMERCE
            </div>
          </div>
        </div>

        {/* Street Ground Asphalt & Drainage Gutter */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '90px',
          background: 'linear-gradient(to bottom, #1e293b 0%, #0f172a 100%)',
          borderTop: '3px solid #334155'
        }}>
          {/* Concrete Veranda Curb & Yellow Road Lines */}
          <div style={{ height: '8px', background: '#475569', borderBottom: '1px solid #1e293b' }} />
          <div style={{ display: 'flex', gap: '40px', padding: '16px 20px', opacity: 0.4 }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} style={{ width: '60px', height: '4px', background: '#facc15' }} />
            ))}
          </div>
        </div>

        {/* ================= STAGE CHARACTERS ================= */}
        <div style={{
          position: 'absolute',
          bottom: '22px',
          left: '20px',
          right: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 8
        }}>
          {/* Character 1: Master Cobbler Mazi Okonkwo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AnimatedCobbler 
              name="Mazi Okonkwo"
              isHammering={true}
              speechText="Pound that sole tight, Emeka!"
              onClick={handleQuickCraft}
            />
          </div>

          {/* Character 2: YOUR PLAYER CHARACTER (Standing at Stall #14B) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px' }}>
            {/* Stall #14B Signboard */}
            <div style={{
              background: '#78350f',
              border: '2px solid #b45309',
              borderRadius: '3px',
              padding: '2px 8px',
              marginBottom: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.5)'
            }}>
              <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 800, fontSize: '10px', color: '#fef3c7', letterSpacing: '0.05em' }}>
                NWOSU STALL #14B
              </span>
            </div>

            <AnimatedCharacter
              name={player.name}
              roleTitle={player.track === 'dealer' ? "Merchant Boss" : "Citizen Shopper"}
              skinTone="#6f4320"
              outfitColor="#f59e0b"
              gender={player.gender}
              isWorking={isPlayerCrafting}
              speechText={isPlayerCrafting ? "🔨 Stitching Crepe Sole..." : "Stall open! Genuine Made in Aba!"}
              onClick={handleQuickCraft}
            />
          </div>

          {/* Character 3: Walking Customer Pedestrian */}
          {customerPresent && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <AnimatedCharacter
                name="Customer Ada"
                roleTitle="Civilian Buyer"
                skinTone="#5c3818"
                outfitColor="#3b82f6"
                gender="female"
                speechText={customerPhrase}
                onSpeechClick={handleSellToCustomer}
                onClick={handleSellToCustomer}
              />
            </div>
          )}

          {/* Character 4: Driver Chidi & Yellow Keke */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AnimatedKeke 
              driverName="Driver Chidi"
              speechText="Ariaria restock loaded! Tap to trade."
              onClick={() => openModal('wholesale')}
            />
          </div>

          {/* Character 5: Mama Chinyere at Cooking Pot */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AnimatedVendor 
              name="Mama Chinyere"
              speechText="Hot jollof & goat meat ready!"
              onClick={handleEatFood}
            />
          </div>
        </div>
      </div>

      {/* ================= SIMPLIFIED 3-STEP HUSTLE CONTROL DOCK ================= */}
      {/* This makes the game immediately understandable and fun for everyone! */}
      <div 
        className="tactile-card"
        style={{
          marginTop: '12px',
          padding: '12px 16px',
          background: 'var(--surface-high)',
          border: '1px solid var(--border-active)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '15px' }}>⚡</span>
            <span className="font-headline" style={{ fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Simple 3-Step Hustle Loop (How to Win in Aba)
            </span>
          </div>
          <span className="badge-status-green">TAP ANY ACTION TO PLAY</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px' }}>
          {/* STEP 1: CRAFT / WORK */}
          <div 
            onClick={handleQuickCraft}
            className="tactile-card"
            style={{
              padding: '12px',
              cursor: 'pointer',
              background: 'var(--surface-low)',
              border: '1px solid var(--primary)',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span className="badge-sku">STEP 1: WORK</span>
              <span className="font-mono" style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '12px' }}>+$5,500</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '8px', borderRadius: '4px', color: 'var(--primary)' }}>
                <Hammer size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>Hammer & Finish Shoe</div>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)' }}>Mazi Cobbler Bench • +25 XP</div>
              </div>
            </div>
          </div>

          {/* STEP 2: RESTOCK WHOLESALE */}
          <div 
            onClick={() => openModal('wholesale')}
            className="tactile-card"
            style={{
              padding: '12px',
              cursor: 'pointer',
              background: 'var(--surface-low)',
              border: '1px solid var(--secondary)',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span className="badge-sku" style={{ borderColor: 'var(--secondary)', color: 'var(--secondary)' }}>STEP 2: RESTOCK</span>
              <span style={{ fontSize: '11px', color: 'var(--on-surface-subtle)' }}>Driver Chidi</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '8px', borderRadius: '4px', color: 'var(--secondary)' }}>
                <Truck size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>Buy Ariaria Wholesale</div>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)' }}>Loafers, Slides & Brogues</div>
              </div>
            </div>
          </div>

          {/* STEP 3: SELL TO CUSTOMER */}
          <div 
            onClick={handleSellToCustomer}
            className="tactile-card"
            style={{
              padding: '12px',
              cursor: 'pointer',
              background: 'var(--surface-low)',
              border: '1px solid #3b82f6',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <span className="badge-sku" style={{ borderColor: '#3b82f6', color: '#60a5fa' }}>STEP 3: SELL</span>
              <span className="font-mono" style={{ color: 'var(--secondary)', fontWeight: 700, fontSize: '12px' }}>
                Stock: {player.inventory.reduce((a, b) => a + b.qty, 0)} prs
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '8px', borderRadius: '4px', color: '#60a5fa' }}>
                <ShoppingBag size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>Sell from Stall #14B</div>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)' }}>Tap customer speech bubble!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
