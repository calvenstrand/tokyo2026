import { PUBLIC_HOLIDAYS } from '../../data/shopping'
import type { Shop, Weekday } from '../../data/shopping'
import { weekdayOf } from './time'

export const CLOSING_SOON_MIN = 45

export interface OpenState {
  state: 'open' | 'closing-soon' | 'closed' | 'unknown'
  opens?: string
  closes?: string
  /** Minutes until closing — only when the clock was checked. */
  minutesLeft?: number
  /** False when no clock was given: the state only describes that weekday's hours. */
  live: boolean
  /** Public holiday and the shop's holiday hours aren't known. */
  holidayCaveat?: boolean
  /** Unverified shops only: what the data lists for that day, shown as a hint. */
  listed?: string
}

export function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/**
 * Open state for a shop on a date. Pass `minutes` (since midnight, Tokyo) only
 * when the date is today — otherwise this just reports that day's hours.
 */
export function getOpenState(shop: Shop, date: string, minutes?: number): OpenState {
  const live = minutes !== undefined
  const holiday = PUBLIC_HOLIDAYS.includes(date)
  const rule = shop.hours.holidays

  if (holiday && rule === 'closed' && shop.verified.hours) return { state: 'closed', live }

  let weekday: Weekday = weekdayOf(date)
  if (holiday && rule === 'as-sunday') weekday = 0
  const holidayCaveat = holiday && rule === undefined

  const entry = shop.hours.weekly[weekday]
  // Unverified hours never drive open/closed — they're only passed on as a hint.
  if (!shop.verified.hours) {
    const listed = entry === undefined ? undefined : entry === 'closed' ? 'closed' : `${entry[0]}–${entry[1]}`
    return { state: 'unknown', live, holidayCaveat, listed }
  }
  if (entry === undefined) return { state: 'unknown', live, holidayCaveat }
  if (entry === 'closed') return { state: 'closed', live, holidayCaveat }

  const [opens, closes] = entry
  if (!live) return { state: 'open', opens, closes, live, holidayCaveat }

  const open = toMinutes(opens)
  let close = toMinutes(closes)
  if (close <= open) close += 24 * 60 // closes after midnight

  if (minutes < open || minutes >= close) {
    return { state: 'closed', opens, closes, live, holidayCaveat }
  }
  const minutesLeft = close - minutes
  return {
    state: minutesLeft < CLOSING_SOON_MIN ? 'closing-soon' : 'open',
    opens,
    closes,
    minutesLeft,
    live,
    holidayCaveat,
  }
}

/** Human label for a card: "Open until 19:00", "Closes in 30 min", "Closed that day"… */
export function describeOpenState(shop: Shop, s: OpenState, minutes?: number): string {
  switch (s.state) {
    case 'unknown':
      if (shop.verified.hours) return 'Hours unknown'
      return s.listed ? `Hours unverified · listed ${s.listed}` : 'Hours unverified'
    case 'closing-soon':
      return `Closes in ${s.minutesLeft} min`
    case 'open':
      return s.live ? `Open until ${s.closes}` : `Open ${s.opens}–${s.closes}`
    case 'closed':
      if (!s.live) return 'Closed that day'
      if (!s.opens) return 'Closed today'
      if (minutes !== undefined && minutes < toMinutes(s.opens)) return `Opens at ${s.opens}`
      return 'Closed for today'
  }
}
