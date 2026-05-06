const Workout = require("../models/Workout");
const WorkoutDetail = require("../models/WorkoutDetail");

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

exports.getWorkoutDetail = async (req, res) => {
  try {
    const workout = await WorkoutDetail.findOne({
      workoutId: req.params.id,
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.json(workout);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};