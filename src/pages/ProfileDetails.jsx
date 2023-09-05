import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../services/service.config";

function ProfileDetails() {
  const navigate = useNavigate();
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
      <h2>{userData.name}</h2>

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
  );
}

export default ProfileDetails;
