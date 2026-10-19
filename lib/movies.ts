export type Movie = {
  id: string
  title: string
  year: number
  rating: string
  duration: string
  genres: string[]
  score: number
  poster: string
  backdrop?: string
  synopsis: string
  cast: string[]
  qualities: { label: string; size: string }[]
}

const defaultQualities = [
  { label: '4K HDR', size: '8.4 GB' },
  { label: '1080p', size: '2.1 GB' },
  { label: '720p', size: '980 MB' },
  { label: '480p', size: '460 MB' },
]

export const movies: Movie[] = [
  {
    id: 'neon-tides',
    title: 'Neon Tides',
    year: 2026,
    rating: '16+',
    duration: '2h 14m',
    genres: ['Thriller', 'Drama'],
    score: 9.1,
    poster: '/images/poster-8.png',
    backdrop: '/images/hero-neon-tides.png',
    synopsis:
      'A disgraced journalist returns to the city that exiled her, chasing a story that powerful families will do anything to keep buried beneath the rain-soaked skyline.',
    cast: ['Mina Seo', 'Daniel Okafor', 'Ren Takahashi'],
    qualities: defaultQualities,
  },
  {
    id: 'last-orchard',
    title: 'The Last Orchard',
    year: 2026,
    rating: '13+',
    duration: '1h 58m',
    genres: ['Family', 'Drama'],
    score: 8.7,
    poster: '/images/poster-7.png',
    backdrop: '/images/hero-last-orchard.png',
    synopsis:
      'Two estranged brothers reunite for one final harvest on their late father’s land, unearthing secrets that could save the family — or end it.',
    cast: ['Lucas Moreau', 'Ana Ribeiro', 'Tom Hale'],
    qualities: defaultQualities,
  },
  {
    id: 'fog-district',
    title: 'Fog District',
    year: 2025,
    rating: '16+',
    duration: '2h 02m',
    genres: ['Crime', 'Noir'],
    score: 8.4,
    poster: '/images/poster-1.png',
    synopsis:
      'One streetlight. One witness. A weary detective has a single night to solve a murder before the fog lifts and the killer disappears forever.',
    cast: ['Henry Vale', 'Iris Kim', 'Marco Bell'],
    qualities: defaultQualities,
  },
  {
    id: 'spring-umbrella',
    title: 'Under Spring Umbrellas',
    year: 2026,
    rating: '13+',
    duration: '16 Episodes',
    genres: ['Romance', 'K-Drama'],
    score: 9.3,
    poster: '/images/poster-2.png',
    synopsis:
      'A barista and a struggling composer keep meeting under the same cherry blossom tree — but fate has a habit of scheduling their goodbyes too.',
    cast: ['Ha Ji-woo', 'Park Seo-jin', 'Lee Na-ra'],
    qualities: defaultQualities,
  },
  {
    id: 'pale-ocean',
    title: 'Pale Ocean',
    year: 2026,
    rating: '13+',
    duration: '2h 31m',
    genres: ['Sci-Fi', 'Adventure'],
    score: 8.9,
    poster: '/images/poster-3.png',
    synopsis:
      'Stranded above a glowing alien sea, the last surviving astronaut of a doomed mission must decide whether to return home or follow the signal below.',
    cast: ['Ava Lindqvist', 'Omar Haddad'],
    qualities: defaultQualities,
  },
  {
    id: 'crown-of-ash',
    title: 'Crown of Ash',
    year: 2025,
    rating: '18+',
    duration: '20 Episodes',
    genres: ['Historical', 'Epic'],
    score: 9.0,
    poster: '/images/poster-4.png',
    synopsis:
      'When her kingdom is betrayed from within, a warrior queen rides through the misty valleys to reclaim a throne that was never meant for her.',
    cast: ['Zhao Lin', 'Kenji Mori', 'Sara Voss'],
    qualities: defaultQualities,
  },
  {
    id: 'hollow-house',
    title: 'The Hollow House',
    year: 2025,
    rating: '18+',
    duration: '1h 47m',
    genres: ['Horror', 'Mystery'],
    score: 7.9,
    poster: '/images/poster-5.png',
    synopsis:
      'Every night a light turns on in the abandoned house at the edge of the forest. Every morning, someone in town is missing.',
    cast: ['Clara Novak', 'Eli Brooks'],
    qualities: defaultQualities,
  },
  {
    id: 'redline',
    title: 'Redline Tunnel',
    year: 2026,
    rating: '16+',
    duration: '2h 05m',
    genres: ['Action', 'Racing'],
    score: 8.2,
    poster: '/images/poster-6.png',
    synopsis:
      'A retired street racer is pulled back for one last underground run through the city’s deadliest tunnel — with his sister’s freedom on the line.',
    cast: ['Jay Rivera', 'Kaito Ono', 'Lena Cruz'],
    qualities: defaultQualities,
  },
  {
    id: 'storm-keeper',
    title: 'Storm Keeper',
    year: 2024,
    rating: '13+',
    duration: '1h 52m',
    genres: ['Survival', 'Drama'],
    score: 8.0,
    poster: '/images/poster-9.png',
    synopsis:
      'A lighthouse keeper faces the storm of the century as a lost fishing boat drifts toward the rocks below.',
    cast: ['Finn Doyle', 'Maeve Clarke'],
    qualities: defaultQualities,
  },
  {
    id: 'moon-blade',
    title: 'Moon Blade',
    year: 2026,
    rating: '16+',
    duration: '12 Episodes',
    genres: ['Martial Arts', 'Action'],
    score: 8.8,
    poster: '/images/poster-10.png',
    synopsis:
      'A masked swordsman haunts the rooftops of a quiet village, hunting the clan that burned his home under the last full moon.',
    cast: ['Hiro Sato', 'Yuna Aoki'],
    qualities: defaultQualities,
  },
  {
    id: 'glass-tower',
    title: 'Glass Tower',
    year: 2026,
    rating: '16+',
    duration: '10 Episodes',
    genres: ['Corporate', 'Thriller'],
    score: 8.6,
    poster: '/images/poster-8.png',
    synopsis:
      'The youngest CEO in the city discovers the board has been planning her downfall since the day she was hired.',
    cast: ['Grace Lim', 'Victor Hale'],
    qualities: defaultQualities,
  },
  {
    id: 'kitchen-light',
    title: 'Kitchen Light',
    year: 2025,
    rating: 'All',
    duration: '1h 39m',
    genres: ['Comedy', 'Drama'],
    score: 8.3,
    poster: '/images/poster-7.png',
    synopsis:
      'A grumpy master chef reluctantly takes on a hopeless apprentice — and finds the recipe for a second chance.',
    cast: ['Paolo Greco', 'Nina Shah'],
    qualities: defaultQualities,
  },
]

export const featured = movies.filter((m) => m.backdrop)

const byId = (ids: string[]) => ids.map((id) => movies.find((m) => m.id === id)!).filter(Boolean)

export const rows = [
  {
    title: 'Trending Now',
    items: byId(['spring-umbrella', 'pale-ocean', 'crown-of-ash', 'redline', 'moon-blade', 'fog-district', 'hollow-house', 'storm-keeper']),
  },
  {
    title: 'Binge-worthy Dramas',
    items: byId(['crown-of-ash', 'spring-umbrella', 'glass-tower', 'moon-blade', 'kitchen-light', 'last-orchard']),
  },
  {
    title: 'Edge-of-Your-Seat Thrillers',
    items: byId(['fog-district', 'hollow-house', 'neon-tides', 'redline', 'glass-tower', 'storm-keeper']),
  },
]

export const topTen = byId([
  'spring-umbrella',
  'neon-tides',
  'crown-of-ash',
  'pale-ocean',
  'moon-blade',
  'last-orchard',
  'glass-tower',
  'fog-district',
  'redline',
  'kitchen-light',
])

export const genres = ['All', 'K-Drama', 'Thriller', 'Romance', 'Action', 'Sci-Fi', 'Historical', 'Horror', 'Comedy', 'Family']
