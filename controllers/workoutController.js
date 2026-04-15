const Workout = require("../models/Workout");

// create workout
exports.createWorkout = async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
};

// get all workouts
exports.getWorkouts = async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
};
