import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../util/apiURL.js";
import { useEffect, useState } from "react";
import ShareButton from "./ShareButton.js";

const API = apiURL();
console.log(API);

const Item = ({ item, modalIsOpen, setModalIsOpen }) => {
  const [photos, setPhotos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getPhotos = async () => {
      try {
        let res = await axios.get(`${API}/items/${item.id}/photos`);
        console.log(res);
        setPhotos(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPhotos();
  }, []);

  return (
    <li>
      <div>
        <h5>
          {item.created_at} ({item.address})
        </h5>
      </div>
      <Link to={`/posts/${item.id}`}>
        <h1>{item.title}</h1>
        <img src={photos[0]?.photo_url} alt="imageItem" />
      </Link>
      <p>Expiring In: {item.expiration} (day(s))</p>
      <p>Recycling is good!</p>
      <div>
        <ShareButton
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
        <button onClick={() => setModalIsOpen(true)}>Share</button>
        <button>Interested</button>
        <Link to={`/posts/${item.id}/message`}>
          <button>Message</button>
        </Link>
      </div>
    </li>
  );
};

export default Item;
