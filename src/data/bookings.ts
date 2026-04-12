export type BookingStatus = 'pending' | 'done' | 'watching' | 'na'
export type BookingUrgency = 'lottery' | 'before-sweden' | 'book-online' | 'watch' | 'no-booking'

export type Booking = {
  id: string
  priority: number
  name: string
  nameJa?: string
  location: string
  dates: string
  urgency: BookingUrgency
  description: string
  howTo: string
  url?: string
  defaultStatus: BookingStatus
}

export type LogisticsItem = {
  id: string
  name: string
  notes: string
  url?: string
  defaultStatus: BookingStatus
}

export const bookings: Booking[] = [
  {
    id: 'nintendo',
    priority: 1,
    name: 'Nintendo Museum',
    nameJa: '任天堂',
    location: 'Uji',
    dates: 'Day 6 · Oct 14',
    urgency: 'lottery',
    description: 'Lottery tickets — window opens 1–2 months before the date. Highest priority booking on the entire trip. Do not miss the window.',
    howTo: 'museum.nintendo.com — lottery system, book the moment the window opens',
    url: 'https://museum.nintendo.com',
    defaultStatus: 'pending',
  },
  {
    id: 'sushi-kappo',
    priority: 2,
    name: 'Asakusa Sushi Kappō',
    nameJa: '鮨割烹',
    location: 'Tokyo · Asakusa',
    dates: 'Day 16 · Oct 24',
    urgency: 'before-sweden',
    description: '6 counter seats. Book the early sitting (6–7pm). ¥20,000+ per person. NOTE: if baseball and omakase clash, move to Oct 23 evening after Nikko.',
    howTo: 'Book directly or via Tableall / Omakase reservation service — months in advance',
    defaultStatus: 'pending',
  },
  {
    id: 'yakitori-omakase',
    priority: 3,
    name: 'Yakitori Omakase',
    location: 'Kyoto',
    dates: 'Day 7 · Oct 15',
    urgency: 'before-sweden',
    description: 'Counter seating, skewer by skewer, high quality, drink-friendly. ¥15,000–25,000 per person. The big Kyoto dinner.',
    howTo: 'Book via Tableall or Omakase — book before leaving Sweden',
    defaultStatus: 'pending',
  },
  {
    id: 'teamlab',
    priority: 4,
    name: 'teamLab Borderless',
    location: 'Tokyo · Azabudai Hills',
    dates: 'Day 3 · Oct 11',
    urgency: 'book-online',
    description: 'Sells out. Timed entry — allow 2–3 hours. Book well in advance.',
    howTo: 'borderless.teamlab.art — timed entry tickets online',
    url: 'https://borderless.teamlab.art',
    defaultStatus: 'pending',
  },
  {
    id: 'toyosu',
    priority: 5,
    name: 'Toyosu Tuna Auction',
    nameJa: '豊洲',
    location: 'Tokyo · Toyosu',
    dates: 'Day 4 · Oct 12 (optional)',
    urgency: 'lottery',
    description: '5:30am start. Extremely limited spots. Book immediately when the window opens — fills within minutes.',
    howTo: 'Toyosu Market official website — book immediately when window opens',
    url: 'https://www.shijou.metro.tokyo.lg.jp/toyosu/english/auction/',
    defaultStatus: 'pending',
  },
  {
    id: 'baseball',
    priority: 6,
    name: 'Baseball — Climax / Japan Series',
    nameJa: '野球',
    location: 'Osaka + Tokyo',
    dates: 'Oct 17 + Oct 24',
    urgency: 'watch',
    description: 'Two potential games. Buy the moment the matchup is announced. If Game 1 falls in Osaka on Oct 17, you\'re already there. Oct 24 in Tokyo is the dream last night.',
    howTo: 'japansportsticket.com — move immediately when matchup announced',
    url: 'https://www.japansportsticket.com',
    defaultStatus: 'watching',
  },
  {
    id: 'sumo',
    priority: 7,
    name: 'Arashio-beya Sumo Practice',
    nameJa: '荒汐部屋',
    location: 'Tokyo · Ryogoku',
    dates: 'Day 13 · Oct 21',
    urgency: 'no-booking',
    description: 'Free walk-in, no booking required. Check the stable\'s calendar closer to the date — practice isn\'t always open to visitors.',
    howTo: 'arashio.net — check the schedule once dates are confirmed',
    url: 'http://www.arashio.net',
    defaultStatus: 'na',
  },
  {
    id: 'funaoka',
    priority: 8,
    name: 'Funaoka Onsen',
    nameJa: '船岡温泉',
    location: 'Kyoto · Kuramaguchi',
    dates: 'Day 7 · Oct 15',
    urgency: 'no-booking',
    description: 'No booking needed. Open until midnight, ~¥500. Check tattoo policy on their website before going.',
    howTo: 'Walk-in only — just verify tattoo policy in advance',
    defaultStatus: 'na',
  },
]

export const logistics: LogisticsItem[] = [
  {
    id: 'flights',
    name: 'Flights',
    notes: 'ARN → HND · Oct 8. Return HND → ARN · Oct 25, departs 00:35.',
    defaultStatus: 'pending',
  },
  {
    id: 'hotels',
    name: 'Hotels — all 5 segments',
    notes: 'Shinjuku (Oct 9–13) · Kyoto (Oct 13–16) · Osaka (Oct 16–19) · Hiroshima (Oct 19–20) · Ueno (Oct 20–25). Arrange takuhaibin forwarding between Kyoto → Osaka.',
    defaultStatus: 'pending',
  },
  {
    id: 'jr-pass',
    name: 'JR Pass',
    notes: 'Buy before departure — not available in Japan. Covers all shinkansen legs plus Miyajima ferry.',
    defaultStatus: 'pending',
  },
  {
    id: 'esim',
    name: 'eSIM — Japan data',
    notes: 'Airalo or Ubigi Japan plan. Set up before departure so it works from the moment you land.',
    defaultStatus: 'pending',
  },
  {
    id: 'suica',
    name: 'Suica card',
    notes: 'Add to iPhone Wallet before departure. Works on all local trains, subway, buses, and convenience stores from day one.',
    defaultStatus: 'pending',
  },
]
