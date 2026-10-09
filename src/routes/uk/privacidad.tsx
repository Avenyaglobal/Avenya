import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/uk/privacidad")({
  head: () => seoHead("uk", "privacy"),
  component: () => <LegalPage kind="privacy" />,
});
