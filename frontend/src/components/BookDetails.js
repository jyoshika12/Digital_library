import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './BookDetails.css'; // Import your CSS file for styles

const BookDetails = ({ isLoggedIn }) => {  // Accept isLoggedIn as a prop
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const navigate = useNavigate(); // Use navigate for redirecting

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5002/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div className="spinner">Loading...</div>; // Loading indicator
  if (error) return <div>Error: {error}</div>;

  const handleReadClick = () => {
    if (!isLoggedIn) {
      alert("You need to log in to read this book.");
      navigate('/login'); // Redirect to the login page
    } else {
      window.open(book.contentUrl, '_blank'); // Open the book content in a new tab
    }
  };

  return (
    <div className="book-details">
      <Link to="/search" style={{ marginBottom: '20px' }}>Back to Book List</Link> {/* Change this line */}
      <h1>{book.title}</h1>
      <img src={book.coverImageUrl} alt={`Cover of ${book.title} by ${book.author}`} />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Published Year:</strong> {book.publishedYear}</p>
      <p><strong>Pages:</strong> {book.pages}</p>
      {isLoggedIn ? (
        <button onClick={handleReadClick}>Read Book</button>
      ) : (
        <button onClick={() => { alert("You need to log in to read this book."); navigate('/login'); }}>Login to Read</button>
      )}
    </div>
  );
};

export default BookDetails;
