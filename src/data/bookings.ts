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
    id: 'shinkansen-tokyo-kyoto',
    tier: 1,
    name: 'Shinkansen — Tokyo → Kyoto',
    nameJa: '新幹線',
    location: 'Tokyo → Kyoto',
    day: 'Day 5 · Nov 3 · Morning',
    deadline: 'Reserved seats open Oct 3, 10:00 JST — Nov 3 is a national holiday',
    cost: '~¥14,200 per person',
    description: 'Culture Day holiday, so reserved seats on the morning trains will go fast. Book the moment the window opens, all four seats together.',
    howTo: 'SmartEX — reserved seats open one month before at 10:00 JST',
    url: 'https://smart-ex.jp/en/',
    defaultStatus: 'pending',
  },
  {
    id: 'shinkansen-osaka-hiroshima',
    tier: 1,
    name: 'Shinkansen — Shin-Osaka → Hiroshima',
    nameJa: '新幹線',
    location: 'Osaka → Hiroshima',
    day: 'Day 11 · Nov 9 · Late morning',
    deadline: 'Reserved seats open Oct 9, 10:00 JST',
    cost: '~¥10,500 per person',
    description: '~1h25–1h30. After the 11:00 checkout at &Here OSAKA NAMBA.',
    howTo: 'SmartEX — reserved seats open one month before at 10:00 JST',
    url: 'https://smart-ex.jp/en/',
    defaultStatus: 'pending',
  },
  {
    id: 'shinkansen-hiroshima-tokyo',
    tier: 1,
    name: 'Shinkansen — Hiroshima → Tokyo',
    nameJa: '新幹線',
    location: 'Hiroshima → Tokyo',
    day: 'Day 12 · Nov 10 · Early afternoon, after Miyajima',
    deadline: 'Reserved seats open Oct 10, 10:00 JST',
    cost: '~¥19,400 per person',
    description: 'Nozomi, ~3h50–4h. Leave from Hiroshima Station after ~13:00. E seats for the Mt Fuji side.',
    howTo: 'SmartEX — reserved seats open one month before at 10:00 JST',
    url: 'https://smart-ex.jp/en/',
    defaultStatus: 'pending',
  },
  {
    id: 'osaka-derby',
    tier: 1,
    name: 'Osaka Derby — Gamba Osaka vs Cerezo Osaka',
    location: 'Osaka · Panasonic Stadium Suita',
    day: 'Day 10 · Nov 8 · Kick-off typically 14:00–15:00',
    deadline: 'On sale Sat Oct 3, 03:00 Swedish time',
    cost: 'TBD — check J.League ticket system',
    description: 'One of the most intense football atmospheres in Japan — the stadium was funded by 45,000 individual supporter donations. Set an alarm: tickets go on sale in the middle of the Swedish night.',
    howTo: 'J.League ticket system — confirm exact kick-off time when buying',
    defaultStatus: 'pending',
  },
  // ── Tier 2 — Before leaving Sweden ──
  {
    id: 'shibuya-sky',
    tier: 2,
    name: 'Shibuya Sky — sunset slot',
    location: 'Tokyo I · Shibuya',
    day: 'Day 2 · Oct 31 · Sunset ~16:50',
    deadline: 'Tickets open ~2 weeks ahead (~Oct 17) — verify, sunset slots sell out fast',
    cost: '¥2,000 per person',
    description: 'Timed entry observation deck above Shibuya Scramble. Aim for the slot around sunset (~16:50) — Oct 31 is a Saturday and those go first. Open until 10:30pm.',
    howTo: 'shibuya-sky.com — timed entry tickets online',
    url: 'https://www.shibuya-sky.com',
    defaultStatus: 'pending',
  },
  {
    id: 'teamlab-biovortex',
    tier: 2,
    name: 'teamLab Biovortex Kyoto',
    location: 'Kyoto · near Kyoto Station',
    day: 'Day 7 · Nov 5 · Morning, start ~10:00',
    deadline: 'Book online before the day — check Nov 5 isn\'t a closed day',
    cost: '~¥3,400–4,000 per person (+¥200 on site)',
    description: '7–8 min walk from Kyoto Station Hachijo East exit. Open 9:00–21:00, last entry 19:30. Allow 2–3 hours before heading to the Nintendo Museum.',
    howTo: 'Official teamLab Biovortex site — online tickets',
    defaultStatus: 'pending',
  },
  // ── Confirmed ──
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
    id: 'hotel-hiroshima',
    city: 'Hiroshima',
    area: '—',
    dates: 'Nov 9–10',
    nights: 1,
    note: 'Booked — hotel name to be added. One night; leave bags here or in station lockers for the Miyajima morning.',
    defaultStatus: 'done',
  },
  {
    id: 'hotel-tokyo-ii',
    city: 'Tokyo II',
    area: 'Ueno',
    name: '&Here TOKYO UENO',
    checkIn: 'Nov 10, 15:00',
    checkOut: 'Nov 14, 11:00',
    dates: 'Nov 10–14',
    nights: 4,
    note: 'Booked. Arrive early evening Nov 10 from Hiroshima. Checkout is the morning of the last full day (Nov 14) — bags get stored for the day before heading to Haneda that night. Ueno area, easy access to Akihabara, Asakusa, and Ameyoko.',
    defaultStatus: 'done',
  },
]
