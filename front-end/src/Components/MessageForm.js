import React, { useState } from "react";

const MessageForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSend = () => {
    if (!name || !email || !message) {
      alert("Input is invalid. Please complete all the fields.");
      // TODO - send mail
    } else {
      setName("");
      setEmail("");
      setMessage("");
      setEmailSent(true);
    }
  };

  return (
    <div id="message-form">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      ></textarea>
      <button onClick={handleSend}>Send Message</button>
      <span className={emailSent ? "visible" : null}>
        Thank you for your message, we will be in touch in no time!
      </span>
    </div>
  );
};

export default MessageForm;
