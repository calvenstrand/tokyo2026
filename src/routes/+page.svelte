<script lang="ts">
  import { cities } from '../data/itinerary'
  import CitySection from '$lib/sections/CitySection.svelte'
  import Hero from '$lib/sections/Hero.svelte'
  import Footer from '$lib/sections/Footer.svelte'

  import img1Src from '../img/Gemini_Generated_Image_44g9m644g9m644g9.png?w=800&format=webp'
  import img1Srcset from '../img/Gemini_Generated_Image_44g9m644g9m644g9.png?w=400;800&format=webp&as=srcset'
  import img2Src from '../img/Gemini_Generated_Image_89sggf89sggf89sg.png?w=800&format=webp'
  import img2Srcset from '../img/Gemini_Generated_Image_89sggf89sggf89sg.png?w=400;800&format=webp&as=srcset'
  import img3Src from '../img/Gemini_Generated_Image_fqt2o0fqt2o0fqt2.png?w=800&format=webp'
  import img3Srcset from '../img/Gemini_Generated_Image_fqt2o0fqt2o0fqt2.png?w=400;800&format=webp&as=srcset'
  import img4Src from '../img/Gemini_Generated_Image_o5j8kgo5j8kgo5j8.png?w=800&format=webp'
  import img4Srcset from '../img/Gemini_Generated_Image_o5j8kgo5j8kgo5j8.png?w=400;800&format=webp&as=srcset'

  const heroPhotos = [
    { src: img1Src, srcset: img1Srcset },
    { src: img2Src, srcset: img2Srcset },
    { src: img3Src, srcset: img3Srcset },
    { src: img4Src, srcset: img4Srcset },
  ]


</script>

<svelte:head>
  <title>Japan 2026 — Tokyo · Kyoto · Osaka</title>
  <meta name="description" content="15 days in Japan — October 2026. Shinkansen, sake, baseball, sushi and everything in between." />
  <link rel="canonical" href="https://riverbeach.se/tokyo26/" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://riverbeach.se/tokyo26/" />
  <meta property="og:title" content="Japan 2026 — Tokyo · Kyoto · Osaka" />
  <meta property="og:description" content="15 days in Japan — October 2026. Shinkansen, sake, baseball, sushi and everything in between." />
  <meta property="og:locale" content="en_GB" />
  <meta property="og:image" content="https://riverbeach.se/tokyo26/og-image.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Japan 2026 — Tokyo · Kyoto · Osaka" />
  <meta name="twitter:description" content="15 days in Japan — October 2026. Shinkansen, sake, baseball, sushi and everything in between." />
  <meta name="twitter:image" content="https://riverbeach.se/tokyo26/og-image.jpg" />
</svelte:head>

<Hero />

<div class="hero-photos">
  {#each heroPhotos as photo}
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

<Footer />

<style>
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
