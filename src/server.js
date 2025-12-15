// src/server.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
const MONGODB_URI = process.env.MONGODB_URI;

// Conecta ao MongoDB
connectDB(MONGODB_URI);

// Middlewares globais
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.json({ message: "MovieShelf API está rodando 🎬" });
});

// Rotas de filmes
app.use("/api/movies", movieRoutes);

// Middleware de erro (sempre por último)
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
