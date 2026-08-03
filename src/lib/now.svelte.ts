// One shared clock for the whole site — components read it instead of each
// running its own interval.
let current = $state(new Date())

if (typeof window !== 'undefined') {
  setInterval(() => {
    current = new Date()
  }, 1000)
}

export function now(): Date {
  return current
}
