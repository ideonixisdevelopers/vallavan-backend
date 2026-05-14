const express =
  require("express");

const router =
  express.Router();

const {

  getStudentChallenges,

  getChallengeDetail,

  markDailyProgress,

} = require(
  "../controllers/challengeController",
);

/// 🔥 GET ALL
router.get(

  "/students/:studentId/challenges",

  getStudentChallenges,
);

/// 🔥 GET DETAIL
router.get(

  "/students/:studentId/challenges/:challengeId",

  getChallengeDetail,
);

/// 🔥 UPDATE PROGRESS
router.post(

  "/students/:studentId/challenges/:challengeId/progress",

  markDailyProgress,
);

module.exports =
  router;