<script lang="ts">
  // nothing needed
</script>

<footer>
  <div class="inner">
    <div class="footer-kanji">旅</div>
    <div class="footer-content">
      <p class="footer-title">Japan 2026</p>
      <p class="footer-sub">Oct 17 — Oct 31 · Tokyo · Kyoto · Osaka · Tokyo</p>
    </div>
    <p class="footer-note">4 guys. 15 days. No regrets.</p>
  </div>
</footer>

<style>
  footer {
    background: var(--color-ink);
    padding: clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem);
    border-top: 1px solid rgba(255,255,255,0.05);
  }

  .inner {
    max-width: var(--max-width);
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .footer-kanji {
    font-family: var(--font-serif);
    font-size: 4rem;
    color: rgba(255,255,255,0.06);
    line-height: 1;
    flex-shrink: 0;
  }

  .footer-content {
    flex: 1;
  }

  .footer-title {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    color: rgba(255,255,255,0.7);
    margin-bottom: 0.25rem;
  }

  .footer-sub {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    color: rgba(255,255,255,0.25);
    text-transform: uppercase;
  }

  .footer-note {
    font-family: var(--font-serif);
    font-style: italic;
    color: rgba(255,255,255,0.15);
    font-size: 0.9rem;
  }
</style>
