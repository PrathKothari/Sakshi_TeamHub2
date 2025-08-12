import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import userApi from '../apis/services/userApi';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await userApi.getUserProfile();
        
        if (res && res.data) {
          setIsLoggedIn(true);
          setUserProfile(res.data);
        }
      } catch (err) {
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    };

    checkLoginStatus();
  }, [setIsLoggedIn]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await userApi.signOutUser();
      setIsLoggedIn(false);
      setUserProfile(null);
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleProfileClick = () => {
    setShowDropdown(false);
    navigate('/updateprofile');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">TeamHub</Link>
      </div>
      
      <ul className="nav-links">
        {isLoggedIn && (
          <>
            <li><Link to="/join-team">Join a Team</Link></li>
            <li><Link to="/create-team">Create Your Team</Link></li>
            <li><Link to="/my-teams">My Teams</Link></li>
          </>
        )}

        {/* Authentication Section */}
        {isLoggedIn ? (
          <li className="profile-section" ref={dropdownRef}>
            <button 
              className="profile-button"
              onClick={() => setShowDropdown(!showDropdown)}
              aria-label="User profile menu"
            >
              <div className="profile-avatar">
                {userProfile?.profilePicture ? (
                  <img 
                    src={userProfile.profilePicture} 
                    alt="Profile" 
                    className="avatar-img"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
              <span className="dropdown-arrow">▼</span>
            </button>
            
            {showDropdown && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <p className="user-name">{userProfile?.name || 'User'}</p>
                  <p className="user-email">{userProfile?.email || ''}</p>
                </div>
                <hr className="dropdown-divider" />
                <button 
                  className="dropdown-item"
                  onClick={handleProfileClick}
                >
                  <span className="dropdown-icon">👤</span>
                  Profile Settings
                </button>
                <button 
                  className="dropdown-item logout-item"
                  onClick={handleLogout}
                >
                  <span className="dropdown-icon">🚪</span>
                  Logout
                </button>
              </div>
            )}
          </li>
        ) : (
          <>
            <li><Link to="/login" className="nav-button login-btn">Login</Link></li>
            <li><Link to="/signup" className="nav-button signup-btn">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
