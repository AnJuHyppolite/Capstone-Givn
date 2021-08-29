import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <h1>This is our Index Page!</h1>
      <Link to="posts/:id">
        <p>Click me</p>
      </Link>
    </div>
  );
};

export default Index;
