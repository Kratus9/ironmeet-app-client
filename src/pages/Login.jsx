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
      const response = await service.post("/auth/login", {
        username,
        password,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log(response);

      
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
    <div>
      <h1>Log In</h1>
      <div className="form-margin" >
      <form onSubmit={handleLogin}>
        <div class="form-floating mb-3">
        <input
          type="username"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          class="form-control" id="floatingInput" placeholder=""
        />
        <label for="floatingInput">Username:</label>
        </div>

        <br />
        <div class="form-floating mb-3">
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          class="form-control" id="floatingPassword" placeholder="Password"
        />
        <label for="floatingPassword">Password:</label>
        </div>

        <br />

        <button className="login-btn" type="submit">Login</button>

        {errorMessage ? <p>{errorMessage}</p> : null}
      </form>
      </div>
    </div>
  );
}

export default Login;