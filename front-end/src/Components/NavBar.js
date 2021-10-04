import { NavLink, useHistory } from "react-router-dom";
import "../Styles/NavBar.css";
import { signOut } from "../Services/Firebase";
import { UserContext } from "../Providers/UserProvider";
import { useContext, useState } from "react";

import logo from "../Assets/onlinelogomaker-091421-1958-0090.png";

const NavBar = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const showMobileMenu = () => {
    setMobileMenu((prevMenu) => !prevMenu);
  };

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
    history.push("/");
  };

  const handleDropdown = () => {
    setOpen(prevOpen => !prevOpen)
  }

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
            <NavLink exact to={"/about"}>
              About
            </NavLink>
            <i
              className={mobileMenu ? "fas fa-times" : "fas fa-bars"}
              onClick={showMobileMenu}
            ></i>
          </div>
          <img
            src={user.photo_url}
            alt="user"
            className="profile"
            onClick={handleDropdown}
          />
          <ul className={!open ? "dropdown" : null} id="user-menu">
            <li className="one">
              <i className="fas fa-user-circle"></i>
              <NavLink exact to="/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <i className="fas fa-sign-out-alt"></i>

              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </ul>
          <ol
            className={mobileMenu ? "menu show" : "menu"}
            onClick={showMobileMenu}
          >
            <li>
              <h1>
                <NavLink exact to={"/posts"}>
                  Get
                </NavLink>
              </h1>
            </li>
            <li>
              <h1>
                <NavLink to={"/posts/new"}>Give</NavLink>
              </h1>
            </li>
            <li>
              <h1>
                <NavLink to={"/about"}>About</NavLink>
              </h1>
            </li>
          </ol>
        </nav>
      ) : (
        <nav>
          <h1>
            <NavLink exact to="/">
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
            <NavLink exact to={"/about"}>
              About
            </NavLink>
            <i
              className={mobileMenu ? "fas fa-times" : "fas fa-bars"}
              onClick={showMobileMenu}
            ></i>
          </div>
          <ul className={!open ? "dropdown" : null}>
            <li className="one">
              <i className="fas fa-sign-in-alt"></i>
              <NavLink to={"/login"}>Log In</NavLink>
            </li>

            <li>
              <i className="fas fa-user-plus"></i>
              <NavLink to={"/signup"}>Sign Up</NavLink>
            </li>
          </ul>
          <button className="left-icon" onClick={handleDropdown}>
            <i className="fas fa-caret-down"></i>
          </button>
          <ul
            className={mobileMenu ? "menu show" : "menu"}
            onClick={showMobileMenu}
          >
            <li>
              <h1>
                <NavLink exact to={"/posts"}>
                  Get
                </NavLink>
              </h1>
            </li>
            <li>
              <h1>
                <NavLink to={"/posts/new"}>Give</NavLink>
              </h1>
            </li>
            <li>
              <h1>
                <NavLink to={"/about"}>About</NavLink>
              </h1>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
