import User from "../models/userModel.js";
import { verifyJWTToken } from "../utiles/createJWTToken.js";

const AuthenticationMiddleware =async (req,res,next)=>{
    try {
        const token = req.cookies.user;
        if(!token) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }
        const decoded = verifyJWTToken(token);
        if(!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }    
        const user = await User.findById(decoded.userId).select("-password");
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }  
        req.user = user; // Attach user info to request object
        next();  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Login to access these servieces ', error: error.message });    
    }
}
const AuthorizationMiddleware = (req,res,next)=>{
 console.log("AuthorizationMiddleware called");
 next()
}
export { AuthenticationMiddleware, AuthorizationMiddleware };