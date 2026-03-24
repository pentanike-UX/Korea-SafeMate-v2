import type { GuardianMarketingProfile } from "@/types/guardian-marketing";

export const mockGuardianMarketingById: Record<string, GuardianMarketingProfile> = {
  g1: {
    user_id: "g1",
    launch_area_slug: "gwanghwamun",
    theme_slugs: ["k_drama_romance", "movie_location", "photo_route", "safe_solo"],
    companion_style_slugs: ["calm", "planner"],
    trust_badge_ids: ["verified", "language_checked", "reviewed", "fast_response"],
    photo_url:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    positioning: {
      ko: "광화문·종로, 드라마 감성 산책과 첫 서울 적응을 함께합니다.",
      en: "Palace-town walks, drama moods, and calm first-day Seoul rhythm.",
    },
    intro: {
      ko: "촬영지·한옥 골목·야경 포인트까지, 붐비는 코스도 동선으로 풀어 드립니다. 영어·일본어로 현장 소통이 편하고, 범위와 비용은 미리 합의해요.",
      en: "From filming corners to hanok alleys — practical routing in EN/JP with clear scope up front.",
    },
    recommended_routes: [
      {
        title: { ko: "광화문→청계천 드라마 무드 산책", en: "Gwanghwamun → Cheonggyecheon drama walk" },
        blurb: {
          ko: "2–3시간 · 사진 스팟 + 카페 브레이크",
          en: "2–3h · photo beats + café pause",
        },
      },
      {
        title: { ko: "북촌 한옥 골목 느린 코스", en: "Bukchon slow lanes" },
        blurb: {
          ko: "오전 슬롯 추천 · 계단 구간 안내",
          en: "Morning slot · stair-aware routing",
        },
      },
    ],
    trip_type_labels: [
      { ko: "하루 동행", en: "Half / full day" },
      { ko: "첫날 적응", en: "First-day settle-in" },
    ],
    representative_post_ids: ["p9", "p8", "p1"],
    response_note: { ko: "평균 2시간 내 첫 답변", en: "Usually replies within ~2h" },
    review_count_display: 48,
  },
  g2: {
    user_id: "g2",
    launch_area_slug: "gangnam",
    theme_slugs: ["k_pop_day", "seoul_night", "photo_route", "movie_location"],
    companion_style_slugs: ["energetic", "trendy"],
    trust_badge_ids: ["language_checked", "reviewed", "fast_response"],
    photo_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    positioning: {
      ko: "강남·신촌 앨범샵과 밤거리 핫스팟을 데이터로 짚어 드립니다.",
      en: "Gangnam & Sinchon album runs — crowd timing without the tourist script.",
    },
    intro: {
      ko: "K-Pop 굿즈·카페 거리·야경까지 ‘가볼 만한 곳’이 아니라 ‘실제로 소화되는 동선’으로 잡아요. 영어·스페인어 가능.",
      en: "Execution-first K-pop retail & night strips — EN/ES, no lecture tour.",
    },
    recommended_routes: [
      {
        title: { ko: "앨범샵 크롤링 데이", en: "Album shop crawl day" },
        blurb: {
          ko: "평일 런치 슬롯이 대기 적음",
          en: "Weekday lunch = shorter waits",
        },
      },
      {
        title: { ko: "강남 야경 + 디저트 스트립", en: "Gangnam night + dessert strip" },
        blurb: {
          ko: "사진·이동 거리 밸런스 맞춤",
          en: "Balanced photo + walking load",
        },
      },
    ],
    trip_type_labels: [
      { ko: "K-Pop 데이", en: "K-pop day" },
      { ko: "야간 코스", en: "Evening route" },
    ],
    representative_post_ids: ["p7", "p2", "p12"],
    response_note: { ko: "늦은 시간대도 답장 가능", en: "Late-evening replies often OK" },
    review_count_display: 36,
  },
  g3: {
    user_id: "g3",
    launch_area_slug: "gwanghwamun",
    theme_slugs: ["seoul_night", "safe_solo", "photo_route"],
    companion_style_slugs: ["friendly", "flexible"],
    trust_badge_ids: ["language_checked", "fast_response"],
    photo_url:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
    positioning: {
      ko: "이태원·용산 경계의 카페·야경 코스를 탐험형으로 안내합니다.",
      en: "Itaewon–Yongsan café hops with flexible pacing.",
    },
    intro: {
      ko: "검증 매칭 전 단계지만, 포스트와 동선 팁으로 신뢰를 쌓는 중이에요. 영어 네이티브급 대화가 필요하면 편하게 말씀 주세요.",
      en: "Building trust through posts first — fluent EN, flexible pacing.",
    },
    recommended_routes: [
      {
        title: { ko: "용산·이태원 선셋 루프", en: "Yongsan sunset loop" },
        blurb: {
          ko: "2시간 라이트 코스",
          en: "~2h light loop",
        },
      },
    ],
    trip_type_labels: [{ ko: "반나절", en: "Half day" }],
    representative_post_ids: [],
    response_note: { ko: "당일 문의도 가능", en: "Same-day asks often work" },
    review_count_display: 6,
  },
  "g-busan": {
    user_id: "g-busan",
    launch_area_slug: "busan",
    theme_slugs: ["photo_route", "safe_solo"],
    companion_style_slugs: ["calm", "planner"],
    trust_badge_ids: ["verified", "language_checked", "reviewed"],
    photo_url:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    positioning: {
      ko: "해운대·자갈치, 바다 도시 동선의 현실적인 팁.",
      en: "Haeundae & markets — coastal realism.",
    },
    intro: {
      ko: "런칭 지역 확장 시 매칭이 열립니다. 지금은 콘텐츠로 신호를 드리고 있어요.",
      en: "Matching opens when Busan launches — content previews trust today.",
    },
    recommended_routes: [
      {
        title: { ko: "해운대 모닝 산책", en: "Haeundae morning" },
        blurb: { ko: "바람·모래 각오 포함", en: "Wind & sand aware" },
      },
    ],
    trip_type_labels: [{ ko: "하루", en: "Full day" }],
    representative_post_ids: ["p10", "p11"],
    response_note: { ko: "부산 오픈 알림 예약", en: "Join Busan waitlist" },
    review_count_display: 22,
  },
  g4: {
    user_id: "g4",
    launch_area_slug: "gangnam",
    theme_slugs: ["seoul_night", "k_pop_day", "movie_location"],
    companion_style_slugs: ["trendy", "planner"],
    trust_badge_ids: ["verified", "language_checked", "reviewed", "fast_response"],
    photo_url:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    positioning: {
      ko: "코엑스·봉은사 라인, 밤 풍경과 팝업 스토어 동선 전문.",
      en: "COEX & Bongeunsa nights — pop-ups & skyline pacing.",
    },
    intro: {
      ko: "‘핫플 리스트’보다 대기·이동 시간을 줄이는 밤 코스를 짭니다. 영어 원어민 수준.",
      en: "Night routes optimized for queues — native EN.",
    },
    recommended_routes: [
      {
        title: { ko: "강남 밤무드 A to Z", en: "Gangnam night A→Z" },
        blurb: { ko: "3시간 컴팩트", en: "3h compact" },
      },
    ],
    trip_type_labels: [{ ko: "나이트 라이프", en: "Nightlife lite" }],
    representative_post_ids: ["p2"],
    response_note: { ko: "빠른 응답", en: "Fast response" },
    review_count_display: 29,
  },
  g5: {
    user_id: "g5",
    launch_area_slug: "gwanghwamun",
    theme_slugs: ["k_drama_romance", "photo_route", "safe_solo"],
    companion_style_slugs: ["calm", "friendly"],
    trust_badge_ids: ["language_checked", "reviewed", "fast_response"],
    photo_url:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80",
    positioning: {
      ko: "경복궁·서촌, 드라마 감성 포토와 여유로운 산책.",
      en: "Gyeongbokgung & Seochon — soft drama-light photo walks.",
    },
    intro: {
      ko: "인생샷 스팟과 붐비지 않는 시간대를 함께 고릅니다. 한국어·영어.",
      en: "Photo-first timing — KO/EN, unrushed.",
    },
    recommended_routes: [
      {
        title: { ko: "서촌 감성 산책", en: "Seochon mood walk" },
        blurb: { ko: "2.5시간", en: "2.5h" },
      },
    ],
    trip_type_labels: [{ ko: "포토 투어", en: "Photo route" }],
    representative_post_ids: ["p9"],
    response_note: { ko: "주말 예약 필수", en: "Weekends book ahead" },
    review_count_display: 19,
  },
};
