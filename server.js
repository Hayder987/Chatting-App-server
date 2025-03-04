import express from "express";
import dotenv from "dotenv";
import cors from "cors";  
import cookieParser from "cookie-parser";
import http from "http"; 

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";

import connectedToMongoDb from "./db/connectedToMongoDB.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const allowedOrigin = "https://or-chat-app.netlify.app";

const serverInstance = http.createServer(app);  


const corsOptions = {
  origin: allowedOrigin, 
  credentials: true,       
  methods: ["GET", "POST"], 
};


app.use(cors(corsOptions));


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

// Initialize WebSocket with CORS handling
import { Server } from "socket.io";

const io = new Server(serverInstance, {
  cors: {
    origin: allowedOrigin,  
    credentials: true,      
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
});

serverInstance.listen(PORT, () => {
    connectedToMongoDb();
    console.log(`Server running at: ${PORT}`);
});
