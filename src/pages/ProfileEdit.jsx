import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function EditProfile() {
  const navigate = useNavigate();

  const { verifyToken } = useContext(AuthContext);

  const handleUpgrade = () => {
    
  }

  return (
    <div>
      <h1>EditProfile</h1>
      <div>
        {/* <img src={user.img} alt="Profile Image" /> */}
        <div>
          <p>
            <strong>Username:</strong>{" "}
          </p>
          <p>
            <strong>Email:</strong>{" "}
          </p>
        </div>
      </div>

      <button type="submit" onClick={handleUpgrade}>Upgrade</button>
    </div>
  );
}

export default EditProfile