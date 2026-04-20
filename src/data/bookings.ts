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
    id: 'sumo',
    tier: 1,
    name: 'Fukuoka Grand Sumo Tournament',
    nameJa: '大相撲',
    location: 'Fukuoka · Fukuoka Kokusai Center',
    day: 'Day 11 · Nov 9 · Afternoon bouts from 2:30pm',
    deadline: 'Tickets go on sale Sept 19 — buy immediately',
    cost: '¥3,500–8,000 per person',
    description: 'November basho at Fukuoka Kokusai Center. Top-division bouts from 2:30pm, final bout around 5:30–6pm. Tickets sell out fast for top-division sessions once the sale opens.',
    howTo: 'sumo.or.jp — tickets go on sale Sept 19. Buy immediately.',
    url: 'https://www.sumo.or.jp',
    defaultStatus: 'pending',
  },
  {
    id: 'nintendo',
    tier: 1,
    name: 'Nintendo Museum',
    nameJa: '任天堂',
    location: 'Uji, Kyoto',
    day: 'Day 6 · Nov 4',
    deadline: 'Lottery opens ~Aug 2026 — set a reminder now',
    cost: '¥3,300 × 4 = ¥13,200',
    description: 'Lottery system. Window opens approximately 1–2 months before visit date. Highest priority booking on the entire trip. Miss the window and you cannot go.',
    howTo: 'nintendo.com/jp/nintendo-museum — lottery, book the moment it opens',
    url: 'https://www.nintendo.com/jp/nintendo-museum/',
    defaultStatus: 'pending',
  },
  // ── Tier 2 — Book 2–3 months before ──
  {
    id: 'sushi-kappo',
    tier: 2,
    name: 'Asakusa Sushi Kappō',
    nameJa: '鮨割烹',
    location: 'Tokyo · Asakusa',
    day: 'Day 16 · Nov 14 · Early sitting 6–7pm',
    deadline: 'Book before leaving Sweden — fills months out',
    cost: '¥20,000+ per person',
    description: 'Only 6 counter seats. Book the early sitting (6–7pm) given the late flight. NOTE: if baseball and omakase clash on Nov 14, move omakase to Nov 12.',
    howTo: 'Email or call direct — international reservations accepted. Or via Tableall / Omakase.',
    defaultStatus: 'pending',
  },
  {
    id: 'yakitori-omakase',
    tier: 2,
    name: 'Yakitori Omakase',
    location: 'Kyoto',
    day: 'Day 7 · Nov 5 · Evening',
    deadline: 'Book before leaving Sweden',
    cost: '¥15,000–25,000 per person',
    description: 'Counter seating, chef-driven, skewer by skewer. High quality, completely drink-friendly. Books out weeks in advance.',
    howTo: 'tableall.com or omakase.in — book before departure',
    url: 'https://tableall.com',
    defaultStatus: 'pending',
  },
  {
    id: 'knife-kyoto',
    tier: 2,
    name: 'Knife Sharpening Class — Kyoto',
    location: 'Kyoto',
    day: 'Day 7 · Nov 5 · Afternoon',
    deadline: 'Book 2–3 months before — research options and confirm group size',
    cost: '~¥25,000 (Nishiki option, includes Sakai knife) — varies by venue',
    description: 'Three options to research before departure: Tsuneshin\'s at Furukawacho Shopping Arcade (30-year veteran artisan), workshop near Nishiki Market via whereandwander.com (includes Sakai knife, ¥25,000), or Shirakawa Japanese Culture Experiences (knife sharpening + sake tasting combined). Allow 2 hours. Decide and book before leaving Sweden.',
    howTo: 'whereandwander.com for Nishiki option · Shirakawa Japanese Culture Experiences for combo · Tsuneshin\'s direct booking',
    defaultStatus: 'pending',
  },

  {
    id: 'shibuya-sky',
    tier: 2,
    name: 'Shibuya Sky',
    location: 'Tokyo I · Shibuya',
    day: 'Day 2 · Oct 31 · Evening',
    deadline: 'Book 1–2 months before — Saturday evenings sell out well in advance',
    cost: '¥2,000 per person',
    description: 'Timed entry observation deck above Shibuya Scramble. Book in advance — Oct 31 is a Saturday evening and will sell out. Open until 10:30pm.',
    howTo: 'shibuya-sky.com — timed entry tickets online',
    url: 'https://www.shibuya-sky.com',
    defaultStatus: 'pending',
  },
  // ── Tier 3 — Book 1–2 months before ──
  {
    id: 'teamlab',
    tier: 3,
    name: 'teamLab Borderless',
    location: 'Tokyo I · Azabudai Hills',
    day: 'Day 4 · Nov 2 · Afternoon',
    deadline: 'Book 1–2 months before — weekday afternoon, availability should be fine',
    cost: '¥3,200 per person',
    description: 'Timed entry. Allow 2–3 hours. Azabudai Hills is in Minato-ku — fits the Tokyo I leg naturally on the final afternoon before the Shinkansen west.',
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
    deadline: 'Email to check November availability',
    cost: '¥18,000 incl. meal',
    description: 'Optional — Chris only. Email to check November availability.',
    howTo: 'Email: front@kappodo.com',
    defaultStatus: 'pending',
  },

  {
    id: 'yebisu',
    tier: 3,
    name: 'Yebisu Museum of Beer — Tasting Tour',
    location: 'Tokyo II · Ebisu',
    day: 'Day 14 · Nov 12 · Late afternoon',
    deadline: 'Book 1–2 months before — slots fill up',
    cost: '~¥600–1,000 per person',
    description: 'Guided tasting tour of the historic Yebisu Brewery site. Nov 12 is a Thursday so availability should be fine, but book ahead regardless. Day 14 fits naturally after Senso-ji and Kappabashi.',
    howTo: 'yebisu-museum.jp — book the guided tasting tour online',
    url: 'https://www.yebisu-museum.jp',
    defaultStatus: 'pending',
  },

  {
    id: 'nikko-pass',
    tier: 3,
    name: 'Nikko Pass',
    location: 'Tokyo II · Tobu Asakusa Station',
    day: 'Day 15 · Nov 13 · Buy on the day',
    deadline: 'No advance booking — buy at Tobu Asakusa Station ticket window on the morning',
    cost: '~¥4,780 per person (2-day pass)',
    description: 'Buy at Tobu Asakusa Station on the morning of Day 15. Covers the Tobu limited express to Tobu-Nikko (~1h50) and all local buses in Nikko — cheaper than separate return tickets. No need to book in advance. Keep the pass for the return journey.',
    howTo: 'Buy at Tobu Asakusa Station ticket window on departure morning — no reservation needed',
    defaultStatus: 'pending',
  },

  // ── Tier 4 — Watch: buy when matchup announced ──
  {
    id: 'baseball',
    tier: 4,
    name: 'Baseball — Climax / Japan Series',
    nameJa: '野球',
    location: 'Tokyo or Osaka',
    day: 'Nov 7 + Nov 14',
    deadline: 'Cannot book until matchup announced — monitor from late September',
    cost: '¥3,000–8,000 per person',
    description: 'Two potential games: Nov 7 (Osaka) and Nov 14 (Tokyo — perfect last night). The moment the matchup drops, move immediately — 4 together at a playoff game gone within hours. Climax Series begins Oct 10.',
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
    dates: 'Oct 30 – Nov 3',
    nights: 4,
    note: 'Central Shinjuku — close to Omoide Yokocho and Golden Gai.',
    defaultStatus: 'pending',
  },
  {
    id: 'hotel-kyoto',
    city: 'Kyoto',
    area: '—',
    dates: 'Nov 3–6',
    nights: 3,
    note: 'Most important to book early. October is peak autumn foliage season — good hotels fill months in advance.',
    urgent: true,
    defaultStatus: 'pending',
  },
  {
    id: 'hotel-osaka',
    city: 'Osaka',
    area: 'Near Dotonbori',
    dates: 'Nov 6–8',
    nights: 2,
    note: 'Central, near Dotonbori. Arrange takuhaibin bag forwarding from Kyoto hotel.',
    defaultStatus: 'pending',
  },
  {
    id: 'hotel-fukuoka',
    city: 'Fukuoka',
    area: 'Hakata',
    dates: 'Nov 8–10',
    nights: 2,
    note: 'Hakata area — close to Kokusai Center and the yatai stalls at Nakasu.',
    defaultStatus: 'pending',
  },
  {
    id: 'hotel-tokyo-ii',
    city: 'Tokyo II',
    area: 'Ueno',
    dates: 'Nov 10–14',
    nights: 4,
    note: 'Ueno area. Easy access to Akihabara, Asakusa, and Ameyoko.',
    defaultStatus: 'pending',
  },
]
