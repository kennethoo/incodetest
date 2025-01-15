const moment = require("moment-timezone");
function isMeetingAboutToStart(startTime, dateFormat) {
  const currentDate = moment.utc();
  const meetingStartTime = moment.utc(startTime, dateFormat);
  const timeDiffMinutes = meetingStartTime.diff(currentDate, "minutes");
  if (timeDiffMinutes <= 5) {
    return {
      isAboutToStart: true,
      timeLeft: timeDiffMinutes,
    };
  } else {
    return {
      isAboutToStart: false,
      timeLeft: timeDiffMinutes,
    };
  }
}
module.exports = isMeetingAboutToStart;
