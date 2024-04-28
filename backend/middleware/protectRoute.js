import jwt from 'jsonwebtoken'; // Importing jwt for token verification
import User from '../models/user.model.js'; // Importing User model

// Middleware to protect routes by verifying JWT token
const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // Extracting JWT token from cookies

        // Checking if token exists
        if (!token) {
            return res.status(401).json({ error: "Not authorized, no token" });
        }

        // Verifying the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // If token is invalid or expired, return error
        if (!decoded) {
            return res.status(401).json({ error: "Not authorized, invalid token" });
        }

        // Finding user by ID extracted from the token
        const user = await User.findById(decoded.userId).select("-password");

        // If user not found, return error
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        // Attaching the user object to the request object for further use
        req.user = user;

        next(); // Move to the next middleware or route handler
        
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message); // Logging error message
        res.status(500).json({ error: "Internal server error" }); // Responding with 500 status and error message
    }
}

export default protectRoute; // Exporting the protectRoute middleware
