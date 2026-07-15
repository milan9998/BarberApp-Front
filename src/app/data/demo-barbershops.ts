export interface ShopProfile {
  location: string;
  address: string;
  tag: string;
  founded: string;
  hours: string;
  priceRange: string;
  specialties: string[];
  shortDescription: string;
  story: string;
  atmosphere: string;
  gallery: string[];
}

export interface BarberProfileEnrichment {
  photo: string;
  title: string;
  bio: string;
  specialties: string[];
  experience: string;
}

const SHOP_GALLERY = [
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1536520002442-39764a41e987?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80'
] as const;

const SHOP_HERO_INDEX: Record<string, number> = {
  'Truefitt & Hill': 0,
  'Schorem Barbier': 1,
  'Pall Mall Barbers': 2,
  'Blind Barber': 3,
  'Ruffians Shoreditch': 4,
  'Murdock London': 5,
  'Fellow Barber': 6,
  'Persons of Interest': 7,
  'Ludlow Blunt': 8,
  'The Art of Shaving': 9,
  'Barber Barber Manchester': 10,
  'Pankhurst London': 11,
  'Nomad Barber': 12,
  'Scissors & Scotch': 13,
  'Boardroom Styling Lounge': 14,
  'Grooming Lounge': 15,
  "Hawleywood's Barbershop": 16,
  'Victory Barber & Brand': 17,
  'Bolt Barbers': 18,
  "Sweeney Todd's Barber Shop": 19
};

const BARBER_PORTRAITS = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=800&q=80'
] as const;

const BARBER_TITLES = [
  'Master Barber',
  'Senior Stylist',
  'Fade Specialist',
  'Classic Shave Expert',
  'Creative Director',
  'Grooming Consultant'
];

const BARBER_SPECIALTY_SETS = [
  ['Skin fade', 'Beard sculpture', 'Hot towel finish'],
  ['Classic cut', 'Wet shave', 'Executive grooming'],
  ['Textured crop', 'Scissor work', 'Style consult'],
  ['Beard design', 'Line-up', 'Maintenance plans'],
  ['Precision taper', 'Modern classic', 'Detail finishing'],
  ['Long-to-short transformation', 'Product styling', 'Shape-up']
];

const BARBER_BIOS = [
  'Known for calm consultation and razor-sharp fades that hold shape for weeks.',
  'Specializes in classic British grooming — clean silhouette, polished finish, zero rush.',
  'Builds each cut around face shape and lifestyle, then locks the look with precise detailing.',
  'Brings old-school chair craft with modern timing: efficient, meticulous, and consistent.',
  'Favourite for first-time clients who want clarity before the first clipper pass.',
  'Balances creative texture with wearable everyday style for professionals and creatives alike.'
];

function seedFrom(text: string): number {
  return Array.from(text).reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

function pickGallery(seed: number, shopName?: string): string[] {
  const hero =
    shopName && shopName in SHOP_HERO_INDEX
      ? SHOP_HERO_INDEX[shopName]
      : seed % SHOP_GALLERY.length;
  const len = SHOP_GALLERY.length;
  return [
    SHOP_GALLERY[hero % len],
    SHOP_GALLERY[(hero + 5) % len],
    SHOP_GALLERY[(hero + 11) % len],
    SHOP_GALLERY[(hero + 17) % len]
  ];
}

function profile(
  partial: Omit<ShopProfile, 'gallery'> & { gallerySeed: string }
): ShopProfile {
  const { gallerySeed, ...rest } = partial;
  return {
    ...rest,
    gallery: pickGallery(seedFrom(gallerySeed), gallerySeed)
  };
}

export const SHOP_PROFILES: Record<string, ShopProfile> = {
  'Truefitt & Hill': profile({
    gallerySeed: 'Truefitt & Hill',
    location: 'London, United Kingdom',
    address: '71 St James\'s Street, St James\'s, London',
    tag: 'Heritage luxury',
    founded: 'Est. 1805',
    hours: 'Mon–Sat 09:00–19:00 · Sun closed',
    priceRange: '$85–$165',
    specialties: ['Royal wet shave', 'Classic gentleman cut', 'Beard refining', 'Scalp treatment'],
    shortDescription:
      'A legendary grooming house with royal heritage, ceremonial wet shaves, and unhurried chair craft.',
    story:
      'Truefitt & Hill represents the ceremonial side of barbering: quiet rooms, precise consultation, and rituals that turn a haircut into an appointment worth dressing for. Expect classical silhouettes, hot-towel shaves, and a service cadence designed for clients who value discretion and consistency.',
    atmosphere:
      'Dark wood, polished brass, and a measured pace. The room feels closer to a private club than a walk-in shop.'
  }),
  'Schorem Barbier': profile({
    gallerySeed: 'Schorem Barbier',
    location: 'Rotterdam, Netherlands',
    address: 'Nieuwe Binnenweg, Rotterdam Centrum',
    tag: 'Old-school icon',
    founded: 'Cult classic',
    hours: 'Tue–Sat 10:00–18:00 · Appointment preferred',
    priceRange: '$45–$90',
    specialties: ['Hard part fades', 'Rockabilly cuts', 'Beard contour', 'Traditional clipper work'],
    shortDescription:
      'A cult barbershop known worldwide for old-school craft, sharp contours, and uncompromising style.',
    story:
      'Schorem Barbier made raw barber culture famous: loud personality, strict craft standards, and cuts that read from across the street. This profile channels that energy into a modern booking flow without losing the shop\'s attitude — bold shapes, clean lines, zero soft compromise.',
    atmosphere:
      'Tattooed swagger, vintage flash, and a soundtrack that never apologizes. Built for clients who want character with their fade.'
  }),
  'Pall Mall Barbers': profile({
    gallerySeed: 'Pall Mall Barbers',
    location: 'London, United Kingdom',
    address: 'Pall Mall / City of London locations',
    tag: 'Award-winning',
    founded: 'Multi-award London brand',
    hours: 'Mon–Fri 08:00–20:00 · Sat 09:00–18:00',
    priceRange: '$40–$75',
    specialties: ['Executive cut', 'Beard architecture', 'Same-day polish', 'Consultation-first styling'],
    shortDescription:
      'Award-winning London barbers with premium appointments, beard care, and business-ready grooming.',
    story:
      'Pall Mall Barbers sits at the intersection of City professionalism and barber excellence. The experience is engineered for people who need to look decisive before a meeting: clean taper, controlled texture, and beard work that photographs well under office light.',
    atmosphere:
      'Sharp interiors, confident service rhythm, and a booking culture built around reliability.'
  }),
  'Blind Barber': profile({
    gallerySeed: 'Blind Barber',
    location: 'New York, United States',
    address: 'East Village & multiple NYC rooms',
    tag: 'Lifestyle grooming',
    founded: 'NYC lifestyle brand',
    hours: 'Daily 10:00–20:00 · Extended evenings',
    priceRange: '$55–$105',
    specialties: ['Modern classic cut', 'Lifestyle finish', 'Beard tidy', 'Event-ready grooming'],
    shortDescription:
      'A modern grooming destination blending barbershop culture, nightlife energy, and polished hospitality.',
    story:
      'Blind Barber popularized the idea that a barbershop can be a cultural room — not only a service counter. Cuts are contemporary and wearable, while the brand story leans into nightlife, music, and social energy without sacrificing technical quality.',
    atmosphere:
      'Moody lighting, social buzz, and a finish that works from daytime meetings to late evenings.'
  }),
  'Ruffians Shoreditch': profile({
    gallerySeed: 'Ruffians Shoreditch',
    location: 'London, United Kingdom',
    address: 'Shoreditch / East London',
    tag: 'Contemporary premium',
    founded: 'Design-led London house',
    hours: 'Mon–Sat 09:00–19:00 · Sun by request',
    priceRange: '$55–$110',
    specialties: ['Precision scissor cut', 'Soft fade', 'Style mapping', 'Premium product finish'],
    shortDescription:
      'A contemporary barbershop experience built around premium design, consultation, and precision cuts.',
    story:
      'Ruffians treats grooming like product design: diagnose the face, map the lifestyle, then execute with obsessive finishing. The Shoreditch expression is editorial — clean geometry, soft contrasts, and a client journey that feels curated rather than transactional.',
    atmosphere:
      'Gallery-clean interiors, considered materials, and a calm professional tone.'
  }),
  'Murdock London': profile({
    gallerySeed: 'Murdock London',
    location: 'London, United Kingdom',
    address: 'Covent Garden & flagship rooms',
    tag: 'British grooming',
    founded: 'Fragrance-led grooming house',
    hours: 'Mon–Sat 10:00–19:00',
    priceRange: '$70–$140',
    specialties: ['Signature cut', 'Scented shave ritual', 'Skincare add-ons', 'Retail consultation'],
    shortDescription:
      'A refined destination known for luxury barber services, fragrance, skincare, and polished retail presentation.',
    story:
      'Murdock blends chair craft with British grooming retail: the cut is only the start. Clients come for silhouette control, scent layering, and a finished look that feels complete — hair, skin, and presentation in one visit.',
    atmosphere:
      'Apothecary elegance, soft lighting, and a boutique rhythm.'
  }),
  'Fellow Barber': profile({
    gallerySeed: 'Fellow Barber',
    location: 'New York, United States',
    address: 'SoHo, West Village & NYC studios',
    tag: 'Modern classic',
    founded: 'NYC modern classic',
    hours: 'Daily 09:00–20:00',
    priceRange: '$50–$95',
    specialties: ['Clean American classic', 'Beard maintain', 'Quick polish', 'Repeatable weekly cut'],
    shortDescription:
      'A recognizable urban barber brand with accessible premium cuts, strong interiors, and polished booking.',
    story:
      'Fellow Barber proved that premium does not have to feel exclusive. The experience is friendly, fast enough for city calendars, and consistent enough that clients rebook without thinking. Expect reliable classic shapes with contemporary edge.',
    atmosphere:
      'Warm wood, clear process, and a neighborhood confidence that scales across locations.'
  }),
  'Persons of Interest': profile({
    gallerySeed: 'Persons of Interest',
    location: 'Brooklyn, United States',
    address: 'Williamsburg / Brooklyn',
    tag: 'Brooklyn style',
    founded: 'Neighborhood editorial shop',
    hours: 'Tue–Sun 11:00–19:00',
    priceRange: '$55–$110',
    specialties: ['Textured crops', 'Natural finish', 'Beard line art', 'Creative consult'],
    shortDescription:
      'Neighborhood barbershop identity with an editorial feel, modern grooming, and authentic local character.',
    story:
      'Persons of Interest reads like a Brooklyn story first and a service menu second. The cuts lean textured and personal, with barbers who talk style language fluently and leave room for individuality instead of forcing a house template.',
    atmosphere:
      'Intimate room, creative clients, and a lived-in premium that never feels corporate.'
  }),
  'Ludlow Blunt': profile({
    gallerySeed: 'Ludlow Blunt',
    location: 'Brooklyn, United States',
    address: 'Lower East Side / Brooklyn rooms',
    tag: 'Vintage luxury',
    founded: 'Old-world inspired house',
    hours: 'Mon–Sat 10:00–19:00',
    priceRange: '$70–$135',
    specialties: ['Vintage silhouette', 'Straight-razor detail', 'Scalp massage', 'Formal finish'],
    shortDescription:
      'Classic grooming atmosphere inspired by old-world shops, detailed service, and elevated visual identity.',
    story:
      'Ludlow Blunt channels vintage luxury without becoming costume. The service is ceremonial enough to feel special, but technical enough for modern hair types and dense city schedules.',
    atmosphere:
      'Antique mirrors, deep tones, and a quiet sense of occasion.'
  }),
  'The Art of Shaving': profile({
    gallerySeed: 'The Art of Shaving',
    location: 'United States',
    address: 'Flagship grooming studios nationwide',
    tag: 'Shaving specialist',
    founded: 'Wet-shave authority',
    hours: 'Mon–Sat 10:00–19:00 · Sun select locations',
    priceRange: '$65–$130',
    specialties: ['Hot towel shave', 'Beard therapy', 'Pre-shave ritual', 'Product education'],
    shortDescription:
      'Premium grooming concept centered on wet shaving, beard care, product discovery, and service consistency.',
    story:
      'The Art of Shaving built an entire category around ritual. Haircuts matter, but the signature is the shave: staged towels, oils, precision blade work, and aftercare that teaches clients how to maintain the result at home.',
    atmosphere:
      'Spa-adjacent calm with masculine materials and a teaching-minded team.'
  }),
  'Barber Barber Manchester': profile({
    gallerySeed: 'Barber Barber Manchester',
    location: 'Manchester, United Kingdom',
    address: 'Manchester city centre',
    tag: 'UK barber culture',
    founded: 'Northern UK powerhouse',
    hours: 'Mon–Sat 09:00–18:30',
    priceRange: '$30–$60',
    specialties: ['British fade', 'Beard reshape', 'Match-day polish', 'Walk-in energy + booking'],
    shortDescription:
      'Bold British barber brand with traditional craft, strong masculine design, and professional grooming services.',
    story:
      'Barber Barber Manchester represents high-energy UK barber culture: confident branding, technical fades, and a shop floor that moves. Ideal for clients who want a decisive look without losing approachability.',
    atmosphere:
      'Industrial warmth, bold graphics, and a team that works with pace and pride.'
  }),
  'Pankhurst London': profile({
    gallerySeed: 'Pankhurst London',
    location: 'London, United Kingdom',
    address: 'Mayfair, London',
    tag: 'Mayfair grooming',
    founded: 'Mayfair gentleman house',
    hours: 'Mon–Sat 09:00–18:00 · Private slots available',
    priceRange: '$75–$150',
    specialties: ['Discreet executive cut', 'Private shave', 'Style continuity', 'Concierge pacing'],
    shortDescription:
      'High-end gentleman grooming designed for luxury clients, sharp details, and sophisticated presentation.',
    story:
      'Pankhurst London is for clients who treat appearance as part of professional infrastructure. The visit is quiet, exacting, and continuity-focused — the same silhouette, refined every time, with no unnecessary theatre.',
    atmosphere:
      'Mayfair restraint: soft speech, exact timing, and materials that whisper rather than shout.'
  }),
  'Nomad Barber': profile({
    gallerySeed: 'Nomad Barber',
    location: 'London, United Kingdom',
    address: 'London studios + global pop-up DNA',
    tag: 'Global barber story',
    founded: 'Travel-born craft brand',
    hours: 'Tue–Sat 10:00–19:00',
    priceRange: '$40–$80',
    specialties: ['Cross-cultural techniques', 'Education-led cut', 'Travel-ready styles', 'Documentary craft'],
    shortDescription:
      'Internationally recognized concept built around travel, craft education, and visual storytelling.',
    story:
      'Nomad Barber treats barbering as a global craft conversation. Techniques travel, stories travel, and the cut becomes a document of where craft has been — useful for clients who want character and technique, not only trend.',
    atmosphere:
      'Workshop energy with travel artifacts, tools on display, and a teaching posture.'
  }),
  'Scissors & Scotch': profile({
    gallerySeed: 'Scissors & Scotch',
    location: 'United States',
    address: 'Membership lounges across major US cities',
    tag: 'Barber lounge',
    founded: 'Hospitality-first grooming club',
    hours: 'Daily 09:00–21:00 · Lounge hours vary',
    priceRange: '$45–$95',
    specialties: ['Lounge cut', 'Hosted wait experience', 'Beard + whiskey pairing vibe', 'Membership cadence'],
    shortDescription:
      'Membership-style grooming lounge combining barber services, hospitality, and premium lifestyle experience.',
    story:
      'Scissors & Scotch reframes the appointment as hospitality: arrive, settle, get served, leave sharper. The cut quality matters, but so does the room — seating, pace, and a sense that grooming can be social infrastructure.',
    atmosphere:
      'Club lighting, lounge seating, and a host mindset around every chair.'
  }),
  'Boardroom Styling Lounge': profile({
    gallerySeed: 'Boardroom Styling Lounge',
    location: 'United States',
    address: 'Executive districts & business corridors',
    tag: 'Executive grooming',
    founded: 'Corporate grooming lounge',
    hours: 'Mon–Fri 07:30–19:00 · Sat limited',
    priceRange: '$90–$180',
    specialties: ['Executive taper', 'Camera-ready finish', 'Quick turnaround', 'Travel grooming kits'],
    shortDescription:
      'Professional men’s grooming focused on business clients, comfort, consistency, and upscale service flow.',
    story:
      'Boardroom Styling Lounge is optimized for decision-makers: early slots, predictable duration, and finishes that survive fluorescent offices and video calls. The product promise is reliability under pressure.',
    atmosphere:
      'Quiet luxury, leather seating, and a schedule that respects calendars.'
  }),
  'Grooming Lounge': profile({
    gallerySeed: 'Grooming Lounge',
    location: 'Washington DC, United States',
    address: 'Downtown Washington DC',
    tag: 'Full-service grooming',
    founded: 'Full-menu grooming destination',
    hours: 'Mon–Sat 09:00–20:00 · Sun 11:00–17:00',
    priceRange: '$60–$120',
    specialties: ['Haircut + shave combo', 'Skincare add-on', 'Beard restoration', 'Occasion grooming'],
    shortDescription:
      'Premium lounge with haircuts, shaves, skincare, and a polished experience for modern professionals.',
    story:
      'Grooming Lounge expands the barbershop into a broader self-care destination. Clients can stack services in one visit and leave with hair, skin, and beard handled under one consistent standard.',
    atmosphere:
      'Bright-premium interiors, spa-adjacent service flow, and a polished DC professional crowd.'
  }),
  'Hawleywood\'s Barbershop': profile({
    gallerySeed: 'Hawleywood\'s Barbershop',
    location: 'United States',
    address: 'Classic Americana main-street rooms',
    tag: 'Retro classic',
    founded: 'Retro-Americana brand',
    hours: 'Tue–Sat 09:00–18:00',
    priceRange: '$35–$70',
    specialties: ['Flat top & classic cuts', 'Straight-razor neck', 'Pomade finish', 'Father-son appointments'],
    shortDescription:
      'Vintage-inspired brand with strong personality, classic Americana aesthetics, and traditional services.',
    story:
      'Hawleywood\'s sells nostalgia with technical integrity. The look is retro, the craft is current, and the experience is built for clients who want a shop with soul rather than a sterile clinic vibe.',
    atmosphere:
      'Checkered floors, vintage signage, and a friendly noise level that feels like a real neighborhood shop.'
  }),
  'Victory Barber & Brand': profile({
    gallerySeed: 'Victory Barber & Brand',
    location: 'Victoria, Canada',
    address: 'Victoria, British Columbia',
    tag: 'Craft grooming',
    founded: 'Product-driven craft brand',
    hours: 'Mon–Sat 10:00–18:00',
    priceRange: '$40–$85',
    specialties: ['Product-led finish', 'Scissor craft', 'Beard oil ritual', 'Brand education'],
    shortDescription:
      'Barber brand with product-driven identity, quality cuts, and premium lifestyle positioning.',
    story:
      'Victory Barber & Brand connects chair work to a product universe. The cut is designed to be maintainable at home, and the team educates as they style — perfect for clients who care about both the appointment and the aftercare shelf.',
    atmosphere:
      'West-coast craft aesthetic: natural materials, product walls, and calm confidence.'
  }),
  'Bolt Barbers': profile({
    gallerySeed: 'Bolt Barbers',
    location: 'Los Angeles, United States',
    address: 'Los Angeles metro studios',
    tag: 'Urban cuts',
    founded: 'LA speed + style',
    hours: 'Daily 10:00–20:00',
    priceRange: '$25–$55',
    specialties: ['City fade', 'Shape-up', 'Beard align', 'Express lunch slots'],
    shortDescription:
      'Modern city concept with fast booking, strong brand energy, and approachable premium grooming.',
    story:
      'Bolt Barbers is built for LA pace: book quickly, get a decisive cut, leave camera-ready. The technical focus is clean fades and sharp edges that hold under sun and nightlife lighting.',
    atmosphere:
      'Bright urban energy, playlist-forward rooms, and a streamlined chair process.'
  }),
  'Sweeney Todd\'s Barber Shop': profile({
    gallerySeed: 'Sweeney Todd\'s Barber Shop',
    location: 'Los Angeles, United States',
    address: 'Classic LA barber corridors',
    tag: 'Traditional shop',
    founded: 'Traditional LA classic',
    hours: 'Tue–Sat 09:00–18:00',
    priceRange: '$35–$70',
    specialties: ['Traditional cut', 'Neck shave', 'Simple beard trim', 'No-nonsense service'],
    shortDescription:
      'Classic barber identity built around traditional cuts, nostalgic atmosphere, and straightforward service value.',
    story:
      'Sweeney Todd\'s keeps the classic American shop alive: direct talk, dependable craft, and a menu that does not overcomplicate. Ideal for clients who want tradition without theatre.',
    atmosphere:
      'Straight chairs, familiar tools, and a neighborhood cadence that feels timeless.'
  })
};

export const BARBER_DEMO_IMAGES = SHOP_GALLERY;

export function getDemoGalleryForCompany(companyName: string): string[] {
  return getShopProfile(companyName).gallery;
}

export function getShopProfile(companyName: string, _lang?: string): ShopProfile {
  if (SHOP_PROFILES[companyName]) {
    return SHOP_PROFILES[companyName];
  }

  return profile({
    gallerySeed: companyName,
    location: 'Premium global destination',
    address: 'Featured marketplace location',
    tag: 'Premium booking',
    founded: 'Marketplace partner',
    hours: 'Mon–Sat 09:00–19:00',
    priceRange: '$40–$80',
    specialties: ['Signature cut', 'Beard care', 'Hot towel finish', 'Style consult'],
    shortDescription:
      'A curated barbershop profile with online booking, premium services, and a modern customer experience.',
    story:
      'This shop joins Barber Control Headquarters as a premium partner profile: clear service catalog, bookable capacity, and a presentation built for clients who expect more than a phone reservation.',
    atmosphere:
      'Clean premium interiors, professional pacing, and a booking-first client journey.'
  });
}

export function enrichBarberProfile(
  companyName: string,
  barberName: string,
  index: number,
  _lang?: string
): BarberProfileEnrichment {
  const seed = seedFrom(`${companyName}:${barberName}:${index}`);
  return {
    photo: BARBER_PORTRAITS[seed % BARBER_PORTRAITS.length],
    title: BARBER_TITLES[seed % BARBER_TITLES.length],
    bio: BARBER_BIOS[seed % BARBER_BIOS.length],
    specialties: BARBER_SPECIALTY_SETS[seed % BARBER_SPECIALTY_SETS.length],
    experience: `${5 + (seed % 12)} yrs chair experience`
  };
}

export function formatHours(start: string | { hours?: number; minutes?: number } | null | undefined, end: string | { hours?: number; minutes?: number } | null | undefined): string {
  const toLabel = (value: any): string => {
    if (!value) {
      return '--:--';
    }
    if (typeof value === 'string') {
      return value.slice(0, 5);
    }
    const hours = String(value.hours ?? 0).padStart(2, '0');
    const minutes = String(value.minutes ?? 0).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return `${toLabel(start)} – ${toLabel(end)}`;
}
