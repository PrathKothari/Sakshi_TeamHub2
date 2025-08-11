import React, { useState } from "react";
import "../App.css";

const JoinTeam = () => {
  const [teams] = useState([
    {
      id: 1,
      name: "Team Phoenix",
      description: "Building an AI-powered analytics dashboard.",
      skills: ["React", "Python", "Azure"],
      members: 3,
      maxMembers: 5,
      status: "Open"
    },
    {
      id: 2,
      name: "Data Wizards",
      description: "Data visualization and storytelling project.",
      skills: ["Power BI", "SQL", "Python"],
      members: 5,
      maxMembers: 5,
      status: "Full"
    },
    {
      id: 3,
      name: "Code Ninjas",
      description: "Mobile app development challenge.",
      skills: ["Flutter", "Firebase"],
      members: 2,
      maxMembers: 4,
      status: "Open"
    }
  ]);

  const [search, setSearch] = useState("");

  const handleJoin = (teamName) => {
    alert(`Join request sent to ${teamName}`);
  };

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="join-team-page">
      {/* Hero Section */}
      <div className="join-hero">
        <h1>Find Your Perfect Team</h1>
        <p>Collaborate, innovate, and achieve greatness together.</p>
        <input
          type="text"
          placeholder="🔍 Search teams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Team Cards */}
      <div className="team-list">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <div key={team.id} className="team-card">
              <h2>{team.name}</h2>
              <p className="team-description">{team.description}</p>
              <div className="skills">
                {team.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="members">
                {team.members} / {team.maxMembers} members
              </p>
              <span
                className={`status-badge ${
                  team.status === "Open" ? "open" : "full"
                }`}
              >
                {team.status}
              </span>
              <button
                className="join-btn"
                disabled={team.status !== "Open"}
                onClick={() => handleJoin(team.name)}
              >
                {team.status === "Open" ? "Join Now" : "Full"}
              </button>
            </div>
          ))
        ) : (
          <p className="no-teams">No teams match your search.</p>
        )}
      </div>
    </div>
  );
};

export default JoinTeam;
