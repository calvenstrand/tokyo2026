<script lang="ts">
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import Countdown from '../components/Countdown.svelte'

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.from('.hero-line', {
      y: '110%',
      duration: 1,
      ease: 'power4.out',
      stagger: 0.08,
    })

    gsap.from('.hero-meta', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.5,
    })

    gsap.from('.hero-countdown', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.7,
    })
  })
</script>

<section class="hero" id="top">
  <div class="hero-bg">
    <span class="hero-bg-ja" aria-hidden="true">日本</span>
  </div>

  <div class="hero-content">
    <div class="hero-tag">4 guys · oct 17 – 31 · 2026</div>

    <div class="hero-title">
      <div class="hero-clip"><span class="hero-line">JAPAN</span></div>
      <div class="hero-clip"><span class="hero-line">TRIP</span></div>
      <div class="hero-clip hero-line-small"><span class="hero-line">2026</span></div>
    </div>

    <div class="hero-bottom">
      <div class="hero-meta">
        <div class="hero-route">
          <span>Tokyo</span>
          <span class="arrow">→</span>
          <span>Kyoto</span>
          <span class="arrow">→</span>
          <span>Osaka</span>
          <span class="arrow">→</span>
          <span>Tokyo</span>
        </div>
      </div>
      <div class="hero-countdown">
        <p class="countdown-label">Departure in</p>
        <Countdown />
      </div>
    </div>
  </div>

  <div class="hero-scroll" aria-hidden="true">
    <span>scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100svh;
    background: #0f0f0f;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vw, 6rem);
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    pointer-events: none;
    overflow: hidden;
  }

  .hero-bg-ja {
    font-family: var(--font-ja);
    font-size: clamp(18rem, 40vw, 48rem);
    color: white;
    opacity: 0.04;
    line-height: 1;
    margin-right: -0.1em;
    user-select: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    max-width: var(--max-width);
    width: 100%;
  }

  .hero-tag {
    font-family: var(--font-condensed);
    font-size: clamp(0.75rem, 1.5vw, 1rem);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ff2d55;
    margin-bottom: 1.5rem;
  }

  .hero-title {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .hero-clip {
    overflow: hidden;
    line-height: 0.9;
  }

  .hero-line {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(6rem, 18vw, 22rem);
    color: white;
    letter-spacing: -0.01em;
    line-height: 0.9;
  }

  .hero-line-small .hero-line {
    font-size: clamp(3rem, 9vw, 11rem);
    color: #ff2d55;
  }

  .hero-bottom {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: clamp(2rem, 5vw, 4rem);
  }

  .hero-route {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: var(--font-condensed);
    font-size: clamp(1rem, 2vw, 1.4rem);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  .arrow {
    color: #ff2d55;
  }

  .hero-countdown {
    text-align: right;
  }

  .countdown-label {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 0.5rem;
  }

  /* Override countdown colors for dark bg */
  .hero-countdown :global(strong) { color: white; }
  .hero-countdown :global(small)  { color: rgba(255,255,255,0.3); }
  .hero-countdown :global(.sep)   { color: rgba(255,255,255,0.15); }

  .hero-scroll {
    position: absolute;
    bottom: 2.5rem;
    left: clamp(1.5rem, 5vw, 5rem);
    display: flex;
    align-items: center;
    gap: 1rem;
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
  }

  .scroll-line {
    width: 60px;
    height: 1px;
    background: linear-gradient(to right, rgba(255,255,255,0.3), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
</style>
