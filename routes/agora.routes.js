const express = require("express");
const router = express.Router();
const { generateRtcToken } = require("../utils/agoraToken");

router.get("/rtc-token", (req, res) => {
  const { channel, uid } = req.query;

  if (!channel || !uid) {
    return res.status(400).json({ error: "channel & uid required" });
  }

  const token = generateRtcToken(channel, uid);
  res.json({ token });
});

module.exports = router;
