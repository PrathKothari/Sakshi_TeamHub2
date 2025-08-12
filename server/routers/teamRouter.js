import express from 'express';
import { createTeam, listTeams } from '../controllers/teamController.js';
import { AuthenticationMiddleware } from '../middlewares/authHandlerMiddleware.js';

const router = express.Router();

router.get('/', listTeams);
router.post('/', AuthenticationMiddleware, createTeam);

export default router;


