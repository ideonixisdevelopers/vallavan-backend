const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({

  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
    required: true,
  },

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },

  sender: {
    type: String,
    enum: ["trainer", "student"],
    required: true,
  },

  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  senderName: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  isRead: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true,
});

module.exports = mongoose.model("Chat", chatSchema);