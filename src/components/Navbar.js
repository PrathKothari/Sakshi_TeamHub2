// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // optional styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">TeamHub</h2>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/team/1">Team Details</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>  {/* ✅ Link to Signup page */}
      </ul>
    </nav>
  );
};

export default Navbar;
