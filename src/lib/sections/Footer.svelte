<script lang="ts">
</script>

<footer>
  <div class="inner">
    <p class="footer-title">JAPAN '26</p>
    <p class="footer-sub">Oct 17 – 31 · Tokyo · Kyoto · Osaka · Tokyo</p>
    <p class="footer-note">4 guys. No regrets.</p>
  </div>
</footer>

<style>
  footer {
    background: #0f0f0f;
    padding: clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 5rem);
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .inner {
    display: flex;
    align-items: baseline;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .footer-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 6vw, 5rem);
    color: white;
    letter-spacing: 0.05em;
    line-height: 1;
  }

  .footer-sub {
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
    flex: 1;
  }

  .footer-note {
    font-family: var(--font-condensed);
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    color: #ff2d55;
    text-transform: uppercase;
  }
</style>
