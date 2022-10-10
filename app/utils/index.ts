import type { OptionsWithTZ } from "date-fns-tz";
import { formatInTimeZone } from "date-fns-tz";

export function format(
  date: Date | number,
  format: string,
  options: OptionsWithTZ = {}
) {
  return formatInTimeZone(date, "+07:00", format, options);
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
