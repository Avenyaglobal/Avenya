import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { SiteShell } from "@/components/site-shell";
import { getAeatCalendar } from "@/lib/aeat-calendar-fn";
import { emptyPayload } from "@/lib/aeat-calendar";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const calendar = await getAeatCalendar();
      return { calendar };
    } catch {
      return { calendar: emptyPayload() };
    }
  },
  component: Home,
});

function Home() {
  const { calendar } = Route.useLoaderData();
  return (
    <SiteShell>
      <HomePage calendar={calendar} />
    </SiteShell>
  );
}
