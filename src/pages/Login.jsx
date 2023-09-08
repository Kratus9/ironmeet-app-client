import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service.config";
import { AuthContext } from "../context/auth.context";

function Login() {
  const { verifyToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await service.post(
        "/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      

      localStorage.setItem("authToken", response.data.authToken);

      await verifyToken();

      navigate("/swipe");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid credentials");
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div className="login-form-container">
      <div className="logo">
        <img
          src="/IronMeet logo-fotor-bg-remover-2023090792810.png"
          alt="Logo"
        />
        <img src="/IRONMEET.PNG" alt="logo-slo" />
      </div>
      <h1>Log In</h1>
      <div className="form-margin p-3">
        <form onSubmit={handleLogin}>
          <div className="form-floating mb-1">
            <input
              type="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              className="form-control"
              placeholder=""
            />
            <label htmlFor="username">Username:</label>
          </div>

          <br />
          <div className="form-floating mb-1">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="form-control"
              placeholder="Password"
            />
            <label htmlFor="password">Password:</label> {/* Corregido aquí */}
          </div>

          <br />

          <button className="login-btn" type="submit">
            Login
          </button>

          {errorMessage ? <p>{errorMessage}</p> : null}
        </form>
      </div>
    </div>
  );
}

export default Login;