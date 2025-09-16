const express = require("express");
const router = express.Router();
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

// Consultar saldo
router.get("/:id/balance", async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: "Conta não encontrada" });

    res.json({ balance: account.balance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Realizar transação (crédito/débito)
router.post("/:id/transactions", async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: "Conta não encontrada" });

    const transaction = await Transaction.create(req.body);
    account.transactions.push(transaction._id);

    // Atualizar saldo
    if (transaction.type === "credit") {
      account.balance += transaction.amount;
    } else if (transaction.type === "debit") {
      account.balance -= transaction.amount;
    }

    await account.save();

    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar transações (extrato)
router.get("/:id/transactions", async (req, res) => {
  try {
    const account = await Account.findById(req.params.id).populate("transactions");
    if (!account) return res.status(404).json({ error: "Conta não encontrada" });

    res.json(account.transactions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
