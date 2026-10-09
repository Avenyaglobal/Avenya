import type { Lang } from "@/lib/content";

export const SITE = "https://www.avenyaglobal.com";

export function langFromPath(pathname: string): Lang {
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";
  if (pathname === "/uk" || pathname.startsWith("/uk/")) return "uk";
  return "es";
}

export function localePrefix(lang: Lang): string {
  return lang === "es" ? "" : `/${lang}`;
}

/** Strip /ru or /uk and return the Spanish path, always starting with /. */
export function stripLocale(pathname: string): string {
  const bare = pathname.replace(/^\/(ru|uk)(?=\/|$)/, "") || "/";
  return bare.startsWith("/") ? bare : `/${bare}`;
}

export function localizePath(lang: Lang, path: string): string {
  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  const bare = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const normalized = bare === "" || bare === "/" ? "/" : bare.startsWith("/") ? bare : `/${bare}`;
  const prefix = localePrefix(lang);
  const next = normalized === "/" ? prefix || "/" : `${prefix}${normalized}`;
  return `${next}${hash}`;
}

export function absoluteUrl(lang: Lang, path: string): string {
  const localized = localizePath(lang, path);
  return localized === "/" ? `${SITE}/` : `${SITE}${localized}`;
}
