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
        setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await service.patch("/user/profile/update", userData);

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");

    verifyToken(); // verificar un token que no existe para reiniciar los estados

    navigate("/login");
  };

  // const handleEdit = () => {
  //   navigate("/profile/edit");
  // };

  const handleDelete = () => {

  };
  
  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
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
              disabled={true} // Hacemos que el campo del email no se pueda editar
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
        <button type="submit" disabled={!isEditing}>
          Save
        </button>
        <button type="button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <button type="submit" onClick={handleDelete}>
          Delete
        </button>
      </form>
    </div>
  );
}

export default Profile;
