const mongoose = require('mongoose');

// Define book schema with specified fields
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },            // Book title
  author: { type: String, required: true },           // Book author
  genre: { type: String, required: true },            // Book genre
  publishedYear: { type: Number, required: true },    // Year of publication
  pages: { type: Number, required: true },            // Number of pages
  coverImageUrl: { type: String, required: false },   // URL for the cover image
  contentUrl: { type: String, required: true },       // URL to PDF/Word document
  category: { type: String, required: true },         // Book category (e.g., Computer Science, Mathematics, etc.)
});

// Create book model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
