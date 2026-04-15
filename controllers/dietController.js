const Diet = require("../models/Diet");

exports.createDiet = async (req, res) => {
  const diet = await Diet.create(req.body);
  res.status(201).json(diet);
};

exports.getDietByUser = async (req, res) => {
  const diet = await Diet.find({ userId: req.params.userId });
  res.json(diet);
};
