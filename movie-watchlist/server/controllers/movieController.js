const Movie = require('../models/Movie');

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMovie = async (req, res) => {
  try {
    const { title, director, year, genre, rating, status, review, posterUrl } = req.body;
    
    const movie = await Movie.create({
      user: req.user._id,
      title,
      director,
      year,
      genre,
      rating,
      status,
      review,
      posterUrl
    });
    
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    const { title, director, year, genre, rating, status, review, posterUrl } = req.body;
    
    movie.title = title || movie.title;
    movie.director = director || movie.director;
    movie.year = year || movie.year;
    movie.genre = genre || movie.genre;
    movie.rating = rating || movie.rating;
    movie.status = status || movie.status;
    movie.review = review || movie.review;
    movie.posterUrl = posterUrl || movie.posterUrl;
    movie.updatedAt = Date.now();
    
    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.id, user: req.user._id });
    
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    await movie.deleteOne();
    res.json({ message: 'Movie removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};