import { AREAS, CATEGORY_LABELS, CITY_LABELS, PRIORITY_IDS, TRIP_DATES, shops } from '../../data/shopping'

const HHMM = /^([01]\d|2[0-3]):[0-5]\d$/
const WEEKDAY_KEY = /^[0-6]$/
const KINDS = ['clothes', 'things']
const MAX_TARGETS_PER_DAY = 4

/** Dev-only sanity check of shopping-data.json. Warns, never throws. */
export function validateShoppingData(): string[] {
  const problems: string[] = []
  const ids = new Set<string>()
  const areaIds = new Set(AREAS.map((a) => a.id))

  for (const shop of shops) {
    if (ids.has(shop.id)) problems.push(`duplicate id "${shop.id}"`)
    ids.add(shop.id)
  }

  for (const shop of shops) {
    const at = `"${shop.id}"`
    if (!areaIds.has(shop.area)) problems.push(`${at}: unknown area "${shop.area}"`)
    else if (AREAS.find((a) => a.id === shop.area)!.city !== shop.city) {
      problems.push(`${at}: area "${shop.area}" is not in ${shop.city}`)
    }
    // The JSON isn't type-checked, so check the enums too.
    if (!(shop.city in CITY_LABELS)) problems.push(`${at}: unknown city "${shop.city}"`)
    for (const k of shop.kind) if (!KINDS.includes(k)) problems.push(`${at}: unknown kind "${k}"`)
    for (const c of shop.categories) if (!(c in CATEGORY_LABELS)) problems.push(`${at}: unknown category "${c}"`)
    for (const alt of shop.alternativeIds ?? []) {
      if (!ids.has(alt)) problems.push(`${at}: alternative "${alt}" does not exist`)
    }
    for (const d of shop.plannedDates) {
      if (!TRIP_DATES.includes(d)) problems.push(`${at}: planned date ${d} is outside the trip`)
    }
    for (const d of shop.optionalDates ?? []) {
      if (!TRIP_DATES.includes(d)) problems.push(`${at}: optional date ${d} is outside the trip`)
      if (shop.plannedDates.includes(d)) problems.push(`${at}: ${d} is both a target and optional`)
    }
    for (const [day, entry] of Object.entries(shop.hours.weekly)) {
      if (!WEEKDAY_KEY.test(day)) problems.push(`${at}: weekly key "${day}" is not 0–6`)
      if (entry === 'closed') continue
      for (const t of entry ?? []) {
        if (!HHMM.test(t)) problems.push(`${at}: malformed time "${t}" on weekday ${day}`)
      }
    }
  }

  for (const id of PRIORITY_IDS) {
    const shop = shops.find((s) => s.id === id)
    if (!shop) problems.push(`priority shop "${id}" is missing`)
    else if (shop.priority !== 'must') problems.push(`priority shop "${id}" is not priority 'must'`)
  }
  const extra = shops.filter((s) => s.priority === 'must' && !PRIORITY_IDS.includes(s.id))
  for (const s of extra) problems.push(`"${s.id}" is 'must' but not one of the priority shops`)

  for (const d of TRIP_DATES) {
    const n = shops.filter((s) => s.plannedDates.includes(d)).length
    if (n > MAX_TARGETS_PER_DAY) problems.push(`${d} has ${n} targets (max ${MAX_TARGETS_PER_DAY})`)
  }

  for (const p of problems) console.warn(`[shopping] ${p}`)
  return problems
}
