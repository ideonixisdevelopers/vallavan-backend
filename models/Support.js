const mongoose = require("mongoose");

const supportSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  issue: String,
  status: { type: String, default: "open" }
}, { timestamps: true });

module.exports = mongoose.model("Support", supportSchema);
