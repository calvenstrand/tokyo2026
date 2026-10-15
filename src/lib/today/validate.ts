import { tripDays } from '../../data/trip'
import { tickKey } from './day'

const SAYS_BOOKED = /BOOKED|CONFIRMED|SECURED/
const NOT_BOOKED = /NOT YET BOOKED/

/** Dev-only sanity check of the itinerary's commitment marks. Warns, never throws. */
export function validateItinerary(): string[] {
  const problems: string[] = []

  for (const day of tripDays) {
    const keys = new Set<string>()
    for (const act of day.activities) {
      const at = `${day.isoDate} "${act.title}"`
      if (SAYS_BOOKED.test(act.title) && !NOT_BOOKED.test(act.title) && act.kind !== 'booked') {
        problems.push(`${at}: title says booked but kind is ${act.kind ?? 'unset'}`)
      }
      // Ticks are keyed by title — two items with the same slug would share one tick.
      const key = tickKey(day.isoDate, act.title)
      if (keys.has(key)) problems.push(`${at}: duplicate tick key "${key}"`)
      keys.add(key)
    }
  }

  for (const p of problems) console.warn(`[itinerary] ${p}`)
  return problems
}
