import type { OptionsWithTZ } from "date-fns-tz";
import { formatInTimeZone } from "date-fns-tz";

export function format(
  date: Date | number,
  format: string,
  options: OptionsWithTZ = {}
) {
  return formatInTimeZone(date, "+07:00", format, options);
}
