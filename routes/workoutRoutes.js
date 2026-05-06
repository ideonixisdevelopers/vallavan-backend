const express = require("express");
const router = express.Router();
const controller = require("../controllers/workoutController");
const controllers = require("../controllers/workoutDetailController");
router.get("/", controller.getWorkouts);
router.post("/", controller.createWorkout);
router.get("/:id", controllers.getWorkoutDetail);

module.exports = router;