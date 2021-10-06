import "../Styles/ShareButton.css";
import ShareModal from "./ShareModal";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ShareButton = ({ modalIsOpen, setModalIsOpen }) => {
  return (
    <div className="social-container">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "grey",
          },
        }}
      >
        <button onClick={() => setModalIsOpen(false)} className="close-btn"><i class="fas fa-times"></i></button>
        <ShareModal />
      </Modal>
    </div>
  );
};

export default ShareButton;
