const moment = require("moment");
require("moment-timezone");
function convertUtcToTimezone(utcTime, targetTimezone, format) {
  const momentUtc = moment.utc(utcTime);
  const convertedTime = momentUtc.clone().tz(targetTimezone);
  return convertedTime.format(format);
}

module.exports = convertUtcToTimezone;
