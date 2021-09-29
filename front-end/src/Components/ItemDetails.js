import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { apiURL } from "../util/apiURL";
import Carousel from "react-bootstrap/Carousel";
import "../Styles/ItemDetails.css";
// import Slider from "react-touch-drag-slider";

const ItemDetails = () => {
  const [item, setItem] = useState({});
  const API = apiURL();
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    //   let res = await axios.get(`${API}/items/${id}/photos`);
    const fetchPhoto = async () => {
      try {
        let res = await axios.get(`${API}/items/${id}/photos`);
        setPhotos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchItem = async () => {
      try {
        let res = await axios.get(`${API}/items/${id}`);
        setItem(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPhoto();
    fetchItem();
  }, [API, id]);

  const {
    title,
    description,
    address,
    created_at,
    status,
    is_biodegradable,
    expiration,
  } = item;
  return (
    <div>
      <Carousel fader >
        {photos.map((photo, index) => {
          return (
            <Carousel.Item>
              <div className="image">
                <img src={photo.photo_url} alt={title} key={index} />
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className="info">
        <h1>{title}</h1>
        <p> Description: {description}</p>
        <p>Location: {address}</p>
        <p>Created At: {created_at}</p>
        <p>Status: {status}</p>
        <p>
          Is Biodegradable:{" "}
          {is_biodegradable ? <span>Yes</span> : <span>No</span>}
        </p>
        <p>Expiration: {expiration}</p>
      </div>
      <Link to={`/posts/${item.id}/edit`}>
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default ItemDetails;
