export interface Capsule {
  id: string
  year: string
  title: string
  category: string
  tags: string[]
  summary: string
  image: string
  link: string
  objectPosition?: string
}

export interface CoverAdjustment {
  posX: number
  posY: number
  scale: number
  fitMode: 'contain' | 'cover'
}

export const defaultAdjustments: Record<number, CoverAdjustment> = {
  0: { posX: 50, posY: 15, scale: 1.0, fitMode: 'cover' }, // Part 1
  1: { posX: 50, posY: 12, scale: 1.0, fitMode: 'cover' }, // Part 2
  2: { posX: 50, posY: 15, scale: 1.0, fitMode: 'cover' }, // Part 3
  3: { posX: 50, posY: 18, scale: 1.0, fitMode: 'cover' }, // Part 4
  4: { posX: 50, posY: 15, scale: 1.0, fitMode: 'cover' }, // Part 5
  5: { posX: 50, posY: 15, scale: 1.0, fitMode: 'cover' }, // Part 6
  6: { posX: 50, posY: 15, scale: 1.0, fitMode: 'cover' }, // Part 7
  7: { posX: 50, posY: 20, scale: 1.0, fitMode: 'cover' }, // Part 8 (JoJolion)
  8: { posX: 50, posY: 30, scale: 1.0, fitMode: 'cover' }, // Part 9 (The JOJOLands)
}

export const capsulesData: Capsule[] = [
  {
    id: 'part-1-phantom-blood',
    year: '1987',
    title: 'Part 1: Phantom Blood',
    category: 'Victorian Gothic & Hamon Era',
    tags: ['Jonathan Joestar', 'Dio Brando', 'London 1888'],
    summary:
      'The legendary inception of the Joestar bloodline. Set in 1880s Victorian England, exploring classic aristocratic tailoring, high-collar coats, and gothic dark romance.',
    image: '/images/cover-part-1.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-2-battle-tendency',
    year: '1987 – 1989',
    title: 'Part 2: Battle Tendency',
    category: '1930s Art Deco & Pulp Adventure',
    tags: ['Joseph Joestar', 'Caesar Zeppeli', 'New York to Rome'],
    summary:
      'Fast-paced pulp globetrotting across 1930s New York, Mexico, and Rome. Characterized by aviator scarves, bandana patterns, and sculpted muscular contrapposto.',
    image: '/images/cover-part-2.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-3-stardust-crusaders',
    year: '1989 – 1992',
    title: 'Part 3: Stardust Crusaders',
    category: 'Gakuran Uniform & Stand Odyssey',
    tags: ['Jotaro Kujo', 'Star Platinum', 'Tokyo to Cairo'],
    summary:
      'Araki introduces the revolutionary concept of Stands. Jotaro Kujo’s iconic customized gakuran coat, gold chain collar, and torn cap redefined manga fashion iconography.',
    image: '/images/cover-part-3.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-4-diamond-is-unbreakable',
    year: '1992 – 1995',
    title: 'Part 4: Diamond is Unbreakable',
    category: 'Pastel Pop & 90s Italian Glamour',
    tags: ['Josuke Higashikata', 'Morioh 1999', 'Versace Motifs'],
    summary:
      'A stylistic paradigm shift into vibrant suburban mystery in Morioh. Josuke’s pompadour, peace/heart badges, and Kira’s tailored suits evoke 90s Moschino and Versace aesthetics.',
    image: '/images/cover-part-4.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-5-golden-wind',
    year: '1995 – 1999',
    title: 'Part 5: Golden Wind',
    category: 'Italian Haute Couture & Cutouts',
    tags: ['Giorno Giovanna', 'Passione', 'Naples & Venice'],
    summary:
      'Araki’s definitive tribute to Italian high fashion. Giorno and the Passione squad wear bespoke sartorial suits with chest cutouts, zipper motifs, and Michelangelo sculpture poses.',
    image: '/images/cover-part-5.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-6-stone-ocean',
    year: '2000 – 2003',
    title: 'Part 6: Stone Ocean',
    category: 'Y2K High-Fashion & Runway Muse',
    tags: ['Jolyne Cujoh', 'Green Dolphin St', 'Gucci Campaign Face'],
    summary:
      'Starring Jolyne Cujoh, who later became the face of Gucci’s worldwide 2013 Cruise Campaign. Characterized by spiderweb textiles, butterfly tattoos, and bold Y2K edge.',
    image: '/images/cover-part-6.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-7-steel-ball-run',
    year: '2004 – 2011',
    title: 'Part 7: Steel Ball Run',
    category: 'Seinen Frontier & Western Couture',
    tags: ['Johnny Joestar', 'Gyro Zeppeli', 'Trans-American Race'],
    summary:
      'Widely celebrated as Araki’s magnum opus. A cross-country horse race in 1890s America combining frontier leathercraft, equestrian chic, and celestial geometric patterns.',
    image: '/images/cover-part-7.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-8-jojolion',
    year: '2011 – 2021',
    title: 'Part 8: JoJolion',
    category: 'Avant-Garde Nautical & Morioh',
    tags: ['Josuke (Gappy)', 'Sailor Sartorial', 'Seinen Modernity'],
    summary:
      'Set in post-quake Morioh, blending nautical sailor tailoring, layered jewelry, and surrealist high fashion with profound existential mystery.',
    image: '/images/cover-part-8.jpg',
    link: 'https://jojo-portal.com',
  },
  {
    id: 'part-9-the-jojolands',
    year: '2023 – Present',
    title: 'Part 9: The JOJOLands',
    category: 'Contemporary Pacific Island Luxury',
    tags: ['Jodio Joestar', 'Oahu Hawaii', 'Streetwear Luxury'],
    summary:
      'Set in subtropical Oahu, Hawaii. Jodio Joestar navigates high-stakes heists and stand battles clad in contemporary island luxury and avant-garde streetwear.',
    image: '/images/cover-part-9.jpg',
    link: 'https://jojo-portal.com',
  },
]
