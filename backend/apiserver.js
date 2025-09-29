const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bookRoutes = require('./routes/book'); 
const Feedback = require('./models/Feedback'); 

const app = express();
const PORT = process.env.PORT || 5002; 

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ytbooks') 
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Mount the book routes
app.use('/api/books', bookRoutes); 

// Feedback POST route
app.post('/api/feedback', async (req, res) => {
  try {
    const { feedback, bookTitle, authorName } = req.body;

    if (!feedback || !bookTitle || !authorName) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newFeedback = new Feedback({ feedback, bookTitle, authorName });
    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting feedback.' });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
