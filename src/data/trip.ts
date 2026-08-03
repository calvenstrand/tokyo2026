import { cities } from './itinerary'
import type { Day } from './itinerary'

/** Wheels up from Arlanda. Sweden is back on CET (UTC+1) by Oct 29. */
export const DEPARTURE = new Date('2026-10-29T09:35:00+01:00')

/** Last flight out of Haneda — Nov 15, 00:30 JST. */
export const RETURN_FLIGHT = new Date('2026-11-15T00:30:00+09:00')

export type TripDay = Day & { cityId: string; cityName: string }

/** Every day of the trip in order, departure day first. */
export const tripDays: TripDay[] = cities.flatMap((city) =>
  city.days.map((day) => ({ ...day, cityId: city.id, cityName: city.name }))
)

const tokyoFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

/** Calendar date in Tokyo as YYYY-MM-DD — the only clock that matters once you land. */
export function tokyoDate(at: Date): string {
  return tokyoFormatter.format(at)
}

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
