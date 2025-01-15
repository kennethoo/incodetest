const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let verify = new Schema({
  email: String,
  code: Number,
});

const Recover = mongoose.model("verification", verify);
module.exports = Recover;
