import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../util/apiURL";
import { Link } from "react-router-dom";

const UserItems = ({ item }) => {
  const API = apiURL();
  const [photos, setPhotos] = useState([])
  
  useEffect(() => {
    const getPhotos = async () => {
        try {
            let res = await axios.get(`${API}/items/${item.id}/photos`);
            setPhotos(res.data)
        } catch (error) { console.log(error) }
    }
    getPhotos()
}, [API, item?.id])

  return (
    <div className="profile-item">
      <Link to={`/posts/${item.id}`}>
        <p>{item.title}</p>
        <img
          className="profile-item-image"
          src={
            photos[0]?.photo_url
              ? photos[0].photo_url
              : "https://cdn.iconscout.com/icon/premium/png-256-thumb/use-item-994788.png"
          }
          alt={item.title}
        />
      </Link>
    </div>
  );
};

export default UserItems;
