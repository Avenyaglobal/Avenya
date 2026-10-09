import { getAeatCalendar } from "@/lib/aeat-calendar-fn";
import { emptyPayload } from "@/lib/aeat-calendar";

export async function loadHomeCalendar() {
  try {
    const calendar = await getAeatCalendar();
    return { calendar };
  } catch {
    return { calendar: emptyPayload() };
  }
}
