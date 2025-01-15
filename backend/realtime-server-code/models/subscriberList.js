const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let subScriber = new Schema({
  publisherId: String,
  subScriberId: String,
  lastPaymentDate: String,
  nextPaymentDate: String,
  status: Boolean,
  priceOfUser: String,
  subscriptionType: Number,
  planName: String,
});

let Subscription = mongoose.model("subscriber", subScriber);

module.exports = Subscription;
