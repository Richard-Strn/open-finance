const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  date: { type: String, required: true }, // formato ISO YYYY-MM-DD
  description: String,
  amount: Number,
  type: { type: String, enum: ["credit", "debit"], required: true },
  category: String
});

module.exports = mongoose.model("Transaction", TransactionSchema);
