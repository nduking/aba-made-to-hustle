import { WholesaleItem, Contact, ScenarioEvent } from '../types';

export const WHOLESALE_CATALOG: WholesaleItem[] = [
  // ===== FOOTWEAR (Phase 0 — MVP) =====
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
  },
  {
    sku: "ABA-FW-CHEL-05",
    name: "Crepe-Sole Chelsea Boots (Goodyear Welt)",
    type: "Unisex Smart-Casual",
    category: "Premium Leather",
    qualityGrade: "A",
    wholesalePrice: 15000,
    retailSuggested: 28000,
    moq: 8,
    leadTimeHours: 4,
    description: "Elastic-sided Chelsea silhouette on durable crepe platform. Cross-gender appeal; strong in urban markets.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1VrR-K_ncmQJUYlUdnP9LOBO2mk9uo0vjxpf"
  },

  // ===== GARMENTS / APPAREL (Phase 1) =====
  {
    sku: "ABA-GA-SEN-01",
    name: "Tailored Senator Tunic (Ishi Silk Blend)",
    type: "Mens Traditional Wear",
    category: "Garments",
    qualityGrade: "A",
    wholesalePrice: 8500,
    retailSuggested: 18000,
    moq: 12,
    leadTimeHours: 5,
    description: "Precision-cut Igbo senator top with contrast stitching. Festive season staple; highest margin item for weddings.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1U48bi1Q94i4JdaCG6n0FJPOEKDJTaocMBxS"
  },
  {
    sku: "ABA-GA-ANKA-02",
    name: "Ankara Print Wrap Skirt Set",
    type: "Womens Fashion",
    category: "Garments",
    qualityGrade: "A",
    wholesalePrice: 5500,
    retailSuggested: 13500,
    moq: 20,
    leadTimeHours: 3,
    description: "Bold geometric Ankara wax-print in wrap skirt + matching head-tie. Everyday retail staple with consistent demand.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1VWxlb9Q9CiY90b2tRKQOTWSxiIz7NsrkhP3"
  },

  // ===== LEATHER GOODS (Phase 1) =====
  {
    sku: "ABA-LG-BELT-01",
    name: "Full-Grain Reversible Leather Belt",
    type: "Accessories",
    category: "Leather Goods",
    qualityGrade: "A",
    wholesalePrice: 2800,
    retailSuggested: 6500,
    moq: 30,
    leadTimeHours: 1,
    description: "Reversible black/tan belt, nickel-plated buckle. Essential upsell — pair with any shoe purchase.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1UT9iWm9EKeGjdA94wIzXJC8Zv_TjqY7MIeP"
  },
  {
    sku: "ABA-LG-BAG-02",
    name: "Woven Leather Tote Bag (Market Grade A)",
    type: "Womens Bag",
    category: "Leather Goods",
    qualityGrade: "A",
    wholesalePrice: 9500,
    retailSuggested: 22000,
    moq: 10,
    leadTimeHours: 4,
    description: "Structured woven leather tote with interior divider pockets. Strong impulse buy; low return rate.",
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
  },
  {
    id: "contact_garba",
    publicId: "ABA-2M7K4-RQ5N9",
    name: "Alhaji Garba",
    role: "Northern Tannery Supplier",
    location: "Kano Leather Exchange",
    avatar: "🏭",
    unread: 0,
    statusText: "Grade A hides just arrived from Kano. 500 units ready.",
    isOnline: true,
    canTrade: true
  },
  {
    id: "contact_chi",
    publicId: "ABA-4Z9J2-WL6B8",
    name: "Chi-Chi Fashions",
    role: "GRA Boutique Owner",
    location: "GRA Shopping Complex",
    avatar: "👗",
    unread: 1,
    statusText: "Need 20x Ankara sets for the weekend market. Urgent!",
    isOnline: true,
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
  },
  {
    id: "scenario_back_to_school",
    title: "Day 8 06:00 AM — Back-to-School Demand Surge",
    district: "Ariaria Shoe Plaza",
    timeString: "06:00 AM • Schools Resuming Monday",
    narrative: "Mazi Okonkwo just called: school resumption is Monday, and three competing stalls already placed orders for black school shoes this morning. You have $180,000 available. Pre-order heavy now while supply exists, or wait to see if demand materialises?",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1UV1Ta6jWrhhhYRdLhGM2aKdTLcRQEWkrA52",
    choices: [
      {
        id: "choice_heavy_preorder",
        label: "Pre-order 25 pairs now at $3,500 each ($87,500)",
        description: "Secure full inventory while Mazi still has stock. Pay today, collect tomorrow morning.",
        cost: 87500,
        reputationDelta: 0.3,
        coinsReward: 50,
        consequenceText: "School rush hit hard. All 25 pairs sold out by Wednesday at $12,000 each. $300,000 revenue — best week this month!",
        survivalRate: 100
      },
      {
        id: "choice_light_order",
        label: "Cautious order — 10 pairs only ($35,000)",
        description: "Test demand with a smaller batch. See how they move by Tuesday, then reorder if needed.",
        cost: 35000,
        reputationDelta: 0.1,
        coinsReward: 25,
        consequenceText: "10 pairs sold fast but you ran out of stock Tuesday. Mazi sold the rest to a competitor. Missed $100,000+ in profit.",
        survivalRate: 80
      },
      {
        id: "choice_skip_school",
        label: "Skip — focus on existing stock",
        description: "Your stall already has slides and brogues. Let other dealers handle the school rush.",
        cost: 0,
        reputationDelta: -0.1,
        coinsReward: 5,
        consequenceText: "Foot traffic dropped 40% as buyers went to dealers with school shoes. Opportunity cost: ~$180,000.",
        survivalRate: 60
      }
    ]
  },
  {
    id: "scenario_festive_surge",
    title: "Day 10 — Festive Season Surge Warning (3 Weeks Out)",
    district: "Faulks Road Market",
    timeString: "ADVANCE WARNING • 3 Weeks to Christmas",
    narrative: "Christmas is 3 weeks away. Demand for Senator tunics and Ankara garments surges 200–300% from Dec 15. Capital is limited. Order garments now (cheaper price, 3-week lead time) or wait closer to Christmas when supply is tight but demand is certain?",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1UexhDZ-NPzL8ZZLJaFksuPa7OJBtclsO1q1",
    choices: [
      {
        id: "choice_order_early",
        label: "Pre-order 15 Senator Tunics now at $8,500 ($127,500)",
        description: "Secure inventory 3 weeks early at pre-festive prices. Capital tied up for 2 quiet weeks, then boom.",
        cost: 127500,
        reputationDelta: 0.2,
        coinsReward: 40,
        consequenceText: "Christmas rush hit Dec 15 exactly as forecast. All 15 tunics sold at $18,000 each ($270,000). Pre-festive pricing saved $15,000 vs. late ordering.",
        survivalRate: 100
      },
      {
        id: "choice_wait_last_minute",
        label: "Wait until Dec 12 — buy when demand is certain",
        description: "Save capital now, order closer to Christmas. Suppliers may raise prices or sell out.",
        cost: 0,
        reputationDelta: 0.0,
        coinsReward: 10,
        consequenceText: "Waited too long. Mazi's senior clients took all Grade A stock. Got 8 Grade B units at a higher price. Smaller margin and customers noticed the quality.",
        survivalRate: 65
      },
      {
        id: "choice_diversify_garments",
        label: "Split: 8 tunics + 10 Ankara sets ($100,000)",
        description: "Diversify across garment types. Reduces single-product risk.",
        cost: 100000,
        reputationDelta: 0.15,
        coinsReward: 30,
        consequenceText: "Good hedge! Tunics sold fast; Ankara sets moved slower but shifted by Jan 2. Total revenue $248,000. Risk was spread intelligently.",
        survivalRate: 88
      }
    ]
  },
  {
    id: "scenario_dead_stock",
    title: "Day 12 — Quality Complaint & Dead Stock",
    district: "Stall #14B",
    timeString: "09:30 AM • Customer Dispute",
    narrative: "A customer bought 3 pairs of brogues last week and returned furious — the Goodyear welt on two pairs has separated already. They have receipts and are threatening to post on the market traders group. You have 8 more pairs of this batch in the stall.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1UV1Ta6jWrhhhYRdLhGM2aKdTLcRQEWkrA52",
    choices: [
      {
        id: "choice_full_refund_replace",
        label: "Full refund + replacement pair at cost ($36,000)",
        description: "Honour the full purchase price and give a replacement. Contact Mazi about the defective batch for supplier credit.",
        cost: 36000,
        reputationDelta: 0.4,
        coinsReward: 60,
        consequenceText: "Customer left satisfied and posted a positive review instead! Mazi confirmed defective adhesive batch and offered $18,000 credit on next order. Net cost: $18,000.",
        survivalRate: 100
      },
      {
        id: "choice_repair_offer",
        label: "Send to cobbler for free repair, no cash refund ($8,000)",
        description: "Fix the welt at your cobbler workshop. No cash refund. Some customers accept this.",
        cost: 8000,
        reputationDelta: 0.1,
        coinsReward: 20,
        consequenceText: "Customer accepted repair grudgingly but did not return. You pulled the remaining 8 pairs to inspect — 3 more had the same issue.",
        survivalRate: 70
      },
      {
        id: "choice_deny_returns",
        label: "Refuse — 'All sales final, check the board'",
        description: "Point to your no-returns sign. The shoes were sold as-is.",
        cost: 0,
        reputationDelta: -0.5,
        coinsReward: 0,
        consequenceText: "Customer posted in the Traders WhatsApp group. 12 vendors reshared it. Foot traffic dropped 30% this week. Guild Respect hit hard.",
        survivalRate: 30
      }
    ]
  }
];
