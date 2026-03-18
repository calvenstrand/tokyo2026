<script lang="ts">
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { bookingChecklist } from '../../data/itinerary'
  import InkDivider from '../components/InkDivider.svelte'

  let section: HTMLElement

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(section.querySelectorAll('.reveal'), {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
      },
    })
  })
</script>

<section class="booking" bind:this={section}>
  <div class="booking-inner">
    <div class="booking-header reveal">
      <span class="eyebrow">Before you leave Sweden</span>
      <h2>Book these.<br /><em>Now.</em></h2>
    </div>

    <InkDivider />

    <ul class="checklist">
      {#each bookingChecklist as item, i}
        <li class="checklist-item reveal">
          <span class="item-num">{String(i + 1).padStart(2, '0')}</span>
          <div class="item-body">
            <strong>{item.item}</strong>
            <span>{item.note}</span>
          </div>
          <div class="item-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1"/>
            </svg>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style>
  .booking {
    padding: clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem);
    border-top: 1px solid var(--color-border);
    background: var(--color-ink);
    color: var(--color-bg);
  }

  .booking-inner {
    max-width: var(--max-width);
    margin: 0 auto;
  }

  .booking-header {
    margin-bottom: 3rem;
  }

  .eyebrow {
    display: block;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-vermillion);
    margin-bottom: 1rem;
  }

  h2 {
    font-size: clamp(2.5rem, 7vw, 5rem);
    letter-spacing: -0.02em;
    color: var(--color-bg);
    line-height: 1;
  }

  h2 em {
    font-style: italic;
    opacity: 0.4;
  }

  .checklist {
    list-style: none;
    margin-top: 2.5rem;
  }

  .checklist-item {
    display: grid;
    grid-template-columns: 3rem 1fr 2rem;
    gap: 1.5rem;
    align-items: center;
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    transition: border-color 0.2s;
  }

  .checklist-item:hover {
    border-bottom-color: rgba(255, 255, 255, 0.2);
  }

  .item-num {
    font-family: var(--font-serif);
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.25);
    letter-spacing: 0.1em;
  }

  .item-body {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .item-body strong {
    font-family: var(--font-serif);
    font-size: clamp(1rem, 2vw, 1.25rem);
    font-weight: 400;
    color: var(--color-bg);
  }

  .item-body span {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.5;
  }

  .item-icon {
    color: rgba(255, 255, 255, 0.15);
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  @media (max-width: 600px) {
    .checklist-item {
      grid-template-columns: 2rem 1fr;
    }

    .item-icon {
      display: none;
    }
  }
</style>
