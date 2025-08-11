import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import userApi from '../apis/services/userApi';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await userApi.getUserProfile(); // Will work if cookie/session exists
        if (res && res.data) {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false); // Not logged in
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <nav className="navbar">
      <h2 className="logo">TeamHub</h2>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/team/1">Team Details</Link></li>

        {/* Show logout if logged in */}
        {isLoggedIn
          ? <button onClick={async () => {
              await userApi.signOutUser();
              setIsLoggedIn(false);
            }}>Logout</button>
          : <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
        }
      </ul>
    </nav>
  );
};

export default Navbar;
