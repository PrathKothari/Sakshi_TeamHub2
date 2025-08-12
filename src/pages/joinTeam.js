import React, { useEffect, useState } from "react";
import "../App.css";
import teamApi from "../apis/services/teamApi";

const JoinTeam = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [joinMessage, setJoinMessage] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showJoinModal, setShowJoinModal] = useState(false);

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
          createdBy: t.createdBy,
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

  const handleJoin = (team) => {
    setSelectedTeam(team);
    setShowJoinModal(true);
  };

  const handleJoinSubmit = async () => {
    try {
      if (!joinMessage.trim()) {
        setError("Please enter a message for your join request");
        return;
      }

      await teamApi.createJoinRequest({
        teamId: selectedTeam.id,
        message: joinMessage.trim(),
      });

      setSuccess(`Join request sent to ${selectedTeam.name}!`);
      setShowJoinModal(false);
      setJoinMessage("");
      setSelectedTeam(null);
      
      // Refresh teams list
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to send join request";
      setError(message);
    }
  };

  const handleCloseModal = () => {
    setShowJoinModal(false);
    setJoinMessage("");
    setSelectedTeam(null);
    setError("");
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
        {loading && <p>Loading teams...</p>}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
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
              <p className="created-by">Created by: {team.createdBy?.username || 'Unknown'}</p>
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
                onClick={() => handleJoin(team)}
              >
                {team.status === "Open" ? "Join Now" : "Full"}
              </button>
            </div>
          ))
        ) : (
          <p className="no-teams">No teams match your search.</p>
        )}
      </div>

      {/* Join Request Modal */}
      {showJoinModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Request to Join {selectedTeam?.name}</h3>
            <p>Tell the team creator why you want to join:</p>
            <textarea
              value={joinMessage}
              onChange={(e) => setJoinMessage(e.target.value)}
              placeholder="I want to join because..."
              rows="4"
              className="join-message-input"
            />
            {error && <p className="error-message">{error}</p>}
            <div className="modal-actions">
              <button onClick={handleCloseModal} className="cancel-btn">
                Cancel
              </button>
              <button onClick={handleJoinSubmit} className="submit-btn">
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinTeam;
