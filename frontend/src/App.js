import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Search from './components/Search';
import Feedback from './components/Feedback';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import AddBookDemo from './components/AddBookDemo';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add login state

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<BookList />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/book/:id" element={<BookDetails isLoggedIn={isLoggedIn} />} /> {/* Pass isLoggedIn here */}
        <Route path="/add-book" element={<AddBookDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
