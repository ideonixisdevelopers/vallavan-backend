const Progress = require("../models/Progress");

exports.addProgress = async (req, res) => {
  const progress = await Progress.create(req.body);
  res.status(201).json(progress);
};

exports.getProgress = async (req, res) => {
  const progress = await Progress.find({ userId: req.params.userId });
  res.json(progress);
};
