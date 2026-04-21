<script lang="ts">
  import { neighborhoods, places } from '../../data/explore'
  import type { PlaceCategory } from '../../data/explore'

  let activeNeighborhood = $state<string | null>(null)
  let activeCategory = $state<PlaceCategory | null>(null)

  const categories: { id: PlaceCategory; label: string }[] = [
    { id: 'activity',   label: 'Activity' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'bar',        label: 'Bar' },
    { id: 'shop',       label: 'Shop' },
  ]

  const filtered = $derived(
    places.filter(p => {
      if (activeNeighborhood && p.neighborhood !== activeNeighborhood) return false
      if (activeCategory && p.category !== activeCategory) return false
      return true
    })
  )

  function selectNeighborhood(id: string) {
    activeNeighborhood = activeNeighborhood === id ? null : id
    activeCategory = null
  }

  function selectCategory(id: PlaceCategory) {
    activeCategory = activeCategory === id ? null : id
  }
</script>

<svelte:head>
  <title>Explore Japan — Japan 2026</title>
</svelte:head>

<div class="explore-page">
  <header class="explore-header">
    <h1>EXPLORE</h1>
    <p>Places, bars, food and things to do — sorted by neighbourhood.</p>
  </header>

  <div class="filters">
    <div class="filter-group">
      <span class="filter-label">Neighbourhood</span>
      <div class="pills">
        {#each neighborhoods as n}
          <button
            class="pill"
            class:active={activeNeighborhood === n.id}
            onclick={() => selectNeighborhood(n.id)}
          >
            {n.name}
          </button>
        {/each}
      </div>
    </div>

    <div class="filter-group filter-group--category">
      <span class="filter-label">Category</span>
      <div class="pills">
        {#each categories as cat}
          <button
            class="pill pill--cat"
            class:active={activeCategory === cat.id}
            onclick={() => selectCategory(cat.id)}
          >
            {cat.label}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="results">
    {#if filtered.length === 0}
      <p class="empty">No places found.</p>
    {:else}
      <div class="results-count">{filtered.length} place{filtered.length === 1 ? '' : 's'}</div>
      <ul class="place-list">
        {#each filtered as place (place.id)}
          <li class="place-item">
            <span class="place-name">{place.name}</span>
            <span class="place-tag place-tag--{place.category}">{place.category}</span>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>

<style>
  .explore-page {
    min-height: 100svh;
    background: #0f0f0f;
    color: white;
    padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem) clamp(4rem, 8vw, 6rem);
    max-width: var(--max-width);
    margin: 0 auto;
  }

  /* Header */
  .explore-header {
    margin-bottom: clamp(3rem, 6vw, 5rem);
  }

  .explore-header h1 {
    font-family: var(--font-display);
    font-size: clamp(5rem, 14vw, 14rem);
    line-height: 0.88;
    letter-spacing: -0.01em;
    color: white;
    margin-bottom: 1.25rem;
  }

  .explore-header p {
    font-family: var(--font-sans);
    font-size: clamp(0.9rem, 1.4vw, 1.05rem);
    color: rgba(255,255,255,0.35);
    max-width: 44ch;
    line-height: 1.65;
  }

  /* Filters */
  .filters {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-bottom: clamp(2.5rem, 5vw, 4rem);
    padding-bottom: clamp(2rem, 4vw, 3rem);
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }

  .filter-label {
    display: block;
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin-bottom: 1rem;
  }

  .pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .pill {
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.35em 0.85em;
    border: 1px solid rgba(255,255,255,0.12);
    background: none;
    color: rgba(255,255,255,0.45);
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s, background 0.15s;
    border-radius: 2px;
  }

  .pill:hover {
    border-color: rgba(255,255,255,0.3);
    color: rgba(255,255,255,0.8);
  }

  .pill.active {
    border-color: #ff2d55;
    color: #ff2d55;
    background: rgba(255,45,85,0.06);
  }

  .filter-group--category .pills {
    gap: 0.5rem;
  }

  /* Results */
  .results-count {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
    margin-bottom: 1.5rem;
  }

  .place-list {
    list-style: none;
    display: flex;
    flex-direction: column;
  }

  .place-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    gap: 1rem;
  }

  .place-name {
    font-family: var(--font-condensed);
    font-size: clamp(1rem, 2vw, 1.35rem);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.85);
  }

  .place-tag {
    font-family: var(--font-condensed);
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.25em 0.7em;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .place-tag--activity  { background: rgba(255,200,0,0.1);  color: #ffc800; border: 1px solid rgba(255,200,0,0.2); }
  .place-tag--restaurant{ background: rgba(255,100,50,0.1); color: #ff6432; border: 1px solid rgba(255,100,50,0.2); }
  .place-tag--bar       { background: rgba(130,80,255,0.1); color: #8250ff; border: 1px solid rgba(130,80,255,0.2); }
  .place-tag--shop      { background: rgba(0,200,180,0.1);  color: #00c8b4; border: 1px solid rgba(0,200,180,0.2); }

  .empty {
    font-family: var(--font-sans);
    color: rgba(255,255,255,0.2);
    font-size: 0.9rem;
    padding: 2rem 0;
  }

</style>
