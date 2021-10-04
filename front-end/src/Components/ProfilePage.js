import { apiURL } from "../util/apiURL";
import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { UserContext } from "../Providers/UserProvider";
import ProfileItem from "./ProfileItem";

const ProfilePage = () => {
  const API = apiURL();
  const history = useHistory();
  const [activeItems, setActiveItems] = useState([]);
  const [inactiveItems, setInactiveItems] = useState([]);

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
    getItems();
  }, [API, user?.uid]);

  return (
    <div>
      {!user ? (
        <div>NOT LOGGED IN</div>
        ) : (
          <div>
          <section>
            <img
              src={
                user?.photo_url
                  ? user.photo_url
                  : "https://cdn2.iconfinder.com/data/icons/flat-design-icons-set-2/256/face_human_blank_user_avatar_mannequin_dummy-512.png"
              }
              alt="profilePic"
            />
            <h2>{user.display_name}</h2>
            <h3>{user.email}</h3>
            <hr />
            <div>
              <h3>
                {user.address} | Score: {user.score}
              </h3>
            </div>
            <button onClick={() => history.push("/profile/edit")}>
              EDIT INFORMATION
            </button>
          </section>
        </div>
      )}

      <div className="profile-items-list">
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
            inactiveItems.map((item) => <ProfileItem item={item} key={item} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
