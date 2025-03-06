import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://or-chat-app.netlify.app"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

const userSocketMap = {};  

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        socket.userId = userId;  
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log("User disconnected:", socket.id);
        if (socket.userId) { // Check before deleting
            delete userSocketMap[socket.userId];
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { app, io, server };






// import {Server} from 'socket.io';
// import http from 'http';
// import express from 'express'

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors:{
//         origin: ["http://localhost:3000", "https://or-chat-app.netlify.app"],
//         methods: ["GET", "POST"]
//     }
// });

// export const getReceiverSocketId = (receiverId)=>{
//     return userSocketMap[receiverId]
// }

// const userSocketMap = {};

// io.on('connection', (socket)=>{
//     console.log("a user Connected", socket.id);

//     const userId = socket.handshake.query.userId;
//     if(userId !="undefined") userSocketMap[userId] = socket.id;

//     io.emit("getOnlineUsers", Object.keys(userSocketMap));

//     socket.on('disconnect', ()=>{
//         console.log("user Disconnect", socket.id);
//         delete userSocketMap[userId];
//         io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     })
// })



// export {app, io, server}