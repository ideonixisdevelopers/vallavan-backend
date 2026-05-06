const WorkoutDetail = require("../models/WorkoutDetail");

// GET DETAIL BY workoutId
exports.getWorkoutDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await WorkoutDetail.findOne({
      workoutId: id,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Workout detail not found",
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};