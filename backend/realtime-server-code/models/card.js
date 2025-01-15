const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let card = new Schema({
  userId: String,
  item: [{ programId: String, selected: Boolean }],
});

const Card = mongoose.model("card", card);

module.exports = Card;
