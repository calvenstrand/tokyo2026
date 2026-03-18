<script lang="ts">
  import { onMount } from 'svelte'
  import { cities } from '../../data/itinerary'

  let scrolled = $state(false)

  onMount(() => {
    const onScroll = () => { scrolled = window.scrollY > 80 }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  })
</script>

<nav class:scrolled>
  <a href="#top" class="nav-logo">JAPAN <span>'26</span></a>
  <ul class="nav-links">
    {#each cities as city}
      <li><a href="#{city.id}">{city.name}{city.subtitle ? ' — ' + city.subtitle : ''}</a></li>
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
    padding: 1.25rem clamp(1.5rem, 5vw, 5rem);
    transition: background 0.3s, padding 0.3s;
  }

  nav.scrolled {
    background: rgba(15,15,15,0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .nav-logo {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: white;
    letter-spacing: 0.08em;
  }

  .nav-logo span {
    color: #ff2d55;
  }

  .nav-links {
    list-style: none;
    display: flex;
    gap: 2rem;
  }

  .nav-links a {
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    transition: color 0.2s;
  }

  .nav-links a:hover { color: #ff2d55; }

  @media (max-width: 700px) {
    .nav-links { display: none; }
  }
</style>
