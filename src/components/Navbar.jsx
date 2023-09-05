import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {


  const { isUserActive } = useContext(AuthContext);


  return (
    <div className="navbar navbar-bottom">
      {isUserActive === true ? (
        <>
          
          <Link to="/swipe">Swipe</Link>
          <Link to="/events">Events</Link>
          <Link to="/likes">Likes</Link>
          <Link to="/matches">Matches</Link>
          <Link to="/profile">Profile</Link>

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
