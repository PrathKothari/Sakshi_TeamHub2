import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard';
import Modal from '../components/Modal';

const TeamDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { team } = location.state || {};
  const [selectedProfile, setSelectedProfile] = useState(null);

  if (!team) {
    return (
      <div className="home">
        <h1>Team Not Found</h1>
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Teams
        </button>
      </div>
    );
  }

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
  };

  const handleCloseProfileModal = () => {
    setSelectedProfile(null);
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="home">
      <div className="team-details-header">
        <button className="back-button" onClick={handleBackClick}>
          ← Back to Teams
        </button>
        <div className="team-info">
          <h1>{team.name}</h1>
          <p className="team-details-description">{team.description}</p>
          <div className="team-stats">
            <span className="member-count-large">{team.members.length} Team Members</span>
          </div>
        </div>
      </div>

      <div className="team-members-section">
        <div className="team-members-grid">
          {team.members.map((member, index) => (
            <ProfileCard 
              key={index} 
              profile={member} 
              onClick={handleProfileClick}
            />
          ))}
        </div>
      </div>

      {/* Profile Modal - Shows individual member details when profile card is clicked */}
      {selectedProfile && (
        <Modal profile={selectedProfile} onClose={handleCloseProfileModal} />
      )}
    </div>
  );
};

export default TeamDetails;
