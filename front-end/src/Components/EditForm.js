import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../Providers/UserProvider";
import { apiURL } from "../util/apiURL";
import "../Styles/NewForm.css";
import Map2 from "./Map2";
import { randomImg } from "../Helpers/randomImage";

const EditForm = () => {
  const { user } = useContext(UserContext);
  const API = apiURL();
  const history = useHistory();
  let { id } = useParams();
  const [images, setImages] = useState([]);
  const [numOfNewImages, setNumOfNewImages] = useState(0);
  const [editItem, setEditItem] = useState({
    title: "",
    description: "",
    address: "",
    longitude: 0,
    latitude: 0,
    created_at: "",
    category: "",
    status: "",
    is_biodegradable: false,
    expiration: 0,
  });
  const categories = [
    "Electronics",
    "Clothes",
    "Food",
    "Shoes",
    "Toys",
    "Books",
    "Hardware",
    "Kitchenware",
    "Furniture",
    "Jewelry",
    "Arts and Crafts",
    "Sports and Outdoors",
    "Beauty and Health",
    "Other",
  ];

  useEffect(() => {
    const getItem = async () => {
      try {
        const res = await axios.get(`${API}/items/${id}`);
        setEditItem(res.data);
      } catch (error) {
        return error;
      }
    };

    const getImages = async () => {
      try {
        const res = await axios.get(`${API}/items/${id}/photos`);
        setImages(res.data.map((obj) => obj.photo_url));
      } catch (error) {
        return error;
      }
    };
    getItem();
    getImages();
  }, [id, API]);

  const handleChange = (e) => {
    setEditItem({ ...editItem, [e.target.id]: e.target.value });
  };

  const getURL = async () =>{
    const { data } = await axios.get(`${API}/s3url`);
    return data.url;
  }

  const getS3url = async (e) => {
    setNumOfNewImages(numOfNewImages + 1);
    const file = e.target.files[0];

    //get secure URL from server
    let url = await getURL();
  
    //post image directly to s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
    const imageURL = url.split("?")[0];

    //post photos to frontend
    setImages([imageURL, ...images]);
  };

  const postItem = async () => {
    try {
      await axios.put(`${API}/users/${user.uid}/items/${id}`, editItem);
      //return res.data.id  // we already have id with useParams
    } catch (error) {
      return error;
    }
  };

  const postPhoto = async (itemID, newPhoto) => {
    try {
      await axios.post(`${API}/items/${itemID}/photos`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        photo_url: newPhoto,
      });
    } catch (error) {
      return error;
    }
  };

  const postPhotos = async (id) => {
    try {
      for (let i = 0; i < numOfNewImages; i++) {
        await postPhoto(id, images[i]);
      }
    } catch (error) {
      return error;
    }
  };

  const updateLocation = (obj) => {
    setEditItem((prevState) => {
      return {
        ...prevState,
        address: obj.address,
        longitude: obj.lng,
        latitude: obj.lat,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must have an account before posting an item");
      history.push("/");
      return;
    }
    if (!editItem["category"]) {
      alert("Select a category before posting item");
      return;
    }
    if (editItem["longitude"] === 0) {
      alert("Select a address to pick up item");
      return;
    }
    await postItem();
    await postPhotos(id);
    history.push("/posts");
  };

  return (
    <div className="side-by">
      <form className="newForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Edit item: </label>
        <input
          id="title"
          value={editItem.title}
          placeholder="title of item"
          type="text"
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={editItem.description}
          placeholder="description"
          type="text"
          onChange={handleChange}
          required
        />
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          onChange={handleChange}
          value={editItem.category}
          required
        >
          <option disabled>Select category</option>
          {categories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
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
        <div className="prepost-images">
          {images.map((image, index) => (
            <img
              className="prepost-image"
              src={image}
              key={index}
              alt="list"
            ></img>
          ))}
        </div>
        <label>Enter location to pick up item:</label>
        {editItem.latitude ? (
          <Map2 editItem={editItem} updateLocation={updateLocation} />
        ) : null}

        <button className="submit-item-form" type="submit">
          Submit
        </button>
      </form>
      <img src={randomImg} alt="beatiful-art" className="art-side" />
    </div>
  );
};

export default EditForm;
