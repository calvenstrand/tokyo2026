import { dateRange, departure, dayLabel, homeFlight, monthDay, stays } from './trip'

export type BookingStatus = 'pending' | 'done' | 'watching' | 'na'

type BookingEntry = {
  id: string
  tier: 1 | 2 | 3 | 4
  name: string
  nameJa?: string
  location: string
  /** Trip day (YYYY-MM-DD) — the "Day N · Mon D" label is built from it. */
  date?: string
  /** Time and detail on that day. */
  when: string
  deadline: string
  cost: string
  description: string
  howTo: string
  url?: string
  defaultStatus: BookingStatus
}

type HotelEntry = {
  id: string
  /** City id in itinerary.ts — dates and nights come from there. */
  cityId: string
  area: string
  name?: string
  checkInTime: string
  checkOutTime: string
  note: string
  urgent?: boolean
  defaultStatus: BookingStatus
}

export type Hotel = HotelEntry & {
  city: string
  dates: string
  nights: number
  checkIn: string
  checkOut: string
}

export type Booking = BookingEntry & { day: string }

export const STORAGE_KEY = 'tokyo26-bookings'

const bookingEntries: BookingEntry[] = [
  // ── Tier 1 — Book immediately ──
  {
    id: 'shinkansen-osaka-fukuoka',
    tier: 1,
    name: 'Shinkansen — Osaka → Fukuoka (split day)',
    nameJa: '新幹線',
    location: 'Osaka → Hakata',
    date: '2026-11-09',
    when: '~09:30 from Shin-Osaka · Friends via Hiroshima, Chris direct',
    deadline: 'Booked',
    cost: 'Chris direct ~¥14,720 · Friends: Shin-Osaka → Hiroshima ~¥10,500 + Hiroshima → Hakata',
    description: 'Chris: Shin-Osaka → Hakata direct, about 09:30. The three: Shin-Osaka → Hiroshima on the same train, then Hiroshima → Hakata at 16:00.',
    howTo: 'Booked via SmartEX.',
    url: 'https://smart-ex.jp/en/',
    defaultStatus: 'done',
  },
  {
    id: 'shinkansen-fukuoka-tokyo',
    tier: 1,
    name: 'Shinkansen — Fukuoka → Tokyo',
    nameJa: '新幹線',
    location: 'Hakata → Tokyo',
    date: '2026-11-11',
    when: 'Depart 09:30–10:30',
    deadline: 'Booked',
    cost: '~¥22,220 per person',
    description: '~5 hours, leaving between 09:30 and 10:30. Seat E — the window on the two-seat side — for Mt Fuji: heading east it\'s on the left, about 45 minutes before Tokyo.',
    howTo: 'Booked via SmartEX.',
    url: 'https://smart-ex.jp/en/',
    defaultStatus: 'done',
  },
  {
    id: 'sumo',
    tier: 1,
    name: 'Fukuoka Grand Sumo Tournament',
    nameJa: '大相撲',
    location: 'Fukuoka · Fukuoka Kokusai Center',
    date: '2026-11-10',
    when: 'Full day — lower divisions from morning, makuuchi finishing ~18:00',
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
    date: '2026-10-31',
    when: 'Entry 16:00–16:30, sunset ~16:50',
    deadline: 'Booked',
    cost: '¥2,000 per person',
    description: 'Timed entry observation deck above Shibuya Scramble, booked for the slot before sunset (~16:50). Open until 10:30pm.',
    howTo: 'Booked via shibuya-sky.com.',
    url: 'https://www.shibuya-sky.com',
    defaultStatus: 'done',
  },
  // ── Confirmed ──
  {
    id: 'shinkansen-tokyo-kyoto',
    tier: 1,
    name: 'Shinkansen — Tokyo → Kyoto',
    nameJa: '新幹線',
    location: 'Tokyo → Kyoto',
    date: '2026-11-03',
    when: 'Nozomi 09:30 → 11:44',
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
    date: '2026-11-05',
    when: '10:30 entry',
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
    when: `Out ${monthDay(departure.isoDate)} ${departure.time} · Home ${monthDay(homeFlight.isoDate)} ${homeFlight.time} from Haneda`,
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
    date: '2026-11-08',
    when: 'Kick-off 15:00',
    deadline: 'Booked',
    cost: 'Paid',
    description: 'Tickets secured. One of the most intense football atmospheres in Japan — the stadium was funded by 45,000 individual supporter donations.',
    howTo: 'Booked via the J.League ticket system. Osaka Castle in the morning, leave from there ~11:15.',
    defaultStatus: 'done',
  },
  {
    id: 'baseball',
    tier: 1,
    name: 'Baseball — Japan vs South Korea',
    nameJa: '野球',
    location: 'Tokyo II · Tokyo Dome',
    date: '2026-11-13',
    when: '19:00',
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
    date: '2026-11-05',
    when: '15:30–16:00 — CONFIRMED',
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
    date: '2026-10-30',
    when: '16:20',
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
    date: '2026-11-03',
    when: '19:00',
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
    date: '2026-11-07',
    when: '19:00',
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
    date: '2026-11-02',
    when: 'From 12:00',
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
    date: '2026-11-05',
    when: 'Morning — alternative only',
    deadline: 'Only if a reallocated tour slot appears',
    cost: 'TBD',
    description: 'Alternative to teamLab Biovortex on the Nov 5 morning, only if a reallocated Suntory tour slot shows up.',
    howTo: 'suntory.com/factory/yamazaki — check for reallocated tour slots',
    defaultStatus: 'watching',
  },
]

const hotelEntries: HotelEntry[] = [
  {
    id: 'hotel-tokyo-i',
    cityId: 'tokyo-i',
    area: 'Shinjuku',
    name: '&Here SHINJUKU',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    note: 'Booked. Central Shinjuku — close to Omoide Yokocho and Golden Gai.',
    defaultStatus: 'done',
  },
  {
    id: 'hotel-kyoto',
    cityId: 'kyoto',
    area: '—',
    name: 'TSUGU Kyoto Sanjo by THE SHARE HOTELS',
    checkInTime: '15:00',
    checkOutTime: '10:00',
    note: 'Booked. Kyoto in November is foliage season — good thing this one\'s locked in.',
    defaultStatus: 'done',
  },
  {
    id: 'hotel-osaka',
    cityId: 'osaka',
    area: 'Near Dotonbori',
    name: '&Here OSAKA NAMBA',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    note: 'Booked — 3 nights, includes the Osaka Derby night on Nov 8. Bags forwarded from TSUGU Kyoto on Nov 5, delivered here Nov 6.',
    defaultStatus: 'done',
  },
  {
    id: 'hotel-fukuoka',
    cityId: 'fukuoka',
    area: 'Hakata',
    name: '& Hotel Hakata',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    note: 'Booked. Hakata area, close to Kokusai Center and the yatai stalls at Nakasu.',
    defaultStatus: 'done',
  },
  {
    id: 'hotel-tokyo-ii',
    cityId: 'tokyo-ii',
    area: 'Ueno',
    name: '&Here TOKYO UENO',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    note: 'Booked. Checkout is the morning of the last full day (Nov 14) — bags get stored for the day before heading to Haneda that night. Ueno area, easy access to Akihabara, Asakusa, and Ameyoko.',
    defaultStatus: 'done',
  },
]

export const bookings: Booking[] = bookingEntries.map((b) => ({
  ...b,
  day: b.date ? `${dayLabel(b.date)} · ${b.when}` : b.when,
}))

export const hotels: Hotel[] = hotelEntries.map((h) => {
  const stay = stays.find((s) => s.cityId === h.cityId)
  if (!stay) throw new Error(`hotel ${h.id}: no city "${h.cityId}" in the itinerary`)
  return {
    ...h,
    city: stay.name,
    dates: dateRange(stay.checkIn, stay.checkOut),
    nights: stay.nights,
    checkIn: `${monthDay(stay.checkIn)}, ${h.checkInTime}`,
    checkOut: `${monthDay(stay.checkOut)}, ${h.checkOutTime}`,
  }
})
