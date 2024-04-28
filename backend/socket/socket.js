import { Server } from "socket.io"; // Importing the Socket.IO server class.
import http from "http"; // Importing the HTTP module.
import express from "express"; // Importing the Express framework.

const app = express(); // Creating an Express application.

const server = http.createServer(app); // Creating an HTTP server instance.
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"], // Allowing requests from the specified origin.
        methods: ["GET", "POST"], // Allowing specified HTTP methods.
    },
});

// Function to get the socket ID of the receiver based on their user ID.
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {}; // Mapping of user IDs to socket IDs. {userId: socketId}

// Event listener for new connections.
io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    // Extracting user ID from handshake query.
    const userId = socket.handshake.query.userId;

    // Mapping user ID to socket ID.
    if (userId != "undefined") userSocketMap[userId] = socket.id;

    // Sending event to all connected clients to update online users list.
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // Event listener for disconnections.
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);

        // Removing user from userSocketMap on disconnection.
        delete userSocketMap[userId];

        // Sending event to all connected clients to update online users list.
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, io, server }; // Exporting app, io, and server for use in other parts of the application.
