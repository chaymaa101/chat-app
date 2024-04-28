import bcrypt from "bcryptjs"; // Importing bcrypt for password hashing
import User from "../models/user.model.js"; // Importing the User model
import generateTokenAndSetCookie from "../utils/generateToken.js"; // Importing a function to generate JWT token and set cookie

// Controller for user signup
export const signup = async (req, res) => {
	try {
		const { fullName, username, password, confirmPassword, gender } = req.body; // Destructuring request body

		// Checking if passwords match
		if (password !== confirmPassword) {
			return res.status(400).json({ error: "Passwords don't match" });
		}

		// Checking if username already exists
		const user = await User.findOne({ username });
		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// Hashing password using bcrypt
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Generating profile picture URL based on gender
		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

		// Creating a new User object
		const newUser = new User({
			fullName,
			username,
			password: hashedPassword,
			gender,
			profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
		});

		// Saving the new user to the database
		await newUser.save();

		// Generating JWT token and setting cookie
		generateTokenAndSetCookie(newUser._id, res);

		// Sending response with user information
		res.status(201).json({
			_id: newUser._id,
			fullName: newUser.fullName,
			username: newUser.username,
			profilePic: newUser.profilePic,
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Controller for user login
export const login = async (req, res) => {
	try {
		const { username, password } = req.body; // Destructuring request body

		// Finding user by username
		const user = await User.findOne({ username });

		// Comparing provided password with hashed password
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

		// If no user found or password incorrect, return error
		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		// Generating JWT token and setting cookie
		generateTokenAndSetCookie(user._id, res);

		// Sending response with user information
		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Controller for user logout
export const logout = (req, res) => {
	try {
		// Clearing JWT cookie
		res.cookie("jwt", "", { maxAge: 0 });
		// Sending response for successful logout
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
