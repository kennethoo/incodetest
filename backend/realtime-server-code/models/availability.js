const Schema = mongoose.Schema;
const availability = new Schema({
  userId: String,
  date: String,
});
const Availability = mongoose.model("availability", availability);
module.exports = Availability;
