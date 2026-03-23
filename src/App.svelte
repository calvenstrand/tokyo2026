<script lang="ts">
  import { onMount } from 'svelte'
  import { gsap } from 'gsap'
  import { ScrollTrigger } from 'gsap/ScrollTrigger'
  import { cities } from './data/itinerary'
  import Nav from './lib/sections/Nav.svelte'
  import Hero from './lib/sections/Hero.svelte'
  import CitySection from './lib/sections/CitySection.svelte'
  import PracticalInfoSection from './lib/sections/PracticalInfoSection.svelte'
  import Footer from './lib/sections/Footer.svelte'

  import img1Src from './img/Gemini_Generated_Image_44g9m644g9m644g9.png?w=800&format=webp'
  import img1Srcset from './img/Gemini_Generated_Image_44g9m644g9m644g9.png?w=400;800&format=webp&as=srcset'
  import img2Src from './img/Gemini_Generated_Image_89sggf89sggf89sg.png?w=800&format=webp'
  import img2Srcset from './img/Gemini_Generated_Image_89sggf89sggf89sg.png?w=400;800&format=webp&as=srcset'
  import img3Src from './img/Gemini_Generated_Image_fqt2o0fqt2o0fqt2.png?w=800&format=webp'
  import img3Srcset from './img/Gemini_Generated_Image_fqt2o0fqt2o0fqt2.png?w=400;800&format=webp&as=srcset'
  import img4Src from './img/Gemini_Generated_Image_o5j8kgo5j8kgo5j8.png?w=800&format=webp'
  import img4Srcset from './img/Gemini_Generated_Image_o5j8kgo5j8kgo5j8.png?w=400;800&format=webp&as=srcset'

  const heroPhotos = [
    { src: img1Src, srcset: img1Srcset },
    { src: img2Src, srcset: img2Srcset },
    { src: img3Src, srcset: img3Srcset },
    { src: img4Src, srcset: img4Srcset },
  ]

  let creditEl: HTMLDivElement
  let creditHeight = 0

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ro = new ResizeObserver(() => {
      creditHeight = creditEl.offsetHeight
    })
    ro.observe(creditEl)
    return () => ro.disconnect()
  })
</script>

<div id="top" class="page-content">
  <Nav />
  <Hero />

  <div class="hero-photos">
    {#each heroPhotos as photo, i}
      <div class="hero-photo-wrap">
        <img
          src={photo.src}
          srcset={photo.srcset}
          sizes="(min-width: 600px) 25vw, 50vw"
          alt=""
          loading="lazy"
        />
      </div>
    {/each}
  </div>

  {#each cities as city, i}
    <CitySection {city} index={i} />
  {/each}
  <PracticalInfoSection />
  <Footer />
</div>
<div class="credit-spacer" style="height: {creditHeight}px"></div>
<div class="site-credit" bind:this={creditEl}>
  <p class="credit-name">Christoffer Älvenstrand</p>
  <p class="credit-tagline">I'm a creative developer based in Sweden. I build websites and digital experiences — and sometimes I take trips like this one.</p>
  <a class="credit-site" href="https://riverbeach.se/" target="_blank" rel="noopener noreferrer">riverbeach.se</a>
  <a class="credit-email" href="mailto:christoffer.alvenstrand@gmail.com">christoffer.alvenstrand@gmail.com</a>
</div>

<style>
  .site-credit {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    text-align: center;
    padding: clamp(1.5rem, 4vw, 3rem) 1rem;
    background: #0b0f1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .credit-site {
    font-family: var(--font-condensed);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #fff;
    text-decoration: none;
    padding: 0.5em 1.4em;
    border-radius: 0;
    background: linear-gradient(90deg, #4f7cff, #7a5cff);
    position: relative;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    margin-top: 0.5rem;
  }

  .credit-site:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(79, 124, 255, 0.25);
  }

  .credit-tagline {
    font-family: var(--font-sans);
    font-size: clamp(0.85rem, 1.8vw, 1.05rem);
    color: #a0a8b8;
    max-width: 480px;
    line-height: 1.5;
  }

  .credit-name {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    letter-spacing: 0.05em;
    color: #e6e8ef;
    line-height: 1;
  }

  .credit-email {
    font-family: var(--font-condensed);
    font-size: clamp(0.75rem, 1.5vw, 0.95rem);
    letter-spacing: 0.1em;
    color: #4f7cff;
    text-decoration: none;
    transition: color 0.2s ease, filter 0.2s ease;
  }

  .credit-email:hover {
    filter: brightness(1.3);
  }

  .page-content {
    position: relative;
    z-index: 1;
    background: #0f0f0f;
    box-shadow: 0 20px 80px 20px rgba(0,0,0,0.9);
  }

  .credit-spacer {
    /* height set dynamically to match credit block */
  }

  .hero-photos {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3px;
    background: #0f0f0f;
  }

  @media (min-width: 600px) {
    .hero-photos {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .hero-photo-wrap {
    aspect-ratio: 3 / 4;
    overflow: hidden;
  }

  .hero-photo-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }

  .hero-photo-wrap:hover img {
    transform: scale(1.04);
  }
</style>
