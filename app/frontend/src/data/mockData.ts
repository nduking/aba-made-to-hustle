import { WholesaleItem, Contact, ScenarioEvent } from '../types';

export const WHOLESALE_CATALOG: WholesaleItem[] = [
  {
    sku: "ABA-FW-LOAF-01",
    name: "Italian-Style Burnished Leather Loafers",
    type: "Mens Formal Footwear",
    category: "Leather Craft",
    qualityGrade: "A",
    wholesalePrice: 12500,
    retailSuggested: 24000,
    moq: 10,
    leadTimeHours: 3,
    description: "Handcrafted Italian cut, premium dyed full-grain hide from northern tanneries. Highly sought after by civil servants and merchants.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1U48bi1Q94i4JdaCG6n0FJPOEKDJTaocMBxS"
  },
  {
    sku: "ABA-FW-SLID-02",
    name: "Crepe-Rubber Double-Buckle Slides",
    type: "Unisex Streetwear",
    category: "Vulcanized Rubber",
    qualityGrade: "A",
    wholesalePrice: 6500,
    retailSuggested: 14000,
    moq: 20,
    leadTimeHours: 2,
    description: "Anti-slip vulcanized crepe sole designed for wet asphalt and rainy season puddles. Rapid everyday turnover.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1UT9iWm9EKeGjdA94wIzXJC8Zv_TjqY7MIeP"
  },
  {
    sku: "ABA-FW-BROG-03",
    name: "Goodyear-Welted Executive Brogues",
    type: "Mens Luxury Footwear",
    category: "Premium Leather",
    qualityGrade: "A",
    wholesalePrice: 18000,
    retailSuggested: 36000,
    moq: 5,
    leadTimeHours: 6,
    description: "Double-stitched welted sole with embossed decorative wingtip brogue detailing. High margin flagship item.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1VrR-K_ncmQJUYlUdnP9LOBO2mk9uo0vjxpf"
  },
  {
    sku: "ABA-FW-SAND-04",
    name: "Ariaria Braided Leather Sandals",
    type: "Traditional & Casual",
    category: "Artisan Hand-Weave",
    qualityGrade: "B",
    wholesalePrice: 4800,
    retailSuggested: 9500,
    moq: 25,
    leadTimeHours: 2,
    description: "Traditional braided strap sandals built with reinforced heel straps. Highly popular among student commuters.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1VWxlb9Q9CiY90b2tRKQOTWSxiIz7NsrkhP3"
  }
];

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: "contact_mazi",
    publicId: "ABA-7K4M2-QX9D3",
    name: "Mazi Okonkwo",
    role: "Master Leather Artisan (Ariaria)",
    location: "Shoe Plaza, Sector 4",
    avatar: "👞",
    unread: 1,
    statusText: "Workshop kiln firing now. Bring orders before 12:00.",
    isOnline: true,
    canTrade: true
  },
  {
    id: "contact_chidi",
    publicId: "ABA-9R2B5-KJ7M1",
    name: "Driver Chidi",
    role: "Keke Logistics Hauler",
    location: "Brass Junction Terminal",
    avatar: "🛺",
    unread: 0,
    statusText: "Keke loaded and tarped. Brass Junction road is free.",
    isOnline: true,
    canTrade: false
  },
  {
    id: "contact_amaka",
    publicId: "ABA-3N8T6-VP4X2",
    name: "Nurse Amaka",
    role: "Community Clinic Supervisor",
    location: "Faulks Road Health Center",
    avatar: "🩺",
    unread: 0,
    statusText: "Triage beds open. Subsidised vouchers available.",
    isOnline: true,
    canTrade: false
  },
  {
    id: "contact_adaeze",
    publicId: "ABA-5W1L9-CZ8H4",
    name: "Adaeze Nwosu",
    role: "Boutique Buyer & Reviewer",
    location: "GRA Market Avenue",
    avatar: "✨",
    unread: 0,
    statusText: "Looking for 50 pairs of burnished loafers for my shop.",
    isOnline: false,
    canTrade: true
  }
];

export const SCENARIO_EVENTS: ScenarioEvent[] = [
  {
    id: "scenario_monsoon_flood",
    title: "Day 6 02:00 PM — Tropical Monsoon Surge & Gutter Flood",
    district: "Faulks Road (Stall #14B)",
    timeString: "02:00 PM • Heavy Thunderheads",
    narrative: "Dark charcoal thunderclouds are rolling over Faulks Road. The roadside drainage gutter is rising rapidly toward your stall veranda. You have $320,000 worth of footwear cartons stored near the ground threshold.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1UexhDZ-NPzL8ZZLJaFksuPa7OJBtclsO1q1",
    choices: [
      {
        id: "choice_sandbags",
        label: "Deploy Flood Barrier & Sandbags ($12,000)",
        description: "Hire two street porters to slot cedar floodboards and sandbags into the door threshold. Elevate all stock to upper rafters.",
        cost: 12000,
        reputationDelta: 0.2,
        coinsReward: 35,
        consequenceText: "Zero stock damaged! Sandbags repelled the gutter surge. Porters finished in 15 minutes before the deluge hit.",
        survivalRate: 100
      },
      {
        id: "choice_neighbor_tarp",
        label: "Emergency Blue Tarpaulin Wrap (Free)",
        description: "Quickly wrap shoe cartons in PVC tarpaulins and stack them on plastic crates yourself.",
        cost: 0,
        reputationDelta: 0.0,
        coinsReward: 15,
        consequenceText: "Minor water seepage on the bottom crate (lost 2 pairs of sandals), but 90% of your inventory was saved.",
        survivalRate: 85
      },
      {
        id: "choice_ignore",
        label: "Wait and Hope Rain Misses Your Street",
        description: "Keep selling to passing commuters until the storm starts.",
        cost: 0,
        reputationDelta: -0.3,
        coinsReward: 0,
        consequenceText: "Disaster! Gutter overflowed into the stall. 14 pairs of suede loafers ruined by muddy rainwater ($168,000 loss).",
        survivalRate: 30
      }
    ]
  },
  {
    id: "scenario_brass_junction",
    title: "Day 7 07:15 AM — Brass Junction Taskforce Roadblock",
    district: "Brass Junction",
    timeString: "07:15 AM • Morning Commute",
    narrative: "Driver Chidi's Keke Napep carrying your 50-pair wholesale shoe order has been halted by the Road Transport Union Taskforce demanding transit clearance tokens.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1UV1Ta6jWrhhhYRdLhGM2aKdTLcRQEWkrA52",
    choices: [
      {
        id: "choice_pay_levy",
        label: "Pay Union Transit Levy ($3,500)",
        description: "Pay the official registered transit token directly via mobile transfer. Receive an official stamped receipt slip.",
        cost: 3500,
        reputationDelta: 0.1,
        coinsReward: 20,
        consequenceText: "Roadblock opened immediately! Driver Chidi cleared Brass Junction and arrived at Stall #14B in time for morning shoppers.",
        survivalRate: 100
      },
      {
        id: "choice_detour",
        label: "Instruct Driver to Take Backstreet Detour (Free)",
        description: "Bypass the main junction through unpaved alleys behind Ariaria.",
        cost: 0,
        reputationDelta: 0.0,
        coinsReward: 10,
        consequenceText: "Avoided the checkpoint fee, but the muddy alley caused a 45-minute delay and one flat tyre. Delivery arrived late.",
        survivalRate: 75
      }
    ]
  }
];
