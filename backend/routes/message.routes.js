import express from 'express';
import { sendMessage , getMessages} from '../controllers/message.controller.js';

import protectRoute from '../middleware/protectRoute.js'; // Import the protectRoute middleware

const router = express.Router();

// Use the protectRoute middleware in your route definition
router.get("/:id", protectRoute, getMessages );
router.post("/send/:id", protectRoute, sendMessage);

export default router;

