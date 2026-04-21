<script lang="ts">
  import { onMount } from 'svelte'
  import '../app.css'
  import Nav from '$lib/sections/Nav.svelte'

  let { children } = $props()

  let creditEl: HTMLDivElement
  let creditHeight = $state(0)

  onMount(() => {
    const ro = new ResizeObserver(() => {
      creditHeight = creditEl.offsetHeight
    })
    ro.observe(creditEl)
    return () => ro.disconnect()
  })
</script>

<div id="top" class="page-content">
  <Nav />
  {@render children()}
</div>
<div class="credit-spacer" style="height: {creditHeight}px"></div>
<div class="site-credit" bind:this={creditEl}>
  <p class="credit-name">Christoffer Älvenstrand</p>
  <p class="credit-tagline">I'm a creative developer based in Sweden. I build websites and digital experiences — and sometimes I take trips like this one.</p>
  <a class="credit-site" href="https://riverbeach.se/" target="_blank" rel="noopener noreferrer">riverbeach.se</a>
  <a class="credit-email" href="mailto:christoffer.alvenstrand@gmail.com">christoffer.alvenstrand@gmail.com</a>
</div>

<style>
  .site-credit {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    text-align: center;
    padding: clamp(1.5rem, 4vw, 3rem) 1rem;
    background: #0b0f1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .credit-site {
    font-family: var(--font-condensed);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #fff;
    text-decoration: none;
    padding: 0.5em 1.4em;
    border-radius: 0;
    background: linear-gradient(90deg, #4f7cff, #7a5cff);
    position: relative;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    margin-top: 0.5rem;
  }

  .credit-site:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(79, 124, 255, 0.25);
  }

  .credit-tagline {
    font-family: var(--font-sans);
    font-size: clamp(0.85rem, 1.8vw, 1.05rem);
    color: #a0a8b8;
    max-width: 480px;
    line-height: 1.5;
  }

  .credit-name {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    letter-spacing: 0.05em;
    color: #e6e8ef;
    line-height: 1;
  }

  .credit-email {
    font-family: var(--font-condensed);
    font-size: clamp(0.75rem, 1.5vw, 0.95rem);
    letter-spacing: 0.1em;
    color: #4f7cff;
    text-decoration: none;
    transition: color 0.2s ease, filter 0.2s ease;
  }

  .credit-email:hover {
    filter: brightness(1.3);
  }

  .page-content {
    position: relative;
    z-index: 1;
    background: #0f0f0f;
    box-shadow: 0 20px 80px 20px rgba(0,0,0,0.9);
  }
</style>
