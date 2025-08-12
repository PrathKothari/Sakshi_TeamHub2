import React, { useState, useEffect } from 'react';
import teamApi from '../apis/services/teamApi';
import './JoinRequestsManager.css';

const JoinRequestsManager = ({ teamId, onRequestUpdate }) => {
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJoinRequests();
  }, [teamId]);

  const fetchJoinRequests = async () => {
    try {
      setLoading(true);
      const { data } = await teamApi.getTeamJoinRequests(teamId);
      setJoinRequests(data.joinRequests || []);
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to load join requests";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRespondToRequest = async (requestId, action) => {
    try {
      await teamApi.respondToJoinRequest(requestId, action);
      
      // Update local state
      setJoinRequests(prev => 
        prev.map(req => 
          req._id === requestId 
            ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' }
            : req
        )
      );

      // Notify parent component
      if (onRequestUpdate) {
        onRequestUpdate();
      }

      // Show success message
      const actionText = action === 'approve' ? 'approved' : 'rejected';
      alert(`Join request ${actionText} successfully!`);
    } catch (err) {
      const message = err?.response?.data?.message || `Failed to ${action} request`;
      alert(message);
    }
  };

  if (loading) {
    return <div className="join-requests-loading">Loading join requests...</div>;
  }

  if (error) {
    return <div className="join-requests-error">Error: {error}</div>;
  }

  if (joinRequests.length === 0) {
    return <div className="no-join-requests">No pending join requests</div>;
  }

  return (
    <div className="join-requests-manager">
      <h3>Pending Join Requests ({joinRequests.length})</h3>
      <div className="join-requests-list">
        {joinRequests.map((request) => (
          <div key={request._id} className="join-request-card">
            <div className="request-user-info">
              <img 
                src={request.userId.profilePicture || 'https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg'} 
                alt="Profile" 
                className="user-avatar"
              />
              <div className="user-details">
                <h4>{request.userId.username}</h4>
                <p className="user-email">{request.userId.email}</p>
                {request.userId.role && <p className="user-role">Role: {request.userId.role}</p>}
                {request.userId.experience && <p className="user-experience">Experience: {request.userId.experience} years</p>}
                {request.userId.location && <p className="user-location">Location: {request.userId.location}</p>}
              </div>
            </div>
            
            {request.message && (
              <div className="request-message">
                <strong>Message:</strong> {request.message}
              </div>
            )}
            
            <div className="request-actions">
              <button
                className="approve-btn"
                onClick={() => handleRespondToRequest(request._id, 'approve')}
              >
                Approve
              </button>
              <button
                className="reject-btn"
                onClick={() => handleRespondToRequest(request._id, 'reject')}
              >
                Reject
              </button>
            </div>
            
            <div className="request-meta">
              <small>Requested: {new Date(request.requestedAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JoinRequestsManager;
