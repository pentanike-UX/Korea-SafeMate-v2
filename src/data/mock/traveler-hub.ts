/** MVP mock — replace with traveler session + API. */

export type TravelerTripRequestStatus = "requested" | "reviewing" | "matched" | "declined";

export interface MockTravelerTripRequest {
  id: string;
  guardian_user_id: string | null;
  guardian_name: string | null;
  region_label_key: "gwanghwamun" | "gangnam";
  theme_slug: string;
  status: TravelerTripRequestStatus;
  created_at: string;
  note: string;
}

export const mockTravelerSavedGuardianIds = ["g2", "g5", "g1"];

export const mockTravelerSavedPostIds = ["p7", "p9", "p2", "p12"];

export const mockTravelerTripRequests: MockTravelerTripRequest[] = [
  {
    id: "req-1",
    guardian_user_id: "g1",
    guardian_name: "Minseo K.",
    region_label_key: "gwanghwamun",
    theme_slug: "k_drama_romance",
    status: "reviewing",
    created_at: "2026-03-22T10:00:00.000Z",
    note: "Half-day palace mood walk + café",
  },
  {
    id: "req-2",
    guardian_user_id: null,
    guardian_name: null,
    region_label_key: "gangnam",
    theme_slug: "k_pop_day",
    status: "requested",
    created_at: "2026-03-21T14:30:00.000Z",
    note: "Album shops + evening strip",
  },
  {
    id: "req-3",
    guardian_user_id: "g2",
    guardian_name: "Daniel R.",
    region_label_key: "gangnam",
    theme_slug: "seoul_night",
    status: "matched",
    created_at: "2026-03-10T09:00:00.000Z",
    note: "Night views, no packed schedule",
  },
];
