// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import axios from 'axios';
// import backgroundImage from '../images/Digital-Library-1.jpg'; // Adjust path as necessary

// const LoginContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   position: relative;
// `;

// const BackgroundImage = styled.div`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-image: url(${backgroundImage});
//   background-size: cover;
//   background-position: center;
//   filter: blur(8px);
//   z-index: -1;
// `;

// const LoginBox = styled.div`
//   background: rgba(255, 255, 255, 0.8);
//   padding: 30px;
//   border-radius: 10px;
//   box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
//   width: 100%;
//   max-width: 400px;
//   text-align: center;
//   z-index: 1;
// `;

// const Input = styled.input`
//   width: calc(100% - 20px);
//   padding: 10px;
//   margin: 10px 0;
//   border: 1px solid #ccc;
//   border-radius: 5px;
// `;

// const Button = styled.button`
//   width: calc(100% - 20px);
//   padding: 10px;
//   border: none;
//   border-radius: 5px;
//   background-color: #007bff;
//   color: white;
//   font-size: 16px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const Login = ({ setIsLoggedIn }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5001/login', { username, password });
//       setMessage('Login successful');
//       console.log(response.data);
//       setIsLoggedIn(true); // Update the login state
//       navigate('/'); // Redirect to Home component
//     } catch (error) {
//       if (error.response) {
//         setMessage('Login failed: ' + (error.response.data.error || 'Server error'));
//       } else if (error.request) {
//         setMessage('Login failed: No response from server');
//       } else {
//         setMessage('Login failed: ' + error.message);
//       }
//       console.error(error);
//     }
//   };

//   return (
//     <LoginContainer>
//       <BackgroundImage />
//       <LoginBox>
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <Input
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required // Ensure this field is required
//           />
//           <Input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required // Ensure this field is required
//           />
//           <Button type="submit">Login</Button>
//         </form>
//         {message && <p>{message}</p>}
//         <p>
//           Don't have an account? <Link to="/signup">Sign up</Link>
//         </p>
//       </LoginBox>
//     </LoginContainer>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import backgroundImage from '../images/Digital-Library-1.jpg'; // Adjust path as necessary

// Styled components
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;
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
  filter: blur(8px);
  z-index: -1;
`;

const LoginBox = styled.div`
  background: rgba(255, 255, 255, 0.8);
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
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
  
  &:hover {
    background-color: ${(props) => (props.disabled ? '#007bff' : '#0056b3')};
  }
`;

const Message = styled.p`
  color: ${(props) => (props.error ? 'red' : 'green')};
  font-size: 14px;
`;

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for button disable
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setMessage(''); // Clear previous messages

    try {
      const response = await axios.post('http://localhost:5001/login', { username, password });
      
      // Assume the response contains a token
      const { token } = response.data;
      localStorage.setItem('authToken', token); // Store token in localStorage

      setMessage('Login successful!');
      setIsLoggedIn(true); // Update the login state
      setUsername(''); // Clear form
      setPassword('');
      navigate('/'); // Redirect to Home component
    } catch (error) {
      if (error.response) {
        setMessage('Login failed: ' + (error.response.data.error || 'Invalid credentials'));
      } else if (error.request) {
        setMessage('Login failed: No response from server');
      } else {
        setMessage('Login failed: ' + error.message);
      }
      setIsLoggedIn(false); // Ensure user is not logged in
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <LoginContainer>
      <BackgroundImage />
      <LoginBox>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required // Ensure this field is required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Ensure this field is required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        {message && <Message error={message.includes('failed')}>{message}</Message>}
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </LoginBox>
    </LoginContainer>
  );
};

export default Login;

