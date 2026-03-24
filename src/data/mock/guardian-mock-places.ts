/** Mock POIs for guardian route editor search — replace with Places API later. */
export type MockPlaceHit = {
  id: string;
  label: string;
  district: string;
  lat: number;
  lng: number;
};

export const mockSeoulSearchPlaces: MockPlaceHit[] = [
  { id: "pl-1", label: "Gwanghwamun Square", district: "Jongno", lat: 37.5759, lng: 126.9768 },
  { id: "pl-2", label: "Bukchon Hanok Village", district: "Jongno", lat: 37.5826, lng: 126.985 },
  { id: "pl-3", label: "Insadong main strip", district: "Jongno", lat: 37.5738, lng: 126.9864 },
  { id: "pl-4", label: "Cheonggyecheon Plaza", district: "Jongno", lat: 37.5692, lng: 126.9788 },
  { id: "pl-5", label: "Seongsu cafe row", district: "Seongdong", lat: 37.5447, lng: 127.0555 },
  { id: "pl-6", label: "Seoul Forest", district: "Seongdong", lat: 37.5443, lng: 127.0378 },
  { id: "pl-7", label: "Yeouido Hangang Park", district: "Yeongdeungpo", lat: 37.5283, lng: 126.9326 },
  { id: "pl-8", label: "Myeongdong Station exit cluster", district: "Jung", lat: 37.5636, lng: 126.9826 },
];
