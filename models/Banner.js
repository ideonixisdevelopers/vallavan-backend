const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({

  title: String,

  subtitle: String,

  imageUrl: String,

  type: {
    type: String,
    enum: [
      "membership",
      "trainer",
      "event",
      "workout",
      "challenge",
    ],
  },

  buttonText: String,

  navigateId: String,

  active: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "Banner",
  bannerSchema,
);