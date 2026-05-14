const mongoose = require("mongoose");

const challengeSchema =
  new mongoose.Schema({

    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      default: "",
    },

    tag: {
      type: String,
      default: "ACTIVE",
    },

    duration: {
      type: String,
      default: "30 Days",
    },

    level: {
      type: String,
      default: "Intermediate",
    },

    joinedCount: {
      type: Number,
      default: 0,
    },

    iconName: {
      type: String,
      default: "fire",
    },

    colorHex: {
      type: String,
      default: "#FF6B2C",
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    currentDay: {
      type: Number,
      default: 1,
    },

    totalDays: {
      type: Number,
      default: 30,
    },

    totalKcal: {
      type: Number,
      default: 0,
    },

    progressPercent: {
      type: Number,
      default: 0,
    },

    dailyKcalTarget: {
      type: Number,
      default: 200,
    },

    dailyTargetLabel: {
      type: String,
      default: "",
    },

    todayDate: {
      type: String,
      default: "",
    },

    calsBurned: {
      type: Number,
      default: 0,
    },

    caloriesMissed: {
      type: Number,
      default: 0,
    },

    hoursTime: {
      type: Number,
      default: 0,
    },

    streak: {
      type: String,
      default: "",
    },

    imageUrl: {
      type: String,
      default: "",
    },
  },

  {
    timestamps: true,
  },
);

module.exports =
  mongoose.model(
    "Challenge",
    challengeSchema,
  );