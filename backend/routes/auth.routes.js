import express from "express"; // Importing the Express framework.
import { login, logout, signup } from "../controllers/authcontroller.js"; // Importing login, logout, and signup controllers.

const router = express.Router(); // Creating a new router instance.

// Defining routes for authentication.

// Route to handle user login.
router.post("/login", login);

// Route to handle user signup.
router.post("/signup", signup);

// Route to handle user logout.
router.post("/logout", logout);

export default router; // Exporting the router for use in other parts of the application.
