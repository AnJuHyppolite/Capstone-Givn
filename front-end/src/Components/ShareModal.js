import { useState, useRef}  from "react";
import { Icon } from "@iconify/react";
import "../Styles/ShareModal.css";

const ShareModal = ({ item }) => {
  const [copy, setCopy] = useState("");
  const textAreaRef = useRef(null);

  const handleCopy = (e) => {
    textAreaRef.current.select();
      document.execCommand('copy');
    e.target.focus()
    setCopy("Copied!")
  };

  const url = window.location.href;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const twitterURL = `https://twitter.com/intent/tweet?url=${url}`;

  return (
    <div className="share-modal-container">
      <h3>Share Modal</h3>
      <p>Share this link via</p>
      <ul className="icons">
        <a
          href={facebookURL}
          target="_blank"
          rel="noreferrer"
          className="facebook"
        >
          <i className="fab fa-facebook-square"></i>
        </a>
        <a
          href={twitterURL}
          target="_blank"
          rel="noreferrer"
          className="twitter"
        >
          <i className="fab fa-twitter-square"></i>
        </a>
      </ul>
      <p>Or copy link</p>
      <div className="input">
        <Icon icon="uil:link-add" />
        <textarea ref={textAreaRef} value={url} />
        <button onClick={handleCopy}>Copy</button>
        {copy}
      </div>
    </div>
  );
};

export default ShareModal;
