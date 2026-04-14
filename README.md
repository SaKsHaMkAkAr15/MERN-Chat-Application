# Modern Real-Time MERN Chat Application 💬

A high-performance, real-time messaging platform built with the **MERN Stack** (MongoDB, Express, React, Node.js) and **Socket.io**. This application features a sleek, glassmorphic UI inspired by modern platforms like Discord, with responsive message alignment similar to WhatsApp.

---

## ✨ Features
* **Real-Time Communication**: Instant message delivery and reception using WebSockets.
* **Glassmorphism UI**: High-end aesthetic with frosted-glass effects, gradients, and a deep-space theme.
* **Discord-Style Sidebar**: Clean navigation featuring specific chat channels like `#general` and `#feedback`.
* **WhatsApp-Style Layout**: Intuitive message alignment where sent messages appear on the right and received messages on the left.
* **Persistent Room States**: Users can join specific rooms via a Room ID to stay organized.

---

## 🛠️ Tech Stack
* **Frontend**: React.js, CSS3 (Custom Flexbox Layouts)
* **Backend**: Node.js, Express.js
* **Real-Time Engine**: Socket.io
* **Styling**: Modern CSS with Glassmorphism and Custom Keyframe Animations

---

## 📂 Project Structure

Chat-Application/
├── client/          # React Frontend (Vite-based)
│   ├── src/
│   │   ├── App.jsx  # Main Logic & Routing
│   │   ├── App.css  # Core Glassmorphic & Layout Styles
│   │   └── index.css# Global Reset Styles
└── server/          # Node.js & Socket.io Backend
    └── index.js     # Server Entry Point

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/YOUR_USERNAME/mern-chat-app.git](https://github.com/YOUR_USERNAME/mern-chat-app.git)
Setup Server

2. Setup Server
Terminal Code:
cd server
npm install
npm start
Setup Client

3. Setup Client
Terminal Code:
cd client
npm install
npm run dev

