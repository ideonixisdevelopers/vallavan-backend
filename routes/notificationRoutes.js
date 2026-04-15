const router = require("express").Router();
const { sendNotification, getNotifications } = require("../controllers/notificationController");

router.post("/send", sendNotification);
router.get("/:userId", getNotifications);

module.exports = router;
