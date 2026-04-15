const express = require("express");
const router = express.Router();
const { addProgress, getProgress } = require("../controllers/progressController");

router.post("/add", addProgress);
router.get("/:userId", getProgress);

module.exports = router;
