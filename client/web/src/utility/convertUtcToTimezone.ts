import moment from "moment";
export function convertUtcToTimezone(utcTime, targetTimezone, format): string {
  const momentUtc = moment.utc(utcTime);
  const convertedTime = momentUtc.clone().tz(targetTimezone);
  return convertedTime.format(format);
}
