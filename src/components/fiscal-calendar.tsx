import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type {
  CalendarPayload,
  FiscalObligation,
  FiscalProfile,
} from "@/lib/aeat-calendar";
import { cn } from "@/lib/utils";

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function formatDate(iso: string, lang: "es" | "ru" | "uk") {
  const [y, m, day] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, day);
  const locale = lang === "ru" ? "ru-RU" : lang === "uk" ? "uk-UA" : "es-ES";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function FiscalCalendar({ calendar }: { calendar: CalendarPayload }) {
  const { t, lang } = useI18n();
  const [profile, setProfile] = useState<FiscalProfile>("autonomo");
  const today = startOfDay(new Date());

  const rows = useMemo(() => {
    return calendar.obligations
      .filter((o: FiscalObligation) => o.profiles.includes(profile))
      .map((o) => {
        const due = startOfDay(new Date(`${o.date}T00:00:00`));
        const days = Math.round((due - today) / 86400000);
        return { ...o, days };
      })
      .filter((o) => o.days >= -14)
      .sort((a, b) => a.days - b.days || a.code.localeCompare(b.code))
      .slice(0, 6);
  }, [calendar.obligations, profile, today]);

  const profiles = [
    { id: "autonomo" as const, label: t.calendar.profiles.autonomo },
    { id: "sociedad" as const, label: t.calendar.profiles.sociedad },
    { id: "residente" as const, label: t.calendar.profiles.residente },
  ];

  return (
    <div>
      <div
        className="inline-flex flex-wrap gap-1 rounded-md bg-cream-deep p-1"
        role="tablist"
        aria-label={t.calendar.title}
      >
        {profiles.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={profile === p.id}
            onClick={() => setProfile(p.id)}
            className={cn(
              "h-11 rounded-sm px-4 text-sm font-medium transition-colors duration-150",
              profile === p.id
                ? "bg-paper text-forest shadow-[var(--shadow-border)]"
                : "text-ink-soft hover:text-ink",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>

      <ul className="mt-8 divide-y divide-line">
        {rows.map((row) => (
          <li
            key={row.id}
            className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-4"
          >
            <span className="font-display text-xl font-medium tabular-nums text-forest">
              {row.code}
            </span>
            <div>
              <p className="text-ink">{lang === "uk" ? row.uk : lang === "ru" ? row.ru : row.es}</p>
              <p className="mt-1 text-sm text-muted">
                {t.calendar.due} {formatDate(row.date, lang)}
              </p>
            </div>
            <span
              className={cn(
                "text-right text-sm tabular-nums",
                row.days < 0 ? "text-muted" : "text-forest",
              )}
            >
              {row.days < 0
                ? t.calendar.overdue
                : row.days === 0
                  ? t.calendar.today
                  : `${row.days} ${t.calendar.days}`}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">
        {calendar.source === "fallback" ? t.calendar.noteFallback : t.calendar.note}
      </p>
    </div>
  );
}
