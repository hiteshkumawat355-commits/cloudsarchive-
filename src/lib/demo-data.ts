export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  cover_image_path: string;
}

export interface Photograph {
  id: string;
  slug: string;
  title: string;
  description: string;
  accessibility_text: string;
  storage_path: string;
  aspect_ratio: '4/5' | '16/9' | '3/4' | '1/1';
  photographer_display_name: string;
  instagram_username?: string;
  instagram_profile_url?: string;
  category_slug: string;
  category_name: string;
  location?: string;
  capture_date?: string;
  published_at: string;
  is_featured: boolean;
  is_photo_of_the_week?: boolean;
  is_demo: boolean;
}

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Cloud Formations',
    slug: 'cloud-formations',
    description: 'Architectural cumulus, lenticular waves, and rare atmospheric structures.',
    cover_image_path: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cat-2',
    name: 'Golden Hour',
    slug: 'golden-hour',
    description: 'Warm, low-angle sunlight illuminating the underside of drifting clouds.',
    cover_image_path: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cat-3',
    name: 'Sunsets',
    slug: 'sunsets',
    description: 'Deep crimson, amber, and violet horizons as day transitions into night.',
    cover_image_path: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cat-4',
    name: 'Storm Clouds',
    slug: 'storm-clouds',
    description: 'Dramatic cumulonimbus anvils, shelf clouds, and electric atmospheric tension.',
    cover_image_path: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cat-5',
    name: 'Rainy Skies',
    slug: 'rainy-skies',
    description: 'Monsoon curtains, distant virga trails, and quiet overcast moods.',
    cover_image_path: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cat-6',
    name: 'Night Skies',
    slug: 'night-skies',
    description: 'Moonlit cloudscapes, twilight silhouettes, and starlit atmospheric windows.',
    cover_image_path: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cat-7',
    name: 'Mountains and Clouds',
    slug: 'mountains-and-clouds',
    description: 'High-altitude peaks piercing through valleys of mist and alpine clouds.',
    cover_image_path: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'cat-8',
    name: 'Dreamy Skies',
    slug: 'dreamy-skies',
    description: 'Soft pastel gradients, minimalist horizons, and serene aerial textures.',
    cover_image_path: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1000&q=80'
  }
];

export const DEMO_PHOTOGRAPHS: Photograph[] = [
  {
    id: 'demo-1',
    slug: 'alpine-inversion-at-dusk',
    title: 'Alpine Inversion at Dusk',
    description: 'Demonstration archive entry illustrating how high-altitude cloud inversions appear in the curated gallery.',
    accessibility_text: 'Dense sea of clouds flowing between dark mountain peaks under a warm twilight sky.',
    storage_path: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85',
    aspect_ratio: '16/9',
    photographer_display_name: 'CloudsArchive Editorial Demo',
    instagram_username: 'cloudsarchive',
    instagram_profile_url: 'https://instagram.com/cloudsarchive',
    category_slug: 'mountains-and-clouds',
    category_name: 'Mountains and Clouds',
    location: 'Western Ghats (Demo Sample)',
    capture_date: '2026-01-15',
    published_at: '2026-01-20',
    is_featured: true,
    is_photo_of_the_week: true,
    is_demo: true
  },
  {
    id: 'demo-2',
    slug: 'anvil-over-the-plains',
    title: 'Anvil Over the Plains',
    description: 'Demonstration archive entry showcasing dramatic storm structure and deep charcoal contrast.',
    accessibility_text: 'Towering dark storm clouds illuminated by a narrow band of evening light on the horizon.',
    storage_path: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=85',
    aspect_ratio: '4/5',
    photographer_display_name: 'CloudsArchive Editorial Demo',
    category_slug: 'storm-clouds',
    category_name: 'Storm Clouds',
    location: 'Deccan Plateau (Demo Sample)',
    capture_date: '2026-02-02',
    published_at: '2026-02-05',
    is_featured: true,
    is_demo: true
  },
  {
    id: 'demo-3',
    slug: 'amber-stratocumulus-drift',
    title: 'Amber Stratocumulus Drift',
    description: 'Demonstration archive entry highlighting warm sunset reflections across layered clouds.',
    accessibility_text: 'Vivid orange and crimson sunset light reflecting off rippled stratocumulus clouds.',
    storage_path: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1200&q=85',
    aspect_ratio: '3/4',
    photographer_display_name: 'CloudsArchive Editorial Demo',
    instagram_username: 'cloudsarchive',
    instagram_profile_url: 'https://instagram.com/cloudsarchive',
    category_slug: 'sunsets',
    category_name: 'Sunsets',
    location: 'Arabian Sea Coast (Demo Sample)',
    capture_date: '2026-02-14',
    published_at: '2026-02-18',
    is_featured: true,
    is_demo: true
  },
  {
    id: 'demo-4',
    slug: 'pastel-zenith',
    title: 'Pastel Zenith',
    description: 'Demonstration archive entry showing soft, minimalist cotton-like clouds during late afternoon.',
    accessibility_text: 'Soft pink and pale blue clouds floating in a calm early evening sky.',
    storage_path: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1200&q=85',
    aspect_ratio: '4/5',
    photographer_display_name: 'CloudsArchive Editorial Demo',
    category_slug: 'dreamy-skies',
    category_name: 'Dreamy Skies',
    capture_date: '2026-03-01',
    published_at: '2026-03-04',
    is_featured: true,
    is_demo: true
  },
  {
    id: 'demo-5',
    slug: 'cumulus-cathedral',
    title: 'Cumulus Cathedral',
    description: 'Demonstration archive entry featuring crisp vertical development of fair-weather cumulus clouds.',
    accessibility_text: 'Bright white cumulus clouds rising against a deep sky-blue atmosphere.',
    storage_path: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1200&q=85',
    aspect_ratio: '16/9',
    photographer_display_name: 'CloudsArchive Editorial Demo',
    category_slug: 'cloud-formations',
    category_name: 'Cloud Formations',
    published_at: '2026-03-10',
    is_featured: true,
    is_demo: true
  },
  {
    id: 'demo-6',
    slug: 'nocturnal-silver-lining',
    title: 'Nocturnal Silver Lining',
    description: 'Demonstration archive entry showing moonlight diffusing through midnight cloud layers.',
    accessibility_text: 'Dark night sky where moonlight illuminates the edges of drifting clouds.',
    storage_path: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?auto=format&fit=crop&w=1200&q=85',
    aspect_ratio: '3/4',
    photographer_display_name: 'CloudsArchive Editorial Demo',
    category_slug: 'night-skies',
    category_name: 'Night Skies',
    published_at: '2026-03-15',
    is_featured: true,
    is_demo: true
  }
];
