import { apiURL } from "../util/apiURL";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../Providers/UserProvider";
// import { useState } from "react";

const ProfilePage = () => {
  const API = apiURL();
  const [userInfo, setUserInfo] = useState([]);

  const user = useContext(UserContext);

  console.log("IN PROFILE: ")
  console.log(user)
  return (
    <div>
      {!user ? (
        <div>NOT LOGGED IN</div>
      ) : (
        <div>
            
          <h1> Name: {user.displayName}</h1>
          <br />
          <p>Email: {user.email}</p>
          <br />
          <img src={user.photoURL} alt="profilePic" />
          <br />
          UID: {user.uid}
          <br/>
          ID: {user.id}
          <br/>
          Address: {user.address}
          <br/>
          display name: {user.display_name}
          <br/>
          score: {user.score}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
