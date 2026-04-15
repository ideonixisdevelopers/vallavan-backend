const Invoice = require("../models/Invoice");

exports.createInvoice = async (req, res) => {
  const invoice = await Invoice.create(req.body);
  res.json(invoice);
};

exports.getInvoices = async (req, res) => {
  const list = await Invoice.find({ userId: req.params.userId });
  res.json(list);
};
