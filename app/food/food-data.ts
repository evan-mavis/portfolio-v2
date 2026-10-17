interface FoodImage {
  src: string;
  alt: string;
}

const S_TIER_IMAGES: FoodImage[] = [
  { src: "/japan-osaka-scallop.jpeg", alt: "scallop - osaka, japan" },
  { src: "/japan-kyoto-ramen.jpeg", alt: "ramen - kyoto, japan" },
  { src: "/japan-tokyo-tuna-market.jpeg", alt: "tuna market - tokyo, japan" },
  { src: "/japan-tokyo-wagyu.jpeg", alt: "wagyu beef - tokyo, japan" },
  {
    src: "/japan-osaka-a5-kobe-wagyu-skewers.jpeg",
    alt: "a5 kobe wagyu skewers - osaka, japan",
  },
  {
    src: "/bali-ubud-dragon-fruit-bfast-bowl.jpeg",
    alt: "dragon fruit breakfast bowl - ubud, bali",
  },
  { src: "/japan-osaka-fatty-toro.jpeg", alt: "fatty toro - osaka, japan" },
  {
    src: "/vietnam-hoi-an-cao-lau-noodles.jpeg",
    alt: "cao lau noodles - hoi an, vietnam",
  },
  {
    src: "/bali-uluwatu-mie-goreng-and-pork-buns.jpeg",
    alt: "mie goreng and pork buns - uluwatu, bali",
  },
  { src: "/japan-tokyo-ramen.jpeg", alt: "ramen - tokyo, japan" },
  {
    src: "/vietnam-tam-coc-indian.jpeg",
    alt: "tikka masala - tam coc, vietnam",
  },
];

const A_TIER_IMAGES: FoodImage[] = [
  { src: "/japan-kyoto-wagyu-night.jpeg", alt: "wagyu night! - kyoto, japan" },
  {
    src: "/bali-ubud-breakfast-scramble.jpeg",
    alt: "chili egg scramble - ubud, bali",
  },
  { src: "/japan-osaka-nigiri.jpeg", alt: "nigiri - osaka, japan" },
  { src: "/bali-uluwatu-potstickers.jpeg", alt: "potstickers - uluwatu, bali" },
  {
    src: "/japan-tokyo-omakase-unagi.jpeg",
    alt: "omakase, unagi - tokyo, japan",
  },
  { src: "/japan-tokyo-nigiri.jpeg", alt: "nigiri - tokyo, japan" },
  { src: "/japan-osaka-dumplings.jpeg", alt: "dumplings - osaka, japan" },
  {
    src: "/vietnam-ho-chi-minh-pho-dau.jpeg",
    alt: "pho dau - ho chi minh city, vietnam",
  },
  {
    src: "/vietnam-hanoi-rich-dipping-noodles.jpeg",
    alt: "rich dipping noodles - hanoi, vietnam",
  },
  { src: "/bali-uluwatu-mie-goreng.jpeg", alt: "mie goreng - uluwatu, bali" },
  { src: "/japan-kyoto-ramen-2.jpeg", alt: "ramen - kyoto, japan" },
];

const B_TIER_IMAGES: FoodImage[] = [
  { src: "/bali-ubud-indian.jpeg", alt: "tikka masala - ubud, bali" },
  {
    src: "/japan-kyoto-cold-soba-and-tempura.jpeg",
    alt: "cold soba and tempura - kyoto, japan",
  },
  { src: "/japan-tokyo-ichiran.jpeg", alt: "ichiran ramen - tokyo, japan" },
  {
    src: "/japan-osaka-cold-breakfast-noodles.jpeg",
    alt: "cold breakfast noodles - osaka, japan",
  },
  {
    src: "/vietnam-ho-chi-minh-pho-cau.jpeg",
    alt: "pho cau - ho chi minh city, vietnam",
  },
  { src: "/south-korea-hotpot.jpeg", alt: "hotpot - south korea" },
  {
    src: "/vietnam-hoi-an-white-rose-dumplings.jpeg",
    alt: "white rose dumplings - hoi an, vietnam",
  },
  { src: "/japan-kyoto-potstickers.jpeg", alt: "potstickers - kyoto, japan" },
  { src: "/bali-uluwatu-green-curry.jpeg", alt: "green curry - uluwatu, bali" },
  { src: "/vietnam-hanoi-pho.jpeg", alt: "pho - hanoi, vietnam" },
  {
    src: "/bali-ubud-thai-stir-fry.jpeg",
    alt: "chicken stir fry - ubud, bali",
  },
  { src: "/bali-ubud-mie-goreng.jpeg", alt: "mie goreng - ubud, bali" },
];

const C_TIER_IMAGES: FoodImage[] = [
  {
    src: "/vietnam-hoi-an-white-rose-dumplings-2.jpeg",
    alt: "white rose dumplings - hoi an, vietnam",
  },
  {
    src: "/japan-kyoto-conveyor-belt-sushi.jpeg",
    alt: "conveyor belt sushi - kyoto, japan",
  },
  { src: "/bali-ubud-pad-thai.jpeg", alt: "pad thai - ubud, bali" },
  {
    src: "/vietnam-hanoi-chili-chicken.jpeg",
    alt: "chili chicken - hanoi, vietnam",
  },
  {
    src: "/vietnam-hanoi-beef-and-veg.jpeg",
    alt: "beef and veg - hanoi, vietnam",
  },
  {
    src: "/vietnam-hoi-an-spring-rolls.jpeg",
    alt: "spring rolls - hoi an, vietnam",
  },
  { src: "/japan-tokyo-taiyaki.jpeg", alt: "taiyaki - tokyo, japan" },
  {
    src: "/vietnam-hanoi-spring-rolls.jpeg",
    alt: "spring rolls - hanoi, vietnam",
  },
  {
    src: "/bali-uluwatu-beef-noodles.jpeg",
    alt: "beef noodles - uluwatu, bali",
  },
  { src: "/bali-ubud-chili-noodles.jpeg", alt: "chili noodles - ubud, bali" },
  {
    src: "/vietnam-hoi-an-beef-noodle-soup.jpeg",
    alt: "beef noodle soup - hoi an, vietnam",
  },
  {
    src: "/bali-uluwatu-pork-bao-buns.jpeg",
    alt: "pork bao buns - uluwatu, bali",
  },
  { src: "/japan-osaka-okonomiyaki.jpeg", alt: "okonomiyaki - osaka, japan" },
];

const D_TIER_IMAGES: FoodImage[] = [
  {
    src: "/bali-uluwatu-dragon-fruit-smoothie.jpeg",
    alt: "dragon fruit smoothie - uluwatu, bali",
  },
  { src: "/vietnam-hoi-an-banh-mi.jpeg", alt: "banh mi - hoi an, vietnam" },
  { src: "/bali-ubud-chili-fries.jpeg", alt: "chili fries - ubud, bali" },
  { src: "/japan-osaka-takoyaki.jpeg", alt: "takoyaki - osaka, japan" },
  { src: "/japan-tokyo-real-wasabi.jpeg", alt: "real wasabi - tokyo, japan" },
  {
    src: "/vietnam-ho-chi-minh-banh-mi.jpeg",
    alt: "banh mi - ho chi minh city, vietnam",
  },
  {
    src: "/vietnam-ho-chi-minh-banh-mi-2.jpeg",
    alt: "banh mi - ho chi minh city, vietnam",
  },
  { src: "/bali-uluwatu-breakfast.jpeg", alt: "egg breakfast - uluwatu, bali" },
  { src: "/bali-uluwatu-coconut.jpeg", alt: "coconut - uluwatu, bali" },
  {
    src: "/japan-osaka-7-11-rice-roll.jpeg",
    alt: "7-11 rice roll - osaka, japan",
  },
  {
    src: "/japan-osaka-piplup-ice-cream.jpeg",
    alt: "ice cream - osaka, japan",
  },
  {
    src: "/vietnam-ho-chi-minh-street-food.jpeg",
    alt: "street food - ho chi minh city, vietnam",
  },
];

const F_TIER_IMAGES: FoodImage[] = [
  { src: "/vietnam-hanoi-cobra.jpeg", alt: "cobra - hanoi, vietnam" },
  {
    src: "/vietnam-hanoi-snake-spring-rolls.jpeg",
    alt: "bamboo snake spring rolls - hanoi, vietnam",
  },
  {
    src: "/vietnam-ho-chi-minh-heart-meat.jpeg",
    alt: "noodles w/ heart meat - ho chi minh city, vietnam",
  },
];

interface FoodTier {
  label: string;
  className: string;
  images: FoodImage[];
}

export const FOOD_TIERS: FoodTier[] = [
  { label: "s", className: "bg-red-300", images: S_TIER_IMAGES },
  { label: "a", className: "bg-orange-300", images: A_TIER_IMAGES },
  { label: "b", className: "bg-yellow-300", images: B_TIER_IMAGES },
  { label: "c", className: "bg-green-300", images: C_TIER_IMAGES },
  { label: "d", className: "bg-blue-300", images: D_TIER_IMAGES },
  { label: "f", className: "bg-purple-300", images: F_TIER_IMAGES },
];
