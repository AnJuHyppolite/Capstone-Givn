import "../Styles/ShareButton.css";
import ShareModal from "./ShareModal";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root");

const ShareButton = ({ modalIsOpen,setModalIsOpen }) => {
  return (
    <div className="social-container">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "grey",
          },
          content: {
            color: "orange",
          },
        }}
      >
        <ShareModal />
        <button onClick={() => setModalIsOpen(false)}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default ShareButton;
