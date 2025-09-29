import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './search.css';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:5002/api/books');
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
      setLoading(false);
    };

    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  // Styles
  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    height: '100vh', 
  };

  const backgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(../images/Digital-Library-1.jpg)', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(7px)',
    zIndex: -1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    padding: '20px',
    color: 'white', // Change text color for better contrast
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>
      <div style={contentStyle}>
        <h2>Search Books</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
            />
            <div className="search-results">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <div key={book._id} className="book-item">
                    <img src={book.coverImageUrl} alt={book.title} />
                    <h3>{book.title}</h3>
                    <Link to={`/book/${book._id}`}>Details</Link>
                  </div>
                ))
              ) : (
                <p>No books found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
