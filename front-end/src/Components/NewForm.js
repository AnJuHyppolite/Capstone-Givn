import axios from "axios"
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Providers/UserProvider";
import { apiURL } from "../util/apiURL";

const NewForm = () => {
  const categories = ["Electronics", "Clothes", "Food", "Shoes", "Toys", "Books", "Hardware", "Kitchenware", "Furniture", "Jewelry", "Arts & Crafts", "Sports & Outdoors", "Beauty & Health", "Other"];
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    location: "",
    created_at: new Date().toDateString(),
    status: "active",
    is_biodegradable: false,
    expiration: 0
  });
  const [file, setFile] = useState()
  const [images, setImages] = useState([])
  const user = useContext(UserContext);
  const API = apiURL();
  const [itemID, setItemID] = useState(0)

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.id]: e.target.value });
  };

  const fileSelected = e => {
    getS3url(e)
  }

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

    //post request to server to store any extra data
    setImages([imageURL, ...images])

  }

  const postPhoto = async (itemID, newPhoto) => {
    console.log(itemID)
    console.log(newPhoto)
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

  const postItem = async () => {
    console.log(newItem)
    try {
      let res = await axios.post(`${API}/users/${user.uid}/items`, newItem);

      console.log(res.data.id)
      return res.data.id
    } catch (error) {
      console.log(error)
    }

  }

  const postPhotos = async (id) => {
    console.log("POST PHOTOS:")
    console.log(images)
    try {
      for (let i = 0; i < images.length; i++) {
        await postPhoto(id, images[i])
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = await postItem()
    await postPhotos(id)
  };

  const categoryOptions = categories.map((c, i) => {
    return <option key={i} value={c}>{c}</option>
  })
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select multiple>
          <option>Select a Category</option>
          {categoryOptions}
        </select>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={newItem.title}
          placeholder="title"
          type="text"
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={newItem.description}
          placeholder="description"
          type="text"
          onChange={handleChange}
          required
        />
        <label htmlFor="location">Location</label>
        <input
          id="location"
          value={newItem.location}
          placeholder="location"
          type="text"
          onChange={handleChange}
          required
        />
        <br />
        <br></br>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          placeholder="image"
          type="file"
          accept="image/*"
          onChange={fileSelected}
        />
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt="list"></img>
          </div>
        ))}
        <br />


        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewForm;
