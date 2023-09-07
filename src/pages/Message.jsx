import React, { useEffect, useState, useRef } from "react";
import service from "../services/service.config";
import { useParams } from "react-router-dom";

function Messages() {
  const { senderId, receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [visibleMessages, setVisibleMessages] = useState(12);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await service.get(
          `/user/messages/${senderId}/${receiverId}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error al obtener mensajes:", error);
      }
    };

    fetchMessages();
  }, [senderId, receiverId]);

  const sendMessage = async () => {
    try {
      const response = await service.post("/user/messages/new-message", {
        text: newMessage,
        sender: senderId,
        receiver: receiverId,
      });

      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const handleScroll = () => {
  
    if (
      messagesContainerRef.current.scrollTop === 0 &&
      visibleMessages < messages.length
    ) {
      setVisibleMessages(visibleMessages + 12);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  return (
    <div>
      <div className="logo">
        <img
          src="/IronMeet logo-fotor-bg-remover-2023090792810.png"
          alt="Logo"
        />
        <img src="/IRONMEET.PNG" alt="logo-slo" />
      </div>
      <div
        className="message-container-m"
        onScroll={handleScroll}
        ref={messagesContainerRef}
      >
        {messages
          .slice(-visibleMessages)
          .map((message) => (
            <div
              key={message._id}
              className={`message ${
                message.sender === senderId ? "user-message" : "message"
              }`}
            >
              {message.text}
            </div>
          ))}
        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your message here..."
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage}>Send message</button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
