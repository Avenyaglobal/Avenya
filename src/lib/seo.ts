import { content, type Lang } from "@/lib/content";
import { absoluteUrl } from "@/lib/locale";

const OG_LOCALE: Record<Lang, string> = {
  es: "es_ES",
  ru: "ru_RU",
  uk: "uk_UA",
};

type Page = "home" | "legal" | "privacy";

const PATH: Record<Page, string> = {
  home: "/",
  legal: "/aviso-legal",
  privacy: "/privacidad",
};

export function seoHead(lang: Lang, page: Page) {
  const copy = content[lang];
  const path = PATH[page];
  const url = absoluteUrl(lang, path);
  const title =
    page === "home"
      ? copy.metaTitle
      : page === "legal"
        ? `${copy.legal.title} — Avenya`
        : `${copy.privacy.title} — Avenya`;
  const description =
    page === "home"
      ? copy.metaDescription
      : page === "legal"
        ? copy.legal.blocks[0]?.p ?? copy.metaDescription
        : copy.privacy.blocks[0]?.p ?? copy.metaDescription;

  const alternates = (["es", "ru", "uk"] as const).map((code) => ({
    rel: "alternate",
    hreflang: code,
    href: absoluteUrl(code, path),
  }));

  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: `${absoluteUrl("es", "/")}og.jpg` },
      { property: "og:locale", content: OG_LOCALE[lang] },
      { property: "og:locale:alternate", content: OG_LOCALE.es },
      { property: "og:locale:alternate", content: OG_LOCALE.ru },
      { property: "og:locale:alternate", content: OG_LOCALE.uk },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${absoluteUrl("es", "/")}og.jpg` },
    ],
    links: [
      { rel: "canonical", href: url },
      ...alternates,
      { rel: "alternate", hreflang: "x-default", href: absoluteUrl("es", path) },
    ],
    scripts: page === "home" ? [{ type: "application/ld+json", children: jsonLd() }] : [],
  };
}

function jsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "Avenya",
    url: absoluteUrl("es", "/"),
    image: `${absoluteUrl("es", "/")}og.jpg`,
    telephone: "+34695343196",
    email: "avenyaglobal@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenida de Juan Sanchis Candela, 23A, Oficina 8",
      addressLocality: "Alicante",
      postalCode: "03015",
      addressRegion: "Alicante",
      addressCountry: "ES",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "15:00",
      },
    ],
    areaServed: { "@type": "City", name: "Alicante" },
    availableLanguage: ["Spanish", "Russian", "Ukrainian"],
    inLanguage: ["es", "ru", "uk"],
  });
}
