import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import service from "../services/service.config";


function Profile() {
  const navigate = useNavigate();

  const { verifyToken } = useContext(AuthContext);
  

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

  
  const [isEditing, setIsEditing] = useState(false);

  const gender = ["Male", "Female", "Other"];
  const preferences = ["Male", "Female", "Other"];
  const locations = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Gerona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Islas Baleares",
    "Jaén",
    "La Coruña",
    "La Rioja",
    "Las Palmas",
    "León",
    "Lérida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Orense",
    "Palencia",
    "Pontevedra",
    "Salamanca",
    "Santa Cruz de Tenerife",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await service.get("/user/profile");
        console.log("Response from server:", response.data);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field "${name}" changed to "${value}"`);
    setUserData({
      ...userData,
      [name]: value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.patch("/user/profile/update", userData);
      console.log("Profile updated successfully");

 

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    verifyToken();

    navigate("/login");
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
      <form onSubmit={handleSubmit} className="profile-container">
        <div>
          {isEditing ? (
            (console.log("Image URL:", userData.image),
            (
              <div className="profile-img-container">
                <img src={userData.image} alt={userData.name} width={100} />
              </div>
            ))
          ) : (
            <div className="profile-img-container">
              <img src={userData.image} alt={userData.name} width={100} />
            </div>
          )}
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
            />
          ) : (
            <span>{userData.name}</span>
          )}
        </div>
        <div>
          <label>Username:</label>
          {isEditing ? (
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
          ) : (
            <span>{userData.username}</span>
          )}
        </div>

        <div>
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={true}
            />
          ) : (
            <span>{userData.email}</span>
          )}
        </div>

        <div>
          <label>Age:</label>
          {isEditing ? (
            <input
              type="text"
              name="age"
              value={userData.age}
              onChange={handleChange}
            />
          ) : (
            <span>{userData.age}</span>
          )}
        </div>

        <div>
          <label>Location:</label>
          {isEditing ? (
            <select
              name="location"
              value={userData.location}
              onChange={handleChange}
            >
              <option value="">Select location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
          ) : (
            <span>{userData.location}</span>
          )}
        </div>

        <div>
          <label>Gender:</label>
          {isEditing ? (
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              {gender.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          ) : (
            <span>{userData.gender}</span>
          )}
        </div>
        <div>
          <label>Preferences:</label>
          {isEditing ? (
            <select
              name="preferences"
              value={userData.preferences}
              onChange={handleChange}
            >
              <option value="">Select preferences</option>
              {preferences.map((preference, index) => (
                <option key={index} value={preference}>
                  {preference}
                </option>
              ))}
            </select>
          ) : (
            <span>{userData.preferences}</span>
          )}
        </div>
        <div>
          <label>Tell the others about you:</label>
          {isEditing ? (
            <textarea
              type="text"
              name="description"
              value={userData.description}
              onChange={handleChange}
            />
          ) : (
            <span>{userData.description}</span>
          )}
        </div>
      </form>
        <div className="btn-profile">
        <a
  type="submit"
  onClick={() => setIsEditing(!isEditing)}
  disabled={!isEditing}
>
  <img src="2639912_save_icon-removebg-preview.png" width={50} alt="save" />
</a>
        <a type="button" onClick={() => setIsEditing(!isEditing)}>
          <img src="settings_563687-removebg-preview.png" width={50} alt="edit" />
        </a>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Log Out</button>
    </div>
  );
}



export default Profile;