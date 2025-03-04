import express from "express";
import dotenv from "dotenv";
import cors from "cors";  // Import CORS
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

import connectedToMongoDb from "./db/connectedToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cors({ 
    origin: "*",  
    credentials: true 
}));

app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('or chat server is running');
});

server.listen(PORT, () => {
    connectedToMongoDb();
    console.log(`Server running at: ${PORT}`);
});
