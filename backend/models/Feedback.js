
const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true,
    trim: true
  },
  bookTitle: {
    type: String,
    required: true,
    trim: true
  },
  authorName: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Feedback model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
