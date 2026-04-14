const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Message = require("./Message");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// 1. Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/chat-app")
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERROR:", err));

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", async (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);

    // 2. Fetch history from Database when someone joins
    const history = await Message.find({ room: room }).sort({ timestamp: 1 });
    socket.emit("load_messages", history);
  });

  socket.on("send_message", async (data) => {
    // 3. Save message to Database
    const newMessage = new Message(data);
    await newMessage.save();
    
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING ON PORT 3001");
});