import { STAGES, TRIP_DATES } from '../../data/shopping'
import type { Stage, Weekday } from '../../data/shopping'
import { monthDay, weekday } from '../../data/trip'

const tokyoParts = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
})

export interface TokyoNow {
  /** YYYY-MM-DD in Tokyo. */
  date: string
  /** Minutes since midnight in Tokyo. */
  minutes: number
  weekday: Weekday
}

/** Wall-clock time in Tokyo, whatever timezone the browser is in. */
export function tokyoNow(at: Date = new Date()): TokyoNow {
  const parts = Object.fromEntries(
    tokyoParts.formatToParts(at).map((p) => [p.type, p.value])
  ) as Record<string, string>
  const date = `${parts.year}-${parts.month}-${parts.day}`
  return {
    date,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
    weekday: weekdayOf(date),
  }
}

/** Weekday of a calendar date. Computed in UTC so the local timezone can't shift it. */
export function weekdayOf(iso: string): Weekday {
  return new Date(`${iso}T00:00:00Z`).getUTCDay() as Weekday
}

export function isTripDate(iso: string | null | undefined): iso is string {
  return !!iso && TRIP_DATES.includes(iso)
}

/** ?date= wins (preview), then today in Tokyo if it's a trip day, then Day 1. */
export function resolveSelectedDate(param: string | null, today: string): string {
  if (isTripDate(param)) return param
  if (isTripDate(today)) return today
  return TRIP_DATES[0]
}

export function stageFor(iso: string): Stage | undefined {
  return STAGES.find((s) => iso >= s.start && iso < s.end)
}

/** '2026-11-12' → 'Thu, Nov 12' — month first, like the itinerary. */
export function formatDay(iso: string): string {
  return `${weekday(iso)}, ${monthDay(iso)}`
}

/** '2026-11-12' → 'Thu' */
export const weekdayShort = weekday
