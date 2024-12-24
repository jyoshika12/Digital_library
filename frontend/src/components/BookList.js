import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BookList.css';

const BookList = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/books');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Book Collection</h1>
      <label htmlFor="search">Search by title:</label>
      <input
        id="search"
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="categories">
        <button onClick={() => handleCategoryChange('All')}>All</button>
        <button onClick={() => handleCategoryChange('Computer Science')}>Computer Science</button>
        <button onClick={() => handleCategoryChange('Mathematics')}>Mathematics</button>
        <button onClick={() => handleCategoryChange('Civil')}>Civil</button>
        <button onClick={() => handleCategoryChange('Physics')}>Physics</button>
        <button onClick={() => handleCategoryChange('Chemical')}>Chemical</button>
        <button onClick={() => handleCategoryChange('Mechanical')}>Mechanical</button>
        <button onClick={() => handleCategoryChange('Electrical and Electronics')}>Electrical and Electronics</button>
      </div>

      <div className="book-list">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book._id} className="book-item">
              <img src={book.coverImageUrl} alt={book.title} style={{ width: '100px' }} />
              <h2 className="book-title">{book.title}</h2>
              <button onClick={() => navigate(`/book/${book._id}`)}>
                Details
              </button>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
