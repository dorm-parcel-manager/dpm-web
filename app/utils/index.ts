import type { OptionsWithTZ } from "date-fns-tz";
import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";
import { formatRelative as dateFnsFormatRelative } from "date-fns";

const localTimeZone = "+07:00";

export function format(
  date: Date | number,
  format: string,
  options: OptionsWithTZ = {}
) {
  return formatInTimeZone(date, localTimeZone, format, options);
}

export function formatRelative(
  date: Date,
  baseDate: Date,
  options?: {
    locale?: Locale;
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  }
): string {
  return dateFnsFormatRelative(
    utcToLocalTime(date),
    utcToLocalTime(baseDate),
    options
  );
}

export function utcToLocalTime(date: Date) {
  return utcToZonedTime(date, localTimeZone);
}

export function objectFromFormData(formData: FormData) {
  const obj: any = {};
  for (const [key, value] of formData) {
    obj[key] = value;
  }
  return obj;
}

export function objectToFormData(obj: any) {
  const formData = new FormData();
  for (const key in obj) {
    const value = obj[key];
    formData.append(key, value);
  }
  return formData;
}
