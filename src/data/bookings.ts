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
  name?: string
  checkIn?: string
  checkOut?: string
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
    day: 'Day 12 · Nov 10 · Full day — lower divisions from morning, makuuchi finishing ~18:00',
    deadline: 'Tickets go on sale Sept 19 — buy immediately',
    cost: '¥3,500–8,000 per person',
    description: 'November basho at Fukuoka Kokusai Center. Now the only tournament day on the trip — a full day, lower-division bouts from the morning building to the top-division makuuchi bouts finishing around 18:00. Arranged via a foreigner-friendly ticket firm. Tickets sell out fast once the sale opens.',
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
    day: 'Day 7 · Nov 5 — PRELIMINARY, lottery pending',
    deadline: 'Lottery opens ~Aug 2026 — set a reminder now',
    cost: '¥3,300 × 4 = ¥13,200',
    description: 'Lottery system. Window opens approximately 1–2 months before visit date. Highest priority booking on the entire trip. Currently entered for Nov 5 but not yet confirmed — if tickets aren\'t secured for this date, the Day 6/7 Kyoto schedule may need to be reworked. Update once the lottery result is known.',
    howTo: 'nintendo.com/jp/nintendo-museum — lottery, book the moment it opens',
    url: 'https://www.nintendo.com/jp/nintendo-museum/',
    defaultStatus: 'pending',
  },
  {
    id: 'osaka-derby',
    tier: 4,
    name: 'Osaka Derby — Gamba Osaka vs Cerezo Osaka',
    location: 'Osaka · Panasonic Stadium Suita',
    day: 'Day 10 · Nov 8 · Kick-off typically 14:00–15:00',
    deadline: 'Buy via J.League ticket system once fixtures are confirmed',
    cost: 'TBD — check J.League ticket system',
    description: 'One of the most intense football atmospheres in Japan — the stadium was funded by 45,000 individual supporter donations. Also means the Osaka hotel needs extending by one night (Nov 8 → 9).',
    howTo: 'J.League ticket system — check exact kick-off time and buy once fixtures are confirmed',
    defaultStatus: 'watching',
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
    description: 'Only 6 counter seats. Book the early sitting (6–7pm) given the late flight. The anchor of the last evening — book before anything else after the Nintendo Museum lottery.',
    howTo: 'Email or call direct — international reservations accepted. Or via Tableall / Omakase.',
    defaultStatus: 'pending',
  },
  {
    id: 'yakitori-omakase',
    tier: 2,
    name: 'Yakitori Omakase',
    location: 'Kyoto',
    day: 'Day 6 · Nov 4 · Evening',
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
    day: 'Day 6 · Nov 4 · Afternoon',
    deadline: 'Book 2–3 months before — research options and confirm group size',
    cost: '~¥25,000 (Nishiki option) — varies by venue',
    description: 'Three options to research before departure: Tsuneshin\'s at Furukawacho Shopping Arcade (30-year veteran artisan), workshop near Nishiki Market via whereandwander.com (¥25,000), or Shirakawa Japanese Culture Experiences (knife sharpening + sake tasting combined). Allow 2 hours. Decide and book before leaving Sweden.',
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
    day: 'Day 15 · Nov 13 · Late afternoon',
    deadline: 'Book 1–2 months before — slots fill up',
    cost: '~¥600–1,000 per person',
    description: 'Guided tasting tour of the historic Yebisu Brewery site. Nov 13 is a Friday so book ahead regardless. Day 15 fits naturally after Senso-ji and Kappabashi.',
    howTo: 'yebisu-museum.jp — book the guided tasting tour online',
    url: 'https://www.yebisu-museum.jp',
    defaultStatus: 'pending',
  },

  {
    id: 'nikko-pass',
    tier: 3,
    name: 'Nikko Pass — OPTIONAL',
    location: 'Tokyo II · Tobu Asakusa Station',
    day: 'Day 16 · Nov 14 · Buy on the day, if the group decides to do Nikko',
    deadline: 'No advance booking — decide as a group the night before, buy at Tobu Asakusa Station ticket window on the morning',
    cost: '~¥4,780 per person (2-day pass)',
    description: 'Nikko is now optional rather than fixed — folded into the last day, alternative to a calmer pace around Ueno. If the group goes: buy at Tobu Asakusa Station on the morning of Day 16. Covers the Tobu limited express to Tobu-Nikko (~1h50) and all local buses in Nikko — cheaper than separate return tickets. No need to book in advance.',
    howTo: 'Buy at Tobu Asakusa Station ticket window on departure morning — no reservation needed',
    defaultStatus: 'pending',
  },

]

export const hotels: Hotel[] = [
  {
    id: 'hotel-tokyo-i',
    city: 'Tokyo I',
    area: 'Shinjuku',
    name: '&Here SHINJUKU',
    checkIn: 'Oct 30, 15:00',
    checkOut: 'Nov 3, 11:00',
    dates: 'Oct 30 – Nov 3',
    nights: 4,
    note: 'Booked. Central Shinjuku — close to Omoide Yokocho and Golden Gai.',
    defaultStatus: 'done',
  },
  {
    id: 'hotel-kyoto',
    city: 'Kyoto',
    area: '—',
    name: 'TSUGU Kyoto Sanjo by THE SHARE HOTELS',
    checkIn: 'Nov 3, 15:00',
    checkOut: 'Nov 6, 10:00',
    dates: 'Nov 3–6',
    nights: 3,
    note: 'Booked. October is peak autumn foliage season — good thing this one\'s locked in.',
    defaultStatus: 'done',
  },
  {
    id: 'hotel-osaka',
    city: 'Osaka',
    area: 'Near Dotonbori',
    name: '&Here OSAKA NAMBA',
    dates: 'Nov 6–9',
    nights: 3,
    note: 'Booked through Nov 8 — needs extending by one night to Nov 9 for the Osaka Derby. Arrange takuhaibin bag forwarding from the Kyoto hotel.',
    urgent: true,
    defaultStatus: 'pending',
  },
  {
    id: 'hotel-fukuoka',
    city: 'Fukuoka',
    area: 'Hakata',
    name: '& Hotel Hakata',
    dates: 'Nov 9–11',
    nights: 2,
    note: 'Currently booked Nov 8–10 — needs shifting one day later to Nov 9–11 to match the Osaka Derby extension. Hakata area, close to Kokusai Center and the yatai stalls at Nakasu.',
    urgent: true,
    defaultStatus: 'pending',
  },
  {
    id: 'hotel-tokyo-ii',
    city: 'Tokyo II',
    area: 'Ueno',
    dates: 'Nov 11–14',
    nights: 3,
    note: 'Not yet booked. Ueno area, easy access to Akihabara, Asakusa, and Ameyoko.',
    defaultStatus: 'pending',
  },
]
