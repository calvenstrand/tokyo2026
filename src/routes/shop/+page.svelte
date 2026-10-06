<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { base } from '$app/paths'
  import { dev } from '$app/environment'
  import { replaceState } from '$app/navigation'
  import { AREAS, CATEGORY_LABELS, CITY_LABELS, STAGES, TRIP_DATES, isUnsortedArea, shops } from '../../data/shopping'
  import type { Category, City, Kind, Shop } from '../../data/shopping'
  import ShopCard from '$lib/components/ShopCard.svelte'
  import { now } from '$lib/now.svelte'
  import { describeOpenState, getOpenState } from '$lib/shopping/hours'
  import { loadStatuses, saveStatuses } from '$lib/shopping/storage'
  import type { ShopStatus, ShopStatuses } from '$lib/shopping/storage'
  import { formatDay, isTripDate, resolveSelectedDate, stageFor, tokyoNow, weekdayShort } from '$lib/shopping/time'
  import { validateShoppingData } from '$lib/shopping/validate'

  const CITIES: City[] = ['tokyo', 'kyoto', 'osaka', 'fukuoka']
  const CITY_TABS: { id: City | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    ...CITIES.map((c) => ({ id: c, label: CITY_LABELS[c] })),
  ]
  const KINDS: { id: Kind | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'clothes', label: 'Clothes' },
    { id: 'things', label: 'Things' },
  ]

  // Everything that depends on the clock, the URL or localStorage is set after
  // mount — the prerendered page is a plain, static list.
  let mounted = $state(false)
  let selectedDate = $state<string | null>(null)
  let statuses = $state<ShopStatuses>({})

  let city = $state<City | 'all'>('all')
  let kind = $state<Kind | 'all'>('all')
  let category = $state<Category | null>(null)
  let mustOnly = $state(false)
  let hideDone = $state(false)

  const clock = $derived(mounted ? tokyoNow(now()) : null)
  const isToday = $derived(!!clock && selectedDate === clock.date)
  const liveMinutes = $derived(isToday ? clock!.minutes : undefined)
  const stage = $derived(selectedDate ? stageFor(selectedDate) : undefined)

  // Only categories that exist for the chosen kind — no "Clothes + Vinyl" dead ends.
  const categories = $derived(
    (Object.keys(CATEGORY_LABELS) as Category[]).filter((c) =>
      shops.some((s) => s.categories.includes(c) && (kind === 'all' || s.kind.includes(kind)))
    )
  )

  function pickKind(k: Kind | 'all') {
    kind = k
    if (category && !categories.includes(category)) category = null
  }

  onMount(() => {
    if (dev) validateShoppingData()
    const param = new URL(location.href).searchParams.get('date')
    const today = tokyoNow().date
    selectedDate = resolveSelectedDate(param, today)
    statuses = loadStatuses()
    // On a trip day (or a ?date= preview) open on that city; before and after the trip, show everything.
    if (isTripDate(param) || isTripDate(today)) {
      const s = stageFor(selectedDate)
      if (s) city = s.city
    }
    mounted = true
  })

  function pickDate(d: string) {
    selectedDate = d
    // Follow the trip: a day in Osaka shows the Osaka list below.
    const s = stageFor(d)
    if (s) city = s.city
    const url = new URL(location.href)
    if (clock && d === clock.date) url.searchParams.delete('date')
    else url.searchParams.set('date', d)
    replaceState(url, {})
  }

  function setStatus(id: string, status: ShopStatus | null) {
    const next = { ...statuses }
    if (status) next[id] = status
    else delete next[id]
    statuses = next
    saveStatuses(next)
  }

  function openFor(shop: Shop) {
    if (!selectedDate) return { open: null, openLabel: null }
    const open = getOpenState(shop, selectedDate, liveMinutes)
    return { open, openLabel: describeOpenState(shop, open, liveMinutes) }
  }

  function passes(shop: Shop): boolean {
    if (kind !== 'all' && !shop.kind.includes(kind)) return false
    if (category && !shop.categories.includes(category)) return false
    if (mustOnly && shop.priority !== 'must') return false
    if (hideDone && (statuses[shop.id] === 'bought' || statuses[shop.id] === 'skipped')) return false
    return true
  }

  const areaLabel = (s: Shop) => AREAS.find((a) => a.id === s.area)?.label ?? s.area
  const statusLabel: Record<ShopStatus, string> = { visited: 'Visited', bought: 'Bought', skipped: 'Skipped' }

  const priorityRank = (s: Shop) => (s.priority === 'must' ? 0 : 1)
  const firstDate = (s: Shop) => s.plannedDates.slice().sort()[0] ?? '9999'

  function byPriorityThenDate(a: Shop, b: Shop): number {
    return priorityRank(a) - priorityRank(b) || firstDate(a).localeCompare(firstDate(b))
  }

  async function jumpTo(id: string) {
    const target = shops.find((s) => s.id === id)
    if (!target) return
    if (city !== 'all') city = target.city
    if (!passes(target)) {
      kind = 'all'
      category = null
      mustOnly = false
      hideDone = false
    }
    await tick()
    const el = document.getElementById(`shop-${id}`)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.tabIndex = -1
    el.focus({ preventScroll: true })
  }

  // ── Progress ──
  const mustShops = shops.filter((s) => s.priority === 'must')
  const mustDone = $derived(mustShops.filter((s) => statuses[s.id]).length)

  // ── Today ──
  const planned = $derived(
    selectedDate
      ? shops
          .filter((s) => s.plannedDates.includes(selectedDate!))
          .sort((a, b) => priorityRank(a) - priorityRank(b))
      : []
  )
  const nearby = $derived.by(() => {
    if (!selectedDate) return []
    // "Not placed yet" isn't a place, so it can't make anything nearby.
    const areas = new Set(planned.map((s) => s.area).filter((a) => !isUnsortedArea(a)))
    return shops
      .filter((s) => areas.has(s.area) && !s.plannedDates.includes(selectedDate!) && !statuses[s.id])
      .sort(byPriorityThenDate)
  })
  const plannedCount = (d: string) => shops.filter((s) => s.plannedDates.includes(d)).length

  // Day picker grouped by stage, so all 16 days fit without sideways scrolling.
  const dayGroups = STAGES.map((stage) => ({
    stage,
    dates: TRIP_DATES.filter((d) => d >= stage.start && d < stage.end),
  }))
  const monthShort = (d: string) => (d.slice(5, 7) === '10' ? 'Oct' : 'Nov')

  // ── City list ──
  const cityCounts = $derived(
    Object.fromEntries(
      CITY_TABS.map((t) => [t.id, shops.filter((s) => (t.id === 'all' || s.city === t.id) && passes(s)).length])
    ) as Record<City | 'all', number>
  )
  const groups = $derived(
    (city === 'all'
      ? CITIES.flatMap((c) => AREAS.filter((a) => a.city === c))
      : AREAS.filter((a) => a.city === city))
      .map((area) => ({
        area,
        shops: shops.filter((s) => s.area === area.id && passes(s)).sort(byPriorityThenDate),
      }))
      .filter((g) => g.shops.length > 0)
  )
  const cityHasShops = $derived(shops.some((s) => city === 'all' || s.city === city))
</script>

<svelte:head>
  <title>Shopping — Japan 2026</title>
  <meta name="robots" content="noindex,nofollow" />
</svelte:head>

<!-- Compact day row: the full card lives in the city list below, one tap away. -->
{#snippet row(shop: Shop)}
  {@const o = openFor(shop)}
  <button type="button" class="row status-{statuses[shop.id] ?? 'todo'}" onclick={() => jumpTo(shop.id)}>
    <span class="row-main">
      <span class="row-name">{shop.name}</span>
      <span class="row-sub">
        {areaLabel(shop)}{#if o.open && o.openLabel}{' · '}<span class="row-open open-{o.open.state}">{o.openLabel}</span>{/if}
      </span>
    </span>
    <span class="row-badges">
      {#if shop.priority === 'must'}<span class="row-badge row-must">Must</span>{/if}
      {#if statuses[shop.id]}<span class="row-badge row-status">{statusLabel[statuses[shop.id]]}</span>{/if}
      <span class="row-arrow" aria-hidden="true">↓</span>
    </span>
  </button>
{/snippet}

<div class="page">

  <header class="header">
    <a href="{base}/" class="back-link">← Itinerary</a>
    <div class="header-title">
      <span class="header-eyebrow">Japan '26 · 買物</span>
      <h1>Shopping</h1>
      <p class="progress" aria-live="polite">
        <span class="progress-num">{mustDone}</span> of {mustShops.length} must-visit shops done
      </p>
      <div
        class="progress-bar"
        role="progressbar"
        aria-label="Must-visit shops done"
        aria-valuemin="0"
        aria-valuemax={mustShops.length}
        aria-valuenow={mustDone}
      >
        <span style="width: {(mustDone / mustShops.length) * 100}%"></span>
      </div>
    </div>
  </header>

  <main>


    <!-- Day picker + today -->
    <section class="section" aria-labelledby="today-heading">
      <div class="section-header">
        <h2 id="today-heading">
          {#if selectedDate}
            {isToday ? 'Today' : formatDay(selectedDate)}
          {:else}
            Today
          {/if}
        </h2>
        {#if selectedDate}
          <p>
            {stage?.label ?? ''}{#if isToday} · {formatDay(selectedDate)}{/if}
            {#if !isToday}<span class="preview">· Preview — no live hours</span>{/if}
          </p>
        {/if}
      </div>

      <div class="days" role="group" aria-label="Trip day">
        {#each dayGroups as group (group.stage.id)}
          <div class="day-group">
            <span class="day-group-label">{group.stage.label}</span>
            <div class="day-row">
              {#each group.dates as d}
                {@const count = plannedCount(d)}
                <button
                  type="button"
                  class="day"
                  class:is-today={clock?.date === d}
                  aria-pressed={selectedDate === d}
                  aria-label="{formatDay(d)}, {count || 'no'} {count === 1 ? 'shop' : 'shops'} planned"
                  onclick={() => pickDate(d)}
                >
                  <span class="day-wd">{weekdayShort(d)}</span>
                  <span class="day-num">{monthShort(d)} {Number(d.slice(8))}</span>
                  <span class="day-count" class:none={!count}>{count ? `${count} shop${count === 1 ? '' : 's'}` : '—'}</span>
                </button>
              {/each}
            </div>
          </div>
        {/each}
      </div>

      {#if selectedDate}
        {#if planned.length}
          <h3 class="sub-heading">Planned · {planned.length}</h3>
          <ul class="rows">
            {#each planned as shop (shop.id)}
              <li>{@render row(shop)}</li>
            {/each}
          </ul>
        {:else}
          <p class="empty">No shops planned for {formatDay(selectedDate)}.</p>
        {/if}

        {#if nearby.length}
          <h3 class="sub-heading">Still on your list nearby · {nearby.length}</h3>
          <ul class="rows">
            {#each nearby as shop (shop.id)}
              <li>{@render row(shop)}</li>
            {/each}
          </ul>
        {/if}
      {/if}
    </section>

    <!-- All shops -->
    <section class="section" aria-labelledby="all-heading">
      <div class="section-header">
        <h2 id="all-heading">All shops</h2>
        <p>Grouped by area · must first</p>
      </div>

      <div class="tabs" role="group" aria-label="City">
        {#each CITY_TABS as t}
          <button
            type="button"
            class="tab"
            aria-pressed={city === t.id}
            onclick={() => (city = t.id)}
          >
            {t.label} <span class="tab-count">{cityCounts[t.id]}</span>
          </button>
        {/each}
      </div>

      <div class="filters">
        <div class="filter-row" role="group" aria-label="Kind">
          {#each KINDS as k}
            <button type="button" class="pill" aria-pressed={kind === k.id} onclick={() => pickKind(k.id)}>
              {k.label}
            </button>
          {/each}
        </div>

        <div class="filter-row" role="group" aria-label="Category">
          <button type="button" class="pill" aria-pressed={category === null} onclick={() => (category = null)}>
            All
          </button>
          {#each categories as c}
            <button
              type="button"
              class="pill"
              aria-pressed={category === c}
              onclick={() => (category = category === c ? null : c)}
            >
              {CATEGORY_LABELS[c]}
            </button>
          {/each}
        </div>

        <div class="filter-row">
          <button type="button" class="pill pill-toggle" aria-pressed={mustOnly} onclick={() => (mustOnly = !mustOnly)}>
            <span class="check" aria-hidden="true">{mustOnly ? '✓' : ''}</span>
            Must only
          </button>
          <button type="button" class="pill pill-toggle" aria-pressed={hideDone} onclick={() => (hideDone = !hideDone)}>
            <span class="check" aria-hidden="true">{hideDone ? '✓' : ''}</span>
            Hide bought and skipped
          </button>
        </div>
      </div>

      {#if !cityHasShops}
        <p class="empty">Nothing on the list{city === 'all' ? '' : ` in ${CITY_LABELS[city]}`}.</p>
      {:else if groups.length === 0}
        <p class="empty">No shops match these filters.</p>
      {:else}
        {#each groups as group, i (group.area.id)}
          {#if city === 'all' && group.area.city !== groups[i - 1]?.area.city}
            <p class="city-heading">{CITY_LABELS[group.area.city]}</p>
          {/if}
          <div class="area">
            <h3 class="area-heading">{group.area.label} <span>{group.shops.length}</span></h3>
            {#each group.shops as shop (shop.id)}
              <ShopCard
                {shop}
                status={statuses[shop.id]}
                {...openFor(shop)}
                anchor
                headingLevel={4}
                onStatus={setStatus}
                onJump={jumpTo}
              />
            {/each}
          </div>
        {/each}
      {/if}
    </section>

  </main>

  <footer class="page-footer">
    <span>Japan '26 · Shopping days Oct 30 – Nov 14</span>
    <a href="{base}/">← Back to itinerary</a>
  </footer>

</div>

<style>
  .page {
    min-height: 100vh;
    background: #0f0f0f;
    color: #e0e0e0;
    padding-top: 4rem;
  }

  /* ── Header ── */
  .header {
    display: flex;
    align-items: flex-start;
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
    color: rgba(255,255,255,0.5);
    transition: color 0.2s;
    white-space: nowrap;
    padding: 0.75rem 0;
  }

  .back-link:hover { color: rgba(255,255,255,0.7); }

  .header-title { flex: 1; min-width: min(100%, 18rem); }

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

  .progress {
    margin-top: 0.9rem;
    font-family: var(--font-condensed);
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
  }

  .progress-num {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: #4caf82;
    letter-spacing: 0.04em;
    vertical-align: -0.1em;
  }

  .progress-bar {
    margin-top: 0.5rem;
    height: 3px;
    max-width: 24rem;
    background: rgba(255,255,255,0.08);
  }

  .progress-bar span {
    display: block;
    height: 100%;
    background: #4caf82;
    transition: width 0.3s ease;
  }

  /* ── Main ── */
  main {
    padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem);
    max-width: 900px;
    display: flex;
    flex-direction: column;
    gap: clamp(3rem, 6vw, 5rem);
  }

  .section-header { margin-bottom: 1.25rem; }

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
    color: rgba(255,255,255,0.5);
  }

  .preview { color: #ff9600; }

  .sub-heading,
  .area-heading {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    padding: 1.5rem 0 0.75rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .area-heading {
    font-family: var(--font-display);
    font-size: clamp(1.2rem, 3vw, 1.7rem);
    letter-spacing: 0.06em;
    color: white;
  }

  .area-heading span {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    color: rgba(255,255,255,0.4);
    margin-left: 0.4rem;
  }

  .empty {
    font-family: var(--font-sans);
    color: rgba(255,255,255,0.5);
    font-size: 0.9rem;
    padding: 1.5rem 0;
  }

  /* ── Day rows ── */
  .rows { list-style: none; }

  .row {
    width: 100%;
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.7rem 0;
    background: none;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    color: inherit;
    text-align: left;
    cursor: pointer;
  }

  .row:hover .row-name { color: #ff2d55; }

  .row-main {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    min-width: 0;
  }

  .row-name {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: white;
    line-height: 1.15;
    transition: color 0.15s;
  }

  .row-sub {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  .row-open.open-open         { color: #4caf82; }
  .row-open.open-closing-soon { color: #ff9600; }
  .row-open.open-closed       { color: #ff2d55; }

  .row.status-bought .row-name,
  .row.status-skipped .row-name {
    text-decoration: line-through;
    text-decoration-color: rgba(255,255,255,0.3);
  }

  .row.status-skipped { opacity: 0.45; }

  .row-badges {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    flex-shrink: 0;
  }

  .row-badge {
    font-family: var(--font-condensed);
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.2rem 0.5rem;
    border: 1px solid;
    border-radius: 2px;
  }

  .row-must   { color: #ff2d55; border-color: rgba(255,45,85,0.35); }
  .row-status { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.2); }
  .row.status-bought  .row-status { color: #4caf82; border-color: rgba(76,175,130,0.3); }
  .row.status-visited .row-status { color: #7d9bff; border-color: rgba(79,124,255,0.3); }

  .row-arrow {
    color: rgba(255,255,255,0.35);
    font-size: 0.9rem;
  }

  /* ── Day picker ── */
  .days {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 1.25rem;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  .day-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .day-group-label {
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  .day-row {
    display: flex;
    align-items: flex-start;
    gap: 0.35rem;
  }

  .day {
    width: 58px;
    min-height: 64px;
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
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }

  .day:hover { border-color: rgba(255,255,255,0.3); color: rgba(255,255,255,0.85); }

  .day-wd,
  .day-count {
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .day-num {
    font-family: var(--font-display);
    font-size: 1.05rem;
    letter-spacing: 0.04em;
    line-height: 1;
    white-space: nowrap;
  }

  .day-count { color: #ff2d55; }
  .day-count.none { color: rgba(255,255,255,0.25); }

  .day.is-today { border-color: rgba(255,45,85,0.5); }

  .day[aria-pressed='true'] {
    border-color: #ff2d55;
    background: rgba(255,45,85,0.1);
    color: white;
  }

  /* ── Tabs + filters ── */
  .tabs {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    border-bottom: 1px solid rgba(255,255,255,0.08);
    margin-bottom: 1.25rem;
  }

  .tab {
    min-height: 48px;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: rgba(255,255,255,0.5);
    font-family: var(--font-condensed);
    font-size: 0.85rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }

  .tab:hover { color: rgba(255,255,255,0.85); }

  .tab[aria-pressed='true'] {
    color: white;
    border-bottom-color: #ff2d55;
  }

  .tab-count {
    font-size: 0.7rem;
    color: rgba(255,255,255,0.35);
    margin-left: 0.2rem;
  }

  /* Five tabs on a phone: stack the count under the name. */
  @media (max-width: 480px) {
    .tab { font-size: 0.75rem; letter-spacing: 0.06em; padding: 0.4rem 0; }
    .tab-count { display: block; margin-left: 0; }
  }

  .city-heading {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ff2d55;
    padding-top: 2rem;
  }

  .city-heading:first-child { padding-top: 0.5rem; }

  .tab[aria-pressed='true'] .tab-count { color: #ff2d55; }

  .filters {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    margin-bottom: 0.5rem;
  }

  .filter-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem;
  }

  .pill {
    min-height: 44px;
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0 0.9em;
    border: 1px solid rgba(255,255,255,0.12);
    background: none;
    color: rgba(255,255,255,0.5);
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    border-radius: 2px;
  }

  .pill:hover {
    border-color: rgba(255,255,255,0.3);
    color: rgba(255,255,255,0.8);
  }

  .pill[aria-pressed='true'] {
    border-color: #ff2d55;
    color: #ff2d55;
    background: rgba(255,45,85,0.06);
  }

  .pill-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
  }

  .check {
    width: 16px;
    height: 16px;
    border: 1px solid currentColor;
    border-radius: 2px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
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
    color: rgba(255,255,255,0.5);
  }

  .page-footer a {
    color: rgba(255,255,255,0.5);
    transition: color 0.2s;
  }

  .page-footer a:hover { color: rgba(255,255,255,0.6); }
</style>
