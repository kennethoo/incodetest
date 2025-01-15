const snapshotdocument = require("./snapshotdocument");
async function backgroundJob() {
  //tenSecondgroundJob();
  thrityMinutebackground();
}

async function tenSecondgroundJob() {
  setTimeout(() => {
    tenSecondgroundJob();
  }, 100000);
}

async function thrityMinutebackground() {
  snapshotdocument();
  setTimeout(() => {
    thrityMinutebackground();
  }, 18000);
}
module.exports = backgroundJob;
