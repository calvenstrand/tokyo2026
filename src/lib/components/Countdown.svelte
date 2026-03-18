<script lang="ts">
  import { onMount, onDestroy } from 'svelte'

  const departure = new Date('2026-10-17T00:00:00')

  let days = $state(0)
  let hours = $state(0)
  let minutes = $state(0)
  let seconds = $state(0)
  let interval: ReturnType<typeof setInterval>

  function update() {
    const now = new Date()
    const diff = departure.getTime() - now.getTime()
    if (diff <= 0) {
      days = hours = minutes = seconds = 0
      return
    }
    days = Math.floor(diff / (1000 * 60 * 60 * 24))
    hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    seconds = Math.floor((diff % (1000 * 60)) / 1000)
  }

  onMount(() => {
    update()
    interval = setInterval(update, 1000)
  })

  onDestroy(() => clearInterval(interval))
</script>

<div class="countdown">
  <span class="unit">
    <strong>{days}</strong>
    <small>days</small>
  </span>
  <span class="sep">:</span>
  <span class="unit">
    <strong>{String(hours).padStart(2, '0')}</strong>
    <small>hrs</small>
  </span>
  <span class="sep">:</span>
  <span class="unit">
    <strong>{String(minutes).padStart(2, '0')}</strong>
    <small>min</small>
  </span>
  <span class="sep">:</span>
  <span class="unit">
    <strong>{String(seconds).padStart(2, '0')}</strong>
    <small>sec</small>
  </span>
</div>

<style>
  .countdown {
    display: flex;
    align-items: flex-end;
    gap: 0.25rem;
    font-family: var(--font-serif);
  }

  .unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 3rem;
  }

  strong {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.02em;
    color: var(--color-ink);
  }

  small {
    font-family: var(--font-sans);
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-ink-faint);
    margin-top: 0.25rem;
  }

  .sep {
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    color: var(--color-border);
    padding-bottom: 0.4rem;
    line-height: 1;
    font-family: var(--font-serif);
  }
</style>
