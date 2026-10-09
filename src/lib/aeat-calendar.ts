export type FiscalProfile = "autonomo" | "sociedad" | "residente";
export type CalendarSource = "aeat" | "fallback";

export type FiscalObligation = {
  id: string;
  profiles: FiscalProfile[];
  date: string;
  code: string;
  es: string;
  ru: string;
  uk: string;
  source: CalendarSource;
};

export type CalendarPayload = {
  obligations: FiscalObligation[];
  source: CalendarSource | "mixed";
  fetchedAt: string | null;
};

const MODEL_CODES = [
  "100",
  "111",
  "115",
  "130",
  "190",
  "200",
  "202",
  "210",
  "303",
  "390",
] as const;

type ModelCode = (typeof MODEL_CODES)[number];

const MODEL_META: Record<
  ModelCode,
  { profiles: FiscalProfile[]; es: string; ru: string; uk: string }
> = {
  "100": {
    profiles: ["autonomo"],
    es: "Declaración de la renta (IRPF)",
    ru: "Декларация о доходах (IRPF)",
    uk: "Декларація про доходи (IRPF)",
  },
  "111": {
    profiles: ["autonomo", "sociedad"],
    es: "Retenciones del trabajo y profesionales",
    ru: "Удержания: зарплата и услуги",
    uk: "Утримання: зарплата і послуги",
  },
  "115": {
    profiles: ["autonomo", "sociedad"],
    es: "Retenciones de alquileres urbanos",
    ru: "Удержания с аренды помещения",
    uk: "Утримання з оренди приміщення",
  },
  "130": {
    profiles: ["autonomo"],
    es: "Pago fraccionado de IRPF",
    ru: "Квартальный аванс IRPF",
    uk: "Квартальний аванс IRPF",
  },
  "190": {
    profiles: ["autonomo", "sociedad"],
    es: "Resumen anual de retenciones",
    ru: "Годовая сводная по удержаниям",
    uk: "Річна зведена з утримань",
  },
  "200": {
    profiles: ["sociedad"],
    es: "Impuesto de sociedades",
    ru: "Налог на общества",
    uk: "Податок на товариства",
  },
  "202": {
    profiles: ["sociedad"],
    es: "Pago fraccionado del impuesto de sociedades",
    ru: "Аванс по налогу на общества",
    uk: "Аванс з податку на товариства",
  },
  "210": {
    profiles: ["residente"],
    es: "IRNR — rentas inmobiliarias",
    ru: "Налог нерезидента: недвижимость",
    uk: "Податок нерезидента: нерухомість",
  },
  "303": {
    profiles: ["autonomo", "sociedad"],
    es: "IVA",
    ru: "IVA",
    uk: "IVA",
  },
  "390": {
    profiles: ["autonomo", "sociedad"],
    es: "Resumen anual de IVA",
    ru: "Годовая сводная IVA",
    uk: "Річна зведена IVA",
  },
};

const QUARTER_LABEL: Record<string, { es: string; ru: string; uk: string }> = {
  primer: { es: "del primer trimestre", ru: "за первый квартал", uk: "за перший квартал" },
  primero: { es: "del primer trimestre", ru: "за первый квартал", uk: "за перший квартал" },
  segundo: { es: "del segundo trimestre", ru: "за второй квартал", uk: "за другий квартал" },
  tercer: { es: "del tercer trimestre", ru: "за третий квартал", uk: "за третій квартал" },
  tercero: { es: "del tercer trimestre", ru: "за третий квартал", uk: "за третій квартал" },
  cuarto: { es: "del cuarto trimestre", ru: "за четвёртый квартал", uk: "за четвертий квартал" },
};

const MODEL_RE =
  /(?:modelo\s+|d-)?\b(100|111|115|130|190|200|202|210|303|390)\b/gi;

export function unfoldIcs(raw: string): string {
  return raw.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
}

function stripHtml(value: string): string {
  return value
    .replace(/\\n/g, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&nbsp;|\\&nbsp\\;/gi, " ")
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/[ \t]+/g, " ");
}

function fold(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function parseIcsDate(raw: string): string | null {
  const match = raw.match(/(\d{8})/);
  if (!match) return null;
  const d = match[1];
  return `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}`;
}

function quarterFrom(text: string): { es: string; ru: string; uk: string } | null {
  const match = fold(text).match(
    /\b(primer|primero|segundo|tercer|tercero|cuarto)\s+trimestre\b/,
  );
  if (!match) return null;
  return QUARTER_LABEL[match[1]] ?? null;
}

function keepModel(code: ModelCode, line: string, recent: string): boolean {
  const current = fold(line);
  const window = fold(`${recent} ${line}`);

  if (code === "100") {
    const withDebit = /con domiciliacion/.test(current);
    const withoutDebit = /sin domiciliacion/.test(current);
    if (withDebit && !withoutDebit) return false;
    return true;
  }

  if ((code === "111" || code === "115") && /grandes empresas/.test(current)) {
    return false;
  }

  if (code === "303") {
    return /trimestre/.test(current);
  }

  if (code === "111" || code === "115" || code === "210") {
    return /trimestre/.test(current);
  }

  if (code === "130") {
    return (
      /estimacion directa/.test(current) ||
      /trimestre/.test(current) ||
      /trimestre/.test(window)
    );
  }

  if (code === "202") {
    return /regimen general/.test(current) || /regimen general/.test(window);
  }

  if (code === "390") {
    return /resumen anual/.test(window) || /resumen anual/.test(current);
  }

  if (code === "190") {
    return /resumen anual/.test(window) || /resumen anual/.test(current);
  }

  if (code === "200") {
    return (
      /declaracion anual/.test(window) ||
      /impuesto sobre sociedades/.test(window)
    );
  }

  return true;
}

function isModelCode(value: string): value is ModelCode {
  return (MODEL_CODES as readonly string[]).includes(value);
}

function labelFor(
  code: ModelCode,
  line: string,
  recent: string,
): { es: string; ru: string; uk: string } {
  const meta = MODEL_META[code];
  const quarter = quarterFrom(line) ?? quarterFrom(recent);
  if (quarter && (code === "303" || code === "130" || code === "111" || code === "115" || code === "210" || code === "202")) {
    if (code === "303") {
      return { es: `IVA ${quarter.es}`, ru: `IVA ${quarter.ru}`, uk: `IVA ${quarter.uk}` };
    }
    return {
      es: `${meta.es} ${quarter.es}`,
      ru: `${meta.ru} ${quarter.ru}`,
      uk: `${meta.uk} ${quarter.uk}`,
    };
  }
  if (code === "210" && /imputacion|uso propio/.test(fold(`${recent} ${line}`))) {
    return {
      es: "IRNR — imputación de rentas inmobiliarias (uso propio)",
      ru: "Налог нерезидента: вменённый доход от жилья (личное пользование)",
      uk: "Податок нерезидента: умовний дохід від житла (особисте користування)",
    };
  }
  return { es: meta.es, ru: meta.ru, uk: meta.uk };
}

export function obligationsFromIcs(ics: string): FiscalObligation[] {
  const unfolded = unfoldIcs(ics);
  const blocks = unfolded.split("BEGIN:VEVENT").slice(1);
  const out: FiscalObligation[] = [];

  for (const block of blocks) {
    const body = block.split("END:VEVENT")[0] ?? "";
    const fields: Record<string, string> = {};
    for (const line of body.split("\n")) {
      const idx = line.indexOf(":");
      if (idx < 1) continue;
      const key = line.slice(0, idx).split(";")[0];
      if (!key) continue;
      fields[key] = line.slice(idx + 1);
    }
    const date = parseIcsDate(fields.DTSTART ?? "");
    if (!date) continue;

    const text = stripHtml(`${fields.DESCRIPTION ?? ""}\n${fields.SUMMARY ?? ""}`);
    const lines = text.split(/[\n•]+/).map((l) => l.trim()).filter(Boolean);
    const recent: string[] = [];

    for (const line of lines) {
      recent.push(line);
      if (recent.length > 8) recent.shift();
      const recentText = recent.slice(0, -1).join(" ");
      MODEL_RE.lastIndex = 0;
      let match: RegExpExecArray | null;
      const seen = new Set<string>();
      while ((match = MODEL_RE.exec(line))) {
        const code = match[1];
        if (!code || !isModelCode(code) || seen.has(code)) continue;
        seen.add(code);
        if (!keepModel(code, line, recentText)) continue;
        const copy = labelFor(code, line, recentText);
        out.push({
          id: `${code}-${date}`,
          profiles: MODEL_META[code].profiles,
          date,
          code,
          es: copy.es,
          ru: copy.ru,
          uk: copy.uk,
          source: "aeat",
        });
      }
    }
  }

  return dedupe(out);
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function toIso(year: number, month: number, day: number): string {
  return `${year}-${pad(month)}-${pad(day)}`;
}

function nextBusinessDay(year: number, month: number, day: number): string {
  const dt = new Date(Date.UTC(year, month - 1, day));
  const weekday = dt.getUTCDay();
  if (weekday === 6) dt.setUTCDate(dt.getUTCDate() + 2);
  if (weekday === 0) dt.setUTCDate(dt.getUTCDate() + 1);
  return dt.toISOString().slice(0, 10);
}

function fallbackItem(
  code: ModelCode,
  date: string,
  extra?: { es?: string; ru?: string; uk?: string },
): FiscalObligation {
  const meta = MODEL_META[code];
  return {
    id: `${code}-${date}`,
    profiles: meta.profiles,
    date,
    code,
    es: extra?.es ?? meta.es,
    ru: extra?.ru ?? meta.ru,
    uk: extra?.uk ?? meta.uk,
    source: "fallback",
  };
}

export function fallbackObligations(from = new Date()): FiscalObligation[] {
  const startYear = from.getUTCFullYear() - 1;
  const endYear = from.getUTCFullYear() + 1;
  const rows: FiscalObligation[] = [];

  for (let year = startYear; year <= endYear; year += 1) {
    const q = {
      q1: nextBusinessDay(year, 4, 20),
      q2: nextBusinessDay(year, 7, 20),
      q3: nextBusinessDay(year, 10, 20),
      q4: nextBusinessDay(year + 1, 1, 20),
    };

    const quarterly: { date: string; qEs: string; qRu: string; qUk: string }[] = [
      { date: q.q1, qEs: "del primer trimestre", qRu: "за первый квартал", qUk: "за перший квартал" },
      { date: q.q2, qEs: "del segundo trimestre", qRu: "за второй квартал", qUk: "за другий квартал" },
      { date: q.q3, qEs: "del tercer trimestre", qRu: "за третий квартал", qUk: "за третій квартал" },
      { date: q.q4, qEs: "del cuarto trimestre", qRu: "за четвёртый квартал", qUk: "за четвертий квартал" },
    ];

    for (const slot of quarterly) {
      rows.push(
        fallbackItem("303", slot.date, {
          es: `IVA ${slot.qEs}`,
          ru: `IVA ${slot.qRu}`,
          uk: `IVA ${slot.qUk}`,
        }),
        fallbackItem("111", slot.date, {
          es: `Retenciones del trabajo y profesionales ${slot.qEs}`,
          ru: `Удержания: зарплата и услуги ${slot.qRu}`,
          uk: `Утримання: зарплата і послуги ${slot.qUk}`,
        }),
        fallbackItem("115", slot.date, {
          es: `Retenciones de alquileres urbanos ${slot.qEs}`,
          ru: `Удержания с аренды помещения ${slot.qRu}`,
          uk: `Утримання з оренди приміщення ${slot.qUk}`,
        }),
        fallbackItem("130", slot.date, {
          es: `Pago fraccionado de IRPF ${slot.qEs}`,
          ru: `Квартальный аванс IRPF ${slot.qRu}`,
          uk: `Квартальний аванс IRPF ${slot.qUk}`,
        }),
        fallbackItem("210", slot.date, {
          es: `IRNR — rentas trimestrales ${slot.qEs}`,
          ru: `Налог нерезидента ${slot.qRu}`,
          uk: `Податок нерезидента ${slot.qUk}`,
        }),
      );
    }

    rows.push(
      fallbackItem("202", q.q1),
      fallbackItem("202", q.q3),
      fallbackItem("202", nextBusinessDay(year, 12, 20)),
      fallbackItem("100", nextBusinessDay(year, 6, 30), {
        es: `Declaración de la renta (IRPF ${year - 1})`,
        ru: `Декларация о доходах (IRPF) за ${year - 1}`,
        uk: `Декларація про доходи (IRPF) за ${year - 1}`,
      }),
      fallbackItem("200", nextBusinessDay(year, 7, 25), {
        es: `Impuesto de sociedades (ejercicio ${year - 1})`,
        ru: `Налог на общества (год ${year - 1})`,
        uk: `Податок на товариства (рік ${year - 1})`,
      }),
      fallbackItem("390", nextBusinessDay(year, 1, 30), {
        es: `Resumen anual de IVA (${year - 1})`,
        ru: `Годовая сводная IVA (${year - 1})`,
        uk: `Річна зведена IVA (${year - 1})`,
      }),
      fallbackItem("190", nextBusinessDay(year, 1, 31), {
        es: `Resumen anual de retenciones (${year - 1})`,
        ru: `Годовая сводная по удержаниям (${year - 1})`,
        uk: `Річна зведена з утримань (${year - 1})`,
      }),
      fallbackItem("210", toIso(year, 12, 31), {
        es: "IRNR — imputación de rentas inmobiliarias (uso propio)",
        ru: "Налог нерезидента: вменённый доход от жилья (личное пользование)",
        uk: "Податок нерезидента: умовний дохід від житла (особисте користування)",
      }),
    );
  }

  return dedupe(rows);
}

function monthKey(date: string): string {
  return date.slice(0, 7);
}

export function mergeCalendar(
  live: FiscalObligation[],
  fallback: FiscalObligation[],
): FiscalObligation[] {
  const covered = new Set(
    live.map((item) => `${item.code}:${monthKey(item.date)}`),
  );
  const extra = fallback.filter(
    (item) => !covered.has(`${item.code}:${monthKey(item.date)}`),
  );
  return dedupe([...live, ...extra]).sort((a, b) =>
    a.date === b.date ? a.code.localeCompare(b.code) : a.date.localeCompare(b.date),
  );
}

function dedupe(items: FiscalObligation[]): FiscalObligation[] {
  const map = new Map<string, FiscalObligation>();
  for (const item of items) {
    const key = `${item.code}:${item.date}`;
    const prev = map.get(key);
    if (!prev || (prev.source === "fallback" && item.source === "aeat")) {
      map.set(key, item);
    }
  }
  return [...map.values()];
}

export function pruneObligations(
  items: FiscalObligation[],
  now = new Date(),
): FiscalObligation[] {
  const start = new Date(now);
  start.setUTCDate(start.getUTCDate() - 14);
  const end = new Date(now);
  end.setUTCMonth(end.getUTCMonth() + 18);
  const from = start.toISOString().slice(0, 10);
  const to = end.toISOString().slice(0, 10);
  return items.filter((item) => item.date >= from && item.date <= to);
}

export function emptyPayload(now = new Date()): CalendarPayload {
  return {
    obligations: pruneObligations(fallbackObligations(now), now),
    source: "fallback",
    fetchedAt: null,
  };
}

export function buildPayload(
  live: FiscalObligation[],
  now = new Date(),
): CalendarPayload {
  const merged = pruneObligations(
    mergeCalendar(live, fallbackObligations(now)),
    now,
  );
  const hasLive = merged.some((item) => item.source === "aeat");
  const hasFallback = merged.some((item) => item.source === "fallback");
  return {
    obligations: merged,
    source: hasLive && hasFallback ? "mixed" : hasLive ? "aeat" : "fallback",
    fetchedAt: hasLive ? now.toISOString() : null,
  };
}
