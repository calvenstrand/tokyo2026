export type BookingStatus = 'pending' | 'done' | 'watching' | 'na'

export type Booking = {
  id: string
  tier: 1 | 2 | 3 | 4
  name: string
  nameJa?: string
  location: string
  day: string
  deadline: string
  cost: string
  description: string
  howTo: string
  url?: string
  defaultStatus: BookingStatus
}

export type Hotel = {
  id: string
  city: string
  area: string
  dates: string
  nights: number
  note: string
  urgent?: boolean
  defaultStatus: BookingStatus
}

export const STORAGE_KEY = 'tokyo26-bookings'

export const bookings: Booking[] = [
  // ── Tier 1 — Book immediately ──
  {
    id: 'nintendo',
    tier: 1,
    name: 'Nintendo Museum',
    nameJa: '任天堂',
    location: 'Uji, Kyoto',
    day: 'Day 6 · Oct 14',
    deadline: 'Lottery opens ~Aug 2026 — set a reminder now',
    cost: '¥3,300 × 4 = ¥13,200',
    description: 'Lottery system. Window opens approximately 1–2 months before visit date. Highest priority booking on the entire trip. Miss the window and you cannot go.',
    howTo: 'nintendo.com/jp/nintendo-museum — lottery, book the moment it opens',
    url: 'https://www.nintendo.com/jp/nintendo-museum/',
    defaultStatus: 'pending',
  },
  {
    id: 'toyosu',
    tier: 1,
    name: 'Toyosu Tuna Auction',
    nameJa: '豊洲',
    location: 'Tokyo · Toyosu Market',
    day: 'Day 4 · Oct 12 · 5:30am',
    deadline: 'Registration opens 2 months before — sells out in minutes',
    cost: 'Free',
    description: 'Only 120 spots per day. Registration opens 2 months in advance and sells out almost instantly. Book the moment the window opens.',
    howTo: 'toyosu-market.or.jp — registration opens 2 months before',
    url: 'https://www.toyosu-market.or.jp/en/auction/',
    defaultStatus: 'pending',
  },

  // ── Tier 2 — Book 2–3 months before ──
  {
    id: 'sushi-kappo',
    tier: 2,
    name: 'Asakusa Sushi Kappō',
    nameJa: '鮨割烹',
    location: 'Tokyo · Asakusa',
    day: 'Day 16 · Oct 24 · Early sitting 6–7pm',
    deadline: 'Book before leaving Sweden — fills months out',
    cost: '¥20,000+ per person',
    description: 'Only 6 counter seats. Book the early sitting (6–7pm) given the late flight. NOTE: if baseball and omakase clash, move to Oct 23 after Nikko.',
    howTo: 'Email or call direct — international reservations accepted. Or via Tableall / Omakase.',
    defaultStatus: 'pending',
  },
  {
    id: 'yakitori-omakase',
    tier: 2,
    name: 'Yakitori Omakase',
    location: 'Kyoto',
    day: 'Day 7 · Oct 15 · Evening',
    deadline: 'Book before leaving Sweden',
    cost: '¥15,000–25,000 per person',
    description: 'Counter seating, chef-driven, skewer by skewer. High quality, completely drink-friendly. Books out weeks in advance.',
    howTo: 'tableall.com or omakase.in — book before departure',
    url: 'https://tableall.com',
    defaultStatus: 'pending',
  },
  {
    id: 'samurai',
    tier: 2,
    name: 'Kyoto Samurai Experience',
    location: 'Kyoto · Near Nijo Castle',
    day: 'Day 7 · Oct 15 · Afternoon',
    deadline: 'Book 2–3 months before',
    cost: '~¥12,000 per person',
    description: 'Traditional samurai training in a period setting near Nijo Castle. Book via their website or Viator.',
    howTo: 'waraku-kyoto.com or Viator',
    url: 'https://www.waraku-an.co.jp',
    defaultStatus: 'pending',
  },

  // ── Tier 3 — Book 1–2 months before ──
  {
    id: 'teamlab',
    tier: 3,
    name: 'teamLab Borderless',
    location: 'Tokyo · Azabudai Hills',
    day: 'Day 3 · Oct 11',
    deadline: 'Book 1–2 months before — sells out on weekends',
    cost: '¥3,200 per person',
    description: 'Timed entry. Sells out especially on weekends. Allow 2–3 hours.',
    howTo: 'borderless.teamlab.art — timed entry tickets online',
    url: 'https://borderless.teamlab.art',
    defaultStatus: 'pending',
  },
  {
    id: 'kappodo',
    tier: 3,
    name: 'Kappodo Knife Sharpening Class',
    location: 'Tokyo · Nishiazabu',
    day: 'Tokyo I — check availability',
    deadline: 'Email to check October availability',
    cost: '¥18,000 incl. meal',
    description: 'Optional — Chris only. Email to check October availability.',
    howTo: 'Email: front@kappodo.com',
    defaultStatus: 'pending',
  },

  {
    id: 'yebisu',
    tier: 3,
    name: 'Yebisu Museum of Beer — Tasting Tour',
    location: 'Tokyo II · Ebisu',
    day: 'Day 14 · Oct 22 · Late afternoon',
    deadline: 'Book 1–2 months before — slots fill up',
    cost: '~¥600–1,000 per person',
    description: 'Guided tasting tour of the historic Yebisu Brewery site. Oct 22 is a Thursday so availability should be fine, but book ahead regardless.',
    howTo: 'yebisu-museum.jp — book the guided tasting tour online',
    url: 'https://www.yebisu-museum.jp',
    defaultStatus: 'pending',
  },

  // ── Tier 4 — Watch: buy when matchup announced ──
  {
    id: 'baseball',
    tier: 4,
    name: 'Baseball — Climax / Japan Series',
    nameJa: '野球',
    location: 'Tokyo or Osaka',
    day: 'Oct 17 + Oct 24',
    deadline: 'Cannot book until matchup announced — monitor from late September',
    cost: '¥3,000–8,000 per person',
    description: 'Two potential games: Oct 17 (Osaka) and Oct 24 (Tokyo — perfect last night). The moment the matchup drops, move immediately — 4 together at a playoff game gone within hours. Climax Series begins Oct 10.',
    howTo: 'japansportsticket.com — buy the instant matchup is announced',
    url: 'https://www.japansportsticket.com',
    defaultStatus: 'watching',
  },
]

export const hotels: Hotel[] = [
  {
    id: 'hotel-tokyo-i',
    city: 'Tokyo I',
    area: 'Shinjuku',
    dates: 'Oct 9–13',
    nights: 4,
    note: 'Central Shinjuku — close to Omoide Yokocho and Golden Gai.',
    defaultStatus: 'pending',
  },
  {
    id: 'hotel-kyoto',
    city: 'Kyoto',
    area: '—',
    dates: 'Oct 13–16',
    nights: 3,
    note: 'Most important to book early. October is peak autumn foliage season — good hotels fill months in advance.',
    urgent: true,
    defaultStatus: 'pending',
  },
  {
    id: 'hotel-osaka',
    city: 'Osaka',
    area: 'Near Dotonbori',
    dates: 'Oct 16–19',
    nights: 3,
    note: 'Central, near Dotonbori. Arrange takuhaibin bag forwarding from Kyoto hotel.',
    defaultStatus: 'pending',
  },
  {
    id: 'hotel-hiroshima',
    city: 'Hiroshima',
    area: 'Near Peace Memorial',
    dates: 'Oct 19–20',
    nights: 1,
    note: 'Simple and central. Close to Peace Memorial Park.',
    defaultStatus: 'pending',
  },
  {
    id: 'hotel-tokyo-ii',
    city: 'Tokyo II',
    area: 'Ueno',
    dates: 'Oct 20–24',
    nights: 4,
    note: 'Ueno area. Easy access to Akihabara, Asakusa, and Ameyoko.',
    defaultStatus: 'pending',
  },
]
