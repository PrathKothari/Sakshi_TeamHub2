import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // ✅ include Link if used
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TeamDetails from './pages/TeamDetails';
import Login from './pages/Login';
import './App.css';
import Signup from './pages/Signup'; // ✅ Import Signup


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
        <Navbar />  {/* ✅ Navbar is outside Routes so it shows on all pages */}
        <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/home" element={<Home />} />
  <Route path="/team/:id" element={<TeamDetails />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />  {/* ✅ Add Signup route */}
</Routes>
      </Router>
    </div>
  );
}

export default App;

