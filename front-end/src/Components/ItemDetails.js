import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { apiURL } from "../util/apiURL";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { UserContext } from "../Providers/UserProvider.js";
import "../Styles/ItemDetails.css";
import "swiper/swiper-bundle.css";
import { capitalize } from "../Helpers/capitalizeName";
import facts from '../Helpers/facts'

SwiperCore.use([Navigation, Pagination]);

const ItemDetails = () => {
  const [item, setItem] = useState({});
  const API = apiURL();
  const history = useHistory()
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
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

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/items/${id}`);
      alert("Item successfully deleted")
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  }

  const {
    title,
    description,
    address,
    created_at,
    status,
    is_biodegradable,
    expiration,
    giver_id,
  } = item;
  return (
    <div>
      <h1>{capitalize(title)}</h1>
      <div className="Show">
        <section>
          <Swiper
            slidesPerView={1}
            spaceBetween={5}
            navigation
            pagination={{ clickable: true }}
          >
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
        <h3>Educational Fact:</h3> {facts.map((facts) => {
        return <p>{facts.category === item.category ? <p>{facts.fact}</p> : null}</p>
      })}
          <h2>Description</h2>
          <p>{description}</p>
          <h2>Location</h2>
          <p>{address}</p>
          <h2>Created At</h2>
          <p>{created_at}</p>
          <h2>Is Biodegradable</h2>
          <p>{is_biodegradable ? <span>Yes</span> : <span>No</span>}</p>
          <h2>Expiration</h2>
          <p>{expiration}</p>
          {user.uid === giver_id && status !== "inactive" ? (<>
            <Link to={`/posts/${item.id}/edit`}>
              <button className="editbtn">Edit</button>
            </Link>
            <button className="delbtn" onClick={handleDelete}>Delete</button>
          </>) : null}
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
