import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './Events.css';

const Events = () => {
  const navigate = useNavigate();

  const handleJoinEvent = () => {
    navigate('/join-event');
  };

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  return (
    <div className="events-page">
     
      <div className="events-container">
        <div className="events-header">
          <h1>Events</h1>
          <p className="events-subtitle">Discover and create amazing events with your team</p>
        </div>

        <div className="events-info">
          <div className="info-section">
            <h2>What are Events?</h2>
            <p>
              Events are organized activities that bring teams together for various purposes - 
              from team building and training sessions to project milestones and social gatherings.
            </p>
          </div>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🤝</div>
              <h3>Team Building</h3>
              <p>Strengthen relationships and improve collaboration among team members</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">📚</div>
              <h3>Learning & Development</h3>
              <p>Organize workshops, training sessions, and knowledge sharing events</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">🌟</div>
              <h3>Networking</h3>
              <p>Connect with other teams and expand your professional network</p>
            </div>
          </div>
        </div>

        <div className="events-actions">
          <h2>Get Started</h2>
          <p>Choose how you'd like to participate in events</p>
          
          <div className="action-cards">
            <div className="action-card">
              <div className="card-icon">🔍</div>
              <h3>Join an Event</h3>
              <p>
                Browse and join exciting events created by other teams. 
                Find events that match your interests and schedule.
              </p>
              <ul className="feature-list">
                <li>Browse upcoming events</li>
                <li>Filter by category and date</li>
                <li>RSVP and manage attendance</li>
                <li>Connect with other participants</li>
              </ul>
              <button 
                className="action-button join-button"
                onClick={handleJoinEvent}
              >
                Join an Event
              </button>
            </div>

            <div className="action-card">
              <div className="card-icon">➕</div>
              <h3>Create an Event</h3>
              <p>
                Organize your own event and invite team members or the entire community. 
                Make it memorable and engaging.
              </p>
              <ul className="feature-list">
                <li>Set event details and schedule</li>
                <li>Invite specific teams or make it public</li>
                <li>Manage registrations and attendees</li>
                <li>Track event success and feedback</li>
              </ul>
              <button 
                className="action-button create-button"
                onClick={handleCreateEvent}
              >
                Create an Event
              </button>
            </div>
          </div>
        </div>

        <div className="events-stats">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Events Created</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">200+</div>
            <div className="stat-label">Participants</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5+</div>
            <div className="stat-label">Active Teams</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Events;