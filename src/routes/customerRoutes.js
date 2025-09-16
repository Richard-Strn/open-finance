const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const Account = require("../models/Account");

// Criar cliente
router.post("/", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Criar conta para cliente
router.post("/:id/accounts", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: "Cliente não encontrado" });

    const account = await Account.create(req.body);
    customer.accounts.push(account._id);
    await customer.save();

    res.json(account);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
