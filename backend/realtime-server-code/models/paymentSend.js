const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let receite = new Schema({
  userId: String,
  amount: String,
  date: String,
  status: String,
});
