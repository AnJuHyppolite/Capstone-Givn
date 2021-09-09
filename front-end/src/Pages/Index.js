import { Link } from "react-router-dom";
import ItemsList from "../Components/ItemsList";
import "../Styles/Index.css";
import { UserContext } from "../Providers/UserProvider";
import { useContext} from "react";

const Index = () => {
  const user = useContext(UserContext);
  return (
    <div>
      <h1>Welcome {user?.displayName}</h1>
      <ItemsList />
      <Link to="posts/:id">
        <p>Click me</p>
      </Link>
    </div>
  );
};

export default Index;
