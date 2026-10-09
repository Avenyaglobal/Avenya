import {
  buildPayload,
  emptyPayload,
  obligationsFromIcs,
  type CalendarPayload,
  type FiscalObligation,
} from "./aeat-calendar";

export const AEAT_ICS_FEEDS = [
  // IVA
  "https://www.google.com/calendar/ical/517mcuhcis0lldnp9b7c0nk2q8%40group.calendar.google.com/public/basic.ics",
  // Renta
  "https://www.google.com/calendar/ical/invitado2aeat%40gmail.com/public/basic.ics",
  // Sociedades
  "https://www.google.com/calendar/ical/b7g1j3bod3gdjbka03uo6kr988%40group.calendar.google.com/public/basic.ics",
  // Declaraciones informativas
  "https://www.google.com/calendar/ical/hqp9h5ft4snag42aea96791g28%40group.calendar.google.com/public/basic.ics",
  // Renta y Sociedades
  "https://www.google.com/calendar/ical/aio2b0s64q65r7v87j5ma8fvog%40group.calendar.google.com/public/basic.ics",
] as const;

const CACHE_MS = 6 * 60 * 60 * 1000;

type CacheEntry = { at: number; data: CalendarPayload };

let cache: CacheEntry | null = null;

async function fetchIcs(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "text/calendar, text/plain, */*",
        "User-Agent": "AvenyaAsesoria/1.0 (calendario-contribuyente)",
      },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function loadAeatCalendar(now = new Date()): Promise<CalendarPayload> {
  if (cache && now.getTime() - cache.at < CACHE_MS) {
    return cache.data;
  }

  const texts = await Promise.all(AEAT_ICS_FEEDS.map((url) => fetchIcs(url)));
  const live: FiscalObligation[] = [];
  for (const text of texts) {
    if (!text || !text.includes("BEGIN:VCALENDAR")) continue;
    live.push(...obligationsFromIcs(text));
  }

  const data = live.length > 0 ? buildPayload(live, now) : emptyPayload(now);
  cache = { at: now.getTime(), data };
  return data;
}

export function resetAeatCalendarCache() {
  cache = null;
}
