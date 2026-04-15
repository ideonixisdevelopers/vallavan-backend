const Notification = require("../models/Notification");

exports.sendNotification = async (req, res) => {
  const data = await Notification.create(req.body);
  res.json(data);
};

exports.getNotifications = async (req, res) => {
  const list = await Notification.find({ userId: req.params.userId });
  res.json(list);
};
