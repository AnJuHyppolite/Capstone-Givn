import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { apiURL } from "../util/apiURL";
import Item from "./Item";
import { UserContext } from "../Providers/UserProvider.js";
import relativeDistance from "../Helpers/relativeDistance.js";
import { MultiSelect } from "react-multi-select-component";
const API = apiURL();

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { user } = useContext(UserContext);
  const options = [
    { label: "Electronics 💻", value: "Electronics" },
    { label: "Clothes 👕", value: "Clothes" },
    { label: "Food 🍔", value: "Food" },
    { label: "Shoes 👞", value: "Shoes" },
    { label: "Toys 🧸", value: "Toys" },
    { label: "Books 📚", value: "Books" },
    { label: "Hardware 🛠", value: "Hardware" },
    { label: "Kitchenware 🥂", value: "Kitchenware" },
    { label: "Furniture 🛋", value: "Furniture" },
    { label: "Jewelry 💎", value: "Jewelry" },
    { label: "Arts & Crafts 🎨", value: "Arts and Crafts" },
    { label: "Sports & Outdoors 🚴‍♂️", value: "Sports and Outdoors" },
    { label: "Beauty & Health 💄", value: "Beauty and Health" },
    { label: "Other 🎆", value: "Other" },
  ];

  const [selected, setSelected] = useState(options);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        let res = await axios.get(`${API}/items`);
        setItems(res.data.filter(item=>item.status !== "inactive"));
        setFilteredItems(res.data.filter(item=>item.status !== "inactive"));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllItems();
  }, []);

  useEffect(() => {
    let selectedCategories = selected.map((e) => e.value);
    setFilteredItems(
      items.filter((item) => {
        return selectedCategories.includes(item.category);
      })
    );
  }, [selected, items]);

  const handleFilter = (e) => {
    const { value } = e.target;
    if (Number(value) === 1) {

      if(!user?.address){
        return;
      }
      //filter by distance
      if (user?.longitude !== 0) {
        filteredItems.sort(
          (itemA, itemB) =>
            relativeDistance(user, itemA) - relativeDistance(user, itemB)
        );
        setFilteredItems([...filteredItems]);
      }
    }
    if (Number(value) === 2) {
      //filter by posted time
      let newArr = filteredItems.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setFilteredItems([...newArr]);
    }
  };

  return (
    <>
      <div className="filters">
        <div className="categories">
          <p>Categories: </p>
          <MultiSelect
            options={options}
            value={selected}
            disableSearch={true}
            shouldToggleOnHover={false}
            onChange={setSelected}
          />
        </div>
        <div>
          <p>Filter By: </p>
          <select defaultValue="" onChange={handleFilter} className="filter" >
            <option disabled>Select a filter</option>
            <option value={1}>Distance: nearest first</option>
            <option value={2}>Time: newly listed</option>
          </select>
        </div>
      </div>
      <h1>Recent Items</h1>
      <ul className="index-items">
        {filteredItems.map((item) => {
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
