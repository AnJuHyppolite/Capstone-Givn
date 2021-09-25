import axios from "axios";
import { useState, useEffect } from "react";
import { apiURL } from "../util/apiURL";
import Item from "./Item";
const API = apiURL();

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        let res = await axios.get(`${API}/items`);
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllItems();
  }, []);

  return (
    <ul>
      {items.map((item) => {
        return (
          <Item
            item={item}
            key={item.id}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
        );
      })}
    </ul>
  );
};

export default ItemsList;
