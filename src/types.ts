export interface PaletteIdea {
  colors: string[];
  names: string[];
  idea: string;
  keywords: string[];
  price: string;
  demand: string;
  competition: string;
  materials: string[];
  photoTip: string;
  trendLevel: 'hot' | 'rising' | 'niche';
  titles?: string[];
}

export interface LibraryItem {
  type: 'palettes' | 'keywords' | 'titles' | 'ideas';
  cat: string;
  badge?: 'trending' | 'new' | 'popular';
  title: string;
  desc: string;
  colors?: string[];
  keywords?: string[];
  titles?: string[];
  idea?: string;
  materials?: string[];
}
