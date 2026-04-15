const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  method: String,
  status: String
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
