const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let routine = new Schema({
  userId: String,
  collectionName: String,
  data: [{ type: String }],
});

const Routine = mongoose.model("routine", routine);
