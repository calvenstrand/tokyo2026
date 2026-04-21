export type PlaceCategory = 'activity' | 'restaurant' | 'bar' | 'shop'

export interface Place {
  id: string
  name: string
  category: PlaceCategory
  neighborhood: string
}

export interface Neighborhood {
  id: string
  name: string
  city: string
}

export const neighborhoods: Neighborhood[] = [
  { id: 'shinjuku',      name: 'Shinjuku',      city: 'Tokyo' },
  { id: 'shibuya',       name: 'Shibuya',       city: 'Tokyo' },
  { id: 'ebisu',         name: 'Ebisu',         city: 'Tokyo' },
  { id: 'akihabara',     name: 'Akihabara',     city: 'Tokyo' },
  { id: 'asakusa',       name: 'Asakusa',       city: 'Tokyo' },
  { id: 'ueno',          name: 'Ueno',          city: 'Tokyo' },
  { id: 'shimokitazawa', name: 'Shimokitazawa', city: 'Tokyo' },
  { id: 'ginza',         name: 'Ginza',         city: 'Tokyo' },
  { id: 'yurakucho',    name: 'Yurakucho',     city: 'Tokyo' },
  { id: 'jinbocho',      name: 'Jinbocho',      city: 'Tokyo' },
  { id: 'yanaka',        name: 'Yanaka',        city: 'Tokyo' },
  { id: 'yoyogi',        name: 'Yoyogi',        city: 'Tokyo' },
]

export const places: Place[] = [
  // Shinjuku
  { id: 'shinjuku-1', name: 'Omoide Yokocho',          category: 'bar',        neighborhood: 'shinjuku' },
  { id: 'shinjuku-2', name: 'Golden Gai',               category: 'bar',        neighborhood: 'shinjuku' },
  { id: 'shinjuku-3', name: 'New York Bar',             category: 'bar',        neighborhood: 'shinjuku' },
  { id: 'shinjuku-4', name: 'Kabukicho',                category: 'activity',   neighborhood: 'shinjuku' },
  { id: 'shinjuku-5', name: 'Tsunahachi',               category: 'restaurant', neighborhood: 'shinjuku' },
  { id: 'shinjuku-6', name: 'Bic Camera',               category: 'shop',       neighborhood: 'shinjuku' },
  { id: 'shinjuku-7', name: 'Isetan',                   category: 'shop',       neighborhood: 'shinjuku' },

  // Shibuya
  { id: 'shibuya-1',  name: 'Shibuya Crossing',         category: 'activity',   neighborhood: 'shibuya' },
  { id: 'shibuya-2',  name: 'Magnet by Shibuya 109',    category: 'activity',   neighborhood: 'shibuya' },
  { id: 'shibuya-3',  name: 'Nonbei Yokocho',           category: 'bar',        neighborhood: 'shibuya' },
  { id: 'shibuya-4',  name: 'Tower Records',            category: 'shop',       neighborhood: 'shibuya' },
  { id: 'shibuya-5',  name: 'Mandarake',                category: 'shop',       neighborhood: 'shibuya' },

  // Ebisu
  { id: 'ebisu-1',    name: 'Yebisu Brewery Tokyo',     category: 'activity',   neighborhood: 'ebisu' },
  { id: 'ebisu-2',    name: 'Yebisu Beer Museum',       category: 'activity',   neighborhood: 'ebisu' },
  { id: 'ebisu-3',    name: 'Yebisu Beer Hall',         category: 'bar',        neighborhood: 'ebisu' },
  { id: 'ebisu-4',    name: 'The Tipplers Arms',        category: 'bar',        neighborhood: 'ebisu' },
  { id: 'ebisu-5',    name: 'Log Road Daikanyama',      category: 'shop',       neighborhood: 'ebisu' },
  { id: 'ebisu-6',    name: 'Daikanyama T-Site',        category: 'shop',       neighborhood: 'ebisu' },

  // Akihabara
  { id: 'akihabara-1', name: 'HEY (Hirose Entertainment Yard)', category: 'activity',   neighborhood: 'akihabara' },
  { id: 'akihabara-2', name: 'Club Sega',                       category: 'activity',   neighborhood: 'akihabara' },
  { id: 'akihabara-3', name: 'TOKYO VIDEO GAMERS Cafe&Bar',     category: 'bar',        neighborhood: 'akihabara' },
  { id: 'akihabara-4', name: 'Gyukatsu Motomura',               category: 'restaurant', neighborhood: 'akihabara' },
  { id: 'akihabara-5', name: 'Super Potato',                    category: 'shop',       neighborhood: 'akihabara' },
  { id: 'akihabara-6', name: '@Wonder JG',                      category: 'shop',       neighborhood: 'akihabara' },
  { id: 'akihabara-7', name: 'Yodobashi Camera',                category: 'shop',       neighborhood: 'akihabara' },
  { id: 'akihabara-8', name: 'Radio Kaikan',                    category: 'shop',       neighborhood: 'akihabara' },
  { id: 'akihabara-9', name: 'Maidreamin',                      category: 'activity',   neighborhood: 'akihabara' },

  // Asakusa
  { id: 'asakusa-1',  name: 'Kamiya Bar',               category: 'bar',        neighborhood: 'asakusa' },
  { id: 'asakusa-2',  name: 'Hoppy Street',             category: 'bar',        neighborhood: 'asakusa' },
  { id: 'asakusa-3',  name: 'Senso-ji',                 category: 'activity',   neighborhood: 'asakusa' },
  { id: 'asakusa-4',  name: 'Kappabashi Kitchen Street',category: 'shop',       neighborhood: 'asakusa' },
  { id: 'asakusa-5',  name: 'Nakamise-dori',            category: 'shop',       neighborhood: 'asakusa' },
  { id: 'asakusa-6',  name: 'Sometaro',                 category: 'restaurant', neighborhood: 'asakusa' },

  // Ueno
  { id: 'ueno-1',     name: 'Ameyoko Market',           category: 'shop',       neighborhood: 'ueno' },
  { id: 'ueno-2',     name: 'Tonkatsu Kotetsu',         category: 'restaurant', neighborhood: 'ueno' },
  { id: 'ueno-3',     name: 'Ueno Yabu Soba',           category: 'restaurant', neighborhood: 'ueno' },
  { id: 'ueno-4',     name: 'Ueno Park',                category: 'activity',   neighborhood: 'ueno' },
  { id: 'ueno-5',     name: 'Tokyo National Museum',    category: 'activity',   neighborhood: 'ueno' },

  // Shimokitazawa
  { id: 'shimokita-1',name: 'Disc Union',               category: 'shop',       neighborhood: 'shimokitazawa' },
  { id: 'shimokita-2',name: 'Village Vanguard',         category: 'shop',       neighborhood: 'shimokitazawa' },
  { id: 'shimokita-3',name: 'Bear Pond Espresso',       category: 'activity',   neighborhood: 'shimokitazawa' },
  { id: 'shimokita-4',name: 'Spread',                   category: 'bar',        neighborhood: 'shimokitazawa' },

  // Ginza
  { id: 'ginza-1',    name: 'Ginza Lion Beer Hall',     category: 'bar',        neighborhood: 'ginza' },
  { id: 'ginza-2',    name: 'Bar High Five',            category: 'bar',        neighborhood: 'ginza' },
  { id: 'ginza-3',    name: 'Tsukiji Outer Market',     category: 'restaurant', neighborhood: 'ginza' },
  { id: 'ginza-4',    name: 'Kyubey',                   category: 'restaurant', neighborhood: 'ginza' },
  { id: 'ginza-5',    name: 'Itoya',                    category: 'shop',       neighborhood: 'ginza' },

  // Yurakucho
  { id: 'yurakucho-1', name: 'Yurakucho Gado-shita',   category: 'bar',        neighborhood: 'yurakucho' },

  // Jinbocho
  { id: 'jinbocho-1', name: 'Vintage Jinbocho',         category: 'shop',       neighborhood: 'jinbocho' },

  // Yanaka
  { id: 'yanaka-1',   name: 'Yanaka Ginza',             category: 'activity',   neighborhood: 'yanaka' },

  // Yoyogi
  { id: 'yoyogi-1',   name: 'Yoyogi Milk Hall',         category: 'bar',        neighborhood: 'yoyogi' },
]
