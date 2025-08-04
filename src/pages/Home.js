import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
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
    },
  ];
  useEffect(() => {
    // Simulate API call to fetch teams from database
    const fetchTeams = () => {
      setLoading(true);
      setTimeout(() => {
        setTeams(mockTeams);
        setLoading(false);
      }, 1000); // Simulate loading time
    };

    fetchTeams();
  }, []);

  const handleTeamClick = (team) => {
    navigate(`/team/${team.id}`, { state: { team } });
  };

  return (
    <div className="home">
      <h1>TeamHub</h1>

      {loading ? (
        <div className="loading">Loading teams...</div>
      ) : (
        <>
          {/* Teams Display */}
          <div className="teams-section">
            <h2>Our Teams</h2>
            <div className="teams-container">
              {teams.map((team) => (
                <div key={team.id} className="team-card" onClick={() => handleTeamClick(team)}>
                  <div className="team-card-header">
                    <h3>{team.name}</h3>
                    <span className="member-count">{team.members.length} members</span>
                  </div>
                  <p className="team-description">{team.description}</p>
                  <div className="team-preview">
                    {team.members.slice(0, 3).map((member, index) => (
                      <img
                        key={index}
                        src={member.image}
                        alt={member.name}
                        className="member-preview-img"
                        title={member.name}
                      />
                    ))}
                    {team.members.length > 3 && (
                      <div className="more-members">+{team.members.length - 3}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
