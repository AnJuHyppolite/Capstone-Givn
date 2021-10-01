import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiURL } from "../util/apiURL";
import Item from "./Item";
const API = apiURL();

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
  // const [emailSent, setEmailSent] = useState(false);
  //const [photos, setPhotos] = useState([])
  //const [itemIDs, setItemIDs] = useState([])

  const fetchAllItems = async () => {
    try {
      let res = await axios.get(`${API}/items`);
      setItems(res.data);
      //setItemIDs(res.data)
      //console.log(itemIDs)
    } catch (error) {
      console.log(error);
    }
  };

  // const getPhotos = async () => {
  //   try {
  //     debugger
  //     let res = await axios.get(`${API}/items/${itemIDs}/photos`);
  //     debugger
  //     console.log(res);
  //     setPhotos(res.data);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    fetchAllItems();
    //getPhotos();
  }, []);

  return (
    <section>
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
    </section>
  );
};

export default ItemsList;
