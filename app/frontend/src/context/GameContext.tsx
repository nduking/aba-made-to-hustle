import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Player, LedgerEntry, Contact, ChatMessage, WholesaleItem, ScenarioEvent } from '../types';
import { generatePublicId } from '../utils/playerId';
import { INITIAL_CONTACTS, SCENARIO_EVENTS, WHOLESALE_CATALOG } from '../data/mockData';
import { sound } from '../utils/AudioService';
import confetti from 'canvas-confetti';

interface GameContextType {
  player: Player;
  ledger: LedgerEntry[];
  contacts: Contact[];
  messages: ChatMessage[];
  cityTime: {
    hour: number;
    minute: number;
    dayNumber: number;
    period: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
    isRaining: boolean;
  };
  activeModal: string | null;
  activeScenario: ScenarioEvent | null;
  selectedContact: Contact | null;
  showPhone: boolean;
  activePhoneApp: 'messages' | 'bank' | 'jobs' | 'planner' | 'lifestyle';
  
  // Actions
  togglePhone: () => void;
  setActivePhoneApp: (app: 'messages' | 'bank' | 'jobs' | 'planner' | 'lifestyle') => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  openScenario: (scenario: ScenarioEvent) => void;
  resolveScenarioChoice: (choiceId: string) => void;
  selectContact: (contact: Contact | null) => void;
  sendMessage: (contactId: string, text: string) => void;
  completeOnboarding: (data: { name: string; gender: 'male' | 'female' | 'other'; ageBand: '18-24' | '25-34' | '35+'; origin: 'faulks' | 'ugwa' | 'gra'; track: 'dealer' | 'consumer' }) => void;
  
  // Economic & Life Actions
  claimConsumerStipend: () => void;
  placeWholesaleOrder: (item: WholesaleItem, qty: number) => boolean;
  sellStallItem: (sku: string, qty: number) => void;
  completeApprenticeTask: (taskName: string, wage: number, xp: number) => void;
  collectHustleCoin: (sourceDesc: string, amount: number) => void;
  activateLifeEnhancer: (enhancerId: string, costCoins: number, durationSeconds: number) => boolean;
  seekMedicalCare: (severity: 'minor' | 'moderate' | 'serious', facility: string, cost: number, isSubsidised?: boolean) => void;
  transferMoney: (targetPublicId: string, amount: number) => { success: boolean; message: string };
  toggleWeather: () => void;
  eatStreetFood: (cost: number, energyBoost: number) => void;
}

const STORAGE_KEY = 'aba_game_state_v3';

const DEFAULT_PLAYER: Player = {
  id: 'usr_' + Math.random().toString(36).substring(2, 9),
  publicId: 'ABA-7K4M2-QX9D3',
  name: 'Emeka Nwosu',
  gender: 'male',
  ageBand: '25-34',
  avatarSeed: 1,
  origin: 'faulks',
  track: 'dealer',
  cash: 150000,
  bank: 350000,
  restrictedBuckets: {
    starterFunds: 500000,
    consumerIncome: 0,
    earnedFunds: 0
  },
  hustleCoins: 75,
  dailyCoinsEarned: 25,
  guildRespect: 4.8,
  vitality: 92,
  hunger: 40,
  energy: 85,
  health: 98,
  skillLevel: 1,
  skillXp: 180,
  inventory: [
    {
      sku: "ABA-FW-SLID-02",
      name: "Crepe-Rubber Double-Buckle Slides",
      category: "Vulcanized Rubber",
      costPrice: 6500,
      retailPrice: 13500,
      qty: 12,
      qualityGrade: "A",
      image: "https://lh3.googleusercontent.com/aida/AEtjO1UT9iWm9EKeGjdA94wIzXJC8Zv_TjqY7MIeP"
    }
  ],
  stallRentPaidDays: 6,
  runwayDays: 24,
  unclaimedStipends: 1,
  activeEnhancers: {},
  isOnboarded: true
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [player, setPlayer] = useState<Player>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return DEFAULT_PLAYER;
  });

  const [ledger, setLedger] = useState<LedgerEntry[]>([
    {
      id: 'tx_init_01',
      txId: 'TX-ABA-9821',
      timestamp: 'Day 6, 06:00 AM',
      account: 'STARTER_FUNDS',
      delta: 500000,
      reason: 'Enyimba Commercial Registration Grant (§6.19)',
      refType: 'GRANT'
    },
    {
      id: 'tx_init_02',
      txId: 'TX-ABA-9822',
      timestamp: 'Day 6, 07:15 AM',
      account: 'CASH',
      delta: -78000,
      reason: 'Wholesale order 12x Crepe-Rubber Slides (Ariaria Shoe Plaza)',
      refType: 'RESTOCK'
    }
  ]);

  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      threadId: 'contact_mazi',
      senderId: 'contact_mazi',
      senderName: 'Mazi Okonkwo',
      text: 'Nna, shoe soles arrived from Kano tanneries this morning. If you need 50 pairs of burnished loafers, tell Driver Chidi to come by 11:30 AM before rain falls.',
      timestamp: '06:14 AM',
      isPlayer: false
    }
  ]);

  const [cityTime, setCityTime] = useState({
    hour: 8,
    minute: 30,
    dayNumber: 6,
    period: 'MORNING' as 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT',
    isRaining: false
  });

  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [activeScenario, setActiveScenario] = useState<ScenarioEvent | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(INITIAL_CONTACTS[0]);
  const [showPhone, setShowPhone] = useState(false);
  const [activePhoneApp, setActivePhoneApp] = useState<'messages' | 'bank' | 'jobs' | 'planner' | 'lifestyle'>('planner');

  // Persist player changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
  }, [player]);

  // Shared 24-minute city simulation clock
  // 1 real second = 1 in-game minute (24 real minutes = 1440 minutes = 24 in-game hours)
  useEffect(() => {
    const timer = setInterval(() => {
      setCityTime(prev => {
        let newMin = prev.minute + 1;
        let newHr = prev.hour;
        let newDay = prev.dayNumber;

        if (newMin >= 60) {
          newMin = 0;
          newHr += 1;
        }

        if (newHr >= 24) {
          newHr = 0;
          newDay += 1;
        }

        let period: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT' = 'MORNING';
        if (newHr >= 6 && newHr < 12) period = 'MORNING';
        else if (newHr >= 12 && newHr < 17) period = 'AFTERNOON';
        else if (newHr >= 17 && newHr < 21) period = 'EVENING';
        else period = 'NIGHT';

        return {
          ...prev,
          hour: newHr,
          minute: newMin,
          dayNumber: newDay,
          period
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Periodic needs decay (gentle, <10% attention per GDD §6.12)
  useEffect(() => {
    const needsTimer = setInterval(() => {
      setPlayer(prev => ({
        ...prev,
        hunger: Math.min(100, prev.hunger + 1),
        energy: Math.max(10, prev.energy - 1),
        vitality: prev.hunger > 80 ? Math.max(20, prev.vitality - 2) : prev.vitality
      }));
    }, 15000);

    return () => clearInterval(needsTimer);
  }, []);

  const togglePhone = () => {
    sound.click();
    setShowPhone(prev => !prev);
  };

  const openModal = (modalId: string) => {
    sound.click();
    setActiveModal(modalId);
  };

  const closeModal = () => {
    sound.click();
    setActiveModal(null);
    setActiveScenario(null);
  };

  const openScenario = (scenario: ScenarioEvent) => {
    sound.warning();
    setActiveScenario(scenario);
    setActiveModal('scenario');
  };

  const toggleWeather = () => {
    sound.click();
    setCityTime(prev => ({ ...prev, isRaining: !prev.isRaining }));
  };

  // Complete Character Onboarding Flow (§6.18, §6.19)
  const completeOnboarding = (data: {
    name: string;
    gender: 'male' | 'female' | 'other';
    ageBand: '18-24' | '25-34' | '35+';
    origin: 'faulks' | 'ugwa' | 'gra';
    track: 'dealer' | 'consumer';
  }) => {
    const newPublicId = generatePublicId();
    const newPlayer: Player = {
      ...player,
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      publicId: newPublicId,
      name: data.name,
      gender: data.gender,
      ageBand: data.ageBand,
      origin: data.origin,
      track: data.track,
      cash: 200000,
      bank: 300000,
      restrictedBuckets: {
        starterFunds: 500000,
        consumerIncome: data.track === 'consumer' ? 50000 : 0,
        earnedFunds: 0
      },
      hustleCoins: 75,
      guildRespect: 5.0,
      vitality: 100,
      energy: 100,
      hunger: 10,
      health: 100,
      isOnboarded: true
    };

    setPlayer(newPlayer);
    sound.cash();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    const grantEntry: LedgerEntry = {
      id: 'tx_grant_' + Date.now(),
      txId: 'TX-GRANT-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: `Day 1, 08:00 AM`,
      account: 'STARTER_FUNDS',
      delta: 500000,
      reason: '$500,000 Closed-Loop Starting Capital Grant Credited (§6.19)',
      refType: 'GRANT'
    };
    setLedger(prev => [grantEntry, ...prev]);
    closeModal();
  };

  // Collect Hustle Coins (§6.17)
  const collectHustleCoin = (sourceDesc: string, amount: number) => {
    if (player.dailyCoinsEarned >= 100) return; // 100 HC daily cap
    const actual = Math.min(amount, 100 - player.dailyCoinsEarned);
    sound.coin();
    setPlayer(prev => ({
      ...prev,
      hustleCoins: prev.hustleCoins + actual,
      dailyCoinsEarned: prev.dailyCoinsEarned + actual
    }));
  };

  // Activate Life Enhancer (§6.17)
  const activateLifeEnhancer = (enhancerId: string, costCoins: number, durationSeconds: number): boolean => {
    if (player.hustleCoins < costCoins) return false;
    sound.cash();
    const expiry = Date.now() + durationSeconds * 1000;
    setPlayer(prev => ({
      ...prev,
      hustleCoins: prev.hustleCoins - costCoins,
      energy: enhancerId === 'chop_chill' ? Math.min(100, prev.energy + 35) : prev.energy,
      vitality: enhancerId === 'second_wind' ? Math.min(100, prev.vitality + 30) : prev.vitality,
      activeEnhancers: {
        ...prev.activeEnhancers,
        [enhancerId]: expiry
      }
    }));
    return true;
  };

  // Claim Consumer Stipend ($50,000 / period, D16)
  const claimConsumerStipend = () => {
    if (player.unclaimedStipends <= 0) return;
    sound.cash();
    setPlayer(prev => ({
      ...prev,
      bank: prev.bank + 50000,
      unclaimedStipends: prev.unclaimedStipends - 1,
      restrictedBuckets: {
        ...prev.restrictedBuckets,
        consumerIncome: prev.restrictedBuckets.consumerIncome + 50000
      }
    }));

    const entry: LedgerEntry = {
      id: 'tx_stipend_' + Date.now(),
      txId: 'TX-STIPEND-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: `Day ${cityTime.dayNumber}, ${String(cityTime.hour).padStart(2, '0')}:${String(cityTime.minute).padStart(2, '0')}`,
      account: 'CONSUMER_INCOME',
      delta: 50000,
      reason: 'Civilian Periodic Living Stipend Claimed (§6.19 D16)',
      refType: 'STIPEND'
    };
    setLedger(prev => [entry, ...prev]);
  };

  // Place Wholesale Purchase Order with Manufacturer (§6.21)
  const placeWholesaleOrder = (item: WholesaleItem, qty: number): boolean => {
    const totalCost = item.wholesalePrice * qty;
    const availableFunds = player.cash + player.bank;
    if (availableFunds < totalCost) return false;

    sound.cash();
    let remaining = totalCost;
    let newCash = player.cash;
    let newBank = player.bank;

    if (newCash >= remaining) {
      newCash -= remaining;
      remaining = 0;
    } else {
      remaining -= newCash;
      newCash = 0;
      newBank -= remaining;
    }

    setPlayer(prev => {
      const existing = prev.inventory.find(i => i.sku === item.sku);
      const updatedInv = existing
        ? prev.inventory.map(i => i.sku === item.sku ? { ...i, qty: i.qty + qty } : i)
        : [...prev.inventory, {
            sku: item.sku,
            name: item.name,
            category: item.category,
            costPrice: item.wholesalePrice,
            retailPrice: item.retailSuggested,
            qty,
            qualityGrade: item.qualityGrade,
            image: item.image
          }];
      return {
        ...prev,
        cash: newCash,
        bank: newBank,
        inventory: updatedInv
      };
    });

    const entry: LedgerEntry = {
      id: 'tx_order_' + Date.now(),
      txId: 'TX-ORD-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: `Day ${cityTime.dayNumber}, ${String(cityTime.hour).padStart(2, '0')}:${String(cityTime.minute).padStart(2, '0')}`,
      account: 'STARTER_FUNDS',
      delta: -totalCost,
      reason: `Wholesale restock: ${qty}x ${item.name} (Escrow Verified)`,
      refType: 'RESTOCK'
    };
    setLedger(prev => [entry, ...prev]);
    return true;
  };

  // Sell Retail Inventory from Stall #14B (§6.20)
  const sellStallItem = (sku: string, qty: number) => {
    const item = player.inventory.find(i => i.sku === sku);
    if (!item || item.qty < qty) return;

    sound.cash();
    const revenue = item.retailPrice * qty;
    const profitDelta = (item.retailPrice - item.costPrice) * qty;

    setPlayer(prev => ({
      ...prev,
      cash: prev.cash + revenue,
      inventory: prev.inventory
        .map(i => i.sku === sku ? { ...i, qty: i.qty - qty } : i)
        .filter(i => i.qty > 0),
      restrictedBuckets: {
        ...prev.restrictedBuckets,
        earnedFunds: prev.restrictedBuckets.earnedFunds + profitDelta
      }
    }));

    const entry: LedgerEntry = {
      id: 'tx_sale_' + Date.now(),
      txId: 'TX-SALE-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: `Day ${cityTime.dayNumber}, ${String(cityTime.hour).padStart(2, '0')}:${String(cityTime.minute).padStart(2, '0')}`,
      account: 'EARNED',
      delta: revenue,
      reason: `Retail customer sale: ${qty}x ${item.name} at Stall #14B`,
      refType: 'SALE'
    };
    setLedger(prev => [entry, ...prev]);
  };

  // Apprenticeship Task Completion (F07, §6.5)
  const completeApprenticeTask = (taskName: string, wage: number, xp: number) => {
    sound.cash();
    setPlayer(prev => ({
      ...prev,
      cash: prev.cash + wage,
      skillXp: prev.skillXp + xp,
      skillLevel: prev.skillXp + xp > 300 ? 2 : prev.skillLevel,
      guildRespect: Math.min(5.0, Number((prev.guildRespect + 0.05).toFixed(2))),
      energy: Math.max(10, prev.energy - 15)
    }));

    const entry: LedgerEntry = {
      id: 'tx_wage_' + Date.now(),
      txId: 'TX-WAGE-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: `Day ${cityTime.dayNumber}, ${String(cityTime.hour).padStart(2, '0')}:${String(cityTime.minute).padStart(2, '0')}`,
      account: 'CASH',
      delta: wage,
      reason: `Apprentice task completed: ${taskName} at Nwosu Cobblers`,
      refType: 'WAGE'
    };
    setLedger(prev => [entry, ...prev]);
  };

  // Street food eating
  const eatStreetFood = (cost: number, energyBoost: number) => {
    if (player.cash < cost) return;
    sound.cash();
    setPlayer(prev => ({
      ...prev,
      cash: prev.cash - cost,
      hunger: Math.max(0, prev.hunger - 45),
      energy: Math.min(100, prev.energy + energyBoost),
      vitality: Math.min(100, prev.vitality + 10)
    }));

    const entry: LedgerEntry = {
      id: 'tx_food_' + Date.now(),
      txId: 'TX-FOOD-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: `Day ${cityTime.dayNumber}, ${String(cityTime.hour).padStart(2, '0')}:${String(cityTime.minute).padStart(2, '0')}`,
      account: 'CASH',
      delta: -cost,
      reason: 'Purchased Mama Chinyere Hot Jollof & Goat Meat Bowl',
      refType: 'FOOD'
    };
    setLedger(prev => [entry, ...prev]);
  };

  // Recovery Network & Clinic Care (§6.16)
  const seekMedicalCare = (severity: 'minor' | 'moderate' | 'serious', facility: string, cost: number, isSubsidised = false) => {
    sound.click();
    const finalCost = isSubsidised ? 0 : cost;

    setPlayer(prev => ({
      ...prev,
      cash: Math.max(0, prev.cash - finalCost),
      health: 100,
      vitality: 95,
      energy: 90
    }));

    if (finalCost > 0) {
      const entry: LedgerEntry = {
        id: 'tx_clinic_' + Date.now(),
        txId: 'TX-MED-' + Math.floor(1000 + Math.random() * 9000),
        timestamp: `Day ${cityTime.dayNumber}, ${String(cityTime.hour).padStart(2, '0')}:${String(cityTime.minute).padStart(2, '0')}`,
        account: 'CASH',
        delta: -finalCost,
        reason: `${facility} Treatment (${severity.toUpperCase()}) discharge receipt`,
        refType: 'CLINIC'
      };
      setLedger(prev => [entry, ...prev]);
    }
    closeModal();
  };

  // Resolve Scenario Choice (§6.20)
  const resolveScenarioChoice = (choiceId: string) => {
    if (!activeScenario) return;
    const choice = activeScenario.choices.find(c => c.id === choiceId);
    if (!choice) return;

    sound.cash();
    setPlayer(prev => ({
      ...prev,
      cash: Math.max(0, prev.cash - choice.cost),
      guildRespect: Math.min(5.0, Math.max(1.0, Number((prev.guildRespect + choice.reputationDelta).toFixed(2)))),
      hustleCoins: prev.hustleCoins + choice.coinsReward
    }));

    if (choice.cost > 0) {
      const entry: LedgerEntry = {
        id: 'tx_scen_' + Date.now(),
        txId: 'TX-SCEN-' + Math.floor(1000 + Math.random() * 9000),
        timestamp: `Day ${cityTime.dayNumber}, ${activeScenario.timeString}`,
        account: 'CASH',
        delta: -choice.cost,
        reason: `Scenario Action: ${choice.label}`,
        refType: 'RENT'
      };
      setLedger(prev => [entry, ...prev]);
    }

    closeModal();
  };

  // Send Chat Message (§6.4)
  const sendMessage = (contactId: string, text: string) => {
    sound.click();
    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      threadId: contactId,
      senderId: player.id,
      senderName: player.name,
      text,
      timestamp: `${String(cityTime.hour).padStart(2, '0')}:${String(cityTime.minute).padStart(2, '0')}`,
      isPlayer: true
    };
    setMessages(prev => [...prev, newMsg]);

    // Simulated NPC response after 1.2s
    setTimeout(() => {
      sound.notify();
      const targetContact = contacts.find(c => c.id === contactId);
      const replyMsg: ChatMessage = {
        id: 'msg_reply_' + Date.now(),
        threadId: contactId,
        senderId: contactId,
        senderName: targetContact ? targetContact.name : 'Trader',
        text: `Got your message, ${player.name}. I will hold the stock at the workshop. Send Driver Chidi when you are ready.`,
        timestamp: `${String(cityTime.hour).padStart(2, '0')}:${String(cityTime.minute + 1).padStart(2, '0')}`,
        isPlayer: false
      };
      setMessages(prev => [...prev, replyMsg]);
    }, 1200);
  };

  const transferMoney = (targetPublicId: string, amount: number): { success: boolean; message: string } => {
    if (player.bank < amount) {
      return { success: false, message: 'Insufficient bank balance' };
    }

    sound.cash();
    setPlayer(prev => ({
      ...prev,
      bank: prev.bank - amount
    }));

    const entry: LedgerEntry = {
      id: 'tx_xfer_' + Date.now(),
      txId: 'TX-XFER-' + Math.floor(1000 + Math.random() * 9000),
      timestamp: `Day ${cityTime.dayNumber}, ${String(cityTime.hour).padStart(2, '0')}:${String(cityTime.minute).padStart(2, '0')}`,
      account: 'BANK',
      delta: -amount,
      reason: `Transfer to verified account ${targetPublicId}`,
      refType: 'TRANSFER'
    };
    setLedger(prev => [entry, ...prev]);
    return { success: true, message: `Successfully transferred $${amount.toLocaleString()} to ${targetPublicId}` };
  };

  return (
    <GameContext.Provider
      value={{
        player,
        ledger,
        contacts,
        messages,
        cityTime,
        activeModal,
        activeScenario,
        selectedContact,
        showPhone,
        activePhoneApp,
        togglePhone,
        setActivePhoneApp,
        openModal,
        closeModal,
        openScenario,
        resolveScenarioChoice,
        selectContact: setSelectedContact,
        sendMessage,
        completeOnboarding,
        claimConsumerStipend,
        placeWholesaleOrder,
        sellStallItem,
        completeApprenticeTask,
        collectHustleCoin,
        activateLifeEnhancer,
        seekMedicalCare,
        transferMoney,
        toggleWeather,
        eatStreetFood
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};
