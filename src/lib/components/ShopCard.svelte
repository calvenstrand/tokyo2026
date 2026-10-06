<script lang="ts">
  import { AREAS, shops } from '../../data/shopping'
  import type { Shop } from '../../data/shopping'
  import type { OpenState } from '../shopping/hours'
  import type { ShopStatus } from '../shopping/storage'
  import { mapsUrl } from '../shopping/maps'
  import { formatDay, stageFor } from '../shopping/time'

  interface Props {
    shop: Shop
    status?: ShopStatus
    /** Null until mounted — the server renders without open state. */
    open: OpenState | null
    openLabel: string | null
    /** Show the area under the name (for lists that aren't grouped by area). */
    showArea?: boolean
    /** Gives the card an id so fallback links can jump to it. */
    anchor?: boolean
    headingLevel?: 3 | 4
    onStatus: (id: string, status: ShopStatus | null) => void
    onJump: (id: string) => void
  }

  let {
    shop,
    status,
    open,
    openLabel,
    showArea = false,
    anchor = false,
    headingLevel = 4,
    onStatus,
    onJump,
  }: Props = $props()

  const areaLabel = $derived(AREAS.find((a) => a.id === shop.area)?.label ?? shop.area)
  const alternatives = $derived(
    (shop.alternativeIds ?? [])
      .map((id) => shops.find((s) => s.id === id))
      .filter((s): s is Shop => !!s)
  )
  const meta = $derived([shop.floor, shop.station, shop.address].filter(Boolean) as string[])

  const actions: { id: ShopStatus; label: string }[] = [
    { id: 'visited', label: 'Visited' },
    { id: 'bought',  label: 'Bought' },
    { id: 'skipped', label: 'Skip' },
  ]

  const statusLabel: Record<ShopStatus, string> = {
    visited: 'Visited',
    bought: 'Bought',
    skipped: 'Skipped',
  }
</script>

<article
  class="shop status-{status ?? 'todo'}"
  id={anchor ? `shop-${shop.id}` : undefined}
>
  <div class="shop-top">
    <svelte:element this={`h${headingLevel}`} class="shop-name">
      {shop.name}
      {#if shop.nameJa}<span class="shop-ja" lang="ja">{shop.nameJa}</span>{/if}
    </svelte:element>
    <div class="badges">
      <span class="badge priority-{shop.priority}">{shop.priority === 'must' ? 'Must' : 'Maybe'}</span>
      {#if status}<span class="badge badge-status">{statusLabel[status]}</span>{/if}
    </div>
  </div>

  {#if shop.chain || showArea}
    <p class="shop-sub">
      {[shop.chain, showArea ? areaLabel : null].filter(Boolean).join(' · ')}
    </p>
  {/if}

  {#if shop.plannedDates.length}
    <ul class="dates" aria-label="Planned">
      {#each shop.plannedDates as d}
        <li class="date-chip" class:tentative={shop.tentative}>
          {[stageFor(d)?.label, formatDay(d), shop.tentative ? 'tentative' : null].filter(Boolean).join(' · ')}
        </li>
      {/each}
    </ul>
  {:else}
    <p class="shop-sub">No day planned</p>
  {/if}

  {#if open && openLabel}
    <p class="open open-{open.state}">
      <span class="dot" aria-hidden="true"></span>{openLabel}
      {#if open.holidayCaveat}<span class="holiday"> · public holiday, hours may differ</span>{/if}
    </p>
  {/if}
  {#if shop.hours.note}
    <p class="hours-note">{shop.hours.note}</p>
  {/if}

  {#if meta.length}
    <p class="meta">{meta.join(' · ')}</p>
  {/if}

  {#if shop.tip}
    <p class="tip">{shop.tip}</p>
  {/if}

  {#if alternatives.length}
    <p class="alts">
      <span class="alts-label">If sold out or closed:</span>
      {#each alternatives as alt, i}
        <!-- A button, not a #hash link: the target may sit in another city tab. -->
        <button type="button" class="alt-link" onclick={() => onJump(alt.id)}>{alt.name}</button>{i < alternatives.length - 1 ? ', ' : ''}
      {/each}
    </p>
  {/if}

  <div class="actions">
    <a class="maps" href={mapsUrl(shop)} target="_blank" rel="noopener noreferrer">
      Open in Google Maps ↗
    </a>
    <div class="status-buttons" role="group" aria-label="Status for {shop.name}">
      {#each actions as a}
        <button
          type="button"
          class="status-btn status-btn-{a.id}"
          aria-pressed={status === a.id}
          onclick={() => onStatus(shop.id, a.id)}
        >{a.label}</button>
      {/each}
      <button
        type="button"
        class="status-btn"
        disabled={!status}
        onclick={() => onStatus(shop.id, null)}
      >Reset</button>
    </div>
  </div>
</article>

<style>
  .shop {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1.25rem 0 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    scroll-margin-top: 5rem;
    transition: opacity 0.2s;
  }

  .shop:focus { outline: none; }
  .shop:focus-visible { outline: 2px solid #ff2d55; outline-offset: 4px; }

  .status-skipped { opacity: 0.45; }
  .status-skipped .shop-name,
  .status-bought .shop-name {
    text-decoration: line-through;
    text-decoration-color: rgba(255,255,255,0.3);
  }

  .shop-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
  }

  .shop-name {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: clamp(1.1rem, 2.5vw, 1.4rem);
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: white;
    line-height: 1.1;
  }

  .shop-ja {
    font-family: var(--font-ja);
    font-weight: 400;
    font-size: 0.8em;
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.5);
    text-transform: none;
    margin-left: 0.5rem;
  }

  .badges {
    display: flex;
    gap: 0.4rem;
    flex-shrink: 0;
  }

  .badge {
    font-family: var(--font-condensed);
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.2rem 0.5rem;
    border-radius: 2px;
    white-space: nowrap;
    border: 1px solid;
  }

  .priority-must  { color: #ff2d55; border-color: rgba(255,45,85,0.35); }
  .priority-maybe { color: rgba(255,255,255,0.5); border-color: rgba(255,255,255,0.12); }

  .badge-status { color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.2); }
  .status-bought  .badge-status { background: rgba(76,175,130,0.15); color: #4caf82; border-color: rgba(76,175,130,0.3); }
  .status-visited .badge-status { background: rgba(79,124,255,0.12); color: #7d9bff; border-color: rgba(79,124,255,0.3); }

  .shop-sub,
  .meta {
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  .dates {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .date-chip {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.2rem 0.55rem;
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 2px;
    color: rgba(255,255,255,0.75);
  }

  .date-chip.tentative {
    border-style: dashed;
    color: rgba(255,255,255,0.55);
  }

  .open {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.45rem;
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }

  .open-open         { color: #4caf82; }
  .open-closing-soon { color: #ff9600; }
  .open-closed       { color: #ff2d55; }
  .open-unknown      { color: rgba(255,255,255,0.5); }

  .holiday {
    font-weight: 400;
    color: rgba(255,255,255,0.5);
  }

  .hours-note,
  .tip {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    line-height: 1.55;
    max-width: 58ch;
  }

  .hours-note { color: rgba(255,255,255,0.45); }
  .tip        { color: rgba(255,255,255,0.7); }

  .alts {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    color: rgba(255,255,255,0.6);
  }

  .alts-label {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-right: 0.35rem;
  }

  .alt-link {
    background: none;
    border: none;
    font: inherit;
    cursor: pointer;
    min-height: 44px;
    color: rgba(255,255,255,0.85);
    text-decoration: underline;
    text-decoration-color: rgba(255,45,85,0.5);
    text-underline-offset: 3px;
    display: inline-block;
    padding: 0.5rem 0;
  }

  .alt-link:hover { color: #ff2d55; }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.4rem;
  }

  .maps,
  .status-btn {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-condensed);
    font-size: 0.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    border-radius: 2px;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
  }

  .maps {
    padding: 0 1.1rem;
    background: #ff2d55;
    color: white;
    font-weight: 700;
  }

  .maps:hover { background: #ff4a6c; }

  .status-buttons {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.4rem;
    flex: 1;
    min-width: min(100%, 20rem);
  }

  .status-btn {
    padding: 0 0.5rem;
    border: 1px solid rgba(255,255,255,0.12);
    background: none;
    color: rgba(255,255,255,0.55);
    cursor: pointer;
  }

  .status-btn:hover:not(:disabled) {
    border-color: rgba(255,255,255,0.3);
    color: rgba(255,255,255,0.85);
  }

  .status-btn:disabled {
    opacity: 0.35;
    cursor: default;
  }

  .status-btn[aria-pressed='true'] {
    border-color: #ff2d55;
    color: #ff2d55;
    background: rgba(255,45,85,0.06);
  }

  .status-btn-bought[aria-pressed='true'] {
    border-color: #4caf82;
    color: #4caf82;
    background: rgba(76,175,130,0.1);
  }

  .status-btn-visited[aria-pressed='true'] {
    border-color: #7d9bff;
    color: #7d9bff;
    background: rgba(79,124,255,0.1);
  }

  @media (max-width: 600px) {
    .shop-top { flex-direction: column; gap: 0.5rem; }
    .maps { flex: 1 1 100%; }
  }
</style>
