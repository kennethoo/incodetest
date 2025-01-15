const mongoose = require("mongoose");

let feed = {
  userId: {
    type: String,
  },
  feedPosts: [
    {
      type: String,
    },
  ],
};

let Feed = mongoose.model("feed", feed);

module.exports = Feed;
