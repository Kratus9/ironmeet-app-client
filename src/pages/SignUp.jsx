import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { useState } from "react";

function SignUp() {
  const cities = [
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

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    age: 0,
    location: "",
    imgResult: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      await service.post("/auth/signup", {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        age: formData.age,
        location: formData.location,
        imgResult: formData.imgResult,
      });

      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      <div></div>
      <div>
        <form onSubmit={registerUser}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="name"
            required
            onChange={handleOnChange}
            placeholder="Name"
          />
          <label htmlFor="username">Userame</label>
          <input
            id="username"
            name="username"
            type="name"
            required
            onChange={handleOnChange}
            placeholder="Username"
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            onChange={handleOnChange}
            placeholder="Email"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={handleOnChange}
            placeholder="Password"
          />
          <label htmlFor="repeatPassword">Re-Enter Password</label>
          <input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            required
            onChange={handleOnChange}
            placeholder="Re-Enter Password"
          />
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            required
            onChange={handleOnChange}
            placeholder="Age"
          />
          <label htmlFor="location">City</label>
          <div className="city-select-container">
            <select
              id="location"
              name="location"
              onChange={handleOnChange}
              required
              value={formData.location}
              className="city-select"
            >
              {cities.map((eachCity) => (
                <option key={eachCity} value={eachCity}>
                  {eachCity}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="image">Profile Image</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required
            onChange={handleOnChange}
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
