import imgTokyoI from '../img/photo-1573455494060-c5595004fb6c.avif'
import imgKyoto from '../img/photo-1558862107-d49ef2a04d72.avif'
import imgOsaka from '../img/premium_photo-1733342572346-5420c95f7556.avif'
import imgTokyoII from '../img/photo-1576376365962-1fc6c74d5ff6.avif'

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
        activities: [
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
        activities: [
          {
            time: 'Morning',
            title: 'Shibuya',
            description: 'Crossing at street level, then up to the Shibuya Sky observation deck. The scramble crossing from above is incredible.',
          },
          {
            time: 'Evening',
            title: 'Shuko Takigiya + Sasagin',
            description: 'Bib Gourmand izakaya beloved by local salarymen — go early, walk-ins only. Then Sasagin sake bar: one of the largest sake selections in Tokyo with a mustachioed sommelier who pairs by taste.',
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
    dates: 'Oct 23–26',
    nights: 3,
    accentChar: '食',
    theme: {
      bg: '#ff6a00',
      ink: '#0f0f0f',
      inkFaint: 'rgba(15,15,15,0.45)',
      accent: '#0f0f0f',
      border: 'rgba(0,0,0,0.15)',
      image: imgOsaka,
      layout: 'osaka',
    },
    days: [
      {
        day: 7,
        date: 'Friday, Oct 23',
        label: 'Nara + Arrival',
        activities: [
          {
            time: 'Morning',
            title: 'Day Trip to Nara',
            description: '45 min by train. Todai-ji temple housing Japan\'s largest Buddha statue, hundreds of free-roaming deer throughout the park. Allow 3 hours.',
          },
          {
            time: 'Evening',
            title: 'Dotonbori + Kushikatsu Daruma',
            description: 'Walk straight to Dotonbori to absorb the madness. First Osaka dinner: standing bar at Kushikatsu Daruma (the original Shinsekai branch). Deep-fried skewers of everything, dip once in the communal sauce. No double dipping — it\'s the law.',
          },
        ],
      },
      {
        day: 8,
        date: 'Saturday, Oct 24',
        label: 'Baseball Day',
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
        label: 'Nintendo World',
        activities: [
          {
            time: 'All day',
            title: 'Universal Studios Japan',
            description: 'Arrive at opening. Super Nintendo World — buy express passes well in advance. Mario Kart ride, Bowser\'s Castle, interactive wristband gameplay. Genuinely spectacular even for non-theme-park people.',
          },
          {
            time: 'Evening',
            title: 'Easy dinner',
            description: 'Bowl of ramen or udon near the hotel. One drink in Dotonbori at night if anyone has the energy.',
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
        day: 11,
        date: 'Tuesday, Oct 27',
        label: 'Akihabara Day',
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
            description: 'Shinjuku whisky bar with 300+ Japanese whiskies. The perfect final night in Tokyo.',
          },
        ],
      },
      {
        day: 15,
        date: 'Saturday, Oct 31',
        label: 'Fly Home',
        activities: [
          {
            time: 'Morning',
            title: 'Last Ramen',
            description: 'Ramen Kamo to Negi — duck broth made with only duck, spring onions and water. Hauntingly clear and rich. Open from 9am.',
          },
          {
            time: 'Afternoon',
            title: 'Haneda → Home',
            description: 'Walk Ueno Park one last time. Then the airport. Fly home.',
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
