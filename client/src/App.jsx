import "./App.css";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const bottomRef = useRef(null);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  const sendMessage = async () => {
    if (message !== "") {
      const now = new Date();
      const timeStr = now.getHours() + ":" + now.getMinutes().toString().padStart(2, "0");
      const messageData = { room, author: username, message, time: timeStr };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => setMessageList((list) => [...list, data]));
    socket.on("load_messages", (history) => setMessageList(history));
    return () => { socket.off("receive_message"); socket.off("load_messages"); };
  }, [socket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input type="text" placeholder="Your Name..." onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="Room ID..." onChange={(e) => setRoom(e.target.value)} onKeyDown={(e) => e.key === "Enter" && joinRoom()} />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div className="chat-window">
          {/* SIDEBAR */}
          <div className="sidebar">
            <div className="sidebar-header"><h4>Channels</h4></div>
            <div className="sidebar-content">
              <div className="room-item active"># {room}</div>
              <div className="room-item"># general</div>
              <div className="room-item"># feedback</div>
            </div>
            <div className="sidebar-footer"><p>User: <strong>{username}</strong></p></div>
          </div>
          {/* MAIN CHAT */}
          <div className="chat-main">
            <div className="chat-header"><p>● Live Chat | Room: {room}</p></div>
            <div className="chat-body">
              {messageList.map((msg, index) => (
                <div key={index} className={`message-wrapper ${username === msg.author ? "sent" : "received"}`}>
                  <div className="message-bubble">
                    <p className="msg-text">{msg.message}</p>
                    <div className="msg-meta"><span>{msg.time}</span> • <span>{msg.author}</span></div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <div className="chat-footer">
              <input type="text" value={message} placeholder="Message..." onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} />
              <button onClick={sendMessage}>&#10148;</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;