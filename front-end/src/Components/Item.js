import { Link } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../util/apiURL.js";
import { useEffect, useState } from "react";
import ShareButton from "./ShareButton.js";
import getElapsedPostedTime from "../Helpers/elapsedTime.js";
import relativeDistance from "../Helpers/relativeDistance.js";

const API = apiURL();

const Item = ({ user, item, modalIsOpen, setModalIsOpen }) => {
  const [photos, setPhotos] = useState([]);
  const [itemUser, setItemUser] = useState({});
  const [distance, setDistance] = useState(undefined)

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
        if(user?.longitude !== 0){
          setDistance(relativeDistance(user,res.data))
        } 
      } catch (error) {
        console.log(error);
      }
    };
    getUserForItem();
  }, [item.giver_id, user]);

  return (
    <li>
      <div className="top">
        <div className="top-container">
          <img
            src={
              itemUser.photo_url
                ? itemUser.photo_url
                : "https://cdn2.iconfinder.com/data/icons/flat-design-icons-set-2/256/face_human_blank_user_avatar_mannequin_dummy-512.png"
            }
            alt="user-portrait"
          />
          <div>
            <h3>{itemUser.display_name}</h3>
            <h5>
              {getElapsedPostedTime(item.created_at)} <br/> 
              {distance!==undefined ? distance + " miles away" : item.address.substring(0, item.address.length-21)}
            </h5>
          </div>
        </div>
      </div>
      <Link to={`/posts/${item.id}`}>
        <h2>{item.title}</h2>
        <img src={photos[0]?.photo_url} alt="imageItem" />
      </Link>
      <div className="btns">
        <button onClick={() => setModalIsOpen(true)}>
          {" "}
          <i className="fas fa-share"></i>
        </button>
        <button>
          {" "}
          <i className="fas fa-heart"></i>
        </button>
        <button>
          {" "}
          <i className="fas fa-comment-alt"></i>
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
