import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './BookModal.css'; // Import CSS for styling

const BookModal = ({ book, onClose, isLoggedIn }) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  if (!book) return null; // If no book is selected, return null

  const handleReadBookClick = () => {
    // Open book content if logged in
    window.open(book.contentUrl, '_blank');
  };

  const handleLoginRedirect = () => {
    alert('You must log in to read this book.'); // Alert for login
    navigate(`/login?redirect=/books/${book._id}`); // Navigate to login page with a redirect to the current book
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Book cover and details */}
        <img src={book.coverImageUrl} alt={book.title} style={{ width: '150px', marginBottom: '10px' }} />
        <h2 className="book-title">{book.title}</h2>
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>Published Year:</strong> {book.publishedYear}</p>
        <p><strong>Pages:</strong> {book.pages}</p>

        <div className="button-container">
          {/* Conditional rendering based on login status */}
          {!isLoggedIn ? (
            <button className="read-book-button" onClick={handleLoginRedirect}>
              Login to Read
            </button>
          ) : (
            <button className="read-book-button" onClick={handleReadBookClick}>
              Read Book
            </button>
          )}
          
          {/* Close Button */}
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default BookModal;
