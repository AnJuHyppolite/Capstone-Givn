import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <li>
      <div>
        <h5>
          {item.created_at} ({item.location})
        </h5>
      </div>
      <Link to={`/posts/${item.id}`}>
        <h1>{item.title}</h1>
        <img
          src="https://cb.scene7.com/is/image/Crate/11BottleWineRackBlckGrphtSHF17/$web_pdp_main_carousel_high$/190411134606/11-bottle-graphite-wine-rack.jpg"
          alt="item"
        />
      </Link>
      <p>Expiring In: {item.expiration} (day(s))</p>
      <p>Recycling is good!</p>
      <div>
        <Link to={`/share/${item.id}`}><button>Share</button></Link>
        <button>Interested</button>
        <button>Message</button>
      </div>
    </li>
  );
};

export default Item;
