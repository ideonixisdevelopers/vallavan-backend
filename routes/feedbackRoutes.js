const express =
require("express");

const router =
express.Router();

const {

  addFeedback,

  getFeedbacks,

} = require(
  "../controllers/feedbackController",
);

router.post(
  "/add",
  addFeedback,
);

router.get(
  "/all",
  getFeedbacks,
);

module.exports = router;