import express from 'express';
import { 
    userRegistration,
    userSignIn,
    getProfileOfUser,
 } from '../controllers/userController.js';
import { AuthenticationMiddleware } from '../middlewares/authHandlerMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register',userRegistration)
userRouter.post('/signin',userSignIn) //👈 your login route

userRouter.get('/signout', (req, res) => {
    res.clearCookie("user").json({ message: 'User signed out successfully' });
}); 

userRouter.get('/profile',AuthenticationMiddleware, getProfileOfUser)


export default userRouter;
