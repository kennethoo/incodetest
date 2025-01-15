import moment from "moment";

export function convertTimeToLocal(time, localTimezone) {
  const inputTime = time;
  const inputFormat = "hh:mm a";
  const convertedTime = moment.tz(inputTime, inputFormat, localTimezone);
  const localTime = convertedTime.format(inputFormat);
  return localTime;
}
