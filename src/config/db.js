// src/config/db.js
const mongoose = require("mongoose");

async function connectDB(mongoUri) {
  try {
    await mongoose.connect(mongoUri);
    console.log("✅ Conectado ao MongoDB");
  } catch (err) {
    console.error("❌ Erro ao conectar ao MongoDB:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
