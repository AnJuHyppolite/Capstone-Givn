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
  const [filterNumber, setFilterNumber] = useState(1)
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
        setItems(res.data.filter(item => item.status !== "inactive"));
        setFilteredItems(res.data.filter(item => item.status !== "inactive"));

      } catch (error) {
        console.log(error);
      }
    };
    fetchAllItems();
  }, []);

  useEffect(() => {
    let selectedCategories = selected.map((e) => e.value);
    let filteredCategories = items.filter((item) => selectedCategories.includes(item.category))
    if (filterNumber === 1) sortByDistance(filteredCategories)
    if (filterNumber === 2) sortByTime(filteredCategories)
    // eslint-disable-next-line 
  }, [selected, items, filterNumber]); 

  const sortByDistance = (arr = filteredItems) => {
    if (!user?.address || !user?.longitude) {
      setFilteredItems([...arr])
      return;
    }
      arr.sort(
        (itemA, itemB) =>
          relativeDistance(user, itemA) - relativeDistance(user, itemB)
      );
      setFilteredItems([...arr]);
  }

  const sortByTime = (arr=filteredItems) => {
    let newArr = arr.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    setFilteredItems([...newArr]);
  }

  const handleFilter = (e) => {
    const { value } = e.target;
    if (Number(value) === 1) {
      setFilterNumber(1)
      sortByDistance()
    }
    if (Number(value) === 2) {
      setFilterNumber(2)
      sortByTime()
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
            onChange={e => { setSelected(e); sortByDistance() }}
          />
        </div>
        <div>
          <p>Filter By: </p>
          <select onChange={handleFilter} className="filter" >
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
