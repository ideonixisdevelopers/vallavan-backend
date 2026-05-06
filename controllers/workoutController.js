const Workout = require("../models/Workout");

// GET ALL
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
exports.createWorkout = async (req, res) => {
  try {
    const workout = new Workout(req.body);
    const saved = await workout.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};