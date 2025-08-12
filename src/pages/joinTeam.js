import React, { useEffect, useState } from "react";
import "../App.css";
import teamApi from "../apis/services/teamApi";

const JoinTeam = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const handleJoin = (teamName) => {
    alert(`Join request sent to ${teamName}`);
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const { data } = await teamApi.listTeams();
        const mapped = (data.teams || []).map((t) => ({
          id: t._id,
          name: t.name,
          description: t.description,
          skills: t.skills || [],
          members: t.membersCount ?? 0,
          maxMembers: t.maxMembers,
          status: (t.membersCount ?? 0) < t.maxMembers ? "Open" : "Full",
        }));
        setTeams(mapped);
      } catch (err) {
        const message = err?.response?.data?.message || "Failed to load teams";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, []);

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
        {loading && <p>Loading teams...</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && filteredTeams.length > 0 ? (
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
