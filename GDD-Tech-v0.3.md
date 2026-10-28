# ABA — MADE TO HUSTLE
## Game Development Document (GDD-Tech) v0.3 — Mobile (iOS + Android)

> Source: Master Project Book v2.2 → v3.0 + Developer/Pitch Blueprint
> Audience: developers, technical artists, producers, QA
> Purpose: convert the design bible into a buildable, testable plan.

### Changelog
**v0.3 (this revision)**
- **Player ID redesigned** to best practice (§6.18): separate internal ID, auth identity, public ID and display name; random, check-digit, non-enumerable public ID.
- **Closed-loop currency** with a **$500,000 registration grant**, restricted-funds buckets and anti-farming rules (§6.19, §7).
- **Two tracks: Dealer/Seller and Consumer**, with Consumer Income (assumption to confirm, D16).
- **Dealer planning scenarios** and a Business Planner (§6.20).
- **Manufacturers** as the supply tier above dealers (§6.21).
- **"Made in Aba" product catalogue** framework and rollout (§6.22).
- Economy (§7) fully rescaled to the new starting capital; new MVP features F19–F23, epics N–Q, decisions D15–D19.

**v0.2**
- **Target platform locked: mobile (iOS + Android).** Added mobile technical spec (§4.7), mobile-adjusted time model, MVP, milestones and spike checklist.
- **New system: Recovery Network (hospital, clinic, pharmacy, ambulance)** — §6.16. Resolves the death-rule contradiction.
- **New system: Hustle Coins + Life Enhancers** — §6.17. A collectible soft currency that powers small, bounded boosts.
- Backlog epics K, L, M added; decision log updated.

---

## 0. Developer Review of the Concept

### 0.1 Verdict
**Strong vision, unusually coherent design, zero engineering decisions made yet.** The design bible is a systems document. It tells us *what the world is*. This document decides *how we build and prove it*. The concept is viable **only** if we ruthlessly cut scope. The design contains roughly 16 interlocking simulation systems; a team that tries to build them in parallel will not ship.

### 0.2 What is strong (keep)
| Strength | Why it matters to production |
|---|---|
| "The city is the character" + NPC routines + shared clock | Gives us a clear simulation backbone (one clock drives everything). |
| Phone = coordination, City = experience | The phone UI is cheap to build compared to world content, and creates gameplay without needing huge maps. |
| Server-authoritative money, escrow, contracts | Correct instinct. Makes the economy testable and exploit-resistant. |
| Crime is not a progression path | Removes the most expensive systems (combat, wanted levels, heavy AI) from the critical path. |
| Recovery principle on every failure | Reduces churn risk and keeps the sim forgiving. |
| "What NOT to build first" list (v3.0 §176) | Correct. We enforce it as a rule in this document. |
| Origin-neighbourhood start | Cheap to implement (a data-driven starting package), high identity value. |

### 0.3 Gaps and contradictions to resolve BEFORE production
| # | Issue | Where | Recommendation |
|---|---|---|---|
| 1 | ~~Target platform undefined.~~ **RESOLVED (v0.2): mobile, iOS + Android.** Remaining work: define the minimum device spec (mid/low-end Android is the real baseline in Nigeria) and the data/battery budgets. | Blueprint §9 | See §4.7. Art, world size, netcode and session length are all designed to the mobile floor. |
| 2 | **Death rule conflict.** v2.2/v2.8 mention "character death under the game's death rules" but never define them, while the Recovery Principle says every failure needs a recovery route. | §14, §115, §173 | Define death as **non-permanent**: hospital recovery, lost time/cash/some items, relationship and job consequences. Permadeath is out of scope. **Resolved in v0.2 — see §6.16 Recovery Network.** |
| 3 | ~~Player ID `ABA-482731` is short and enumerable.~~ **RESOLVED (v0.3).** | §80 | New layered identity and 10-character random public ID with check character: see §6.18. |
| 4 | **Real-money trading** is stated "not assumed" but no enforcement is described. | §58 | Treat as a hard rule: no cash-out, no purchase of in-game cash from third parties; add anti-RMT detection to backlog. **Confirmed in v0.3: the currency is closed-loop (earned and spent in the game only).** |
| 5 | **"Prices respond to supply/demand within controlled ranges"** is unspecified. Unspecified economies are where prototypes die. | §8, §170 | Define price bands + elasticity per item class. **Rescaled to the $500,000 start in §7.** |
| 6 | **MVP lists conflict slightly.** Bank, marketplace and rental appear in the vertical slice (§174) but Blueprint §4 only requires Messages/Maps/Jobs/Bank. | v3.0 vs Blueprint | Lock the MVP in §3 of this document. |
| 7 | **Real-world anchors** (Ariaria, Faulks Rd, stadium, etc.) need verification and rights review. | §4, §166, §179 | Recreate as *inspired-by, fictionalized* districts. Do not model identifiable private businesses. |
| 8 | **Moderation scope** (text chat, group chat, Player ID search) is a live-ops cost, not a feature. | §85–87 | Budget for it from M2. Ship with report/block/mute and rate limits; no public global chat in MVP. |
| 9 | **Source PDF has stray artifacts**: `■cite■turn0search...■` tags and `■` where a currency symbol should be. | v2.3, v2.4 | Clean in the next edit pass; use the chosen currency symbol (D15) consistently in all in-game strings and docs. |
| 10 | **Session/persistence model undefined** (persistent world vs. instances). | Blueprint §8 | Recommendation in §4.2 below. |
| 11 | **$500,000 per account conflicts with "start with almost nothing"** and is a large, repeating faucet (every new account adds money; consumers add more each period). Also an obvious multi-account farming target. | New (v0.3) | Treat as starting *capital*, not wealth; rescale prices (§7); split into restricted buckets (§6.19); Economy Director with inflation guard (§7.3). |
| 12 | **Consumer income undefined** ("gets $50,000…" with no period). | New (v0.3) | Implemented as configurable recurring income; **please confirm** (D16). |
| 13 | **"All products made in Aba" is unbounded** and not yet fully researched. | New (v0.3) | Data-driven catalogue, verified-category gate, phased rollout (§6.22). |

### 0.4 Biggest risks (ranked)
1. **Scope explosion** (16 systems).
2. **Persistent economy exploits** (duplication, collusion, bot farming).
3. **Content cost** of an authentic Aba (art, audio, research).
4. **Netcode + persistence complexity** for a shared world.
5. **Performance on target devices.**
6. **Moderation/safety** of chat and player-to-player deals.
7. **IP/licensing** of real brands and locations.
8. **"Is the life loop fun without missions?"** — the single biggest design risk. Systemic sims often feel empty until density is high. We must prove it early.
9. **Inflation and farming** from fixed grants and recurring consumer income in a closed-loop economy.
10. **Catalogue research and art volume** for "all Aba products".

---

## 1. Product Definition

**Title:** ABA — MADE TO HUSTLE
**Genre:** Multiplayer life / business simulator, open-world, social.
**Pillars (non-negotiable):**
1. **The city is the character** — it runs without the player.
2. **Opportunity comes through people** — not quest markers.
3. **The phone coordinates, the city is experienced.**
4. **Every unit of currency has a source, a path and a sink.**
5. **Fail and recover** — no dead ends.
6. **Crime is not the progression path.**
7. **Authenticity over spectacle** — modern Nigerian urban life, "no fake Africa".

**Core loop:** `WAKE → PHONE → TRAVEL → MEET → WORK/LEARN → EARN → SPEND/SAVE → HOME → TOMORROW`

**Long-term loop:** `LEARN → WORK → EARN → SAVE → BUILD → OWN → EMPLOY → GROW`

---

## 2. Scope Rules (enforced)

- **Rule 1:** Nothing ships in MVP unless it appears in §3.
- **Rule 2:** A system that does not feed another system is cut or deferred (design bible's own "Master Connection" test).
- **Rule 3:** Every feature needs an acceptance test and a metric.
- **Rule 4:** No content scaling before the system is proven (data-driven content only).
- **Rule 5:** Server owns money, items, contracts and time. Client owns presentation only.

---

## 3. MVP (Vertical Slice) — LOCKED SCOPE

### 3.1 World
- **One compact district block** (~400 m x 400 m playable, fictionalized "Faulks-inspired" workshop/commercial street).
- Contents: 1 residential street (starter homes + 1 rental), 1 workshop, 1 small market strip, 1 food vendor/restaurant, 1 bank/ATM point, 1 transport stop (keke route), 1 social/event space, **1 community clinic + 1 pharmacy (Recovery Network)**, **1 NPC manufacturer depot and 1 rentable stall plot**.
- **Population:** 20–40 NPCs with routines; 2–8 simultaneous players initially (target 16–32 after spike).
- Day/night cycle and a simple weather toggle (clear / rain) — rain only affects visuals + one gameplay modifier.

### 3.2 Player-facing features (MUST)
| ID | Feature | Acceptance criteria |
|---|---|---|
| F01 | Character creation (gender, age band, basic appearance) | New player reaches spawn in under 3 minutes, using touch only. |
| F02 | Origin selection (3 of 5 origins in MVP: Ugwa Rd, Faulks Rd, GRA) | Origin sets contacts, home, familiarity and first message (everyone receives the same $500,000 grant). |
| F03 | Starter home + sleep/save | Sleeping advances to next morning and persists state. |
| F04 | Phone: Messages, Contacts, Maps, Jobs, Bank | All five open from home screen and work offline-tolerant. |
| F05 | Player ID + add contact + 1:1 chat | Player A finds Player B by ID and exchanges messages. |
| F06 | NPC dialogue with 1 job/apprenticeship offer | Accepting creates a job record on the server. |
| F07 | One work activity (e.g., supervised workshop task) | Completion pays wage + XP + reputation tick. |
| F08 | Keke transport (NPC driver, fixed fare) | Trip A→B charges fare and moves player. |
| F09 | Food purchase restores hunger/energy | Needs affect work speed in a visible, understandable way. |
| F10 | Cash + bank balance, deposit/withdraw/transfer | Every transfer produces a ledger entry; no negative balances. |
| F11 | Basic skill progression (1 skill: mechanics *or* shoemaking) | Skill level changes available tasks/pay. |
| F12 | Shared clock + NPC routines + opening hours | Shop closed at night; NPCs follow Home→Work→Food→Home. |
| F13 | Player-to-player interaction: 1 simple deal (trade or pay for service) with confirmation screen | Item/amount shown on confirm = item/amount exchanged. |
| F14 | Report / Block / Mute for chat | Blocked player cannot DM. |
| F15 | Save/persistence + reconnect | Disconnect and rejoin restores exact economic/skill state. |
| F16 | Recovery Network: injury/exhaustion → clinic or pharmacy → treatment → discharge | A hurt player always has a path back to play within minutes; cost and time shown before accepting treatment. |
| F17 | Hustle Coins: collect in the city, spend on 3 Life Enhancers | Coins earned/spent via a server ledger; enhancers have visible duration, cap and cooldown. |
| F18 | Mobile controls + app lifecycle (background, resume, network drop) | Player is never harmed or robbed while backgrounded; resume restores state within 5 s on a typical connection. |
| F19 | Track selection (Dealer/Seller or Consumer) + $500,000 Starter Funds via the ledger | Grant credited once per verified account; restricted-bucket rules enforced. |
| F20 | Consumer Income claim ($50,000 per period, per D16) | Claimable, stackable to a cap, no penalty for missing days; non-transferable. |
| F21 | Dealer loop: Planner → purchase order to NPC manufacturer → receive/inspect stock → price at a stall → sell to NPC and player consumers → post-mortem | A new dealer completes one full cycle in 2–3 sessions and understands why they profited or lost. |
| F22 | One planning scenario (e.g., back-to-school or rainy-season slowdown) with advance warning | Warning appears 3–7 in-game days ahead; at least 3 sensible responses exist; no unrecoverable outcome. |
| F23 | New Player ID system (public ID, check character, exact-match lookup, rate limits, QR/deep-link share) | Passes the §6.18 acceptance tests. |

### 3.3 Explicitly OUT of MVP
Loans/credit, vehicle ownership, property purchase/development, player-run manufacturing, full production chains, the full product catalogue (data in, art phased), police/crime systems, large events, group chat, marketplace listings (beyond one simple trade), education institutions (apprenticeship only), advanced weather, power/infrastructure sim, dealerships, hotels beyond a single set-piece.

---

## 4. Technical Architecture & Stitch Implementation

### 4.1 Engine and stack (recommendation, to be confirmed by the Week 1–3 spike)

| Layer | Primary recommendation | Alternative |
|---|---|---|
| Engine | **Unity (URP, IL2CPP, 64-bit)** — the strongest mobile track record, lower hardware floor, large talent pool, Addressables for streaming | Unreal Engine 5 is **not recommended** for this scope: heavier on low/mid Android, bigger builds, higher thermal load |
| Mobile Web Prototype / Companion | **React 18 + Vite + TypeScript** implementing the Stitch Design System tokens | Progressive Web App (PWA) / Capacitor wrapper for instant device playtesting |
| Netcode | Dedicated authoritative server using **Netcode for GameObjects / Fish-Net / Mirror** (pick in spike) | Photon Fusion (faster to prototype, ongoing cost) |
| Backend services | **FastAPI / Go / Nakama** (open-source: accounts, chat, storage, matchmaking) | Fully custom .NET services |
| Database | **PostgreSQL** (ledger, accounts, contracts) | — |
| Cache/realtime | **Redis** (presence, rate limits, session state) | — |
| Hosting | Containerized game servers (Docker) on a cloud provider with a **Lagos/West-Africa-proximate region** if available; otherwise Europe/Cape Town and measure latency | — |
| Analytics | Event pipeline (PostHog/GameAnalytics or custom) | — |
| CI/CD | GitHub Actions / GitLab CI, automated builds + headless server tests | — |

> **Decision gate D1 — platform: DECIDED (mobile, iOS + Android).** Still open: exact minimum device spec (see §4.7), to be confirmed on real low-end devices in the spike.

### 4.2 World and session model
- **MVP:** single persistent *shard* (one server instance = one district). Player/economic state persisted in DB; world sim state persisted at coarse checkpoints.
- **Later:** multiple shards of the same district (population cap) with shared global economy services (ledger, contracts, chat, player ID) separated from per-shard simulation.
- **Offline persistence rule (from design):** "important world states survive absence." Implementation: persist business state, contracts, ledger, inventory; **do not** persist transient NPC positions — regenerate from clock + routine on load.

### 4.3 Authority model
| Domain | Authority |
|---|---|
| Money, items, contracts, skills, reputation | **Server only** |
| Time/clock, weather, NPC schedules | Server (deterministic from seed + clock) |
| Player movement | Client-predicted, server-validated |
| NPC positions near players | Server sim, replicated by interest management |
| UI/phone presentation | Client |

Client never sends "I have $X". It sends **intents** (`BuyItem(shopId, itemId, qty)`); server validates and replies with the result.

### 4.4 Simulation tick design
- **Fixed server tick** (start at 20–30 Hz for movement; economy and NPC "decision" ticks much slower, e.g. 1 Hz / per game-minute).
- **Simulation LOD** (matches design §15.14):
  - **LOD0 (near players):** full pathfinding, animation, interactions.
  - **LOD1 (mid):** simplified movement along waypoints.
  - **LOD2 (far):** no physical agent; NPC state computed as "where should they be at time T" from schedule.
- **Interest management:** replicate only entities within player range; always replicate critical events (contracts, payments).

### 4.5 Time model (proposal — tune in playtests)
- **Mobile session design:** a typical session is **10–20 real minutes** ("a hustle run"): check phone → 1–2 tasks → collect coins → end on a clear tomorrow hook.
- 1 in-game day ≈ **24 real minutes** (≈12 day / 12 night) so one session usually shows a meaningful part of the city's rhythm. Tune in playtests.
- **Offline rule:** when the app is closed or backgrounded >2 min, the character is moved to a **safe state** (resting at home or last safe indoor spot). Players cannot be harmed, robbed or fined while offline. The *city* and persisted business/contract states keep advancing.
- Sleep can fast-forward the *player's* experience but must not desync the shared server clock; sleeping players are "resting" in-world rather than skipping server time.
- District rhythms (morning commute, market peak, evening social) driven by a data table keyed to the clock.

### 4.6 Core services (backend)
```
Auth/Account  → Player Profile → Player ID service (Crockford Base32 + Check Digit)
Ledger Service (double-entry, idempotent, restricted buckets)
Inventory Service
Contract/Escrow Service
Chat Service (1:1 first; groups later) + Moderation hooks
Jobs/Opportunity Service
World Sim Service (clock, weather, business states, events)
Persistence Service (checkpoints)
Telemetry/Anomaly Detection & Economy Director
```

### 4.7 Mobile Technical Specification (iOS + Android)

> All numbers are **starting targets**, to be validated on real devices in the M0–M2 spike.

**Device tiers (auto-detected, user-adjustable)**
| Tier | Example target | Quality profile |
|---|---|---|
| Low (design floor) | Android 9+, 3 GB RAM class, entry GPU (Mali-G52 / Adreno 610 class); iPhone 8-class | 30 FPS, low draw distance, simplified NPC crowd, baked lighting, lower texture res |
| Mid | Mainstream 4–6 GB RAM Android; iPhone XR/11-class | 30 FPS stable, more NPCs, better shadows |
| High | Recent flagship Android; iPhone 13+ | 60 FPS option, richer crowds/effects |

**Performance budgets (Low tier, starting targets)**
- Frame rate: **30 FPS stable** (no 60 FPS promise on Low).
- Memory: aim for **≤ ~1.5 GB** total process memory on the Low tier.
- Draw calls: target **≤ 250** per frame; aggressive batching/GPU instancing, occlusion culling, LOD chains.
- NPCs: **LOD0 near-player cap** (e.g., 10–15 fully animated), others as simplified agents or schedule-only.
- Thermal/battery: playable for 20+ minutes without thermal throttling on mid devices; offer a "Battery Saver" mode (30 FPS cap, reduced effects).

**Rendering and assets**
- Unity URP, baked lighting where possible, light-probe/reflection-probe tricks, simple real-time shadows only near the player.
- ASTC texture compression, atlasing, trim sheets, shared materials, mesh LODs, strict poly budgets.
- **Modular kit** for buildings (concrete frontages, signage, generators, keke, motorcycles) — authenticity through many small details rather than heavy geometry.
- Asset streaming via **Addressables** by district tile; keep the main interactive area small and dense.

**Build and download size**
- Initial install target: **≤ 200 MB**, with additional content streamed on first run (important for data-constrained players and for store/cellular download limits).
- Delta patching; district packs downloaded on demand; Wi-Fi-only option for large downloads.

**Controls (touch-first)**
- Landscape gameplay (recommended); left virtual stick for movement, right-side drag for camera, one **context-sensitive action button** (talk / enter / collect / use).
- **Tap-to-travel from the Map app** with auto-walk to waypoints to reduce thumb fatigue.
- Large touch targets, one-handed-friendly phone UI, haptic feedback for key moments (payment received, coin collected), accessibility options (text size, colour contrast, left-handed layout).
- Optional controller support later; not in MVP.

**Networking on mobile**
- **Mobile-realistic network assumptions**: latency swings, packet loss, Wi-Fi ↔ cellular handoffs, brief signal drops. Test with a network-condition simulator in CI.
- Server tick for movement ~**10–15 Hz** with client interpolation and prediction; economy/NPC decision ticks much slower.
- **Low Data Mode**: reduced replication rate and voice/image features off; target **≤ ~10 MB/hour** average.
- **Resilient reconnect**: preserve session for a short window; resume to the same safe state; all money/inventory intents are idempotent so retries cannot duplicate.
- Interest management radius smaller than on PC; typical shard cap 16–32 concurrent players in the first slice.

**App lifecycle**
- Backgrounding, phone calls, lock screen, low-memory kills and app updates must never corrupt state or leave a vulnerable character in the world (see offline rule in §4.5).
- Save on every important transaction (server-side), not just on exit.

**Notifications (opt-in, restrained)**
- Map a small number of real events to push notifications: a rent reminder, a job reply, a payment received, a contract delivered. **Max ~2 per day**, user-controllable. No manipulative "come back now" patterns.

**Store and platform compliance (plan from the start)**
- Apple App Store / Google Play: user-generated content moderation (report, block, mute), account deletion in-app, privacy disclosures, age rating, and in-app purchase rules if any purchases are added later.
- No real-money trading; coins non-transferable (§6.17).
- Region/legal review for Nigeria and any other launch markets (data protection, consumer rules).

---

### 4.8 Stitch Design System & UI Specifications (Aba Hustle System)

The visual design system bridges raw street enterprise with precision financial telemetry. Developed in Stitch under project `projects/13284045748325786896`, the system delivers a tactile, industrial brutalist aesthetic configured specifically for mobile ergonomics.

#### 4.8.1 Design System Metadata & Tokens
- **Project ID**: `13284045748325786896`
- **Project Name**: `projects/13284045748325786896`
- **Design System Asset**: `assets/1a2babdb80014d95a4bf685bf39129ae` (*Aba Hustle System*)
- **Color Mode**: Dark / High Contrast Industrial
- **Corner Profiles**: Compact engineered corner radius (`4px` base / `0.25rem`, modals `8px` / `0.5rem`). No rounded pills for interactive cards.

#### 4.8.2 Color Palette & Semantic Roles
| Token | Hex Value | Semantic Role & UI Application |
|---|---|---|
| `surface` / `background` | `#121316` | Deep Asphalt canvas; phone OS bezel and base screen underlay |
| `surface-container-low` | `#1B1B1F` | Recessed fields, input backgrounds, and table cell backdrops |
| `surface-container` | `#1F1F23` | Default card surfaces, workshop modules, negotiation terminals |
| `surface-container-high` | `#292A2D` | Active elevated modals, contextual trading trays, bottom sheets |
| `surface-container-highest` | `#343538` | Floating tooltips, dropdown menus, and active selection pills |
| `primary` / `primary-container` | `#F59E0B` (`#FFC174`) | Market Gold / Ochre; primary calls-to-action, volume badges, milestone markers |
| `secondary` / `secondary-container` | `#10B981` (`#4EDEA3`) | Emerald Ledger; liquidity, positive deltas, verified enterprise seals |
| `tertiary` / `tertiary-container` | `#F97316` (`#FFBE9D`) | Industrial Rust; hazard warnings, spoilage alerts, rush negotiation timers |
| `error` / `error-container` | `#FFB4AB` (`#93000A`) | Red alert, dispute triggers, failed validation, debt overdue |
| `outline` / `outline-variant` | `#A08E7A` (`#534434`) | 1px structural borders, mechanical division lines, grid rules |
| `on-surface` | `#E3E2E6` | High-contrast body typography, clear readability in harsh sunlight |
| `on-surface-variant` | `#D8C3AD` | Subtitles, SKU metadata, helper labels, timestamps |

#### 4.8.3 Typography Hierarchy
| Token | Font Family | Size / Line Height | Weight / Tracking | Usage |
|---|---|---|---|---|
| `display-lg` | Space Grotesk | 36px / 44px | 700 (-0.02em) | District banners, splash headers |
| `display-lg-mobile` | Space Grotesk | 28px / 34px | 700 (-0.01em) | Mobile screen hero headers |
| `headline-lg` | Space Grotesk | 24px / 30px | 700 (-0.01em) | Screen titles, trade scenario titles |
| `headline-md` | Space Grotesk | 20px / 26px | 600 (normal) | Section heads, modal titles |
| `headline-sm` | Space Grotesk | 16px / 22px | 600 (normal) | Card headers, workshop item titles |
| `body-lg` | Hanken Grotesk | 16px / 24px | 400 (normal) | Narrative dialogues, scenario briefings |
| `body-md` | Hanken Grotesk | 14px / 20px | 400 (normal) | Standard body text, contract terms |
| `body-sm` | Hanken Grotesk | 12px / 16px | 400 (normal) | Compact metadata, helper notes |
| `label-ledger` | JetBrains Mono | 15px / 20px | 600 (-0.01em) | Bank balances, currency deltas, prices |
| `label-sku` | JetBrains Mono | 11px / 14px | 700 (+0.06em) | SKU identifiers, batch stamps, tags |
| `label-caption` | JetBrains Mono | 10px / 12px | 500 (+0.04em) | Status timestamps, check-digits, coordinates |

#### 4.8.4 Mechanical Depth & Layout Rules
- **Tactile Edge Highlights:** Elevated cards feature a 1px top interior highlight (`rgba(255, 255, 255, 0.08)`) and an offset bottom edge shadow (`#0A0B0D`), evoking machined hardware. Active presses translate down by 1px while neutralizing the top highlight.
- **Mobile Density Grid:** 4-column fluid layout with `1rem` outer canvas padding and `0.75rem` internal gutters. The bottom 88px of the viewport is reserved for tactile OS navigation docked above system gestural bars.
- **Numbers & Ledgers:** Tabular lining numerals enforce fixed width across real-time value changes to eliminate layout shifts during price updates. Balance deltas flash in `#10B981` (profit) or `#EF4444` (loss) for 400ms before resting in neutral slate.

---

### 4.9 Stitch Screen Matrix & Interactive Flows

All core MVP flows and dealer scenarios have been designed and validated in the Stitch Project (`projects/13284045748325786896`).

#### 4.9.1 Core System Screens (MVP Vertical Slice)
| Screen Title | Screen ID | Spec References | Key Implemented Features |
|---|---|---|---|
| **Character Onboarding, Origin & Track Selection Flow** | `projects/13284045748325786896/screens/636dee129a6f41cdbbc039e8727774f6` | F01, F02, F19, §6.18, §6.19 | Origin selection (Faulks Rd, Ugwa Rd, GRA), Dealer vs Consumer track selection, $500,000 grant credit, Crockford Base32 ID generation (`ABA-7K4M2-QX9D3`). |
| **Hustle Coins & Life Enhancers Hub** | `projects/13284045748325786896/screens/bb9a9f28729b47f0a48545e9edffe523` | F17, §6.17, Epic L | Soft currency ledger (75 HC, 100 HC daily cap), 3-Goal Daily Hustle Board, Life Enhancer store (Chop & Chill, Second Wind, Quick Recovery, Focus). |
| **Consumer Track Lifestyle & Income Hub** | `projects/13284045748325786896/screens/27fa1f99ef914ebe96e55c2546d09593` | F20, §6.19, D16 | Civilian Stipend Terminal ($50,000 / Period, 3-stack max), Vitality & Hunger Needs meters, Made in Aba Retail Marketplace & Review System. |
| **Recovery Network & Community Clinic** | `projects/13284045748325786896/screens/ac3b1b150243478db1a4cd7b59b39e58` | F16, §6.16, Epic K | Triage severity ladder, Pharmacy fast-lane, Clinic ward, Ambulance dispatch status, Subsidised Care voucher / interest-free repayment plan. |
| **Business Planner & Ledger Review** | `projects/13284045748325786896/screens/91a73aed5e0740cb833a7f0717f3331d` | F21, §6.20, P1 | Cash-flow runway calculator, inventory cover days, demand forecasting bands, unit margin tester, supplier comparison matrix. |
| **Post-Mortem Dealer Ledger Review** | `projects/13284045748325786896/screens/46f493599fd94797b6d2a9db5bb6177c` | F21, §6.20, P5 | Cycle post-mortem, revenue vs COGS, spoilage audit, what-if alternative decision analysis, net profit delta. |
| **Made in Aba Wholesale Market & Footwear Manufacturer** | `projects/13284045748325786896/screens/643bd5a011844e52bf31056aa040bc27` | §6.21, §6.22, Q7 | Supplier catalogue, MOQ volume tiers, lead-time tracker, quality-grade batch selection, escrow purchase order creation. |
| **1:1 Chat & Player Contacts** | `projects/13284045748325786896/screens/491876389d5b48bfb594b840202c22c0` | F05, F14, §6.4 | Exact-match lookup, check-digit validation, 1:1 encrypted thread, Report / Block / Mute controls, trade intent cards. |
| **City HUD & Street Rhythm** | `projects/13284045748325786896/screens/aaa9f4b0e73245469b4bee79859dafc3` | F12, F18, §4.5 | 24-minute day/night telemetry, dynamic weather status, mini ledger top-bar, context action button, phone notification drawer. |

#### 4.9.2 Dealer Planning & Operational Scenario Screens (Day 6 & Day 7 Simulation)
| Scenario Stage / Time | Screen ID | Narrative Event & Mechanics |
|---|---|---|
| **Day 6 06:00 AM — Ariaria Restock** | `projects/13284045748325786896/screens/b6b4b30c797d45c8adc83695068987d2` | Dawn wholesale expedition into Ariaria leather artisans cluster; physical inspection of master cobbler loafers and crepe-sole slides. |
| **Day 6 11:30 AM — Arbitrage Negotiation** | `projects/13284045748325786896/screens/4cc6e7133eed4bb8a467741179e88b1e` | Volume discount bargaining with artisan guild leader; payment terms selection (prepay discount vs 7-day trade credit). |
| **Day 6 02:00 PM — Storm Warning** | `projects/13284045748325786896/screens/8d4a7af7f6f94fbaa3ea47262ef2b4fe` | Tropical monsoon alert at Stall #14B; urgent flood barrier setup, wooden surge plank deployment, sandbag stacking. |
| **Day 6 02:45 PM — Torrential Downpour** | `projects/13284045748325786896/screens/5e963703a80c4e258329757bd861fb88` | Gutter overflow stress test; inventory shelf elevation, tarpaulin seal verification; water damage prevention checks. |
| **Day 6 04:30 PM — Post-Storm Reopening** | `projects/13284045748325786896/screens/ca7e00d65bb24ed993dc306fe1e280b6` | Water drainage, wooden plank pedestrian walkways, dry stock re-display, commuter foot-traffic capture. |
| **Day 6 06:30 PM — Evening Audit** | `projects/13284045748325786896/screens/8c87b0b12b214332af121867f4d80821` | Daily revenue reconciliation, cash vs bank drawer tally, rent reserve allocation, next-day demand forecast. |
| **Day 7 07:15 AM — Brass Junction Roadblock** | `projects/13284045748325786896/screens/254c2e478afd44a295dd9605e578a5fd` | Keke delivery transit delay; transport union taskforce checkpoint, transit levy resolution vs alternate route bypass. |
| **Day 7 08:00 AM — Cargo Arrival & Unboxing** | `projects/13284045748325786896/screens/03f7435d330a4fbc90874736039e07f1` | Stall #14B stock delivery receipt; unboxing, barcode SKU tagging, quality grade triage, display pricing. |
| **Day 7 08:30 AM — Commuter Rush Haggling** | `projects/13284045748325786896/screens/69e54b3cfab04bc4a7a46d3a6eb5af1e` | Peak morning pedestrian bargaining; multi-customer negotiations, bundled upsells, quick mobile transfers. |
| **Day 7 02:00 PM — Secondary Flood Defense** | `projects/13284045748325786896/screens/eac12552dcb842138723a4f04c4a6275` | Consecutive day rain defense; elevated rafter storage, mutual aid cooperation with neighboring shopkeepers. |
| **Hazard Resolution — In-Transit Event** | `projects/13284045748325786896/screens/8b3bb0adaf6540509db466604ffe91ac` | Transport breakdown incident; driver hire assistance, cargo transfer to backup keke, delivery deadline grace window. |


## 5. Data Model (core entities)

> Names are indicative. All IDs are server-generated UUIDs unless stated.

```
Player            { player_uuid (UUIDv7, internal), public_id (unique, immutable, 10 chars), display_name, discoverability, created_at, origin, track(Dealer|Consumer), track_changed_at, appearance, last_seen }
AuthIdentity      { id, player_uuid, provider(Apple|Google|Phone|Email), subject_hash, linked_at, device_attestation }
PublicIdTombstone { public_id, retired_at, reason }                      // IDs are never reused
PlayerState       { player_id, location, needs{energy,hunger,hygiene,health,mood}, home_id }
Wallet            { player_uuid, cash_minor, bank_minor, buckets{starter_funds_minor, consumer_income_minor, earned_minor} }   // integer minor units; no floats
LedgerEntry       { id, tx_id, account_id, delta_minor, reason, ref_type, ref_id, ts }  // double-entry
Transaction       { id, type, state(Pending|Completed|Failed|Disputed|Reversed), idempotency_key, ts }
Skill             { player_id, skill_id, level, xp }
Reputation        { subject_id, dimension, value, sample_count }
Relationship      { a_id, b_id, level, history_events[] }          // NPC<->player or player<->player
ItemDef / ItemInstance { def_id | id, owner_id, location, qty, quality, condition }
Job / Employment  { id, employer_id, worker_id, role, wage, schedule, status }
Contract          { id, parties[], terms{}, price_minor, deposit_minor, deadline, state, escrow_id }
Escrow            { id, contract_id, amount_minor, state(Held|Released|Refunded|Disputed) }
Business          { id, owner_id, type, state, hours, stock[], cash_account_id, reputation }
Property          { id, owner_id, type, location, rent_minor, tenant_id, condition }
Message           { id, thread_id, sender_id, body, ts, flags }
Event             { id, type, size, location, start, end, demand_modifiers }
Facility          { id, type(Pharmacy|Clinic|Hospital|Ambulance), quality, capacity, queue, price_band, district }
HospitalVisit     { id, player_id, facility_id, severity, admitted_at, discharge_at, cost_minor, payment_state(Paid|Plan|Subsidised), plan_id }
InjuryState       { player_id, severity(None|Minor|Moderate|Serious|Critical), cause, started_at, recovery_ends_at }
CoinWallet        { player_id, balance, earned_today, lifetime_earned }      // soft currency, NOT the main currency
CoinLedgerEntry   { id, player_id, delta, source|sink, ref_id, ts }          // same append-only rules as the main currency ledger
EnhancerDef       { id, effect, magnitude, duration, cooldown, daily_cap, cost_coins }
ActiveEnhancer    { player_id, enhancer_id, expires_at }
CoinSpawn         { id, location_tag, respawn_rule, claimed_by[], next_available_at }
Product           { product_id, category, type, made_in_aba, research_status(Verified|Candidate), producing_cluster }
Sku               { sku, product_id, variants{}, quality_grades[], brand_id(fictional), bom{}, price_band{wholesale,retail}, demand{base,season_tags,weather_tags}, shelf_life_days }
Manufacturer      { id, npc|player_owner, lines[], capacity_per_day, moq, lead_time, reliability, payment_terms, location, returns_policy }
PriceList         { manufacturer_id, sku, volume_tiers[{qty,price_minor}], valid_from, valid_to }
PurchaseOrder     { id, dealer_id, manufacturer_id, lines[], contract_id, escrow_id, status, ready_at, delivered_at }
Stall             { id, owner_id, location, rent_minor, rent_cycle, stock[], opening_hours, reputation }
ScenarioTemplate  { id, trigger_conditions, warning_lead_days, options[], consequences[], recovery_paths[] }
ScenarioInstance  { id, template_id, player_id, started_at, decision_log[], outcome, post_mortem }
PlannerSnapshot   { player_id, ts, cash, runway_days, stock_cover_days, forecast_ranges{} }
```

**Non-negotiables**
- Money stored as **integer minor units (cents)**, never floating point.
- **Double-entry ledger:** every movement has two sides; sum of all deltas per transaction = 0. System accounts exist for "money entering" (wages from NPC economy) and "money leaving" (sinks), which makes the design rule *"every unit of currency has a reason it entered, moved and left"* **auditable**.
- **Idempotency keys** on every money/item intent (prevents duplication on retry/lag).
- **Append-only audit log** for contracts, escrow and disputes.

---

## 6. System Specifications (MVP depth + future hooks)

### 6.1 Character, Origin
- Origin = **data-driven starting package**: `{home_template, 2–3 contacts, supplier_discounts, first_message_id, familiarity_modifiers}`. **Cash is the same for everyone ($500,000, §6.19).** No permanent class lock.
- Interview-style creation questions map to small modifiers (e.g., a starting skill XP nudge), tested for balance so no origin is strictly best.

### 6.2 NPC system
- **Role-based routine tables** (Trader, Worker, Driver, Learner, Resident) as data assets — schedule entries `{time_window, location_tag, activity}`.
- **Opportunity NPCs ("Connectors")** hold dialogue graphs with conditions (time, reputation, skill) and can offer jobs.
- **Memory:** limited to meaningful events (a small ring buffer per important NPC–player pair: helped, cheated, paid late, introduced).
- Relationship levels from design: Stranger → Acquaintance → Contact → Trusted → Partner; negative: Cautious → Distrustful → Avoided. Store as integer score with thresholds, not a state machine.

### 6.3 Phone
- Implement as a **data-driven app framework**: each app is a screen set + a service API client. Apps unlock via flags.
- MVP: Messages, Contacts, Maps, Jobs, Bank.
- UX rule from design: every screen answers *What happened? Why does it matter? What can I do? What happens next?* Minimal badges, calm Nigerian-feeling visual identity.
- **Opportunity ranking** (post-MVP): score = f(distance, skill fit, reputation, schedule, relationship, demand).

### 6.4 Chat + Player ID
> **Stitch Implementation Reference:** See Screen `projects/13284045748325786896/screens/491876389d5b48bfb594b840202c22c0` (*1:1 Chat & Player Contacts*).

- Player identity follows the layered model in **§6.18** (internal UUID, auth identity, public ID, display name).
- 1:1 chat first. Persisted server-side; rate-limited; profanity/spam filter hook; report captures last N messages.
- DM privacy modes: Everyone / Contacts & People Met / Nobody.
- "People met" is recorded when two players interact in proximity (server event).
- Group chat, communities → post-MVP (moderation cost).

### 6.5 Skills, Jobs, Apprenticeship
- Skills: level 0–4 (Beginner→Expert) with XP curve; each task has `{skill_required, xp_gain, base_pay, duration, quality_formula}`.
- MVP job = **timed/mini-interaction task** (not a long idle loop): e.g., "diagnose → fetch part → fit → inspect". Quality derived from player actions + skill, giving feedback from the owner NPC.
- Apprenticeship progression from design maps to employment tiers; wage and task access change with tier.
- Task design target: **30–120 seconds of active play per task**, to avoid chore feel.

### 6.6 Economy
- **Sources (faucets):** wages (NPC-employer budgets), NPC customers, NPC supplier sell-backs, events.
- **Sinks:** food, transport, rent, shop purchases, maintenance, taxes/fees, medical.
- **Controls:**
  - Every faucet has a **per-day cap** per player (diminishing returns after cap) in MVP.
  - Price bands: `price = base × clamp(demandFactor × distanceFactor × qualityFactor × eventFactor, min, max)`, with max drift per game-day.
  - Telemetry dashboard: money supply, velocity, median wealth, Gini, top sources/sinks per day.
- **Starting balance principle (revised):** with $500,000, a new player *can* make a meaningful Day-1 decision (what to stock, what to buy). Scarcity comes from limited capital relative to prices and from time, not from poverty. See §6.19 and §7.

### 6.7 Banking (MVP-lite)
- Cash + Bank balances, deposit/withdraw at ATM/branch, transfer by Player ID.
- Transaction states exactly as designed: Pending / Completed / Failed / Disputed / Reversed.
- **Confirmation screen** shows recipient name + Player ID + exact amount; large transfers get extra friction (cooldown/second confirm).
- Loans, savings interest, business accounts → Phase 4+.

### 6.8 Marketplace, Contracts, Escrow (Phase 4)
- State machine from design: `Draft → Proposed → Accepted → Funded → In Progress → Delivered → Confirmed → Completed` + failure states.
- Escrow only above a value threshold or for flagged categories (vehicles, rentals, bulk orders).
- **Trade preview invariant:** what the player confirmed == what the server executes; any change invalidates the confirmation.
- Dispute MVP: select reason → server checks contract state + delivery confirmation → deterministic outcome table → optional human review queue later.
- Bad-faith dispute penalty included from day one to prevent weaponization.

### 6.9 Transport
- MVP: NPC keke on fixed routes with fare table. Next: player-driven keke/okada (passengers + delivery), then vans/pickups.
- Traffic: start as **spline-based NPC vehicles with density by time of day**, not full physics traffic. Congestion modifies travel-time multiplier used by fares and delivery deadlines.

### 6.10 Inventory & Production (Phase 4–5)
- Item instances with quantity, quality grade, owner, location (home/workshop/vehicle).
- First production loop (design §44): **one fictional footwear workshop**, one supplier, one delivery route, one retail buyer.
- Quality = f(material grade, worker skill, tool, process choice). Poor quality → rework/discount, never hard-fail.

### 6.11 Property (Phase 5)
- Rent a unit, pay rent on a schedule, warnings before due, grace period, eviction → recovery path (temporary shelter/cheap room), not a dead end.
- Landlord role for players after marketplace + contracts exist.

### 6.12 Health & Needs
- Needs: energy, hunger, hygiene, health, mood, sleep. **Rule:** needs modify efficiency (work speed, pay quality) rather than killing the player in MVP. Hard consequences (injury/hospital) arrive with Safety (Phase 6).
- Tuning goal: a typical player spends **<10% of time** on need management.
- Needs, injury and recovery are connected through the **Recovery Network (§6.16)**: extreme exhaustion or an accident sends the player there; mild fatigue is handled with food, sleep or a Life Enhancer (§6.17).

### 6.13 Safety & Law (Phase 6 — deliberately late)
- Start with **accidents + hospital recovery + report/block**, not a policing simulation.
- Crime: if included at all, kept low-reward and high-consequence (design rule). Minimal enforcement: witness → report → fine/detention timer → reputation cost.
- Death: **no permadeath.** A *Critical Collapse* leads to emergency transport and treatment through the Recovery Network (§6.16).

### 6.14 Events & Entertainment (Phase 7)
- Event = a **data object** that applies `demand_modifiers` to categories (transport, food, hotels, photography…) within a radius/time window and spawns NPC crowds.
- First event: a football-viewing night or a wedding at the social venue.

### 6.15 Weather & infrastructure
- Weather: 2–3 states with economic modifiers only (traffic, delivery difficulty, foot traffic). Power cuts/generators come after core economy works (they are an opportunity generator, but also content-heavy).

### 6.16 Recovery Network — Hospital, Clinic, Pharmacy, Ambulance (NEW)
> **Stitch Implementation Reference:** See Screen `projects/13284045748325786896/screens/ac3b1b150243478db1a4cd7b59b39e58` (*Recovery Network & Clinic*).

**Purpose:** give every injury, accident and burnout a believable, *playable* way back. It makes consequences meaningful (cost, time, relationships) without ever ending a character's life in the game. It also creates jobs and city life: nurses, pharmacists, ambulance drivers, medical suppliers.

**Design rules**
1. **No permadeath. No dead ends.** Every state leads to a facility.
2. **Cost and time are shown before the player accepts treatment.**
3. **A player with $0 can always recover** (subsidised path or payment plan).
4. **Mobile-friendly durations:** recovery should take **seconds to a few minutes of real time**, not hours. Players can keep doing low-effort things (chat, banking, phone) while recovering.
5. Recovery is *never* a place where the player is trapped, robbed or harassed by other players (safe zone).

**Severity ladder**
| State | Typical causes | Effects | Where to recover |
|---|---|---|---|
| Healthy | — | Normal | — |
| Tired / Unwell | Low energy/hunger/hygiene for too long | Reduced work speed and mood | Food, sleep at home, pharmacy, Life Enhancer |
| Minor injury | Small workshop mishap, minor fall | Small efficiency penalty | Pharmacy (fast, cheap) |
| Moderate injury | Keke/okada collision, workshop accident | Some tasks locked, slower movement | Community clinic |
| Serious injury | Major collision, severe accident | Cannot work or drive; needs bed rest | Clinic or hospital |
| **Critical Collapse** | Severe accident or neglected health reaching zero | Player collapses; emergency response is triggered | Ambulance → hospital |

**Facilities (all fictional in-game names; real facilities are inspiration only)**
| Facility | Role | Cost | Speed | Notes |
|---|---|---|---|---|
| Pharmacy | Minor injury, tiredness, medicines | Low | Instant–1 min | Early-game safety net; pharmacist NPC/player job |
| Community Health Clinic | Moderate injury | Low / subsidised | Medium; has a visible queue | Always available; can be crowded at peak hours |
| Private Hospital | Serious injury, faster care, private ward | High | Fast | Where money buys speed and comfort, not survival |
| Ambulance + Emergency Response | Critical Collapse, remote incidents | Fee, or free if $0 | Depends on distance, traffic, weather | Ties directly to the city traffic simulation |

**Recovery flow (state machine)**
```
INCIDENT → TRIAGE (severity assigned)
        → CHOOSE FACILITY (or auto-routed if Critical)
        → ADMIT (queue / bed) → TREATMENT (timer)
        → BED REST (timed, interactive phone allowed)
        → DISCHARGE (receipt, follow-up message) → RETURN TO CITY
```
- **Critical Collapse:** nearby NPCs react, an ambulance is dispatched (arrival depends on distance/traffic), the player wakes in hospital with a "Weakened" status (reduced efficiency for a short time) and a bill.
- **Other players can help**: call an ambulance, stay with an injured player, escort them. Helping builds a *Good Samaritan* reputation (feeds the relationship system) and may earn Hustle Coins.

**Payment and recovery paths (ties to Banking v2.3)**
1. **Pay in full** (cash/bank/transfer).
2. **Insurance-lite** (later phase): small monthly premium reduces bills.
3. **Payment plan:** the bill becomes a small, interest-free **medical balance** repaid from future wages (visible in the Bank app). Only a limited balance can be carried.
4. **Subsidised/free community care** if the player truly cannot pay (slower queue, limited treatments).
No debt spirals: a medical balance cannot exceed a cap and never triggers asset repossession.

**What recovery costs the player (kept proportionate)**
- Treatment fee (bounded by severity tier).
- Time (short real-time timer).
- "Weakened" status after Serious/Critical (efficiency reduced for a limited period).
- Possible missed job tasks or deadlines (a contract deadline missed due to a hospital stay gets a **grace window**, so players are not unfairly punished).
- Never: permanent skill loss, item deletion, bank money loss, or loss of the character.

**Jobs and economy created**
Nurse assistant, pharmacist, ambulance driver, hospital cleaner/porter, medical supply delivery, clinic receptionist, private hospital manager (later). These plug into Education (v2.7), Transport (v2.8) and Business systems.

**MVP scope**
One community clinic + one pharmacy + an NPC ambulance. Two triggers only: (a) a small workshop/transport accident, (b) exhaustion collapse at zero energy and zero hunger. One payment path + one subsidised path.

**Acceptance tests**
- Any injured player can reach a facility or be transported automatically.
- A player with $0 can recover without a dead end.
- Bills, timers and outcomes are visible *before* confirmation.
- Recovery cannot be farmed for coins, XP or money.
- Recovery never removes ledger-protected assets (bank, items, contracts).

### 6.17 Hustle Coins + Life Enhancers (NEW)
> **Stitch Implementation Reference:** See Screen `projects/13284045748325786896/screens/bb9a9f28729b47f0a48545e9edffe523` (*Hustle Coins & Life Enhancers Hub*).

**Purpose:** a light, fun **collect-and-use layer** that rewards curiosity, good habits and helping others, and gives players small boosts that make life easier — without touching the main-currency economy.

> *"Hustle Coins" is a working name.* Keep the name provisional until narrative/localization review (a grounded, Nigerian-feeling name is preferred).

**Hard rules (anti-exploit)**
1. **Not money.** Hustle Coins (HC) cannot be converted to the main currency, traded, gifted, sold, or used in marketplace contracts.
2. **Account-bound** and stored in a **separate server ledger** with append-only entries.
3. **Server-authoritative**: spawns, claims and spending are validated on the server (location, cooldown, cap).
4. **Daily earning cap** with diminishing returns; no punishment for missing a day (no streak-loss mechanics).
5. **Enhancers are small and bounded**: capped, timed, with cooldowns. They help; they never replace work.
6. **No pay-to-win.** If real-money purchase is ever added (decision D11), only cosmetics may be sold; enhancers stay earnable-only.

**How coins are collected (grounded, not arcade-floaty)**
| Source | Example | Notes |
|---|---|---|
| **Discovery** | First visit to a market lane, workshop street, viewpoint, landmark | One-time bonus per place; encourages exploring |
| **Daily Hustle Board** | 3 small goals (finish a task, ride a keke, check on a contact) | Resets daily; short, optional |
| **Street finds** | Tips, dropped change, vendor change, small bonuses in specific spots | Subtle shimmer; fixed spawn points with respawn timers; no random floating coins |
| **Good habits** | Pay rent on time, complete apprenticeship tasks, keep needs healthy | Reinforces desired behaviour |
| **Helping others** | Assist an injured player, deliver an order on time, introduce a contact | Social, multiplayer-positive |
| **Events** | Attend a community event or football viewing | Ties to the Events system |
Visual feel: small glinting coins with a soft tone, consistent with a modern city (not a platformer). Collecting is a *tap-to-collect* or walk-through action that works on a small touch screen.

**Life Enhancers — what coins buy (all placeholders, tune in playtests)**
| Enhancer | Effect | Duration / limit | Cost (HC) |
|---|---|---|---|
| **Energy Boost** ("Chop & Chill") | Restores part of energy | 2 per day | ~30 |
| **Second Wind** | Once per day, avoid a collapse or revive on the spot with partial health | 1 per day; does not remove the bill for a major incident | ~100 |
| **Quick Recovery** | Shortens one recovery timer by up to ~25% | 1 per incident | ~60 |
| **Focus** | +10% skill XP | 30 in-game minutes; 1 per day | ~50 |
| **Lucky Break** | Slightly raises the chance of a good opportunity message that day | Daily; subtle and honest about its effect | ~40 |
| **Cosmetics** | Clothing, phone themes, avatar items | Permanent | varies |

**Interaction with other systems**
- Food, rent, transport and hospital bills remain *necessary*; enhancers only soften them. They must never make currency sinks irrelevant.
- Enhancers apply to personal progress only (needs, recovery, XP). They do **not** affect prices, contract outcomes or other players' deals.
- Coins give a natural reason to open the app daily *without* manipulative mechanics: no timers that punish absence, no streak shaming.

**Economy tuning (placeholders)**
- Target earn rate: **~40–80 HC/day** for a regular player from a mix of sources; a daily soft cap around 100 HC.
- A cosmetic should take several days of play, not hours, so progress feels earned but never grindy.
- Track in telemetry: HC earned/spent per source, enhancer usage, inflation of HC balances, and whether enhancers reduce food/healthcare spending too much.

**MVP scope**
~10 collectible spots across the district, a 3-goal Daily Hustle Board, and 3 enhancers (Energy Boost, Quick Recovery, Second Wind).

**Acceptance tests**
- Coins cannot be duplicated (stress test with bots and reconnect abuse).
- Coins cannot be traded or converted to the main currency.
- Enhancer effects are visible, capped and expire correctly.
- Missing a day has no penalty.
- Players understand where coins come from after one session.

### 6.18 Player Identity & Account Security (REVISED — best practice)
> **Stitch Implementation Reference:** See Screen `projects/13284045748325786896/screens/636dee129a6f41cdbbc039e8727774f6` (*Onboarding & Check-Digit Public ID*).

**Why the old format was replaced.** `ABA-482731` is a 6-digit code: only ~1 million possibilities, so scripts can enumerate it; if issued sequentially it also leaks how many players exist and how old an account is. It also mixed three jobs (database key, login identity, social handle) into one value.

**Best practice: separate the layers**
| Layer | What it is | Shown to players? | Can change? | Purpose |
|---|---|---|---|---|
| **Internal ID** | `player_uuid` — UUIDv7 (time-ordered, server-generated) | Never | Never | Primary key in every table, ledger row and log |
| **Auth identity** | Provider subject (Sign in with Apple / Google / phone OTP / email), linked to the account | Private | Can add/replace linked methods | Login and recovery only |
| **Public Player ID** | Random, human-friendly code, e.g. `ABA-7K4M2-QX9D3` | Yes | Immutable by default (safety rotation only) | Find, add and re-find other players |
| **Display name** | Free text within naming rules | Yes | Yes, with cooldown | Social label; not unique |

The server always derives "who is this player" from the **authenticated session**, never from an ID the client sends.

**Public Player ID specification**
- **Alphabet:** Crockford Base32 (`0–9`, `A–Z` without `I L O U`) — removes look-alike characters, easy to read aloud and to type on a phone.
- **Length:** 9 random characters from a cryptographically secure random generator (≈ 45 bits, about 3.5 × 10¹³ possibilities) + **1 check character** (e.g., Luhn mod-32) = 10 characters.
- **Display format:** `ABA-XXXXX-XXXXX` (prefix and hyphens are cosmetic and are stripped before storage/lookup).
- **Not derived from anything else:** not from the internal ID, creation time, phone, email or a counter.
- **Uniqueness:** database unique index; on collision, regenerate and retry. IDs are **never reused**, even after account deletion (tombstoned).
- **Input normalization:** uppercase, strip spaces/hyphens, map `O→0`, `I/L→1`. The app verifies the check character locally so typos are caught *before* any network call.

```
generate_public_id():
    loop:
        body = base32_crockford(csprng_bytes(...))[:9]
        id   = body + check_char_luhn_mod32(body)
        if insert_unique(id) succeeds: return id        # unique index decides, not a prior read
normalize(input): upper -> strip(" -") -> map(O->0, I->1, L->1)
valid(input):     length==10 and alphabet_ok and check_char_ok
```

**Discovery and privacy**
- **Exact match only.** No prefix search, autocomplete or browsing by ID.
- **Identical responses** for "not found" and "found but hidden", so IDs cannot be probed.
- **Rate limits** on lookups and contact requests per account, device and IP (starting point: ~20/minute, ~200/day, with progressive delay) and alerts on scraping patterns.
- **Discoverability setting:** *Anyone with my ID* / *Friends of contacts only* / *Hidden — share by QR or link only*.
- **Sharing:** in-game contact card, QR code and deep link; the link can carry an expiring token.
- Online status, location and profile details are visible only after a contact request is accepted.
- **Safety rotation:** the public ID is permanent for continuity, **but** a player being harassed can rotate it (support/in-app flow, cooldown such as once per 90 days). The old ID is tombstoned, approved contacts are re-linked automatically, and blocked players stay blocked.

**Account security (mobile best practice)**
- Sign-in with Apple / Google / phone OTP; short-lived access tokens with rotating refresh tokens; secure token storage (iOS Keychain / Android Keystore).
- **Device integrity:** Play Integrity API (Android) and App Attest/DeviceCheck (iOS) on registration and high-value actions.
- One account per verified identity; limits on accounts per device (see §6.19 anti-farming).
- **Account deletion** available in-app (store requirement): chat content anonymized, public ID tombstoned, ledger rows retained under the pseudonymous internal ID for audit.
- Privacy: no real phone number/email visible to other players. Review against the Nigeria Data Protection Act 2023 and store privacy rules with counsel.

**Acceptance tests**
- A script cannot enumerate valid IDs within rate limits.
- A mistyped ID is rejected locally by the check character.
- Two simultaneous registrations never receive the same ID.
- Blocked/hidden players are indistinguishable from non-existent IDs in lookup responses.
- Rotating an ID preserves contacts, ledger history and blocks.

### 6.19 Dealer/Seller vs Consumer — Roles, Starting Capital, Consumer Income (NEW)
> **Stitch Implementation References:** See Screen `projects/13284045748325786896/screens/636dee129a6f41cdbbc039e8727774f6` (*Track Selection & $500,000 Grant*) and Screen `projects/13284045748325786896/screens/27fa1f99ef914ebe96e55c2546d09593` (*Consumer Track Lifestyle & Income Hub*).

**Confirmed currency rules**
- The currency exists **only inside the game**, is earned and spent in the game, has **no cash-out** and cannot be bought with real money.
- Every registered account receives **$500,000** once, at registration.
- The currency symbol and name are configuration values (see decision D15).

**Registration flow**
`CREATE PERSON → CHOOSE ORIGIN → CHOOSE TRACK (Dealer/Seller or Consumer) → RECEIVE STARTING GRANT → DAY ONE`

**The two tracks**
| | **Dealer / Seller** | **Consumer** |
|---|---|---|
| Starting funds | $500,000 | $500,000 **plus Consumer Income** (see below) |
| Core loop | Plan → buy from manufacturers → stock → price → sell → manage cash flow → review | Receive income → shop → live → work side jobs → social life |
| Unlocks | Business Planner app, manufacturer catalogues and wholesale accounts, stall/shop rental, delivery contracts, supplier credit | Shopping, reviews, wishlists, lifestyle, housing, vehicles, events, jobs and apprenticeships |
| Value to others | Creates supply, jobs and prices | Creates demand and gives sellers real customers |
| Income | Business profit | Consumer Income + wages |
- **Not a permanent class.** A player can switch tracks (cooldown such as 7 days). Switching to Dealer stops Consumer Income; switching to Consumer closes wholesale accounts and stalls (stock is liquidated or stored).
- **Consumers must have fun, not just spend.** Their goals are lifestyle, housing, vehicles, careers, events, relationships and acting as discerning customers whose reviews and buying habits shape the market.
- **Origin no longer changes cash** (everyone starts with $500,000). It changes contacts, supplier discounts, familiarity with an area and the starting home.

**Consumer Income — ASSUMPTION TO CONFIRM (D16)**
The request says a consumer "gets $50,000…" without a period. The plan implements it as a **configurable recurring income**:
- Amount: **$50,000** per period.
- Default period: once per **real 24 hours**, claimable, stackable up to **3 unclaimed periods** (so players are never punished for missing a day).
- Paid into the **restricted** Consumer Income bucket (below).
- Alternatives if this isn't what you meant: (a) a one-time bonus; (b) paid per in-game week; (c) consumers start with only $50,000 instead of $500,000. Each is a single config change.

**Restricted funds (anti-farming)**
Every new account would otherwise be a free $500,000, so someone could register many accounts and funnel the money to one player. The fix is to split the balance into buckets:
| Bucket | Source | Can be spent on | Can be sent to another player as a free transfer? |
|---|---|---|---|
| **Starter Funds** | Registration grant | Goods, wholesale stock, rent, licences, transport, healthcare | **No**, until unlock (e.g., account age ≥ 7 days + N completed activities) |
| **Consumer Income** | Recurring income | Goods and services | **No** |
| **Earned Funds** | Wages, sales, contracts | Anything | Yes, with daily limits that grow with account age |
- Spending draws from restricted buckets first, then Earned Funds.
- **Purchases from real-player sellers are allowed** (otherwise consumers couldn't support dealers), but they are protected by: per-counterparty daily caps for young accounts, price-sanity checks against the market reference band (overpaying a friend's shop is flagged), device/IP/social-graph linkage checks, and review of sellers whose revenue comes mostly from one new buyer.
- One grant per verified identity; device attestation; a cap on accounts per device; clusters of new accounts trading only with each other are flagged.

**Economy warning.** $500,000 per account plus a recurring consumer income is a large, continuous money faucet. It only works if the sinks are real (rent, licences, levies, fuel, stock costs, healthcare, vehicles, property) and the Economy Director monitors it (§7). This also departs from the original "start with almost nothing" tone: treat the grant as **starting capital, not wealth**. Prices are scaled so $500,000 buys a modest stall and first stock, or a few weeks of comfortable living, not a comfortable life.

### 6.20 Dealer Business Planning — Real-Life Scenarios (NEW)
> **Stitch Implementation References:** See Screen `projects/13284045748325786896/screens/91a73aed5e0740cb833a7f0717f3331d` (*Business Planner & Ledger*), Screen `projects/13284045748325786896/screens/46f493599fd94797b6d2a9db5bb6177c` (*Post-Mortem Review*), and Day 6/7 Scenario Screens (§4.9.2).

**Principle.** Planning is the dealer's core skill. The game puts the dealer in situations that real Aba traders face, gives imperfect information early, and lets them decide, commit and live with the result. Scenarios **emerge from the simulation** (calendar, weather, events, supply, traffic, competition); they are not scripted missions.

**Planning loop:** `OBSERVE → FORECAST → DECIDE → COMMIT → EXECUTE → REVIEW → ADAPT`

**Business Planner app (unlocked by the Dealer track)**
- **Cash-flow view:** cash, money owed to you, money you owe, upcoming rent/wages/orders, and **runway** (days until cash runs out).
- **Inventory view:** stock on hand, days of cover, reorder points, slow movers.
- **Demand outlook:** 14-day demand *ranges* per category ("likely 40–70 units"), driven by season, events, weather and your own history. Uncertainty is shown honestly.
- **What-if tools:** margin and break-even calculator, price tester, order-size comparison.
- **Supplier comparison:** price, minimum order, lead time, quality grade, reliability, payment terms.
- **Lead-time and route planner:** delivery time given traffic, weather and vehicle.
- **Post-mortem report** after each period: what sold, what stuck, what the best decision would have been in hindsight. This is the learning loop.

**Scenario library (data-driven, each with trigger, early warning, options, consequences, recovery)**
| # | Scenario | Real-life basis | Typical decisions |
|---|---|---|---|
| 1 | **Back-to-school rush** | School resumption demand for shoes, bags, uniforms | How much to pre-order given lead times and cash |
| 2 | **Festive-season surge** (Christmas, Sallah, community festivals) | Seasonal demand | Order early (cheaper, slower) or late (faster, dearer) |
| 3 | **Rainy-season slowdown / flooding** | Weather and road conditions | Adjust stock, delivery timing, rainwear demand |
| 4 | **Raw-material price spike** (leather, gum, fabric) | Input costs reach wholesale prices | Absorb, pass on, switch supplier or bulk-buy |
| 5 | **Power outage week** | Infrastructure | Longer manufacturer lead times; generator and fuel costs |
| 6 | **Road works / diversion** | Logistics | Alternative route or a smaller vehicle |
| 7 | **Bad batch / quality complaints** | Quality control | Refund, discount, switch supplier, rework |
| 8 | **Supplier delay or default** | Reliability | Backup supplier, partial delivery, renegotiate |
| 9 | **Competitor price war** | Competition | Match, differentiate on quality, target a niche |
| 10 | **Dead stock** | Fashion cycles, overbuying | Clearance, bundles, return to supplier |
| 11 | **Big wholesale order** | Growth opportunity | Accept with credit, partner up, or decline |
| 12 | **Cash crunch** | Rent due while stock isn't moving | Payment plan, sell assets, downsize, loan |
| 13 | **Knock-off flood** | Copycat products | Brand reputation, quality labels, price tiers |
| 14 | **Event-driven demand** | Football match, weddings, hotel events (v2.9) | Stock the right items before the event |
| 15 | **Where to open** | Location trade-offs | Rent versus footfall, cluster versus quieter street |
| 16 | **Hiring decision** | Growth | Hire, train an apprentice, or stay solo |
| 17 | **Levies and compliance** | Market fees, licences | Budget for recurring obligations |

**Design rules**
- **Fair warning:** a signal appears 3–7 in-game days ahead (forecast, supplier notice, calendar), but imperfectly, so judgment still matters.
- **No gotchas:** every scenario has a recovery path (see the recovery principle) and bad luck cannot wipe out a dealer who planned reasonably.
- **Difficulty scales with business size:** gentle scenarios early, compound scenarios later.
- **Systems feed scenarios, not scripts:** scenario cards are templates that read live simulation state.
- **Rewards:** completing post-mortems and good planning earns reputation and Hustle Coins; there is no explicit "grade".
- **Multiplayer:** dealers can share demand intelligence with their network, form trade associations, and place group orders for better prices.

### 6.21 Manufacturers & Supply Tiers (NEW)
> **Stitch Implementation Reference:** See Screen `projects/13284045748325786896/screens/643bd5a011844e52bf31056aa040bc27` (*Made in Aba Wholesale Market & Footwear Manufacturer*).

**Supply chain**
```
RAW-MATERIAL SUPPLIERS → MANUFACTURERS → DEALERS / WHOLESALERS → RETAIL SELLERS → CONSUMERS
```
A dealer may be a wholesaler, a retailer, or both. Dealers buy from manufacturers; consumers buy from sellers.

**Who runs manufacturers**
- **Launch:** NPC manufacturers and workshops, so the market always has supply and prices stay stable even with few players.
- **Later:** real players can run manufacturers (the workshop, quality and apprenticeship systems in v2.4), competing alongside NPC manufacturers. Decision D17.

**Manufacturer profile (data-driven)**
`product lines, daily capacity, minimum order quantity (MOQ), volume-tier price list, lead time, quality-grade distribution, reliability score, payment terms (prepay / deposit / credit for trusted dealers), fictional brand, cluster location, returns policy, seasonal availability`

**Dealer interactions**
1. Browse the supplier catalogue (Marketplace → Suppliers).
2. Compare and negotiate; place a **purchase order**, which becomes a **contract** (v2.5), with escrow for large orders.
3. See the **production queue** and expected ready date.
4. Collect or arrange delivery (Transport); inspect quantity and quality on receipt.
5. Dispute if wrong, late or damaged.
- Trusted dealers can earn **credit terms** (e.g., pay in 7 days), which ties into Banking.

**Manufacturer simulation**
- Produces for stock and for orders; large orders push production plans, so dealers shape the market.
- Depends on inputs (leather, gum, soles, thread, fabric, zips, packaging…), so input prices and shortages ripple through lead times and prices.
- Capacity limits, power outages and traffic affect delivery.
- **Scarcity allocation:** in shortages, per-dealer purchase caps and preference for regular customers with good payment history prevent one player from cornering the market.

**MVP:** one NPC footwear manufacturer + one raw-material supplier + 6–10 products, feeding a dealer's stall and NPC/player consumers.

### 6.22 "Made in Aba" Product Catalogue (NEW)

**Honest scoping.** "All products made in Aba" is a **research and data programme**, not a single feature. The list is large, changes over time, and each product needs data, an icon and (sometimes) a 3D model. The plan is a catalogue that is **data-driven**, so it can grow continuously without code changes, and a rollout order that proves the loop first. Recommendation for communications: say "the products Aba is known for, growing continuously" until the research register can support "all".

**What research supports today**
| Category | Status |
|---|---|
| Footwear (men's, women's, sandals, slippers) | **Verified** (project research + trade press) |
| Leather goods: belts, bags, boxes | **Verified** |
| Garments / apparel | **Verified** |
| Steel / metal fabrication | **Verified** (trade press lists it among Aba's main trades) |
| Auto parts and vehicle accessories (Faulks Road zone) | Candidate, verify in the field |
| Furniture and woodwork | Candidate |
| Plastics and household goods | Candidate |
| Soaps, detergents, cosmetics | Candidate |
| Printing and packaging | Candidate |
| Textiles, hosiery, accessories | Candidate |
| Food processing | Candidate |
| Electronics assembly/repair | Candidate |
Trade press describes Aba as having at least 25 manufacturing clusters, with leather sourced largely from the north and other inputs local or imported; this is why raw-material supply chains matter in the game. Treat all figures as inputs for the **World Research Register** and re-verify before production.

**Catalogue structure**
`CATEGORY → PRODUCT TYPE → SKU (size, colour, material, design) × QUALITY GRADE × FICTIONAL BRAND`

```json
{
  "sku": "FW-SANDAL-W-0042",
  "category": "footwear", "type": "women_sandal",
  "variants": {"size": [36,37,38,39,40,41], "color": ["tan","black","wine"]},
  "quality_grades": ["A","B","C"],
  "producing_cluster": "shoe_cluster_a",
  "inputs_bom": {"leather_m2": 0.25, "sole_unit": 1, "gum_ml": 40, "thread_m": 6},
  "price_band": {"wholesale": [6000, 14000], "retail": [10000, 26000]},
  "demand": {"base": 1.0, "season_tags": ["festive", "back_to_school"], "weather_tags": ["rain_negative"]},
  "shelf_life_days": null, "weight_kg": 0.5, "made_in_aba": true
}
```

**Rollout (a category enters the game only when it passes the gate)**
| Phase | Scope |
|---|---|
| P0 (MVP) | 6–10 footwear products from one NPC manufacturer |
| P1 | Footwear + belts + bags (≈ the leather cluster) |
| P2 | Garments and textiles |
| P3 | Metal fabrication, furniture, auto parts |
| P4+ | Remaining verified categories, added through live-ops data updates |

**Category gate:** research-register entry → product schema complete → icon (and 3D asset if needed) → price band and demand curve → manufacturer lines assigned → QA'd in a playtest.

**Art strategy for breadth:** 2D icons for every SKU, shared 3D prop kits, parametric variants (colour/material swaps) so one model covers many SKUs, and hero 3D assets only for top sellers and shop displays. This keeps mobile memory and download size in budget.

**Authenticity and IP:** products use generic, original designs with **fictional brands**. "Made in Aba" is a gameplay tag and quality badge. No real private brand logos without permission (see §9.3).


---

## 7. Economy Parameters — Starter Tuning Sheet (placeholders; test and replace)

> Values are **prototype placeholders** to be calibrated with playtests. Prices are anchored to the **$500,000 Starter Funds** and stored as multiples of a single config value (`STARTING_GRANT`) so the whole economy can be rescaled in one place.

### 7.1 Currency model
- **Closed loop:** in-game currency only, no cash-out, no real-money purchase. Symbol shown as `$` (config; see D15).
- **Integer minor units (cents)** in storage; never floating point.
- All movement through the double-entry ledger (§5), including system accounts such as `REGISTRATION_GRANT`, `CONSUMER_INCOME`, `NPC_CUSTOMER_SPEND`, `LEVY_AND_FEES`.

### 7.2 Faucets and sinks (every unit needs a reason to enter, move and leave)
| Faucets (money enters) | Sinks (money leaves) |
|---|---|
| Registration grant ($500,000, one-time per verified account) | Rent, trading licences, market levies |
| Consumer Income ($50,000 per period, assumption) | Manufacturer raw-material costs and NPC operating costs |
| NPC customer purchases from player sellers | Fuel, transport, vehicle maintenance |
| Wages from NPC employers and jobs | Healthcare and ambulance fees |
| NPC contract payouts and events | Spoilage, returns and losses |
| | Food, lifestyle, housing, property |
| | Fees for planning/legal/compliance services |

### 7.3 Economy Director (monitoring and control)
A server-side service reports daily: total money supply, per-source faucets, per-sink drains, velocity, median and top-10% wealth, number of active accounts, and price indices per category. It can:
- adjust **NPC demand budget** (how much NPC customers spend) up or down;
- adjust **Consumer Income** amount;
- shift **levy/rent** rates within bounds;
- slowly float **reference price bands** with money supply per active account (bounded) to prevent runaway inflation.
Every change is logged and reversible. **Inflation guard:** if the money supply per active account grows faster than a set threshold, NPC demand is throttled and sinks are weighted up automatically.

### 7.4 Starter price sheet (placeholders)
| Item | Value ($) | Notes |
|---|---|---|
| Registration grant | 500,000 | One-time; restricted *Starter Funds* |
| Consumer Income | 50,000 per period | Assumption D16; restricted bucket |
| Street meal | 1,500 – 4,000 | Restores hunger |
| Keke short trip | 1,000 – 3,000 | Distance and traffic scaled |
| Apprentice task wage | 3,000 – 10,000 per task | Skill-tier scaled; daily cap applies |
| Trading licence (dealer, one-time) | 20,000 – 50,000 | Unlocks wholesale accounts |
| Starter stall rent | 25,000 – 60,000 per rent cycle | Cycle length TBD; target ≈ 3–7 days of play |
| Dealer first stock order | 150,000 – 300,000 | Uses roughly 40–60% of the grant |
| Wholesale footwear pair (bulk) | 6,000 – 18,000 | Depends on quality grade, volume tier |
| Retail footwear pair | 10,000 – 30,000 | Target gross margin 20–45% by category |
| Retail garment | 5,000 – 35,000 | |
| Retail bag | 8,000 – 40,000 | |
| Pharmacy treatment (minor) | 3,000 – 10,000 | |
| Community clinic (moderate) | 10,000 – 40,000 (or subsidised) | Queue-based |
| Private hospital (serious) | 75,000 – 250,000 | Payment plan available |
| Ambulance fee | 15,000 – 50,000 (free if funds are $0) | Distance/traffic scaled |
| Medical balance cap | ~125,000 | Interest-free, repaid from wages |
| Hustle Coins earn rate | 40–80 HC/day (cap ~100) | Not currency; see §6.17 |

### 7.5 Calibration targets
- **Dealer:** the first stock order uses 40–60% of the grant; a reasonable plan returns a positive margin within the first selling cycle; reasonable mistakes cost ≤ 30% of capital and are recoverable.
- **Consumer:** Consumer Income covers comfortable daily living plus occasional purchases, but not large assets; big goals (vehicle, better housing) still need saving and work.
- No single activity pays more than ~1.5× the median activity per hour (prevents a "best job" meta).
- **Restart path:** a player who loses all capital can liquidate remaining stock to an NPC wholesaler at a discount, take wage work, or use a small once-per-period **Restart Stipend**, so nobody is locked out.
- Track and publish internally: median time to first profit, share of dealers bankrupt within 14 days, percentage of money held by the top 10%, and the money-supply growth rate.

---

## 8. Anti-Exploit & Security Requirements

1. Server-authoritative balances, items, contracts (no client-trusted values).
2. Idempotent money intents; transaction IDs; double-entry invariants checked in tests (sum = 0).
3. Rate limits: transfers, messages, contact requests, trade proposals.
4. Cooldowns/extra confirmation on unusual high-value actions.
5. Duplicate-detection and anomaly alerts (impossible income/hour, sudden wealth spikes, circular transfers between alt accounts).
6. Alt-account/collusion monitoring hooks (shared device/IP heuristics, wage-farm loops).
7. Audit logs for all escrow/dispute actions.
8. Account security: authentication, session management, new-device alerts, temporary hold for suspicious activity.
9. No real-money trading support; terms-of-service language + detection.
10. Privacy: Player ID lookup never exposes real-world contact data or exact home location.
11. **Starter-grant farming:** one grant per verified identity; device attestation; accounts-per-device cap; Starter Funds and Consumer Income are non-transferable until unlock; per-counterparty daily caps for young accounts; price-sanity checks on purchases between linked accounts.
12. **Money-laundering via fake sales** (alt consumer "buys" from main's shop): detect revenue concentrated in few new buyers, overpriced goods versus the market band, and circular flows; hold or reverse flagged settlements.
13. **Enumeration and scraping** of public IDs: exact-match lookup only, identical not-found/hidden responses, rate limits and anomaly alerts (§6.18).

---

## 9. Content & Art Pipeline

### 9.1 Art direction
Modern, grounded, "cinematic but believable". Concrete buildings, signage, generators, keke, motorcycles, market stalls, churches, hotels. **No fake Africa.** Authenticity beats spectacle.

### 9.2 Production approach
- **Modular kit-of-parts** for buildings and street furniture (small number of high-quality modules, heavy reuse).
- **Trim sheets + shared material library** to keep texture memory low.
- **Data-driven content:** jobs, NPC routines, businesses, items, events defined in tables/JSON/ScriptableObjects so designers add content without code.
- **Character pipeline:** a modular character creator with a limited, high-quality set (skin tones, hair, clothing) — representation must be accurate and respectful; do not default to generic presets.

### 9.3 Research pipeline (from design, enforced)
1. Verify real location → 2. Record district/road/junction/landmarks → 3. Define gameplay function → 4. Rights check → 5. Recreate / fictionalize / omit → 6. Playtest navigation.
Maintain a **World Research Register** (spreadsheet or table) with location, source, photo reference, legal status, gameplay role, decision.

### 9.4 Audio
Layered ambience (traffic, keke, generators, markets, workshops, music from venues, weather). Mixed by district and time of day. Budget a field-recording pass early; it is one of the cheapest ways to make the city feel real.

### 9.5 Language and writing
- Dialogue in grounded Nigerian English with light Igbo and Pidgin flavouring where natural; commission a **native-speaker writer/localization lead from Aba or the region** to avoid caricature.
- Phone message writing is a major authenticity lever — short, realistic, human.

---

## 10. Milestone Plan

| Milestone | Goal | Exit criteria |
|---|---|---|
| **M0 — Discovery (2–4 wks)** | Decide platform, engine, netcode; research register started; scope locked | Decision gates D1–D4 signed; spike plan approved |
| **M1 — Greybox (4–6 wks)** | Player controller, camera, one block in greybox, clock, 5–10 NPCs on routines | Walkable block; NPCs follow schedules; time-of-day works |
| **M2 — Multiplayer Spike (4–6 wks)** | 2–8 players **on real iOS + Android devices**; Player ID; movement sync; save/reload; reconnect; background/resume | Stable 30-min session on a low-end Android; state persists; no desync of money |
| **M3 — Life Loop (6–8 wks)** | Phone, job, wage, food, transport, home, needs, **recovery clinic, Hustle Coins, role choice + starter funds, one dealer cycle with an NPC manufacturer** | A new tester completes the MVP Player Journey unaided |
| **M4 — Social Loop (4–6 wks)** | Chat, contacts, **new Player ID system**, simple trade/pay, report/block, reputation tick, planning scenario | Two testers find each other by ID and complete a deal |
| **M5 — World Polish (6–8 wks)** | Art pass, audio, lighting, traffic, signage, UI polish | Authenticity review passes (local reviewers) |
| **M6 — Vertical Slice (4 wks)** | Stable demo build of the first-hour experience | 10-minute watch test: viewers understand what makes it different |
| **M7 — Validation (4 wks)** | Playtests, tech review, cost review, go/no-go | Go/no-go criteria in §12 met or rework plan |
| **M8 — Production Planning** | Only after validation | Roadmap for Phases 4–8 |

*Durations assume a small core team; adjust after M0 once the team is known.*

### Phase map (design → build order)
| Phase | Systems | Milestone |
|---|---|---|
| 1 | Player controller, camera, environment, phone UI shell, time system | M1 |
| 2 | District, NPC movement, transport, jobs, money | M1–M3 |
| 3 | Player ID, chat, player interaction | M2, M4 |
| 4 | Inventory, marketplace, contracts, simple business | Post-M7 |
| 5 | Housing, property, deeper economy | Post-M7 |
| 6 | Education, relationships depth, health, safety | Post-M7 |
| 7 | Events, entertainment, broader simulation | Post-M7 |
| 8 | Larger map, optimization, moderation, live ops | Post-M7 |

---

## 11. Backlog — Epics (MVP)

Priority: **P0** = required for slice, **P1** = strongly desired, **P2** = nice-to-have.

### EPIC A — Core Framework (P0)
- A1 Player controller (walk/run/interact), third-person camera.
- A2 Interaction system (context prompt, NPC talk, objects).
- A3 Shared server clock + time-of-day lighting.
- A4 Save/load + reconnect handling.
- A5 Data-definition framework (items, jobs, NPC routines, origins).

### EPIC B — Multiplayer Foundation (P0)
- B1 Authoritative dedicated server; join/leave.
- B2 Movement replication + interest management.
- B3 Player ID generation + profile.
- B4 Proximity "people met" tracking.
- B5 Latency and bandwidth test harness (simulate West-African network conditions: higher latency, packet loss).

### EPIC C — Phone (P0)
- C1 Phone shell (home screen, navigation, notifications).
- C2 Messages (NPC + player), Contacts.
- C3 Maps (waypoint, landmarks, route to opportunity).
- C4 Jobs app (current opportunities).
- C5 Bank app (balances, transfer, history).

### EPIC D — Economy & Ledger (P0)
- D1 Ledger service with double-entry invariants + unit tests.
- D2 Wallet (cash/bank), ATM interaction.
- D3 Shop purchase flow + confirmation screen.
- D4 Faucet caps + sink definitions + telemetry.

### EPIC E — Work & Skills (P0)
- E1 Workshop apprenticeship flow (offer → trial → tasks → feedback).
- E2 Skill/XP progression + task gating.
- E3 Reputation tick (employer NPC).

### EPIC F — City Life (P0/P1)
- F1 NPC routines (5 archetypes) with LOD0/1/2.
- F2 Business opening-hours state machine.
- F3 Keke route + fare.
- F4 Day-end summary + "tomorrow" opportunity message.
- F5 Weather toggle (P1) with traffic/foot-traffic modifiers.

### EPIC G — Needs (P1)
- G1 Hunger/energy/hygiene meters with efficiency effects.
- G2 Food purchase + sleep/rest.

### EPIC H — Social & Safety (P0/P1)
- H1 1:1 chat with persistence.
- H2 Block/Mute/Report; DM privacy setting.
- H3 Rate limiting + basic spam filter.
- H4 Simple player-to-player trade with confirm/preview.

### EPIC I — Onboarding & UX (P0)
- I1 Character creation + origin interview.
- I2 "First 24 hours" scripted-but-light flow.
- I3 Accessibility basics (text size, colour contrast, language setting).

### EPIC J — Tooling & QA (P0)
- J1 Headless server test runner; bot clients to simulate load and economy.
- J2 Debug console (set time, give item, simulate rain, inspect ledger).
- J3 Automated economy invariant tests (no money creation, no negative balances).
- J4 Crash/telemetry reporting.

### EPIC K — Recovery Network (P0/P1) *(new)*
- K1 Injury/severity state machine + triggers (accident, exhaustion collapse).
- K2 Pharmacy + community clinic interactions with cost/time preview.
- K3 Ambulance dispatch (NPC) tied to traffic/distance.
- K4 Bed-rest timer with phone access; discharge receipt message.
- K5 Medical bill, payment plan and subsidised path (ledger-integrated).
- K6 "Weakened" status + contract grace window.
- K7 Player help actions (call ambulance, stay with injured) + Good Samaritan reputation (P1).

### EPIC L — Hustle Coins + Enhancers (P0/P1) *(new)*
- L1 Coin ledger service (separate, append-only) + daily cap.
- L2 Collectible spawn system (server-authoritative, respawn timers, location validation).
- L3 Daily Hustle Board (3 goals).
- L4 Enhancer definitions, activation, expiry and caps.
- L5 Coin UI (counter, collect feedback, enhancer tray in the phone).
- L6 Exploit tests (dupe, reconnect, speed/teleport collecting, alt-account farming).

### EPIC M — Mobile Platform (P0) *(new)*
- M1 Touch controls (virtual stick, camera drag, context button, tap-to-travel via map).
- M2 Device tiers + quality auto-detect (Low/Mid/High) and a "Low Data Mode".
- M3 App lifecycle: background/resume, network switch (Wi-Fi ↔ mobile data), safe-state on disconnect.
- M4 Asset streaming (Addressables), initial download size budget, delta patching.
- M5 Push notification service (opt-in, rate-limited, mapped to phone messages).
- M6 Store compliance: UGC report/block, account deletion, privacy labels, age rating.
- M7 Battery, thermal and memory profiling on the device lab.

### EPIC N — Identity & Account Security (P0) *(new in v0.3)*
- N1 UUIDv7 internal ID + public ID generator (CSPRNG, Crockford Base32, check character, unique index, tombstones).
- N2 Normalization/validation shared by client and server; local typo detection.
- N3 Exact-match lookup with rate limits and anti-enumeration responses.
- N4 Discoverability settings (anyone / friends of contacts / hidden).
- N5 Share: contact card, QR code, deep link with expiring token.
- N6 Safety rotation flow (cooldown, contact re-link, block preservation).
- N7 Auth providers (Apple, Google, phone OTP) + device attestation (Play Integrity, App Attest).
- N8 In-app account deletion and data minimization.

### EPIC O — Roles, Starting Capital & Economy Controls (P0) *(new in v0.3)*
- O1 Track selection flow (Dealer/Seller or Consumer) and switching with cooldown.
- O2 Registration grant through the ledger into restricted Starter Funds.
- O3 Consumer Income service (period, stack cap, no-penalty claims).
- O4 Restricted-bucket spend order and transfer unlock rules.
- O5 Anti-farming and laundering detection (§8 items 11–12).
- O6 Economy Director dashboard, parameters and inflation guard (§7.3).
- O7 Restart Stipend and liquidation path for bankrupt dealers.

### EPIC P — Dealer Planning (P0/P1) *(new in v0.3)*
- P1 Business Planner app: cash-flow, inventory, runway.
- P2 Demand forecast service (ranges with uncertainty).
- P3 Scenario engine (template + live simulation state) and warning system.
- P4 First 5 scenarios: back-to-school, festive surge, rainy-season slowdown, input price spike, supplier delay.
- P5 Post-mortem report and what-if tools.

### EPIC Q — Manufacturers & Catalogue (P0/P1) *(new in v0.3)*
- Q1 Product/SKU schema, importer and validation tooling.
- Q2 Manufacturer profiles and volume-tier price lists.
- Q3 Purchase-order flow tied to contracts and escrow (v2.5).
- Q4 NPC manufacturer production simulation (capacity, lead time, input dependency).
- Q5 Scarcity allocation and purchase caps.
- Q6 Research Register tooling and category gate checklist.
- Q7 First catalogue slice: 6–10 footwear products.

### EPIC R — Stitch UI & Mobile Client Integration (P0) *(NEW - Design System & Screen Implementation)*
- R1 Stitch Design System tokens implementation (`assets/1a2babdb80014d95a4bf685bf39129ae`): CSS variables, Space Grotesk/Hanken/JetBrains Mono typography, dark asphalt surfaces, 4px corner radius.
- R2 Onboarding & Identity screen (`636dee129a6f41cdbbc039e8727774f6`): origin selection, track selection, $500,000 grant credit modal, Crockford Base32 ID badge.
- R3 Soft currency & Enhancer hub (`bb9a9f28729b47f0a48545e9edffe523`): 75 HC ledger display, 3-Goal Daily Hustle Board, Enhancer store.
- R4 Consumer Track Lifestyle & Income Hub (`27fa1f99ef914ebe96e55c2546d09593`): $50,000 claimable stipend terminal, needs gauges, retail shop.
- R5 Recovery Network & Clinic screen (`ac3b1b150243478db1a4cd7b59b39e58`): triage severity ladder, pharmacy purchase, clinic treatment queue, repayment plan.
- R6 Business Planner & Ledger Review (`91a73aed5e0740cb833a7f0717f3331d`, `46f493599fd94797b6d2a9db5bb6177c`): runway days, COGS calculation, post-mortem variance review.
- R7 Wholesale Market & Manufacturer (`643bd5a011844e52bf31056aa040bc27`): MOQ volume tier selector, lead-time tracker, purchase order escrow.
- R8 1:1 Chat & Player Contacts (`491876389d5b48bfb594b840202c22c0`): contact list, check-digit lookup, trade intent preview card.
- R9 City HUD & Street Rhythm overlay (`aaa9f4b0e73245469b4bee79859dafc3`): 24-minute clock bar, weather indicators, quick-draw phone launcher.


---

## 12. Playtest Plan & Go/No-Go

### Metrics (from design's prototype success metrics, made measurable)
| Question | Metric | Target (initial) |
|---|---|---|
| Understands the goal without long tutorial | % new testers completing first earn in ≤10 min | ≥ 80% |
| Two players can find and interact | Success rate of ID-based contact + chat | ≥ 90% |
| One player's activity creates opportunity for another | Count of player-generated opportunities per session | ≥ 1 per 3 players |
| Earning feels meaningful | Post-session survey (1–5) | ≥ 3.8 |
| City feels alive without a mission | "What did you do when nothing was assigned?" qualitative + idle-engagement time | Majority self-direct for ≥ 10 min |
| Wants to know what tomorrow brings | % who continue to Day 2 voluntarily | ≥ 60% |
| Stability | Crash-free sessions / desync incidents | ≥ 98% / 0 money desyncs |
| Economy integrity | Ledger invariant failures | 0 |

### GO if
Multiplayer is stable at prototype scale; first-hour loop is fun without scripted missions; testers describe it as "a life in Aba" rather than a generic open-world; economy is controllable; cost path is understood; IP path is manageable.

### NO-GO / REWORK if
Netcode unstable; the loop is boring without missions; economy trivially exploitable; scope unaffordable; city lacks identity; players don't see what makes it different.

---

## 13. Team & Roles (lean prototype)

**Core (M0–M3)**
- Game/Creative Director (design authority)
- Technical Lead / Gameplay Programmer
- Network/Backend Engineer
- World/Technical Artist (environment + pipeline)
- UI/UX Designer (phone + HUD)
- Producer (part-time acceptable)

**Add by M4–M6**
- Character artist/animator, environment artist(s), sound designer, systems/economy designer, narrative/localization lead (Nigerian native speaker), QA/multiplayer tester.

**Consultants (as needed)**
- Legal/IP counsel, Aba-based cultural/location researchers, moderation/trust & safety advisor.

---

## 14. Budget Categories (to be costed after M0)

1. Personnel (design, engineering, art, UI, QA, production).
2. Engine/tools/middleware licences, **mobile test-device lab (low/mid Android + iPhones)**, Apple/Google developer accounts.
3. Backend/hosting (dev + test servers, scaling tests), identity/auth providers, device-attestation services.
4. Art assets & outsourcing.
5. Audio (field recording, SFX, music licensing).
6. Research & fieldwork in Aba (reference photography, location verification, local consultants).
7. Legal/IP review.
8. Playtesting (recruitment, incentives, tools).
9. Moderation tooling.
10. Contingency (recommend 20–30% for a first-of-kind multiplayer sim).

> No numbers are provided here deliberately: any estimate before M0 would be speculation. Use M0 outputs (platform, team size, regional rates) to produce a bottom-up budget.

---

## 15. Decision Log (open decisions)

| ID | Decision | Owner | Due |
|---|---|---|---|
| D1 | ~~Target platform~~ **DECIDED: mobile iOS + Android.** Open: minimum device spec | Director + Tech Lead | M0 wk 2 |
| D2 | Engine (Unity vs Unreal) | Tech Lead | M0 end |
| D3 | Netcode + backend stack | Network Engineer | M0 end (after spike) |
| D4 | Persistent world vs instanced shards | Tech Lead | M0 end |
| D5 | Death/recovery rule definition | Design | M0 |
| D6 | Art style fidelity vs performance target | Art lead | M0–M1 |
| D7 | Currency/economy tuning ownership + tools | Systems Designer | M1 |
| D8 | Moderation approach (tooling, staffing, policies) | Producer + T&S advisor | M2 |
| D9 | Which real-world anchors are recreated vs fictionalized | Director + Legal | M1 |
| D10 | Monetization model (premium / F2P / none for prototype) | Director | Post-M7 |
| D11 | Can Hustle Coins ever be bought with real money? (Recommendation: no for prototype; cosmetics-only if ever) | Director + Legal | Post-M7 |
| D12 | Recovery durations and bill scale after first playtests | Systems Designer | M3 |
| D13 | Landscape-only vs landscape + portrait phone overlay | UI/UX Lead | M1 |
| D14 | App-store regional launch plan, age rating, payment rules | Producer + Legal | M5 |
| D15 | Currency symbol and name: "$" as directed, or "₦"/naira-themed for authenticity (one config constant either way) | Director | M1 |
| D16 | **Consumer Income definition**: amount, period, caps, activity gate, restricted bucket (see §6.19) | Director + Systems Designer | M0 |
| D17 | When player-run manufacturers arrive (recommended post-MVP) | Director | Post-M7 |
| D18 | Catalogue scope and research sign-off process for "all Aba products" | Producer + Research lead | M1 |
| D19 | Transfer-unlock rules for Starter Funds (account age, activities) | Systems Designer + Security | M2 |

> Note: the design bible does not define monetization. For a life/economy sim, monetization choices (especially anything touching in-game currency) directly affect economy integrity and anti-RMT policy. Decide deliberately, after validation.

---

## 16. Technical Spike Checklist (Week 1–6)

- [ ] Empty level, 2–8 clients connected to dedicated server.
- [ ] Movement sync with measured latency/loss tolerance (simulate poor network).
- [ ] Player ID creation + search + add contact.
- [ ] Phone UI skeleton + message delivery between two players.
- [ ] One NPC with routine across a 24-hour clock.
- [ ] One job interaction paying through the ledger.
- [ ] Shop purchase with server-validated confirmation.
- [ ] Persist + reload player state; reconnect mid-session.
- [ ] Bot script that hammers transfers/trades to attempt duplication → must fail.
- [ ] Performance capture on the lowest target device (frame time, memory, bandwidth/player).
- [ ] **Mobile:** run the slice on at least 3 low/mid Android phones (2–3 GB RAM) and 2 iPhones; record FPS, memory, battery drain, temperature after 20 minutes.
- [ ] **Mobile:** test background → resume, lock screen, incoming call, Wi-Fi → mobile data switch, airplane-mode drop and rejoin.
- [ ] **Mobile:** measure data usage per hour (target ≤ 10 MB/hour) and initial download size.
- [ ] **Recovery:** trigger an injury, run the clinic flow end-to-end, confirm the ledger records fees and a $0 player can still recover.
- [ ] **Coins:** spawn/collect/spend loop with bot stress test (duplication, teleport-collect, reconnect abuse).
- [ ] **Identity:** generate 10 million public IDs in a test; verify zero collisions, check-character validation, and that an enumeration script is stopped by rate limits.
- [ ] **Grant:** register 100 simulated accounts and confirm the restricted buckets prevent funnelling money to one account.
- [ ] **Dealer loop:** NPC manufacturer PO → delivery → stall sale → ledger reconciles to zero.
- [ ] Written **spike report** with recommendation and risks → feeds D1–D4.

---

## 17. Definition of Done (per feature)

1. Meets acceptance criteria in the backlog.
2. Server-authoritative where it touches money/items/contracts.
3. Unit/integration tests (economy features include ledger invariant tests).
4. Telemetry events added.
5. Works on lowest target device within performance budget.
6. No new moderation/privacy gaps (checked against §8).
7. Reviewed by design for alignment with the pillars (§1).
8. Playtested at least once with a person who did not build it.

---

## 18. The Developer's Bottom Line

1. **Prove the loop, not the map.** One block, one workshop, one day-cycle, two players.
2. **Platform is decided: mobile.** Design every system to a low/mid Android floor first, then scale up for better devices.
3. **Treat the ledger as the heart of the game.** With $500,000 handed to every account, the restricted buckets, Economy Director and anti-farming rules are not optional.
4. **Authenticity is a production discipline**, not a mood: research register, local writers, field audio, local reviewers.
5. **Expansion is earned by evidence.** Phases 4–8 start only after M7.

*"You don't win Aba. You build a life in Aba."*
