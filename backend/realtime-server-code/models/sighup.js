const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    //  require:true
  },
  password: {
    type: String,
  },
  username: {
    type: String,
  },
});
userSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const User = mongoose.model("userinfo", userSchema);

module.exports = User;
