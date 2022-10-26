import { useState } from "react";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import { useAuth } from "../Providers/UserProvider";
import "../Styles/Chat.css";

const Chat = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");

  const createDirectChat = (creds) => {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  };

  if (!user) return <h1>Loading...</h1>;

  const newUserData = user.email ? user.email : user.providerData[0].email;

  const newUserUid = user.uid ? user.uid : user.providerData[0].uid;

  const renderChatForm = (creds) => {
    return (
      <div>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="search-btn" onClick={() => createDirectChat(creds)}>
          <i class="fas fa-search"></i>
        </button>
      </div>
    );
  };
  return (
    <div>
      <div className="chat-page">
        <ChatEngine
         height='90vh'
          projectID='09e44eed-b926-4ab7-8d6c-26abe921dfba'
          userName={newUserData}
          userSecret={newUserUid}
          renderNewChatForm={(creds) => renderChatForm(creds)}
        />
      </div>
    </div>
  );
};

export default Chat;
