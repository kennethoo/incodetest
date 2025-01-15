const Y = require("yjs");
const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const incrimentalUpdate = new Schema({
  userId: String,
  boardId: String,
  update: String,
  timestamp: String,
});

const board = new Schema({
  boardId: String,
  timestamp: String,
});
const snapshot = new Schema({
  boardId: String,
  update: String,
  timestamp: String,
});

const DocumentSnapshot = mongoose.model("documentsnapshot", snapshot);
const IncrimentalUpdate = mongoose.model("documentupdate", incrimentalUpdate);
const Board = mongoose.model("board", board);

class CoadingboardMannager {
  constructor() {
    this.store = {};
  }
  async getDocument(boardId) {
    if (this.store[boardId]) {
      return { doc: this.store[boardId] };
    }
    const allUpdates = await IncrimentalUpdate.find({ boardId });
    // If there are no updates
    if (!allUpdates.length) {
      this.store[boardId] = this.initializeDocument();
      this.createBoard(boardId);
      return { doc: this.store[boardId], isNew: true };
    }
    const snapshot = await DocumentSnapshot.findOne({ boardId });
    // Use snapshot if it's more recent than updates
    if (snapshot) {
      const latestUpdateTimestamp = moment.utc(
        allUpdates[allUpdates.length - 1].timestamp,
      );

      if (moment.utc(snapshot._doc.timestamp).isAfter(latestUpdateTimestamp)) {
        this.store[boardId] = this.initializeDocument(snapshot._doc.update);
        return { doc: this.store[boardId] };
      }
    }

    // Apply all updates to a new Y.Doc
    this.store[boardId] = this.initializeDocument();
    const doc = this.store[boardId];
    for (const { update } of allUpdates) {
      Y.applyUpdate(doc, Buffer.from(update, "base64"));
    }
    return doc;
  }

  // Helper function to initialize a Y.Doc
  initializeDocument(snapshotUpdate = null) {
    const doc = new Y.Doc();
    if (snapshotUpdate) {
      Y.applyUpdate(doc, Buffer.from(snapshotUpdate, "base64"));
    }
    return doc;
  }

  createBoard = (boardId) => {
    Board.create({ boardId });
  };

  saveDocument({ boardId, update, userId }) {
    const incrementalUpdate = Buffer.from(update).toString("base64");
    IncrimentalUpdate.create({
      userId,
      boardId,
      update: incrementalUpdate,
      timestamp: moment().utc().format(),
    });
  }

  async joinBoad(boardId) {
    const { doc, isNew } = await this.getDocument(boardId);
    const state = Y.encodeStateAsUpdate(doc);
    const stateBuffer = Buffer.from(state);
    return { state: stateBuffer, isNew };
  }

  async updateBoard({ boardId, update, userId }) {
    const { doc } = await this.getDocument(boardId);
    Y.applyUpdate(doc, update);
    this.saveDocument({ boardId, update, userId });
    const stateBuffer = Buffer.from(update); // Convert Uint8Array to Buffer
    return stateBuffer;
  }

  async getAllBoard() {
    return await Board.find({});
  }

  async snapshot(boardId) {
    const allUpdates = await IncrimentalUpdate.find({ boardId });
    const doc = new Y.Doc();
    allUpdates.forEach((element) => {
      const { update } = element;
      Y.applyUpdate(doc, Buffer.from(update, "base64"));
    });
    const state = Y.encodeStateAsUpdate(doc);
    const documentState = Buffer.from(state).toString("base64");
    await DocumentSnapshot.deleteOne({ boardId });
    await DocumentSnapshot.create({
      boardId,
      update: documentState,
      timestamp: moment().utc().format(),
    });
  }
}

const coadingboardMannager = new CoadingboardMannager();

module.exports = { coadingboardMannager };
