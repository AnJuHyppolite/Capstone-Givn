import { useContext } from "react";
import ItemsList from "../Components/ItemsList";
import { UserContext } from "../Providers/UserProvider";
import "../Styles/Index.css";

const Index = () => {
  const {user} = useContext(UserContext)
  return (
    <div className="Index">
      <section>
        {user ? <h1>Welcome, {user?.display_name}</h1> : <h1>Welcome to Givn</h1>}
        <ItemsList />
      </section>
    </div>
  );
};

export default Index;
