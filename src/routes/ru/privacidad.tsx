import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/ru/privacidad")({
  head: () => seoHead("ru", "privacy"),
  component: () => <LegalPage kind="privacy" />,
});
