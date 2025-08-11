import React, { useState } from "react";
import "../App.css";

function ProfilePage() {
  const [profile, setProfile] = useState({
    username: "john_doe", // fetched from backend ideally
    age: "",
    gender: "",
    role: "",
    roleDescription: "",
    experience: "",
    location: "",
    profilePicture: null,
  });

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // TODO: Implement backend upload logic here
      // Example: send 'file' to backend using FormData and axios
      setProfile({ ...profile, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated profile:", profile);
    setMessage("Profile updated successfully!");
    setTimeout(() => setMessage(""), 3000);
    // Send `profile` data to backend API
  };

  const toggleUsernameEdit = () => {
    if (isEditingUsername) {
      console.log("New username:", profile.username);
    }
    setIsEditingUsername(!isEditingUsername);
  };

  // Default avatars based on gender
  const defaultMaleAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
  const defaultFemaleAvatar = "https://cdn-icons-png.flaticon.com/512/3135/3135789.png";
  const defaultNeutralAvatar = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  const getDefaultAvatar = () => {
    if (profile.gender === "male") return defaultMaleAvatar;
    if (profile.gender === "female") return defaultFemaleAvatar;
    return defaultNeutralAvatar;
  };

  return (
    <div className="App">
      <h2 className="welcome-text-signup">My Profile</h2>

      <div className="signup-box">
        <form className="add-profile-form" onSubmit={handleUpdate}>
          {/* Profile Picture */}
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <img
              src={profile.profilePicture || getDefaultAvatar()}
              alt="Profile"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ccc",
              }}
            />
            <div style={{ marginTop: "8px" }}>
              <label htmlFor="profilePicInput" style={{ fontSize: "14px", cursor: "pointer", color: "#1976d2", textDecoration: "underline" }}>
                Choose a photo
              </label>
              <input
                id="profilePicInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>

          {/* Username */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {isEditingUsername ? (
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                required
              />
            ) : (
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>
                {profile.username}
              </p>
            )}
            <button
              type="button"
              style={{
                padding: "4px 8px",
                fontSize: "14px",
                minWidth: "1px",
              }}
              className="login-button"
              onClick={toggleUsernameEdit}
            >
              {isEditingUsername ? "Done" : "Edit"}
            </button>
          </div>

          {/* Profile Details */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={profile.age}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={profile.role}
            onChange={handleChange}
          />

          <textarea
            name="roleDescription"
            placeholder="Role Description"
            value={profile.roleDescription}
            onChange={handleChange}
          ></textarea>

          <input
            type="number"
            name="experience"
            placeholder="Experience (in years)"
            value={profile.experience}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={profile.location}
            onChange={handleChange}
          />

          {message && <p className="success-message">{message}</p>}

          <button type="submit" className="login-button">
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
