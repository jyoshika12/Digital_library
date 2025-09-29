const mongoose = require('mongoose');

// Define book schema with specified fields
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },            
  author: { type: String, required: true },           
  genre: { type: String, required: true },            
  publishedYear: { type: Number, required: true },   
  pages: { type: Number, required: true },            
  coverImageUrl: { type: String, required: false },   
  contentUrl: { type: String, required: true },       
  category: { type: String, required: true },        
});

// Create book model
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
