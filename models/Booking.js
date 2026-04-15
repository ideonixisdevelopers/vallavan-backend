const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  trainerId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  date: Date,
  time: String,
  status: { type: String, default: "booked" }
});

module.exports = mongoose.model("Booking", bookingSchema);
