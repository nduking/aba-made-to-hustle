import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import { 
  X, 
  MessageSquare, 
  Landmark, 
  Briefcase, 
  BarChart3, 
  ShoppingBag, 
  Coins, 
  Sparkles, 
  Send, 
  ArrowUpRight, 
  ArrowDownLeft, 
  ShieldCheck, 
  AlertCircle,
  TrendingUp,
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { validatePublicId } from '../utils/playerId';
import { WHOLESALE_CATALOG } from '../data/mockData';

export const PhoneOverlay: React.FC = () => {
  const { 
    player, 
    showPhone, 
    togglePhone, 
    activePhoneApp, 
    setActivePhoneApp,
    contacts,
    messages,
    sendMessage,
    selectedContact,
    selectContact,
    ledger,
    claimConsumerStipend,
    placeWholesaleOrder,
    sellStallItem,
    activateLifeEnhancer,
    transferMoney
  } = useGame();

  const [messageInput, setMessageInput] = useState('');
  const [transferTargetId, setTransferTargetId] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferFeedback, setTransferFeedback] = useState<{ msg: string; isError: boolean } | null>(null);
  const [searchIdInput, setSearchIdInput] = useState('');
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);
  const [activeTabPlanner, setActiveTabPlanner] = useState<'runway' | 'wholesale' | 'stall' | 'postmortem'>('runway');

  if (!showPhone) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedContact) return;
    sendMessage(selectedContact.id, messageInput);
    setMessageInput('');
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseInt(transferAmount, 10);
    if (isNaN(amt) || amt <= 0) {
      setTransferFeedback({ msg: 'Enter a valid transfer amount', isError: true });
      return;
    }
    const val = validatePublicId(transferTargetId);
    if (!val.valid) {
      setTransferFeedback({ msg: val.error || 'Invalid Player ID', isError: true });
      return;
    }
    const res = transferMoney(val.normalized, amt);
    setTransferFeedback({ msg: res.message, isError: !res.success });
    if (res.success) {
      setTransferAmount('');
      setTransferTargetId('');
    }
  };

  const handleSearchId = () => {
    const val = validatePublicId(searchIdInput);
    if (!val.valid) {
      setSearchFeedback(`❌ ${val.error}`);
    } else {
      setSearchFeedback(`✅ Verified Aba Public ID: ${val.normalized}`);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(5px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '12px'
    }}>
      {/* Handheld Burner Phone Outer Bezel */}
      <div className="tactile-card-raised" style={{
        width: '100%',
        maxWidth: '430px',
        height: '92vh',
        maxHeight: '840px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '3px solid #2a2f3d',
        background: 'var(--surface)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.15)'
      }}>
        {/* Phone Top Bezel Speaker & Sensor */}
        <div style={{
          background: '#0d0e11',
          padding: '8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--on-surface-muted)',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>08:30</span>
            <span style={{ color: 'var(--secondary)' }}>• 4G ENYIMBA</span>
          </div>
          <div style={{ width: '44px', height: '4px', background: '#222', borderRadius: '2px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>84% 🔋</span>
            <button 
              onClick={togglePhone}
              style={{ background: 'none', border: 'none', color: 'var(--on-surface-muted)', cursor: 'pointer' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Top Drawer: Daily Hustle Board & Enhancer Tray (§6.17) */}
        <div style={{
          background: 'var(--surface-low)',
          padding: '8px 12px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Coins size={15} style={{ color: '#fbbf24' }} />
            <span className="font-mono" style={{ fontWeight: 700, fontSize: '12px', color: '#fbbf24' }}>
              {player.hustleCoins} HC
            </span>
            <span style={{ fontSize: '10px', color: 'var(--on-surface-subtle)' }}>(Cap: 100/day)</span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => activateLifeEnhancer('chop_chill', 30, 3600)}
              title="Chop & Chill: +35 Energy (30 HC)"
              style={{
                background: 'var(--surface-high)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '3px 8px',
                color: 'var(--primary)',
                fontSize: '10px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              CHOP & CHILL (30 HC)
            </button>
            <button
              onClick={() => activateLifeEnhancer('second_wind', 100, 7200)}
              title="Second Wind: Collapse Immunity (100 HC)"
              style={{
                background: 'var(--surface-high)',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                padding: '3px 8px',
                color: 'var(--secondary)',
                fontSize: '10px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              2ND WIND (100 HC)
            </button>
          </div>
        </div>

        {/* Active Phone Screen Canvas */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {/* ================= APP 1: MESSAGES (F04, F05, §6.4) ================= */}
          {activePhoneApp === 'messages' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Public ID Search & Contact Lookup Header */}
              <div style={{ marginBottom: '10px', background: 'var(--surface-low)', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input
                    type="text"
                    value={searchIdInput}
                    onChange={(e) => setSearchIdInput(e.target.value)}
                    placeholder="Search by ID (e.g. ABA-7K4M2-QX9D3)"
                    className="font-mono"
                    style={{
                      flex: 1,
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-xs)',
                      padding: '6px 8px',
                      color: 'var(--on-surface)',
                      fontSize: '11px'
                    }}
                  />
                  <button onClick={handleSearchId} className="btn-secondary" style={{ padding: '6px 10px', fontSize: '11px' }}>
                    <Search size={12} />
                  </button>
                </div>
                {searchFeedback && (
                  <div style={{ fontSize: '10px', marginTop: '4px', color: searchFeedback.startsWith('✅') ? 'var(--secondary)' : 'var(--error)' }}>
                    {searchFeedback}
                  </div>
                )}
              </div>

              {/* Contacts Bar */}
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '8px' }}>
                {contacts.map(c => (
                  <button
                    key={c.id}
                    onClick={() => selectContact(c)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: selectedContact?.id === c.id ? 'var(--surface-high)' : 'var(--surface-low)',
                      border: selectedContact?.id === c.id ? '1px solid var(--primary)' : '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '6px',
                      minWidth: '70px',
                      cursor: 'pointer',
                      color: 'var(--on-surface)'
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{c.avatar}</span>
                    <span style={{ fontSize: '10px', fontWeight: 700, marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '65px' }}>
                      {c.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Chat Thread */}
              {selectedContact && (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--surface-low)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', overflow: 'hidden' }}>
                  {/* Contact Header */}
                  <div style={{ padding: '8px 12px', background: 'var(--surface-high)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13px' }}>{selectedContact.name}</div>
                      <div className="font-mono" style={{ fontSize: '10px', color: 'var(--primary)' }}>{selectedContact.publicId}</div>
                    </div>
                    <span className="badge-status-green">ONLINE</span>
                  </div>

                  {/* Messages Bubble List */}
                  <div style={{ flex: 1, padding: '10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {messages.filter(m => m.threadId === selectedContact.id).map(msg => (
                      <div 
                        key={msg.id}
                        style={{
                          alignSelf: msg.isPlayer ? 'flex-end' : 'flex-start',
                          maxWidth: '82%',
                          background: msg.isPlayer ? 'var(--primary)' : 'var(--surface-high)',
                          color: msg.isPlayer ? '#121316' : 'var(--on-surface)',
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}
                      >
                        <div>{msg.text}</div>
                        <div style={{ fontSize: '9px', textAlign: 'right', marginTop: '4px', opacity: 0.7 }}>{msg.timestamp}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <form onSubmit={handleSendMessage} style={{ padding: '8px', borderTop: '1px solid var(--border)', display: 'flex', gap: '6px', background: 'var(--surface)' }}>
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message or price offer..."
                      style={{
                        flex: 1,
                        background: 'var(--surface-low)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '8px 10px',
                        color: 'var(--on-surface)',
                        fontSize: '12px'
                      }}
                    />
                    <button type="submit" className="btn-primary" style={{ padding: '8px 12px' }}>
                      <Send size={14} />
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* ================= APP 2: BANK & DOUBLE-ENTRY LEDGER (F10, §6.7, §7) ================= */}
          {activePhoneApp === 'bank' && (
            <div>
              <div style={{ marginBottom: '14px', textAlign: 'center', background: 'var(--surface-low)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Total Liquid Net Worth</div>
                <h2 className="font-mono" style={{ fontSize: '26px', color: 'var(--secondary)', margin: '4px 0' }}>
                  ${(player.cash + player.bank).toLocaleString()}
                </h2>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-subtle)' }}>
                  Wallet Cash: ${player.cash.toLocaleString()} • Vault Deposit: ${player.bank.toLocaleString()}
                </div>
              </div>

              {/* Restricted Buckets Breakdown (§6.19) */}
              <div className="tactile-card" style={{ padding: '12px', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} />
                  <span>Restricted Funds Buckets (§6.19 Anti-Farming)</span>
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
                  <div style={{ background: 'var(--surface-low)', padding: '8px', borderRadius: '4px' }}>
                    <div style={{ color: 'var(--on-surface-subtle)' }}>Starter Funds:</div>
                    <div className="font-mono" style={{ fontWeight: 700, fontSize: '13px', color: 'var(--primary)' }}>
                      ${player.restrictedBuckets.starterFunds.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--on-surface-muted)' }}>Wholesale & rent only</div>
                  </div>
                  <div style={{ background: 'var(--surface-low)', padding: '8px', borderRadius: '4px' }}>
                    <div style={{ color: 'var(--on-surface-subtle)' }}>Earned Funds:</div>
                    <div className="font-mono" style={{ fontWeight: 700, fontSize: '13px', color: 'var(--secondary)' }}>
                      ${player.restrictedBuckets.earnedFunds.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--on-surface-muted)' }}>Freely transferable</div>
                  </div>
                </div>
              </div>

              {/* Player-to-Player Transfer Modal (§6.7) */}
              <div className="tactile-card" style={{ padding: '12px', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Send Money by Public ID</h4>
                <form onSubmit={handleTransfer} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input
                    type="text"
                    value={transferTargetId}
                    onChange={(e) => setTransferTargetId(e.target.value)}
                    placeholder="Recipient ID (e.g. ABA-7K4M2-QX9D3)"
                    className="font-mono"
                    style={{ background: 'var(--surface-low)', border: '1px solid var(--border)', borderRadius: '4px', padding: '8px', color: 'var(--on-surface)', fontSize: '12px' }}
                  />
                  <input
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="Amount to Transfer ($)"
                    className="font-mono"
                    style={{ background: 'var(--surface-low)', border: '1px solid var(--border)', borderRadius: '4px', padding: '8px', color: 'var(--on-surface)', fontSize: '12px' }}
                  />
                  <button type="submit" className="btn-emerald" style={{ padding: '8px' }}>
                    Execute Verified Transfer
                  </button>
                  {transferFeedback && (
                    <div style={{ fontSize: '11px', color: transferFeedback.isError ? 'var(--error)' : 'var(--secondary)' }}>
                      {transferFeedback.msg}
                    </div>
                  )}
                </form>
              </div>

              {/* Double-Entry Transaction History */}
              <div className="tactile-card" style={{ padding: '12px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Audited Ledger Trail</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {ledger.map(entry => (
                    <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', background: 'var(--surface-low)', borderRadius: '4px', fontSize: '11px' }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>{entry.reason}</div>
                        <div className="font-mono" style={{ fontSize: '9px', color: 'var(--on-surface-subtle)' }}>{entry.txId} • {entry.timestamp}</div>
                      </div>
                      <div className="font-mono" style={{ fontWeight: 700, color: entry.delta > 0 ? 'var(--secondary)' : 'var(--on-surface-muted)' }}>
                        {entry.delta > 0 ? `+$${entry.delta.toLocaleString()}` : `-$${Math.abs(entry.delta).toLocaleString()}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================= APP 3: BUSINESS PLANNER & WHOLESALE (F21, §6.20, §6.21) ================= */}
          {activePhoneApp === 'planner' && (
            <div>
              {/* Planner Sub-Tabs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '4px', marginBottom: '12px' }}>
                <button 
                  onClick={() => setActiveTabPlanner('runway')}
                  style={{
                    background: activeTabPlanner === 'runway' ? 'var(--primary)' : 'var(--surface-high)',
                    color: activeTabPlanner === 'runway' ? '#121316' : 'var(--on-surface)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 2px',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  RUNWAY
                </button>
                <button 
                  onClick={() => setActiveTabPlanner('wholesale')}
                  style={{
                    background: activeTabPlanner === 'wholesale' ? 'var(--primary)' : 'var(--surface-high)',
                    color: activeTabPlanner === 'wholesale' ? '#121316' : 'var(--on-surface)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 2px',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  WHOLESALE
                </button>
                <button 
                  onClick={() => setActiveTabPlanner('stall')}
                  style={{
                    background: activeTabPlanner === 'stall' ? 'var(--primary)' : 'var(--surface-high)',
                    color: activeTabPlanner === 'stall' ? '#121316' : 'var(--on-surface)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 2px',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  STALL #14B
                </button>
                <button 
                  onClick={() => setActiveTabPlanner('postmortem')}
                  style={{
                    background: activeTabPlanner === 'postmortem' ? 'var(--primary)' : 'var(--surface-high)',
                    color: activeTabPlanner === 'postmortem' ? '#121316' : 'var(--on-surface)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '6px 2px',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  AUDIT
                </button>
              </div>

              {/* Sub-view: Runway & Cash Flow */}
              {activeTabPlanner === 'runway' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div className="tactile-card" style={{ padding: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge-sku">CASH FLOW RUNWAY</span>
                      <span className="badge-status-green">SOLVENT</span>
                    </div>
                    <h3 className="font-mono" style={{ fontSize: '24px', color: 'var(--primary)' }}>
                      {player.runwayDays} DAYS COVER
                    </h3>
                    <p style={{ fontSize: '11px', color: 'var(--on-surface-muted)', marginTop: '4px' }}>
                      Stall rent ($35,000/week) paid for next 6 days. Inventory can sustain 4 days of average footfall turnover.
                    </p>
                  </div>

                  <div className="tactile-card" style={{ padding: '14px' }}>
                    <h4 style={{ fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>Demand Outlook (14-Day Range)</h4>
                    <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)' }}>
                      • <strong>Footwear Demand:</strong> 40 – 75 pairs/day (Surging due to upcoming wedding season).<br/>
                      • <strong>Weather Hazard:</strong> High monsoon risk this afternoon. Keep sandbags near threshold.
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-view: Wholesale Restock */}
              {activeTabPlanner === 'wholesale' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)' }}>
                    Place verified purchase orders directly with Ariaria Shoe Plaza artisans.
                  </div>
                  {WHOLESALE_CATALOG.map(item => (
                    <div key={item.sku} className="tactile-card" style={{ padding: '10px', display: 'flex', gap: '10px' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '4px', background: '#222', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '12px' }}>{item.name}</div>
                        <div className="font-mono" style={{ fontSize: '11px', color: 'var(--secondary)' }}>
                          Wholesale: ${item.wholesalePrice.toLocaleString()} (MOQ: {item.moq})
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--on-surface-muted)' }}>
                          Retail Target: ${item.retailSuggested.toLocaleString()}
                        </div>
                        <button
                          onClick={() => placeWholesaleOrder(item, item.moq)}
                          className="btn-primary"
                          style={{ marginTop: '6px', padding: '4px 10px', fontSize: '10px' }}
                        >
                          Order MOQ ({item.moq} pairs) • ${(item.wholesalePrice * item.moq).toLocaleString()}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Sub-view: Stall #14B Inventory */}
              {activeTabPlanner === 'stall' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="badge-sku">STALL #14B INVENTORY</span>
                    <span style={{ fontSize: '11px', color: 'var(--on-surface-muted)' }}>Total Pairs: {player.inventory.reduce((acc, i) => acc + i.qty, 0)}</span>
                  </div>
                  {player.inventory.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px', color: 'var(--on-surface-muted)', fontSize: '12px' }}>
                      No inventory in stock. Visit Wholesale tab to restock.
                    </div>
                  ) : (
                    player.inventory.map(inv => (
                      <div key={inv.sku} className="tactile-card" style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '13px' }}>{inv.name}</div>
                          <div className="font-mono" style={{ fontSize: '11px', color: 'var(--primary)' }}>
                            Stock: {inv.qty} pairs in shelf
                          </div>
                          <div style={{ fontSize: '10px', color: 'var(--on-surface-muted)' }}>
                            Cost: ${inv.costPrice.toLocaleString()} • Retail: ${inv.retailPrice.toLocaleString()}
                          </div>
                        </div>
                        <button
                          onClick={() => sellStallItem(inv.sku, 1)}
                          className="btn-emerald"
                          style={{ padding: '6px 12px', fontSize: '11px' }}
                        >
                          Sell 1 Pair (+${inv.retailPrice.toLocaleString()})
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Sub-view: Post-Mortem Variance Review (§6.20 P5) */}
              {activeTabPlanner === 'postmortem' && (
                <div className="tactile-card" style={{ padding: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="badge-sku">POST-MORTEM AUDIT (DAY 6)</span>
                    <span className="badge-status-green">+18% MARGIN</span>
                  </div>
                  <h4 style={{ fontSize: '15px', color: 'var(--on-surface)', marginBottom: '8px' }}>
                    Cycle Ledger Summary
                  </h4>
                  <div style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--on-surface-muted)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Gross Sales Revenue:</span>
                      <span className="font-mono" style={{ color: 'var(--secondary)' }}>+$162,000</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Cost of Goods Sold (COGS):</span>
                      <span className="font-mono" style={{ color: 'var(--on-surface)' }}>-$78,000</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Stall Rent & Union Dues:</span>
                      <span className="font-mono" style={{ color: 'var(--on-surface)' }}>-$15,500</span>
                    </div>
                    <div style={{ height: '1px', background: 'var(--border)', margin: '4px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: 'var(--secondary)' }}>
                      <span>Net Cash Profit:</span>
                      <span className="font-mono">+$68,500</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= APP 4: JOBS & APPRENTICESHIP (F06, F07, §6.5) ================= */}
          {activePhoneApp === 'jobs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div className="tactile-card" style={{ padding: '12px' }}>
                <span className="badge-sku">MY SKILL PROFILE</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <div>
                    <h3 style={{ fontSize: '15px' }}>Shoemaking & Cobbling</h3>
                    <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)' }}>Level {player.skillLevel} Artisan • {player.skillXp} XP</div>
                  </div>
                  <span className="badge-status-gold">APPRENTICE</span>
                </div>
              </div>

              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--on-surface-muted)' }}>
                Available Workshop Contracts
              </div>

              <div className="tactile-card" style={{ padding: '12px' }}>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>Nwosu Cobblers: Crepe Sole Trimming</div>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)', margin: '4px 0' }}>
                  Supervised edge bevelling and sole vulcanization on 12 pairs of slides.
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span className="font-mono" style={{ color: 'var(--secondary)', fontWeight: 700 }}>+$4,500 • 30 XP</span>
                  <button 
                    onClick={() => useGame().completeApprenticeTask("Crepe Sole Trimming", 4500, 30)}
                    className="btn-primary" 
                    style={{ padding: '6px 12px', fontSize: '11px' }}
                  >
                    Perform Task
                  </button>
                </div>
              </div>

              <div className="tactile-card" style={{ padding: '12px' }}>
                <div style={{ fontWeight: 700, fontSize: '13px' }}>Brass Junction Keke Cargo Loader</div>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)', margin: '4px 0' }}>
                  Assist Driver Chidi to strap and tarp wholesale shoe cartons.
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                  <span className="font-mono" style={{ color: 'var(--secondary)', fontWeight: 700 }}>+$3,000 • 20 XP</span>
                  <button 
                    onClick={() => useGame().completeApprenticeTask("Keke Cargo Loading", 3000, 20)}
                    className="btn-primary" 
                    style={{ padding: '6px 12px', fontSize: '11px' }}
                  >
                    Perform Task
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= APP 5: LIFESTYLE & CONSUMER TERMINAL (F20, §6.19) ================= */}
          {activePhoneApp === 'lifestyle' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Civilian Living Stipend Claim Terminal */}
              <div className="tactile-card" style={{ padding: '14px', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(16, 185, 129, 0.1))' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span className="badge-sku">CONSUMER INCOME TERMINAL (D16)</span>
                  <span className="font-mono" style={{ fontSize: '11px', color: 'var(--secondary)' }}>
                    {player.unclaimedStipends} Unclaimed
                  </span>
                </div>
                <h3 className="font-mono" style={{ fontSize: '20px', color: 'var(--primary)' }}>
                  $50,000 / PERIOD
                </h3>
                <p style={{ fontSize: '11px', color: 'var(--on-surface-muted)', margin: '6px 0 10px' }}>
                  Civilian living allowance credited into restricted Consumer Income bucket. Stackable up to 3 periods.
                </p>
                <button
                  onClick={claimConsumerStipend}
                  disabled={player.unclaimedStipends <= 0}
                  className="btn-emerald"
                  style={{ width: '100%', padding: '10px', opacity: player.unclaimedStipends > 0 ? 1 : 0.5 }}
                >
                  {player.unclaimedStipends > 0 ? 'Claim $50,000 Stipend' : 'Stipend Claimed (Next period in 24h)'}
                </button>
              </div>

              {/* Made in Aba Retail Showcase */}
              <div className="tactile-card" style={{ padding: '12px' }}>
                <h4 style={{ fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Aba Artisan Fashion Reviews
                </h4>
                <div style={{ fontSize: '11px', color: 'var(--on-surface-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ background: 'var(--surface-low)', padding: '8px', borderRadius: '4px' }}>
                    <div style={{ fontWeight: 700, color: 'var(--on-surface)' }}>Adaeze Nwosu • 5.0 ★</div>
                    <div>"The burnished leather loafers from Stall #14B lasted 6 months through rainy season without peeling. Authentic craft."</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Docked Tactile OS Navigation Bar (Bottom 5 Buttons) */}
        <div style={{
          background: '#0d0e11',
          borderTop: '1px solid var(--border)',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          padding: '8px 4px'
        }}>
          <button
            onClick={() => setActivePhoneApp('messages')}
            style={{
              background: 'none',
              border: 'none',
              color: activePhoneApp === 'messages' ? 'var(--primary)' : 'var(--on-surface-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              fontSize: '9px',
              cursor: 'pointer'
            }}
          >
            <MessageSquare size={16} />
            <span>Chat</span>
          </button>

          <button
            onClick={() => setActivePhoneApp('bank')}
            style={{
              background: 'none',
              border: 'none',
              color: activePhoneApp === 'bank' ? 'var(--primary)' : 'var(--on-surface-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              fontSize: '9px',
              cursor: 'pointer'
            }}
          >
            <Landmark size={16} />
            <span>Bank</span>
          </button>

          <button
            onClick={() => setActivePhoneApp('planner')}
            style={{
              background: 'none',
              border: 'none',
              color: activePhoneApp === 'planner' ? 'var(--primary)' : 'var(--on-surface-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              fontSize: '9px',
              cursor: 'pointer'
            }}
          >
            <BarChart3 size={16} />
            <span>Planner</span>
          </button>

          <button
            onClick={() => setActivePhoneApp('jobs')}
            style={{
              background: 'none',
              border: 'none',
              color: activePhoneApp === 'jobs' ? 'var(--primary)' : 'var(--on-surface-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              fontSize: '9px',
              cursor: 'pointer'
            }}
          >
            <Briefcase size={16} />
            <span>Work</span>
          </button>

          <button
            onClick={() => setActivePhoneApp('lifestyle')}
            style={{
              background: 'none',
              border: 'none',
              color: activePhoneApp === 'lifestyle' ? 'var(--primary)' : 'var(--on-surface-muted)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              fontSize: '9px',
              cursor: 'pointer'
            }}
          >
            <ShoppingBag size={16} />
            <span>Civilian</span>
          </button>
        </div>
      </div>
    </div>
  );
};
