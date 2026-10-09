import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/ru/aviso-legal")({
  head: () => seoHead("ru", "legal"),
  component: () => <LegalPage kind="legal" />,
});
