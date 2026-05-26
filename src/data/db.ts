import { PaletteIdea, LibraryItem } from '../types';

export const OCCASIONS = [
  { value: 'weddings', label: 'Weddings' },
  { value: 'birthdays', label: 'Birthdays' },
  { value: 'baby_shower', label: 'Baby Shower' },
  { value: 'mothers_day', label: 'Mother\'s Day' },
  { value: 'valentine', label: 'Valentine\'s Day' },
  { value: 'christmas', label: 'Christmas / Holiday' },
  { value: 'eid', label: 'Eid / Islamic' },
  { value: 'graduation', label: 'Graduation' },
  { value: 'everyday', label: 'Everyday / Just Because' }
];

export const STYLES = [
  { value: 'classic', label: 'Classic & Elegant' },
  { value: 'modern', label: 'Modern & Bold' },
  { value: 'pastel', label: 'Soft Pastel' },
  { value: 'earthy', label: 'Earthy & Natural' },
  { value: 'luxe', label: 'Luxury & Gold' },
  { value: 'minimal', label: 'Minimalist & Zen' },
  { value: 'vibrant', label: 'Vibrant & Pop' }
];

export const PALETTE_DB: Record<string, Record<string, PaletteIdea[]>> = {
  weddings: {
    classic: [
      { colors:['#F5EDE3','#D4A373','#6B8F71'], names:['Warm Cream','Blush Pink','Sage Green'], idea:'3D pop-up flower cards for summer wedding table settings — blush and cream roses with sage foliage accents', keywords:['wedding card handmade','pop up flower card','bridal shower card','3d wedding invitation','paper flower card'], price:'$28–$45', demand:'Very High', competition:'Medium', materials:['300gsm ivory cardstock','Blush tissue paper','Green crepe paper','Pearl adhesive dots','Gold metallic thread'], photoTip:'Photograph on a marble surface with eucalyptus sprigs. Use soft morning light from a north-facing window.', trendLevel:'hot' },
      { colors:['#FFFDF7','#C9A96E','#2F4F4F'], names:['Linen White','Gold','Dark Teal'], idea:'Elegant gold-foiled layered wedding congratulations cards with dark botanical silhouettes', keywords:['gold wedding card','luxury handmade card','elegant bridal card','gold foil paper art','wedding congratulations'], price:'$32–$55', demand:'High', competition:'Low', materials:['250gsm linen textured white','Gold foil transfer sheets','Dark teal 160gsm cardstock','Vellum overlay paper','Double-sided tape runner'], photoTip:'Style on dark velvet fabric with a gold ring or ribbon. Dramatic side-lighting creates foil sparkle.', trendLevel:'rising' }
    ],
    modern: [
      { colors:['#1A1A2E','#E94560','#F5F5F5'], names:['Dark Navy','Hot Coral','Snow White'], idea:'Minimalist geometric wedding cards with bold coral accents — clean lines, modern typography', keywords:['modern wedding card','minimalist card','geometric wedding','contemporary handmade card','bold wedding invitation'], price:'$22–$35', demand:'High', competition:'Low', materials:['350gsm smooth white cardstock','Coral colored cardstock','Black fine-liner 0.3mm','Bone folder','Precision craft knife'], photoTip:'Photograph on a clean white surface with a single geometric object. Sharp overhead lighting.', trendLevel:'rising' },
      { colors:['#22223B','#4A4E69','#C9ADA7'], names:['Space Navy', 'Dusty Lavender', 'Rose Toast'], idea:'Abstract watercolor splash wedding invitations with silver lining on geometric envelopes', keywords:['modern purple wedding', 'astral aesthetics', 'dusty lavender invite'], price:'$20-$40', demand:'Medium', competition:'Low', materials:['Luxury watercolor paper 300gsm', 'Liquid masking fluid', 'Silver pen'], photoTip:'Place next to modern flatware and dark linens.', trendLevel:'rising' }
    ],
    luxe: [
      { colors:['#0B090A','#BA1826','#F5F3F4'], names:['Matte Black', 'Deep Crimson', 'Chalk White'], idea:'Velvet touch black wedding cards with deep red origami roses emerging from the center', keywords:['black tying wedding', 'red and black invitation', 'origami rose card', 'gothic elegance'], price:'$45-$75', demand:'Niche', competition:'Very Low', materials:['350gsm matte black cardstock', 'Crimson origami paper', 'White gel pen', 'Velvet ribbon'], photoTip:'Moody lighting, dark background, highlight on the red rose.', trendLevel:'hot' }
    ]
  },
  birthdays: {
    modern: [
      { colors:['#2D3436','#2A9D8F','#F4A261'], names:['Dark Slate','Teal Cyan','Warm Yellow'], idea:'Neon-accent birthday cards with geometric confetti — bold modern style for millennial/Gen-Z recipients', keywords:['modern birthday card','neon card','geometric confetti','bold birthday','contemporary handmade'], price:'$14–$24', demand:'High', competition:'Low', materials:['Dark gray/black cardstock','Neon yellow and teal paper','Triangle/diamond confetti punch','Metallic gel pen','Neon washi tape'], photoTip:'Flat lay on a dark surface with actual confetti scattered. High contrast lighting with colored gel.', trendLevel:'rising' }
    ],
    pastel: [
      { colors:['#FFE8F0','#B8E6D0','#FFF4B8'], names:['Baby Pink','Mint Ice','Lemon Drop'], idea:'Ice cream cone pop-up cards — 3 scoops of paper ice cream pop up in matching pastel colors', keywords:['ice cream card','pastel birthday','popup ice cream','cute birthday card','summer birthday card'], price:'$16–$26', demand:'High', competition:'Medium', materials:['Pastel cardstock trio','Kraft paper for cone','Pom poms for cherry tops','Foam pads for 3D','Scallop scissors for details'], photoTip:'Style on a pastel striped background with real sprinkles scattered. Bright cheerful top lighting.', trendLevel:'hot' },
      { colors:['#BDE0FE','#A2D2FF','#FFAFCC'], names:['Cloud Blue', 'Sky Blue', 'Cotton Candy'], idea:'Hot air balloon shaker card for birthdays with pastel bead fillings', keywords:['shaker card', 'hot air balloon', 'kids birthday card'], price:'$18–$30', demand:'Very High', competition:'High', materials:['Acetate sheets', 'Pastel bead mix', 'Foam tape double thick', 'Alcohol markers'], photoTip:'Hold up against a real sky or fluffy white blanket.', trendLevel:'hot' }
    ],
    vibrant: [
      { colors:['#FF006E','#8338EC','#3A86FF'], names:['Magenta', 'Electric Purple', 'Bright Blue'], idea:'Exploding pop-up box birthday card in neon colors featuring a paper cake inside', keywords:['explosion box', 'neon pop up box', 'surprise card', '3d box card'], price:'$35–$60', demand:'Medium', competition:'Low', materials:['Heavyweight neon cardstock 250gsm', 'Scoring board', 'Patterned washi tape', 'Double-sided tape'], photoTip:'Action shot showing the box mid-explosion or fully opened.', trendLevel:'hot' },
      { colors:['#FB5607','#FFBE0B','#FF006E'], names:['Orange Flare', 'Sun Yellow', 'Neon Pink'], idea:'Retro 80s arcade machine birthday card with an interactive sliding character', keywords:['retro gaming card', 'slider card', 'arcade papercraft'], price:'$25–$45', demand:'High', competition:'Low', materials:['Glow in the dark paper', 'Slider mechanisms (plastic dimes/pennies)', 'Thick mounting foam'], photoTip:'Use neon lights in the background for a retro synthwave aesthetic.', trendLevel:'rising' }
    ]
  },
  baby_shower: {
    pastel: [
      { colors:['#DFE7FD','#F0E6EF','#F8D264'], names:['Soft Blue','Pale Lavender','Warm Sun'], idea:'Nursery mobile diorama card — miniature paper stars and clouds hanging from thread inside a 3D box frame', keywords:['diorama card','baby shower popup','nursery mobile paper','star and cloud card'], price:'$25-$45', demand:'High', competition:'Medium', materials:['Heavyweight cover stock', 'Invisible nylon thread', 'Silver foil stars', 'Foam dimensions'], photoTip:'Side angle to show the depth and hanging elements over a soft fluffy blanket.', trendLevel:'hot' }
    ],
    earthy: [
      { colors:['#A5A58D','#B7B7A4','#DDBEA9'], names:['Sage Leaves','Dried Straw','Soft Clay'], idea:'Boho rainbow baby shower card with layered arch cutouts in earthy, gender-neutral tones', keywords:['boho rainbow card','gender neutral baby shower','earthtone papercraft','layered arch card'], price:'$18-$25', demand:'Very High', competition:'High', materials:['Textured earthy cardstock trio', 'Die-cut machine', 'Liquid glue with fine tip'], photoTip:'Style on a wooden floor next to a dried pampas grass vase.', trendLevel:'stable' }
    ]
  },
  everyday: {
    earthy: [
      { colors:['#EFEBE9','#8D6E63','#689F38'], names:['Natural','Mocha','Green'], idea:'Paper potted plant cards — realistic paper succulents, monstera, or cactus in paper terracotta pot for plant lovers', keywords:['plant lover card','paper succulent card','cactus card','monstera card','indoor plant art card'], price:'$14–$24', demand:'High', competition:'Medium', materials:['Natural base card','Brown for terracotta pot','Green papers various','Curling/shaping tools','Texture details with pen'], photoTip:'Style with real potted plants on a wooden shelf. Plant-lover aesthetic. Bright indirect green-filtered light.', trendLevel:'niche' }
    ],
    minimal: [
      { colors:['#FFFFFF','#E2E2E2','#111111'], names:['Pure White','Soft Gray','Carbon Black'], idea:'Architectural blind-debossed notecards — subtle impressions of leaves or buildings without ink', keywords:['blind deboss', 'minimalist stationery', 'elegant notecard', 'embossed paper'], price:'$10-$20', demand:'Medium', competition:'Low', materials:['Extra thick cotton paper 600gsm', 'Embossing folders/dies', 'Die cutting press'], photoTip:'Strong directional side light to highlight the embossed texture.', trendLevel:'niche' }
    ]
  },
  graduation: {
    luxe: [
      { colors:['#000000','#FFD700','#FFFFFF'], names:['Pitch Black', 'Gold Leaf', 'White'], idea:'Tassel shaking graduation card with real miniature tassel and gold foil pressed class year', keywords:['graduation slider card', 'gold foil class year', 'tassel card'], price:'$15-$25', demand:'Seasonal', competition:'Medium', materials:['Black silk cardstock', 'Miniature tassels', 'Gold foil quill/transfer', 'Brads'], photoTip:'Prop next to a diploma or graduation cap with confetti.', trendLevel:'stable' }
    ]
  },
  eid: {
    luxe: [
      { colors:['#1B3B6F','#C9A96E','#F5F5F5'], names:['Midnight Blue', 'Gold', 'Off White'], idea:'Intricate geometric star lantern (fanous) pop-up card for Ramadan and Eid with gold backing', keywords:['eid mubarak card', 'ramadan lantern popup', 'geometric lattice papercraft', 'islamic art card'], price:'$25-$40', demand:'High Seasonal', competition:'Low', materials:['Navy pearl cardstock', 'Gold mirror cardstock', 'Vellum for lantern windows', 'Precision knife or laser cutter'], photoTip:'Place real micro fairy lights behind the vellum windows for a glowing effect.', trendLevel:'hot' }
    ],
    modern: [
      { colors:['#2A9D8F','#E9C46A','#264653'], names:['Teal', 'Ochre Gold', 'Charcoal'], idea:'Modern crescent moon shaker card filled with metallic gold stars and teal sequins', keywords:['modern eid card', 'moon shaker card', 'contemporary islamic greeting'], price:'$18-$25', demand:'Medium', competition:'Low', materials:['Acetate transparent sheets', 'Gold star confetti', 'Teal cardstock 300gsm', 'Double sided foam tape'], photoTip:'Shake the card slightly during photography or video to show motion.', trendLevel:'rising' }
    ]
  }
};

// Fill out defaults
export function getIdea(occasion: string, style: string, projectType: string = 'cards'): PaletteIdea {
  let occData = PALETTE_DB[occasion];
  if (!occData) {
    const keys = Object.keys(PALETTE_DB);
    occData = PALETTE_DB[keys[Math.floor(Math.random() * keys.length)]];
  }
  
  let styleData = occData[style];
  if (!styleData) {
    const styleKeys = Object.keys(occData);
    styleData = occData[styleKeys[Math.floor(Math.random() * styleKeys.length)]];
  }

  const idx = Math.floor(Math.random() * styleData.length);
  const idea = JSON.parse(JSON.stringify(styleData[idx])); // Deep copy

  if (projectType === 'flowers') {
     idea.idea = idea.idea.replace(/cards?/gi, 'layered paper flower arrangement');
     idea.keywords = idea.keywords.map((k: string) => k.replace(/card/gi, 'flower decoration').replace(/popup/gi, '3D'));
  } else if (projectType === 'origami') {
     idea.idea = idea.idea.replace(/cards?/gi, 'intricate origami structure');
     idea.keywords = idea.keywords.map((k: string) => k.replace(/card/gi, 'origami fold'));
  } else if (projectType === 'scrapbook') {
     idea.idea = idea.idea.replace(/cards?/gi, 'scrapbook layout or mini-album');
     idea.keywords = idea.keywords.map((k: string) => k.replace(/card/gi, 'scrapbook page'));
  } else if (projectType === 'party') {
     idea.idea = idea.idea.replace(/cards?/gi, 'party decor banner & centerpieces');
     idea.keywords = idea.keywords.map((k: string) => k.replace(/card/gi, 'party banner').replace(/popup/gi, 'garland'));
  }

  return idea;
}

