import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './Events.css';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/events');
      if (!response.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinEvent = (eventId) => {
    // Navigate to join event page with event ID
    navigate(`/join-event/${eventId}`);
  };

  const handleViewEvent = (eventId) => {
    // Navigate to event details page
    navigate(`/events/${eventId}`);
  };

  const handleCreateEvent = () => {
    navigate('/create-event');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isEventFull = (event) => {
    return event.attendees?.length >= event.maxCapacity;
  };

  const isEventExpired = (event) => {
    return new Date(event.date) < new Date();
  };

  if (loading) {
    return (
      <div className="events-page">
        <div className="events-container">
          <div className="loading">Loading events...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="events-page">
        <div className="events-container">
          <div className="error">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="events-page">
      <div className="events-container">
        <div className="events-header">
          <h1>Events</h1>
          <p className="events-subtitle">Discover and join amazing events</p>
          <button 
            className="create-event-btn"
            onClick={handleCreateEvent}
          >
            Create New Event
          </button>
        </div>

        {events.length === 0 ? (
          <div className="no-events">
            <h2>No Events Found</h2>
            <p>Be the first to create an event!</p>
            <button 
              className="action-button"
              onClick={handleCreateEvent}
            >
              Create an Event
            </button>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event._id} className="event-card">
                <div className="event-header">
                  <h3>{event.title}</h3>
                  <span className={`event-status ${event.status}`}>
                    {event.status}
                  </span>
                </div>
                
                <div className="event-details">
                  <p className="event-description">{event.description}</p>
                  
                  <div className="event-meta">
                    <div className="meta-item">
                      <strong>📅 Date:</strong> {formatDate(event.date)}
                    </div>
                    <div className="meta-item">
                      <strong>📍 Location:</strong> {event.location}
                    </div>
                    <div className="meta-item">
                      <strong>👥 Capacity:</strong> {event.attendees?.length || 0}/{event.maxCapacity}
                    </div>
                    <div className="meta-item">
                      <strong>🏷️ Category:</strong> {event.category}
                    </div>
                    {event.organizer && (
                      <div className="meta-item">
                        <strong>👤 Organizer:</strong> {event.organizer.name}
                      </div>
                    )}
                  </div>
                </div>

                <div className="event-actions">
                  <button 
                    className="view-btn"
                    onClick={() => handleViewEvent(event._id)}
                  >
                    View Details
                  </button>
                  
                  <button 
                    className={`join-btn ${isEventFull(event) ? 'full' : ''} ${isEventExpired(event) ? 'expired' : ''}`}
                    onClick={() => handleJoinEvent(event._id)}
                    disabled={isEventFull(event) || isEventExpired(event)}
                  >
                    {isEventExpired(event) 
                      ? 'Event Ended' 
                      : isEventFull(event) 
                        ? 'Event Full' 
                        : 'Join Event'
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Events;