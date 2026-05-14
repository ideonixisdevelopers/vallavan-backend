const express = require("express");
const router = express.Router();
const classController = require("../controllers/class.controller");

/// ✅ Create Class
router.post("/trainer/create-class", classController.createClass);

/// ✅ Trainer Classes
router.get("/trainer/classes/:trainerId", classController.getTrainerClasses);

/// ✅ Student Classes
router.get("/student/classes", classController.getAllClasses);
router.post("/trainer/start-class", classController.startClass);
router.post(
  "/trainer/complete-class",
  classController.completeClass,
);

router.put(
  "/class/complete/:id",
  classController.markClassComplete,
);

module.exports = router;
