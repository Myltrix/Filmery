const Movie = require('../models/Movie');

// @desc    Get current user's movies
// @route   GET /api/movies
// @access  Private
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    console.error('Get movies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get community movies (other users' movies)
// @route   GET /api/movies/community
// @access  Private
const getCommunityMovies = async (req, res) => {
  try {
    const movies = await Movie.find({
      user: { $ne: req.user._id }
    })
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    res.json(movies);
  } catch (error) {
    console.error('Get community movies error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get movie by ID
// @route   GET /api/movies/:id
// @access  Private
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (movie.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(movie);
  } catch (error) {
    console.error('Get movie by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create movie
// @route   POST /api/movies
// @access  Private
const createMovie = async (req, res) => {
  try {
    const {
      title,
      director,
      year,
      genre,
      status,
      rating,
      review,
      posterUrl
    } = req.body;

    const movie = await Movie.create({
      title,
      director,
      year,
      genre,
      status,
      rating,
      review,
      posterUrl,
      user: req.user._id,
      comments: []
    });

    res.status(201).json(movie);
  } catch (error) {
    console.error('Create movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private
const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (movie.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json(updatedMovie);
  } catch (error) {
    console.error('Update movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private
const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (movie.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await movie.deleteOne();

    res.json({ message: 'Movie removed' });
  } catch (error) {
    console.error('Delete movie error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get comments for a movie
// @route   GET /api/movies/:movieId/comments
// @access  Private
const getComments = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId).populate('comments.user', 'username');

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie.comments || []);
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add comment to a movie
// @route   POST /api/movies/:movieId/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const movie = await Movie.findById(req.params.movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const newComment = {
      user: req.user._id,
      text: text.trim(),
      createdAt: new Date()
    };

    movie.comments.push(newComment);
    await movie.save();

    const updatedMovie = await Movie.findById(req.params.movieId).populate('comments.user', 'username');
    const savedComment = updatedMovie.comments[updatedMovie.comments.length - 1];

    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getMovies,
  getCommunityMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getComments,
  addComment
};
