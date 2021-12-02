import axios from "axios"
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom"
import { UserContext } from "../Providers/UserProvider";
import { apiURL } from "../util/apiURL";
import Map from "./Map";
import "../Styles/NewForm.css"
import { randomImg } from "../Helpers/randomImage"

const NewForm = () => {
  const { user } = useContext(UserContext);
  const currentdate = new Date();
  const createdTime = (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + "/" + currentdate.getFullYear() + " "
    + currentdate.getHours() + ":" + currentdate.getMinutes()
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    address: user ? (user.address === "EARTH" ? "" : user.address) : "",
    longitude: user ? user.longitude : 0,
    latitude: user ? user.latitude : 0,
    created_at: createdTime,
    category: "",
    status: "active",
    is_biodegradable: false,
    expiration: 0
  });
  const [images, setImages] = useState([])
  const API = apiURL();
  const history = useHistory()
  const categories = ['Electronics', 'Clothes', 'Food', 'Shoes', 'Toys', 'Books', 'Hardware', 'Kitchenware',
    'Furniture', 'Jewelry', 'Arts and Crafts', 'Sports and Outdoors', 'Beauty and Health', 'Other']

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.id]: e.target.value });
  };

  async function getURL() {
    const { data } = await axios.get(`${API}/s3url`)
    console.log("inside getURL function")
    console.log(data)
    return data.url;
  }

  const getS3url = async (e) => {
    const file = e.target.files[0]

    //get secure URL from server
    let url = await getURL();
    console.log(url)

    //post image directly to s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: file

    })
    const imageURL = url.split('?')[0]
    console.log(imageURL)

    //post photos to frontend
    setImages([...images, imageURL])

  }

  const postItem = async () => {
    console.log(newItem)
    try {
      let res = await axios.post(`${API}/users/${user.uid}/items`, newItem);
      return res.data.id
    } catch (error) {
      console.log(error)
    }
  }

  const postPhoto = async (itemID, newPhoto) => {
    try {
      await axios.post(`${API}/items/${itemID}/photos`, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        photo_url: newPhoto
      });
    } catch (error) {
      console.log(error)
    }
  }

  const postPhotos = async (id) => {
    try {
      for (let i = 0; i < images.length; i++) {
        await postPhoto(id, images[i])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const updateLocation = (obj) => {
    setNewItem(prevState => { return { ...prevState, 'address': obj.address, 'longitude': obj.lng, 'latitude': obj.lat } })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must have an account before posting an item")
      history.push("/")
      return;
    }
    if (!newItem['category']) {
      alert("Select a category before posting item")
      return;
    }
    if (newItem['longitude'] === 0) {
      alert("Select a address to pick up item")
      return;
    }
    const id = await postItem()
    await postPhotos(id)
    history.push("/posts")
  };

  return (
    <div className="side-by">
      <form  onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          value={newItem.title}
          placeholder="Title of item"
          type="text"
          maxLength="50"
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={newItem.description}
          placeholder="Enter a description"
          type="text"
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Category:</label>
        <select id="category" onChange={handleChange} defaultValue="Select category" required>
          <option disabled>Select category</option>
          {categories.map(category => {
            return <option key={category} value={category}>{category}</option>
          })}
        </select>

        <label htmlFor="image">Select Images to upload:</label>
        <input
          id="image"
          placeholder="image"
          type="file"
          accept="image/*"
          onChange={getS3url}
        />
        <div className="prepost-images" >
          {images.map((image, index) => (
            <img className="prepost-image" src={image} key={index} alt="list"></img>
          ))}
        </div>
        <label>Enter location to pick up item:</label>
        <Map updateLocation={updateLocation} />
        <button className="submit-item-form" type="submit">Submit</button>
      </form>
      <img src={randomImg} alt="beatiful-art" className="art-side"/>
    </div>
  );
};

export default NewForm;
