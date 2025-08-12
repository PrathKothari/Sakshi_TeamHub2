import Team from '../models/teamModel.js';

export const createTeam = async (req, res) => {
  try {
    const { teamName, teamAim, description, maxMembers, skills } = req.body;

    if (!teamName || !teamAim || !maxMembers) {
      return res.status(400).json({ message: 'teamName, teamAim and maxMembers are required' });
    }

    const team = await Team.create({
      name: teamName,
      aim: teamAim,
      description: description || '',
      maxMembers: Number(maxMembers),
      skills: Array.isArray(skills) ? skills : [],
      createdBy: req.user?._id || undefined,
    });

    return res.status(201).json({ message: 'Team created successfully', team });
  } catch (error) {
    console.error('Create team error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const listTeams = async (_req, res) => {
  try {
    const teams = await Team.find().sort({ createdAt: -1 });
    return res.json({ teams });
  } catch (error) {
    console.error('List teams error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


