const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  _id: String,

  title: String,
  badge: String,
  badgeColor: String,
  minutes: Number,
  calories: Number,
  rating: Number,
  imageUrl: String,
  level: String,
  category: String,
});

module.exports = mongoose.model(
  "workoutsCategories",
  workoutSchema
);