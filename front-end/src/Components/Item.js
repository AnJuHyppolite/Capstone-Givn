import { Link } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../util/apiURL.js";
import { useEffect, useState } from "react";
import ShareButton from "./ShareButton.js";
import getElapsedPostedTime from "../Helpers/ElapsedTime.js";
import relativeDistance from "../Helpers/relativeDistance.js";
import { strShortener } from "../Helpers/truncate.js";
import { capitalize } from "../Helpers/capitalizeName.js";
import facts from "../Helpers/facts";

const API = apiURL();

const Item = ({ user, item, modalIsOpen, setModalIsOpen }) => {
  const [photos, setPhotos] = useState([]);
  const [itemUser, setItemUser] = useState({});
  const [distance, setDistance] = useState(undefined);
  const [randomfact, setRandomFact] = useState("");

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
    const getDistanceforItem = async()=>{
      try {
        const res = await axios.get(`${API}/items/${item.id}`);
        if (user?.longitude !== 0) {
          setDistance(relativeDistance(user, res.data));
        }
      } catch (error) {
        console.log(error);
      }
    }

    const getUserForItem = async () => {
      try {
        const res = await axios.get(`${API}/users/${item.giver_id}`);
        setItemUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDistanceforItem();
    getUserForItem();
  }, [item.giver_id, user]);

  useEffect(() => {
    const filteredFacts = facts.filter((factObj) => {
      if(factObj.category === item.category) {
        return factObj.facts
      }
    });
    console.log(filteredFacts)
    const randomNumber = Math.floor(Math.random() * filteredFacts[0].facts.length)
    setRandomFact(filteredFacts[0].facts[randomNumber])
  }, []);

  return (
    <li className="index-item">
      <div className="top">
        <div className="top-container">
          <Link to={`/profile/${item.giver_id}`}>
            <img
              src={
                itemUser.photo_url
                  ? itemUser.photo_url
                  : "https://cdn2.iconfinder.com/data/icons/flat-design-icons-set-2/256/face_human_blank_user_avatar_mannequin_dummy-512.png"
              }
              alt="user-portrait"
            />
          </Link>
          <div>
            <h3>{capitalize(strShortener(itemUser?.display_name, 16))}</h3>
            <h5>
              {distance !== undefined
                ? distance + " miles away"
                : strShortener(item.address, 28)}
            </h5>
            <h4>{getElapsedPostedTime(item.created_at)}</h4>
          </div>
        </div>
      </div>
      <Link to={`/posts/${item.id}`}>
        <h2>{capitalize(strShortener(item?.title, 24))}</h2>
        <img src={photos[0]?.photo_url} alt="imageItem" />
      </Link>
      <h3 className="facts">
        <i className="fas fa-leaf"></i> Educational Fact:
      </h3>
      <p>
      {`"${strShortener(randomfact, 175)}"`}
        {/* {facts.map((fact) => {
          return fact.category === item.category
            ? `"${strShortener(fact.fact, 175)}"`
            : null;
        })} */}
      </p>
      <div className="btns">
        <button onClick={() => setModalIsOpen(true)}>
          {" "}
          <i className="fas fa-share"></i>
        </button>
        <button>
          {" "}
          <i className="fas fa-heart"></i>
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
