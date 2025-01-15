import moment from "moment";
export function convertTimeZoneToUtc({ time, toTimeZone, dateFormat }) {
  const sourceDateTime = moment.tz(time, dateFormat, toTimeZone);
  const utcDateTime = sourceDateTime.utc();
  return utcDateTime.format(dateFormat);
}
