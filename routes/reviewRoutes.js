const router = require("express").Router();
const { addReview, getTrainerReviews } = require("../controllers/reviewcontroller");

router.post("/add", addReview);
router.get("/trainer/:id", getTrainerReviews);

module.exports = router;
