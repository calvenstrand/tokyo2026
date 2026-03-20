<script lang="ts">
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'

  let section: HTMLElement

  const categories = [
    {
      icon: '¥',
      title: 'Money',
      items: [
        'Japan is still largely cash-based — carry ¥10,000–30,000 daily',
        '7-Eleven ATMs accept foreign cards (other ATMs often don\'t)',
        'Exchange rate: check before you go, airport rates are fine',
        'Cards accepted at bigger restaurants and department stores',
      ],
    },
    {
      icon: '🚄',
      title: 'IC Card',
      items: [
        'Add Suica to iPhone Wallet before departure — works from day one',
        'Tap in/out on every train, subway, and bus',
        'Also works at convenience stores, vending machines, some restaurants',
        'Top up at any station machine or inside the Wallet app',
      ],
    },
    {
      icon: '📶',
      title: 'Connectivity',
      items: [
        'Get an eSIM before you leave — Airalo or Ubigi are solid choices (Japan plan)',
        'Pocket WiFi alternative if you want to share one connection',
        'Free WiFi at most convenience stores, stations, and Starbucks',
        'Google Maps works excellently — download offline maps as backup',
      ],
    },
    {
      icon: '🚇',
      title: 'Getting Around',
      items: [
        'Use Suica for all local trains and subway — no need to buy tickets',
        'Shinkansen requires separate tickets — book via Smart EX app',
        'Taxis are expensive but clean and easy — no tipping',
        'Google Maps handles all transit routing including shinkansen',
      ],
    },
    {
      icon: '🙇',
      title: 'Etiquette',
      items: [
        'No tipping — it can be considered rude',
        'Quiet on trains — phone calls and loud conversations are a no-go',
        'Remove shoes when entering homes, traditional restaurants, and some ryokan',
        'Eat and drink while walking is generally frowned upon outside festivals',
      ],
    },
    {
      icon: '🌤',
      title: 'October Weather',
      items: [
        'Daytime 18–24 °C, evenings down to 14 °C — pack layers',
        'Typhoon season is winding down but check forecasts',
        'Light rain jacket is essential — don\'t rely on umbrellas alone',
        'Peak autumn colour starts late October in Kyoto — perfect timing',
      ],
    },
    {
      icon: '📱',
      title: 'Useful Apps',
      items: [
        'Google Translate — camera mode for menus is a lifesaver',
        'Tabelog — Japan\'s Yelp, with English now mostly available',
        'Smart EX — Shinkansen bookings on the go',
        'Line — everyone uses it in Japan, handy for reservations',
      ],
    },
    {
      icon: '🏪',
      title: 'Convenience Stores',
      items: [
        '7-Eleven, Lawson, FamilyMart — open 24/7, everywhere',
        'Food is genuinely good: onigiri, sandwiches, hot snacks, coffee',
        'ATMs, printing, phone charging cables, medicine — all in one place',
        'Don\'t skip the egg salad sandwich — it\'s a cultural experience',
      ],
    },
    {
      icon: 'kr',
      title: 'What It Costs',
      subtitle: 'Per person · 15 days · estimates in SEK',
      breakdown: [
        { label: 'Flights', note: 'ARN → HND return, economy', range: '9 000 – 13 000 kr' },
        { label: 'Hotel', note: '14 nights, 4-bed room split four ways', range: '14 000 – 16 000 kr' },
        { label: 'Food & drink', note: 'Cheap ramen & konbini most days, a few wagyu dinners', range: '15 000 – 22 000 kr' },
        { label: 'Shinkansen', note: '2 legs: Tokyo → Kyoto & Osaka → Tokyo (local train between Kyoto & Osaka)', range: '~1 800 kr' },
        { label: 'Activities', note: 'teamLab, USJ Express Pass, baseball, misc entry', range: '2 000 – 3 500 kr' },
        { label: 'Local transport', note: 'IC card, 15 days of metro & trains', range: '~800 kr' },
      ],
      total: '43 000 – 57 000 kr',
    },
  ]

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.from(section.querySelectorAll('.reveal'), {
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    })
  })
</script>

<section class="info" bind:this={section} id="practical-info">
  <div class="info-inner">
    <div class="info-header reveal">
      <span class="eyebrow">Good to know</span>
      <h2>Practical Info</h2>
      <p class="subtitle">Everything you need before landing at Haneda.</p>
    </div>

    <div class="grid">
      {#each categories as cat}
        <div class="card reveal" class:card-wide={cat.breakdown}>
          <div class="card-head">
            <span class="card-icon" aria-hidden="true">{cat.icon}</span>
            <div>
              <h3>{cat.title}</h3>
              {#if cat.subtitle}<p class="card-subtitle">{cat.subtitle}</p>{/if}
            </div>
          </div>
          {#if cat.breakdown}
            <div class="breakdown">
              {#each cat.breakdown as row}
                <div class="breakdown-row">
                  <div class="breakdown-label">
                    <span class="breakdown-name">{row.label}</span>
                    <span class="breakdown-note">{row.note}</span>
                  </div>
                  <span class="breakdown-range">{row.range}</span>
                </div>
              {/each}
              <div class="breakdown-total">
                <span>Total</span>
                <span>{cat.total}</span>
              </div>
            </div>
          {:else}
            <ul>
              {#each cat.items as item}
                <li>{item}</li>
              {/each}
            </ul>
          {/if}
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .info {
    padding: clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem);
    background: var(--color-bg);
    border-top: 1px solid var(--color-border);
  }

  .info-inner {
    max-width: var(--max-width);
    margin: 0 auto;
  }

  .info-header {
    margin-bottom: clamp(3rem, 6vw, 5rem);
  }

  .eyebrow {
    display: block;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-vermillion);
    margin-bottom: 0.75rem;
  }

  h2 {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 7rem);
    letter-spacing: 0.02em;
    color: var(--color-ink);
    line-height: 1;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-family: var(--font-serif);
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: var(--color-ink-faint);
    max-width: 42ch;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
    gap: 1px;
    background: var(--color-border);
    border: 1px solid var(--color-border);
  }

  .card {
    background: var(--color-bg);
    padding: 2rem 2rem 2.5rem;
  }

  .card-head {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .card-icon {
    font-size: 1.25rem;
    line-height: 1;
    flex-shrink: 0;
  }

  h3 {
    font-family: var(--font-condensed);
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-ink);
    font-weight: 600;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  li {
    font-family: var(--font-serif);
    font-size: 0.9rem;
    color: var(--color-ink-faint);
    line-height: 1.55;
    padding-left: 1rem;
    position: relative;
  }

  li::before {
    content: '—';
    position: absolute;
    left: 0;
    color: var(--color-vermillion);
    font-size: 0.75rem;
  }

  .card-wide {
    grid-column: 1 / -1;
  }

  .card-subtitle {
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--color-ink-faint);
    margin-top: 0.2rem;
  }

  .breakdown {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
  }

  .breakdown-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 2rem;
    padding: 0.9rem 0;
    border-bottom: 1px solid var(--color-border);
  }

  .breakdown-label {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .breakdown-name {
    font-family: var(--font-serif);
    font-size: 1rem;
    color: var(--color-ink);
    font-weight: 400;
  }

  .breakdown-note {
    font-size: 0.8rem;
    color: var(--color-ink-faint);
  }

  .breakdown-range {
    font-family: var(--font-condensed);
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    color: var(--color-ink);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .breakdown-total {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 1.1rem 0 0;
    margin-top: 0.25rem;
  }

  .breakdown-total span:first-child {
    font-family: var(--font-condensed);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-ink-faint);
  }

  .breakdown-total span:last-child {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    letter-spacing: 0.04em;
    color: var(--color-vermillion);
    line-height: 1;
  }

  @media (max-width: 600px) {
    .grid {
      grid-template-columns: 1fr;
    }

    .card {
      padding: 1.5rem 1.5rem 2rem;
    }

    .breakdown-row {
      flex-direction: column;
      gap: 0.25rem;
      align-items: flex-start;
    }

    .breakdown-range {
      color: var(--color-vermillion);
    }
  }
</style>
