const mongoose =
require("mongoose");

const feedbackSchema =
new mongoose.Schema({

  studentName: {
    type: String,
  },

  studentImage: {
    type: String,
  },

  rating: {
    type: Number,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  classId: {
    type: String,
  },

  classTitle: {
    type: String,
  }

}, {
  timestamps: true,
});

module.exports =
mongoose.model(
  "Feedback",
  feedbackSchema,
);