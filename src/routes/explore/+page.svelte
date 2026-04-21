<svelte:head>
  <title>Explore Tokyo — Japan 2026</title>
</svelte:head>

<section class="explore">
  <div class="explore-bg" aria-hidden="true">
    <span class="explore-bg-ja">東京</span>
  </div>

  <div class="explore-content">
    <div class="explore-tag">Coming soon</div>
    <h1 class="explore-heading">
      <span class="line">EXPLORE</span>
      <span class="line accent">TOKYO</span>
    </h1>
    <p class="explore-body">
      Neighbourhood guides, hidden bars, ramen spots worth the queue,
      and everything else that doesn't fit in the itinerary.
    </p>
  </div>
</section>

<style>
  .explore {
    position: relative;
    min-height: 100svh;
    background: #0f0f0f;
    display: flex;
    align-items: center;
    padding: clamp(6rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem);
    overflow: hidden;
  }

  .explore-bg {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    pointer-events: none;
    overflow: hidden;
  }

  .explore-bg-ja {
    font-family: var(--font-ja);
    font-size: clamp(18rem, 40vw, 48rem);
    color: white;
    opacity: 0.03;
    line-height: 1;
    margin-right: -0.05em;
    user-select: none;
  }

  .explore-content {
    position: relative;
    z-index: 1;
    max-width: var(--max-width);
    width: 100%;
    margin: 0 auto;
  }

  .explore-tag {
    font-family: var(--font-condensed);
    font-size: clamp(0.75rem, 1.5vw, 1rem);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    margin-bottom: 1.5rem;
    border: 1px solid rgba(255,255,255,0.1);
    display: inline-block;
    padding: 0.35em 0.9em;
  }

  .explore-heading {
    display: flex;
    flex-direction: column;
    gap: 0;
    line-height: 0.88;
    margin-bottom: clamp(2rem, 4vw, 3rem);
  }

  .line {
    display: block;
    font-family: var(--font-display);
    font-size: clamp(6rem, 18vw, 22rem);
    color: white;
    letter-spacing: -0.01em;
  }

  .accent {
    color: #ff2d55;
  }

  .explore-body {
    font-family: var(--font-sans);
    font-size: clamp(1rem, 1.8vw, 1.25rem);
    color: rgba(255,255,255,0.35);
    max-width: 44ch;
    line-height: 1.65;
  }
</style>
