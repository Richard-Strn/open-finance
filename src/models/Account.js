const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  type: { type: String, enum: ["checking", "savings"], required: true },
  branch: String,
  number: String,
  balance: { type: Number, default: 0 },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }]
});

module.exports = mongoose.model("Account", AccountSchema);
