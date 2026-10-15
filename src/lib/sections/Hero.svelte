<script lang="ts">
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import { quartOut } from 'svelte/easing'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import Countdown from '../components/Countdown.svelte'
  import { now } from '../now.svelte'
  import { cities } from '../../data/itinerary'
  import type { City } from '../../data/itinerary'
  import { tripStatus, tripDays, dayId, departure, stays, TOTAL_NIGHTS, TRIP_RANGE, monthDay, weekday } from '../../data/trip'

  const status = $derived(tripStatus(now()))
  const landing = tripDays.find((d) => d.day === 1)!.isoDate

  // ── On the road: the hero takes on the current city ──
  const live = $derived(status.phase === 'live' ? status.day : null)
  const city = $derived(live ? cities.find((c) => c.id === live.cityId)! : null)
  /** No city yet on departure day — you're in the air. */
  const inTheAir = $derived(live?.day === 0)
  const currentStop = $derived(live && !inTheAir ? cities.findIndex((c) => c.id === live.cityId) : -1)

  /** 'Tokyo' for both Tokyo legs — the route shows the city, the highlight shows which visit. */
  const placeName = (c: City) => c.cityKey[0].toUpperCase() + c.cityKey.slice(1)

  /** The brighter of a city's two theme colours, so it reads on the dark hero. */
  function heroColor(c: City): string {
    const lum = (hex: string) => {
      const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    return lum(c.theme.bg) > lum(c.theme.accent) ? c.theme.bg : c.theme.accent
  }

  const accent = $derived(city && !inTheAir ? heroColor(city) : '#ff2d55')
  /** 'NIGHT 2 OF 3' — or 'LAST DAY' on the checkout day before the flight home. */
  const nightLine = $derived.by(() => {
    if (!live || !city) return ''
    const stay = stays.find((st) => st.cityId === city.id)!
    const night = (Date.parse(live.isoDate) - Date.parse(stay.checkIn)) / 86_400_000 + 1
    return night > stay.nights ? 'LAST DAY' : `NIGHT ${night} OF ${stay.nights}`
  })

  const titleKey = $derived(live ? `${live.cityId}-${live.day}` : 'before')

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.from('.hero-line', {
      y: '110%',
      duration: 1,
      ease: 'power4.out',
      stagger: 0.08,
    })

    gsap.from('.hero-meta', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.5,
    })

    gsap.from('.hero-countdown', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.7,
    })
  })
</script>

<section class="hero" class:is-live={!!live} id="top" aria-label="Japan Trip 2026 overview" style="--hero-accent: {accent}">
  <div class="hero-bg">
    <span class="hero-bg-ja" aria-hidden="true">{city && !inTheAir ? city.nameJa : '日本'}</span>
  </div>

  <div class="hero-content">
    {#if live}
      <div class="hero-tag"><span class="live-dot" aria-hidden="true"></span>on the road · {live.date}</div>
    {:else}
      <div class="hero-tag">{TRIP_RANGE.toLowerCase()} · 2026</div>
    {/if}

    <h1 class="sr-only">Japan Trip 2026</h1>

    {#key titleKey}
      <div class="hero-title" aria-hidden="true">
        {#if live && inTheAir}
          <div class="hero-clip"><span class="hero-line" in:fly={{ y: '110%', duration: 900, easing: quartOut }}>ON OUR WAY</span></div>
          <div class="hero-clip hero-line-small"><span class="hero-line" in:fly={{ y: '110%', duration: 900, delay: 80, easing: quartOut }}>{live.label}</span></div>
        {:else if live && city}
          <div class="hero-clip"><span class="hero-line" in:fly={{ y: '110%', duration: 900, easing: quartOut }}>{placeName(city).toUpperCase()}</span></div>
          <div class="hero-clip hero-line-small"><span class="hero-line" in:fly={{ y: '110%', duration: 900, delay: 80, easing: quartOut }}>{nightLine}</span></div>
        {:else}
          <div class="hero-clip"><span class="hero-line">JAPAN</span></div>
          <div class="hero-clip"><span class="hero-line">TRIP</span></div>
          <div class="hero-clip hero-line-small"><span class="hero-line">2026</span></div>
        {/if}
      </div>
    {/key}

    <div class="hero-bottom">
      <div class="hero-meta">
        <ol class="hero-route" aria-label="Route">
          {#each cities as c, i (c.id)}
            <li
              class="stop"
              class:past={currentStop > i || status.phase === 'after'}
              class:current={currentStop === i}
              aria-current={currentStop === i ? 'location' : undefined}
            >
              <span class="stop-name">{placeName(c)}</span>
              {#if i < cities.length - 1}<span class="arrow" aria-hidden="true">→</span>{/if}
            </li>
          {/each}
        </ol>
      </div>
      <div class="hero-countdown">
        {#if status.phase === 'before'}
          <p class="countdown-label">Departure in</p>
          <Countdown theme="dark" />
          <p class="countdown-note">ARN {departure.time} · {weekday(departure.isoDate)} {monthDay(departure.isoDate)} · land Tokyo {weekday(landing)} {monthDay(landing)}</p>
        {:else if status.phase === 'live'}
          <p class="countdown-label">You are here</p>
          <a class="live-day" href="#{dayId(status.day.day)}">
            <span class="live-num">{status.day.dayName ?? `Day ${status.day.day}`}</span>
            <span class="live-city">{status.day.cityName}</span>
          </a>
          <p class="countdown-note">
            {status.day.date} · {status.day.label} · day {status.index + 1} of {tripDays.length}
          </p>
        {:else}
          <p class="countdown-label">That's a wrap</p>
          <p class="live-num">Home</p>
          <p class="countdown-note">{TOTAL_NIGHTS} nights · {stays.length} cities · {TRIP_RANGE} 2026</p>
        {/if}
      </div>
    </div>
  </div>

  <div class="hero-scroll" aria-hidden="true">
    <span>scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100svh;
    background: #0f0f0f;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vw, 6rem);
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
    opacity: 0.04;
    pointer-events: none;
    z-index: 0;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    pointer-events: none;
    overflow: hidden;
  }

  .hero-bg-ja {
    font-family: var(--font-ja);
    font-size: clamp(18rem, 40vw, 48rem);
    color: white;
    opacity: 0.04;
    line-height: 1;
    margin-right: -0.1em;
    user-select: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: var(--max-width);
    width: 100%;
    margin: 0 auto;
  }

  .hero-tag {
    font-family: var(--font-condensed);
    font-size: clamp(0.75rem, 1.5vw, 1rem);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--hero-accent);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .live-dot {
    width: 0.55em;
    height: 0.55em;
    border-radius: 50%;
    background: var(--hero-accent);
    animation: livePulse 1.8s ease-out infinite;
  }

  @keyframes livePulse {
    0%   { box-shadow: 0 0 0 0 color-mix(in srgb, var(--hero-accent) 60%, transparent); }
    100% { box-shadow: 0 0 0 0.8em transparent; }
  }

  .hero-title {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .hero-clip {
    overflow: hidden;
    line-height: 0.9;
  }

  .hero-line {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(6rem, 18vw, 22rem);
    color: white;
    letter-spacing: -0.01em;
    line-height: 0.9;
  }

  .hero-line-small .hero-line {
    font-size: clamp(3rem, 9vw, 11rem);
    color: var(--hero-accent);
  }

  .hero-bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: clamp(2rem, 5vw, 4rem);
  }

  .hero-route {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: 0.4rem;
    font-family: var(--font-condensed);
    font-size: clamp(1rem, 2vw, 1.4rem);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  .stop {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-right: 0.75rem;
    white-space: nowrap;
    transition: color 0.4s, opacity 0.4s;
  }

  .stop.past { opacity: 0.35; }

  .stop.current .stop-name {
    color: white;
    font-weight: 700;
    padding-bottom: 0.15em;
    border-bottom: 2px solid var(--hero-accent);
  }

  .arrow {
    color: var(--hero-accent);
  }

  /* Small phones: keep all five stops on one line. */
  @media (max-width: 480px) {
    .hero-route { font-size: 0.85rem; letter-spacing: 0.06em; }
    .stop { gap: 0.4rem; margin-right: 0.4rem; }
  }

  @media (prefers-reduced-motion: reduce) {
    .live-dot { animation: none; }
  }

  .hero-countdown {
    text-align: right;
  }

  .countdown-label {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 0.5rem;
  }

  .live-day {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.1rem;
  }

  .live-num {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1;
    letter-spacing: 0.02em;
    color: white;
  }

  .live-city {
    font-family: var(--font-condensed);
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--hero-accent);
  }

  .countdown-note {
    font-family: var(--font-condensed);
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-top: 0.6rem;
  }

  .hero-scroll {
    position: absolute;
    bottom: 2.5rem;
    left: clamp(1.5rem, 5vw, 5rem);
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
  }

  .scroll-line {
    width: 60px;
    height: 1px;
    background: linear-gradient(to right, rgba(255,255,255,0.3), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
</style>
