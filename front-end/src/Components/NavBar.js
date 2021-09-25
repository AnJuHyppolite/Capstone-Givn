import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";
import { signOut } from "../Services/Firebase";
import { UserContext } from "../Providers/UserProvider";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import logo from "../Assets/onlinelogomaker-091421-1958-0090.png";

const NavBar = () => {
  const user = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    setOpen(false);
  };

  const handleDropdown = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <header>
      {user ? (
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
          </div>
          <img
            src={user.photoURL}
            alt="user-photo"
            className="profile"
            onClick={handleDropdown}
          />
          <ul className={!open ? "dropdown" : null} id="user-menu">
            <li className="one">
              <i class="fas fa-user-circle"></i>
              <NavLink exact to="/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <i class="fas fa-sign-out-alt"></i>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </ul>
        </nav>
      ) : (
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
          </div>
          <ul className={!open ? "dropdown" : null}>
            <li className="one">
              <i class="fas fa-sign-in-alt"></i>
              <NavLink to={"/login"}>Log In</NavLink>
            </li>

            <li>
              <i class="fas fa-user-plus"></i>
              <NavLink to={"/signup"}>Sign Up</NavLink>
            </li>
          </ul>
          <button className="left-icon" onClick={handleDropdown}>
            <i class="fas fa-caret-down"></i>
          </button>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
