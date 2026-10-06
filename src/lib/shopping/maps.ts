import { AREAS, CITY_LABELS, isUnsortedArea } from '../../data/shopping'
import type { Shop } from '../../data/shopping'

export function mapsUrl(shop: Shop): string {
  // "Ej placerad" means nothing to Google — leave the area out for unsorted shops.
  const area = isUnsortedArea(shop.area) ? '' : AREAS.find((a) => a.id === shop.area)?.label ?? ''
  const query =
    shop.lat !== undefined && shop.lng !== undefined
      ? `${shop.lat},${shop.lng}`
      : shop.mapsQuery ?? [shop.name, area, CITY_LABELS[shop.city]].filter(Boolean).join(' ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
