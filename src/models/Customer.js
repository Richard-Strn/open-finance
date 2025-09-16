const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }]
});

module.exports = mongoose.model("Customer", CustomerSchema);