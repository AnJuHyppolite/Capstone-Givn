import axios from "axios";
import { useState, useEffect } from "react";
import { apiURL } from "../util/apiURL";
import Item from "./Item";
const API = apiURL();

const ItemsList = () => {
  const [items, setItems] = useState([]);

  const fetchAllItems = async () => {
    try {
      let res = await axios.get(`${API}/items`);
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <section>
      <ul>
        {items.map((item) => {
          return <Item  item={item} key={item.id}/>;
        })}
      </ul>
    </section>
  );
};

export default ItemsList;
