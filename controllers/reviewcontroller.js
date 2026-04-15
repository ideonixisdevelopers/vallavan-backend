const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  const review = await Review.create(req.body);
  res.json(review);
};

exports.getTrainerReviews = async (req, res) => {
  const reviews = await Review.find({ trainerId: req.params.id });
  res.json(reviews);
};
