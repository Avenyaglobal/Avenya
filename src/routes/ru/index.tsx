import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { SiteShell } from "@/components/site-shell";
import { loadHomeCalendar } from "@/lib/home-loader";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/ru/")({
  loader: loadHomeCalendar,
  head: () => seoHead("ru", "home"),
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
