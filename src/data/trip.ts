import { cities } from './itinerary'
import type { City, Day } from './itinerary'

/** Wheels up from Arlanda. Sweden is back on CET (UTC+1) by Oct 29. */
export const DEPARTURE = new Date('2026-10-29T09:35:00+01:00')

/** Last flight out of Haneda — Nov 15, 00:30 JST. */
export const RETURN_FLIGHT = new Date('2026-11-15T00:30:00+09:00')

export type TripDay = Day & { cityId: string; cityName: string }

/** Every day of the trip in order, departure day first. */
export const tripDays: TripDay[] = cities.flatMap((city) =>
  city.days.map((day) => ({ ...day, cityId: city.id, cityName: city.name }))
)

// ── Date formatting — every date label on the site goes through these ──

function formatterIn(timeZone: string, opts: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('en-CA', { timeZone, ...opts })
}

const tokyoFormatter = formatterIn('Asia/Tokyo', { year: 'numeric', month: '2-digit', day: '2-digit' })
const stockholmFormatter = formatterIn('Europe/Stockholm', { year: 'numeric', month: '2-digit', day: '2-digit' })
const tokyoClock = formatterIn('Asia/Tokyo', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
const stockholmClock = formatterIn('Europe/Stockholm', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })

/** Calendar date in Tokyo as YYYY-MM-DD — the only clock that matters once you land. */
export function tokyoDate(at: Date): string {
  return tokyoFormatter.format(at)
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/** '2026-11-06' → 'Nov 6' */
export const monthDay = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${Number(iso.slice(8))}`

/** '2026-11-06' → 'Fri' */
export const weekday = (iso: string) => WEEKDAYS[new Date(`${iso}T00:00:00Z`).getUTCDay()]

/** 'Nov 3–6' within a month, 'Oct 30 – Nov 3' across one. Both ends inclusive as written. */
export function dateRange(start: string, end: string): string {
  if (start.slice(0, 7) === end.slice(0, 7)) return `${monthDay(start)}–${Number(end.slice(8))}`
  return `${monthDay(start)} – ${monthDay(end)}`
}

export function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

// ── Flights ──

export const departure = {
  /** Local Stockholm date and time. */
  isoDate: stockholmFormatter.format(DEPARTURE),
  time: stockholmClock.format(DEPARTURE),
}

export const homeFlight = {
  /** Local Tokyo date and time. */
  isoDate: tokyoDate(RETURN_FLIGHT),
  time: tokyoClock.format(RETURN_FLIGHT),
}

/** 'Oct 29 – Nov 15' — leave Stockholm to wheels up out of Haneda. */
export const TRIP_RANGE = dateRange(departure.isoDate, homeFlight.isoDate)

// ── Stays — one per city block, nights from the itinerary ──

export type Stay = {
  cityId: string
  /** 'Tokyo I', 'Kyoto', … */
  name: string
  /** First night. */
  checkIn: string
  /** Morning you leave. */
  checkOut: string
  nights: number
  /** What the city header shows — Tokyo I includes the departure day. */
  dates: string
}

export const stays: Stay[] = cities.map((city) => {
  const checkIn = city.days.find((d) => d.day >= 1)!.isoDate
  const checkOut = addDays(checkIn, city.nights)
  return {
    cityId: city.id,
    name: city.stayName,
    checkIn,
    checkOut,
    nights: city.nights,
    dates: dateRange(city.days[0].isoDate, checkOut),
  }
})

export const stayFor = (city: City): Stay => stays.find((s) => s.cityId === city.id)!

export const TOTAL_NIGHTS = stays.reduce((n, s) => n + s.nights, 0)

/** 'Day 10 · Nov 8' for any date on the trip. */
export function dayLabel(iso: string): string {
  const day = tripDays.find((d) => d.isoDate === iso)
  if (!day) throw new Error(`dayLabel: ${iso} is not a trip day`)
  return `Day ${day.day} · ${monthDay(iso)}`
}

// ── Trip phase ──

export type TripStatus =
  | { phase: 'before' }
  | { phase: 'live'; day: TripDay; index: number }
  | { phase: 'after' }

export function tripStatus(at: Date): TripStatus {
  if (at.getTime() < DEPARTURE.getTime()) return { phase: 'before' }
  if (at.getTime() > RETURN_FLIGHT.getTime()) return { phase: 'after' }

  const today = tokyoDate(at)

  // Match the latest day that has started rather than an exact date, so the
  // small hours after midnight still read as the day you're living.
  let index = -1
  for (let i = 0; i < tripDays.length; i++) {
    if (tripDays[i].isoDate <= today) index = i
  }
  if (index < 0) return { phase: 'before' }

  return { phase: 'live', day: tripDays[index], index }
}

/** DOM id for a day card, so the nav can jump straight to today. */
export function dayId(day: number): string {
  return `day-${day}`
}

/** Dev-only: stays chain without gaps, and the last night ends on the flight home. Warns, never throws. */
export function validateTrip(): string[] {
  const problems: string[] = []
  stays.forEach((s, i) => {
    const next = stays[i + 1]
    if (next && s.checkOut !== next.checkIn) {
      problems.push(`${s.name} checks out ${s.checkOut} but ${next.name} checks in ${next.checkIn}`)
    }
  })
  const last = stays[stays.length - 1]
  const lastDay = tripDays[tripDays.length - 1].isoDate
  if (last.checkOut > lastDay) problems.push(`${last.name} checks out ${last.checkOut}, after the last day ${lastDay}`)
  for (const p of problems) console.warn(`[trip] ${p}`)
  return problems
}
