import React, { useState, useEffect } from "react";
import service from "../services/service.config";
import TinderCard from "react-tinder-card";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import confetti from "canvas-confetti";

function Swipe() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matched, setMatched] = useState(false);
  const [showMatchStamp, setShowMatchStamp] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await service.get("user/swipe");

        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error("Error al obtener usuarios");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0 && currentIndex < users.length) {
      if (matched) {
        setShowMatchStamp(true);

        setTimeout(() => {
          setShowMatchStamp(false);
        }, 1000);
        confetti();
      } else {
        setShowMatchStamp(false);
      }
    }
  }, [users, currentIndex, matched]);

  const handleSwipe = (direction) => async () => {
    const userToSwipe = users[currentIndex];

    try {
      let action;
      if (direction === "right") {
        action = "like";
      } else {
        action = "dislike";
      }
      const response = await service.post(
        `user/swipe/${userToSwipe._id}/${action}`
      );

      if (response.status === 200) {
        if (response.data.message === "Matched!") {
          setMatched(true);
        } else {
          setMatched(false);
        }
        setCurrentIndex(currentIndex + 1);
      } else {
        console.error(`Error ${action} `);
      }
    } catch (error) {
      console.error("Network:", error);
    }
  };

  const handleAction = (action) => async () => {
    const userToSwipe = users[currentIndex];

    try {
      const response = await service.post(
        `user/swipe/${userToSwipe._id}/${action}`
      );

      if (response.status === 200) {
        if (response.data.message === "Matched!") {
          setMatched(true);
        } else {
          setMatched(false);
        }
        setCurrentIndex(currentIndex + 1);
      } else {
        console.error(`Error ${action} `);
      }
    } catch (error) {
      console.error("Network:", error);
    }
  };

  return (
    <>
      <div className="logo">
        <img
          src="/IronMeet logo-fotor-bg-remover-2023090792810.png"
          alt="Logo"
        />
        <img src="/IRONMEET.PNG" alt="logo-slo" />
      </div>
      <div className="dashboard">
        {users.length > 0 && currentIndex < users.length ? (
          <TinderCard
            preventSwipe={["up", "down"]}
            key={users[currentIndex]._id}
            onSwipe={(dir) => handleSwipe(dir)()}
            className="tinder-card"
          >
            <div
              style={{
                backgroundImage: `url(${users[currentIndex].image})`,
              }}
              className="card"
            >
              {showMatchStamp && <div className="match-stamp">MATCH</div>}
              <div className="user-info">
                <h3 className="user-name">
                  {users[currentIndex].name} <br />{" "}
                  <span>{users[currentIndex].age}</span>
                </h3>
                <div className="location">
                  <img src="/location-icon.jpg" width={28} alt="location" />
                  <span>{users[currentIndex].location}</span>
                </div>
  
                <Link
                  to={`/user/${users[currentIndex]._id}/profile`}
                  className="info-icon-link"
                >
                  <FaInfoCircle className="info-icon" />
                </Link>
              </div>
              <div className="black-background">
                <button
                  className="like-button"
                  onClick={handleAction("like")}
                >
                  <img
                    width={58}
                    src="/bggleJKGqirFChE (1).png"
                    alt="like"
                  />
                </button>
                <button
                  className="dislike-button"
                  onClick={handleAction("dislike")}
                >
                  <img
                    width={55}
                    src="/GaVLxTdLgqSuYiC.png"
                    alt="dislike"
                  />
                </button>
              </div>
            </div>
          </TinderCard>
        ) : (
          <div className="swipe-info-container">
            <div className="swipe-info swipe-text-container">
              <h3>No more users to swipe!</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Swipe;