import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #282c34;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
`;

const Logo = styled.h1`
  font-size: 1.5em;
  font-family: 'Roboto', sans-serif;  // Use the custom font
`;

const Nav = styled.nav`
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0 10px;
  }

  a {
    color: white;
    text-decoration: none;
    font-size: 1em;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>E-Books</Logo>
      <Nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
        </ul>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
