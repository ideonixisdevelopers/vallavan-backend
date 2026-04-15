const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    id: {
      type: String, // plan_1
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    durationType: {
      type: String, // monthly, yearly
      required: true,
    },

    duration: {
      type: Number, // 1, 6, 12
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    description: {
      type: String,
      required: true,
    },

    isBestValue: {
      type: Boolean,
      default: false,
    },

    assets: {
      type: String, // image path
      required: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Membership", membershipSchema);