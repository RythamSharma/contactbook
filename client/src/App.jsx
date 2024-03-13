import { useState } from 'react'
import './App.css'
import React from 'react';
import Signup from './pages/Signup'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Viewcontact from './pages/Viewcontact';
import Addcontact from './pages/Addcontact';

function App() {
  return (
    <>
        <Router>
        <Routes>
        <Route exact path="/" element={<React.Fragment><Dashboard/></React.Fragment>} />
        <Route exact path="/login" element={<React.Fragment><Login/></React.Fragment>} />
        <Route exact path="/signup" element={<React.Fragment><Signup /></React.Fragment>} />
        <Route exact path="/contact/:id" element={<React.Fragment><Viewcontact /></React.Fragment>} />
        <Route exact path="/addcontact" element={<React.Fragment><Addcontact /></React.Fragment>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
