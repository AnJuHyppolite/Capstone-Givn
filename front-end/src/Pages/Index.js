import { Link } from "react-router-dom";
import ItemsList from "../Components/ItemsList";
import "../Styles/Index.css"

const Index = () => {
  return (
    <div>
      <h1>This is our Index Page!</h1>
      <ItemsList />
      <Link to="posts/:id">
        <p>Click me</p>
      </Link>
    </div>
  );
};

export default Index;
