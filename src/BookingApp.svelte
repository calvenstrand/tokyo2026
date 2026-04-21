<script lang="ts">
  import { bookings, hotels, STORAGE_KEY } from './data/bookings'
  import type { BookingStatus } from './data/bookings'
  import PracticalInfoSection from './lib/sections/PracticalInfoSection.svelte'

  function loadStatuses(): Record<string, BookingStatus> {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    } catch {
      return {}
    }
  }

  function saveStatuses(s: Record<string, BookingStatus>) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  }

  let statuses = $state<Record<string, BookingStatus>>(loadStatuses())

  function getStatus(id: string, defaultStatus: BookingStatus): BookingStatus {
    return statuses[id] ?? defaultStatus
  }

  function toggle(id: string, defaultStatus: BookingStatus) {
    const current = getStatus(id, defaultStatus)
    if (current === 'watching') return
    const next: BookingStatus = current === 'pending' ? 'done' : 'pending'
    statuses = { ...statuses, [id]: next }
    saveStatuses(statuses)
  }

  const tierColors: Record<number, string> = {
    1: '#ff2d55',
    2: '#ff9600',
    3: '#4caf82',
    4: '#c084fc',
  }

  const tierLabel: Record<number, string> = {
    1: 'Tier 1 — Book immediately',
    2: 'Tier 2 — Before leaving Sweden',
    3: 'Tier 3 — 1–2 months before',
    4: 'Watch — buy when announced',
  }

  const doneCount = $derived(
    bookings.filter(b => getStatus(b.id, b.defaultStatus) === 'done').length +
    hotels.filter(h => getStatus(h.id, h.defaultStatus) === 'done').length
  )
  const totalCount = $derived(bookings.length + hotels.length)
</script>

<div class="page">

  <header class="header">
    <a href="/tokyo26/" class="back-link">← Itinerary</a>
    <div class="header-title">
      <span class="header-eyebrow">Japan '26</span>
      <h1>Info & Bookings</h1>
    </div>
  </header>

  <PracticalInfoSection />

  <main>

    <!-- Priority bookings -->
    <section class="section">
      <div class="section-header">
        <h2>Priority Bookings</h2>
        <div class="booking-stats">
          <div class="stat">
            <span class="stat-num done">{doneCount}</span>
            <span class="stat-label">confirmed</span>
          </div>
          <span class="stat-sep">/</span>
          <div class="stat">
            <span class="stat-num">{totalCount}</span>
            <span class="stat-label">total</span>
          </div>
        </div>
        <p>Click a row to mark as confirmed.</p>
      </div>

      <ul class="booking-list">
        {#each bookings as booking}
          {@const status = getStatus(booking.id, booking.defaultStatus)}
          {@const clickable = status !== 'watching'}
          <li
            class="booking-item"
            class:is-done={status === 'done'}
            class:is-watching={status === 'watching'}
            class:is-clickable={clickable}
            onclick={() => toggle(booking.id, booking.defaultStatus)}
            role={clickable ? 'button' : 'listitem'}
            tabindex={clickable ? 0 : undefined}
            onkeydown={(e) => e.key === 'Enter' && toggle(booking.id, booking.defaultStatus)}
          >
            <div class="booking-left">
              <span class="booking-tier" style="color: {tierColors[booking.tier]}">T{booking.tier}</span>
            </div>

            <div class="booking-body">
              <div class="booking-top">
                <span class="booking-name">
                  {booking.name}
                  {#if booking.nameJa}
                    <span class="booking-ja">{booking.nameJa}</span>
                  {/if}
                </span>
                <div class="booking-badges">
                  <span class="urgency-badge" style="color: {tierColors[booking.tier]}; border-color: {tierColors[booking.tier]}40">
                    {tierLabel[booking.tier]}
                  </span>
                  <span class="status-badge status-{status}">
                    {#if status === 'pending'}Pending
                    {:else if status === 'done'}Done
                    {:else if status === 'watching'}Watching
                    {:else}Skip
                    {/if}
                  </span>
                </div>
              </div>

              <div class="booking-meta">
                <span class="booking-location">{booking.location}</span>
                <span class="booking-day">{booking.day}</span>
              </div>

              <p class="booking-desc">{booking.description}</p>

              <div class="booking-footer">
                <span class="booking-cost">{booking.cost}</span>
                <span class="booking-deadline" style="color: {tierColors[booking.tier]}">{booking.deadline}</span>
              </div>

              <div class="booking-how">
                <span class="how-label">How:</span>
                {#if booking.url}
                  <a href={booking.url} target="_blank" rel="noopener noreferrer" onclick={(e) => e.stopPropagation()}>
                    {booking.howTo}
                  </a>
                {:else}
                  <span>{booking.howTo}</span>
                {/if}
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </section>

    <!-- Hotels -->
    <section class="section">
      <div class="section-header">
        <h2>Hotels</h2>
        <p>Kyoto books out fastest — October is peak foliage season.</p>
      </div>

      <ul class="hotel-list">
        {#each hotels as hotel}
          {@const status = getStatus(hotel.id, hotel.defaultStatus)}
          <li
            class="hotel-item"
            class:is-done={status === 'done'}
            onclick={() => toggle(hotel.id, hotel.defaultStatus)}
            role="button"
            tabindex="0"
            onkeydown={(e) => e.key === 'Enter' && toggle(hotel.id, hotel.defaultStatus)}
          >
            <div class="hotel-check">
              <div class="check-box" class:checked={status === 'done'}>
                {#if status === 'done'}<span>✓</span>{/if}
              </div>
            </div>
            <div class="hotel-body">
              <div class="hotel-top">
                <span class="hotel-name">
                  {hotel.city}
                  {#if hotel.area !== '—'}
                    <span class="hotel-area">{hotel.area}</span>
                  {/if}
                </span>
                <div class="hotel-badges">
                  {#if hotel.urgent}
                    <span class="urgency-badge" style="color: #ff9600; border-color: #ff960040">Book first</span>
                  {/if}
                  <span class="status-badge status-{status}">
                    {status === 'done' ? 'Booked' : 'Pending'}
                  </span>
                </div>
              </div>
              <div class="booking-meta">
                <span class="booking-location">{hotel.dates}</span>
                <span class="booking-day">{hotel.nights} nights</span>
              </div>
              <p class="booking-desc">{hotel.note}</p>
            </div>
          </li>
        {/each}
      </ul>
    </section>

  </main>

  <footer class="page-footer">
    <span>Japan '26 · Oct 29 – Nov 14</span>
    <a href="/tokyo26/">← Back to itinerary</a>
  </footer>

</div>

<style>
  .page {
    min-height: 100vh;
    background: #0f0f0f;
    color: #e0e0e0;
  }

  /* ── Header ── */
  .header {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 4rem);
    border-bottom: 1px solid rgba(255,255,255,0.08);
    flex-wrap: wrap;
  }

  .back-link {
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    transition: color 0.2s;
    white-space: nowrap;
  }

  .back-link:hover { color: rgba(255,255,255,0.7); }

  .header-title {
    flex: 1;
  }

  .header-eyebrow {
    display: block;
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ff2d55;
    margin-bottom: 0.2rem;
  }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 7vw, 6rem);
    color: white;
    line-height: 0.9;
    letter-spacing: 0.02em;
  }

  .booking-stats {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .stat {
    display: flex;
    align-items: baseline;
    gap: 0.35rem;
  }

  .stat-num {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: white;
    line-height: 1;
  }

  .stat-num.done { color: #4caf82; }

  .stat-label {
    font-family: var(--font-condensed);
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
  }

  .stat-sep {
    font-size: 1rem;
    color: rgba(255,255,255,0.15);
  }

  /* ── Main ── */
  main {
    padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem);
    max-width: 900px;
    display: flex;
    flex-direction: column;
    gap: clamp(3rem, 6vw, 5rem);
  }

  .section-header {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 4vw, 3rem);
    color: white;
    letter-spacing: 0.04em;
    line-height: 1;
    margin-bottom: 0.4rem;
  }

  .section-header p {
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
  }

  /* ── Booking list ── */
  .booking-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .booking-item {
    display: flex;
    gap: 1.5rem;
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: background 0.15s;
    cursor: default;
  }

  .booking-item.is-clickable {
    cursor: pointer;
  }

  .booking-item.is-clickable:hover {
    background: rgba(255,255,255,0.02);
    margin: 0 -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .booking-item.is-done {
    opacity: 0.45;
  }

  .booking-item.is-done .booking-name {
    text-decoration: line-through;
    text-decoration-color: rgba(255,255,255,0.3);
  }

  .booking-left {
    padding-top: 0.1rem;
    flex-shrink: 0;
  }

  .booking-tier {
    font-family: var(--font-display);
    font-size: 1.4rem;
    line-height: 1;
    letter-spacing: 0.05em;
  }

  .booking-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .booking-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .booking-name {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: clamp(1rem, 2.5vw, 1.4rem);
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: white;
    line-height: 1.1;
  }

  .booking-ja {
    font-family: var(--font-ja);
    font-weight: 400;
    font-size: 0.8em;
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.35);
    text-transform: none;
    margin-left: 0.5rem;
  }

  .booking-badges {
    display: flex;
    gap: 0.4rem;
    flex-shrink: 0;
    flex-wrap: wrap;
  }

  .urgency-badge,
  .status-badge {
    font-family: var(--font-condensed);
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.2rem 0.5rem;
    border-radius: 2px;
    white-space: nowrap;
    border: 1px solid;
  }

  .urgency-badge {
    background: transparent;
  }

  .status-pending  { background: transparent; color: rgba(255,255,255,0.2); border-color: rgba(255,255,255,0.1); }
  .status-done     { background: rgba(76,175,130,0.15); color: #4caf82; border-color: rgba(76,175,130,0.3); }
  .status-watching { background: rgba(192,132,252,0.1); color: #c084fc; border-color: rgba(192,132,252,0.25); }
  .status-na       { background: transparent; color: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.07); }

  .booking-meta {
    display: flex;
    gap: 1rem;
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .booking-location { color: rgba(255,255,255,0.4); }
  .booking-day      { color: rgba(255,255,255,0.25); }

  .booking-desc {
    font-family: var(--font-sans);
    font-size: 0.88rem;
    color: rgba(255,255,255,0.5);
    line-height: 1.55;
    max-width: 58ch;
  }

  .booking-footer {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .booking-cost {
    font-family: var(--font-condensed);
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.6);
  }

  .booking-deadline {
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .booking-how {
    font-family: var(--font-sans);
    font-size: 0.8rem;
    color: rgba(255,255,255,0.3);
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    align-items: baseline;
  }

  .how-label {
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
    flex-shrink: 0;
  }

  .booking-how a {
    color: rgba(255,255,255,0.4);
    text-decoration: underline;
    text-decoration-color: rgba(255,255,255,0.15);
    transition: color 0.15s;
  }

  .booking-how a:hover { color: rgba(255,255,255,0.7); }

  /* ── Hotels ── */
  .hotel-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .hotel-item {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    padding: 1.25rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    cursor: pointer;
    transition: background 0.15s;
  }

  .hotel-item:hover {
    background: rgba(255,255,255,0.02);
    margin: 0 -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .hotel-item.is-done { opacity: 0.4; }
  .hotel-item.is-done .hotel-name { text-decoration: line-through; text-decoration-color: rgba(255,255,255,0.3); }

  .hotel-check { padding-top: 0.15rem; flex-shrink: 0; }

  .check-box {
    width: 18px;
    height: 18px;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: #4caf82;
    transition: border-color 0.15s, background 0.15s;
  }

  .check-box.checked {
    background: rgba(76,175,130,0.15);
    border-color: #4caf82;
  }

  .hotel-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .hotel-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .hotel-name {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: clamp(1rem, 2.5vw, 1.3rem);
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: white;
    line-height: 1.1;
  }

  .hotel-area {
    font-family: var(--font-condensed);
    font-weight: 400;
    font-size: 0.8em;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.08em;
    margin-left: 0.5rem;
  }

  .hotel-badges {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    flex-shrink: 0;
  }

  /* ── Footer ── */
  .page-footer {
    padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 5vw, 4rem);
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
  }

  .page-footer a {
    color: rgba(255,255,255,0.3);
    transition: color 0.2s;
  }

  .page-footer a:hover { color: rgba(255,255,255,0.6); }

  @media (max-width: 600px) {
    .booking-top { flex-direction: column; gap: 0.5rem; }
    .booking-item.is-clickable:hover,
    .hotel-item:hover {
      margin: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
</style>
