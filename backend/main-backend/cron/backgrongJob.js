import collectSubscription from "./collectSubSctiption.js";
import checkAndDeleteEndedSessions from "./removeCodeSessionJob.js";
async function backgroundJob() {
  tenSecondgroundJob();
  thrityMinutebackground();
}

async function tenSecondgroundJob() {
  setTimeout(() => {
    tenSecondgroundJob();
  }, 100000);
}

async function thrityMinutebackground() {
  collectSubscription();
  checkAndDeleteEndedSessions();
  setTimeout(() => {
    thrityMinutebackground();
  }, 180000);
}
export default backgroundJob;
