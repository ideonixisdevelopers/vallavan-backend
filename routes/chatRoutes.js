const express = require("express");

const router = express.Router();

const {
  sendMessage,
  getTrainerChats,
  getStudentChats,
} = require("../controllers/chatController");


/// 🔥 SEND MESSAGE
router.post(
  "/send",
  sendMessage
);


/// 🔥 GET TRAINER CHATS
router.get(
  "/trainer/:trainerId",
  getTrainerChats
);

router.get(
  "/student/:studentId",
  getStudentChats
);

module.exports = router;