import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/content";
import { localizePath, stripLocale } from "@/lib/locale";
import { cn } from "@/lib/utils";
import { useRouterState } from "@tanstack/react-router";

const NAV = [
  { path: "/#servicios", key: "services" },
  { path: "/#calendario", key: "calendar" },
  { path: "/#enfoque", key: "approach" },
  { path: "/#alicante", key: "alicante" },
  { path: "/#faq", key: "faq" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-cream text-ink">
      <SkipLink />
      <Header />
      <main id="contenido">{children}</main>
      <Footer />
    </div>
  );
}

function SkipLink() {
  const { t } = useI18n();
  return (
    <a
      href="#contenido"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-forest focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
    >
      {t.skip}
    </a>
  );
}

function Header() {
  const { t, lang, setLang, href } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:h-[4.25rem] sm:px-8">
        <Logo onClick={() => setOpen(false)} />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {NAV.map((item) => (
            <a
              key={item.path}
              href={href(item.path)}
              className="text-sm text-ink-soft transition-colors duration-150 hover:text-ink"
            >
              {t.nav[item.key]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch lang={lang} setLang={setLang} />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={href("/#contacto")}>{t.nav.cta}</a>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-sm text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden overflow-hidden border-t border-line bg-cream transition-[max-height,opacity] duration-200 ease-out",
          open ? "max-h-[100dvh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4 sm:px-8" aria-label="Móvil">
          {NAV.map((item) => (
            <a
              key={item.path}
              href={href(item.path)}
              onClick={() => setOpen(false)}
              className="flex min-h-11 items-center font-display text-2xl text-ink"
            >
              {t.nav[item.key]}
            </a>
          ))}
          <a
            href={href("/#contacto")}
            onClick={() => setOpen(false)}
            className="mt-3 inline-flex h-12 items-center justify-center rounded-md bg-forest text-sm font-medium text-cream"
          >
            {t.nav.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}

function LangSwitch({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hrefFor = (code: Lang) => localizePath(code, stripLocale(pathname));
  return (
    <div
      className="flex h-10 items-center rounded-sm bg-cream-deep p-0.5 text-xs font-medium tracking-wide"
      role="group"
      aria-label="Idioma"
    >
      {(["es", "ru", "uk"] as const).map((code) => (
        <a
          key={code}
          href={hrefFor(code)}
          className={cn(
            "inline-flex h-9 min-w-10 items-center justify-center rounded-xs px-2.5 uppercase transition-colors duration-150",
            lang === code ? "bg-paper text-forest" : "text-muted hover:text-ink",
          )}
          aria-current={lang === code ? "true" : undefined}
          onClick={(event) => {
            event.preventDefault();
            setLang(code);
          }}
        >
          {code === "uk" ? "UA" : code}
        </a>
      ))}
    </div>
  );
}

function Footer() {
  const { t, href } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl font-medium tracking-tight">Avenya</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/75">
            {t.footer.tagline}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">{t.footer.address}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          {NAV.map((item) => (
            <a
              key={item.path}
              href={href(item.path)}
              className="min-h-10 inline-flex items-center text-cream/80 transition-colors hover:text-cream"
            >
              {t.nav[item.key]}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <a
            href={href("/#contacto")}
            className="min-h-10 inline-flex items-center text-cream/80 transition-colors hover:text-cream"
          >
            {t.nav.contact}
          </a>
          <a
            href={href("/aviso-legal")}
            className="min-h-10 inline-flex items-center text-cream/80 transition-colors hover:text-cream"
          >
            {t.nav.legal}
          </a>
          <a
            href={href("/privacidad")}
            className="min-h-10 inline-flex items-center text-cream/80 transition-colors hover:text-cream"
          >
            {t.nav.privacy}
          </a>
          <a
            href="tel:+34695343196"
            className="min-h-10 inline-flex items-center text-cream/80 transition-colors hover:text-cream"
          >
            695 343 196
          </a>
          <a
            href="mailto:avenyaglobal@gmail.com"
            className="min-h-10 inline-flex items-center text-cream/80 transition-colors hover:text-cream"
          >
            avenyaglobal@gmail.com
          </a>
          <a
            href="https://avenyaglobal.com"
            className="min-h-10 inline-flex items-center text-cream/80 transition-colors hover:text-cream"
            target="_blank"
            rel="noreferrer"
          >
            avenyaglobal.com
          </a>
        </div>
      </div>
      <div className="border-t border-cream/15">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-cream/55 sm:px-8">
          © {year} {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
