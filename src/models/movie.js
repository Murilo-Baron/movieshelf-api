// src/models/Movie.js
const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "O título é obrigatório"],
      trim: true,
      minlength: [2, "O título deve ter pelo menos 2 caracteres"],
    },
    year: {
      type: Number,
      min: [1888, "Ano muito antigo para um filme 😅"],
      max: [3000, "Ano inválido"],
    },
    rating: {
      type: Number,
      min: [0, "A nota mínima é 0"],
      max: [10, "A nota máxima é 10"],
    },
    tags: {
      type: [String],
      default: [],
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
);

module.exports = model("Movie", movieSchema);
