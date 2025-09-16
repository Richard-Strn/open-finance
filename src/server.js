require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const customerRoutes = require("./routes/customerRoutes");
const accountRoutes = require("./routes/accountRoutes");

const app = express();
app.use(express.json());

// Rotas
app.use("/customers", customerRoutes);
app.use("/accounts", accountRoutes);

// Variáveis de ambiente
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Conexão com MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch(err => console.error("Erro ao conectar MongoDB:", err));
