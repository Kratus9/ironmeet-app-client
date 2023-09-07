import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {


  const { isUserActive } = useContext(AuthContext);


  return (
    <>
      {isUserActive === true ? (
        <div className="navbar navbar-bottom">
          
          <Link to="/events"><img src="/calendar_591576.png" width={37} alt="Events" /></Link>
          <Link to="/likes"><img src="/likes.png" width={37} alt="Likes" /></Link>
          <Link to="/swipe"><img src="/flame.png" width={43} alt="Swipe" /></Link>
          <Link to="/matches"><img src="/match.png" alt="Matches" width={35} /></Link>
          <Link to="/profile"><img src="/profile_10302971.png" width={35} alt="Profile" /></Link>
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
