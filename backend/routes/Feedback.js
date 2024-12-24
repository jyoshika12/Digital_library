const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Import Feedback model

// POST route to handle feedback submission
router.post('/', async (req, res) => {
  try {
    const { feedback, bookTitle, authorName } = req.body;

    // Validate required fields
    if (!feedback || !bookTitle || !authorName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new feedback entry
    const newFeedback = new Feedback({
      feedback,
      bookTitle,
      authorName
    });

    // Save feedback to the database
    await newFeedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
