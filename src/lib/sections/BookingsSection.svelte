<script lang="ts">
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { bookings, hotels, STORAGE_KEY, type BookingStatus } from '../../data/bookings'

  let section: HTMLElement

  // --- Persistent status state ---
  function loadStatuses(): Record<string, BookingStatus> {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  let statuses = $state<Record<string, BookingStatus>>(loadStatuses())

  function getStatus(id: string, def: BookingStatus): BookingStatus {
    return statuses[id] ?? def
  }

  function cycleBooking(id: string, def: BookingStatus) {
    const cycle: BookingStatus[] = ['pending', 'done', 'na']
    const current = getStatus(id, def)
    const next = cycle[(cycle.indexOf(current) + 1) % cycle.length]
    statuses = { ...statuses, [id]: next }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses)) } catch {}
  }

  function cycleHotel(id: string, def: BookingStatus) {
    const cycle: BookingStatus[] = ['pending', 'done']
    const current = getStatus(id, def)
    const next = cycle[(cycle.indexOf(current) + 1) % cycle.length]
    statuses = { ...statuses, [id]: next }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses)) } catch {}
  }

  // --- Derived counts ---
  let confirmedCount = $derived(
    bookings.filter(b => getStatus(b.id, b.defaultStatus) === 'done').length +
    hotels.filter(h => getStatus(h.id, h.defaultStatus) === 'done').length
  )
  let totalCount = $derived(bookings.length + hotels.length)

  // --- Tier config ---
  const tiers = [
    {
      tier: 1 as const,
      label: 'Tier 1',
      title: 'Book immediately',
      subtitle: 'Lottery or strictly limited — miss the window, miss the thing.',
      color: '#ff2d55',
    },
    {
      tier: 2 as const,
      label: 'Tier 2',
      title: 'Book before leaving Sweden',
      subtitle: 'Counter seats and omakase fill months out. Book before you land.',
      color: '#ff9600',
    },
    {
      tier: 3 as const,
      label: 'Tier 3',
      title: 'Book 1–2 months before',
      subtitle: 'Timed entry and niche classes — availability is there if you act.',
      color: '#4caf82',
    },
    {
      tier: 4 as const,
      label: 'Tier 4',
      title: 'Watch — buy when announced',
      subtitle: 'Cannot pre-book until matchup is set. Monitor and move fast.',
      color: '#c084fc',
    },
  ]

  function statusLabel(status: BookingStatus): string {
    if (status === 'done') return 'Booked'
    if (status === 'watching') return 'Watching'
    if (status === 'na') return 'Skip'
    return 'Pending'
  }

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(section.querySelectorAll('.reveal'), {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    })
  })
</script>

<section class="bookings" bind:this={section} id="bookings">
  <div class="bookings-inner">

    <div class="bookings-header reveal">
      <span class="eyebrow">Action required</span>
      <h2>Bookings</h2>
      <p class="subtitle">Everything that needs to be locked in before you land. Nintendo Museum lottery opens approximately August 2026 — set a reminder now.</p>
    </div>

    <div class="counter-bar reveal">
      <div class="counter">
        <span class="counter-num">{confirmedCount}</span>
        <span class="counter-sep">/</span>
        <span class="counter-total">{totalCount}</span>
        <span class="counter-label">confirmed</span>
      </div>
      <div class="counter-track">
        <div class="counter-fill" style="width: {(confirmedCount / totalCount) * 100}%"></div>
      </div>
    </div>

    {#each tiers as tier}
      {@const tierBookings = bookings.filter(b => b.tier === tier.tier)}
      <div class="tier-block reveal">
        <div class="tier-header" style="--tier-color: {tier.color}">
          <div class="tier-badge" style="background: {tier.color}">{tier.label}</div>
          <div class="tier-meta">
            <h3>{tier.title}</h3>
            <p>{tier.subtitle}</p>
          </div>
        </div>

        <div class="card-grid">
          {#each tierBookings as booking}
            {@const status = getStatus(booking.id, booking.defaultStatus)}
            <div class="booking-card" class:is-done={status === 'done'} class:is-na={status === 'na'}>
              <div class="card-top">
                <div class="card-name-row">
                  <span class="card-name">{booking.name}</span>
                  {#if booking.nameJa}
                    <span class="card-name-ja">{booking.nameJa}</span>
                  {/if}
                </div>
                <button
                  class="status-btn"
                  class:status-done={status === 'done'}
                  class:status-watching={status === 'watching'}
                  class:status-na={status === 'na'}
                  onclick={() => booking.defaultStatus === 'watching' ? null : cycleBooking(booking.id, booking.defaultStatus)}
                  disabled={booking.defaultStatus === 'watching'}
                  aria-label="Toggle status for {booking.name}"
                >
                  {statusLabel(status)}
                </button>
              </div>

              <div class="card-meta">
                <span class="meta-location">{booking.location}</span>
                <span class="meta-dot">·</span>
                <span class="meta-day">{booking.day}</span>
              </div>

              <p class="card-description">{booking.description}</p>

              <div class="card-footer">
                <div class="card-footer-left">
                  <span class="card-cost">{booking.cost}</span>
                  <span class="card-deadline" style="color: {tier.color}">{booking.deadline}</span>
                </div>
                {#if booking.url}
                  <a class="card-link" href={booking.url} target="_blank" rel="noopener noreferrer">Book →</a>
                {/if}
              </div>

              <div class="card-howto">
                <span class="howto-label">How to book:</span>
                <span class="howto-text">{booking.howTo}</span>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    <!-- Hotels -->
    <div class="hotels-block reveal">
      <div class="tier-header" style="--tier-color: #4f7cff">
        <div class="tier-badge" style="background: #4f7cff">Hotels</div>
        <div class="tier-meta">
          <h3>Accommodation</h3>
          <p>Kyoto in October is peak foliage season — book that one first, months in advance.</p>
        </div>
      </div>

      <div class="hotels-table">
        {#each hotels as hotel}
          {@const status = getStatus(hotel.id, hotel.defaultStatus)}
          <div class="hotel-row" class:is-done={status === 'done'}>
            <div class="hotel-city">
              <span class="hotel-city-name">{hotel.city}</span>
              {#if hotel.area !== '—'}
                <span class="hotel-area">{hotel.area}</span>
              {/if}
              {#if hotel.urgent}
                <span class="hotel-urgent">Book first</span>
              {/if}
            </div>
            <div class="hotel-dates">
              <span class="hotel-date-range">{hotel.dates}</span>
              <span class="hotel-nights">{hotel.nights}n</span>
            </div>
            <p class="hotel-note">{hotel.note}</p>
            <button
              class="status-btn"
              class:status-done={status === 'done'}
              onclick={() => cycleHotel(hotel.id, hotel.defaultStatus)}
              aria-label="Toggle status for {hotel.city} hotel"
            >
              {statusLabel(status)}
            </button>
          </div>
        {/each}
      </div>
    </div>

  </div>
</section>

<style>
  .bookings {
    padding: clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem);
    background: var(--color-bg);
    border-top: 1px solid var(--color-border);
  }

  .bookings-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: clamp(3rem, 6vw, 5rem);
  }

  /* Header */
  .bookings-header { }

  .eyebrow {
    display: block;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-vermillion);
    margin-bottom: 0.75rem;
  }

  h2 {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 7rem);
    letter-spacing: 0.02em;
    color: var(--color-ink);
    line-height: 1;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-family: var(--font-serif);
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: var(--color-ink-faint);
    max-width: 52ch;
    line-height: 1.6;
  }

  /* Counter */
  .counter-bar {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .counter {
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
  }

  .counter-num {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 4rem);
    color: var(--color-ink);
    line-height: 1;
  }

  .counter-sep,
  .counter-total {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: var(--color-ink-faint);
    line-height: 1;
  }

  .counter-label {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--color-ink-faint);
    margin-left: 0.5rem;
    align-self: center;
  }

  .counter-track {
    height: 2px;
    background: var(--color-border);
    max-width: 320px;
  }

  .counter-fill {
    height: 100%;
    background: var(--color-vermillion);
    transition: width 0.4s ease;
  }

  /* Tier block */
  .tier-block,
  .hotels-block {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .tier-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--tier-color, var(--color-border));
  }

  .tier-badge {
    font-family: var(--font-condensed);
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #fff;
    padding: 0.35em 0.75em;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  .tier-meta h3 {
    font-family: var(--font-condensed);
    font-size: clamp(0.9rem, 2vw, 1.1rem);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-ink);
    margin-bottom: 0.25rem;
  }

  .tier-meta p {
    font-family: var(--font-serif);
    font-size: 0.85rem;
    color: var(--color-ink-faint);
    line-height: 1.5;
  }

  /* Card grid */
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr));
    gap: 1px;
    background: var(--color-border);
    border: 1px solid var(--color-border);
  }

  .booking-card {
    background: var(--color-bg);
    padding: 1.75rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: background 0.2s;
  }

  .booking-card.is-done {
    background: rgba(76, 175, 130, 0.05);
  }

  .booking-card.is-na {
    opacity: 0.4;
  }

  .card-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .card-name-row {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .card-name {
    font-family: var(--font-serif);
    font-size: clamp(1.05rem, 2vw, 1.2rem);
    color: var(--color-ink);
    line-height: 1.2;
  }

  .card-name-ja {
    font-family: var(--font-ja);
    font-size: 0.8rem;
    color: var(--color-ink-faint);
  }

  /* Status button */
  .status-btn {
    font-family: var(--font-condensed);
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.35em 0.9em;
    border: 1px solid var(--color-border);
    background: transparent;
    color: var(--color-ink-faint);
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .status-btn:hover:not(:disabled) {
    border-color: var(--color-ink-faint);
    color: var(--color-ink);
  }

  .status-btn:disabled {
    cursor: default;
  }

  .status-btn.status-done {
    border-color: #4caf82;
    color: #4caf82;
    background: rgba(76, 175, 130, 0.08);
  }

  .status-btn.status-watching {
    border-color: #c084fc;
    color: #c084fc;
  }

  .status-btn.status-na {
    border-color: var(--color-border);
    color: var(--color-ink-faint);
    opacity: 0.5;
  }

  .card-meta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .meta-location {
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-ink-faint);
  }

  .meta-dot {
    color: var(--color-border);
    font-size: 0.7rem;
  }

  .meta-day {
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-ink-faint);
  }

  .card-description {
    font-family: var(--font-serif);
    font-size: 0.875rem;
    color: var(--color-ink-faint);
    line-height: 1.6;
    flex: 1;
  }

  .card-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    margin-top: auto;
    padding-top: 0.5rem;
  }

  .card-footer-left {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .card-cost {
    font-family: var(--font-condensed);
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    color: var(--color-ink);
  }

  .card-deadline {
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    line-height: 1.4;
  }

  .card-link {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-ink);
    text-decoration: none;
    padding: 0.4em 1em;
    border: 1px solid var(--color-border);
    transition: all 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .card-link:hover {
    border-color: var(--color-ink-faint);
    background: rgba(255,255,255,0.04);
  }

  .card-howto {
    padding-top: 0.75rem;
    border-top: 1px solid var(--color-border);
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .howto-label {
    font-family: var(--font-condensed);
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--color-ink-faint);
    flex-shrink: 0;
  }

  .howto-text {
    font-family: var(--font-serif);
    font-size: 0.8rem;
    color: var(--color-ink-faint);
    line-height: 1.4;
  }

  /* Hotels table */
  .hotels-table {
    border: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
  }

  .hotel-row {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr auto;
    align-items: center;
    gap: 1.5rem;
    padding: 1.25rem 1.75rem;
    border-bottom: 1px solid var(--color-border);
    transition: background 0.2s;
  }

  .hotel-row:last-child {
    border-bottom: none;
  }

  .hotel-row.is-done {
    background: rgba(76, 175, 130, 0.05);
  }

  .hotel-city {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .hotel-city-name {
    font-family: var(--font-serif);
    font-size: 1rem;
    color: var(--color-ink);
  }

  .hotel-area {
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-ink-faint);
  }

  .hotel-urgent {
    font-family: var(--font-condensed);
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #ff9600;
    border: 1px solid #ff9600;
    padding: 0.15em 0.5em;
    width: fit-content;
    margin-top: 0.1rem;
  }

  .hotel-dates {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .hotel-date-range {
    font-family: var(--font-condensed);
    font-size: 0.8rem;
    letter-spacing: 0.08em;
    color: var(--color-ink);
  }

  .hotel-nights {
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    color: var(--color-ink-faint);
  }

  .hotel-note {
    font-family: var(--font-serif);
    font-size: 0.85rem;
    color: var(--color-ink-faint);
    line-height: 1.5;
  }

  @media (max-width: 700px) {
    .hotel-row {
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto auto;
      gap: 0.6rem 1rem;
      padding: 1.25rem;
    }

    .hotel-dates {
      text-align: right;
    }

    .hotel-note {
      grid-column: 1 / -1;
    }

    .hotel-row .status-btn {
      grid-column: 2;
      grid-row: 1;
    }

    .card-grid {
      grid-template-columns: 1fr;
    }

    .booking-card {
      padding: 1.5rem;
    }
  }

  @media (max-width: 500px) {
    .card-footer {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
