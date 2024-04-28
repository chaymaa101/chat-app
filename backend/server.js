import path from "path"; // Importing the path module for working with file paths.
import express from "express"; // Importing the Express framework.
import dotenv from "dotenv"; // Importing dotenv for environment variables.
import cookieParser from "cookie-parser"; // Importing cookie-parser for parsing cookies.
import authRoutes from "./routes/auth.routes.js"; // Importing authentication routes.
import messageRoutes from "./routes/message.routes.js"; // Importing message routes.
import userRoutes from "./routes/user.routes.js"; // Importing user routes.
import connectToMongoDB from "./db/connectToMongoDB.js"; // Importing function to connect to MongoDB.
import { app, server } from "./socket/socket.js"; // Importing Express app and Socket.IO server.

const PORT = process.env.PORT || 5000; // Setting the port for the server.

const __dirname = path.resolve(); // Getting the current directory name.

dotenv.config(); // Loading environment variables from .env file.

app.use(express.json()); // Middleware to parse incoming requests with JSON payloads (from req.body).
app.use(cookieParser()); // Middleware to parse cookies.

// Mounting routes for different API endpoints.
app.use("/api/auth", authRoutes); // Authentication routes.
app.use("/api/messages", messageRoutes); // Message routes.
app.use("/api/users", userRoutes); // User routes.

// Serving static files from the frontend/dist directory.
app.use(express.static(path.join(__dirname, "/frontend/dist")));

// Handling all other routes by serving the index.html file.
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Starting the server and listening on the specified port.
server.listen(PORT, () => {
    connectToMongoDB(); // Connecting to MongoDB.
    console.log(`Server Running on port ${PORT}`);
});
