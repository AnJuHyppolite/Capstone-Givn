import { Link } from "react-router-dom";

const Show = () => {
  return (
    <div>
      <h1>Show Page</h1>
      <Link to="/posts/:id/edit">
        <p>Edit</p>
      </Link>
    </div>
  );
};

export default Show;
