import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import backgroundImage from '../images/Digital-Library-1.jpg'; 

const SignupContainer = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  filter: blur(8px); /* Adjust blur level */
  z-index: -1;
`;

const SignupBox = styled.div`
  background: rgba(255, 255, 255, 0.8); /* Slightly opaque background */
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
  text-align: center;
  z-index: 1;
`;

const Input = styled.input`
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

const LoginOption = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

const LoginLink = styled(Link)`
  display: inline-block;
  padding: 10px;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    background-color: #218838;
  }
`;

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/signup', { username, password });
      setMessage('Signup successful');
      console.log(response.data);
      navigate('/login'); // Redirect to Login component
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        setMessage('Signup failed: ' + (error.response.data.error || 'Server error'));
      } else if (error.request) {
        // Request was made but no response received
        setMessage('Signup failed: No response from server');
      } else {
        t
        setMessage('Signup failed: ' + error.message);
      }
      console.error(error);
    }
  };

  return (
    <SignupContainer>
      <BackgroundImage />
      <SignupBox>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Sign Up</Button>
        </form>
        {message && <p>{message}</p>}
        <LoginOption>
          Already have an account?{' '}
          <LoginLink to="/login">Login</LoginLink>
        </LoginOption>
      </SignupBox>
    </SignupContainer>
  );
};

export default Signup;
