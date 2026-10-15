import { tripDays } from '../../data/trip'
import type { TripDay } from '../../data/trip'
import type { Activity } from '../../data/itinerary'
import { tokyoNow } from '../shopping/time'

// Day logic for /today. Pure functions — the page owns the clock and the URL.

/** Until 04:00 Tokyo time, the night still belongs to the day before. */
export const DAY_ROLLOVER_MIN = 4 * 60

/** Every itinerary date, departure day (Oct 29) included. */
export const TODAY_DATES: string[] = tripDays.map((d) => d.isoDate)

export function isTripDay(iso: string | null | undefined): iso is string {
  return !!iso && TODAY_DATES.includes(iso)
}

export function dayFor(iso: string): TripDay | undefined {
  return tripDays.find((d) => d.isoDate === iso)
}

function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

/** Today's date in Tokyo, except that before 04:00 it is still yesterday — if yesterday is a trip day. */
export function tripDayNow(at: Date = new Date()): string {
  const { date, minutes } = tokyoNow(at)
  if (minutes < DAY_ROLLOVER_MIN) {
    const prev = addDays(date, -1)
    if (isTripDay(prev)) return prev
  }
  return date
}

/** ?date= wins (preview), then today if it's a trip day, then the first day before the trip or the last after it. */
export function resolveDay(param: string | null, today: string): string {
  if (isTripDay(param)) return param
  if (TODAY_DATES.includes(today)) return today
  return today < TODAY_DATES[0] ? TODAY_DATES[0] : TODAY_DATES[TODAY_DATES.length - 1]
}

export const isCommitment = (a: Activity) => a.kind === 'booked' || a.kind === 'fixed'

export type Tomorrow =
  | { type: 'commitment'; day: TripDay; activity: Activity }
  | { type: 'nothing'; day: TripDay }
  /** Last day: the flight home, with the Haneda item when there is one. */
  | { type: 'flight'; activity?: Activity }

/** The first booked or fixed item on the day after `iso`. */
export function tomorrowFor(iso: string): Tomorrow {
  const i = TODAY_DATES.indexOf(iso)
  const next = tripDays[i + 1]
  if (!next) {
    const haneda = tripDays[i]?.activities.find((a) => /haneda/i.test(a.title) && isCommitment(a))
    return { type: 'flight', activity: haneda }
  }
  const activity = next.activities.find(isCommitment)
  return activity ? { type: 'commitment', day: next, activity } : { type: 'nothing', day: next }
}

/** 'HARD LIMIT — leave Uji' → 'hard-limit-leave-uji' */
export function slug(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

export function tickKey(iso: string, title: string): string {
  return `${iso}:${slug(title)}`
}

export function mapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
