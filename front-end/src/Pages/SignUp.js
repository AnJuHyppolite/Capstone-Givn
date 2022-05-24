import { signUp } from "../Services/Firebase";
import {  useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  signInWithGoogle,
  signInWithFacebook,
  signInWithTwitter,
  db,
  auth

} from "../Services/Firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { randomImg } from "../Helpers/randomImage";
import google from "../Assets/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png";
import "../Styles/Home.css";

export default function SignUp() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("")
    const history = useHistory();
    
  
    const [data, setData] = useState({
      name: "",
      email: "",
      password: "",
      error: null,
      loading: false,
    });
    const { name, email, password, error, loading } = data;


    const handleChange = (e) => {
      setData({ ...data, [e.target.id]: e.target.value });
    };
    const handleSubmit = async (e) => {
      
      e.preventDefault();
      //sign up with firebase and send results to our backend
      setData({ ...data, error: null, loading: true });
      if (!name ||!email || !password ) {
        setData({ ...data, error: "All fields are required" })

      }
      try {
          const result = await signUp( email, password);
          console.log(result.user)
          await setDoc(doc(db, "users", result.user.uid), {
            uid: result.user.uid,
            name,
            email,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
          })
      setData({
        name: "",
        email: "",
        password: "",
        error: null,
        loading: false,
      });
          history.push("/posts");
      } catch (err) {
        setData({ ...data, error: err.message, loading: false });
      }
    };

    // const handleSignIn = () => {
    //   signInWithGoogle();
    //   history.push("/posts")
    // };
  
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
          <h1>Create your Givn Account</h1>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
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
          {/* <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          /> */}
          <hr />
          <button className="first-btn" disabled={loading}>
          {loading ? "Creating ..." : "Sign Up"}
          </button>
          <button className="first-btn">
          <Link to='/login'>
         Login
          </Link>
          </button>
          {/* <p>Or</p>
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
          </div> */}
        </form>
      </section>
    </div>
    );
  }
  