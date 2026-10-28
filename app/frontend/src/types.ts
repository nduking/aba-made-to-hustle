export type Origin = 'faulks' | 'ugwa' | 'gra';
export type PlayerTrack = 'dealer' | 'consumer';

export interface RestrictedBuckets {
  starterFunds: number;     // Registration grant ($500,000)
  consumerIncome: number;   // Daily stipend ($50,000)
  earnedFunds: number;      // Earned from business, wages, contracts
}

export interface InventoryItem {
  sku: string;
  name: string;
  category: string;
  costPrice: number;
  retailPrice: number;
  qty: number;
  qualityGrade: 'A' | 'B' | 'C';
  image: string;
}

export interface Player {
  id: string;
  publicId: string;
  name: string;
  gender: 'male' | 'female' | 'other';
  ageBand: '18-24' | '25-34' | '35+';
  avatarSeed: number;
  origin: Origin;
  track: PlayerTrack;
  cash: number;
  bank: number;
  restrictedBuckets: RestrictedBuckets;
  hustleCoins: number;
  dailyCoinsEarned: number;
  guildRespect: number; // e.g. 4.8 / 5.0
  vitality: number;     // 0 - 100
  hunger: number;       // 0 - 100
  energy: number;       // 0 - 100
  health: number;       // 0 - 100
  skillLevel: number;   // 0 - 4
  skillXp: number;
  inventory: InventoryItem[];
  stallRentPaidDays: number;
  runwayDays: number;
  unclaimedStipends: number; // max 3
  activeEnhancers: { [key: string]: number }; // enhancerId -> expiryTimestamp
  isOnboarded: boolean;
}

export interface LedgerEntry {
  id: string;
  txId: string;
  timestamp: string;
  account: 'CASH' | 'BANK' | 'STARTER_FUNDS' | 'CONSUMER_INCOME' | 'EARNED';
  delta: number;
  reason: string;
  refType: 'GRANT' | 'WAGE' | 'RESTOCK' | 'SALE' | 'CLINIC' | 'STIPEND' | 'RENT' | 'FOOD' | 'TRANSFER';
}

export interface Contact {
  id: string;
  publicId: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  unread: number;
  statusText: string;
  isOnline: boolean;
  canTrade: boolean;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isPlayer: boolean;
  tradeCard?: {
    itemTitle: string;
    amount: number;
    status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
  };
}

export interface WholesaleItem {
  sku: string;
  name: string;
  type: string;
  category: string;
  qualityGrade: 'A' | 'B' | 'C';
  wholesalePrice: number;
  retailSuggested: number;
  moq: number;
  leadTimeHours: number;
  description: string;
  image: string;
}

export interface ScenarioChoice {
  id: string;
  label: string;
  description: string;
  cost: number;
  reputationDelta: number;
  coinsReward: number;
  consequenceText: string;
  survivalRate: number; // percentage
}

export interface ScenarioEvent {
  id: string;
  title: string;
  district: string;
  timeString: string;
  narrative: string;
  image: string;
  choices: ScenarioChoice[];
}
