// frontend/AddBook.js

import React, { useState } from 'react';
import './AddBook.css'; //  CSS file for styling

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: '',
    pages: '',
    coverImageUrl: '',
    contentUrl: '',
    category: 'Computer Science', 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5002/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Book added successfully!');
        setFormData({
          title: '',
          author: '',
          genre: '',
          publishedYear: '',
          pages: '',
          coverImageUrl: '',
          contentUrl: '',
          category: 'Computer Science', 
        });
      } else {
        alert('Error adding book. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the book. Please check the console for more details.');
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            name="author"
            id="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            name="genre"
            id="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Genre"
            required
          />
        </div>
        <div>
          <label htmlFor="publishedYear">Published Year:</label>
          <input
            type="number"
            name="publishedYear"
            id="publishedYear"
            value={formData.publishedYear}
            onChange={handleChange}
            placeholder="Published Year"
            required
          />
        </div>
        <div>
          <label htmlFor="pages">Pages:</label>
          <input
            type="number"
            name="pages"
            id="pages"
            value={formData.pages}
            onChange={handleChange}
            placeholder="Pages"
            required
          />
        </div>
        <div>
          <label htmlFor="coverImageUrl">Cover Image URL:</label>
          <input
            type="text"
            name="coverImageUrl"
            id="coverImageUrl"
            value={formData.coverImageUrl}
            onChange={handleChange}
            placeholder="Cover Image URL"
            required
          />
        </div>
        <div>
          <label htmlFor="contentUrl">Content URL:</label>
          <input
            type="text"
            name="contentUrl"
            id="contentUrl"
            value={formData.contentUrl}
            onChange={handleChange}
            placeholder="Content URL"
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Computer Science">Computer Science</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Civil">Civil</option>
            <option value="Physics">Physics</option>
            <option value="Chemical">Chemical</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electrical and Electronics">Electrical and Electronics</option>
          </select>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
