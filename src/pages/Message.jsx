import React, { useEffect, useState } from "react";
import service from "../services/service.config";
import { useParams } from "react-router-dom";

function Messages() {
  const { senderId, receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  console.log("senderId:", senderId);
  console.log("receiverId:", receiverId);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await service.get(
          `/user/messages/${senderId}/${receiverId}`
        );
        console.log("Response from fetchMessages:", response.data);
        setMessages(response.data);
        console.log("Messages after updating:", messages);
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

  const handleKeyDown = (e) => {
    
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message._id} className="message">
            {message.text}
          </div>
        ))}
      </div>
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
  );
}

export default Messages;