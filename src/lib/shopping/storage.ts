import { browser } from '$app/environment'

export type ShopStatus = 'visited' | 'bought' | 'skipped'
export type ShopStatuses = Record<string, ShopStatus>

export const SHOPPING_STORAGE_KEY = 'tokyo26:shopping:v1'

const VALID: ShopStatus[] = ['visited', 'bought', 'skipped']

export function loadStatuses(): ShopStatuses {
  if (!browser) return {}
  try {
    const raw = JSON.parse(localStorage.getItem(SHOPPING_STORAGE_KEY) ?? '{}')
    if (!raw || typeof raw !== 'object') return {}
    return Object.fromEntries(
      Object.entries(raw).filter(([, v]) => VALID.includes(v as ShopStatus))
    ) as ShopStatuses
  } catch {
    return {}
  }
}

export function saveStatuses(statuses: ShopStatuses): void {
  if (!browser) return
  try {
    localStorage.setItem(SHOPPING_STORAGE_KEY, JSON.stringify(statuses))
  } catch {
    // Private mode or storage full — the page keeps working, it just won't remember.
  }
}
