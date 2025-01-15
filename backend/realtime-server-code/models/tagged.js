const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let taggeg = new Schema({
  userId: String,
  postLists: [{ type: String }],
});

const Taggeg = mongoose.model("taggeg", taggeg);

module.exports = Taggeg;
