

import React, { useEffect, useState, useContext } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Likes() {
  const { activeUserId } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await service.get("/user/likedBy");
        setLikes(response.data);
      } catch (error) {
        setError(
          "Error getting your followers"
        );
        console.error("Error", error);
      }
    };

    fetchLikes();
  }, []);


  const handleStartChat = async (userId) => {
    try {
      
      await service.patch(`/user/${userId}/like`);

      

    } catch (error) {
      setError("Error al iniciar el chat. Por favor, inténtalo de nuevo más tarde.");
      console.error("Error al iniciar el chat:", error);
    }
  };
  

  return (
    <div className="matches-display">
      {likes.map((like, index) => (
        <div key={index} className="match-card">
          <Link to={`/user/${like._id}/profile`}>
            <div className="img-container">
              <img src={like.image} alt={like.name} />
            </div>
          </Link>
          <div className="chat-container">
            <h3>{like.name}</h3>
            <Link to={`/messages/${activeUserId}/${like._id}`} onClick={() => handleStartChat(like._id)} >{like.name} likes you...<br /> Start chatting! 😈</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Likes;
