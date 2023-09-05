import React, { useState, useEffect } from "react";
import service from "../services/service.config";
import TinderCard from "react-tinder-card";
import { Link } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

function Swipe() {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await service.get("user/swipe");
        console.log("Response from server:", response);

        if (response.status === 200) {
          console.log("Users received:", response.data);
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

  const handleSwipe = (direction) => async () => {
    console.log("Starting handleSwipe with direction:", direction);

    const userToSwipe = users[currentIndex];
    console.log("Swiping user:", userToSwipe);

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
      console.log("Response from swipe:", response);

      if (response.status === 200) {
        console.log("New users data:", response.data);
        setUsers(response.data);
        setCurrentIndex(currentIndex + 1);
      } else {
        console.error(`Error al dar ${action}`);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="dashboard">
      <div className="swipe-container">
        <div className="card-container">
          {users.length > 0 && currentIndex < users.length ? (
            <TinderCard
              preventSwipe={["up", "down"]}
              key={users[currentIndex]._id}
              onSwipe={(dir) => handleSwipe(dir)()}
              className="tinder-card"
            >
              <div
                style={{ backgroundImage: `url(${users[currentIndex].image})` }}
                className="card"
              >
                <div>
                  <h3>{users[currentIndex].name}</h3>
                  <Link
                    to={`/user/${users[currentIndex]._id}/profile`}
                    className="info-icon-link"
                  >
                    <FaInfoCircle className="info-icon" />
                  </Link>
                </div>
              </div>
            </TinderCard>
          ) : (
            <div className="swipe-info-container">
              <div className="swipe-info">
                <p>No more users to swipe</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Swipe;
