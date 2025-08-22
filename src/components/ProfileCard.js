import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ profile, onClick }) => {
  
  return (
    <div className="card" onClick={() => onClick(profile)}>
      <img 
        src={profile.profilePicture} 
        alt={profile.username} 
        className="profile-img" 
      />
      <h3>{profile.username}</h3>
      <p>{profile.email}</p>

      {/* Show admin badge if user is the team creator */}
      {profile.isAdmin && (
        <span className="admin-badge">Admin</span>
      )}
    </div>
  );
};

export default ProfileCard;
