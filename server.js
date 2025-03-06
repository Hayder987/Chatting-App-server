import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectedToMongoDb from "./db/connectedToMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigin = "https://or-chat-app.netlify.app";

// CORS Middleware (apply BEFORE server instance)
const corsOptions = {
  origin: allowedOrigin,
  credentials: true,
  methods: ["GET", "POST"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Create HTTP Server
const serverInstance = http.createServer(app);

// Define API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("or chat server is running");
});

// Initialize Socket.io
const io = new Server(serverInstance, {
  cors: {
    origin: allowedOrigin,
    credentials: true,
  },
});

// Handle Socket.io Connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.room).emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start Server with error handling
serverInstance.listen(PORT, () => {
  connectedToMongoDb(); // Connect to MongoDB
  console.log(`Server running at: ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try another port.`);
  } else {
    console.error('Server startup error:', err);
  }
  process.exit(1);
});















// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";  
// import cookieParser from "cookie-parser";
// import http from "http";  // Import http for creating the server

// import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import messageRoutes from "./routes/message.routes.js";

// import connectedToMongoDb from "./db/connectedToMongoDB.js";
// import { app } from "./socket/socket.js";  

// dotenv.config();

// const PORT = process.env.PORT || 5000;


// const allowedOrigin = "https://or-chat-app.netlify.app";


// const serverInstance = http.createServer(app);


// const corsOptions = {
//   origin: allowedOrigin,  
//   credentials: true,       
//   methods: ["GET", "POST"], 
// };

// // Apply CORS middleware for HTTP requests
// app.use(cors(corsOptions));


// app.use(express.json());
// app.use(cookieParser());

// // Define your API Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/users", userRoutes);


// app.get('/', (req, res) => {
//     res.send('or chat server is running');
// });


// import { Server } from "socket.io";
// const io = new Server(serverInstance, {
//   cors: {
//     origin: allowedOrigin,  
//     credentials: true,       
//   },
// });

// io.on('connection', (socket) => {
//   console.log('a user connected');
  
// });


// serverInstance.listen(PORT, () => {
//     connectedToMongoDb();
//     console.log(`Server running at: ${PORT}`);
// });
