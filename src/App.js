import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TeamDetails from './pages/TeamDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="home" style={{ textAlign: 'center', paddingTop: '3rem' }}>
      <h1>Welcome to TeamHub</h1>
      <img src="/teamhub_banner.png" alt="TeamHub Banner" className="home-banner" />
      <Link to="/signup" className="signup-link">Sign Up</Link>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/team/:id" element={<TeamDetails />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
