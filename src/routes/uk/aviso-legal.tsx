import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/uk/aviso-legal")({
  head: () => seoHead("uk", "legal"),
  component: () => <LegalPage kind="legal" />,
});
