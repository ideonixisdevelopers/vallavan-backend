const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  title: String,
  badge: String,
  minutes: Number,
  calories: Number,
  rating: Number,
  imageUrl: String,
  level: String,
  category: String,
});

module.exports = mongoose.model("workoutsCategories", workoutSchema);