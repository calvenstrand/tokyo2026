<script lang="ts">
  let { label = '' }: { label?: string } = $props()
</script>

<div class="divider">
  <svg class="brush" viewBox="0 0 800 24" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M0,12 C50,4 100,18 180,12 C260,6 320,16 400,12 C480,8 560,17 640,12 C700,8 750,15 800,12"
      stroke="currentColor"
      stroke-width="1.5"
      fill="none"
      stroke-linecap="round"
      opacity="0.25"
    />
  </svg>
  {#if label}
    <span class="label">{label}</span>
  {/if}
</div>

<style>
  .divider {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    color: var(--color-ink);
    margin: 0;
  }

  .brush {
    flex: 1;
    height: 24px;
  }

  .label {
    font-family: var(--font-sans);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-ink-faint);
    white-space: nowrap;
    flex-shrink: 0;
  }
</style>
