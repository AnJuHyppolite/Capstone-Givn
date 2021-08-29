import { useState } from "react";

const NewForm = () => {
  const [newItem, setNewItem] = useState({
    title: "",
    image: "",
    description: "",
    location: "",
    category: "",
  });

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select>
          <option>Select a category</option>
        </select>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={newItem.title}
          placeholder="title"
          type="text"
          onChange={handleChange}
        />
        <label htmlFor="image">Image</label>
        <input
          id="image"
          value={newItem.image}
          placeholder="image"
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewForm;
