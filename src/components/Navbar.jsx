import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {


  const { isUserActive } = useContext(AuthContext);


  return (
    <>
      {isUserActive === true ? (
        <div className="navbar navbar-bottom">
          <Link to="/swipe"><img src="src/assets/flame.png" width={43} alt="Swipe" /></Link>
          <Link to="/events"><img src="src/assets/calendar_591576.png" width={37} alt="Events" /></Link>
          <Link to="/likes"><img src="src/assets/likes.png" width={37} alt="Likes" /></Link>
          <Link to="/matches"><img src="src/assets/match.png" alt="Matches" width={35} /></Link>
          <Link to="/profile"><img src="src/assets/profile_10302971.png" width={35} alt="Profile" /></Link>
        </div>
      ) : (
        <div className="nav-not-logged-in">
          <Link to="/">Home</Link>
          <Link to="/signup">Register</Link>
          <Link to="/login">Log In</Link>
        </div>
      )}
    </>
  );
}

export default Navbar;
