// One shared clock for the whole site — components read it instead of each
// running its own interval.
//
// Dev only: ?now=2026-11-07T12:00+09:00 runs the clock from that moment,
// so the live hero, Today link etc. can be previewed before the trip.
let offset = 0

if (import.meta.env.DEV && typeof window !== 'undefined') {
  const param = new URLSearchParams(window.location.search).get('now')
  const at = param ? new Date(param) : null
  if (at && !Number.isNaN(at.getTime())) offset = at.getTime() - Date.now()
}

let current = $state(new Date(Date.now() + offset))

if (typeof window !== 'undefined') {
  setInterval(() => {
    current = new Date(Date.now() + offset)
  }, 1000)
}

export function now(): Date {
  return current
}
