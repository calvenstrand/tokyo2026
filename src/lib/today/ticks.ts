import { browser } from '$app/environment'

export type Ticks = Record<string, true>

export const TODAY_STORAGE_KEY = 'tokyo26:today:v1'

export function loadTicks(): Ticks {
  if (!browser) return {}
  try {
    const raw = JSON.parse(localStorage.getItem(TODAY_STORAGE_KEY) ?? '{}')
    if (!raw || typeof raw !== 'object') return {}
    return Object.fromEntries(Object.entries(raw).filter(([, v]) => v === true)) as Ticks
  } catch {
    return {}
  }
}

export function saveTicks(ticks: Ticks): void {
  if (!browser) return
  try {
    localStorage.setItem(TODAY_STORAGE_KEY, JSON.stringify(ticks))
  } catch {
    // Private mode or storage full — the page keeps working, it just won't remember.
  }
}
