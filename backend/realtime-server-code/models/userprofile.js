const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let profile = new Schema({
  userId: {
    type: String,
    require: true,
  },
  username: {
    type: String,
  },
  fullName: {
    type: String,
  },
  banner: {
    type: String,
  },
  profile: {
    type: String,
  },
  numberOfFollowings: {
    type: Number,
  },
  numberOfFollowers: {
    type: Number,
  },
  numberOfPosts: {
    type: Number,
  },
  blocked: {
    type: Boolean,
  },

  website: {
    type: String,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
  },
  myfitstapro: {
    type: Boolean,
  },
  canActivate: {
    type: Boolean,
  },
  private: {
    type: Boolean,
  },
  isAdmin: {
    type: Boolean,
  },
});

const UserProfile = mongoose.model("userProfile", profile);

module.exports = UserProfile;
