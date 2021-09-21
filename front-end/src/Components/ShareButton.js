import "../Styles/ShareButton.css";
import ShareModal from "./ShareModal";

const ShareButton = () => {
  return (
    <div className="social-container">
      {/* <h3 id="share-header">Share Me!</h3> */}
      {/* <a href="https://facebook.com" target="_blank" rel="noreferrer" className="facebook"><i class="fab fa-facebook-square"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="twitter"><i class="fab fa-twitter-square"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="instagram"><i class="fab fa-instagram-square"></i></a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="pinterest"><i class="fab fa-pinterest-square"></i></a> */}
      <ShareModal />
    </div>
  );
};

export default ShareButton;
