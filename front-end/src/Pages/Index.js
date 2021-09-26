import ItemsList from "../Components/ItemsList";
import "../Styles/Index.css";

const Index = () => {
  return (
    <div className="Index">
      <aside className="left">
        <h1>Categories</h1>
      </aside>
      <section>
        <h1>Recent Items</h1>
        <ItemsList />
      </section>
      <aside className="right">
        <h1>Leaderboard</h1>
      </aside>
    </div>
  );
};

export default Index;
