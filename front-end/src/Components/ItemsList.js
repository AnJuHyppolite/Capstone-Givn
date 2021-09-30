import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { apiURL } from "../util/apiURL";
import Item from "./Item";
import { UserContext } from "../Providers/UserProvider.js";
import relativeDistance from "../Helpers/relativeDistance.js";
const API = apiURL();

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useContext(UserContext)

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

  const handleCategories = (e) => {
    const { value } = e.target;
  }
  const handleFilter = (e) => {
    const { value } = e.target;
    if (Number(value) === 1) { //filter by distance
      if( user?.longitude !== 0){
        items.sort((itemA, itemB)=> Number(relativeDistance(user,itemA)) - Number(relativeDistance(user,itemB)) )
      setItems([...items])
      debugger
    }
  }
  if (Number(value) === 2) {//filter by posted time
    debugger
    let newArr = items.sort((a,b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
       setItems([...newArr])
  }
  }

  return (
    <>
    <p>Categories: </p>
      <select defaultValue="" onChange={handleCategories}>
        <option disabled></option>
        <option>Electronics</option>
        <option>Clothes</option>
        <option>Food</option>
        <option>Shoes</option>
        <option>Toys</option>
        <option>Books</option>
        <option>Hardware</option>
        <option>Kitchenware</option>
        <option>Furniture</option>
        <option>Jewelry</option>
        <option>Arts and Crafts</option>
        <option>Sports and Outdoors</option>
        <option>Beauty and Health</option>
        <option>Other</option>
      </select>

    <p>Filter BY: </p>
      <select defaultValue="" onChange={handleFilter}>
      <option disabled></option>
        <option value={1}>Distance: nearest first</option>
        <option value={2}>Time: newly listed</option>
      </select>

      <ul>
        {items.map((item) => {
          return (

            <Item
              user={user}
              item={item}
              key={item.id}
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ItemsList;
