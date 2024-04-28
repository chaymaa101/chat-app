import express from "express"; // Importing the Express framework.
import { getMessages, sendMessage } from "../controllers/message.controller.js"; // Importing message controllers.
import protectRoute from "../middleware/protectRoute.js"; // Importing protectRoute middleware.

const router = express.Router(); // Creating a new router instance.

// Defining routes for message-related endpoints.

// Route to get messages for a specific conversation.
router.get("/:id", protectRoute, getMessages);

// Route to send a message to a specific user.
router.post("/send/:id", protectRoute, sendMessage);

export default router; // Exporting the router for use in other parts of the application.
