const {
  coadingboardMannager,
} = require("../applicationMannager/CoadingboardMannager");

async function snapshot() {
  const boards = await coadingboardMannager.getAllBoard();
  for (const { boardId } of boards) {
    await coadingboardMannager.snapshot(boardId);
  }
}
module.exports = snapshot;
