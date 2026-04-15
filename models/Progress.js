const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  weight: Number,
  bmi: Number,
  note: String
}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);
