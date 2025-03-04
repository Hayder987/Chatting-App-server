import express from "express";
import dotenv from "dotenv";
import cors from "cors";  
import cookieParser from "cookie-parser";
import http from "http";  // Import http for creating the server

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

import connectedToMongoDb from "./db/connectedToMongoDB.js";
import { app } from "./socket/socket.js";  // Ensure the app is being imported from socket.js

dotenv.config();

const PORT = process.env.PORT || 5000;

// Define the allowed frontend origin
const allowedOrigin = "https://or-chat-app.netlify.app";

// Create the HTTP server instance
const serverInstance = http.createServer(app);

// CORS setup for both HTTP requests and WebSocket connections
const corsOptions = {
  origin: allowedOrigin,  // Allow only the frontend domain
  credentials: true,       // Allow credentials (cookies, etc.)
  methods: ["GET", "POST"], // Allow specific methods
};

// Apply CORS middleware for HTTP requests
app.use(cors(corsOptions));

// Enable JSON parsing and cookie parsing
app.use(express.json());
app.use(cookieParser());

// Define your API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Test Route
app.get('/', (req, res) => {
    res.send('or chat server is running');
});

// Initialize Socket.IO with CORS support
import { Server } from "socket.io";
const io = new Server(serverInstance, {
  cors: {
    origin: allowedOrigin,  // Allow WebSocket connections from the frontend domain
    credentials: true,       // Allow credentials with WebSocket connections
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  // Your socket event handlers go here
});

// Start the server and connect to MongoDB
serverInstance.listen(PORT, () => {
    connectedToMongoDb();
    console.log(`Server running at: ${PORT}`);
});
