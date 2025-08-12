import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import teamApi from '../apis/services/teamApi';
import JoinRequestsManager from '../components/JoinRequestsManager';
import '../App.css';

const MyTeams = () => {
  const navigate = useNavigate();
  const [myTeams, setMyTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    fetchMyTeams();
  }, []);

  const fetchMyTeams = async () => {
    try {
      setLoading(true);
      const { data } = await teamApi.listTeams();
      // Filter teams where current user is the creator
      const userTeams = (data.teams || []).filter(team => 
        team.createdBy && team.createdBy._id === localStorage.getItem('userId')
      );
      setMyTeams(userTeams);
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to load your teams";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const handleBackToList = () => {
    setSelectedTeam(null);
  };

  const handleRequestUpdate = () => {
    // Refresh teams list when join requests are updated
    fetchMyTeams();
  };

  if (loading) {
    return <div className="my-teams-loading">Loading your teams...</div>;
  }

  if (error) {
    return <div className="my-teams-error">Error: {error}</div>;
  }

  if (selectedTeam) {
    return (
      <div className="my-teams-page">
        <div className="team-details-header">
          <button className="back-button" onClick={handleBackToList}>
            ← Back to My Teams
          </button>
          <div className="team-info">
            <h1>{selectedTeam.name}</h1>
            <p className="team-details-description">{selectedTeam.description}</p>
            <div className="team-stats">
              <span className="member-count-large">
                {selectedTeam.membersCount} / {selectedTeam.maxMembers} members
              </span>
            </div>
          </div>
        </div>

        <div className="team-management-section">
          <JoinRequestsManager 
            teamId={selectedTeam._id} 
            onRequestUpdate={handleRequestUpdate}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="my-teams-page">
      <div className="my-teams-header">
        <h1>My Teams</h1>
        <p>Manage your teams and review join requests</p>
      </div>

      {myTeams.length === 0 ? (
        <div className="no-teams-message">
          <p>You haven't created any teams yet.</p>
          <button 
            className="create-team-btn"
            onClick={() => navigate('/create-team')}
          >
            Create Your First Team
          </button>
        </div>
      ) : (
        <div className="my-teams-list">
          {myTeams.map((team) => (
            <div key={team._id} className="my-team-card">
              <div className="team-header">
                <h3>{team.name}</h3>
                <span className={`status-badge ${team.isFull ? 'full' : 'open'}`}>
                  {team.isFull ? 'Full' : 'Open'}
                </span>
              </div>
              
              <p className="team-description">{team.description}</p>
              
              <div className="team-stats">
                <span className="member-count">
                  {team.membersCount} / {team.maxMembers} members
                </span>
                <span className="created-date">
                  Created: {new Date(team.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="team-actions">
                <button
                  className="manage-team-btn"
                  onClick={() => handleTeamSelect(team)}
                >
                  Manage Team
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTeams;
