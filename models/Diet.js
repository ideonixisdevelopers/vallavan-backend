const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  breakfast: String,
  lunch: String,
  dinner: String,
  calories: Number
}, { timestamps: true });

module.exports = mongoose.model('Diet', dietSchema);
    