import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <NavLink to="/">Givn</NavLink>
      <NavLink to="/posts">Get an Item</NavLink>
      <NavLink to="/posts/new">Give an Item</NavLink>
    </nav>
  );
};

export default NavBar;
