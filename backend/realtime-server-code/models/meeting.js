const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const meeting = new Schema({
  publisherId: String,
  isPaid: Boolean,
  price: Number,
  startTime: String,
  endTime: String,
});
const Meeting = mongoose.model("meeting", meeting);
module.exports = Meeting;
