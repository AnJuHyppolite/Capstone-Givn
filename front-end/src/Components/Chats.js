import { useState } from "react";
import { Link } from "react-router-dom";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import "../Styles/Chats.css";

import { useAuth } from "../Providers/UserProvider";

const Chats = () => {
  const { user } = useAuth();
  console.log(user);

  const [username, setUsername] = useState("");

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  }
  let newUserData;
  user.email
    ? (newUserData = user.email)
    : (newUserData = user.providerData[0].email);

  let newUserUid;
  user.uid ? (newUserUid = user.uid) : (newUserUid = user.providerData[0].uid);

  function renderChatForm(creds) {
    return (
      <div>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => createDirectChat(creds)}>Search</button>
      </div>
    );
  }
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
          projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
          userName={newUserData}
          userSecret={newUserUid}
          renderNewChatForm={(creds) => renderChatForm(creds)}
        />
      </div>
    </div>
  );
};

export default Chats;
