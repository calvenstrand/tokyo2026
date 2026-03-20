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

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger)
  })
</script>

<div id="top">
  <Nav />
  <Hero />
  {#each cities as city, i}
    <CitySection {city} index={i} />
  {/each}
  <PracticalInfoSection />
  <Footer />
</div>
