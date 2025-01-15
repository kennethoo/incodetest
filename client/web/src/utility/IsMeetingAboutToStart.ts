import moment from "moment";
import { dateFormat } from "utility/momentFormat";
interface meetingAboutToStartT {
  isboutToStart: boolean;
  timeLeft: number;
}
export function meetingAboutToStart(startTime): meetingAboutToStartT {
  // Get the current date and time
  const currentDate = moment.utc();

  // Parse the start time
  const meetingStartTime = moment.utc(startTime, dateFormat);

  // Calculate the difference in minutes between the current time and the meeting start time
  const timeDiffMinutes = meetingStartTime.diff(currentDate, "minutes");
  // Check if the difference is less than or equal to 15 minutes
  if (timeDiffMinutes <= 5) {
    return {
      isboutToStart: true,
      timeLeft: timeDiffMinutes,
    };
  } else {
    return {
      isboutToStart: false,
      timeLeft: timeDiffMinutes,
    };
  }
}
