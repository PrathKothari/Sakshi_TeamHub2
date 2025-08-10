import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import Modal from '../components/Modal';

const TeamDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { team } = location.state || {};
  const [selectedProfile, setSelectedProfile] = useState(null);
  
  // Simple state to simulate login status (you can toggle this for testing)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Debug logging
  console.log('TeamDetails rendered, isLoggedIn:', isLoggedIn);
  console.log('Team data:', team);

  // Use the passed team data or show a generic page
  const currentTeam = team;

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseProfileModal = () => {
    setSelectedProfile(null);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  // Toggle function for testing purposes
  const toggleLoginStatus = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleJoinTeam = () => {
    // Implement join team logic here
    alert('Join team functionality to be implemented');
  };

  const handleCreateTeam = () => {
    // Implement create team logic here
    alert('Create team functionality to be implemented');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div className="home">
      <div className="team-details-header">
        <button className="back-button" onClick={handleBackClick}>
          ← Back to Teams
        </button>
        <div className="team-info">
          <h1>{currentTeam ? currentTeam.name : "Team Details"}</h1>
          <p className="team-details-description">
            {currentTeam ? currentTeam.description : "Manage your team access and membership"}
          </p>
          {currentTeam && (
            <div className="team-stats">
              <span className="member-count-large">{currentTeam.members.length} Team Members</span>
            </div>
          )}
        </div>
        {/* Testing toggle button - remove this in production */}
        <button className="toggle-login-button" onClick={toggleLoginStatus}>
          {isLoggedIn ? 'Simulate Logout' : 'Simulate Login'}
        </button>
      </div>

      {/* Conditional rendering based on authentication status */}
      {isLoggedIn ? (
        <div className="team-actions-section">
          <div className="team-actions-container">
            <h3 className="team-actions-title">What would you like to do?</h3>
            <div className="team-actions-buttons">
              <button className="team-action-button join-button" onClick={handleJoinTeam}>
                Join A Team
              </button>
              <button className="team-action-button create-button" onClick={handleCreateTeam}>
                Create Your Team
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="auth-required-section">
          <div className="auth-required-container">
            <h3 className="auth-required-title">Authentication Required</h3>
            <p className="auth-required-message">
              You must be logged in to access the team details
            </p>
            <div className="auth-required-buttons">
              <button className="auth-button login-button" onClick={handleLoginClick}>
                Login
              </button>
              <button className="auth-button signup-button" onClick={handleSignupClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Only show team members if user is logged in and team data exists */}
      {isLoggedIn && currentTeam && (
        <div className="team-members-section">
          <div className="team-members-grid">
            {currentTeam.members.map((member, index) => (
              <ProfileCard 
                key={index} 
                profile={member} 
                onClick={handleProfileClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* Profile Modal - Shows individual member details when profile card is clicked */}
      {selectedProfile && (
        <Modal profile={selectedProfile} onClose={handleCloseProfileModal} />
      )}
    </div>
  );
};

export default TeamDetails;
