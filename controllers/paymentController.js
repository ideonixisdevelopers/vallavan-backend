const Payment = require("../models/Payment");

exports.createPayment = async (req, res) => {
  const payment = await Payment.create(req.body);
  res.status(201).json(payment);
};

exports.getPayments = async (req, res) => {
  const payments = await Payment.find();
  res.json(payments);
};
