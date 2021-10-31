import { UserContext } from "../Providers/UserProvider";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  login

} from "../Services/Firebase";
import { useState } from "react";
import { randomImg } from "../Helpers/randomImage";
import google from "../Assets/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png";
import "../Styles/Home.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const history = useHistory();
    const { user } = useContext(UserContext);
  
    useEffect(() => {
      if (user) {
        history.push("/posts");
      }
    }, [user, history]);
  
    const handleSignIn = () => {
      signInWithGoogle();
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      //sign in with firebase and then change route
      try {
        await login(email, password);
        history.push("/");
      } catch (error) {
        console.log(error);
      }
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
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <h5>Don't forget your password</h5>
            <hr />
            <button className="first-btn" type="submit">
              Log In
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

export default Login