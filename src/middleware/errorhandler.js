// src/middleware/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error("Erro:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Erro de validação",
      details: err.errors,
    });
  }

  if (err.name === "CastError" && err.kind === "ObjectId") {
    return res.status(400).json({
      message: "ID inválido",
    });
  }

  res.status(500).json({
    message: "Erro interno do servidor",
  });
}

module.exports = errorHandler;
