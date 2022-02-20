import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Authors from './components/Authors'
import Author from "./components/Author";
import Books from "./components/Books";
import Book from "./components/Book";

function App() {
  return (
      <Router>
        <Navbar />
        <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/authors" element={<Authors/>} />
            <Route path="/books" element={<Books/>} />
            <Route path="/bookById" element={<Book />} />
            <Route path="/authorById" element={<Author />} />
        </Routes>
      </Router>
  );
}

export default App;
