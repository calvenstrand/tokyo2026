<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { base } from '$app/paths'
  import { dev } from '$app/environment'
  import { replaceState } from '$app/navigation'
  import { RETURN_FLIGHT, monthDay, tripDays, validateTrip } from '../../data/trip'
  import type { Activity } from '../../data/itinerary'
  import { AREAS, DAY_NOTES, STAGES, areaRank, shops } from '../../data/shopping'
  import type { Shop } from '../../data/shopping'
  import { now } from '$lib/now.svelte'
  import { describeOpenState, getOpenState } from '$lib/shopping/hours'
  import { mapsUrl } from '$lib/shopping/maps'
  import { loadStatuses, saveStatuses } from '$lib/shopping/storage'
  import type { ShopStatus, ShopStatuses } from '$lib/shopping/storage'
  import { formatDay, tokyoNow, weekdayShort } from '$lib/shopping/time'
  import { TODAY_DATES, dayFor, isCommitment, mapsSearchUrl, resolveDay, tickKey, tomorrowFor, tripDayNow } from '$lib/today/day'
  import { loadTicks, saveTicks } from '$lib/today/ticks'
  import type { Ticks } from '$lib/today/ticks'
  import { validateItinerary } from '$lib/today/validate'

  // Everything that depends on the clock, the URL or localStorage is set after
  // mount — the prerendered page is an empty shell.
  let mounted = $state(false)
  let selected = $state<string | null>(null)
  let ticks = $state<Ticks>({})
  let statuses = $state<ShopStatuses>({})
  let openDescs = $state(new Set<string>())

  let strip: HTMLDivElement | undefined = $state()

  const clock = $derived(mounted ? tokyoNow(now()) : null)
  const todayIso = $derived(mounted ? tripDayNow(now()) : null)
  const tripOver = $derived(mounted && now().getTime() > RETURN_FLIGHT.getTime())

  const day = $derived(selected ? dayFor(selected) : undefined)
  const index = $derived(selected ? TODAY_DATES.indexOf(selected) : -1)
  const stageLabel = $derived(day ? (STAGES.find((s) => s.id === day.cityId)?.label ?? day.cityName) : '')

  const plan = $derived(day ? day.activities.filter((a) => a.kind !== 'optional') : [])
  const extras = $derived(day ? day.activities.filter((a) => a.kind === 'optional') : [])
  const doneCount = $derived(selected ? plan.filter((a) => ticks[tickKey(selected!, a.title)]).length : 0)
  const dayHasTicks = $derived(!!selected && Object.keys(ticks).some((k) => k.startsWith(`${selected}:`)))

  const tomorrow = $derived(selected ? tomorrowFor(selected) : null)
  const flightTime = (() => {
    const m = tokyoNow(RETURN_FLIGHT).minutes
    return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
  })()

  // ── Shopping ──
  const priorityRank = (s: Shop) => (s.priority === 'must' ? 0 : 1)
  const targets = $derived(
    selected ? shops.filter((s) => s.plannedDates.includes(selected!)).sort((a, b) => priorityRank(a) - priorityRank(b)) : []
  )
  const niceToHave = $derived(
    selected
      ? shops
          .filter((s) => s.optionalDates?.includes(selected!))
          .sort((a, b) => areaRank(a.area) - areaRank(b.area) || priorityRank(a) - priorityRank(b))
      : []
  )
  const liveMinutes = $derived(clock && selected === clock.date ? clock.minutes : undefined)
  const areaLabel = (s: Shop) => AREAS.find((a) => a.id === s.area)?.label ?? s.area

  function openLabel(shop: Shop) {
    const open = getOpenState(shop, selected!, liveMinutes)
    return { state: open.state, label: describeOpenState(shop, open, liveMinutes) }
  }

  const SHOP_ACTIONS: { id: ShopStatus; label: string }[] = [
    { id: 'visited', label: 'Visited' },
    { id: 'bought', label: 'Bought' },
    { id: 'skipped', label: 'Skip' },
  ]

  onMount(() => {
    if (dev) {
      validateItinerary()
      validateTrip()
    }
    const param = new URL(location.href).searchParams.get('date')
    selected = resolveDay(param, tripDayNow())
    ticks = loadTicks()
    statuses = loadStatuses()
    mounted = true
    centreStrip(false)
  })

  async function centreStrip(smooth = true) {
    await tick()
    const btn = strip?.querySelector<HTMLElement>('[aria-pressed="true"]')
    if (!strip || !btn) return
    strip.scrollTo({
      left: btn.offsetLeft - (strip.clientWidth - btn.offsetWidth) / 2,
      behavior: smooth ? 'smooth' : 'auto',
    })
  }

  function pick(iso: string) {
    selected = iso
    const url = new URL(location.href)
    if (iso === todayIso) url.searchParams.delete('date')
    else url.searchParams.set('date', iso)
    replaceState(url, {})
    centreStrip()
  }

  function toggleTick(key: string) {
    const next = { ...ticks }
    if (next[key]) delete next[key]
    else next[key] = true
    ticks = next
    saveTicks(next)
  }

  function clearDay() {
    const next = Object.fromEntries(Object.entries(ticks).filter(([k]) => !k.startsWith(`${selected}:`))) as Ticks
    ticks = next
    saveTicks(next)
  }

  function toggleDesc(key: string) {
    const next = new Set(openDescs)
    if (next.has(key)) next.delete(key)
    else next.add(key)
    openDescs = next
  }

  function setStatus(id: string, status: ShopStatus) {
    const next = { ...statuses }
    if (next[id] === status) delete next[id]
    else next[id] = status
    statuses = next
    saveStatuses(next)
  }

</script>

<svelte:head>
  <title>Today — Japan 2026</title>
  <meta name="robots" content="noindex,nofollow" />
</svelte:head>

{#snippet item(act: Activity)}
  {@const key = tickKey(selected!, act.title)}
  {@const done = !!ticks[key]}
  {@const open = openDescs.has(key)}
  <li
    class="item"
    class:booked={act.kind === 'booked'}
    class:fixed={act.kind === 'fixed'}
    class:hard={act.title.startsWith('HARD LIMIT')}
    class:done
  >
    <label class="tick">
      <input type="checkbox" checked={done} onchange={() => toggleTick(key)} />
      <span class="sr-only">Done: {act.title}</span>
    </label>
    <div class="item-body">
      <button
        type="button"
        class="item-head"
        aria-expanded={open}
        aria-controls="desc-{key}"
        onclick={() => toggleDesc(key)}
      >
        {#if act.time}<span class="item-time">{act.time}</span>{/if}
        <span class="item-title">{act.title}</span>
      </button>
      {#if isCommitment(act) || act.mapsQuery}
        <div class="item-meta">
          {#if act.kind === 'booked'}<span class="pill-tag tag-booked">Booked</span>{/if}
          {#if act.kind === 'fixed'}<span class="pill-tag tag-fixed">Fixed</span>{/if}
          {#if act.mapsQuery}
            <a class="maps" href={mapsSearchUrl(act.mapsQuery)} target="_blank" rel="noopener noreferrer">Maps ↗</a>
          {/if}
        </div>
      {/if}
      {#if open}
        <p class="item-desc" id="desc-{key}">{act.description}</p>
      {/if}
    </div>
  </li>
{/snippet}

{#snippet shopRow(shop: Shop)}
  {@const o = openLabel(shop)}
  {@const status = statuses[shop.id]}
  <li class="shop status-{status ?? 'todo'}">
    <div class="shop-top">
      <span class="shop-name">{shop.name}</span>
      {#if shop.priority === 'must'}<span class="pill-tag tag-must">Priority</span>{/if}
    </div>
    <p class="shop-sub">
      {areaLabel(shop)} · <span class="open-{o.state}">{o.label}</span>
    </p>
    <div class="shop-actions">
      <a class="shop-btn" href={mapsUrl(shop)} target="_blank" rel="noopener noreferrer">Maps ↗</a>
      {#each SHOP_ACTIONS as a}
        <button
          type="button"
          class="shop-btn"
          aria-pressed={status === a.id}
          onclick={() => setStatus(shop.id, a.id)}
        >{a.label}</button>
      {/each}
    </div>
  </li>
{/snippet}

<div class="page">
  {#if day && selected}
    <header class="header">
      <div class="header-row">
        <button
          type="button"
          class="step"
          aria-label="Previous day"
          disabled={index <= 0}
          onclick={() => pick(TODAY_DATES[index - 1])}
        >←</button>
        <div class="header-title">
          <span class="header-eyebrow">
            {day.dayName ?? `Day ${day.day}`} · {stageLabel}
            {#if selected === todayIso}<span class="today-mark">· Today</span>{/if}
          </span>
          <h1>{formatDay(selected)}</h1>
          <p class="header-label">{day.label}</p>
        </div>
        <button
          type="button"
          class="step"
          aria-label="Next day"
          disabled={index >= TODAY_DATES.length - 1}
          onclick={() => pick(TODAY_DATES[index + 1])}
        >→</button>
      </div>

      <div class="strip" bind:this={strip} role="group" aria-label="Trip day">
        {#each tripDays as d (d.isoDate)}
          <button
            type="button"
            class="strip-day"
            class:is-today={d.isoDate === todayIso}
            aria-pressed={d.isoDate === selected}
            aria-label={formatDay(d.isoDate)}
            onclick={() => pick(d.isoDate)}
          >
            <span class="strip-wd">{weekdayShort(d.isoDate)}</span>
            <span class="strip-num">{monthDay(d.isoDate)}</span>
          </button>
        {/each}
      </div>

      {#if tomorrow && !tripOver}
        <p class="tomorrow">
          {#if tomorrow.type === 'commitment'}
            <span class="tomorrow-label">Tomorrow · {weekdayShort(tomorrow.day.isoDate)} {monthDay(tomorrow.day.isoDate)}</span>
            {tomorrow.activity.time ? `${tomorrow.activity.time} ` : ''}{tomorrow.activity.title}
          {:else if tomorrow.type === 'nothing'}
            <span class="tomorrow-label">Tomorrow · {weekdayShort(tomorrow.day.isoDate)} {monthDay(tomorrow.day.isoDate)}</span>
            Nothing fixed
          {:else}
            <span class="tomorrow-label">Flight home {flightTime}</span>
            {#if tomorrow.activity}{tomorrow.activity.title}{tomorrow.activity.time ? ` · be there ${tomorrow.activity.time}` : ''}{/if}
          {/if}
        </p>
      {/if}
    </header>

    <main>
      <section class="section" aria-labelledby="plan-heading">
        <div class="section-header">
          <h2 id="plan-heading">Today</h2>
          {#if plan.length}
            <p aria-live="polite"><span class="done-num">{doneCount}</span> of {plan.length} done</p>
          {/if}
        </div>

        {#if day.activities.length === 0}
          <p class="empty">Nothing planned.</p>
        {:else}
          {#if plan.length}
            <ul class="items">
              {#each plan as act (act.title)}{@render item(act)}{/each}
            </ul>
          {/if}

          {#if extras.length}
            <h3 class="sub-heading">If time allows</h3>
            <ul class="items items-extra">
              {#each extras as act (act.title)}{@render item(act)}{/each}
            </ul>
          {/if}

          {#if dayHasTicks}
            <button type="button" class="clear" onclick={clearDay}>Clear this day</button>
          {/if}
        {/if}
      </section>

      {#if targets.length || niceToHave.length}
        <section class="section" aria-labelledby="shop-heading">
          <div class="section-header">
            <h2 id="shop-heading">Shopping today</h2>
            <p><a class="inline-link" href="{base}/shop/?date={selected}">All shops →</a></p>
          </div>

          {#if DAY_NOTES[selected]}
            <p class="day-note">{DAY_NOTES[selected]}</p>
          {/if}

          {#if targets.length}
            <h3 class="sub-heading">Targets · {targets.length}</h3>
            <ul class="shops">
              {#each targets as shop (shop.id)}{@render shopRow(shop)}{/each}
            </ul>
          {/if}

          {#if niceToHave.length}
            {#key selected}
              <details class="optional">
                <summary>
                  <span>Nice to have · {niceToHave.length}</span>
                  <span class="optional-toggle" aria-hidden="true">+</span>
                </summary>
                <ul class="shops">
                  {#each niceToHave as shop (shop.id)}{@render shopRow(shop)}{/each}
                </ul>
              </details>
            {/key}
          {/if}
        </section>
      {/if}
    </main>
  {:else}
    <header class="header">
      <div class="header-title">
        <span class="header-eyebrow">Japan '26 · 今日</span>
        <h1>Today</h1>
      </div>
    </header>
  {/if}
</div>

<style>
  .page {
    min-height: 100vh;
    background: #0f0f0f;
    color: #e0e0e0;
    padding-top: 4rem;
    padding-bottom: calc(3rem + env(safe-area-inset-bottom));
  }

  button,
  a,
  input,
  summary {
    touch-action: manipulation;
  }

  /* ── Header ── */
  .header {
    padding: 1.25rem clamp(1rem, 5vw, 4rem) 0;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .header-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .header-title {
    flex: 1;
    min-width: 0;
    text-align: center;
  }

  .header-eyebrow {
    display: block;
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ff2d55;
    margin-bottom: 0.2rem;
  }

  .today-mark { color: white; }

  h1 {
    font-family: var(--font-display);
    font-size: clamp(2.4rem, 9vw, 4.5rem);
    color: white;
    line-height: 0.95;
    letter-spacing: 0.02em;
  }

  .header-label {
    margin-top: 0.3rem;
    font-family: var(--font-condensed);
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.6);
  }

  .step {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 2px;
    background: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
  }

  .step:disabled { opacity: 0.25; cursor: default; }

  /* ── Day strip ── */
  .strip {
    position: relative;
    display: flex;
    gap: 0.35rem;
    overflow-x: auto;
    margin: 1.25rem calc(-1 * clamp(1rem, 5vw, 4rem)) 0;
    padding: 0 clamp(1rem, 5vw, 4rem) 1rem;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .strip::-webkit-scrollbar { display: none; }

  .strip-day {
    flex: 0 0 auto;
    width: 58px;
    min-height: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.15rem;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 2px;
    background: none;
    color: rgba(255,255,255,0.55);
    cursor: pointer;
    font-family: var(--font-condensed);
  }

  .strip-wd {
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .strip-num {
    font-family: var(--font-display);
    font-size: 1.05rem;
    letter-spacing: 0.04em;
    line-height: 1;
    white-space: nowrap;
  }

  .strip-day.is-today { border-color: rgba(255,45,85,0.5); color: #ff2d55; }

  .strip-day[aria-pressed='true'] {
    border-color: #ff2d55;
    background: rgba(255,45,85,0.12);
    color: white;
  }

  .tomorrow {
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
    padding: 0.8rem 0 1rem;
    border-top: 1px solid rgba(255,255,255,0.06);
    font-family: var(--font-sans);
    font-size: 0.9rem;
    line-height: 1.4;
    color: rgba(255,255,255,0.85);
  }

  .tomorrow-label {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  /* ── Main ── */
  main {
    padding: 1.5rem clamp(1rem, 5vw, 4rem) 0;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .section-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 5vw, 2.6rem);
    color: white;
    letter-spacing: 0.04em;
    line-height: 1;
  }

  .section-header p {
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  .done-num {
    font-family: var(--font-display);
    font-size: 1.3rem;
    color: #4caf82;
    vertical-align: -0.1em;
  }

  .inline-link {
    display: inline-block;
    padding: 0.75rem 0;
    color: rgba(255,255,255,0.6);
  }

  .sub-heading {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    padding: 1.5rem 0 0.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .empty {
    font-family: var(--font-sans);
    color: rgba(255,255,255,0.5);
    font-size: 0.95rem;
    padding: 1.5rem 0;
  }

  /* ── Plan items ── */
  .items { list-style: none; }

  .item {
    display: flex;
    align-items: flex-start;
    gap: 0.25rem;
    padding: 0.35rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    border-left: 3px solid transparent;
  }

  .item.booked,
  .item.fixed {
    border-left-color: #ff2d55;
    background: rgba(255,45,85,0.04);
  }

  /* Same 3px border as the others plus an inset bar, so the content doesn't shift. */
  .item.hard {
    border-left-color: #ff9600;
    box-shadow: inset 3px 0 0 #ff9600;
    background: rgba(255,150,0,0.1);
  }

  .item.hard .item-title { color: #ffb347; }

  .tick {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .tick input {
    appearance: none;
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    margin: 0;
    border: 1.5px solid rgba(255,255,255,0.4);
    border-radius: 3px;
    display: grid;
    place-content: center;
    cursor: pointer;
  }

  .tick input::after {
    content: '';
    width: 6px;
    height: 12px;
    border: solid #0f0f0f;
    border-width: 0 2.5px 2.5px 0;
    transform: translateY(-1px) rotate(45deg);
    opacity: 0;
  }

  .tick input:checked {
    background: #4caf82;
    border-color: #4caf82;
  }

  .tick input:checked::after { opacity: 1; }

  .item-body {
    flex: 1;
    min-width: 0;
    padding-right: 0.25rem;
  }

  .item-head {
    width: 100%;
    min-height: 44px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.1rem;
    padding: 0.35rem 0;
    background: none;
    border: none;
    color: inherit;
    text-align: left;
    cursor: pointer;
  }

  .item-time {
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ff2d55;
  }

  .item-title {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: 0.02em;
    line-height: 1.2;
    color: white;
  }

  .item.done .item-title {
    text-decoration: line-through;
    text-decoration-color: rgba(255,255,255,0.35);
    color: rgba(255,255,255,0.45);
  }

  .item.done .item-time { color: rgba(255,255,255,0.35); }

  .item-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.3rem;
  }

  .maps {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 0.25rem;
    font-family: var(--font-condensed);
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #7d9bff;
  }

  .item-desc {
    font-family: var(--font-sans);
    font-size: 0.9rem;
    line-height: 1.55;
    color: rgba(255,255,255,0.72);
    padding-bottom: 0.75rem;
  }

  .items-extra .item-title {
    font-size: 1rem;
    color: rgba(255,255,255,0.75);
  }

  .pill-tag {
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.2rem 0.5rem;
    border: 1px solid;
    border-radius: 2px;
  }

  .tag-booked { color: #4caf82; border-color: rgba(76,175,130,0.4); }
  .tag-fixed  { color: #ff2d55; border-color: rgba(255,45,85,0.4); }
  .item.hard .tag-fixed { color: #ff9600; border-color: rgba(255,150,0,0.5); }
  .tag-must   { color: #ff2d55; border-color: rgba(255,45,85,0.35); }

  .clear {
    margin-top: 0.75rem;
    min-height: 44px;
    padding: 0 0.25rem;
    background: none;
    border: none;
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  /* ── Shopping ── */
  .day-note {
    font-family: var(--font-sans);
    font-size: 0.9rem;
    line-height: 1.55;
    color: rgba(255,255,255,0.75);
    max-width: 60ch;
    margin-top: 0.75rem;
    padding-left: 0.9rem;
    border-left: 2px solid rgba(255,45,85,0.5);
  }

  .shops { list-style: none; }

  .shop {
    padding: 0.8rem 0 0.4rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .shop-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .shop-name {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: white;
    line-height: 1.15;
  }

  .shop-sub {
    margin-top: 0.15rem;
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  .open-open         { color: #4caf82; }
  .open-closing-soon { color: #ff9600; }
  .open-closed       { color: #ff2d55; }

  .shop-actions {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.35rem;
    margin-top: 0.5rem;
  }

  .shop-btn {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 2px;
    background: none;
    color: rgba(255,255,255,0.6);
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
  }

  a.shop-btn { color: #7d9bff; }

  .shop-btn[aria-pressed='true'] {
    border-color: #ff2d55;
    color: #ff2d55;
    background: rgba(255,45,85,0.08);
  }

  .shop.status-bought .shop-name,
  .shop.status-skipped .shop-name {
    text-decoration: line-through;
    text-decoration-color: rgba(255,255,255,0.3);
  }

  .shop.status-skipped .shop-top,
  .shop.status-skipped .shop-sub { opacity: 0.45; }

  .optional {
    margin-top: 1.5rem;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 2px;
  }

  .optional summary {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    min-height: 48px;
    padding: 0.6rem 1rem;
    cursor: pointer;
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
  }

  .optional summary::-webkit-details-marker { display: none; }

  .optional-toggle {
    font-size: 1.1rem;
    transition: transform 0.2s;
  }

  .optional[open] .optional-toggle { transform: rotate(45deg); }

  .optional .shops { padding: 0 1rem 0.5rem; }
  .optional .shop-name { font-size: 0.95rem; color: rgba(255,255,255,0.8); }
</style>
