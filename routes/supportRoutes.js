const router = require("express").Router();
const { createTicket, getTickets } = require("../controllers/supportController");

router.post("/create", createTicket);
router.get("/", getTickets);

module.exports = router;
