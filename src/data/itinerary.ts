import imgTokyoI from '../img/photo-1573455494060-c5595004fb6c.avif'
import imgKyoto from '../img/photo-1558862107-d49ef2a04d72.avif'
import imgTokyoII from '../img/photo-1576376365962-1fc6c74d5ff6.avif'

// New images
import imgMiyajimaSrc from '../img/Miyajima.jpeg'
import imgMiyajimaSrcset from '../img/Miyajima.jpeg?w=280;560&format=webp&as=srcset'
import imgAlleywaySrc from '../img/alleyway.jpeg'
import imgAlleywaySrcset from '../img/alleyway.jpeg?w=280;560&format=webp&as=srcset'
import imgBaseball2Src from '../img/baseball2.jpeg'
import imgBaseball2Srcset from '../img/baseball2.jpeg?w=280;560&format=webp&as=srcset'
import imgBeer1Src from '../img/beer1.jpeg'
import imgBeer1Srcset from '../img/beer1.jpeg?w=280;560&format=webp&as=srcset'
import imgBeer2Src from '../img/beer2.jpeg'
import imgBeer2Srcset from '../img/beer2.jpeg?w=280;560&format=webp&as=srcset'
import imgBeer3Src from '../img/beer3.jpeg'
import imgBeer3Srcset from '../img/beer3.jpeg?w=280;560&format=webp&as=srcset'
import imgClawMachineSrc from '../img/claw-machine.jpeg'
import imgClawMachineSrcset from '../img/claw-machine.jpeg?w=280;560&format=webp&as=srcset'
import imgFushimiInariSrc from '../img/fushimi-inari.jpeg'
import imgFushimiInariSrcset from '../img/fushimi-inari.jpeg?w=280;560&format=webp&as=srcset'
import imgNaraPagodaSrc from '../img/nara-pagoda.jpeg'
import imgNaraPagodaSrcset from '../img/nara-pagoda.jpeg?w=280;560&format=webp&as=srcset'
import imgOkonomiyakiSrc from '../img/okonomiyaki.jpeg'
import imgOkonomiyakiSrcset from '../img/okonomiyaki.jpeg?w=280;560&format=webp&as=srcset'
import imgRamen2Src from '../img/ramen2.jpeg'
import imgRamen2Srcset from '../img/ramen2.jpeg?w=280;560&format=webp&as=srcset'
import imgSushiSrc from '../img/sushi.jpeg'
import imgSushiSrcset from '../img/sushi.jpeg?w=280;560&format=webp&as=srcset'
import imgWagyu1Src from '../img/wagyu1.jpeg'
import imgWagyu1Srcset from '../img/wagyu1.jpeg?w=280;560&format=webp&as=srcset'
import imgWagyu2Src from '../img/wagyu2.jpeg'
import imgWagyu2Srcset from '../img/wagyu2.jpeg?w=280;560&format=webp&as=srcset'

// User photos — Tokyo I
import imgShibuyaAerialSrc from '../img/IMG_6511.jpeg'
import imgShibuyaAerialSrcset from '../img/IMG_6511.jpeg?w=280;560&format=webp&as=srcset'
import imgTokyoStreetSrc from '../img/IMG_6583.jpeg'
import imgTokyoStreetSrcset from '../img/IMG_6583.jpeg?w=280;560&format=webp&as=srcset'
import imgTokyoShowSrc from '../img/IMG_6474.jpeg'
import imgTokyoShowSrcset from '../img/IMG_6474.jpeg?w=280;560&format=webp&as=srcset'

// User photos — Kyoto
import imgKyotoPagodaSrc from '../img/IMG_6628.jpeg'
import imgKyotoPagodaSrcset from '../img/IMG_6628.jpeg?w=280;560&format=webp&as=srcset'

// User photos — Osaka
import imgOsakaHero from '../img/IMG_0883.jpeg'
import imgShinsekaISrc from '../img/IMG_0841.jpeg'
import imgShinsekaISrcset from '../img/IMG_0841.jpeg?w=280;560&format=webp&as=srcset'
import imgDotonboriAsahiSrc from '../img/IMG_0911.jpeg'
import imgDotonboriAsahiSrcset from '../img/IMG_0911.jpeg?w=280;560&format=webp&as=srcset'
import imgDotonboriAngleSrc from '../img/IMG_0912.jpeg'
import imgDotonboriAngleSrcset from '../img/IMG_0912.jpeg?w=280;560&format=webp&as=srcset'
import imgOsakaCastleSrc from '../img/IMG_0886.jpeg'
import imgOsakaCastleSrcset from '../img/IMG_0886.jpeg?w=280;560&format=webp&as=srcset'
import imgWagyuKatsuSrc from '../img/IMG_0638.jpeg'
import imgWagyuKatsuSrcset from '../img/IMG_0638.jpeg?w=280;560&format=webp&as=srcset'
import imgWagyuGrillSrc from '../img/IMG_0922.jpeg'
import imgWagyuGrillSrcset from '../img/IMG_0922.jpeg?w=280;560&format=webp&as=srcset'

// User photos — Tokyo II
import imgGameboySrc from '../img/IMG_1402.jpeg'
import imgGameboySrcset from '../img/IMG_1402.jpeg?w=280;560&format=webp&as=srcset'
import imgTokyoCatScreenSrc from '../img/IMG_6460.jpeg'
import imgTokyoCatScreenSrcset from '../img/IMG_6460.jpeg?w=280;560&format=webp&as=srcset'
import imgBaseballSrc from '../img/IMG_7143.jpeg'
import imgBaseballSrcset from '../img/IMG_7143.jpeg?w=280;560&format=webp&as=srcset'
import imgNigiriSrc from '../img/IMG_7047.jpeg'
import imgNigiriSrcset from '../img/IMG_7047.jpeg?w=280;560&format=webp&as=srcset'
import imgChefTunaSrc from '../img/IMG_7061.jpeg'
import imgChefTunaSrcset from '../img/IMG_7061.jpeg?w=280;560&format=webp&as=srcset'
import imgRamenSrc from '../img/IMG_6690.jpeg'
import imgRamenSrcset from '../img/IMG_6690.jpeg?w=280;560&format=webp&as=srcset'
import imgWagyuSlicesSrc from '../img/IMG_6669.jpeg'
import imgWagyuSlicesSrcset from '../img/IMG_6669.jpeg?w=280;560&format=webp&as=srcset'

export type Activity = {
  time?: string
  title: string
  description: string
}

export type DayImage = {
  src: string
  srcset: string
}

export type Day = {
  day: number
  date: string
  label: string
  activities: Activity[]
  images?: DayImage[]
}

export type CityTheme = {
  bg: string           // poster background color
  ink: string          // primary text
  inkFaint: string     // secondary text
  accent: string       // highlight color
  border: string       // divider color
  image?: string       // hero photo
  layout: 'tokyo-i' | 'kyoto' | 'osaka' | 'hiroshima' | 'akihabara'
}

export type City = {
  id: string
  name: string
  nameJa: string
  subtitle: string
  summary: string
  dates: string
  nights: number
  accentChar: string
  theme: CityTheme
  days: Day[]
}

export const cities: City[] = [
  {
    id: 'tokyo-i',
    name: 'Tokyo',
    nameJa: '東京',
    subtitle: 'Shinjuku',
    summary: 'Four nights in Shinjuku, starting Oct 9. We land at Haneda early morning — sort the JR Pass and Suica at the airport, capsule hotel for a few hours, then head to Shinjuku and get moving. Omoide Yokocho that first evening: smoky yakitori alley two minutes from the station, cold Sapporo, strangers. Good start. Days fill in: Meiji Shrine to clear the head, Thermae-Yu for a proper hot spring reset (outdoor bath, old-school feel, correct for jet lag), Shibuya Sky to see the crossing from 50 floors, teamLab Borderless for the spectacle. One proper izakaya dinner — walk-ins only, packed with salarymen, no English menu — and the best sake bar in Shinjuku after. First taste of Akihabara on day four before the full dive later in the trip.',
    dates: 'Oct 9–13',
    nights: 4,
    accentChar: '一',
    theme: {
      bg: '#ff2d55',
      ink: '#0f0f0f',
      inkFaint: '#5a0a1a',
      accent: '#ffffff',
      border: 'rgba(0,0,0,0.15)',
      image: imgTokyoI,
      layout: 'tokyo-i',
    },
    days: [
      {
        day: 1,
        date: 'Friday, Oct 9',
        label: 'Arrival',
        images: [{ src: imgAlleywaySrc, srcset: imgAlleywaySrcset }],
        activities: [
          {
            time: 'Morning',
            title: 'Land Haneda — Sort logistics',
            description: 'Touch down around 6–7am. JR Pass activation and Suica cards at the airport before leaving the terminal. Then: capsule hotel nearby (9 Hours Shinjuku or First Cabin) for a few hours of sleep and a shower. Essential.',
          },
          {
            time: 'Afternoon',
            title: 'Shinjuku',
            description: 'Keikyu line from Haneda Terminal 3 to Shinjuku — about 35 min, one change at Sengakuji. Drop bags at the hotel. Convenience store lunch, slow wander. No agenda.',
          },
          {
            time: 'Evening',
            title: 'Omoide Yokocho',
            description: 'Smoky yakitori alley a 2-min walk from Shinjuku Station west exit. Squeeze into a stall, order skewers and cold Sapporo, eat with strangers. The best possible first night in Japan.',
          },
          {
            time: 'Late',
            title: 'One drink — Golden Gai',
            description: 'Pick a bar, stay one drink, then early night. You\'ve been awake for 24 hours. Tomorrow is a full day.',
          },
        ],
      },
      {
        day: 2,
        date: 'Saturday, Oct 10',
        label: '',
        images: [
          { src: imgTokyoShowSrc, srcset: imgTokyoShowSrcset },
          { src: imgTokyoCatScreenSrc, srcset: imgTokyoCatScreenSrcset },
          { src: imgBeer1Src, srcset: imgBeer1Srcset },
        ],
        activities: [
          {
            time: 'Morning',
            title: 'Meiji Shrine → Harajuku / Omotesando',
            description: 'Forested, peaceful, genuinely calming after the flight. Free entry, 20 min from Shinjuku. Then Takeshita Street for the spectacle, down to Omotesando to decompress.',
          },
          {
            time: 'Afternoon',
            title: 'Thermae-Yu',
            description: 'Natural hot spring in Shinjuku, rooftop outdoor bath, old-school feel. This is the jet lag reset. Allow a couple of hours — the outdoor bath on the roof is the one.',
          },
          {
            time: 'Evening',
            title: 'Shuko Takigiya + Sasagin',
            description: 'Izakaya packed with local salarymen — go early, walk-ins only, no English menu. Then Sasagin: huge sake list and the guy behind the bar actually knows what he\'s doing. Tell him what you like and let him pick.',
          },
        ],
      },
      {
        day: 3,
        date: 'Sunday, Oct 11',
        label: '',
        images: [{ src: imgShibuyaAerialSrc, srcset: imgShibuyaAerialSrcset }],
        activities: [
          {
            time: 'Morning',
            title: 'Shibuya',
            description: 'Crossing at street level first, then up to Shibuya Sky observation deck. The scramble from above is the one everyone\'s seen — worth it in person.',
          },
          {
            time: 'Lunch',
            title: 'Maisen — Tonkatsu',
            description: 'Omotesando institution. Thick-cut pork, the kuroge wagyu katsu set is what you\'re there for. Worth any wait.',
          },
          {
            time: 'Afternoon',
            title: 'teamLab Borderless',
            description: 'Azabudai Hills. Book tickets well in advance — allow 2–3 hours. Immersive digital art at a scale that\'s hard to describe. Just go.',
          },
          {
            time: 'Evening',
            title: 'Karaoke — Golden Gai crawl',
            description: 'Not a box. One of the small bar-style karaoke spots in or near Golden Gai — ten people, one mic, strangers applauding. Completely different from the commercial chains. Then crawl Golden Gai as long as it takes.',
          },
        ],
      },
      {
        day: 4,
        date: 'Monday, Oct 12',
        label: '',
        images: [
          { src: imgSushiSrc, srcset: imgSushiSrcset },
          { src: imgRamen2Src, srcset: imgRamen2Srcset },
        ],
        activities: [
          {
            time: 'Early morning',
            title: 'Toyosu Tuna Auction (if booked)',
            description: '5:30am start. Extremely limited spots — book immediately via the Toyosu Market website the moment the window opens. If you got in: worth every bit of the early alarm. If not: sleep.',
          },
          {
            time: 'Morning',
            title: 'Tsukiji Outer Market',
            description: 'Breakfast regardless of whether you made the auction. Tuna sashimi, tamagoyaki straight off the grill, uni on rice. This is how you eat in the morning in Tokyo.',
          },
          {
            time: 'Afternoon',
            title: 'Akihabara — First pass',
            description: 'Super Potato for retro games, Yodobashi for electronics, Mandarake for vintage anime merch. Don\'t buy everything now — you\'ll be back. Get your bearings.',
          },
          {
            time: 'Evening',
            title: 'Relaxed Shinjuku dinner + early night',
            description: 'Ramen somewhere good, pack for tomorrow. Shinkansen to Kyoto in the morning.',
          },
        ],
      },
    ],
  },
  {
    id: 'kyoto',
    name: 'Kyoto',
    nameJa: '京都',
    subtitle: '',
    summary: 'Slower than Tokyo, which after four days of neon and noise is actually welcome. Arrive, hit Nishiki Market, then settle in. Fushimi Inari at 6am before anyone else shows up, then straight into the Fushimi sake district — 30+ breweries in walking distance, cold sake from a vending machine outside one of them. Nintendo Museum in Uji the same day (booked months ago, do not lose the tickets). Last evening is the one properly booked dinner of the trip: yakitori omakase counter. High quality, skewer by skewer, completely drink-friendly. End the night at Funaoka Onsen — 1923 bathhouse, beautiful wooden interior, outdoor bath, almost entirely locals. Book the dinner months before departure. Leaving day: bags go ahead to Osaka via takuhaibin, travel light, Nara on the way.',
    dates: 'Oct 13–16',
    nights: 3,
    accentChar: '古',
    theme: {
      bg: '#1a3a2a',
      ink: '#f0ede6',
      inkFaint: 'rgba(240,237,230,0.45)',
      accent: '#a8e063',
      border: 'rgba(255,255,255,0.12)',
      image: imgKyoto,
      layout: 'kyoto',
    },
    days: [
      {
        day: 5,
        date: 'Tuesday, Oct 13',
        label: 'Travel Day',
        images: [{ src: imgBeer2Src, srcset: imgBeer2Srcset }],
        activities: [
          {
            time: 'Day',
            title: 'Shinkansen Tokyo → Kyoto',
            description: '~2h15. Grab an ekiben at Shinjuku before boarding. Graze through Nishiki Market on arrival — Kyoto\'s covered food market. Pickled vegetables, yuba, skewered octopus, sweet potato ice cream.',
          },
          {
            time: 'Evening',
            title: 'Pontocho — Torihara + Bar Pontostand',
            description: 'Lantern-lit riverside alley. Dinner at Torihara: excellent yakitori from ¥590, cold beer, no fuss. Drinks after at Bar Pontostand — bilingual sake bar, Mako and Taku behind the counter, they know what they\'re doing.',
          },
        ],
      },
      {
        day: 6,
        date: 'Wednesday, Oct 14',
        label: 'Fushimi + Nintendo',
        images: [
          { src: imgFushimiInariSrc, srcset: imgFushimiInariSrcset },
          { src: imgKyotoPagodaSrc, srcset: imgKyotoPagodaSrcset },
        ],
        activities: [
          {
            time: '6am',
            title: 'Fushimi Inari',
            description: 'Thousands of torii gates winding up a forested mountain. Go as far up as energy allows — the further you go, the fewer people. Otherworldly in the early morning mist. Essential.',
          },
          {
            time: 'Morning',
            title: 'Fushimi Sake District',
            description: 'Over 30 breweries within walking distance. Gekkeikan Okura Museum, then Kizakura and Kinshi Masamune. Buy a cold cup of nigori from a brewery vending machine and drink it in the street. This is the move.',
          },
          {
            time: 'Afternoon',
            title: 'Nintendo Museum — Uji',
            description: '15 min by train. Interactive exhibits spanning Nintendo\'s entire history, playable installations, exclusive merch. Allow 3 hours minimum. Lottery tickets must be booked months in advance — highest booking priority of the entire trip.',
          },
          {
            time: 'Evening',
            title: 'Gion walk + dinner',
            description: 'Back to Kyoto. Evening walk through Gion, dinner somewhere in Pontocho or Gion. Decompress after a full day.',
          },
        ],
      },
      {
        day: 7,
        date: 'Thursday, Oct 15',
        label: '',
        images: [{ src: imgWagyuKatsuSrc, srcset: imgWagyuKatsuSrcset }],
        activities: [
          {
            time: 'Morning',
            title: 'Arashiyama',
            description: 'Bamboo grove early, Tenryu-ji garden, riverside lunch. Easy morning — save yourself for the evening.',
          },
          {
            time: 'Afternoon',
            title: 'Free — Gion / Pontocho',
            description: 'No agenda. Walk Gion, find a sake bar, poke into whatever calls to you.',
          },
          {
            time: 'Evening',
            title: 'Yakitori Omakase',
            description: 'The big Kyoto dinner. Counter seating, skewer by skewer, high quality, completely drink-friendly. None of the white-tablecloth tension of a kaiseki room — this is the better call. Book before leaving Sweden. ¥15,000–25,000 per person.',
          },
          {
            time: 'Late',
            title: 'Funaoka Onsen + K-Ya Bar',
            description: 'Funaoka Onsen: 1923 bathhouse in Kuramaguchi, beautiful Meiji-era wooden interior, mosaic tiles, outdoor bath, almost entirely local clientele. ~¥500, open until midnight, 20 min by bus from central Kyoto. Check tattoo policy in advance. K-Ya Bar in Pontocho after if anyone has energy — vast single malt whisky list.',
          },
        ],
      },
    ],
  },
  {
    id: 'osaka',
    name: 'Osaka',
    nameJa: '大阪',
    subtitle: '',
    summary: 'The food city. Louder than Kyoto, cheaper than Tokyo, completely fine with both. Arrive via Nara — bags already at the hotel, sent ahead by takuhaibin while you spent the morning with the deer at Todai-ji. Walk straight into Dotonbori: takoyaki, then Shinsekai for kushikatsu and drinks at Misono Building — Osaka\'s own Golden Gai. Morning two: train to Sakai, 30 minutes south, to buy knives direct from the makers. Back for Hozenji Yokocho in the afternoon. Baseball in the evening if the Climax Series or Japan Series falls right — check the moment the matchup drops. Third day is a full day in Kobe: Kitano district, Kobe beef at the counter, Nada sake breweries, dinner before the last train back.',
    dates: 'Oct 16–19',
    nights: 3,
    accentChar: '食',
    theme: {
      bg: '#ff6a00',
      ink: '#0f0f0f',
      inkFaint: 'rgba(15,15,15,0.45)',
      accent: '#0f0f0f',
      border: 'rgba(0,0,0,0.15)',
      image: imgOsakaHero,
      layout: 'osaka',
    },
    days: [
      {
        day: 8,
        date: 'Friday, Oct 16',
        label: 'Nara + Travel to Osaka',
        images: [
          { src: imgNaraPagodaSrc, srcset: imgNaraPagodaSrcset },
          { src: imgDotonboriAngleSrc, srcset: imgDotonboriAngleSrcset },
          { src: imgBeer3Src, srcset: imgBeer3Srcset },
        ],
        activities: [
          {
            time: 'Morning',
            title: 'Luggage forwarding — Takuhaibin',
            description: 'Arrange the night before with hotel reception. Bags go direct from Kyoto hotel to Osaka hotel — ¥1,000–2,000 per bag, next-day delivery. Check out light. This is the move.',
          },
          {
            time: 'Late morning',
            title: 'Nara',
            description: 'Train from Kyoto to Nara — 45 min on the Kintetsu line or JR. Todai-ji Temple: Japan\'s largest bronze Buddha, inside a wooden hall the size of an aircraft hangar. Then Nara Park — hundreds of deer roam completely freely, they bow, they steal food, they have no interest in personal space. Naramachi district for lunch. Allow 3–4 hours total.',
          },
          {
            time: 'Afternoon',
            title: 'Nara → Osaka',
            description: 'Kintetsu line direct Nara → Osaka Namba, about 50 min. Check in — bags already waiting at the hotel. Then straight to Dotonbori.',
          },
          {
            time: 'Evening',
            title: 'Dotonbori Food Crawl',
            description: 'Walk the length of Dotonbori and eat everything. Takoyaki from a street stall, eat standing at the canal. Loud, chaotic, completely correct for a first Osaka night.',
          },
          {
            time: 'Late',
            title: 'Shinsekai — Kushikatsu Daruma + Misono Building',
            description: 'Short taxi or subway to Shinsekai. Kushikatsu Daruma: original branch, standing bar, deep-fried skewers of everything, dip once in the communal sauce. No double dipping. It\'s the law. Drinks after at Misono Building — Osaka\'s answer to Golden Gai, small bars stacked on every floor.',
          },
        ],
      },
      {
        day: 9,
        date: 'Saturday, Oct 17',
        label: 'Sakai + Baseball',
        images: [
          { src: imgShinsekaISrc, srcset: imgShinsekaISrcset },
          { src: imgDotonboriAsahiSrc, srcset: imgDotonboriAsahiSrcset },
          { src: imgBaseball2Src, srcset: imgBaseball2Srcset },
        ],
        activities: [
          {
            time: 'Morning',
            title: 'Sakai — Knife District',
            description: '30 min south on the Nankai line. Sakai Traditional Crafts Museum knife store first — buy direct from the makers\' guild, much cheaper than Kappabashi. Then walk between the workshops: Ashi Hamono, Konosuke, Baba Hamono. Working knife-makers, not tourist shops. Note: some close on weekends — verify opening days before going. Allow the full morning.',
          },
          {
            time: 'Afternoon',
            title: 'Hozenji Yokocho',
            description: 'Back to Osaka. Moss-covered stone alley, 60+ small restaurants, far less touristy than Dotonbori. Good place to graze and wander.',
          },
          {
            time: 'Evening',
            title: 'Baseball — Climax Series / Japan Series',
            description: 'Buy tickets immediately when the matchup is announced via Japan Sports Ticket (japansportsticket.com). If the game\'s in Osaka, you\'re already there. If there\'s no game: Misono Building drinks, more Dotonbori.',
          },
        ],
      },
      {
        day: 10,
        date: 'Sunday, Oct 18',
        label: 'Kobe',
        images: [
          { src: imgWagyu1Src, srcset: imgWagyu1Srcset },
          { src: imgWagyu2Src, srcset: imgWagyu2Srcset },
        ],
        activities: [
          {
            time: 'Morning',
            title: 'Kitano District',
            description: '30 min from Osaka on the Hanshin line. Head straight to Kitano — the old foreign settlement, late 19th century Western architecture scattered across a hillside. Interesting without being overcurated. Quiet, completely different feel to Osaka.',
          },
          {
            time: 'Lunch',
            title: 'Kobe Beef — Mouriya or Kobe Plaisir',
            description: 'Counter seating, watch the chef work the teppan. Mouriya has been doing this since 1945. Kobe Plaisir sources certified Tajima beef direct. Book ahead. Order the sirloin.',
          },
          {
            time: 'Afternoon',
            title: 'Nada Sake District',
            description: 'Japan\'s largest sake-producing area, 20 min east of central Kobe. Hakutsuru and Kiku-Masamune both have free museum tastings open to walk-ins. No appointment needed.',
          },
          {
            time: 'Dinner',
            title: 'Stay in Kobe — Kitano / Tor Road',
            description: 'Kobe\'s port history brought in international residents for generations and the food scene reflects it. Tor Road and the Kitano area: diverse, high-quality, French, Indian, proper Japanese. Dinner here, then last train back to Osaka.',
          },
        ],
      },
    ],
  },
  {
    id: 'hiroshima',
    name: 'Hiroshima',
    nameJa: '広島',
    subtitle: '',
    summary: 'One night. Worth the detour. The Peace Memorial Museum is the whole reason to come — allow two to three hours, don\'t rush it. The Atomic Bomb Dome is ten minutes\' walk. Hiroshima-style okonomiyaki for dinner: layered noodles, cabbage, egg, completely different from the Osaka version. Quieter, more reflective evening — let it be that. Morning is Miyajima: floating torii gate, deer roaming freely, maple trees just turning red. Then four hours on the shinkansen north and you\'re back in Tokyo.',
    dates: 'Oct 19–20',
    nights: 1,
    accentChar: '広',
    theme: {
      bg: '#25201c',
      ink: '#ede8df',
      inkFaint: 'rgba(237,232,223,0.45)',
      accent: '#b89a70',
      border: 'rgba(237,232,223,0.1)',
      image: imgMiyajimaSrc,
      layout: 'hiroshima',
    },
    days: [
      {
        day: 11,
        date: 'Monday, Oct 19',
        label: 'Hiroshima',
        images: [{ src: imgOkonomiyakiSrc, srcset: imgOkonomiyakiSrcset }],
        activities: [
          {
            time: 'Morning',
            title: 'Check out Osaka — Shinkansen to Hiroshima',
            description: '~90 min on the shinkansen. Check in, drop bags.',
          },
          {
            time: 'Afternoon',
            title: 'Peace Memorial Museum + Dome + Park',
            description: 'Allow 2–3 hours. Don\'t rush it. The museum is serious and well done. The Atomic Bomb Dome is ten minutes\' walk from the museum. Peace Memorial Park surrounds both — take the time.',
          },
          {
            time: 'Evening',
            title: 'Hiroshima-style Okonomiyaki',
            description: 'Layered: noodles, cabbage, pork, egg, sauce — completely different from the Osaka version. Hassei is the name, or wander Nagarekawa entertainment district for something more local. Quieter evening after a heavy afternoon.',
          },
        ],
      },
      {
        day: 12,
        date: 'Tuesday, Oct 20',
        label: 'Miyajima + Travel to Tokyo',
        images: [{ src: imgMiyajimaSrc, srcset: imgMiyajimaSrcset }],
        activities: [
          {
            time: 'Early morning',
            title: 'Miyajima',
            description: 'Train to Miyajimaguchi (30 min from Hiroshima), JR ferry to Miyajima (10 min, JR Pass covers it). Check tide times in advance — the floating torii at high tide is the shot. Deer roam freely. Eat momiji manju immediately. Allow a couple of hours.',
          },
          {
            time: 'Late morning',
            title: 'Shinkansen Hiroshima → Tokyo',
            description: '~4 hours. Window seat on the right for Fuji. Buy a proper station bento before boarding.',
          },
          {
            time: 'Evening',
            title: 'Arrive Ueno — Ameyoko + early night',
            description: 'Check in. Walk Ameyoko market street for food and a beer. Early night — full day tomorrow.',
          },
        ],
      },
    ],
  },
  {
    id: 'tokyo-ii',
    name: 'Tokyo II',
    nameJa: '東京',
    subtitle: 'Ueno · Akihabara',
    summary: 'Back in Tokyo for five nights, based in Ueno. Arrive late on Tuesday after Miyajima and four hours on the shinkansen — drop bags, walk Ameyoko, early night. Then: sumo stable practice at 6:30am, a full day in Akihabara, Asakusa before the crowds, Nakano Broadway for a serious half-day, wagyu yakiniku for the group, a day trip to Nikko when the autumn foliage is at its peak. Last evening is either baseball or the six-seat sushi counter — ¥20,000+, book before leaving Sweden. Duck ramen on the morning of departure. Then Haneda.',
    dates: 'Oct 20–25',
    nights: 5,
    accentChar: '二',
    theme: {
      bg: '#0a0a1e',
      ink: '#e0eaff',
      inkFaint: 'rgba(224,234,255,0.4)',
      accent: '#00f5ff',
      border: 'rgba(0,245,255,0.15)',
      image: imgTokyoII,
      layout: 'akihabara',
    },
    days: [
      {
        day: 13,
        date: 'Wednesday, Oct 21',
        label: 'Sumo + Akihabara',
        images: [
          { src: imgGameboySrc, srcset: imgGameboySrcset },
          { src: imgTokyoStreetSrc, srcset: imgTokyoStreetSrcset },
          { src: imgClawMachineSrc, srcset: imgClawMachineSrcset },
        ],
        activities: [
          {
            time: '6:30am',
            title: 'Arashio-beya Sumo Practice',
            description: 'Leave Ueno at 6:30am to Ryogoku. Free, walk-in, watching actual sumo wrestlers train is as unusual as it sounds. Back by 9am. Check the calendar in advance — practice isn\'t always open.',
          },
          {
            time: 'All day',
            title: 'Akihabara',
            description: 'Super Potato for retro games, Yodobashi Akiba for electronics, Mandarake for vintage anime merch and figures. Lunch at Menzin — wagyu paitan ramen at ¥1,000, opened 2025. Taito Station arcade in the afternoon.',
          },
          {
            time: 'Night',
            title: 'SEGA Arcade + Ameyoko izakayas',
            description: 'SEGA arcade until late. Then izakayas under the Ameyoko train tracks — cheap, local, extremely good.',
          },
        ],
      },
      {
        day: 14,
        date: 'Thursday, Oct 22',
        label: 'Asakusa + Nakano + Wagyu',
        images: [
          { src: imgWagyuGrillSrc, srcset: imgWagyuGrillSrcset },
          { src: imgWagyuSlicesSrc, srcset: imgWagyuSlicesSrcset },
        ],
        activities: [
          {
            time: 'Morning',
            title: 'Senso-ji → Kappabashi',
            description: 'Before 8am — completely different before the crowds. Walk through Kappabashi Kitchen Town after: Kama-Asa for anyone wanting a serious knife (better selection than Sakai for certain styles).',
          },
          {
            time: 'Afternoon',
            title: 'Nakano Broadway',
            description: '20 min on the Chuo line. Four floors of retro game shops, figures, vintage manga, model kits. More authentic and considerably less chaotic than Akihabara — the serious collectors come here. Mandarake has its best branch in this building. Allow a full half-day. Bring cash.',
          },
          {
            time: 'Evening',
            title: 'Wagyu Yakiniku — Ebisu or Nakameguro',
            description: 'Group dinner. Grill your own wagyu at the table — proper cuts, cold beer throughout, no ceremony. Worth the short train ride from Ueno. Drinks along Nakameguro canal after.',
          },
        ],
      },
      {
        day: 15,
        date: 'Friday, Oct 23',
        label: 'Nikko Day Trip',
        images: [{ src: imgBaseballSrc, srcset: imgBaseballSrcset }],
        activities: [
          {
            time: '7am',
            title: 'Tobu Asakusa → Nikko',
            description: 'Leave Ueno at 7am to Tobu Asakusa Station, then limited express to Tobu-Nikko (~1h50). Buy the Nikko Pass at Asakusa. Shinkyo Bridge, Toshogu Shrine, Taiyuin Temple, Kanmangafuchi Abyss. Mid-October is peak autumn foliage in the mountains — this is the timing.',
          },
          {
            time: 'Afternoon',
            title: 'Back to Ueno',
            description: 'Lunch in Nikko town (limited options — bring snacks as backup). Back in Ueno by early evening.',
          },
          {
            time: 'Evening',
            title: 'Chanko-nabe — Ryogoku',
            description: 'Dinner at Tomoegata — run by a former sumo stable. The wrestler\'s protein hotpot, proper and excellent. Sumo museum wander after (free, inside Kokugikan arena). Early night before the last full day.',
          },
        ],
      },
      {
        day: 16,
        date: 'Saturday, Oct 24',
        label: 'Last Day',
        images: [
          { src: imgChefTunaSrc, srcset: imgChefTunaSrcset },
          { src: imgNigiriSrc, srcset: imgNigiriSrcset },
          { src: imgRamenSrc, srcset: imgRamenSrcset },
        ],
        activities: [
          {
            time: 'Morning',
            title: 'Ramen Kamo to Negi',
            description: 'Duck broth, Ueno, open from 9am. Only three ingredients. One of the best things you\'ll eat all trip. Get there.',
          },
          {
            time: 'Afternoon',
            title: 'Ameyoko + last sweep',
            description: 'Last souvenirs, Ameyoko market wander. Final Akihabara run if anyone wants it. Or just sit somewhere and enjoy Tokyo. Pack and store bags at the hotel.',
          },
          {
            time: 'Evening',
            title: 'Baseball or Golden Gai',
            description: 'If the Climax Series or Japan Series has a game tonight — perfect last evening. Buy tickets the moment the matchup is announced via Japan Sports Ticket. If no game: Golden Gai one last time, or Shibuya / Ebisu.',
          },
          {
            time: 'Evening',
            title: 'Asakusa Sushi Kappō',
            description: '6 counter seats. Book the early sitting (6–7pm) before leaving Sweden. ¥20,000+. Sit at the counter, watch the chef work, eat the best sushi of your life. NOTE: if baseball and omakase clash, move omakase to Oct 23 after returning from Nikko.',
          },
          {
            time: 'Late',
            title: 'One final cold Sapporo — then Haneda',
            description: 'Bags from hotel. Ueno to Haneda is 40 min on the Keikyu line. Allow at least 2.5 hours before the 00:35 departure — international terminal, October is busy. Then home.',
          },
        ],
      },
    ],
  },
]
