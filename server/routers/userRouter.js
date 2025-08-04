import express from 'express';
import { userRegistration, userLogin } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', userRegistration);
router.post('/signin', userLogin);  // 👈 your login route

export default router;
