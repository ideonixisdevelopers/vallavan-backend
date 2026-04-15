const express = require("express");
const router = express.Router();

const studentController = require("../controllers/studentController");
const upload = require("../middleware/upload");


// ───────── REGISTER STUDENT + SEND OTP ─────────
router.post(
  "/register",
  upload.single("profileImage"),
  studentController.registerStudent
);


// ───────── VERIFY OTP ─────────
router.post(
  "/verify-otp",
  studentController.verifyStudentOtp
);


//───────── CREATE PIN ─────────
router.post(
  "/create-pin",
  studentController.createPin
);


module.exports = router;