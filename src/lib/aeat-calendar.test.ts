import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  fallbackObligations,
  mergeCalendar,
  obligationsFromIcs,
  unfoldIcs,
} from "./aeat-calendar.ts";

const FIXTURE = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART;VALUE=DATE:20261020
DESCRIPTION:Septiembre 2026. Grandes empresas: 111\\, 115\\nTercer trime
 stre 2026: 111\\, 115\\, 210\\nPagos fraccionados Renta\\nTercer trimestre 202
 6:\\nEstimación directa: 130\\nRégimen general: 202\\nTercer trimestre 2026.
  Autoliquidación: 303
SUMMARY:IVA
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260625
DESCRIPTION:Declaración anual Renta 2025 con resultado a ingresar con d
 omiciliación en cuenta: D-100
SUMMARY:RENTA
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260630
DESCRIPTION:Declaración anual Renta y Patrimonio 2025 a ingresar sin do
 miciliación del primer plazo: D-100
SUMMARY:RENTA
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260930
DESCRIPTION:Agosto 2026. Autoliquidación: 303
SUMMARY:IVA
END:VEVENT
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260130
DESCRIPTION:Cuarto trimestre 2025. Autoliquidación: 303\\nResumen anual 
 2025: 390
SUMMARY:IVA
END:VEVENT
END:VCALENDAR
`;

describe("aeat calendar parser", () => {
  it("unfolds folded ICS lines", () => {
    const raw = "DESCRIPTION:hello\n  world";
    assert.equal(unfoldIcs(raw), "DESCRIPTION:hello world");
  });

  it("keeps quarterly models and drops monthly IVA and large-company withholdings", () => {
    const rows = obligationsFromIcs(FIXTURE);
    const byDate = Object.fromEntries(
      [...new Set(rows.map((r) => r.date))].map((date) => [
        date,
        rows.filter((r) => r.date === date).map((r) => r.code).sort(),
      ]),
    );

    assert.deepEqual(byDate["2026-10-20"], ["111", "115", "130", "202", "210", "303"]);
    assert.equal(byDate["2026-09-30"], undefined);
    assert.deepEqual(byDate["2026-01-30"], ["303", "390"]);
  });

  it("keeps renta without direct debit and skips the domiciled deadline", () => {
    const rows = obligationsFromIcs(FIXTURE).filter((r) => r.code === "100");
    assert.deepEqual(
      rows.map((r) => r.date),
      ["2026-06-30"],
    );
  });

  it("lets AEAT dates win over the same-month fallback", () => {
    const live = obligationsFromIcs(FIXTURE);
    const merged = mergeCalendar(live, fallbackObligations(new Date("2026-09-15")));
    const oct303 = merged.filter((r) => r.code === "303" && r.date.startsWith("2026-10"));
    assert.equal(oct303.length, 1);
    assert.equal(oct303[0]?.source, "aeat");
    assert.equal(oct303[0]?.date, "2026-10-20");
  });
});
