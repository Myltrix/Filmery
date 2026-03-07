const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true
  },
  director: {
    type: String,
    trim: true
  },
  year: {
    type: Number,
    min: 1888,
    max: new Date().getFullYear() + 5
  },
  genre: {
    type: String,
    enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Animation', 'Other'],
    default: 'Other'
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  status: {
    type: String,
    enum: ['plan to watch', 'watching', 'watched'],
    default: 'plan to watch'
  },
  review: {
    type: String,
    maxlength: 500
  },
  posterUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

movieSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Movie', movieSchema);