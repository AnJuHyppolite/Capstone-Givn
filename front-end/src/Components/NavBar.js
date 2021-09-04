import { NavLink } from "react-router-dom";
import "../Styles/NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <h1>
        <NavLink exact to="/">Givn</NavLink>
      </h1>
      <div>
        <NavLink exact to="/posts">Get</NavLink>
        <NavLink exact to="/posts/new">Give</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
