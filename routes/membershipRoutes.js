const express = require("express");
const router = express.Router();
const membershipController = require("../controllers/membershipController");

// GET all plans
router.get("/", membershipController.getMembershipPlans);

// POST create plan (admin)
// router.post("/", membershipController.createMembership);

module.exports = router;
