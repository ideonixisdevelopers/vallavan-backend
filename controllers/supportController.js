const Support = require("../models/Support");

exports.createTicket = async (req, res) => {
  const ticket = await Support.create(req.body);
  res.json(ticket);
};

exports.getTickets = async (req, res) => {
  const tickets = await Support.find();
  res.json(tickets);
};
