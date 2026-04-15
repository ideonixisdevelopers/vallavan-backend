const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  paymentId: mongoose.Schema.Types.ObjectId,
  amount: Number
}, { timestamps: true });

module.exports = mongoose.model("Invoice", invoiceSchema);
