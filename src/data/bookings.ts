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
    id: 'shinkansen-osaka-fukuoka',
    tier: 1,
    name: 'Shinkansen — Osaka → Fukuoka (split day)',
    nameJa: '新幹線',
    location: 'Osaka → Hakata',
    day: 'Day 11 · Nov 9 · ~09:30 from Shin-Osaka · Friends via Hiroshima, Chris direct',
    deadline: 'Sales open Oct 9, 10:00 JST · EX Hayatoku until ~Oct 19',
    cost: 'Chris direct ~¥14,720 · Friends: Shin-Osaka → Hiroshima ~¥10,500 + Hiroshima → Hakata',
    description: 'Chris: Shin-Osaka → Hakata direct, about 09:30. The three: Shin-Osaka → Hiroshima on the same train, then Hiroshima → Hakata at 16:00 (fallback 17:00).',
    howTo: 'SmartEX — look for the discount "EX Hayatoku" fares',
    url: 'https://smart-ex.jp/en/',
    defaultStatus: 'pending',
  },
  {
    id: 'shinkansen-fukuoka-tokyo',
    tier: 1,
    name: 'Shinkansen — Fukuoka → Tokyo',
    nameJa: '新幹線',
    location: 'Hakata → Tokyo',
    day: 'Day 13 · Nov 11 · Depart 09:30–10:30',
    deadline: 'Sales open Oct 11, 10:00 JST · EX Hayatoku until ~Oct 21',
    cost: '~¥22,220 per person',
    description: '~5 hours, leaving between 09:30 and 10:30. Book seat E — the window on the two-seat side — for Mt Fuji: heading east it\'s on the left, about 45 minutes before Tokyo.',
    howTo: 'SmartEX — look for the discount "EX Hayatoku" fares',
    url: 'https://smart-ex.jp/en/',
    defaultStatus: 'pending',
  },
  {
    id: 'sumo',
    tier: 1,
    name: 'Fukuoka Grand Sumo Tournament',
    nameJa: '大相撲',
    location: 'Fukuoka · Fukuoka Kokusai Center',
    day: 'Day 12 · Nov 10 · Full day — lower divisions from morning, makuuchi finishing ~18:00',
    deadline: 'Not secured — trying the secondary market',
    cost: '¥3,500–8,000 per person',
    description: 'November basho at Fukuoka Kokusai Center — a full day, lower-division bouts from the morning building to the top-division makuuchi bouts finishing around 18:00. The ticket service we booked through failed and refunded us, so we\'re hunting resale tickets now. Same-day queue at the venue is the long shot.',
    howTo: 'Official resale and Ticket Oozumo — check regularly',
    url: 'https://www.sumo.or.jp',
    defaultStatus: 'pending',
  },
  // ── Tier 2 — Before leaving Sweden ──
  {
    id: 'shibuya-sky',
    tier: 2,
    name: 'Shibuya Sky — sunset slot',
    location: 'Tokyo I · Shibuya',
    day: 'Day 2 · Oct 31 · Entry 16:00–16:30, sunset ~16:50',
    deadline: 'Tickets open ~2 weeks ahead (~Oct 17) — verify, sunset slots sell out fast',
    cost: '¥2,000 per person',
    description: 'Timed entry observation deck above Shibuya Scramble. Aim for the slot around sunset (~16:50) — Oct 31 is a Saturday and those go first. Open until 10:30pm.',
    howTo: 'shibuya-sky.com — timed entry tickets online',
    url: 'https://www.shibuya-sky.com',
    defaultStatus: 'pending',
  },
  // ── Confirmed ──
  {
    id: 'shinkansen-tokyo-kyoto',
    tier: 1,
    name: 'Shinkansen — Tokyo → Kyoto',
    nameJa: '新幹線',
    location: 'Tokyo → Kyoto',
    day: 'Day 5 · Nov 3 · Nozomi 09:30 → 11:44',
    deadline: 'Booked',
    cost: '~¥14,200 per person',
    description: 'Booked for 4 adults. Nozomi, Tokyo 09:30 → Kyoto 11:44, on the Culture Day holiday.',
    howTo: 'Booked via SmartEX.',
    url: 'https://smart-ex.jp/en/',
    defaultStatus: 'done',
  },
  {
    id: 'teamlab-biovortex',
    tier: 2,
    name: 'teamLab Biovortex Kyoto',
    location: 'Kyoto · near Kyoto Station',
    day: 'Day 7 · Thu Nov 5 · 10:30 entry',
    deadline: 'Booked',
    cost: '~¥3,400–4,000 per person (+¥200 on site)',
    description: 'Booked, 10:30 entry. Arrive about 10:00 — 7–8 min walk from Kyoto Station Hachijo East exit. Plan about 2 hours; no re-entry, so use the lockers first. Uji for lunch after, then the Nintendo Museum.',
    howTo: 'Booked online via the official teamLab Biovortex site.',
    defaultStatus: 'done',
  },
  {
    id: 'flights',
    tier: 1,
    name: 'Flights — ARN ⇄ Tokyo',
    location: 'Arlanda → Tokyo · Haneda → home',
    day: 'Out Oct 29 09:35 · Home Nov 15 00:30 from Haneda',
    deadline: 'Booked',
    cost: '~11,000 kr per person',
    description: 'Out Thursday Oct 29 from Arlanda, landing Tokyo the morning of Oct 30. Home on the 00:30 out of Haneda — late Saturday night, Nov 14.',
    howTo: 'Booked.',
    defaultStatus: 'done',
  },
  {
    id: 'osaka-derby',
    tier: 1,
    name: 'Osaka Derby — Gamba Osaka vs Cerezo Osaka',
    location: 'Osaka · Panasonic Stadium Suita',
    day: 'Day 10 · Nov 8 · Kick-off 15:00',
    deadline: 'Booked',
    cost: 'Paid',
    description: 'Tickets secured. One of the most intense football atmospheres in Japan — the stadium was funded by 45,000 individual supporter donations.',
    howTo: 'Booked via the J.League ticket system. Leave Namba ~11:15.',
    defaultStatus: 'done',
  },
  {
    id: 'baseball',
    tier: 1,
    name: 'Baseball — Japan vs South Korea',
    nameJa: '野球',
    location: 'Tokyo II · Tokyo Dome',
    day: 'Day 15 · Nov 13 · 19:00',
    deadline: 'Booked',
    cost: 'Paid',
    description: 'Asia Professional Baseball Championship 2026 — a game nobody expected to get to, and a very welcome late addition. Rosters are young prospects (U-24). Suidobashi, Korakuen or Kasuga, ~20–25 min from Ueno. Ends ~22:00–22:30.',
    howTo: 'Booked.',
    defaultStatus: 'done',
  },
  {
    id: 'nintendo',
    tier: 1,
    name: 'Nintendo Museum',
    nameJa: '任天堂',
    location: 'Uji, Kyoto',
    day: 'Day 7 · Nov 5 · 15:30–16:00 — CONFIRMED',
    deadline: 'Confirmed and paid',
    cost: '¥3,300 × 4 = ¥13,200',
    description: 'Confirmed and paid — tickets secured via waitlist selection. Entry timing 15:30–16:00 JST. Bring passports — names must match the tickets. Allow 3 hours minimum.',
    howTo: 'Booked via nintendo.com/jp/nintendo-museum waitlist selection',
    url: 'https://www.nintendo.com/jp/nintendo-museum/',
    defaultStatus: 'done',
  },
  {
    id: 'samurai-restaurant',
    tier: 2,
    name: 'Samurai Restaurant — Kabukicho',
    location: 'Tokyo I · Kabukicho, Shinjuku',
    day: 'Day 1 · Oct 30 · 16:20',
    deadline: 'Booked',
    cost: 'TBD — show + drinks or show + meal package',
    description: 'High-energy dinner show, spiritual successor to the old Robot Restaurant. Glittering costumes, choreographed sword fights, dance, lights, noise. Booked for arrival day to keep everyone awake through the jet lag. Treat it as spectacle, not dinner. 18+, bring passports as ID.',
    howTo: 'Booked — show ends around 17:30–18:00',
    defaultStatus: 'done',
  },
  {
    id: 'wagyu-kyoto',
    tier: 2,
    name: 'Wagyu Dinner — Kyo-Yakiniku HIRO Pontocho Annex',
    location: 'Pontocho, Kyoto',
    day: 'Day 5 · Nov 3 · 19:00',
    deadline: 'Booked',
    cost: '¥8,000 per person — Omakase Hiro course',
    description: 'Kyoto wagyu beef restaurant, Pontocho. Booked for 4 adults, Omakase Hiro course. A strong, relaxed start to Kyoto\'s food scene on arrival night.',
    howTo: 'Booked direct.',
    defaultStatus: 'done',
  },
  {
    id: 'wagyu-osaka',
    tier: 2,
    name: 'Wagyu Dinner — Matsuzaka Gyu Yakiniku M',
    location: 'Hozenji-Yokocho, Osaka',
    day: 'Day 9 · Nov 7 · 19:00',
    deadline: 'Booked',
    cost: 'TBD',
    description: 'Hozenji-Yokocho, 19:00. Grill-your-own Matsuzaka beef, one of Japan\'s most prized wagyu grades alongside Kobe and Omi. A proper anchor dinner for the Osaka leg.',
    howTo: 'Booked in advance.',
    defaultStatus: 'done',
  },
  // ── Optional ──
  {
    id: 'yebisu',
    tier: 3,
    name: 'Yebisu Museum of Beer — Guided Tour',
    location: 'Tokyo I · Ebisu',
    day: 'Day 4 · Nov 2 · From 12:00',
    deadline: 'Optional — the tour needs advance reservation',
    cost: '~¥1,800 per person',
    description: 'Museum and taproom are walk-in; only the guided tour needs booking. Monday hours start at 12:00. Cashless only.',
    howTo: 'yebisu-museum.jp — reserve the guided tour online',
    url: 'https://www.yebisu-museum.jp',
    defaultStatus: 'pending',
  },
  {
    id: 'yamazaki',
    tier: 4,
    name: 'Yamazaki Distillery Tour',
    location: 'Yamazaki, near Kyoto',
    day: 'Day 7 · Nov 5 · Morning — alternative only',
    deadline: 'Only if a reallocated tour slot appears',
    cost: 'TBD',
    description: 'Alternative to teamLab Biovortex on the Nov 5 morning, only if a reallocated Suntory tour slot shows up.',
    howTo: 'suntory.com/factory/yamazaki — check for reallocated tour slots',
    defaultStatus: 'watching',
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
    checkIn: 'Nov 6, 15:00',
    checkOut: 'Nov 9, 11:00',
    dates: 'Nov 6–9',
    nights: 3,
    note: 'Booked — 3 nights, includes the Osaka Derby night on Nov 8. Bags forwarded from TSUGU Kyoto on Nov 5, delivered here Nov 6.',
    defaultStatus: 'done',
  },
  {
    id: 'hotel-fukuoka',
    city: 'Fukuoka',
    area: 'Hakata',
    name: '& Hotel Hakata',
    checkIn: 'Nov 9, 15:00',
    checkOut: 'Nov 11, 11:00',
    dates: 'Nov 9–11',
    nights: 2,
    note: 'Booked. Hakata area, close to Kokusai Center and the yatai stalls at Nakasu.',
    defaultStatus: 'done',
  },  {
    id: 'hotel-tokyo-ii',
    city: 'Tokyo II',
    area: 'Ueno',
    name: '&Here TOKYO UENO',
    checkIn: 'Nov 11, 15:00',
    checkOut: 'Nov 14, 11:00',
    dates: 'Nov 11–14',
    nights: 3,
    note: 'Booked. Checkout is the morning of the last full day (Nov 14) — bags get stored for the day before heading to Haneda that night. Ueno area, easy access to Akihabara, Asakusa, and Ameyoko.',
    defaultStatus: 'done',
  },
]
