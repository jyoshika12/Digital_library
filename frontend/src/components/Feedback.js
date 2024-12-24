import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImage from '../images/Digital-Library-1.jpg'; // Importing the background image

// Styled components for layout and design
const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  overflow: hidden;
`;

const BlurredBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${backgroundImage}); /* Use the imported image */
  background-size: cover;
  background-position: center;
  filter: blur(7px); /* Blur effect */
  z-index: -2;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0); /* Slight white overlay */
  z-index: -1;
`;

const FeedbackBox = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
  z-index: 1;
`;

const Input = styled.textarea`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const InputField = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: calc(100% - 20px);
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: ${props => (props.success ? 'green' : 'red')};
`;

// Feedback component
const Feedback = () => {
  const [feedback, setFeedback] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = { feedback, bookTitle, authorName };

    try {
      const response = await fetch('http://localhost:5002/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage('Feedback submitted successfully!');
        setErrorMessage('');
        setFeedback('');
        setBookTitle('');
        setAuthorName('');
      } else {
        setErrorMessage(result.message || 'Failed to submit feedback.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error submitting feedback.');
      setSuccessMessage('');
    }
  };

  return (
    <FeedbackContainer>
      <BlurredBackground />
      <BackgroundOverlay />
      <FeedbackBox>
        <h2>Feedback</h2>
        <form onSubmit={handleSubmit}>
          <Input
            rows="5"
            placeholder="Your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <h3>Book Recommendations</h3>
          <InputField
            type="text"
            placeholder="Book Title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            required
          />
          <InputField
            type="text"
            placeholder="Author Name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
        {successMessage && <Message success>{successMessage}</Message>}
        {errorMessage && <Message>{errorMessage}</Message>}
      </FeedbackBox>
    </FeedbackContainer>
  );
};

export default Feedback;
