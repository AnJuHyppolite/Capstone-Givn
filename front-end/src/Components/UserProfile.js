import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import UserItems from "./UserItems";
import { apiURL } from "../util/apiURL";
import "../Styles/UserProfile.css";

const UserProfile = () => {
  const API = apiURL();
  const { id } = useParams();
  const [userProfile, setUserProfile] = useState({});
  const [activeItems, setActiveItems] = useState([]);
  const [inactiveItems, setInactiveItems] = useState([]);

  useEffect(() => {
    const fetchPhoto = async () => {
      let res = await axios.get(`${API}/users/${id}/items`);
      setActiveItems(res.data.filter((item) => item.status === "active"));
      setInactiveItems(res.data.filter((item) => item.status === "inactive"));
    };
    const fecthUser = async () => {
      let res = await axios.get(`${API}/users/${id}`);
      setUserProfile(res.data);
    };
    fecthUser();
    fetchPhoto();
  }, [API, id]);

  const { email, score, display_name, photo_url, address } = userProfile;
  return (
    <section className="Profile">
      <div>
        <section>
          <img src={photo_url} alt={display_name} />
          <h2>{display_name}</h2>
          <h3>{email}</h3>
          <div>
            <h3>
              {address} | Score(s): {score}
            </h3>
          </div>
        </section>
        <div className="profile-items-list">
          <h3>Active Items</h3>
          <div className="active-items">
            {activeItems.length === 0 ? (
              <h1>You do not have any active items yet...</h1>
            ) : (
              activeItems.map((item) => <UserItems item={item} key={item} />)
            )}
          </div>
          <h3>Inactive Items</h3>
          <div className="inactive-items">
            {inactiveItems.length === 0 ? (
              <h1>You do not have any inactive items yet...</h1>
            ) : (
              inactiveItems.map((item) => (
                <UserItems item={item} key={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default UserProfile;
