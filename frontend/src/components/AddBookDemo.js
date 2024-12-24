import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBookDemo = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: '',
    pages: '',
    coverImageUrl: '',
    contentUrl: '',
    category: 'Computer Science', // Default category
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form Data Before Submit:', formData); // Log form data

    try {
      const response = await fetch('http://localhost:5002/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Book added successfully!');
        navigate('/e-books');
      } else {
        const errorData = await response.json(); // Get error message from response
        setMessage(`Failed to add book: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Error adding book:', error);
      setMessage('An error occurred while adding the book.');
    }
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="publishedYear">Published Year:</label>
          <input
            type="text"
            id="publishedYear"
            name="publishedYear"
            placeholder="Published Year"
            value={formData.publishedYear}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pages">Pages:</label>
          <input
            type="number"
            id="pages"
            name="pages"
            placeholder="Pages"
            value={formData.pages}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="coverImageUrl">Cover Image URL:</label>
          <input
            type="text"
            id="coverImageUrl"
            name="coverImageUrl"
            placeholder="Cover Image URL"
            value={formData.coverImageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contentUrl">Content URL:</label>
          <input
            type="text"
            id="contentUrl"
            name="contentUrl"
            placeholder="Content URL"
            value={formData.contentUrl}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddBookDemo;
