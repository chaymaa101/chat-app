import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const {fullName, username, password, confirmPassword, gender} = req.body;
    
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }
    
    // Check if username already exists
    const user = await User.findOne({ username });
    if (user) { // If user exists, we return an error
      return res.status(400).send("Username already exists");
    }
    
    // If you are here, it means username is unique, and you can proceed with the account creation
    // ( hash the password before storing it in the database)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const profilePic = gender === 'male'
      ? `https://avatar.iran.liara.run/public/boy?username=${username}`
      : `https://avatar.iran.liara.run/public/girl?username=${username}`;
    
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic
    });
    if(newUser){
        //generate JWT token here
        await generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePic: newUser.profilePic
    });
    }else{
      return res.status(400).json({error: "Invalid user data"});
    }

  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({error: "Internal server error"});
  }
};
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // Check if user exists
        if (!user) {
            return res.status(400).json({error: "Invalid username or password"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.error("Error in login controller", error.message);
        // It's good practice to avoid sending error details to the client.
        return res.status(500).json({error: "Internal server error"});
    }
};
 
export const logout =  (req, res) => {
    try {
        res.cookie("jwt","", { maxAge: 0 });
        res.status(200).json({message: "Logout successful"});
    } catch (error) {
        console.error("Error in logout controller", error.message);
        // It's good practice to avoid sending error details to the client.
        return res.status(500).json({error: "Internal server error"});
        
    }
};
