const express = require("express");
const router = express.Router();
const { createDiet, getDietByUser } = require("../controllers/dietController");

router.post("/create", createDiet);
router.get("/:userId", getDietByUser);

module.exports = router;
