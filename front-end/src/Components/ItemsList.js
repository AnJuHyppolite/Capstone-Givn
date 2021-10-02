import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { apiURL } from "../util/apiURL";
import Item from "./Item";
import { UserContext } from "../Providers/UserProvider.js";
import relativeDistance from "../Helpers/relativeDistance.js";
import { MultiSelect } from 'react-multi-select-component'
const API = apiURL();

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useContext(UserContext)
  const options = [
    { label: "Electronics 💻", value: "Electronics" },
    { label: "Clothes 👕", value: "Clothes" },
    { label: "Food 🍔", value: "Food" },
    { label: "Shoes 👞", value: "Shoes" },
    { label: "Toys 🧸", value: "Toys"},
    { label: "Books 📚", value: "Books" },
    { label: "Hardware 🛠", value: "Hardware" },
    { label: "Kitchenware 🥂", value: "Kitchenware" },
    { label: "Furniture 🛋", value: "Furniture" },
    { label: "Jewelry 💎", value: "Jewelry"},
    { label: "Arts & Crafts 🎨", value: "Arts and Crafts" },
    { label: "Sports & Outdoors 🚴‍♂️", value: "Sports and Outdoors" },
    { label: "Beauty & Health 💄", value: "Beauty and Health" },
    { label: "Other 🎆", value: "Other" }
  ];

  const [selected, setSelected] = useState(options);

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

  // const handleCategories = (e) => {
  //   let target = e.target
  //   let name = target.name
  //   let value = Array.from(target.selectedOptions, option => option.value);
  //   debugger
  //   setCategories({ [name]: value })

  // }
  const handleFilter = (e) => {
    console.log(options)
    console.log(selected)
    const { value } = e.target;
    if (Number(value) === 1) { //filter by distance
      if (user?.longitude !== 0) {
        items.sort((itemA, itemB) => Number(relativeDistance(user, itemA)) - Number(relativeDistance(user, itemB)))
        setItems([...items])
      }
    }
    if (Number(value) === 2) {//filter by posted time
      let newArr = items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setItems([...newArr])
    }
  }
  
  return (
    <>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={"Select"}
      />

      <p>Filter By: </p>
      <select defaultValue="" onChange={handleFilter}>
        <option disabled></option>
        <option value={1}>Distance: nearest first</option>
        <option value={2}>Time: newly listed</option>
      </select>

      <ul className="index-items">
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
