// Importing the Express library
import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';

import authRoutes from "./routes/authroutes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from './db/connectToMongoDB.js';
import userRoutes from "./routes/user.routes.js";
// Creating an Express application instance
const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); //to parse the including requests with JSON payloads(from req.body)
app.use(cookieParser()); //to parse cookies(from req.cookies)
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

// app.get('/', (req, res) => {
//     // Root route http://localhost:5000/
//     res.send('Hello World!');
// });

// Configuring the Express app to listen on the specified port
app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Running on port ${PORT}`)
});
