const router = require("express").Router();
const { createInvoice, getInvoices } = require("../controllers/invoiceController");

router.post("/create", createInvoice);
router.get("/:userId", getInvoices);

module.exports = router;
