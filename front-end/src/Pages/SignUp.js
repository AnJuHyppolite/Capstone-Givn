import { signUp } from "../Services/Firebase";
import {  useState } from "react";
import { useHistory } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,

} from "../Services/Firebase";
import { randomImg } from "../Helpers/randomImage";
import google from "../Assets/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png";
import "../Styles/Home.css";

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const history = useHistory();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      //sign up with firebase and send results to our backend
      try {
        if (password === confirmPassword) {
          await signUp(email, password);
          history.push("/");
        } else {
          alert("Your password is not matching with your confirmation.")
        }
      } catch (error) {
        alert(error)
      }
    };

    const handleSignIn = () => {
      signInWithGoogle();
      history.push("/posts")
    };
  
    return (
      <div className="Home">
      <section className="left-side">
        <h1>GIVN</h1>
        <h2>
          We educate, encourage, and incentivize users to give away their
          unwanted goods to other users who are seeking them.
        </h2>
        <h3>"Save the planet one item at a time."</h3>
      </section>
      <section className="right-side">
        <img src={randomImg} alt="bg-login-form" />
        <form onSubmit={handleSubmit} className="login">
          <h1>Enter your account</h1>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <hr />
          <button className="first-btn" type="submit">
            Sign Up
          </button>
          <p>Or</p>
          <div>
            <button onClick={() => signInWithFacebook()}>
              <i className="fab fa-facebook-f"></i>
            </button>
            <button onClick={handleSignIn}>
              <img src={google} alt="google" className="google" />
            </button>
            <button onClick={() => signInWithTwitter()}>
              <i className="fab fa-twitter"></i>
            </button>
          </div>
        </form>
      </section>
    </div>
    );
  }
  