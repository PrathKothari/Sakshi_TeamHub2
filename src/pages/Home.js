import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import teamApi from '../apis/services/teamApi';

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [events, setEvents] = useState([]);
  const [teamsLoading, setTeamsLoading] = useState(true);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [teamsError, setTeamsError] = useState('');
  const [eventsError, setEventsError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      setTeamsLoading(true);
      setTeamsError('');
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
        setTeamsError('Failed to load teams. Please try again later.');
        setTeams([]); // Set empty array on error
      } finally {
        setTeamsLoading(false);
      }
    };

    const fetchEvents = async () => {
      setEventsLoading(true);
      setEventsError('');
      try {
        // TODO: Replace with actual API call when backend is ready
        const response = await fetch('/api/events');
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        console.log('Events fetched:', data);
        
        // Transform the data to match the expected format
        const transformedEvents = (data.events || []).map(event => ({
          id: event._id,
          name: event.eventName,
          description: event.description,
          category: event.category,
          mode: event.mode,
          venue: event.venue,
          platform: event.platform,
          eventStart: event.eventStart,
          eventEnd: event.eventEnd,
          registrationStart: event.registrationStart,
          registrationEnd: event.registrationEnd,
          registrationFee: event.registrationFee,
          maxParticipants: event.maxParticipants,
          createdBy: event.createdBy,
          createdAt: event.createdAt,
          tags: event.tags || []
        }));
        
        // Show only upcoming events (limit to 6 for homepage)
        const upcomingEvents = transformedEvents
          .filter(event => new Date(event.eventStart) > new Date())
          .slice(0, 6);
        
        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEventsError('Failed to load events. Please try again later.');
        setEvents([]); // Set empty array on error
      } finally {
        setEventsLoading(false);
      }
    };

    fetchTeams();
    fetchEvents();
  }, []);

  const handleTeamClick = (team) => {
    navigate(`/team/${team.id}`, { state: { team } });
  };

  const handleEventClick = (event) => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  const handleJoinTeam = () => {
    navigate('/join-team');
  };

  const handleCreateTeam = () => {
    navigate('/create-team');
  };

  const handleExploreEvents = () => {
    navigate('/events');
  };

  const handleJoinEvent = () => {
    navigate('/join-event');
  };

  const handleCreateEvent = () => {
    navigate('/create-event');
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
                Connect, Collaborate, and Create Amazing Projects & Events Together
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
                  <button className="hero-btn tertiary" onClick={handleExploreEvents}>
                    Explore Events
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
                TeamHub is a comprehensive collaborative platform designed to bring people together to work on exciting projects and participate in engaging events. 
                Whether you're a developer, designer, or have any other skill, TeamHub helps you find the perfect 
                team and discover amazing events to enhance your learning and networking experience.
              </p>
              <div className="features-grid">
                <div className="feature-item">
                  <div className="feature-icon">🤝</div>
                  <h3>Collaborate</h3>
                  <p>Work together with talented individuals from diverse backgrounds</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🎯</div>
                  <h3>Join Events</h3>
                  <p>Participate in hackathons, workshops, competitions and more</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">📅</div>
                  <h3>Host Events</h3>
                  <p>Organize and manage your own events to bring the community together</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Cards Section */}
      <section className="features-showcase">
        <div className="container">
          <h2 className="section-title">Get Started</h2>
          <p className="section-subtitle">
            Choose how you'd like to participate in the community
          </p>
          
          {/* Action Cards */}
          <div className="features-cards">
            <div className="feature-card teams-card">
              <div className="feature-card-icon">👥</div>
              <h3>Teams</h3>
              <p>Create or join teams to work on collaborative projects. Share ideas, build together, and achieve your goals as a team.</p>
              <div className="feature-highlights">
                <span>• Project Collaboration</span>
                <span>• Skill Matching</span>
                <span>• Team Management</span>
              </div>
              {isLoggedIn && (
                <div className="feature-actions">
                  <button className="feature-btn primary" onClick={handleJoinTeam}>
                    Join Team
                  </button>
                  <button className="feature-btn secondary" onClick={handleCreateTeam}>
                    Create Team
                  </button>
                </div>
              )}
            </div>

            <div className="feature-card events-card">
              <div className="feature-card-icon">🎯</div>
              <h3>Events</h3>
              <p>Discover exciting events like hackathons, workshops, and competitions. Or organize your own events to engage the community.</p>
              <div className="feature-highlights">
                <span>• Hackathons & Competitions</span>
                <span>• Workshops & Webinars</span>
                <span>• Networking Events</span>
              </div>
              {isLoggedIn && (
                <div className="feature-actions">
                  <button className="feature-btn primary" onClick={handleJoinEvent}>
                    Join Event
                  </button>
                  <button className="feature-btn secondary" onClick={handleCreateEvent}>
                    Create Event
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Explore Events */}
      <section className="events-showcase">
        <div className="container">
          <h2 className="section-title">Explore Events</h2>
          <p className="section-subtitle">
            Discover upcoming events and connect with the community
          </p>
          
          {eventsLoading ? (
            <div className="loading-events">
              <div className="loading-spinner"></div>
              <p>Loading exciting events...</p>
            </div>
          ) : eventsError ? (
            <div className="error-events">
              <p>{eventsError}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="no-events">
              <div className="no-events-content">
                <div className="no-events-icon">📅</div>
                <h3>No Events Available</h3>
                <p>Be the first to create an exciting event for the community!</p>
                {isLoggedIn && (
                  <button className="create-event-btn" onClick={handleCreateEvent}>
                    Create First Event
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="events-grid">
              {events.map((event) => (
                <div key={event.id} className="event-showcase-card" onClick={() => handleEventClick(event)}>
                  <div className="event-card-header">
                    <div className="event-category">
                      <span className={`category-badge ${event.category}`}>
                        {event.category}
                      </span>
                    </div>
                    <h3>{event.name}</h3>
                    <div className="event-meta">
                      <span className="event-date">
                        📅 {new Date(event.eventStart).toLocaleDateString()}
                      </span>
                      <span className="event-mode">
                        {event.mode === 'online' ? '💻' : event.mode === 'offline' ? '📍' : '🔄'} {event.mode}
                      </span>
                    </div>
                  </div>
                  
                  <p className="event-description">
                    {event.description.length > 100 
                      ? `${event.description.substring(0, 100)}...` 
                      : event.description
                    }
                  </p>
                  
                  <div className="event-details">
                    {event.mode !== 'online' && event.venue && (
                      <span className="event-venue">📍 {event.venue}</span>
                    )}
                    {event.mode !== 'offline' && event.platform && (
                      <span className="event-platform">💻 {event.platform}</span>
                    )}
                    {event.registrationFee > 0 && (
                      <span className="event-fee">💰 ₹{event.registrationFee}</span>
                    )}
                    {event.registrationFee === 0 && (
                      <span className="event-free">🆓 Free</span>
                    )}
                  </div>
                  
                  {event.tags && event.tags.length > 0 && (
                    <div className="event-tags">
                      {event.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="event-tag">
                          {tag}
                        </span>
                      ))}
                      {event.tags.length > 3 && (
                        <span className="event-tag-more">+{event.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                  
                  <div className="event-card-footer">
                    <span className="view-event">View Event →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {events.length > 0 && (
            <div className="view-all-events">
              <button className="view-all-btn" onClick={handleExploreEvents}>
                View All Events
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Teams Section */}
      <section className="teams-showcase">
        <div className="container">
          <h2 className="section-title">Explore Our Teams</h2>
          <p className="section-subtitle">
            Join one of our active teams or get inspired to create your own
          </p>
          
          {teamsLoading ? (
            <div className="loading-teams">
              <div className="loading-spinner"></div>
              <p>Loading amazing teams...</p>
            </div>
          ) : teamsError ? (
            <div className="error-teams">
              <p>{teamsError}</p>
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
