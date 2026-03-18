<script lang="ts">
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import type { City } from '../../data/itinerary'

  let { city, index }: { city: City; index: number } = $props()

  let section: HTMLElement
  const t = city.theme
  const isAkihabara = t.layout === 'akihabara'

  onMount(() => {
    // Staggered reveal
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
  class="poster"
  class:is-akihabara={isAkihabara}
  style:--bg={t.bg}
  style:--ink={t.ink}
  style:--ink-faint={t.inkFaint}
  style:--accent={t.accent}
  style:--border={t.border}
  bind:this={section}
  id={city.id}
>

  <!-- Top bar -->
  <div class="poster-topbar reveal">
    <span class="poster-num">0{index + 1}</span>
    <span class="poster-dates">{city.dates}</span>
    <span class="poster-nights">{city.nights} nights</span>
  </div>

  <!-- Main poster layout: left content, right image -->
  <div class="poster-body">

    <div class="poster-left">
      <!-- City name -->
      <div class="poster-heading reveal">
        <div class="city-name-wrap">
          <h2 class="city-name">{city.name.toUpperCase()}</h2>
          {#if city.subtitle}
            <span class="city-subtitle">{city.subtitle}</span>
          {/if}
        </div>
        <div class="city-ja">{city.nameJa}</div>
      </div>

      <!-- Lineup: all days & activities, no accordion -->
      <div class="lineup">
        {#each city.days as day}
          <div class="lineup-day reveal">
            <div class="day-header">
              <span class="day-label">Day {day.day}</span>
              <span class="day-date">{day.date}</span>
              {#if day.label}<span class="day-tag">{day.label}</span>{/if}
            </div>
            <ul class="activity-list">
              {#each day.activities as act, i}
                <li class="activity-item" style:--i={i}>
                  <span class="act-name">{act.title}</span>
                  <p class="act-desc">{act.description}</p>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </div>

    <!-- Photo -->
    {#if t.image}
      <div class="poster-image reveal">
        <img src={t.image} alt={city.name} />
        <div class="image-overlay"></div>
      </div>
    {/if}

  </div>

</section>

<style>
  .poster {
    background: var(--bg);
    color: var(--ink);
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    padding: clamp(1.5rem, 4vw, 3.5rem) clamp(1.5rem, 5vw, 5rem);
    position: relative;
    overflow: hidden;
  }

  /* Top bar */
  .poster-topbar {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
    font-family: var(--font-condensed);
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-faint);
  }

  .poster-num {
    font-family: var(--font-display);
    font-size: 1.2rem;
    color: var(--accent);
    letter-spacing: 0.05em;
  }

  .poster-dates { flex: 1; }

  /* Body */
  .poster-body {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 38%;
    gap: clamp(2rem, 4vw, 4rem);
    align-items: start;
  }

  /* Heading */
  .poster-heading {
    display: flex;
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
    position: relative;
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
    opacity: 0.12;
    line-height: 1;
    margin-left: auto;
    align-self: flex-start;
  }

  /* Lineup */
  .lineup {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .lineup-day {
    border-top: 1px solid var(--border);
    padding: 1rem 0 1.25rem;
  }

  .day-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
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

  /* Activity list — gig poster style */
  .activity-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .activity-item {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.1rem;
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
    font-size: 0.8rem;
    color: var(--ink-faint);
    line-height: 1.5;
    max-width: 52ch;
  }

  /* Image */
  .poster-image {
    position: sticky;
    top: 2rem;
    border-radius: 4px;
    overflow: hidden;
    aspect-ratio: 3 / 4;
    max-height: 85svh;
  }

  .poster-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  .image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 50%,
      color-mix(in srgb, var(--bg) 60%, transparent) 100%
    );
  }

  /* Responsive */
  @media (max-width: 768px) {
    .poster-body {
      grid-template-columns: 1fr;
    }
    .poster-image {
      position: relative;
      top: 0;
      aspect-ratio: 16 / 9;
      max-height: 50vw;
      order: -1;
    }
    .city-ja { display: none; }
  }
</style>
