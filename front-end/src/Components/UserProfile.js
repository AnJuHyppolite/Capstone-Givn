import { apiURL } from "../util/apiURL";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const UserProfile = () => {
  const API = apiURL();
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      let res = await axios.get(`${API}/items/${id}/photos`);
      debugger;
      setPhotos(res.data);
    };
    const fecthUser = async () => {
      let res = await axios.get(`${API}/users/${id}`);
      // debugger;
      // console.log(res.data);
      setUserProfile(res.data);
    };
    fecthUser();
    fetchPhoto();
  }, [API, id]);

  // useEffect(() => {
  //   const fetchPhoto = async () => {
  //     let res = await axios.get(`${API}/items/${id}/photos`);
  //     debugger;
  //     setPhotos(res.data);
  //   };
  //   fetchPhoto();
  // }, [API, id]);

  const { email, score, display_name, photo_url, address } = userProfile;
  return (
    <div>
      <div>
        <div>
          <img src={photo_url} alt={display_name} />
          <h1>{display_name}</h1>
          <h4>{email}</h4>
          <h4>{score}</h4>
          <p>{address}</p>
        </div>
        Given Items
        {/* {photos.map((photo) => {
          return <img src={photo.photo_url} alt="imageItem" />;
        })} */}
      </div>
    </div>
  );
};

export default UserProfile;
