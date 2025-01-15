const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const session = new Schema({
  _id: String,
  expires: Date,
  session: Object,
});

module.exports = session;
