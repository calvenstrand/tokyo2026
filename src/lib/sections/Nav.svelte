<script lang="ts">
  import { onMount } from 'svelte'
  import { cities } from '../../data/itinerary'

  let scrolled = $state(false)

  onMount(() => {
    const onScroll = () => {
      scrolled = window.scrollY > 80
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  })
</script>

<nav class:scrolled>
  <a href="#top" class="nav-logo">日本 <span>2026</span></a>
  <ul class="nav-links">
    {#each cities as city}
      <li>
        <a href="#{city.id}">{city.name}{city.subtitle ? ' ' + city.subtitle : ''}</a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem clamp(1.5rem, 6vw, 6rem);
    transition: background 0.3s, padding 0.3s, border-color 0.3s;
    border-bottom: 1px solid transparent;
  }

  nav.scrolled {
    background: rgba(245, 242, 237, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom-color: var(--color-border);
  }

  .nav-logo {
    font-family: var(--font-serif);
    font-size: 1rem;
    color: var(--color-ink);
    letter-spacing: 0.05em;
  }

  .nav-logo span {
    color: var(--color-ink-faint);
    font-size: 0.8em;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 2rem;
  }

  .nav-links a {
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-ink-light);
    transition: color 0.2s;
  }

  .nav-links a:hover {
    color: var(--color-vermillion);
  }

  @media (max-width: 700px) {
    .nav-links {
      display: none;
    }
  }
</style>
