const express = require('express');
const router = express.Router();
const Book = require('../models/book'); // Ensure this path is correct

// GET route to fetch all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the database
    res.status(200).json(books); // Send the list of books back to the client
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' }); // Handle errors
  }
});

// GET route to fetch a book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Fetch the book by ID
    if (!book) return res.status(404).json({ error: 'Book not found' }); // Handle case where book is not found
    res.status(200).json(book); // Send the book details back to the client
  } catch (error) {
    console.error('Error fetching book by ID:', error);
    res.status(500).json({ error: 'Failed to fetch book' }); // Handle errors
  }
});

// POST route to add a new book
router.post('/', async (req, res) => {
  try {
    // Destructure the incoming request body
    const { title, author, genre, publishedYear, pages, coverImageUrl, contentUrl, category } = req.body;

    // Create a new book instance
    const newBook = new Book({
      title,
      author,
      genre,
      publishedYear,
      pages,
      coverImageUrl,
      contentUrl,
      category, // Include category to satisfy the model requirements
    });

    // Save the new book to the database
    const savedBook = await newBook.save();

    // Return the saved book and a status code of 201 (Created)
    res.status(201).json(savedBook);
  } catch (error) {
    // Log the error and send a 500 response if there's a failure
    console.error('Error adding book:', error);
    res.status(500).json({ error: 'Failed to add book' });
  }
});

// Export the router
module.exports = router;
