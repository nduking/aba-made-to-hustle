import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { WholesaleItem } from '../types';
import { WHOLESALE_CATALOG } from '../data/mockData';
import { ShoppingBag, X, Check, Truck, ShieldCheck } from 'lucide-react';

export const WholesaleMarketModal: React.FC = () => {
  const { activeModal, closeModal, placeWholesaleOrder, player } = useGame();
  const [selectedItem, setSelectedItem] = useState<WholesaleItem>(WHOLESALE_CATALOG[0]);
  const [orderQty, setOrderQty] = useState<number>(WHOLESALE_CATALOG[0].moq);
  const [orderFeedback, setOrderFeedback] = useState<string | null>(null);

  if (activeModal !== 'wholesale') return null;

  const totalCost = selectedItem.wholesalePrice * orderQty;
  const canAfford = (player.cash + player.bank) >= totalCost;

  const handleOrder = () => {
    const success = placeWholesaleOrder(selectedItem, orderQty);
    if (success) {
      setOrderFeedback(`✅ Successfully ordered ${orderQty} pairs of ${selectedItem.name}! Stock delivered to Stall #14B.`);
      setTimeout(() => {
        setOrderFeedback(null);
        closeModal();
      }, 1500);
    } else {
      setOrderFeedback(`❌ Insufficient funds in cash/bank to cover $${totalCost.toLocaleString()}.`);
    }
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
        maxWidth: '560px',
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
            <span className="badge-sku">ARIARIA WHOLESALE FACTORY CLUSTER (§6.21, §6.22)</span>
            <h2 style={{ fontSize: '17px', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShoppingBag size={18} style={{ color: 'var(--primary)' }} />
              <span>Made in Aba Footwear Wholesalers</span>
            </h2>
          </div>
          <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--on-surface-muted)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '72vh', overflowY: 'auto' }}>
          {/* Catalog Selection */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            {WHOLESALE_CATALOG.map(item => (
              <div 
                key={item.sku}
                onClick={() => {
                  setSelectedItem(item);
                  setOrderQty(item.moq);
                }}
                className="tactile-card"
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  borderColor: selectedItem.sku === item.sku ? 'var(--primary)' : 'var(--border)',
                  background: selectedItem.sku === item.sku ? 'var(--surface-high)' : 'var(--surface-low)',
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center'
                }}
              >
                <div style={{ width: '45px', height: '45px', borderRadius: '4px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }} />
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontWeight: 700, fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
                  <div className="font-mono" style={{ fontSize: '11px', color: 'var(--primary)' }}>
                    ${item.wholesalePrice.toLocaleString()}/pr
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Item Breakdown */}
          <div className="tactile-card" style={{ padding: '14px', background: 'var(--surface-low)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="badge-sku">{selectedItem.sku}</span>
                <h3 style={{ fontSize: '15px', marginTop: '4px' }}>{selectedItem.name}</h3>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)', marginTop: '2px' }}>
                  {selectedItem.description}
                </div>
              </div>
              <span className="badge-status-gold">GRADE {selectedItem.qualityGrade}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '12px', fontSize: '11px' }}>
              <div style={{ background: 'var(--surface)', padding: '6px 8px', borderRadius: '4px' }}>
                <span style={{ color: 'var(--on-surface-subtle)' }}>Unit Wholesale:</span>
                <div className="font-mono" style={{ fontWeight: 700, color: 'var(--secondary)' }}>
                  ${selectedItem.wholesalePrice.toLocaleString()}
                </div>
              </div>
              <div style={{ background: 'var(--surface)', padding: '6px 8px', borderRadius: '4px' }}>
                <span style={{ color: 'var(--on-surface-subtle)' }}>Retail Target:</span>
                <div className="font-mono" style={{ fontWeight: 700 }}>
                  ${selectedItem.retailSuggested.toLocaleString()}
                </div>
              </div>
              <div style={{ background: 'var(--surface)', padding: '6px 8px', borderRadius: '4px' }}>
                <span style={{ color: 'var(--on-surface-subtle)' }}>Gross Margin:</span>
                <div className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  +{Math.round(((selectedItem.retailSuggested - selectedItem.wholesalePrice) / selectedItem.wholesalePrice) * 100)}%
                </div>
              </div>
            </div>

            {/* Volume Quantity Selector */}
            <div style={{ marginTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span>Order Quantity: <strong>{orderQty} pairs</strong> (MOQ: {selectedItem.moq})</span>
                <span className="font-mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  Total: ${totalCost.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[selectedItem.moq, selectedItem.moq * 2, selectedItem.moq * 5].map(q => (
                  <button
                    key={q}
                    onClick={() => setOrderQty(q)}
                    style={{
                      flex: 1,
                      background: orderQty === q ? 'var(--primary)' : 'var(--surface)',
                      color: orderQty === q ? '#121316' : 'var(--on-surface)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      padding: '8px',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {q} Pairs
                  </button>
                ))}
              </div>
            </div>
          </div>

          {orderFeedback && (
            <div style={{ padding: '8px 12px', borderRadius: '4px', background: orderFeedback.startsWith('✅') ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', border: '1px solid var(--border)', fontSize: '12px' }}>
              {orderFeedback}
            </div>
          )}

          <button
            onClick={handleOrder}
            disabled={!canAfford}
            className="btn-emerald"
            style={{ width: '100%', padding: '12px', fontSize: '14px', opacity: canAfford ? 1 : 0.5 }}
          >
            {canAfford ? `Confirm Purchase Order ($${totalCost.toLocaleString()})` : `Insufficient Funds ($${totalCost.toLocaleString()} required)`}
          </button>
        </div>
      </div>
    </div>
  );
};
