const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

router.route('/')
  .get(protect, getMovies)
  .post(protect, createMovie);

router.route('/:id')
  .get(protect, getMovieById)
  .put(protect, updateMovie)
  .delete(protect, deleteMovie);

module.exports = router;