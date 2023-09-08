import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../services/service.config";

function ProfileDetails() {
  const { userId } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    age: "",
    location: "",
    gender: "",
    preferences: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await service.get(`/user/${userId}/profile`);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div>
      <div className="logo">
        <img
          src="/IronMeet logo-fotor-bg-remover-2023090792810.png"
          alt="Logo"
        />
        <img src="/IRONMEET.PNG" alt="logo-slo" />
      </div>
      <div className="profile-container">
        <div className="profile-img-container-notuser">
          <img src={userData.image} alt={userData.name} width={100} />
        <h2>{userData.name}</h2>
        </div>
        <div>
          <label>Age:</label>
          <span>{userData.age}</span>
        </div>
        <div>
          <label>Location:</label>
          <span>{userData.location}</span>
        </div>
        <div>
          <label>Gender:</label>
          <span>{userData.gender}</span>
        </div>
        <div>
          <label>Preferences:</label>
          <span>{userData.preferences}</span>
        </div>
        <div>
          <label>About me:</label>
          <span>{userData.description}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;