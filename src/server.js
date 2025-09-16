const express = require("express");
const mongoose = require("mongoose");

const customerRoutes = require("./routes/customerRoutes");
const accountRoutes = require("./routes/accountRoutes");

const app = express();
app.use(express.json());

// Rotas
app.use("/customers", customerRoutes);
app.use("/accounts", accountRoutes);

// Conectar no MongoDB via variável de ambiente
const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/openfinance";

mongoose.connect(mongoURL)
  .then(() => {
    console.log("✅ MongoDB conectado");
    app.listen(3000, () => console.log("🚀 Servidor rodando na porta 3000"));
  })
  .catch(err => console.error("❌ Erro ao conectar MongoDB:", err));


  require("dotenv").config(); // carrega variáveis do .env

/*const express = require("express");
const mongoose = require("mongoose");
const customerRoutes = require("./routes/customerRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/customers", customerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});*/
