import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";
import { signOut } from "../Services/Firebase";
import { UserContext } from "../Providers/UserProvider";
import { useContext } from "react";
import logo from "../Assets/onlinelogomaker-091421-1958-0090.png";

const NavBar = () => {
  const user = useContext(UserContext);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <nav>
      <h1>
        <NavLink exact to="/">
          Givn
          <img src={logo} alt="givn-logo" />
        </NavLink>
      </h1>
      <div>
        <NavLink exact to="/posts">
          Get
        </NavLink>
        <NavLink exact to="/posts/new">
          Give
        </NavLink>
        <NavLink exact to="/profile">
          Profile
        </NavLink>
      </div>
      {user ? (
        <button onClick={handleSignOut}>Sign out</button>
      ) : (
        <NavLink to={"/signup"}> Sign Up</NavLink>
      )}
    </nav>
  );
};

export default NavBar;
