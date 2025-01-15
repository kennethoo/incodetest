const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customer = new Schema({
  customerId: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
  paymentMethods: [
    { token: String, default: Boolean, ending: String, brand: String },
  ],
});

const Customer = mongoose.model("customer", customer);

module.exports = Customer;
