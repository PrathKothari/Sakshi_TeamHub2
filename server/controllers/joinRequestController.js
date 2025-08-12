import JoinRequest from '../models/joinRequestModel.js';
import Team from '../models/teamModel.js';
import User from '../models/userModel.js';

// Create a join request
export const createJoinRequest = async (req, res) => {
  try {
    const { teamId, message } = req.body;
    const userId = req.user._id;

    if (!teamId) {
      return res.status(400).json({ message: 'Team ID is required' });
    }

    // Check if team exists
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if team is full
    if (team.isFull) {
      return res.status(400).json({ message: 'Team is full' });
    }

    // Check if user is already a member
    if (team.members.includes(userId)) {
      return res.status(400).json({ message: 'You are already a member of this team' });
    }

    // Check if user already has a pending request
    const existingRequest = await JoinRequest.findOne({
      teamId,
      userId,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have a pending request for this team' });
    }

    // Create join request
    const joinRequest = await JoinRequest.create({
      teamId,
      userId,
      message: message || '',
    });

    // Populate user details for response
    await joinRequest.populate('userId', 'username email profilePicture role experience');

    return res.status(201).json({
      message: 'Join request sent successfully',
      joinRequest
    });
  } catch (error) {
    console.error('Create join request error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get join requests for a team (team creator only)
export const getTeamJoinRequests = async (req, res) => {
  try {
    const { teamId } = req.params;
    const userId = req.user._id;

    // Check if team exists
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if user is the team creator
    if (team.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Only team creator can view join requests' });
    }

    // Get all pending requests for this team
    const joinRequests = await JoinRequest.find({
      teamId,
      status: 'pending'
    }).populate('userId', 'username email profilePicture role experience location age gender');

    return res.json({ joinRequests });
  } catch (error) {
    console.error('Get team join requests error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Approve or reject a join request
export const respondToJoinRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { action } = req.body; // 'approve' or 'reject'
    const userId = req.user._id;

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ message: 'Action must be either "approve" or "reject"' });
    }

    // Find the join request
    const joinRequest = await JoinRequest.findById(requestId);
    if (!joinRequest) {
      return res.status(404).json({ message: 'Join request not found' });
    }

    // Check if team exists
    const team = await Team.findById(joinRequest.teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if user is the team creator
    if (team.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Only team creator can respond to join requests' });
    }

    // Check if team is full (for approval)
    if (action === 'approve' && team.isFull) {
      return res.status(400).json({ message: 'Cannot approve request: team is full' });
    }

    // Update request status
    const status = action === 'approve' ? 'approved' : 'rejected';
    joinRequest.status = status;
    joinRequest.respondedAt = new Date();
    joinRequest.respondedBy = userId;

    await joinRequest.save();

    // If approved, add user to team
    if (action === 'approve') {
      if (!team.members.includes(joinRequest.userId)) {
        team.members.push(joinRequest.userId);
        await team.save();
      }
    }

    return res.json({
      message: `Join request ${status} successfully`,
      joinRequest
    });
  } catch (error) {
    console.error('Respond to join request error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user's own join requests
export const getUserJoinRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const joinRequests = await JoinRequest.find({
      userId,
      status: 'pending'
    }).populate('teamId', 'name aim description maxMembers');

    return res.json({ joinRequests });
  } catch (error) {
    console.error('Get user join requests error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
