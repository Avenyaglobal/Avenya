import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/aviso-legal")({
  head: () => seoHead("es", "legal"),
  component: () => <LegalPage kind="legal" />,
});
