import { apiURL } from "../util/apiURL";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Providers/UserProvider";
import ProfileItem from "./ProfileItem";

const ProfilePage = () => {
  const API = apiURL();
  const history = useHistory();
  const [activeItems, setActiveItems] = useState([]);
  const [inactiveItems, setInactiveItems] = useState([]);
  const [getterRequests, setGetterRequests] = useState([]);
  const [getterPending, setGetterPending] = useState([]);
  const [giverRequests, setGiverRequests] = useState([]);
  const [giverPending, setGiverPending] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const getItems = async () => {
      try {
        let res = await axios.get(`${API}/users/${user?.uid}/items`);
        setActiveItems(res.data.filter((item) => item.status === "active"));
        setInactiveItems(res.data.filter((item) => item.status === "inactive"));
      } catch (error) {
        console.log(error);
      }
    };
    const getRequests = async () => {
      let res = await axios.get(`${API}/requests/${user?.uid}`);
      setGetterRequests(res.data.filter((request) => request.getter_id === user?.uid && request.status === "request"));
      setGetterPending(res.data.filter((request) => request.getter_id === user?.uid && request.status === "pending"));
      setGiverRequests(res.data.filter((request) => request.giver_id === user?.uid && request.status === "request"));
      setGiverPending(res.data.filter((request) => request.giver_id === user?.uid && request.status === "pending"));
    }
    getItems();
    getRequests();
  }, [API, user?.uid]);

  return (
    <div className="profile-container">
      <aside>
        <h3>Your Info</h3>
        <section>
          <img
            src={
              user?.photo_url
                ? user.photo_url
                : "https://cdn2.iconfinder.com/data/icons/flat-design-icons-set-2/256/face_human_blank_user_avatar_mannequin_dummy-512.png"
            }
            alt="profilePic"
          />
          <h2>{user?.display_name}</h2>
          <h3>{user?.email}</h3>
          <h4>{user?.address}</h4>
          <h5>Score: {user?.score} points acquired</h5>
          <button onClick={() => history.push("/profile/edit")}>
            EDIT INFORMATION
          </button>
        </section>
      </aside>
      <section className="profile-items">
        <div className="profile-items-list">
          <h3>Notifications</h3>
          <ul className="requests-list">
            {getterRequests?.length
              ? getterRequests.map((r) => (
                  <Link to={`/posts/${r.item_id}`}>
                    <li>You made a request for item: {r.title}</li>
                  </Link>
                ))
              : <h1 className="notification">No notifications yet</h1>}
            {getterPending?.length
              ? getterPending.map((r) => (
                  <Link to={`/posts/${r.item_id}`}>
                    <li>Owner of {r.title} wants you to pick up item</li>
                  </Link>
                ))
              : null}
            {giverRequests?.length
              ? giverRequests.map((r) => (
                  <Link to={`/posts/${r.item_id}`}>
                    <li className="giver-req">
                      {r.display_name} made a request for your item: {r.title}
                    </li>
                  </Link>
                ))
              : null}
            {giverPending?.length
              ? giverPending.map((r) => (
                  <Link to={`/posts/${r.item_id}`}>
                    <li>
                      {r.display_name} is on his way to pick up your item:{" "}
                      {r.title}
                    </li>
                  </Link>
                ))
              : null}
          </ul>
          <h3>Active Items</h3>
          <div className="active-items">
            {activeItems.length === 0 ? (
              <h1>You do not have any active items yet...</h1>
            ) : (
              activeItems.map((item) => <ProfileItem item={item} key={item} />)
            )}
          </div>
          <h3>Inactive Items</h3>
          <div className="inactive-items">
            {inactiveItems.length === 0 ? (
              <h1>You do not have any inactive items yet...</h1>
            ) : (
              inactiveItems.map((item) => (
                <ProfileItem item={item} key={item} />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
