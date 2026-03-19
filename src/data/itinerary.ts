import imgTokyoI from '../img/photo-1573455494060-c5595004fb6c.avif'
import imgKyoto from '../img/photo-1558862107-d49ef2a04d72.avif'
import imgTokyoII from '../img/photo-1576376365962-1fc6c74d5ff6.avif'

// User photos — Tokyo I
import imgShibuyaAerial from '../img/IMG_6511.jpeg'
import imgTokyoStreet from '../img/IMG_6583.jpeg'
import imgTokyoShow from '../img/IMG_6474.jpeg'

// User photos — Kyoto
import imgKyotoPagoda from '../img/IMG_6628.jpeg'

// User photos — Osaka
import imgOsakaHero from '../img/IMG_0883.jpeg'
import imgShinsekai from '../img/IMG_0841.jpeg'
import imgDotonboriAsahi from '../img/IMG_0911.jpeg'
import imgDotonboriAngle from '../img/IMG_0912.jpeg'
import imgOsakaCastle from '../img/IMG_0886.jpeg'
import imgWagyuKatsu from '../img/IMG_0638.jpeg'
import imgWagyuGrill from '../img/IMG_0922.jpeg'

// User photos — Tokyo II
import imgGameboy from '../img/IMG_1402.jpeg'
import imgTokyoCatScreen from '../img/IMG_6460.jpeg'
import imgBaseball from '../img/IMG_7143.jpeg'
import imgNigiri from '../img/IMG_7047.jpeg'
import imgChefTuna from '../img/IMG_7061.jpeg'
import imgRamen from '../img/IMG_6690.jpeg'
import imgWagyuSlices from '../img/IMG_6669.jpeg'

export type Activity = {
  time?: string
  title: string
  description: string
}

export type Day = {
  day: number
  date: string
  label: string
  activities: Activity[]
  images?: string[]
}

export type CityTheme = {
  bg: string           // poster background color
  ink: string          // primary text
  inkFaint: string     // secondary text
  accent: string       // highlight color
  border: string       // divider color
  image?: string       // hero photo
  layout: 'tokyo-i' | 'kyoto' | 'osaka' | 'akihabara'
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
    summary: 'Three nights in Shinjuku. We land, drop bags, and walk straight to Omoide Yokocho — a smoky yakitori alley two minutes from the station. Cold Sapporo, skewers, strangers. Good start. Days are loose: Meiji Shrine to clear the head, Harajuku and teamLab to get a feel for the place, up to Shibuya Sky to see the crossing from 50 floors. Evenings are the whole point — Golden Gai for as long as it takes, and one proper dinner at a sake bar where the guy behind the bar knows every bottle and will sort you out.',
    dates: 'Oct 17–19',
    nights: 3,
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
        date: 'Saturday, Oct 17',
        label: 'Arrival',
        images: [imgWagyuGrill],
        activities: [
          {
            time: 'Afternoon',
            title: 'Haneda → Shinjuku',
            description: 'Keikyu line from Haneda Airport Terminal 3 to Shinjuku — about 35 min, one change at Sengakuji. IC card works, no need to buy a separate ticket. Drop bags at the hotel.',
          },
          {
            time: 'Evening',
            title: 'Omoide Yokocho',
            description: 'Smoky yakitori alley a 2-min walk from Shinjuku Station west exit. Squeeze into a stall, order skewers and cold Sapporo, eat with strangers. The best possible first night in Japan.',
          },
          {
            time: 'Late',
            title: 'Golden Gai',
            description: 'Wander and pick a bar that calls to you. Each one fits maybe 8 people. Expect to stay longer than planned.',
          },
        ],
      },
      {
        day: 2,
        date: 'Sunday, Oct 18',
        label: '',
        images: [imgTokyoShow, imgTokyoStreet],
        activities: [
          {
            time: 'Morning',
            title: 'Meiji Shrine',
            description: 'Forested, peaceful, genuinely calming after the flight. Free entry, 20 min from Shinjuku.',
          },
          {
            time: 'Afternoon',
            title: 'Harajuku → teamLab Borderless',
            description: 'Takeshita Street for the spectacle, then Omotesando for better shopping and coffee. Book teamLab tickets in advance — allow 2–3 hours.',
          },
          {
            time: 'Evening',
            title: 'Dinner at Uoshin',
            description: 'Casual seafood izakaya. ¥1,000 sashimi platter to start, Nokke-zushi piled with crab and uni, cold draft beer throughout.',
          },
        ],
      },
      {
        day: 3,
        date: 'Monday, Oct 19',
        label: '',
        images: [imgShibuyaAerial],
        activities: [
          {
            time: 'Morning',
            title: 'Shibuya',
            description: 'Crossing at street level, then up to the Shibuya Sky observation deck. The scramble crossing from above is incredible.',
          },
          {
            time: 'Evening',
            title: 'Shuko Takigiya + Sasagin',
            description: 'Izakaya packed with local salarymen — go early, walk-ins only, no English menu. Then Sasagin: huge sake list and the guy behind the bar actually knows what he\'s doing. Tell him what you like and let him pick.',
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
    summary: 'Slower than Tokyo, which after two and a half days of neon and noise is actually welcome. Fushimi Inari at 7am before anyone else shows up, then straight into the sake district — 30+ breweries in walking distance, cold sake from a vending machine outside one of them. Nintendo Museum in Uji the same day (booked months ago, do not lose the tickets). The last evening is the one properly expensive dinner of the trip: Michelin two-star kaiseki at Kikunoi. Go hungry. This has been booked since Sweden.',
    dates: 'Oct 20–22',
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
        day: 4,
        date: 'Tuesday, Oct 20',
        label: 'Travel Day',
        activities: [
          {
            time: 'Day',
            title: 'Shinkansen Tokyo → Kyoto',
            description: '~2h15. Graze through Nishiki Market on arrival — Kyoto\'s covered food market. Try pickled vegetables, yuba, skewered octopus, sweet potato ice cream.',
          },
          {
            time: 'Evening',
            title: 'Pontocho Alley',
            description: 'Lantern-lit, riverside. Walk the length, pick a restaurant that appeals. Torihara does excellent yakitori from ¥590. For something more serious, Suishin does traditional Kyoto cuisine in a beautiful machiya townhouse.',
          },
        ],
      },
      {
        day: 5,
        date: 'Wednesday, Oct 21',
        label: 'Fushimi Day',
        images: [imgKyotoPagoda],
        activities: [
          {
            time: '7am',
            title: 'Fushimi Inari',
            description: 'Thousands of torii gates winding up a forested mountain. The further up you go, the fewer people. Otherworldly in the early morning mist. Allow 2 hours.',
          },
          {
            time: 'Morning',
            title: 'Fushimi Sake District',
            description: 'Over 30 breweries within walking distance. Gekkeikan Okura Sake Museum, then smaller breweries: Kizakura, Kinshi Masamune. Buy a cup of cold nigori sake from a vending machine outside a brewery and drink it in the street. This is the move.',
          },
          {
            time: 'Afternoon',
            title: 'Nintendo Museum — Uji',
            description: '15 min by train. Interactive exhibits spanning Nintendo\'s entire history, playable installations, exclusive merch. Allow 3 hours minimum. Lottery tickets must be booked months in advance.',
          },
        ],
      },
      {
        day: 6,
        date: 'Thursday, Oct 22',
        label: '',
        images: [imgWagyuKatsu],
        activities: [
          {
            time: 'Morning',
            title: 'Arashiyama',
            description: 'Bamboo grove (go early), Tenryu-ji garden, monkey park if anyone\'s keen. Riverside lunch along the Oi River.',
          },
          {
            time: 'Afternoon',
            title: 'Kinkaku-ji + Ryoan-ji',
            description: 'Classic half-day pairing. Golden Pavilion and the rock garden, 20 min by bus from central Kyoto. Philosopher\'s Path walk if time allows — maple-lined canal starting to turn colour.',
          },
          {
            time: 'Evening',
            title: 'Kikunoi Honten + K-Ya Bar',
            description: 'Michelin 2-star kaiseki — book before leaving Sweden. Budget ¥20,000–30,000 per person. Drinks after at K-Ya Bar: vast single malt whisky list, beautifully made cocktails, courtyard view.',
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
    summary: 'The food city. Louder than Kyoto, cheaper than Tokyo, completely fine with both. We come in via Nara — bags forwarded straight to the hotel, a few hours with the deer and the big Buddha, then Kintetsu into Osaka Namba in time for dinner. Kushikatsu at a standing bar in Shinsekai on arrival night. Kuromon market for breakfast the next morning — tuna sashimi, oysters, wagyu on a stick before 10am. The Japan Series kicks off while we\'re here, which means either we\'re at the game or we\'re watching it with thousands of Osakans going completely mental in Dotonbori. Both work. Last day is a trip to Kobe — 30 minutes on the train, there for the beef.',
    dates: 'Oct 23–26',
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
        day: 7,
        date: 'Friday, Oct 23',
        label: 'Kyoto → Nara → Osaka',
        images: [imgShinsekai, imgDotonboriAsahi, imgDotonboriAngle],
        activities: [
          {
            time: 'Morning',
            title: 'Check out of Kyoto',
            description: 'Early checkout, bags with you. Kintetsu line from Kyoto to Nara — 45 min, more convenient than JR for this route.',
          },
          {
            time: 'Late morning',
            title: 'Nara',
            description: 'Kintetsu line from Kyoto, 45 min. Todai-ji temple has Japan\'s largest Buddha statue — genuinely massive. The deer are everywhere and will walk up to you. Buy the crackers. Allow 2–3 hours then take the Kintetsu straight to Osaka Namba.',
          },
          {
            time: 'Evening',
            title: 'Dotonbori + Kushikatsu Daruma',
            description: 'Bags already at the hotel when you check in. Head straight to Dotonbori to take in the chaos, then first Osaka dinner at Kushikatsu Daruma — standing bar, deep-fried skewers of everything, dip once in the communal sauce. No double dipping. It\'s the law.',
          },
        ],
      },
      {
        day: 8,
        date: 'Saturday, Oct 24',
        label: 'Baseball Day',
        images: [imgOsakaCastle],
        activities: [
          {
            time: 'Morning',
            title: 'Kuromon Ichiba + Osaka Castle',
            description: 'Osaka\'s kitchen for breakfast — fresh tuna sashimi, oysters, grilled wagyu on sticks. Then the castle grounds in autumn colour.',
          },
          {
            time: 'Afternoon',
            title: 'Japan Series — Game 1',
            description: 'The Japan Series starts today. If it\'s in Osaka, you\'re already there. If not, watch it on a big screen in Dotonbori with half of Osaka.',
          },
          {
            time: 'Evening',
            title: 'Mizuno + Misono Building',
            description: 'Osaka\'s most famous okonomiyaki restaurant since 1945. Queue expected, worth it. Drinks at Misono Building — Osaka\'s answer to Golden Gai. Japan Series on every screen.',
          },
        ],
      },
      {
        day: 9,
        date: 'Sunday, Oct 25',
        label: 'Kobe Day Trip',
        activities: [
          {
            time: 'Morning',
            title: 'Train to Kobe',
            description: '30 min from Osaka on the Hanshin line. Easy. Walk Harborland and the port when you arrive — nicer than it sounds, good views, less touristy than central Osaka.',
          },
          {
            time: 'Lunch',
            title: 'Kobe Beef Teppanyaki',
            description: 'The whole point. Sit at the counter and watch the chef cook it in front of you. Ikinari Steak is fine for a quick hit but for the proper experience go to Mouriya or Ishida — both have been doing this for decades. Order the sirloin. You\'ll know when it\'s ready.',
          },
          {
            time: 'Afternoon',
            title: 'Nankinmachi + wander',
            description: 'Kobe\'s Chinatown is small but good for a walk and something sweet after lunch. The city has a different feel to Osaka — more European influence from the port history, calmer, easy to spend a few hours in.',
          },
          {
            time: 'Evening',
            title: 'Back to Osaka',
            description: 'Last night in Osaka. Dotonbori for a drink, or just find somewhere near the hotel. Early start tomorrow.',
          },
        ],
      },
    ],
  },
  {
    id: 'tokyo-ii',
    name: 'Tokyo',
    nameJa: '東京',
    subtitle: 'Ueno · Akihabara',
    summary: 'Back in Tokyo for five nights, based in Ueno. Akihabara is the main event — a full day minimum. Super Potato has five floors of retro games, Mandarake has everything else, and the SEGA arcade stays open until midnight. Japanese arcades are nothing like what you\'re imagining: rhythm games, claw machines, fighting game cabinets with actual competition players at them. Wagyu ramen for lunch from a spot run by a former MMA fighter. Go back in the evening if you want. The rest of the trip fills in around it: Senso-ji early, sumo hotpot in Ryogoku, Japan Series at the Dome. Last night is the sushi counter — six seats, direct from Toyosu, the best meal of the trip. Ramen the morning of departure. Then Haneda.',
    dates: 'Oct 26–31',
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
        day: 10,
        date: 'Monday, Oct 26',
        label: 'Travel Day',
        activities: [
          {
            time: 'Morning',
            title: 'Shinkansen Osaka → Tokyo',
            description: '~2h30. Last konbini run in Osaka before you leave — get a coffee and something from the hot counter. Window seat on the right side for a clear shot of Fuji.',
          },
          {
            time: 'Afternoon',
            title: 'Check in — Ueno',
            description: 'Drop bags, walk Ueno Park. The pond, the market stalls under the tracks, the general organised chaos. Good ramen options directly around the station for a low-key first night.',
          },
        ],
      },
      {
        day: 11,
        date: 'Tuesday, Oct 27',
        label: 'Akihabara Day',
        images: [imgGameboy, imgTokyoCatScreen],
        activities: [
          {
            time: 'All day',
            title: 'Electric Town',
            description: 'Super Potato for retro games, Yodobashi Akiba for electronics, Mandarake for vintage anime merch. Lunch at Menzin — wagyu ramen at ¥1,000, opened 2025, run by a former MMA champion.',
          },
          {
            time: 'Night',
            title: 'SEGA Arcade',
            description: 'Stay until midnight. Claw machines, rhythm games, fighting game cabinets. This is what Japanese arcades are actually like.',
          },
        ],
      },
      {
        day: 12,
        date: 'Wednesday, Oct 28',
        label: '',
        activities: [
          {
            time: 'Morning',
            title: 'Senso-ji → Yanaka',
            description: 'Go before 8am — completely different before the crowds. Walk through Kappabashi Kitchen Town, then Yanaka for old Tokyo: independent shops, temples, cats.',
          },
          {
            time: 'Evening',
            title: 'Chanko-nabe in Ryogoku',
            description: 'Dinner at Tomoegata — run by a former sumo stable. The wrestler\'s protein hotpot, proper and excellent. Then the sumo museum (free, inside Kokugikan arena).',
          },
        ],
      },
      {
        day: 13,
        date: 'Thursday, Oct 29',
        label: 'Baseball Day',
        images: [imgBaseball],
        activities: [
          {
            time: 'Evening',
            title: 'Japan Series — Tokyo',
            description: 'Tokyo Dome or Jingu Stadium. Arrive 90 minutes early. 45,000 people. Non-stop fan chanting with trumpets and drums. Beer girls with kegs on their backs. Stadium food that beats anything in European sport. Stay until the last out.',
          },
        ],
      },
      {
        day: 14,
        date: 'Friday, Oct 30',
        label: 'Omakase Night',
        images: [imgChefTuna, imgNigiri, imgWagyuSlices],
        activities: [
          {
            time: 'Morning',
            title: 'Ikebukuro',
            description: 'Second gaming district, less touristy. Sunshine City arcade, Namco Namjatown. Good for a few hours.',
          },
          {
            time: 'Evening',
            title: 'Asakusa Sushi Kappō',
            description: '6 counter seats. Seasonal seafood sourced direct from fishermen and Toyosu market. Book before leaving Sweden. ¥20,000+. Sit at the counter, watch the chef work, eat the best sushi of your life.',
          },
          {
            time: 'Late',
            title: 'Zoetrope',
            description: 'Shinjuku whisky bar, 300+ Japanese whiskies. Good way to end the trip.',
          },
        ],
      },
      {
        day: 15,
        date: 'Saturday, Oct 31',
        label: 'Fly Home',
        images: [imgRamen],
        activities: [
          {
            time: 'Morning',
            title: 'Last Ramen',
            description: 'Ramen Kamo to Negi — duck broth, only three ingredients, somehow one of the best things you\'ll eat all trip. Open from 9am. Get there.',
          },
          {
            time: 'Afternoon',
            title: 'Haneda → Home',
            description: 'Ueno to Haneda is about 40 min on the Keikyu line. Allow at least 2.5 hours before departure — international terminal, October is busy. Then home.',
          },
        ],
      },
    ],
  },
]

export const bookingChecklist = [
  { item: 'Nintendo Museum', note: 'Lottery system — first priority above everything' },
  { item: 'Asakusa Sushi Kappō', note: '6 seats — call or email well in advance' },
  { item: 'Kikunoi Honten (kaiseki)', note: 'International reservations accepted' },
  { item: 'teamLab Borderless', note: 'Online — sells out' },
  { item: 'USJ Express Pass', note: 'Online — sells out' },
  { item: 'Japan Series Tickets', note: 'Move immediately when the matchup drops in mid-October via Japan Sports Ticket' },
]
