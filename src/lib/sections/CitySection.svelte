<script lang="ts">
  import { onMount } from 'svelte'
  import { slide } from 'svelte/transition'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import type { City } from '../../data/itinerary'

  let { city, index }: { city: City; index: number } = $props()

  let section: HTMLElement
  const t = city.theme
  const isAkihabara = t.layout === 'akihabara'

  let openDays = $state(new Set<number>())
  function toggleDay(i: number) {
    const next = new Set(openDays)
    if (next.has(i)) next.delete(i); else next.add(i)
    openDays = next
  }

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Staggered reveal for itinerary content
    gsap.from(section.querySelectorAll('.reveal'), {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
    })

    // Hero parallax
    const heroImg = section.querySelector('.hero-img') as HTMLElement
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: section.querySelector('.city-hero'),
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    // Scanlines for Akihabara
    if (isAkihabara) {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => document.documentElement.classList.add('scanlines-active'),
        onLeave: () => document.documentElement.classList.remove('scanlines-active'),
        onEnterBack: () => document.documentElement.classList.add('scanlines-active'),
        onLeaveBack: () => document.documentElement.classList.remove('scanlines-active'),
      })
    }
  })
</script>

<section
  class="city-section"
  class:is-akihabara={isAkihabara}
  style:--bg={t.bg}
  style:--ink={t.ink}
  style:--ink-faint={t.inkFaint}
  style:--accent={t.accent}
  style:--border={t.border}
  bind:this={section}
  id={city.id}
  aria-labelledby="{city.id}-heading"
>

  <div class="city-hero">
    <img
      class="hero-img"
      src={t.image}
      alt=""
      loading={index === 0 ? 'eager' : 'lazy'}
      fetchpriority={index === 0 ? 'high' : 'auto'}
    />
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="hero-meta">
        <span class="hero-num">0{index + 1}</span>
        <span class="hero-dates">{city.dates}</span>
        <span class="hero-nights">{city.nights} nights</span>
      </div>
      <div class="hero-title">
        <div class="city-name-wrap">
          <h2 class="city-name" id="{city.id}-heading">{city.name.toUpperCase()}</h2>
          {#if city.subtitle}
            <span class="city-subtitle">{city.subtitle}</span>
          {/if}
        </div>
        <div class="city-ja" aria-hidden="true">{city.nameJa}</div>
      </div>
    </div>
  </div>

  <!-- Summary -->
  <div class="city-summary reveal">
    <p>{city.summary}</p>
  </div>

  <!-- Itinerary -->
  <div class="city-itinerary">
    <div class="lineup">
      {#each city.days as day, i}
        <div class="lineup-day reveal" class:has-images={day.images && day.images.length > 0} class:is-open={openDays.has(i)}>
          <button class="day-header" onclick={() => toggleDay(i)} aria-expanded={openDays.has(i)} aria-controls="{city.id}-day-{i}">
            <div class="day-header-top">
              <span class="day-label">Day {day.day}</span>
              <span class="day-date">{day.date}</span>
              {#if day.label}<span class="day-tag">{day.label}</span>{/if}
              <span class="day-toggle" aria-hidden="true">{openDays.has(i) ? '−' : '+'}</span>
            </div>
            {#if !openDays.has(i)}
              <div class="day-highlights">{day.activities.map(a => a.title).join(' · ')}</div>
            {/if}
          </button>

          {#if openDays.has(i)}
            <div class="day-body" id="{city.id}-day-{i}" transition:slide={{ duration: 220 }}>
              <div class="day-content">
                <ul class="activity-list">
                  {#each day.activities as act}
                    <li class="activity-item">
                      {#if act.time}
                        <span class="act-time">{act.time}</span>
                      {/if}
                      <h3 class="act-name">{act.title}</h3>
                      <p class="act-desc">{act.description}</p>
                    </li>
                  {/each}
                </ul>
              </div>

              {#if day.images && day.images.length > 0}
                <div class="day-images">
                  {#each day.images as img, j}
                    <div class="day-img-wrap" style:--img-i={j}>
                      <img
                        src={img.src}
                        srcset={img.srcset}
                        sizes="(min-width: 769px) 280px, clamp(120px, 38vw, 200px)"
                        alt=""
                        loading="lazy"
                      />
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

</section>

<style>
  .city-section {
    background: var(--bg);
    color: var(--ink);
    position: relative;
    overflow: hidden;
  }

  /* ── Hero ── */
  .city-hero {
    position: relative;
    height: 85svh;
    overflow: hidden;
  }

  .hero-img {
    position: absolute;
    inset: -25% 0 0 0;
    width: 100%;
    height: 125%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      color-mix(in srgb, var(--bg) 15%, transparent) 0%,
      transparent 30%,
      transparent 50%,
      color-mix(in srgb, var(--bg) 70%, transparent) 80%,
      var(--bg) 100%
    );
  }

  .hero-content {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: clamp(1.5rem, 4vw, 3.5rem) clamp(1.5rem, 5vw, 5rem);
  }

  .hero-meta {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
    font-family: var(--font-condensed);
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }

  .hero-num {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: var(--accent);
    letter-spacing: 0.05em;
  }

  .hero-dates { flex: 1; }

  .hero-title {
    display: flex;
    align-items: flex-end;
    gap: 1.5rem;
  }

  .city-name-wrap {
    display: flex;
    flex-direction: column;
  }

  .city-name {
    font-family: var(--font-display);
    font-size: clamp(5rem, 14vw, 16rem);
    line-height: 0.85;
    letter-spacing: -0.01em;
    color: var(--ink);
  }

  .is-akihabara .city-name {
    font-family: var(--font-mono);
    font-size: clamp(3rem, 8vw, 9rem);
    text-shadow: 0 0 40px var(--accent), 0 0 80px color-mix(in srgb, var(--accent) 30%, transparent);
    letter-spacing: 0.05em;
    color: var(--accent);
  }

  .city-subtitle {
    font-family: var(--font-condensed);
    font-size: clamp(0.9rem, 2vw, 1.3rem);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-top: 0.4rem;
  }

  .is-akihabara .city-subtitle {
    color: #ff00cc;
    text-shadow: 0 0 12px #ff00cc;
  }

  .city-ja {
    font-family: var(--font-ja);
    font-size: clamp(3rem, 7vw, 8rem);
    color: var(--ink);
    opacity: 0.15;
    line-height: 1;
    margin-left: auto;
    align-self: flex-end;
    padding-bottom: 0.2em;
  }


  /* ── Summary ── */
  .city-summary {
    padding: clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 5vw, 5rem);
    border-bottom: 1px solid var(--border);
    max-width: 720px;
  }

  .city-summary p {
    font-family: var(--font-sans);
    font-size: clamp(0.95rem, 1.3vw, 1.1rem);
    line-height: 1.75;
    color: var(--ink-faint);
  }

  /* ── Itinerary ── */
  .city-itinerary {
    padding: clamp(2rem, 4vw, 4rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 6vw, 6rem);
  }

  .lineup {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .lineup-day {
    border-top: 1px solid var(--border);
  }

  .day-header {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 1.25rem 0;
    width: 100%;
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    text-align: left;
    transition: opacity 0.15s ease;
  }

  .day-header:hover { opacity: 0.75; }

  .day-header-top {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .day-toggle {
    margin-left: auto;
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: var(--accent);
    line-height: 1;
    flex-shrink: 0;
  }

  .day-highlights {
    font-family: var(--font-sans);
    font-size: 0.8rem;
    color: var(--ink-faint);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    min-width: 0;
  }

  .day-body {
    padding-bottom: 2rem;
    overflow: hidden;
  }

  /* Desktop: days with images → two-column layout */
  @media (min-width: 769px) {
    .lineup-day.has-images .day-body {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: clamp(2rem, 4vw, 4rem);
      align-items: start;
    }
  }

  .day-label {
    font-family: var(--font-display);
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    color: var(--accent);
  }

  .is-akihabara .day-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    text-shadow: 0 0 8px var(--accent);
  }

  .day-date {
    font-family: var(--font-condensed);
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-faint);
    flex: 1;
  }

  .day-tag {
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.2rem 0.6rem;
    border: 1px solid var(--border);
    color: var(--ink-faint);
    border-radius: 2px;
  }

  /* Activity list */
  .activity-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 0;
  }

  .activity-item {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.1rem;
  }

  .act-time {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    opacity: 0.85;
    border-left: 2px solid var(--accent);
    padding-left: 0.5rem;
  }

  .is-akihabara .act-time {
    font-family: var(--font-mono);
    font-size: 0.65rem;
  }

  .act-name {
    font-family: var(--font-condensed);
    font-weight: 700;
    font-size: clamp(1.1rem, 2.5vw, 1.6rem);
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: var(--ink);
    line-height: 1.1;
  }

  .is-akihabara .act-name {
    font-family: var(--font-mono);
    font-size: clamp(0.85rem, 1.8vw, 1.1rem);
    color: var(--ink);
  }

  .act-desc {
    font-family: var(--font-sans);
    font-size: 16px;
    color: var(--ink-faint);
    line-height: 1.5;
    max-width: 56ch;
    margin-top: 0.15rem;
  }

  /* Day photos — mobile: horizontal scroll */
  .day-images {
    display: flex;
    gap: 0.6rem;
    margin-top: 1.25rem;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .day-images::-webkit-scrollbar { display: none; }

  .day-img-wrap {
    flex: 0 0 auto;
    width: clamp(140px, 22vw, 220px);
    aspect-ratio: 3 / 4;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    opacity: 0;
    transform: translateY(16px);
    animation: img-in 0.5s ease forwards;
    animation-delay: calc(var(--img-i) * 0.08s + 0.2s);
  }

  @keyframes img-in {
    to { opacity: 1; transform: translateY(0); }
  }

  .day-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.4s ease;
  }

  .day-img-wrap:hover img {
    transform: scale(1.04);
  }

  /* Desktop: vertical stack in the right column */
  @media (min-width: 769px) {
    .has-images .day-body .day-images {
      flex-direction: column;
      overflow-x: visible;
      margin-top: 0;
      gap: 0.5rem;
      position: sticky;
      top: 2rem;
    }

    .has-images .day-body .day-img-wrap {
      width: 100%;
      aspect-ratio: 3 / 4;
    }

    .has-images .day-body .day-images:has(.day-img-wrap:only-child) .day-img-wrap {
      aspect-ratio: 4 / 3;
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .city-hero {
      height: 70svh;
    }

    .city-ja {
      font-size: clamp(2.5rem, 12vw, 4rem);
      opacity: 0.08;
      align-self: center;
    }

    .day-img-wrap {
      width: clamp(120px, 38vw, 200px);
    }
  }
</style>
