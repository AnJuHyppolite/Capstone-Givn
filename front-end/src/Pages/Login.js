import { UserContext } from "../Providers/UserProvider";
import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  login,
  db

} from "../Services/Firebase";
import { useState } from "react";
import { randomImg } from "../Helpers/randomImage";
import google from "../Assets/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png";
import "../Styles/Home.css";
import { updateDoc, doc } from "firebase/firestore";

const Login = () => {
    const [data, setData] = useState({
      email: "",
      password: "",
      error: null,
      loading: false,
    });
    const { email, password, loading } = data;
    const history = useHistory();
    const { user } = useContext(UserContext);
  

    const handleChange = (e) => {
      setData({ ...data, [e.target.id]: e.target.value });
    };
  
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
      setData({ ...data, error: null, loading: true });
      if (!email || !password) {
        setData({ ...data, error: "All fields are required" });
      }
      //sign in with firebase and then change route
      try {
       const result =  await login(email, password);
       await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
        history.push("/posts");
      } catch (error) {
        setData({ ...data, error: error.message, loading: false });
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
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handleChange}
              required
            />
            <h5>Don't forget your password</h5>
            <hr />
            <button className="first-btn" type="submit"  disabled={loading}>
            {loading ? "Logging in ..." : "Login"}
            </button>
            <button className="first-btn" type="submit" >
            <Link to='signup'>
              SignUp
            </Link>
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