import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import teamApi from '../apis/services/teamApi';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch teams from backend
        const response = await teamApi.listTeams();
        console.log('Teams fetched:', response.data);
        
        // Transform the data to match the expected format
        const transformedTeams = (response.data.teams || []).map(team => ({
          id: team._id,
          name: team.name,
          description: team.description,
          members: team.members || [],
          membersCount: team.membersCount || team.members?.length || 0,
          maxMembers: team.maxMembers,
          createdBy: team.createdBy,
          createdAt: team.createdAt,
          isFull: team.isFull
        }));
        
        setTeams(transformedTeams);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError('Failed to load teams. Please try again later.');
        setTeams([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const handleTeamClick = (team) => {
    navigate(`/team/${team.id}`, { state: { team } });
  };

  const handleJoinTeam = () => {
    navigate('/join-team');
  };

  const handleCreateTeam = () => {
    navigate('/create-team');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-layout">
            <div className="hero-image">
              <img src="/teamhub_banner.png" alt="TeamHub Banner" className="hero-banner" />
            </div>
            <div className="hero-text">
              <h1 className="hero-title">Welcome to TeamHub</h1>
              <p className="hero-subtitle">
                Connect, Collaborate, and Create Amazing Projects Together
              </p>
              
              {/* Action Buttons */}
              {isLoggedIn ? (
                <div className="hero-actions">
                  <button className="hero-btn primary" onClick={handleJoinTeam}>
                    Join a Team
                  </button>
                  <button className="hero-btn secondary" onClick={handleCreateTeam}>
                    Create Your Team
                  </button>
                </div>
              ) : (
                <div className="hero-actions">
                  <Link to="/login" className="hero-btn primary">
                    Get Started
                  </Link>
                  <Link to="/signup" className="hero-btn secondary">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <h2 className="section-title">What is TeamHub?</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                TeamHub is a collaborative platform designed to bring people together to work on exciting projects. 
                Whether you're a developer, designer, or have any other skill, TeamHub helps you find the perfect 
                team to contribute to meaningful projects.
              </p>
              <div className="features-grid">
                <div className="feature-item">
                  <h3>Find Your Team</h3>
                  <p>Discover teams that match your skills and interests</p>
                </div>
                <div className="feature-item">
                  <h3>Start Projects</h3>
                  <p>Create your own team and lead innovative projects</p>
                </div>
                <div className="feature-item">
                  <h3>Collaborate</h3>
                  <p>Work together with talented individuals from diverse backgrounds</p>
                </div>
              
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section className="teams-showcase">
        <div className="container">
          <h2 className="section-title">Explore Our Teams</h2>
          <p className="section-subtitle">
            Join one of our active teams or get inspired to create your own
          </p>
          
          {loading ? (
            <div className="loading-teams">
              <div className="loading-spinner"></div>
              <p>Loading amazing teams...</p>
            </div>
          ) : error ? (
            <div className="error-teams">
              <p>{error}</p>
            </div>
          ) : teams.length === 0 ? (
            <div className="no-teams">
              <p>No teams available yet. Be the first to create one!</p>
              {isLoggedIn && (
                <button className="create-team-btn" onClick={handleCreateTeam}>
                  Create First Team
                </button>
              )}
            </div>
          ) : (
            <div className="teams-grid">
              {teams.map((team) => (
                <div key={team.id} className="team-showcase-card" onClick={() => handleTeamClick(team)}>
                  <div className="team-card-header">
                    <h3>{team.name}</h3>
                    <span className="member-count">
                      {team.membersCount}/{team.maxMembers} members
                    </span>
                    <span className={`status-badge ${team.isFull ? 'full' : 'open'}`}>
                      {team.isFull ? 'Full' : 'Open'}
                    </span>
                  </div>
                  <p className="team-description">{team.description}</p>
                  {team.createdBy && (
                    <p className="team-creator">
                      Created by: {team.createdBy.username || team.createdBy.email}
                    </p>
                  )}
                  <div className="team-card-footer">
                    <span className="view-team">View Team →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
