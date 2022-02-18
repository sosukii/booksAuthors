import './App.css';
import Nav from './components/navbar/nav'
import React, {Component, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


import { BrowserRouter} from "react-router-dom"
import {useMutation, useQuery} from "@apollo/client";

import {GET_ALL_USERS, GET_ONE_USER} from "./query/user";
import {CREATE_USER} from "./mutation/user";
import {GET_ALL_AUTHORS, GET_ONE_AUTHOR} from "./query/author";
import {GET_ALL_BOOKS, GET_ONE_BOOK} from "./query/book";
import Authors from './components/Authors'
import Books from "./components/Books";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Book from "./components/Book";
import Author from "./components/Author";

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
