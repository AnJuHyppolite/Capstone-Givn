import React, { useState } from "react";

const MessageForm = () => {
    const [message, setMessage] = useState({
        name: "", email: "", message: "", emailSent: false
    })
    debugger
    console.log(useState)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSend = () => {
    if (!name || !email || !message) {
      alert("Input is invalid. Please complete all the fields.");
      // TODO - send mail
    } else {
        // setMessage({
        //     name: "", email: "", message: "", emailSent: true
        // })
      setName("");
      setEmail("");
      setMessage("");
      setEmailSent(true);
    }
  };

//   handleChange = (e) => {
//     const { name, email, message } = e.target;
//      setName({ [name]: value });
//   };

// const handleChange = (e) => {
//     setSendMessage({ ...sendMessage, [e.target.id]: e.target.value });
//   };

  return (
    <div id="message-form">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        // onChange={handleChange}
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        // onChange={handleChange}
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
      />
      <label htmlFor="message">Message</label>
      <textarea
        id="message"
        // onChange={handleChange}
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      ></textarea>
      <button onClick={handleSend}>Send Message</button>
      <span className={emailSent ? "visible" : null}>
        Thank you for your message, we will be in touch!
      </span>
    </div>
  );
};

export default MessageForm;
