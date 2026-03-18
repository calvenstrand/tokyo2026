<script lang="ts">
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import type { City } from '../../data/itinerary'
  import InkDivider from '../components/InkDivider.svelte'

  let { city, index }: { city: City; index: number } = $props()

  let section: HTMLElement
  let expandedDay = $state<number | null>(null)

  const t = city.theme

  const heroBg = t.heroImage
    ? `url('${t.heroImage}') center/cover no-repeat`
    : t.heroGradient

  function toggle(day: number) {
    expandedDay = expandedDay === day ? null : day
  }

  onMount(() => {
    // Reveal content rows
    gsap.from(section.querySelectorAll('.reveal'), {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
    })

    // Scanlines: activate on enter for Akihabara
    if (t.layout === 'akihabara') {
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
  class:layout-kyoto={t.layout === 'kyoto'}
  class:layout-osaka={t.layout === 'osaka'}
  class:layout-akihabara={t.layout === 'akihabara'}
  style:--th-bg={t.bg}
  style:--th-surface={t.surface}
  style:--th-ink={t.ink}
  style:--th-ink-faint={t.inkFaint}
  style:--th-accent={t.accent}
  style:--th-accent-alt={t.accentAlt}
  style:--th-border={t.border}
  style:--th-font={t.font}
  bind:this={section}
  id={city.id}
>

  <!-- Hero band -->
  <div class="city-hero" style:background={heroBg}>
    <div class="city-hero-overlay"></div>
    <div class="city-hero-kanji">{city.nameJa}</div>
    <div class="city-hero-title reveal">
      <span class="hero-eyebrow">{city.dates} · {city.nights} nights</span>
      <h2 class="hero-name">
        {city.name}{#if city.subtitle}<em> — {city.subtitle}</em>{/if}
      </h2>
    </div>
    <div class="city-hero-index">{String(index + 1).padStart(2, '0')}</div>
  </div>

  <!-- Content -->
  <div class="city-inner">
    <InkDivider />

    <div class="days-list">
      {#each city.days as day}
        <div class="day-row reveal">
          <button
            class="day-header"
            class:is-expanded={expandedDay === day.day}
            onclick={() => toggle(day.day)}
            aria-expanded={expandedDay === day.day}
          >
            <span class="day-num">Day {day.day}</span>
            <span class="day-date">{day.date}</span>
            {#if day.label}
              <span class="day-label">{day.label}</span>
            {/if}
            <span class="day-toggle">{expandedDay === day.day ? '−' : '+'}</span>
          </button>

          {#if expandedDay === day.day}
            <div class="day-activities">
              {#each day.activities as act}
                <div class="activity">
                  {#if act.time}
                    <span class="act-time">{act.time}</span>
                  {/if}
                  <div class="act-body">
                    <h4 class="act-title">{act.title}</h4>
                    <p class="act-desc">{act.description}</p>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>
  </div>

</section>

<style>
  /* ── Base ── */
  .city-section {
    background: var(--th-bg);
    color: var(--th-ink);
    font-family: var(--th-font);
  }

  /* ── Hero band ── */
  .city-hero {
    position: relative;
    height: clamp(50vh, 65vh, 760px);
    overflow: hidden;
  }

  .layout-kyoto .city-hero { height: clamp(60vh, 75vh, 900px); }
  .layout-akihabara .city-hero { height: clamp(55vh, 70vh, 840px); }

  .city-hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.2) 0%,
      rgba(0,0,0,0.1) 30%,
      color-mix(in srgb, var(--th-bg) 80%, transparent) 75%,
      var(--th-bg) 100%
    );
  }

  /* Tokyo I: add neon pink bottom glow */
  .city-section:not(.layout-kyoto):not(.layout-osaka):not(.layout-akihabara) .city-hero-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.35) 0%,
      rgba(0,0,0,0.1) 35%,
      color-mix(in srgb, var(--th-bg) 70%, transparent) 70%,
      var(--th-bg) 100%
    );
  }

  /* Osaka: warm vignette */
  .layout-osaka .city-hero-overlay {
    background:
      radial-gradient(ellipse at center, transparent 30%, color-mix(in srgb, var(--th-bg) 60%, transparent) 100%),
      linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, var(--th-bg) 100%);
  }

  /* Akihabara: harder cut, more drama */
  .layout-akihabara .city-hero-overlay {
    background: linear-gradient(
      to bottom,
      rgba(5,5,15,0.5) 0%,
      rgba(5,5,15,0.15) 25%,
      color-mix(in srgb, var(--th-bg) 85%, transparent) 70%,
      var(--th-bg) 100%
    );
  }

  .city-hero-kanji {
    position: absolute;
    right: -0.02em;
    bottom: -0.05em;
    font-family: 'Noto Serif JP', serif;
    font-size: clamp(10rem, 22vw, 22rem);
    color: white;
    opacity: 0.06;
    line-height: 1;
    pointer-events: none;
    user-select: none;
    letter-spacing: -0.05em;
  }

  .layout-akihabara .city-hero-kanji {
    opacity: 0.04;
    color: var(--th-accent);
    text-shadow: 0 0 80px var(--th-accent);
  }

  .city-hero-title {
    position: absolute;
    bottom: clamp(2rem, 5vw, 4rem);
    left: clamp(1.5rem, 6vw, 6rem);
  }

  .hero-eyebrow {
    display: block;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--th-accent);
    margin-bottom: 0.75rem;
    font-family: var(--th-font);
  }

  .hero-name {
    font-family: 'Noto Serif JP', serif;
    font-size: clamp(3rem, 9vw, 8rem);
    letter-spacing: -0.02em;
    line-height: 0.95;
    color: white;
    text-shadow: 0 2px 40px rgba(0,0,0,0.5);
  }

  .layout-kyoto .hero-name { color: var(--th-ink); text-shadow: none; }

  .layout-akihabara .hero-name {
    font-family: var(--th-font);
    letter-spacing: 0.02em;
    text-shadow:
      0 0 30px var(--th-accent),
      0 0 80px color-mix(in srgb, var(--th-accent) 40%, transparent),
      0 2px 40px rgba(0,0,0,0.8);
  }

  .hero-name em {
    font-style: italic;
    opacity: 0.6;
    font-size: 0.65em;
  }

  .city-hero-index {
    position: absolute;
    top: clamp(1.5rem, 4vw, 3rem);
    right: clamp(1.5rem, 6vw, 6rem);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.3);
    font-family: var(--th-font);
  }

  /* ── Content ── */
  .city-inner {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 clamp(1.5rem, 6vw, 6rem) clamp(4rem, 10vw, 8rem);
    color: var(--th-ink);
  }

  /* InkDivider color via currentColor */
  .city-section :global(.divider) { color: var(--th-ink); }

  .days-list { margin-top: 2.5rem; }

  .day-row { border-bottom: 1px solid var(--th-border); }

  .day-header {
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.25rem 0;
    color: var(--th-ink);
    text-align: left;
    font-family: var(--th-font);
    transition: color 0.2s;
  }

  .day-header:hover,
  .day-header.is-expanded {
    color: var(--th-accent);
  }

  .layout-akihabara .day-header.is-expanded {
    color: var(--th-accent-alt);
    text-shadow: 0 0 12px var(--th-accent-alt);
  }

  .day-num {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--th-ink-faint);
    min-width: 3.5rem;
    flex-shrink: 0;
  }

  .day-date {
    font-family: var(--th-font);
    font-size: clamp(1rem, 2vw, 1.2rem);
    flex: 1;
  }

  .layout-kyoto .day-date { font-family: 'Noto Serif JP', serif; }

  .day-label {
    font-size: 0.65rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--th-accent);
    padding: 0.2rem 0.6rem;
    border: 1px solid currentColor;
    border-radius: 2px;
    flex-shrink: 0;
  }

  .layout-akihabara .day-label {
    box-shadow: 0 0 8px var(--th-accent), inset 0 0 8px color-mix(in srgb, var(--th-accent) 10%, transparent);
  }

  .day-toggle {
    font-size: 1.2rem;
    color: var(--th-border);
    font-weight: 300;
    transition: color 0.2s;
    width: 1.5rem;
    text-align: center;
    flex-shrink: 0;
    font-family: var(--font-sans);
  }

  .day-header:hover .day-toggle,
  .day-header.is-expanded .day-toggle {
    color: var(--th-accent);
  }

  /* Activities */
  .day-activities {
    padding: 0 0 2rem 5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .activity {
    display: grid;
    grid-template-columns: 5rem 1fr;
    gap: 1rem;
  }

  .act-time {
    font-size: 0.65rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--th-ink-faint);
    padding-top: 0.2rem;
    flex-shrink: 0;
  }

  .act-title {
    font-family: 'Noto Serif JP', serif;
    font-size: 1.1rem;
    font-weight: 400;
    color: var(--th-ink);
    margin-bottom: 0.4rem;
  }

  .layout-akihabara .act-title {
    font-family: var(--th-font);
    color: var(--th-accent);
  }

  .act-desc {
    font-size: 0.9rem;
    color: var(--th-ink-faint);
    line-height: 1.7;
    max-width: 55ch;
    font-family: var(--font-sans);
  }

  .layout-akihabara .act-desc {
    font-family: var(--th-font);
    font-size: 0.8rem;
    color: color-mix(in srgb, var(--th-ink) 60%, transparent);
  }

  /* Responsive */
  @media (max-width: 600px) {
    .day-activities { padding-left: 0; }
    .activity { grid-template-columns: 1fr; gap: 0.25rem; }
  }
</style>
