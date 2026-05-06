const mongoose = require("mongoose");

const workoutDetailSchema = new mongoose.Schema({
  workoutId: {
    type: String,
    required: true,
    unique: true, // 🔥 one detail per workout
  },

  title: String,
  description: String,
  minutes: Number,
  calories: Number,
  rating: Number,
  level: String,
  category: String,
  imageUrl: String,
  videoUrl: String,

  sets: Number,
  reps: Number,

  instructions: [String],
  tips: [String],
});

module.exports = mongoose.model("WorkoutDetail", workoutDetailSchema);