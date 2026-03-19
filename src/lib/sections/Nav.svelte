<script lang="ts">
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
  import { cities } from '../../data/itinerary'

  let scrolled = $state(false)
  let menuOpen = $state(false)
  let activeId = $state('')

  onMount(() => {
    gsap.registerPlugin(ScrollToPlugin)

    const sections = cities.map(c => document.getElementById(c.id)).filter(Boolean) as HTMLElement[]

    const onScroll = () => {
      scrolled = window.scrollY > 80

      // Active section: last one whose top is above 40% down the viewport
      const trigger = window.scrollY + window.innerHeight * 0.4
      let current = ''
      for (const s of sections) {
        if (s.offsetTop <= trigger) current = s.id
      }
      activeId = current
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  })

  function scrollTo(e: MouseEvent, id: string) {
    e.preventDefault()
    menuOpen = false
    const target = id === 'top' ? document.body : document.getElementById(id)
    if (!target) return
    gsap.to(window, {
      scrollTo: { y: target, offsetY: 0 },
      duration: 0.7,
      ease: 'power3.inOut',
    })
  }

  function closeMenu() { menuOpen = false }
</script>

<nav class:scrolled class:menu-open={menuOpen}>
  <a href="#top" class="nav-logo" onclick={(e) => scrollTo(e, 'top')}>JAPAN <span>'26</span></a>

  <ul class="nav-links">
    {#each cities as city}
      <li>
        <a
          href="#{city.id}"
          class:active={activeId === city.id}
          onclick={(e) => scrollTo(e, city.id)}
        >
          {city.name}{city.subtitle ? ' — ' + city.subtitle : ''}
        </a>
      </li>
    {/each}
  </ul>

  <button class="burger" onclick={() => menuOpen = !menuOpen} aria-label="Menu" aria-expanded={menuOpen}>
    <span></span>
    <span></span>
    <span></span>
  </button>
</nav>

{#if menuOpen}
  <div class="mobile-menu">
    <ul>
      {#each cities as city}
        <li>
          <a
            href="#{city.id}"
            class:active={activeId === city.id}
            onclick={(e) => scrollTo(e, city.id)}
          >
            <span class="mobile-num">{city.nameJa}</span>
            {city.name}{city.subtitle ? ' — ' + city.subtitle : ''}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <div class="menu-backdrop" onclick={closeMenu} onkeydown={(e) => e.key === 'Escape' && closeMenu()} role="button" tabindex="-1" aria-label="Close menu"></div>
{/if}

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

  .nav-logo span { color: #ff2d55; }

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
    color: rgba(255,255,255,0.35);
    transition: color 0.2s;
    position: relative;
    padding-bottom: 2px;
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 1px;
    background: #ff2d55;
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  .nav-links a:hover,
  .nav-links a.active {
    color: rgba(255,255,255,0.9);
  }

  .nav-links a.active::after {
    transform: scaleX(1);
  }

  .nav-links a:hover::after {
    transform: scaleX(1);
  }

  /* Burger */
  .burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .burger span {
    display: block;
    width: 22px;
    height: 1.5px;
    background: white;
    transition: transform 0.25s, opacity 0.25s;
  }

  .menu-open .burger span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .menu-open .burger span:nth-child(2) { opacity: 0; }
  .menu-open .burger span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  /* Mobile menu drawer */
  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(80vw, 320px);
    background: rgba(10,10,10,0.97);
    backdrop-filter: blur(16px);
    z-index: 99;
    padding: 5rem 2.5rem 2.5rem;
    display: flex;
    flex-direction: column;
    animation: slideIn 0.25s ease;
  }

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }

  .mobile-menu ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .mobile-menu li {
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .mobile-menu a {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.1rem 0;
    font-family: var(--font-condensed);
    font-size: 1.1rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    transition: color 0.2s;
  }

  .mobile-menu a:hover,
  .mobile-menu a.active {
    color: #ff2d55;
  }

  .mobile-num {
    font-family: var(--font-ja);
    font-size: 1rem;
    color: rgba(255,255,255,0.2);
    width: 1.5rem;
  }

  .menu-backdrop {
    position: fixed;
    inset: 0;
    z-index: 98;
    background: rgba(0,0,0,0.5);
    animation: fadeIn 0.25s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @media (max-width: 700px) {
    .nav-links { display: none; }
    .burger { display: flex; }
  }
</style>
