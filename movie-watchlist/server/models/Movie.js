const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: true }
);

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    director: {
      type: String,
      default: ''
    },
    year: {
      type: Number
    },
    genre: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: 'plan to watch'
    },
    rating: {
      type: Number,
      default: 0
    },
    review: {
      type: String,
      default: ''
    },
    posterUrl: {
      type: String,
      default: ''
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    comments: [commentSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Movie', movieSchema);
