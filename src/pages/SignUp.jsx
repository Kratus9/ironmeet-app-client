import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    age: "",
    location: "",
    gender: "",
    preferences: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setFormData({
      ...formData,
      image: imageFile,
    });

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("repeatPassword", formData.repeatPassword);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("preferences", formData.preferences);
      formDataToSend.append("image", formData.image);

      console.log("Form Data:", formData);

      const response = await service.post("/auth/signup", formDataToSend);
      console.log("User registered successfully:", response.data.message);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

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

  const gender = ["Male", "Female", "Other"];
  const preferences = ["Male", "Female", "Other"];

  return (
    <>
      
      <div className="logo">
        <img
          src="/IronMeet logo-fotor-bg-remover-2023090792810.png"
          alt="Logo"
        />
        <img src="/IRONMEET.PNG" alt="logo-slo" />
      </div>
      <div className="signup-title">
        <h1>Signup</h1>
      </div>
      <div className="signup-form-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-floating mb-1">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
              placeholder=""
            />
            <label htmlFor="name">Name:</label>
          </div>
          <div className="form-floating mb-1">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-control"
              placeholder=""
            />
            <label htmlFor="username">Username:</label>
          </div>
          <div className="form-floating mb-1">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
              placeholder=""
            />
            <label htmlFor="email">Email:</label>
          </div>
          <div className="form-floating mb-1">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
              placeholder=""
            />
            <label htmlFor="password">Password:</label>
          </div>
          <div className="form-floating mb-1">
            <input
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              required
              className="form-control"
              placeholder=""
            />
            <label htmlFor="repeatPassword">Repeat Password:</label>
          </div>
          <div className="form-floating mb-1">
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              className="form-control"
              placeholder=""
            />
            <label htmlFor="age">Age:</label>
          </div>
          <div className="form-floating mb-1">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="form-select"
              aria-label="Floating label select"
            >
              <option value="">Select gender</option>
              {gender.map((gender, index) => (
                <option key={index} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
            <label htmlFor="gender">Gender:</label>
          </div>
          <div className="form-floating mb-1">
            <select
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              required
              className="form-select"
              aria-label="Floating label select"
            >
              <option value="">Select preferences</option>
              {preferences.map((preferences, index) => (
                <option key={index} value={preferences}>
                  {preferences}
                </option>
              ))}
            </select>
            <label htmlFor="preferences">Preferences:</label>
          </div>
          <div className="form-floating">
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="form-select"
              aria-label="Floating label select"
            >
              <option value="">Select location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <label htmlFor="location">Location:</label>
          </div>
          <div className="">
            <label className="imglabel">Profile Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="form-control form-control-sm" 
              id="formFileSm"
            />
          </div>
          <button className="signup-btn" type="submit">Sign Up</button>
          {errorMessage ? <p>{errorMessage}</p> : null}
        </form>
      </div>
    </>
  );
};

export default SignUp;
