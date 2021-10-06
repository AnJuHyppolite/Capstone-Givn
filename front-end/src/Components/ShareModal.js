import { useState, useRef}  from "react";
import { Icon } from "@iconify/react";
import "../Styles/ShareModal.css";

const ShareModal = () => {
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
      <h1>Share this link via</h1>
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
      <h2>Or copy link</h2>
      <div className="input">
        <Icon icon="uil:link-add" className="copy-icon"/>
        <textarea ref={textAreaRef} value={url} readOnly/>
        <button onClick={handleCopy} className="copy-btn">Copy</button>
        {copy}
      </div>
    </div>
  );
};

export default ShareModal;
