import codingSessionApi from "../application/CodingSession.js"; // Replace with the correct path to the file
import moment from "moment";
import { dateFormat } from "../utility/momentFormat.js";
import { paidPlan, freePlan } from "../application/meettumSubscription.js";

const checkAndDeleteEndedSessions = async () => {
  try {
    const todayDate = moment.utc().format(dateFormat);
    const today = moment.utc(todayDate);
    const { succeeded, sessions } = await codingSessionApi.get({
      filter: {
        sessionState: codingSessionApi.ACTIVE_SESSION,
      },
      limit: 1000000000, // Set a high limit for fetching all relevant sessions
      skip: 0,
    });
    if (!succeeded) {
      console.error("Failed to fetch sessions");
      return;
    }
    // Iterate through the sessions
    for (const session of sessions) {
      const { _id, endTime } = session;
      const sessionEndTime = moment.utc(endTime);
      if (sessionEndTime.isSameOrBefore(today)) {
        if (session.connectedPlan == freePlan) {
          await codingSessionApi.deleteSession({
            sessionId: _id,
          });
        } else {
          await codingSessionApi.handleAction({
            action: codingSessionApi.END_SESSION,
            payload: { sessionId: _id },
          });
        }
      }
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
};

// Export the function for use in other parts of your application
export default checkAndDeleteEndedSessions;
