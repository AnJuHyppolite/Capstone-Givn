import { useState } from "react";

const NewForm = () => {
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    created_at: "",
    status: "active",
    is_biodegradable: false,
    expiration: 0
  });
  const [file, setFile] = useState()
  const [images, setImages] = useState([])

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.id]: e.target.value });
  };

  const fileSelected = e => {
    const file = e.target.files[0]
    setFile(file)
    setImages([...images, file.name])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select>
          <option>Select a Category</option>
          <option>Electronics</option>
          <option>Clothes</option>
          <option>Food</option>
          <option>Shoes</option>
        </select>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={newItem.title}
          placeholder="title"
          type="text"
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          value={newItem.description}
          placeholder="description"
          type="text"
          onChange={handleChange}
        />
        <label htmlFor="location">Location</label>
        <input
          id="location"
          value={newItem.location}
          placeholder="location"
          type="text"
          onChange={handleChange}
        />
        <br></br>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          placeholder="image"
          type="file"
          accept="image/*"
          onChange={fileSelected}
        />
        <ul>{images.map(image => (
          <li>{image}</li>
        ))}
        </ul>
        <br />


        <br></br>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewForm;
