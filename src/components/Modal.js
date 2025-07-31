import React from 'react';
import './Modal.css';

const Modal = ({ profile, onClose }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h2>{profile.name}</h2>
        <img src={profile.image} alt={profile.name} className="profile-img" />
        <p><strong>Role:</strong> {profile.role}</p>
        <p>{profile.bio}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
