import express from "express"; // Importing the Express framework.
import protectRoute from "../middleware/protectRoute.js"; // Importing protectRoute middleware.
import { getUsersForSidebar } from "../controllers/user.controller.js"; // Importing getUsersForSidebar controller.

const router = express.Router(); // Creating a new router instance.

// Defining routes for user-related endpoints.

// Route to get users for displaying in the sidebar.
router.get("/", protectRoute, getUsersForSidebar);

export default router; // Exporting the router for use in other parts of the application.
