import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";
import { signOut } from "../Services/Firebase";
import { UserContext } from "../Providers/UserProvider";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../Assets/onlinelogomaker-091421-1958-0090.png";

const NavBar = () => {
  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  const handleSignOut = () => {
    signOut();
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
            <NavLink exact to="/profile">
              Profile
            </NavLink>
            <img src={user.photoURL} />
            {/* <ul>
            <li></li>
            <li>
              <button onClick={handleSignOut}>Sign out</button>
            </li>
          </ul> */}
          </div>
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
          <ul>
            <li className="one">
              <i class="fas fa-sign-in-alt"></i>
              <NavLink to={"/login"}>Log In</NavLink>
            </li>

            <li>
            <i class="fas fa-sign-out-alt"></i>
              <NavLink to={"/signup"}>Sign Up</NavLink>
            </li>
          </ul>
          <button className="left-icon">
            <i class="fas fa-caret-down"></i>
          </button>
        </nav>
      )}
    </header>
  );
};

export default NavBar;
