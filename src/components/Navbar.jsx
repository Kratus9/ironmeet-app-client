import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {


  const { isUserActive } = useContext(AuthContext);


  return (
    <div>
      {isUserActive === true ? (
        <>
          
          <Link to="/swipe"></Link>
          <Link to="/events"></Link>
          <Link to="/likes"></Link>
          <Link to="/matches"></Link>
          <Link to="/profile"></Link>

        </>
      ) : (
        <>
          <Link to="/">Home</Link>
          <Link to="/signup">Register</Link>
          <Link to="/login">Log In</Link>
        </>
      )}
    </div>
  );
}

export default Navbar;
