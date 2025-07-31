import React, { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import Modal from '../components/Modal';
import profilesData from '../data/profiles';

const Home = () => {
  const [profiles, setProfiles] = useState(profilesData);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [newProfile, setNewProfile] = useState({
    name: '',
    image: '',
    role: '',
    bio: '',
  });

  const handleAddProfile = (e) => {
    e.preventDefault();
    if (newProfile.name && newProfile.image) {
      setProfiles([...profiles, newProfile]);
      setNewProfile({ name: '', image: '', role: '', bio: '' });
    }
  };

  return (
    <div className="home">
      <h1>TeamHub</h1>

      {/* 🔹 Add Profile Form */}
      <form onSubmit={handleAddProfile} className="add-profile-form">
        <input
          type="text"
          placeholder="Name"
          value={newProfile.name}
          onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProfile.image}
          onChange={(e) => setNewProfile({ ...newProfile, image: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newProfile.role}
          onChange={(e) => setNewProfile({ ...newProfile, role: e.target.value })}
        />
        <textarea
          placeholder="Bio"
          value={newProfile.bio}
          onChange={(e) => setNewProfile({ ...newProfile, bio: e.target.value })}
        />
        <button type="submit">Add Profile</button>
      </form>

      {/* 🔹 Profile Cards */}
      <div className="card-container">
        {profiles.map((p, index) => (
          <ProfileCard key={index} profile={p} onClick={setSelectedProfile} />
        ))}
      </div>

      {/* 🔹 Modal */}
      {selectedProfile && (
        <Modal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      )}
    </div>
  );
};

export default Home;
