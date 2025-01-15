const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let notificationbasic = new Schema({
  userId: { type: String },
  counter: Number,
  notificationList: [
    {
      type: { type: String },
      notifiyiEmail: { type: String },
      postId: { type: String },
      date: { type: String },
      extraInfo: { type: String },
    },
  ],
});

const NotificationBasic = mongoose.model(
  "notificationbasic",
  notificationbasic
);
module.exports = NotificationBasic;
