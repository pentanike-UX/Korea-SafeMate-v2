/**
 * Home hero full-bleed carousel — filenames follow seoul{NN}_{Content}_{Place}.png for asset hygiene.
 * Display copy is localized via `Home.heroCarouselSlide*` keys in messages.
 */
export const HOME_HERO_SLIDES = [
  { src: "/images/hero/seoul01_BTS_Sungnyemun.png", metaKey: "heroCarouselSlide1" as const },
  { src: "/images/hero/seoul02_Kpop_Gwanghwamun.png", metaKey: "heroCarouselSlide2" as const },
  { src: "/images/hero/seoul03_MyLoveFromTheStar_NSeoulTower.png", metaKey: "heroCarouselSlide3" as const },
  { src: "/images/hero/seoul04_NSeoulTower_Sunset.png", metaKey: "heroCarouselSlide4" as const },
  { src: "/images/hero/seoul05_Goblin_Gamgodanggil.png", metaKey: "heroCarouselSlide5" as const },
  { src: "/images/hero/seoul06_SquidGame_Gwanghwamun.png", metaKey: "heroCarouselSlide6" as const },
] as const;

export type HomeHeroSlideMetaKey = (typeof HOME_HERO_SLIDES)[number]["metaKey"];

export const HOME_HERO_INTERVAL_MS = 5500;
