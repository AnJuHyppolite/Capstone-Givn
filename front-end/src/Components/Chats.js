import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import "../Styles/Chats.css";

import { useAuth } from "../Providers/UserProvider";
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  console.log(user);
  const [loading, setLoading] = useState(true);

  //   const getFile = async (url) => {
  //     const response = await fetch(url);
  //     const data = await response.blob();

  //     return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  //   };

  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        // getFile(user.photoURL).then((avatar) => {
        //   formdata.append("avatar", avatar, avatar.name);

        axios
          .post("https://api.chatengine.io/users/", formdata, {
            headers: {
              "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY,
            },
          })
          .then(() => setLoading(false))
          .catch((error) => console.log(error));
        // });
      });
  }, [user, history]);

  // const LogoutHandler =async()=>{
  //    await auth.signOut();
  //     history.push('/');
  // }

  if (!user || loading) return "Loading ...";

  return (
    <div>
      <div className="chat-page">
        <div className="nav-bar">
          <Link to="/posts">
            <button className="exit-tab">Exit</button>
          </Link>
        </div>
        <ChatEngine
          height="calc(1000vh-100px)"
          projectID="17fbc9ac-063f-48b0-a912-078d00ccbead"
          userName={user.email}
          userSecret={user.uid}
        />
      </div>
    </div>
  );
};

export default Chats;
