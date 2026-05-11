<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { base } from '$app/paths'
  import '@fontsource/space-mono/400.css'
  import '@fontsource/space-mono/700.css'
  import '@fontsource/noto-serif-jp/700.css'
  import '@fontsource/noto-serif-jp/900.css'

  type Poster = {
    eyebrow: string
    name: string
    subtitle: string
    nameJa: string
    dates: string
    nights: number
    bg: string
    ink: string
    accent: string
    keywords: string[]
  }

  const posters: Poster[] = [
    {
      eyebrow: 'STOP 01',
      name: 'TOKYO',
      subtitle: 'SHINJUKU',
      nameJa: '東京',
      dates: 'OCT 30 — NOV 03',
      nights: 4,
      bg: '#c8362a',
      ink: '#fbf4dc',
      accent: '#f5c563',
      keywords: [
        'Omoide Yokocho — yakitori, first night',
        'Shibuya Sky — city lights from 50 floors',
        'Akihabara + Nakano Broadway',
        'teamLab Borderless',
        'Ginza Lion — 1934 beer hall',
        'Golden Gai crawls',
      ],
    },
    {
      eyebrow: 'STOP 02',
      name: 'KYOTO',
      subtitle: '',
      nameJa: '京都',
      dates: 'NOV 03 — NOV 06',
      nights: 3,
      bg: '#1f3a2e',
      ink: '#f0ede0',
      accent: '#d97c4f',
      keywords: [
        'Nishiki Market on arrival',
        'Kiyomizu-dera — maples turning',
        'Fushimi Inari at 6am',
        'Nintendo Museum — the lottery',
        'Knife sharpening class',
        'Yakitori omakase',
        'Funaoka Onsen — 1923 bathhouse',
      ],
    },
    {
      eyebrow: 'STOP 03',
      name: 'OSAKA',
      subtitle: '',
      nameJa: '大阪',
      dates: 'NOV 06 — NOV 08',
      nights: 2,
      bg: '#e8b526',
      ink: '#1a1a1a',
      accent: '#c8362a',
      keywords: [
        'Dotonbori at night',
        'Wagyu — top tier',
        'Sakai knives, cut to fit',
        'Shinsekai retro Osaka',
        'Osaka Castle',
      ],
    },
    {
      eyebrow: 'STOP 04',
      name: 'FUKUOKA',
      subtitle: '',
      nameJa: '福岡',
      dates: 'NOV 08 — NOV 10',
      nights: 2,
      bg: '#1a3a5c',
      ink: '#fbf4dc',
      accent: '#e8a23a',
      keywords: [
        'Sumo tournament — Day 10',
        'Tonkotsu — the origin',
        'Yatai street stalls on the river',
        'Hakata calm',
      ],
    },
    {
      eyebrow: 'STOP 05',
      name: 'TOKYO',
      subtitle: 'UENO',
      nameJa: '東京',
      dates: 'NOV 10 — NOV 14',
      nights: 4,
      bg: '#4a1f3a',
      ink: '#fbf4dc',
      accent: '#e8a23a',
      keywords: [
        'Kappabashi — buy the knife',
        'Tsukiji breakfast',
        'Akihabara full day',
        'Ueno parks + museums',
        'Fly home Nov 15 · 00:30',
      ],
    },
  ]

  const TOTAL = 9
  let current = $state(0)

  function next() { current = Math.min(current + 1, TOTAL - 1) }
  function prev() { current = Math.max(current - 1, 0) }
  function gotoSlide(i: number) { current = Math.max(0, Math.min(i, TOTAL - 1)) }

  function exit() { goto(`${base}/`) }

  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next() }
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev() }
    else if (e.key === 'Home') { e.preventDefault(); gotoSlide(0) }
    else if (e.key === 'End') { e.preventDefault(); gotoSlide(TOTAL - 1) }
    else if (e.key === 'Escape') { e.preventDefault(); exit() }
  }

  onMount(() => {
    document.documentElement.style.background = '#0a0a0a'
  })
</script>

<svelte:head>
  <title>Japan '26 — Presentation</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<svelte:window onkeydown={onKey} />

<div class="deck" role="region" aria-label="Trip presentation">
  <!-- Slide 1: WELCOME -->
  <section class="slide welcome" class:active={current === 0} aria-hidden={current !== 0}>
    <div class="paper">
      <div class="corner-mark top-left">PRIVATE · NO. 0001</div>
      <div class="corner-mark top-right">PRINTED · 2026</div>

      <div class="welcome-stamp">日本 二〇二六</div>

      <h1 class="welcome-title">
        <span class="welcome-line-1">JAPAN</span>
        <span class="welcome-line-2"><span class="apos">'</span>26</span>
      </h1>

      <div class="welcome-rule"></div>

      <p class="welcome-line">OCT 30 — NOV 14 · 16 DAYS · 5 CITIES</p>
      <p class="welcome-pull">Nothing here is locked.<br/>Let's talk through it.</p>

      <div class="corner-mark bottom-left">FOR THE BOYS</div>
      <div class="corner-mark bottom-right">PRESENTED BY CHRIS</div>
    </div>
  </section>

  <!-- Slide 2: OVERVIEW -->
  <section class="slide overview" class:active={current === 1} aria-hidden={current !== 1}>
    <div class="paper">
      <div class="corner-mark top-left">ROUTE</div>
      <div class="corner-mark top-right">FIVE STOPS · FIFTEEN NIGHTS</div>

      <ul class="route">
        <li><span class="rt-num">01</span><span class="rt-name">TOKYO</span><span class="rt-sub">Shinjuku</span><span class="rt-nights">4 nights</span><span class="rt-dates">Oct 30 — Nov 3</span></li>
        <li><span class="rt-num">02</span><span class="rt-name">KYOTO</span><span class="rt-sub"></span><span class="rt-nights">3 nights</span><span class="rt-dates">Nov 3 — 6</span></li>
        <li><span class="rt-num">03</span><span class="rt-name">OSAKA</span><span class="rt-sub"></span><span class="rt-nights">2 nights</span><span class="rt-dates">Nov 6 — 8</span></li>
        <li><span class="rt-num">04</span><span class="rt-name">FUKUOKA</span><span class="rt-sub"></span><span class="rt-nights">2 nights</span><span class="rt-dates">Nov 8 — 10</span></li>
        <li><span class="rt-num">05</span><span class="rt-name">TOKYO</span><span class="rt-sub">Ueno</span><span class="rt-nights">4 nights</span><span class="rt-dates">Nov 10 — 14</span></li>
      </ul>

      <div class="corner-mark bottom-right">FLY HOME · NOV 15 · 00:30</div>
    </div>
  </section>

  <!-- Slides 3-7: CITY POSTERS -->
  {#each posters as p, i}
    <section
      class="slide poster"
      class:active={current === i + 2}
      aria-hidden={current !== i + 2}
      style="--bg: {p.bg}; --ink: {p.ink}; --accent: {p.accent};"
    >
      <div class="poster-frame">
        <div class="corner-mark top-left">{p.eyebrow}</div>
        <div class="corner-mark top-right">{p.nights} NIGHTS · {p.dates}</div>

        <div class="kanji-watermark" aria-hidden="true">{p.nameJa}</div>

        <div class="poster-headline">
          <h2 class="poster-name">{p.name}</h2>
          {#if p.subtitle}
            <p class="poster-sub">{p.subtitle}</p>
          {/if}
        </div>

        <ul class="keywords">
          {#each p.keywords as kw}
            <li>{kw}</li>
          {/each}
        </ul>

        <div class="corner-mark bottom-left">JAPAN '26</div>
        <div class="corner-mark bottom-right">No. {String(i + 1).padStart(2, '0')} / 05</div>
      </div>
    </section>
  {/each}

  <!-- Slide 8: BOOKINGS -->
  <section class="slide bookings" class:active={current === 7} aria-hidden={current !== 7}>
    <div class="paper">
      <div class="corner-mark top-left">RESERVATIONS</div>
      <div class="corner-mark top-right">TWO WE LOCK IN</div>

      <h2 class="bookings-title">Book These<br/><span>or it falls apart</span></h2>

      <div class="tickets">
        <div class="ticket">
          <div class="ticket-no">N° 01</div>
          <div class="ticket-name">NINTENDO MUSEUM</div>
          <div class="ticket-meta">Kyoto · Day 6 · Nov 5</div>
          <div class="ticket-action">LOTTERY — apply the moment it opens</div>
          <div class="ticket-stamp">PRIORITY</div>
        </div>
        <div class="ticket">
          <div class="ticket-no">N° 02</div>
          <div class="ticket-name">SUMO · KYUSHU BASHO</div>
          <div class="ticket-meta">Fukuoka · Day 10 · Nov 8</div>
          <div class="ticket-action">SALE OPENS SEPT 19 — buy at 10:00</div>
          <div class="ticket-stamp">PRIORITY</div>
        </div>
      </div>

      <p class="bookings-foot">Everything else can wait. These can't.</p>
    </div>
  </section>

  <!-- Slide 9: OPEN FLOOR -->
  <section class="slide open-floor" class:active={current === 8} aria-hidden={current !== 8}>
    <div class="paper">
      <div class="corner-mark top-left">OPEN FLOOR</div>
      <div class="corner-mark top-right">END OF PRESENTATION</div>

      <div class="end-stamp">議論</div>

      <h2 class="end-title">So?</h2>
      <p class="end-pull">Anything missing.<br/>Anything you'd swap.<br/>Anything off.</p>
      <p class="end-foot">Flights are locked.<br/>Everything else is on the table.</p>
    </div>
  </section>

  <!-- Click areas for advance/back -->
  <button class="click-area click-prev" onclick={prev} aria-label="Previous slide" tabindex="-1"></button>
  <button class="click-area click-next" onclick={next} aria-label="Next slide" tabindex="-1"></button>

  <!-- HUD -->
  <div class="hud">
    <a class="hud-exit" href="{base}/" onclick={(e) => { e.preventDefault(); exit() }}>ESC · EXIT</a>
    <div class="hud-counter">
      <span class="num">{String(current + 1).padStart(2, '0')}</span>
      <span class="slash">/</span>
      <span class="num">{String(TOTAL).padStart(2, '0')}</span>
    </div>
  </div>

  <!-- Progress dots -->
  <nav class="dots" aria-label="Slide navigation">
    {#each Array(TOTAL) as _, i}
      <button
        class="dot"
        class:active={i === current}
        onclick={() => gotoSlide(i)}
        aria-label="Go to slide {i + 1}"
      ></button>
    {/each}
  </nav>
</div>

<style>
  :global(html, body) {
    overflow: hidden;
    background: #0a0a0a;
  }

  .deck {
    position: fixed;
    inset: 0;
    overflow: hidden;
    background: #0a0a0a;
    font-family: 'DM Sans', system-ui, sans-serif;
    color: #0f0f0f;
    user-select: none;
  }

  .slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    visibility: hidden;
    transition: opacity 450ms ease, visibility 0s linear 450ms;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
  }
  .slide.active {
    opacity: 1;
    visibility: visible;
    transition: opacity 450ms ease, visibility 0s linear 0s;
  }

  /* Paper background — cream poster */
  .paper {
    position: relative;
    flex: 1;
    background: #f3eedf;
    background-image:
      radial-gradient(rgba(40, 30, 20, 0.06) 1px, transparent 1px),
      radial-gradient(rgba(40, 30, 20, 0.04) 1px, transparent 1px);
    background-size: 3px 3px, 7px 7px;
    background-position: 0 0, 1.5px 1.5px;
    padding: clamp(2rem, 4vw, 4rem) clamp(2.5rem, 5vw, 6rem);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .paper::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 40%, rgba(60, 40, 20, 0.12) 100%);
    pointer-events: none;
  }

  .corner-mark {
    position: absolute;
    font-family: 'Space Mono', ui-monospace, monospace;
    font-size: clamp(0.7rem, 0.95vw, 1.1rem);
    letter-spacing: 0.18em;
    color: rgba(15, 15, 15, 0.55);
    text-transform: uppercase;
    z-index: 2;
  }
  .corner-mark.top-left    { top: clamp(1.5rem, 2.5vw, 2.5rem); left: clamp(1.75rem, 3vw, 3rem); }
  .corner-mark.top-right   { top: clamp(1.5rem, 2.5vw, 2.5rem); right: clamp(1.75rem, 3vw, 3rem); }
  .corner-mark.bottom-left { bottom: clamp(1.5rem, 2.5vw, 2.5rem); left: clamp(1.75rem, 3vw, 3rem); }
  .corner-mark.bottom-right{ bottom: clamp(1.5rem, 2.5vw, 2.5rem); right: clamp(1.75rem, 3vw, 3rem); }

  /* ============ WELCOME ============ */
  .welcome .paper {
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .welcome-stamp {
    font-family: 'Noto Serif JP', serif;
    font-weight: 900;
    font-size: clamp(2.5rem, 6vw, 6rem);
    color: rgba(200, 54, 42, 0.85);
    margin-bottom: clamp(1rem, 2vw, 2rem);
    letter-spacing: 0.3em;
    transform: rotate(-2deg);
  }

  .welcome-title {
    font-family: 'Bebas Neue', sans-serif;
    line-height: 0.85;
    color: #1a1a1a;
    margin: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .welcome-line-1 {
    font-size: clamp(7rem, 18vw, 22rem);
    letter-spacing: 0.02em;
  }
  .welcome-line-2 {
    font-size: clamp(8rem, 22vw, 26rem);
    color: #c8362a;
    margin-top: -0.05em;
  }
  .welcome-line-2 .apos {
    color: #1a1a1a;
  }

  .welcome-rule {
    width: clamp(8rem, 14vw, 18rem);
    height: 2px;
    background: #1a1a1a;
    margin: clamp(1.5rem, 3vw, 3rem) 0;
  }

  .welcome-line {
    font-family: 'Space Mono', monospace;
    font-size: clamp(1rem, 1.4vw, 1.6rem);
    letter-spacing: 0.25em;
    color: #2a2a2a;
    margin-bottom: clamp(2rem, 4vw, 4rem);
  }

  .welcome-pull {
    font-family: 'Noto Serif JP', serif;
    font-weight: 400;
    font-style: italic;
    font-size: clamp(1.4rem, 2.4vw, 2.8rem);
    color: #1a1a1a;
    line-height: 1.4;
    max-width: 28ch;
  }

  /* ============ OVERVIEW ============ */
  .overview .paper {
    justify-content: center;
  }

  .route {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    max-width: 1200px;
    width: 100%;
  }
  .route li {
    display: grid;
    grid-template-columns: 5rem 1fr auto auto;
    gap: clamp(1rem, 3vw, 3rem);
    align-items: baseline;
    padding: clamp(1rem, 2vw, 1.75rem) 0;
    border-bottom: 1.5px solid rgba(15, 15, 15, 0.2);
    font-family: 'Bebas Neue', sans-serif;
  }
  .route li:first-child { border-top: 1.5px solid rgba(15, 15, 15, 0.2); }

  .rt-num {
    font-family: 'Space Mono', monospace;
    font-size: clamp(1rem, 1.4vw, 1.5rem);
    color: rgba(15, 15, 15, 0.45);
    letter-spacing: 0.15em;
  }
  .rt-name {
    font-size: clamp(2.5rem, 5.5vw, 6rem);
    letter-spacing: 0.04em;
    line-height: 1;
  }
  .rt-sub {
    grid-column: 2;
    align-self: end;
    font-family: 'DM Sans', sans-serif;
    font-style: italic;
    font-size: clamp(0.95rem, 1.3vw, 1.4rem);
    color: rgba(15, 15, 15, 0.55);
    padding-left: 0.5rem;
    transform: translateY(-0.3em);
  }
  .rt-nights {
    font-family: 'Space Mono', monospace;
    font-size: clamp(1rem, 1.3vw, 1.4rem);
    color: #c8362a;
    letter-spacing: 0.1em;
    justify-self: end;
  }
  .rt-dates {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.85rem, 1.1vw, 1.2rem);
    color: rgba(15, 15, 15, 0.55);
    letter-spacing: 0.12em;
    justify-self: end;
    min-width: 10ch;
    text-align: right;
  }

  /* ============ CITY POSTERS ============ */
  .poster {
    --bg: #c8362a;
    --ink: #fbf4dc;
    --accent: #f5c563;
  }

  .poster-frame {
    flex: 1;
    background: var(--bg);
    color: var(--ink);
    position: relative;
    padding: clamp(2rem, 4vw, 4rem) clamp(2.5rem, 5vw, 6rem);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr auto;
    overflow: hidden;
  }

  .poster .corner-mark {
    color: var(--ink);
    opacity: 0.7;
  }

  .kanji-watermark {
    position: absolute;
    font-family: 'Noto Serif JP', serif;
    font-weight: 900;
    font-size: clamp(28rem, 70vw, 90rem);
    line-height: 0.85;
    color: var(--ink);
    opacity: 0.07;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    pointer-events: none;
    z-index: 0;
    white-space: nowrap;
  }

  .poster-headline {
    grid-column: 1;
    grid-row: 2;
    align-self: center;
    position: relative;
    z-index: 1;
  }
  .poster-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(7rem, 16vw, 20rem);
    line-height: 0.82;
    letter-spacing: 0.01em;
    margin: 0;
    color: var(--ink);
  }
  .poster-sub {
    font-family: 'Space Mono', monospace;
    font-size: clamp(1rem, 1.6vw, 1.9rem);
    letter-spacing: 0.35em;
    color: var(--accent);
    margin-top: clamp(0.75rem, 1.5vw, 1.25rem);
    text-transform: uppercase;
  }

  .keywords {
    grid-column: 2;
    grid-row: 2;
    align-self: center;
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
    z-index: 1;
    border-left: 2px solid var(--accent);
    padding-left: clamp(1.5rem, 2.5vw, 2.5rem);
  }
  .keywords li {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(1.1rem, 1.8vw, 2.1rem);
    line-height: 1.4;
    padding: clamp(0.4rem, 0.8vw, 0.7rem) 0;
    color: var(--ink);
  }
  .keywords li::before {
    content: '— ';
    color: var(--accent);
    margin-right: 0.25em;
  }

  /* ============ BOOKINGS ============ */
  .bookings .paper {
    justify-content: center;
  }

  .bookings-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(4rem, 9vw, 11rem);
    line-height: 0.85;
    color: #1a1a1a;
    margin-bottom: clamp(2rem, 4vw, 4rem);
    letter-spacing: 0.02em;
  }
  .bookings-title span {
    color: #c8362a;
    font-style: italic;
    font-family: 'Noto Serif JP', serif;
    font-weight: 700;
    font-size: 0.5em;
    letter-spacing: 0;
    display: inline-block;
    margin-top: 0.4em;
  }

  .tickets {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(1.5rem, 3vw, 3rem);
    margin-bottom: clamp(2rem, 4vw, 3.5rem);
  }
  .ticket {
    position: relative;
    background: #fbf4dc;
    border: 2px solid #1a1a1a;
    padding: clamp(1.5rem, 2.5vw, 2.5rem);
    overflow: hidden;
  }
  .ticket::before {
    content: '';
    position: absolute;
    top: 0; right: 30%; bottom: 0;
    width: 0;
    border-left: 2px dashed rgba(15, 15, 15, 0.25);
  }
  .ticket-no {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.85rem, 1.1vw, 1.2rem);
    letter-spacing: 0.2em;
    color: rgba(15, 15, 15, 0.5);
    margin-bottom: clamp(0.5rem, 1vw, 1rem);
  }
  .ticket-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2rem, 3.6vw, 4rem);
    line-height: 0.95;
    color: #1a1a1a;
    margin-bottom: 0.5em;
    letter-spacing: 0.02em;
  }
  .ticket-meta {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.9rem, 1.2vw, 1.3rem);
    color: #c8362a;
    letter-spacing: 0.1em;
    margin-bottom: 0.75em;
  }
  .ticket-action {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(0.95rem, 1.3vw, 1.4rem);
    color: #1a1a1a;
    line-height: 1.4;
    max-width: 22ch;
  }
  .ticket-stamp {
    position: absolute;
    bottom: clamp(1rem, 2vw, 2rem);
    right: clamp(1rem, 2vw, 2rem);
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(1.5rem, 2.4vw, 3rem);
    color: #c8362a;
    border: 3px solid #c8362a;
    padding: 0.15em 0.6em;
    transform: rotate(8deg);
    letter-spacing: 0.1em;
    opacity: 0.85;
  }

  .bookings-foot {
    font-family: 'Noto Serif JP', serif;
    font-style: italic;
    font-size: clamp(1.1rem, 1.8vw, 2rem);
    color: rgba(15, 15, 15, 0.7);
    text-align: center;
  }

  /* ============ OPEN FLOOR ============ */
  .open-floor .paper {
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .end-stamp {
    font-family: 'Noto Serif JP', serif;
    font-weight: 900;
    font-size: clamp(3rem, 7vw, 8rem);
    color: rgba(200, 54, 42, 0.85);
    margin-bottom: clamp(1rem, 2vw, 2rem);
    letter-spacing: 0.3em;
    transform: rotate(-2deg);
  }

  .end-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(10rem, 24vw, 30rem);
    line-height: 0.85;
    color: #1a1a1a;
    margin: 0 0 clamp(2rem, 4vw, 4rem);
    letter-spacing: 0.02em;
  }

  .end-pull {
    font-family: 'Noto Serif JP', serif;
    font-style: italic;
    font-size: clamp(1.4rem, 2.4vw, 2.8rem);
    color: #1a1a1a;
    line-height: 1.5;
    margin-bottom: clamp(2rem, 4vw, 4rem);
  }

  .end-foot {
    font-family: 'Space Mono', monospace;
    font-size: clamp(0.9rem, 1.3vw, 1.4rem);
    letter-spacing: 0.2em;
    color: rgba(15, 15, 15, 0.55);
    line-height: 1.8;
    text-transform: uppercase;
  }

  /* ============ CLICK AREAS ============ */
  .click-area {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 40%;
    background: transparent;
    border: 0;
    cursor: pointer;
    z-index: 5;
  }
  .click-prev { left: 0; cursor: w-resize; }
  .click-next { right: 0; cursor: e-resize; }
  .click-area:focus-visible {
    outline: none;
  }

  /* ============ HUD ============ */
  .hud {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem clamp(1rem, 2vw, 2rem);
    pointer-events: none;
    z-index: 10;
  }
  .hud-exit {
    pointer-events: auto;
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.4);
    padding: 0.4rem 0.7rem;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    border-radius: 2px;
    transition: color 0.2s, background 0.2s;
  }
  .hud-exit:hover { color: rgba(255, 255, 255, 0.85); background: rgba(0, 0, 0, 0.5); }

  .hud-counter {
    pointer-events: none;
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: rgba(255, 255, 255, 0.4);
    padding: 0.4rem 0.7rem;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    border-radius: 2px;
  }
  .hud-counter .slash { margin: 0 0.3em; opacity: 0.5; }

  /* ============ DOTS ============ */
  .dots {
    position: absolute;
    bottom: clamp(0.75rem, 1.5vw, 1.5rem);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.6rem;
    z-index: 10;
    pointer-events: auto;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    border: 0;
    padding: 0;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .dot:hover { background: rgba(255, 255, 255, 0.55); }
  .dot.active {
    background: rgba(255, 255, 255, 0.95);
    transform: scale(1.3);
  }

  /* Mobile */
  @media (max-width: 700px) {
    .poster-frame {
      grid-template-columns: 1fr;
      grid-template-rows: auto auto 1fr;
    }
    .poster-headline, .keywords {
      grid-column: 1;
    }
    .keywords {
      border-left: 0;
      border-top: 2px solid var(--accent);
      padding-left: 0;
      padding-top: 1.5rem;
      margin-top: 1rem;
    }
    .route li {
      grid-template-columns: 3rem 1fr;
      grid-template-rows: auto auto;
    }
    .rt-num { grid-row: 1 / span 2; }
    .rt-name { grid-column: 2; grid-row: 1; }
    .rt-sub { grid-column: 2; grid-row: 1; align-self: end; transform: none; padding-left: 0; margin-left: 0.5em; }
    .rt-nights, .rt-dates { grid-column: 2; grid-row: 2; justify-self: start; }
    .rt-dates { color: rgba(15, 15, 15, 0.4); }
    .tickets { grid-template-columns: 1fr; }
  }
</style>
