<script lang="ts">
  import { bookings, logistics } from './data/bookings'
  import type { BookingStatus } from './data/bookings'

  const STORAGE_KEY = 'tokyo26-bookings'

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
    if (current === 'na' || current === 'watching') return
    const next: BookingStatus = current === 'pending' ? 'done' : 'pending'
    statuses = { ...statuses, [id]: next }
    saveStatuses(statuses)
  }

  const urgencyLabel: Record<string, string> = {
    'lottery':       'Lottery',
    'before-sweden': 'Book now',
    'book-online':   'Book online',
    'watch':         'Watch',
    'no-booking':    'No booking',
  }

  const pendingCount = $derived(
    bookings.filter(b => getStatus(b.id, b.defaultStatus) === 'pending').length
  )
  const doneCount = $derived(
    bookings.filter(b => getStatus(b.id, b.defaultStatus) === 'done').length
  )
  const logisticsPendingCount = $derived(
    logistics.filter(l => getStatus(l.id, l.defaultStatus) === 'pending').length
  )
</script>

<div class="page">

  <header class="header">
    <a href="/tokyo26/" class="back-link">← Itinerary</a>
    <div class="header-title">
      <span class="header-eyebrow">Japan '26</span>
      <h1>Bookings</h1>
    </div>
    <div class="header-stats">
      <div class="stat">
        <span class="stat-num">{pendingCount}</span>
        <span class="stat-label">pending</span>
      </div>
      <span class="stat-sep">/</span>
      <div class="stat">
        <span class="stat-num done">{doneCount}</span>
        <span class="stat-label">done</span>
      </div>
    </div>
  </header>

  <main>

    <!-- Priority bookings -->
    <section class="section">
      <div class="section-header">
        <h2>Priority Bookings</h2>
        <p>In order. Click a row to mark as done.</p>
      </div>

      <ul class="booking-list">
        {#each bookings as booking}
          {@const status = getStatus(booking.id, booking.defaultStatus)}
          {@const clickable = status !== 'na' && status !== 'watching'}
          <li
            class="booking-item"
            class:is-done={status === 'done'}
            class:is-watching={status === 'watching'}
            class:is-na={status === 'na'}
            class:is-clickable={clickable}
            onclick={() => toggle(booking.id, booking.defaultStatus)}
            role={clickable ? 'button' : 'listitem'}
            tabindex={clickable ? 0 : -1}
            onkeydown={(e) => e.key === 'Enter' && toggle(booking.id, booking.defaultStatus)}
          >
            <div class="booking-left">
              <span class="booking-priority">
                {String(booking.priority).padStart(2, '0')}
              </span>
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
                  <span class="urgency-badge urgency-{booking.urgency}">
                    {urgencyLabel[booking.urgency]}
                  </span>
                  <span class="status-badge status-{status}">
                    {#if status === 'pending'}Pending
                    {:else if status === 'done'}Done
                    {:else if status === 'watching'}Watching
                    {:else}No booking
                    {/if}
                  </span>
                </div>
              </div>

              <div class="booking-meta">
                <span class="booking-location">{booking.location}</span>
                <span class="booking-dates">{booking.dates}</span>
              </div>

              <p class="booking-desc">{booking.description}</p>

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

    <!-- Logistics -->
    <section class="section">
      <div class="section-header">
        <h2>Before Departure</h2>
        <p>Logistics to sort before leaving Sweden. {logisticsPendingCount} remaining.</p>
      </div>

      <ul class="logistics-list">
        {#each logistics as item}
          {@const status = getStatus(item.id, item.defaultStatus)}
          <li
            class="logistics-item"
            class:is-done={status === 'done'}
            onclick={() => toggle(item.id, item.defaultStatus)}
            role="button"
            tabindex="0"
            onkeydown={(e) => e.key === 'Enter' && toggle(item.id, item.defaultStatus)}
          >
            <div class="logistics-check">
              <div class="check-box" class:checked={status === 'done'}>
                {#if status === 'done'}<span>✓</span>{/if}
              </div>
            </div>
            <div class="logistics-body">
              <span class="logistics-name">{item.name}</span>
              <p class="logistics-notes">{item.notes}</p>
            </div>
          </li>
        {/each}
      </ul>
    </section>

  </main>

  <footer class="page-footer">
    <span>Japan '26 · Oct 8–24</span>
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

  .header-stats {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.15rem;
  }

  .stat-num {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4vw, 3rem);
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
    font-size: 1.5rem;
    color: rgba(255,255,255,0.15);
    align-self: center;
    padding-bottom: 1rem;
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

  .booking-priority {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: #ff2d55;
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
  }

  .urgency-lottery      { background: rgba(255,45,85,0.15);  color: #ff2d55;  border: 1px solid rgba(255,45,85,0.3); }
  .urgency-before-sweden{ background: rgba(255,150,0,0.12);  color: #ff9600;  border: 1px solid rgba(255,150,0,0.25); }
  .urgency-book-online  { background: rgba(0,200,255,0.1);   color: #00c8ff;  border: 1px solid rgba(0,200,255,0.2); }
  .urgency-watch        { background: rgba(180,180,0,0.1);   color: #c8c800;  border: 1px solid rgba(180,180,0,0.2); }
  .urgency-no-booking   { background: rgba(255,255,255,0.05);color: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.1); }

  .status-pending  { background: transparent; color: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.1); }
  .status-done     { background: rgba(76,175,130,0.15); color: #4caf82; border: 1px solid rgba(76,175,130,0.3); }
  .status-watching { background: rgba(180,180,0,0.1);   color: #c8c800; border: 1px solid rgba(180,180,0,0.2); }
  .status-na       { background: transparent; color: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.07); }

  .booking-meta {
    display: flex;
    gap: 1rem;
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .booking-location { color: rgba(255,255,255,0.4); }
  .booking-dates    { color: rgba(255,255,255,0.25); }

  .booking-desc {
    font-family: var(--font-sans);
    font-size: 0.88rem;
    color: rgba(255,255,255,0.5);
    line-height: 1.55;
    max-width: 58ch;
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

  /* ── Logistics ── */
  .logistics-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    border-top: 1px solid rgba(255,255,255,0.08);
  }

  .logistics-item {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    padding: 1.25rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    cursor: pointer;
    transition: background 0.15s;
  }

  .logistics-item:hover {
    background: rgba(255,255,255,0.02);
    margin: 0 -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .logistics-item.is-done { opacity: 0.4; }
  .logistics-item.is-done .logistics-name { text-decoration: line-through; text-decoration-color: rgba(255,255,255,0.3); }

  .logistics-check { padding-top: 0.15rem; flex-shrink: 0; }

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

  .logistics-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .logistics-name {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: white;
  }

  .logistics-notes {
    font-family: var(--font-sans);
    font-size: 0.82rem;
    color: rgba(255,255,255,0.4);
    line-height: 1.5;
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
    .logistics-item:hover {
      margin: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
</style>
