import React from 'react';
import styled from 'styled-components';
import exampleImage from '../images/2 digital-library.jpg'; // Correct import path

const HomeContainer = styled.div`
  position: relative;
  height: 100vh; /* Full viewport height */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(8px); /* Adjust blur level as needed */
  z-index: -1; /* Send the image behind the text */
`;

const OverlayContent = styled.div`
  position: relative;
  color: white; /* Adjust text color for better visibility */
  padding: 20px;
  backdrop-filter: blur(5px); /* Optional: blur background of content area */
  border-radius: 10px; /* Optional: rounded corners */
  z-index: 1; /* Ensure text is above the image */
`;

const Heading = styled.h1`
  font-size: 2.5em;
  color: #333;
`;

const Home = () => {
  return (
    <HomeContainer>
      <BackgroundImage src={exampleImage} alt="Hero" />
      <OverlayContent>
        <Heading>Welcome to E-Books!</Heading>
        <p>Your one-stop digital library for all your reading needs.</p>
      </OverlayContent>
    </HomeContainer>
  );
};

export default Home;

