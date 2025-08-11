import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function CreateTeam() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teamName: "",
    teamAim: "",
    description: "",
    maxMembers: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Function to generate random teamId (UUID-like)
  const generateTeamId = () => {
    return "team_" + Math.random().toString(36).substr(2, 9);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.teamName.trim() || !formData.teamAim.trim()) {
      setError("Please fill in all required fields");
      setSuccess("");
      return;
    }

    if (formData.maxMembers && formData.maxMembers < 2) {
      setError("Max members must be at least 2");
      setSuccess("");
      return;
    }

    setError("");

    // Generate hidden teamId
    const teamId = generateTeamId();

    // Final team data including hidden ID
    const finalTeamData = {
      ...formData,
      teamId, // Hidden from UI, but can be sent to backend
    };

    // Simulate API call
    console.log("Team Created:", finalTeamData);

    setSuccess(`Team "${formData.teamName}" created successfully!`);

    // Simulate redirect after success
    setTimeout(() => {
      navigate("/home"); // Later: navigate(`/team/${teamId}`)
    }, 1500);
  };

  return (
    <div className="App">
      <h2 className="welcome-text-signup">Create your own Team!</h2>

      <div className="signup-box">
        <form className="add-profile-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="teamName"
            placeholder="Team Name"
            value={formData.teamName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="teamAim"
            placeholder="Team Aim"
            value={formData.teamAim}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Team Description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <input
            type="number"
            name="maxMembers"
            placeholder="Max Members"
            value={formData.maxMembers}
            onChange={handleChange}
            min="2"
          />

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <button type="submit" className="login-button">Create Team</button>
        </form>
      </div>
    </div>
  );
}

export default CreateTeam;
