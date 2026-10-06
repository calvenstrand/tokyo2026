import { cities } from './itinerary'
import shoppingData from '../lib/data/shopping-data.json'

// Personal shopping tracker for /shop. Types, stages and holidays live here;
// the areas and shops themselves come from src/lib/data/shopping-data.json.
// No sizes, prices or budgets in either. Hours only count when verified —
// unverified shops always read "Hours unverified", whatever their weekly says.

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6 // 0 = Sunday
export type City = 'tokyo' | 'kyoto' | 'osaka' | 'fukuoka'
export type Kind = 'clothes' | 'things'
export type Category =
  'knives' | 'vinyl' | 'jeans' | 'golf' | 'whisky' | 'posters' | 'merch' | 'other'

export interface Hours {
  weekly: Partial<Record<Weekday, [open: string, close: string] | 'closed'>> // 'HH:mm'; missing = unknown
  holidays?: 'as-sunday' | 'open' | 'closed'
  note?: string
}

export interface Shop {
  id: string
  name: string
  nameJa?: string
  chain?: string
  city: City
  area: string // id in AREAS
  kind: Kind[]
  categories: Category[]
  priority: 'must' | 'maybe' // overall importance, not a schedule
  plannedDates: string[] // ISO 'YYYY-MM-DD' — days the shop is a target
  tentative?: boolean // target plan not final
  optionalDates?: string[] // days it's a nice-to-have because it's nearby; never the same date as plannedDates
  alternativeIds?: string[] // fallback shops
  address?: string
  station?: string
  floor?: string
  lat?: number // optional, to be filled in later
  lng?: number
  mapsQuery?: string // overrides default query
  hours: Hours
  tip?: string
  verified: { hours: boolean; checkedOn?: string }
}

export interface Area {
  id: string
  city: City
  label: string
}

export interface Stage {
  /** Same id as the city in itinerary.ts. */
  id: string
  city: City
  label: string
  /** Inclusive. */
  start: string
  /** Exclusive. */
  end: string
}

export const CITY_LABELS: Record<City, string> = {
  tokyo: 'Tokyo',
  kyoto: 'Kyoto',
  osaka: 'Osaka',
  fukuoka: 'Fukuoka',
}

export const CATEGORY_LABELS: Record<Category, string> = {
  knives: 'Knives',
  vinyl: 'Vinyl',
  jeans: 'Jeans',
  golf: 'Golf',
  whisky: 'Whisky',
  posters: 'Posters',
  merch: 'Merch',
  other: 'Other',
}

export const PUBLIC_HOLIDAYS = ['2026-11-03']

// ── Stages — derived from the itinerary so the dates live in one place ──

const STAGE_META: Record<string, { city: City; label: string }> = {
  'tokyo-i':  { city: 'tokyo',   label: 'Tokyo I' },
  'kyoto':    { city: 'kyoto',   label: 'Kyoto' },
  'osaka':    { city: 'osaka',   label: 'Osaka' },
  'fukuoka':  { city: 'fukuoka', label: 'Fukuoka' },
  'tokyo-ii': { city: 'tokyo',   label: 'Tokyo II' },
}

function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

/** Every day on the ground in Japan — Day 1 (Oct 30) to Day 16 (Nov 14). Departure day is not one. */
export const TRIP_DATES: string[] = cities.flatMap((c) =>
  c.days.filter((d) => d.day >= 1).map((d) => d.isoDate)
)

export const STAGES: Stage[] = cities.map((c, i) => {
  const start = c.days.find((d) => d.day >= 1)!.isoDate
  const next = cities[i + 1]?.days.find((d) => d.day >= 1)?.isoDate
  return {
    id: c.id,
    ...STAGE_META[c.id],
    start,
    end: next ?? addDays(c.days[c.days.length - 1].isoDate, 1),
  }
})

// ── Areas + shops — loaded from src/lib/data/shopping-data.json ──

const data = shoppingData as unknown as { areas: Area[]; shops: Shop[]; dayNotes: Record<string, string> }

/** Catch-all area per city ("unsorted-tokyo", …) for shops without a confirmed branch. */
export const isUnsortedArea = (id: string) => id.startsWith('unsorted-')

// Unsorted areas always read "Not placed yet" and sit last within their city.
export const AREAS: Area[] = [
  ...data.areas.filter((a) => !isUnsortedArea(a.id)),
  ...data.areas.filter((a) => isUnsortedArea(a.id)).map((a) => ({ ...a, label: 'Not placed yet' })),
]

export const shops: Shop[] = data.shops

/** Short note shown above a day's list in "By day". */
export const DAY_NOTES: Record<string, string> = data.dayNotes

/** The priority shops — exactly these, checked in dev by validateShoppingData(). */
export const PRIORITY_IDS = [
  'osaka-samurai-jeans-osaka',
  'osaka-s-a-music',
  'osaka-sakai-ichimonji-mitsuhide',
  'osaka-tower-knives-osaka',
  'tokyo-disk-union-shinjuku-heavy-metal-cd-record-store',
  'tokyo-disk-union-shinjuku-rock-record-store',
  'fukuoka-momotaro-jeans-fukuoka',
  'fukuoka-border-line-records-fukuoka',
  'fukuoka-face-records-tenjin-one-fukuoka-bldg',
]

/** Route order for Osaka's optional list — north to south along the Midosuji line. */
const OSAKA_ROUTE = [
  'nakatsu', 'chayamachi', 'umeda', 'hommachi', 'minami-horie', 'shinsaibashi',
  'amerikamura', 'namba', 'doguyasuji', 'nipponbashi', 'shinsekai',
]

/** Sort key for areas: Osaka follows the route, everything else the AREAS order; unsorted last. */
export function areaRank(areaId: string): number {
  const route = OSAKA_ROUTE.indexOf(areaId)
  if (route !== -1) return route
  const i = AREAS.findIndex((a) => a.id === areaId)
  return i === -1 ? AREAS.length : 100 + i
}
