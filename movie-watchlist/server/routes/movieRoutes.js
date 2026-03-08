const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getMovies,
  getCommunityMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getComments,
  addComment
} = require('../controllers/movieController');

router.route('/')
  .get(protect, getMovies)
  .post(protect, createMovie);

router.get('/community', protect, getCommunityMovies);

router.route('/:id')
  .get(protect, getMovieById)
  .put(protect, updateMovie)
  .delete(protect, deleteMovie);

router.route('/:movieId/comments')
  .get(protect, getComments)
  .post(protect, addComment);

module.exports = router;
