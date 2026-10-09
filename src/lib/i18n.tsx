import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react";
import { useRouterState, useNavigate } from "@tanstack/react-router";
import { content, type Copy, type Lang } from "@/lib/content";
import { langFromPath, localizePath, stripLocale } from "@/lib/locale";

const STORAGE_KEY = "avenya-lang";

type I18nValue = {
  lang: Lang;
  t: Copy;
  setLang: (lang: Lang) => void;
  href: (path: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const lang = langFromPath(pathname);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      const y = window.scrollY;
      window.localStorage.setItem(STORAGE_KEY, next);
      const target = localizePath(next, stripLocale(pathname));
      void navigate({ href: target, resetScroll: false });
      const restore = () => window.scrollTo(0, y);
      requestAnimationFrame(() => {
        restore();
        requestAnimationFrame(restore);
      });
      window.setTimeout(restore, 60);
    },
    [lang, navigate, pathname],
  );

  const href = useCallback((path: string) => localizePath(lang, path), [lang]);

  const value = useMemo<I18nValue>(
    () => ({ lang, t: content[lang], setLang, href }),
    [lang, setLang, href],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
