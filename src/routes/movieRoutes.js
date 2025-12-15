// src/routes/movieRoutes.js
const express = require("express");
const Movie = require("../models/Movie");

const router = express.Router();

// GET /api/movies
router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    next(err);
  }
});

// GET /api/movies/:id
router.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }

    res.json(movie);
  } catch (err) {
    next(err);
  }
});

// POST /api/movies
router.post("/", async (req, res, next) => {
  try {
    const { title, year, rating, tags } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Título é obrigatório" });
    }

    const movie = await Movie.create({
      title: title.trim(),
      year,
      rating,
      tags,
    });

    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/movies/:id
router.patch("/:id", async (req, res, next) => {
  try {
    const { title, year, rating, tags } = req.body;

    const update = { title, year, rating, tags };

    const movie = await Movie.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }

    res.json(movie);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/movies/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
