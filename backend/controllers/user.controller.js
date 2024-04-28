import User from "../models/user.model.js"; // Importing User model

// Controller to get users for sidebar (excluding the logged-in user)
export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id; // Getting the ID of the logged-in user

		// Finding users excluding the logged-in user and excluding their password field
		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		// Responding with the filtered users
		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message); // Logging error to console
		res.status(500).json({ error: "Internal server error" }); // Responding with 500 status and error message
	}
};
