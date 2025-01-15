const moment = require("moment");
function convertTimeZoneToUtc({ time, toTimeZone, dateFormat }) {
  const sourceDateTime = moment.tz(time, dateFormat, toTimeZone);
  const utcDateTime = sourceDateTime.utc();
  return utcDateTime.format(dateFormat);
}
module.exports = convertTimeZoneToUtc;
