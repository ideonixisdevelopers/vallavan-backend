const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({

  trainerId: String,

  title: String,

  startTime: {
    type: Date,
    required: true,
  },

  duration: Number,

  type: {
    type: String,
    enum: ["one_to_one", "one_to_many"],
  },

  status: {
    type: String,
    enum: ["upcoming", "live", "completed"],
    default: "upcoming",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  }

});

module.exports = mongoose.model("Class", classSchema);