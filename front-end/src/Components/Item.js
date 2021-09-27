import { Link } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../util/apiURL.js";
import { useEffect, useState } from "react";
import ShareButton from "./ShareButton.js";
import getElapsedPostedTime from "../Helpers/ElapsedTime.js";

const API = apiURL();

const Item = ({ item, modalIsOpen, setModalIsOpen }) => {
  const [photos, setPhotos] = useState([]);
  const [itemUser, setItemUser] = useState({});

  useEffect(() => {
    const getPhotos = async () => {
      try {
        let res = await axios.get(`${API}/items/${item.id}/photos`);
        setPhotos(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPhotos();
  }, [item.id]);

  useEffect(() => {
    const getUserForItem = async () => {
      try {
        const res = await axios.get(`${API}/users/${item.giver_id}`);
        setItemUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserForItem();
  }, [item.giver_id]);

  return (
    <li>
      <div className="top">
        <div className="top-container">
          <img
            src={itemUser.photo_url ? itemUser.photo_url : "https://cdn2.iconfinder.com/data/icons/flat-design-icons-set-2/256/face_human_blank_user_avatar_mannequin_dummy-512.png"}
            alt="user-portrait"
          />
          <div>
            <h3>{itemUser.display_name}</h3>
            <h5>
              {getElapsedPostedTime(item.created_at)} <br/>({item.address.substring(0, item.address.length-21)})
            </h5>
          </div>
        </div>
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <Link to={`/posts/${item.id}`}>
        <h2>{item.title}</h2>
        <img src={photos[0]?.photo_url} alt="imageItem" />
      </Link>
      {item.is_biodegradable ? (
        <p>Expiring In: {item.expiration} (day(s))</p>
      ) : null}
      <h6>
        {" "}
        <i className="fas fa-leaf"></i> Paper accounts for 25% of landfill waste and
        33% of municipal waste. By getting this item, you help to save the
        enviroment.
      </h6>
      <div className="btns">
        <button onClick={() => setModalIsOpen(true)}>
          {" "}
          <i className="fas fa-share"></i> Share
        </button>
        <button>
          {" "}
          <i className="fas fa-heart"></i> Interested
        </button>
        <button>
          {" "}
          <i className="fas fa-comment-alt"></i> Message
        </button>
      </div>
      <ShareButton
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        className={!modalIsOpen ? "share" : null}
      />
    </li>
  );
};

export default Item;
