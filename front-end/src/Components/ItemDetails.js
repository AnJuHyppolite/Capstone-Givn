import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { apiURL } from "../util/apiURL";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "../Styles/ItemDetails.css";
import "swiper/swiper-bundle.css";

SwiperCore.use([Navigation, Pagination]);

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
      <h1>{title}</h1>
      <div className="Show">
        <section>
          <Swiper slidesPerView={1} spaceBetween={5} navigation pagination={{clickable: true}}>
            {photos.map((photo, index) => {
              return (
                <SwiperSlide>
                  <img src={photo.photo_url} alt={title} key={index} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </section>
        <section className="right-info">
          <h2>Description</h2>
          <p>{description}</p>
          <h2>Location</h2>
          <p>{address}</p>
          <h2>Created At</h2>
          <p>{created_at}</p>
          <h2>Is Biodegradable</h2>
          <p>
            {is_biodegradable ? <span>Yes</span> : <span>No</span>}
          </p>
          <h2>Expiration</h2>
          <p>{expiration}</p>
          <Link to={`/posts/${item.id}/edit`}>
            <button>Edit</button>
          </Link>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
