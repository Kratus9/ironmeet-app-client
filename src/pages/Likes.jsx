import React, { useEffect, useState, useContext } from "react";
import service from "../services/service.config";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Likes() {
  const { activeUserId, userRole } = useContext(AuthContext);
  const [likes, setLikes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await service.get("/user/likedBy");
        setLikes(response.data);
      } catch (error) {
        setError("Error getting your followers");
        console.error("Error", error);
      }
    };

    fetchLikes();
  }, []);

  const handleStartChat = async (userId) => {
    try {
      await service.patch(`/user/${userId}/like`);
    } catch (error) {
      setError(
        "Error al iniciar el chat. Por favor, inténtalo de nuevo más tarde."
      );
      console.error("Error al iniciar el chat:", error);
    }
  };

  return (
    <>
      {" "}
      <div className="logo">
        <img src="src/assets/IronMeet logo-fotor-bg-remover-2023090792810.png" alt="Logo" />
        <img src="./src/assets/IRONMEET.PNG" alt="logo-slo" />
      </div>
      <div className="matches-display">
        {userRole === "user" && (
          <div className="diamond-member-message">
            <div className="message-container">
              <h3>Become a Diamond Member to discover who liked you!</h3>
            </div>
            <div className="wrap rotor-x">
              <div className="wrap rotor-y">
                <div className="wrap rotor-z">
                  <div className="triangle bottom face-1"></div>
                  <div className="triangle bottom face-2"></div>
                  <div className="triangle bottom face-3"></div>
                  <div className="triangle bottom face-4"></div>
                  <div className="triangle bottom face-5"></div>
                  <div className="triangle bottom face-6"></div>
                  <div className="triangle bottom face-7"></div>
                  <div className="triangle bottom face-8"></div>

                  <div className="triangle middle-bottom face-1"></div>
                  <div className="triangle middle-bottom face-2"></div>
                  <div className="triangle middle-bottom face-3"></div>
                  <div className="triangle middle-bottom face-4"></div>
                  <div className="triangle middle-bottom face-5"></div>
                  <div className="triangle middle-bottom face-6"></div>
                  <div className="triangle middle-bottom face-7"></div>
                  <div className="triangle middle-bottom face-8"></div>

                  <div className="triangle middle-top face-1"></div>
                  <div className="triangle middle-top face-2"></div>
                  <div className="triangle middle-top face-3"></div>
                  <div className="triangle middle-top face-4"></div>
                  <div className="triangle middle-top face-5"></div>
                  <div className="triangle middle-top face-6"></div>
                  <div className="triangle middle-top face-7"></div>
                  <div className="triangle middle-top face-8"></div>

                  <div className="triangle up face-1"></div>
                  <div className="triangle up face-2"></div>
                  <div className="triangle up face-3"></div>
                  <div className="triangle up face-4"></div>
                  <div className="triangle up face-5"></div>
                  <div className="triangle up face-6"></div>
                  <div className="triangle up face-7"></div>
                  <div className="triangle up face-8"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {likes.map((like, index) => (
          <div
            key={index}
            className={`match-card ${
              userRole !== "diamondMember" ? "blur" : ""
            }`}
          >
            <Link to={`/user/${like._id}/profile`}>
              <div className="img-container">
                <img src={like.image} alt={like.name} />
              </div>
            </Link>
            <div className="chat-container">
              <h3>{like.name}</h3>
              <Link
                to={`/messages/${activeUserId}/${like._id}`}
                onClick={() => handleStartChat(like._id)}
              >
                {like.name} likes you...
                <br /> Start chatting! 😈
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Likes;
