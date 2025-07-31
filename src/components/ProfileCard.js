import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ profile, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(profile)}>
      <img src={profile.image} alt={profile.name} className="profile-img" />
      <h3>{profile.name}</h3>
    </div>
  );
};

export default ProfileCard;
