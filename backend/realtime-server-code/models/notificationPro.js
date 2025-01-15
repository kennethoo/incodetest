const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let notificationPro = new Schema({
  userId: { type: String },
  counter: Number,
  data: [
    {
      type: { type: String },
      notifiyiEmail: { type: String },
      media: { type: String },
      date: { type: String },
      extraInfo: { type: String },
    },
  ],
});

const NotificationPro = mongoose.model("notificationPro", notificationPro);
module.exports = NotificationPro;
