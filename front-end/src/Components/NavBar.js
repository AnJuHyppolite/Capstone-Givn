import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";
import { signOut } from "../Services/Firebase";
import { UserContext } from "../Providers/UserProvider";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
    <nav>
      <h1>
        <NavLink exact to="/">
          Givn
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
      <button onClick={handleSignOut}>Sign out</button>
    </nav>
  );
};

export default NavBar;
