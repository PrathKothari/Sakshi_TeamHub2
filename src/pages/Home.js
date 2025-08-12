import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import userApi from '../apis/services/userApi';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock teams data 
  const mockTeams = [
    {
      id: 1,
      name: "Frontend Development Team",
      description: "Responsible for creating stunning user interfaces and user experiences using React, Vue, and modern CSS frameworks.",
      members: [
        {
          name: "Sharadhi",
          image: "/assets/sakshi.jpg",
          role: "Senior Frontend Developer",
          bio: "Passionate about UI/UX and React. Loves creating intuitive user experiences."
        },
        {
          name: "Pratham",
          image: "/assets/sakshi.jpg",
          role: "Frontend Developer",
          bio: "Specializes in Vue.js and modern CSS. Enjoys building responsive web applications."
        },
        {
          name: "Monisha",
          image: "/assets/sakshi.jpg",
          role: "Frontend Developer",
          bio: "Specializes in Vue.js and modern CSS. Enjoys building responsive web applications."
        }
      ]
    },
    {
      id: 2,
      name: "Backend Development Team",
      description: "Building robust server-side applications and APIs using Node.js, Python, and cloud technologies.",
      members: [
        {
          name: "Sakshi",
          image: "/assets/sakshi.jpg",
          role: "Lead Backend Developer",
          bio: "Expert in Node.js and microservices architecture. Passionate about scalable systems."
        },
        {
          name: "Shivkumar",
          image: "/assets/sakshi.jpg",
          role: "DevOps Engineer",
          bio: "Manages cloud infrastructure and CI/CD pipelines. AWS and Docker specialist."
        }
      ]
    }
  ];

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        // Try to fetch teams from backend first
        // const response = await teamsApi.getAllTeams();
        // setTeams(response.data);

        // For now, use mock data
        setTeams(mockTeams);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        // Fallback to mock data if API fails
        setTeams(mockTeams);
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
          ) : (
            <div className="teams-grid">
              {teams.map((team) => (
                <div key={team.id} className="team-showcase-card" onClick={() => handleTeamClick(team)}>
                  <div className="team-card-header">
                    <h3>{team.name}</h3>
                    <span className="member-count">{team.members.length} members</span>
                  </div>
                  <p className="team-description">{team.description}</p>
                  <div className="team-members-preview">
                    {team.members.slice(0, 3).map((member, index) => (
                      <img
                        key={index}
                        src={member.image}
                        alt={member.name}
                        className="member-avatar"
                        title={member.name}
                      />
                    ))}
                    {team.members.length > 3 && (
                      <div className="more-members">+{team.members.length - 3}</div>
                    )}
                  </div>
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
