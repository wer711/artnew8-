import { PaletteIdea, LibraryItem } from '../types';

export const OCCASIONS = [
  { value: 'weddings', label: 'Weddings' },
  { value: 'birthdays', label: 'Birthdays' },
  { value: 'baby_shower', label: 'Baby Shower' },
  { value: 'mothers_day', label: 'Mother\'s Day' },
  { value: 'valentine', label: 'Valentine\'s Day' },
  { value: 'christmas', label: 'Christmas / Holiday' },
  { value: 'everyday', label: 'Everyday / Just Because' }
];

export const STYLES = [
  { value: 'classic', label: 'Classic & Elegant' },
  { value: 'modern', label: 'Modern & Bold' },
  { value: 'pastel', label: 'Soft Pastel' },
  { value: 'earthy', label: 'Earthy & Natural' },
  { value: 'luxe', label: 'Luxury & Gold' }
];

export const PALETTE_DB: Record<string, Record<string, PaletteIdea[]>> = {
  weddings: {
    classic: [
      { colors:['#F5EDE3','#D4A373','#6B8F71'], names:['Warm Cream','Blush Pink','Sage Green'], idea:'3D pop-up flower cards for summer wedding table settings — blush and cream roses with sage foliage accents', keywords:['wedding card handmade','pop up flower card','bridal shower card','3d wedding invitation','paper flower card'], price:'$28–$45', demand:'Very High', competition:'Medium', materials:['300gsm ivory cardstock','Blush tissue paper','Green crepe paper','Pearl adhesive dots','Gold metallic thread'], photoTip:'Photograph on a marble surface with eucalyptus sprigs. Use soft morning light from a north-facing window.', trendLevel:'hot' },
      { colors:['#FFFDF7','#C9A96E','#2F4F4F'], names:['Linen White','Gold','Dark Teal'], idea:'Elegant gold-foiled layered wedding congratulations cards with dark botanical silhouettes', keywords:['gold wedding card','luxury handmade card','elegant bridal card','gold foil paper art','wedding congratulations'], price:'$32–$55', demand:'High', competition:'Low', materials:['250gsm linen textured white','Gold foil transfer sheets','Dark teal 160gsm cardstock','Vellum overlay paper','Double-sided tape runner'], photoTip:'Style on dark velvet fabric with a gold ring or ribbon. Dramatic side-lighting creates foil sparkle.', trendLevel:'rising' }
    ],
    modern: [
      { colors:['#1A1A2E','#E94560','#F5F5F5'], names:['Dark Navy','Hot Coral','Snow White'], idea:'Minimalist geometric wedding cards with bold coral accents — clean lines, modern typography', keywords:['modern wedding card','minimalist card','geometric wedding','contemporary handmade card','bold wedding invitation'], price:'$22–$35', demand:'High', competition:'Low', materials:['350gsm smooth white cardstock','Coral colored cardstock','Black fine-liner 0.3mm','Bone folder','Precision craft knife'], photoTip:'Photograph on a clean white surface with a single geometric object. Sharp overhead lighting.', trendLevel:'rising' }
    ]
  },
  birthdays: {
    modern: [
      { colors:['#2D3436','#2A9D8F','#F4A261'], names:['Dark Slate','Teal Cyan','Warm Yellow'], idea:'Neon-accent birthday cards with geometric confetti — bold modern style for millennial/Gen-Z recipients', keywords:['modern birthday card','neon card','geometric confetti','bold birthday','contemporary handmade'], price:'$14–$24', demand:'High', competition:'Low', materials:['Dark gray/black cardstock','Neon yellow and teal paper','Triangle/diamond confetti punch','Metallic gel pen','Neon washi tape'], photoTip:'Flat lay on a dark surface with actual confetti scattered. High contrast lighting with colored gel.', trendLevel:'rising' }
    ],
    pastel: [
      { colors:['#FFE8F0','#B8E6D0','#FFF4B8'], names:['Baby Pink','Mint Ice','Lemon Drop'], idea:'Ice cream cone pop-up cards — 3 scoops of paper ice cream pop up in matching pastel colors', keywords:['ice cream card','pastel birthday','popup ice cream','cute birthday card','summer birthday card'], price:'$16–$26', demand:'High', competition:'Medium', materials:['Pastel cardstock trio','Kraft paper for cone','Pom poms for cherry tops','Foam pads for 3D','Scallop scissors for details'], photoTip:'Style on a pastel striped background with real sprinkles scattered. Bright cheerful top lighting.', trendLevel:'hot' }
    ]
  },
  everyday: {
    earthy: [
      { colors:['#EFEBE9','#8D6E63','#689F38'], names:['Natural','Mocha','Green'], idea:'Paper potted plant cards — realistic paper succulents, monstera, or cactus in paper terracotta pot for plant lovers', keywords:['plant lover card','paper succulent card','cactus card','monstera card','indoor plant art card'], price:'$14–$24', demand:'High', competition:'Medium', materials:['Natural base card','Brown for terracotta pot','Green papers various','Curling/shaping tools','Texture details with pen'], photoTip:'Style with real potted plants on a wooden shelf. Plant-lover aesthetic. Bright indirect green-filtered light.', trendLevel:'niche' }
    ]
  }
};

// Fill out defaults
export function getIdea(occasion: string, style: string): PaletteIdea {
  const occData = PALETTE_DB[occasion] || PALETTE_DB['everyday'] || PALETTE_DB['weddings'];
  const styleData = occData[style] || occData['classic'] || occData[Object.keys(occData)[0]];
  const idx = Math.floor(Math.random() * styleData.length);
  return styleData[idx];
}
