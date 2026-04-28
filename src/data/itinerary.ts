import imgTokyoI from '../img/photo-1573455494060-c5595004fb6c.avif'
import imgKyoto from '../img/photo-1558862107-d49ef2a04d72.avif'
import imgTokyoII from '../img/photo-1576376365962-1fc6c74d5ff6.avif'
import imgFukuoka from '../img/sumo.avif'

// New images
import imgAlleywaySrc from '../img/alleyway.jpeg'
import imgAlleywaySrcset from '../img/alleyway.jpeg?w=280;560&format=webp&as=srcset'
import imgBeer1Src from '../img/beer1.jpeg'
import imgBeer1Srcset from '../img/beer1.jpeg?w=280;560&format=webp&as=srcset'
import imgBeer2Src from '../img/beer2.jpeg'
import imgBeer2Srcset from '../img/beer2.jpeg?w=280;560&format=webp&as=srcset'
import imgBeer3Src from '../img/beer3.jpeg'
import imgBeer3Srcset from '../img/beer3.jpeg?w=280;560&format=webp&as=srcset'
import imgFukuokaContentSrc from '../img/photo-1667702661326-2e64aad4a567.avif'
import imgFukuokaContentSrcset from '../img/photo-1667702661326-2e64aad4a567.avif?w=280;560&format=webp&as=srcset'
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
  layout: 'tokyo-i' | 'kyoto' | 'osaka' | 'fukuoka' | 'akihabara'
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
    summary: 'Four nights in Shinjuku, starting Oct 30. Land at Haneda early morning — Suica at the airport, capsule hotel for a few hours, then Shinjuku. Omoide Yokocho that first evening: smoky yakitori alley, cold Sapporo, strangers. Day two hits hard: Meiji Shrine first thing, Harajuku and Omotesando through the morning, tonkatsu at Maisen, then Shibuya in the evening — cross the scramble at street level and up to Shibuya Sky for the city lights from 50 floors. Book timed entry in advance. Day three is the gaming deep-dive: Akihabara in the morning — Super Potato, Yodobashi, Mandarake — then Nakano Broadway in the afternoon for the serious collectors\' version of the same. Evening: small-bar karaoke near Golden Gai, then the crawl itself. Day four: teamLab Borderless at Azabudai Hills in the morning, then Ginza — draught Sapporo at Ginza Lion in that original 1934 interior, yakitori under the Yurakucho train tracks, Yamanote back to Shinjuku. Last evening before the Shinkansen west.',
    dates: 'Oct 30 – Nov 3',
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
        date: 'Friday, Oct 30',
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
        date: 'Saturday, Oct 31',
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
        label: 'Akihabara + Nakano Broadway',
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
            time: 'Afternoon',
            title: 'Nakano Broadway',
            description: 'Chuo line from Akihabara, about 20 min west. Four floors of retro game shops, figures, vintage manga, model kits. Mandarake has its best branch here — more stock, better prices than Akihabara. More authentic and considerably less chaotic — the serious collectors come here. Bring cash.',
          },
          {
            time: 'Evening',
            title: 'Karaoke → Golden Gai',
            description: 'Head back to Shinjuku (4 min from Nakano on Chuo line). Small local bar-style karaoke near Golden Gai — not a commercial box. Ten people, one mic, strangers applauding. Then Golden Gai crawl.',
          },
        ],
      },
      {
        day: 4,
        date: 'Monday, Nov 2',
        label: 'teamLab + Ginza',
        activities: [
          {
            time: 'Morning',
            title: 'teamLab Borderless — Azabudai Hills',
            description: 'Opens 10am — book timed entry well in advance at borderless.teamlab.art. Allow 2–3 hours. Immersive digital art at a scale that\'s hard to describe: rooms bleed into each other, projections respond to movement, no barriers between the work and the viewer. Azabudai Hills, Minato-ku. Come out into daylight and walk 15 minutes east to Ginza.',
          },
          {
            time: 'Afternoon',
            title: 'Ginza Lion Beer Hall',
            description: '1934 Sapporo beer hall, one of the oldest in Japan. The interior — original mosaic tiles, vaulted ceilings, stained glass — looks exactly the same as it did 90 years ago. Draught Sapporo poured properly. Opens at 11:30am. The right place after a morning of overwhelming digital art.',
          },
          {
            time: 'Evening',
            title: 'Yurakucho — Under the Tracks',
            description: 'Five-minute walk from Ginza. Under the elevated JR tracks between Yurakucho and Hibiya — dozens of tiny yakitori bars, smoke hanging in the air, salarymen on their second beer. No English menus, no reservations. Pull up a stool and eat whatever\'s on the grill. Then Yamanote line from Yurakucho direct to Shinjuku — 30 minutes.',
          },
          {
            time: 'Late',
            title: 'Last Shinjuku Evening',
            description: 'Pack for the morning. Shinkansen west on Day 5. One last drink in Golden Gai if there\'s energy.',
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
    summary: 'Three nights arriving Tuesday Nov 3 — quieter than the weekend, good timing. Straight from the station to Nishiki Market, then up to Kiyomizu-dera as the maple trees begin to turn — one of the best moments of the trip. Evening: wagyu counter in Pontocho, drinks at Bar Pontostand. Day two is the full day: Fushimi Inari at 6am before anyone shows up, sake district after, Nintendo Museum in Uji (lottery — highest booking priority of the trip). Day three: Nijo Castle in the morning, knife sharpening class in the afternoon, then the one properly booked dinner — yakitori omakase, skewer by skewer, completely drink-friendly. End the night at Funaoka Onsen, 1923 bathhouse, outdoor bath. Leaving day: bags go ahead to Osaka via takuhaibin, travel light, Nara on the way.',
    dates: 'Nov 3–6',
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
        date: 'Tuesday, Nov 3',
        label: 'Arrival',
        images: [
          { src: imgWagyuKatsuSrc, srcset: imgWagyuKatsuSrcset },
          { src: imgBeer2Src, srcset: imgBeer2Srcset },
        ],
        activities: [
          {
            time: 'Day',
            title: 'Shinkansen Tokyo → Kyoto',
            description: '~2h15. Grab an ekiben at Shinjuku before boarding. Arriving Tuesday — good timing, main sites quieter than the weekend.',
          },
          {
            time: 'Afternoon',
            title: 'Nishiki Market',
            description: 'Graze through on arrival — Kyoto pickles, yuba, skewered octopus, sweet potato ice cream. This is lunch. Early November the maples will be beginning to colour, Kyoto starting to look spectacular.',
          },
          {
            time: 'Afternoon',
            title: 'Kiyomizu-dera',
            description: '20 min walk or short taxi from Nishiki Market, up on the hillside east of the city. Early November the surrounding maple trees will be starting to turn — one of the best times to visit. The wooden stage looking out over the city is genuinely spectacular. Allow 1.5–2 hours.',
          },
          {
            time: 'Evening',
            title: 'Wagyu Dinner — Pontocho',
            description: 'Pontocho has several excellent wagyu options with intimate counter seating. Book in advance — a strong start to Kyoto\'s food. Drinks at Bar Pontostand after — bilingual sake bar, run by Mako and Taku, rotating Kyoto sake selection.',
          },
        ],
      },
      {
        day: 6,
        date: 'Wednesday, Nov 4',
        label: 'Fushimi + Nintendo',
        images: [
          { src: imgFushimiInariSrc, srcset: imgFushimiInariSrcset },
          { src: imgKyotoPagodaSrc, srcset: imgKyotoPagodaSrcset },
        ],
        activities: [
          {
            time: '6am',
            title: 'Fushimi Inari',
            description: 'Thousands of torii gates winding up a forested mountain. Otherworldly in the early morning mist. Heaviest day of the trip — turn back at the Yotsutsuji intersection (~30 min up) rather than going to the summit, save the legs for Nintendo Museum later.',
          },
          {
            time: 'Morning',
            title: 'Fushimi Sake District',
            description: 'Over 30 breweries within walking distance. Gekkeikan Okura Museum, then Kizakura and Kinshi Masamune. Buy a cold cup of nigori from a brewery vending machine and drink it in the street. Keep it to one or two breweries — Nintendo Museum next.',
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
        date: 'Thursday, Nov 5',
        label: 'Kyoto',
        activities: [
          {
            time: 'Morning',
            title: 'Nijo Castle',
            description: 'One of Kyoto\'s most impressive and undervisited sites. Ninomaru Palace interior is beautifully preserved — famous for the nightingale floors that squeak deliberately to detect intruders. The autumn gardens in early November will be starting to colour. Allow 2 hours.',
          },
          {
            time: 'Afternoon',
            title: 'Knife Sharpening Class',
            description: 'Specific venue TBD — options include Tsuneshin\'s at Furukawacho Shopping Arcade (30-year veteran artisan), a workshop near Nishiki Market (¥25,000, includes a knife to take home), or Shirakawa Japanese Culture Experiences (knife sharpening + sake tasting combined). Book in advance — research and decide before leaving Sweden. Allow 2 hours.',
          },
          {
            time: 'Evening',
            title: 'Yakitori Omakase',
            description: 'The big Kyoto dinner. Counter seating, skewer by skewer, high quality, completely drink-friendly. None of the white-tablecloth tension of a kaiseki room — this is the better call. ¥15,000–25,000 per person. Book before leaving Sweden via tableall.com or omakase.in.',
          },
          {
            time: 'Late',
            title: 'Funaoka Onsen + K-Ya Bar',
            description: 'Funaoka Onsen: historic 1923 bathhouse in Kuramaguchi, beautiful Meiji-era wooden interior, mosaic tiles, outdoor bath, almost entirely local clientele. ~¥500, open until midnight, 20 min by bus from central Kyoto. Check tattoo policy in advance. K-Ya Bar in Pontocho after if anyone has energy — vast single malt whisky list.',
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
    summary: 'The food city. Louder than Kyoto, cheaper than Tokyo, completely fine with both. Arrive via Nara on day one, walk straight into Dotonbori, eat everything. Day two has two modes depending on energy — either a morning trip up to Katsuoji Temple in the Minoh mountains, covered in thousands of daruma dolls and autumn foliage, or a relaxed morning at Osaka Castle before heading to Nipponbashi. Either way the evening ends in Shinsekai before the Shinkansen south to Fukuoka.',
    dates: 'Nov 6–8',
    nights: 2,
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
        date: 'Friday, Nov 6',
        label: 'Arrive via Nara',
        images: [
          { src: imgNaraPagodaSrc, srcset: imgNaraPagodaSrcset },
          { src: imgDotonboriAngleSrc, srcset: imgDotonboriAngleSrcset },
          { src: imgBeer3Src, srcset: imgBeer3Srcset },
        ],
        activities: [
          {
            time: 'Morning',
            title: 'Luggage forwarding — Takuhaibin',
            description: 'Arrange the night before with Kyoto hotel reception. Bags go direct from Kyoto hotel to Osaka hotel — ¥1,000–2,000 per bag, next-day delivery. Check out light. Travel with day bags only.',
          },
          {
            time: 'Morning',
            title: 'Kyoto → Nara',
            description: '45 min on the Kintetsu line. Quick visit — Todai-ji for the giant Buddha, Nara Park for the deer. Hundreds of them roaming completely freely — they bow, they steal food, they have zero respect for personal space. Grab lunch in Naramachi district before leaving. Keep it to 2–3 hours total — you\'re passing through, not staying.',
          },
          {
            time: 'Afternoon',
            title: 'Nara → Osaka',
            description: 'Kintetsu line direct Nara → Osaka Namba (~50 min). Check in — bags already waiting at the hotel. Freshen up, head straight out.',
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
        label: 'Osaka',
        images: [
          { src: imgOsakaCastleSrc, srcset: imgOsakaCastleSrcset },
          { src: imgShinsekaISrc, srcset: imgShinsekaISrcset },
          { src: imgDotonboriAsahiSrc, srcset: imgDotonboriAsahiSrcset },
        ],
        activities: [
          {
            time: 'Morning — Option A',
            title: 'Katsuoji Temple — Temple of Winner\'s Luck',
            description: 'Leave hotel by 8am. Midosuji line to Minoh-Kayano Station (~35 min), then bus 30 to the temple (~25 min). ¥500 entry. 1,300-year-old temple known as the Temple of Winner\'s Luck, set high in the Minoh mountains. Thousands of daruma dolls covering every surface — walls, trees, lanterns, stacked as far as you can see. Scenic mountain setting with koi ponds, vermillion pagoda and mist-covered bridges. Early November autumn foliage in the surrounding mountains will be spectacular — go early before the crowds arrive, buses fill up fast on weekends. Allow 3–4 hours on site. Back in Osaka by 1pm. Worth the effort if the group has energy — nothing else on the trip looks like this.',
          },
          {
            time: 'Morning — Option B',
            title: 'Osaka Castle (Relaxed Morning)',
            description: '15 min from the hotel. Don\'t bother going inside — the exterior and grounds are the thing. Early-November autumn colour in the surrounding park will be starting to turn. Walk the moat, find a coffee, take your time. Back by noon with energy to spare. Good option if anyone needs a slower morning after two weeks of travel.',
          },
          {
            time: 'Afternoon',
            title: 'Nipponbashi — Den Den Town',
            description: 'Osaka\'s electronics and anime district. Retro games, figures, manga, electronics — everything Akihabara has but less crowded and more local. Good for a few hours of browsing. Hozenji Yokocho nearby for a late lunch — moss-covered stone alley, 60+ small restaurants, far less touristy than Dotonbori.',
          },
          {
            time: 'Evening',
            title: 'Tennoji izakayas — Last Osaka Night',
            description: 'Different angle for the second night. Tennoji is the next neighbourhood over from Shinsekai — local salaryman izakayas, no English menus, almost no tourists. Pick somewhere that looks busy, point at what the next table is having. Cheap beer, grilled fish, end the night before midnight. Shinkansen to Fukuoka tomorrow.',
          },
        ],
      },
    ],
  },
  {
    id: 'fukuoka',
    name: 'Fukuoka',
    nameJa: '福岡',
    subtitle: '',
    summary: 'Two nights on Kyushu. The Grand Sumo Tournament is the reason to come — Fukuoka Kokusai Center, November basho, top-division bouts from 2:30pm on arrival day. Day two: Yanagibashi Rengo Market at dawn, ramen at the source, then an afternoon walking Tenjin and Yakuin — Fukuoka\'s best neighborhoods, good bars, good energy. Evenings on the yatai stalls along Nakasu — open-air food carts on the river, cold Asahi, Hakata beef skewers, shochu.',
    dates: 'Nov 8–10',
    nights: 2,
    accentChar: '福',
    theme: {
      bg: '#1a1650',
      ink: '#ede8ff',
      inkFaint: 'rgba(237,232,255,0.45)',
      accent: '#f5c842',
      border: 'rgba(237,232,255,0.1)',
      image: imgFukuoka,
      layout: 'fukuoka',
    },
    days: [
      {
        day: 10,
        date: 'Sunday, Nov 8',
        label: 'Fukuoka',
        images: [{ src: imgFukuokaContentSrc, srcset: imgFukuokaContentSrcset }],
        activities: [
          {
            time: 'Morning',
            title: 'Check out Osaka — Shinkansen to Fukuoka',
            description: '~2h30 on the Nozomi to Hakata Station. Check in, drop bags. Fukuoka is compact — Hakata and Tenjin are the two central areas, 10 min apart.',
          },
          {
            time: 'Afternoon',
            title: 'Grand Sumo Tournament',
            description: 'Fukuoka Kokusai Center, November basho. Top-division bouts from around 2:30–3pm, final bout (Yokozuna or Ozeki) around 5:30–6pm. Book tickets via sumo.or.jp as soon as they go on sale. Get there for the entry of the top-ranked wrestlers.',
          },
          {
            time: 'Evening',
            title: 'Yatai — Nakasu River',
            description: 'Open-air food stalls along the Naka River. Pull up a plastic stool under the lanterns — Hakata ramen, beef skewers, gyoza, cold Asahi. This is Fukuoka\'s most distinctive thing. The stalls start filling from 6pm.',
          },
        ],
      },
      {
        day: 11,
        date: 'Monday, Nov 9',
        label: 'Hakata + Tenjin',
        images: [{ src: imgRamen2Src, srcset: imgRamen2Srcset }],
        activities: [
          {
            time: 'Early morning',
            title: 'Yanagibashi Rengo Market',
            description: 'Hakata\'s oldest market — 6am start, fishmongers, vegetable sellers, local food stalls. The city\'s kitchen. Coffee and a snack here — save the proper appetite for ramen straight after.',
          },
          {
            time: 'Morning',
            title: 'Hakata Ramen — Shin-Shin or Ichiran original',
            description: 'Tonkotsu ramen was invented in Fukuoka. Thin noodles, rich pork bone broth, chashu, pickled ginger. Shin-Shin is the locals\' choice; Ichiran\'s original Hakata branch if you want the full solo-booth experience.',
          },
          {
            time: 'Afternoon',
            title: 'Tenjin + Yakuin',
            description: 'Walk from Hakata to Tenjin — Fukuoka\'s main commercial district, good for a wander. Then south to Yakuin: quieter, more residential, lined with independent cafés and local bars. The right place to spend an afternoon with cold beer before dinner. Craft beer stop at one of the Yakuin spots, then walk back toward Nakasu for the evening.',
          },
          {
            time: 'Evening',
            title: 'Mentaiko dinner — Hakata Ikkyuu',
            description: 'Spicy cod roe — Fukuoka\'s most famous export. Hakata Ikkyuu is the specialist: mentaiko in everything, served with rice and miso. Stock up on mentaiko to bring home from Yanagibashi or AMU Plaza.',
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
    summary: 'Back in Tokyo for the final leg, based in Ueno. Four nights, five days — the last one ends at Haneda. Akihabara gets the full day it deserves, no first-pass compromises. Senso-ji before the crowds, Kappabashi for knives, Yebisu for beer. Nikko on day four — Toshogu shrine, mountain foliage at the lower elevations, one of the best day trips out of Tokyo. Last evening is the six-seat sushi counter in Asakusa. Book it before leaving Sweden.',
    dates: 'Nov 10–14',
    nights: 4,
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
        day: 12,
        date: 'Tuesday, Nov 10',
        label: 'Shinkansen from Fukuoka',
        activities: [
          {
            time: 'Day',
            title: 'Shinkansen Fukuoka → Tokyo',
            description: '~5 hours. Long but comfortable. Window seat on the right side for Mt Fuji views — mid-November is one of the best times to see it with clear skies and snow on the peak. Buy a proper bento at Hakata Station before boarding.',
          },
          {
            time: 'Evening',
            title: 'Arrive Ueno — Ameyoko + early night',
            description: 'Check in. Walk Ameyoko market street — food stalls, street vendors, cold beer under the train tracks. Easy first Ueno evening. Early night — full day tomorrow.',
          },
        ],
      },
      {
        day: 13,
        date: 'Wednesday, Nov 11',
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
        label: 'Asakusa + Yebisu + Wagyu',
        images: [
          { src: imgWagyuGrillSrc, srcset: imgWagyuGrillSrcset },
          { src: imgWagyuSlicesSrc, srcset: imgWagyuSlicesSrcset },
        ],
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
            title: 'Asakusa lunch + slow afternoon',
            description: 'Lunch nearby — Sometaro for okonomiyaki (1937, tatami floor, you cook it yourself), or grab unagi or soba in the Asakusa backstreets. Wander Nakamise-dori on the way back, coffee somewhere quiet. No pressure — Yebisu is a long way south so leave Asakusa around 3pm.',
          },
          {
            time: 'Late afternoon',
            title: 'Yebisu Museum of Beer — Ebisu',
            description: 'Historic Yebisu brewery site, now a museum and tasting experience. Guided tour of the original buildings followed by a tasting flight of Yebisu beers. About 90 minutes total. Book the guided tasting tour in advance at yebisu-museum.jp — it fills up. Then dinner is a short walk away.',
          },
          {
            time: 'Evening',
            title: 'Wagyu Yakiniku — Ebisu / Nakameguro',
            description: 'Grill your own wagyu at the table — proper cuts, cold beer throughout, no ceremony. One of the best group dinners of the trip.',
          },
          {
            time: 'Late',
            title: 'Nakameguro Canal',
            description: 'Drinks along the canal after dinner. Good bars, good atmosphere, easy walk from the restaurant. Mid-November the canal-side trees will be turning — one of Tokyo\'s best autumn spots.',
          },
        ],
      },
      {
        day: 15,
        date: 'Friday, Nov 13',
        label: 'Nikko Day Trip',
        activities: [
          {
            time: '7am',
            title: 'Tobu Asakusa → Nikko',
            description: 'Leave Ueno by 7am to Tobu Asakusa Station. Limited express to Tobu-Nikko (~1h50). Buy the Nikko Pass at Asakusa Station — cheaper than a return ticket and includes all local buses. No advance booking needed, buy on the day.',
          },
          {
            time: 'All day',
            title: 'Shinkyo Bridge + Toshogu Shrine',
            description: 'Shinkyo Bridge — vermillion bridge at the entrance to the sacred area, the classic opening shot. Toshogu Shrine: Japan\'s most lavishly decorated shrine, gold-leaf accents, intricate carvings, 55 buildings across a forested hillside. Extraordinary craftsmanship — nothing else in Japan looks like this.',
          },
          {
            time: 'All day',
            title: 'Taiyuin Temple + Kanmangafuchi Abyss',
            description: 'Taiyuin Temple — companion mausoleum to Toshogu, less crowded, more atmospheric. Worth the extra 20 minutes. Kanmangafuchi Abyss: riverside walk lined with 70+ moss-covered red-hatted Jizo statues. Quiet, slightly otherworldly. Good contrast to the shrine. Mid-November foliage at the higher elevations will likely be past peak, but the lower-elevation areas around the shrines and Kanmangafuchi should still hold colour. Lunch in Nikko town — bring snacks as backup. Yuba (tofu skin) is the local specialty if you find it.',
          },
          {
            time: 'Evening',
            title: 'Chanko-nabe — Ryogoku',
            description: 'Back in Ueno by early evening. Dinner at Chanko Kawasaki in Ryogoku — one of the oldest chanko restaurants in the sumo district, run by a former wrestler. Wrestler\'s protein hotpot, proper and excellent. 5 min by train from Ueno. Sumo museum wander after — free, inside Kokugikan arena. Easy walk around the sumo neighbourhood. Early night before the last full day.',
          },
        ],
      },
      {
        day: 16,
        date: 'Saturday, Nov 14',
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
            time: 'Morning',
            title: 'Ameyoko Market',
            description: 'Final wander under the train tracks. Last souvenirs, no rush, no agenda.',
          },
          {
            time: 'Afternoon',
            title: 'Ueno Park',
            description: 'Mid-November foliage in Tokyo will be peaking — Ueno Park is one of the best spots in the city for autumn colour. Walk slowly. You\'re leaving tonight. Pack, store bags at hotel.',
          },
          {
            time: 'Evening',
            title: 'Asakusa Sushi Kappō — Omakase Farewell',
            description: '6 counter seats. Book the early sitting 6–7pm before leaving Sweden. ¥20,000+ per person. Sit at the counter, watch the chef, eat the best sushi of your lives. Seasonal fish from Toyosu and direct from fishermen. This is the farewell meal — book it before anything else after the Nintendo Museum lottery. NOTE: this dinner does not move. It is the anchor of the last evening.',
          },
          {
            time: 'Late',
            title: 'One final cold Sapporo',
            description: 'Somewhere simple and nearby. No agenda. Just sit with it.',
          },
          {
            time: 'Night',
            title: 'Haneda — Fly Home',
            description: 'Bags from hotel. Keikyu line from Ueno to Haneda Terminal 3 — about 40 min, allow at least 2.5 hours before departure. At the airport by 9:30–10pm. Fly home Nov 15 00:30.',
          },
        ],
      },
    ],
  },
]
