import User from '../models/userModel.js';
import { createJWTTOkenUser } from '../utiles/createJWTToken.js';

const userRegistration = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    // Remove password before sending response
    const userResponse = newUser.toObject();
    delete userResponse.password;
    const userToken = createJWTTOkenUser(newUser._id);

    res.status(201).cookie("user",userToken).json({ 
      message: 'User registered successfully', 
      user: userResponse 
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const userSignIn = async(req,res)=>{
  try {
    const {email,password} = req.body;
    // Find user by email
    const user = await User.findOne({email:email})

    if(!user)
      return res.status(400).json({message:"User not found"});
    // Check password
    
    if(user.password !== password)  
      return res.status(400).json({message:"Invalid password"});  
    // Create JWT token
    user.password = undefined
    const userToken = createJWTTOkenUser(user._id);
    res.status(200).cookie("user",userToken).json({ 
      message: 'User signed in successfully', 
      user 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
const getProfileOfUser = (req, res) => {
  try {   
    const user = req.user; // User info is attached by AuthenticationMiddleware
    res.status(200).json({ 
      message: 'User profile retrieved successfully', 
      user 
    });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
export { 
  userRegistration,
  userSignIn,
  getProfileOfUser
};

