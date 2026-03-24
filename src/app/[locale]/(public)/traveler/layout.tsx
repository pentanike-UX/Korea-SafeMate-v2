import { TravelerHubShell } from "@/components/traveler/traveler-hub-shell";

export default function TravelerLayout({ children }: { children: React.ReactNode }) {
  return <TravelerHubShell>{children}</TravelerHubShell>;
}
