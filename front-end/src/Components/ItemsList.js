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
  const [cateogires, setCategories] = useState({cateogires: []})
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
    let target = e.target
		let name = target.name
    //here
    let value = Array.from(target.selectedOptions, option => option.value);
    debugger
    setCategories({[name]: value})
    //setCategories([...cateogires, [name]: value])
      // [name]: value
  }
  const handleFilter = (e) => {
    const { value } = e.target;
    if (Number(value) === 1) { //filter by distance
      if( user?.longitude !== 0){
        items.sort((itemA, itemB)=> Number(relativeDistance(user,itemA)) - Number(relativeDistance(user,itemB)) )
      setItems([...items])
    }
  }
  if (Number(value) === 2) {//filter by posted time
    let newArr = items.sort((a,b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
       setItems([...newArr])
  }
  }

  return (
    <>
    <p>Categories: </p>
      <select onChange={handleCategories} defaultValue={cateogires.cateogires} name="categories" multiple={true} value={cateogires.cateogires}>
        <option disabled></option>
        <option value="Electronics">Electronics</option>
        <option value="Clothes">Clothes</option>
        <option value="Food">Food</option>
        <option value="Shoes">Shoes</option>
        <option value="Toys">Toys</option>
        <option value="Books">Books</option>
        <option value="Hardware">Hardware</option>
        <option value="Kitchenware">Kitchenware</option>
        <option value="Furniture">Furniture</option>
        <option value="Jewelry">Jewelry</option>
        <option value="Arts and Crafts">Arts and Crafts</option>
        <option value="Sports and Outdoors">Sports and Outdoors</option>
        <option value="Beauty and Health">Beauty and Health</option>
        <option value="Other">Other</option>
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
