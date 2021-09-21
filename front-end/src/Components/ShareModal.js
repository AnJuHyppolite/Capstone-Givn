import { Icon } from "@iconify/react";
import "../Styles/ShareModal.css";

const url = window.location.href;
const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
const twitterURL = `https://twitter.com/intent/tweet?url=${url}`;
// const linkedInURL = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

const ShareModal = ({ item }) => {
  return (
    <div className="share-modal-container">
      <h3>Share Modal</h3>
      <p>Share this link via</p>
      <ul className="icons">
        <a
          href={facebookURL}
          // "https://facebook.com"
          target="_blank"
          rel="noreferrer"
          className="facebook"
        >
          <i class="fab fa-facebook-square"></i>
        </a>
        <a
          href={twitterURL}
          // "https://twitter.com"
          target="_blank"
          rel="noreferrer"
          className="twitter"
        >
          <i class="fab fa-twitter-square"></i>
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="instagram"
        >
          <i class="fab fa-instagram-square"></i>
        </a>
        <a
          href="https://pinterest.com"
          target="_blank"
          rel="noreferrer"
          className="pinterest"
        >
          <i class="fab fa-pinterest-square"></i>
        </a>
      </ul>
      <p>Or copy link</p>
      <div className="input">
        <Icon icon="uil:link-add" />
        <input type="text" value="example.com/share-link" />
        <button>Copy</button>
      </div>
    </div>
  );
};

export default ShareModal;
