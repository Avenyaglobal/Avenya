import { createServerFn } from "@tanstack/react-start";
import type { CalendarPayload } from "./aeat-calendar";

export const getAeatCalendar = createServerFn({ method: "POST" }).handler(
  async (): Promise<CalendarPayload> => {
    const { loadAeatCalendar } = await import("./aeat-calendar.server.ts");
    return loadAeatCalendar();
  },
);
