import imgTokyoI from '../img/photo-1573455494060-c5595004fb6c.avif'
import imgKyoto from '../img/photo-1558862107-d49ef2a04d72.avif'
import imgTokyoII from '../img/photo-1576376365962-1fc6c74d5ff6.avif'

// New images
import imgAlleywaySrc from '../img/alleyway.jpeg'
import imgAlleywaySrcset from '../img/alleyway.jpeg?w=280;560&format=webp&as=srcset'
import imgBeer1Src from '../img/beer1.jpeg'
import imgBeer1Srcset from '../img/beer1.jpeg?w=280;560&format=webp&as=srcset'
import imgBeer2Src from '../img/beer2.jpeg'
import imgBeer2Srcset from '../img/beer2.jpeg?w=280;560&format=webp&as=srcset'
import imgBeer3Src from '../img/beer3.jpeg'
import imgBeer3Srcset from '../img/beer3.jpeg?w=280;560&format=webp&as=srcset'
import imgClawMachineSrc from '../img/claw-machine.jpeg'
import imgClawMachineSrcset from '../img/claw-machine.jpeg?w=280;560&format=webp&as=srcset'
import imgMiyajimaSrc from '../img/Miyajima.jpeg'
import imgMiyajimaSrcset from '../img/Miyajima.jpeg?w=280;560&format=webp&as=srcset'
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
  /** Machine-readable date (YYYY-MM-DD) — drives the "today" highlight on the trip. */
  isoDate: string
  date: string
  label: string
  /** Overrides the "Day N" heading. Used by the travel day out of Stockholm. */
  dayName?: string
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
    summary: 'It starts at Arlanda, 09:35 on Thursday Oct 29 — you land in Tokyo the next morning. Four nights in Shinjuku from there. Suica at the airport, capsule hotel for a few hours, then Shinjuku. Samurai Restaurant in Kabukicho at 16:20 (booked) to beat the jet lag, then Omoide Yokocho for a short first evening: smoky yakitori alley, cold Sapporo, strangers. Day two hits hard: Meiji Shrine first thing, Harajuku and Omotesando through the morning, tonkatsu at Maisen, then Shibuya in the evening — cross the scramble at street level and up to Shibuya Sky for the city lights from 50 floors. Book timed entry in advance. Day three is the gaming deep-dive: Akihabara in the morning — Super Potato, Yodobashi, Mandarake — then Ginza in the afternoon for the total change of pace, Hokosha Tengoku turning the main street pedestrian-only on Sundays. Evening: small-bar karaoke near Golden Gai, then the crawl itself. Day four goes south: kimukatsu in Ebisu at opening, the Yebisu Museum of Beer at noon, then the Nakameguro canal and Daikanyama through the afternoon. Back through Shinjuku for Nakano Broadway, the serious collectors\' version of Akihabara, then ramen wherever looks good for dinner. Last evening before the Shinkansen west.',
    dates: 'Oct 29 – Nov 3',
    nights: 4,
    accentChar: '一',
    theme: {
      bg: '#ff2d55',
      ink: '#0f0f0f',
      inkFaint: '#2e0510',
      accent: '#1a0304',
      border: 'rgba(0,0,0,0.15)',
      image: imgTokyoI,
      layout: 'tokyo-i',
    },
    days: [
      {
        day: 0,
        dayName: 'Departure',
        date: 'Thursday, Oct 29',
        isoDate: '2026-10-29',
        label: 'ARN → Tokyo',
        activities: [
          {
            time: '06:30',
            title: 'Arlanda — be early',
            description: 'Meet at Terminal 5, three hours before the wheels leave the ground. Long-haul check-in and security on a Thursday morning is not the queue to gamble on. Nothing sharp in hand luggage — the knives get bought in Japan and flown home in the hold.',
          },
          {
            time: '09:35',
            title: 'Wheels up — ARN → Tokyo',
            description: 'The trip starts here. Japan is 8 hours ahead of Sweden, so you leave Thursday morning and land Friday morning. Set your watch to Tokyo time the moment you sit down and start living on it — sleep the back half of the flight, not the front.',
          },
          {
            time: 'Before you fly',
            title: 'Visit Japan Web',
            description: 'Register at vjw-lp.digital.go.jp and generate your immigration and customs QR codes before leaving home. Two minutes on the sofa saves twenty in the arrivals hall. Screenshot the codes — airport wifi is not a plan.',
          },
          {
            time: 'Overnight',
            title: 'In the air',
            description: 'Eat when they feed you, drink water, then sleep. You land into a full day — Friday in Tokyo is not a rest day, and Omoide Yokocho is waiting that same evening.',
          },
        ],
      },
      {
        day: 1,
        date: 'Friday, Oct 30',
        isoDate: '2026-10-30',
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
            description: 'Keikyu line from Haneda Terminal 3 to Shinjuku — about 35 min, one change at Sengakuji. Check into &Here SHINJUKU, check-in from 15:00, drop bags. Convenience store lunch, slow wander. No agenda.',
          },
          {
            time: '16:20',
            title: 'Samurai Restaurant — Kabukicho · BOOKED',
            description: 'High-energy show in Kabukicho, the spiritual successor to the old Robot Restaurant. Glittering costumes, choreographed sword fights, dance, lights, noise. Show ends around 17:30–18:00. It\'s on arrival day on purpose: loud and stimulating enough to keep everyone awake through the jet lag instead of crashing at 6pm. The food isn\'t the point, so eat after.',
          },
          {
            time: 'Evening',
            title: 'Omoide Yokocho',
            description: 'Smoky yakitori alley a 2-min walk from Shinjuku Station west exit, a few minutes from the show. Squeeze into a stall, order skewers and cold Sapporo, eat with strangers. Keep it short tonight.',
          },
          {
            time: 'Late',
            title: 'Golden Gai — only if there\'s energy',
            description: 'One drink if anyone\'s still standing, otherwise straight to bed. You\'ve been awake for 24 hours and tomorrow is a full day.',
          },
        ],
      },
      {
        day: 2,
        date: 'Saturday, Oct 31',
        isoDate: '2026-10-31',
        label: 'Harajuku + Shibuya Sky',
        images: [{ src: imgShibuyaAerialSrc, srcset: imgShibuyaAerialSrcset }],
        activities: [
          {
            time: 'Morning',
            title: 'Meiji Shrine',
            description: 'Forested, peaceful, genuinely calming after the flight. Free entry, 20 min from Shinjuku. Go early before it fills up.',
          },
          {
            time: 'Morning',
            title: 'Harajuku — Takeshita Street → Cat Street → Omotesando',
            description: 'Takeshita Street for the spectacle — chaotic, colourful, worth seeing once. Then Cat Street running parallel — independent shops, good coffee, completely different energy. Down to Omotesando for the upscale end of the same neighbourhood, architecture, window shopping.',
          },
          {
            time: 'Lunch',
            title: 'Maisen — Tonkatsu',
            description: 'Omotesando institution. Thick-cut pork, kuroge wagyu katsu set. Worth any wait.',
          },
          {
            time: 'Afternoon',
            title: 'Omotesando → Daikanyama → Shibuya',
            description: 'Walk south through Omotesando Hills, then down to Daikanyama — quieter neighbourhood, vintage shops, good coffee, independent boutiques. From Daikanyama it\'s one stop or a 20-min walk to Shibuya. Pace it so you arrive in Shibuya as the sun goes down.',
          },
          {
            time: 'Evening',
            title: 'Shibuya Scramble + Shibuya Sky',
            description: 'Cross the scramble at street level first — the crossing in person is different from every photo you\'ve seen. Then up to Shibuya Sky for the city lights coming on from 50 floors. Book timed entry in advance — Oct 31 is a Saturday and it will sell out. Open until 10:30pm. Drinks in Shibuya after or head back to Golden Gai.',
          },
        ],
      },
      {
        day: 3,
        date: 'Sunday, Nov 1',
        isoDate: '2026-11-01',
        label: 'Akihabara + Ginza',
        images: [
          { src: imgTokyoShowSrc, srcset: imgTokyoShowSrcset },
          { src: imgTokyoCatScreenSrc, srcset: imgTokyoCatScreenSrcset },
          { src: imgBeer1Src, srcset: imgBeer1Srcset },
        ],
        activities: [
          {
            time: 'Morning / Day',
            title: 'Akihabara',
            description: 'First proper taste of Akihabara. Super Potato for retro games across multiple floors, Yodobashi Akiba for electronics, Mandarake for vintage anime merch and figures. Taito Station arcade if anyone wants to play. Don\'t buy everything — you\'ll be back for a full day in Tokyo II. Today is about getting your bearings and having fun.',
          },
          {
            time: 'Lunch',
            title: 'Menzin Ramen',
            description: 'Wagyu Paitan ramen ¥1,000. Opened 2025, run by a former MMA champion. Akihabara.',
          },
          {
            time: 'Afternoon',
            title: 'Ginza — Hokosha Tengoku',
            description: 'Short train ride from Akihabara (~15–20 min via Hibiya line). Sundays the main street closes to traffic (Hokosha Tengoku, roughly 12:00–17:00), turning Ginza into a pedestrian-only zone. Flagship stores — Uniqlo, Muji, Itoya stationery — plus people-watching and a coffee/matcha break. A different pace and feel from Akihabara, good contrast in the same afternoon.',
          },
          {
            time: 'Evening',
            title: 'Karaoke → Golden Gai',
            description: 'Head back to Shinjuku. Small local bar-style karaoke near Golden Gai — not a commercial box. Ten people, one mic, strangers applauding. Then Golden Gai crawl.',
          },
        ],
      },
      {
        day: 4,
        date: 'Monday, Nov 2',
        isoDate: '2026-11-02',
        label: 'Nakano + Yebisu + Nakameguro',
        images: [
          { src: imgRamen2Src, srcset: imgRamen2Srcset },
        ],
        activities: [
          {
            time: '11:00 — Lunch',
            title: 'Kimukatsu Ebisu Honten',
            description: '4 min walk from Ebisu Station. The signature is kimukatsu — tonkatsu built from many thin layers of pork instead of one thick cut, basically a pork millefeuille. Seven flavours to pick from. Opens 11:00 daily, so be there at the door.',
          },
          {
            time: '12:00',
            title: 'Yebisu Museum of Beer',
            description: 'Yebisu Garden Place, a few minutes from lunch. Monday hours start at 12:00, so it lines up straight after the tonkatsu. Museum and taproom are walk-in; the guided tour (~¥1,800) needs an advance reservation. Cashless only — bring a card or Suica.',
          },
          {
            time: 'Afternoon',
            title: 'Nakameguro + Daikanyama',
            description: 'Walk the Nakameguro canal: boutiques, cafés, slow browsing. Daikanyama is a short walk on. Go for T-SITE, the bookstore, which is worth seeing for the building even if you can\'t read a word, and a few good record shops for anyone hunting vinyl.',
          },
          {
            time: 'Late afternoon',
            title: 'Nakano Broadway',
            description: 'Short train ride back through Shinjuku. Retro gaming, collectibles, figures, vintage toys, floor after floor of it. Mandarake has its best branch here, with better stock and prices than Akihabara. Bring cash.',
          },
          {
            time: 'Evening',
            title: 'Dinner: ramen somewhere spontaneous',
            description: 'No booking. Wherever has a queue of locals and a ticket machine by the door — Nakano has plenty around the station before you head back to Shinjuku.',
          },
          {
            time: 'Late',
            title: 'Golden Gai',
            description: 'If there\'s energy left. Don\'t go too hard: it\'s an early Kyoto train tomorrow and bags still need packing. &Here SHINJUKU checkout is 11:00.',
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
    summary: 'Three nights arriving Tuesday Nov 3 — quieter than the weekend, good timing. Drop bags at TSUGU Kyoto Sanjo first, then Nishiki Market for lunch and a soft landing into the city — Teramachi arcades or the Manga Museum after, depending on energy. Evening: wagyu counter in Pontocho (booked), drinks at Bar Pontostand. Day two starts at Fushimi Inari at 6am before anyone shows up, sake district after, Kiyomizu-dera as the maples begin to turn — then the afternoon is yours. Simple dinner, no booking, and Funaoka Onsen or the Kodai-ji night light-up if there\'s anything left. Day three: teamLab Biovortex by Kyoto Station in the morning, then the Nintendo Museum in Uji — confirmed and paid, 15:30 entry, passports in pocket — followed by an evening walk through Gion. Bags go ahead to Osaka that day, so leaving day is light: Nara on the way.',
    dates: 'Nov 3–6',
    nights: 3,
    accentChar: '古',
    theme: {
      bg: '#1a3a2a',
      ink: '#f0ede6',
      inkFaint: 'rgba(240,237,230,0.6)',
      accent: '#a8e063',
      border: 'rgba(255,255,255,0.12)',
      image: imgKyoto,
      layout: 'kyoto',
    },
    days: [
      {
        day: 5,
        date: 'Tuesday, Nov 3',
        isoDate: '2026-11-03',
        label: 'Arrival',
        images: [
          { src: imgWagyuKatsuSrc, srcset: imgWagyuKatsuSrcset },
          { src: imgBeer2Src, srcset: imgBeer2Srcset },
        ],
        activities: [
          {
            time: 'Morning',
            title: 'Shinkansen Tokyo → Kyoto',
            description: 'Aim for a ~9:00 departure from Tokyo, arriving Kyoto around 11:00. Good timing — plenty of daylight left on arrival. Grab an ekiben at Shinjuku before boarding.',
          },
          {
            time: 'Midday',
            title: 'Drop Bags at Hotel First',
            description: 'Head straight to TSUGU Kyoto Sanjo to drop luggage before doing anything else — Nishiki Market is narrow and crowded, not the place to be hauling suitcases. Most hotels will hold bags even before the official 15:00 check-in.',
          },
          {
            time: 'Midday',
            title: 'Nishiki Market',
            description: 'Covered food market, walking distance from the hotel. Graze through — Kyoto pickles, yuba, skewered octopus, sweet potato ice cream. This is lunch. Light and easy after a train journey, not a heavy "sight" — a good soft landing into Kyoto.',
          },
          {
            time: 'Midday',
            title: 'Nishiki Tenmangu Shrine',
            description: 'Small shrine right at one end of the market itself. A few minutes, easy to fold in without taking time from anything else.',
          },
          {
            time: 'Afternoon — Option A',
            title: 'Teramachi & Shinkyogoku Arcades',
            description: 'Covered shopping streets connected directly to Nishiki. Good for continuing to stroll and browse without anything scheduled.',
          },
          {
            time: 'Afternoon — Option B',
            title: 'Kyoto International Manga Museum',
            description: '15–20 min walk from Nishiki, open Tuesdays. Large manga collection, lawn to sit and relax on, much slower pace than a castle. Fits the gaming/pop-culture theme of the trip.',
          },
          {
            time: 'Evening',
            title: 'Wagyu Dinner — Kyo-Yakiniku HIRO Pontocho Annex',
            description: '19:00. Booked — 4 adults, Omakase Hiro course (¥8,000). Pontocho. A strong, relaxed start to Kyoto\'s food scene. Bar Pontostand nearby afterward for a nightcap if there\'s energy — bilingual sake bar, run by Mako and Taku, rotating Kyoto sake selection.',
          },
        ],
      },
      {
        day: 6,
        date: 'Wednesday, Nov 4',
        isoDate: '2026-11-04',
        label: 'Fushimi + Kiyomizu',
        images: [
          { src: imgFushimiInariSrc, srcset: imgFushimiInariSrcset },
          { src: imgKyotoPagodaSrc, srcset: imgKyotoPagodaSrcset },
        ],
        activities: [
          {
            time: '6am',
            title: 'Fushimi Inari',
            description: 'Thousands of torii gates winding up a forested mountain. Otherworldly in the early morning mist. Turn back at the Yotsutsuji intersection (~30 min up) rather than going to the summit — plenty more day ahead.',
          },
          {
            time: 'Morning',
            title: 'Fushimi Sake District',
            description: 'Over 30 breweries within walking distance. Gekkeikan Okura Museum, then Kizakura and Kinshi Masamune. Buy a cold cup of nigori from a brewery vending machine and drink it in the street. Keep it to one or two breweries — Kiyomizu-dera next.',
          },
          {
            time: 'Late Morning / Early Afternoon',
            title: 'Kiyomizu-dera',
            description: 'Natural continuation from the Fushimi Inari area — both sit on Kyoto\'s eastern side. Early November maples will be starting to turn. The wooden stage looking out over the city is genuinely spectacular. Allow 1.5–2 hours.',
          },
          {
            time: 'Afternoon',
            title: 'Free afternoon',
            description: 'Nothing booked — you\'ve been up since before 6. Options: stroll down Ninenzaka and Sannenzaka from Kiyomizu towards Gion, Nijo Castle (last entry ~16:00, so go straight there if that\'s the pick), or back to the hotel to rest and reset.',
          },
          {
            time: 'Evening',
            title: 'Dinner — keep it simple',
            description: 'No booking, decide on the day. Kyoto ramen, an izakaya, or obanzai — Kyoto home cooking, a counter of small plates. The big wagyu dinner was last night; tonight is about cold beer and not trying too hard.',
          },
          {
            time: 'Late — Options',
            title: 'Kodai-ji light-up · Funaoka Onsen · K-Ya Bar',
            description: 'Kodai-ji autumn night light-up: the temple garden lit after dark, ~¥600, runs roughly late Oct to mid Dec — dates unconfirmed, verify before going. Funaoka Onsen: historic 1923 bathhouse in Kuramaguchi, Meiji-era wooden interior, mosaic tiles, outdoor bath, almost entirely local clientele. ~¥500, open until midnight, 20 min by bus from central Kyoto. Check the tattoo policy. K-Ya Bar in Pontocho to finish — vast single malt whisky list.',
          },
        ],
      },
      {
        day: 7,
        date: 'Thursday, Nov 5',
        isoDate: '2026-11-05',
        label: 'teamLab + Nintendo Museum',
        activities: [
          {
            time: 'Morning',
            title: 'Luggage — hand bags to TSUGU reception',
            description: 'Before heading out, hand the big bags to TSUGU reception for forwarding to &Here OSAKA NAMBA, delivery Nov 6, ~¥1,000–2,000 per bag. Keep an overnight bag, passports and chargers in the day bag — you sleep one more night in Kyoto without your suitcase.',
          },
          {
            time: '~10:00',
            title: 'teamLab Biovortex Kyoto',
            description: '7–8 min walk from the Hachijo East exit of Kyoto Station. Open 9:00–21:00, last entry 19:30. ~¥3,400–4,000 — book online (+¥200 on site). Allow 2–3 hours. Closed days vary, so check the official site for Nov 5. Yamazaki Distillery only replaces this if a reallocated tour slot shows up.',
          },
          {
            time: 'Lunch',
            title: 'Near Kyoto Station → Ogura',
            description: 'Eat around the station, then the Kintetsu Kyoto Line to Ogura (~20 min). The museum is a 5-min walk from the east exit.',
          },
          {
            time: '15:30–16:00',
            title: 'Nintendo Museum — Uji · CONFIRMED',
            description: 'Entry 15:30–16:00 JST. Confirmed and paid — tickets secured via waitlist selection. Bring passports: names are checked against the tickets. Interactive exhibits spanning Nintendo\'s entire history, playable installations, exclusive merch. Allow 3 hours minimum.',
          },
          {
            time: 'Evening',
            title: 'Gion walk + dinner',
            description: 'Back to Kyoto. Evening walk through Gion, dinner somewhere in Pontocho or Gion. Decompress after a full day.',
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
    summary: 'The food city. Louder than Kyoto, cheaper than Tokyo, completely fine with both. Arrive via Nara on day one, walk straight into Dotonbori, eat everything. Day two: Katsuoji Temple in the Minoh mountains, covered in thousands of daruma dolls and autumn foliage, then Nipponbashi in the afternoon and a proper wagyu dinner at night. Third day is a relaxed morning at Osaka Castle before the Osaka Derby — Gamba Osaka vs Cerezo Osaka at Panasonic Stadium Suita, one of the most intense football atmospheres in Japan — then west to Hiroshima.',
    dates: 'Nov 6–9',
    nights: 3,
    accentChar: '食',
    theme: {
      bg: '#ff6a00',
      ink: '#0f0f0f',
      inkFaint: 'rgba(15,15,15,0.78)',
      accent: '#0f0f0f',
      border: 'rgba(0,0,0,0.15)',
      image: imgOsakaHero,
      layout: 'osaka',
    },
    days: [
      {
        day: 8,
        date: 'Friday, Nov 6',
        isoDate: '2026-11-06',
        label: 'Arrive via Nara',
        images: [
          { src: imgNaraPagodaSrc, srcset: imgNaraPagodaSrcset },
          { src: imgDotonboriAngleSrc, srcset: imgDotonboriAngleSrcset },
          { src: imgBeer3Src, srcset: imgBeer3Srcset },
        ],
        activities: [
          {
            time: 'Morning',
            title: 'Check out light — bags already sent',
            description: 'Big bags went to TSUGU reception yesterday and are on their way to &Here OSAKA NAMBA for delivery today. Check out of TSUGU (10:00) with day bags only.',
          },
          {
            time: 'Morning',
            title: 'Kyoto → Nara',
            description: '45 min on the Kintetsu line. Quick visit — Todai-ji for the giant Buddha, Nara Park for the deer. Hundreds of them roaming completely freely — they bow, they steal food, they have zero respect for personal space. Grab lunch in Naramachi district before leaving. Keep it to 2–3 hours total — you\'re passing through, not staying.',
          },
          {
            time: 'Afternoon',
            title: 'Nara → Osaka',
            description: 'Kintetsu line direct Nara → Osaka Namba (~50 min). Check into &Here OSAKA NAMBA, check-in from 15:00 — bags already waiting at the hotel. Freshen up, head straight out.',
          },
          {
            time: 'Evening',
            title: 'Dotonbori Food Crawl',
            description: 'Walk the length of Dotonbori and eat everything. Takoyaki from a street stall, eat standing at the canal. Loud, chaotic, completely correct for a first Osaka night.',
          },
          {
            time: 'Late',
            title: 'Shinsekai — Kushikatsu Daruma + Misono Building',
            description: 'Short taxi or subway to Shinsekai. Kushikatsu Daruma — original branch, standing bar, deep-fried skewers of everything, dip once in the communal sauce. No double dipping. It\'s the law. Cold Asahi on draught. Drinks at Misono Building after — Osaka\'s answer to Golden Gai, small bars stacked on every floor, each with its own personality.',
          },
        ],
      },
      {
        day: 9,
        date: 'Saturday, Nov 7',
        isoDate: '2026-11-07',
        label: 'Osaka',
        images: [
          { src: imgOsakaCastleSrc, srcset: imgOsakaCastleSrcset },
          { src: imgShinsekaISrc, srcset: imgShinsekaISrcset },
          { src: imgDotonboriAsahiSrc, srcset: imgDotonboriAsahiSrcset },
        ],
        activities: [
          {
            time: 'Morning',
            title: 'Katsuoji Temple — Temple of Winner\'s Luck',
            description: 'Leave hotel by 8am. Midosuji line to Minoh-Kayano Station (~35 min), then bus 30 to the temple (~25 min). ¥500 entry. 1,300-year-old temple known as the Temple of Winner\'s Luck, set high in the Minoh mountains. Thousands of daruma dolls covering every surface — walls, trees, lanterns, stacked as far as you can see. Scenic mountain setting with koi ponds, vermillion pagoda and mist-covered bridges. Early November autumn foliage in the surrounding mountains will be spectacular — go early before the crowds arrive, buses fill up fast on weekends. Allow 3–4 hours on site. Back in Osaka by 1pm. Nothing else on the trip looks like this.',
          },
          {
            time: 'Afternoon',
            title: 'Nipponbashi — Den Den Town',
            description: 'Osaka\'s electronics and anime district. Retro games, figures, manga, electronics — everything Akihabara has but less crowded and more local. Good for a few hours of browsing. For lunch, Kuromon Ichiba Market is a short walk away — a proper Osaka food market, graze the stalls for sushi, wagyu skewers, oysters. Keep it light — the big wagyu dinner is tonight.',
          },
          {
            time: 'Evening',
            title: 'Wagyu Dinner — Matsuzaka Gyu Yakiniku M',
            description: 'Hozenji-Yokocho, 19:00. Booked in advance. Grill-your-own Matsuzaka beef, one of Japan\'s most prized wagyu grades alongside Kobe and Omi. A proper anchor dinner for the Osaka leg.',
          },
          {
            time: 'Late',
            title: 'Tennoji izakayas',
            description: 'Different angle after dinner. Tennoji is the next neighbourhood over from Shinsekai — local salaryman izakayas, no English menus, almost no tourists. Pick somewhere that looks busy, point at what the next table is having. Cheap beer, end the night before midnight. One more day in Osaka tomorrow — the derby.',
          },
        ],
      },
      {
        day: 10,
        date: 'Sunday, Nov 8',
        isoDate: '2026-11-08',
        label: 'Osaka Derby',
        activities: [
          {
            time: 'Morning',
            title: 'Osaka Castle (Relaxed Morning)',
            description: '15 min from the hotel. Don\'t bother going inside — the exterior and grounds are the thing. Early-November autumn colour in the surrounding park will be starting to turn. Walk the moat, find a coffee, take your time. Back by 11:30 with plenty of room before the 12:00–12:15 departure for Suita — a derby day is not the morning to overdo it.',
          },
          {
            time: 'Afternoon',
            title: 'OSAKA DERBY — Gamba Osaka vs Cerezo Osaka',
            description: 'Panasonic Stadium Suita. One of the most intense football atmospheres in Japan — the stadium was funded by 45,000 individual supporter donations. Kick-off typically 14:00–15:00, check the exact time closer to the date. Not walking distance from the hotel — Midosuji line from Namba to Senri-Chuo (~30 min), then the Osaka Monorail to Banpaku-kinen-koen (~10 min), then a 15-min walk or match-day shuttle bus to the stadium. Roughly 60–70 min door to door. Leave Namba by 12:00–12:15 for a 14:00 kickoff — gets you there with time to soak the atmosphere rather than sprinting in late. Buy tickets via the J.League ticket system once fixtures are confirmed.',
          },
          {
            time: 'Evening',
            title: 'Third night in Osaka',
            description: '&Here OSAKA NAMBA is booked through Nov 9 regardless of how the derby tickets land. Post-match food and drinks around Namba, take it easy — Hiroshima tomorrow.',
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
    summary: 'One night, everyone together. Shinkansen out of Osaka late morning, and the afternoon goes to Peace Memorial Park, the A-Bomb Dome and the museum — heavy, important, and the reason to come. Then the antidote: Hiroshima-style okonomiyaki, noodles and cabbage layered on the griddle, cold beer. Next morning is Miyajima — the floating torii, Itsukushima Shrine, deer with no manners — before the Nozomi back to Tokyo.',
    dates: 'Nov 9–10',
    nights: 1,
    accentChar: '島',
    theme: {
      bg: '#1a1650',
      ink: '#ede8ff',
      inkFaint: 'rgba(237,232,255,0.55)',
      accent: '#f5c842',
      border: 'rgba(237,232,255,0.1)',
      image: imgMiyajimaSrc,
      layout: 'hiroshima',
    },
    days: [
      {
        day: 11,
        date: 'Monday, Nov 9',
        isoDate: '2026-11-09',
        label: 'Hiroshima',
        images: [{ src: imgOkonomiyakiSrc, srcset: imgOkonomiyakiSrcset }],
        activities: [
          {
            time: '11:00',
            title: 'Check out — &Here OSAKA NAMBA',
            description: 'Bags packed, out by 11:00. Midosuji line from Namba to Shin-Osaka, ~15 min.',
          },
          {
            time: 'Midday',
            title: 'Shinkansen Shin-Osaka → Hiroshima',
            description: '~1h25–1h30. Everyone goes together. Grab an ekiben at Shin-Osaka, drop bags at the hotel on arrival.',
          },
          {
            time: 'Afternoon',
            title: 'Peace Memorial Park · A-Bomb Dome · Peace Memorial Museum',
            description: 'The A-Bomb Dome first, across the river from the park, then walk through to the museum. Give the museum a couple of hours and don\'t rush it. It\'s the heaviest stop of the trip and worth every minute.',
          },
          {
            time: 'Evening',
            title: 'Hiroshima-style okonomiyaki',
            description: 'Not the Osaka version: batter, a mountain of cabbage, pork, yakisoba noodles and egg, layered and pressed on the griddle in front of you. Okonomimura near Hondori is a building full of stalls, so pick a counter and sit down. Cold beer, then a drink or two in Nagarekawa if there\'s energy.',
          },
          {
            time: 'Overnight',
            title: 'Hiroshima hotel',
            description: 'Booked. Name to be added.',
          },
        ],
      },
      {
        day: 12,
        date: 'Tuesday, Nov 10',
        isoDate: '2026-11-10',
        label: 'Miyajima + Shinkansen',
        images: [{ src: imgMiyajimaSrc, srcset: imgMiyajimaSrcset }],
        activities: [
          {
            time: 'Early morning',
            title: 'Bags first',
            description: 'Check out and leave bags at the hotel, or put them in lockers at Hiroshima Station on the way out. Don\'t drag suitcases onto the ferry.',
          },
          {
            time: 'Morning',
            title: 'Miyajima',
            description: 'JR to Miyajimaguchi (~30 min), then the ferry across (~10 min). The floating torii gate, Itsukushima Shrine on its stilts over the water, and free-roaming deer that will eat your map. The torii only floats at high tide — check the tide table the night before. Grilled oysters or momiji manju from the shopping street if you\'re hungry.',
          },
          {
            time: '~13:00',
            title: 'Back at Hiroshima Station',
            description: 'Ferry and JR back, collect bags. Buy a bento for the ride.',
          },
          {
            time: 'Afternoon',
            title: 'Nozomi Hiroshima → Tokyo',
            description: '~3h50–4h. Sit on the E-seat side (left side heading to Tokyo) for Mt Fuji — it shows up around Shin-Fuji, about 40–45 minutes before Tokyo, though by then it may be close to dusk. Change at Tokyo for Ueno, a few minutes up the line.',
          },
          {
            time: 'Evening',
            title: 'Ueno — check in + Ameyoko',
            description: 'Arrive early evening, check into &Here TOKYO UENO, drop bags. Straight out to Ameyoko under the train tracks — street food, stand-up skewers, a cold beer. Back in Tokyo.',
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
    summary: 'Back in Tokyo for the final leg, based in Ueno. Four nights — you roll in from Hiroshima on the Tuesday evening and go straight to Ameyoko. Akihabara gets the full day it deserves, no first-pass compromises, ending at the SEGA arcade and the izakayas under the tracks. Senso-ji before the crowds and Kappabashi for knives, then an afternoon left open. Friday is a flex day with nothing fixed — record shops in Shibuya and Shimokitazawa, last shopping, a return to whichever bar earned it. Last day is a calm one — Ueno Park, Ameyoko, a farewell dinner — then Haneda for the 00:30 flight.',
    dates: 'Nov 10–14',
    nights: 4,
    accentChar: '二',
    theme: {
      bg: '#0a0a1e',
      ink: '#e0eaff',
      inkFaint: 'rgba(224,234,255,0.55)',
      accent: '#00f5ff',
      border: 'rgba(0,245,255,0.15)',
      image: imgTokyoII,
      layout: 'akihabara',
    },
    days: [
      {
        day: 13,
        date: 'Wednesday, Nov 11',
        isoDate: '2026-11-11',
        label: 'Akihabara',
        images: [
          { src: imgGameboySrc, srcset: imgGameboySrcset },
          { src: imgTokyoStreetSrc, srcset: imgTokyoStreetSrcset },
          { src: imgClawMachineSrc, srcset: imgClawMachineSrcset },
        ],
        activities: [
          {
            time: 'All day',
            title: 'Akihabara',
            description: 'The full day. No first-pass compromises this time. Super Potato — multi-floor retro game shop, Famicom to N64, everything you remember and things you\'ve never seen. Take your time. Yodobashi Akiba — eight-floor electronics megastore, cameras, components, arcade floors. Mandarake — retro games, figures, vintage anime merchandise across multiple floors. The serious stuff is here. Taito Station arcade — claw machines, rhythm games, fighting game cabinets. Put some coins in.',
          },
          {
            time: 'Lunch',
            title: 'Menzin Ramen',
            description: 'Wagyu Paitan ramen ¥1,000. Opened 2025, run by a former MMA champion. Akihabara.',
          },
          {
            time: 'Evening',
            title: 'SEGA Arcade',
            description: 'Stay until late. This is Japanese arcades at their best — floors of games, UFO catchers, rhythm games, the works.',
          },
          {
            time: 'Late',
            title: 'Ameyoko Izakayas',
            description: 'Under the train tracks. Cheap, local, extremely cold beer. Perfect end to the day.',
          },
        ],
      },
      {
        day: 14,
        date: 'Thursday, Nov 12',
        isoDate: '2026-11-12',
        label: 'Senso-ji + Kappabashi — Relaxed Afternoon',
        activities: [
          {
            time: 'Early morning',
            title: 'Senso-ji — Asakusa',
            description: 'Before 8am — completely different before the crowds. 10 min walk from Ueno. Mid-November maple trees in the grounds will be turning. The main gate and five-storey pagoda in the early morning light with autumn colour is one of the best things you\'ll see all trip.',
          },
          {
            time: 'Morning',
            title: 'Kappabashi — Knife Street',
            description: '15 min walk from Senso-ji. Kama-Asa is the knife shop — serious blades, knowledgeable staff, good selection of Japanese kitchen knives. Also worth browsing the cookware shops along the street.',
          },
          {
            time: 'Lunch',
            title: 'Asakusa lunch',
            description: 'Lunch nearby — Sometaro for okonomiyaki (1937, tatami floor, you cook it yourself), or grab unagi or soba in the Asakusa backstreets.',
          },
          {
            time: 'Afternoon / Evening',
            title: 'Open — keep it loose',
            description: 'Nothing fixed, on purpose. It\'s a shorter day, so slow down. Wander Asakusa some more, shop, find coffee somewhere quiet, or head back to Ueno and rest.',
          },
        ],
      },
      {
        day: 15,
        date: 'Friday, Nov 13',
        isoDate: '2026-11-13',
        label: 'Flex Day',
        activities: [
          {
            time: 'All day',
            title: 'No fixed agenda',
            description: 'Nothing booked, on purpose. The day for whatever the trip so far has made you want more of.',
          },
          {
            time: 'Option',
            title: 'Record shops — Shibuya + Shimokitazawa',
            description: 'Shibuya for the big multi-floor stores and the crate-diggers\' side streets, then Shimokitazawa — a few stops on the Inokashira line — for used vinyl, vintage clothes and small cafés. An easy half day.',
          },
          {
            time: 'Option',
            title: 'Shopping + unfinished business',
            description: 'Anything you walked past and regretted. Go back for it.',
          },
          {
            time: 'Evening',
            title: 'Revisit a favourite bar',
            description: 'By now everyone has one. Golden Gai, a Shinjuku standing bar, an Ameyoko izakaya — go back and get recognised.',
          },
        ],
      },
      {
        day: 16,
        date: 'Saturday, Nov 14',
        isoDate: '2026-11-14',
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
            description: 'Duck broth made with only three ingredients: duck, spring onions, water. Open from 9am. One of the best things you\'ll eat all trip. Last proper ramen in Japan.',
          },
          {
            time: '11:00',
            title: 'Check out — store bags',
            description: '&Here TOKYO UENO checkout is 11:00. Pack before breakfast, leave the bags with the hotel for the day.',
          },
          {
            time: 'Midday',
            title: 'Ueno Park',
            description: 'Mid-November foliage in Tokyo will be peaking — Ueno Park is one of the best spots in the city for autumn colour. Walk slowly. You\'re leaving tonight.',
          },
          {
            time: 'Afternoon',
            title: 'Ameyoko — final wander',
            description: 'Under the train tracks one last time. Last souvenirs, a skewer, a beer. No rush, no agenda.',
          },
          {
            time: 'Evening',
            title: 'Farewell dinner — not booked yet',
            description: 'Decide as a group. Keep it close to Ueno and finish by ~20:30 so there\'s time to grab the bags. One final cold Sapporo somewhere simple after, if the clock allows.',
          },
          {
            time: '~21:30',
            title: 'Haneda T3 — Fly Home',
            description: 'Bags from the hotel. Ueno → Shinagawa on JR, then Keikyu to Haneda Terminal 3 — allow ~50 min. Be at the airport by ~21:30. Flight 00:30, Sunday Nov 15.',
          },
        ],
      },
    ],
  },
]
