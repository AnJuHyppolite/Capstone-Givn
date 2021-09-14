import { apiURL } from "../util/apiURL";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../Providers/UserProvider";
// import { useState } from "react";

const ProfilePage = () => {
  const API = apiURL();
  const [userInfo, setUserInfo] = useState([]);

  const user = useContext(UserContext);
  const userData = useContext(UserContext);

  console.log("IN PROFILE: ");
  console.log(user);
  return (
    <div>
      {!user ? (
        <div>NOT LOGGED IN</div>
      ) : (
        <section>
          <img src={user.photoURL} alt="profilePic" />
          <h2>{user.display_name}</h2>
          <h3>{user.email}</h3>
          <hr/>
          <div>
            <h3>{user.address} | Score: {user.score}</h3>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfilePage;
