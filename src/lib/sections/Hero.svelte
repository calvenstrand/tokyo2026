<script lang="ts">
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import Countdown from '../components/Countdown.svelte'

  let hero: HTMLElement
  let kanji: HTMLElement

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger)
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.8 })
      .from('.hero-title', { y: 40, opacity: 0, duration: 1 }, '-=0.4')
      .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.hero-meta', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.hero-countdown', { y: 20, opacity: 0, duration: 0.8 }, '-=0.4')

    gsap.to(kanji, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  })
</script>

<section class="hero" bind:this={hero}>
  <div class="hero-kanji" bind:this={kanji}>日本</div>

  <div class="hero-content">
    <p class="hero-eyebrow">4 guys · 15 days · October 2026</p>

    <h1 class="hero-title">
      Japan<br />
      <em>awaits.</em>
    </h1>

    <p class="hero-subtitle">
      Tokyo → Kyoto → Osaka → Tokyo
    </p>

    <div class="hero-meta">
      <span>Oct 17</span>
      <span class="dash">—</span>
      <span>Oct 31</span>
    </div>

    <div class="hero-countdown">
      <p class="countdown-label">Departure in</p>
      <Countdown />
    </div>
  </div>

  <div class="hero-scroll">
    <span>scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    align-items: center;
    padding: 0 clamp(1.5rem, 6vw, 6rem);
    overflow: hidden;
  }

  .hero-kanji {
    position: absolute;
    right: -0.05em;
    top: 50%;
    transform: translateY(-50%);
    font-family: var(--font-serif);
    font-size: clamp(12rem, 30vw, 28rem);
    color: var(--color-ink);
    opacity: 0.04;
    line-height: 1;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.05em;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: var(--text-max);
  }

  .hero-eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--color-vermillion);
    margin-bottom: 2rem;
    font-family: var(--font-sans);
  }

  .hero-title {
    font-size: clamp(4rem, 12vw, 10rem);
    letter-spacing: -0.03em;
    line-height: 0.95;
    margin-bottom: 2rem;
    color: var(--color-ink);
  }

  .hero-title em {
    font-style: italic;
    color: var(--color-ink-light);
  }

  .hero-subtitle {
    font-family: var(--font-serif);
    font-size: clamp(1rem, 2vw, 1.4rem);
    color: var(--color-ink-light);
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
  }

  .hero-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--color-ink-faint);
    margin-bottom: 3rem;
  }

  .dash {
    color: var(--color-border);
  }

  .hero-countdown {
    border-top: 1px solid var(--color-border);
    padding-top: 1.5rem;
    display: inline-block;
  }

  .countdown-label {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-ink-faint);
    margin-bottom: 0.75rem;
  }

  .hero-scroll {
    position: absolute;
    bottom: 3rem;
    right: clamp(1.5rem, 6vw, 6rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-ink-faint);
  }

  .scroll-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, var(--color-border), transparent);
    animation: scrollLine 2s ease-in-out infinite;
  }

  @keyframes scrollLine {
    0% { transform: scaleY(0); transform-origin: top; }
    50% { transform: scaleY(1); transform-origin: top; }
    50.001% { transform: scaleY(1); transform-origin: bottom; }
    100% { transform: scaleY(0); transform-origin: bottom; }
  }
</style>
